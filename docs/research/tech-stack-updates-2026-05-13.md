# Tech stack updates — 2026-05-13 (America/New_York)

- **Window:** `2026-05-07 00:00:00` Eastern Daylight Time (EDT, UTC−4) → `2026-05-13 23:59:59` EDT — i.e. **`2026-05-07 04:00:00 UTC`** through **`2026-05-14 03:59:59 UTC`**
- **Tech stack source:** `docs/TECH_STACK.md` (Tyler’s documented **my tech stack** for AgentOS; file changelog **2026-05-13**)

## Executive summary

- **Cursor (primary IDE):** Shipped **3.3 on 2026-05-07** with in-editor PR review tabs, **Build in Parallel** / async subagents, **Split changes into PRs**, pinned **Skills** quick actions, **`/multitask`**, Explore-subagent model controls, and **MCP** reliability/auth fixes. **2026-05-11** entries add **Microsoft Teams** integration and **Bugbot** “effort level” controls (with usage-based billing note).
- **Claude Code:** **v2.1.139 (2026-05-11)** and **v2.1.140 (2026-05-12)** on GitHub add **Agent view**, **`/goal`**, MCP env parity (**`CLAUDE_PROJECT_DIR`** for stdio servers), MCP stream body cap (**16 MB** per SSE frame), and multiple stability fixes. **Monitor** if you rely on API-key auth vs claude.ai features (release notes describe feature gating when API keys are set).
- **Front-end delivery:** **Tailwind CSS v4.3** blog-dated **2026-05-08** (bundles v4.2 highlights + v4.3 utilities). **Playwright v1.60.0** published **2026-05-11** with **breaking removals** of long-deprecated APIs—plan upgrades intentionally.
- **Testing:** **Jest v30.4.0 (2026-05-07)** + **v30.4.1 (2026-05-08)** bring a major **runtime** rewrite (ESM prep), **`require()` of ESM** on Node **24.9+**, React **19** in `pretty-format`, and **`--collect-tests`**; maintainers warn about possible regressions. **Cypress v15.15.0 (2026-05-12)** upgrades **socket.io** stack citing GitHub Advisory **GHSA-677m-j7p3-52f9** (DoS class) in official changelog.
- **Python / agent ETL:** **Python 3.14.5** released **2026-05-10**—notably **reverts the incremental GC** from 3.14.0–3.14.4 back to the **3.13-style generational** collector due to production memory-pressure reports.
- **MCP ecosystem:** Official **MCP Python SDK v1.27.1 (2026-05-08)**—Pydantic **2.13** compatibility, OAuth client metadata coercion, **httpx `<1.0.0`**, SSE error import refactor.
- **No dated official signal in-window** (honest **no signal** for this digest): **React** npm/GitHub tags on **2026-05-06** are **just before** the stated window; **Laravel 13.8.0**, **Livewire v4.3.0**, **SQLite 3.53.1**, and Google’s **Gemini File Search** multimodal post are **2026-05-05** or earlier per vendor pages checked—listed only in audit trail, not as “7d shipped.”

## Security & urgent

| Item | Finding | Action | Link |
|------|---------|--------|------|
| Cypress | **v15.15.0** changelog: upgraded **socket.io / socket.io-client / socket.io-parser** explicitly to address a **Denial of Service** issue referenced as **GHSA-677m-j7p3-52f9** (GitHub Advisory link in upstream changelog). | **upgrade** (if on Cypress **<15.15.0** and you accept release QA) | [Cypress App changelog §15.15.0](https://docs.cypress.io/app/references/changelog#15-15-0) · [GitHub release v15.15.0](https://github.com/cypress-io/cypress/releases/tag/v15.15.0) |
| Claude Code | **v2.1.139** caps **HTTP/SSE MCP** non-protocol response bodies at **16 MB per SSE frame** (mitigates unbounded growth class issue described in release notes). | **monitor** / **upgrade** if you run many or untrusted MCP servers | [anthropics/claude-code v2.1.139](https://github.com/anthropics/claude-code/releases/tag/v2.1.139) |
| Cursor | Changelog lists **MCP auth** edge-case fixes (transient **401**, stale credentials) alongside general reliability fixes—no standalone CVE cited in the fetched changelog text. | **monitor** (routine update hygiene) | [Cursor changelog 2026-05-07](https://cursor.com/changelog/05-07-26) |
| Docker / DB / secrets tools | No **Docker Engine** dated publish in-window verified from the Docker docs snapshot searched; **no signal** for **PostgreSQL**, **1Password**, **AgentMail**, **Google Workspace CLI** in this pass. | **hold** / **monitor** | — |

## Releases & changes (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-----------------|------------------------------|------|
| **Cursor** | **3.3 (2026-05-07):** PR **Reviews / Commits / Changes** tabs; **Build in Parallel**; **Split changes into PRs**; pin **Skills**; **`/multitask`**; Explore subagent model controls; MCP + terminal fixes. **2026-05-11:** **Teams** @mention agent; **Bugbot** effort levels. | **monitor** → **upgrade** when convenient (IDE auto-update path); review **Teams** for org policy | Strong fit with **multi-agent IDE** + **Git** PR flow; MCP fixes pair with MCP-heavy stacks | [Changelog hub](https://cursor.com/changelog) · [3.3 / 2026-05-07](https://cursor.com/changelog/05-07-26) · [Teams](https://cursor.com/changelog/microsoft-teams) · [Bugbot effort](https://cursor.com/changelog/05-11-26) |
| **Claude Code** | **v2.1.139–140** as above; **v2.1.140** subagent type matching + `/goal` hook interaction fixes. | **monitor** / **upgrade** after skimming breaking behavioral notes (API key vs claude.ai gating) | MCP **`CLAUDE_PROJECT_DIR`**, **`/goal`**, Agent view align with **multi-session** orchestration | [v2.1.139](https://github.com/anthropics/claude-code/releases/tag/v2.1.139) · [v2.1.140](https://github.com/anthropics/claude-code/releases/tag/v2.1.140) |
| **TailwindCSS** | **v4.3** (post **2026-05-08**) documents scrollbar utilities, **`@container-size`**, `zoom-*`, `tab-*`, stacked/compound `@variant`, `--default()` for functional utilities; post also summarizes **v4.2** features. | **monitor** (utility/CSS surface expansion; check design-system conventions) | **Laravel**/**Livewire** UIs often co-locate Tailwind—no joint vendor announcement found | [Tailwind blog: v4.3](https://tailwindcss.com/blog/tailwindcss-v4-3) |
| **Playwright** | **v1.60.0** (**2026-05-11**): HAR on tracing, **`locator.drop()`**, aria snapshot **`boxes`**, **`test.abort()`**, context/page lifecycle events, reporter improvements; **breaking removals** listed in release notes. | **defer** until you can run a focused regression pass; then **upgrade** | **AI**-oriented aria snapshot `boxes` option called out in upstream notes | [v1.60.0 release](https://github.com/microsoft/playwright/releases/tag/v1.60.0) |
| **Jest** | **v30.4.0 (2026-05-07)** major runtime work + **`require()` of ESM** (Node **24.9+**), Temporal fake timers (Node **26**), React **19** `pretty-format`, **`--collect-tests`**. **v30.4.1 (2026-05-08)** runner tuple opts + CJS-from-ESM default export alignment. | **monitor** / pilot on one repo (maintainers note regression risk) | Pairs with **React 19** migration testing | [v30.4.0](https://github.com/jestjs/jest/releases/tag/v30.4.0) · [v30.4.1](https://github.com/jestjs/jest/releases/tag/v30.4.1) |
| **Cypress** | **v15.15.0 (2026-05-12)** per GitHub timestamp; changelog section lists fixes + dependency upgrades (incl. socket.io DoS advisory link). | **upgrade** for security-related dependency bump | E2E overlap with **Playwright**—compare runner upgrade cost if both persist | [v15.15.0](https://github.com/cypress-io/cypress/releases/tag/v15.15.0) · [Changelog §15.15.0](https://docs.cypress.io/app/references/changelog#15-15-0) |
| **Python** | **3.14.5 (2026-05-10)** maintenance; **GC strategy revert** from incremental (3.14.0–3.14.4) to generational (3.13-style) documented on python.org. | **upgrade** if you are on **3.14.x <3.14.5** and saw memory pressure; else **hold** | Relevant to **OpenClaw**/**ETL**-style long runners | [Python 3.14.5 release](https://www.python.org/downloads/release/python-3145/) |
| **MCP** (Python SDK) | **v1.27.1 (2026-05-08)** patch fixes listed above. | **monitor** / **upgrade** if you ship MCP servers in Python | Complements **Cursor**/**Claude Code** MCP client fixes same week | [v1.27.1](https://github.com/modelcontextprotocol/python-sdk/releases/tag/v1.27.1) |
| **@cursor/sdk** | Docs still describe **public beta**; **no versioned npm changelog** captured in this run. | **monitor** (align with Cursor IDE cadence) | Same **local vs cloud** runtime model as IDE agents | [TypeScript SDK docs](https://cursor.com/docs/api/sdk/typescript) |
| **React** | **No in-window** dated release verified here (tags such as **v19.0.6** observed on **2026-05-06**, before window start). | **hold** | **Jest 30.4.0** mentions **React 19** snapshot formatting | [React releases index](https://github.com/facebook/react/releases) |
| **TypeScript** | **No signal** (no authoritative May **7–13** release post opened in this pass). | **hold** | Compiler coupling with React/Node remains business-as-usual | [TypeScript blog hub](https://devblogs.microsoft.com/typescript/) |
| **Laravel / Livewire** | **No signal** in-window (framework **v13.8.0** and Livewire **v4.3.0** timestamps were **before 2026-05-07** in the checks used). | **hold** | — | [Laravel releases](https://laravel.com/docs/releases) · [Livewire releases](https://github.com/livewire/livewire/releases) |
| **SCSS/SASS**, **PHPUnit**, **GraphQL**, **REST**, **PostgreSQL**, **Sequelize**, **Figma**, **Adobe XD**, **Storybook**, **Git**, **Bash**, **Postman**, **DataGrip**, **PHP**, **JS/HTML/CSS**, **Antigravity/OpenClaw**, **Google AI Studio**, **Gemini** (models), **Gemini AI Coach**, **SQLite**, **AgentMail**, **Google Workspace CLI**, **1Password**, **Docker**, **CI/CD** | **No credible dated official item** confined to this window in the time available—treat as **no signal** (not “nothing happened industry-wide”). | **hold** / **monitor** via your normal channels | — | — |

## Upcoming features & roadmaps (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| **Gemini 3.1 Pro** (context only; **outside 7d**) | Google’s **Feb 19, 2026** post positions **3.1 Pro** as rolling out in **preview** across API / **AI Studio** / **Antigravity** / CLI, with GA described as coming after preview validation. | “**soon**” (non-specific) | **tentative** | [Gemini 3.1 Pro announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/) |
| **Cursor SDK** | Documentation marks **public beta**; APIs **may change** before GA. | Unstated | **tentative** | [Cursor SDK docs](https://cursor.com/docs/api/sdk/typescript) |
| **Other checklist lines** | **No additional official roadmap lines** opened for May **7–13** in this pass. | — | **no signal** | — |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| **Cursor** | **MCP** | **2026-05-07** changelog: “more predictable” MCP connections; stale token cleanup; MCP **401** fixes. | Same week as **MCP Python SDK** patch and **Claude Code** MCP transport fixes—good moment to standardize MCP auth hygiene across IDEs. | [Cursor 3.3 changelog](https://cursor.com/changelog/05-07-26) |
| **Cursor** | **Git / PR workflow** | Unified **PR review** + **split PRs** + **parallel** subagent execution. | Matches portfolio emphasis on **multi-agent** delivery and reviewable units of work. | [Cursor 3.3 changelog](https://cursor.com/changelog/05-07-26) |
| **Claude Code** | **MCP + monorepo** | **`CLAUDE_PROJECT_DIR`** for stdio MCP servers; reconnect picks up **`.mcp.json`** edits (**v2.1.139**). | Aligns MCP servers with hook cwd semantics—fewer “wrong root” tool failures in multi-package repos. | [v2.1.139](https://github.com/anthropics/claude-code/releases/tag/v2.1.139) |
| **Playwright** | **AI-assisted testing** | **v1.60.0** extends aria snapshot tooling (incl. **`boxes`** option described upstream for **AI consumption**). | If you generate or review tests with agents, snapshot ergonomics matter. | [v1.60.0](https://github.com/microsoft/playwright/releases/tag/v1.60.0) |
| **Jest** | **React** | **v30.4.0** notes **React 19** support in **`pretty-format`**. | Useful when **React** upgrades and snapshot tests must stay trustworthy. | [v30.4.0](https://github.com/jestjs/jest/releases/tag/v30.4.0) |
| **Tailwind** | **React / Vite / webpack** | **v4.2** section highlights **`@tailwindcss/webpack`** and Turbopack compatibility claims. | Performance-sensitive **React** doc sites / dashboards. | [Tailwind v4.3 blog](https://tailwindcss.com/blog/tailwindcss-v4-3) |

## Doc maintenance suggestions

- **Model naming drift:** `docs/TECH_STACK.md` lists **“Gemini 3.1 Pro + Gemma 26b”** and **“Gemma e2b”**—confirm against **current** Google AI / Gemma naming (these strings look error-prone vs common public marketing strings). Official **3.1 Pro** post: [Gemini 3.1 Pro](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/).
- **Laravel major version:** upstream **Laravel 13.x** release cadence is active in 2026; if the doc implies an older major anywhere else, reconcile wording with what W2-era repos actually pin.
- **Cursor SDK:** when `@cursor/sdk` becomes non-beta in docs, add a one-line **“GA date + breaking note”** pointer from `TECH_STACK.md` / `RUNTIME_AND_AGENTS.md` (no edit performed here).

## Searches & sources consulted

- Read **`docs/BOUNDARIES.md`**, **`docs/TECH_STACK.md`**, **`.cursor/skills/tech-stack-pulse/SKILL.md`**, **`reference.md`**.
- Fetched: **Cursor** changelog hub + **2026-05-07** deep link; **Tailwind** v4.3 blog; **Playwright** `v1.60.0` GitHub release; **Claude Code** `v2.1.139` / `v2.1.140` GitHub releases; **Jest** `v30.4.0` / `v30.4.1` GitHub releases; **Cypress** `v15.15.0` GitHub release + **Cypress docs** changelog anchor; **Python** `3.14.5` python.org release page; **MCP Python SDK** `v1.27.1` GitHub release; **Cursor SDK** docs page; **Gemini 3.1 Pro** Google blog (for doc-drift context, **Feb 2026**).
- Web search used to locate candidates; **dates were cross-checked** against the fetched primary pages before inclusion in the **7d** tables.
- Explicit **not in-window** checks (boundary hygiene): **React** tags dated **2026-05-06**; **Laravel v13.8.0** references **2026-05-05**; **Livewire v4.3.0** **2026-05-01**; **SQLite 3.53.1** **2026-05-05** per sqlite.org listings surfaced in search (not re-fetched to file here).
