# AgentOS

**Agentic Chief-of-Staff** — durable planning, synthesis, and delegation across personal, household, and work contexts. This repo is the **source of truth** for how the system should behave, which runtimes we use, and what we decided last session.

## Why a repo instead of chat-only context?

Chat threads are disposable. Committed markdown, small examples, and ADR-style notes stay versioned, searchable, and portable across machines and assistants.

Start here on every new session:

1. Read [`docs/CONTINUITY.md`](docs/CONTINUITY.md) for current priorities and open threads.
2. Read [`docs/RUNTIME_AND_AGENTS.md`](docs/RUNTIME_AND_AGENTS.md) for runtime choices and agent-loop patterns.
3. Skim [`AGENTS.md`](AGENTS.md) for non-negotiables (privacy, autonomy boundaries).

## GitHub

After cloning, copy environment templates when they exist (`cp .env.example .env`) and never commit secrets.

Create the remote from this directory (once):

```bash
git init
git add .
git commit -m "Initial AgentOS scaffold"
gh repo create AgentOS --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` if you prefer a public repo (avoid committing personal data either way).

## Official documentation (verify in browser; APIs evolve)

- Cursor TypeScript SDK (programmatic agents, local/cloud, MCP, **subagents**): [cursor.com/docs/api/sdk/typescript](https://cursor.com/docs/api/sdk/typescript)
- Cursor cookbook / examples: [github.com/cursor/cookbook](https://github.com/cursor/cookbook)
- Hermes Agent (alternative local multi-agent stack with explicit delegation): [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation)

## License

Specify a license when you are ready (this scaffold ships without one).
