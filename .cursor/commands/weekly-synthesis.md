# /weekly-synthesis — weekly Chief-of-Staff brief

You are executing the **AgentOS `/weekly-synthesis` slash command**.

## Required: run as **cos-synthesizer** subagent

1. **Delegate** this entire request to the **`cos-synthesizer`** subagent (`.cursor/agents/cos-synthesizer.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Produce the weekly synthesis per `.cursor/skills/weekly-synthesis/SKILL.md` and [`docs/WEEKLY_SYNTHESIS.md`](../../docs/WEEKLY_SYNTHESIS.md).
   - **Context:** Any mode (`full`, `synthesize-only`, `catch-up`), anchor date, lookback span, or freeform notes Tyler typed after the slash.

**If delegation is unavailable**, say so once, then **you** perform the same work: read the skill and workflow doc fully — do not skip the template.

## Defaults (unless user overrides in the same message)

- **Mode:** `full`
- **Anchor date:** today in **America/New_York**
- **Lookback:** last **7 days** ending on the anchor date
- **Output file:** `docs/research/cos-weekly-YYYY-MM-DD.md` using the **anchor** calendar date

## After the subagent finishes

Reply to Tyler with:

1. **Five bullets** — executive snapshot from the brief (not a commit log).
2. **Path** to the saved brief (or chat-only note).
3. **Top connection** — one cross-domain link worth discussing.
4. **Proposed continuity** — paste the **Proposed continuity updates** section for quick approval.
5. **Optional prep** — which upstream feeds to run before next week (if any were stale).
