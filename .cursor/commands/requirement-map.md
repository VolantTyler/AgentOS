# /requirement-map — JD requirements to resume/cover lines

You are executing the **AgentOS `/requirement-map` slash command**.

## Required: run as **requirement-mapper** subagent

1. **Read** `.cursor/skills/requirement-mapping/SKILL.md` fully before delegating.
2. **Delegate** this entire request to the **`requirement-mapper`** subagent (`.cursor/agents/requirement-mapper.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.
3. Pass **goal** + **context** so the child receives:
   - **Goal:** Map every bullet in the supplied job description to Tyler's background using labeled mapping types (direct, adjacent, stretch, gap) and confidence levels; produce third-person paste-ready resume/cover lines; save the alignment table.
   - **Context:** Company name, role title, JD text or URL, optional link to a saved job-fit brief (cross-link only), and any `chat-only` override Tyler typed after the slash.

**If delegation is unavailable**, say so once, then **you** perform the same workflow yourself: read the skill and examples, load evidence from `docs/_private/context-portfolio/` or **https://tylerstahl.dev**, and write the dated note.

## Defaults (unless user overrides in the same message)

- **JD scope:** every bullet in Responsibilities, Requirements, Qualifications, and similar sections.
- **Voice:** third person for paste-ready lines.
- **Evidence (local):** `docs/_private/context-portfolio/` files `01`–`10` plus `README.md`.
- **Evidence (cloud / no `_private`):** **https://tylerstahl.dev** — treat as always current.
- **Counseling / human-centered background:** always eligible for adjacent and stretch mappings when relevant.
- **Persistence:** always save to `docs/research/requirement-map-YYYY-MM-DD-<company>-<role-slug>.md`.
- **Not job-fit:** do not run duplicate prevention or scorecard unless Tyler explicitly asks to cross-reference an existing job-fit brief.

## After the subagent finishes

Reply with:

1. **Summary** — requirement count; direct / adjacent / stretch / gap breakdown.
2. **Top 3 strongest rows** — one line each.
3. **Top 3 review rows** — stretch or gap items Tyler should edit before sending.
4. **Path** to the saved requirement map (or `chat-only`).
