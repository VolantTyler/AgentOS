# Event research digests

Digests are produced by subagents following project skills:

| Slash | Subagent | Skill | Output (default) |
|-------|-----------|-------|------------------|
| **`/events-research`** | `events-scout` | `events-research` | `docs/research/events-YYYY-MM-DD.md` |
| **`/lookahead-match`** | `lookahead-networker` | `lookahead-networker` | `docs/research/networking-targets-YYYY-MM-DD-<eventslug>.md` |
| **`/tech-stack-updates`** | `stack-radar` | `tech-stack-pulse` | `docs/research/tech-stack-updates-YYYY-MM-DD.md` |

Trigger from **`/`** menu or by asking the parent agent to run the subagent by name.

**Naming:** `events-YYYY-MM-DD.md` for event discovery runs, `networking-targets-YYYY-MM-DD-<eventslug>.md` for pre-event networking briefs, and `tech-stack-updates-YYYY-MM-DD.md` for stack scans.

**Git:** Safe to commit if digests contain only public links and no private logistics. Move drafts with personal notes to `docs/_private/` if needed.
