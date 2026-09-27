# Feature manifest: jev-job-fit-preview

## Metadata

- **Feature slug:** `jev-job-fit-preview`
- **Status:** active
- **Owner workflow / area:** job-fit research preview
- **Suite membership:** full

## Purpose

Show whether TypeSafe Jev can score the existing job-fit rubric, without replacing `/job-fit` or uploading career context during local checks.

## Surfaces

- Files: `scripts/job-fit-jev-preview.ts`, `package.json`, `.env.example`, `docs/integrations/typesafe-jev-job-fit.md`, `docs/research/jev-job-fit-2026-09-26.md`, `docs/JOB_FIT_WORKFLOW.md`, `docs/CONTINUITY.md`
- Commands: `npm run job-fit:jev-preview -- --self-check`
- Routes / entry points: `npm run job-fit:jev-preview`
- Docs / indexes: `docs/research/README.md`, `docs/integrations/typesafe-jev-job-fit.md`
- UI surfaces: none

## Acceptance criteria snapshot

- [ ] `@typesafe-ai/sdk` is a dependency and the script typechecks with the repo `tsconfig`.
- [ ] `--self-check` passes without `TYPESAFE_API_KEY` and without a network call.
- [ ] `--dry-run --jd <file>` reports `network: not called` and does not require an API key.
- [ ] `--live` without `TYPESAFE_API_KEY` exits non-zero and does not claim a score.
- [ ] The written scorecard path remains `/job-fit` and `job-fit-analyst`. The preview does not append sheet rows.
- [ ] Docs state that Jev weights cannot be installed or fine-tuned on this profile.

## Evaluation recipe

- Inputs needed: this manifest, `docs/research/jev-job-fit-2026-09-26.md`, and `scripts/job-fit-jev-preview.ts`.
- Commands to run:
  - `npm run job-fit:jev-preview -- --self-check`
  - `npx tsc --noEmit`
- Manual interactions: none.
- Expected outcomes: self-check prints `job-fit Jev preview self-check passed`. Typecheck exits 0. The research note recommends keeping the analyst for the written brief.

## Regression checks

- Check 1: `npm run job-fit:jev-preview -- --self-check` exits 0.
- Check 2: `npm run job-fit:jev-preview -- --dry-run --jd docs/research/jev-job-fit-2026-09-26.md` prints `"network": "not called"`. The research note is only a stand-in text file for the dry-run, not a job description being scored for real.
- Check 3: `npm run job-fit:jev-preview -- --live --jd docs/research/jev-job-fit-2026-09-26.md` with `TYPESAFE_API_KEY` unset exits non-zero and mentions the missing key.

## Formatting / connection checks

- Required links / references: `docs/JOB_FIT_WORKFLOW.md` links the integration note; `docs/CONTINUITY.md` records the decision; `.env.example` names `TYPESAFE_API_KEY`.
- Required imports / exports / registrations: `package.json` script `job-fit:jev-preview`.
- Copy / layout / formatting expectations: research note separates install, training, and why the analyst stays.

## Impacts

- `job-fit-tracker` — adjacent. This preview must not append tracker rows or skip the duplicate gate.

## Impacted by

- `job-fit-tracker` — rubric weights and verdict bands live in `docs/JOB_FIT_WORKFLOW.md`. If those change, update `DIMENSION_WEIGHTS` and `verdictFor` together.

## Evidence expectations

- Command output from `--self-check`, `--dry-run`, and a keyless `--live` failure.
- File snippets: pinned model `jev-1.13.0`, five score questions, two noul signals.
- UI artifacts: none.
- Human-check-only cases: a real `--live` score once Tyler adds `TYPESAFE_API_KEY` locally. Do not treat an uncalibrated live score as a hiring decision.
