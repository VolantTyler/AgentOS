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

### Slack notify (when a digest file was written)

If the run was **not** chat-only, try posting to Slack `#news`:

```bash
npm run notify:ai-news -- docs/research/ai-news-YYYY-MM-DD.md
```

- Loads `SLACK_AI_NEWS_WEBHOOK_URL` from the environment / local `.env`.
- If the webhook is missing, skip with one line in your reply — do **not** fail the command.
- Never print or commit the webhook URL.
- Use `--skip-slack` only when Tyler asked to skip Slack.
- Scheduled digests that merge to `main` are also posted by
  `.github/workflows/notify-ai-news-slack.yml` (see
  [`docs/integrations/slack-ai-news.md`](../../docs/integrations/slack-ai-news.md)).

### Reply to Tyler with

1. **The full top 10 in single-column format** — each story as a card: headline, category, source link, summary (mirror the digest file layout; no wide tables).  
2. **Path** to the saved digest (or say if chat-only).  
3. **Slack status** — posted, skipped (no webhook), or skipped by request.  
4. **One sentence** on what to watch next (optional follow-up thread).
