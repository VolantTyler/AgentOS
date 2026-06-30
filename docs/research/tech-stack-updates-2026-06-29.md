# Tech stack updates — 2026-06-29 (America/New_York)

- **Window:** **2026-06-22 00:00** America/New_York (EDT, UTC−04:00) → **2026-06-29 23:59** America/New_York — i.e. **2026-06-22 04:00 UTC** through **2026-06-30 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini (core):** **Jun 24** — **Computer Use** public preview on **`gemini-3.5-flash`** (browser/mobile/desktop, safety policies, prompt-injection detection). **Jun 25** — **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shut down (migrate to GA **`gemini-3.1-flash-image`** / **`gemini-3-pro-image`**). **Veo 2.0/3.0** shutdown **Jun 30** is one day out. **upgrade / migrate** any lingering preview IDs; **monitor** Computer Use for agent workflows.
- **Codex (core):** **`0.142.0` (Jun 22)** through **`0.142.4` (Jun 29)** stable train; **`0.142.2`** adds MCP tool search by default + OpenSSL/esbuild bumps; **Jun 25** **Codex Remote GA** (QR pairing, DigitalOcean workspace plugin). **monitor → upgrade** on OpenClaw pin alignment; re-pair hosts if inactive before Jun 8 cutoff.
- **ChatGPT (core):** **Jun 25** — Codex Remote GA + improved memory (Business/Enterprise/Edu); **Jun 26** — **GPT-5.6 Sol/Terra/Luna** limited preview (API/Codex partners only); **GPT-4.5 retired from ChatGPT** (Jun 26 per release notes; announced May 28 for Jun 27). **monitor** preview access; **hold** on API-side GPT-4.5 assumptions (ChatGPT-only retirement).
- **Antigravity (core):** **`2.2.1` (Jun 25)** — built-in Antigravity Guide skill, audio rendering, substring file search, OAuth token keyring persistence, subagent deadlock fix. **monitor → upgrade** for OpenClaw orchestration IDE path.
- **OpenClaw (core):** Stable **`2026.6.10` (Jun 24)**; beta **`2026.6.11-beta.1` (Jun 24)** / **`2026.6.11-beta.2` (Jun 28)** — Slack relay, Mattermost `/oc_queue`, RAFT CLI wake bridge, Codex partial-delta reliability, Telegram/WhatsApp delivery fixes. **monitor** on beta; **upgrade** stable if deployed.
- **Cursor (core):** **`3.9` (Jun 22)** — Customize page (plugins, skills, MCPs, subagents), team marketplace leaderboard, plugin canvases (Hex, Atlassian), GitLab/BitBucket/Azure DevOps team marketplaces. No IDE release after **3.9** in-window. **monitor** for AgentOS MCP/plugin posture.
- **Hermes (core):** No release after **`v0.17.0` / `v2026.6.19` (Jun 19)** — pre-window. **hold / monitor** for exploratory dabbling.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shut down **2026-06-25**. **Veo 2.0/3.0** models shut down **2026-06-30** (1 day out at window end). | upgrade / migrate | [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [Changelog (Jun 15)](https://ai.google.dev/gemini-api/docs/changelog) |
| **Gemini** | **Computer Use** preview on **`gemini-3.5-flash`** — new agent surface with configurable safety policies and prompt-injection detection. | monitor / policy | [Changelog (Jun 24)](https://ai.google.dev/gemini-api/docs/changelog) |
| **Codex** | **`0.142.2`:** OpenSSL **3.6.3** and esbuild **0.28.1** dependency bumps; PowerShell AST regions the safety classifier cannot inspect now require approval. | upgrade (if deployed) | [0.142.2 release](https://github.com/openai/codex/releases/tag/rust-v0.142.2) |
| **Codex** | **Remote GA (Jun 25):** authenticated one-to-one QR pairing between mobile and Mac/Windows hosts — review who can approve remote exec. | monitor / policy | [Codex changelog](https://developers.openai.com/codex/changelog) |
| **OpenClaw** | **`2026.6.11-beta.*`:** DOMPurify patch, TLS empty-path rejection, memory-artifact sanitization, non-interactive configure fail-closed. | monitor (beta) | [v2026.6.11-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11-beta.2) |
| **ChatGPT** | **GPT-5.6 preview** ships layered cyber/biology safeguards; limited partner preview — not a general availability upgrade yet. | monitor | [GPT-5.6 Sol preview](https://openai.com/index/previewing-gpt-5-6-sol/) |
| **Antigravity** | **`2.2.1`:** permission matching for build/test prefix commands; sensitive-path and sandbox fixes for builtin skills. | monitor | [Antigravity changelog](https://antigravity.google/changelog) |
| **Cursor** | **`3.9`:** team/workspace MCP and plugin management on Customize page — review trust boundaries for AgentOS. | monitor / policy | [Cursor 3.9 changelog](https://cursor.com/changelog/customize) |
| **Hermes** | No in-window security advisories beyond **`v0.17.0` (Jun 19)** pre-window round. | hold / monitor | [Hermes releases](https://github.com/NousResearch/hermes-agent/releases) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Laravel** | **`v13.17.0` (Jun 23):** HTTP client serialization hardening continues **`v13.16.x`** thread; no new CVE in-window verified. | monitor / upgrade on app cadence | [v13.17.0](https://github.com/laravel/framework/releases/tag/v13.17.0) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **Gemini** | **Jun 24:** **Computer Use** public preview on **`gemini-3.5-flash`** — simplified intent actions, browser/mobile/desktop support, safety policies. **Jun 25:** image-preview model shutdown executed per deprecations table. | upgrade / migrate | **Antigravity** managed-agent stack; **OpenClaw** hybrid Gemini routing — audit preview model strings | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Codex** | **`0.142.0` (Jun 22):** `/usage` credit redemption, rollout token budgets, indexed web-search mode, multi-agent delegation controls. **`0.142.2` (Jun 25):** MCP tool search default, macOS system-proxy support, dark-mode plugin logos. **`0.142.3`/`0.142.4`:** maintenance-only. **Jun 25:** Remote GA + DigitalOcean plugin. | monitor → upgrade on pin | **OpenClaw `2026.6.11-beta`** Codex partial-delta rows; **ChatGPT** mobile remote surface | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.142.4](https://github.com/openai/codex/releases/tag/rust-v0.142.4) |
| **ChatGPT** | **Jun 22:** large pastes **>10k chars** auto-attach (Free/Go). **Jun 25:** improved memory (summary, Sources, admin opt-out) + Codex Remote GA. **Jun 26:** updated model picker (Instant/Medium/High/Extra High); **GPT-4.5 retired** from ChatGPT; **GPT-5.6** partner preview announced. | monitor | Shared account surface with **Codex**; scheduled/memory patterns parallel **OpenClaw** cron | [Release notes](https://openai.com/products/release-notes/) · [GPT-5.6 preview](https://openai.com/index/previewing-gpt-5-6-sol/) |
| **Antigravity** | **`2.2.1` (Jun 25):** Antigravity Guide skill, audio file rendering (.mp3/.wav/.ogg/.m4a), substring workspace search, conversation-width setting, OAuth token keyring persistence, subagent deadlock fix, Windows UAC/startup fixes. | monitor → upgrade | **OpenClaw `/btw`** side-agent pattern; **Gemini** Computer Use preview on same Google stack | [Antigravity changelog](https://antigravity.google/changelog) |
| **OpenClaw** | **`2026.6.10` (Jun 24):** fast-talk auto mode, Zai/GLM overload failover. **`2026.6.11-beta.1`/`.2`:** Slack relay, Mattermost `/oc_queue`, RAFT CLI wake bridge, `openclaw agent --message-file`, Codex harness/partial-delta fixes, externalized official plugins. | monitor → upgrade (stable) | Reconcile **Codex `0.142.x`**; **Gemini** preview ID migration | [Releases](https://github.com/openclaw/openclaw/releases) · [v2026.6.11-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11-beta.2) |
| **Cursor** | **`3.9` (Jun 22):** Customize page for plugins/skills/MCPs/subagents/rules/hooks; marketplace leaderboard; Hex/Atlassian plugin canvases; GitLab/BitBucket/Azure DevOps team marketplaces. | monitor | AgentOS **`@cursor/sdk`** pin **`^1.0.13`** — IDE-side Customize changes, not SDK bump verified | [Cursor 3.9](https://cursor.com/changelog/customize) |
| **Hermes** | Latest remains **`v0.17.0` (Jun 19)** — no in-window release. | hold / monitor | **`grok-composer-2.5-fast`** (pre-window) still relevant vs **Cursor 3.9** Customize/MCP | [Hermes releases](https://github.com/NousResearch/hermes-agent/releases) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **`v13.17.0` (Jun 23)** — route metadata, Postgres transaction pooler, cache lock refresh, `without-migration-data` on dump. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md` | [v13.17.0](https://github.com/laravel/framework/releases/tag/v13.17.0) |
| **@cursor/sdk** | No separate npm tag in-window; AgentOS `package.json` still pins **`^1.0.13`**. | monitor | Same ecosystem as **Cursor 3.9** Customize/MCP train | [Cursor changelog](https://cursor.com/changelog) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP** | No additional in-window primary-source releases verified beyond rows above (timeboxed). | not applicable / hold | **MCP `2026-07-28`** final spec still **29 days out** | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Veo 2.0 / 3.0** video model shutdown | **2026-06-30** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Gemini** | **Imagen 4 / Gemini 3 Image** model shutdown | **2026-08-17** | confirmed | [Gemini API changelog (Jun 15)](https://ai.google.dev/gemini-api/docs/changelog) |
| **ChatGPT** | **GPT-5.6 Sol/Terra/Luna** broader availability | “coming weeks” (Jun 26 announcement) | tentative | [GPT-5.6 preview](https://openai.com/index/previewing-gpt-5-6-sol/) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT (announced May 28) | **2026-08-26** | confirmed | [Release notes (May 28)](https://openai.com/products/release-notes/) |
| **Codex** | **GPT-5.6 Sol on Cerebras** (750 tok/s) | **July 2026** | tentative | [GPT-5.6 preview](https://openai.com/index/previewing-gpt-5-6-sol/) |
| **OpenClaw** | **`2026.6.11`** stable promotion from beta train | not stated | tentative | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (stateless core, mandatory headers) — RC locked **May 21** | **2026-07-28** | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **6.x** maintenance mode; **TypeScript 7** native port (`typescript-go`) | no fixed GA date in-window | tentative | [Maintenance mode issue](https://github.com/microsoft/TypeScript/issues/62963) · [typescript-go](https://github.com/microsoft/typescript-go) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **Antigravity** | **Jun 24** Gemini **Computer Use** preview on **`gemini-3.5-flash`**; **Jun 25** **Antigravity `2.2.1`** adds Guide skill, audio rendering, and agent reliability fixes. | Google stack now has both API-level computer use and IDE-side agent polish — OpenClaw/Antigravity orchestration should pick one computer-use path and align safety/HITL policy. | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Antigravity changelog](https://antigravity.google/changelog) |
| **Codex** | **ChatGPT** | **Jun 25** **Codex Remote GA** (QR pairing, mobile approve/exec) plus **`0.142.x`** rollout budgets and MCP tool search. | Mobile remote control parallels **OpenClaw** channel delivery work — if WoW analytics uses Codex pins, bump **OpenClaw beta** and **Codex** together and re-check approval posture. | [Codex changelog](https://developers.openai.com/codex/changelog) · [Release notes](https://openai.com/products/release-notes/) |
| **OpenClaw** | **Codex** | **`2026.6.11-beta`** improves Codex partial deltas, harness activation, and usage-limit classification while **Codex `0.142.0`–`0.142.4`** ships through Jun 29. | Active OpenClaw deploys should track both trains; beta channel fixes explicitly target Codex integration failures. | [OpenClaw beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11-beta.2) · [Codex 0.142.4](https://github.com/openai/codex/releases/tag/rust-v0.142.4) |
| **Cursor** | **OpenClaw** | **Cursor `3.9`** centralizes plugins/skills/MCP; **OpenClaw `2026.6.11-beta`** externalizes official plugins and tightens ClawHub policy. | AgentOS and OpenClaw both moving toward explicit plugin governance — compare allowlists before importing third-party MCP/skills across repos. | [Cursor 3.9](https://cursor.com/changelog/customize) · [OpenClaw beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11-beta.2) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Confirm portfolio model IDs against post-**Jun 25** deprecations — **`gemini-3.1-flash-image-preview`** / **`gemini-3-pro-image-preview`** are shut down; **`gemini-3.1-flash-image`** / **`gemini-3-pro-image`** are GA replacements.
- **`docs/TECH_STACK.md` → Antigravity:** Latest verified IDE version is **`2.2.1` (2026-06-25)** — doc still references patterns from **`2.1.4`** era; add version note when Tyler next edits the file.
- **`docs/TECH_STACK.md` → ChatGPT / Codex:** Note **GPT-4.5 ChatGPT retirement** (Jun 26, 2026 per release notes) is **ChatGPT-only** — API unchanged per May 28 announcement.
- **`package.json` → `@cursor/sdk`:** Pin **`^1.0.13`** lags IDE **3.9** Customize/MCP surface — note intended SDK upgrade thread when scheduled automation needs new SDK APIs.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`, `package.json`
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) — Jun 24 Computer Use; Jun 15 deprecations
- [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations)
- [Codex changelog](https://developers.openai.com/codex/changelog) — Remote GA (Jun 25)
- [Codex releases](https://github.com/openai/codex/releases) — **0.142.0**, **0.142.2**, **0.142.4**
- [OpenAI release notes](https://openai.com/products/release-notes/) · [GPT-5.6 preview blog](https://openai.com/index/previewing-gpt-5-6-sol/)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) — **v2026.6.10**, **v2026.6.11-beta.1**, **v2026.6.11-beta.2**
- [Antigravity changelog](https://antigravity.google/changelog) — **2.2.1** (Jun 25)
- [Cursor changelog](https://cursor.com/changelog/customize) — **3.9** (Jun 22)
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases) — latest **v2026.6.19** (Jun 19, pre-window)
- [Laravel v13.17.0](https://github.com/laravel/framework/releases/tag/v13.17.0)
- [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
- Prior digest: `docs/research/tech-stack-updates-2026-06-24.md`
