# Feature manifest: requirement-map

## Metadata

- **Feature slug:** `requirement-map`
- **Status:** active
- **Owner workflow / area:** job application alignment tables
- **Suite membership:** smoke, full

## Purpose

Extend application prep with **`/requirement-map`**: map **every JD bullet** to Tyler's
background with labeled mapping types (direct, adjacent, stretch, gap), confidence
levels, and **third-person** paste-ready resume/cover lines. Uses local
`docs/_private/context-portfolio/` or **https://tylerstahl.dev** when private
context is unavailable. Separate from **`/job-fit`** (pursue vs skip).

## Surfaces

- Files: `.cursor/skills/requirement-mapping/SKILL.md`, `.cursor/skills/requirement-mapping/examples.md`, `.cursor/agents/requirement-mapper.md`, `.cursor/commands/requirement-map.md`, `docs/JOB_FIT_WORKFLOW.md`, `docs/identity-brief.md`
- Commands: `/requirement-map`
- Routes / entry points: slash-command invocation in Cursor chat
- Docs / indexes: `AGENTS.md`, `docs/testing/features/requirement-map.md`
- UI surfaces: none (output is markdown under `docs/research/requirement-map-*.md`)

## Acceptance criteria snapshot

- [ ] `/requirement-map` delegates to `requirement-mapper` and reads `.cursor/skills/requirement-mapping/SKILL.md`.
- [ ] Skill defines evidence hierarchy: local context-portfolio (`01`–`10`) vs **tylerstahl.dev** for cloud.
- [ ] Every JD bullet maps to one table row with type, confidence, evidence source, third-person line, and bridge note.
- [ ] Counseling / anthropology / Apple customer background is documented as always eligible for adjacent/stretch mappings.
- [ ] Default save path is `docs/research/requirement-map-YYYY-MM-DD-<company>-<role-slug>.md`.
- [ ] Skill is explicitly separate from job-fit (no duplicate gate, no scorecard by default).
- [ ] `docs/JOB_FIT_WORKFLOW.md` points to `/requirement-map` for application prep.

## Evaluation recipe

- Inputs needed: skill, subagent, command, examples, JOB_FIT_WORKFLOW cross-link, identity-brief portfolio URL
- Commands to run: file existence checks; grep for `/requirement-map`, `requirement-mapper`, `tylerstahl.dev`, `context-portfolio`
- Manual interactions: optional live run with a pasted JD on a machine with `_private` or cloud-only
- Expected outcomes: wired slash command, complete table schema, cloud fallback documented

## Regression checks

- Verify key files exist:
  - `.cursor/skills/requirement-mapping/SKILL.md`
  - `.cursor/skills/requirement-mapping/examples.md`
  - `.cursor/agents/requirement-mapper.md`
  - `.cursor/commands/requirement-map.md`
  - `docs/testing/features/requirement-map.md`
- Search for `requirement-map`, `requirement-mapper`, `tylerstahl.dev`, and `context-portfolio` in the repo.
- Confirm skill output template includes alignment table and interview prep for stretch/gap rows.

## Formatting / connection checks

- `AGENTS.md` lists skill, command, and subagent.
- `docs/JOB_FIT_WORKFLOW.md` distinguishes job-fit vs requirement-map.
- `docs/identity-brief.md` references **tylerstahl.dev** as cloud-safe portfolio source.
- Capability map regenerated via `python3 scripts/build-capability-map.py`.

## Impacts

- `job-fit-tracker` (adjacent workflow; optional cross-link in saved maps)
- Application and cover-letter prep workflows

## Impacted by

- Changes to context-portfolio file numbering or README
- Updates to tylerstahl.dev structure (skills evidence table, timeline)
- Job-fit workflow doc edits

## Evidence expectations

- File snippets: skill mapping types, command delegation block, subagent save path
- Human-check: one saved `docs/research/requirement-map-*.md` from a real JD paste
