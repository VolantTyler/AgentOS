# Feature quality workflows

AgentOS distinguishes **evaluation** from **testing**.

## Why the split exists

- **Evaluation** answers: *Did we build this feature to the requested specification?*  
- **Testing** answers: *Do the saved checks for this feature set still pass now, including related regressions?*

Keeping them separate prevents two common mistakes:

1. treating a one-off spec review as if it were a reusable regression suite, and  
2. treating a regression sweep as if it proved the new feature matches the original request.

## Quality workflow types

### 1) Feature evaluation

Use immediately after implementation or revision.

- **Subagent:** `feature-evaluator`  
- **Slash command:** `/evaluate-feature`  
- **Primary inputs:** acceptance criteria, changed files, user-visible expectations, known risks  
- **Best for:** spec conformance, formatting/presentation review, missing wiring, "is this ready for broader testing?"  
- **Quality rubric:** [`feature-evaluator-rubric.md`](feature-evaluator-rubric.md) — meta-judge whether an evaluator run was disciplined and trustworthy (grades the run, not the feature).

### 2) Feature testing

Use committed manifests for reusable checks.

- **Subagent:** `feature-testing-agent`  
- **Slash command:** `/run-feature-tests`  
- **Primary inputs:** feature slug, changed surfaces, suite name, environment limits  
- **Best for:** regression coverage, impacted-feature runs, smoke/full sweeps, stable repeatable checks

## Repository structure

`docs/testing/`

- `README.md` — this workflow guide.  
- `features/` — one manifest per feature or reusable workflow.  
- `suites/` — saved bundle definitions such as `smoke` and `full`.

## How to use this system

### For a newly built feature

1. Add or update a manifest under `docs/testing/features/`.  
2. Run **evaluation** first with `/evaluate-feature` and explicit acceptance criteria.  
3. If evaluation passes, run `/run-feature-tests` for:
   - the changed feature,  
   - impacted related features, or  
   - `suite smoke` / `suite full` as appropriate.
4. In the final user-facing handoff, include a short **Try it out** section with:
   - one `/evaluate-feature ...` example,
   - one `/run-feature-tests feature ...` example,
   - optionally `suite smoke` or `suite full`, and
   - one sentence on the expected result.

### For a risky refactor or integration change

1. Update impacted manifests if surfaces or expectations changed.  
2. Run `/run-feature-tests` in **impacted** mode first.  
3. Run `suite smoke` or `suite full` when the blast radius is broad.

## Feature manifest contract

Each feature manifest should capture enough durable truth that an agent can run
the checks later without rediscovering the intent from scratch.

Recommended sections:

- **Feature slug / status**  
- **Purpose**  
- **Surfaces** — files, routes, commands, docs, UI surfaces  
- **Acceptance criteria snapshot** — the durable expectations worth preserving  
- **Evaluation recipe** — how to judge whether the feature meets spec today  
- **Regression checks** — reusable commands, interactions, or content checks  
- **Formatting / connection checks** — layout, links, copy, registrations, exports, references  
- **Impacts / impacted by** — related features to include in targeted runs  
- **Suite membership** — `smoke`, `full`, or others  
- **Evidence expectations** — what counts as convincing proof

See `docs/testing/features/TEMPLATE.md`.

## Suite semantics

### `smoke`

Fast, high-signal checks for core capabilities and obvious wiring failures.

### `full`

All active feature manifests. Use when you want the broadest saved regression
coverage the repo currently supports.

## Impacted runs

Use **impacted** mode when a new feature or refactor may affect older behavior.
Select the changed feature manifest first, then add manifests whose **Surfaces**,
**Impacts**, or **Impacted by** sections overlap the changed scope.

## For this repository specifically

This repo is documentation-only today, so "tests" are often evidence-driven file
checks, link/reference checks, command outputs, and subagent/command wiring
validation rather than package-test commands.

Because chat is the primary interface today, prefer **slash-command examples**
in the **Try it out** section instead of inventing terminal commands or a CLI.
