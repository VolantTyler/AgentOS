---
name: job-fit
description: >-
  Evaluates a job description and company against Tyler's documented strengths,
  constraints, and preferred environments using a scorecard-first brief. Checks
  the job-fit tracker sheet and saved briefs for duplicates before analysis.
  Use when Tyler runs /job-fit, asks for job-fit analysis, or wants to compare
  a role or company to his career-fit profile.
disable-model-invocation: true
---

# Job-fit evaluation

## Authority

Read these before analysis:

1. `docs/JOB_FIT_WORKFLOW.md`
2. `docs/integrations/google-sheets-job-fit-tracker.md`
3. `docs/identity-brief.md`
4. `docs/career-fit-context.md`
5. `docs/TECH_STACK.md`
6. `docs/CONTINUITY.md`

Delegate the full analysis to **`job-fit-analyst`** only after duplicate checks pass or Tyler explicitly overrides.

## Duplicate prevention (run first)

**Before** running job-fit analysis or delegating to `job-fit-analyst`, check whether this role was already evaluated.

### Extract match keys from the request

Infer when possible from pasted JD text, URL, or Tyler's message:

1. **Company** — employer name
2. **Role title** — job title
3. **Job posting URL** — when supplied

If company or role title cannot be inferred with reasonable confidence, ask Tyler for both before duplicate lookup or analysis.

### Normalize for comparison

Apply to company, role title, and URL:

- trim whitespace
- lowercase
- collapse repeated internal spaces
- strip common legal suffixes from company (`inc`, `llc`, `corp`, `ltd`, `co`)
- strip punctuation except URL path segments

### Where to look

1. **Google Sheet (preferred)** — when `JOB_FIT_TRACKER_SPREADSHEET_ID` is set and `gws` works:
   - `source .env` then read with the integration doc's read-back command.
   - Columns: **Reviewed At** (A), **Company** (B), **Role Title** (C), **Overall Score** (D), **Verdict** (E), **Job Posting URL** (I), **Brief Path** (J).
2. **Saved briefs (fallback)** — scan `docs/research/job-fit-*.md` for matching company + role in the Snapshot section when the sheet is unavailable.

### Match rules

Treat as a **duplicate** when any of these hold:

- Normalized **company + role title** both match an existing row or brief.
- A **job posting URL** is provided and matches an existing row's URL (even if title text differs slightly).

When multiple rows match, use the **most recent** by **Reviewed At**.

### On duplicate — stop and notify

Do **not** run analysis or append a row. Reply with:

1. **Duplicate detected** — one sentence naming company and role.
2. **Existing analysis** — **Reviewed at** date, **Overall score** (1.0–5.0), and **Verdict**.
3. **Optional context** — one-line call, brief path, or job URL from the matched row when helpful.
4. **Next step** — tell Tyler he can ask for a **new entry** if he wants a fresh analysis anyway (re-score, updated JD, or changed context).

Suggested user-facing shape:

```markdown
## Duplicate detected

You already have a job-fit analysis for **[Company] — [Role title]**.

- **Reviewed:** [date]
- **Overall score:** [score]
- **Verdict:** [verdict]

Reply **new entry** (or "re-analyze" / "force new") to run a fresh evaluation and append another row.
```

### Override — proceed with new analysis

Run the normal workflow when Tyler's message includes any of:

- `new entry`
- `new analysis`
- `re-analyze` / `reanalyze`
- `force new`
- `analyze again`
- `run anyway`

On override, delegate to `job-fit-analyst` and append a new sheet row as usual. Note in **Notes** that this was an intentional re-run.

## Normal workflow (no duplicate, or override)

1. Complete duplicate check (above).
2. Delegate to **`job-fit-analyst`** with goal + context from the slash command.
3. Return scorecard-first output per `docs/JOB_FIT_WORKFLOW.md`.
4. Append sheet row when configured unless Tyler said `chat-only` or `do not sync`.

## Defaults

- **Output:** chat-first, scorecard at top.
- **Persistence:** save dated note only when Tyler asks to `save`, `archive`, or keep the evaluation.
- **Sheet sync:** append on every completed analysis when `gws` and config are available. When cloud/local sync is unavailable, include a copy-paste `ROW_JSON` and point Tyler to **Sync job-fit row to sheet** (GitHub Actions) — see `docs/integrations/scheduled-job-fit-sheet-sync.md`.
