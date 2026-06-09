# /job-fit — evaluate role and company fit

You are executing the **AgentOS `/job-fit` slash command**.

## Required: read **job-fit** skill, then duplicate check

1. **Read** `.cursor/skills/job-fit/SKILL.md` and follow its **Duplicate prevention** section **before** any analysis.  
2. **Infer** company and role title from Tyler's message. If either is unclear, ask once — do not analyze or check duplicates blindly.  
3. **Search** the job-fit tracker sheet (when `gws` + `JOB_FIT_TRACKER_SPREADSHEET_ID` are available) and `docs/research/job-fit-*.md` briefs using the skill's match rules.  
4. **If a duplicate is found** and Tyler did **not** include an override (`new entry`, `re-analyze`, `force new`, `analyze again`, `run anyway`, or similar):
   - **Stop.** Do not delegate to `job-fit-analyst`.
   - Reply with the **existing analysis**: reviewed date, overall score, and verdict (plus brief path or one-line call when useful).
   - Tell Tyler he can reply **new entry** for a fresh evaluation.
5. **If no duplicate** or Tyler **overrode**, continue below.

## Required: run as **job-fit-analyst** subagent

1. **Delegate** this entire request to the **`job-fit-analyst`** subagent (`.cursor/agents/job-fit-analyst.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.  
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Evaluate the supplied role and company against Tyler's documented strengths, constraints, interests, and preferred environments using the scorecard-first format in `docs/JOB_FIT_WORKFLOW.md`, then append the scorecard row to the job-fit Google Sheet when configured.  
   - **Context:** Any job URL, pasted JD text, company description, weighting preferences, stage, `save`/`archive` instruction, `chat-only` / `do not sync` override, or explicit **new entry** / re-run note Tyler typed after the slash.

**If delegation is unavailable**, say so once, then **you** perform the same workflow yourself by reading `.cursor/skills/job-fit/SKILL.md`, `docs/JOB_FIT_WORKFLOW.md`, `docs/integrations/google-sheets-job-fit-tracker.md`, and grounding the analysis in the source-of-truth docs named there.

## Defaults (unless user overrides in the same message)

- **Output mode:** chat-first, using the **scorecard at the top**.  
- **Persistence:** do **not** save a dated note unless Tyler explicitly asks to `save`, `archive`, or otherwise indicates the evaluation is worth keeping.  
- **Sheet sync:** append a new row to the job-fit tracker sheet on **every** run when `gws` access and sheet config are available; otherwise return the prepared row in chat and note the setup gap.  
- **Config source:** `JOB_FIT_TRACKER_SPREADSHEET_ID` and `JOB_FIT_TRACKER_SHEET_RANGE` from the local environment when present.  
- **Context sources:** `docs/identity-brief.md`, `docs/career-fit-context.md`, `docs/TECH_STACK.md`, `docs/CONTINUITY.md`, plus any pasted job/company material or linked public job listing.  
- **Decision style:** candid, fit-focused, and environment-aware — not resume-keyword optimism.

## After duplicate check (when blocked)

Reply with only the duplicate notice and existing analysis summary. Do not run the subagent.

## After the subagent finishes

Reply with:

1. **Scorecard first** — overall weighted score, verdict, confidence, one-line call, and all five dimension scores.  
2. **Short recommendation section** — strongest reasons for fit, strongest concerns, unknowns to validate, and recommendation.  
3. **Sheet sync** — synced, prepared-but-not-synced, or skipped; include blocker if sync did not run.  
4. **Path** to the saved dated note, if one was requested and created.
