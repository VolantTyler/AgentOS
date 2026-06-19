# /ai-news — daily AI top 10

You are executing the **AgentOS `/ai-news` slash command**.

## Required: run as **ai-news-scout** subagent

1. **Delegate** this entire request to the **`ai-news-scout`** subagent (`.cursor/agents/ai-news-scout.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.  
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Produce the daily AI news digest per `.cursor/skills/ai-news-pulse/SKILL.md`.  
   - **Context:** Any category focus, custom time window, or story count the user typed after `/ai-news` in the same message.

**If delegation is unavailable**, say so once, then **you** execute the same workflow: read the skill file fully.

## Defaults (unless user overrides in the same message)

- **Window:** **last 24 hours**, ending **today**, **America/New_York** (extend to 48h if thin; note in header).  
- **Story count:** **10** — headline, **up to 3 sentences** summary, **source link** each.  
- **Coverage:** agentic AI, applied AI, generative AI, ML research, AI science, consumer AI.  
- **Output file:** `docs/research/ai-news-YYYY-MM-DD.md` (today’s date in America/New_York).

## After the subagent finishes

Reply to Tyler with:

1. **The full top 10 table** (or equivalent numbered list) — headline, summary, link for each story.  
2. **Path** to the saved digest (or say if chat-only).  
3. **One sentence** on what to watch next (optional follow-up thread).
