# Tech stack updates — 2026-06-27 (America/New_York)

- **Window:** **2026-06-20 00:00** America/New_York (EDT, UTC−04:00) → **2026-06-27 23:59** America/New_York — i.e. **2026-06-20 04:00 UTC** through **2026-06-28 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini (core):** **Jun 19** enforcement (start of window) — unrestricted **standard API keys** rejected; **Jun 25** — **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shut down; **Jun 24** — **Computer Use** public preview on **`gemini-3.5-flash`**. **upgrade / migrate** keys and image model IDs before OpenClaw routing changes.
- **Antigravity (core):** **`2.2.1` (Jun 25)** — first post-**`2.1.4`** IDE release: built-in Guide skill, audio rendering, substring file search, OAuth token keyring persistence, permission-prefix matching fixes. **monitor → upgrade** on IDE cadence.
- **OpenClaw (core):** **`2026.6.9` (Jun 21)**, **`2026.6.10` (Jun 24)**, **`2026.6.11-beta.1` (Jun 24 pre-release)** — security hardening in **`2026.6.9`**, fast-talk auto mode in **`2026.6.10`**, Codex partial-delta + DOMPurify patch in beta. **upgrade** if deployed; read **`2026.6.9`** security rows before channel/plugin changes.
- **Codex (core):** **`0.142.0`–`0.142.3` (Jun 22–26)** CLI train; **Jun 25 Remote GA** + DigitalOcean workspace plugin + QR pairing refresh. **monitor → upgrade** for OpenClaw pin alignment.
- **Cursor (core):** **`3.9` (Jun 22)** — Customize page (plugins, skills, MCPs, subagents), team marketplace leaderboard. No IDE release after **`3.9`** in-window. **monitor** for AgentOS MCP/plugin posture.
- **ChatGPT (core):** **Jun 25** — Codex Remote GA (all plans) + improved memory (Business/Enterprise/Edu); **Jun 26** — **GPT-4.5** retired from ChatGPT (existing chats continue on **GPT-5.5**). **monitor** rollout variance.
- **Hermes (core):** No release after **`v0.17.0` / `v2026.6.19` (Jun 19, pre-window)**. **hold / monitor** for exploratory dabbling unless a test deploy exists.
- **Laravel (non-core):** **`v13.17.0` (Jun 23)** — route metadata, Postgres transaction pooler, JsonSchema `$ref` guard. **monitor** on app cadence.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **Jun 19:** Gemini API rejects requests from **unrestricted standard API keys** (window start). **Jun 25:** **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shutdown (confirmed in May 28 deprecation). **Sep 2026:** full **standard → auth key** migration deadline remains. | upgrade / migrate | [API keys](https://ai.google.dev/gemini-api/docs/generate-content/api-key) · [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **OpenClaw** | **`2026.6.9` (Jun 21):** security fixes — redact secrets from debug/config output, block internal HTTP session overrides, audit open-DM tool exposure, retain plugin write ownership checks. **`2026.6.11-beta.1`:** patched DOMPurify in Control UI. | upgrade (if deployed) | [v2026.6.9](https://github.com/openclaw/openclaw/releases/tag/v2026.6.9) · [v2026.6.11-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11-beta.1) |
| **Codex** | **`0.142.2` (Jun 25):** PowerShell commands with uninspectable AST regions require approval; OpenSSL **3.6.3** bump. **Jun 25 Remote GA:** QR re-pairing required for connections inactive before **Jun 8**. | monitor / policy | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.142.2](https://github.com/openai/codex/releases/tag/rust-v0.142.2) |
| **Antigravity** | **`2.2.1`:** fixes infinite permission prompt loop for commands with dots/env vars; improved prefix-matching for build/test approvals; OAuth tokens auto-saved to OS keyring. | monitor / upgrade | [Antigravity changelog](https://antigravity.google/changelog) |
| **Cursor** | **`3.9` (Jun 22):** centralized plugins/skills/MCP management — review trust boundaries for AgentOS workflows. | monitor / policy | [Cursor changelog](https://cursor.com/changelog) |
| **ChatGPT** | **Jun 25** improved memory surfaces (summary, Sources, correction) — workspace consent/policy surface for Business/Enterprise/Edu. | monitor (workspace policy) | [Release notes](https://openai.com/products/release-notes/) |
| **Hermes** | **`v0.17.0` (Jun 19, pre-window):** security round still relevant if any test deploy exists — gateway fail-closed, MCP stdio exfil blocking, CVE dependency bumps. | upgrade (if deployed) | [v2026.6.19](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Laravel** | **`v13.17.0`:** JsonSchema `$ref` expansion guard; **`v13.16.0`** HTTP client serialization hardening. **CVE-2026-48019** (email CRLF, Jun 1) remains relevant for **`< 12.60.0` / `< 13.10.0`** — pre-window. | monitor / upgrade (if affected) | [v13.17.0](https://github.com/laravel/framework/releases/tag/v13.17.0) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **Gemini** | **Jun 24:** Computer Use public preview on **`gemini-3.5-flash`** — simplified intent actions, browser/mobile/desktop environments, configurable safety policies, prompt-injection detection. **Jun 19 (window start):** unrestricted standard API keys rejected. **Jun 25:** image-preview model shutdown (see security). | upgrade / migrate | **Antigravity** agent/IDE computer-use patterns; **OpenClaw** hybrid Gemini routing | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Computer Use](https://ai.google.dev/gemini-api/docs/computer-use) |
| **Antigravity** | **`2.2.1` (Jun 25):** Antigravity Guide built-in skill, audio file rendering (`.mp3`/`.wav`/`.ogg`/`.m4a`), substring workspace file search, conversation-width setting, OAuth token keyring persistence, 19 improvements + 17 fixes (UAC/Windows startup, subagent deadlock, sandbox skill reads). | monitor → upgrade | Pairs with **Gemini** Computer Use API preview; terminal **`/btw`** still from **`2.1.4`** lineage | [Antigravity changelog](https://antigravity.google/changelog) |
| **OpenClaw** | **`2026.6.9` (Jun 21):** Codex automatic plugin approvals, GPT-5.3 Spark OAuth, remote-node `exec`, standalone official provider npm plugins, security round. **`2026.6.10` (Jun 24):** automatic fast-talk mode, Zai/GLM overload failover, trusted hook policies, cron delivery awareness. **`2026.6.11-beta.1` (Jun 24):** Slack relay, Mattermost `/oc_queue`, RAFT CLI wake bridge, Codex partial-delta streaming fixes. | monitor → upgrade | Reconcile **Codex** **`0.142.x`** pins; **Gemini** auth keys | [Releases](https://github.com/openclaw/openclaw/releases) · [v2026.6.10](https://github.com/openclaw/openclaw/releases/tag/v2026.6.10) |
| **Codex** | **`0.142.0` (Jun 22):** `/usage` credit redemption, rollout token budgets, indexed web-search mode, multi-agent delegation controls. **`0.142.1` (Jun 25):** Windows system proxy (PAC/WPAD). **`0.142.2` (Jun 25):** MCP tool search default, macOS system proxy, OpenSSL/esbuild bumps. **`0.142.3` (Jun 26):** maintenance-only. **Jun 25:** Remote GA + DigitalOcean Droplet workspace plugin; **`codex-zsh-v0.1.0`** pre-release. | monitor → upgrade on pin | **OpenClaw `2026.6.9+`** Codex rows; **ChatGPT** mobile Remote Control | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.142.0](https://github.com/openai/codex/releases/tag/rust-v0.142.0) |
| **Cursor** | **`3.9` (Jun 22):** Customize page (plugins, skills, MCPs, subagents, rules, hooks), marketplace leaderboard, plugin canvases (Hex, Atlassian), GitLab/BitBucket/Azure DevOps team marketplaces. No post-**`3.9`** changelog entry in-window. | monitor | AgentOS **`@cursor/sdk`** pin still **`^1.0.13`** — IDE-side only | [Cursor changelog](https://cursor.com/changelog) |
| **ChatGPT** | **Jun 25:** Codex Remote GA on all plans; improved memory (Business/Enterprise/Edu) with summary + Sources. **Jun 26:** **GPT-4.5** retired from ChatGPT (announced May 28; existing conversations continue on **GPT-5.5**); personal finance expands to Plus (US web/iOS) + Android (Pro/Plus); new dictation STT model. | monitor | Shared account surface with **Codex** Remote; memory changes do not affect Codex project memory | [Release notes](https://openai.com/products/release-notes/) |
| **Hermes** | No in-window release after **`v0.17.0` (Jun 19)** — “Reach” release (iMessage/Photon, background subagents, Automation Blueprints, **`grok-composer-2.5-fast`**) remains latest. | hold / monitor (exploratory) | **Cursor** Composer reachable via xAI Grok OAuth in Hermes | [Releases](https://github.com/NousResearch/hermes-agent/releases) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **`v13.17.0` (Jun 23)** — route metadata, Postgres transaction pooler, cache lock refresh, `without-migration-data` on dump, JsonSchema union/`$ref` guards (continues **`v13.16.x`** hardening). | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md` | [v13.17.0](https://github.com/laravel/framework/releases/tag/v13.17.0) |
| **@cursor/sdk** | No separate npm tag in-window; AgentOS `package.json` still pins **`^1.0.13`**. IDE **3.9** Customize/MCP changes are IDE-side. | monitor | Same ecosystem as **Cursor 3.9** | [Cursor changelog](https://cursor.com/changelog) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP** | No additional in-window primary-source releases verified beyond rows above (timeboxed). **MCP `2026-07-28`** final spec remains **31 days out** at window end. | not applicable / hold | **Cursor 3.9** + **Codex 0.142.2** MCP tool-search default may affect server design ahead of MCP stateless core | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Veo 2.0 / 3.0** video model shutdown (announced Jun 15) | **2026-06-30** | confirmed | [Gemini API changelog (Jun 15)](https://ai.google.dev/gemini-api/docs/changelog) |
| **Gemini** | Migrate **standard API keys** → **auth keys** (full rejection of standard keys) | **September 2026** | confirmed | [API keys](https://ai.google.dev/gemini-api/docs/generate-content/api-key) |
| **ChatGPT** | **o3** retirement from ChatGPT (announced with GPT-4.5 sunset) | **2026-08-26** | confirmed | [Release notes](https://openai.com/products/release-notes/) |
| **ChatGPT / Codex / API** | **GPT-5.6** family (Sol, Terra, Luna) limited preview — broader GA “in coming weeks” | not fixed | tentative | [Release notes (Jun 26)](https://openai.com/products/release-notes/) |
| **Antigravity** | Gradual rollout continues for **`2.2.1`** | not stated | confirmed (staged) | [Antigravity changelog](https://antigravity.google/changelog) |
| **OpenClaw** | **`2026.6.11`** stable (currently **`2026.6.11-beta.1`**) | not stated | tentative | [Releases](https://github.com/openclaw/openclaw/releases) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (stateless core, mandatory headers) — RC locked **May 21** | **2026-07-28** | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **6.x** maintenance mode; **TypeScript 7** native port (`typescript-go`) | no fixed GA date in-window | tentative | [Maintenance mode issue](https://github.com/microsoft/TypeScript/issues/62963) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle (**Beta 1** shipped **Jun 4**, pre-window) | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **Antigravity** | **Jun 24** Computer Use preview on **`gemini-3.5-flash`**; **Antigravity `2.2.1`** improves permission matching and OAuth persistence for agent terminal workflows. | OpenClaw + Antigravity HITL setups should align on the same Computer Use safety/policy model before enabling autonomous desktop paths. | [Computer Use](https://ai.google.dev/gemini-api/docs/computer-use) · [Antigravity changelog](https://antigravity.google/changelog) |
| **OpenClaw** | **Codex** | **`2026.6.9–2026.6.11-beta`** Codex harness/partial-delta fixes land alongside **Codex `0.142.0–0.142.2`** rollout budgets, MCP tool search, and **Jun 25 Remote GA**. | WoW analytics deploy should bump **OpenClaw** and **Codex** pins together and re-check approval/HITL posture. | [OpenClaw v2026.6.9](https://github.com/openclaw/openclaw/releases/tag/v2026.6.9) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **ChatGPT** | **Codex** | **Jun 25** Codex Remote GA on all ChatGPT plans + DigitalOcean workspace plugin; QR re-pairing for stale mobile↔host links. | Commodity reporting and OpenClaw cron patterns gain a mobile approval surface on the OpenAI side. | [Codex changelog](https://developers.openai.com/codex/changelog) · [Release notes](https://openai.com/products/release-notes/) |
| **Cursor** | **OpenClaw** | **Cursor `3.9`** centralizes MCP/plugins/skills; **OpenClaw `2026.6.11-beta`** externalizes more official plugins and hardens ClawHub update policy. | AgentOS and OpenClaw both expanding plugin surfaces — compare allowlists before auto-installing marketplace items. | [Cursor changelog](https://cursor.com/changelog) · [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Portfolio lists **Gemini 3.1 Pro + Gemma 26b** / **Gemini 2.5 Flash + Gemma e2b** — official changelog now centers **`gemini-3.5-flash`**, **`gemini-3.1-flash-lite`**, GA image models **`gemini-3.1-flash-image`** / **`gemini-3-pro-image`**. Refresh IDs before OpenClaw routing changes; note **Jun 25** preview image shutdown.
- **`docs/TECH_STACK.md` → Antigravity:** Add **`2.2.1` (2026-06-25)** as current IDE line; note **Gemini CLI consumer cutoff (2026-06-18)** is past — terminal path is **Antigravity CLI**.
- **`docs/TECH_STACK.md` → Hermes Agent:** **`v0.17.0`** (Jun 19) is a major release but status remains “exploratory” — consider last-evaluated version note.
- **`package.json` → `@cursor/sdk`:** Pin **`^1.0.13`** lags IDE **3.9** Customize/MCP surface — note intended SDK upgrade thread when scheduled automation needs new SDK APIs.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`, `package.json`
- Prior digest: `docs/research/tech-stack-updates-2026-06-24.md` (dedupe; this run covers full **Jun 20–27** window)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) — Jun 24 Computer Use; Jun 15 Veo deprecations; May 28 image-preview shutdown
- [Gemini API keys](https://ai.google.dev/gemini-api/docs/generate-content/api-key) — Jun 19 unrestricted-key rejection; Sep 2026 auth-key migration
- [Gemini Computer Use](https://ai.google.dev/gemini-api/docs/computer-use)
- [Antigravity changelog](https://antigravity.google/changelog) — **2.2.1** (Jun 25)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) — **v2026.6.9**, **v2026.6.10**, **v2026.6.11-beta.1**
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases) — latest **v2026.6.19** (Jun 19, pre-window)
- [Cursor changelog](https://cursor.com/changelog) — **3.9** (Jun 22)
- [Codex changelog](https://developers.openai.com/codex/changelog) · [Codex 0.142.0](https://github.com/openai/codex/releases/tag/rust-v0.142.0) · [0.142.2](https://github.com/openai/codex/releases/tag/rust-v0.142.2) · [0.142.3](https://github.com/openai/codex/releases/tag/rust-v0.142.3)
- [OpenAI release notes](https://openai.com/products/release-notes/) — Jun 25–26 ChatGPT/Codex entries (partial direct fetch; Codex entries cross-checked on developers.openai.com)
- [Laravel v13.17.0](https://github.com/laravel/framework/releases/tag/v13.17.0)
- [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
