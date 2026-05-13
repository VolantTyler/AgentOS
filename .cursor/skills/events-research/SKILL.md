---
name: events-research
description: >-
  Researches upcoming events Tyler can attend in the NYC metro and northern New
  Jersey, or online in the AI agent orchestration space (multi-agent systems, MCP,
  agent frameworks, AI engineering). Produces a dated markdown digest with verified
  links. Use when the user asks for meetups, conferences, workshops, webinars,
  hackathons, or “what should I go to” in those geographies or topics; use before
  travel planning or when refreshing a recurring events list (e.g. cron-driven run).
disable-model-invocation: true
---

# Events research (NYC / northern NJ + online agent orchestration)

## Scope

**Local (in-person or hybrid with a physical NJ/NYC venue):**

- **New York City** — all five boroughs.
- **Northern New Jersey** — Bergen, Essex, Hudson, Morris, Passaic, Sussex, Union (north of I-78 unless Tyler specifies otherwise), Warren; Jersey City / Newark corridor included.

If Tyler gives a stricter radius (e.g. “within 30 minutes of …”), override defaults.

**Online:**

- **AI agent orchestration** and adjacent topics: multi-agent systems, agent frameworks, tool-using agents, **MCP**, orchestration patterns, evaluations for agents, “AI engineer” style shipping with LLMs, Cursor-style agentic dev **when framed as industry events**, not product support.

Exclude generic “data/ML” conferences unless they have a **clear agent/orchestration track** Tyler could use.

## Before searching

Confirm (ask if missing):

1. **Date window** (e.g. next 30 / 60 / 90 days) and timezone **America/New_York** for local listings.
2. **Format:** in-person only, online only, or both.
3. **Budget:** free-only vs paid OK; cap if given.
4. **Max results** (default 12–20 before deduping and ranking).

## How to research

1. **Prefer primary sources:** official conference / meetup / venue pages; organizer sites; Google/OpenCollective/Luma/Eventbrite **event pages** linked from official announcements.
2. **Use web search or fetch** when available; never invent dates, prices, venues, or URLs. If a listing is ambiguous, say **uncertain** and what to verify.
3. **Deduplicate** the same event across platforms (Meetup vs Luma vs X post).
4. **Recency:** Prefer agendas and CfPs that mention agents, orchestration, or MCP. Drop stale pages (past year’s landing page with no 2026/2027 dates).
5. **Honesty:** If nothing credible turns up, report **empty result** and suggest broader keywords or a wider radius — see repo [`docs/BOUNDARIES.md`](../../../docs/BOUNDARIES.md).

## Ranking (brief)

Boost: explicit agent/orchestration content; reputable organizers; Tyler’s **career-fit** (collaborative, structured learning, front-end–friendly hackathons OK).  
Deprioritize: vague “AI future” keynotes with no builder content; events with no agenda and no named venue for “local.”

## Output

Write **one** markdown digest using this template. Default path: `docs/research/events-YYYY-MM-DD.md` (create `docs/research/` if missing). For ad-hoc chat-only runs, paste the same template in the reply instead of committing unless Tyler asks to save.

```markdown
# Events digest — [TITLE / THEME]

- **Researched:** [ISO date] (America/New_York)
- **Window:** [start] → [end]
- **Filters:** [local | online | both], [budget], [other]

## Summary

[2–4 sentences: what’s worth Tyler’s attention]

## Local (NYC / northern NJ)

| Event | When (ET) | Where | Cost | Why relevant | Link |
|-------|-------------|--------|------|----------------|------|
| … | … | … | … | … | … |

## Online (agent orchestration)

| Event | When (TZ) | Format | Cost | Why relevant | Link |
|-------|------------|--------|------|----------------|------|
| … | … | … | … | … | … |

## Uncertain / needs human check

- [Bullet list: broken pages, TBA dates, registration not open]

## Searches performed (for audit)

- [Short list of queries or sources consulted]
```

## Cron / automation (later)

This skill is **instructions**, not a scheduler. For a future cron:

- Invoke an agent (Cursor SDK, cloud agent, or CLI) with a prompt like:  
  `Apply the AgentOS project skill events-research. Date window: next 14 days. Write docs/research/events-<today>.md and summarize in 5 bullets.`
- Commit the digest only if Tyler wants history in git; otherwise keep artifacts local or in `_private`.

## Extra reference

Optional deeper source hints: [reference.md](reference.md)

## Invocation

- **Chat:** Type **`/events-research`** (loads `.cursor/commands/events-research.md`) — parent agent should delegate to the **`events-scout`** subagent.  
- **Direct:** Spawn **`events-scout`** (`.cursor/agents/events-scout.md`) whenever the user asks for this research without the slash.
