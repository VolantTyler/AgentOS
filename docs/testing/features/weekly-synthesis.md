# Feature manifest: weekly-synthesis

## Metadata

- **Feature slug:** `weekly-synthesis`
- **Status:** active
- **Owner workflow / area:** weekly Chief-of-Staff synthesis
- **Suite membership:** smoke, full

## Purpose

Provide a durable weekly ritual that synthesizes continuity, research digests,
and repository activity into one decision-ready brief with cross-domain
connections and sequenced next actions.

## Surfaces

List the durable places where this feature shows up.

- Files: `.cursor/agents/cos-synthesizer.md`, `.cursor/commands/weekly-synthesis.md`, `.cursor/skills/weekly-synthesis/SKILL.md`, `docs/WEEKLY_SYNTHESIS.md`, `docs/research/README.md`
- Commands: `/weekly-synthesis`
- Routes / entry points: slash-command invocation in Cursor chat or delegation from the supervisory PM thread
- Docs / indexes: `README.md`, `AGENTS.md`, `docs/CONTINUITY.md`, `docs/WEEKLY_SYNTHESIS.md`
- UI surfaces: none

## Acceptance criteria snapshot

- [ ] A dedicated `cos-synthesizer` workflow exists and references the weekly synthesis skill and ritual doc.
- [ ] `/weekly-synthesis` delegates to `cos-synthesizer` when delegation is available and falls back to equivalent inline behavior otherwise.
- [ ] The slash-command defaults remain explicit: mode `full`, anchor date in `America/New_York`, and a 7-day lookback.
- [ ] The output artifact contract remains `docs/research/cos-weekly-YYYY-MM-DD.md` unless chat-only is requested.
- [ ] The synthesizer keeps safety boundaries intact: synthesis-only behavior, no fabricated personal/work/health/contact facts, and explicit primary-evidence preference.
- [ ] The feature remains discoverable from root docs and research index docs.

## Evaluation recipe

How should `feature-evaluator` determine whether the feature currently meets
specification?

- Inputs needed: requested synthesis behavior, changed files, and expected cadence/mode/defaults
- Commands to run: inspect command, subagent, skill, and ritual docs for delegation and output rules
- Manual interactions: none required for this documentation-only repo
- Expected outcomes: delegation wiring, default parameter contract, and output template integrity all remain intact

## Regression checks

What should `feature-testing-agent` rerun later?

- Verify the key files still exist:
  - `.cursor/agents/cos-synthesizer.md`
  - `.cursor/commands/weekly-synthesis.md`
  - `.cursor/skills/weekly-synthesis/SKILL.md`
  - `docs/WEEKLY_SYNTHESIS.md`
  - `docs/research/README.md`
  - `docs/testing/features/weekly-synthesis.md`
- Search for `weekly-synthesis`, `cos-synthesizer`, and `cos-weekly-YYYY-MM-DD` in the repo to confirm wiring and naming consistency.
- Confirm `.cursor/commands/weekly-synthesis.md` still specifies:
  - mandatory delegation to `cos-synthesizer`,
  - fallback behavior when delegation is unavailable,
  - required goal/context handoff to the subagent,
  - explicit defaults for mode, anchor date timezone, lookback, and output path,
  - expected post-run response shape.
- Confirm `.cursor/agents/cos-synthesizer.md` still includes:
  - authority binding to `.cursor/skills/weekly-synthesis/SKILL.md`,
  - required read of `docs/BOUNDARIES.md`,
  - execution rules for synthesis-only behavior, no fabrication, and primary-evidence preference.
- Confirm `.cursor/skills/weekly-synthesis/SKILL.md` still includes:
  - required inputs (`docs/CONTINUITY.md`, in-window `docs/research/`, git/PR scan),
  - explicit preconditions including `docs/BOUNDARIES.md`,
  - mandatory `Connections & surprises` content,
  - `Proposed continuity updates` and `Sources index` output sections,
  - hard output constraints (max 5 recommended actions and required owner field).
- Confirm `docs/WEEKLY_SYNTHESIS.md` still documents cadence, modes, prep feeds, PM-thread ritual steps, and the "do not block synthesis on missing feeds" rule.

## Formatting / connection checks

Call out the "exists but not fully wired" failure modes.

- Required links / references:
  - `README.md` should mention weekly synthesis command and agent wiring.
  - `AGENTS.md` should list weekly synthesis files in repo layout.
  - `docs/CONTINUITY.md` should track ritual status as an active focus/habit.
- Required imports / exports / registrations: `/weekly-synthesis` should delegate to `cos-synthesizer`.
- Copy / layout / formatting expectations: output naming should remain `cos-weekly-YYYY-MM-DD.md`; command and skill docs should not drift on defaults or required sections.

## Impacts

Which older features might this one affect?

- `feature-quality-system`

## Impacted by

Which newer or adjacent features commonly affect this one?

- Any changes to repo-level command/subagent wiring conventions
- Any updates to `docs/research/` naming conventions or digest cadence
- Any workflow that changes PM-thread continuity expectations

## Evidence expectations

What evidence should count as convincing?

- Command output: file-existence checks, repo search results, and `git status`
- File snippets: slash command, subagent safety rules, skill template, and ritual doc sections
- UI artifacts: not applicable
- Human-check-only cases: none expected unless future versions require external calendars or sheet exports
