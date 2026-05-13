---
name: tech-stack-pulse
description: >-
  Surfaces changes in the last seven days affecting tools and languages listed in
  docs/TECH_STACK.md (Tyler’s tech stack as documented in this repo): release notes,
  security advisories, roadmap items, and cross-tool synergies or integrations.
  Prioritizes the **core stack** (see `docs/TECH_STACK.md` → “Core stack”) and writes
  **separate** digest sections for core vs non-core inventory. Produces upgrade/monitor/hold
  recommendations with evidence links. Use when the user runs /tech-stack-updates, asks
  for a weekly stack digest, or wants to know whether to upgrade Cursor, Gemini, React,
  Laravel, MCP-related tooling, or adjacent stack elements; suitable for cron-style weekly prompts.
disable-model-invocation: true
---

# Tech stack pulse — weekly updates & upgrade posture

**Tyler’s tech stack** in this workflow means **the inventory in [`docs/TECH_STACK.md`](../../../docs/TECH_STACK.md)** for AgentOS (plain-language “my tech stack,” versioned in Git). If Tyler names extra tools in chat, include them for this run only and suggest adding them to `TECH_STACK.md` if they recur.

**Core stack** means the **default core set** named in `docs/TECH_STACK.md` under **“Core stack (priority in `/tech-stack-updates` digests)”** (currently **Cursor**, **Gemini**, **Hermez**, **OpenClaw**, **Anti-Gravity**, with any **mapping notes** in that table treated as authoritative for what to research). Everything else in the full checklist is **non-core** for sectioning purposes.

## Preconditions

1. Read **`docs/TECH_STACK.md`** end-to-end and **derive a checklist** of tracked products/languages/frameworks (include AI tools, models-as-services, data tools, and **emerging** items like Docker/CI/CD if listed). **Extract the core stack** from the **Core stack** section (names + mapping notes).  
2. Read **[`docs/BOUNDARIES.md`](../../../docs/BOUNDARIES.md)** — no fabricated releases; cite **official** changelogs, GitHub releases, security bulletins, or vendor blogs that **link** to primary sources.

## Time window

- **Default:** the **last 7 days** ending **today** (in **America/New_York**), unless the parent passes another anchor or span.  
- State the exact UTC/ET window in the output header.

## What to research (per item, prioritize)

**Order:** Complete **core stack** items first (security → shipped → roadmap for each mapped product), then the **non-core** remainder of the checklist using the same depth. When time or sources are thin, **do not** drop core items — trim non-core detail first.

1. **Security / trust:** CVEs, security patches, supply-chain notices for anything in the checklist (even if release is older but **disclosure** landed in the window).  
2. **Shipped changes:** stable/beta releases, deprecations, breaking API changes, pricing changes **only** if sourced.  
3. **Roadmaps & previews:** upcoming features **only** with **official** roadmap, conference session, RFC, or changelog “coming soon” lines — label **tentative** with date/source.  
4. **Synergies & integrations:** cross-stack news (e.g. new **MCP** server for a tool Tyler uses; **Cursor** x **Git** workflow; **Gemini** API changes affecting **Anti-Gravity** / **Antigravity** setups; **Laravel** + **Livewire** joint releases; **React** + **TypeScript** compiler coupling). Dedicate a **section** to this; **lead with rows where at least one side is core stack** (then other pairs); empty is OK if nothing credible turned up.

## Search strategy

- Prefer **official** release pages, GitHub `releases`, `CHANGELOG.md`, Google AI release blogs, Anthropic/OpenAI/LangChain/etc. **only** when those tools appear in `TECH_STACK.md`.  
- Use web search/fetch when available; **quote version numbers** only from sources you actually opened.  
- If the stack doc is **stale** (e.g. old model IDs), note **doc drift** once and still research the **current** vendor names found on official sites — suggest a `TECH_STACK.md` edit separately.

## Recommendations

For each materially affected stack line, emit **one** of: **`upgrade`**, **`hold`**, **`monitor`**, **`defer`**, **`not applicable`**, with:

- **One-sentence rationale** (risk, breaking change, security, or “no signal”).  
- **Synergy impact** (optional bullet): “Unlocks / pairs with …”.  
- **Primary link** (release note or advisory).

Avoid blanket “always upgrade”; respect Tyler’s **career-transition** context — prefer **stability** when evidence is thin (see [`docs/career-fit-context.md`](../../../docs/career-fit-context.md) for fit/stress framing when advising risk).

## Output

Write **`docs/research/tech-stack-updates-YYYY-MM-DD.md`** (today in America/New_York) unless the parent specifies chat-only or another path.

Use this template:

```markdown
# Tech stack updates — [run title]

- **Window:** [start ET/UTC] → [end ET/UTC]
- **Stack source:** `docs/TECH_STACK.md` (full inventory; **core stack** names from the **“Core stack (priority in `/tech-stack-updates` digests)”** section)

## Executive summary

- [3–6 bullets: **lead with core stack** when anything material landed; then other high-signal items]

## Security & urgent — core stack

| Core name | Finding | Action | Link |
|-----------|-----------|--------|------|
| … | … | upgrade / hold / … | … |

*(If no signal: one line — “No security or urgent items for the core stack in this window.”)*

## Security & urgent — non-core stack

| Item | Finding | Action | Link |
|------|-----------|--------|------|
| … | … | upgrade / hold / … | … |

*(If no signal: one line — “No security or urgent items for non-core inventory in this window.”)*

## Releases & changes — core stack (7d)

| Core name | Change | Upgrade posture | Synergy / integration notes | Link |
|-----------|--------|-------------------|-----------------------------|------|
| … | … | … | … | … |

## Releases & changes — non-core stack (7d)

| Stack item | Change | Upgrade posture | Synergy / integration notes | Link |
|------------|--------|-------------------|-----------------------------|------|
| … | … | … | … | … |

## Upcoming features & roadmaps — core stack (official only)

| Core name | What’s coming | ETA (if stated) | Confidence | Link |
|-----------|---------------|-----------------|------------|------|
| … | … | … | tentative / confirmed | … |

## Upcoming features & roadmaps — non-core stack (official only)

| Stack item | What’s coming | ETA (if stated) | Confidence | Link |
|------------|---------------|-----------------|------------|------|
| … | … | … | tentative / confirmed | … |

## Synergies & cross-stack (last 7d)

| A | B | What’s new | Why Tyler might care | Link |
|---|---|------------|----------------------|------|
| … | … | … | … | … |

## Doc maintenance suggestions

- Bullet list of **TECH_STACK.md** lines to refresh (model names, product renames) — **no** auto-edit unless Tyler asks.

## Searches & sources consulted

- [Short audit trail]
```

## Cron / automation

Same pattern as **events-research:** a scheduled agent should prompt **`stack-radar`** (or “follow **tech-stack-pulse** skill”) with explicit date span.

## Extra hints

See [reference.md](reference.md) for common **official** changelog entry points (verify URLs still current when researching).
