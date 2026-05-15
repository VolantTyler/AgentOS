---
name: lookahead-networker
description: >-
  Converts an upcoming event digest into a targeted networking brief for Tyler:
  identifies high-value speakers, hosts, sponsors, and companies; maps them to
  his career-fit themes; and drafts specific conversation starters and short
  outreach messages. Use when Tyler is attending or seriously considering an
  event from a saved `docs/research/events-*.md` digest.
disable-model-invocation: true
---

# Look-ahead networking

## Goal

Turn one saved event digest into a short list of the highest-value people or companies Tyler should prepare to meet.

## Required inputs

1. A target event digest under `docs/research/events-*.md`
   - Also accept legacy names like `docs/research/events-research-*.md` if present.
2. `docs/career-fit-context.md`
3. Optional context from Tyler:
   - specific event name
   - `attending` vs `considering`
   - a company or role family to bias toward
   - constraints like `founder-heavy`, `avoid recruiter chatter`, or `save`

## Guardrails

- Do **not** invent attendance, bios, funding, recent launches, or personal relationships.
- If a connection to Tyler is weak, label it as **adjacent** instead of pretending it is direct.
- Exclude low-signal marketing or sales contacts unless they are also founders or technical product leaders shipping agent-related work.
- Prefer official speaker pages, organizer agendas, company pages, GitHub repos, blog posts, and recent interviews over scraped bios.
- If the event page lacks named speakers or detailed agenda data, say so clearly and return the best company-level targets plus a human-check list.

## Career-fit lens

Rank toward entities that intersect with Tyler's documented strengths and target directions:

- agentic workflows
- multi-agent orchestration
- MCP and tool-using agent systems
- human-AI alignment and evaluation
- front-end, DX, documentation, and structured collaboration
- roles or companies where clarity, product collaboration, and technical communication matter

## Workflow

1. **Select the target event**
   - If Tyler named an event, use it.
   - Otherwise inspect the latest digest and choose the single event that best fits the career-fit lens.
   - If multiple events look equally strong, say so and ask Tyler to choose instead of pretending certainty.

2. **Reconnaissance**
   - Scan the event listing plus linked speaker, agenda, sponsor, and host pages.
   - Capture named speakers, moderators, hosts, sponsors, labs, and organizing companies.
   - Note each entity's topic area, current role, and why they are present at this event.

3. **Context alignment**
   - Compare the entities against `docs/career-fit-context.md`.
   - Distinguish:
     - direct overlap with Tyler's stack or work style
     - adjacent but useful overlap
     - weak or purely promotional fit

4. **Intel synthesis**
   - Choose up to 3 highest-value targets.
   - For each target, explain the mutual-value angle: why Tyler can credibly engage them and why the conversation is not random.
   - Draft one specific technical or product question anchored in the target's published work or stated event topic.

5. **Output**
   - Write a markdown brief to `docs/research/networking-targets-YYYY-MM-DD-<eventslug>.md`.
   - If Tyler did not ask to save, chat output is acceptable, but preserve the same schema.

## Output template

```markdown
# Networking targets — [event title]

- **Prepared:** [ISO date] (America/New_York)
- **Source digest:** [path]
- **Target event:** [event name]
- **Status:** [attending | considering | unknown]
- **Focus lens:** [1-2 lines on why this event matches Tyler's goals]

## Best targets

### 1. [Name or Company] — [Role / Company]
- **Target Profile:** [Name] / [Role or company] / [Relevance to Tyler's stack]
- **The "Why":** [Concrete reason this is a high-value connection now]
- **Connection to Tyler:** [Direct overlap vs adjacent overlap; be explicit]
- **Icebreaker Command:** [Specific non-generic question]
- **Digital Outreach Draft:** [Under 300 characters]
- **Sources / Confidence:** [What this is based on and any uncertainty]

### 2. ...

### 3. ...

## Watchlist / secondary targets

- [Optional bullets for people or companies worth a lighter-touch follow-up]

## Human check before the event

- [Missing bios, TBA agenda items, ambiguous speaker-role mapping, or unclear sponsors]
```

## Invocation

- **Chat:** Ask for a networking prep brief for a saved event digest.
- **Slash:** Type `/lookahead-match` to run the matching workflow.
- **Subagent:** Spawn `lookahead-networker` when the parent agent needs a pre-event networking brief.
