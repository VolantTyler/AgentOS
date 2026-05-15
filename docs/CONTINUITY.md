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
- [ ] Run the new event-to-networking loop on a real event: `/events-research` first, then `/lookahead-match` on the event worth attending.

## Last session

- **Date:** 2026-05-15
- **What we did:** Added a durable pre-event networking workflow: the [`lookahead-networker`](../.cursor/agents/lookahead-networker.md) subagent, the [`.cursor/skills/lookahead-networker/SKILL.md`](../.cursor/skills/lookahead-networker/SKILL.md) skill, and the **`/lookahead-match`** slash command for turning saved event digests into top networking targets, specific icebreakers, and short outreach drafts.
- **Decisions:** Treat this as a **skill + subagent + slash command** workflow, not a standalone freeform note. Ground all targets in [`docs/career-fit-context.md`](career-fit-context.md), bias toward technical builders, and explicitly exclude low-signal marketing or sales contacts.
- **Next:** Run `/events-research` to refresh the event list, then use `/lookahead-match` against a chosen event and refine the prompt once a few real briefs exist.
- **Date:** 2026-05-14
- **What we did:** Added a durable job-fit system: [`docs/JOB_FIT_WORKFLOW.md`](JOB_FIT_WORKFLOW.md), the [`job-fit-analyst`](../.cursor/agents/job-fit-analyst.md) subagent, and the **`/job-fit`** slash command for comparing JDs/company descriptions against Tyler's documented strengths, interests, constraints, and preferred environments.
- **Decisions:** Start with a **workflow + subagent**, not a dedicated skill. Make the **scorecard-first** summary the default top section so job-fit reports are quick to scan before reading the long-form analysis.
- **Next:** Use `/job-fit` on live roles, store only high-value dated briefs under `docs/research/`, and capture interview/application outcomes to calibrate future fit judgments.

## Open questions

- Which workloads must stay 100% local vs OK in Cursor cloud agents?
- What is the minimum “daily briefing” artifact format (markdown, canvas, email draft)?
