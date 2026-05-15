# Continuity log

**Purpose:** Durable handoff between sessions and tools. Update this file when goals shift, when you close a thread, or when something important happened that future-you (or an agent) must not forget.

## North star

Build a **Chief-of-Staff** layer that helps Tyler (and coordinated household/work context) with prioritization, preparation, and delegation — with explicit agent loops, sub-agents where helpful, and human-in-the-loop for sensitive actions.

## Current focus (edit freely)

- [ ] Confirm domain boundaries: what is in-scope for “household” vs “work” automation vs advisory-only.
- [ ] **Deferred:** Work through boundary / operating-model questions in [`docs/ONBOARDING_OPEN_QUESTIONS.md`](ONBOARDING_OPEN_QUESTIONS.md) (new chat or `onboarding-guide` subagent).
- [ ] Pick first integrations (calendar, tasks, email) once trust model is clear.
- [ ] Flesh out `.cursor/agents/` roles to match real recurring workflows.

## Last session

- **Date:** 2026-05-15
- **What we did:** Split quality workflows into **evaluation** and **testing**. Added **`feature-evaluator`**, repurposed **`feature-testing-agent`** for manifest-driven regression runs, added `/evaluate-feature` + `/run-feature-tests`, and created `docs/testing/` with manifest and suite scaffolding.
- **Decisions:** Treat **evaluation** as post-build spec conformance for a new feature, and treat **testing** as reusable saved regression checks that can run one feature, impacted features, or full suites.
- **Next:** As real features land, add or update a manifest under `docs/testing/features/`, run `/evaluate-feature` first, then `/run-feature-tests` in targeted or suite mode.

## Open questions

- Which workloads must stay 100% local vs OK in Cursor cloud agents?
- What is the minimum “daily briefing” artifact format (markdown, canvas, email draft)?
