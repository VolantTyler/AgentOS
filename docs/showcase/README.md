# AgentOS capability map (showcase)

A **display-only**, shareable overview of AgentOS skills, slash commands, and subagents — grouped by **topic** (event planning, networking, tech stack, career, etc.) with honest evaluation and testing coverage indicators.

**Chip colors** are by capability type: green = skill, blue = command, orange = agent. **Coverage** badges use bright vs dim styling only (no yes/no text).

## View the map

Open in any browser:

```text
docs/showcase/capability-map.html
```

From the repo root:

```bash
open docs/showcase/capability-map.html   # macOS
```

You can also screenshot this page for portfolios or walk through it when sharing the GitHub repo.

## Regenerate after changes

When you add or rename a skill, slash command, subagent, or feature manifest, rebuild the HTML:

```bash
python3 scripts/build-capability-map.py
```

### What the generator reads

| Source | Purpose |
|--------|---------|
| [`domains.yaml`](domains.yaml) | Topic/category labels, panel accent colors, capability membership, optional `manifest_slug` overrides |
| `.cursor/skills/*/SKILL.md` | Skill names and descriptions |
| `.cursor/commands/*.md` | Slash command titles |
| `.cursor/agents/*.md` | Subagent names and descriptions |
| `docs/testing/features/*.md` | Eval / test / smoke / full coverage badges |

### Coverage badges

- **Eval** — feature manifest includes an evaluation recipe.
- **Test** — active manifest with regression checks.
- **Smoke / Full** — suite membership from the manifest.

Most capabilities show `—` until a manifest exists under `docs/testing/features/`. That is intentional — the map reflects saved regression coverage, not aspirational coverage.

## Customize grouping

Edit [`domains.yaml`](domains.yaml) to move capabilities between domains or adjust colors. Then rerun the build script above.
