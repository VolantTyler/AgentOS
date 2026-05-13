# AgentOS — guidance for coding agents

This repository is a long-lived **Chief-of-Staff** system: planning, synthesis, delegation, and light execution across **personal**, **household**, and **work** domains for Tyler (and coordinated household context where relevant).

## Operating principles

1. **Continuity lives in git.** Prefer updating `docs/CONTINUITY.md`, `docs/RUNTIME_AND_AGENTS.md`, and small focused docs over long ephemeral chat-only explanations.
2. **Privacy and scope.** Treat household and employer data as sensitive. Do not invent calendar facts, financial figures, or health details. When in doubt, ask for a redacted example or point to a file the human will fill in.
3. **Agentic posture.** Default to structured outputs: options with tradeoffs, a recommended path, explicit next actions, and what to verify. Use subagents (see `.cursor/agents/`) when a task is parallelizable or needs a clean context window.
4. **Semi-autonomous, not autonomous.** Propose plans and diffs; avoid destructive git operations, credential handling, or outbound messaging unless the human has defined that integration.
5. **Truth and limits.** Never fabricate data, tool outcomes, or capabilities. Say when you do not know or cannot do something. Avoid exaggerated reassurance. For complex factual questions, prefer official docs and release notes with links — see [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md).

## Repo layout (initial)

- `docs/CONTINUITY.md` — rolling context: north star, open threads, last decisions.
- `docs/RUNTIME_AND_AGENTS.md` — how we run agent loops; Cursor SDK vs alternatives; links to official docs.
- `docs/BOUNDARIES.md` — honesty, capability limits, anti-exaggeration, and sourcing norms for agents.
- `docs/TECH_STACK.md` — languages, tools, and per-project stacks (professional; keep current).
- `docs/career-fit-context.md` — work anxieties, fit profile, and how agents should support career/job tasks (portable).
- `docs/ONBOARDING_OPEN_QUESTIONS.md` — **deferred** boundary / onboarding checklist; resume in a new chat when ready.
- `docs/identity-brief.md` — **cloud-safe** identity and working-style context for remote agents and fresh clones. Full detail stays **local-only** in `docs/_private/context-portfolio/` (never committed).
- `.cursor/skills/events-research/` — **events-research** skill: NYC / northern NJ + online AI agent orchestration events (invoke on demand; see skill `description` in `SKILL.md`).
- `.cursor/agents/` — named subagent definitions for the Cursor agent runtime (consumed by the SDK / Cursor agent per current Cursor documentation).

## When changing behavior

If you introduce a new integration (calendar, email, CRM), add a short note under `docs/integrations/` (create the folder when needed) and link it from `docs/CONTINUITY.md`.

## Cursor Cloud specific instructions

This is a **documentation-only repository** today — no `package.json`, no build system, no runnable services, and no automated tests. The "application" is the set of Cursor subagent definitions in `.cursor/agents/` and the markdown documentation scaffold.

### What "running" means here

- **Git** is the only required tool. All continuity and agent context lives in committed markdown.
- The four subagent definitions (`onboarding-guide`, `work-strategist`, `research-brief`, `household-coordinator`) in `.cursor/agents/` are consumed by the Cursor agent runtime — they do not need to be "started" separately.
- `.env.example` defines a single `CURSOR_API_KEY` for future `@cursor/sdk` programmatic usage; no code uses it yet.

### No build/lint/test steps exist

There is no linter, test runner, or build command configured. If executable code (e.g. a `package.json` with `@cursor/sdk`) is added in the future, update this section with the corresponding install/lint/test/run commands.

### Verifying the environment

To confirm the repo is healthy, check that:
1. `git status` runs cleanly.
2. All expected files exist: `AGENTS.md`, `README.md`, `docs/CONTINUITY.md`, `docs/RUNTIME_AND_AGENTS.md`, `docs/BOUNDARIES.md`, `docs/identity-brief.md`, `docs/ONBOARDING_OPEN_QUESTIONS.md`, and the four `.cursor/agents/*.md` files.
3. `.env` has been created from `.env.example` (never committed).
