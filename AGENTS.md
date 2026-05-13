# AgentOS — guidance for coding agents

This repository is a long-lived **Chief-of-Staff** system: planning, synthesis, delegation, and light execution across **personal**, **household**, and **work** domains for Tyler (and coordinated household context where relevant).

## Operating principles

1. **Continuity lives in git.** Prefer updating `docs/CONTINUITY.md`, `docs/RUNTIME_AND_AGENTS.md`, and small focused docs over long ephemeral chat-only explanations.
2. **Privacy and scope.** Treat household and employer data as sensitive. Do not invent calendar facts, financial figures, or health details. When in doubt, ask for a redacted example or point to a file the human will fill in.
3. **Agentic posture.** Default to structured outputs: options with tradeoffs, a recommended path, explicit next actions, and what to verify. Use subagents (see `.cursor/agents/`) when a task is parallelizable or needs a clean context window.
4. **Semi-autonomous, not autonomous.** Propose plans and diffs; avoid destructive git operations, credential handling, or outbound messaging unless the human has defined that integration.

## Repo layout (initial)

- `docs/CONTINUITY.md` — rolling context: north star, open threads, last decisions.
- `docs/RUNTIME_AND_AGENTS.md` — how we run agent loops; Cursor SDK vs alternatives; links to official docs.
- `docs/identity-brief.md` — **cloud-safe** identity and working-style context for remote agents and fresh clones. Full detail stays **local-only** in `docs/_private/context-portfolio/` (never committed).
- `.cursor/agents/` — named subagent definitions for the Cursor agent runtime (consumed by the SDK / Cursor agent per current Cursor documentation).

## When changing behavior

If you introduce a new integration (calendar, email, CRM), add a short note under `docs/integrations/` (create the folder when needed) and link it from `docs/CONTINUITY.md`.
