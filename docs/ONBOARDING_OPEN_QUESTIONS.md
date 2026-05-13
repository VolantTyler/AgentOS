# Deferred onboarding — boundaries & operating model

**Status:** Deferred by choice — pick this up when ready.  
**Why this file exists:** A durable reminder (not a calendar ping). Tyler asked to return to these later.

When you want to continue, open a **new Cursor chat** in this repo and say something like:

> Continue onboarding from `docs/ONBOARDING_OPEN_QUESTIONS.md`. Work through one section at a time; when I answer, propose concise updates to `docs/BOUNDARIES.md` or `AGENTS.md` and wait for my OK before committing.

You can also delegate to the **`onboarding-guide`** subagent (see `.cursor/agents/onboarding-guide.md`) from a parent agent when you want a focused pass inside the same session.

---

## Checklist (fill in over time)

Each line is optional until you need it. Capture answers briefly; agents can expand into formal rules later.

| # | Topic | Notes / your answer |
|---|--------|----------------------|
| 1 | **Household vs work vs sole-prop (Volant)** — separate rules? Clients named in git? | |
| 2 | **Money & legal** — informational only vs “you should”? | |
| 3 | **Health & counseling posture** — no simulated therapy / crisis / diagnosis? | |
| 4 | **Git / private repo** — anything that must never be committed? | |
| 5 | **Autonomy ladder** — what always needs explicit approval before execution? | |
| 6 | **Conflict resolution** — repo docs vs latest chat instruction: which wins? | |
| 7 | **Tone when saying “I don’t know”** — blunt vs gentle? | |
| 8 | **Source bar** — always cite for complicated vs only correctness/safety? | |

---

## After answers exist

1. Fold stable rules into [`BOUNDARIES.md`](BOUNDARIES.md) and/or [`AGENTS.md`](../AGENTS.md).  
2. If something is **still** too sensitive for git, keep it in `docs/_private/` and add a **pointer only** in committed docs.  
3. Trim or archive this file when everything above is resolved and reflected elsewhere.
