# Tech stack updates — 2026-05-25 (America/New_York)

- **Window:** **2026-05-18 00:00** America/New_York (EDT, UTC−04:00) → **2026-05-25 23:59** America/New_York — i.e. **2026-05-18 04:00 UTC** through **2026-05-26 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini (core):** **Today (May 25)** is the official shutdown date for **`gemini-3.1-flash-lite-preview`**; migrate to **`gemini-3.1-flash-lite` GA** if any OpenClaw or AgentOS scripts still call the preview ID. **Tomorrow (May 26)** the Interactions API **`outputs` → `steps`** schema becomes the default (legacy removed **June 8**) — **upgrade/migrate** any Interactions integrations before the flip.
- **Antigravity (core):** **2.0.6 (May 22)** adds explicit **Install IDE / Open IDE** integration after the **2.0** split confused users; pair with the **May 19** Google Developers Blog notice that **Gemini CLI sunsets June 18, 2026** for Pro/Ultra/free tiers (Antigravity CLI is the replacement path). **Monitor** product topology (2.0 agent manager vs standalone IDE) before changing OpenClaw orchestration.
- **OpenClaw (core):** **`v2026.5.22` (May 24)** ships gateway startup perf, a **Meeting Notes** source-only plugin, **shrinkwrap/npm integrity** hardening, **`protobufjs` 8.4.0** advisory clearance, and **Antigravity CLI** (not Gemini CLI) as the lower-priority media fallback — **monitor → upgrade** on your release cadence.
- **Cursor (core):** **May 18–20** cluster remains the in-window headline — **Composer 2.5**, **Jira** integration, **3.5 Automations** in the Agents Window (multi-repo + no-repo templates). No post–May 20 primary-source release verified; **hold/monitor** unless you need automations or Jira cloud agents now.
- **Hermes (core):** **v0.14.0 / `v2026.5.16` (May 16)** — PyPI install, lazy deps, security hardening, **Teams** end-to-end, OAuth → OpenAI-compatible local proxy — **upgrade** if you move beyond exploratory dabbling; no newer release in-window.
- **MCP (non-core, Cursor-adjacent):** **`2026-07-28` spec RC locked May 21** — stateless transport, breaking handshake/session removal — **monitor** for Cursor MCP auth/OAuth fixes (3.4 noted MCP token lifecycle work **May 13**).

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **`gemini-3.1-flash-lite-preview` shutdown May 25, 2026** per official changelog/deprecations. | upgrade (model ID) | [Changelog (May 7 entry)](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Gemini** | **Interactions API** legacy schema default ends **May 26**; removed **June 8**. | upgrade / migrate | [Breaking changes guide](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Gemini** | **Managed Agents** + **Antigravity Agent** preview (`antigravity-preview-05-2026`) — sandbox isolation is the trust boundary. | monitor / pilot | [Agents overview](https://ai.google.dev/gemini-api/docs/agents) · [Antigravity Agent guide](https://ai.google.dev/gemini-api/docs/antigravity-agent) |
| **OpenClaw** | **`v2026.5.22`**: generated npm **shrinkwrap**, **`protobufjs` → 8.4.0** (npm advisory clearance per release notes), Docker setup stops printing Gateway bearer token in logs. | upgrade | [v2026.5.22](https://github.com/openclaw/openclaw/releases/tag/v2026.5.22) |
| **Hermes** | **v2026.5.16**: sudo brute-force block, dangerous-command bypass closes, tool-error sanitization, supply-chain advisory scanning on install (per release notes). | upgrade (if deployed) | [v2026.5.16](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16) |
| **Cursor** | No dedicated CVE bulletin in-window; **3.5 Automations** + Jira expand cloud/agent attack surface. | monitor / tighten org policy | [3.5 / Automations](https://cursor.com/changelog/05-20-26) |
| **Antigravity** | **2.0** product split caused migration/support churn; **2.0.6** adds IDE entry points — treat as **preview/stabilizing**. | monitor | [Antigravity changelog](https://antigravity.google/changelog) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **React (RSC)** | Latest GitHub advisory **GHSA-rv78-f8rc-xrxh** published **May 6** (CVE-2026-23870) — **outside** May 18+ window but still relevant for App Router / RSC surfaces if unpatched. | upgrade (if RSC) | [GHSA-rv78-f8rc-xrxh](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) |
| **TypeScript / Livewire / Tailwind / Cypress / Jest / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / 1Password** | No in-window **primary-source** security items verified for this run (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|------------------------------|------|
| **Gemini** | **May 19:** **`gemini-3.5-flash` GA**; **Managed Agents** public preview; **`antigravity-preview-05-2026`**. **May 7 (deadline May 25):** **`gemini-3.1-flash-lite` GA**; preview shutdown. | monitor / staged rollout; **migrate preview IDs today** | Strong **Gemini ↔ Antigravity** linkage; **Managed Agents** overlaps **Cursor**/OpenClaw background-agent posture | [Changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Gemini 3.5 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash) |
| **Antigravity** | **May 19:** **2.0.1** launch bug fixes (CJK migration, duplicate imports, Google One credits). **May 22:** **2.0.6** — **Install IDE / Open IDE** buttons linking agent manager to standalone IDE. **May 19 blog:** **Gemini CLI → Antigravity CLI**; Gemini CLI stops for Pro/Ultra/free **June 18, 2026**. | monitor / plan migration | OpenClaw **`v2026.5.22`** now prefers **Antigravity CLI** over Gemini CLI for media fallback | [Changelog](https://antigravity.google/changelog) · [Gemini CLI transition](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **OpenClaw** | **May 21:** **`v2026.5.20`**. **May 24:** **`v2026.5.22`** — gateway perf (lazy handlers, plugin metadata cache, `/models` warm ~4100× faster per release notes), Meeting Notes plugin, subagent bootstrap trimmed to `AGENTS.md`/`TOOLS.md`, media understanding stops auto-probing Gemini CLI. | monitor / upgrade | **Antigravity CLI** media path aligns with Google’s CLI consolidation | [v2026.5.22](https://github.com/openclaw/openclaw/releases/tag/v2026.5.22) · [Releases](https://github.com/openclaw/openclaw/releases) |
| **Cursor** | **May 18:** **Composer 2.5**. **May 19:** **Jira** (`@Cursor`). **May 20:** **3.5** — Automations in Agents Window, multi-repo + no-repo automations, marketplace templates, 50% off new automation runs (7 days from post). | monitor → upgrade when org-ready | Automations vs OpenClaw **cron** — same ops class, different products | [Composer 2.5](https://cursor.com/changelog/composer-2-5) · [Jira](https://cursor.com/changelog/05-19-26) · [3.5](https://cursor.com/changelog/05-20-26) |
| **Hermes** | **May 16:** **v0.14.0** — PyPI, lazy installs, OpenAI-compatible **proxy**, **Microsoft Teams**, `x_search`, Windows native beta, large perf wave. | upgrade (exploratory → pinned) | **Teams** parallels **Cursor** Jira/Teams “work surface → agent” pattern | [v2026.5.16](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|------------------------------|------|
| **Laravel** | **May 19:** **`v13.10.0`** (storage cache driver, queue worker idle, schedule group callbacks). **`v13.11.0`** Dedicated Cloud Queue. **May 20:** **`v13.11.1`–`v13.11.2`** managed-queue lifecycle fixes. | monitor / upgrade on app cadence | Pairs with **Livewire** row in `TECH_STACK.md` | [v13.10.0](https://github.com/laravel/framework/releases/tag/v13.10.0) · [v13.11.0](https://github.com/laravel/framework/releases/tag/v13.11.0) · [v13.11.2](https://github.com/laravel/framework/releases/tag/v13.11.2) |
| **Playwright** | **May 18:** **`playwright-python` v1.60.0** — HAR-on-tracing, `locator.drop()`, ARIA snapshot `boxes`, soft assertions. | monitor / upgrade when E2E suite ready | Testing row with **Cypress/Jest** | [playwright-python v1.60.0](https://github.com/microsoft/playwright-python/releases/tag/v1.60.0) |
| **MCP** | **May 19–22:** **`2026-07-28` RC** announced/locked — stateless Streamable HTTP, no `initialize` handshake, extensions (MCP Apps, Tasks). **May 22:** spec doc alignment PR merged. | monitor (breaking Jul 28) | **Cursor 3.4** improved MCP OAuth/token lifecycle **May 13** — watch for SDK tier updates | [RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [Draft changelog](https://modelcontextprotocol.io/specification/draft/changelog) |
| **React** | No new GitHub advisory **published** in-window; May 6 RSC DoS advisory still the active item. | monitor / upgrade if RSC | — | [Security advisories](https://github.com/facebook/react/security/advisories) |
| **Claude Code / Google AI Studio / Python / SQLite / Livewire / Tailwind / …** | No additional in-window primary-source items verified beyond rows above (timeboxed). | not applicable / monitor | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Interactions API** new schema default | **2026-05-26**; legacy removed **2026-06-08** | confirmed | [Breaking changes guide](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Gemini** | **Gemini 3.5 Pro** (blog: “rolling out next month” from May 19 post) | not fixed | tentative | [Gemini 3.5 blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/) |
| **Antigravity** | **Gemini CLI** sunset for Pro/Ultra/free individual tiers | **2026-06-18** | confirmed | [Transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **Cursor** | Composer 2.5 “first week” usage promo; automation runs 50% off “next 7 days” from **May 20** | time-limited | tentative | [Composer 2.5](https://cursor.com/changelog/composer-2-5) · [3.5](https://cursor.com/changelog/05-20-26) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (RC locked **May 21**) | **2026-07-28** | confirmed | [RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **Antigravity** | **`gemini-3.5-flash` GA**, **Managed Agents**, **`antigravity-preview-05-2026`**, plus **Gemini CLI → Antigravity CLI** consolidation (**June 18**). | Core stack tools now share one Google “agent platform” narrative — worth reading before mixing **OpenClaw** self-hosted gateways with **Managed Agents**. | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) · [CLI transition](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **OpenClaw** | **Antigravity** | **`v2026.5.22`** stops auto-probing **Gemini CLI** and uses **Antigravity CLI** as media fallback; docs add Gemini CLI/Antigravity media guidance. | OpenClaw pipelines that relied on Gemini CLI need an **Antigravity CLI** path before **June 18**. | [v2026.5.22](https://github.com/openclaw/openclaw/releases/tag/v2026.5.22) |
| **Cursor** | **OpenClaw** | Cursor **Automations (3.5)** vs OpenClaw **cron** + gateway agents — different products, same *ops* class. | Helps decide where scheduled/ambient agent work lives per project. | [05-20-26](https://cursor.com/changelog/05-20-26) · [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Cursor** | **MCP** | MCP **`2026-07-28` RC** stateless transport vs **Cursor 3.4** MCP OAuth/token fixes. | AgentOS and commodity projects using MCP should plan for protocol breaking changes **before July 28**. | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [Cursor 3.4](https://cursor.com/changelog/3-4) |
| **Hermes** | **Cursor** | Hermes **Teams** (**v2026.5.16**) vs Cursor **Jira** (**May 19**). | Compare access-control models if routing work through issue trackers + chat. | [Hermes v2026.5.16](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16) · [Jira changelog](https://cursor.com/changelog/05-19-26) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Refresh model-ID shorthand now that **`gemini-3.5-flash` GA** and **`gemini-3.1-flash-lite-preview` shutdown (May 25)** are official — align portfolio language with IDs actually called in OpenClaw/AgentOS.
- **Antigravity:** Document the **2.0 product split** (agent manager vs **Antigravity IDE**), **2.0.6 IDE integration**, and **Gemini CLI sunset (June 18, 2026)** so future digests don’t treat Antigravity as IDE-only.
- **OpenClaw:** Note **`v2026.5.22`** Antigravity CLI media fallback if Google Workspace CLI / Python ETL docs still mention Gemini CLI.
- **Hermes:** If standardizing on **`pip install hermes-agent`**, mirror PyPI install in the Hermes Agent subsection.

## Searches & sources consulted

- `https://cursor.com/changelog` (+ May 18–20 entry pages)
- `https://ai.google.dev/gemini-api/docs/changelog` · interactions breaking-changes guide · deprecations (fetch attempted)
- `https://antigravity.google/changelog`
- `https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/`
- `https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/`
- `https://github.com/NousResearch/hermes-agent/releases` · `v2026.5.16` tag
- `https://github.com/openclaw/openclaw/releases` · `v2026.5.20` · `v2026.5.22` tags
- `https://github.com/laravel/framework/releases` · `v13.10.0` · `v13.11.0` · `v13.11.2`
- `https://github.com/microsoft/playwright-python/releases/tag/v1.60.0`
- `https://github.com/facebook/react/security/advisories`
- `https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/` · draft spec changelog
- Prior digest: `docs/research/tech-stack-updates-2026-05-22.md` (overlap deduped; May 23–25 deltas emphasized)
