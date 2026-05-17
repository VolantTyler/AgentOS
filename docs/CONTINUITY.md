# Continuity log

**Purpose:** Durable handoff between sessions and tools. Update this file when goals shift, when you close a thread, or when something important happened that future-you (or an agent) must not forget.

## North star

Build a **Chief-of-Staff** layer that helps Tyler (and coordinated household/work context) with prioritization, preparation, and delegation — with explicit agent loops, sub-agents where helpful, and human-in-the-loop for sensitive actions.

## Supervisory PM (primary thread)

- **Role:** This chat is Tyler’s stable **project-manager / Chief-of-Staff** thread. Implementation work is delegated to other agents via handoff prompts from here.
- **Handoff:** PM drafts a copy-paste prompt for the implementation agent. Tyler returns only if there are issues; **silence means success** — no further PM action required.
- **PR policy (now):** All agent-delivered work lands as a **draft PR** for Tyler’s quick review. Relax later as familiarity grows.
- **PR awareness:** PM can **read PRs independently** on `github.com/VolantTyler/AgentOS` via `gh` (list, diff, comments). A PR URL from Tyler or the implementer speeds matching a delegation to its PR; it is not required if the branch follows `cursor/` naming or the PR title references the task.
- **Continuity:** PM **proposes** updates to this file when major decisions land. Tyler may also say **“remember this”** (or similar) to force a log entry.
- **Near-term “done” signal:** At least one **weekly ritual** that **synthesizes** outputs from multiple subagents/workflows and surfaces **unexpected wins** and **cross-cutting connections** (not only task completion).
- **Comms:** Primary UI remains **Cursor chat** for now. A reliable hook to an **external communication platform** is a future option — not chosen yet.
- **Priorities:** No fixed stack rank from Tyler yet; PM may recommend sequencing when delegating.

## Current focus (edit freely)

- [ ] Design the **weekly synthesis ritual** (which agents/skills feed it, artifact format, where it is written — e.g. `docs/research/` or a dated CoS brief).
- [ ] **Deferred:** Work through boundary / operating-model questions in [`docs/ONBOARDING_OPEN_QUESTIONS.md`](ONBOARDING_OPEN_QUESTIONS.md) (new chat or `onboarding-guide` subagent).
- [ ] Explore **first external comm integration** when useful (after trust model is clearer); calendar/tasks/email remain candidates.
- [ ] Flesh out `.cursor/agents/` roles to match real recurring workflows.
- [ ] Start using the job-fit loop in [`docs/JOB_FIT_WORKFLOW.md`](JOB_FIT_WORKFLOW.md) for real roles, then decide whether it deserves a dedicated skill or SDK automation.

## Last session

- **Date:** 2026-05-17
- **What we did:** Established the **supervisory PM** operating model in this thread (handoff → delegate → return only on issues; draft PRs; PM reads PRs via GitHub; continuity update discretion).
- **Decisions:** Silence after delegation = success; all implementation output as **draft PRs** for now; weekly **multi-agent synthesis** + serendipitous connections are part of the north-star “done” bar.
- **Next:** When delegating, use structured handoff prompts; on return to this thread, scan open `cursor/` PRs if no URL was provided.

- **Date:** 2026-05-15
- **What we did:** Split quality workflows into **evaluation** and **testing**. Added **`feature-evaluator`**, repurposed **`feature-testing-agent`** for manifest-driven regression runs, added `/evaluate-feature` + `/run-feature-tests`, created `docs/testing/` with manifest and suite scaffolding, and documented a standing **Try it out** handoff pattern for future feature work.
- **Decisions:** Treat **evaluation** as post-build spec conformance for a new feature, treat **testing** as reusable saved regression checks that can run one feature, impacted features, or full suites, and prefer **slash-command** examples over a CLI in user-facing tryout instructions until a real CLI exists.
- **Next:** As real features land, add or update a manifest under `docs/testing/features/`, run `/evaluate-feature` first, then `/run-feature-tests` in targeted or suite mode.

## Open questions

- Which workloads must stay 100% local vs OK in Cursor cloud agents? *(Tyler: no strong opinion yet.)*
- What is the minimum **weekly synthesis** artifact format (markdown digest, canvas, email draft)?
- Which **external communication platform** is worth wiring first (if any)?
