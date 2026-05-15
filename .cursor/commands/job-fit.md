# /job-fit — evaluate role and company fit

You are executing the **AgentOS `/job-fit` slash command**.

## Required: run as **job-fit-analyst** subagent

1. **Delegate** this entire request to the **`job-fit-analyst`** subagent (`.cursor/agents/job-fit-analyst.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.  
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Evaluate the supplied role and company against Tyler's documented strengths, constraints, interests, and preferred environments using the scorecard-first format in `docs/JOB_FIT_WORKFLOW.md`.  
   - **Context:** Any job URL, pasted JD text, company description, weighting preferences, stage, or "save/archive" instruction Tyler typed after the slash.

**If delegation is unavailable**, say so once, then **you** perform the same workflow yourself by reading `docs/JOB_FIT_WORKFLOW.md` and grounding the analysis in the source-of-truth docs named there.

## Defaults (unless user overrides in the same message)

- **Output mode:** chat-first, using the **scorecard at the top**.  
- **Persistence:** do **not** save a dated note unless Tyler explicitly asks to `save`, `archive`, or otherwise indicates the evaluation is worth keeping.  
- **Context sources:** `docs/identity-brief.md`, `docs/career-fit-context.md`, `docs/TECH_STACK.md`, `docs/CONTINUITY.md`, plus any pasted job/company material or linked public job listing.  
- **Decision style:** candid, fit-focused, and environment-aware — not resume-keyword optimism.

## After the subagent finishes

Reply with:

1. **Scorecard first** — overall weighted score, verdict, confidence, one-line call, and all five dimension scores.  
2. **Short recommendation section** — strongest reasons for fit, strongest concerns, unknowns to validate, and recommendation.  
3. **Path** to the saved dated note, if one was requested and created.
