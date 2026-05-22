# Feature manifest: tech-stack-updates

## Metadata

- **Feature slug:** `tech-stack-updates`
- **Status:** active
- **Owner workflow / area:** weekly tech stack pulse
- **Suite membership:** smoke, full

## Purpose

Provide a durable weekly scan of official vendor changelogs and security notices
against `docs/TECH_STACK.md`, with core-first sectioning, upgrade/monitor/hold
recommendations, synergies, and a dated digest under `docs/research/`.

## Surfaces

- Files: `.cursor/agents/stack-radar.md`, `.cursor/commands/tech-stack-updates.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`, `.cursor/skills/tech-stack-pulse/reference.md`, `docs/TECH_STACK.md`, `docs/research/tech-stack-updates-*.md`
- Commands: `/tech-stack-updates`
- Routes / entry points: slash-command invocation in Cursor chat; scheduled run via `.github/workflows/weekly-tech-stack-radar.yml`
- Docs / indexes: `README.md`, `AGENTS.md`, `docs/research/README.md`, `docs/integrations/scheduled-tech-stack-radar.md`
- UI surfaces: none

## Acceptance criteria snapshot

- [ ] `/tech-stack-updates` delegates to **stack-radar** or follows the same workflow when delegation is unavailable.
- [ ] **stack-radar** follows **tech-stack-pulse** skill defaults (7d window, America/New_York dating, core vs non-core sections).
- [ ] Digests are written to `docs/research/tech-stack-updates-YYYY-MM-DD.md` unless chat-only is requested.
- [ ] Sourcing follows `docs/BOUNDARIES.md` (no invented versions/CVEs).
- [ ] Scheduled automation is documented and wired to `@cursor/sdk` with `CURSOR_API_KEY`.

## Evaluation recipe

- Inputs needed: changed files in agents/commands/skill/docs, or a sample digest path
- Commands to run: read `.cursor/commands/tech-stack-updates.md`, `.cursor/agents/stack-radar.md`, and `.cursor/skills/tech-stack-pulse/SKILL.md`; confirm template sections in a recent digest if present
- Manual interactions: none for repo wiring; live vendor research is agent work
- Expected outcomes: delegation chain, skill defaults, digest naming, boundaries reference

## Regression checks

- Verify the key files still exist:
  - `.cursor/agents/stack-radar.md`
  - `.cursor/commands/tech-stack-updates.md`
  - `.cursor/skills/tech-stack-pulse/SKILL.md`
  - `docs/testing/features/tech-stack-updates.md`
  - `docs/integrations/scheduled-tech-stack-radar.md`
  - `.github/workflows/weekly-tech-stack-radar.yml`
  - `scripts/scheduled/weekly-tech-stack-radar.ts`
- Search the repo for `stack-radar`, `/tech-stack-updates`, and `tech-stack-pulse` to confirm discoverability.
- Confirm `docs/TECH_STACK.md` still has a **Core stack** section referenced by the skill and command.
- Confirm `package.json` includes `@cursor/sdk` and script `scheduled:weekly-tech-stack`.

## Formatting / connection checks

- `README.md` and `AGENTS.md` should mention `/tech-stack-updates` and **stack-radar**.
- `docs/research/README.md` should list the digest naming convention.
- Workflow file should use `timezone: America/New_York` and Monday 11:00 schedule unless intentionally changed.

## Impacts

- `feature-quality-system`

## Impacted by

- Changes to `docs/TECH_STACK.md` core stack table, tech-stack-pulse skill template, or stack-radar agent rules.

## Evidence expectations

- File existence and grep-based wiring checks
- Latest digest file optional for human review; not required for smoke pass
