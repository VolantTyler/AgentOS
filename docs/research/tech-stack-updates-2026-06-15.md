# Tech stack updates — 2026-06-15 (America/New_York)

- **Window:** **2026-06-09 00:00** America/New_York (EDT, UTC−04:00) → **2026-06-15 23:59** America/New_York — i.e. **2026-06-09 04:00 UTC** through **2026-06-16 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **OpenClaw (core):** **`2026.6.5` (Jun 9)** stable train with **`YYYY.M.PATCH`** numbering, Parallel `web_search`, MCP result coercion, and Vertex catalog recovery; **`2026.6.6` (Jun 12)** tightens security boundaries (transcripts, sandbox, MCP stdio, Codex HTTP) and channel delivery; **`2026.6.7` / `2026.6.8-beta.1` (Jun 14)** betas continue the train. **monitor → upgrade** on OpenClaw cadence; read security rows before plugin/channel changes.
- **Codex (core):** **Jun 8–11** shipped **CLI `0.138.0` / `0.139.0`** and **app `26.608` / `26.609`** — Browser Developer mode (CDP), `/init` composer scaffold, rate-limit reset banking, Computer Use expansion + per-app Windows controls, standalone web search in code mode, richer MCP schema (`oneOf`/`allOf`). **monitor** for OpenClaw pin alignment; **upgrade** CLI/app when harness pins move.
- **Cursor (core):** **Jun 10** — Bugbot powered by **Composer 2.5** (~90s reviews, `/review` pre-push); **monitor** for AgentOS PR workflows; pair with **Codex** review surfaces.
- **Antigravity (core):** **`2.1.4` (Jun 11)** — quota UI, PDF attachments to Gemini models, `/btw` side questions, nested subagents in overview, MCP stability + `mcp_config.json` `url` alias. **monitor**; **June 18** Gemini CLI consumer cutoff still **3 days out**.
- **ChatGPT (core):** **Jun 8** (window edge) — interactive charts, in-chat email (Gmail/Outlook), workspace **App permissions**; **Jun 10** — simplified model picker (**Instant / Medium / High / Pro** tiers). **monitor** rollout variance (web vs mobile) and model-default shifts.
- **Gemini (core):** No new Gemini **API** changelog lines after **Jun 1** in-window; **Jun 8** **Gemini 3.5 Flash GA** in Code Assist (VS Code / IntelliJ) is the main Google Cloud signal at the window start. **hold** on API pins unless Interactions **`steps`** migration from **Jun 8** is still incomplete.
- **Hermes (core):** No releases in-window (**`v0.16.0` / `v2026.6.5` shipped Jun 5–6**, just before window). **hold / monitor** exploratory dabbling unless Tyler deliberately evals desktop + admin panel.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **OpenClaw** | **`2026.6.6` (Jun 12):** broad security boundary hardening — transcript redaction, sandbox binds, MCP stdio, Codex HTTP access, elevated sender checks, exec approvals fail-closed on timeout. | upgrade (if deployed) | [v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) |
| **Codex** | **`26.609` (Jun 11):** Computer Use for Enterprise outside EEA/UK/CH; **per-app Windows access controls**; Browser **Developer mode** (CDP) — new elevated-risk surface (admin-disable in cloud settings). | monitor / policy | [Codex changelog (2026-06-11)](https://developers.openai.com/codex/changelog) |
| **Antigravity** | **`2.1.4` (Jun 11):** `.vscode` and `.cache` added to **sensitive paths** requiring explicit confirmation; MCP server stability fixes. | monitor / policy | [Antigravity changelog](https://antigravity.google/changelog) |
| **ChatGPT** | No new in-window CVE; **Jun 8 App permissions** for connected apps is a **trust/consent** control for workspace admins. | monitor (workspace policy) | [Release notes (Jun 8)](https://openai.com/products/release-notes/) |
| **Gemini** | No in-window security advisories verified; **post–Jun 8** fallout if Interactions API clients still expect legacy `outputs` schema. | hold / verify migration | [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Cursor** | **Jun 10 Bugbot** — faster automated review; no CVE. `/review` pre-push is a **process** control, not a patch. | monitor | [Cursor changelog](https://cursor.com/changelog) |
| **Hermes** | No in-window releases; **`v0.16.0` security round** (CVE-2026-48710 Starlette pin, SSRF hardening) shipped **Jun 5–6** (pre-window). | upgrade (if deployed & still on v0.15.x) | [v2026.6.5](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Laravel** | **CVE-2026-48019** (CRLF injection in email validation) published **Jun 1** — **outside** this window but still relevant for any app on **`< 12.60.0` / `< 13.10.0`**. | upgrade (if affected) | [GHSA-5vg9-5847-vvmq](https://github.com/laravel/framework/security/advisories/GHSA-5vg9-5847-vvmq) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **OpenClaw** | **`2026.6.5` (Jun 9):** stable **`YYYY.M.PATCH`** train; Parallel bundled `web_search`; MCP block coercion; Anthropic stream recovery; Vertex ADC catalog; SQLite auth profiles; deferred session-metadata SQLite migration. **`2026.6.6` (Jun 12):** security + Telegram/iMessage/browser-MCP reliability; OpenRouter OAuth; Claude Fable 5 adaptive thinking. **`2026.6.7` / `2026.6.8-beta.1` (Jun 14):** beta QA scorecard / plugin publish path refinements. | monitor → upgrade | Reconcile **Codex** harness pins; **Gemini** model IDs after 2.0 shutdown; **Antigravity** orchestration | [Releases](https://github.com/openclaw/openclaw/releases) · [v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) |
| **Codex** | **`0.138.0` (Jun 8):** `/app` handoff to Codex Desktop; plugin JSON output; PAT v2 auth. **`0.139.0` (Jun 9):** standalone web search in code mode; `oneOf`/`allOf` MCP schemas; `codex doctor` env report. **App `26.608` (Jun 9):** Migrate from Claude Code/Cowork. **App `26.609` (Jun 11):** Developer mode, `/init`, rate-limit reset banking, Unread chats menu, 2× Browser use perf. | monitor → upgrade on pin | **OpenClaw** Codex compaction/provider rows; **Cursor** review overlap | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.139.0](https://github.com/openai/codex/releases/tag/rust-v0.139.0) |
| **Cursor** | **Jun 10:** Bugbot ~**90s** avg review (Composer **2.5**); **`/review`** / **`/review-bugbot`** / **`/review-security`** pre-push; option to review only PR delta since last review. | monitor | AgentOS PR hygiene; pairs with **Codex** inline review on mobile | [Cursor changelog](https://cursor.com/changelog) |
| **Antigravity** | **`2.1.4` (Jun 11):** quota screen redesign; **PDF attachments** to Gemini models; **`/btw`** ephemeral side agent; conversation search; nested subagents in overview; MCP `url` field alias. | monitor | **Gemini 3.5 Flash** default in product stack; **OpenClaw** IDE handoff patterns | [Antigravity changelog](https://antigravity.google/changelog) |
| **ChatGPT** | **Jun 8:** interactive charts, TOC, full-screen writing, **send email from chat** (Gmail/Outlook); workspace **App permissions**. **Jun 10:** simplified model picker — **Instant / Medium / High / Extra High / Pro** tiers; Instant→Medium auto-switch toggle. | monitor | Shared account with **Codex**; model picker terminology now mirrors **Codex** tiers | [Release notes](https://openai.com/products/release-notes/) · [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **Gemini** | **Jun 8 (window start):** **Gemini 3.5 Flash GA** in **Gemini Code Assist** (VS Code & IntelliJ) for agent mode, chat, and code generation. No newer API changelog entries in-window. | hold / monitor | **OpenClaw** hybrid routing; **Antigravity** PDF + model defaults | [Gemini for Google Cloud release notes (Jun 8)](https://docs.cloud.google.com/gemini/docs/release-notes) |
| **Hermes** | No in-window release (**`v0.16.0` desktop + admin panel** shipped **Jun 5–6**). | hold | Optional **`antigravity-cli`** skill still relevant vs **Antigravity** Jun 18 CLI migration | [v2026.6.5](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **`v13.14.0` (Jun 4)** — JsonSchema multi-type unions, `rememberWithState()` cache (window edge). **`v13.15.0` / `v12.62.0` (Jun 9)** — JSON Schema array deserializer, JsonSchema union support, PostgreSQL `pg_collation` guard. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md`; patch **CVE-2026-48019** separately | [v13.15.0](https://github.com/laravel/framework/releases/tag/v13.15.0) · [v12.62.0](https://github.com/laravel/framework/releases/tag/v12.62.0) |
| **@cursor/sdk** | No separate npm tag in-window beyond **Jun 4 Cursor SDK 3.7** (pre-window); AgentOS scheduled scripts should still **`npm install @cursor/sdk`** when bumping. | monitor | Same train as **Cursor** Bugbot / Composer 2.5 routing | [SDK updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026) |
| **PostgreSQL / Docker** | **PostgreSQL 19 Beta 1** (Jun 4) and official **`postgres:19beta1`** images (merged **Jun 5**) — **before** window; no new beta in-window. | defer (beta only) | Stretch **Docker** learning — not for production | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / Sequelize / Python / SQLite / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP** | No additional in-window primary-source releases verified beyond rows above (timeboxed). **Playwright** latest stable remains **`v1.60.0` (May 11)**. | not applicable / hold | **MCP `2026-07-28`** final spec still **43 days out** (RC locked May 21) | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Antigravity** | **Gemini CLI** + **Gemini Code Assist IDE extensions** stop serving consumer **Google AI Pro/Ultra** and free individual tiers | **2026-06-18** | confirmed | [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **Gemini** | **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shutdown | **2026-06-25** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **OpenClaw** | Session-metadata **SQLite migration** deferred from **`2026.6.5`** train — landing on `main` later | not stated | tentative | [v2026.6.5 release notes](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5) |
| **Codex** | **Sites** plugin remains preview; Enterprise RBAC gates | rolling | tentative | [Codex changelog](https://developers.openai.com/codex/changelog) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (stateless core, mandatory headers) — RC locked **May 21** | **2026-07-28** | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **TypeScript 7.0** native port (`@typescript/native-preview`) after **6.0** transition | no fixed GA date in-window | tentative | [TypeScript 7.0 Beta announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **OpenClaw** | **Codex** | **`2026.6.6`** preserves Codex compaction ownership, Gemma 4 reasoning replay, and tightens Codex HTTP boundaries while **Codex `26.609`** adds Browser Developer mode and Windows Computer Use controls. | WoW analytics orchestration should reconcile **OpenClaw** upgrade with **Codex** version pins and approval posture in one pass. | [OpenClaw v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Antigravity** | **Gemini** | **`2.1.4`** adds **PDF attachments** to Gemini model messages; **Gemini 3.5 Flash GA** in Code Assist landed **Jun 8**. | OpenClaw + Antigravity workflows that pass documents to Gemini should test PDF ingestion and quota UI together. | [Antigravity changelog](https://antigravity.google/changelog) · [Gemini Cloud release notes](https://docs.cloud.google.com/gemini/docs/release-notes) |
| **Cursor** | **Codex** | **Cursor Bugbot** (Composer **2.5**, Jun 10) and **Codex** mobile inline review + **`/goal`** (Jun 9) push automated review across IDE, web agents, and mobile. | Compare pre-push **`/review`** vs **Codex** PR babysitter before changing AgentOS CI habits. | [Cursor changelog](https://cursor.com/changelog) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **ChatGPT** | **Codex** | **Jun 10** ChatGPT model picker tiers align with **Codex** speed/reasoning vocabulary; **Jun 9** iOS adds worktrees + Codex profile screen. | Same OpenAI account, different surfaces — model defaults may diverge between **ChatGPT** web and **Codex CLI**. | [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Antigravity** | **MCP** | **`2.1.4`** MCP stability + `url`/`serverUrl` schema alias ahead of **MCP 2026-07-28** stateless migration. | OpenClaw/Antigravity MCP configs are worth auditing before the July cutover. | [Antigravity changelog](https://antigravity.google/changelog) · [MCP RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Portfolio still lists **“Gemini 3.1 Pro + Gemma 26b”** and **“Gemini 2.5 Flash + Gemma e2b”** — official docs show **`gemini-3.5-flash` GA** (API May 19; Code Assist Jun 8), **`gemini-2.0-*` shutdown (Jun 1)**, and **Interactions API `steps` schema (Jun 8)**; refresh tier table and migration notes.
- **`docs/TECH_STACK.md` → OpenClaw:** Bump portfolio references from **`2026.6.2` / `2026.6.5-beta`** to **`2026.6.6`** stable (or latest beta **`2026.6.8-beta.1`**) and note **`YYYY.M.PATCH`** monthly train.
- **`docs/TECH_STACK.md` → Codex:** Update any harness pins from **`0.137.0` / `26.602`** toward **`0.139.0` / `26.609`** when Tyler upgrades OpenClaw.
- **`docs/TECH_STACK.md` → Hermes:** Exploratory line should reference **`v0.16.0+`** (desktop + browser admin) — shipped **Jun 5–6**, not **`v0.15.x`**.
- **`docs/TECH_STACK.md` → Antigravity:** Note **`2.1.4`** PDF-to-Gemini + **`2.0.11`** IDE handoff fixes; add **Jun 18, 2026** Gemini CLI consumer cutoff as a calendar item.
- **`docs/TECH_STACK.md` → ChatGPT:** Document **Jun 10** simplified picker (**Instant / Medium / High / Pro**) vs legacy Thinking labels.
- **`docs/TECH_STACK.md` → Laravel (non-core):** Flag **CVE-2026-48019** patch floor (**≥ 12.60.0 / ≥ 13.10.0**) for any mail-to-user-supplied-address flows.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`
- [Cursor changelog](https://cursor.com/changelog) · [SDK updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Gemini for Google Cloud release notes](https://docs.cloud.google.com/gemini/docs/release-notes) · [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026)
- [OpenAI Codex changelog](https://developers.openai.com/codex/changelog) · [Codex `0.139.0`](https://github.com/openai/codex/releases/tag/rust-v0.139.0) · [OpenAI product release notes](https://openai.com/products/release-notes/)
- [ChatGPT release notes (Help Center)](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) — Jun 10 model picker text cross-checked via Help Center mirrors; direct fetch returned cookie gate
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) · [v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) · [v2026.6.5](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5)
- [Hermes Agent v2026.6.5](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5)
- [Google Antigravity changelog](https://antigravity.google/changelog)
- [Laravel `v13.15.0`](https://github.com/laravel/framework/releases/tag/v13.15.0) · [CVE GHSA-5vg9-5847-vvmq](https://github.com/laravel/framework/security/advisories/GHSA-5vg9-5847-vvmq)
- [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/)
- Prior digest: `docs/research/tech-stack-updates-2026-06-08.md` (context only; in-window dates re-verified against primary sources above)
