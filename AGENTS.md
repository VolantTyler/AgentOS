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
- `.cursor/skills/tech-stack-pulse/` — **tech-stack-pulse** skill: weekly churn vs `docs/TECH_STACK.md`, upgrade posture, synergies; see `SKILL.md`.
- `.cursor/commands/tech-stack-updates.md` — slash command **`/tech-stack-updates`**; delegates to **stack-radar**.
- `.cursor/agents/stack-radar.md` — **stack-radar** subagent; writes `docs/research/tech-stack-updates-*.md`.
- `.cursor/skills/events-research/` — **events-research** skill: NYC / northern NJ + online AI agent orchestration events (invoke on demand; see skill `description` in `SKILL.md`).
- `.cursor/commands/events-research.md` — slash command **`/events-research`**; instructs parent to delegate to **events-scout**.
- `.cursor/agents/events-scout.md` — **events-scout** subagent; runs the skill and writes `docs/research/events-*.md`.
- `.cursor/skills/lookahead-networker/` — **lookahead-networker** skill: turn a saved event digest into a pre-event networking brief with high-value targets, technical icebreakers, and short outreach drafts.
- `.cursor/commands/lookahead-match.md` — slash command **`/lookahead-match`**; instructs parent to delegate to **lookahead-networker**.
- `.cursor/agents/lookahead-networker.md` — **lookahead-networker** subagent; writes `docs/research/networking-targets-*.md`.
- `.cursor/agents/` — other named subagent definitions (`research-brief`, `work-strategist`, etc.).

## When changing behavior

If you introduce a new integration (calendar, email, CRM), add a short note under `docs/integrations/` (create the folder when needed) and link it from `docs/CONTINUITY.md`.

## Cursor Cloud specific instructions

This is a **documentation-only repository** today — no `package.json`, no build system, no runnable services, and no automated tests. The "application" is the set of Cursor subagent definitions in `.cursor/agents/` and the markdown documentation scaffold.

### What "running" means here

- **Git** is the only required tool. All continuity and agent context lives in committed markdown.
- Subagent definitions in `.cursor/agents/` (including **`events-scout`**, **`lookahead-networker`**, **`stack-radar`**, `onboarding-guide`, `work-strategist`, `research-brief`, `household-coordinator`) are consumed by the Cursor agent runtime — they do not need to be "started" separately.
- Project **skills** live under `.cursor/skills/`; **slash commands** under `.cursor/commands/` (e.g. **`/events-research`**, **`/lookahead-match`**).
- `.env.example` defines a single `CURSOR_API_KEY` for future `@cursor/sdk` programmatic usage; no code uses it yet.

### No build/lint/test steps exist

There is no linter, test runner, or build command configured. If executable code (e.g. a `package.json` with `@cursor/sdk`) is added in the future, update this section with the corresponding install/lint/test/run commands.

### Verifying the environment

To confirm the repo is healthy, check that:
1. `git status` runs cleanly.
2. All expected files exist: `AGENTS.md`, `README.md`, `docs/CONTINUITY.md`, `docs/RUNTIME_AND_AGENTS.md`, `docs/BOUNDARIES.md`, `docs/identity-brief.md`, `docs/ONBOARDING_OPEN_QUESTIONS.md`, `.cursor/commands/events-research.md`, `.cursor/commands/lookahead-match.md`, `.cursor/commands/tech-stack-updates.md`, `.cursor/skills/events-research/SKILL.md`, `.cursor/skills/lookahead-networker/SKILL.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`, and the `.cursor/agents/*.md` files (including `events-scout.md`, `lookahead-networker.md`, and `stack-radar.md`).
3. `.env` has been created from `.env.example` (never committed).
