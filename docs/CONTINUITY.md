# Continuity log

**Purpose:** Durable handoff between sessions and tools. Update this file when goals shift, when you close a thread, or when something important happened that future-you (or an agent) must not forget.

## North star

Build a **Chief-of-Staff** layer that helps Tyler (and coordinated household/work context) with prioritization, preparation, and delegation — with explicit agent loops, sub-agents where helpful, and human-in-the-loop for sensitive actions.

## Current focus (edit freely)

- [ ] Confirm domain boundaries: what is in-scope for “household” vs “work” automation vs advisory-only.
- [ ] **Deferred:** Work through boundary / operating-model questions in [`docs/ONBOARDING_OPEN_QUESTIONS.md`](ONBOARDING_OPEN_QUESTIONS.md) (new chat or `onboarding-guide` subagent).
- [ ] Pick first integrations (calendar, tasks, email) once trust model is clear.
- [ ] Flesh out `.cursor/agents/` roles to match real recurring workflows.
- [ ] Start using the job-fit loop in [`docs/JOB_FIT_WORKFLOW.md`](JOB_FIT_WORKFLOW.md) for real roles, then decide whether it deserves a dedicated skill or SDK automation.
- [ ] Ask another agent to research certification / coursework options using [`docs/research/job-fit-certification-gaps-2026-05-20.md`](research/job-fit-certification-gaps-2026-05-20.md) as the durable handoff.

## Last session

- **Date:** 2026-05-20
- **What we did:** Converted recent job-fit chat work into a durable handoff brief at [`docs/research/job-fit-certification-gaps-2026-05-20.md`](research/job-fit-certification-gaps-2026-05-20.md), summarizing evaluated roles, strongest near-term targets, recurring trainable gaps, and structural mismatches that certifications will not fix.
- **Decisions:** Treat **KPMG Associate, AI Engineer** as the strongest recent near-term fit and **Google Cloud Forward Deployed Engineer I, GenAI** as a plausible stretch. Treat the harsher forward-deployed / architect / evangelist roles as mostly poor-fit due to environment, travel, and execution-sustainability concerns rather than missing credentials alone.
- **Next:** Have another agent research certification programs, structured courses, and project-based alternatives against the gap brief; optimize for roles that are actually good bets, not just the most prestigious stretch targets.

## Open questions

- Which workloads must stay 100% local vs OK in Cursor cloud agents?
- What is the minimum “daily briefing” artifact format (markdown, canvas, email draft)?
