# Research digests

Some digests are produced by subagents following project skills; others are durable handoff briefs written by parent agents for future sessions.

| Slash | Subagent | Skill | Output (default) |
|-------|-----------|-------|------------------|
| **`/events-research`** | `events-scout` | `events-research` | `docs/research/events-YYYY-MM-DD.md` |
| **`/lookahead-match`** | `lookahead-networker` | `lookahead-networker` | `docs/research/networking-targets-YYYY-MM-DD-<eventslug>.md` |
| **`/tech-stack-updates`** | `stack-radar` | `tech-stack-pulse` | `docs/research/tech-stack-updates-YYYY-MM-DD.md` (also **Monday 11:00 ET** via [scheduled workflow](../integrations/scheduled-tech-stack-radar.md)) |
| **`/weekly-synthesis`** | `cos-synthesizer` | `weekly-synthesis` | `docs/research/cos-weekly-YYYY-MM-DD.md` |
| **`/ai-news`** | `ai-news-scout` | `ai-news-pulse` | `docs/research/ai-news-YYYY-MM-DD.md` (also **daily 07:00 ET** via [scheduled workflow](../integrations/scheduled-ai-news.md)) |
| **`/email-ingest`** | `email-ingester` | `email-ingest` | Local-only `docs/_private/email-ingest/email-ingest-YYYY-MM-DD.md` (gitignored; not a committed research digest) |

Trigger from **`/`** menu or by asking the parent agent to run the subagent by name.

**Weekly ritual:** See [`docs/WEEKLY_SYNTHESIS.md`](../WEEKLY_SYNTHESIS.md) for cadence, upstream feeds, and PM-thread review steps.

## Other durable briefs

- `job-fit-*.md` or `job-fit-*-gaps-*.md` — job-fit comparisons, role-pattern summaries, and handoffs for follow-on agents (for example certification-program research).
- `certification-recommendations-YYYY-MM-DD.md` — program picks and learning sequence mapped to job-fit trainable gaps (see [`certification-recommendations-2026-05-20.md`](certification-recommendations-2026-05-20.md)).

**Naming:** `events-YYYY-MM-DD.md` for event discovery runs, `networking-targets-YYYY-MM-DD-<eventslug>.md` for pre-event networking briefs, `tech-stack-updates-YYYY-MM-DD.md` for stack scans, `ai-news-YYYY-MM-DD.md` for daily AI news, `cos-weekly-YYYY-MM-DD.md` for Chief-of-Staff weekly synthesis, and dated filenames for standalone handoff briefs or snapshots.

**Git:** Safe to commit if digests contain only public links and no private logistics. Move drafts with personal notes to `docs/_private/` if needed.
