# Tech stack updates — 2026-05-13 (America/New_York)

- **Window:** 2026-05-06 00:00 **America/New_York** (EDT, UTC−04:00) → 2026-05-13 23:59 **America/New_York** (inclusive of both endpoints; same as 2026-05-06 04:00 UTC → 2026-05-14 03:59 UTC)
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **React Server Components / Next.js (non-core but urgent if applicable):** A coordinated security release landed **May 6–7, 2026**, including upstream **CVE-2026-23870** (high-severity DoS in RSC “Flight” handling) plus **multiple Next.js advisories** (middleware/proxy bypass, SSRF, XSS, cache poisoning, additional DoS). Vercel’s changelog lists patched **Next.js `15.5.18` / `16.2.6`** and React **`19.0.6` / `19.1.7` / `19.2.6`** for the affected `react-server-dom-*` packages.
- **Cursor (core):** **3.3** (May 7) — PR review refresh, parallel plan execution, split PRs, pinned skills, Explore subagent model controls, `/multitask`, MCP stale-token cleanup; **May 6** agent **context usage** breakdown; **May 11–13** Microsoft Teams integration, Bugbot effort controls, and **agent development environments** (multi-repo, Dockerfile-as-code, build secrets, rollback/audit, scoped egress/secrets).
- **Gemini (core):** **Gemini 3.1 Flash-Lite GA** on **Gemini Enterprise Agent Platform** (**May 7**, Google Cloud blog). **Gemini API event-driven Webhooks** shipped **2026-05-04** (one calendar day before the window). **May 12** Google Developers Blog **ADK** article on durable pause/resume agents (`gemini-3.1-flash-lite` in sample), SQLite-backed sessions, webhook-style wakeups — relevant to OpenClaw-style orchestration.
- **Hermez / Hermes Agent (core):** **`v0.13.0` (`v2026.5.7`)** on **2026-05-07** documents a **security wave (8× P0 closures)** plus large feature surface (Kanban, `/goal`, MCP transport hardening, session auto-resume). Exploratory installs should **upgrade** and re-read release notes before exposing gateways.
- **Playwright / Cypress / Tailwind (non-core):** **Playwright `1.60.0`** (May 11) with HAR-on-tracing, `locator.drop()`, aria snapshot `boxes` for AI workflows, **`test.abort()`**, and **breaking removals**; **Cypress `15.15.0`** (May 12) with proxy fixes and dependency bumps including **`socket.io`** for **GHSA-677m-j7p3-52f9**; **Tailwind v4.2 + v4.3** blog (**May 8**).
- **Claude / Anthropic (non-core tooling):** Claude **Platform** release notes dated **May 6, 11, and 12** — Managed Agents beta expansion (`mcp_oauth` vault refresh, webhooks, filters), **Claude Platform on AWS**, **fast mode** for **Opus 4.7** (research preview). **Claude Code** shipped **`v2.1.139` / `v2.1.140`** in-window (agent view, `/goal`, MCP caps, **Cursor/VS Code terminal scroll** fixes).
- **Anti-Gravity / OpenClaw (core):** No Antigravity-specific **dated in-window** release notes located; **OpenClaw** still has **no public vendor changelog** keyed to that name — keep **project-local** notes and dependency bumps.

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Cursor** | No standalone CVE in this scan; **May 13** emphasizes **governance** for agent dev environments (version history, rollback permissions, audit logs, **egress + secrets scoped per environment**). | **monitor** (review org policy if using cloud agents / shared envs) | https://cursor.com/changelog/05-13-26 |
| **Gemini** | **Webhooks** announcement positions **signed** Standard Webhooks–style delivery for long jobs; post dated **2026-05-04** (adjacent to window). | **monitor** (validate endpoint auth + replay controls if adopting) | https://blog.google/innovation-and-ai/technology/developers-tools/event-driven-webhooks/ |
| **Hermez** (Hermes Agent) | **v0.13.0** release notes claim **8 P0 security closures** (default redaction, Discord guild-scoped allowlists / CVSS 8.1 class issue, WhatsApp stranger defaults, MCP OAuth TOCTOU, browser SSRF floor, cron prompt-injection scanning, `hermes debug share` redaction, file permission hygiene). | **upgrade** (if any Hermes gateway is exposed beyond local experiments) | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 |
| **OpenClaw** | No public security bulletin keyed to that project name. | **not applicable** (vendor channel) | — |
| **Anti-Gravity** | No dated Antigravity CVE/advisory found in-window. | **hold** / **monitor** | https://antigravity.google/ (product home; not a dated advisory) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|---------|--------|------|
| **React** (`react-server-dom-*`) | **CVE-2026-23870** — high severity DoS via crafted requests to server function endpoints; patched **`19.0.6` / `19.1.7` / `19.2.6`** (published **2026-05-06**). | **upgrade** (immediately if RSC stack is exposed) | [GitHub Advisory GHSA-rv78-f8rc-xrxh](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) |
| **Next.js** | Coordinated **May 2026** security release (**13 advisories** per Vercel). Patched **`15.5.18`** / **`16.2.6`**. | **upgrade** (if on Next in affected ranges) | [Vercel changelog — Next.js May 2026 security release](https://vercel.com/changelog/next-js-may-2026-security-release) |
| **Cypress** | **`15.15.0` (2026-05-12)** bumps `socket.io` stack to address **GHSA-677m-j7p3-52f9** (DoS); also bumps `uuid` for a Snyk-reported validation issue. | **upgrade** on supported Cypress tracks | [Cypress changelog §15.15.0](https://docs.cypress.io/app/references/changelog#15-15-0) |
| **Laravel** | **v13.8.0** published **2026-05-05** (just before window start) — no additional `laravel/framework` **security tag** located strictly inside May 6–13 in this pass. | **monitor** | https://github.com/laravel/framework/releases/tag/v13.8.0 |
| **PostgreSQL / SQLite / Livewire** | No **primary vendor/GitHub advisory publication** inside the stated ET window verified in this pass (**PostgreSQL quarterly minors: 2026-05-14**, day after window end). | **not applicable** / **monitor** | [PostgreSQL roadmap](https://www.postgresql.org/developer/roadmap/) |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-----------------|------------------------------|------|
| **Cursor** | **3.3** — PR review tabs, **Build in Parallel** on plans, **Split PRs**, **pin skills**; Explore subagent model controls; `/multitask` in editor; MCP stale-token cleanup + predictable connections. | **upgrade** when convenient (IDE auto-update channel) | Touches **MCP**, **subagents**, and **cloud agents** — pairs with Hermes / other MCP-heavy stacks | https://cursor.com/changelog/05-07-26 |
| **Cursor** | **May 6** — **context usage** stats surfaced for agents (rules, skills, MCPs, subagents). | **monitor** | Helps tune AgentOS-style markdown + skills footprint | https://cursor.com/changelog/05-06-26 |
| **Cursor** | **May 11** — **Microsoft Teams** `@Cursor` delegation to cloud agents + PR flow. | **monitor** (only if Teams is in use) | Cross-stack **Microsoft Teams × Cursor cloud agents** | https://cursor.com/changelog/microsoft-teams |
| **Cursor** | **May 11** — **Bugbot** configurable effort (Default / High / Custom) for PR reviews (usage-based billing gate). | **monitor** | Pairs with GitHub-style PR review loop | https://cursor.com/changelog/05-11-26 |
| **Cursor** | **May 13** — **Agent development environments** — multi-repo envs, Dockerfile-as-code (**build secrets**), faster cached rebuilds, interactive setup validation, per-environment **version history + rollback + audit log**, **scoped secrets + egress**. | **monitor** → **upgrade** posture once org policies are ready | Strong overlap with **Docker** (emerging learning area) + **CI/CD** direction | https://cursor.com/changelog/05-13-26 |
| **Gemini** | **Gemini 3.1 Flash-Lite GA** on **Gemini Enterprise Agent Platform** (**May 7**). | **monitor** — confirm Enterprise Agent Platform vs **AI Studio** paths | Positioning emphasizes **agentic tool calling / orchestration** at scale | https://cloud.google.com/blog/products/ai-machine-learning/gemini-3-1-flash-lite-is-now-generally-available |
| **Gemini** | **ADK tutorial** (**May 12**) — long-running agents with explicit state machines, **SQLite** session persistence, webhook-driven resume, multi-agent delegation; sample uses **`gemini-3.1-flash-lite`**. | **monitor** (pattern library, not a forced migration) | Echoes **OpenClaw** orchestration + **SQLite** state patterns in `TECH_STACK.md` | https://developers.googleblog.com/build-long-running-ai-agents-that-pause-resume-and-never-lose-context-with-adk/ |
| **Gemini** | **Event-driven Webhooks** for Gemini API — **2026-05-04** (pre-window by one calendar day). | **monitor** | Complements Batch / long-running agent flows | https://blog.google/innovation-and-ai/technology/developers-tools/event-driven-webhooks/ |
| **Hermez** | **Hermes Agent v0.13.0** — Kanban workers, `/goal`, `video_analyze` (calls out Gemini-class multimodal models), voice/TTS providers, Google Chat platform, MCP SSE/OAuth/image tagging improvements, large reliability batch. | **upgrade** for active testers; expect **breaking surface area** despite semver tag — read full notes | **Hermes × Gemini** for video tool; **Hermes × MCP** hardening | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 |
| **OpenClaw** | No upstream changelog keyed to that name. | **not applicable** | Compare **Cursor** cloud envs + **ADK** durability posts against private repo decisions | — |
| **Anti-Gravity** | No dated product release in-window located. | **hold** | Prior official narrative still centers **Antigravity + Gemini** for agentic IDE flows | https://developers.googleblog.com/en/build-with-google-antigravity-our-new-agentic-development-platform/ |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-----------------|------------------------------|------|
| **React** | **`19.0.6` / `19.1.7` / `19.2.6`** — RSC type hardening + performance **plus** security backports above. | **upgrade** on affected lines | Touches any RSC bundler/plugin path (Webpack/Turbopack/Parcel) | [Release `v19.0.6`](https://github.com/facebook/react/releases/tag/v19.0.6) |
| **Next.js** | Patched **`15.5.18`** / **`16.2.6`** as part of coordinated security release (**2026-05-07** per Vercel). | **upgrade** if using Next in affected ranges | Many stacks sit on Next even when day job is “React + TS” | [Vercel changelog](https://vercel.com/changelog/next-js-may-2026-security-release) |
| **Tailwind CSS** | **v4.2 + v4.3** announced **2026-05-08** (blog bundles both). | **monitor** → **upgrade** after a smoke pass | **`@tailwindcss/webpack`** + Turbopack claims pair with **Next.js** heavy builds | https://tailwindcss.com/blog/tailwindcss-v4-3 |
| **Playwright** | **`v1.60.0`** published **2026-05-11** — HAR tracing APIs, `locator.drop()`, aria snapshot `boxes` “for AI consumption”, `test.abort()`, **breaking removals**. | **upgrade** with a **deprecation/breakage checklist** (CI first) | Pairs with **Cursor Explore** / LLM-driven UI triage | https://github.com/microsoft/playwright/releases/tag/v1.60.0 |
| **Cypress** | **`15.15.0`** (**2026-05-12**) — proxy/content-length fix, Vite 8 + React refresh interaction fix, `cy.origin` isolation fixes, deprecates `cy.end()`, dependency security bumps. | **upgrade** | Overlaps modern **React + Vite** component testing | https://docs.cypress.io/app/references/changelog#15-15-0 |
| **Claude Code** | **`v2.1.139` / `v2.1.140`** in-window — agent view, `/goal`, MCP reconnect + **16 MB SSE frame cap**, subagent OTEL headers, **API key vs claude.ai** gating note, terminal scroll fixes for **Cursor/VS Code**. | **upgrade** when convenient (CLI/extension) | Intersects **commodity reporting** + agent stacks | https://github.com/anthropics/claude-code/releases |
| **Claude Platform (API)** | **2026-05-06** — multiagent sessions + Outcomes public beta; vault refresh for `mcp_oauth`; managed-agent webhooks; richer filters. **2026-05-11** — **Claude Platform on AWS**. **2026-05-12** — fast mode for **Opus 4.7** (research preview). | **monitor** / **defer** unless integrating managed agents or AWS-first deployment | **`mcp_oauth` vault refresh** parallels **Cursor 3.3 MCP auth** fixes | https://docs.anthropic.com/en/release-notes/overview |
| **TypeScript** | No **Microsoft TypeScript blog** post dated inside this ET window surfaced in this pass. | **not applicable** | — | https://devblogs.microsoft.com/typescript/ |
| **MCP (spec project)** | Latest tagged spec release on GitHub remains **`2025-11-25`** stable; no new protocol tag observed in-window. | **not applicable** / **hold** | Client churn (Cursor, Claude Code) exceeds spec tarball cadence | https://github.com/modelcontextprotocol/modelcontextprotocol/releases |

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
| **PostgreSQL** | Quarterly **minor release train** | **2026-05-14** (second Thursday of May) | **confirmed** (project roadmap) | https://www.postgresql.org/developer/roadmap/ |
| **PostgreSQL** | Next **major** | **September 2026** (planned) | **tentative** (roadmap wording: “planned”) | https://www.postgresql.org/developer/roadmap/ |
| **MCP** | **MCP Apps** WG meeting listing observed for **2026-05-27** (future relative to digest date). | **2026-05-27** (meeting) | tentative | https://meet.modelcontextprotocol.io/2026/05/mcp-apps-working-group-meeting-7jRKePtbLRYm |
| **React** | Ongoing RSC / Server Actions hardening series — treat **react.dev** blog + GitHub releases as canonical. | rolling | confirmed pattern | https://react.dev/blog |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Cursor** | **Docker / cloud agents** | **May 13** agent dev environments: Dockerfile-based config, **build secrets**, layer caching claims, per-env egress/secrets, audit/versioning. | Aligns **Docker** learning + **multi-agent** cloud execution | https://cursor.com/changelog/05-13-26 |
| **Cursor** | **MCP** | Cursor **3.3** improves MCP connection predictability and stale-token cleanup. | Fewer flaky MCP loops when mirroring Hermes-style OAuth-heavy setups | https://cursor.com/changelog/05-07-26 |
| **Tailwind** | **Next.js / Turbopack** | Blog highlights **`@tailwindcss/webpack`** performance and Turbopack compatibility. | First-class integration if moving to **Turbopack-by-default** Next majors | https://tailwindcss.com/blog/tailwindcss-v4-3 |
| **Anthropic Claude Platform** | **MCP OAuth** | **2026-05-06** notes vault credential background refresh for **`mcp_oauth`**. | Validate against **1Password** / vault practices when wiring managed agents | https://docs.anthropic.com/en/release-notes/overview |
| **Playwright** | **AI-assisted testing** | `ariaSnapshot` **`boxes`** metadata “useful for AI consumption.” | Small, gated experiments before baking into CI (stability / career-fit) | https://github.com/microsoft/playwright/releases/tag/v1.60.0 |
| **Claude Code** | **Cursor / VS Code** | **`v2.1.139`** fixes mouse wheel/trackpad scrolling in **Cursor and VS Code** integrated terminals. | Day-to-day **Claude Code + Cursor** ergonomics | https://github.com/anthropics/claude-code/releases/tag/v2.1.139 |
| **Hermez** | **Gemini** | Hermes **v0.13.0** documents `video_analyze` “on Gemini and compatible multimodal models.” | Couples exploratory Hermes usage with Gemini tiering | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 |
| **Gemini** | **ADK / agent durability** | **May 12** ADK article: **Gemini models** + **SQLite** + webhook-style resumes + sub-agents. | Comparable blueprint to **OpenClaw** + **SQLite** in `TECH_STACK.md` | https://developers.googleblog.com/build-long-running-ai-agents-that-pause-resume-and-never-lose-context-with-adk/ |
| **Gemini** | **Antigravity** (historical) | March developers blog: I/O puzzle built using **Antigravity** + **Gemini**. | Reinforces integrated **Antigravity × Gemini** story (**outside** strict 7d window) | https://developers.googleblog.com/how-we-built-the-google-io-2026-save-the-date-experience/ |

## Doc maintenance suggestions

- **Core stack table vs skill prose:** Keep **`TECH_STACK.md`** “Core stack (priority…)” table synchronized with `.cursor/skills/tech-stack-pulse/SKILL.md` if either list changes.
- **Model IDs:** Portfolio table still lists informal Gemini/Gemma names; **ADK** sample references `gemini-3.1-flash-lite` — reconcile **live** Google AI model strings before migrations (per `TECH_STACK.md` warning).
- **Hermez mapping:** Treat **Hermez → NousResearch Hermes Agent** as the research target unless a distinct **Hermez** product row is added later.
- **Next.js:** If any active client uses **Next**, add an explicit row to `TECH_STACK.md` — this security wave is **framework-level**, not optional React trivia.
- **Playwright vs Cypress:** Both moved in-window; if Tyler standardizes on one for new suites, record that preference to focus future pulses.

## Searches & sources consulted

- Read **`docs/TECH_STACK.md`**, **`docs/BOUNDARIES.md`**, **`docs/career-fit-context.md`**, and **`.cursor/skills/tech-stack-pulse/reference.md`** (branch history) for checklist + sourcing rules.
- Fetched / cited: **React** GitHub advisory + **`v19.0.6` release**; **Vercel** Next.js security changelog; **Cursor** changelog (index + dated entries); **Playwright `v1.60.0`**; **Tailwind v4.3** blog; **Cypress** docs changelog §15.15.0; **Anthropic** platform release notes; **Google Cloud** Flash-Lite GA; **Google** webhooks + **ADK** Developers Blog; **Hermes Agent** `v2026.5.7` release; **MCP** GitHub releases + meet.modelcontextprotocol.io listing; **PostgreSQL** roadmap; **Claude Code** GitHub releases (`v2.1.139` tag page); historical **Antigravity** platform post.
- **Failed / incomplete fetches (from `main` lineage):** `https://ai.google.dev/gemini-api/docs/changelog` (timeouts) — re-check when the endpoint responds.
