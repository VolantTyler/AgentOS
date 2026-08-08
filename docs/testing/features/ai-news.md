# Feature manifest: ai-news

## Metadata

- **Feature slug:** `ai-news`
- **Status:** active
- **Owner workflow / area:** daily AI news pulse
- **Suite membership:** smoke, full

## Purpose

Provide a durable daily scan of the top ten AI developments across agentic AI,
applied AI, generative AI, ML research, AI science, and consumer AI, with
verified source links and a dated digest under `docs/research/`.

## Surfaces

- Files: `.cursor/agents/ai-news-scout.md`, `.cursor/commands/ai-news.md`, `.cursor/skills/ai-news-pulse/SKILL.md`, `.cursor/skills/ai-news-pulse/reference.md`, `docs/research/ai-news-*.md`, `scripts/notify-ai-news-slack.ts`
- Commands: `/ai-news`
- Routes / entry points: slash-command invocation in Cursor chat; scheduled run via `.github/workflows/daily-ai-news.yml`; Slack notify via `.github/workflows/notify-ai-news-slack.yml`
- Docs / indexes: `README.md`, `AGENTS.md`, `docs/research/README.md`, `docs/integrations/scheduled-ai-news.md`, `docs/integrations/slack-ai-news.md`
- UI surfaces: none (Slack `#news` is an external delivery surface)

## Acceptance criteria snapshot

- [ ] `/ai-news` delegates to **ai-news-scout** or follows the same workflow when delegation is unavailable.
- [ ] **ai-news-scout** follows **ai-news-pulse** skill defaults (24h window, America/New_York dating, 10 stories).
- [ ] Digests are written to `docs/research/ai-news-YYYY-MM-DD.md` unless chat-only is requested.
- [ ] Each story uses the mobile-first single-column card layout (headline, category, source link, 1–3 sentence summary); no wide top-10 table.
- [ ] Sourcing follows `docs/BOUNDARIES.md` (no invented stories or URLs).
- [ ] Scheduled automation is documented and wired to `@cursor/sdk` with `CURSOR_API_KEY`.
- [ ] Slack delivery is documented (`docs/integrations/slack-ai-news.md`) and uses `SLACK_AI_NEWS_WEBHOOK_URL` without committing the webhook.
- [ ] `npm run notify:ai-news` exists; chat + merge-to-`main` paths both reference it.

## Evaluation recipe

- Inputs needed: changed files in agents/commands/skill/docs, or a sample digest path
- Commands to run: read `.cursor/commands/ai-news.md`, `.cursor/agents/ai-news-scout.md`, and `.cursor/skills/ai-news-pulse/SKILL.md`; confirm template sections in a recent digest if present
- Manual interactions: none for repo wiring; live news research is agent work
- Expected outcomes: delegation chain, skill defaults, digest naming, boundaries reference

## Regression checks

- Verify the key files still exist:
  - `.cursor/agents/ai-news-scout.md`
  - `.cursor/commands/ai-news.md`
  - `.cursor/skills/ai-news-pulse/SKILL.md`
  - `docs/testing/features/ai-news.md`
  - `docs/integrations/scheduled-ai-news.md`
  - `docs/integrations/slack-ai-news.md`
  - `.github/workflows/daily-ai-news.yml`
  - `.github/workflows/notify-ai-news-slack.yml`
  - `scripts/scheduled/daily-ai-news.ts`
  - `scripts/notify-ai-news-slack.ts`
- Search the repo for `ai-news-scout`, `/ai-news`, and `ai-news-pulse` to confirm discoverability.
- Confirm `package.json` includes scripts `scheduled:daily-ai-news` and `notify:ai-news`.
- Confirm `.env.example` documents `SLACK_AI_NEWS_WEBHOOK_URL` and that no committed file contains a `hooks.slack.com` URL.

## Formatting / connection checks

- `README.md` and `AGENTS.md` should mention `/ai-news` and **ai-news-scout**.
- `docs/research/README.md` should list the digest naming convention.
- Workflow file should use `timezone: America/New_York` and daily morning schedule unless intentionally changed.

## Impacts

- `weekly-synthesis` (may ingest `ai-news-*.md` digests)
- `feature-quality-system` (evaluate/test gate when scheduled)

## Impacted by

- Changes to `docs/BOUNDARIES.md` sourcing rules
- `@cursor/sdk` scheduled script patterns

## Evidence expectations

- Command output: file-existence checks, repo search results
- File snippets: digest with 10 single-column story cards and primary links
- Human-check-only: verifying live news accuracy on any given day
