# /tech-stack-updates — weekly stack churn & upgrade posture

You are executing the **AgentOS `/tech-stack-updates` slash command**.

## Required: run as **stack-radar** subagent

1. **Delegate** this entire request to the **`stack-radar`** subagent (`.cursor/agents/stack-radar.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.  
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Produce the weekly tech-stack digest per `.cursor/skills/tech-stack-pulse/SKILL.md`.  
   - **Context:** Any extra tools Tyler named after the slash, custom date span, or “security-only” focus.

**If delegation is unavailable**, say so once, then **you** execute the same workflow: read the skill file fully.

## Defaults (unless user overrides in the same message)

- **Window:** **last 7 days**, ending **today**, **America/New_York**.  
- **Stack source:** **`docs/TECH_STACK.md`** only, plus any tools Tyler lists in the same message.  
- **Core stack:** The **Core stack** table in `TECH_STACK.md` defines names that get **first** research attention and **separate** digest sections from the **non-core** inventory (see **tech-stack-pulse** template).  
- **Output file:** `docs/research/tech-stack-updates-YYYY-MM-DD.md` (today’s date in America/New_York).  
- **Emphasis:** **Core-first** security/releases/roadmaps; then the rest of the checklist. **Synergies / integrations** between stack elements (lead with pairs involving core tools), plus **official** upcoming-feature news for **Tyler’s tech stack** as listed in `docs/TECH_STACK.md`.

## After the subagent finishes

Reply with:

1. **Five bullets** — highest-impact **upgrade / hold / monitor** decisions (**lead with core stack** when those tools moved).  
2. **Path** to the saved digest.  
3. **Synergy callout** — one paragraph if anything cross-cutting emerged; otherwise say “no credible cross-stack signals in window.”
