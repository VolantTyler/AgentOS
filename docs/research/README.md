# Research digests

Some digests are produced by subagents following project skills; others are durable handoff briefs written by parent agents for future sessions.

| Slash | Subagent | Skill | Output (default) |
|-------|-----------|-------|------------------|
| **`/events-research`** | `events-scout` | `events-research` | `docs/research/events-YYYY-MM-DD.md` |
| **`/tech-stack-updates`** | `stack-radar` | `tech-stack-pulse` | `docs/research/tech-stack-updates-YYYY-MM-DD.md` |

Trigger from **`/`** menu or by asking the parent agent to run the subagent by name.

## Other durable briefs

- `job-fit-*.md` or `job-fit-*-gaps-*.md` — job-fit comparisons, role-pattern summaries, and handoffs for follow-on agents (for example certification-program research).

**Naming:** use dated filenames when the brief summarizes a discrete run or snapshot.

**Git:** Safe to commit if digests contain only public links and no private logistics. Move drafts with personal notes to `docs/_private/` if needed.
