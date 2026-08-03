# Tech stack updates — 2026-08-03 (America/New_York)

- **Window:** **2026-07-27 00:00** America/New_York (EDT, UTC−04:00) → **2026-08-03 23:59** America/New_York — i.e. **2026-07-27 04:00 UTC** through **2026-08-04 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **OpenClaw (core):** **`2026.7.2-beta.5` (Jul 28)** through **`2026.7.2-beta.7` (Aug 2)** — major beta train: interactive **MCP Apps**, session rewind/**Codex session fork**, SQLite quarantine/recovery, channel delivery hardening, memory imports from **Codex/Hermes/Claude Code**, and broad security fixes. **monitor → upgrade** when stable **`2026.7.2`** promotes; stay on **`2026.7.1`** until then unless testing beta.
- **Hermes (core):** **`v0.20.0` (Aug 3)** “Herald Release” plus **`v0.19.1` (Jul 30)** patch — conversational voice, **A2A v1.0**, outbound webhooks, desktop plugin SDK, **`hermes import-agent`** for **Codex/Claude Code** migrations. Exploratory in `TECH_STACK.md` — **monitor** unless actively deploying.
- **Codex (core):** **`0.146.0` (Jul 29)** stable — Agent Plugins, thread fork/pin, **MCP `2026-07-28` feature flag**, proxy-aware HTTP across auth/MCP/plugins; **`0.147.0-alpha.*` (Jul 29–31)** continues train. **monitor → upgrade** on **OpenClaw** pin alignment.
- **Gemini + Antigravity (core):** **Jul 28** — Managed Agents default **`antigravity-preview-05-2026`** to **Gemini 3.6 Flash**; environment hooks, free tier, **`max_total_tokens`** budgets. **Antigravity `2.4.3` (Jul 28)** adds **MCP connection/tool timeouts**, preview tabs, `.json`/`.md`/`.csv` attachments. **monitor** hybrid routing and HITL allowlists.
- **Cursor (core):** **Jul 29** — Cursor for **iPad** (paid plans): inbox, full PR review, Apple Pencil markup, Bitbucket/Azure DevOps SCM. **`@cursor/sdk` `1.0.26` (Jul 28)** landed (AgentOS still pins **`^1.0.13`**). **monitor**.
- **ChatGPT (core):** **Jul 29** — Sign in with ChatGPT beta (GitLab, Notion, Supabase, **Vercel**, etc.); **Jul 30** Enterprise Work/**Codex** admin controls. **monitor** for plugin/OAuth surface; no new consumer model-default shift verified in-window.
- **MCP (non-core, cross-cutting):** **`2026-07-28` spec GA (Jul 28)** — stateless core, MRTR, header routing, 12-month deprecation window. Touches **Cursor**, **Codex**, **Antigravity**, **OpenClaw** MCP Apps train — plan migration, do not rush production servers.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **OpenClaw** | **`2026.7.2-beta.*`:** security/authorization fixes (channel allowlist owner bypass, forged-marker/web-search bypass, session export workspace boundary, secret redaction, install-script validation); SQLite quarantine and crash-recoverable snapshots. | monitor → upgrade (stable) | [v2026.7.2-beta.7](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.7) |
| **Codex** | **`0.146.0` (Jul 29):** proxy honor across auth, MCP authorization, plugin downloads, remote execution; Windows sandbox process-tree termination; enterprise in-app update controls. | monitor → upgrade (on pin) | [rust-v0.146.0](https://github.com/openai/codex/releases/tag/rust-v0.146.0) |
| **Antigravity** | **`2.4.3` (Jul 28):** MCP server connection/tool-call **timeouts** (prevents indefinite agent hangs); fix duplicate MCP tool names breaking agent init; quoted-argument terminal permission parsing fix. | upgrade (if on 2.3.x) | [Antigravity changelog](https://antigravity.google/changelog) |
| **Gemini** | **Jul 28:** Managed Agent **environment hooks** (`pre_tool_execution` / `post_tool_execution`) for block/lint/audit of sandbox tool calls; **`max_total_tokens`** budget cap. No new in-window CVE verified. | monitor | [Managed Agents blog (Jul 28)](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api-3-6-flash-hooks/) |
| **Hermes** | **`v0.20.0` (Aug 3):** signed outbound webhooks (HMAC); no separate security advisory verified in-window. Large surface area — treat as **monitor** until reviewed. | monitor | [v0.20.0](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.3) |
| **ChatGPT** | **Jul 29:** Sign in with ChatGPT beta shares name/email/profile picture with partners — review plugin OAuth scopes. **Jul 30** Enterprise: Work Local/Cloud split admin controls. | monitor / policy | [Release notes (Jul 29)](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **Cursor** | No in-window CVE verified. **Jul 29** mobile PR review expands merge surface from iPad/iPhone — review team SCM permissions. | monitor / policy | [Cursor changelog (Jul 29)](https://cursor.com/changelog) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **Laravel** | **`v13.23.0` (Jul 27):** timing-safe comparison for maintenance-mode bypass secret (`v13.23.0`). | monitor / upgrade on app cadence | [v13.23.0](https://github.com/laravel/framework/releases/tag/v13.23.0) |
| **MCP** | **`2026-07-28` (Jul 28):** auth hardening (RFC 9207 `iss` validation, CIMD over DCR); Roots/Sampling/Logging deprecated with **12-month** minimum removal window. | monitor / plan migration | [MCP 2026-07-28 blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/) |
| **React / TypeScript / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Livewire / Figma / Git** | No additional in-window **primary-source** security advisories verified (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **OpenClaw** | **`2026.7.2-beta.5` (Jul 28) → `beta.7` (Aug 2):** MCP Apps host + dashboards, session rewind/**fork upstream Codex sessions**, Wear OS companion, meeting plugins (Teams/Zoom/Meet), memory imports from **Codex/Hermes/Claude Code**, local llama.cpp/Gemma path, Automations rename (from `cron`). | monitor → upgrade (stable) | Reconcile **Codex `0.146.0+`**; **MCP `2026-07-28`** Apps align with **Antigravity** MCP timeout work | [v2026.7.2-beta.7](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.7) |
| **Hermes** | **`v0.19.1` (Jul 30):** infrastructure patch tag. **`v0.20.0` (Aug 3):** streaming voice + barge-in, **A2A v1.0**, outbound webhooks, desktop artifacts/plugin SDK, **`hermes import-agent`** (Claude Code/Codex CLI), grounded-citations skill, tool self-recovery (iter limit 90→500). | monitor (exploratory) | **`hermes import-agent`** overlaps **OpenClaw** memory-import path; **Codex** CLI migration surface | [v0.20.0](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.3) · [v0.19.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.30) |
| **Codex** | **`0.146.0` (Jul 29):** `/new`/`/clear` session naming, pin threads, Agent Plugins + Bedrock/Claude Code marketplaces, thread fork with paginated history, remote Code Mode WebSocket, **MCP `2026-07-28` feature flag** (#34747), OpenAI-hosted release artifacts (R2). **`0.147.0-alpha.1`–`alpha.4` (Jul 29–31):** alpha train continues. | monitor → upgrade (on pin) | **OpenClaw** Codex fork + auth-profile pins; **ChatGPT** Sign-in beta for partner plugins | [rust-v0.146.0](https://github.com/openai/codex/releases/tag/rust-v0.146.0) · [releases](https://github.com/openai/codex/releases) |
| **Gemini** | **Jul 28 (blog):** Managed Agents default **`antigravity-preview-05-2026`** → **Gemini 3.6 Flash**; hooks, free tier, **`max_total_tokens`**, scheduled triggers, Environments API. *(Official API changelog last entry **Jul 21** — pre-window; Jul 28 product news via Google blog.)* | monitor | **OpenClaw** hybrid Gemini/Gemma routing; **Antigravity** IDE + Interactions API agent | [Managed Agents (Jul 28)](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api-3-6-flash-hooks/) · [API changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Antigravity** | **`2.4.3` (Jul 28):** preview tabs, MCP timeouts, `.json`/`.md`/`.csv` attachments, Cmd+L quote shortcut, duplicate MCP tool-name init fix, Windows queued-message ordering fix. | monitor → upgrade | Pairs with **Gemini** Managed Agent hooks; **OpenClaw** orchestration IDE path | [Antigravity changelog](https://antigravity.google/changelog) |
| **Cursor** | **Jul 29:** Cursor for **iPad** on all paid plans — inbox, full PR review (comments/checks/approvals), sidebar multi-agent, split-screen review, Apple Pencil markup; Bitbucket + Azure DevOps SCM; multi-PR sessions. **Jul 28:** Cursor Start (₹649/mo, India-only). | monitor | AgentOS **`@cursor/sdk`** ecosystem; mobile PR workflow adjacent to **OpenClaw** HITL patterns | [Cursor changelog](https://cursor.com/changelog) |
| **ChatGPT** | **Jul 29:** ChatGPT for Academic Researchers (12-mo team workspace program); **Sign in with ChatGPT (beta)** on select plugins/partners (GitLab, Notion, Supabase, Vercel, etc.). **Jul 30 (Enterprise/Edu):** independent Work Local/Cloud admin controls, Fast Mode defaults, redesigned Roles page. | monitor | Partner sign-in reduces friction for **Codex**-adjacent plugin flows | [Release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [Enterprise (Jul 30)](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **MCP** | **`2026-07-28` spec GA (Jul 28):** stateless core (no `initialize`/`Mcp-Session-Id`), MRTR, `Mcp-Method`/`Mcp-Name` header routing, cacheable list results, Tasks extension, 12-month deprecation policy. Tier-1 SDKs updated same day. | monitor / plan migration | **Codex `0.146.0`** registers feature flag; **Cursor**/**Antigravity**/**OpenClaw** MCP servers need migration planning | [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/) |
| **@cursor/sdk** | **`1.0.25` / `1.0.26` (Jul 28)** on npm; AgentOS `package.json` still **`^1.0.13`**. Cursor Router (Jul 22, pre-window) available across desktop/web/iOS/CLI/SDK per Jul 22 changelog. | monitor | Evaluate pin when scheduled AgentOS scripts need Router/stream types | [npm @cursor/sdk](https://www.npmjs.com/package/@cursor/sdk) |
| **Laravel** | **`v13.23.0` (Jul 27):** monthly log driver/channel, SES v2 tenant support, PostgreSQL `->using(...)` in `->change()` migrations, timing-safe maintenance bypass, Image class type improvements. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md` | [v13.23.0](https://github.com/laravel/framework/releases/tag/v13.23.0) |
| **TypeScript (@types/react)** | **`@types/react` `19.2.18` (Jul 30)** — DefinitelyTyped publish; no Microsoft TypeScript compiler release verified in-window. | not applicable / hold | Adjacent to **React** baseline in `TECH_STACK.md` | [npm @types/react](https://www.npmjs.com/package/@types/react) |
| **React / Tailwind / Cypress / Playwright / Jest / PHPUnit / GraphQL / PostgreSQL / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Figma / Git / Livewire** | No additional in-window primary-source releases verified beyond rows above (timeboxed). React **`19.2.8` (Jul 21)** is pre-window. | not applicable / hold | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Imagen 4 / Gemini 3 Image** model shutdown (announced Jun 15) | **2026-08-17** | confirmed | [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/changelog) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT (announced May 28) | **2026-08-26** | confirmed | [Release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **ChatGPT** | **Atlas** browser scheduled stop (announced Jul 8) | **2026-08-09** | confirmed | [Release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **OpenClaw** | **`2026.7.2`** stable promotion from beta train | not stated | tentative | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Codex** | **`0.147.0`** stable from alpha train | not stated | tentative | [Codex releases](https://github.com/openai/codex/releases) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Deprecated capabilities (Roots, Sampling, Logging, HTTP+SSE transport) — minimum **12-month** removal window from Jul 28 GA | **≥ 2027-07-28** | confirmed | [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/) |
| **PostgreSQL** | **PostgreSQL 19** GA after beta cycle | **~Sep/Oct 2026** (beta schedule) | tentative | [PostgreSQL 19 Beta 1](https://www.postgresql.org/about/news/postgresql-19-beta-1-released-3313/) |
| **Gemini (models)** | **Gemini 3.6 Flash** / **3.5 Flash-Lite** GA (announced Jul 21) — already shipping; **`temperature`/`top_p`/`top_k` deprecated** on latest models | active now | confirmed | [API changelog (Jul 21)](https://ai.google.dev/gemini-api/docs/changelog) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **OpenClaw** | **Codex** | **`2026.7.2-beta.*`:** fork upstream **Codex sessions**, preserve Codex-bound history across restarts, remove rejected Codex OAuth realtime fallback (Platform API key required). **Codex `0.146.0` (Jul 29)** ships MCP **`2026-07-28`** feature flag + plugin marketplaces. | WoW auction analytics should align OpenClaw beta/stable with Codex **`0.146.0+`** before adopting session-fork or MCP Apps — auth-profile and OAuth paths changed mid-train. | [OpenClaw beta.7](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.7) · [Codex 0.146.0](https://github.com/openai/codex/releases/tag/rust-v0.146.0) |
| **Gemini** | **Antigravity** | **Jul 28:** Managed Agents default **`antigravity-preview-05-2026`** to **Gemini 3.6 Flash**; sandbox **environment hooks** mirror HITL patterns. **Antigravity `2.4.3` (Jul 28)** adds MCP timeouts + richer attachments. | OpenClaw orchestration via **Antigravity** gains safer MCP behavior and a managed-agent alternative on Gemini API — compare gateway allowlists vs hooks/`max_total_tokens`. | [Managed Agents blog](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api-3-6-flash-hooks/) · [Antigravity changelog](https://antigravity.google/changelog) |
| **Hermes** | **Codex** | **`v0.20.0` (Aug 3):** **`hermes import-agent`** migrates **Codex CLI** (and Claude Code) setups; **A2A v1.0** for cross-agent wire protocol. **OpenClaw `2026.7.2`** also imports memory from Codex/Hermes. | Three overlapping agent frameworks this week — pick one import/migration path (Hermes CLI vs OpenClaw memory import) before duplicating auth profiles. | [Hermes v0.20.0](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.3) · [OpenClaw beta.7](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.7) |
| **MCP** | **Cursor / Codex / OpenClaw** | **Jul 28:** MCP **`2026-07-28`** GA (stateless core). **Codex `0.146.0`** registers support; **OpenClaw** ships interactive **MCP Apps** + ticketed host; **Antigravity `2.4.3`** adds MCP timeouts. | AgentOS and Tyler’s agent projects hit a protocol inflection — plan SDK/server migration before stateless transport becomes mandatory; 12-month overlap for **`2025-11-25`**. | [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/) · [Codex 0.146.0](https://github.com/openai/codex/releases/tag/rust-v0.146.0) |
| **ChatGPT** | **Codex** | **Jul 29:** Sign in with ChatGPT beta on partner sites; **Jul 30** Enterprise Work/**Codex** admin split (Local vs Cloud). | Single OAuth surface expanding to plugins — review scopes if commodity/OpenClaw workflows add ChatGPT-connected integrations. | [ChatGPT release notes (Jul 29)](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [Enterprise (Jul 30)](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes) |

## Doc maintenance suggestions

- **Models table (`TECH_STACK.md`):** Portfolio lists **Gemini 3.1 Pro**, **Gemma 26b**, **Gemini 2.5 Flash**, **Gemma e2b** — official stack now centers **Gemini 3.6 Flash** (GA Jul 21) and **3.5 Flash-Lite** as Managed Agent defaults (Jul 28 blog). Refresh tier names after confirming Tyler’s live subscription/API usage.
- **Core stack mapping:** Consider noting **MCP `2026-07-28`** as a cross-cutting concern under **Cursor**, **Antigravity**, **OpenClaw**, and **Codex** (not a separate core row unless Tyler wants weekly MCP-first monitoring).
- **Hermes status:** Still “exploratory” — **`v0.20.0`** is a step-change (voice, A2A, desktop SDK). If dabbling continues, bump comfort/context line or add “watch **`hermes import-agent`** vs OpenClaw memory import” note.
- **AgentOS `@cursor/sdk` pin:** Document current npm **`1.0.26`** (Jul 28) vs repo **`^1.0.13`** — evaluate bump when scheduled scripts need Jul 28 SDK fixes.
- **Deprecation calendar:** Add reminder rows for **Imagen 4 shutdown (Aug 17)**, **Atlas stop (Aug 9)**, **o3 ChatGPT retirement (Aug 26)** — all sourced from official changelogs this window or prior digests.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`, `docs/research/tech-stack-updates-2026-07-20.md` (prior digest format)
- [Cursor changelog](https://cursor.com/changelog) — Jul 28–29 entries
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) — through Jul 21 (pre-window last entry); [Managed Agents blog Jul 28](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api-3-6-flash-hooks/)
- [Antigravity changelog](https://antigravity.google/changelog) — **2.4.3** Jul 28
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases) — **2026.7.2-beta.5**–**beta.7**
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases) — **v0.19.1**, **v0.20.0**
- [Codex GitHub releases](https://github.com/openai/codex/releases) — **0.146.0**, **0.147.0-alpha.***
- [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) — Jul 29
- [ChatGPT Enterprise release notes](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes) — Jul 30
- [MCP 2026-07-28 blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- [Laravel v13.23.0](https://github.com/laravel/framework/releases/tag/v13.23.0)
- [npm @cursor/sdk](https://www.npmjs.com/package/@cursor/sdk) — **1.0.26** Jul 28
- [npm @types/react](https://www.npmjs.com/package/@types/react) — **19.2.18** Jul 30
- Web search spot-checks: React releases (pre-window **19.2.8** Jul 21), MCP ecosystem posts
- **Not fetched (timeout/unavailable):** [Codex changelog](https://developers.openai.com/codex/changelog) — used GitHub **0.146.0** release body instead
