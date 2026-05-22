# Tech stack updates — 2026-05-22 (America/New_York)

- **Window:** 2026-05-16 00:00 **America/New_York** (EDT, UTC−04:00) → 2026-05-22 23:59 **America/New_York** (inclusive of both endpoints; same as 2026-05-16 04:00 UTC → 2026-05-23 03:59 UTC)
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- **Gemini + Anti-Gravity (core):** **Google I/O 2026 (May 19–20)** shipped **Gemini 3.5** with **Gemini 3.5 Flash** positioned as the first generally available model in the series (blog dated **May 19, 2026**). Google’s developer highlights post announces **Antigravity 2.0** (standalone desktop app), **Antigravity CLI**, **Antigravity SDK** (preview), **Managed Agents in the Gemini API** (Interactions API + AI Studio), **Google AI Ultra at $100/month** (with a limited-time **$100 Antigravity bonus credits** offer noted as expiring **May 25, 2026** on the developer highlights page), and **AI Studio → Antigravity export**.
- **Hermez / Hermes Agent (core):** **`v0.14.0` (`v2026.5.16`)** published **2026-05-16** — “Foundation Release” with **PyPI `pip install hermes-agent`**, lazy-installed heavy backends + **supply-chain advisory checker**, **Microsoft Teams end-to-end**, **OpenAI-compatible local proxy** for OAuth-backed providers, **`x_search`**, large performance wave (including **~19s cold-start** claims and **180×** `browser_console` speedup claims), plus **12 P0 + 50 P1** issue closures called out in release notes (includes hardening items such as **sudo brute-force blocking** and **tool-error sanitization** per the long-form notes).
- **Cursor (core):** **Composer 2.5** (**May 18, 2026** changelog) with posted token pricing; **Jira** integration (**May 19, 2026**); **Cursor 3.5** (**May 20, 2026**) bringing **Automations** into the Agents Window with **multi-repo** and **no-repo** automations plus a **7-day 50% discount** on runs for newly created automations (per changelog copy).
- **OpenClaw (core):** No **public, versioned “OpenClaw” vendor changelog** located in-window — treat project-local notes and dependency bumps as canonical.
- **Claude Platform + Claude Code (non-core tooling):** Anthropic **May 18** shipped richer **SEC filing** data via the **web search tool**; **May 19** shipped **MCP tunnels** (Research Preview), **self-hosted sandboxes** for Managed Agents, live MCP config updates on active sessions, and **>100K-token tool output spill-to-file** behavior. **Claude Code** published **`v2.1.147` (2026-05-21)** and **`v2.1.148` (2026-05-22)** on GitHub (notably **`/simplify` → `/code-review`**, pinned background session behavior, MCP pagination fixes, Bash exit-code regression fix).
- **Laravel (non-core):** **`v13.10.0`** tagged **2026-05-19** on GitHub (queue/worker/validation/storage-related patch set — see release notes for full PR list).

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|---------|--------|------|
| **Hermez** (Hermes Agent) | **`v0.14.0` (`v2026.5.16`)** release notes highlight **12 P0 + 50 P1** closures and explicit hardening work (e.g. **sudo brute-force blocking**, **dangerous-command bypass closures**, **tool-error sanitization** before re-injection, **supply-chain advisory checker** on install). | **upgrade** for active gateways; **monitor** release notes if only experimenting locally | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16 |
| **Gemini** | **I/O posts** emphasize **frontier safeguards** framing for **Gemini 3.5** (not a CVE bulletin). | **monitor** (policy / safety expectations for production agents) | https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/ |
| **Cursor** | No standalone CVE/advisory surfaced in this scan for the Cursor client itself; new **automations** and **Jira** flows expand **cloud-agent** attack surface (credentials, repo scoping, ticket data). | **monitor** (review integrations if adopted) | https://cursor.com/changelog/05-20-26 |
| **OpenClaw** | No public security bulletin keyed to that project name. | **not applicable** (vendor channel) | — |
| **Anti-Gravity** | No CVE-style advisory dated in-window located; **I/O** introduces a larger **ecosystem surface** (desktop app, CLI, SDK, enterprise paths). | **monitor** | https://antigravity.google/blog/google-io-2026 |

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|---------|--------|------|
| **Claude Platform (Managed Agents + MCP)** | **MCP tunnels** (Research Preview) and **self-hosted sandboxes** change trust boundaries for MCP + tool execution; **large tool outputs** may spill to sandbox files (>100K tokens). | **monitor** → **defer** until threat model + networking posture are explicit | https://docs.anthropic.com/en/release-notes/overview |
| **React** | No **new** `facebook/react` **release tag** dated **2026-05-16 → 2026-05-22** observed in this pass (latest observed on the releases index remains **May 6, 2026** patch lines). | **hold** / **monitor** (prior May security train still applies if not patched) | https://github.com/facebook/react/releases |
| **Playwright** | No **`v1.61.0`** tag found at `https://github.com/microsoft/playwright/releases/tag/v1.61.0` (**404** at time of fetch) — **no confirmed new stable Playwright semver** in-window from this check. | **hold** | https://github.com/microsoft/playwright/releases |

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| **Gemini** | **Gemini 3.5 Flash** announced **May 19, 2026** as first **GA** model in the **Gemini 3.5** series; blog states availability via **Antigravity**, **Gemini API / AI Studio / Android Studio**, **Gemini Enterprise Agent Platform**, **Gemini Enterprise**, **Gemini app**, and **AI Mode in Search**. | **monitor** → **upgrade** only after confirming **model IDs**, quotas, and pricing in **your** Google surfaces | https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/ |
| **Gemini** | **I/O developer highlights (May 19, 2026):** **Managed Agents in the Gemini API** (Interactions API + AI Studio), **AI Studio mobile pre-register**, **Workspace API** integration for agents, **native Android build-in-AI-Studio** flow + **Play Console test-track publishing** mention, **Gemini XPRIZE** hackathon announcement. | **monitor** | https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/ |
| **Anti-Gravity** | **Antigravity @ I/O roundup** summarizes **Antigravity 2.0 desktop**, **CLI**, **SDK preview**, **Managed Agents via Gemini API**, **AI Studio Build → Antigravity export**, **enterprise distribution** via **Gemini Enterprise Agent Platform**, **scheduled tasks**, **projects/worktrees**, **live voice transcription** (Gemini Audio), plus links to Android/Firebase/Chrome skills. | **monitor** (large surface-area release; prefer staged adoption) | https://antigravity.google/blog/google-io-2026 |
| **Cursor** | **Composer 2.5** (**May 18, 2026**) — changelog lists **Standard** and **Fast (default)** $/MTok pricing and notes **double usage for the first week**. | **upgrade** when convenient | https://cursor.com/changelog/composer-2-5 |
| **Cursor** | **Jira** integration (**May 19, 2026**) — assign items to Cursor / `@Cursor` in comments; requires **Jira Commercial Cloud with Rovo enabled** per changelog. | **monitor** (only if Jira+Rovo is in use) | https://cursor.com/changelog/05-19-26 |
| **Cursor** | **3.5 / Automations** (**May 20, 2026**) — automations in **Agents Window**, **multi-repo** + **no-repo** automations, marketplace templates; **50% off** agent runs for newly created automations for **7 days** (per changelog). | **monitor** | https://cursor.com/changelog/05-20-26 |
| **Hermez** | **`v0.14.0` (`v2026.5.16`)** — see executive summary for headline feature set (PyPI packaging, Teams, proxy, `x_search`, performance, Windows beta, etc.). | **upgrade** with a **wide QA matrix** (breaking surface area + install-path changes) | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16 |
| **OpenClaw** | No upstream changelog keyed to that name. | **not applicable** | — |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| **Claude Platform** | **May 18, 2026** — web search tool returns richer **SEC filing** data (per release notes). | **monitor** | Relevant if Tyler builds **finance-tuned** agents | https://docs.anthropic.com/en/release-notes/overview |
| **Claude Platform** | **May 19, 2026** — **MCP tunnels** (Research Preview), **self-hosted sandboxes**, live MCP tool config updates on active sessions, **>100K-token** tool output spill-to-file behavior. | **monitor** | Pairs with **MCP-heavy** Cursor/Hermes setups | https://docs.anthropic.com/en/release-notes/overview |
| **Claude Code** | **`v2.1.147` (2026-05-21)** — `/code-review`, background session pinning, MCP pagination fixes, Windows/GNOME fixes, etc. | **upgrade** | Commodity reporting stack lists **Claude Code + Cursor** | https://github.com/anthropics/claude-code/releases/tag/v2.1.147 |
| **Claude Code** | **`v2.1.148` (2026-05-22)** — fixes Bash exit code **127** regression from **2.1.147**. | **upgrade** if on **2.1.147** | Hotfix train | https://github.com/anthropics/claude-code/releases/tag/v2.1.148 |
| **Laravel** | **`v13.10.0`** published **2026-05-19** (GitHub tag timestamp). | **monitor** | Adjacent to **Livewire** stacks when upgrading framework minors | https://github.com/laravel/framework/releases/tag/v13.10.0 |
| **TypeScript / Tailwind / Cypress / Playwright / Jest / GraphQL / PostgreSQL / AgentMail / SQLite / Python** | No additional **in-window** primary-source rows captured beyond the tables above in this pass (time concentrated on **I/O + core agents**). | **hold** | — | — |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| **Gemini** | **Gemini 3.5 Pro** — multiple official posts state it is **in internal use** with rollout **next month** (relative to **May 19, 2026** copy). | **June 2026** (wording: “next month”) | **tentative** | https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/ |
| **Anti-Gravity** | Continued ecosystem expansion (skills verticals, enterprise paths) described as ongoing in **I/O** roundup posts. | rolling | **tentative** | https://antigravity.google/blog/google-io-2026 |
| **Cursor** | Promotional pricing windows (e.g. **Composer 2.5** “first week” double usage; **Automations** 7-day discount) are **time-bounded** per changelog text. | see posts | **confirmed** (as marketing timeboxes) | https://cursor.com/changelog/composer-2-5 · https://cursor.com/changelog/05-20-26 |
| **OpenClaw** | — | — | — | — |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **PostgreSQL** | Next quarterly **minor release** cadence per official roadmap page. | **2026-08-13** (second Thursday of August) | **confirmed** (schedule pattern) | https://www.postgresql.org/developer/roadmap/ |
| **MCP** | No new **spec repo tag** observed in-window (latest remains **`2025-11-25`** on GitHub from prior check pattern). | — | **tentative** / **monitor** | https://github.com/modelcontextprotocol/modelcontextprotocol/releases |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Gemini** | **Anti-Gravity** | **Gemini 3.5 Flash** called out as default in **Antigravity** with additional latency claims (“**12× faster** on Antigravity” for a limited time per Antigravity I/O roundup). | Directly touches **OpenClaw** doc line positioning **Antigravity + Gemini** | https://antigravity.google/blog/google-io-2026 |
| **Gemini API** | **Anti-Gravity harness** | **Managed Agents** in **Gemini API** described as powered by the **Antigravity agent harness** + **Gemini 3.5 Flash** via **Interactions API** / **AI Studio**. | Same “harness” story across **cloud API** and **IDE** surfaces | https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/ |
| **Google AI Studio** | **Anti-Gravity** | **Export** flow from **AI Studio Build** to **Antigravity** called out to carry **code + full agent conversation context**. | Bridges **Google AI Studio** experiments → local **Antigravity** workflows | https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/ |
| **Cursor** | **Atlassian Jira** | **May 19** Jira integration for cloud agents + PR links back to Jira. | Another **work-tracker × agent** integration alongside **Teams** (May 11 in prior week) | https://cursor.com/changelog/05-19-26 |
| **Cursor** | **Cursor Automations** | **May 20** automations include **Slack**/**Stripe**/**Databricks**-style templates (per changelog). | Overlaps **commodity reporting** “signals from tools” direction — still validate privacy/finance boundaries | https://cursor.com/changelog/05-20-26 |
| **Hermez** | **Microsoft Teams** | Hermes **`v0.14.0`** ships **end-to-end Teams** (Graph + webhooks + outbound). | Pairs with **Cursor Teams** trajectory for orgs standardized on **Microsoft** | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16 |
| **Hermez** | **OAuth “OpenAI-compatible” tooling** | `hermes proxy` exposes **OpenAI-compatible** localhost for OAuth-backed providers (per release notes). | Lets other **agent CLIs** reuse subscription auth — useful for polyglot stacks | https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16 |
| **Anthropic Claude Platform** | **MCP + managed agents** | **MCP tunnels** + **self-hosted sandboxes** + spill-to-file for huge tool outputs. | If Tyler runs **MCP servers on private networks**, this is the official primitive to validate against **1Password**/network zoning | https://docs.anthropic.com/en/release-notes/overview |

## Doc maintenance suggestions

- **Model table drift:** `TECH_STACK.md` still lists **“Gemini 3.1 Pro + Gemma 26b”** / **“Gemini 2.5 Flash + Gemma e2b”** style names, while **May 19, 2026** posts center **Gemini 3.5 Flash** as the new default in multiple surfaces — reconcile **live** model strings before changing routing logic.
- **Anti-Gravity naming:** Keep **Anti-Gravity** vs **Antigravity** spelling consistent with vendor branding when updating docs (URLs use `antigravity.google`).
- **Pricing / plans:** If Tyler evaluates **Google AI Ultra ($100/mo)** or **Composer 2.5** token pricing, capture decisions in `_private` finance notes — do not invent numbers beyond what’s quoted on official pages linked here.

## Searches & sources consulted

- Read **`docs/TECH_STACK.md`**, **`docs/BOUNDARIES.md`**, and skimmed **`docs/career-fit-context.md`** for risk posture.
- Fetched: **Cursor** changelog index + **`/changelog/composer-2-5`**, **`/changelog/05-19-26`**, **`/changelog/05-20-26`**; **Hermes** releases index + **`v2026.5.16` tag**; **Anthropic** platform release notes (top section); **Google** posts (**Gemini 3.5 model blog**, **I/O developer highlights**); **Antigravity** I/O roundup blog; **Laravel** **`v13.10.0` tag**; **React** releases index; **Playwright** releases index + attempted **`v1.61.0` tag (404)**; **Claude Code** releases index + **`v2.1.147`**/**`v2.1.148` tags**; **PostgreSQL** roadmap.
- Light **web search** used only as a compass for **I/O** topics; benchmark percentages and pricing claims above are copied only from **fetched** Google/Antigravity/Cursor pages.
