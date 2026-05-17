# /lead-tracker — capture leads and recent contact follow-ups

You are executing the **AgentOS `/lead-tracker` slash command**.

## Required: run as **lead-tracker** subagent

1. **Delegate** this entire request to the **`lead-tracker`** subagent (`.cursor/agents/lead-tracker.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.  
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Normalize the supplied lead or contact-follow-up note into a structured recent-contact entry and, when configured, sync it to the Google Sheet described in `docs/integrations/google-sheets-lead-tracker.md`.  
   - **Context:** Any names, companies, dates, next steps, urgency, source links, or "chat-only / do not sync" instructions Tyler typed after the slash.

**If delegation is unavailable**, say so once, then **you** perform the same workflow yourself by following `.cursor/agents/lead-tracker.md` and `docs/integrations/google-sheets-lead-tracker.md`.

## Defaults (unless user overrides in the same message)

- **Write mode:** append a new row to the recent-contacts sheet when `gws` access and sheet config are available; otherwise return the prepared row in chat and note the setup gap.  
- **Config source:** `LEAD_TRACKER_SPREADSHEET_ID` and `LEAD_TRACKER_SHEET_RANGE` from the local environment when present.  
- **Output:** action summary, normalized row fields, and a short follow-up recommendation.

## After the subagent finishes

Reply with:

1. **Result** — synced, prepared-but-not-synced, or needs-clarification.  
2. **Structured entry** — the normalized fields that were captured.  
3. **Follow-up** — what Tyler should do next and by when if that is known.  
4. **Blockers / human checks** — missing details, config gaps, or external-sync limits.
