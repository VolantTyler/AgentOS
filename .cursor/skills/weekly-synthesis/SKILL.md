---
name: weekly-synthesis
description: >-
  Chief-of-Staff weekly brief: synthesize docs/research digests, CONTINUITY,
  git/PR activity, and optional external notes into one cross-domain markdown
  artifact with connections, surprises, and sequenced next actions. Use when
  Tyler runs /weekly-synthesis, asks for weekly synthesis, or the PM thread
  schedules the end-of-week review ritual.
---

# Weekly synthesis — Chief-of-Staff brief

## Preconditions

1. Read [`docs/WEEKLY_SYNTHESIS.md`](../../../docs/WEEKLY_SYNTHESIS.md) for cadence, modes, and feeds.
2. Read [`docs/BOUNDARIES.md`](../../../docs/BOUNDARIES.md) — no fabricated calendar, employer, health, or contact data.
3. Read [`docs/CONTINUITY.md`](../../../docs/CONTINUITY.md) before scanning other inputs.

## Parameters (from parent)

| Parameter | Default |
| --- | --- |
| **Anchor date** | Today in **America/New_York** |
| **Lookback** | **7 days** ending anchor date (inclusive) |
| **Mode** | `full` — honor `synthesize-only` or `catch-up` if passed |
| **Output path** | `docs/research/cos-weekly-YYYY-MM-DD.md` (anchor date) |

State all parameters in the file header.

## Input gathering (`full` and `catch-up`)

### A. Repo markdown (required)

- List `docs/research/*.md` modified or dated within the window (use filename dates `YYYY-MM-DD` when present).
- Read every in-window digest fully enough to extract **3 facts** and **1 implication** each.
- Note **stale** expected feeds (e.g. no `tech-stack-updates-*` in 10+ days when weekly cadence was intended).

### B. Git / GitHub (required when tools allow)

- `git log` on `main` for the window — themes, not every commit hash.
- Open PRs: `gh pr list` (or equivalent) for repo `VolantTyler/AgentOS` — draft vs ready, branch `cursor/*` naming.
- Recently **merged** PRs in-window — link outcome to continuity focus items.

If `gh` is unavailable, use `git log` / `git branch -r` and say **PR scan limited**.

### C. Testing / features (if applicable)

- Any changes under `docs/testing/features/` or new slash commands in-window.
- Summarize evaluation/testing posture only if something ran; do not invent test results.

### D. External (optional)

- Lead tracker: read [`docs/integrations/google-sheets-lead-tracker.md`](../../../docs/integrations/google-sheets-lead-tracker.md); summarize only **Tyler-supplied** or **verified CLI** exports. Otherwise section = “Not scanned (external sheet).”
- Ad-hoc notes: bullet any freeform context the parent pasted.

### E. Skip in `synthesize-only`

Do not re-fetch the web or re-run upstream scouts; only read files already in the repo (+ git/PR as in B).

## Synthesis rules

1. **Lead with judgment**, not chronology — Executive snapshot first.
2. **Connections & surprises** is mandatory — minimum **2** cross-domain links and **1** non-obvious win or reframe.
3. **Separate facts vs inference** — label inference.
4. **Align recommendations** with [`docs/career-fit-context.md`](../../../docs/career-fit-context.md) (structure, sustainability, fit) without toxic positivity.
5. **Cap** “Recommended next week” at **5** items, ordered, each with **owner** (`Tyler`, `PM`, or `delegate:<agent-or-slash>`).

## Output

Write **`docs/research/cos-weekly-YYYY-MM-DD.md`** unless parent requested chat-only.

Use this template (fill every section; use `—` or “None this week” rather than omitting):

```markdown
# Chief-of-Staff weekly brief

- **Anchor date:** YYYY-MM-DD (America/New_York)
- **Lookback:** YYYY-MM-DD → YYYY-MM-DD (ET)
- **Mode:** full | synthesize-only | catch-up
- **Synthesizer:** cos-synthesizer (or parent inline)

## Executive snapshot

- (3–5 bullets: outcomes, risks, one-line recommendation)

## Connections & surprises

### Cross-domain links

1. …
2. …

### Unexpected wins / reframes

- …

## Domain lenses

### AgentOS & repo

- Continuity / focus movement
- PRs & merges
- Features, commands, testing

### Career & learning

- Job-fit, certifications, portfolio themes (from in-window research files only)

### Stack & tooling

- From latest `tech-stack-updates-*` in window, or “no digest in window”

### Events & networking

- From `events-*` / `networking-targets-*` in window, or gap note

### Contacts & follow-ups

- Sheet/redacted notes, or “not scanned”

### Household

- Only Tyler-supplied notes, or “not in scope this week”

## Stale or missing feeds

| Feed | Status |
| --- | --- |
| … | ran / stale / not run |

## Open threads (carry-forward)

- …

## Recommended next week

| # | Action | Owner | Why now |
| --- | --- | --- | --- |
| 1 | … | … | … |

## Proposed continuity updates

> Bullets for Tyler/PM to merge into `docs/CONTINUITY.md` (Last session + focus checkboxes). Do not edit continuity file unless parent explicitly asked.

- …

## Sources index

| Source | Path or link |
| --- | --- |
| … | … |
```

## Done when

- Output file exists (unless chat-only).
- **Connections & surprises** has substantive content, not placeholder fluff.
- **Proposed continuity updates** are copy-paste ready.
- Return to parent: **path**, **3-line summary**, **top recommended action**.
