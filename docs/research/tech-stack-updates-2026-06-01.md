# Tech stack updates — 2026-06-01 (America/New_York)

- **Window:** **2026-05-25 00:00** America/New_York (EDT, UTC−04:00) → **2026-06-01 23:59** America/New_York — i.e. **2026-05-25 04:00 UTC** through **2026-06-02 03:59 UTC** *(inclusive run anchored on digest date; vendor-dated **May 25–Jun 1** ET treated as in-scope)*  
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini (core):** **`gemini-2.0-flash*` family shutdown is today (June 1, 2026)** per the official deprecations table—any OpenClaw/Gemini routes still on `gemini-2.0-flash`, `-001`, `-lite`, or `-lite-001` will fail until migrated to **`gemini-2.5-flash`** / **`gemini-2.5-flash-lite`** (or newer GA tiers). **May 28** also GA’d **`gemini-3.1-flash-image`** and **`gemini-3-pro-image`** with preview shutdown **June 25**—**upgrade/migrate** model IDs before endpoints go dark.  
- **OpenClaw (core):** **`v2026.5.28` (May 30)** ships **Codex Supervisor** + **GitHub Copilot agent runtime**, **Claude Opus 4.8**, gateway/session hardening, mobile/iOS refresh, and a broad input-validation wave—**monitor → upgrade** on your OpenClaw cadence; read security rows if you run channel automations.  
- **Hermes (core):** **`v0.15.0` (May 28)** is a major velocity release (76% `run_agent.py` shrink, Kanban swarm platform, promptware defense, Bitwarden secrets); **`v0.15.1` (May 29)** hotfixes a **dashboard infinite-reload loop** in loopback/Docker—**upgrade** if you dabble with Hermes; **hold** if not deployed.  
- **Cursor (core):** **May 29 `3.6`** adds **Auto-review** run mode—a classifier subagent gates Shell/MCP/Fetch calls for longer runs with fewer approval prompts—**monitor** approval/HITL policy before enabling on AgentOS or commodity repos.  
- **Codex + ChatGPT (core):** **May 29** Codex app **26.527** brings **Computer Use on Windows** + **remote control from ChatGPT mobile/Mac**; **May 28** **GPT-5.5 Instant** style update drops **canvas** in favor of in-chat writing/code blocks and announces **GPT-4.5** retirement **June 27**—**monitor** if Tyler uses Windows Codex or legacy canvas workflows.  
- **Antigravity (core):** No **official Antigravity-only** product changelog dated **May 25–Jun 1** verified; actionable pressure remains **Gemini CLI → Antigravity CLI** consumer cutoff **June 18, 2026** and **MCP config** migration to **`mcp_config.json`** (`serverUrl` vs `url`) per Google’s transition guidance—**monitor / plan migration**.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **`gemini-2.0-flash`**, **`gemini-2.0-flash-001`**, **`gemini-2.0-flash-lite`**, **`gemini-2.0-flash-lite-001`** **shutdown June 1, 2026** (today). **`gemini-3.1-flash-lite-preview` shut down May 25**—calls to retired IDs fail. **Interactions API** legacy schema removal **June 8**. | upgrade / migrate | [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [Changelog (May 25)](https://ai.google.dev/gemini-api/docs/changelog) · [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **OpenClaw** | **`v2026.5.28`**: phone-control mutation auth tightening, directive persistence policy, browser/gateway input validation, Teams untrusted service URL blocks, browser token expiry after auth rotation, malformed cron/schema rejection. | upgrade (if deployed) | [Release v2026.5.28](https://github.com/openclaw/openclaw/releases/tag/v2026.5.28) |
| **Hermes** | **`v0.15.0`**: promptware/Brainworm-class defense at tool-output and memory chokepoints; **`xai-oauth` `base_url` pinned** to close credential-leak vector; **`v0.15.1`**: dashboard loopback 401 misread hotfix. | upgrade (if deployed) | [v2026.5.28](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.28) · [v2026.5.29](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.29) |
| **Cursor** | **Auto-review (3.6)** routes non-allowlisted/non-sandboxed Shell, MCP, and Fetch calls through a classifier—misconfiguration can widen execution without explicit per-call approval. | monitor / policy | [Changelog](https://cursor.com/changelog) |
| **Codex** | **CLI 0.134.0+** rejects legacy profile selectors; **0.135.0** adds named permission profiles—stale configs may break until migrated. | monitor / migrate profiles | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.134.0](https://github.com/openai/codex/releases/tag/rust-v0.134.0) |
| **ChatGPT** | **May 28**: **GPT-4.5** ChatGPT retirement announced **June 27**; **OpenAI o3** **August 26**—not CVEs but access-boundary deadlines for legacy model users. | monitor | [ChatGPT release notes (May 28)](https://help.openai.com/en/articles/6825453-chatgptrelease-notes) |
| **Antigravity** | No in-window security bulletin verified; **June 18** Gemini CLI consumer cutoff is an **access/trust-boundary** migration deadline. | monitor / plan migration | [Gemini CLI → Antigravity CLI](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **MCP** | No new MCP spec publication **May 25–Jun 1** verified (prior **`2026-07-28` RC** locked **May 21** remains the planning horizon). Antigravity CLI **`mcp_config.json`** shape differs from Gemini CLI inline MCP—mis-migration is an ops risk, not a CVE. | monitor / plan | [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **React (RSC)** | Latest GitHub Security Advisory publish date remains **2026-05-06** (GHSA-rv78…)—outside this window but still relevant if unpatched on App Router surfaces. | monitor | [GHSA-rv78-f8rc-xrxh](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) |
| **TypeScript / Tailwind / Cypress / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / 1Password / Playwright / Figma / Git** | No in-window **primary-source** security items verified for this run (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **Gemini** | **May 28:** GA **`gemini-3.1-flash-image`** + **`gemini-3-pro-image`**; video-to-image on Flash Image; preview models deprecated for **June 25** shutdown. **May 25:** **`gemini-3.1-flash-lite-preview` shut down**. **June 1 (today):** **`gemini-2.0-flash*` family shutdown**. | upgrade / migrate | OpenClaw hybrid Gemini/Gemma configs and `TECH_STACK.md` “utility tier” model IDs need reconciling against [deprecations](https://ai.google.dev/gemini-api/docs/deprecations) | [Changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **OpenClaw** | **`v2026.5.28` (May 30)**—Codex/GitHub Copilot agent runtime + **Codex Supervisor** plugin; **Claude Opus 4.8**; Workboard coordination tools; iOS Pro UI + Talk/Gateway chat refresh; ClawPDF/encrypted PDF extraction; cron model-fallback preflight; legacy `api_key` auth profile migration; **`v2026.5.26`** (May 27) still the prior major security/transcript drop if not yet upgraded. | monitor → upgrade | Explicit **Codex Supervisor** path pairs with **Codex 0.135.0** profile migration and **OpenClaw** auth-profile work from **`v2026.5.26`** | [v2026.5.28](https://github.com/openclaw/openclaw/releases/tag/v2026.5.28) · [v2026.5.26](https://github.com/openclaw/openclaw/releases/tag/v2026.5.26) |
| **Hermes** | **`v0.15.0` (May 28)**—major refactor, Kanban swarm, 4,500× faster `session_search`, Bitwarden secrets, MCP catalog picker, OpenHands orchestration skill, xAI round. **`v0.15.1` (May 29)**—dashboard reload hotfix + Docker `--insecure` explicit opt-in. | upgrade (if deployed) / hold | OpenHands skill delegates alongside **Codex**/**OpenCode**; **OpenClaw `v2026.5.26`** Hermes auth-profile migration still relevant | [v2026.5.28](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.28) · [v2026.5.29](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.29) |
| **Cursor** | **May 29 (3.6):** **Auto-review** run mode for longer agent runs. *(May 20 **3.5** Shared canvases + `/loop` + Automations-in-Agents-Window remain context from prior week.)* | monitor | **Auto-review** classifier pattern parallels **OpenClaw** HITL + **Hermes** permission profiles—compare before enabling ambient runs | [Changelog](https://cursor.com/changelog) |
| **Codex** | **May 29:** app **26.527**—**Computer Use on Windows**, remote control from ChatGPT iOS/Android/Mac, Profile usage/token stats. **May 28:** CLI **0.135.0** (`codex doctor`, named permission profiles, Vim text objects). **May 26:** CLI **0.134.0** (thread search, `--profile` migration). | monitor / upgrade CLI pins | **OpenClaw `v2026.5.28`** adds Codex Supervisor + resolves **GPT-5.5** without cached catalog | [Codex changelog](https://developers.openai.com/codex/changelog) · [0.135.0](https://developers.openai.com/codex/changelog) · [0.134.0](https://github.com/openai/codex/releases/tag/rust-v0.134.0) |
| **ChatGPT** | **May 29:** Codex Windows computer use + mobile remote (mirrors Codex app release). **May 28:** **GPT-5.5 Instant** style update; canvas removed from Instant/Thinking in favor of in-chat blocks; legacy model sunset notices. | monitor | Product surface for **Codex** remote workflows Tyler may use alongside **Cursor** / **OpenClaw** | [Release notes](https://help.openai.com/en/articles/6825453-chatgptrelease-notes) |
| **Antigravity** | No Antigravity IDE/platform release page dated **May 25–Jun 1** verified on official Google domains. Adjacent: **May 28** Gemini API GA image models and **May 19** **`gemini-3.5-flash`** GA (both list Antigravity as a delivery surface). | hold / monitor | **OpenClaw** portfolio **Antigravity** orchestration should confirm CLI target before **June 18** cutoff | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) · [CLI transition](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **May 26:** framework **`v13.12.0`**—queue worker lost-connection opt-out, scheduler callback resolution, filesystem path encoding fixes. **May 27:** **`laravel/laravel` v13.8.0`** skeleton—JSON exceptions for API routes, Tailwind `@source` cleanup. | monitor / upgrade on app cadence | Pairs with **Livewire** row in `TECH_STACK.md` | [v13.12.0](https://github.com/laravel/framework/releases/tag/v13.12.0) · [laravel v13.8.0](https://github.com/laravel/laravel/releases/tag/v13.8.0) |
| **Livewire (adjacent)** | **May 27:** **Filament v5.6.6** (Livewire admin stack)—patch release on Filament track. | monitor | Laravel + Livewire app maintenance | [Filament v5.6.6](https://github.com/filamentphp/filament/releases/tag/v5.6.6) |
| **MCP** | No additional in-window MCP spec posts beyond **May 21 `2026-07-28` RC** (pre-window anchor still actionable). Community docs note Antigravity **`mcp_config.json`** + **`serverUrl`** field rename vs Gemini CLI. | monitor | Affects **Cursor**, **Hermes** MCP catalog, **Antigravity**, any **OpenClaw** MCP servers | [MCP RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **React** | No new GitHub **release** or **security advisory published** in-window. | hold / monitor | — | [Security advisories](https://github.com/facebook/react/security/advisories) |
| **TypeScript** | No release after **`v6.0.3` (April 16)** verified in-window. | not applicable | — | [Releases](https://github.com/microsoft/TypeScript/releases) |
| **Playwright / Tailwind / Cypress / Jest / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / @cursor/sdk / Figma / Git** | No additional in-window primary-source items verified beyond rows above (timeboxed). | not applicable / monitor | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Interactions API** legacy schema removal | **2026-06-08** | confirmed | [Breaking changes guide](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Gemini** | **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shutdown | **2026-06-25** | confirmed | [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **ChatGPT** | **GPT-4.5** retirement from ChatGPT (paid legacy picker) | **2026-06-27** | confirmed | [Release notes (May 28)](https://help.openai.com/en/articles/6825453-chatgptrelease-notes) |
| **Antigravity** | **Gemini CLI** + **Gemini Code Assist IDE extensions** stop serving consumer **Google AI Pro/Ultra** and free individual tiers | **2026-06-18** | confirmed | [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **Gemini** | **Gemini 3.5 Pro** (I/O narrative: internal testing, rollout after Flash) | not fixed | tentative | [Gemini 3.5 blog](https://blog.google/intl/en-africa/products/explore-get-answers/gemini-3-5/) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (RC locked **May 21**) | **2026-07-28** | confirmed | [RC post](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT | **2026-08-26** | confirmed | [Release notes (May 28)](https://help.openai.com/en/articles/6825453-chatgptrelease-notes) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **OpenClaw** | **`gemini-2.0-*` shutdown hits today (June 1)** while OpenClaw **`v2026.5.28`** expands multi-provider catalogs (Claude Opus 4.8, Codex Supervisor, GPT-5.5 resolution). | Reconcile OpenClaw Python/Gemini model IDs against the deprecations table **before** production scrape/analytics jobs fail. | [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [OpenClaw v2026.5.28](https://github.com/openclaw/openclaw/releases/tag/v2026.5.28) |
| **OpenClaw** | **Codex** | **`v2026.5.28`** ships **Codex Supervisor** plugin + GitHub Copilot agent runtime; builds on **`v2026.5.26`** Codex auth-profile migration. | If Tyler pins **Codex `0.134.0`/`0.135.0`** in OpenClaw, this is the in-window bridge for delegated Codex workflows. | [v2026.5.28](https://github.com/openclaw/openclaw/releases/tag/v2026.5.28) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Hermes** | **Codex** | **`v0.15.0`** OpenHands orchestration skill lists **Codex** as a delegate target; **`v0.15.0`** also benchmarks cold-start against Codex CLI. | Exploratory **Hermes** dabbling can route sub-tasks to **Codex** without abandoning OpenClaw/Antigravity orchestration patterns. | [v2026.5.28](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.28) |
| **Cursor** | **Codex / ChatGPT** | Cursor **Auto-review (3.6)** vs Codex **Computer Use on Windows (26.527)** + ChatGPT mobile remote—different vendors, same *ops* class (long-running agents with reduced inline approval). | Helps decide where Windows desktop automation vs IDE-embedded agent loops should live per project. | [Cursor changelog](https://cursor.com/changelog) · [ChatGPT May 29](https://help.openai.com/en/articles/6825453-chatgptrelease-notes) |
| **Antigravity** | **Gemini / MCP** | **June 18** Gemini CLI sunset pushes terminal workflows to **Antigravity CLI** with separate **`mcp_config.json`**; **Gemini 3.5 Flash** remains the stated default model class. | **OpenClaw** notes **Google Workspace CLI** + **Antigravity**—confirm MCP server configs before the CLI binary swap. | [CLI transition](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) · [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference table:** Portfolio still cites **Gemini 3.1 Pro + Gemma 26b** / **Gemini 2.5 Flash + Gemma e2b**—official GA emphasis this week is **`gemini-3.5-flash`** (May 19) and **`gemini-3.1-flash-lite`** (May 7); **`gemini-2.0-*` is shut down June 1, 2026**. Refresh tier names against [deprecations](https://ai.google.dev/gemini-api/docs/deprecations).  
- **`TECH_STACK.md` → Hermes status:** Still “exploratory / early dabbling”—vendor shipped **`v0.15.0`/`v0.15.1`** with Kanban swarm + security hardening; consider elevating monitoring note if Tyler activates it.  
- **`TECH_STACK.md` → Codex integration:** OpenClaw release notes now reference **Codex Supervisor** and **GPT-5.5** resolution—worth a one-line cross-link under OpenClaw if pins are documented locally.  
- **Antigravity / Gemini CLI:** Add a reminder that **June 18, 2026** consumer Gemini CLI cutoff and **`mcp_config.json`** migration are planning items for OpenClaw-adjacent scripts (official blog only—no invented CLI flags).

## Searches & sources consulted

- [Cursor changelog](https://cursor.com/changelog) — **3.6 Auto-review (May 29, 2026)**  
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) — May 25, 28 entries  
- [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) — June 1 `gemini-2.0-*` shutdown  
- [OpenAI Codex changelog](https://developers.openai.com/codex/changelog) — May 26–29 entries  
- [OpenAI Codex GitHub releases](https://github.com/openai/codex/releases) — **rust-v0.134.0**  
- [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgptrelease-notes) — May 28–29 entries  
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) — **v2026.5.28**, **v2026.5.26**  
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases) — **v2026.5.28**, **v2026.5.29**  
- [Google Developers Blog — Gemini CLI → Antigravity CLI](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)  
- [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) — context only (May 21)  
- [Laravel framework v13.12.0](https://github.com/laravel/framework/releases/tag/v13.12.0) · [laravel/laravel v13.8.0](https://github.com/laravel/laravel/releases/tag/v13.8.0) · [Filament v5.6.6](https://github.com/filamentphp/filament/releases/tag/v5.6.6)  
- Prior digest: `docs/research/tech-stack-updates-2026-05-27.md` (continuity for May 20–27 items)
