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

- **Date:** 2026-05-14
- **What we did:** Added **`feature-testing-agent`** under [`.cursor/agents/feature-testing-agent.md`](../.cursor/agents/feature-testing-agent.md) so parent agents can delegate post-build validation of new features.
- **Decisions:** The testing agent should judge features against explicit expectations, verify formatting / presentation quality, and call out missing links, references, or wiring instead of giving a vague "looks good."
- **Next:** If this becomes a frequent workflow, add a dedicated slash command or SDK wrapper that automatically passes changed files plus acceptance criteria into `feature-testing-agent`.

## Open questions

- Which workloads must stay 100% local vs OK in Cursor cloud agents?
- What is the minimum “daily briefing” artifact format (markdown, canvas, email draft)?
