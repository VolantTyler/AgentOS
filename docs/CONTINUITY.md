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
- **Near-term “done” signal:** Run the **weekly synthesis** ritual on cadence ([`docs/WEEKLY_SYNTHESIS.md`](WEEKLY_SYNTHESIS.md), **`/weekly-synthesis`**) so outputs from multiple subagents/workflows surface **unexpected wins** and **cross-cutting connections** — ritual is designed; habit is the remaining bar.
- **Comms:** Primary UI remains **Cursor chat** for now. A reliable hook to an **external communication platform** is a future option — not chosen yet.
- **Priorities:** No fixed stack rank from Tyler yet; PM may recommend sequencing when delegating.

## Current focus (edit freely)

- [x] Design the **weekly synthesis ritual** — [`docs/WEEKLY_SYNTHESIS.md`](WEEKLY_SYNTHESIS.md), **`/weekly-synthesis`**, **`cos-synthesizer`**, output `docs/research/cos-weekly-YYYY-MM-DD.md` (inaugural: [`cos-weekly-2026-05-20.md`](research/cos-weekly-2026-05-20.md)).
- [ ] **Habit:** Run **`/weekly-synthesis`** each Monday (or delegate from this PM thread).
- [ ] **Deferred:** Work through boundary / operating-model questions in [`docs/ONBOARDING_OPEN_QUESTIONS.md`](ONBOARDING_OPEN_QUESTIONS.md) (new chat or `onboarding-guide` subagent).
- [x] Pick a first low-risk external integration: **lead tracking to Google Sheets via Google Workspace CLI**. Documented in [`docs/integrations/google-sheets-lead-tracker.md`](integrations/google-sheets-lead-tracker.md).
- [ ] Decide whether the next integrations should be calendar, tasks, email, or a derived "open follow-ups" view from the lead tracker log.
- [ ] Explore **first external comm integration** when useful (after trust model is clearer); calendar/tasks/email remain candidates.
- [ ] Flesh out `.cursor/agents/` roles to match real recurring workflows.
- [ ] Start using the job-fit loop in [`docs/JOB_FIT_WORKFLOW.md`](JOB_FIT_WORKFLOW.md) for real roles, then decide whether it deserves a dedicated skill or SDK automation.
- [x] Certification / coursework recommendations saved at [`docs/research/certification-recommendations-2026-05-20.md`](research/certification-recommendations-2026-05-20.md) (mapped to job-fit gaps; Apple customer/brand nuance added).
- [ ] Run the new event-to-networking loop on a real event: `/events-research` first, then `/lookahead-match` on the event worth attending.

## Last session

- **Date:** 2026-05-20
- **What we did:** Drafted the **weekly synthesis ritual** ([`docs/WEEKLY_SYNTHESIS.md`](WEEKLY_SYNTHESIS.md)): **`/weekly-synthesis`**, **`cos-synthesizer`**, skill, and inaugural brief [`docs/research/cos-weekly-2026-05-20.md`](research/cos-weekly-2026-05-20.md).
- **Decisions:** Weekly brief at **`docs/research/cos-weekly-YYYY-MM-DD.md`**; default **Monday** anchor (ET), **7-day** lookback; modes `full` / `synthesize-only` / `catch-up`; PM reviews snapshot + connections then approves continuity bullets.
- **Next:** Schedule Monday **`/weekly-synthesis`**; run `/lookahead-match` on a chosen June event; pick one cert enrollment from existing recommendations brief.
- **Date:** 2026-05-20
- **What we did:** Converted recent job-fit chat work into a durable handoff brief at [`docs/research/job-fit-certification-gaps-2026-05-20.md`](research/job-fit-certification-gaps-2026-05-20.md); researched and saved certification recommendations at [`docs/research/certification-recommendations-2026-05-20.md`](research/certification-recommendations-2026-05-20.md), including Apple retail/B2B customer-focus nuance vs evangelist-role SKIPs.
- **Decisions:** Treat **KPMG Associate, AI Engineer** as the strongest recent near-term fit and **Google Cloud Forward Deployed Engineer I, GenAI** as a plausible stretch. Prioritize **Vertex, Agentic AI, RAG, multi-agent production, and Rutgers workflow cert** over MIT strategy-only paths for gap closure. Treat Apple-era customer/brand strengths as real for guided client-facing roles, distinct from high-travel AI evangelist JDs.
- **Next:** Tyler may answer calibration questions in the recommendations doc to refine evangelism vs customer-facing positioning; start Agentic AI + Google Vertex labs; confirm Rutgers cohort with admissions.
- **Date:** 2026-05-17
- **What we did:** Added a new **`lead-tracker`** workflow with `/lead-tracker`, a dedicated subagent prompt, a Google Sheets integration note under `docs/integrations/`, local `.env` config examples, and a saved feature manifest for regression checks.
- **Decisions:** Start with an **append-only recent-contacts log** in Google Sheets rather than row-mutation CRM logic, use **Google Workspace CLI** (`gws`) as the low-friction write path, and fall back to chat-only structured rows whenever local config or CLI access is missing.
- **Next:** Try the lead tracker with real contacts, decide whether a derived **Open Follow-ups** view should be the next increment, and only then consider broader CRM-style integrations.
- **Date:** 2026-05-17
- **What we did:** Established the **supervisory PM** operating model in this thread (handoff → delegate → return only on issues; draft PRs; PM reads PRs via GitHub; continuity update discretion).
- **Decisions:** Silence after delegation = success; all implementation output as **draft PRs** for now; weekly **multi-agent synthesis** + serendipitous connections are part of the north-star “done” bar.
- **Next:** When delegating, use structured handoff prompts; on return to this thread, scan open `cursor/` PRs if no URL was provided.

- **Date:** 2026-05-15
- **What we did:** Added a durable pre-event networking workflow: the [`lookahead-networker`](../.cursor/agents/lookahead-networker.md) subagent, the [`.cursor/skills/lookahead-networker/SKILL.md`](../.cursor/skills/lookahead-networker/SKILL.md) skill, and the **`/lookahead-match`** slash command for turning saved event digests into top networking targets, specific icebreakers, and short outreach drafts.
- **Decisions:** Treat this as a **skill + subagent + slash command** workflow, not a standalone freeform note. Ground all targets in [`docs/career-fit-context.md`](career-fit-context.md), bias toward technical builders, and explicitly exclude low-signal marketing or sales contacts.
- **Next:** Run `/events-research` to refresh the event list, then use `/lookahead-match` against a chosen event and refine the prompt once a few real briefs exist.
- **Date:** 2026-05-15
- **What we did:** Split quality workflows into **evaluation** and **testing**. Added **`feature-evaluator`**, repurposed **`feature-testing-agent`** for manifest-driven regression runs, added `/evaluate-feature` + `/run-feature-tests`, created `docs/testing/` with manifest and suite scaffolding, and documented a standing **Try it out** handoff pattern for future feature work.
- **Decisions:** Treat **evaluation** as post-build spec conformance for a new feature, treat **testing** as reusable saved regression checks that can run one feature, impacted features, or full suites, and prefer **slash-command** examples over a CLI in user-facing tryout instructions until a real CLI exists.
- **Next:** As real features land, add or update a manifest under `docs/testing/features/`, run `/evaluate-feature` first, then `/run-feature-tests` in targeted or suite mode.
- **Date:** 2026-05-14
- **What we did:** Added a durable job-fit system: [`docs/JOB_FIT_WORKFLOW.md`](JOB_FIT_WORKFLOW.md), the [`job-fit-analyst`](../.cursor/agents/job-fit-analyst.md) subagent, and the **`/job-fit`** slash command for comparing JDs/company descriptions against Tyler's documented strengths, interests, constraints, and preferred environments.
- **Decisions:** Start with a **workflow + subagent**, not a dedicated skill. Make the **scorecard-first** summary the default top section so job-fit reports are quick to scan before reading the long-form analysis.
- **Next:** Use `/job-fit` on live roles, store only high-value dated briefs under `docs/research/`, and capture interview/application outcomes to calibrate future fit judgments.

## Open questions

- Which workloads must stay 100% local vs OK in Cursor cloud agents? *(Tyler: no strong opinion yet.)*
- ~~What is the minimum **weekly synthesis** artifact format?~~ **Resolved:** markdown at `docs/research/cos-weekly-YYYY-MM-DD.md` per [`docs/WEEKLY_SYNTHESIS.md`](WEEKLY_SYNTHESIS.md).
- Which **external communication platform** is worth wiring first (if any)?
- Should lead tracking remain append-only, or does it eventually need a second deduplicated view for active leads?
