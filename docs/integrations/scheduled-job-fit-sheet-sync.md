# Job-fit sheet sync via GitHub Actions

Cloud **`/job-fit`** runs (and other chat-only sessions) often cannot reach your
local `.env` or `gws` auth. This workflow appends a **prepared scorecard row** to
the Job Fit Tracker sheet from GitHub Actions using exported OAuth credentials.

## When to use

| Situation | Path |
| --- | --- |
| Local machine with `gws` + `.env` | Normal append per [`google-sheets-job-fit-tracker.md`](google-sheets-job-fit-tracker.md) |
| Cloud agent / chat-only `/job-fit` | Copy the prepared 18-column row from chat → run **Sync job-fit row to sheet** |
| Connectivity check after setup | Same workflow with **verify_only** checked |

This does **not** re-run job-fit analysis. It only writes a row the analyst already
prepared.

## One-time setup

### 1. Create the sheet (if needed)

Follow the tab layout in [`google-sheets-job-fit-tracker.md`](google-sheets-job-fit-tracker.md).

### 2. Export gws credentials (local machine with browser)

```bash
gws auth login -s sheets,drive
gws auth export --unmasked > credentials.json
```

Paste the **entire** `credentials.json` contents into a GitHub Actions secret:

| Secret | Value |
| --- | --- |
| `GWS_CREDENTIALS` | Full JSON from `gws auth export --unmasked` |
| `JOB_FIT_TRACKER_SPREADSHEET_ID` | Spreadsheet ID from the Google Sheets URL |

Optional repository **variable** (Settings → Secrets and variables → Actions → Variables):

| Variable | Default if unset |
| --- | --- |
| `JOB_FIT_TRACKER_SHEET_RANGE` | `Job Fit Agent Reviews!A:R` |

**OAuth token refresh:** exported user OAuth tokens expire. Re-run
`gws auth login` and update `GWS_CREDENTIALS` when append jobs start failing with
401 errors.

### 3. Verify connectivity

GitHub → **Actions** → **Sync job-fit row to sheet** → **Run workflow**

- Check **verify_only**
- Leave `row_json` as `[]` (ignored when verify_only is true)
- Run

Expect a successful job that prints the current sheet contents.

## Append a row from chat

After `/job-fit` returns **prepared-but-not-synced**, copy the 18-value JSON array
from the analyst (or build it from the scorecard table).

### GitHub UI

1. Actions → **Sync job-fit row to sheet** → **Run workflow**
2. Paste the JSON array into **row_json**
3. Run

### GitHub CLI

```bash
gh workflow run sync-job-fit-row.yml \
  -f row_json='["2026-06-30","Accenture","Google Agentic AI Delivery Specialist","2.7","weak fit","medium-high","archive for later","Right topic; wrong GCP bar, consulting load, travel","https://www.accenture.com/us-en/careers/jobdetails?id=R00336600_en&title=Google+Agentic+AI+Delivery+Specialist","chat-only","interested","0-100% travel + GCP minimums + client context switching","2.5","4.5","2.5","2.0","3.0","Mid-level Team Lead/Consultant; AGBG product-led"]'
```

Note: `row_json` must be a **JSON array of 18 strings** (not wrapped in an extra
array-of-arrays unless your shell quoting requires it — the script expects one
row: `["col1",...,"col18"]`).

## Local dry run

```bash
source .env   # JOB_FIT_TRACKER_* + optional GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE
export ROW_JSON='["2026-06-30","Accenture","Google Agentic AI Delivery Specialist","2.7","weak fit","medium-high","archive for later","One-line","https://example.com/job","chat-only","interested","Top risk","2.5","4.5","2.5","2.0","3.0","Notes"]'
npm run sync:job-fit-row
```

Verify only:

```bash
VERIFY_ONLY=1 npm run sync:job-fit-row
```

## Files

| Path | Role |
| --- | --- |
| `.github/workflows/sync-job-fit-row.yml` | Manual sync + verify |
| `scripts/sync-job-fit-row.ts` | Validates 18 columns; append + read-back |
| `package.json` | `npm run sync:job-fit-row` |

## Security notes

- `GWS_CREDENTIALS` grants Sheets access for your Google account — treat it like a password.
- Do not commit scorecard rows or credentials to git.
- Job-fit **Notes** may include personal context; keep pasted `row_json` in GitHub Actions inputs only.

## Related

- Sheet schema and local append: [`google-sheets-job-fit-tracker.md`](google-sheets-job-fit-tracker.md)
- Workflow: [`docs/JOB_FIT_WORKFLOW.md`](../JOB_FIT_WORKFLOW.md)
- gws headless auth: https://googleworkspace-cli.mintlify.app/auth/headless-ci
