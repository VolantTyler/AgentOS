# Tech stack updates — 2026-07-27 (America/New_York)

- **Window:** **2026-07-20 00:00** America/New_York (EDT, UTC−04:00) → **2026-07-27 23:59** America/New_York — i.e. **2026-07-20 04:00 UTC** through **2026-07-28 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini (core):** **Jul 21** — **`gemini-3.6-flash`** and **`gemini-3.5-flash-lite`** reached GA; sampling parameters **`temperature`**, **`top_p`**, and **`top_k`** are now **deprecated** on latest 3.x models. **monitor → plan migration** for OpenClaw/Antigravity routing and any code passing sampling knobs.
- **Hermes (core):** **`v0.19.0` (Jul 20)** “Quicksilver” — ~80% first-turn TTFT cut, smart approvals default, **1Password** / **Bitwarden** secret sources, GPT-5.6 model wiring, delivery-obligation ledger, security hardening. **monitor** (exploratory stack) unless actively deploying.
- **Cursor (core):** **Jul 22** — **Cursor Router** powers Auto mode with **Cost / Balance / Intelligence** optimization tiers; admin controls per team/group; available on desktop, web, iOS, CLI, and SDK. **monitor** for AgentOS cost posture and team policy.
- **ChatGPT (core):** **Jul 23** — **Health in ChatGPT** rolls out to eligible U.S. users (18+); **Voice in Work and Codex** lands in the desktop app. **Jul 20** iOS updates (Mermaid diagrams, interactive forms, prompt recovery). **monitor / policy** — Health expands connected-data surface.
- **Antigravity (core):** **`2.4.2` (Jul 24)** — MCP connection/tool-call **timeouts**, preview tabs, **JSON/MD/CSV** attachments, perf and auth-error fixes. **monitor → upgrade** for OpenClaw orchestration IDE path.
- **Codex (core):** **`0.146.0-alpha.1`–`alpha.13` (Jul 22–27)** pre-release train; last stable in prior window **`0.144.6` (Jul 18)**. **hold / defer** alpha; reconcile OpenClaw bundled **`0.144.6`** pin before jumping trains.
- **OpenClaw (core):** No primary-source release after **`2026.7.2-beta.3` (Jul 18, pre-window)**. **hold / monitor** for **`2026.7.2`** stable promotion.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Hermes** | **`v0.19.0`:** security hardening — credential scoping, webhook body-size caps, bot-token redaction, shared credential-read guards for media/vision paths. | monitor → upgrade (if deployed) | [v0.19.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.20) |
| **Antigravity** | **`2.4.2`:** MCP connection/tool-call timeouts prevent indefinite hangs; fix for duplicate MCP tool names in customizations blocking agent init. | upgrade (if affected) | [Antigravity changelog](https://antigravity.google/changelog) |
| **Gemini** | **Jul 21:** deprecated sampling params on latest 3.x models — configs passing **`temperature`/`top_p`/`top_k`** may silently ignore values (breaking-behavior risk for tuned prompts). | monitor / migrate | [Gemini API changelog (Jul 21)](https://ai.google.dev/gemini-api/docs/changelog) |
| **ChatGPT** | **Jul 23:** Health connects medical records / Apple Health — expands sensitive-data surface; OpenAI terms still disclaim diagnostic use. Review what Tyler connects. | monitor / policy | [OpenAI release notes (Jul 23)](https://openai.com/products/release-notes/) |
| **Codex** | Alpha **`0.146.0-*`** train only in-window; no new stable security bulletin verified beyond prior **`0.144.5`** dangerous-command expansion (Jul 16, pre-window). | hold / defer alpha | [openai/codex releases](https://github.com/openai/codex/releases) |
| **Cursor** | No new in-window CVE or security bulletin verified for Cursor Router launch. | monitor | [Cursor changelog](https://cursor.com/changelog) |
| **OpenClaw** | No in-window release; prior **`2026.7.2-beta.3`** MCP stdio schema fix and SSH hostname validation remain latest verified (Jul 18). | hold / monitor | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Laravel** | **`v13.22.0` (Jul 24):** marks HTTP testing credentials as **`#[SensitiveParameter]`**; queue/cache/validation hardening in patch train. | monitor / upgrade on app cadence | [v13.22.0](https://github.com/laravel/framework/releases/tag/v13.22.0) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **Gemini** | **Jul 21:** **`gemini-3.6-flash`** GA (token-efficient, agentic planning); **`gemini-3.5-flash-lite`** GA (low-latency subagent tier); sampling params deprecated. | monitor → migrate models | **OpenClaw** hybrid Gemini + Gemma routing; **Antigravity** Gemini config path — refresh model IDs in `TECH_STACK.md` | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Hermes** | **`v0.19.0` (Jul 20):** ~80% TTFT reduction; reasoning streams default; smart approvals default; **1Password** (`op://`) + **Bitwarden** secret sources; live subagent transcripts; GPT-5.6 / grok-4.5 / claude-fable-5 catalog updates; **`max`/`ultra`** reasoning tiers. | monitor | Pairs with Tyler’s **1Password** stack entry; overlaps conceptually with **OpenClaw** HITL + subagent patterns | [v0.19.0](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.20) |
| **Cursor** | **Jul 22:** **Cursor Router** — Auto mode routes by task complexity with **Cost / Balance / Intelligence** modes; per-team admin enablement, mode restrictions, model allow/block lists; Grok 4.5 as price-efficient option. | monitor | AgentOS **`@cursor/sdk`** ecosystem; Router available across SDK per changelog | [Cursor changelog (Jul 22)](https://cursor.com/changelog) |
| **ChatGPT** | **Jul 23:** Health experience for eligible U.S. users; Voice in **Work** and **Codex** on desktop. **Jul 20:** iOS Mermaid diagrams, interactive forms, prompt recovery; OpenAI API org/project spend limits. | monitor / policy | Desktop Voice in **Codex** complements **OpenClaw** Codex delegation; Health is orthogonal to coding workflows | [OpenAI release notes](https://openai.com/products/release-notes/) |
| **Antigravity** | **`2.4.2` (Jul 24):** preview tabs, MCP timeouts, JSON/MD/CSV attachments, Cmd+L quote shortcut, conversation-switch perf, auth error clarity. | monitor → upgrade | **OpenClaw** orchestration IDE; MCP timeout aligns with imminent **MCP `2026-07-28`** spec | [Antigravity changelog](https://antigravity.google/changelog) |
| **Codex** | **`0.146.0-alpha.1` (Jul 22)** through **`alpha.13` (Jul 27)** — pre-release assets only; no granular stable changelog entries verified in-window. | defer (alpha) | **OpenClaw** still bundles **`0.144.6`**; alpha train is ahead of production pins | [openai/codex releases](https://github.com/openai/codex/releases) |
| **OpenClaw** | No in-window tagged release (latest **`2026.7.2-beta.3`**, Jul 18). | hold / monitor | Await **`2026.7.2`** stable before WoW auction analytics upgrade | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **`v13.21.0` (Jul 21)** tag; **`v13.22.0` (Jul 24)** — queue-fake hooks, HTTP fake stream bodies, `Cache::touch()` fix, `#[BindWhen()]` attribute, multi-queue `queue:clear`, DNS lookup faking in validation. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md` | [v13.22.0](https://github.com/laravel/framework/releases/tag/v13.22.0) · [v13.21.0](https://github.com/laravel/framework/releases/tag/v13.21.0) |
| **@cursor/sdk** | npm **`1.0.24` (Jul 20)** — in-window bump; AgentOS `package.json` still pins **`^1.0.13`**. | monitor | Same ecosystem as **Cursor Router** (Jul 22) SDK availability note | [npm @cursor/sdk](https://www.npmjs.com/package/@cursor/sdk) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP** | No additional in-window **primary-source** releases verified beyond rows above (timeboxed). | not applicable / hold | **MCP `2026-07-28`** final spec ships **tomorrow** at window end | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Imagen 4 / Gemini 3 Image** model shutdown (announced Jun 15) | **2026-08-17** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT (announced May 28) | **2026-08-26** | confirmed | [OpenAI release notes](https://openai.com/products/release-notes/) |
| **OpenClaw** | **`2026.7.2`** stable promotion from beta train | not stated | tentative | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Codex** | **`0.146.0`** stable from alpha train | not stated | tentative | [openai/codex releases](https://github.com/openai/codex/releases) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification — stateless HTTP core, MRTR, MCP Apps + Tasks extensions, deprecation of Roots/Sampling/Logging | **2026-07-28** (1 day at window end) | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [SDK betas](https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28/) |
| **TypeScript** | **7.x** native Go port GA (repo devDependency still **`^5.8.3`**) | shipped pre-window (**Jun 18** per Microsoft devblog) | confirmed | [TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **OpenClaw** / **Antigravity** | **Jul 21** GA for **`gemini-3.6-flash`** and **`gemini-3.5-flash-lite`** with deprecated sampling params. | OpenClaw’s hybrid Gemini + Gemma strategy and Antigravity’s Gemini config path should migrate model IDs and drop reliance on **`temperature`/`top_p`/`top_k`** before routing changes silently shift behavior. | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Antigravity** | **MCP** | **`2.4.2` (Jul 24)** adds MCP connection/tool-call timeouts; **MCP `2026-07-28`** final spec removes session handshake and enables stateless HTTP routing. | OpenClaw uses Antigravity for orchestration with MCP servers — timeout fix reduces hang risk this week; tomorrow’s spec is a breaking transport revision worth staging before production MCP servers upgrade. | [Antigravity changelog](https://antigravity.google/changelog) · [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **Hermes** | **1Password** | **`v0.19.0` (Jul 20)** ships first-class **1Password** (`op://`) and **Bitwarden** secret sources. | Tyler lists **1Password** for agent secrets — Hermes now offers a parallel pattern to OpenClaw credential hardening without plaintext `.env` keys, useful if exploratory Hermes dabbling expands. | [Hermes v0.19.0](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.20) |
| **ChatGPT** | **Codex** | **Jul 23** Voice in **Work** and **Codex** on desktop; **Codex `0.146.0-alpha.*`** train active Jul 22–27 while OpenClaw pins stable **`0.144.6`**. | Unified desktop Voice surface for task coordination, but OpenClaw auth-profile / harness pins should stay on stable Codex until alpha notes clarify breaking changes. | [OpenAI release notes](https://openai.com/products/release-notes/) · [Codex releases](https://github.com/openai/codex/releases) |
| **Cursor** | **@cursor/sdk** | **Jul 22** Cursor Router on SDK; npm **`@cursor/sdk 1.0.24` (Jul 20)** vs repo pin **`^1.0.13`**. | AgentOS scheduled scripts may benefit from Router-aware Auto routing once SDK pin is evaluated — no verified breaking change, but drift is widening. | [Cursor changelog](https://cursor.com/changelog) · [npm @cursor/sdk](https://www.npmjs.com/package/@cursor/sdk) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Portfolio cites **Gemini 3.1 Pro**, **Gemini 2.5 Flash**, **Gemma 26b**; official **Jul 21** changelog adds **`gemini-3.6-flash`** and **`gemini-3.5-flash-lite`** GA — refresh tier table and note deprecated sampling params.
- **`docs/TECH_STACK.md` → Antigravity:** Add **`2.4.x`** MCP timeout behavior and attachment types (JSON/MD/CSV) from **`2.4.2`**.
- **`docs/TECH_STACK.md` → Hermes:** Note **`v0.19.0`** as current release baseline if exploratory use continues; document **1Password** secret-source parity with stack’s **1Password** entry.
- **`package.json` → `@cursor/sdk`:** Pin **`^1.0.13`** vs npm latest **`1.0.24` (Jul 20)** — evaluate bump when scheduled SDK scripts need Router or current stream typings.
- **`package.json` → `typescript`:** Dev dependency **`^5.8.3`** vs **TypeScript 7.0 GA** — no urgent action for AgentOS (minimal TS surface).

## Searches & sources consulted

- [Cursor changelog](https://cursor.com/changelog) (Jul 22 Cursor Router entry)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [changelog.md.txt mirror](https://ai.google.dev/gemini-api/docs/changelog.md.txt)
- [OpenAI release notes](https://openai.com/products/release-notes/) (Jul 20, 23 entries via search snippet verification)
- [Codex changelog](https://developers.openai.com/codex/changelog) (timeout on fetch) · [openai/codex releases](https://github.com/openai/codex/releases) (tags **`0.146.0-alpha.1`**–**`alpha.13`**)
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases) (**`v0.19.0`**, Jul 20)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) (no post-Jul 18 tag)
- [Antigravity changelog](https://antigravity.google/changelog) (**`2.4.2`**, Jul 24)
- [Laravel v13.21.0](https://github.com/laravel/framework/releases/tag/v13.21.0) · [v13.22.0](https://github.com/laravel/framework/releases/tag/v13.22.0)
- [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [MCP SDK betas](https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28/)
- [npm @cursor/sdk](https://www.npmjs.com/package/@cursor/sdk) · [Cursor SDK docs](https://cursor.com/docs/sdk/typescript)
- Prior digest: `docs/research/tech-stack-updates-2026-07-20.md`
