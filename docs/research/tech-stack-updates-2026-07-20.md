# Tech stack updates — 2026-07-20 (America/New_York)

- **Window:** **2026-07-13 00:00** America/New_York (EDT, UTC−04:00) → **2026-07-20 23:59** America/New_York — i.e. **2026-07-13 04:00 UTC** through **2026-07-21 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **OpenClaw (core):** **`2026.7.1` (Jul 13)** stable — Control UI/onboarding overhaul, **GPT-5.6** provider compatibility, stronger **Codex** delegation/`openclaw attach`, gateway crash-loop repair, credential hardening. Beta **`2026.7.2-beta.1`–`.3` (Jul 15–18)** continues the train. **monitor → upgrade** stable if deployed; reconcile **Codex `0.144.x`** pins.
- **Codex (core):** **`0.144.2` (Jul 13)** through **`0.144.6` (Jul 18)** — Guardian auto-review rollback (**`0.144.2`**), expanded dangerous-command detection (**`0.144.5`**), GPT-5.6 Sol/Terra/Luna bundled-instruction + **272k** context-window correction (**`0.144.6`**). **monitor → upgrade** on OpenClaw auth-profile alignment.
- **ChatGPT (core):** **Jul 13–16** — EEA WhatsApp return, supercharged cross-content search, **5,000-char** custom instructions (paid tiers), unified desktop layout with **Codex** switcher and cross-device Work sync. **monitor** for workflow surface changes; no new model-default shift in-window beyond prior **GPT-5.6 Sol** rollout (Jul 9, pre-window).
- **Antigravity (core):** **`2.3.0` (Jul 13)** — queued messages, plain-text attachments, message-execution settings; **`2.3.1` (Jul 16)** — startup fix for malformed `~/.gemini/config/config.json`. **monitor → upgrade** for OpenClaw orchestration IDE path.
- **Cursor (core):** **Jul 17** — Slack agent now shares a plan before execution, supports **multi-repo environments**, and cross-channel/thread workflows. No new IDE semver in-window (**3.11** shipped Jul 10, pre-window). **monitor** for team Slack + MCP posture.
- **Gemini / Hermes (core):** No primary-source changelog or release activity in-window (**Gemini** last entry **Jul 6**; **Hermes** last tag **`v0.18.2` Jul 7–8**). **hold / monitor**.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Codex** | **`0.144.5` (Jul 16):** expanded dangerous-command detection (more forced `rm` forms) and clearer rejection reasons when commands are denied. | upgrade (if deployed) | [0.144.5 release](https://github.com/openai/codex/releases/tag/rust-v0.144.5) |
| **OpenClaw** | **`2026.7.1`:** credential/token hardening, approval-scope limits, unsafe download/file/network blocking; beta **`2026.7.2`** adds MCP stdio schema fix and SSH hostname validation. | monitor → upgrade (stable) | [v2026.7.1](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1) · [v2026.7.2-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.3) |
| **Antigravity** | **`2.3.1` (Jul 16):** empty/malformed `config.json` in `~/.gemini/config/` could block startup. | upgrade (if affected) | [Antigravity changelog](https://antigravity.google/changelog) |
| **ChatGPT** | No new in-window CVE or security bulletin verified. Desktop Work sync expands cross-device surface — review admin opt-out / EKM policies on Enterprise. | monitor / policy | [Release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **Cursor** | **Jul 17** Slack cross-channel access expands agent reach across workspace channels — review trust boundaries. | monitor / policy | [Slack improvements](https://cursor.com/changelog/slack-improvements) |
| **Gemini** | No in-window security advisories verified (last changelog entry **Jul 6**, pre-window). | hold / monitor | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Hermes** | No in-window security advisories verified (last release **`v0.18.2` Jul 7–8**, pre-window). | hold / monitor | [Hermes releases](https://github.com/NousResearch/hermes-agent/releases) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Laravel** | **`v13.20.0` (Jul 14):** adds `#[SensitiveParameter]` on secret-carrying parameters; **Jul 15** community report of first-party `image` processing conflicting with Intervention/Image v2 (upstream fix in progress). | monitor / upgrade on app cadence | [v13.20.0](https://github.com/laravel/framework/releases/tag/v13.20.0) · [Issue #60783](https://github.com/laravel/framework/issues/60783) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **OpenClaw** | **`2026.7.1` (Jul 13):** Control UI overhaul, official iOS/Android/macOS updates, **GPT-5.6** compatibility, **`openclaw attach`** for Claude Code, Codex delegation reliability, gateway crash-loop repair, scheduled-work and remote-browser improvements. **`2026.7.2-beta.*` (Jul 15–18):** incremental fixes (Telegram, WhatsApp, MCP stdio schema, agent bind specs). | monitor → upgrade (stable) | Reconcile **Codex `0.144.x`** harness; **ChatGPT** desktop Codex view unchanged per Jul 16 notes | [v2026.7.1](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1) · [Release notes](https://docs.openclaw.ai/releases/2026.7.1) |
| **Codex** | **`0.144.2` (Jul 13):** Guardian auto-review prompting rollback. **`0.144.3`–`0.144.4`:** maintenance/chore-only. **`0.144.5` (Jul 16):** dangerous-command detection expansion. **`0.144.6` (Jul 18):** GPT-5.6 Sol/Terra/Luna bundled instructions refreshed; context windows corrected to **272,000** tokens. | monitor → upgrade on pin | **OpenClaw `2026.7.1`** Codex routes; **ChatGPT** desktop Codex view | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.144.6](https://github.com/openai/codex/releases/tag/rust-v0.144.6) |
| **ChatGPT** | **Jul 13:** WhatsApp return in EEA. **Jul 14:** supercharged search across chats, projects, images, documents. **Jul 15:** custom instructions limit **1,500 → 5,000** chars (Plus/Pro/Enterprise/Business/Edu). **Jul 16:** desktop global Chat/Codex switcher, unified Recents, Projects in desktop, cross-device Work sync. | monitor | Shared account surface with **Codex**; Work/Scheduled Tasks parallel **OpenClaw** cron patterns | [Release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **Antigravity** | **`2.3.0` (Jul 13):** queued messages, send-now option, message-execution settings, plain-text file attachments. **`2.3.1` (Jul 16):** startup stability for malformed Gemini config files. | monitor → upgrade | **OpenClaw** orchestration IDE; **Gemini** Interactions API lists **Antigravity Preview** agent (`antigravity-preview-05-2026`) | [Antigravity changelog](https://antigravity.google/changelog) |
| **Cursor** | **Jul 17:** Slack agent plan-before-execute, multi-repo environment targeting with mid-task repo switch, cross-channel/thread read/write. | monitor | AgentOS **`@cursor/sdk ^1.0.13`** — Slack changes are cloud-side, not SDK bump verified in-window | [Slack improvements](https://cursor.com/changelog/slack-improvements) |
| **Gemini** | No in-window changelog entries (last: **Jul 6** developer logs for Interactions API — pre-window). | hold / monitor | **OpenClaw** / **Antigravity** hybrid routing unchanged this week | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Hermes** | No in-window release (latest **`v0.18.2` Jul 7–8**, pre-window). | hold / monitor | Exploratory dabbling — no action unless actively deploying | [Hermes releases](https://github.com/NousResearch/hermes-agent/releases) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **`v13.20.0` (Jul 14)** — first-party `image` processing, `WithoutMiddleware` attribute, Redis session prefix, queue-fake hooks, HTTP client header normalization. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md`; check Intervention/Image v2 if using legacy image stack | [v13.20.0](https://github.com/laravel/framework/releases/tag/v13.20.0) |
| **@cursor/sdk** | Latest npm tag **`1.0.23` (Jul 3)** — pre-window; AgentOS `package.json` still pins **`^1.0.13`**. Docs note Node **22.13+** requirement. | monitor | Same ecosystem as **Cursor** Slack/multi-repo train; evaluate pin when scheduled scripts need newer stream types | [npm @cursor/sdk](https://www.npmjs.com/package/@cursor/sdk) · [SDK docs](https://cursor.com/docs/sdk/typescript) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP** | No additional in-window primary-source releases verified beyond rows above (timeboxed). | not applicable / hold | **MCP `2026-07-28`** final spec **8 days out** at window end | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Imagen 4 / Gemini 3 Image** model shutdown (announced Jun 15) | **2026-08-17** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT (announced May 28) | **2026-08-26** | confirmed | [Release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **OpenClaw** | **`2026.7.2`** stable promotion from beta train | not stated | tentative | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Hermes** | **v0.19.0** curated release notes for post-**v0.18.0** window | not stated | tentative | [v0.18.1 release notes](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.7) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (stateless core, MRTR, Tasks/MCP Apps extensions) — RC locked **May 21** | **2026-07-28** (8 days at window end) | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [SDK betas](https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28/) |
| **TypeScript** | **7.x** native Go port GA (repo devDependency still **`^5.8.3`**) | shipped pre-window (**Jun 18** per Microsoft devblog) | confirmed | [TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **OpenClaw** | **Codex** | **`2026.7.1` (Jul 13)** adds GPT-5.6 compatibility and stronger Codex delegation; **Codex `0.144.2`–`0.144.6`** ships harness fixes including GPT-5.6 **272k** context correction (**Jul 18**). | WoW auction analytics project should align OpenClaw stable + Codex CLI pins before adopting GPT-5.6 routes — context-window metadata changed mid-week. | [OpenClaw v2026.7.1](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1) · [Codex 0.144.6](https://github.com/openai/codex/releases/tag/rust-v0.144.6) |
| **ChatGPT** | **Codex** | **Jul 16** desktop update unifies Chat / Work / **Codex** in one app with global switcher; Codex view and workflows explicitly unchanged. | Single desktop surface for general reasoning (**ChatGPT**) and terminal agent (**Codex**) — reduces context switching vs separate Codex app, but OpenClaw auth profiles still need independent pin review. | [ChatGPT release notes (Jul 16)](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **Antigravity** | **Gemini** | **`2.3.0`/`2.3.1`** IDE polish; Gemini Interactions API documents **Antigravity Preview** as a managed agent and default in GA Interactions API (ecosystem context). | OpenClaw uses **Antigravity** for orchestration — queued messages and config-startup fix reduce HITL friction; managed-agent path on Gemini API is an alternative integration surface worth comparing. | [Antigravity changelog](https://antigravity.google/changelog) · [Interactions API overview](https://ai.google.dev/gemini-api/docs/interactions-overview) |
| **Cursor** | **MCP** | **Jul 17** Slack multi-repo + cross-channel workflows; **MCP `2026-07-28`** final spec **8 days out** with stateless HTTP and beta TypeScript v2 SDK. | AgentOS Customize/MCP posture from prior **`3.9`** train now meets an imminent protocol revision — plan opt-in testing before stateless transport lands. | [Cursor Slack changelog](https://cursor.com/changelog/slack-improvements) · [MCP SDK betas](https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28/) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Portfolio cites **Gemma 26b** / **Gemini 3.1 Pro**; official Interactions API model table lists **`gemma-4-26b-a4b-it`**, **`gemini-3.5-flash`**, **`gemini-3.1-pro-preview`** — refresh model IDs before OpenClaw/Antigravity routing changes.
- **`docs/TECH_STACK.md` → Antigravity:** Note **2.3.x** queued-message UX and **`~/.gemini/config/config.json`** startup dependency (malformed file blocks load per **`2.3.1`**).
- **`package.json` → `@cursor/sdk`:** Pin **`^1.0.13`** vs npm latest **`1.0.23` (Jul 3)** and documented Node **22.13+** requirement — evaluate bump when scheduled SDK scripts need current stream typings.
- **`package.json` → `typescript`:** Dev dependency **`^5.8.3`** vs **TypeScript 7.0 GA** — no urgent action for AgentOS (minimal TS surface), but note for React/TS client work.

## Searches & sources consulted

- [Cursor changelog](https://cursor.com/changelog) · [Slack improvements (Jul 17)](https://cursor.com/changelog/slack-improvements)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Interactions API overview](https://ai.google.dev/gemini-api/docs/interactions-overview)
- [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [Model release notes](https://help.openai.com/en/articles/9624314)
- [Codex changelog](https://developers.openai.com/codex/changelog) · [openai/codex releases](https://github.com/openai/codex/releases) (tags **`rust-v0.144.2`**–**`rust-v0.144.6`**)
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) · [2026.7.1 release notes](https://docs.openclaw.ai/releases/2026.7.1)
- [Antigravity changelog](https://antigravity.google/changelog)
- [Laravel v13.20.0](https://github.com/laravel/framework/releases/tag/v13.20.0) · [Issue #60783](https://github.com/laravel/framework/issues/60783)
- [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [MCP SDK betas](https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28/)
- [npm @cursor/sdk](https://www.npmjs.com/package/@cursor/sdk) · [Cursor SDK docs](https://cursor.com/docs/sdk/typescript)
- [React releases](https://github.com/facebook/react/releases) · [TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
- Prior digest: `docs/research/tech-stack-updates-2026-06-29.md`
