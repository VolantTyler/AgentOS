# Tech stack updates — 2026-05-14 (America/New_York)

- **Window:** 2026-05-07 00:00 America/New_York (EDT, UTC−04:00) → 2026-05-14 23:59 America/New_York — i.e. **2026-05-07 04:00 UTC** through **2026-05-15 03:59 UTC** *(inclusive calendar span anchored on the run date so dated releases on **May 7** remain in-scope for this weekly pass; adjust if you prefer a strict 168-hour rolling boundary)*  
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Cursor (core):** Multiple shipped drops (May 7 **3.3**, May 11 Teams + Bugbot effort controls, May 13 **agent development environments**) expand PR/agent workflows, cloud-agent fleet patterns, and governance (audit logs, env-scoped secrets/egress). **Upgrade/monitor** for teams using Cloud Agents, Bugbot, or Teams; expect policy and Dockerfile iteration costs.  
- **Gemini (core):** Official API changelog is dense this week: **GA `gemini-3.1-flash-lite`**, **multimodal File Search**, **webhooks** for batch/long-running work, and an **Interactions API schema migration** with published cutover dates—**monitor/upgrade** for anyone on preview IDs or Interactions.  
- **Hermes** (Hermes Agent framework) **(core):** **v0.13.0 (tag `v2026.5.7`, May 7)** is a major release with multi-agent Kanban, `/goal`, Gemini-oriented `video_analyze`, and a **security wave** (multiple P0 closures). **Upgrade** if you run Hermes anywhere near production.  
- **OpenClaw (core):** Rapid **pre-release** cadence on **May 13–14** (`v2026.5.12-beta.4` … **`v2026.5.12-beta.8`**) with plugin externalization, ACP fallbacks, gateway protocol (**v4 clients**), Telegram hardening, and **auth/config security** tightening. **Monitor** on betas; plan cutover testing if you depend on SDK/gateway framing.  
- **Antigravity** (Google IDE) **(core):** No **dated** official product changelog entry surfaced in this window beyond evergreen **Google Developers Blog** positioning; **hold/monitor** and watch **Google I/O (May 19–20, 2026)** for agentic-dev announcements.  
- **React / Next-adjacent (non-core):** Latest **GitHub-published** React Server Components advisory in the API listing is **2026-05-06** (GHSA-rv78…); nothing newer **published 2026-05-07+** was returned—still **monitor** if you ship RSC.  

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Cursor** | May 13 release emphasizes **environment-level secrets + egress scoping**, audit logs, rollback/version history for agent dev environments—security-relevant for orgs running cloud agents. | monitor / upgrade (org policy) | [May 13, 2026 changelog](https://cursor.com/changelog/05-13-26) |
| **Gemini** | Deprecation pressure: **`gemini-3.1-flash-lite-preview`** deprecating **2026-05-11**, shutdown **2026-05-25** per changelog; Interactions API **schema breaking change** with legacy removal **2026-06-08**. | monitor / upgrade (if on preview or Interactions) | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) · [Interactions breaking changes](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Hermes** (Hermes Agent framework) | **v2026.5.7** documents multiple **P0 security closures** (default redaction, Discord guild scoping, WhatsApp stranger rejection, MCP OAuth TOCTOU, browser SSRF floor, cron prompt-injection scanning, etc.). | upgrade (if deployed) | [Release v2026.5.7](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7) |
| **OpenClaw** | Betas include **Windows sandbox blocked roots** for credential-bearing profile paths, **stricter provider credential resolution** (avoid accidental env binding), **inbound media size caps**, **macOS TLS trust / cert pinning** behavior, plus gateway hardening—security-relevant for multi-channel gateways. | monitor (pre-release) / upgrade on your cadence | [OpenClaw releases](https://github.com/openclaw/OpenClaw/releases) |
| **Antigravity** | No vendor security bulletin tied to Antigravity located in-window beyond general Google messaging. | hold | [Antigravity platform post (context)](https://developers.googleblog.com/en/build-with-google-antigravity-our-new-agentic-development-platform/) |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|---------|--------|------|
| **React (RSC)** | GitHub Security Advisories API shows latest RSC-related advisory **published 2026-05-06** (GHSA-rv78…, **CVE-2026-23870**)—**just before** this digest’s **2026-05-07** inclusive start, but still **high priority** if unpatched. | monitor / upgrade (if RSC endpoints exposed) | [GHSA-rv78-f8rc-xrxh](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh) |
| **TypeScript / Laravel / Livewire / Tailwind / Cypress / Playwright / Jest / GraphQL / PostgreSQL / Sequelize / Python / SQLite / Docker / CI-CD** | No in-window **primary-source** security items verified for this run (timeboxed). | not applicable / monitor | — |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|------------------------------|------|
| **Cursor** | **May 7:** Cursor **3.3**—PR review UX, **Build in Parallel** (async subagents), **Split changes into PRs**, pin skills as quick actions; MCP auth/stale token cleanup; `/multitask` in editor. **May 11:** Microsoft Teams integration; Bugbot effort levels. **May 13:** multi-repo agent environments, Dockerfile build secrets, faster layer caching, env governance. | monitor → upgrade when stable for your org | Parallel agents + env-as-code align with **OpenClaw**/multi-agent posture; MCP fixes matter if you mix **Cursor MCP** with **Hermes MCP** stacks | [05-07-26](https://cursor.com/changelog/05-07-26) · [Teams](https://cursor.com/changelog/microsoft-teams) · [05-11-26](https://cursor.com/changelog/05-11-26) · [05-13-26](https://cursor.com/changelog/05-13-26) |
| **Gemini** | **May 4:** webhooks for batch/long-running ops. **May 5:** multimodal **File Search** w/ `gemini-embedding-2` metadata. **May 6:** Interactions API schema migration announced. **May 7:** **`gemini-3.1-flash-lite` GA** + preview deprecation dates. | upgrade paths for flash-lite users; plan Interactions migration | File Search + embeddings touches **OpenClaw** / **Hermes** RAG patterns; webhooks help **AgentMail**-style async pipelines | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) |
| **Hermes** | **Hermes Agent v0.13.0**: Kanban orchestration, `/goal`, `video_analyze` (**Gemini**-compatible multimodal), provider plugins, MCP transport improvements, Google Chat platform, large reliability batch. | upgrade (exploratory → pinned if used) | **Explicit Gemini tool path** in release notes strengthens Gemini↔Hermes pairing for Tyler’s stack doc | [v2026.5.7](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7) |
| **OpenClaw** | Pre-release train **v2026.5.12-beta.4 → beta.8** (May 13–14): Bedrock/Slack/Vertex plugin externalization, **ACP fallbacks**, gateway SSE/history sequencing, **gateway v4 protocol** requirements, Copilot+**Gemini** image path fixes, rich-reply delivery fixes. | monitor / upgrade on beta tolerance | **Gemini** integration fixes + **ACP** changes overlap **Cursor** agent-control themes | [Releases](https://github.com/openclaw/OpenClaw/releases) |
| **Antigravity** | No dated Antigravity IDE release notes captured in-window. | hold | Ecosystem noise points to **Gemini 3** model family alignment—treat as **model-router** dependency more than a separate changelog surface | [Developers blog (context)](https://developers.googleblog.com/en/build-with-google-antigravity-our-new-agentic-development-platform/) |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|------------------------------|------|
| **React** | No **new** GitHub advisory **published** after **2026-05-07** observed via GitHub API in this pass; ecosystem may still be catching up on **May 6** RSC DoS advisory. | monitor | If you pair **Laravel** or **Next**-style RSC routes, track framework security backports | [React advisories index](https://github.com/facebook/react/security/advisories) |
| **Claude Code** | Not verified in-window (no primary fetch this run). | monitor | Commodity reporting stack in `TECH_STACK.md` | — |
| **Google AI Studio** | Not verified in-window beyond Gemini API surface (often shared backend/docs). | monitor | — |
| **Python / SQLite / AgentMail / Google Workspace CLI / 1Password** | Not verified in-window (timeboxed). | not applicable / monitor | — |
| **Laravel / Livewire / Tailwind / Cypress / Playwright / Jest / GraphQL / PostgreSQL / Sequelize / Git / Bash / Postman / DataGrip / PHP / JS** | Not verified in-window (timeboxed). | not applicable / monitor | — |
| **Docker / CI/CD** | **Cursor** May 13 emphasizes Dockerfile-based agent environments—adjacent learning surface for Docker/CI learners in `TECH_STACK.md`. | monitor | **Cursor ↔ Docker** skill overlap | [05-13-26](https://cursor.com/changelog/05-13-26) |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Interactions API** schema change becomes default | **2026-05-26** default; legacy removed **2026-06-08** | confirmed (vendor dates) | [Breaking changes guide](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026) |
| **Gemini** | **`gemini-3.1-flash-lite-preview`** shutdown | **2026-05-25** | confirmed | [Changelog](https://ai.google.dev/gemini-api/docs/changelog) · [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations) |
| **Cursor** | Blog + docs linked for **cloud agent development environments** (ongoing rollout narrative) | not fixed | tentative | [Announcement](https://cursor.com/blog/cloud-agent-development-environments) · [Setup docs](https://cursor.com/docs/cloud-agent/setup) |
| **Antigravity** | Public roadmap not captured in-window; **Google I/O 2026** is the nearest obvious official cadence for major Google dev-tool announcements | **2026-05-19–20** | tentative | [Google Developers Blog (I/O schedule)](https://developers.googleblog.com/get-ready-for-google-io-livestream-schedule-revealed/) |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **React** | Follow-on RSC hardening continues industry-wide; verify via React blog + GitHub advisories rather than aggregators | — | tentative | [react.dev/blog](https://react.dev/blog) |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Hermes Agent** | **Gemini** | Hermes **v2026.5.7** adds **`video_analyze`** positioned for Gemini / compatible multimodal models. | If Hermes stays exploratory, this is the clearest **native** Gemini coupling to prototype before custom glue. | [Hermes release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7) |
| **OpenClaw** | **Gemini** | OpenClaw betas mention **Copilot OAuth + Gemini image** routing fixes. | Relevant if you mix **Copilot**, **Gemini**, and OpenClaw gateways for image understanding. | [OpenClaw releases](https://github.com/openclaw/OpenClaw/releases) |
| **Cursor** | **Docker / cloud agents** | Dockerfile-based **agent environments**, build secrets, multi-repo envs. | Same operational lane as **OpenClaw** “fleet of agents” posture—shared lessons on secrets + supply chain. | [05-13-26](https://cursor.com/changelog/05-13-26) |
| **Cursor** | **MCP** | May 7 notes: more predictable MCP connections + stale token cleanup on re-auth. | If you run MCP servers for **Hermes**/**OpenClaw**/**Cursor** interchangeably, connection hygiene improvements reduce flaky auth loops. | [05-07-26](https://cursor.com/changelog/05-07-26) |

## Doc maintenance suggestions

- **`docs/TECH_STACK.md` → Models table:** Confirm whether **`gemini-3.1-flash-lite` GA** and **`gemini-3.1-flash-lite-preview`** shutdown (**2026-05-25**) should replace the file’s older “Gemini 3.1 Pro + Gemma 26b / 2.5 Flash + Gemma e2b” shorthand (portfolio drift risk called out in the doc itself).  
- **Core stack naming (2026-05-14):** `docs/TECH_STACK.md` now uses **Hermes** for the Nous **Hermes Agent** framework and **Antigravity** for Google’s IDE (replacing earlier typos *Hermez* and *Anti-Gravity* in the core table). This digest’s tables use the corrected names.  
- **OpenClaw:** `TECH_STACK.md` describes a **private** project narrative; the digest used the **public** `openclaw/OpenClaw` release feed—if Tyler’s fork differs, add a pointer (even non-public) for agents to avoid wrong release comparisons.  
- **`@cursor/sdk`:** Not researched deeply this run; if near-term adoption, add a line item to the stack doc so `/tech-stack-updates` pulls **Cursor SDK** changelog explicitly.

## Searches & sources consulted

- Fetched: [`https://cursor.com/changelog`](https://cursor.com/changelog), [`https://cursor.com/changelog/05-07-26`](https://cursor.com/changelog/05-07-26), [`https://cursor.com/changelog/05-13-26`](https://cursor.com/changelog/05-13-26)  
- Fetched: [`https://ai.google.dev/gemini-api/docs/changelog`](https://ai.google.dev/gemini-api/docs/changelog)  
- Fetched: [`https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7`](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7)  
- Fetched: [`https://github.com/openclaw/OpenClaw/releases`](https://github.com/openclaw/OpenClaw/releases) + GitHub API `repos/openclaw/OpenClaw/releases` for timestamps/tags  
- GitHub API: `repos/facebook/react/security-advisories` (pagination slice) for publish dates  
- Spot-checked: [`https://react.dev/blog`](https://react.dev/blog) (headlines only; no per-post deep fetch for every May item)  
- Context link (not dated in-window): [`https://developers.googleblog.com/en/build-with-google-antigravity-our-new-agentic-development-platform/`](https://developers.googleblog.com/en/build-with-google-antigravity-our-new-agentic-development-platform/)
