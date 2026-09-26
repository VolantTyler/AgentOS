# TypeSafe Jev — job-fit score preview

**Status:** research preview. `/job-fit` still uses `job-fit-analyst`. Jev is not on the default path.

## What Jev is

[Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) is TypeSafe AI’s hosted System One model (`jev-1.13.0`, alias `jev-latest` as of 2026-09-26). A request sends `state` plus typed questions. The response is a Choice, a Score, or a Noul (yes/no probability). It does not generate prose.

Official facts used here:

- Same weights for every account. [No customer fine-tune or LoRA](https://docs.typesafe.ai/models). Domain behavior comes from `state`, `instructions`, and `criteria`.
- [Not trained on customer requests](https://docs.typesafe.ai/models). Zero data retention is an enterprise option, not the default.
- [Score](https://docs.typesafe.ai/primitives/score) returns an expected level on an ordered rubric (index starts at 0), per-level probabilities, and confidence.
- [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13): keep arithmetic in code, keep state relevant, and do not ask it to write text.
- Price on the models page: **$0.042 per million input tokens**. Output tokens are free. Context: 64k tokens per request.

## Install

The model weights are not published. This repo installs the client only:

```bash
npm install @typesafe-ai/sdk@0.6.0
```

Live calls need `TYPESAFE_API_KEY` from the TypeSafe console. The key stays in `.env` or the shell. It is not committed.

## What this preview does

`scripts/job-fit-jev-preview.ts` builds one System One request:

- **State:** `docs/identity-brief.md`, `docs/career-fit-context.md`, `docs/TECH_STACK.md`, plus the job description file. It does not read `docs/_private/`.
- **Five Score questions** for capability, interest, environment, execution sustainability, and narrative. Level text describes situations. Code maps Jev’s 0–4 expectation onto the workflow’s 1–5 scale and applies the [workflow weights](../JOB_FIT_WORKFLOW.md).
- **Two Noul questions** for explicit environment and execution blockers. Their probabilities are printed. They do not change the verdict.

```bash
npm run job-fit:jev-preview -- --self-check
npm run job-fit:jev-preview -- --dry-run --jd path/to-jd.md
TYPESAFE_API_KEY=... npm run job-fit:jev-preview -- --live --jd path/to-jd.md
```

`--dry-run` and `--self-check` do not call the network. `--live` sends the career context and the job description to `https://api.typesafe.ai`.

## Why it is not the `/job-fit` scorer yet

`/job-fit` also needs evidence for and against, unknowns, recruiter questions, and a positioning angle. Jev cannot write those. A numeric score without that brief would drop the parts Tyler uses to decide.

The expected-value overall score is a code composition. TypeSafe warns that Jev 1.13 score levels are weak as exact numbers. Modal level and confidence stay in the JSON for that reason. Blocker thresholds stay unused until labeled outcomes (applied, advanced, drained, skipped) exist to calibrate them.

## Recommended next step

After several real `/job-fit` scorecards exist, run `--live` on those same JDs and compare Jev’s five dimension scores to the analyst’s scores. Adopt Jev as a first-pass numeric check only if that comparison is close enough to be useful. Keep the analyst for the written brief either way.
