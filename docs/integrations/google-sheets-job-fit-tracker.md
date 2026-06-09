# Google Sheets job-fit tracker integration

Use this integration when Tyler runs **`/job-fit`** and wants every evaluation
logged to an external table instead of leaving the scorecard only in chat.

## Design choice

This workflow uses an **append-only job-fit review log** in Google Sheets,
backed by the **Google Workspace CLI** (`gws`). Each `/job-fit` run becomes a
new row, which keeps history simple, low-risk, and auditable.

Use either a **dedicated spreadsheet** or a **dedicated tab** inside an existing
job workbook. The tab must be separate from the lead-tracker log. The tab
**name must match exactly** what you put in `JOB_FIT_TRACKER_SHEET_RANGE` (for
example `Job Fit Agent Reviews`, not `Job Fit Reviews`, if that is what you
named it in Google Sheets).

## Recommended sheet layout

Create a tab (any name you prefer) with these columns in row 1:

| Column | Header | Purpose |
| --- | --- | --- |
| A | Reviewed At | When the evaluation was captured |
| B | Company | Employer name |
| C | Role Title | Job title |
| D | Overall Score | Weighted scorecard result (1.0–5.0) |
| E | Verdict | strong fit, conditional fit, stretch but plausible, weak fit, skip |
| F | Confidence | high, medium, or low |
| G | Recommendation | apply now, apply if clarified, archive for later, skip |
| H | One-line Call | Short scorecard summary |
| I | Job Posting URL | Original listing link when available |
| J | Brief Path | Path to saved `docs/research/job-fit-*.md` note, or `chat-only` |
| K | Stage | interested, deciding, applied, interviewing, offer, etc. |
| L | Top Risk | One short red flag (environment or execution risk) |
| M | Capability | Dimension score (1–5) |
| N | Interest | Dimension score (1–5) |
| O | Environment | Dimension score (1–5) |
| P | Execution Sustainability | Dimension score (1–5) |
| Q | Narrative | Dimension score (1–5) |
| R | Notes | Custom weighting, unknowns, or short parent context |

## Local configuration

Keep the target sheet local in `.env`:

- `JOB_FIT_TRACKER_SPREADSHEET_ID` — workbook ID from the Google Sheets URL
- `JOB_FIT_TRACKER_SHEET_RANGE` — tab name + columns, e.g.
  `'Job Fit Agent Reviews!A:R'`

**Quote the whole range** when the tab name contains spaces. In `.env`:

```bash
JOB_FIT_TRACKER_SPREADSHEET_ID=your_spreadsheet_id_here
JOB_FIT_TRACKER_SHEET_RANGE='Job Fit Agent Reviews!A:R'
```

Then load config in your shell before running `gws`:

```bash
source .env
```

The spreadsheet ID is not a secret in the same way an API key is, but keep it
local anyway so the repo stays portable across environments.

**Do not** set `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` unless you have actually
created that file (for example via `gws auth export --unmasked`). If the path
points to a missing file, `gws` will fail with a 401 even when encrypted auth in
`~/.config/gws/` is otherwise valid. For normal local use, `gws auth login -s
sheets,drive` is enough — no project-level `credentials.json` required.

## Setup flow

1. Install and authenticate **Google Workspace CLI** by following its official docs:  
   - https://github.com/googleworkspace/cli  
   - https://googleworkspace-cli.mintlify.app/commands/sheets
2. Create the spreadsheet if needed:

`gws sheets spreadsheets create --json '{"properties":{"title":"Job Fit Tracker"}}'`

3. Write the header row:

`gws sheets spreadsheets values update --params '{"spreadsheetId":"SPREADSHEET_ID","range":"'\''Job Fit Agent Reviews'\''!A1:R1","valueInputOption":"RAW"}' --json '{"values":[["Reviewed At","Company","Role Title","Overall Score","Verdict","Confidence","Recommendation","One-line Call","Job Posting URL","Brief Path","Stage","Top Risk","Capability","Interest","Environment","Execution Sustainability","Narrative","Notes"]]}'`

Replace `Job Fit Agent Reviews` with your actual tab name.

4. Save the spreadsheet ID into local `.env` as `JOB_FIT_TRACKER_SPREADSHEET_ID`
   and set `JOB_FIT_TRACKER_SHEET_RANGE` to match the tab name.

## Append a new job-fit row

After `source .env`, append with the Sheets API (pass `range` in `--params`):

`gws sheets spreadsheets values append --params '{"spreadsheetId":"'"$JOB_FIT_TRACKER_SPREADSHEET_ID"'","range":"'"$JOB_FIT_TRACKER_SHEET_RANGE"'","valueInputOption":"RAW"}' --json '{"values":[["2026-06-09 14:30 ET","Acme Corp","Senior Engineer","3.8","conditional fit","medium","apply if clarified","Strong stack overlap; environment unclear.","https://company.example/jobs/123","chat-only","deciding","Ambiguous ownership model","4","3","3","3","4","Optimize for stability."]]}'`

## Read back recent rows

Use this when you want to confirm the sheet target or inspect the latest table
contents before another append:

`gws sheets +read --spreadsheet "$JOB_FIT_TRACKER_SPREADSHEET_ID" --range "${JOB_FIT_TRACKER_SHEET_RANGE:-Job Fit Reviews!A:R}"`

## Duplicate check before analysis

`/job-fit` runs a **duplicate prevention** step before scoring. Read the sheet
(and fall back to `docs/research/job-fit-*.md` when the sheet is unavailable)
to see whether the same role was already evaluated.

**Match keys:**

- normalized **company + role title**, or
- the same **job posting URL** when one is supplied.

**On match:** stop and show Tyler the existing row's **Reviewed At**, **Overall
Score**, and **Verdict**. Do not analyze until he asks for a **new entry** (or
`re-analyze`, `force new`, `analyze again`, `run anyway`).

**On override:** append a new row as usual; note `intentional re-run` in
**Notes** when helpful.

See `.cursor/skills/job-fit/SKILL.md` for normalization rules and the full
workflow.

## Auth and `.env` troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `401` — `credentials.json` does not exist | `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` set in `.env` but file missing | Remove that line from `.env`, or run `gws auth export --unmasked > credentials.json` |
| `401` — token expired or revoked | Stale OAuth token | `gws auth login -s sheets,drive`, then `gws auth status` until `token_valid` is true |
| `404` — `/v4/spreadsheets//values/` | Empty `JOB_FIT_TRACKER_SPREADSHEET_ID` | Run `source .env` and confirm the ID is set |
| `.env: line N: command not found: Fit` | Unquoted tab name with spaces | Use `JOB_FIT_TRACKER_SHEET_RANGE='Your Tab Name!A:R'` |
| `gws auth status` OK but sheets command fails | `.env` overrides auth or config | Run `source .env` immediately before the `gws` command; check env vars |

Normal local auth lives in `~/.config/gws/` (`client_secret.json`, `credentials.enc`).
You do **not** need `credentials.json` in the AgentOS project root unless you
explicitly want a portable export for headless/CI use.

## Operational rules

- Treat the sheet as an **evaluation log**, not a deduplicated application CRM.  
- **Check for duplicates before analysis** — same company + role or same job URL
  should surface the prior scorecard instead of re-running silently.  
- Append a new row for **every completed** `/job-fit` analysis unless Tyler
  explicitly says `chat-only` or `do not sync`. Intentional re-runs after
  **new entry** still append.  
- Analyze first, append second — the row must reflect the final scorecard.  
- Put the numeric score in **Overall Score** and the artifact path in **Brief
  Path** (`chat-only` when no dated note was saved).  
- Keep `Notes` short; detailed private context belongs in local-only systems or
  dated briefs under `docs/research/`, not shared git docs.  
- If `gws` is unavailable or sheet config is missing, return the normalized row
  in chat and say the sync did not happen.  
- Do not claim success without direct CLI output.

## Future expansion

If this proves useful, the next low-risk expansion is outcome columns such as
**Applied**, **Interviewed**, **Outcome**, and **Outcome Notes** for the
learning loop — or a filtered view for active opportunities — rather than
jumping straight to row-mutation logic.
