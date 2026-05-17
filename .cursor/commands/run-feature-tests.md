# /run-feature-tests — run saved feature manifests and suites

You are executing the **AgentOS `/run-feature-tests` slash command**.

## Required: run as **feature-testing-agent** subagent

1. **Delegate** this entire request to the **`feature-testing-agent`** subagent (`.cursor/agents/feature-testing-agent.md`) using your **Task** / **subagent** / **Agent** delegation mechanism for **repo-defined** subagents.  
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Run the requested saved feature-test scope from `docs/testing/`.  
   - **Context:** Any feature slug, suite name, changed files, impact notes, or environment limits Tyler typed after the slash.

**If delegation is unavailable**, say so once, then **you** perform the same workflow yourself by following `.cursor/agents/feature-testing-agent.md` and `docs/testing/README.md`.

## Defaults (unless user overrides in the same message)

- **Mode:** `suite smoke` if no feature, impact scope, or suite was specified.  
- **Manifest source:** `docs/testing/features/*.md`.  
- **Suite source:** `docs/testing/suites/*.md`.  
- **Evidence standard:** report direct results and note any `needs-human-check` blockers honestly.

## After the subagent finishes

Reply with:

1. **Run summary** — what scope was tested and why.  
2. **Pass / fail / needs-human-check counts**.  
3. **Most important failures or coverage gaps**.  
4. **Whether a broader suite should run next** (for example `smoke` after evaluation, or `full` before merge).
