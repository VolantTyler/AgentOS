# Tech stack updates — 2026-07-13 (America/New_York)

- **Window:** **2026-07-06 00:00** America/New_York (EDT, UTC−04:00) → **2026-07-13 23:59** America/New_York — i.e. **2026-07-06 04:00 UTC** through **2026-07-14 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **ChatGPT + Codex (core):** **Jul 9** — **GPT-5.6 Sol/Terra/Luna** GA across ChatGPT, Codex, and the API; **ChatGPT Work** agent mode and a unified **ChatGPT desktop app** (Chat + Work + Codex). **Codex `0.144.0`–`0.144.3`** ships MCP auth-by-default, `writes` approval mode, and desktop-app integration. **monitor → upgrade** OpenClaw/Codex pins after rollout stabilizes; **hold** on assuming Work availability on Plus/Business until phased rollout completes.
- **OpenClaw (core):** **`2026.7.1-beta.1` through `beta.6`** (Jul 2–13) — GPT-5.6 catalog/default, Telegram Codex pairing, Control UI refresh, offline mobile caches. Stable remains **`2026.6.11` (Jun 30)**. **monitor** on beta; **hold** production on stable unless beta validation passes.
- **Cursor (core):** **`3.11` (Jul 10)** — side chats (`/side`, `/btw`), local agent-transcript search (Cmd+K), redesigned project/repo pickers, conversation-level **cloud agent hooks**. **monitor → upgrade** for AgentOS subagent/MCP workflows; review hook trust boundaries on team plans.
- **Gemini (core):** **Jul 6** — Interactions API **developer logs** in AI Studio dashboard. **Jul 7** blog — Managed Agents gain **background execution**, **remote MCP**, custom functions, credential refresh. **monitor** for OpenClaw/Antigravity routing; no new model shutdowns in-window.
- **Hermes (core):** **`v0.18.1` (Jul 7)** and **`v0.18.2` (Jul 7)** stability tags rolling ~660 PRs since **`v0.18.0` (Jul 1, pre-window)**. **monitor** only (exploratory status unchanged).
- **TypeScript 7.0 GA (non-core, high signal):** **Jul 8** — native Go compiler on npm `latest`; **8×–12×** typical full-build speedup per Microsoft; **no stable programmatic compiler API until 7.1**. **defer** greenfield upgrades until toolchain audit (`typescript-eslint`, custom transformers).

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Codex** | **`0.144.0` (Jul 9):** device-code login docs now warn about phishing recognition — relevant if OpenClaw or commodity flows use device-code auth. | monitor | [0.144.0 release](https://github.com/openai/codex/releases/tag/rust-v0.144.0) |
| **Codex** | **`0.144.0`:** MCP tools can request authentication interactively **by default** (no experimental opt-in) — review MCP server trust before upgrade. | monitor / policy | [0.144.0 release](https://github.com/openai/codex/releases/tag/rust-v0.144.0) |
| **ChatGPT** | **ChatGPT Work (Jul 9):** Enterprise/Edu two-week preview with Work **off by default**; admins can opt out before auto-enable. | monitor / policy | [OpenAI release notes](https://openai.com/products/release-notes/) |
| **OpenClaw** | **`2026.7.1-beta.*`:** conversational onboarding binds approvals to exact operations; Gateway crash-loop enters control-plane-safe mode — beta hardening, not a CVE. | monitor (beta) | [v2026.7.1-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1-beta.2) |
| **Cursor** | **`3.11`:** new cloud agent hooks observe prompts, thinking, subagent delegation — treat hook scripts as privileged code on team/cloud agents. | monitor / policy | [Cursor 3.11 changelog](https://cursor.com/changelog/side-chat) |
| **Gemini / Antigravity / Hermes** | No new in-window CVE or vendor security bulletin verified for these core names. | hold / monitor | — |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Python** | **USN-8509-1 (Jul 6):** Ubuntu security notice for Python 3.10/3.12/3.14 — tarfile path normalization, HTMLParser DoS, email header injection, pyexpat, importlib audit bypass, and related CVEs. | upgrade (if on affected Ubuntu packages) | [USN-8509-1](https://ubuntu.com/security/notices/USN-8509-1) |
| **Claude Code** | **Week 28 (Jul 6–10, v2.1.202–v2.1.206):** auto mode blocks session-transcript tampering; asks before `rm -rf` on unresolved variables; sandboxed Desktop in-app browser for external sites. | monitor / upgrade on commodity project | [Claude Code Week 28](https://code.claude.com/docs/en/whats-new/2026-w28) |
| **Docker** | **Engine 29.6.1** security fixes (malicious image OOM, build Seccomp/AppArmor bypass) shipped **Jun 26** — pre-window but patch available if still on **<29.6.1**. | upgrade (if learning Docker on old Engine) | [Docker Engine 29 release notes](https://docs.docker.com/engine/release-notes/29/) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / SQLite / CI-CD / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **ChatGPT** | **Jul 9:** **GPT-5.6** GA (Sol/Terra/Luna); **ChatGPT Work** agent for multi-step deliverables; unified desktop app; **ChatGPT Sites** public beta; **group chats retired** (no new groups from Jul 9). | monitor | Pairs with **Codex** desktop merge and **OpenClaw** GPT-5.6 beta defaults | [OpenAI release notes](https://openai.com/products/release-notes/) · [GPT-5.6 blog](https://openai.com/index/gpt-5-6/) |
| **Codex** | **Jul 9:** joins **ChatGPT desktop app** (inline diff edit, PR sidebar review, multi-repo projects, faster Computer Use with GPT-5.6). **`0.144.0`–`0.144.3`:** MCP interactive auth default, `writes` approval mode, usage-limit credit picker, installer fixes in **`0.144.1`**, Guardian auto-review revert in **`0.144.2`**. | monitor → upgrade on pin | **OpenClaw `2026.7.1-beta`** Telegram Codex pairing + GPT-5.6 catalog | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.144.0](https://github.com/openai/codex/releases/tag/rust-v0.144.0) · [0.144.3](https://github.com/openai/codex/releases/tag/rust-v0.144.3) |
| **OpenClaw** | **`2026.7.1-beta.1` (Jul 2, pre-window start)** through **`beta.6` (Jul 13):** GPT-5.6 default, ClawRouter, Control UI session-first nav, offline mobile caches, Telegram `/login` + `/steer`, `openclaw attach`, cron exit triggers. Stable **`2026.6.11`** unchanged. | monitor (beta) / hold (stable) | Reconcile **Codex 0.144.x** and **Gemini** hybrid routing after GPT-5.6 GA | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) · [v2026.7.1-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1-beta.2) · [v2026.7.1-beta.6](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1-beta.6) |
| **Cursor** | **`3.11` (Jul 10):** side chats, conversation search, redesigned pickers, cloud agent hooks (`beforeSubmitPrompt`, `afterAgentThought`, `subagentStart`, etc.). | monitor → upgrade | AgentOS **`stack-radar`** / **`feature-testing-agent`** patterns; compare with **Cursor 3.9** Customize page from prior week | [Cursor 3.11](https://cursor.com/changelog/side-chat) |
| **Gemini** | **Jul 6:** Interactions API developer logs in AI Studio dashboard. **Jul 7:** Managed Agents — `background: true`, remote **MCP** servers, custom function calling with step matching, network credential refresh via `environment_id`. | monitor | **Antigravity** + **OpenClaw** MCP allowlists; **Google AI Studio** import-from-GitHub (Jul 8, non-core) | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Managed Agents blog](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/) |
| **Hermes** | **`v0.18.1` / `v0.18.2` (Jul 7–8):** infrastructure stability tags (~660 PRs since v0.18.0); WhatsApp Baileys **`7.0.0-rc13`** pin fix in v0.18.2. Full curated notes deferred to v0.19.0. | hold / monitor | Exploratory only per `TECH_STACK.md` | [v0.18.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.7) · [v0.18.2](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.7.2) |
| **Antigravity** | No Antigravity IDE or Antigravity 2.0 release after **`2.2.1` (Jun 25, pre-window)** verified on official changelog. | hold | **OpenClaw** orchestration unchanged on last verified IDE build | [Antigravity changelog](https://antigravity.google/changelog) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **TypeScript** | **`7.0` GA (Jul 8):** native Go `tsc` on npm `latest`; typical **8×–12×** full-build speedup; LSP-based editor support; **`@typescript/typescript6`** side-by-side for tools needing 6.x compiler API. | defer / monitor | **React** + **AgentOS** future `@cursor/sdk` scripts — audit `typescript-eslint` and any custom transformers before bump | [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) |
| **Laravel** | **`v13.19.0` (Jul 7):** `Http::query()` HTTP client method (RFC 10008 QUERY), `query()` / `queryJson()` testing helpers, `reduceInto()` collection, `counted()` on Str, bulk SQS `SendMessageBatch`. | monitor / upgrade on app cadence | Pairs with **Livewire** stack | [v13.19.0](https://github.com/laravel/framework/releases/tag/v13.19.0) |
| **Cypress** | **`15.18.1` (Jul 7):** faster binary verify, browser-crash mid-run recovery, focus assertion TypeScript fix, `cy.type()` keyup ordering, headless WebKit DPI consistency. | monitor / upgrade on app cadence | E2E stack alongside **Playwright** / **Jest** | [Cypress changelog](https://docs.cypress.io/app/references/changelog) |
| **Claude Code** | **v2.1.202–v2.1.207 (Jul 6–11):** Desktop in-app browser, fix-it **`/doctor`**, auto mode security hardening, gateway `/login`, Bedrock/Vertex auto mode defaults in v2.1.207. | monitor → upgrade | Commodity reporting project tool alongside **Cursor** | [Week 28 docs](https://code.claude.com/docs/en/whats-new/2026-w28) · [v2.1.206](https://github.com/anthropics/claude-code/releases/tag/v2.1.206) |
| **Google AI Studio** | **Jul 8:** Build mode **import from GitHub** (repo → runtime-compatible format; `GEMINI_API_KEY` server-side). **Jul 10:** free **`*.ai.studio`** custom subdomains on Cloud Run deploys (vendor social posts; not a formal changelog page verified). | monitor | **Gemini** experiments path; export path to **Antigravity** noted in vendor coverage | [MarkTechPost summary (Jul 8)](https://www.marktechpost.com/2026/07/08/google-ai-studio-adds-import-from-github-to-build-mode/) |
| **Python** | **USN-8509-1 (Jul 6)** Ubuntu security packages; no new CPython upstream release in-window (latest maintenance **3.14.6** is **Jun 10**). | upgrade (OS packages) / hold (runtime) | **OpenClaw** ETL pipelines | [USN-8509-1](https://ubuntu.com/security/notices/USN-8509-1) |
| **MCP** | **`2026-07-28` spec still RC** — final publication **Jul 28** (~15 days out at window end). Beta SDKs (Python v2, TypeScript v2) available per MCP blog. | monitor | **Cursor 3.11** team MCP distribution; **Gemini** remote MCP; **Codex** MCP auth default | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **React / Tailwind / Playwright / Jest / Livewire / SQLite / Docker / GraphQL / PostgreSQL / Sequelize / PHPUnit / AgentMail / Google Workspace CLI / 1Password / Figma / Git / CI-CD / @cursor/sdk (repo pin)** | No additional in-window primary-source releases verified beyond rows above (timeboxed). Latest verified: **React 19.2.7 (Jun 1)**, **Tailwind 4.3.0 (May 8)**, **Playwright 1.61.1 (Jun 23)**, **Jest 30.4.2 (May 9)**, **Livewire 4.3.3 (Jun 27)**, **SQLite 3.53.3 (Jun 26)**, **Docker Engine 29.6.1 (Jun 26)**. | hold / not applicable | — | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Imagen 4 / Gemini 3 Image** model shutdown | **2026-08-17** | confirmed | [Gemini API changelog (Jun 15)](https://ai.google.dev/gemini-api/docs/changelog) |
| **ChatGPT** | **ChatGPT Work** rollout to Plus and Business (after Pro/Enterprise/Edu) | “over the coming days” (Jul 9) | tentative | [OpenAI release notes](https://openai.com/products/release-notes/) |
| **Codex** | Continued **GPT-5.6** rollout across desktop, CLI, and API surfaces | “next 24 hours” from Jul 9 | tentative | [OpenAI release notes](https://openai.com/products/release-notes/) |
| **OpenClaw** | **`2026.7.1`** stable promotion from beta train | not stated | tentative | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Hermes** | **v0.19.0** curated release notes for post-v0.18.0 window | not stated | tentative | [v0.18.1 release notes](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.7) |
| **Antigravity** | **Agent Manager removal from Antigravity IDE** (Antigravity 2.0 is separate app) | “upcoming release” (Nov 2025 blog; no Jul 2026 date) | tentative | [Antigravity 2.0 blog](https://antigravity.google/blog/introducing-google-antigravity-2) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (stateless HTTP, MCP Apps, Tasks extension, deprecation policy) | **2026-07-28** | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **7.1** with stable programmatic compiler API | not dated in Jul 8 GA post | tentative | [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT | **2026-08-26** (announced May 28) | confirmed | [OpenAI release notes](https://openai.com/products/release-notes/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **MCP** | **Jul 7:** Managed Agents connect directly to **remote MCP servers** alongside sandbox tools; **Jul 6** Interactions API logs in AI Studio. **MCP `2026-07-28` final spec in ~15 days.** | OpenClaw/Antigravity HITL + allowlist policy should assume MCP is moving from local-only to remote/cloud-managed — align gateway rules before Jul 28 spec lands. | [Managed Agents blog](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/) · [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **ChatGPT** | **Codex** | **Jul 9:** single desktop app (Chat + Work + Codex); GPT-5.6 shared across products; Codex **`0.144.x`** MCP auth and multi-repo projects ship same week. | OpenClaw beta already targets GPT-5.6 + Telegram Codex pairing — bump pins and re-test auth flows together, not one at a time. | [OpenAI release notes](https://openai.com/products/release-notes/) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **OpenClaw** | **Codex** | **`2026.7.1-beta.2` (Jul 5):** GPT-5.6 default, Telegram Codex `/login` + steering; **Codex `0.144.0` (Jul 9):** desktop merge + MCP interactive auth. | Active WoW auction project should treat this week as a coupled upgrade surface for model IDs, Codex harness version, and channel pairing. | [v2026.7.1-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1-beta.2) · [0.144.0](https://github.com/openai/codex/releases/tag/rust-v0.144.0) |
| **Cursor** | **MCP** | **Cursor 3.11 (Jul 10):** side chats + cloud agent hooks; community coverage also cites **team MCP distribution** on paid/enterprise plans. | AgentOS subagent + MCP posture: side chats reduce main-thread derailment; hooks add observability for scheduled **`stack-radar`** runs. | [Cursor 3.11](https://cursor.com/changelog/side-chat) |
| **TypeScript** | **React** | **Jul 8:** TypeScript **7.0 GA** on npm `latest`; React last shipped **19.2.7 (Jun 1)** — no in-window React release. | NAMI-scale React/TS apps: big compile win possible, but **defer** until eslint/transformer compatibility is verified — green `tsc` ≠ green migration. | [TypeScript 7.0 GA](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) · [React releases](https://github.com/react/react/releases) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Portfolio lists **“Gemini 3.1 Pro + Gemma 26b”** and **“Gemma e2b”** — official Interactions API model table (Jun 2026) uses IDs such as **`gemini-3.5-flash`**, **`gemini-3.1-pro-preview`**, **`gemma-4-26b-a4b-it`**, **`gemma-4-31b-it`**. Refresh tier table and add “confirm in Google AI docs before migration.”
- **`docs/TECH_STACK.md` → ChatGPT / Codex:** Document **GPT-5.6 Sol/Terra/Luna** GA (Jul 9) and **ChatGPT Work** as a distinct mode; note **group chat retirement** (Jul 9) if household/workflows used shared chats.
- **`docs/TECH_STACK.md` → OpenClaw:** Add **`2026.7.1-beta`** train note and **GPT-5.6** as new-setup default (beta); stable line remains **`2026.6.11`** until promoted.
- **`docs/TECH_STACK.md` → Antigravity:** Clarify **Antigravity 2.0** (standalone agent desktop app) vs **Antigravity IDE** (last verified **`2.2.1`, Jun 25**); no Jul 2026 IDE release on official changelog.
- **`docs/TECH_STACK.md` → Hermes:** Latest verified **`v0.18.2` (2026.7.7.2)** — still exploratory; v0.19.0 promised for full curated notes.
- **`package.json` → `@cursor/sdk`:** IDE **`3.11`** adds cloud agent hooks and side chats — note SDK upgrade thread separately if scheduled automation needs new APIs (pin still **`^1.0.13`** in repo).

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`, `.cursor/skills/tech-stack-pulse/reference.md`, `package.json`
- [OpenAI release notes](https://openai.com/products/release-notes/) · [GPT-5.6 blog](https://openai.com/index/gpt-5-6/)
- [Codex changelog](https://developers.openai.com/codex/changelog) · [Codex releases](https://github.com/openai/codex/releases) — **0.144.0**, **0.144.1**, **0.144.3**
- [Cursor 3.11 changelog](https://cursor.com/changelog/side-chat)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Managed Agents blog (Jul 7)](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/)
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases) — **v2026.7.7**, **v2026.7.7.2**
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) — **v2026.7.1-beta.2**, **v2026.7.1-beta.6**
- [Antigravity changelog](https://antigravity.google/changelog)
- [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) · [TypeScript blog index](https://devblogs.microsoft.com/typescript/)
- [Laravel v13.19.0](https://github.com/laravel/framework/releases/tag/v13.19.0)
- [Cypress changelog](https://docs.cypress.io/app/references/changelog) — **15.18.1**
- [Claude Code Week 28](https://code.claude.com/docs/en/whats-new/2026-w28) · [v2.1.206](https://github.com/anthropics/claude-code/releases/tag/v2.1.206)
- [MCP 2026-07-28 RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
- [USN-8509-1 Python](https://ubuntu.com/security/notices/USN-8509-1)
- [React releases](https://github.com/react/react/releases) · [Playwright releases](https://github.com/microsoft/playwright/releases) · [Jest releases](https://github.com/jestjs/jest/releases) · [SQLite changes](https://sqlite.org/changes.html) · [Docker Engine 29 release notes](https://docs.docker.com/engine/release-notes/29/)
- Prior digest: `docs/research/tech-stack-updates-2026-06-29.md`
