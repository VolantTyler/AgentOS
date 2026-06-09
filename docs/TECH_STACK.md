# Tech stack — Tyler (professional)

**Purpose:** Single place for agents to see **languages, tools, and project stacks** without opening `_private`. Keep this file aligned with reality; when something changes, update here and optionally mirror in `docs/_private/context-portfolio/05-tools-and-systems.md` on trusted machines.

**Note:** Vendor product and model names drift. For **decisions** (pricing, APIs, deprecations), verify against **official docs / release notes** — see [`BOUNDARIES.md`](BOUNDARIES.md). For recurring churn, run **`/tech-stack-updates`** (see [`.cursor/commands/tech-stack-updates.md`](../.cursor/commands/tech-stack-updates.md)) to generate a weekly digest via the **`stack-radar`** subagent.

---

## Core stack (priority in `/tech-stack-updates` digests)

These tools are the **default core set** for weekly tech-stack research: agents should **research them first**, surface them first in the executive summary when anything is material, and **separate** digest content into **core stack** vs **non-core stack** (everything else this file inventories).

| Name in reports | Where it shows up in this doc |
|-----------------|-------------------------------|
| **Cursor** | AI-assisted development; AgentOS tooling. |
| **Gemini** | Models & inference; Gemini AI Coach when workflow-relevant. |
| **Hermes** | **Hermes Agent** (Nous Research) — open-source agent framework; portfolio line is exploratory. `/tech-stack-updates` research target: [`NousResearch/hermes-agent`](https://github.com/NousResearch/hermes-agent) releases and security notices. |
| **OpenClaw** | Active project — multi-agent WoW auction analytics. |
| **Antigravity** | Google’s **Antigravity** IDE (agent-first development). In this doc: AI-assisted development and OpenClaw orchestration (HITL, gateway allowlists) — see **Antigravity** under [AI-assisted development](#ai-assisted-development-today). |
| **ChatGPT** | OpenAI **ChatGPT** (web/app, models-in-product, account features). `/tech-stack-updates` research target: [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgptrelease-notes) (Help Center); pair with [Model release notes](https://help.openai.com/en/articles/9624314-model-release-notes) when model defaults shift. |
| **Codex** | OpenAI **Codex** coding agent (CLI, app, harness bumps in **OpenClaw**). `/tech-stack-updates` research target: [Codex changelog](https://developers.openai.com/codex/changelog) and [`openai/codex` releases](https://github.com/openai/codex/releases). |

Tyler may **override** the set for a single run by naming tools in chat; recurring changes belong in this table (git).

---

## How to read this doc

| Column | Meaning |
|--------|--------|
| **Comfort** | Rough self-assessment from portfolio — not a credential. |
| **Context** | Where it shows up today or historically. |

---

## Professional baseline (W2-era web)

Strongest depth in **front-end** and **UI delivery**; back-end treated as supporting / guided work.

| Area | Technologies | Comfort | Context |
|------|----------------|---------|---------|
| UI | React, TypeScript | High | ~5y nonprofit scale |
| UI (alt stack) | Laravel, Livewire | Solid | ~1y core app |
| Styling | TailwindCSS, SCSS/SASS, CSS | High | |
| Testing | Cypress, Playwright, Jest, PHPUnit | Familiar | E2E + unit/integration |
| APIs | GraphQL (transition/migration work), REST basics | GraphQL stronger | |
| Data | PostgreSQL, Sequelize | Working / not deepest | |
| Design / docs | Figma, Adobe XD, Storybook | High | DCL at NAMI |
| A11y | Audits + remediation | Strong | Portfolio cites major score lift at NAMI |
| Tooling | Git, Bash, Postman, DataGrip | Daily / regular | |
| Web core | PHP, JavaScript, HTML5/CSS | Strong | Also Volant client work |

**Domains:** Nonprofit / mission-driven products; **high-traffic** public web (portfolio cites large annual traffic and peak concurrent load at Charity Navigator).

---

## AI-assisted development (today)

| Tool | Role |
|------|------|
| **Cursor** | Primary AI-assisted IDE (commodity project; AgentOS repo). |
| **Claude Code** | AI coding tool used on commodity reporting system. |
| **Antigravity** | Multi-agent **framework + IDE** (OpenClaw); HITL terminal approvals; subagent gateway whitelisting. |
| **Google AI Studio** | Small experiments / prototypes. |
| **ChatGPT** | General OpenAI chat / reasoning surface (core stack for weekly monitoring). |
| **Codex** | OpenAI terminal coding agent; also integrated via **OpenClaw** auth profiles and version pins. |

---

## Models & inference (portfolio snapshot)

Hybrid routing by task complexity (exact tiers evolve — confirm in Google’s current docs).

| Tier (as described) | Models (as described in portfolio) |
|---------------------|--------------------------------------|
| “Heavier” reasoning | Gemini 3.1 Pro + Gemma 26b |
| Utility / faster | Gemini 2.5 Flash + Gemma e2b |

**Ecosystem bias:** Portfolio notes **Google / Gemini subscription** as a practical default vs other paid API suites.

**Other:** **Gemini AI Coach** — long-running coordination / memory support (treat as workflow tool, not a code runtime).

---

## Data, automation, secrets

| Piece | Use |
|-------|-----|
| **Python** | ETL, scraping, cleaning, structuring (e.g. OpenClaw pipelines). |
| **SQLite** | Agent / app state for agentic projects. |
| **AgentMail** | Inbound email for commodity reporting workflow. |
| **Google Workspace CLI** | Automated reporting (per OpenClaw notes). |
| **1Password** | Secrets management for agent environments. |

---

## Active & recent projects (stack-by-project)

### OpenClaw — multi-agent WoW auction analytics

- **Orchestration:** Antigravity; specialized agents (orchestrator/PM, analyst, UI dev patterns per portfolio).
- **Models:** Hybrid Gemini + Gemma strategy (see table above).
- **Data path:** Python ETL → structured data; SQLite state; autonomous scrape/clean/structure (respect ToS / site rules in real use).
- **Safety / ops:** HITL approvals; strict subagent tool allowlists.
- **Reporting:** Google Workspace CLI integration noted in portfolio.

### Commodity reporting — email → analyst reports

- **Build tools:** Claude Code + Cursor.
- **Intake:** AgentMail (stakeholder forwards business email).
- **Goal shape:** Scheduled analyst summaries (e.g. weekly); requirements still evolving.

### Volant Web Design (sole prop, resumed)

- **Stack:** JavaScript, PHP, HTML5/CSS.
- **Services:** Build/design, SEO, analytics reporting for small clients.

### Hermes Agent

- **Status:** Exploratory / early dabbling — not a primary stack yet.

### AgentOS (this repo)

- **Tooling:** Cursor; markdown-first; future **`@cursor/sdk`** per [`RUNTIME_AND_AGENTS.md`](RUNTIME_AND_AGENTS.md) when code-driven agents land.

---

## Learning & “what’s new” inputs

- **AI Daily Brief** — primary podcast-style AI news habit (verify attribution before citing publicly).
- **AI Engineer: Europe** — talks / conference content on YouTube.

---

## Emerging / stretch

- **Docker** — learning.
- **CI/CD** — learning.
- **Project management** — developing alongside agent orchestration practice.

---

## Intentional gaps (do not assume)

- Not positioning as deep **backend architect** or **DevOps owner** without explicit task scope.
- **Commodity / finance domain** for the reporting project: learning, easy to mis-spec — requirements work comes first.
- **Model IDs and product names** in this file may be outdated; confirm before migrations.

---

## Changelog

- **2026-05-28:** Added **ChatGPT** and **Codex** to the **core stack** table for `/tech-stack-updates` priority monitoring; aligned **tech-stack-pulse** skill prose and reference entry points.
- **2026-05-14:** Corrected **core stack** names in this table: **Hermes** (was a typo *Hermez*) for the Hermes Agent framework, and **Antigravity** (was a typo *Anti-Gravity*) for Google’s IDE; aligned `.cursor/skills/tech-stack-pulse/SKILL.md` and the `2026-05-14` stack digest wording.
- **2026-05-13:** Documented **core stack** (Cursor, Gemini, Hermes, OpenClaw, Antigravity) for `/tech-stack-updates` digest priority and core vs non-core sectioning in the pulse skill.
- **2026-05-13:** Initial consolidation from `identity-brief.md` + `_private/context-portfolio` (03, 05, 09).
