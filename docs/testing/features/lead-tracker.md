# Feature manifest: lead-tracker

## Metadata

- **Feature slug:** `lead-tracker`
- **Status:** active
- **Owner workflow / area:** external lead tracking
- **Suite membership:** smoke, full

## Purpose

Provide a durable workflow for capturing recent contacts and lead follow-ups as
structured rows, with optional sync to Google Sheets through Google Workspace
CLI.

## Surfaces

List the durable places where this feature shows up.

- Files: `.cursor/agents/lead-tracker.md`, `.cursor/commands/lead-tracker.md`, `docs/integrations/google-sheets-lead-tracker.md`, `.env.example`
- Commands: `/lead-tracker`
- Routes / entry points: slash-command invocation in Cursor chat
- Docs / indexes: `README.md`, `AGENTS.md`, `docs/CONTINUITY.md`, `docs/RUNTIME_AND_AGENTS.md`
- UI surfaces: none

## Acceptance criteria snapshot

- [ ] A dedicated `lead-tracker` workflow exists for turning freeform lead/contact notes into a structured row.  
- [ ] `/lead-tracker` delegates to the matching subagent or follows the same workflow itself when delegation is unavailable.  
- [ ] The Google Sheets integration doc defines a concrete `gws`-based setup and append path.  
- [ ] Local configuration for the target spreadsheet is documented in `.env.example`.  
- [ ] The workflow is discoverable from the repo docs.

## Evaluation recipe

How should `feature-evaluator` determine whether the feature currently meets
specification?

- Inputs needed: the requested lead-tracker behavior, changed files, and the desired Google Sheets connection path  
- Commands to run: inspect the relevant files, confirm the row schema, and verify the `gws` examples exist in the integration doc  
- Manual interactions: none required for the repo itself; live Sheet sync is an external human-check unless local config is available  
- Expected outcomes: slash command wiring, subagent instructions, documented sheet schema, and local config guidance

## Regression checks

What should `feature-testing-agent` rerun later?

- Verify the key files still exist:
  - `.cursor/agents/lead-tracker.md`
  - `.cursor/commands/lead-tracker.md`
  - `docs/integrations/google-sheets-lead-tracker.md`
  - `docs/testing/features/lead-tracker.md`
  - `.env.example`
- Search for `lead-tracker`, `/lead-tracker`, `LEAD_TRACKER_SPREADSHEET_ID`, and `gws sheets +append` in the repo to confirm discoverability and integration wiring.
- If `docs/CONTINUITY.md` includes employer-watch updates, verify each entry keeps an explicit lead-tracker handoff note (for example, a pending sync cue that mentions `gws` and `LEAD_TRACKER_SPREADSHEET_ID`).
- Confirm `docs/integrations/google-sheets-lead-tracker.md` still documents:
  - the sheet column layout,
  - the local config variables,
  - the append command, and
  - the read-back command.

## Formatting / connection checks

Call out the "exists but not fully wired" failure modes.

- Required links / references:
  - `README.md` should mention the lead-tracker workflow.
  - `AGENTS.md` should list the new agent/command and mention the optional local config.
  - `docs/CONTINUITY.md` should note the integration and next questions.
- Required imports / exports / registrations: `/lead-tracker` should delegate to `lead-tracker`.
- Copy / layout / formatting expectations: the integration doc should clearly show setup, append, and read commands without assuming live credentials.

## Impacts

Which older features might this one affect?

- `feature-quality-system`

## Impacted by

Which newer or adjacent features commonly affect this one?

- Any future CRM, outreach, recruiting, or calendar-follow-up integration
- Any feature that changes `.env.example` or integration-doc conventions

## Evidence expectations

What evidence should count as convincing?

- Command output: file-existence checks, repo search results, and `git status`
- File snippets: slash command, subagent, integration doc, and local config example
- UI artifacts: not applicable
- Human-check-only cases: a live Google Sheet append if the local environment is not configured
