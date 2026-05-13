# Continuity log

**Purpose:** Durable handoff between sessions and tools. Update this file when goals shift, when you close a thread, or when something important happened that future-you (or an agent) must not forget.

## North star

Build a **Chief-of-Staff** layer that helps Tyler (and coordinated household/work context) with prioritization, preparation, and delegation — with explicit agent loops, sub-agents where helpful, and human-in-the-loop for sensitive actions.

## Current focus (edit freely)

- [ ] Confirm domain boundaries: what is in-scope for “household” vs “work” automation vs advisory-only.
- [ ] Pick first integrations (calendar, tasks, email) once trust model is clear.
- [ ] Flesh out `.cursor/agents/` roles to match real recurring workflows.

## Last session (template)

- **Date:** 2026-05-13
- **What we did:** Repository scaffold; documented Cursor SDK subagents vs Hermes for multi-agent patterns; initialized git.
- **Decisions:** Prefer **Cursor TypeScript SDK** (`@cursor/sdk`) for programmable Cursor agents with first-class **subagents**; evaluate **Hermes** if we need a fully local, non-Cursor orchestration substrate with built-in delegation UX.
- **Next:** Add `docs/integrations/` entries as you wire tools; add `.env.example` when first scripts land.

## Open questions

- Which workloads must stay 100% local vs OK in Cursor cloud agents?
- What is the minimum “daily briefing” artifact format (markdown, canvas, email draft)?
