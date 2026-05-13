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

- **Date:** 2026-05-13
- **What we did:** (Cumulative) AgentOS scaffold through career-fit and skills. **This update:** slash command **`/events-research`** (`.cursor/commands/events-research.md`) and **events-scout** subagent (`.cursor/agents/events-scout.md`); docs wired in `README.md` / `AGENTS.md`.
- **Decisions:** Prefer **Cursor TypeScript SDK** (`@cursor/sdk`) for programmable Cursor agents with first-class **subagents**; evaluate **Hermes** if we need a fully local, non-Cursor orchestration substrate with built-in delegation UX.
- **Next:** Add `docs/integrations/` as first tools are wired; add a minimal `package.json` + SDK example when we run agents from code (not only from the IDE). Tighten **identity boundaries** (what may enter git vs `_private` only) as needed.

## Open questions

- Which workloads must stay 100% local vs OK in Cursor cloud agents?
- What is the minimum “daily briefing” artifact format (markdown, canvas, email draft)?
