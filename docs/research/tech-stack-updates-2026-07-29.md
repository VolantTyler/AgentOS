# Tech stack updates — 2026-07-29 (America/New_York)

- **Window:** **2026-07-22 00:00** America/New_York (EDT, UTC−04:00) → **2026-07-29 23:59** America/New_York — i.e. **2026-07-22 04:00 UTC** through **2026-07-30 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **MCP (cross-stack, non-core protocol):** Final **`2026-07-28`** specification shipped **Jul 28** — stateless core (no `initialize` / `Mcp-Session-Id`), mandatory `Mcp-Method` / `Mcp-Name` headers, MCP Apps + Tasks as official extensions, OAuth `iss` validation hardening. **Codex `0.146.0` (Jul 29)** registers an MCP **`2026-07-28` feature flag**; **Antigravity `2.4.2`** adds MCP connection timeouts. **monitor** migration across **Cursor**, **Codex**, **Antigravity**, and **OpenClaw** MCP surfaces.
- **OpenClaw (core):** **`2026.7.2-beta.5` (Jul 28)** — latest pre-release on npm/GitHub (stable **`2026.7.2`** tag not published; npm `latest` still **`2026.7.1-2`**). Train adds session rewind/branching, interactive **MCP Apps**, crash-safe SQLite/quarantine, durable channel delivery, and **security** fix preventing channel allowlists from granting owner access. **monitor → upgrade** on beta if WoW analytics needs rewind/MCP Apps; else **hold** for stable.
- **Codex (core):** **`0.146.0` (Jul 29)** — session naming (`/new`, `/clear`), Agent Plugins manifests, paginated fork history, MCP **`2026-07-28` feature flag**, proxy-hardening across auth/MCP/plugins. **monitor → upgrade** on **OpenClaw** Codex pins and desktop harness.
- **Cursor (core):** **Jul 22** — **Cursor Router** powers Auto mode (Cost / Balance / Intelligence routing; Grok 4.5 as price-efficient option). **Jul 28** — **Cursor Start** ₹649/month plan (India only). **monitor** for Auto routing policy; no new IDE semver in-window.
- **Antigravity (core):** **`2.4.2` (Jul 24)** — preview tabs, **MCP timeouts**, `.json` / `.md` / `.csv` attachments, Download Diagnostics. **Antigravity CLI `1.1.6`–`1.1.8` (Jul 24–28)** — structured `json` / `stream-json` print output, MCP OAuth issuer validation fix (`1.1.7`). **monitor → upgrade** for **OpenClaw** orchestration IDE path.
- **ChatGPT (core):** **Jul 23** — **Health in ChatGPT** rolls out to eligible U.S. users (Apple Health + supported medical records; not in **Codex**). Same day: desktop **ChatGPT Voice** + multi-folder local projects (**26.715**). **Jul 27** — iOS **`1.2026.202`**. **monitor** (Health is U.S.-only workflow surface; not AgentOS-relevant unless Tyler opts in).
- **Gemini (core):** No **in-window** changelog entries (last primary entry **Jul 21**, pre-window: **`gemini-3.6-flash`** and **`gemini-3.5-flash-lite` GA**; deprecated `temperature` / `top_p` / `top_k`). **monitor** hybrid routing in **OpenClaw** / **Antigravity** against new Flash IDs.
- **Hermes (core):** No **in-window** release ( **`v0.19.0` “Quicksilver”** shipped **Jul 20**, pre-window). **hold / monitor** unless actively deploying exploratory dabbling.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **OpenClaw** | **`2026.7.2-beta.5` train:** channel allowlists no longer grant owner-level access (#107403); session exports confined to workspace; forged-marker / web-search boundary bypass closed; exec/OAuth approval hardening. | monitor → upgrade (beta) | [v2026.7.2-beta.5](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.5) |
| **Antigravity** | **CLI `1.1.7` (Jul 24):** MCP OAuth issuer validation fix among compound-command permission and clipboard fixes. **IDE `2.4.2`:** MCP connection/tool-call timeouts reduce hung-agent exposure. | upgrade (if on affected CLI) / monitor | [Antigravity changelog](https://antigravity.google/changelog) · [antigravity-cli releases](https://github.com/google-antigravity/antigravity-cli/releases) |
| **Codex** | **`0.146.0`:** MCP **`2026-07-28` feature flag** registration — plan migration before clients negotiate new protocol version. | monitor | [0.146.0](https://github.com/openai/codex/releases/tag/rust-v0.146.0) |
| **ChatGPT** | **Jul 23 Health:** new health-data connection surface (Apple Health, U.S. medical records) with layered privacy controls; not available in **Codex**. Review connector permissions if enabled. | monitor / policy | [Health in ChatGPT](https://openai.com/index/health-in-chatgpt/) |
| **Cursor** | No new in-window CVE or security bulletin verified. **Cursor Router** changes model routing surface under Auto — review team allow/block lists. | monitor / policy | [Cursor Router](https://cursor.com/changelog/router) |
| **Gemini** | No in-window security advisories verified. **Jul 21 (pre-window):** sampling-parameter deprecation — audit client configs for deprecated `temperature` / `top_p` / `top_k`. | monitor | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Hermes** | No in-window security advisories verified ( **`v0.19.0`** security hardening landed **Jul 20**, pre-window). | hold / monitor | [Hermes v0.19.0](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.20) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **MCP** | **`2026-07-28` final spec (Jul 28):** mandatory OAuth `iss` validation; stateless core removes session IDs — mis-migrated servers risk auth/session failures. | monitor / plan migration | [MCP 2026-07-28 announcement](https://blog.modelcontextprotocol.io/posts/2026-07-28/) |
| **Laravel** | **`v13.23.0` (Jul 27):** timing-safe comparison for maintenance-mode bypass secret (`#[SensitiveParameter]` on HTTP test credentials in **`v13.22.0`**). | monitor / upgrade on app cadence | [v13.23.0](https://github.com/laravel/framework/releases/tag/v13.23.0) · [v13.22.0](https://github.com/laravel/framework/releases/tag/v13.22.0) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **OpenClaw** | **`2026.7.2-beta.5` (Jul 28):** state quarantine + crash-recoverable SQLite; session rewind/branching + upstream **Codex** session fork; interactive **MCP Apps** + dashboards; durable channel delivery; Wear OS companion; guided local inference (llama.cpp/Gemma path); memory imports from Claude Code/**Codex**/**Hermes**. Stable **`2026.7.2`** not tagged; npm `latest` **`2026.7.1-2`**. | monitor → upgrade (beta) | Pairs with **Codex `0.146.0`** session fork + MCP flag; **Antigravity** orchestration unchanged but **Gemini** Flash GA (pre-window) affects model routes | [v2026.7.2-beta.5](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.5) · [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Codex** | **`0.146.0` (Jul 29):** session naming, Agent Plugins + marketplaces, paginated fork history, remote Code Mode WebSocket host, MCP **`2026-07-28` feature flag**, proxy-aware HTTP client across auth/MCP/plugins. **`0.145.0` (Jul 21, pre-window):** paginated thread history, `/import` from **Cursor**/Claude Code, multi-agent V2 stabilization. | monitor → upgrade on pin | **OpenClaw** Codex delegation + **`2026.7.2`** rewind; **ChatGPT** desktop Voice (**Jul 23**) coordinates **Codex** threads | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.146.0](https://github.com/openai/codex/releases/tag/rust-v0.146.0) · [0.145.0](https://github.com/openai/codex/releases/tag/rust-v0.145.0) |
| **ChatGPT** | **Jul 23:** **Health in ChatGPT** (U.S., 18+, web/iOS). **Jul 23:** desktop **Voice** (GPT-Live) + multi-folder local projects (**26.715**). **Jul 27:** iOS **`1.2026.202`**. | monitor | Voice spans Chat / Work / **Codex** desktop; multi-folder projects discover **`AGENTS.md`** / skills — parallels **Cursor** multi-repo Slack train | [Health in ChatGPT](https://openai.com/index/health-in-chatgpt/) · [Codex changelog (Jul 23)](https://developers.openai.com/codex/changelog) |
| **Antigravity** | **IDE `2.4.2` (Jul 24):** preview tabs, MCP timeouts, structured file attachments, Download Diagnostics. **CLI `1.1.6`–`1.1.8` (Jul 24–28):** Markdown custom agents, structured CLI output (`json` / `stream-json`), compound-command permissions. | monitor → upgrade | **OpenClaw** HITL orchestration IDE; **Gemini 3.6 Flash** listed on Google blog as available in **Antigravity** (pre-window GA context) | [Antigravity changelog](https://antigravity.google/changelog) · [CLI 1.1.8](https://github.com/google-antigravity/antigravity-cli/releases) |
| **Cursor** | **Jul 22:** **Cursor Router** — Auto mode routes per task with Cost / Balance / Intelligence modes; admin controls per team/group; Grok 4.5 as price-efficient route. **Jul 28:** **Cursor Start** (India-only ₹649 plan; Grok 4.5 + Composer; UPI). | monitor | Router available on desktop, web, iOS, CLI, and SDK — affects **AgentOS `@cursor/sdk`** scheduled agents using Auto | [Cursor Router](https://cursor.com/changelog/router) · [Cursor Start](https://cursor.com/changelog/cursor-start) |
| **Gemini** | No **in-window** changelog entries. **Jul 21 (pre-window):** **`gemini-3.6-flash`** and **`gemini-3.5-flash-lite` GA**; `temperature` / `top_p` / `top_k` deprecated on latest models. | monitor | Refresh **OpenClaw** hybrid utility tier (**TECH_STACK** still cites **Gemini 2.5 Flash** / **Gemma** snapshot) | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Google blog (Jul 21)](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/) |
| **Hermes** | No **in-window** release. **Jul 20 (pre-window):** **`v0.19.0` “Quicksilver”** — ~80% cold-start TTFT cut, smart approvals default, **1Password**/Bitwarden secret sources, durable delivery ledger. | hold / monitor | **OpenClaw `2026.7.2`** adds memory import from **Hermes**; exploratory status in **TECH_STACK** | [Hermes v0.19.0](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.20) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **MCP** | **`2026-07-28` final spec (Jul 28):** stateless core, `server/discover`, MCP Apps + Tasks extensions, Tier-1 SDK updates (TypeScript, Python, Go, C#). | monitor / plan migration | Touches **Cursor**, **Codex**, **Antigravity**, **OpenClaw** MCP Apps train | [MCP 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/) · [Claude on MCP 2026-07-28](https://claude.com/blog/bringing-mcp-2026-07-28-to-claude) |
| **@cursor/sdk** | npm **`1.0.25` / `1.0.26` (Jul 28)**; **`1.0.24` (Jul 20, pre-window)**. AgentOS `package.json` still pins **`^1.0.13`**. | monitor | Same ecosystem as **Cursor Router** + **MCP 2026-07-28** — evaluate pin for scheduled scripts | [npm @cursor/sdk](https://www.npmjs.com/package/@cursor/sdk) · [SDK docs](https://cursor.com/docs/sdk/typescript) |
| **Laravel** | **`v13.22.0` (Jul 24)** — `#[BindWhen]`, multi-queue `queue:clear`, HTTP fake stream bodies, `RateLimiter` macroable, DNS fake in validation. **`v13.23.0` (Jul 27)** — monthly log driver/channel, SES tenant support, PostgreSQL `->using(...)` in `->change()` migrations. | monitor / upgrade on app cadence | Pairs with **Livewire** in **TECH_STACK** | [v13.22.0](https://github.com/laravel/framework/releases/tag/v13.22.0) · [v13.23.0](https://github.com/laravel/framework/releases/tag/v13.23.0) |
| **React** | **`19.2.8` / `19.1.9` / `19.0.8` (Jul 21, pre-window)** — RSC decoding performance. No additional in-window tags verified. | monitor / upgrade on app cadence | UI baseline in **TECH_STACK** | [React releases](https://github.com/facebook/react/releases) |
| **TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire** | No additional in-window primary-source releases verified beyond rows above (timeboxed). | not applicable / hold | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **OpenClaw** | **`2026.7.2` stable** promotion from beta train (tag/npm `latest` still on **`2026.7.1-2`**) | not stated | tentative | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Gemini** | **Imagen 4 / Gemini 3 Image** model shutdown (announced earlier) | **2026-08-17** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT (announced earlier) | **2026-08-26** | confirmed | [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **Gemini** | **Gemini 3.5 Pro** broad availability (mentioned on Jul 21 blog) | not stated | tentative | [Google blog (Jul 21)](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Clients (e.g. Claude) rolling out **`2026-07-28`** negotiation — legacy **`2025-11-25`** servers will not interoperate without dual-stack support | rolling post **Jul 28** | confirmed | [MCP 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **MCP** | **Codex** | **`2026-07-28` spec final (Jul 28)** + **Codex `0.146.0` (Jul 29)** registers MCP **`2026-07-28` feature flag** | AgentOS and **OpenClaw** MCP servers need a migration plan before clients negotiate stateless transport — **Codex** is already flagging the revision | [MCP 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/) · [Codex 0.146.0](https://github.com/openai/codex/releases/tag/rust-v0.146.0) |
| **OpenClaw** | **Codex** | **`2026.7.2-beta.5`:** session rewind/branching + upstream **Codex** session fork; **`0.146.0`:** paginated fork history + session naming | WoW auction analytics can align **OpenClaw** beta with **Codex** CLI before adopting rewind/fork workflows | [OpenClaw beta.5](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.5) · [Codex 0.146.0](https://github.com/openai/codex/releases/tag/rust-v0.146.0) |
| **Gemini** | **Antigravity** | **`gemini-3.6-flash`** / **`gemini-3.5-flash-lite` GA (Jul 21, pre-window)**; Google notes **3.6 Flash** in **Antigravity** | **OpenClaw** hybrid routing table in **TECH_STACK** should shift utility tier toward new Flash IDs; **Antigravity** is the orchestration IDE | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Google blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/) · [Antigravity changelog](https://antigravity.google/changelog) |
| **Antigravity** | **MCP** | **IDE `2.4.2`:** MCP connection/tool timeouts; **CLI `1.1.7`:** MCP OAuth issuer validation | Reduces hung **OpenClaw** subagent gateway sessions and aligns with **`2026-07-28`** auth hardening | [Antigravity changelog](https://antigravity.google/changelog) · [antigravity-cli releases](https://github.com/google-antigravity/antigravity-cli/releases) |
| **Cursor** | **MCP** | **Jul 22 Cursor Router** on CLI/SDK + **Jul 28 MCP spec** stateless HTTP | Scheduled **AgentOS** agents using **`@cursor/sdk`** Auto mode now ride Router + imminent MCP transport change — test on a branch before production schedules | [Cursor Router](https://cursor.com/changelog/router) · [MCP 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Refresh utility tier from **Gemini 2.5 Flash + Gemma e2b** snapshot to official GA IDs **`gemini-3.6-flash`** and **`gemini-3.5-flash-lite`**; note deprecated sampling params (`temperature`, `top_p`, `top_k`) on latest models.
- **`docs/TECH_STACK.md` → Hermes Agent:** Status still “exploratory” — if dabbling continues, cite current tag **`v0.19.0` (`v2026.7.20`)** and smart-approvals default.
- **`docs/TECH_STACK.md` → Antigravity:** Add **`2.4.x`** MCP timeout behavior and **`~/.gemini/config/config.json`** startup dependency (from **`2.3.1`**).
- **`package.json` → `@cursor/sdk`:** Pin **`^1.0.13`** vs npm **`1.0.26` (Jul 28)** and documented Node **22.13+** — evaluate bump when scheduled scripts need Router-era SDK + MCP migration typings.
- **`package.json` → `typescript`:** Dev dependency **`^5.8.3`** — no urgent AgentOS action; note for React client work.

## Searches & sources consulted

- [Cursor changelog](https://cursor.com/changelog) · [Cursor Router (Jul 22)](https://cursor.com/changelog/router) · [Cursor Start (Jul 28)](https://cursor.com/changelog/cursor-start)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Google blog — 3.6 Flash / 3.5 Flash-Lite (Jul 21)](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/)
- [ChatGPT / Codex changelog](https://developers.openai.com/codex/changelog) · [Health in ChatGPT (Jul 23)](https://openai.com/index/health-in-chatgpt/)
- [openai/codex releases](https://github.com/openai/codex/releases) (tags **`rust-v0.145.0`**, **`rust-v0.146.0`**)
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases) (tag **`v2026.7.20`**)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) · [v2026.7.2-beta.5](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.5) · [npm openclaw registry](https://www.npmjs.com/package/openclaw)
- [Antigravity changelog](https://antigravity.google/changelog) · [antigravity-cli releases](https://github.com/google-antigravity/antigravity-cli/releases)
- [MCP 2026-07-28 final](https://blog.modelcontextprotocol.io/posts/2026-07-28/) · [Claude on MCP 2026-07-28](https://claude.com/blog/bringing-mcp-2026-07-28-to-claude)
- [Laravel v13.22.0](https://github.com/laravel/framework/releases/tag/v13.22.0) · [v13.23.0](https://github.com/laravel/framework/releases/tag/v13.23.0)
- [React releases](https://github.com/facebook/react/releases) · [npm @cursor/sdk](https://www.npmjs.com/package/@cursor/sdk)
- Prior digest: `docs/research/tech-stack-updates-2026-07-20.md`
