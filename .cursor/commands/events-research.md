# /events-research — NYC / northern NJ + online agent events

You are executing the **AgentOS `/events-research` slash command**.

## Required: run as **events-scout** subagent

1. **Delegate** this entire request to the **`events-scout`** subagent (`.cursor/agents/events-scout.md`) using your **Task** / **subagent** / **Agent** delegation mechanism — whichever this Cursor surface exposes for **repo-defined** subagents.  
2. Pass the **goal** and **context** fields so the child receives:
   - **Goal:** Produce the events digest defined in `.cursor/skills/events-research/SKILL.md` for the parameters below.  
   - **Context:** Any date window, budget, or format constraints the user typed after `/events-research` in the same message (if none, use defaults).

**If delegation is unavailable** in this session, say so once, then **you** perform the same work yourself: read `.cursor/skills/events-research/SKILL.md` fully and complete the digest — do not skip the skill.

## Defaults (unless user overrides in the same message)

- **Date window:** next **45 days**, anchored **today** in **America/New_York**.  
- **Coverage:** **both** — local (NYC + northern NJ per skill) **and** online (AI agent orchestration scope per skill).  
- **Output file:** `docs/research/events-YYYY-MM-DD.md` using **today’s** calendar date in America/New_York.  
- **Budget / max results:** per `SKILL.md` defaults if not specified.

## After the subagent finishes

Reply to Tyler with:

1. **Five bullets** — top picks + why each fits (tie to [`docs/career-fit-context.md`](../../docs/career-fit-context.md) when useful: structure, collaboration, front-end–friendly, not vague-keynote-only).  
2. **Path** to the saved digest (or say if chat-only).  
3. **Anything that still needs a human check** (TBA times, broken links, ambiguous venues).
