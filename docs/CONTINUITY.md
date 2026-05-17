# Continuity log

**Purpose:** Durable handoff between sessions and tools. Update this file when goals shift, when you close a thread, or when something important happened that future-you (or an agent) must not forget.

## North star

Build a **Chief-of-Staff** layer that helps Tyler (and coordinated household/work context) with prioritization, preparation, and delegation — with explicit agent loops, sub-agents where helpful, and human-in-the-loop for sensitive actions.

## Current focus (edit freely)

- [ ] Confirm domain boundaries: what is in-scope for “household” vs “work” automation vs advisory-only.
- [ ] **Deferred:** Work through boundary / operating-model questions in [`docs/ONBOARDING_OPEN_QUESTIONS.md`](ONBOARDING_OPEN_QUESTIONS.md) (new chat or `onboarding-guide` subagent).
- [x] Pick a first low-risk external integration: **lead tracking to Google Sheets via Google Workspace CLI**. Documented in [`docs/integrations/google-sheets-lead-tracker.md`](integrations/google-sheets-lead-tracker.md).
- [ ] Decide whether the next integrations should be calendar, tasks, email, or a derived "open follow-ups" view from the lead tracker log.
- [ ] Flesh out `.cursor/agents/` roles to match real recurring workflows.
- [ ] Start using the job-fit loop in [`docs/JOB_FIT_WORKFLOW.md`](JOB_FIT_WORKFLOW.md) for real roles, then decide whether it deserves a dedicated skill or SDK automation.

## Last session

- **Date:** 2026-05-17
- **What we did:** Added a new **`lead-tracker`** workflow with `/lead-tracker`, a dedicated subagent prompt, a Google Sheets integration note under `docs/integrations/`, local `.env` config examples, and a saved feature manifest for regression checks.
- **Decisions:** Start with an **append-only recent-contacts log** in Google Sheets rather than row-mutation CRM logic, use **Google Workspace CLI** (`gws`) as the low-friction write path, and fall back to chat-only structured rows whenever local config or CLI access is missing.
- **Next:** Try the lead tracker with real contacts, decide whether a derived **Open Follow-ups** view should be the next increment, and only then consider broader CRM-style integrations.

## Open questions

- Which workloads must stay 100% local vs OK in Cursor cloud agents?
- What is the minimum “daily briefing” artifact format (markdown, canvas, email draft)?
- Should lead tracking remain append-only, or does it eventually need a second deduplicated view for active leads?
