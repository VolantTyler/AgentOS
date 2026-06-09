# Feature manifest: job-fit-tracker

## Metadata

- **Feature slug:** `job-fit-tracker`
- **Status:** active
- **Owner workflow / area:** external job-fit scorecard logging
- **Suite membership:** smoke, full

## Purpose

Extend `/job-fit` so every evaluation appends a structured scorecard row to a
dedicated Google Sheet through Google Workspace CLI when local configuration is
present.

## Surfaces

List the durable places where this feature shows up.

- Files: `.cursor/skills/job-fit/SKILL.md`, `.cursor/agents/job-fit-analyst.md`, `.cursor/commands/job-fit.md`, `docs/integrations/google-sheets-job-fit-tracker.md`, `docs/JOB_FIT_WORKFLOW.md`, `.env.example`
- Commands: `/job-fit`
- Routes / entry points: slash-command invocation in Cursor chat
- Docs / indexes: `README.md`, `AGENTS.md`, `docs/CONTINUITY.md`, `docs/RUNTIME_AND_AGENTS.md`
- UI surfaces: none

## Acceptance criteria snapshot

- [ ] `/job-fit` checks the tracker sheet (and saved briefs as fallback) for duplicate company + role or job URL **before** analysis, and surfaces prior **reviewed date**, **overall score**, and **verdict** when matched.  
- [ ] `/job-fit` proceeds to analysis only when no duplicate is found or Tyler explicitly requests a **new entry** (or equivalent override).  
- [ ] `/job-fit` defaults to appending a scorecard row on every **completed** run when `gws` and sheet config are available.  
- [ ] `job-fit` skill and `job-fit-analyst` define duplicate rules, row shape, sync rules, and honest fallback when config or CLI is missing.  
- [ ] The Google Sheets integration doc defines a concrete `gws`-based setup, read-back, duplicate-check, and append path for a separate Job Fit Tracker spreadsheet.  
- [ ] Local configuration for the target spreadsheet is documented in `.env.example`.  
- [ ] The workflow is discoverable from the repo docs.

## Evaluation recipe

How should `feature-evaluator` determine whether the feature currently meets
specification?

- Inputs needed: the requested job-fit-tracker behavior, changed files, and the desired Google Sheets connection path  
- Commands to run: inspect the relevant files, confirm the row schema, and verify the `gws` examples exist in the integration doc  
- Manual interactions: none required for the repo itself; live Sheet sync is an external human-check unless local config is available  
- Expected outcomes: slash command wiring, subagent sync instructions, documented sheet schema, and local config guidance

## Regression checks

What should `feature-testing-agent` rerun later?

- Verify the key files still exist:
  - `.cursor/skills/job-fit/SKILL.md`
  - `.cursor/agents/job-fit-analyst.md`
  - `.cursor/commands/job-fit.md`
  - `docs/integrations/google-sheets-job-fit-tracker.md`
  - `docs/testing/features/job-fit-tracker.md`
  - `.env.example`
- Search for `job-fit-tracker`, `/job-fit`, `duplicate`, `JOB_FIT_TRACKER_SPREADSHEET_ID`, and `gws sheets` in the repo to confirm discoverability and integration wiring.
- Confirm `docs/integrations/google-sheets-job-fit-tracker.md` still documents:
  - the sheet column layout,
  - the local config variables,
  - the append command, and
  - the read-back command.

## Formatting / connection checks

Call out the "exists but not fully wired" failure modes.

- Required links / references:
  - `README.md` should mention the job-fit tracker integration.
  - `AGENTS.md` should list the updated agent/command and mention the optional local config.
  - `docs/CONTINUITY.md` should note the integration and next questions.
  - `docs/JOB_FIT_WORKFLOW.md` should mention sheet logging under Phase 1.
- Required imports / exports / registrations: `/job-fit` should delegate to `job-fit-analyst` with sheet sync as the default.
- Copy / layout / formatting expectations: the integration doc should clearly show setup, append, and read commands without assuming live credentials.

## Impacts

Which older features might this one affect?

- `feature-quality-system`
- `job-fit` workflow (same subagent and slash command)

## Impacted by

Which newer or adjacent features commonly affect this one?

- Any future recruiting CRM, application tracker, or calendar integration
- Any feature that changes `.env.example` or integration-doc conventions
- Promotion of job-fit to a formal skill or SDK script

## Evidence expectations

What evidence should count as convincing?

- Command output: file-existence checks, repo search results, and `git status`
- File snippets: slash command, subagent, integration doc, and local config example
- UI artifacts: not applicable
- Human-check-only cases: a live Google Sheet append if the local environment is not configured
