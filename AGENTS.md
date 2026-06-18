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
- `docs/integrations/google-sheets-lead-tracker.md` — lead/contact logging workflow backed by Google Sheets + Google Workspace CLI.
- `docs/integrations/google-sheets-job-fit-tracker.md` — job-fit scorecard logging workflow backed by Google Sheets + Google Workspace CLI.
- `docs/testing/README.md` — evaluation vs testing workflow, manifest contract, and suite semantics for durable quality checks.
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
- `.cursor/commands/evaluate-feature.md` — slash command **`/evaluate-feature`**; delegates to **feature-evaluator** for post-build spec checks.
- `.cursor/commands/run-feature-tests.md` — slash command **`/run-feature-tests`**; delegates to **feature-testing-agent** for manifest-driven regression runs.
- `.cursor/commands/lead-tracker.md` — slash command **`/lead-tracker`**; delegates to **lead-tracker** for recent-contact capture and follow-up logging.
- `.cursor/skills/job-fit/` — **job-fit** skill: duplicate prevention, intake defaults, and delegation to **job-fit-analyst**; see `SKILL.md`.
- `.cursor/commands/job-fit.md` — slash command **`/job-fit`**; reads the job-fit skill, checks for prior evaluations, then delegates to **job-fit-analyst** for role/company fit evaluation and optional sheet logging.
- `.cursor/agents/feature-evaluator.md` — **feature-evaluator** subagent; determines whether a just-built feature matches specification and is ready for regression testing.
- `.cursor/agents/feature-testing-agent.md` — **feature-testing-agent** subagent; runs committed feature manifests and suites for one-feature, impacted-feature, or full regression coverage.
- `.cursor/agents/lead-tracker.md` — **lead-tracker** subagent; structures lead/contact notes and syncs them to Google Sheets when local config is present.
- `.cursor/agents/job-fit-analyst.md` — **job-fit-analyst** subagent; evaluates job fit and appends scorecard rows to Google Sheets when local config is present.
- `docs/WEEKLY_SYNTHESIS.md` — weekly Chief-of-Staff synthesis ritual (cadence, feeds, PM review).
- `.cursor/skills/weekly-synthesis/` — **weekly-synthesis** skill; cross-domain brief template; see `SKILL.md`.
- `.cursor/commands/weekly-synthesis.md` — slash command **`/weekly-synthesis`**; delegates to **cos-synthesizer**.
- `.cursor/agents/cos-synthesizer.md` — **cos-synthesizer** subagent; writes `docs/research/cos-weekly-*.md`.
- `.cursor/skills/ai-news-pulse/` — **ai-news-pulse** skill: daily top-10 AI news across agentic, applied, generative, research, science, and consumer AI; see `SKILL.md`.
- `.cursor/commands/ai-news.md` — slash command **`/ai-news`**; delegates to **ai-news-scout**.
- `.cursor/agents/ai-news-scout.md` — **ai-news-scout** subagent; writes `docs/research/ai-news-*.md`.
- `.cursor/agents/` — other named subagent definitions (`research-brief`, `work-strategist`, etc.).
- `docs/showcase/` — shareable capability map HTML; regenerate with `python3 scripts/build-capability-map.py` when adding commands, skills, agents, or feature manifests.

## When changing behavior

If you introduce a new integration (calendar, email, CRM), add a short note under `docs/integrations/` (create the folder when needed) and link it from `docs/CONTINUITY.md`.

## Cursor Cloud specific instructions

The core "application" is Cursor subagent definitions in `.cursor/agents/` plus the markdown documentation scaffold. A small **`@cursor/sdk`** layer (`package.json`, `scripts/scheduled/`) supports GitHub Actions schedules; there is no app server and no unit test runner.

### What "running" means here

- **Git** is the only required tool for docs-only work. Scheduled automation also needs **Node 20+** and `CURSOR_API_KEY` for SDK scripts.
- Subagent definitions in `.cursor/agents/` (including **`events-scout`**, **`lookahead-networker`**, **`stack-radar`**, **`cos-synthesizer`**, **`feature-evaluator`**, **`feature-testing-agent`**, **`lead-tracker`**, **`job-fit-analyst`**, `onboarding-guide`, `work-strategist`, `research-brief`, `household-coordinator`) are consumed by the Cursor agent runtime — they do not need to be "started" separately.
- Project **skills** live under `.cursor/skills/`; **slash commands** under `.cursor/commands/` (for example **`/events-research`**, **`/lookahead-match`**, **`/weekly-synthesis`**, **`/tech-stack-updates`**, **`/ai-news`**, **`/evaluate-feature`**, **`/run-feature-tests`**, **`/lead-tracker`**, **`/job-fit`**, and the **job-fit** skill).
- `.env.example` includes `CURSOR_API_KEY` for `@cursor/sdk` (scheduled workflows and local scripts under `scripts/scheduled/`) plus optional local config for lead-tracker and job-fit-tracker Google Sheet targets.

### Build / scheduled automation

- **Install:** `npm ci` (requires Node 20+).
- **Weekly tech-stack radar (local or CI):** `npm run scheduled:weekly-tech-stack` — needs `CURSOR_API_KEY`; see [`docs/integrations/scheduled-tech-stack-radar.md`](docs/integrations/scheduled-tech-stack-radar.md) and [`.github/workflows/weekly-tech-stack-radar.yml`](.github/workflows/weekly-tech-stack-radar.yml).
- **Daily AI news (local or CI):** `npm run scheduled:daily-ai-news` — needs `CURSOR_API_KEY`; see [`docs/integrations/scheduled-ai-news.md`](docs/integrations/scheduled-ai-news.md) and [`.github/workflows/daily-ai-news.yml`](.github/workflows/daily-ai-news.yml).
- There is still no linter or unit test runner; feature regression checks are manifest-driven via `/run-feature-tests`.

### Feature handoff expectation

After implementing a feature or materially changing one, end your user-facing
response with a short **Try it out** section.

- Prefer **Cursor slash commands** or other chat-native instructions over
  proposing a CLI unless the repo already has a real CLI entrypoint.
- Include at least:
  1. one immediate **evaluation** step (for example `/evaluate-feature ...`),
  2. one targeted **testing** step (for example `/run-feature-tests feature ...`), and
  3. if useful, one broader optional regression step (for example `suite smoke` or `suite full`).
- State the expected result in one short sentence so Tyler knows what success
  should look like.

### Verifying the environment

To confirm the repo is healthy, check that:
1. `git status` runs cleanly.
2. All expected files exist: `AGENTS.md`, `README.md`, `docs/CONTINUITY.md`, `docs/WEEKLY_SYNTHESIS.md`, `docs/RUNTIME_AND_AGENTS.md`, `docs/BOUNDARIES.md`, `docs/integrations/google-sheets-lead-tracker.md`, `docs/integrations/google-sheets-job-fit-tracker.md`, `docs/integrations/scheduled-tech-stack-radar.md`, `docs/integrations/scheduled-ai-news.md`, `docs/testing/README.md`, `docs/identity-brief.md`, `docs/ONBOARDING_OPEN_QUESTIONS.md`, `.github/workflows/weekly-tech-stack-radar.yml`, `.github/workflows/daily-ai-news.yml`, `.cursor/commands/events-research.md`, `.cursor/commands/lookahead-match.md`, `.cursor/commands/weekly-synthesis.md`, `.cursor/commands/tech-stack-updates.md`, `.cursor/commands/ai-news.md`, `.cursor/commands/evaluate-feature.md`, `.cursor/commands/run-feature-tests.md`, `.cursor/commands/lead-tracker.md`, `.cursor/commands/job-fit.md`, `.cursor/skills/events-research/SKILL.md`, `.cursor/skills/job-fit/SKILL.md`, `.cursor/skills/lookahead-networker/SKILL.md`, `.cursor/skills/weekly-synthesis/SKILL.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`, `.cursor/skills/ai-news-pulse/SKILL.md`, and the `.cursor/agents/*.md` files (including `events-scout.md`, `ai-news-scout.md`, `lookahead-networker.md`, `cos-synthesizer.md`, `stack-radar.md`, `feature-evaluator.md`, `feature-testing-agent.md`, `lead-tracker.md`, and `job-fit-analyst.md`).
3. `.env` has been created from `.env.example` (never committed).
