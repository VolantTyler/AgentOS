---
name: requirement-mapping
description: >-
  Maps every bullet in a job description to Tyler's resume and portfolio
  evidence, producing paste-ready third-person resume or cover-letter lines with
  labeled mapping types (direct, adjacent, stretch, gap) and confidence levels.
  Uses docs/_private/context-portfolio/ locally or https://tylerstahl.dev in
  cloud. Separate from job-fit evaluation. Use when Tyler runs /requirement-map,
  asks for a requirement alignment table, or needs JD-to-background mapping for
  an application.
disable-model-invocation: true
---

# Requirement mapping (JD → background)

## Purpose

Produce an **application-ready alignment table**: each JD requirement → **third-person** resume bullet or cover-letter line Tyler can paste, with honest **mapping type** and **confidence** labels.

This is **not** job-fit. It does not score whether to pursue the role. Use **`/job-fit`** for that; use **`/requirement-map`** when Tyler is preparing to apply or wants paste-ready positioning.

## Authority

Read before mapping:

1. `docs/career-fit-context.md` — tone and environment context (not primary evidence)
2. `docs/identity-brief.md` — portable snapshot and portfolio URL
3. `docs/TECH_STACK.md` — concrete tools when portfolio files are thin

## Evidence sources (in order)

### Local (preferred)

When `docs/_private/context-portfolio/` is available, read **all** numbered files before mapping:

| File | Typical evidence |
|------|------------------|
| `01-identity.md` | Biography, counseling/anthropology/Apple background, brand narrative |
| `02-role-and-responsibilities.md` | Role history, scope, ownership, metrics |
| `03-current-projects.md` | Portfolio projects, AgentOS, OpenClaw, case studies |
| `04-team-and-relationships.md` | Collaboration, stakeholders, facilitation |
| `05-tools-and-systems.md` | Stack depth, platforms, delivery tooling |
| `06-communication-style.md` | Writing, async norms, stakeholder translation |
| `07-goals-and-priorities.md` | Target directions, framing for “why this role” |
| `08-preferences-and-constraints.md` | What to emphasize or avoid in lines |
| `09-domain-knowledge.md` | Nonprofit, accessibility, AI/agents, counseling-informed HITL |
| `10-decision-log.md` | Recent choices that support narrative consistency |
| `README.md` | Portfolio index and usage notes |

Also use committed docs when they add verifiable detail: `docs/TECH_STACK.md`, project references in `docs/CONTINUITY.md`.

### Cloud / no `_private`

Treat **[https://tylerstahl.dev](https://tylerstahl.dev)** as the **always-current** digital resume and portfolio. Fetch and use:

- **Experience timeline** — employers, dates, role titles, outcome bullets
- **Skills evidence** table — Claim / Evidence / Artifact rows
- **Portfolio case studies** — project names, stacks, human-outcome framing
- **Resume download** or **technical briefs** links when the page surfaces them

Do **not** invent facts absent from the site, pasted JD, or committed repo docs. If a detail is missing from the site, label confidence **low** or mapping **gap** rather than guessing.

## JD extraction (current scope: every bullet)

1. Parse the full JD into **atomic requirements** — every bullet under Responsibilities, Requirements, Qualifications, Nice-to-have, and similar sections.
2. Preserve **verbatim or tight paraphrase** in the table; do not merge unrelated bullets unless the JD repeats the same requirement verbatim.
3. If the JD is unstructured prose, split into sentence-level requirements; note **inferred split** in the Bridge note when the boundary is ambiguous.
4. Tyler may narrow scope later; until then, **include every bullet**.

## Mapping types

| Type | Meaning |
|------|---------|
| **Direct** | Same domain and scale; cite specific role, project, or metric |
| **Adjacent** | Real experience under a different label (e.g. stakeholder workshops ↔ client-facing negotiations) |
| **Stretch** | Defensible transfer; name the mechanism in Bridge note |
| **Gap** | No honest bridge; provide mitigation line or explicit “do not claim in cover letter” |

### Counseling / human-centered background

Tyler’s **counseling training and practice**, **anthropology**, and **Apple customer/B2B** experience are **always eligible** for adjacent and stretch mappings when relevant. They are **core brand**, not optional add-ons. Prefer them for requirements involving trust, stakeholders, change management, facilitation, listening, or high-stakes human interaction.

See [examples.md](examples.md) for a worked stretch pattern.

## Confidence

Independent of mapping type:

- **High** — defensible in interview without hedging
- **Medium** — true with framing; prep one supporting detail
- **Low** — speculative or thin evidence; flag for Tyler’s edit

**Stretch** rows should rarely be **high** unless the bridge is unusually strong.

## Guardrails

- **No fabrication:** Do not invent employers, dates, metrics, titles, or certifications. See `docs/BOUNDARIES.md`.
- **Third person:** Paste-ready lines use resume voice (“Led…”, “Built…”, “Partnered…”) — not first person.
- **Separate facts from inference:** Evidence source column cites file, site section, or project; Bridge note holds the interpretive link.
- **Gap honesty:** Include a row for every requirement; gaps get a mitigation or skip flag — never silent omission.
- **No job-fit scorecard** in this output unless Tyler explicitly asks to cross-reference a saved job-fit brief.

## Workflow

1. **Intake** — company, role title, JD text or URL; infer company/role from paste when possible; ask once if JD text is missing.
2. **Load evidence** — local portfolio files or fetch tylerstahl.dev.
3. **Extract requirements** — every bullet (see above).
4. **Map each row** — type, confidence, evidence source, paste-ready line, bridge note.
5. **Summarize** — counts by type; top 3 strongest rows; top 3 gaps or stretches needing human review.
6. **Save** — always write `docs/research/requirement-map-YYYY-MM-DD-<company>-<role-slug>.md` unless Tyler says `chat-only`.

Use **America/New_York** for dates in filenames.

## Output template

```markdown
# Requirement map — [Company] — [Role title]

- **Prepared:** [ISO date] (America/New_York)
- **Company:** [name]
- **Role:** [title]
- **JD source:** [URL or "pasted text"]
- **Evidence source:** [context-portfolio | tylerstahl.dev | hybrid]
- **Requirements mapped:** [count]

## Summary

- **Direct:** [n] · **Adjacent:** [n] · **Stretch:** [n] · **Gap:** [n]
- **Strongest alignment:** [1–3 short bullets]
- **Review before sending:** [1–3 stretch/gap rows worth Tyler’s edit]

## Alignment table

| # | JD requirement | Type | Confidence | Evidence source | Resume / cover line | Bridge note |
|---|----------------|------|------------|-----------------|---------------------|-------------|
| 1 | … | Direct | High | Charity Navigator / 02-role… | Led React/TypeScript… | … |

## Interview prep (stretch & gap rows)

| # | If they push… | Suggested response |
|---|---------------|-------------------|
| … | … | … |

## Optional cross-links

- Job-fit brief: [path or "not run"]
```

## Invocation

- **Slash:** `/requirement-map` — see `.cursor/commands/requirement-map.md`
- **Subagent:** `requirement-mapper`
- **Chat:** Paste JD and ask for a requirement alignment table with labeled stretch mappings

## Additional resources

- Worked examples: [examples.md](examples.md)
