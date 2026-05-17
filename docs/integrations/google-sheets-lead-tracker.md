# Google Sheets lead tracker integration

Use this integration when Tyler wants AgentOS to remember a recent contact or
lead follow-up in an external table instead of leaving it only in chat.

## Design choice

This workflow uses an **append-only recent-contacts log** in Google Sheets,
backed by the **Google Workspace CLI** (`gws`). Each interaction becomes a new
row, which keeps the history simple, low-risk, and auditable.

## Recommended sheet layout

Create a sheet tab named **`Recent Contacts`** with these columns:

| Column | Header | Purpose |
| --- | --- | --- |
| A | Logged At | When the row was captured |
| B | Contact Name | Person to remember |
| C | Organization | Company or group |
| D | Lead Type | Prospect, recruiter, partner, customer, advisor, etc. |
| E | Relationship Status | New, active, warm, waiting, closed, etc. |
| F | Channel | Email, call, event, LinkedIn, referral, etc. |
| G | Last Contact Date | When Tyler last interacted with them |
| H | Follow-up By | Next target follow-up date |
| I | Next Action | The concrete follow-up step |
| J | Source / URL | Link to LinkedIn, email thread, event page, note, etc. |
| K | Notes | Short context only |

## Local configuration

Keep the target sheet local in `.env`:

- `LEAD_TRACKER_SPREADSHEET_ID`
- `LEAD_TRACKER_SHEET_RANGE` with default `Recent Contacts!A:K`

The spreadsheet ID is not a secret in the same way an API key is, but keep it
local anyway so the repo stays portable across environments.

## Setup flow

1. Install and authenticate **Google Workspace CLI** by following its official docs:  
   - https://github.com/googleworkspace/cli  
   - https://googleworkspace-cli.mintlify.app/commands/sheets
2. Create the spreadsheet if needed:

`gws sheets spreadsheets create --json '{"properties":{"title":"Lead Tracker"}}'`

3. Write the header row:

`gws sheets spreadsheets values update --params '{"spreadsheetId":"SPREADSHEET_ID","range":"Recent Contacts!A1:K1","valueInputOption":"RAW"}' --json '{"values":[["Logged At","Contact Name","Organization","Lead Type","Relationship Status","Channel","Last Contact Date","Follow-up By","Next Action","Source / URL","Notes"]]}'`

4. Save the returned spreadsheet ID into local `.env` as `LEAD_TRACKER_SPREADSHEET_ID`.

## Append a new contact row

Use the helper command because it is concise and works well for row inserts:

`gws sheets +append --spreadsheet "$LEAD_TRACKER_SPREADSHEET_ID" --range "${LEAD_TRACKER_SHEET_RANGE:-Recent Contacts!A:K}" --json-values '[["2026-05-17 18:00 UTC","Jane Doe","Acme","recruiter","warm","LinkedIn","2026-05-17","2026-05-20","Send follow-up note","https://www.linkedin.com/in/janedoe","Asked for portfolio and resume."]]'`

## Read back recent rows

Use this when you want to confirm the sheet target or inspect the latest table
contents before another append:

`gws sheets +read --spreadsheet "$LEAD_TRACKER_SPREADSHEET_ID" --range "${LEAD_TRACKER_SHEET_RANGE:-Recent Contacts!A:K}"`

## Operational rules

- Treat the sheet as an **interaction log**, not a deduplicated CRM master.  
- Append a new row for every meaningful touchpoint or follow-up note.  
- Keep `Notes` short; detailed private context belongs in local-only systems, not shared git docs.  
- If `gws` is unavailable or sheet config is missing, return the normalized row in chat and say the sync did not happen.  
- Do not claim success without direct CLI output.

## Future expansion

If this proves useful, the next low-risk expansion is a second tab or filtered
view for **Open Follow-ups** derived from the append-only log, rather than
jumping straight to row-mutation logic.
