# /evaluate-feature — check a new feature against its spec

You are executing the **AgentOS `/evaluate-feature` slash command**.

## Required: run as **feature-evaluator** subagent

1. **Delegate** this entire request to the **`feature-evaluator`** subagent (`.cursor/agents/feature-evaluator.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.  
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Evaluate whether the just-built feature meets its specification or acceptance criteria.  
   - **Context:** Any feature description, changed files, acceptance criteria, known risks, and validation notes Tyler typed after the slash.

**If delegation is unavailable**, say so once, then **you** perform the same workflow yourself by following `.cursor/agents/feature-evaluator.md`.

## Defaults (unless user overrides in the same message)

- **Scope:** the newly changed feature only, plus immediate dependencies needed to evaluate it.  
- **Evidence standard:** direct files, command output, or UI observations only.  
- **Output:** verdict + checklist of acceptance criteria + defects/gaps.

## After the subagent finishes

Reply with:

1. **Verdict** — pass, fail, or needs-human-check.  
2. **Three to five bullets** — most important confirmations or mismatches.  
3. **What to do next** — fix now, or proceed to `/run-feature-tests`.
