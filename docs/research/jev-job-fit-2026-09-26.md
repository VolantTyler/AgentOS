# Jev for job-fit scoring

**Date:** 2026-09-26  
**Question:** Can TypeSafe AI’s Jev be installed and trained to score a job description against Tyler’s background, résumé, and goals?  
**Answer:** Useful as a typed first-pass score. Not installable as weights. Not trainable on this profile. Not a replacement for `/job-fit`.

## What was checked

- Launch post: [Introducing System One Models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) (2026-09-15).
- [Models](https://docs.typesafe.ai/models), [Score](https://docs.typesafe.ai/primitives/score), [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13), [JavaScript SDK](https://docs.typesafe.ai/sdk/javascript).
- Installed package: `@typesafe-ai/sdk@0.6.0` (`npm view` and `npm install` in this repo).
- Current rubric: [`docs/JOB_FIT_WORKFLOW.md`](../JOB_FIT_WORKFLOW.md).

No live Jev call was made. `TYPESAFE_API_KEY` is not configured here, and a live call would upload career context.

## Recommendation

Keep **`/job-fit` → `job-fit-analyst`** as the decision brief.

Use Jev later only as a **parallel numeric check** of the five scorecard dimensions, after its scores are compared with analyst scorecards on the same postings.

| Job-fit need | Jev | Analyst |
| --- | --- | --- |
| Five rubric scores with uncertainty | Score questions, probabilities, confidence | Writes 1–5 plus a short rationale |
| Weighted 1.0–5.0 overall and verdict bands | No. Arithmetic stays in code | Yes, with red-flag override |
| Evidence, questions, positioning | No text generation | Yes |
| Grounding in this repo’s profile | Pass the docs in `state` each call | Reads the same docs |
| Private model trained on résumé and goals | Not offered | Prompted each run |

## Install and training

**Install.** Official Jev is a hosted API (`POST /v1/systemone`). There are no weights to download. The client installed here is `@typesafe-ai/sdk@0.6.0`. A key from the TypeSafe console is required before any score is real. See [`docs/integrations/typesafe-jev-job-fit.md`](../integrations/typesafe-jev-job-fit.md).

**Training.** The models page says Jev is not fine-tuned or LoRA-adapted per customer. The same weights serve every account, trained with their RLCD method. Customization is:

1. Put identity, career-fit, and tech-stack text in `state` (already how the preview script is shaped).
2. Encode the rubric as Score criteria that describe situations, not the digits 1–5.
3. Calibrate thresholds on labeled outcomes. That is a later comparison against `/job-fit` results, not a training job.

TypeSafe also says it does not train on customer requests. Zero data retention is enterprise-only. A live preview still sends the job description and the committed career docs to TypeSafe.

## How a score would be composed

One request, seven questions, model pinned to `jev-1.13.0`:

- Scores: capability (25%), interest (15%), environment (25%), execution sustainability (25%), narrative (10%).
- Nouls: explicit environment blocker and explicit execution blocker. Printed, not applied. Jev 1.13 does not guarantee that a question and its negation add up, so the preview does not invent a cutoff.
- Code maps each expected level from 0–4 onto 1–5, then applies the workflow weights and verdict bands.
- Code also reports the modal level, because TypeSafe says not to treat the expected score as an exact magnitude.

Context size of the three committed profile docs is about 22 KB of text, inside the 32k-token state budget. Irrelevant detail still hurts accuracy, so a later version should trim `docs/TECH_STACK.md` to the lines that match the posting instead of sending the whole file every time.

## What would go wrong if Jev replaced the analyst now

- The brief would lose reasons, questions, and positioning. Those are the parts that make a 3.6 vs a 4.1 actionable.
- Uncalibrated confidence labels (`0.7` / `0.4` in the preview) are placeholders. TypeSafe says to set them from your own labeled cases.
- A severe environment miss can override the weighted average in the workflow. The preview does not do that automatically, because no threshold has been measured.
- Company facts that are not in the posting would be missing. Jev will not go look them up, and it should not invent them.

## Verification in this change

`npm run job-fit:jev-preview -- --self-check` checks the rubric shape, the weight sum, the 0–4 → 1–5 map, tie-breaking toward the lower level, and that blocker probabilities do not rewrite the verdict.

`--dry-run --jd <file>` prints byte sizes and question names and does not call the API.
