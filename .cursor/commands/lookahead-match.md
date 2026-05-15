# /lookahead-match — prep high-signal networking targets

You are executing the **AgentOS `/lookahead-match` slash command**.

## Required: run as **lookahead-networker** subagent

1. **Delegate** this entire request to the **`lookahead-networker`** subagent (`.cursor/agents/lookahead-networker.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.  
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Turn a saved event digest into a networking-targets brief using `.cursor/skills/lookahead-networker/SKILL.md`.  
   - **Context:** Any explicit event name, file path, attendance status, topic or company bias, or `save` / `archive` instruction Tyler typed after the slash.

**If delegation is unavailable**, say so once, then **you** perform the same workflow yourself: read `.cursor/skills/lookahead-networker/SKILL.md` fully and ground the result in `docs/career-fit-context.md`.

## Defaults (unless user overrides in the same message)

- **Input digest:** latest `docs/research/events-YYYY-MM-DD.md`; if none exist, try legacy `docs/research/events-research-YYYY-MM-DD.md`.  
- **Event choice:** if Tyler does not name one, choose the strongest-fit single event from the digest; if there is a real tie, ask Tyler to pick rather than guessing.  
- **Persistence:** save to `docs/research/networking-targets-YYYY-MM-DD-<eventslug>.md`.  
- **Audience filter:** prioritize engineering leads, founders, research or product builders, and technical PMs with clear agent relevance; skip pure marketing or sales contacts.

## After the subagent finishes

Reply with:

1. **Top 3 targets** — each with a one-line reason.  
2. **Path** to the saved networking brief (or say `chat-only`).  
3. **Human checks** still worth doing before the event.
