# Tech stack updates — 2026-06-24 (America/New_York)

- **Window:** **2026-06-17 00:00** America/New_York (EDT, UTC−04:00) → **2026-06-24 23:59** America/New_York — i.e. **2026-06-17 04:00 UTC** through **2026-06-25 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **OpenClaw (core):** **`2026.6.8` (Jun 16)**, **`2026.6.9` (Jun 21)**, and **`2026.6.10` (Jun 24)** — three stable releases in-window: Telegram/WhatsApp delivery, `/btw`, Gemini CLI OAuth isolation, Codex Hosted Search + stronger Codex harness (**`2026.6.9`**), fast-talk auto mode + Zai/GLM routing fixes (**`2026.6.10`**). **monitor → upgrade** on OpenClaw cadence; read security rows in **`2026.6.9`** before channel/plugin changes.
- **Hermes (core):** **`v0.17.0` / `v2026.6.19` (Jun 19)** — “The Reach Release”: iMessage (Photon), background subagents, Automation Blueprints, dashboard profile builder, **`grok-composer-2.5-fast`** (Cursor Composer via xAI Grok OAuth), plus a security round. **monitor** for exploratory dabbling; **upgrade** if any test deploy exists.
- **Codex (core):** **`0.141.0` (Jun 18)** — Noise relay E2E channels, cross-platform remote exec, MCP per-thread activation; **`0.142.0` (Jun 22)** — `/usage` credit redemption, rollout token budgets, indexed web-search mode, multi-agent delegation controls; **app `26.616` (Jun 18)** — Record & Replay (macOS), thread handoff local↔remote. **monitor** for OpenClaw pin alignment.
- **Cursor (core):** **`3.7` (Jun 17)** cloud env setup + `/in-cloud` subagents + local↔cloud handoff; **`3.8` (Jun 18)** `/automate` + GitHub/Slack triggers + computer use for automations; **`3.9` (Jun 22)** Customize page (plugins, skills, MCPs, subagents) + team marketplace leaderboard. **monitor** for AgentOS PR/MCP workflows.
- **Gemini (core):** **Jun 17** — TTS streaming for **`gemini-3.1-flash-tts-preview`**; **Jun 19** — unrestricted standard API keys now rejected (auth-key migration); **`gemini-3.1-flash-image-preview` / `gemini-3-pro-image-preview` shutdown tomorrow (Jun 25)**. Interactions API **GA** positions **Antigravity** as default managed agent. **upgrade / migrate** image-preview and API-key clients.
- **ChatGPT (core):** **Jun 17** — scheduled tasks + Pulse sunset; **Jun 18** — app permissions, pronunciation help, Record & Replay for Codex macOS; **Jun 22** — large-paste-as-attachment (10k threshold) for Free/Go. **monitor** rollout variance.
- **Antigravity (core):** No new IDE version in-window (**`2.1.4` remains latest, Jun 11**). **Jun 18** Gemini CLI consumer cutoff is now **past** — Antigravity CLI is the supported terminal path. **hold / monitor** until a post-**`2.1.4`** changelog lands.
- **Laravel (non-core):** **`v13.16.0` / `v13.16.1` (Jun 16)** and **`v13.17.0` (Jun 23)** — JsonSchema unions, route metadata, Postgres transaction pooler, HTTP client serialization hardening. **monitor** on app cadence.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shutdown **2026-06-25** (1 day out at window end). **Jun 19:** Gemini API rejects requests from **unrestricted standard API keys**; migrate to **auth keys**. | upgrade / migrate | [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [API keys](https://ai.google.dev/gemini-api/docs/generate-content/api-key) |
| **OpenClaw** | **`2026.6.9` (Jun 21):** security fixes — redact secrets from debug/config output, block internal HTTP session overrides, audit open-DM tool exposure, retain plugin write ownership checks. | upgrade (if deployed) | [v2026.6.9](https://github.com/openclaw/openclaw/releases/tag/v2026.6.9) |
| **Hermes** | **`v0.17.0` (Jun 19):** security round — fail-closed gateway adapters, MCP stdio exfil blocking, shell-escape denylist fix, urllib3/PyJWT CVE bumps, dashboard OAuth hardening. | upgrade (if deployed) | [v2026.6.19](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19) |
| **Codex** | **`0.141.0` (Jun 18):** authenticated **Noise relay** E2E channels for remote exec; **`0.142.0` rollout token budgets** — new spend/abortion surface for multi-agent runs. | monitor / policy | [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Cursor** | **`3.8` / `3.9`:** computer use enabled by default for automations; team/workspace-level MCP and plugin management — review trust boundaries. | monitor / policy | [Cursor changelog](https://cursor.com/changelog) |
| **Antigravity** | No in-window CVE; **Jun 18** Gemini CLI consumer cutoff is an **access/trust** boundary (terminal path now Antigravity CLI). | monitor | [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **ChatGPT** | **Jun 18** per-app permission controls (Always ask / Any changes / Important actions) — workspace consent surface. | monitor (workspace policy) | [Release notes](https://openai.com/products/release-notes/) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Laravel** | **`v13.16.0` / `v13.17.0`:** JsonSchema `$ref` expansion guard, HTTP client request/fake-response serialization hardening. **CVE-2026-48019** (email CRLF, Jun 1) remains relevant for **`< 12.60.0` / `< 13.10.0`** — pre-window. | monitor / upgrade (if affected) | [v13.17.0](https://github.com/laravel/framework/releases/tag/v13.17.0) · [GHSA-5vg9-5847-vvmq](https://github.com/laravel/framework/security/advisories/GHSA-5vg9-5847-vvmq) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **OpenClaw** | **`2026.6.8` (Jun 16):** Telegram rich delivery, WhatsApp ACP bindings, `/btw`, Gemini CLI OAuth profile isolation, GLM-5.2 + Claude Haiku 4.5 catalog, SQLite WAL-on-NFS guard, key-free web search stays opt-in. **`2026.6.9` (Jun 21):** Codex automatic plugin approvals, GPT-5.3 Spark OAuth, remote-node `exec`, standalone official provider npm plugins, Control UI session workspace rail. **`2026.6.10` (Jun 24):** fast-talk auto mode, Zai/GLM overload failover, trusted hook policies preserved, cron delivery awareness fixes. | monitor → upgrade | Reconcile **Codex** **`0.141.0`/`0.142.0`** pins; **Gemini** auth keys + image-preview IDs | [Releases](https://github.com/openclaw/openclaw/releases) · [v2026.6.10](https://github.com/openclaw/openclaw/releases/tag/v2026.6.10) |
| **Hermes** | **`v0.17.0` (Jun 19):** iMessage (Photon), Raft gateway, background subagents, image edit in `image_generate`, Automation Blueprints, desktop watch-windows, **`grok-composer-2.5-fast`**, WhatsApp Business Cloud API, Skills Hub security scan. | monitor (exploratory) | **Cursor** Composer model reachable via xAI Grok OAuth; channel patterns overlap **OpenClaw** Telegram/WhatsApp work | [v2026.6.19](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19) |
| **Codex** | **`0.141.0` (Jun 18):** Noise relay E2E, cross-platform cwd/shell preservation, per-thread stdio MCP, TUI auto-resolving prompts. **`0.142.0` (Jun 22):** `/usage` credit redemption, Curated/Workspace/Shared `/plugins`, rollout token budgets, indexed web-search mode, scheduled UTC reminders. **App `26.616` (Jun 18):** Record & Replay (macOS), automation run bulk actions, local↔remote thread handoff. | monitor → upgrade on pin | **OpenClaw `2026.6.9`** Codex rows; **ChatGPT** Record & Replay cross-surface | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.142.0](https://github.com/openai/codex/releases/tag/rust-v0.142.0) |
| **Cursor** | **`3.7` (Jun 17):** cloud env setup (~10 min), `/in-cloud` cloud subagents, `/babysit` PR pill, local↔cloud session handoff. **`3.8` (Jun 18):** `/automate` skill, Slack emoji + 5 new GitHub triggers, computer use for automation cloud agents. **`3.9` (Jun 22):** Customize page (plugins, skills, MCPs, subagents, rules, hooks), marketplace leaderboard, plugin canvases (Hex, Atlassian), GitLab/BitBucket/Azure DevOps team marketplaces. | monitor | AgentOS **`@cursor/sdk`** pin still **`^1.0.13`** — separate from IDE **3.9** train | [Cursor changelog](https://cursor.com/changelog) |
| **Gemini** | **Jun 17:** `streamGenerateContent` / Interactions `stream: true` for **`gemini-3.1-flash-tts-preview`**. Interactions API **GA** — primary interface; **Antigravity** ships as default managed agent; steps schema, background execution, managed sandboxes. **Jun 19:** unrestricted standard API keys rejected. | upgrade / migrate | **OpenClaw** hybrid Gemini + Gemma routing; **Antigravity** Interactions default agent | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Interactions GA](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/) |
| **ChatGPT** | **Jun 17:** scheduled tasks (Scheduled page; Pulse sunset for Pro). **Jun 18:** pronunciation (60+ langs), per-app permissions, sidebar pin/org, Record & Replay for Codex macOS. **Jun 22:** large pastes **>10k chars** auto-attach (Free/Go; threshold raised from 5k). | monitor | Shared account surface with **Codex**; scheduled tasks parallel **OpenClaw** cron patterns | [Release notes](https://openai.com/products/release-notes/) |
| **Antigravity** | No in-window version after **`2.1.4` (Jun 11)**. **Jun 18** Gemini CLI + Gemini Code Assist IDE extensions stopped serving consumer Pro/Ultra/free tiers (confirmed timeline). | hold / monitor | Terminal workflows → **Antigravity CLI**; IDE **`2.1.4`** PDF + `/btw` still current | [Antigravity changelog](https://antigravity.google/changelog) · [CLI transition](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **`v13.16.0` / `v13.16.1` (Jun 16)** — JsonSchema `anyOf`, `$ref` guard, `artisan dev`, HTTP client serialization hardening, queue-on-trait support. **`v13.17.0` (Jun 23)** — route metadata, Postgres transaction pooler, cache lock refresh, `without-migration-data` on dump. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md` | [v13.17.0](https://github.com/laravel/framework/releases/tag/v13.17.0) · [v13.16.0](https://github.com/laravel/framework/releases/tag/v13.16.0) |
| **@cursor/sdk** | No separate npm tag in-window; AgentOS `package.json` still pins **`^1.0.13`**. IDE **3.9** Customize/MCP changes are IDE-side, not SDK package bumps verified here. | monitor | Same ecosystem as **Cursor** **3.7–3.9** cloud/automation train | [Cursor changelog](https://cursor.com/changelog) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP** | No additional in-window primary-source releases verified beyond rows above (timeboxed). **React** latest stable remains **19.2.x** (Oct–Dec 2025 per react.dev). | not applicable / hold | **MCP `2026-07-28`** final spec still **34 days out** | [React versions](https://react.dev/versions) · [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shutdown | **2026-06-25** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Gemini** | Migrate **standard API keys** → **auth keys** (full rejection of standard keys) | **September 2026** | confirmed | [API keys](https://ai.google.dev/gemini-api/docs/generate-content/api-key) |
| **ChatGPT** | **GPT-4.5** retirement from ChatGPT (announced May 28) | **2026-06-27** | confirmed | [Release notes (May 28)](https://openai.com/products/release-notes/) |
| **Gemini** | **Veo 2.0 / 3.0** video model shutdown (announced Jun 15) | **2026-06-30** | confirmed | [Gemini API changelog (Jun 15)](https://ai.google.dev/gemini-api/docs/changelog) |
| **Gemini** | **Interactions API** — Gemini Omni (listed as “soon” at GA) | not stated | tentative | [Interactions GA blog](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/) |
| **Antigravity** | Next IDE/AGY changelog entry after **`2.1.4`** | not stated | tentative | [Antigravity changelog](https://antigravity.google/changelog) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (stateless core, mandatory headers) — RC locked **May 21** | **2026-07-28** | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **6.x** maintenance mode; **TypeScript 7** native port (`typescript-go`) | no fixed GA date in-window | tentative | [Maintenance mode issue](https://github.com/microsoft/TypeScript/issues/62963) · [typescript-go](https://github.com/microsoft/typescript-go) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle (**Beta 1** shipped **Jun 4**, pre-window) | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **Antigravity** | Interactions API **GA** ships **Antigravity** as the default **Managed Agent** (remote Linux sandbox, background execution, steps schema). | OpenClaw orchestration and any direct Gemini clients should align on Interactions + managed-agent IDs, not legacy `outputs` patterns. | [Interactions GA](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/) · [Interactions overview](https://ai.google.dev/gemini-api/docs/interactions/interactions-overview) |
| **OpenClaw** | **Codex** | **`2026.6.9`** adds Codex automatic plugin approvals, GPT-5.3 Spark OAuth, remote-node `exec`, and Hosted Search while **Codex `0.142.0`** adds rollout budgets and indexed web search. | WoW analytics deploy should bump **OpenClaw** and **Codex** pins together and re-check approval/HITL posture. | [OpenClaw v2026.6.9](https://github.com/openclaw/openclaw/releases/tag/v2026.6.9) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Cursor** | **Hermes** | **Hermes `v0.17.0`** exposes **`grok-composer-2.5-fast`** (Cursor **Composer 2.5** via xAI Grok OAuth); **Cursor `3.9`** centralizes plugins/skills/MCP on a Customize page. | Two agent surfaces can now route the same Composer family — worth comparing before paying for overlapping subscriptions. | [Hermes v0.17.0](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19) · [Cursor changelog](https://cursor.com/changelog) |
| **OpenClaw** | **Antigravity** | **OpenClaw `2026.6.8`** ships **`/btw`** CLI-backed side questions; **Antigravity `2.1.4`** (pre-window) has matching **`/btw`** ephemeral agent — terminal paths converging. | Compare HITL and gateway allowlists when evaluating side-agent patterns across projects. | [OpenClaw v2026.6.8](https://github.com/openclaw/openclaw/releases/tag/v2026.6.8) · [Antigravity changelog](https://antigravity.google/changelog) |
| **ChatGPT** | **Codex** | **Jun 18** Record & Replay for **Codex macOS**; **Jun 17** scheduled tasks in ChatGPT. | Commodity reporting and OpenClaw cron workflows have parallel “show once, repeat” and schedule primitives on the OpenAI side. | [Release notes](https://openai.com/products/release-notes/) · [Codex changelog](https://developers.openai.com/codex/changelog) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Portfolio lists **Gemini 3.1 Pro + Gemma 26b** / **Gemini 2.5 Flash + Gemma e2b** — official Interactions model table now centers **`gemini-3.1-flash-lite`**, **`gemini-3.1-pro-preview`**, **`gemini-2.5-flash`**, etc. Refresh model IDs before any OpenClaw routing change.
- **`docs/TECH_STACK.md` → Hermes Agent:** Status is still **“exploratory / early dabbling”** but **`v0.17.0`** is a major “Reach” release (iMessage, desktop, background subagents) — consider elevating monitoring posture or noting last-evaluated version.
- **`docs/TECH_STACK.md` → Antigravity:** Add note that **Gemini CLI consumer cutoff (2026-06-18)** has passed; terminal path is **Antigravity CLI** per Google blog.
- **`package.json` → `@cursor/sdk`:** Pin **`^1.0.13`** lags IDE **3.9** Customize/MCP surface — note intended SDK upgrade thread when scheduled automation needs new SDK APIs.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`, `package.json`
- [Cursor changelog](https://cursor.com/changelog) — **3.7** (Jun 17), **3.8** (Jun 18), **3.9** (Jun 22)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) — Jun 17 TTS streaming; Jun 15 deprecations (Veo, image models)
- [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [API keys migration](https://ai.google.dev/gemini-api/docs/generate-content/api-key)
- [Interactions API GA blog](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) — **v2026.6.8**, **v2026.6.9**, **v2026.6.10**
- [Hermes Agent v2026.6.19](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19)
- [Antigravity changelog](https://antigravity.google/changelog) · [Gemini CLI → Antigravity CLI blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)
- [Codex changelog](https://developers.openai.com/codex/changelog) · [Codex 0.142.0 release](https://github.com/openai/codex/releases/tag/rust-v0.142.0)
- [OpenAI release notes](https://openai.com/products/release-notes/) — ChatGPT Jun 17–22 entries
- [Laravel v13.16.0](https://github.com/laravel/framework/releases/tag/v13.16.0) · [v13.17.0](https://github.com/laravel/framework/releases/tag/v13.17.0)
- [React versions](https://react.dev/versions) · [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
- Prior digest: `docs/research/tech-stack-updates-2026-06-15.md` (continuity on Interactions `steps` migration, Jun 18 CLI cutoff)
