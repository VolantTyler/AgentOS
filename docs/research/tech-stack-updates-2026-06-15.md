# Tech stack updates — 2026-06-15 (America/New_York)

- **Window:** **2026-06-08 00:00** America/New_York (EDT, UTC−04:00) → **2026-06-15 23:59** America/New_York — i.e. **2026-06-08 04:00 UTC** through **2026-06-16 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini (core):** **June 8** — Interactions API **legacy `outputs` schema removed**; clients must use the **`steps`** schema (SDK ≥2.0.0 or REST with new revision). Same day, **Gemini 3.5 Flash GA** landed in **Gemini Code Assist** (VS Code / IntelliJ). **June 25** image-preview shutdown still ahead. **upgrade / migrate** Interactions clients; **monitor** image-preview deprecations.
- **OpenClaw (core):** **`2026.6.5` (Jun 8–9)** stable **`YYYY.M.PATCH`** train — Parallel `web_search`, MCP result coercion, Vertex catalog recovery; **`2026.6.6` (Jun 12)** broad security boundary hardening; **`2026.6.7` / `2026.6.8-beta.1` (Jun 13–14)** betas continue channel/provider fixes. **monitor → upgrade** on OpenClaw cadence; read security rows before plugin/channel changes.
- **Codex (core):** **Jun 8–11** — **CLI `0.138.0` / `0.139.0`**, **app `26.608` / `26.609`** — Browser Developer mode (CDP), `/init` composer scaffold, rate-limit reset banking, Computer Use expansion + per-app Windows controls, standalone web search in code mode, richer MCP schema (`oneOf`/`allOf`). **monitor** for OpenClaw pin alignment.
- **Antigravity (core):** **`2.1.4` (Jun 11)** — quota UI redesign, PDF attachments to Gemini models, **`/btw`** side questions, nested subagents in overview, MCP stability + `mcp_config.json` `url` alias. **monitor**; **June 18** Gemini CLI consumer cutoff is **3 days out** at window end.
- **ChatGPT (core):** **Jun 8** — interactive charts, in-chat email (Gmail/Outlook), workspace **App permissions**; **Jun 10** — simplified model picker (**Instant / Medium / High / Pro** tiers). **monitor** rollout variance and model-default shifts.
- **Cursor (core):** **Jun 10** — Bugbot powered by **Composer 2.5** (~90s reviews, `/review` pre-push, delta-only PR review option). **monitor** for AgentOS PR workflows.
- **Hermes (core):** No in-window releases (**`v0.16.0` / `v2026.6.5` shipped Jun 5–6**, just before window). **hold / monitor** exploratory dabbling unless Tyler deliberately evals desktop + admin panel.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **June 8:** Interactions API **legacy `outputs` schema removed** — Python/JS SDK 1.x and REST clients on legacy schema break. Migration guide states removal date **June 8, 2026**. | upgrade / migrate | [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) · [Changelog (May 6 notice)](https://ai.google.dev/gemini-api/docs/changelog) |
| **OpenClaw** | **`2026.6.6` (Jun 12):** broad security boundary hardening — transcript redaction, sandbox binds, MCP stdio, Codex HTTP access, elevated sender checks, exec approvals fail-closed on timeout. | upgrade (if deployed) | [v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) |
| **Codex** | **`26.609` (Jun 11):** Computer Use for Enterprise outside EEA/UK/CH; **per-app Windows access controls**; Browser **Developer mode** (CDP) — new elevated-risk surface (admin-disable in cloud settings). | monitor / policy | [Codex changelog (2026-06-11)](https://developers.openai.com/codex/changelog) |
| **Antigravity** | **`2.1.4` (Jun 11):** `.vscode` and `.cache` added to **sensitive paths** requiring explicit confirmation; MCP server stability fixes. | monitor / policy | [Antigravity changelog](https://antigravity.google/changelog) |
| **ChatGPT** | No in-window CVE; **Jun 8 App permissions** for connected apps is a **trust/consent** control for workspace admins. | monitor (workspace policy) | [Release notes (Jun 8)](https://openai.com/products/release-notes/) |
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
| **Gemini** | **Jun 8:** Interactions API **`outputs` → `steps`** enforcement (breaking). **Jun 8:** **Gemini 3.5 Flash GA** in **Gemini Code Assist** (VS Code & IntelliJ) for agent mode, chat, code generation. No newer **Gemini API** changelog entries in-window after **Jun 1** 2.0 shutdown. | upgrade / migrate (Interactions) · hold (API pins) | Reconcile **OpenClaw** hybrid routing + Interactions clients; **Antigravity** PDF + model defaults | [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) · [Gemini Cloud release notes (Jun 8)](https://docs.cloud.google.com/gemini/docs/release-notes) |
| **OpenClaw** | **`2026.6.5` (Jun 8–9):** stable **`YYYY.M.PATCH`** train; Parallel bundled `web_search`; MCP block coercion; Anthropic stream recovery; Vertex ADC catalog; SQLite auth profiles; deferred session-metadata SQLite migration. **`2026.6.6` (Jun 12):** security + Telegram/iMessage/browser-MCP reliability; OpenRouter OAuth; Claude Fable 5 adaptive thinking; Gemma 4 reasoning replay. **`2026.6.7` / `2026.6.8-beta.1` (Jun 13–14):** channel delivery, provider/model replay, SQLite WAL-on-NFS guard, beta QA scorecard refinements. | monitor → upgrade | Reconcile **Codex** harness pins; **Gemini** Interactions + model IDs | [Releases](https://github.com/openclaw/openclaw/releases) · [v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) |
| **Codex** | **`0.138.0` (Jun 8):** `/app` handoff to Codex Desktop; plugin JSON output; PAT v2 auth. **`0.139.0` (Jun 9):** standalone web search in code mode; `oneOf`/`allOf` MCP schemas; `codex doctor` env report. **App `26.608` (Jun 9):** Migrate from Claude Code/Cowork. **App `26.609` (Jun 11):** Developer mode, `/init`, rate-limit reset banking, Unread chats menu, 2× Browser use perf. | monitor → upgrade on pin | **OpenClaw** Codex compaction/provider rows; **Cursor** review overlap | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.139.0](https://github.com/openai/codex/releases/tag/rust-v0.139.0) |
| **Cursor** | **Jun 10:** Bugbot ~**90s** avg review (Composer **2.5**); **`/review`** / **`/review-bugbot`** / **`/review-security`** pre-push; option to review only PR delta since last review. | monitor | AgentOS PR hygiene; pairs with **Codex** inline review on mobile | [Cursor changelog](https://cursor.com/changelog) |
| **Antigravity** | **`2.1.4` (Jun 11):** quota screen redesign; **PDF attachments** to Gemini models; **`/btw`** ephemeral side agent; conversation search; nested subagents in overview; MCP `url` field alias. | monitor | **Gemini 3.5 Flash** default in product stack; **OpenClaw** `/btw` parity in **2026.6.7** | [Antigravity changelog](https://antigravity.google/changelog) |
| **ChatGPT** | **Jun 8:** interactive charts, TOC, full-screen writing, **send email from chat** (Gmail/Outlook); workspace **App permissions**. **Jun 10:** simplified model picker — **Instant / Medium / High / Extra High / Pro Standard / Pro Extended**; Instant→Medium auto-switch toggle; **Thinking Light** removed. | monitor | Shared account with **Codex**; model picker terminology now mirrors **Codex** tiers | [Release notes](https://openai.com/products/release-notes/) · [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **Hermes** | No in-window release (**`v0.16.0` desktop + admin panel** shipped **Jun 5–6**). | hold | Optional **`antigravity-cli`** skill still relevant vs **Antigravity** Jun 18 CLI migration | [v2026.6.5](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **`v13.15.0` (Jun 9)** — JsonSchema union support, `rememberWithState()` cache, routing unserialization hardening, validation fixes. **`v12.62.0` (Jun 9)** — JSON Schema array deserializer, JsonSchema multi-type unions, PostgreSQL `pg_collation` guard. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md`; patch **CVE-2026-48019** separately | [v13.15.0](https://github.com/laravel/framework/releases/tag/v13.15.0) · [v12.62.0](https://github.com/laravel/framework/releases/tag/v12.62.0) |
| **Python** | **`3.14.6` (Jun 10)** — sixth maintenance release (~179 bugfixes since 3.14.5). **`3.13.14`** also released same day. | monitor / upgrade on OpenClaw ETL cadence | **OpenClaw** Python ETL pipelines | [Python 3.14.6](https://www.python.org/downloads/release/python-3146/) · [Python Insider](https://blog.python.org/2026/06/python-3146-31314/) |
| **@cursor/sdk** | No separate npm tag in-window beyond **Jun 4 Cursor SDK 3.7** (pre-window); AgentOS `package.json` still pins **`^1.0.13`**. | monitor | Same train as **Cursor** Bugbot / Composer 2.5 routing | [SDK updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP** | No additional in-window primary-source releases verified beyond rows above (timeboxed). **Playwright** latest stable remains **`v1.60.0` (May 18)**. **React** latest remains **`v19.2.7` (Jun 1)**. | not applicable / hold | **MCP `2026-07-28`** final spec still **43 days out** (RC locked May 21) | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Antigravity** | **Gemini CLI** + **Gemini Code Assist IDE extensions** stop serving consumer **Google AI Pro/Ultra** and free individual tiers | **2026-06-18** | confirmed | [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **Gemini** | **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shutdown | **2026-06-25** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **ChatGPT** | **GPT-4.5** retirement from ChatGPT (announced May 28) | **2026-06-27** | confirmed | [Release notes (May 28)](https://openai.com/products/release-notes/) |
| **OpenClaw** | Session-metadata **SQLite migration** deferred from **`2026.6.5`** train — landing on `main` later | not stated | tentative | [v2026.6.5 release notes](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5) |
| **Codex** | **Sites** plugin remains preview; Enterprise RBAC gates | rolling | tentative | [Codex changelog](https://developers.openai.com/codex/changelog) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (stateless core, mandatory headers) — RC locked **May 21** | **2026-07-28** | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **6.x** maintenance mode; **TypeScript 7** native port (`typescript-go`) | no fixed GA date in-window | tentative | [Maintenance mode issue](https://github.com/microsoft/TypeScript/issues/62963) · [typescript-go](https://github.com/microsoft/typescript-go) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle (**Beta 1** shipped **Jun 4**, pre-window) | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **OpenClaw** | **Jun 8** Interactions **`steps`** enforcement + **OpenClaw `2026.6.5–2026.6.8`** Vertex/provider fixes and Gemma 4 reasoning replay (**2026.6.6**). | WoW analytics hybrid **Gemini + Gemma** configs need both Interactions-client and model-ID audits before the next deploy. | [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) · [OpenClaw v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) |
| **Antigravity** | **OpenClaw** | **`2.1.4`** and **OpenClaw `2026.6.7`** both ship **`/btw`** ephemeral side-agent patterns; **Antigravity** adds PDF-to-Gemini while **OpenClaw** adds Telegram rich text + WhatsApp ACP bindings (**2026.6.8**). | Multi-agent orchestration surfaces are converging on side-question + document-ingest patterns — worth comparing HITL posture. | [Antigravity changelog](https://antigravity.google/changelog) · [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **OpenClaw** | **Codex** | **`2026.6.6`** preserves Codex compaction ownership, tightens Codex HTTP boundaries, and adds browser-MCP CDP support while **Codex `26.609`** adds Browser Developer mode and Windows Computer Use controls. | Reconcile **OpenClaw** upgrade with **Codex** version pins and approval posture in one pass. | [OpenClaw v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Cursor** | **Codex** | **Cursor Bugbot** (Composer **2.5**, Jun 10) and **Codex** mobile inline review + **`/goal`** (Jun 9) push automated review across IDE, web agents, and mobile. | Compare pre-push **`/review`** vs **Codex** PR workflows before changing AgentOS CI habits. | [Cursor changelog](https://cursor.com/changelog) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **ChatGPT** | **Codex** | **Jun 10** ChatGPT model picker tiers align with **Codex** speed/reasoning vocabulary; **Jun 9** iOS adds worktrees + Codex profile screen. | Same OpenAI account, different surfaces — model defaults may diverge between **ChatGPT** web and **Codex CLI**. | [Release notes](https://openai.com/products/release-notes/) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Antigravity** | **MCP** | **`2.1.4`** MCP stability + `url`/`serverUrl` schema alias ahead of **MCP 2026-07-28** stateless migration. | OpenClaw/Antigravity MCP configs are worth auditing before the July cutover. | [Antigravity changelog](https://antigravity.google/changelog) · [MCP RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Portfolio still lists **“Gemini 3.1 Pro + Gemma 26b”** and **“Gemini 2.5 Flash + Gemma e2b”** — official docs show **`gemini-3.5-flash` GA** (API May 19; Code Assist Jun 8), **`gemini-2.0-*` shutdown (Jun 1)**, and **Interactions API `steps` schema (Jun 8)**; refresh tier table and migration notes.
- **`docs/TECH_STACK.md` → OpenClaw:** Bump portfolio references from **`2026.6.2` / `2026.6.5-beta`** to **`2026.6.6`** stable (or latest beta **`2026.6.8-beta.1`**) and note **`YYYY.M.PATCH`** monthly train.
- **`docs/TECH_STACK.md` → Codex:** Update any harness pins from **`0.137.0` / `26.602`** toward **`0.139.0` / `26.609`** when Tyler upgrades OpenClaw.
- **`docs/TECH_STACK.md` → Hermes:** Exploratory line should reference **`v0.16.0+`** (desktop + browser admin) — shipped **Jun 5–6**, not **`v0.15.x`**.
- **`docs/TECH_STACK.md` → Antigravity:** Note **`2.1.4`** PDF-to-Gemini + **`/btw`**; add **Jun 18, 2026** Gemini CLI consumer cutoff as a calendar item.
- **`docs/TECH_STACK.md` → ChatGPT:** Document **Jun 10** simplified picker (**Instant / Medium / High / Pro**) vs legacy Thinking labels.
- **`docs/TECH_STACK.md` → Laravel (non-core):** Flag **CVE-2026-48019** patch floor (**≥ 12.60.0 / ≥ 13.10.0**) for any mail-to-user-supplied-address flows.
- **`docs/TECH_STACK.md` → @cursor/sdk`:** Document **`@cursor/sdk` 3.7** (custom tools, JSONL store, nested subagents) under AgentOS scheduled automation when `package.json` is bumped from **`^1.0.13`**.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`
- [Cursor changelog](https://cursor.com/changelog) · [SDK updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Gemini for Google Cloud release notes](https://docs.cloud.google.com/gemini/docs/release-notes) · [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations)
- [OpenAI Codex changelog](https://developers.openai.com/codex/changelog) · [Codex `0.139.0`](https://github.com/openai/codex/releases/tag/rust-v0.139.0) · [Codex `0.138.0`](https://github.com/openai/codex/releases/tag/rust-v0.138.0) · [OpenAI product release notes](https://openai.com/products/release-notes/)
- [ChatGPT release notes (Help Center)](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) — Jun 10 model picker cross-checked via Releasebot mirror of Help Center content; direct fetch returned cookie gate
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) · [v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) · [v2026.6.5](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5)
- [Hermes Agent v2026.6.5](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5)
- [Google Antigravity changelog](https://antigravity.google/changelog) · [Gemini CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)
- [Laravel `v13.15.0`](https://github.com/laravel/framework/releases/tag/v13.15.0) · [Laravel `v12.62.0`](https://github.com/laravel/framework/releases/tag/v12.62.0) · [CVE GHSA-5vg9-5847-vvmq](https://github.com/laravel/framework/security/advisories/GHSA-5vg9-5847-vvmq)
- [Python 3.14.6](https://www.python.org/downloads/release/python-3146/) · [Python Insider Jun 2026](https://blog.python.org/2026/06/python-3146-31314/)
- [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [Playwright PyPI history](https://pypi.org/project/playwright/#history)
- Prior digest: `docs/research/tech-stack-updates-2026-06-08.md` (context only; in-window dates re-verified against primary sources above)
