# Tech stack updates — 2026-07-06 (America/New_York)

- **Window:** **2026-06-29 00:00** America/New_York (EDT, UTC−04:00) → **2026-07-06 23:59** America/New_York — i.e. **2026-06-29 04:00 UTC** through **2026-07-07 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Hermes (core):** **`v0.18.0` / `v2026.7.1` (Jul 1)** — “Judgment Release”: P0/P1 backlog cleared, first-class **Mixture-of-Agents** presets, evidence-based verification + `/goal` completion contracts, `/learn` + `/journey`, background subagent fan-out, **Vertex AI Gemini** OAuth refresh, and a security hardening round. **monitor → upgrade** if exploratory dabbling resumes; compare MoA vs **Cursor 3.9** Customize/MCP posture.
- **OpenClaw (core):** Stable **`2026.6.11` (Jun 30)** — channel delivery reliability wave; beta **`2026.7.1-beta.1`/`.2` (Jul 2 / Jul 5)** adds **GPT-5.6** catalog support, **`openclaw attach`**, Telegram **Codex** pairing/steering, **Cursor Agent** autoreview engine, and macOS local Gateway auto-setup. **monitor → upgrade** stable for production channels; track beta if Codex/GPT-5.6 pins matter.
- **Gemini (core):** **Jun 30** — **`gemini-omni-flash-preview`** (conversational video gen/editing via **Interactions API**); **`gemini-3.1-flash-lite-image`** to **GA**; **Veo 2.0/3.0 shutdown executed** on deadline. **upgrade / migrate** any lingering Veo IDs; **monitor** Omni Flash for agent/media pipelines.
- **Cursor (core):** **Jun 29** — **Cursor for iOS** public beta (cloud agents, Remote Control, Live Activities); **Jun 30** — **Team MCPs** in team marketplaces + org-group marketplace gating; **Jun 29 CLI** — multi-root workspaces, Auto-review classifier, MCP false-disconnect fix. **monitor** Team MCP governance for AgentOS; no IDE semver bump after **3.9** in-window.
- **Codex (core):** **`0.142.5` (Jul 1)** — WebSocket trace-log leakage fix; **`0.143.0-alpha.*` (Jul 2–5)** pre-release train continues. **upgrade** stable pin to **`0.142.5`**; **hold** on alpha unless testing OpenClaw **`2026.7.1-beta`** explicitly.
- **ChatGPT (core):** No new **primary-source** product release notes verified **Jun 29–Jul 6** (prior-window **GPT-5.6 Sol/Terra/Luna** preview remains **Jun 26**). **monitor** broader GPT-5.6 GA (“coming weeks” per OpenAI preview post).

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **Veo 2.0/3.0** model shutdown deadline **2026-06-30** — migrate to **Veo 3.1** preview or GA IDs. | upgrade / migrate | [Gemini API changelog (Jun 30)](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Codex** | **`0.142.5` (Jul 1):** prevented full Responses WebSocket request payloads from being written to trace logs. | upgrade (if deployed) | [0.142.5 release](https://github.com/openai/codex/releases/tag/rust-v0.142.5) |
| **Hermes** | **`v0.18.0` security round:** MCP-config persistence lockdown, cron `base_url` credential-exfil blocks, Slack `xapp-` token redaction, browser cloud-metadata floor, `aiohttp` CVE floor on lazy messaging paths. | monitor → upgrade | [v2026.7.1 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1) |
| **OpenClaw** | **`2026.6.11` / `2026.7.1-beta.*`:** provider/network response bounding, Windows allowlist execution binding, config traversal restrictions, Codex approval-mode rename (`ask`). | monitor (beta) / upgrade (stable) | [v2026.6.11](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11) · [v2026.7.1-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1-beta.2) |
| **Cursor** | **Jun 30 Team MCPs:** admins distribute approved MCP servers across cloud agents, IDE, and CLI — review trust boundaries for AgentOS. | monitor / policy | [Cursor changelog (Jun 30)](https://cursor.com/changelog) |
| **ChatGPT** | No in-window security advisories beyond pre-window **GPT-5.6 preview** safeguards (Jun 26). | monitor | [GPT-5.6 preview](https://openai.com/index/previewing-gpt-5-6-sol/) |
| **Antigravity** | Latest verified IDE release remains **`2.2.1` (Jun 25)** — pre-window. | hold / monitor | [Antigravity changelog](https://antigravity.google/changelog) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Laravel** | **`v13.18.0` (Jun 30):** cache-header fix on HEAD requests, `RateLimited` serialization fix, JSON parsing for top-level zero bodies — no new CVE verified in-window. | monitor / upgrade on app cadence | [v13.18.0](https://github.com/laravel/framework/releases/tag/v13.18.0) |
| **MCP** | Final **`2026-07-28`** spec ships **stateless core**, mandatory **`Mcp-Method`** headers, deprecates Roots/Sampling/Logging — **22 days out** at window end. | monitor / plan migration | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / @cursor/sdk (repo pin)** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **Hermes** | **`v0.18.0` (Jul 1):** MoA as selectable models, live aggregator streaming, verification evidence + `/goal` completion contracts, `/learn` + `/journey`, background delegate fan-out, desktop **Projects**, gateway scale-to-zero/drain, **Vertex AI Gemini** OAuth auto-refresh. | monitor → upgrade | Pairs with **Gemini** stack; MoA competes with **Cursor 3.9** Customize/subagent patterns | [v2026.7.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1) |
| **OpenClaw** | **`2026.6.11` (Jun 30):** channel delivery reliability (Telegram/Discord/WhatsApp/Matrix/iMessage/Google Chat), per-DM model overrides, Mattermost `/oc_queue`. **`2026.7.1-beta.1`/`.2`:** **GPT-5.6** support, `openclaw attach`, Telegram Codex `/login` + steering, **Cursor Agent** autoreview, macOS local Gateway installer, ClawRouter routing plugin. | monitor → upgrade (stable) | Reconcile **Codex `0.142.5`**; **ChatGPT** GPT-5.6 preview path; **Cursor** autoreview engine | [v2026.6.11](https://github.com/openclaw/openclaw/releases/tag/v2026.6.11) · [v2026.7.1-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1-beta.2) |
| **Gemini** | **Jun 30:** **`gemini-omni-flash-preview`** — 720p video gen + conversational editing (up to 3 sequential edits) via **Interactions API**; **`gemini-3.1-flash-lite-image`** to **GA** (Nano Banana Lite). **Veo 2.0/3.0** shutdown executed. | upgrade / migrate | **Antigravity** Interactions API / managed-agent stack; **OpenClaw** hybrid Gemini routing | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Cursor** | **Jun 29:** **Cursor for iOS** beta — cloud agents, Remote Control, Live Activities, mobile SCM. **Jun 30:** Team MCPs + org-group marketplace access. **Jun 29 CLI:** multi-root `--add-dir`, Auto-review classifier for skills/commands, MCP false-disconnect fix, `AGENT_CLI_CREDENTIAL_STORE=file` for sandboxed runs. | monitor | AgentOS **`@cursor/sdk ^1.0.13`** unchanged; Team MCP posture parallels **OpenClaw** plugin governance | [Cursor changelog](https://cursor.com/changelog) · [CLI changelog (Jun 29)](https://cursor.com/docs/cli/changelog) |
| **Codex** | **`0.142.5` (Jul 1):** trace-log WebSocket payload fix. **`0.143.0-alpha.28`–`.36` (Jun 27–Jul 5):** pre-release only — includes additional logging-volume fixes slated for stable **`0.143.0`**. **`0.142.4` (Jun 29):** maintenance-only. | upgrade (stable) / hold (alpha) | **OpenClaw `2026.7.1-beta`** Telegram Codex workflows + GPT-5.6 catalog | [0.142.5](https://github.com/openai/codex/releases/tag/rust-v0.142.5) · [Codex releases](https://github.com/openai/codex/releases) |
| **ChatGPT** | No in-window release-note entries verified on [OpenAI release notes](https://openai.com/products/release-notes/) after **Jun 26** GPT-5.6 preview announcement (pre-window by one day). | monitor | Shared surface with **Codex Remote** (GA pre-window Jun 25) | [Release notes](https://openai.com/products/release-notes/) · [GPT-5.6 preview](https://openai.com/index/previewing-gpt-5-6-sol/) |
| **Antigravity** | No release after **`2.2.1` (Jun 25)** verified. | hold / monitor | **Gemini** Interactions API GA blog cites Antigravity as default managed agent | [Antigravity changelog](https://antigravity.google/changelog) · [Interactions API GA](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **`v13.18.0` (Jun 30)** — debounced-job cache reduction, dev-command priority registration, HEAD cache headers, `Number::forHumans`/`fileSize` INF/NAN guards, `schedule:work` signal handling. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md` | [v13.18.0](https://github.com/laravel/framework/releases/tag/v13.18.0) |
| **@cursor/sdk** | No separate npm tag in-window; AgentOS `package.json` still pins **`^1.0.13`**. | monitor | Same ecosystem as **Cursor** Team MCP + iOS beta train | [Cursor changelog](https://cursor.com/changelog) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire / MCP (spec)** | No additional in-window primary-source **product** releases verified beyond rows above (timeboxed). React versions page lists **v19.2.7** as June 2026 without a day-level changelog entry opened in-window. | not applicable / hold | **MCP `2026-07-28`** final spec **22 days out** | [React versions](https://react.dev/versions) · [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **ChatGPT** | **GPT-5.6 Sol/Terra/Luna** broader availability | “coming weeks” (Jun 26 announcement) | tentative | [GPT-5.6 preview](https://openai.com/index/previewing-gpt-5-6-sol/) |
| **Codex** | **GPT-5.6 Sol on Cerebras** (750 tok/s) | **July 2026** | tentative | [GPT-5.6 preview](https://openai.com/index/previewing-gpt-5-6-sol/) |
| **Codex** | **`0.143.0` stable** (logging-volume fixes in alpha train) | not stated | tentative | [Codex releases](https://github.com/openai/codex/releases) |
| **OpenClaw** | **`2026.7.1`** stable promotion from beta | not stated | tentative | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Gemini** | **Imagen 4 / Gemini 3 Image** model shutdown | **2026-08-17** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT (announced May 28) | **2026-08-26** | confirmed | [Release notes (May 28)](https://openai.com/products/release-notes/) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification — stateless core, **`Mcp-Method`** routing headers, MCP Apps + Tasks extensions, Roots/Sampling/Logging deprecated | **2026-07-28** | confirmed | [MCP RC blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **6.x** maintenance mode; **TypeScript 7** native port (`typescript-go`) | no fixed GA date in-window | tentative | [Maintenance mode issue](https://github.com/microsoft/TypeScript/issues/62963) · [typescript-go](https://github.com/microsoft/typescript-go) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **OpenClaw** | **Codex** + **ChatGPT** | **`2026.7.1-beta`** adds **GPT-5.6** catalog support, Telegram Codex `/login`/steering, and **`openclaw attach`** for external harness resume — while **Codex `0.142.5`** fixes trace-log leakage. | Active OpenClaw deploys should bump **Codex stable** and watch beta if GPT-5.6 preview access lands; align mobile approval posture with pre-window **Codex Remote GA**. | [v2026.7.1-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1-beta.2) · [0.142.5](https://github.com/openai/codex/releases/tag/rust-v0.142.5) |
| **Cursor** | **OpenClaw** + **MCP** | **Jun 30** **Team MCPs** centralize admin-approved MCP distribution; **OpenClaw `2026.7.1-beta`** adds **Cursor Agent** as an autoreview engine and ClawRouter multi-provider routing. | AgentOS plugin/MCP governance and OpenClaw channel ops are converging on explicit allowlists — compare Team MCP config before importing third-party servers across repos. | [Cursor changelog](https://cursor.com/changelog) · [v2026.7.1-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1-beta.2) |
| **Gemini** | **Hermes** + **Antigravity** | **Jun 30** **Omni Flash** + **Interactions API** video editing; **Hermes `v0.18.0`** adds **Vertex AI Gemini** OAuth auto-refresh; Google’s **Interactions API GA** blog ships **Antigravity** as default managed agent. | Google stack now spans API-level Omni Flash, Hermes Vertex routing, and Antigravity managed agents — pick one computer-use / video path and align HITL policy across **OpenClaw** orchestration. | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Hermes v2026.7.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1) · [Interactions API GA](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/) |
| **Hermes** | **Cursor** | **Hermes `v0.18.0`** MoA presets + verification contracts vs **Cursor 3.9** Customize page + **Jun 29 iOS** cloud-agent Remote Control. | If revisiting exploratory Hermes work, MoA and evidence-based `/goal` contracts are now first-class — compare against Cursor’s Team MCP + mobile agent surface before investing further. | [Hermes v2026.7.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1) · [Cursor changelog](https://cursor.com/changelog) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Confirm no lingering **Veo 2.0/3.0** model IDs after **2026-06-30** shutdown; note **`gemini-omni-flash-preview`** and **`gemini-3.1-flash-lite-image` GA** as new options.
- **`docs/TECH_STACK.md` → Hermes:** Update status from “exploratory / early dabbling” — **`v0.18.0` (Jul 1)** is a major capability jump (MoA, verification, Vertex Gemini).
- **`docs/TECH_STACK.md` → OpenClaw:** Note stable **`2026.6.11`** and beta **`2026.7.1`** GPT-5.6 / Codex Telegram integration when Tyler next edits project notes.
- **`docs/TECH_STACK.md` → Antigravity:** Latest verified IDE version remains **`2.2.1` (2026-06-25)** — no in-window bump.
- **`package.json` → `@cursor/sdk`:** Pin **`^1.0.13`** lags **Cursor Team MCP + iOS beta** surface — note intended SDK upgrade thread when scheduled automation needs new APIs.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`, `package.json`
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) — Jun 30 Omni Flash, flash-lite-image GA, Veo shutdown
- [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations)
- [Google Interactions API GA blog](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/)
- [Codex releases](https://github.com/openai/codex/releases) — **0.142.5**, **0.143.0-alpha.***
- [OpenAI release notes](https://openai.com/products/release-notes/) · [GPT-5.6 preview](https://openai.com/index/previewing-gpt-5-6-sol/)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) — **v2026.6.11**, **v2026.7.1-beta.1**, **v2026.7.1-beta.2**
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases) — **v2026.7.1**
- [Cursor changelog](https://cursor.com/changelog) — Jun 29 iOS, Jun 30 Team MCPs
- [Cursor CLI changelog](https://cursor.com/docs/cli/changelog) — Jun 29 release
- [Antigravity changelog](https://antigravity.google/changelog) — latest **2.2.1** (Jun 25, pre-window)
- [Laravel v13.18.0](https://github.com/laravel/framework/releases/tag/v13.18.0)
- [MCP 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
- [React versions](https://react.dev/versions)
- Prior digest: `docs/research/tech-stack-updates-2026-06-29.md`
