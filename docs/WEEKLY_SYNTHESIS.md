# Weekly synthesis ritual

**Purpose:** Once per week, turn scattered AgentOS outputs (research digests, repo changes, continuity, optional external logs) into one **Chief-of-Staff brief** that answers: what moved, what connects across domains, what surprised us, and what to do next.

This is the north-star **“done”** bar for the supervisory PM thread: synthesis, not only task completion.

## Who runs it

| Surface | When |
| --- | --- |
| **Pinned PM thread** | Tyler says “run weekly synthesis” or pastes `/weekly-synthesis` — PM may delegate or run the skill inline. |
| **`/weekly-synthesis`** | Any Cursor chat; delegates to **`cos-synthesizer`** when subagent delegation is available. |
| **Future SDK/cron** | Same skill path; pass anchor date and mode in the prompt. |

## Cadence and anchor

- **Default rhythm:** once per **calendar week**, anchored **Monday** in **America/New_York** (start-of-week review). Sunday evening is fine if that fits Tyler’s rhythm — state the anchor in the brief header.
- **Lookback window:** **last 7 days** ending on the anchor date (inclusive), unless Tyler overrides (e.g. “two-week catch-up”).
- **Time budget (human):** ~10 minutes to skim the brief; ~30 minutes if Tyler also wants to refresh stale upstream digests first (see **Prep** below).

## Modes

| Mode | Use when |
| --- | --- |
| **`full`** (default) | Normal week — gather inputs, then synthesize. |
| **`synthesize-only`** | Upstream digests and `CONTINUITY.md` are already fresh; skip re-running scouts. |
| **`catch-up`** | Missed 1–3 weeks — widen window to 14–21 days; cap “highlights” to top 10 items. |

Pass mode in the slash message: `/weekly-synthesis catch-up` or `/weekly-synthesis synthesize-only`.

## Prep (optional, same week)

Run these **before** synthesis when the corresponding artifact is missing or older than the lookback window. They are **feeds**, not substitutes for synthesis.

| Feed | Slash / agent | Default artifact | Typical cadence |
| --- | --- | --- | --- |
| Stack churn | `/tech-stack-updates` | `docs/research/tech-stack-updates-YYYY-MM-DD.md` | Weekly |
| Events | `/events-research` | `docs/research/events-YYYY-MM-DD.md` | When planning outreach or travel |
| Pre-event networking | `/lookahead-match` | `docs/research/networking-targets-YYYY-MM-DD-*.md` | After choosing an event |
| Job fit | `/job-fit` | `docs/research/job-fit-*.md` | When evaluating a role |
| Contacts | `/lead-tracker` | Google Sheet (see integration doc) | After meaningful conversations |
| Feature quality | `/evaluate-feature`, `/run-feature-tests` | Chat + manifests under `docs/testing/` | After repo feature work |

**Do not block synthesis** on every feed. If a feed is empty, say so in the brief and move on.

## Inputs the synthesizer must scan

Always read (in order):

1. [`docs/CONTINUITY.md`](CONTINUITY.md) — north star, open focus, last session blocks.
2. [`docs/identity-brief.md`](identity-brief.md) and [`docs/career-fit-context.md`](career-fit-context.md) — only for **framing** recommendations (no invented personal facts).
3. **Dated files** under [`docs/research/`](research/README.md) whose filenames or headers fall in the lookback window.
4. **Git activity** on `main` and open `cursor/*` branches: merged commits, open/merged PRs (use `gh` when available; otherwise `git log` / `git branch -r`).
5. **Testing manifests** under `docs/testing/features/` if features changed in-window.

**External (optional):**

- Lead tracker sheet — only if Tyler grants access or pastes a redacted export; never invent rows.
- Household notes — only if Tyler supplies them this week; `household-coordinator` is not auto-run.

## Output artifact

**Path:** `docs/research/cos-weekly-YYYY-MM-DD.md`  
**Date:** anchor date (Monday by default) in America/New_York.

**Git:** Commit when the brief contains only public/safe content. Move sensitive logistics to `docs/_private/` on a trusted machine.

**After save:** Propose a short **Continuity** patch (bullets for “Last session” / focus checkboxes) — PM or Tyler applies edits to `CONTINUITY.md`.

## What “good synthesis” means

1. **Cross-cutting connections** — at least two explicit links between domains (e.g. stack pulse → event workshop topic → job-fit gap).
2. **Unexpected wins** — non-obvious progress, serendipity, or reframes (not a duplicate of git commit messages).
3. **Honest gaps** — feeds not run, PRs stuck, digests stale.
4. **Decision-ready next week** — ≤5 sequenced actions with owners (`Tyler`, `delegate:…`, or `PM`).

## PM thread ritual (Tyler + pinned chat)

1. **Trigger** — “Weekly synthesis” or `/weekly-synthesis` (+ mode if needed).
2. **Delegate** — PM posts a handoff to **`cos-synthesizer`** (or runs skill if delegation unavailable).
3. **Review** — Tyler skims **Executive snapshot** and **Connections & surprises**; ignores boilerplate on busy weeks.
4. **Continuity** — Tyler approves or edits proposed `CONTINUITY.md` deltas; says **“remember this”** for anything missing.
5. **Silence rule** — If the brief is accurate and PRs are merged, no further PM work until next week or a new interrupt.

## Slash command and subagent

- **Command:** [`.cursor/commands/weekly-synthesis.md`](../.cursor/commands/weekly-synthesis.md)
- **Subagent:** [`.cursor/agents/cos-synthesizer.md`](../.cursor/agents/cos-synthesizer.md)
- **Skill (template + rules):** [`.cursor/skills/weekly-synthesis/SKILL.md`](../.cursor/skills/weekly-synthesis/SKILL.md)

## Related docs

- [`docs/CONTINUITY.md`](CONTINUITY.md) — supervisory PM model
- [`docs/research/README.md`](research/README.md) — digest index
- [`docs/RUNTIME_AND_AGENTS.md`](RUNTIME_AND_AGENTS.md) — delegation patterns
