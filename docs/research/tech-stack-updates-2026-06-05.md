# Tech stack updates — 2026-06-05 (America/New_York)

- **Window:** **2026-05-29 00:00** America/New_York (EDT, UTC−04:00) → **2026-06-05 23:59** America/New_York — i.e. **2026-05-29 04:00 UTC** through **2026-06-06 03:59 UTC**
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini (core):** **June 1** official changelog confirms **`gemini-2.0-flash*`** and **`gemini-2.0-flash-lite*`** are **shut down** — migrate to **`gemini-3.5-flash`** or **`gemini-3.1-flash-lite`** before any OpenClaw/Gemini routes still pin 2.0 IDs; **Interactions API** legacy schema removal is **June 8** (3 days out). **monitor → upgrade/migrate** on model IDs and Interactions clients.
- **OpenClaw (core):** **`2026.6.1` / `2026.6.2` (June 1–3)** — Skill Workshop + Workboard orchestration, **operator install policy** replacing dangerous-code scanner enforcement, broad **Codex app-server** reliability (streaming partials, auth-profile separation, Skill Workshop prompts), and channel/gateway security hardening — **monitor → upgrade** on your OpenClaw cadence; read security rows before enabling new plugin/skill install paths.
- **Cursor (core):** **May 29** **3.6 Auto-review** (classifier subagent for Shell/MCP/Fetch), **June 3** **Enterprise Organizations** (multi-team governance), **June 4** **3.7** canvas **Design Mode** + **context usage report** — **monitor** for AgentOS agent-approval posture; Auto-review parallels **Codex** auto-review patterns in the same week.
- **Codex (core):** **June 1–4** — **Amazon Bedrock** provider, **Sites** preview (hosted web apps), **CLI `0.136.0` / `0.137.0`**, enterprise **cloud-managed config bundles** + monthly credit limits — **monitor**; **OpenClaw `2026.6.x`** explicitly deepens Codex integration if Tyler pins versions there.
- **Hermes (core):** **`v0.15.1` / `v0.15.2` (May 29)** hotfix the **v0.15.0** dashboard 401 reload loop and Docker **`--insecure`** opt-in — **upgrade** if on **v0.15.0**; **v0.15.0 Velocity** (May 28) is adjacent but out of window.
- **ChatGPT (core):** **June 4** rolling **memory** refresh + **Lockdown Mode** for all logged-in users; **June 2** **Active sessions** security UI — **monitor** for household/work chat surfaces that share OpenAI accounts with **Codex**.
- **Antigravity (core):** **`2.0.11` (June 3)** startup/Open IDE fixes; **June 18** **Gemini CLI → Antigravity CLI** consumer cutoff remains the main migration deadline — **monitor/plan**.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Gemini** | **`gemini-2.0-flash`**, **`gemini-2.0-flash-001`**, **`gemini-2.0-flash-lite`**, **`gemini-2.0-flash-lite-001`** **shut down June 1** — calls to retired IDs fail. **Interactions API** legacy `outputs` schema removed **June 8**. | upgrade / migrate | [Changelog (Jun 1)](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [Interactions migration](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **OpenClaw** | **`2026.6.2`**: **operator install policy** replaces dangerous-code scanner path for plugin/skill installs; rejects corrupt shell snapshots, suspicious gateway startup configs, unsafe exec precheck env; Telegram admin writeback + approval allowlist fixes. | upgrade (if deployed) / policy | [Releases](https://github.com/openclaw/openclaw/releases) |
| **ChatGPT** | **June 4:** **Lockdown Mode** GA for all logged-in users — restricts web browsing, deep research, agent mode, file downloads when enabled (opt-in). | monitor / policy | [Release notes (Jun 4)](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [Lockdown Mode](https://help.openai.com/en/articles/20001061) |
| **Cursor** | **May 29 Auto-review** routes non-allowlisted Shell/MCP/Fetch through a **classifier subagent** — fewer prompts but new trust boundary; configure **Settings → Agents → Run Mode**. | monitor / policy | [Changelog (3.6)](https://cursor.com/changelog) |
| **Hermes** | **May 29 `v0.15.1`**: fixes **dashboard 401 infinite-reload** in loopback mode; Docker **`HERMES_DASHBOARD_INSECURE=1`** now explicit (no bind-host inference). | upgrade (if on v0.15.0) | [v0.15.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.29) |
| **Codex** | **June 4 `0.137.0`**: environment-scoped permission approvals, managed MITM CA export for child commands, cloud-managed **config bundles** for enterprise — governance surface, not a CVE. | monitor (enterprise) | [0.137.0](https://github.com/openai/codex/releases/tag/rust-v0.137.0) · [Changelog](https://developers.openai.com/codex/changelog) |
| **Antigravity** | No in-window CVE; **June 18** Gemini CLI consumer cutoff is an **access/trust-boundary** migration deadline. | monitor / plan migration | [Antigravity changelog](https://antigravity.google/changelog) · [CLI transition](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| **React** | **`v19.1.8` (June 1)**: fixes missing **`FormData`** entries in Server Actions (regression from 19.1.7) — patch if on App Router + Server Actions. | upgrade (if affected) | [v19.1.8](https://github.com/facebook/react/releases/tag/v19.1.8) |
| **TypeScript / Tailwind / Cypress / Jest / PHPUnit / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / Playwright / Figma / Git / Livewire / @cursor/sdk** | No in-window **primary-source** security advisories verified for this run (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **Gemini** | **June 1:** **`gemini-2.0-*` flash family shut down** (confirmed). *(May 28 image GA + preview deprecation June 25 were immediately pre-window.)* | upgrade / migrate | Reconcile **OpenClaw** / portfolio hybrid routing against **`gemini-3.5-flash`** and **`gemini-3.1-flash-lite`** | [Changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **OpenClaw** | **`2026.6.1` / `2026.6.2` (Jun 1–3):** Skill Workshop (governed skill proposals + Control UI), Workboard orchestration, **Codex** app-server streaming/auth fixes, **MiniMax M3** + Copilot/Tokenjuice plugins, SQLite-backed iMessage/plugin install state, channel delivery hardening. | monitor → upgrade | Deep **Codex** + **Hermes**-class skill governance; pairs with **Antigravity** multi-agent patterns in portfolio | [Releases](https://github.com/openclaw/openclaw/releases) |
| **Cursor** | **May 29 (3.6):** **Auto-review** run mode. **Jun 3:** **Enterprise Organizations** (org → teams → groups). **Jun 4 (3.7):** canvas **Design Mode**, **context usage report**, full-screen shared canvases. | monitor | **Auto-review** ↔ **Codex** reviewer lifecycle; **canvases** ↔ **Codex Sites** / **Antigravity** Artifacts | [Changelog](https://cursor.com/changelog) · [Enterprise orgs](https://cursor.com/changelog/enterprise-organizations) |
| **Codex** | **May 29:** Windows **Computer Use** + remote control. **Jun 1:** **Amazon Bedrock** provider; terminal placement **26.601**. **Jun 2:** **Sites** preview plugin. **Jun 3–4:** CLI **`0.136.0`** / **`0.137.0`** (multi-agent v2, plugin JSON list, goal extension). **Jun 4:** app **26.602** (profile share cards). | monitor | **OpenClaw `2026.6.x`** Codex paths; version pin drift vs prior **`0.134.0`** note in stack | [Changelog](https://developers.openai.com/codex/changelog) · [0.137.0](https://github.com/openai/codex/releases/tag/rust-v0.137.0) |
| **Hermes** | **May 29:** **`v0.15.1`** (dashboard 401 loop, Docker insecure opt-in, MCP PATH, full skills.sh catalog) + **`v0.15.2`** (packaging fix). | upgrade (if on v0.15.0) | **OpenClaw** Hermes auth-profile bridge from prior week still relevant when experimenting | [v0.15.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.29) · [v0.15.2](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.29.2) |
| **ChatGPT** | **May 29:** Codex Windows computer use (Help Center). **Jun 1:** job search + resume formatting. **Jun 2:** **Active sessions** controls. **Jun 4:** upgraded **memory** + **Lockdown Mode** for all logged-in users. | monitor | Shared account surface with **Codex** mobile/remote workflows | [Release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **Antigravity** | **June 3:** **`2.0.11`** — antivirus-related startup blank screen + **Open IDE** button fixes. *(**2.0.10** May 28 G1 credit fix was pre-window.)* | monitor / hold | **June 18** CLI transition still drives terminal workflow choice vs **OpenClaw** Google tooling | [Changelog](https://antigravity.google/changelog) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Laravel** | **June 2:** framework **`v13.13.0`** — `Bus::bulk()`, Cache attribute memoization, HTTP client PSR client + header normalization, MariaDB vector index, scheduler pause opt-out, Symfony 8.1 response compat, assorted 13.x fixes. | monitor / upgrade on app cadence | Pairs with **Livewire** in `TECH_STACK.md` | [v13.13.0](https://github.com/laravel/framework/releases/tag/v13.13.0) |
| **React** | **June 1:** **`v19.1.8`** — Server Actions `FormData` regression fix. | upgrade (if on 19.1.7 + Server Actions) | Nonprofit/Livewire-adjacent **React** surfaces | [v19.1.8](https://github.com/facebook/react/releases/tag/v19.1.8) |
| **Livewire / TypeScript / Tailwind / Cypress / Playwright / Jest / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD / Claude Code / Google AI Studio / AgentMail / Google Workspace CLI / 1Password / @cursor/sdk / Figma / Git / PHP / TailwindCSS** | No additional in-window primary-source releases verified beyond rows above (timeboxed). **Playwright** latest stable remains **`v1.60.0` (May 11)**; **TypeScript** latest stable **`v6.0.3` (April 16)**. | not applicable / hold | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Interactions API** legacy schema removal | **2026-06-08** | confirmed | [Breaking changes guide](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Gemini** | **`gemini-3.1-flash-image-preview`** and **`gemini-3-pro-image-preview`** shutdown | **2026-06-25** | confirmed | [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [Changelog (May 28)](https://ai.google.dev/gemini-api/docs/changelog) |
| **Antigravity** | **Gemini CLI** + **Gemini Code Assist IDE extensions** stop serving consumer **Google AI Pro/Ultra** and free individual tiers | **2026-06-18** | confirmed | [CLI transition blog](https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |
| **ChatGPT** | **OpenAI o3** retirement from ChatGPT; **GPT-4.5** retirement (announced May 28) | **2026-08-26** / **2026-06-27** | confirmed | [Release notes (May 28)](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| **Codex** | **Sites** plugin remains **preview** — RBAC-gated on Enterprise | rolling | tentative | [Changelog (Jun 2)](https://developers.openai.com/codex/changelog) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Final **`2026-07-28`** specification (RC locked **May 21** — pre-window but still actionable) | **2026-07-28** | confirmed | [MCP RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| **TypeScript** | **6.x** maintenance mode; **TypeScript 7** native port (`typescript-go`) | no fixed GA date | tentative | [Maintenance mode issue](https://github.com/microsoft/TypeScript/issues/62963) · [typescript-go](https://github.com/microsoft/typescript-go) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **OpenClaw** | **Codex** | **`2026.6.x`** streams Codex app-server partials, separates API-key vs OAuth Codex auth, surfaces Skill Workshop in Codex prompts, and hardens abandoned app-server startup recovery. | **OpenClaw** portfolio already pins **Codex** harness versions — this week’s train is the integration surface to reconcile on upgrade. | [OpenClaw releases](https://github.com/openclaw/openclaw/releases) · [Codex changelog](https://developers.openai.com/codex/changelog) |
| **Cursor** | **Codex** | **Cursor 3.6 Auto-review** (May 29) ships the same *class* of approval classifier pattern **Codex** documents for auto-review + sandbox boundaries; **Codex `0.137.0`** preserves auto-review policy in `codex exec`. | Helps compare approval/HITL posture across **AgentOS (Cursor)** vs **OpenClaw/Codex** terminal paths. | [Cursor changelog](https://cursor.com/changelog) · [0.137.0](https://github.com/openai/codex/releases/tag/rust-v0.137.0) |
| **Gemini** | **OpenClaw** | **June 1** **`gemini-2.0-*` shutdown** while **OpenClaw `2026.6.x`** adds provider catalog fixes and **MiniMax M3** — multi-provider configs need model-ID audit. | WoW analytics pipelines using hybrid **Gemini + Gemma** should confirm no stale **2.0** IDs remain. | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog) · [OpenClaw releases](https://github.com/openclaw/openclaw/releases) |
| **Cursor** | **Antigravity** | **Cursor 3.7** canvas **Design Mode** + shareable dashboards vs **Antigravity `2.0.11`** **Open IDE** handoff fixes — both push agent-built UI artifacts toward review/share workflows. | Chooses where interactive agent output lives per project (IDE canvas vs Antigravity IDE bridge). | [Cursor changelog](https://cursor.com/changelog) · [Antigravity changelog](https://antigravity.google/changelog) |
| **ChatGPT** | **Codex** | **June 4** memory refresh + **Lockdown Mode** vs **Codex Sites/Bedrock/remote Windows** expansion — same account, different capability gates. | Household/work **ChatGPT** lockdown settings may not apply to **Codex CLI** paths — verify per surface. | [Release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · [Codex changelog](https://developers.openai.com/codex/changelog) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models & inference:** Portfolio still lists **“Gemini 3.1 Pro + Gemma 26b”** and **“Gemini 2.5 Flash + Gemma e2b”** — official changelog shows **`gemini-3.5-flash` GA (May 19)**, **`gemini-3.1-flash-lite` GA**, and **`gemini-2.0-*` shutdown (June 1)**; suggest refreshing tier table to current GA IDs and migration targets.
- **`docs/TECH_STACK.md` → OpenClaw:** Note **`2026.6.x`** Skill Workshop + operator install policy if portfolio runbooks still reference the pre-policy dangerous-code scanner path.
- **`docs/TECH_STACK.md` → Codex:** If version pins are documented locally, bump reference from **`0.134.0`** (May digest) toward **`0.137.0`** when Tyler upgrades OpenClaw/Codex pins.
- **Hermes exploratory line:** **`v0.15.1+`** is the supported line if testing after **v0.15.0** dashboard loopback bug.

## Searches & sources consulted

- `docs/TECH_STACK.md`, `docs/BOUNDARIES.md`, `.cursor/skills/tech-stack-pulse/SKILL.md`
- [Cursor changelog](https://cursor.com/changelog) · [Enterprise organizations](https://cursor.com/changelog/enterprise-organizations)
- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations)
- [OpenAI Codex changelog](https://developers.openai.com/codex/changelog) · [Codex `0.137.0` release](https://github.com/openai/codex/releases/tag/rust-v0.137.0)
- [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases)
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases)
- [Google Antigravity changelog](https://antigravity.google/changelog)
- [Laravel `v13.13.0`](https://github.com/laravel/framework/releases/tag/v13.13.0) · [React `v19.1.8`](https://github.com/facebook/react/releases/tag/v19.1.8)
- Prior digest: `docs/research/tech-stack-updates-2026-05-27.md` (context only; dates re-verified against primary sources above)
