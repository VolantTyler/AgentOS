# Tech stack updates — 2026-06-22 (America/New_York)

- **Window:** **2026-06-15 00:00** America/New_York (EDT, UTC−04:00) → **2026-06-22 23:59** America/New_York — i.e. **2026-06-15 04:00 UTC** through **2026-06-23 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Antigravity (core):** **June 18** — consumer **Gemini CLI** and **Gemini Code Assist IDE extensions** stopped serving **Google AI Pro/Ultra** and free individual tiers (confirmed deadline). **monitor / migrate** to **Antigravity CLI** + **Antigravity 2.0**; no new Antigravity app version shipped in-window (latest remains **`2.1.4`**, Jun 11).
- **Gemini (core):** **Jun 15** — Imagen 4 / Gemini 3 Image and **Veo 2/3** deprecation notices; experimental **GMP Contextual View** shut down same day. **Jun 17** — streaming TTS for **`gemini-3.1-flash-tts-preview`**. **`gemini-3.1-flash-image-preview`** / **`gemini-3-pro-image-preview`** shutdown **June 25** is **3 days out** at window end. **monitor / migrate** model IDs in **OpenClaw** hybrid routing.
- **OpenClaw (core):** **`2026.6.8` (Jun 16)**, **`2026.6.9` (Jun 21)**, **`2026.6.10-beta.1` / `2026.6.10-beta.2` (Jun 21–22)** — Telegram rich HTML delivery, **Codex Hosted Search**, stronger **Codex** integration (plugin approvals, Spark OAuth, remote-node exec), **`/btw`** CLI parity, security boundary rows in **`2026.6.9`**. **monitor → upgrade** on OpenClaw cadence; read security notes before channel/plugin changes.
- **Hermes (core):** **`v0.17.0` / `v2026.6.19` (Jun 19)** — “Reach Release”: iMessage via **Photon** (no Mac relay), background/async subagents, **`grok-composer-2.5-fast`** (Cursor **Composer** through xAI Grok OAuth), WhatsApp Business Cloud API, security hardening round. **monitor** exploratory dabbling; **upgrade** if already on **`v0.16.x`** desktop stack.
- **Cursor (core):** **Jun 17** — cloud environment snapshots, **`/in-cloud`** cloud subagents, **`/babysit`** PR handoff. **Jun 18** — **Cursor Automations 3.8**: **`/automate`** skill, five new **GitHub** triggers, **computer use** for automation cloud agents. **monitor** for AgentOS PR / scheduled-automation posture.
- **Codex (core):** **Jun 16** — app features expand to **EEA, UK, and Switzerland** (Computer Use, Chrome extension, Memories). **Jun 18** — app **`26.616`** (**Record & Replay** on macOS, thread handoff local↔remote) and CLI **`0.141.0`** (E2EE Noise relay channels, preserved remote cwd/shell). **monitor** for **OpenClaw** pin alignment and elevated-risk **Computer Use** / **Record & Replay** policy.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **Jun 15:** **Veo 2/3** GA models deprecated — shutdown **Jun 30, 2026**; **Imagen 4** + **Gemini 3 Image** GA models deprecated — shutdown **Aug 17, 2026**; experimental **GMP Contextual View** shut down **Jun 15**. | monitor / migrate | [Gemini API changelog (Jun 15)](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **OpenClaw** | **`2026.6.9` (Jun 21):** security rows — secret redaction in debug/config output, block internal HTTP session overrides, audit open-DM tool exposure, plugin write ownership checks; **`2026.6.8`** Hono **4.12.25** dependency bump. | upgrade (if deployed) | [v2026.6.9](https://github.com/openclaw/openclaw/releases/tag/v2026.6.9) · [v2026.6.8](https://github.com/openclaw/openclaw/releases/tag/v2026.6.8) |
| **Hermes** | **`v0.17.0` (Jun 19):** security round — fail-closed gateway adapters, secret redaction in debug dumps, MCP stdio exfiltration blocks, shell-escape denylist fixes, urllib3/PyJWT CVE bumps. | upgrade (if deployed) | [v2026.6.19](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19) |
| **Codex** | **`0.141.0` (Jun 18):** authenticated **E2EE Noise** remote relay channels; **Record & Replay** requires **Computer Use** (admin-disable in cloud settings). | monitor / policy | [Codex changelog (2026-06-18)](https://developers.openai.com/codex/changelog) · [0.141.0](https://github.com/openai/codex/releases/tag/rust-v0.141.0) |
| **Cursor** | **Jun 18 Automations** — **computer use** enabled by default for automation cloud agents; new **GitHub** triggers on PR review comments and workflow failures. | monitor / policy | [Cursor changelog (Jun 18)](https://cursor.com/changelog/06-18-26) |
| **Antigravity** | **Jun 18 consumer Gemini CLI cutoff** — migration surface, not a CVE; enterprise **Gemini Code Assist** licenses unchanged per Google blog. | monitor / migrate | [Gemini CLI → Antigravity CLI blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **ChatGPT** | No in-window CVE verified; **Jun 18** Help Center documents refined **app permission** controls for connected apps (trust/consent). | monitor (workspace policy) | [Scheduled Tasks in ChatGPT](https://help.openai.com/en/articles/10291617) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Laravel** | **CVE-2026-48019** (CRLF injection in email validation) published **Jun 1** — still relevant for apps on **`< 12.60.0` / `< 13.10.0`**; in-window **`v13.16.0` / `v13.16.1` (Jun 16)** are patch releases only. | upgrade (if affected) | [GHSA-5vg9-5847-vvmq](https://github.com/laravel/framework/security/advisories/GHSA-5vg9-5847-vvmq) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **Gemini** | **Jun 15:** Imagen 4 + Gemini 3 Image + **Veo** deprecation notices; **GMP Contextual View** shutdown. **Jun 17:** streaming **`streamGenerateContent`** / Interactions **`stream: true`** for **`gemini-3.1-flash-tts-preview`**. | monitor / migrate (model IDs) | **OpenClaw** Vertex/Gemini CLI OAuth fixes in **`2026.6.8–2026.6.9`**; **Antigravity** PDF-to-Gemini unchanged at **`2.1.4`** | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **OpenClaw** | **`2026.6.8` (Jun 16):** Telegram rich HTML + WhatsApp ACP bindings; **`/btw`** in CLI sessions; Codex Hosted Search opt-in; Gemini CLI isolated OAuth home; SQLite WAL-on-NFS guard. **`2026.6.9` (Jun 21):** richer Telegram delivery; **Codex Hosted Search**, automatic plugin approvals, GPT-5.3 Spark OAuth routing, remote-node **`exec`**; standalone provider npm plugins + StepFun. **`2026.6.10-beta.1/2` (Jun 21–22):** fast-mode for short conversational turns; GLM/Zai routing fixes. | monitor → upgrade | Reconcile **Codex** harness pins; **Gemini** model deprecations; **Antigravity** **`/btw`** parity | [Releases](https://github.com/openclaw/openclaw/releases) · [v2026.6.9](https://github.com/openclaw/openclaw/releases/tag/v2026.6.9) · [v2026.6.8](https://github.com/openclaw/openclaw/releases/tag/v2026.6.8) |
| **Antigravity** | **No new app version** in-window (changelog latest **`2.1.4`**, Jun 11). **Jun 18** consumer **Gemini CLI** / **Gemini Code Assist IDE** cutoff for Pro/Ultra/free individual tiers per Google Developers Blog. | monitor / migrate (CLI) | Same agent harness as **Antigravity CLI**; pairs with **Gemini** API deprecations | [Antigravity changelog](https://antigravity.google/changelog) · [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **Hermes** | **`v0.17.0` (Jun 19):** iMessage (**Photon**), background subagents, image-to-image edits, Automation Blueprints (no-cron scheduling), **`grok-composer-2.5-fast`**, Raft gateway channel, WhatsApp Business Cloud API, Telegram Bot API 10.1 rich text. | monitor → upgrade (if evaling) | Direct **Cursor Composer** routing via Grok plan; channel reach parallels **OpenClaw** Telegram/WhatsApp work | [v2026.6.19](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19) |
| **Cursor** | **Jun 17:** cloud dev-environment snapshots (`.cursor/environment.json`), **`/in-cloud`** subagents, **`/babysit`**, local↔cloud handoff. **Jun 18:** Automations **`/automate`**, Slack emoji trigger, five **GitHub** automation triggers, **computer use** for automation agents, default PR-open behavior. | monitor | AgentOS **`@cursor/sdk`** still pinned **`^1.0.13`** in `package.json`; cloud-agent patterns overlap **Codex** remote handoff | [Cursor changelog](https://cursor.com/changelog) · [Jun 18 Automations](https://cursor.com/changelog/06-18-26) |
| **Codex** | **Jun 16:** Computer Use, Chrome extension, Memories roll out to **EEA/UK/CH** (Memories off by default there). **Jun 18 app `26.616`:** **Record & Replay** (macOS), bulk automation history actions, local↔remote thread handoff. **Jun 18 CLI `0.141.0`:** E2EE Noise remote relays, executor-native cwd/shell preservation, plugin MCP discovery improvements. | monitor → upgrade on pin | **OpenClaw `2026.6.9`** Codex integration rows; **ChatGPT** iOS **`1.2026.160` (Jun 15)** workspace file browser + diff controls | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.141.0](https://github.com/openai/codex/releases/tag/rust-v0.141.0) |
| **ChatGPT** | In-window: Help Center refresh for **Scheduled Tasks** (dedicated Scheduled page, monitoring tasks, broader time windows); product mirrors cite **Jun 17–18** app-experience polish (pronunciation guidance, app-permission controls). **GPT-5.2 ChatGPT retirement (Jun 12)** is **pre-window** but still affects active chats on **GPT-5.5**. | monitor | Shared OpenAI account with **Codex**; scheduled tasks distinct from **Codex automations** per Help Center | [Scheduled Tasks](https://help.openai.com/en/articles/10291617) · [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [GPT-5.2-chat-latest (deprecated)](https://developers.openai.com/api/docs/models/gpt-5.2-chat-latest) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **`v13.16.0` / `v13.16.1` (Jun 16)** — `artisan dev` command, JSON schema **`anyOf`**, enum broadcast support, maintenance-mode **`array`** driver for parallel testing, batching/validation fixes. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md`; patch **CVE-2026-48019** separately | [v13.16.0](https://github.com/laravel/framework/releases/tag/v13.16.0) · [CHANGELOG 13.x](https://github.com/laravel/framework/blob/13.x/CHANGELOG.md) |
| **Playwright** | **`v1.61.0` (Jun 15)** — **WebAuthn passkey** support; **`page.localStorage`** / **`page.sessionStorage`** APIs; Chromium **139.0.7827.55**, Firefox **151.0**, WebKit **26.5**. | monitor / upgrade on E2E cadence | **Cypress** / **Jest** unchanged in-window | [v1.61.0](https://github.com/microsoft/playwright/releases/tag/v1.61.0) |
| **@cursor/sdk** | No separate npm tag in-window beyond **Jun 4 Cursor SDK 3.7** (pre-window); AgentOS `package.json` still pins **`^1.0.13`**. | monitor | Same train as **Cursor** cloud agents / Automations | [SDK updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026) |
| **React / TypeScript / Tailwind / Cypress / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP** | No additional in-window primary-source releases verified beyond rows above (timeboxed). **React** latest remains **`v19.2.7` (Jun 1)**. **Python 3.14.6** shipped **Jun 10** (pre-window). | not applicable / hold | **MCP `2026-07-28`** final spec still **36 days out** (RC locked May 21) | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shutdown | **2026-06-25** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Gemini** | **Veo 2/3** GA model shutdown | **2026-06-30** | confirmed | [Gemini API changelog (Jun 15)](https://ai.google.dev/gemini-api/docs/changelog) |
| **ChatGPT** | **GPT-4.5** retirement from ChatGPT (announced May 28) | **2026-06-27** | confirmed | [Release notes (May 28)](https://openai.com/products/release-notes/) |
| **Gemini** | **Imagen 4** + **Gemini 3 Image** GA model shutdown | **2026-08-17** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **OpenClaw** | **`2026.6.10`** stable train after beta QA (`2026.6.10-beta.2` published **Jun 22**) | not stated | tentative | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Codex** | **Record & Replay** regional expansion beyond initial macOS / non-EEA availability | rolling | tentative | [Codex changelog](https://developers.openai.com/codex/changelog) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (stateless core, mandatory headers) — RC locked **May 21** | **2026-07-28** | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **6.x** maintenance mode; **TypeScript 7** native port (`typescript-go`) | no fixed GA date in-window | tentative | [Maintenance mode issue](https://github.com/microsoft/TypeScript/issues/62963) · [typescript-go](https://github.com/microsoft/typescript-go) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle (**Beta 1** shipped **Jun 4**, pre-window) | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Hermes** | **Cursor** | **`v0.17.0`** adds **`grok-composer-2.5-fast`** (Cursor **Composer** model via xAI Grok OAuth) while **Cursor 3.8** ships deeper **GitHub** automation + **computer use**. | Two paths to **Composer-class** coding speed — Hermes agent loop vs Cursor Automations — worth comparing before changing daily-driver IDE habits. | [Hermes v2026.6.19](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19) · [Cursor Jun 18](https://cursor.com/changelog/06-18-26) |
| **OpenClaw** | **Codex** | **`2026.6.9`** adds **Codex Hosted Search**, automatic plugin approvals, GPT-5.3 Spark OAuth routing, and remote-node **`exec`** while **Codex `0.141.0`** ships E2EE remote relays and **`26.616`** adds **Record & Replay** + thread handoff. | WoW analytics / commodity pipelines using **OpenClaw** **Codex** pins should reconcile search providers, remote-exec boundaries, and **Computer Use** policy in one upgrade pass. | [OpenClaw v2026.6.9](https://github.com/openclaw/openclaw/releases/tag/v2026.6.9) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Antigravity** | **Gemini** | **Jun 18** consumer **Gemini CLI** cutoff forces **Antigravity CLI** while **Gemini API** announces **Jun 25** image-preview shutdown and **Jun 30** **Veo** retirement. | Google agent surfaces are consolidating on **Antigravity** + newer **Gemini 3.x** model IDs — audit **OpenClaw** hybrid **Gemini + Gemma** configs together. | [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) · [Gemini deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **OpenClaw** | **Antigravity** | **`2026.6.8`** ships **`/btw`** side-agent CLI parity (same week **Antigravity `2.1.4`** added **`/btw`**, pre-window) and Telegram rich delivery while **Antigravity** has no post-cutoff app release. | Multi-agent “side question” patterns are converging — compare **OpenClaw** HITL gateway posture vs **Antigravity** IDE handoff after CLI migration. | [OpenClaw v2026.6.8](https://github.com/openclaw/openclaw/releases/tag/v2026.6.8) · [Antigravity changelog](https://antigravity.google/changelog) |
| **Cursor** | **OpenClaw** | **Cursor `/in-cloud`** + **`/babysit`** cloud subagents (**Jun 17**) overlap **OpenClaw** channel-rich delivery + fast-mode conversational routing (**`2026.6.10-beta`**). | Parallel “background agent” patterns across **Cursor** cloud VMs and **OpenClaw** Telegram/WhatsApp — pick one orchestration layer per project to avoid duplicate automation. | [Cursor changelog](https://cursor.com/changelog) · [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → OpenClaw:** Bump portfolio references from **`2026.6.6` / `2026.6.8-beta`** toward stable **`2026.6.9`** (or latest beta **`2026.6.10-beta.2`**) and note **Codex Hosted Search** + Telegram rich HTML delivery.
- **`docs/TECH_STACK.md` → Hermes:** Exploratory line should reference **`v0.17.0+`** (Reach Release — iMessage, background subagents, Composer via Grok) rather than **`v0.16.0`** only.
- **`docs/TECH_STACK.md` → Antigravity:** Mark **Jun 18, 2026** Gemini CLI consumer cutoff as **passed**; add **Antigravity CLI** as the replacement entry point for former Gemini CLI users.
- **`docs/TECH_STACK.md` → Gemini models:** Refresh tier table for **`gemini-3.1-flash-tts-preview`** streaming (Jun 17), **Jun 25** image-preview shutdown, and **Jun 30** **Veo** retirement.
- **`docs/TECH_STACK.md` → Codex:** Update harness pins from **`0.139.0` / `26.609`** toward **`0.141.0` / `26.616`** when Tyler upgrades **OpenClaw**.
- **`docs/TECH_STACK.md` → Cursor / AgentOS:** Document **Jun 17–18** cloud-agent + Automations patterns; note **`@cursor/sdk` `^1.0.13`** lag vs **SDK 3.7** (Jun 4) when bumping scheduled scripts.
- **`docs/TECH_STACK.md` → Playwright (testing):** Note **`v1.61.0`** passkey + storage APIs for E2E suites.
- **`docs/TECH_STACK.md` → Laravel (non-core):** **`v13.16.x`** + standing **CVE-2026-48019** patch floor for mail-validation flows.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`
- [Cursor changelog](https://cursor.com/changelog) · [Jun 18 Automations](https://cursor.com/changelog/06-18-26) · [SDK updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations)
- [OpenAI Codex changelog](https://developers.openai.com/codex/changelog) · [Codex `0.141.0`](https://github.com/openai/codex/releases/tag/rust-v0.141.0)
- [ChatGPT Scheduled Tasks (Help Center)](https://help.openai.com/en/articles/10291617) · [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [GPT-5.2-chat-latest model page](https://developers.openai.com/api/docs/models/gpt-5.2-chat-latest)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) · [v2026.6.9](https://github.com/openclaw/openclaw/releases/tag/v2026.6.9) · [v2026.6.8](https://github.com/openclaw/openclaw/releases/tag/v2026.6.8) · [v2026.6.10-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.6.10-beta.2)
- [Hermes Agent v2026.6.19](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.19)
- [Google Antigravity changelog](https://antigravity.google/changelog) · [Gemini CLI → Antigravity CLI blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)
- [Laravel CHANGELOG 13.x](https://github.com/laravel/framework/blob/13.x/CHANGELOG.md) · [v13.16.0](https://github.com/laravel/framework/releases/tag/v13.16.0) · [CVE GHSA-5vg9-5847-vvmq](https://github.com/laravel/framework/security/advisories/GHSA-5vg9-5847-vvmq)
- [Playwright v1.61.0](https://github.com/microsoft/playwright/releases/tag/v1.61.0)
- [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
- Prior digest: `docs/research/tech-stack-updates-2026-06-15.md` (context only; in-window dates re-verified against primary sources above)
