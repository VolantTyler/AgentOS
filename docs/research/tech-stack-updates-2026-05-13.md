# Tech stack updates — 2026-05-13 (America/New_York)

- **Window:** 2026-05-06 00:00 **America/New_York** (EDT, UTC−04:00) → 2026-05-13 23:59 **America/New_York** (inclusive of both endpoints)
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Cursor (core):** Multiple shipped updates in-window — **3.3** (May 7) with PR review refresh, parallel plan execution, split-PR workflow, pinned skills, MCP auth reliability fixes; **May 6** context-usage visibility for agents; **May 11–13** Teams integration, Bugbot effort controls, and **agent development environments** (multi-repo, Dockerfile-as-code, build secrets, rollback/audit, scoped egress/secrets). Teams running cloud agents should **review** environment and secrets posture before wide rollout.
- **Gemini (core):** Official **Gemini API Webhooks** shipped **2026-05-04** (one day before this digest’s window start) — still operationally relevant for long-running / batch flows. In-window, Google published an **ADK** deep-dive (**2026-05-12**) on durable, pause/resume agents using Gemini models, SQLite-backed sessions, and webhook-style wakeups — relevant to OpenClaw-style orchestration patterns even though OpenClaw itself is not a public vendor surface here.
- **Hermez / Hermes Agent (core):** **v0.13.0 (v2026.5.7)** on **2026-05-07** includes a documented **security wave (8× P0 closures)** plus large feature surface (Kanban, `/goal`, MCP transport hardening, session auto-resume). Exploratory installs should **upgrade** and re-read release notes before exposing gateways to messaging surfaces.
- **Anti-Gravity / Antigravity (core):** No Antigravity-specific versioned release notes were found **dated inside** the window; ecosystem signal remains **Google agentic stack** (ADK tutorial above; historical **2026-03-03** developers blog on I/O puzzle build using Antigravity + Gemini — outside window, linked only for context).
- **OpenClaw (core):** Treated as **Tyler’s active project name** in `TECH_STACK.md`; **no public, versioned vendor changelog** was located for “OpenClaw” as a product — maintain **project-local** release notes / dependency bumps instead.
- **React (non-core, security-adjacent):** **19.2.6 / 19.1.7 / 19.0.6** published **2026-05-06** on GitHub with **React Server Components** “type hardening and performance improvements” — follow upstream guidance for any app on the prior RSC security train.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Cursor** | No standalone CVE/advisory surfaced in this scan; **May 13** release emphasizes **governance** for agent dev environments (version history, rollback permissions, audit logs, **egress + secrets scoped per environment**). | **monitor** (review org policy if using cloud agents / shared envs) | https://cursor.com/changelog/05-13-26 |
| **Gemini** | **Webhooks** announcement positions **signed** Standard Webhooks–style delivery for long jobs (security-sensitive integration pattern); post dated **2026-05-04** (adjacent to window). | **monitor** (validate endpoint auth + replay controls if adopting) | https://blog.google/innovation-and-ai/technology/developers-tools/event-driven-webhooks/ |
| **Hermez** (Hermes Agent) | **v0.13.0** release notes claim **8 P0 security closures** (default redaction, Discord guild-scoped allowlists / CVSS 8.1 class issue, WhatsApp stranger defaults, MCP OAuth TOCTOU, browser SSRF floor, cron prompt-injection scanning, `hermes debug share` redaction, file permission hygiene). | **upgrade** (if any Hermes gateway is exposed beyond local experiments) | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 |
| **OpenClaw** | No public security bulletin keyed to that project name. | **not applicable** (vendor channel) | — |
| **Anti-Gravity** | No dated Antigravity CVE/advisory found in-window. | **hold** / **monitor** | https://antigravity.google/ (product home; not a dated advisory) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|---------|--------|------|
| **React** (+ RSC users) | **v19.2.6**, **v19.1.7**, **v19.0.6** (May 6, 2026) continue the RSC hardening line after earlier critical fixes; release text highlights **type hardening + performance** in Server Components. | **upgrade** on supported release lines if not already current | https://github.com/facebook/react/releases/tag/v19.2.6 |
| **Laravel** | **v13.8.0** published **2026-05-05** (just before window start) — no additional `laravel/framework` security tag located strictly inside May 6–13 in this pass. | **monitor** | https://github.com/laravel/framework/releases/tag/v13.8.0 |
| **MCP (spec project)** | No new dated specification release found inside the window from this scan (community calendar shows future WG meetings). | **hold** | https://modelcontextprotocol.io/development/roadmap |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|------------------------------|------|
| **Cursor** | **3.3** — PR review tabs, **Build in Parallel** on plans, **Split PRs**, **pin skills**; Explore subagent model controls; `/multitask` in editor; MCP stale-token cleanup + predictable connections. | **upgrade** when convenient (IDE auto-update channel) | Touches **MCP**, **subagents**, and **cloud agents** — pairs with Hermes / other MCP-heavy stacks | https://cursor.com/changelog/05-07-26 |
| **Cursor** | **May 6** — **context usage** stats surfaced for agents (rules, skills, MCPs, subagents). | **monitor** | Helps tune AgentOS-style markdown + skills footprint | https://cursor.com/changelog/05-06-26 |
| **Cursor** | **May 11** — **Microsoft Teams** `@Cursor` delegation to cloud agents + PR flow. | **monitor** (only if Teams is in use) | Cross-stack **Microsoft Teams × Cursor cloud agents** | https://cursor.com/changelog/microsoft-teams |
| **Cursor** | **May 11** — **Bugbot** configurable effort (Default / High / Custom) for PR reviews (usage-based billing gate). | **monitor** | Pairs with GitHub-style PR review loop | https://cursor.com/changelog/05-11-26 |
| **Cursor** | **May 13** — **Agent development environments** — multi-repo envs, Dockerfile-as-code (**build secrets**), faster cached rebuilds, interactive setup validation, per-environment **version history + rollback + audit log**, **scoped secrets + egress**. | **monitor** → **upgrade** posture once org policies are ready | Strong overlap with **Docker** (emerging learning area) + **CI/CD** direction | https://cursor.com/changelog/05-13-26 |
| **Gemini** | **ADK tutorial** (**May 12**) — long-running agents with explicit state machines, **SQLite** session persistence, webhook-driven resume, multi-agent delegation; sample uses **`gemini-3.1-flash-lite`**. | **monitor** (pattern library, not a forced migration) | Echoes **OpenClaw** orchestration + **SQLite** state patterns documented in `TECH_STACK.md` | https://developers.googleblog.com/build-long-running-ai-agents-that-pause-resume-and-never-lose-context-with-adk/ |
| **Gemini** | **Event-driven Webhooks** for Gemini API — **2026-05-04** (pre-window by one calendar day). | **monitor** | Complements Batch / long-running agent flows | https://blog.google/innovation-and-ai/technology/developers-tools/event-driven-webhooks/ |
| **Hermez** | **Hermes Agent v0.13.0** — Kanban workers, `/goal`, `video_analyze` (calls out Gemini-class multimodal models), voice/TTS providers, Google Chat platform, MCP SSE/OAuth/image tagging improvements, large reliability batch. | **upgrade** for active testers; expect **breaking surface area** despite semver tag — read full notes | **Hermes × Gemini** called out for video tool; **Hermes × MCP** hardening | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 |
| **OpenClaw** | No upstream changelog keyed to that name. | **not applicable** | Compare interesting patterns from **Cursor** cloud envs + **ADK** durability posts against your private repo decisions | — |
| **Anti-Gravity** | No dated product release in-window located. | **hold** | Prior official narrative still centers **Antigravity + Gemini** for agentic IDE flows | https://developers.googleblog.com/en/build-with-google-antigravity-our-new-agentic-development-platform/ |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|------------------------------|------|
| **React** | Patch releases **19.2.6 / 19.1.7 / 19.0.6** — RSC type hardening + performance. | **upgrade** on affected lines | Pairs with **Next.js / RSC** style stacks if used off-repo | https://github.com/facebook/react/releases |
| **Laravel** | **v13.8.0** (May 5) includes queue inspection helpers, worker pause/resume events, `schedule:list --environment`, `SortDirection` enum in query builder, etc. | **monitor** (already shipped; outside strict window) | Livewire-adjacent queue ops if used together | https://github.com/laravel/framework/releases/tag/v13.8.0 |
| **TypeScript / Tailwind / Cypress / Playwright / Jest / GraphQL / PostgreSQL / Claude Code / AgentMail / others** | No additional **in-window** primary-source rows captured in this pass (time spent on core sources + Gemini changelog timeouts). | **hold** | — | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Cursor** | Deeper **Teams** + **cloud agent** integration patterns and **environment-as-code** rollout for orgs. | Not numerically specified beyond shipped posts | tentative | https://cursor.com/docs/cloud-agent/setup |
| **Gemini** | **Google I/O 2026** referenced across Google blogs as **May 19–20** — expect stacked Gemini / cloud AI announcements there. | **2026-05-19 — 2026-05-20** | confirmed (event dates) | https://io.google/2026/ |
| **Hermez** | Release notes read as continuous rapid iteration on gateway surfaces; no separate long-range roadmap link captured here. | — | tentative | https://github.com/NousResearch/hermes-agent/releases |
| **Anti-Gravity** | Same **I/O** cadence likely relevant for Google’s agentic IDE narrative. | **2026-05-19 — 2026-05-20** | tentative | https://io.google/2026/ |
| **OpenClaw** | — | — | — | — |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **MCP** | Public roadmap / WG meetings continue; **MCP Apps** WG meeting listing observed for **2026-05-27** (future relative to digest date). | **2026-05-27** (meeting) | tentative | https://meet.modelcontextprotocol.io/2026/05/mcp-apps-working-group-meeting-7jRKePtbLRYm |
| **React** | Ongoing RSC / Server Actions hardening series — treat **react.dev** blog + GitHub releases as canonical. | rolling | confirmed pattern | https://react.dev/blog |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Cursor** | **MCP** | Cursor **3.3** explicitly improves MCP connection predictability and stale-token cleanup. | Fewer flaky MCP loops when mirroring Hermes-style OAuth-heavy setups in the IDE | https://cursor.com/changelog/05-07-26 |
| **Cursor** | **Docker / cloud agents** | **May 13** agent dev environments: Dockerfile-based config, build secrets, layer caching claims, per-env egress/secrets. | Aligns with **Docker** learning + multi-agent cloud execution story | https://cursor.com/changelog/05-13-26 |
| **Hermez** | **Gemini** | Hermes **v0.13.0** documents `video_analyze` “on Gemini and compatible multimodal models.” | Direct tool-chain coupling between exploratory Hermes usage and Gemini tiering choices | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 |
| **Gemini** | **ADK / agent durability** | **May 12** ADK article demonstrates **Gemini models** + **SQLite** sessions + webhook-style resumes + sub-agents. | Conceptual blueprint comparable to **OpenClaw** + **SQLite** notes in `TECH_STACK.md` | https://developers.googleblog.com/build-long-running-ai-agents-that-pause-resume-and-never-lose-context-with-adk/ |
| **Gemini** | **Antigravity** (historical) | March developers blog: I/O puzzle built using **Antigravity** + **Gemini** across gameplay + tooling. | Reinforces Google’s integrated **Antigravity × Gemini** story (outside strict 7d window) | https://developers.googleblog.com/how-we-built-the-google-io-2026-save-the-date-experience/ |

## Doc maintenance suggestions

- **Core stack table vs skill prose:** `TECH_STACK.md` lists **five** core rows (**Cursor, Gemini, Hermez, OpenClaw, Anti-Gravity**). The older one-line skill summary in `.cursor/skills/tech-stack-pulse/SKILL.md` that says “currently **Cursor**, **Gemini**, **Hermez**, **OpenClaw**, **Anti-Gravity**” matches — keep them synchronized if the table changes.
- **Model IDs:** Portfolio table still lists **“Gemini 3.1 Pro + Gemma 26b”** style names — ADK sample code in Google’s **May 12** post references `gemini-3.1-flash-lite`. Before any migration, reconcile **live** Google AI model strings against `TECH_STACK.md` (per doc’s own “model IDs may be outdated” warning).
- **Hermez mapping:** Continue to treat **Hermez → NousResearch Hermes Agent** as the research target unless Tyler adds a distinct **Hermez** product row later.

## Searches & sources consulted

- Fetched: `https://cursor.com/changelog`, `https://cursor.com/changelog/05-07-26`, `https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7`, `https://blog.google/innovation-and-ai/technology/developers-tools/event-driven-webhooks/`, `https://developers.googleblog.com/build-long-running-ai-agents-that-pause-resume-and-never-lose-context-with-adk/`, `https://developers.googleblog.com/how-we-built-the-google-io-2026-save-the-date-experience/`, `https://github.com/laravel/framework/releases/tag/v13.8.0`, `https://github.com/facebook/react/releases`, `https://antigravity.google/`, historical Antigravity platform post on Google Developers Blog.
- **Failed / incomplete fetches:** `https://ai.google.dev/gemini-api/docs/changelog` (timeouts via direct and `r.jina.ai` mirror) — Gemini API line items beyond blogs should be re-checked locally when the endpoint responds.
