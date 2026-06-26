# Scheduled daily AI news (GitHub Actions)

Daily automation for the **ai-news** workflow in AgentOS using the
[Cursor TypeScript SDK](https://cursor.com/docs/api/sdk/typescript) and GitHub
Actions.

## Schedule

| When | What |
|------|------|
| **Every day, 07:00** | America/New_York (`daily-ai-news.yml`) |
| **Manual** | Actions → *Daily AI news* → *Run workflow* |

## What runs (two steps)

The job runs **two slash-command workflow bundles** in one cloud agent session:

1. **`/ai-news`** — **ai-news-scout** produces
   `docs/research/ai-news-YYYY-MM-DD.md` and opens a PR when there are commits.
2. **`/evaluate-feature`** then **`/run-feature-tests feature ai-news`**
   — quality gate for wiring and manifest regression.

Step 1 is the daily digest; step 2 verifies agents, commands, skill, and
scheduled script remain connected.

## Prerequisites

Same as [scheduled tech-stack radar](scheduled-tech-stack-radar.md):

1. **API key** — [Cursor Dashboard → Integrations](https://cursor.com/dashboard/integrations).
2. **GitHub secret** — `CURSOR_API_KEY` on the AgentOS repo.
3. **Repo access** — Cloud agent can clone `VolantTyler/AgentOS` (or your fork via `GITHUB_REPOSITORY`).

## Local dry run

```bash
cp .env.example .env
# Add CURSOR_API_KEY=...

npm ci
npm run scheduled:daily-ai-news
```

Optional overrides:

- `GITHUB_REPOSITORY=your-org/your-fork`
- `GITHUB_REF_NAME=main`

## Files

| Path | Role |
|------|------|
| `.github/workflows/daily-ai-news.yml` | Cron + `workflow_dispatch` |
| `scripts/scheduled/daily-ai-news.ts` | SDK orchestration |
| `package.json` | `npm run scheduled:daily-ai-news` |
| `docs/testing/features/ai-news.md` | Regression manifest for step 2 |

## Billing and safety

- SDK runs bill like other Cursor agent usage.
- The cloud agent may commit digests and open **draft PRs** (`autoCreatePR: true`). Review before merge.
- Digests should contain only **public** links — no private employer or household data.

## Related

- Slash command: [`.cursor/commands/ai-news.md`](../../.cursor/commands/ai-news.md)
- Skill: [`.cursor/skills/ai-news-pulse/SKILL.md`](../../.cursor/skills/ai-news-pulse/SKILL.md)
- Runtime notes: [`docs/RUNTIME_AND_AGENTS.md`](../RUNTIME_AND_AGENTS.md)
