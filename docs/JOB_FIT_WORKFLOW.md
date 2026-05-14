# Job-fit workflow

**Purpose:** Evaluate a job description and company context against Tyler's documented skills, interests, constraints, and preferred environments — then improve those judgments over time with real application and interview feedback.

## Recommendation

Start with a **documented workflow + subagent**, not a custom skill.

- **Why not a skill first?** Skills work best when the procedure is stable and specialized. Job-fit evaluation is still part discovery: we need to learn what criteria actually predict good outcomes for Tyler before hardening the process.
- **Why a subagent now?** A named subagent gives us a clean prompt shape, reusable evaluation rubric, and durable repo context without extra code.
- **When to upgrade later:** If this becomes frequent, repetitive, and structured enough, we can add either:
  - a **skill** for consistent evaluation steps, or
  - a small **Cursor SDK** script that writes briefs automatically from pasted inputs.

## Source-of-truth inputs

Every job-fit pass should ground itself in these files first:

1. [`docs/identity-brief.md`](identity-brief.md) — portable biography, goals, and work preferences.
2. [`docs/career-fit-context.md`](career-fit-context.md) — strengths, recurring challenges, environments to seek/avoid.
3. [`docs/TECH_STACK.md`](TECH_STACK.md) — concrete tools, languages, and areas of technical depth.
4. [`docs/CONTINUITY.md`](CONTINUITY.md) — current direction, recent decisions, and open threads.

If a trusted local machine has more specific private context under `docs/_private/`, use it only when Tyler explicitly wants that richer detail included.

## What to evaluate

A good fit evaluation is **not** just keyword matching. Check five dimensions:

1. **Capability match** — Can Tyler credibly do the work now or grow into it with reasonable support?
2. **Interest / motivation match** — Does the role align with the work he actually wants more of?
3. **Environment match** — Does the team structure fit the documented need for clarity, collaboration, and scaffolding?
4. **Execution-risk match** — Are there role traits likely to trigger recurring pain points: ambiguity, weak management, heavy context switching, vague ownership?
5. **Narrative match** — Can Tyler tell a coherent story for why *this* role fits his path?

## Default output shape

Each evaluation should produce:

1. **Verdict** — `strong fit`, `conditional fit`, `stretch but plausible`, `weak fit`, or `skip`.
2. **Confidence** — `high`, `medium`, or `low`.
3. **Why it fits** — strongest evidence in favor.
4. **Why it may not fit** — explicit concerns and red flags.
5. **Unknowns to validate** — what must be learned before applying or interviewing.
6. **Positioning angle** — resume/interview story to emphasize.
7. **Recommendation** — apply now, apply if clarified, archive for later, or skip.

## Input template for new requests

When Tyler brings a new role, use this shape in chat when possible:

### Job-fit intake

- **Company:**
- **Role title:**
- **Source URL:** 
- **Stage:** interested / deciding whether to apply / applied / interviewing / offer
- **What caught my eye:** 
- **JD text or excerpt:** 
- **Company description / website text:** 
- **Known concerns or questions:** 
- **Any custom weighting:** e.g. "optimize for stability," "optimize for AI-agent relevance," "ignore compensation for now"

Freeform paste is still fine; this template just improves consistency.

## Output file convention

If we want a durable artifact, write:

`docs/research/job-fit-YYYY-MM-DD-company-role.md`

That file should include:

## Snapshot

- Company
- Role
- Stage
- Source
- Date evaluated

## Recommendation

- Verdict
- Confidence
- Recommended next step

## Evidence for fit

- Bullet list tied to repo context or supplied job/company text

## Evidence against fit

- Bullet list of gaps, risks, or likely pain points

## Unknowns / questions to ask

- Hiring-manager or recruiter questions

## Positioning notes

- Resume bullets to foreground
- Story to tell
- Experience to de-emphasize

## Outcome feedback

- Applied?
- Interviewed?
- Rejected / advanced / withdrew / offer?
- What seems to have helped or hurt?
- Any new rule to carry into future evaluations?

## Learning loop

The real value comes from feedback, not one-off scoring.

After each meaningful outcome, update either the dated job-fit note or [`docs/CONTINUITY.md`](CONTINUITY.md) with what was learned:

- Which types of roles felt energizing vs draining?
- Which recruiter or hiring-manager conversations produced traction?
- Which required qualifications were actually flexible?
- Which red flags predicted trouble?
- Which resume/interview narratives landed well?

Over time, this turns "Do I match this job?" into "What patterns predict good outcomes for me?"

## Recommended operating pattern

### Phase 1 — lightweight, now

- Keep the durable profile in the existing docs.
- Use the `job-fit-analyst` subagent for comparisons.
- Save only high-value evaluations under `docs/research/` — not every random listing.

### Phase 2 — once patterns stabilize

Add a skill if we see the same repeated procedure, output rubric, and file-writing behavior over enough examples.

### Phase 3 — if automation becomes valuable

Add a small `@cursor/sdk` script that:

- accepts pasted JD/company text,
- invokes the subagent,
- writes a dated markdown brief,
- optionally updates a lightweight application tracker.

## Good prompts to use

- "Compare this job and company to my documented strengths, constraints, and interests. Be candid about fit and environment risk."
- "Give me a verdict, confidence level, top reasons for and against, questions to ask, and whether I should apply."
- "Use my prior job-fit notes too and tell me whether this resembles roles that seem energizing or draining."
- "Update the dated job-fit note with what I learned from this recruiter call."

## Current recommendation

Use this workflow for a few real roles first. If the outputs become predictably useful, promote the pattern into a skill or SDK-backed automation.
