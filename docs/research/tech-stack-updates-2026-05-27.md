# Tech stack updates — 2026-05-27 (America/New_York)

- **Window:** **2026-05-20 00:00** America/New_York (EDT, UTC−04:00) → **2026-05-27 23:59** America/New_York — i.e. **2026-05-20 04:00 UTC** through **2026-05-28 03:59 UTC** *(inclusive run anchored on digest date; vendor-dated **May 20–27** ET treated as in-scope)*  
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **OpenClaw (core):** **`v2026.5.26` (May 27)** is the week’s largest **self-hosted agent** drop—gateway performance caching, unified **transcript** path, mobile **reaction approvals** (Signal/iMessage/WhatsApp), a broad **content-boundary** security wave (SSRF on browser snapshots, external-content wrapping, gateway auth rate limiting), **Hermes/OpenCode/Codex named auth profiles**, and **Codex `0.134.0`**—**monitor → upgrade** on your OpenClaw cadence; read security rows before enabling new channel surfaces.  
- **Gemini (core):** **May 25** official changelog confirms **`gemini-3.1-flash-lite-preview` shutdown** (use **`gemini-3.1-flash-lite`**); **May 26** is the stated default for the **Interactions API** schema migration (`outputs` → `steps`) with legacy removal **June 8**—**upgrade/migrate** any code still on the old Interactions shape; **`gemini-2.0-flash*` family shutdown June 1** is now one week out per deprecations table.  
- **Cursor (core):** **May 20** **3.5** adds **Shared canvases** (team browser snapshots of agent artifacts) and **`/loop`** (local scheduled / goal-driven agent loops)—**monitor** for AgentOS-style workflows; separate **May 20** automations post’s **50% off new automation runs** promo was **7 days from May 20** (likely **ends ~May 27**—verify in product if billing-sensitive).  
- **MCP (non-core, high synergy):** Official **May 21** lock of the **`2026-07-28` MCP specification RC**—largest protocol revision since launch (**stateless** Streamable HTTP, removed `initialize` handshake, formal **Extensions** including **MCP Apps** and **Tasks**) with final spec **July 28**—**monitor** for Cursor/Hermes/OpenClaw MCP server operators; no forced migration until clients/SDKs ship RC support.  
- **Hermes (core):** No GitHub release after **`v2026.5.16` (May 16)**—**hold**; adjacent **OpenClaw `v2026.5.26`** adds **Hermes auth-profile migration** if you bridge the two stacks.  
- **Antigravity (core):** No **official** Antigravity-only changelog dated **May 20–27** verified; **roadmap pressure** remains **Gemini CLI → Antigravity CLI** consumer cutoff **June 18, 2026** per Google Developers Blog (**May 19** announcement, still actionable this week).  
- **Laravel (non-core):** **`v13.12.0` (May 26)**—routine 13.x fixes (queue worker reconnect opt-out, scheduler callback resolution, filesystem path encoding)—**monitor** on app upgrade cadence.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **OpenClaw** | **`v2026.5.26`**: Browser snapshot URLs validated against **SSRF** policy; queued **system-event** text sanitized against nested prompt-marker spoofing; fetched file text wrapped as **external content**; **ClickClack** sender allowlists before dispatch; stale **device tokens** rejected; **`memory_store`** rejects prompt-like text before embedding; default **gateway auth rate limiter** for remote failures when unset. | upgrade (if deployed) | [Release v2026.5.26](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.26) |
| **Gemini** | **Interactions API** breaking schema became default **May 26**; legacy removed **June 8**—misconfigured clients risk runtime failures, not a CVE. **`gemini-3.1-flash-lite-preview` shut down May 25**—calls to retired model IDs fail until migrated. | upgrade / migrate | [Changelog (May 25)](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Cursor** | **Shared canvases** publish team-visible artifact snapshots (paid plans; privacy-mode constraints)—treat shared links like any internal doc leak surface. **`/loop`** enables local recurring agent runs until a goal—review hook/approval posture for long-running loops. | monitor / policy | [Changelog hub](https://cursor.com/changelog) · [Canvas docs](https://cursor.com/docs/agent/tools/canvas) |
| **Hermes** | No new in-window release; prior **v2026.5.16** security hardening still the latest verified line. | hold | [Releases](https://github.com/NousResearch/hermes-agent/releases) |
| **Antigravity** | No in-window security bulletin; **June 18** Gemini CLI/Code Assist consumer cutoff is an **access/trust-boundary** migration deadline, not a patch CVE. | monitor / plan migration | [Gemini CLI → Antigravity CLI](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **MCP** | **`2026-07-28` RC (locked May 21)** removes protocol-level sessions and `initialize` handshake—remote MCP servers using sticky sessions / shared session stores need architecture review before **July 28** final spec. | monitor / plan | [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **React (RSC)** | Latest GitHub Security Advisory publish date remains **2026-05-06** (GHSA-rv78…)—outside this window but still relevant if unpatched on App Router surfaces. | monitor | [GHSA-rv78-f8rc-xrxh](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) |
| **TypeScript / Tailwind / Cypress / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / 1Password / Playwright / Figma / Git** | No in-window **primary-source** security items verified for this run (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **OpenClaw** | **`v2026.5.22` (May 24)** docs/perf/meeting-notes plugin groundwork. **`v2026.5.26` (May 27)**—gateway startup/reply perf caches; core **transcripts** + meeting summaries; **Hermes/OpenCode/Codex** named auth profiles + migration; **Activity** tab; **OpenTelemetry** LLM spans; **Codex 0.134.0**; **Rastermill** replaces Sharp for images; **cron.maxConcurrentRuns** default **8**; voice/Talk steering; reaction approvals on mobile channels. | monitor → upgrade | Pairs with **Hermes** auth profiles; **Gemini/Antigravity** docs called out in release notes for media guidance | [Releases](https://github.com/openclaw/OpenClaw/releases) · [v2026.5.26](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.26) · [v2026.5.22](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.22) |
| **Gemini** | **May 25:** **`gemini-3.1-flash-lite-preview` shut down** → use **`gemini-3.1-flash-lite`**. **May 26 (per May 6 notice):** **Interactions API** new request/response schema is default. | upgrade / migrate | OpenClaw multi-provider configs should confirm model IDs against [deprecations](https://ai.google.dev/gemini-api/docs/deprecations) | [Changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Cursor** | **May 20 (3.5):** **Shared canvases** (dashboard + browser share links). **`/loop` skill** for local scheduled/goal-driven agent loops. *(Automations-in-Agents-Window also May 20—see prior digest; promo window may end ~May 27.)* | monitor | **Shared canvases** echo agent **Artifact** patterns in **Antigravity**; **`/loop`** is local-only vs **OpenClaw cron** / Cursor **Automations** cloud paths | [Changelog](https://cursor.com/changelog) · [05-20-26 Automations](https://cursor.com/changelog/05-20-26) · [Canvas docs](https://cursor.com/docs/agent/tools/canvas) |
| **Hermes** | No release published **May 20–27** (latest **`v2026.5.16`**, May 16). | hold | OpenClaw **`v2026.5.26`** explicitly migrates **Hermes auth profiles** | [Releases](https://github.com/NousResearch/hermes-agent/releases) |
| **Antigravity** | No Antigravity IDE/platform release page dated **May 20–27** verified. Adjacent: **Google AI Studio** I/O narrative (Kotlin, Cloud Run export to Antigravity) is **May 19**—context only. | hold / monitor | **OpenClaw** release notes reference **Gemini CLI/Antigravity** media guidance in **`v2026.5.22`** docs slice | [I/O developer keynote](https://developers.googleblog.com/en/all-the-news-from-the-google-io-2026-developer-keynote/) · [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **MCP** | **May 21:** **`2026-07-28` specification RC locked**—stateless Streamable HTTP, `Mcp-Method`/`Mcp-Name` headers, **MCP Apps** + **Tasks** extensions, deprecates Roots/Sampling/Logging core features (12-month policy). | monitor | Affects **Cursor** MCP integrations, **Hermes** MCP transport work, and any **OpenClaw** MCP servers | [RC announcement](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [Draft changelog](https://modelcontextprotocol.io/specification/draft/changelog) |
| **Laravel** | **May 26:** framework **`v13.12.0`**—queue worker lost-connection opt-out, scheduler callback type resolution, local disk path/`temporaryUrl` fixes, test helpers, assorted 13.x polish. | monitor / upgrade on app cadence | Pairs with **Livewire** row in `TECH_STACK.md` | [v13.12.0](https://github.com/laravel/framework/releases/tag/v13.12.0) |
| **React** | No new GitHub **release** or **security advisory published** in-window. | hold / monitor | — | [Security advisories](https://github.com/facebook/react/security/advisories) |
| **TypeScript** | No release after **`v6.0.3` (April 16)** verified in-window. | not applicable | — | [Releases](https://github.com/microsoft/TypeScript/releases) |
| **Playwright** | Latest **`playwright-python v1.60.0`** is **May 18** (just before window)—no newer primary release verified **May 20–27**. | hold | — | [playwright-python releases](https://github.com/microsoft/playwright-python/releases) |
| **Livewire / Tailwind / Cypress / Jest / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / @cursor/sdk / Figma / Git** | No additional in-window primary-source items verified beyond rows above (timeboxed). | not applicable / monitor | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Interactions API** legacy schema removal | **2026-06-08** | confirmed | [Breaking changes guide](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Gemini** | **`gemini-2.0-flash`**, **`gemini-2.0-flash-001`**, **`gemini-2.0-flash-lite`**, **`gemini-2.0-flash-lite-001`** shutdown | **2026-06-01** | confirmed | [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Antigravity** | **Gemini CLI** + **Gemini Code Assist IDE extensions** stop serving consumer **Google AI Pro/Ultra** and free individual tiers | **2026-06-18** | confirmed | [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **Antigravity** | **Antigravity SDK** + **Managed Agents** / **Antigravity Agent** preview evolution (I/O narrative) | not fixed | tentative | [I/O developer keynote](https://developers.googleblog.com/en/all-the-news-from-the-google-io-2026-developer-keynote/) |
| **Cursor** | Automation runs **50% off** for newly created automations (per May 20 changelog copy) | **~7 days from May 20** (verify) | tentative | [05-20-26](https://cursor.com/changelog/05-20-26) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (RC locked **May 21**) | **2026-07-28** | confirmed | [RC post](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **Google AI Studio** | Native Kotlin, Workspace integrations, one-click **Cloud Run** deploy, export to **Antigravity** (I/O) | rolling | tentative | [I/O developer keynote](https://developers.googleblog.com/en/all-the-news-from-the-google-io-2026-developer-keynote/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **OpenClaw** | **Hermes** | **`v2026.5.26`** adds **named model login profiles** and **credential migration for Hermes, OpenCode, and Codex** auth profiles. | If Tyler experiments with **Hermes** alongside **OpenClaw**, this is the first in-window bridge for unified auth posture across gateways. | [v2026.5.26](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.26) |
| **Gemini** | **OpenClaw** | **May 25** preview shutdown + **June 1** `gemini-2.0-*` shutdown approach while OpenClaw ships multi-provider reliability fixes and documents **Gemini CLI/Antigravity** media paths. | Model-ID drift in **OpenClaw** Python/Gemini routes should be reconciled against the deprecations table before **June 1**. | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) · [OpenClaw v2026.5.22 docs note](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.22) |
| **Cursor** | **MCP** | **May 21** MCP **`2026-07-28` RC** stateless HTTP redesign vs Cursor’s MCP-heavy agent surface (prior **3.4** MCP OAuth fixes are pre-window but still relevant). | AgentOS and commodity projects using **Cursor + MCP** should track the RC—sticky session assumptions may not survive **July 28**. | [MCP RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) · [Cursor changelog](https://cursor.com/changelog) |
| **Cursor** | **OpenClaw** | Cursor **`/loop`** (local) + **Shared canvases** vs OpenClaw **cron** + **transcript** core in **`v2026.5.26`**—different products, same *ops* class (ambient/scheduled agent work + shareable outputs). | Helps decide where background agent duties and team-visible artifacts should live per project. | [Cursor changelog](https://cursor.com/changelog) · [OpenClaw v2026.5.26](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.26) |
| **Antigravity** | **Gemini** | Consumer **Gemini CLI** sunset **June 18** pushes terminal workflows to **Antigravity CLI** sharing the **Antigravity 2.0** agent harness (May 19 blog). | **OpenClaw** portfolio notes **Google Workspace CLI** and **Antigravity** orchestration—confirm which CLI/harness Tyler’s scripts target before June. | [CLI transition](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Refresh portfolio shorthand (`Gemini 3.1 Pro`, `2.5 Flash`, etc.) against live IDs—**`gemini-3.1-flash-lite-preview` shut down May 25**; **`gemini-2.0-flash*` shuts down June 1** per [deprecations](https://ai.google.dev/gemini-api/docs/deprecations).  
- **Antigravity:** Document the **three-surface** split (**Antigravity 2.0** agent platform, **Antigravity IDE**, **Antigravity CLI**) and **June 18, 2026** Gemini CLI consumer cutoff so digests don’t treat “Antigravity” as IDE-only.  
- **MCP:** Add a one-line note that **`2026-07-28` RC** (locked **May 21**) is a breaking, stateless revision—relevant to **Cursor** and agent gateways.  
- **OpenClaw:** If Tyler pins gateway versions, note **`v2026.5.26`** **Hermes auth-profile migration** in the OpenClaw project subsection.  
- **Hermes:** Still accurate that latest release is **`v2026.5.16` (May 16)**—no May 20–27 release to document.

## Searches & sources consulted

- Fetched: [`https://cursor.com/changelog`](https://cursor.com/changelog), [`https://cursor.com/changelog/05-20-26`](https://cursor.com/changelog/05-20-26), [`https://cursor.com/docs/agent/tools/canvas`](https://cursor.com/docs/agent/tools/canvas)  
- Fetched: [`https://ai.google.dev/gemini-api/docs/changelog`](https://ai.google.dev/gemini-api/docs/changelog), [`https://ai.google.dev/gemini-api/docs/deprecations`](https://ai.google.dev/gemini-api/docs/deprecations)  
- Fetched: [`https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/`](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)  
- Fetched: [`https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/`](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/), [`https://developers.googleblog.com/en/all-the-news-from-the-google-io-2026-developer-keynote/`](https://developers.googleblog.com/en/all-the-news-from-the-google-io-2026-developer-keynote/)  
- GitHub API: `repos/openclaw/OpenClaw/releases` (tags **`v2026.5.26`**, **`v2026.5.22`**), `repos/NousResearch/hermes-agent/releases`, `repos/laravel/framework/releases/tag/v13.12.0`, `repos/facebook/react/security-advisories`, `repos/microsoft/TypeScript/releases`, `repos/microsoft/playwright-python/releases`  
- Context (pre-window but roadmap): [`interactions-breaking-changes-may-2026`](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) (fetch partial/timeout; dates corroborated via changelog **May 6** entry)  
- Prior digest for de-duplication: [`docs/research/tech-stack-updates-2026-05-22.md`](tech-stack-updates-2026-05-22.md) (May 19 Gemini/Antigravity/Cursor automations narrative)
