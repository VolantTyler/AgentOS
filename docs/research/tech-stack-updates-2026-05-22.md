# Tech stack updates — 2026-05-22 (America/New_York)

- **Window:** **2026-05-15 00:00** America/New_York (EDT, UTC−04:00) → **2026-05-22 23:59** America/New_York — i.e. **2026-05-15 04:00 UTC** through **2026-05-23 03:59 UTC** *(inclusive run anchored on digest date; vendors dated **May 15–22** ET treated as in-scope)*  
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini (core):** **May 19** changelog ships **`gemini-3.5-flash` GA**, **Managed Agents** (public preview, Google-hosted sandboxes), and an **Antigravity Agent** preview model **`antigravity-preview-05-2026`** with official docs—this is the week’s highest-impact **API + agent-runtime** expansion; plan model-ID and billing reviews before routing production traffic.  
- **Antigravity (core):** Official Gemini API surface now includes a named **Antigravity Agent** path (preview)—aligns the **IDE product** with a **documented API/agent** story; still **monitor** pricing, quotas, and preview stability.  
- **Cursor (core):** **May 18** [**Composer 2.5**](https://cursor.com/changelog/composer-2-5), **May 19** [**Jira**](https://cursor.com/changelog/05-19-26) integration, and **May 20** [**Cursor 3.5**](https://cursor.com/changelog/05-20-26) (**Automations** in the Agents Window, multi-repo + **no-repo** automations, time-limited **50% off** new automation runs)—**monitor/upgrade** if you run cloud agents or org-wide automations.  
- **Hermes (core):** **v0.14.0 / `v2026.5.16` (May 16)** is a very large “Foundation” release—**PyPI install**, debounced/lazy heavy deps, **security hardening** (sudo bypass closes, tool-error sanitization), **Teams** end-to-end, **OAuth → OpenAI-compatible local proxy**, Windows native **early beta**, and major perf work—**upgrade** if you track Hermes beyond casual experiments; expect breaking-adjacent behavior in approvals/exec paths.  
- **OpenClaw (core):** Stable **`v2026.5.20` (May 21)** plus **`v2026.5.18`–`v2026.5.19`** in the same span—policy/exec approval tightening, Discord/voice improvements, **Codex** harness bump, symlink **fail-closed** for several channel token paths, doctor warnings for plaintext secrets—**monitor → upgrade** on your release cadence.  
- **React (non-core):** No **new** React GitHub Security Advisory **published** after **2026-05-06** was returned from the advisories listing in this pass—**hold/monitor** on RSC patch posture if you ship App Router surfaces.  

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Cursor** | No dedicated CVE-style bulletin surfaced in-window; **3.5** + automations expand cloud/agent attack surface (new integrations, templates). | monitor / tighten org policy | [3.5 / Automations](https://cursor.com/changelog/05-20-26) |
| **Gemini** | **Managed Agents** + **Antigravity Agent** preview imply **sandbox isolation** as the trust boundary—verify org policies before enabling for sensitive repos/data. | monitor / pilot | [Gemini API changelog (May 19)](https://ai.google.dev/gemini-api/docs/changelog) · [Agents overview](https://ai.google.dev/gemini-api/docs/agents) |
| **Hermes** | **v2026.5.16** highlights include **sudo brute-force block**, dangerous-command bypass closes, **tool-error sanitization** before re-injection, supply-chain advisory scanning on install, symlink-related hardening themes in release notes. | upgrade (if deployed) | [Release v2026.5.16](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16) |
| **OpenClaw** | **`tryReadSecretFileSync`** **fail-closed** for symlinked credential files (Telegram, LINE, Zalo, IRC, Nextcloud Talk); **exec approval** path removes unsafe skill-loader compatibility; **doctor** warns on plaintext secret-bearing config. | upgrade | [Release v2026.5.20](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.20) |
| **Antigravity** | Security posture for the **API “Antigravity Agent”** is “isolated Google-hosted Linux sandbox” per changelog—treat as **preview** with normal third-party integration review. | monitor | [Antigravity Agent guide](https://ai.google.dev/gemini-api/docs/antigravity-agent) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|---------|--------|------|
| **React (RSC)** | Latest advisory in GitHub listing remains **2026-05-06** (GHSA-rv78…) for this environment’s API slice—**outside** the May 15+ window but still relevant if unpatched. | monitor | [GHSA-rv78-f8rc-xrxh](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) |
| **TypeScript / Laravel / Livewire / Tailwind / Cypress / Playwright / Jest / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / 1Password** | No in-window **primary-source** security items verified for this run (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|------------------------------|------|
| **Cursor** | **May 18:** **Composer 2.5** (pricing tiers on changelog; “double usage” promo first week). **May 19:** **Jira** cloud agent integration (`@Cursor`). **May 20:** **3.5**—Automations in **Agents Window**, multi-repo + no-repo automations, marketplace templates. | monitor → upgrade when org-ready | Automations echo **OpenClaw** cron/agent patterns; Jira + prior **Teams** integrations push “ticket → agent → PR” orchestration | [Composer 2.5](https://cursor.com/changelog/composer-2-5) · [Jira](https://cursor.com/changelog/05-19-26) · [3.5](https://cursor.com/changelog/05-20-26) |
| **Gemini** | **May 19:** **`gemini-3.5-flash` GA**; **Managed Agents** public preview; **`antigravity-preview-05-2026`** Antigravity Agent preview. | monitor / staged rollout | Strong **Gemini ↔ Antigravity** linkage on official docs; **Managed Agents** overlaps **Cursor**/OpenClaw “hands-off agent job” posture | [Changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Gemini 3.5 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash) · [Managed Agents quickstart](https://ai.google.dev/gemini-api/docs/managed-agents-quickstart) |
| **Hermes** | **May 16:** **v0.14.0**—PyPI packaging, lazy installs, OpenAI-compatible **proxy** for OAuth providers, **Microsoft Teams** stack, `x_search`, LINE + SimpleX, `/handoff`, LSP diagnostics on writes, native Windows beta, large perf wave, many P0/P1 closures per release notes. | upgrade (exploratory → pinned) | **Teams** parallels **Cursor** Teams/Jira “work surface” integrations; proxy path pairs with **Cursor**/IDE tools that speak OpenAI-compatible APIs | [v2026.5.16](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16) |
| **OpenClaw** | **May 18:** **`v2026.5.18`** stable line. **May 19–20:** **`v2026.5.19`** + betas. **May 21:** **`v2026.5.20`**—exec approval tightening, voice/Discord upgrades, Codex **`0.132.0`**, Policy plugin, xAI device-code OAuth, symlink fail-closed for tokens, doctor plaintext-secret warnings, many reliability fixes. | monitor / upgrade | **xAI OAuth** + **Codex** bumps track adjacent “multi-provider agent” stacks in **Hermes**/OpenClaw | [Releases](https://github.com/openclaw/OpenClaw/releases) · [v2026.5.20](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.20) |
| **Antigravity** | **API:** Antigravity Agent **`antigravity-preview-05-2026`** announced **May 19** alongside Managed Agents. **IDE:** no separate IDE-only release page fetched in-window beyond the shared **Google Developers Blog** narrative. | monitor | Same week ties **Antigravity** branding to **Gemini API** previews—useful if Tyler routes OpenClaw/Hermes workloads through Gemini-hosted agents | [Antigravity Agent](https://ai.google.dev/gemini-api/docs/antigravity-agent) · [Model card](https://ai.google.dev/gemini-api/docs/models/antigravity-preview-05-2026) · [Platform blog (context)](https://developers.googleblog.com/en/build-with-google-antigravity-our-new-agentic-development-platform/) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|------------------------------|------|
| **React** | No new GitHub advisory **published** in-window per API slice checked. | monitor | Ecosystem may still be digesting early-May RSC advisories | [Security advisories](https://github.com/facebook/react/security/advisories) |
| **Laravel** | **May 19:** framework **`v13.10.0`** (validation/queue test fixes) and **`v13.11.0`** (“Dedicated Cloud Queue”). | monitor / upgrade on app cadence | Pairs with **Livewire** stack in `TECH_STACK.md`; cloud-queue work is infra-adjacent for Tyler’s W2-era Laravel apps | [v13.10.0](https://github.com/laravel/framework/releases/tag/v13.10.0) · [v13.11.0](https://github.com/laravel/framework/releases/tag/v13.11.0) |
| **Playwright** | **May 18:** **`playwright-python` v1.60.0** — HAR-on-tracing, `locator.drop()`, ARIA snapshot `boxes`, soft assertions, `timedelta` timeouts. | monitor / upgrade when E2E suite ready | Aligns with **Cypress/Playwright/Jest** testing row; `boxes` option noted for AI-assisted page inspection | [playwright-python v1.60.0](https://github.com/microsoft/playwright-python/releases/tag/v1.60.0) |
| **Claude Code / Google AI Studio / Python / SQLite / Livewire / Tailwind / …** | No additional in-window primary-source items verified beyond rows above (timeboxed). | not applicable / monitor | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Interactions API** schema migration default | **2026-05-26** default; legacy removed **2026-06-08** | confirmed | [Breaking changes guide](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Gemini** | **`gemini-3.1-flash-lite-preview`** shutdown (from earlier changelog entries; confirm still current in deprecations table) | **2026-05-25** | confirmed | [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Gemini** | **Managed Agents** + **Antigravity Agent** preview evolution | not fixed | tentative | [Agents overview](https://ai.google.dev/gemini-api/docs/agents) |
| **Cursor** | Composer 2.5 “first week” usage promo (per May 18 changelog page) | time-limited | confirmed | [Composer 2.5](https://cursor.com/changelog/composer-2-5) |
| **Cursor** | New automation runs **50% off** “next 7 days” from **May 20** post (per changelog copy—verify in product if billing-sensitive) | short window | tentative | [3.5 changelog](https://cursor.com/changelog/05-20-26) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| — | No additional non-core roadmap rows verified in-window. | — | — | — |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **Antigravity** | Changelog bundles **`gemini-3.5-flash` GA**, **Managed Agents**, and **`antigravity-preview-05-2026`** Antigravity Agent preview with first-class docs. | If **Antigravity** (IDE) and **Gemini** (API) are both “core,” this is the first week where Google’s **public API narrative** explicitly names an **Antigravity Agent**—worth reading before mixing with **OpenClaw** orchestration. | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Cursor** | **OpenClaw** | Cursor **Automations** (3.5) vs OpenClaw **cron** + gateway agents—different products, same *ops* class: scheduled/ambient agent work. | Helps decide where “background agent” responsibilities should live per project. | [05-20-26](https://cursor.com/changelog/05-20-26) · [OpenClaw releases](https://github.com/openclaw/OpenClaw/releases) |
| **Hermes** | **Cursor** | Hermes adds **Microsoft Teams** end-to-end in **v2026.5.16**; Cursor ships **Jira** integration **May 19**. | If Tyler routes work through **issue trackers + chat**, both stacks advanced “agent from work item” patterns the same week—compare access control models. | [Hermes v2026.5.16](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16) · [Jira changelog](https://cursor.com/changelog/05-19-26) |
| **OpenClaw** | **Gemini** | OpenClaw continues multi-provider fixes while Gemini expands **managed** agent sandboxes—useful contrast for **trust boundaries** (self-hosted gateway vs Google-hosted agent). | Informs how much workload belongs in OpenClaw vs Gemini Managed Agents. | [OpenClaw v2026.5.20](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.20) · [Agents overview](https://ai.google.dev/gemini-api/docs/agents) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference table:** Consider refreshing “Gemini 3.1 Pro + Gemma 26b / 2.5 Flash + Gemma e2b” shorthand now that **`gemini-3.5-flash` GA** exists per official changelog—keep portfolio language aligned with **model IDs you actually call**.  
- **Antigravity:** Add a short line that **Antigravity** now has both **IDE** positioning and a **Gemini API “Antigravity Agent” preview** (`antigravity-preview-05-2026`) so future digests don’t treat it as IDE-only.  
- **Hermes:** If Tyler standardizes on **`pip install hermes-agent`**, mirror that in the Hermes Agent project subsection so agents stop assuming “git clone only.”

## Searches & sources consulted

- Fetched: [`https://cursor.com/changelog`](https://cursor.com/changelog), [`https://cursor.com/changelog/05-19-26`](https://cursor.com/changelog/05-19-26), [`https://cursor.com/changelog/05-20-26`](https://cursor.com/changelog/05-20-26), [`https://cursor.com/changelog/composer-2-5`](https://cursor.com/changelog/composer-2-5)  
- Fetched: [`https://ai.google.dev/gemini-api/docs/changelog`](https://ai.google.dev/gemini-api/docs/changelog)  
- Fetched: [`https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16`](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16)  
- Fetched: [`https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.20`](https://github.com/openclaw/OpenClaw/releases/tag/v2026.5.20)  
- Fetched: [`https://github.com/laravel/framework/releases/tag/v13.11.0`](https://github.com/laravel/framework/releases/tag/v13.11.0), [`https://github.com/microsoft/playwright-python/releases/tag/v1.60.0`](https://github.com/microsoft/playwright-python/releases/tag/v1.60.0)  
- GitHub API: `repos/NousResearch/hermes-agent/releases`, `repos/openclaw/OpenClaw/releases`, `repos/facebook/react/security-advisories` (publish dates)  
- Context (not dated in-window): [Antigravity platform blog](https://developers.googleblog.com/en/build-with-google-antigravity-our-new-agentic-development-platform/)
