# Runtime and agent loops

**Last reviewed:** 2026-05-13 (verify links before major design changes.)

## Question: “Cursor SDK Agent Kit” vs Hermes?

There is not a separate branded **“Agent Kit”** in the official Cursor docs reviewed on this date. The programmable surface is the **Cursor TypeScript SDK** (`@cursor/sdk`) documented at [cursor.com/docs/api/sdk/typescript](https://cursor.com/docs/api/sdk/typescript). That SDK exposes local and cloud runtimes, streaming, resume, MCP configuration, and **named subagents**.

### Cursor TypeScript SDK — when it fits

Use `@cursor/sdk` when you want **Cursor’s agent** (models, tools, cloud/local execution) driven from your own Node/TypeScript code: CI jobs, CLIs, services, scheduled runs, and multi-turn workflows with `Agent.create` / `Agent.resume`.

**Subagents (built in):** The same documentation describes defining subagents inline on `Agent.create({ agents: { ... } })` and via repo files under `.cursor/agents/*.md` with frontmatter (`name`, `description`, optional `model`). The parent agent spawns them through the agent runtime’s task/delegation path — you do not need a third-party “kit” for that pattern if you stay on Cursor’s stack.

**Agent loops:** Your application code owns the outer loop (react to results, branch, schedule, aggregate). The SDK gives you runs, streaming, cancellation, conversation inspection, and durable agents across process restarts (`Agent.resume`). That is the usual split: **orchestration in your code**, **execution inside Cursor agents**.

### Hermes Agent — when it fits

[Hermes Agent](https://github.com/NousResearch/hermes-agent) is a separate open-source project (Nous Research) with explicit **delegation** and multi-agent workflows documented in their user guide (for example [Subagent delegation](https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation)). Recent releases emphasize multi-agent boards, profiles, and resilient loops — useful if you want a **standalone** local agent OS that is not tied to Cursor’s runtime.

### Practical recommendation for AgentOS

1. **Default path:** Build on **`@cursor/sdk` + repo-defined subagents** so Chief-of-Staff automation aligns with the same agent capabilities you already use in Cursor, with subagent definitions versioned beside the project.
2. **Add Hermes (or another orchestrator)** if you later need deep local-first multi-agent orchestration independent of Cursor billing/APIs, or Hermes-specific UX (profiles, kanban workers, etc.).

## References (official / upstream)

| Topic | URL |
| --- | --- |
| Cursor TS SDK | https://cursor.com/docs/api/sdk/typescript |
| Cursor cookbook | https://github.com/cursor/cookbook |
| Hermes delegation | https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation |
| Hermes releases (feature timeline) | https://github.com/NousResearch/hermes-agent/releases |

## Security note

Any runtime that can call tools (shell, MCP, network) is only as safe as its policy, secrets handling, and review gates. Keep `.env` out of git; document required env vars in `.env.example` when scripts exist.
