# Feature manifest: job-fit-bias-audit

## Metadata

- **Feature slug:** `job-fit-bias-audit`
- **Status:** active
- **Owner workflow / area:** job-fit calibration evaluation
- **Suite membership:** smoke, full

## Purpose

Add a local `kaggle-benchmarks` task that audits the job-fit evaluator for
excessive positivity on mismatched candidates and excessive negativity on
strong adjacent-fit candidates.

## Surfaces

- Files: `job_fit_bias_audit.py`, `evals/fixtures/job-fit/bias_cases.json`, `docs/testing/features/job-fit-bias-audit.md`
- Commands: `kaggle benchmarks tasks push audit-job-fit-bias-v3 -f job_fit_bias_audit.py --wait`, `kaggle benchmarks tasks run audit-job-fit-bias-v3 -m gemini-2.5-pro -m claude-sonnet-4-20250514`
- Routes / entry points: local Python task file and Kaggle Benchmarks CLI
- Docs / indexes: `docs/CONTINUITY.md`
- UI surfaces: none

## Acceptance criteria snapshot

- [ ] Fixtures live outside the task script under `evals/fixtures/job-fit/`.
- [ ] The task uses the `@kbench.task` decorator and a structured `JobFitVerdict` schema.
- [ ] Boundary assertions catch inflated scores for poor matches and over-penalized scores for strong matches.
- [ ] The task verifies score range, expected verdict, hard-blocker consistency, and non-empty diagnostic fields.
- [ ] An LLM-as-judge assertion checks tone and reasoning neutrality.
- [ ] The runner supports fixture validation without calling an LLM.

## Evaluation recipe

- Inputs needed: requested benchmark architecture, fixture cases, and changed files.
- Commands to run: `python3 -m py_compile job_fit_bias_audit.py` and `python3 job_fit_bias_audit.py --validate-fixtures`.
- Manual interactions: Kaggle auth and remote model execution are external checks unless the local machine is already configured.
- Expected outcomes: fixtures validate locally; full benchmark execution waits on `kaggle-benchmarks` auth and configured model endpoints. Use the `audit-job-fit-bias-v3` slug because the original `audit-job-fit-bias` remote task can be left in an unrecoverable `UNSPECIFIED` state when an early push fails, and v2 retained the earlier incompatible task shape.

## Regression checks

- Verify these files still exist:
  - `job_fit_bias_audit.py`
  - `evals/fixtures/job-fit/bias_cases.json`
  - `docs/testing/features/job-fit-bias-audit.md`
- Search for `audit_job_fit_bias_v3`, `JobFitVerdict`, `assess_response_with_judge`, and `evals/fixtures/job-fit`.
- Run fixture validation before pushing the benchmark task.

## Formatting / connection checks

- The fixture file must remain JSON so non-Python tools can inspect and extend it.
- The script should fail honestly when the `kaggle-benchmarks` SDK is missing.
- The Kaggle CLI commands require authenticated local state and should not be reported as successful without direct command evidence.

## Impacts

- `job-fit-tracker`
- `feature-quality-system`

## Impacted by

- Future changes to `.cursor/skills/job-fit/SKILL.md`
- Future changes to `.cursor/agents/job-fit-analyst.md`
- Any SDK or CLI changes in `kaggle-benchmarks`

## Evidence expectations

- Command output from Python syntax compilation and fixture validation.
- If authenticated, Kaggle task push/run output for the targeted model endpoints.
- File snippets showing fixture separation, structured schema, boundary assertions, and judge assertion.
