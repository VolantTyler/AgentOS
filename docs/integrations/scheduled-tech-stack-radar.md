# Scheduled tech-stack radar (GitHub Actions)

Weekly automation for the **tech-stack** workflows in AgentOS using the
[Cursor TypeScript SDK](https://cursor.com/docs/api/sdk/typescript) and GitHub
Actions.

## Schedule

| When | What |
|------|------|
| **Every Monday, 11:00** | America/New_York (`weekly-tech-stack-radar.yml`) |
| **Manual** | Actions → *Weekly tech-stack radar* → *Run workflow* |

## What runs (two steps)

The job runs **two slash-command workflow bundles** in one cloud agent session:

1. **`/tech-stack-updates`** — **stack-radar** produces
   `docs/research/tech-stack-updates-YYYY-MM-DD.md` and opens a PR when there
   are commits.
2. **`/evaluate-feature`** then **`/run-feature-tests feature tech-stack-updates`**
   — **feature-evaluator** checks spec conformance, then **feature-testing-agent**
   runs `docs/testing/features/tech-stack-updates.md` regression checks.

Step 1 is the weekly digest; step 2 is the quality gate so automation does not
silently break agents, commands, skill wiring, or the workflow itself.

> **Naming:** Only `/tech-stack-updates` is tech-stack-prefixed. Step 2 uses the
> standard AgentOS quality slash pair scoped to the `tech-stack-updates` feature.

## Prerequisites

1. **API key** — Create a user or service account key at
   [Cursor Dashboard → Integrations](https://cursor.com/dashboard/integrations).
2. **GitHub secret** — In the AgentOS repo: **Settings → Secrets and variables →
   Actions → New repository secret**
   - Name: `CURSOR_API_KEY`
   - Value: your key (never commit it).
3. **GitHub repo access** — The Cursor cloud agent must be able to clone
   `VolantTyler/AgentOS` (default in the script). Forks should set
   `GITHUB_REPOSITORY` via the workflow (already passed from `github.repository`).

## Local dry run

```bash
cp .env.example .env
# Add CURSOR_API_KEY=...

npm ci
npm run scheduled:weekly-tech-stack
```

Optional overrides:

- `GITHUB_REPOSITORY=your-org/your-fork`
- `GITHUB_REF_NAME=main`

## Files

| Path | Role |
|------|------|
| `.github/workflows/weekly-tech-stack-radar.yml` | Cron + `workflow_dispatch` |
| `scripts/scheduled/weekly-tech-stack-radar.ts` | SDK orchestration |
| `package.json` | `@cursor/sdk`, `npm run scheduled:weekly-tech-stack` |
| `docs/testing/features/tech-stack-updates.md` | Regression manifest for step 2 |

## Billing and safety

- SDK runs bill like other Cursor agent usage; see
  [usage dashboard](https://cursor.com/dashboard/usage).
- The cloud agent may commit digests and open **draft PRs** (`autoCreatePR: true`).
  Review before merge.
- Do not store household or employer secrets in workflow env; keep `.env` local only.

## Related

- Slash command: [`.cursor/commands/tech-stack-updates.md`](../../.cursor/commands/tech-stack-updates.md)
- Runtime notes: [`docs/RUNTIME_AND_AGENTS.md`](../RUNTIME_AND_AGENTS.md)
