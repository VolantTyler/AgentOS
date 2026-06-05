# Feature-evaluator quality rubric

A durable rubric for judging whether a **`feature-evaluator` run** did its job:
did it produce an evidence-based answer to *"Did this newly built feature meet
its specification?"*

This rubric scores the **evaluator's output**, not the feature itself. A feature
can legitimately fail spec while the evaluator run scores highly — because the
evaluator correctly detected and proved the failure.

**Related docs:** [`.cursor/agents/feature-evaluator.md`](../../.cursor/agents/feature-evaluator.md), [`docs/testing/README.md`](README.md), feature manifests under [`docs/testing/features/`](features/).

---

## 1. Purpose and when to use

**Use this rubric to:**

- Grade a single `/evaluate-feature` (or `feature-evaluator`) run for quality.
- Let a human or meta-judge decide if an evaluation is trustworthy enough to
  act on (ship, fix, or escalate).
- Catch evaluator failure modes (false passes, vague verdicts, evidence-free
  claims) before they propagate into the testing stage.

**Do not use this rubric to:**

- Run regression coverage — that is `feature-testing-agent` / `/run-feature-tests`.
- Re-evaluate the feature from scratch. The grader checks the *quality of the
  evaluation*, only re-deriving feature facts when needed to confirm or refute a
  specific evaluator claim (see §5, Evidence standards).

**Evaluation vs testing boundary (must be preserved).** A run is penalized if it
behaves like a regression suite: enumerating unrelated saved checks, sweeping the
whole repo, or asserting "all features still pass." The evaluator's job is
*spec conformance for the one named feature plus immediate dependencies*. A run
is also penalized if it skips conformance and only confirms the feature "runs."

Manifest sections **Regression checks**, **Impacts**, and **Suite membership**
belong to `feature-testing-agent`. The evaluator may mention them only in next
actions, not as evidence that the feature met its original spec.

---

## 2. Scoring dimensions

Score each dimension on a 0–2 scale: **2 = meets bar**, **1 = partial**,
**0 = fails**. Concrete signals are listed so scoring is repeatable, not vibes.
Dimensions D1–D5 map 1:1 to the evaluator's required 5-part output.

### D1 — Verdict correctness and clarity
*(maps to output part 1: Verdict)*

- **2** — Exactly one of `pass` / `fail` / `needs-human-check` is stated, and it
  is consistent with the run's own checklist and evidence (see §4 decision
  rules). No hedging adjectives substituting for a verdict.
- **1** — Verdict present but weakly justified, or mildly inconsistent with the
  checklist (e.g. one unknown criterion but still `pass`).
- **0** — No clear verdict, multiple verdicts, or a verdict that contradicts the
  run's own evidence (e.g. `pass` while a criterion is marked fail).

### D2 — Spec checklist fidelity
*(maps to output part 2: Spec checklist)*

- **2** — Acceptance criteria are restated as a discrete checklist, each item
  marked `pass` / `fail` / `unknown`, and the items trace to the feature's
  stated spec or manifest **Acceptance criteria snapshot** (§6). Criteria are
  atomic (one assertion each), not bundled. Each failed item names the exact
  mismatch (expected vs observed).
- **1** — Checklist exists but is incomplete (missing a stated criterion),
  bundles multiple assertions into one line, invents criteria not grounded in
  the spec/manifest, or gives vague failure reasons.
- **0** — No per-criterion checklist, or criteria are paraphrased so loosely they
  cannot be checked ("works as expected", "looks correct").

### D3 — Evidence quality
*(maps to output part 3: Evidence)*

- **2** — Every `pass` is backed by **direct, locatable evidence**: a file path
  + line/section, a command + its output, or a UI observation + artifact. Each
  claim is tagged `verified` / `inferred` / `unknown`. No `pass` rests on
  inference alone. Each criterion marked `pass` has at least one `verified`
  item with a clear trace from evidence to criterion.
- **1** — Most claims have evidence, but at least one `pass` relies on inference
  without saying so, or evidence is named but not locatable ("the file looks
  right").
- **0** — Conclusions asserted with no evidence, or evidence is fabricated /
  unverifiable, or `verified`/`inferred`/`unknown` tagging is absent.

### D4 — Formatting and connection coverage
*(maps to output part 4: Formatting / connection notes)*

- **2** — The run inspected presentation **and** wiring appropriate to the
  surface type (docs: headings/links/anchors/index entries; UI: labels, empty/
  loading/error states; code/structured: imports, exports, registrations, field
  shape). It explicitly checks the "built but not wired" failure class and
  reports defects or confirms absence of them.
- **1** — One of formatting or connection checked but not both, or checked
  superficially (mentions links exist but did not confirm targets resolve).
- **0** — Formatting and connection ignored, or claimed clean with no evidence.

### D5 — Next actions and handoff
*(maps to output part 5: Next actions)*

- **2** — States a clear, actionable disposition: ready for `/run-feature-tests`
  (with suggested scope: feature / impacted / suite), or specific fixes required
  first (each fix tied to a failed criterion), or the exact question a human
  must resolve for `needs-human-check`. Respects the evaluation→testing handoff
  direction.
- **1** — Disposition present but generic ("fix issues then test") without tying
  to specific findings.
- **0** — No next action, or next action contradicts the verdict (e.g. `fail`
  but "proceed to regression").

### D6 — Scope and honesty discipline *(cross-cutting)*

- **2** — Stayed on the named feature + immediate dependencies; named any
  missing inputs (spec, scope, validation method) instead of guessing; did not
  overclaim. No repo-wide sweep, no invented capabilities.
- **1** — Minor scope drift or an unstated assumption that should have been
  flagged.
- **0** — Repo-wide sweep, fabricated facts, or silent guessing where inputs
  were missing.

**Max raw score: 12 (six dimensions × 2).**

---

## 3. Gradeable pass signals (quick reference)

A dimension earns **2** only if the corresponding concrete signal is present:

| Dim | Concrete "earns a 2" signal |
| --- | --- |
| D1 | Single verdict token present; matches checklist + evidence |
| D2 | N stated criteria → N atomic checklist lines, each pass/fail/unknown, traceable to spec/manifest |
| D3 | Every `pass` line cites file+location / command+output / UI+artifact, tagged verified/inferred/unknown |
| D4 | At least one formatting check **and** one connection check, each with a located result |
| D5 | Disposition names the next workflow or lists fixes mapped to failed criteria |
| D6 | Scope limited to feature + deps; gaps named explicitly |

---

## 4. Verdict decision rules

These rules let a grader check whether the run's verdict is *defensible*. The
evaluator's verdict should follow this logic; deviation costs D1 points.

- **`pass`** is defensible only when **every** acceptance criterion is `pass`
  with direct (`verified`) evidence, and no connection/formatting defect blocks
  the spec. No criterion may be `unknown`.
- **`fail`** is defensible when **at least one** acceptance criterion is
  contradicted by direct evidence (a concrete mismatch is named), regardless of
  how many others pass.
- **`needs-human-check`** is defensible when one or more criteria are `unknown`
  and cannot be resolved with available evidence (missing spec, requires
  judgment/taste, needs credentials or an environment the run cannot reach, or
  external integration not defined). The run must name *what* a human must
  decide.

**Tie-break / precedence:** any direct-evidence spec contradiction → `fail`
dominates. Otherwise any unresolved `unknown` on a real criterion →
`needs-human-check`. Only an all-`verified`-pass state → `pass`.

A run that reaches a verdict not permitted by these rules cannot score above
**1** on D1.

---

## 5. Evidence standards

Three evidence tiers, which the run must use explicitly:

| Class | Definition | May support pass? |
| --- | --- | --- |
| **verified** | Directly observed: file contents at a path, command output, or a UI artifact the run actually produced/inspected | **Yes** |
| **inferred** | Reasoned from indirect signals (naming, adjacent code, prior runs) | **No** — may support `needs-human-check` only |
| **unknown** | Not checkable with available inputs/tools | **No** — must be surfaced, not hidden |

**Hard rule: no pass without direct evidence.** If a grader finds a `pass`
backed only by inference or nothing, D3 ≤ 1 and D1 is capped at 1.

**Minimum evidence per accepted criterion:** per criterion marked `pass`, require
(1) at least one `verified` item, (2) a clear trace from evidence to criterion,
and (3) no unresolved contradictory evidence.

**Grader spot-check.** The grader should verify 1–3 of the run's load-bearing
`verified` claims against the actual repo/artifacts. If any cited evidence does
not exist or does not say what the run claims, the run scores **0** on D3 and
the verdict is treated as untrustworthy regardless of other dimensions.

### Evidence by surface type

The rubric dimensions are stable; evidence examples change by surface:

| Surface type | Typical verified evidence | D4 focus |
| --- | --- | --- |
| Docs / markdown | Snippets, link targets, index entries, search results | Headings, anchors, cross-refs, discoverability |
| Slash commands / agents | Delegation text, file existence, wiring search | Command → subagent registration |
| CLI / scripts | Command output | Exit code + relevant stdout/stderr |
| UI | Screenshot or step log | Labels, loading/empty/error states |
| API | Response sample | Shape, fields, error codes |
| External integrations | Config checks, dry runs | `needs-human-check` when credentials or live accounts are required |

---

## 6. How manifests feed the rubric

When a feature manifest exists under `docs/testing/features/`, it is the
grounding source — the rubric checks the run *against* the manifest without
re-listing per-feature checks:

| Manifest section | Feeds rubric dimension |
| --- | --- |
| **Acceptance criteria snapshot** | D2 checklist items (union with parent prompt criteria, deduplicated) |
| **Evaluation recipe** | D1 scope, D3 expected commands/interactions |
| **Formatting / connection checks** | D4 themes (not a copy-paste checklist) |
| **Evidence expectations** | D3 proof types and human-check-only cases |
| **Regression checks** | D5 next actions only — **not** evidence for pass |
| **Impacts / Suite membership** | D5 handoff scope only — **not** evaluation evidence |

**No manifest yet?** The run should evaluate against the spec/acceptance
criteria supplied in the parent prompt and *say a manifest is absent*. The
rubric still applies; D2 traces to the provided spec instead of the snapshot,
and D6 rewards the run for naming the missing manifest.

**The rubric never duplicates per-feature checks.** It checks *that* the run
honored the manifest's sections, not the feature-specific assertions themselves.

---

## 7. Output format mapping

The agent must return five sections. This rubric maps dimensions to those sections.

| Agent output section | Primary dimension | Minimum acceptable content |
| --- | --- | --- |
| **1. Verdict** | D1 | One of `pass` / `fail` / `needs-human-check` |
| **2. Spec checklist** | D2 | Criterion + `pass` / `fail` / `unknown` each |
| **3. Evidence** | D3 | `verified` / `inferred` / `unknown` labeled observations |
| **4. Formatting / connection notes** | D4 | Confirms or defects tied to spec/manifest wiring themes |
| **5. Next actions** | D5 | Fix now **or** test handoff (`/run-feature-tests` + scope) |

**Structural fail:** any of the five sections missing → matching dimension scores
**0** for presence; if verdict, checklist, or evidence is absent, overall grade
is capped at **Weak**.

---

## 8. Must-pass gates

Apply these binary gates before interpreting the raw score. A gate failure caps
the overall grade at **Weak** regardless of total:

| Gate | Rule |
| --- | --- |
| **G1 — Single question** | Report addresses *"Did this feature meet its specification?"* |
| **G2 — No false regression** | Does not claim regression coverage or suite pass/fail as spec proof |
| **G3 — Checklist exists** | At least one acceptance criterion with explicit status; if zero criteria and no manifest, verdict must be `needs-human-check` |
| **G4 — No pass on inference** | Verdict `pass` requires every `pass` checklist item backed by `verified` evidence |
| **G5 — No fabricated proof** | Cited evidence is inspectable in scope |
| **G6 — Verdict-checklist consistency** | No `pass` with any `fail` or blocking `unknown` criterion |

Additionally:

- Verdict not permitted by §4 decision rules → D1 capped at **1**, overall **Weak**.
- Spot-checked cited evidence is false (evidence theater) → D3 = **0**, overall **Weak**.

---

## 9. Anti-patterns / failure modes (auto-deductions)

Each detected anti-pattern caps the named dimension as shown:

- **False pass** — `pass` with an `unknown` criterion or inference-only evidence
  → D1 ≤ 1, D3 ≤ 1.
- **Runs ≠ conforms** — concludes success because it executed/loaded without
  checking requested behavior → D2 ≤ 1.
- **Checklist theater** — checklist repeats spec but has no criterion-level
  evidence mapping → D2 ≤ 1.
- **Regression creep** — enumerates unrelated saved checks or sweeps the whole
  repo (testing's job) → D6 ≤ 1.
- **Evidence theater** — cites files/commands that don't exist or don't show
  what's claimed → D3 = 0 (and run untrustworthy).
- **Evidence laundering** — inferred evidence presented as verified → D1 = 0, D3 = 0.
- **Verdict hedging** — no single verdict token, or prose substituted for one of
  pass/fail/needs-human-check → D1 ≤ 1.
- **Criteria invention** — checklist items not grounded in spec/manifest → D2 ≤ 1.
- **Silent gaps** — missing inputs (spec/scope/method) guessed instead of named
  → D6 = 0.
- **Wiring blindness** — declares feature ready without any connection check on a
  surface that requires registration/links/index entries → D4 ≤ 1.
- **Direction reversal** — recommends regression *instead of* fixing on a `fail`,
  or recommends nothing → D5 ≤ 1.

---

## 10. Aggregation and grade bands

Sum the six dimensions (max 12). Apply gates (§8) first.

**Bands (when no gate is tripped):**

- **Strong (10–12)** — trustworthy; act on the verdict.
- **Adequate (7–9)** — usable, but note the weak dimension(s) before acting.
- **Weak (≤6 or any gate tripped)** — do not trust the verdict; re-run the
  evaluation with the deficiency corrected.

**Rubric pass vs feature pass:** a run can earn **Strong** while correctly
returning feature **fail** or **needs-human-check**. This rubric judges
trustworthiness of the evaluation, not shippability.

---

## 11. Quick scorecard template (meta-evaluation)

```
Feature under evaluation: <slug or description>
Manifest used:            <path | none>
Evaluator verdict:        <pass | fail | needs-human-check>

Dimension                              Score (0-2)  Note
D1 Verdict correctness & clarity       [ ]          
D2 Spec checklist fidelity             [ ]          
D3 Evidence quality                    [ ]          
D4 Formatting & connection coverage    [ ]          
D5 Next actions & handoff              [ ]          
D6 Scope & honesty discipline          [ ]          
                                       -----
Raw total (/12):                       [   ]

Must-pass gates (G1–G6):
[ ] G1 Single question addressed
[ ] G2 No false regression claims
[ ] G3 Checklist present and honest
[ ] G4 No pass on inference
[ ] G5 No fabricated proof
[ ] G6 Verdict consistent with checklist

Spot-checked evidence claims hold up (checked: ____): [ ]

Grade band: Strong | Adequate | Weak
Trust the verdict?  yes | with-caveats | no
Top fix for the next run: <one line>
```
