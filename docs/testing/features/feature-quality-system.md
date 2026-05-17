# Feature manifest: feature-quality-system

## Metadata

- **Feature slug:** `feature-quality-system`
- **Status:** active
- **Owner workflow / area:** quality workflows
- **Suite membership:** smoke, full

## Purpose

Provide a durable split between **evaluation** and **testing** so AgentOS can:

- evaluate a newly built feature against its specification, and  
- rerun saved regression checks for one feature, impacted features, or a full suite.

## Surfaces

List the durable places where this feature shows up.

- Files: `.cursor/agents/feature-evaluator.md`, `.cursor/agents/feature-testing-agent.md`, `docs/testing/README.md`
- Commands: `.cursor/commands/evaluate-feature.md`, `.cursor/commands/run-feature-tests.md`
- Routes / entry points: `/evaluate-feature`, `/run-feature-tests`
- Docs / indexes: `README.md`, `AGENTS.md`, `docs/CONTINUITY.md`, `docs/RUNTIME_AND_AGENTS.md`
- UI surfaces: none

## Acceptance criteria snapshot

- [ ] The repo distinguishes **evaluation** from **testing** in committed docs.  
- [ ] A dedicated `feature-evaluator` workflow exists for spec-conformance checks after implementation.  
- [ ] A dedicated `feature-testing-agent` workflow exists for stable manifest-driven regression checks.  
- [ ] The testing workflow supports one-feature, impacted-feature, and suite-based runs.  
- [ ] The new quality workflows are discoverable from the repo documentation.

## Evaluation recipe

How should `feature-evaluator` determine whether the feature currently meets
specification?

- Inputs needed: the requested quality-system behavior, changed files, and expected workflow split  
- Commands to run: inspect the relevant files and confirm the described split exists  
- Manual interactions: none required for this documentation-only repo  
- Expected outcomes: separate evaluator/testing workflows, saved manifests/suites, and discoverability wiring

## Regression checks

What should `feature-testing-agent` rerun later?

- Verify the key files still exist:
  - `.cursor/agents/feature-evaluator.md`
  - `.cursor/agents/feature-testing-agent.md`
  - `.cursor/commands/evaluate-feature.md`
  - `.cursor/commands/run-feature-tests.md`
  - `docs/testing/README.md`
  - `docs/testing/features/TEMPLATE.md`
  - `docs/testing/suites/smoke.md`
  - `docs/testing/suites/full.md`
- Search for `feature-evaluator`, `feature-testing-agent`, `/evaluate-feature`, and `/run-feature-tests` in the repo to confirm discoverability wiring remains.
- Confirm `docs/testing/README.md` still documents:
  - evaluation vs testing,
  - how manifests work, and
  - suite semantics for `smoke` and `full`.

## Formatting / connection checks

Call out the "exists but not fully wired" failure modes.

- Required links / references:
  - `README.md` should mention the quality workflows.
  - `AGENTS.md` should list the new agents/commands and verification expectations.
  - `docs/CONTINUITY.md` should note the quality-system addition.
- Required imports / exports / registrations: slash-command files should delegate to the matching subagent definitions.
- Copy / layout / formatting expectations: `docs/testing/README.md` should clearly separate evaluation from testing and explain run modes plainly.

## Impacts

Which older features might this one affect?

- `events-research`
- `tech-stack-updates`

## Impacted by

Which newer or adjacent features commonly affect this one?

- Any new subagent, slash command, or documented workflow that needs durable evaluation/testing coverage.

## Evidence expectations

What evidence should count as convincing?

- Command output: file-existence checks, repo search results, and `git status`
- File snippets: the evaluator/testing docs and command definitions
- UI artifacts: not applicable
- Human-check-only cases: none expected unless a future workflow adds external integrations
