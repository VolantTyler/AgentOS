# Slack delivery for AI news digests

Post AgentOS **`/ai-news`** digests to a Slack channel via an
[Incoming Webhook](https://api.slack.com/messaging/webhooks).

## Destination (current)

| Field | Value |
|-------|--------|
| Workspace | Glen Rock AI Club |
| Channel | `#news` |
| Mechanism | Slack Incoming Webhook |
| Secret name | `SLACK_AI_NEWS_WEBHOOK_URL` |

Never commit the webhook URL. Store it only in local `.env` and as a GitHub
Actions repository secret.

## Triggers

| Trigger | How it posts |
|---------|----------------|
| **Scheduled daily** (07:00 ET) | Cloud agent writes digest → auto-merge to `main` → [`notify-ai-news-slack.yml`](../../.github/workflows/notify-ai-news-slack.yml) posts |
| **`/ai-news` in chat** | After the digest file is written, parent/scout runs `npm run notify:ai-news -- <path>` when the webhook is in the environment |
| **Manual** | Actions → *Notify AI news Slack* → *Run workflow* with a digest path |

Chat-only mode (no file) skips Slack. If the webhook env var is missing locally,
Slack is skipped with a one-line note (same soft-fail pattern as Sheets
integrations).

### Double-post note

If a chat run posts immediately **and** that same digest later merges to `main`,
Slack may receive the digest twice. Prefer one path per digest, or pass
`--skip-slack` on the chat notify when you know merge-to-main will notify.

## Prerequisites

1. Create an Incoming Webhook for `#news` in the Glen Rock AI Club workspace
   (Slack app → Incoming Webhooks → Add to `#news`).
2. **Local:** add to `.env` (never commit):

   ```bash
   SLACK_AI_NEWS_WEBHOOK_URL=https://hooks.slack.com/services/...
   ```

3. **GitHub:** Settings → Secrets and variables → Actions → New repository
   secret → name `SLACK_AI_NEWS_WEBHOOK_URL` → paste the same URL.
4. Optional: rotate the webhook if it was ever pasted into chat or a ticket.

## Local dry run / post

```bash
cp .env.example .env
# Set SLACK_AI_NEWS_WEBHOOK_URL=...

npm ci
npm run notify:ai-news -- --dry-run docs/research/ai-news-YYYY-MM-DD.md
npm run notify:ai-news -- docs/research/ai-news-YYYY-MM-DD.md
```

`--required` makes a missing webhook fail (used in CI). The script never prints
the webhook URL.

## Message shape

Slack receives Block Kit content derived from the digest:

- Header + researched window
- Day summary
- Up to 10 story cards (headline, category, source link, short summary)
- Link back to the digest on GitHub

Digests remain public-source-only per [`docs/BOUNDARIES.md`](../BOUNDARIES.md).

## Files

| Path | Role |
|------|------|
| `scripts/notify-ai-news-slack.ts` | Parse digest → Slack payload → webhook POST |
| `.github/workflows/notify-ai-news-slack.yml` | Post on `main` pushes of `docs/research/ai-news-*.md` |
| `package.json` | `npm run notify:ai-news` |
| `.cursor/commands/ai-news.md` / skill / scout | Chat-path notify instructions |

## Related

- Digest skill: [`.cursor/skills/ai-news-pulse/SKILL.md`](../../.cursor/skills/ai-news-pulse/SKILL.md)
- Scheduled digest: [`scheduled-ai-news.md`](scheduled-ai-news.md)
- Slash command: [`.cursor/commands/ai-news.md`](../../.cursor/commands/ai-news.md)
