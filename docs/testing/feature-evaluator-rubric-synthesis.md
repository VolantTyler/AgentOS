# Arena synthesis — feature-evaluator rubric

**Date:** 2026-06-05  
**Artifact:** [`feature-evaluator-rubric.md`](feature-evaluator-rubric.md)

## Frame

Designed a durable meta-rubric judging whether a `feature-evaluator` run
successfully answered *"Did this feature meet its specification?"* — scoring
evaluator quality, not feature shippability.

**Arena rubric (for picking candidates):**

1. Gradeability — concrete 0–2 signals per dimension
2. Eval vs testing boundary preserved
3. Evidence discipline — verified/inferred/unknown; no pass without direct evidence
4. Output mapping to the agent's 5-part report
5. Manifest integration without per-feature duplication
6. Maintainability — one mental model a maintainer can extend

**Runners:** claude-opus-4-8-thinking-high, gpt-5.3-codex-high-fast,
gpt-5.5-high-fast, composer-2.5-fast (4 candidates, 0 dropouts).

## Pick

**Base: Candidate 1** (cross-judge 12/12; parent agreement).

Reason: D1–D5 map 1:1 to the evaluator's mandated output, D6 is a single
cross-cutting dimension, and non-negotiables live in a separate gates layer —
the cleanest extensible model.

**Runner-up:** Candidate 4 (11/12) — best graft source for gates and surface
appendix.

## Grafts

| Source | Grafted | Rejected from source |
| --- | --- | --- |
| C4 | Must-pass gates G1–G6; output-format mapping table; surface-type evidence appendix | 100-pt weighted model with 80/60 thresholds (fragile, uncalibrated) |
| C3 | Explicit routing of Regression checks / Impacts / Suite membership to `feature-testing-agent` | 0–4 adjectival scoring scale (vaguer than 0–2) |
| C2 | Minimum evidence per accepted criterion; "checklist theater" anti-pattern | Splitting uncertainty (D6) and next-action (D7) into separate dimensions (fragments 5-part mapping) |

## Convergence signal

All four candidates agreed on core invariants:

- Grade the run, not the feature
- Three verdicts only: pass / fail / needs-human-check
- No pass without verified evidence
- Manifests feed evaluation; regression checks feed testing handoff only

## Verification

- Rubric maps to `.cursor/agents/feature-evaluator.md` output format and evidence rules.
- Aligns with `docs/testing/README.md` evaluation vs testing split.
- Consumes manifest sections from `TEMPLATE.md` without duplicating per-feature checks.
- Linked from agent definition, testing README, and feature-quality-system manifest.
