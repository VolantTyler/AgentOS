# Feature manifest: email-ingest

## Metadata

- **Feature slug:** `email-ingest`
- **Status:** active
- **Owner workflow / area:** AgentMail inbound email intake
- **Suite membership:** smoke, full

## Purpose

Provide a durable, privacy-aware workflow for pulling inbound AgentMail messages
into AgentOS for triage (commodity reporting intake and general inbox checks),
without auto-sending replies and without committing raw email to git.

## Surfaces

- Files: `.cursor/agents/email-ingester.md`, `.cursor/commands/email-ingest.md`, `.cursor/skills/email-ingest/SKILL.md`, `docs/integrations/agentmail-email-ingest.md`, `scripts/email-ingest.ts`, `scripts/email-list-inboxes.ts`, `scripts/lib/load-env.ts`, `.env.example`, `package.json`
- Commands: `/email-ingest`
- Routes / entry points: slash-command invocation in Cursor chat; local `npm run email:ingest`
- Docs / indexes: `README.md`, `AGENTS.md`, `docs/CONTINUITY.md`, `docs/RUNTIME_AND_AGENTS.md`, `docs/research/README.md`, `docs/showcase/domains.yaml`
- UI surfaces: none

## Acceptance criteria snapshot

- [ ] A dedicated `email-ingest` workflow exists for AgentMail inbound polling.
- [ ] `/email-ingest` delegates to **email-ingester** or follows the same workflow when delegation is unavailable.
- [ ] Skill, agent, and integration doc agree on label `agentos/ingested`, private digest path, and no-outbound-by-default.
- [ ] `.env.example` documents `AGENTMAIL_API_KEY` and `AGENTMAIL_INBOX_ID`.
- [ ] `package.json` exposes `email:ingest` and `email:list-inboxes` scripts.
- [ ] Scripts depend on the `agentmail` npm package.
- [ ] Missing API key or inbox id produces an explicit blocker, not invented mail.
- [ ] Preview-only / do-not-mark paths omit `--mark`.
- [ ] Raw digests target `docs/_private/email-ingest/` (gitignored via `docs/_private/`).
- [ ] Chat triage stays redacted unless Tyler asks for detail.
- [ ] Feature is registered in smoke and full suites.
- [ ] Capability map domain includes the skill, command, and agent.

## Evaluation recipe

- Inputs needed: changed email-ingest files, acceptance criteria above
- Commands to run: confirm file existence; search for `/email-ingest`, `email-ingester`, `agentos/ingested`, `AGENTMAIL_API_KEY`; read script help/`--help` path; confirm `docs/_private/` remains gitignored
- Manual interactions: live AgentMail pull only when local credentials exist
- Expected outcomes: wiring complete; privacy and no-send defaults intact; honest blocker behavior documented

## Regression checks

- Verify key files still exist:
  - `.cursor/agents/email-ingester.md`
  - `.cursor/commands/email-ingest.md`
  - `.cursor/skills/email-ingest/SKILL.md`
  - `docs/integrations/agentmail-email-ingest.md`
  - `docs/testing/features/email-ingest.md`
  - `scripts/email-ingest.ts`
  - `scripts/email-list-inboxes.ts`
  - `scripts/lib/load-env.ts`
- Search the repo for `email-ingester`, `/email-ingest`, `agentos/ingested`, `AGENTMAIL_API_KEY`, and `AGENTMAIL_INBOX_ID`.
- Confirm `package.json` includes:
  - dependency `agentmail`
  - scripts `email:ingest` and `email:list-inboxes`
- Confirm `.env.example` defines empty `AGENTMAIL_API_KEY=` and `AGENTMAIL_INBOX_ID=`.
- Confirm `.gitignore` still ignores `docs/_private/`.
- Confirm `.cursor/commands/email-ingest.md` still requires delegation to `email-ingester` with self-run fallback.
- Confirm skill/agent/integration doc still forbid outbound send/reply by default.
- Confirm suite registration:
  - `docs/testing/suites/smoke.md` includes `email-ingest`
  - `docs/testing/suites/full.md` includes `email-ingest`
- Scenario probes:
  - Missing `AGENTMAIL_API_KEY` → `blocked`
  - Missing `AGENTMAIL_INBOX_ID` → `blocked` with list-inboxes hint
  - Empty inbox / no new messages → `empty` (not failure)
  - `preview-only` → no `--mark`
  - Successful mark path requires script evidence

## Formatting / connection checks

- `README.md` and `AGENTS.md` mention `/email-ingest` and **email-ingester**.
- `docs/CONTINUITY.md` notes the AgentMail integration.
- `docs/RUNTIME_AND_AGENTS.md` lists AgentMail polling beside other CLI-backed integrations.
- `docs/research/README.md` notes private email digests are not committed research artifacts.
- `docs/showcase/domains.yaml` includes the email domain capabilities.
- Capability map regenerated after domain edits.

## Impacts

- `feature-quality-system` (suite membership / capability map)
- Future commodity analyst reporting workflows
- Possible later overlap with lead-tracker when email contacts should be logged

## Impacted by

- Changes to `.env.example` conventions
- Changes to `docs/_private/` gitignore policy
- AgentMail SDK / API label behavior
- Any future webhook receiver that replaces polling

## Evidence expectations

- Command output: file existence, repo search, `npm run email:ingest -- --help` or script usage text
- File snippets: command, agent, skill, integration doc, env example, package scripts
- Human-check-only: live inbox pull when credentials are present
