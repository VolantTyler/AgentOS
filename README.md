# AgentOS

**Agentic Chief-of-Staff** — durable planning, synthesis, and delegation across personal, household, and work contexts. This repo is the **source of truth** for how the system should behave, which runtimes we use, and what we decided last session.

## Why a repo instead of chat-only context?

Chat threads are disposable. Committed markdown, small examples, and ADR-style notes stay versioned, searchable, and portable across machines and assistants.

Start here on every new session:

1. Read [`docs/CONTINUITY.md`](docs/CONTINUITY.md) for current priorities and open threads.
2. Read [`docs/RUNTIME_AND_AGENTS.md`](docs/RUNTIME_AND_AGENTS.md) for runtime choices and agent-loop patterns.
3. Read [`docs/identity-brief.md`](docs/identity-brief.md) for who Tyler is in a **git-safe** form (cloud agents, new machines). Richer private context lives only under `docs/_private/` on trusted devices.
4. Read [`docs/TECH_STACK.md`](docs/TECH_STACK.md) for languages, tools, and project-level stacks.
5. Read [`docs/career-fit-context.md`](docs/career-fit-context.md) for career fit, work anxieties, and how to support job/career work.
6. Read [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md) for honesty, capability limits, and when to cite sources.  
7. Skim [`AGENTS.md`](AGENTS.md) for non-negotiables (privacy, autonomy boundaries).

## Cursor skills (project)

- **events-research** — [`.cursor/skills/events-research/SKILL.md`](.cursor/skills/events-research/SKILL.md): find **NYC / northern NJ** or **online AI agent orchestration** events; writes dated digests under [`docs/research/`](docs/research/README.md).  
- **Slash:** **`/events-research`** → [`.cursor/commands/events-research.md`](.cursor/commands/events-research.md) → delegates **`events-scout`** ([`.cursor/agents/events-scout.md`](.cursor/agents/events-scout.md)).  
- **lookahead-networker** — [`.cursor/skills/lookahead-networker/SKILL.md`](.cursor/skills/lookahead-networker/SKILL.md): turn a saved event digest into a high-signal networking brief with top targets, concrete icebreakers, and short outreach drafts.
- **Slash:** **`/lookahead-match`** → [`.cursor/commands/lookahead-match.md`](.cursor/commands/lookahead-match.md) → delegates **`lookahead-networker`** ([`.cursor/agents/lookahead-networker.md`](.cursor/agents/lookahead-networker.md)).
- **tech-stack-pulse** — [`.cursor/skills/tech-stack-pulse/SKILL.md`](.cursor/skills/tech-stack-pulse/SKILL.md): **last 7 days** of official updates vs [`docs/TECH_STACK.md`](docs/TECH_STACK.md) (Tyler’s **my tech stack**, documented in-repo), **upgrade/monitor/hold** calls, **synergies** between tools, roadmap hints.  
- **Slash:** **`/tech-stack-updates`** → [`.cursor/commands/tech-stack-updates.md`](.cursor/commands/tech-stack-updates.md) → delegates **`stack-radar`** ([`.cursor/agents/stack-radar.md`](.cursor/agents/stack-radar.md)).  
- **job-fit workflow** — [`docs/JOB_FIT_WORKFLOW.md`](docs/JOB_FIT_WORKFLOW.md): durable process for comparing job/company descriptions against Tyler's profile, now with a scorecard-first summary for quick scanning and durable learning from outcomes over time.  
- **Slash:** **`/job-fit`** → [`.cursor/commands/job-fit.md`](.cursor/commands/job-fit.md) → delegates **`job-fit-analyst`** ([`.cursor/agents/job-fit-analyst.md`](.cursor/agents/job-fit-analyst.md)).  
- **Agent:** **`job-fit-analyst`** → [`.cursor/agents/job-fit-analyst.md`](.cursor/agents/job-fit-analyst.md): evaluates fit, red flags, unknowns, and application positioning; appends scorecard rows to Google Sheets when configured; can write dated briefs under [`docs/research/`](docs/research/README.md).  
- **Integration:** [`docs/integrations/google-sheets-job-fit-tracker.md`](docs/integrations/google-sheets-job-fit-tracker.md): append-only job-fit review log in a dedicated Google Sheet through Google Workspace CLI when local config is present.  
- **lead tracking** — [`docs/integrations/google-sheets-lead-tracker.md`](docs/integrations/google-sheets-lead-tracker.md): append-only recent-contact logging to Google Sheets through Google Workspace CLI when local config is present.  
- **Slash:** **`/lead-tracker`** → [`.cursor/commands/lead-tracker.md`](.cursor/commands/lead-tracker.md) → delegates **`lead-tracker`** ([`.cursor/agents/lead-tracker.md`](.cursor/agents/lead-tracker.md)).  
- **Agent:** **`lead-tracker`** → [`.cursor/agents/lead-tracker.md`](.cursor/agents/lead-tracker.md): normalizes lead or contact notes into structured rows and syncs them when the Google Sheets target is configured locally.  
- **Cron / SDK later:** prompt an agent to run **events-scout**, **lookahead-networker**, or **stack-radar** with the matching skill path in context.

## Quality workflows

- **Evaluation:** [`.cursor/commands/evaluate-feature.md`](.cursor/commands/evaluate-feature.md) → **`feature-evaluator`** ([`.cursor/agents/feature-evaluator.md`](.cursor/agents/feature-evaluator.md)) for immediate "did we build this feature to spec?" checks.
- **Testing:** [`.cursor/commands/run-feature-tests.md`](.cursor/commands/run-feature-tests.md) → **`feature-testing-agent`** ([`.cursor/agents/feature-testing-agent.md`](.cursor/agents/feature-testing-agent.md)) for stable manifest-driven checks across one feature, impacted features, or full suites.
- **Workflow guide:** [`docs/testing/README.md`](docs/testing/README.md) explains the split, manifest contract, and suite semantics.

## Repo-defined subagents

- **feature-evaluator** — [`.cursor/agents/feature-evaluator.md`](.cursor/agents/feature-evaluator.md): evaluates a newly built feature against explicit acceptance criteria before broader regression runs.
- **feature-testing-agent** — [`.cursor/agents/feature-testing-agent.md`](.cursor/agents/feature-testing-agent.md): runs committed feature manifests and suites for targeted or broad regression coverage.
- **lead-tracker** — [`.cursor/agents/lead-tracker.md`](.cursor/agents/lead-tracker.md): captures recent contacts and follow-ups, then appends them to the configured Google Sheet when allowed.

## GitHub

Remote: [github.com/VolantTyler/AgentOS](https://github.com/VolantTyler/AgentOS)

On a new machine:

```bash
git clone https://github.com/VolantTyler/AgentOS.git
cd AgentOS
cp .env.example .env   # Windows: copy .env.example .env
```

Never commit secrets; keep `.env` local only.

## Official documentation (verify in browser; APIs evolve)

- Cursor TypeScript SDK (programmatic agents, local/cloud, MCP, **subagents**): [cursor.com/docs/api/sdk/typescript](https://cursor.com/docs/api/sdk/typescript)
- Cursor cookbook / examples: [github.com/cursor/cookbook](https://github.com/cursor/cookbook)
- Hermes Agent (alternative local multi-agent stack with explicit delegation): [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation)

## License

Specify a license when you are ready (this scaffold ships without one).
