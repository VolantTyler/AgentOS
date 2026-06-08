# Tech stack updates — 2026-06-08 (America/New_York)

- **Window:** **2026-06-02 00:00** America/New_York (EDT, UTC−04:00) → **2026-06-08 23:59** America/New_York — i.e. **2026-06-02 04:00 UTC** through **2026-06-09 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini (core):** **June 8 (today)** — Gemini **Interactions API** legacy `outputs` schema is **removed**; clients must use the `steps` schema (SDK ≥2.0.0 or REST with new revision). **June 1** **`gemini-2.0-flash*`** / **`gemini-2.0-flash-lite*`** shutdown remains the other urgent migration if any OpenClaw routes still pin 2.0 IDs. **upgrade / migrate today** on Interactions clients; **monitor** image-preview shutdown **June 25**.
- **Hermes (core):** **`v0.16.0` / `v2026.6.5` (June 5–6)** — “Surface Release”: native **desktop app** (macOS/Windows/Linux), browser admin panel, Nous Portal quick setup, **`/undo`**, plus security round (**CVE-2026-48710** Starlette pin, SSRF hardening). **upgrade** if Tyler is still on **v0.15.x** exploratory dabbling; **hold** on wholesale adoption until a deliberate eval pass.
- **OpenClaw (core):** **`2026.6.5-beta.1` / `2026.6.5-beta.2` (June 6–7)** — new **`YYYY.M.PATCH`** release train; **Parallel** bundled `web_search`, MCP result coercion (fixes Anthropic 400s), Google Vertex catalog recovery, channel/Matrix voice hardening, SQLite auth profiles. **monitor → upgrade** on OpenClaw cadence; read security rows before new plugin install paths.
- **Cursor (core):** **June 4–5** — **`@cursor/sdk` 3.7** (custom tools, `local.autoReview`, JSONL stores, nested subagents) plus **3.7** browser **Design Mode** multi-select + **voice input** and canvas context-usage report. **monitor** for AgentOS scheduled SDK scripts; align auto-review posture with **Codex** headless patterns.
- **Codex + ChatGPT (core):** **June 1–4** — **Codex** **Sites** preview, role plugins, **Bedrock** provider, CLI **`0.136.0` / `0.137.0`**; **ChatGPT** **June 4** memory refresh + **Lockdown Mode** GA + **June 2** Active sessions UI. **monitor** — shared account surfaces, different capability gates vs **Codex CLI**.
- **Antigravity (core):** **`2.0.11` (June 3)** startup/Open IDE fixes; **June 18** Gemini CLI / Code Assist consumer cutoff still the main migration deadline. **monitor / plan**.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **June 8:** Interactions API **legacy `outputs` schema removed** — Python/JS SDK 1.x and REST clients on legacy schema break. **June 1:** **`gemini-2.0-flash*`** / **`gemini-2.0-flash-lite*`** already shut down. | upgrade / migrate | [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) · [Changelog (Jun 1)](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Hermes** | **June 5 `v0.16.0`:** security round includes **CVE-2026-48710** Starlette pin, SSRF off-loop hardening, subprocess credential stripping. | upgrade (if deployed) | [v2026.6.5 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5) |
| **OpenClaw** | **`2026.6.5`:** MCP HTTP redirect guards, global agent config default protection, operator install policy lineage from **`2026.6.2`**. | upgrade (if deployed) / policy | [v2026.6.5-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5-beta.1) · [Releases](https://github.com/openclaw/openclaw/releases) |
| **ChatGPT** | **June 4:** **Lockdown Mode** GA for all logged-in users — restricts web browsing, deep research, agent mode, file downloads when enabled (opt-in). | monitor / policy | [Release notes (Jun 4)](https://openai.com/products/release-notes/) · [Lockdown Mode](https://help.openai.com/en/articles/20001061) |
| **Cursor** | **May 29 Auto-review** (still in 7d window via run-mode policy) + **SDK `local.autoReview`** (June 4) — new trust boundary for headless tool calls. | monitor / policy | [Changelog](https://cursor.com/changelog) · [SDK updates](https://cursor.com/changelog/sdk-updates-jun-2026) |
| **Codex** | **June 4 `0.137.0`:** environment-scoped permission approvals, managed MITM CA export, cloud-managed config bundles — governance surface, not a CVE. | monitor (enterprise) | [0.137.0](https://github.com/openai/codex/releases/tag/rust-v0.137.0) · [Changelog](https://developers.openai.com/codex/changelog) |
| **Antigravity** | No in-window CVE; **June 18** Gemini CLI consumer cutoff is an **access/trust-boundary** migration deadline. | monitor / plan migration | [Antigravity changelog](https://antigravity.google/changelog) · [CLI transition](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **React** | **`v19.1.8` (June 1)**: fixes missing **`FormData`** entries in Server Actions (regression from 19.1.7). | upgrade (if affected) | [v19.1.8](https://github.com/facebook/react/releases/tag/v19.1.8) |
| **TypeScript / Tailwind / Cypress / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Playwright / Figma / Git / Livewire / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified beyond rows above (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **Gemini** | **June 1:** **`gemini-2.0-*` flash family shut down** (confirmed). **June 8:** Interactions API **`outputs` → `steps`** default enforced. | upgrade / migrate | Reconcile **OpenClaw** hybrid routing; **Antigravity** managed agents use Interactions API | [Changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Hermes** | **June 5–6 `v0.16.0`:** native desktop app, remote gateway OAuth/login, web admin panel (MCP/channels/credentials), Nous Portal quick setup, fuzzy model picker, **`/undo`**, trimmed default skills, **`antigravity-cli`** optional skill. | upgrade (if on v0.15.x) / monitor | Pairs with **OpenClaw** skill-governance patterns; desktop lowers exploratory barrier vs CLI-only | [v2026.6.5](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5) |
| **OpenClaw** | **`2026.6.2` (Jun 3)** operator install policy + Skill Workshop (prior digest). **`2026.6.5-beta.1/2` (Jun 6–7):** Parallel `web_search`, MCP block coercion, Anthropic stream recovery, Vertex ADC catalog, Matrix voice/thread QA, SQLite auth profiles, monthly **`YYYY.M.PATCH`** numbering. | monitor → upgrade | **Codex** app-server recovery paths; **Gemini** model-ID audit after 2.0 shutdown | [v2026.6.5-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5-beta.1) · [Releases](https://github.com/openclaw/openclaw/releases) |
| **Cursor** | **June 4:** IDE **3.7** canvas Design Mode + context usage report; **`@cursor/sdk` 3.7** custom tools, auto-review, JSONL stores, nested subagents. **June 5:** browser Design Mode **multi-select** + **voice input**. **June 3:** Enterprise Organizations GA. | monitor | **SDK 3.7** ↔ AgentOS `scripts/scheduled/`; auto-review ↔ **Codex** `0.137.0` | [Changelog](https://cursor.com/changelog) · [SDK updates](https://cursor.com/changelog/sdk-updates-jun-2026) |
| **Codex** | **June 1:** **Amazon Bedrock** provider; terminal placement **26.601**. **June 2:** **Sites** preview + role-specific plugins (62 apps / 110 skills). **June 3–4:** CLI **`0.136.0` / `0.137.0`**; app **26.602** profile share cards. | monitor | **OpenClaw `2026.6.x`** Codex integration surface; **Cursor** canvas/Sites artifact overlap | [Changelog](https://developers.openai.com/codex/changelog) · [Codex for every role](https://openai.com/index/codex-for-every-role-tool-workflow/) |
| **ChatGPT** | **June 2:** Active sessions security UI. **June 4:** upgraded **memory** (auto-updated context) + **Lockdown Mode** for all logged-in users. | monitor | Shared account with **Codex**; Lockdown may not gate **Codex CLI** | [Release notes](https://openai.com/products/release-notes/) |
| **Antigravity** | **June 3 `2.0.11`:** antivirus-related startup blank screen + Open IDE button fixes. | monitor / hold | **June 18** CLI transition vs **OpenClaw** Google tooling | [Changelog](https://antigravity.google/changelog) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **June 2:** framework **`v13.13.0`** — `Bus::bulk()`, Cache attribute memoization, HTTP client PSR client + header normalization, MariaDB vector index, scheduler pause opt-out, Symfony 8.1 response compat. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md` | [v13.13.0](https://github.com/laravel/framework/releases/tag/v13.13.0) |
| **React** | **June 1:** **`v19.1.8`** — Server Actions `FormData` regression fix. | upgrade (if on 19.1.7 + Server Actions) | Nonprofit/Livewire-adjacent **React** surfaces | [v19.1.8](https://github.com/facebook/react/releases/tag/v19.1.8) |
| **Livewire / TypeScript / Tailwind / Cypress / Playwright / Jest / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / PHP / TailwindCSS / MCP** | No additional in-window primary-source releases verified beyond rows above (timeboxed). **Playwright** latest stable remains **`v1.60.0` (May 11)**; **TypeScript** latest stable **`v6.0.3` (April 16)**. | not applicable / hold | **MCP** final spec **2026-07-28** still upcoming (RC locked May 21) | [MCP RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shutdown | **2026-06-25** | confirmed | [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [Changelog (May 28)](https://ai.google.dev/gemini-api/docs/changelog) |
| **Antigravity** | **Gemini CLI** + **Gemini Code Assist IDE extensions** stop serving consumer **Google AI Pro/Ultra** and free individual tiers | **2026-06-18** | confirmed | [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT; **GPT-4.5** retirement (announced May 28) | **2026-08-26** / **2026-06-27** | confirmed | [Release notes (May 28)](https://openai.com/products/release-notes/) |
| **Codex** | **Sites** plugin remains **preview** — RBAC-gated on Enterprise | rolling | tentative | [Changelog (Jun 2)](https://developers.openai.com/codex/changelog) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (RC locked **May 21**) | **2026-07-28** | confirmed | [MCP RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **6.x** maintenance mode; **TypeScript 7** native port (`typescript-go`) | no fixed GA date | tentative | [Maintenance mode issue](https://github.com/microsoft/TypeScript/issues/62963) · [typescript-go](https://github.com/microsoft/typescript-go) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **OpenClaw** | **June 8** Interactions **`steps`** enforcement + **June 1** **`gemini-2.0-*` shutdown** land while **OpenClaw `2026.6.5`** adds Vertex catalog recovery and provider fixes. | WoW analytics / hybrid **Gemini + Gemma** configs need both model-ID and Interactions-client audits before the next deploy. | [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) · [OpenClaw v2026.6.5-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5-beta.1) |
| **Cursor** | **Codex** | **Cursor SDK 3.7 `local.autoReview`** (June 4) mirrors **Codex `0.137.0`** auto-review policy preservation in `codex exec`; both weeks push classifier-gated headless tool calls. | Compare approval/HITL posture across **AgentOS (Cursor SDK schedules)** vs **OpenClaw/Codex** terminal paths. | [SDK updates](https://cursor.com/changelog/sdk-updates-jun-2026) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Hermes** | **Antigravity** | **Hermes v0.16.0** ships optional **`antigravity-cli`** skill while **Antigravity `2.0.11`** fixes IDE handoff and **June 18** CLI migration deadline approaches. | Exploratory **Hermes** dabbling can route terminal work through **Antigravity CLI** without waiting on OpenClaw pins. | [Hermes v2026.6.5](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5) · [Antigravity changelog](https://antigravity.google/changelog) |
| **OpenClaw** | **Codex** | **`2026.6.5`** Anthropic stream recovery + MCP coercion + **`2026.6.2`** Codex app-server streaming fixes stack on **Codex `0.137.0`** multi-agent v2. | Portfolio **Codex** version pins should be reconciled on the next OpenClaw upgrade. | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) · [0.137.0](https://github.com/openai/codex/releases/tag/rust-v0.137.0) |
| **ChatGPT** | **Codex** | **June 4** memory refresh + **Lockdown Mode** vs **Codex Sites/Bedrock/Windows remote** expansion — same account, different capability gates. | Household/work **ChatGPT** lockdown settings may not apply to **Codex CLI** paths — verify per surface. | [Release notes](https://openai.com/products/release-notes/) · [Codex changelog](https://developers.openai.com/codex/changelog) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Portfolio still lists **“Gemini 3.1 Pro + Gemma 26b”** and **“Gemini 2.5 Flash + Gemma e2b”** — official changelog shows **`gemini-3.5-flash` GA (May 19)**, **`gemini-3.1-flash-lite` GA**, **`gemini-2.0-*` shutdown (June 1)**, and **Interactions API schema change (June 8)**; refresh tier table and note Interactions clients.
- **`docs/TECH_STACK.md` → Hermes:** Exploratory line should reference **`v0.16.0+`** (desktop app + admin panel) instead of **`v0.15.x`** hotfix guidance.
- **`docs/TECH_STACK.md` → OpenClaw:** Note **`2026.6.5`** monthly **`YYYY.M.PATCH`** train and **Parallel** `web_search` if portfolio runbooks still cite **`2026.6.2`** as latest.
- **`docs/TECH_STACK.md` → Codex:** Bump any local version-pin references from **`0.134.0`–`0.136.0`** toward **`0.137.0`** when Tyler upgrades OpenClaw/Codex harnesses.
- **`docs/TECH_STACK.md` → @cursor/sdk`:** Document **`@cursor/sdk` 3.7** (custom tools, JSONL store, nested subagents) under AgentOS scheduled automation when `package.json` is bumped.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`
- [Cursor changelog](https://cursor.com/changelog) · [SDK updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations)
- [OpenAI Codex changelog](https://developers.openai.com/codex/changelog) · [Codex `0.137.0` release](https://github.com/openai/codex/releases/tag/rust-v0.137.0) · [Codex for every role](https://openai.com/index/codex-for-every-role-tool-workflow/)
- [OpenAI product release notes](https://openai.com/products/release-notes/)
- [OpenClaw v2026.6.5-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5-beta.1) · [v2026.6.5-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5-beta.2)
- [Hermes Agent v2026.6.5](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5)
- [Google Antigravity changelog](https://antigravity.google/changelog)
- [Laravel `v13.13.0`](https://github.com/laravel/framework/releases/tag/v13.13.0) · [React `v19.1.8`](https://github.com/facebook/react/releases/tag/v19.1.8)
- Prior digest: `docs/research/tech-stack-updates-2026-06-05.md` (context only; dates re-verified against primary sources above)
