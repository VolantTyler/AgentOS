# Feature manifest template

Use one copy of this template per durable feature or workflow you want to
evaluate and test repeatedly.

## Metadata

- **Feature slug:** `replace-me`
- **Status:** active | draft | inactive
- **Owner workflow / area:** `replace-me`
- **Suite membership:** smoke | full | custom

## Purpose

What this feature does and why it exists.

## Surfaces

List the durable places where this feature shows up.

- Files:
- Commands:
- Routes / entry points:
- Docs / indexes:
- UI surfaces:

## Acceptance criteria snapshot

Record the durable expectations that a later evaluator should be able to check.

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Evaluation recipe

How should `feature-evaluator` determine whether the feature currently meets
specification?

- Inputs needed:
- Commands to run:
- Manual interactions:
- Expected outcomes:

## Regression checks

What should `feature-testing-agent` rerun later?

- Check 1:
- Check 2:
- Check 3:

## Formatting / connection checks

Call out the "exists but not fully wired" failure modes.

- Required links / references:
- Required imports / exports / registrations:
- Copy / layout / formatting expectations:

## Impacts

Which older features might this one affect?

- `replace-me`

## Impacted by

Which newer or adjacent features commonly affect this one?

- `replace-me`

## Evidence expectations

What evidence should count as convincing?

- Command output:
- File snippets:
- UI artifacts:
- Human-check-only cases:
