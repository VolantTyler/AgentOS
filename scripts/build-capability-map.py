#!/usr/bin/env python3
"""Build docs/showcase/capability-map.html from repo scan + domains.yaml."""

from __future__ import annotations

import html
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOMAINS_PATH = ROOT / "docs" / "showcase" / "domains.yaml"
OUTPUT_PATH = ROOT / "docs" / "showcase" / "capability-map.html"
FEATURES_DIR = ROOT / "docs" / "testing" / "features"

# Chip accent by capability type (not topic panel).
TYPE_COLORS = {
    "skill": "#39ff14",
    "command": "#4d9fff",
    "agent": "#ff8c42",
}


@dataclass
class CapabilityRef:
    type: str  # skill | command | agent
    id: str
    manifest_slug: str | None = None


@dataclass
class DomainConfig:
    id: str
    label: str
    color: str
    blurb: str = ""
    capabilities: list[CapabilityRef] = field(default_factory=list)


@dataclass
class CapabilityInfo:
    type: str
    id: str
    title: str
    description: str


@dataclass
class ManifestCoverage:
    slug: str
    status: str
    suites: list[str]
    has_eval: bool
    has_regression: bool
    surfaces: str


@dataclass
class CoverageBadge:
    eval_on: bool = False
    test_on: bool = False
    smoke_on: bool = False
    full_on: bool = False


def load_domains_yaml(path: Path) -> list[DomainConfig]:
    """Minimal YAML loader for docs/showcase/domains.yaml structure."""
    text = path.read_text(encoding="utf-8")
    domains: list[DomainConfig] = []
    current: DomainConfig | None = None
    in_capabilities = False
    pending_cap: dict[str, str] | None = None

    def parse_scalar(raw: str) -> str:
        raw = raw.strip()
        if (raw.startswith('"') and raw.endswith('"')) or (
            raw.startswith("'") and raw.endswith("'")
        ):
            return raw[1:-1]
        return raw

    for line in text.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if stripped == "domains:":
            continue

        # Domain entries use two-space indent; capability entries use six.
        if line.startswith("  - id:"):
            if current:
                if pending_cap and pending_cap.get("type") and pending_cap.get("id"):
                    current.capabilities.append(
                        CapabilityRef(
                            pending_cap["type"],
                            pending_cap["id"],
                            pending_cap.get("manifest_slug"),
                        )
                    )
                domains.append(current)
            current = DomainConfig(
                id=parse_scalar(stripped.split(":", 1)[1]),
                label="",
                color="#00e5ff",
            )
            in_capabilities = False
            pending_cap = None
            continue

        if current is None:
            continue

        if stripped == "capabilities:":
            in_capabilities = True
            pending_cap = None
            continue

        if in_capabilities and stripped.startswith("- type:"):
            if pending_cap and pending_cap.get("type") and pending_cap.get("id"):
                current.capabilities.append(
                    CapabilityRef(
                        pending_cap["type"],
                        pending_cap["id"],
                        pending_cap.get("manifest_slug"),
                    )
                )
            parts = stripped[2:].split()
            cap_type = ""
            cap_id = ""
            manifest_slug = None
            i = 0
            while i < len(parts):
                if parts[i] == "type:" and i + 1 < len(parts):
                    cap_type = parts[i + 1]
                elif parts[i] == "id:" and i + 1 < len(parts):
                    cap_id = parts[i + 1]
                elif parts[i] == "manifest_slug:" and i + 1 < len(parts):
                    manifest_slug = parts[i + 1]
                i += 1
            pending_cap = {"type": cap_type, "id": cap_id}
            if manifest_slug:
                pending_cap["manifest_slug"] = manifest_slug
            if cap_type and cap_id:
                current.capabilities.append(
                    CapabilityRef(cap_type, cap_id, manifest_slug)
                )
                pending_cap = None
            continue

        if in_capabilities and pending_cap is not None and stripped.startswith("id:"):
            pending_cap["id"] = parse_scalar(stripped.split(":", 1)[1])
            if pending_cap.get("type") and pending_cap.get("id"):
                current.capabilities.append(
                    CapabilityRef(
                        pending_cap["type"],
                        pending_cap["id"],
                        pending_cap.get("manifest_slug"),
                    )
                )
                pending_cap = None
            continue

        if in_capabilities and pending_cap is not None and stripped.startswith("manifest_slug:"):
            pending_cap["manifest_slug"] = parse_scalar(stripped.split(":", 1)[1])
            continue

        if stripped.startswith("label:"):
            current.label = parse_scalar(stripped.split(":", 1)[1])
        elif stripped.startswith("color:"):
            current.color = parse_scalar(stripped.split(":", 1)[1])
        elif stripped.startswith("blurb:"):
            current.blurb = parse_scalar(stripped.split(":", 1)[1])

    if current:
        if pending_cap and pending_cap.get("type") and pending_cap.get("id"):
            current.capabilities.append(
                CapabilityRef(
                    pending_cap["type"],
                    pending_cap["id"],
                    pending_cap.get("manifest_slug"),
                )
            )
        domains.append(current)
    return domains


def parse_frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    block = text[3:end]
    data: dict[str, str] = {}
    key: str | None = None
    buf: list[str] = []
    for line in block.splitlines():
        if line.strip() == "" and key and buf:
            data[key] = "\n".join(buf).strip()
            key, buf = None, []
            continue
        if ":" in line and not line.startswith(" "):
            if key and buf:
                data[key] = "\n".join(buf).strip()
            key, raw = line.split(":", 1)
            key = key.strip()
            val = raw.strip()
            if val in (">-", ">"):
                buf = []
            elif val.startswith('"') and val.endswith('"'):
                data[key] = val[1:-1]
                key, buf = None, []
            else:
                data[key] = val
                key, buf = None, []
        elif key is not None:
            buf.append(line.strip())
    if key and buf:
        data[key] = "\n".join(buf).strip()
    return data


def scan_skills() -> dict[str, CapabilityInfo]:
    out: dict[str, CapabilityInfo] = {}
    skills_root = ROOT / ".cursor" / "skills"
    for skill_md in sorted(skills_root.glob("*/SKILL.md")):
        text = skill_md.read_text(encoding="utf-8")
        meta = parse_frontmatter(text)
        slug = skill_md.parent.name
        name = meta.get("name", slug)
        desc = meta.get("description", "").replace("\n", " ")
        out[slug] = CapabilityInfo("skill", slug, name, desc)
    return out


def scan_commands() -> dict[str, CapabilityInfo]:
    out: dict[str, CapabilityInfo] = {}
    for cmd_md in sorted((ROOT / ".cursor" / "commands").glob("*.md")):
        slug = cmd_md.stem
        first = ""
        for line in cmd_md.read_text(encoding="utf-8").splitlines():
            if line.startswith("# "):
                first = line[2:].strip()
                break
        title = first or f"/{slug}"
        desc = first.split("—", 1)[-1].strip() if "—" in first else ""
        out[slug] = CapabilityInfo("command", slug, title, desc)
    return out


def scan_agents() -> dict[str, CapabilityInfo]:
    out: dict[str, CapabilityInfo] = {}
    for agent_md in sorted((ROOT / ".cursor" / "agents").glob("*.md")):
        text = agent_md.read_text(encoding="utf-8")
        meta = parse_frontmatter(text)
        slug = agent_md.stem
        desc = meta.get("description", "").replace("\n", " ")
        if not desc:
            for line in text.splitlines():
                if line.strip() and not line.startswith("---") and not line.startswith("#"):
                    desc = line.strip()
                    break
        title = meta.get("name", slug)
        out[slug] = CapabilityInfo("agent", slug, title, desc)
    return out


def scan_manifests() -> dict[str, ManifestCoverage]:
    out: dict[str, ManifestCoverage] = {}
    if not FEATURES_DIR.is_dir():
        return out
    for path in sorted(FEATURES_DIR.glob("*.md")):
        if path.name == "TEMPLATE.md":
            continue
        text = path.read_text(encoding="utf-8")
        slug_m = re.search(r"\*\*Feature slug:\*\*\s*`([^`]+)`", text)
        status_m = re.search(r"\*\*Status:\*\*\s*(\w+)", text)
        suite_m = re.search(r"\*\*Suite membership:\*\*\s*([^\n]+)", text)
        slug = slug_m.group(1) if slug_m else path.stem
        status = status_m.group(1) if status_m else "unknown"
        suites: list[str] = []
        if suite_m:
            suites = [s.strip() for s in re.split(r"[,|]", suite_m.group(1)) if s.strip()]
        has_eval = "## Evaluation recipe" in text
        has_regression = "## Regression checks" in text
        surfaces = ""
        if "## Surfaces" in text:
            start = text.index("## Surfaces")
            end = text.find("\n## ", start + 1)
            surfaces = text[start : end if end != -1 else None]
        out[slug] = ManifestCoverage(
            slug, status, suites, has_eval, has_regression, surfaces
        )
    return out


def capability_key(cap_type: str, cap_id: str) -> str:
    return f"{cap_type}:{cap_id}"


def build_surface_index(manifests: dict[str, ManifestCoverage]) -> dict[str, str]:
    """Map capability key -> manifest slug from Surfaces heuristics."""
    index: dict[str, str] = {}
    for slug, manifest in manifests.items():
        surf = manifest.surfaces
        for cmd in re.findall(r"\.cursor/commands/([^.]+)\.md", surf):
            index[capability_key("command", cmd)] = slug
        for agent in re.findall(r"\.cursor/agents/([^.]+)\.md", surf):
            index[capability_key("agent", agent)] = slug
        for skill in re.findall(r"\.cursor/skills/([^/]+)/", surf):
            index[capability_key("skill", skill)] = slug
        if f"/{slug}" in surf:
            index[capability_key("command", slug)] = slug
    return index


def coverage_for(
    cap_type: str,
    cap_id: str,
    manifest_slug: str | None,
    manifests: dict[str, ManifestCoverage],
    surface_index: dict[str, str],
) -> CoverageBadge:
    slug = manifest_slug or surface_index.get(capability_key(cap_type, cap_id))
    if not slug or slug not in manifests:
        return CoverageBadge()
    m = manifests[slug]
    active = m.status.lower() == "active"
    return CoverageBadge(
        eval_on=m.has_eval,
        test_on=active and m.has_regression,
        smoke_on="smoke" in m.suites,
        full_on="full" in m.suites,
    )


def badge_html(label: str, on: bool) -> str:
    cls = "badge on" if on else "badge off"
    return (
        f'<span class="{cls}" title="{html.escape(label)}">'
        f"{html.escape(label)}</span>"
    )


def chip_html(cap: CapabilityInfo, coverage: CoverageBadge) -> str:
    type_label = {"skill": "Skill", "command": "Command", "agent": "Agent"}[cap.type]
    accent = TYPE_COLORS.get(cap.type, "#8b9dc7")
    display_id = f"/{cap.id}" if cap.type == "command" else cap.id
    title = cap.title
    desc = cap.description[:220] + ("…" if len(cap.description) > 220 else "")
    badges = "".join(
        [
            badge_html("Eval", coverage.eval_on),
            badge_html("Test", coverage.test_on),
            badge_html("Smoke", coverage.smoke_on),
            badge_html("Full", coverage.full_on),
        ]
    )
    return f"""
    <article class="chip chip-{html.escape(cap.type)}" style="--accent: {html.escape(accent)}">
      <header class="chip-head">
        <span class="chip-type">{html.escape(type_label)}</span>
        <code class="chip-id">{html.escape(display_id)}</code>
      </header>
      <h3 class="chip-title">{html.escape(title)}</h3>
      <p class="chip-desc">{html.escape(desc)}</p>
      <div class="chip-badges">{badges}</div>
    </article>
    """


def panel_html(domain: DomainConfig, chips: str, panel_index: int) -> str:
    accent = domain.color
    if not chips.strip():
        body = f'<p class="panel-blurb solo">{html.escape(domain.blurb)}</p>'
    else:
        body = f'<p class="panel-blurb">{html.escape(domain.blurb)}</p><div class="chips">{chips}</div>'
    return f"""
    <section class="panel" id="domain-{html.escape(domain.id)}" data-panel="{panel_index}"
             style="--accent: {html.escape(accent)}">
      <div class="panel-frame">
        <div class="panel-corner tl"></div>
        <div class="panel-corner tr"></div>
        <div class="panel-corner bl"></div>
        <div class="panel-corner br"></div>
        <h2 class="panel-title">{html.escape(domain.label)}</h2>
        {body}
      </div>
    </section>
    """


def connector_svg(panel_count: int) -> str:
    """Orthogonal traces linking domain panels (decorative)."""
    if panel_count < 2:
        return ""
    paths = []
    # Hub from core (0) to others — approximate layout for 7 panels in grid
    pairs = [
        (0, 1),
        (0, 2),
        (0, 3),
        (0, 4),
        (1, 5),
        (2, 5),
        (3, 6),
        (4, 7),
        (5, 6),
        (6, 7),
    ]
    coords = {
        0: (50, 10),
        1: (14, 34),
        2: (36, 34),
        3: (58, 34),
        4: (86, 34),
        5: (22, 72),
        6: (50, 76),
        7: (78, 72),
    }
    for a, b in pairs:
        if a >= panel_count or b >= panel_count:
            continue
        x1, y1 = coords.get(a, (50, 50))
        x2, y2 = coords.get(b, (50, 50))
        mx = (x1 + x2) / 2
        d = f"M {x1} {y1} L {mx} {y1} L {mx} {y2} L {x2} {y2}"
        paths.append(
            f'<path class="trace" d="{d}" fill="none" stroke-width="0.15"/>'
        )
    return f"""
    <svg class="connectors" viewBox="0 0 100 90" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.35"/>
          <stop offset="50%" stop-color="#bf5af2" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#39ff14" stop-opacity="0.35"/>
        </linearGradient>
      </defs>
      {''.join(paths)}
    </svg>
    """


def render_html(
    domains: list[DomainConfig],
    skills: dict[str, CapabilityInfo],
    commands: dict[str, CapabilityInfo],
    agents: dict[str, CapabilityInfo],
    manifests: dict[str, ManifestCoverage],
) -> str:
    surface_index = build_surface_index(manifests)
    panels: list[str] = []
    manifest_feature_count = len(manifests)

    for i, domain in enumerate(domains):
        chips_parts: list[str] = []
        for ref in domain.capabilities:
            pool = {"skill": skills, "command": commands, "agent": agents}[ref.type]
            cap = pool.get(ref.id)
            if not cap:
                cap = CapabilityInfo(ref.type, ref.id, ref.id, "(not found in repo scan)")
            cov = coverage_for(
                ref.type, ref.id, ref.manifest_slug, manifests, surface_index
            )
            chips_parts.append(chip_html(cap, cov))
        panels.append(panel_html(domain, "".join(chips_parts), i))

    skill_n = len(skills)
    cmd_n = len(commands)
    agent_n = len(agents)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="description" content="AgentOS capability map — skills, slash commands, and subagents by domain."/>
  <title>AgentOS — Capability Map</title>
  <style>
    :root {{
      --bg: #06080c;
      --bg-grid: #0a1018;
      --text: #c8d3f5;
      --muted: #6b7a99;
      --panel-bg: rgba(8, 12, 20, 0.92);
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: "SF Mono", "Fira Code", "Consolas", ui-monospace, monospace;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.45;
    }}
    .substrate {{
      position: fixed;
      inset: 0;
      background-image:
        radial-gradient(circle at 1px 1px, var(--bg-grid) 1px, transparent 0);
      background-size: 24px 24px;
      opacity: 0.55;
      pointer-events: none;
      z-index: 0;
    }}
    .wrap {{
      position: relative;
      z-index: 1;
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem 1.25rem 3rem;
    }}
    header.page-header {{
      border: 1px solid rgba(0, 229, 255, 0.35);
      padding: 1.25rem 1.5rem;
      margin-bottom: 1.5rem;
      background: var(--panel-bg);
      box-shadow: 0 0 24px rgba(0, 229, 255, 0.06);
    }}
    header.page-header h1 {{
      font-size: 1.35rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #e8ecff;
    }}
    header.page-header .tagline {{
      margin-top: 0.35rem;
      color: var(--muted);
      font-size: 0.8rem;
    }}
    .stats {{
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1.25rem;
      margin-top: 0.85rem;
      font-size: 0.72rem;
      color: #8b9dc7;
    }}
    .stats span {{
      border-left: 2px solid #00e5ff;
      padding-left: 0.5rem;
    }}
    .legend {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 1rem;
      margin-bottom: 1.25rem;
      font-size: 0.68rem;
      color: var(--muted);
    }}
    .legend-types {{
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
    }}
    .type-swatch {{
      padding: 0.15rem 0.45rem;
      border: 1px solid color-mix(in srgb, var(--swatch) 55%, #1a2233);
      color: var(--swatch);
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}
    .type-swatch.skill {{ --swatch: {TYPE_COLORS["skill"]}; }}
    .type-swatch.command {{ --swatch: {TYPE_COLORS["command"]}; }}
    .type-swatch.agent {{ --swatch: {TYPE_COLORS["agent"]}; }}
    .legend-coverage {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.35rem;
    }}
    .legend .badge {{ font-size: 0.65rem; }}
    .map-stage {{
      position: relative;
    }}
    .connectors {{
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }}
    .connectors .trace {{
      stroke: url(#traceGrad);
      stroke-opacity: 0.5;
    }}
    .panels {{
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
    }}
    .panel {{
      min-width: 0;
    }}
    .panel-frame {{
      position: relative;
      border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
      background: var(--panel-bg);
      padding: 1rem 1rem 1.1rem;
      box-shadow:
        0 0 12px color-mix(in srgb, var(--accent) 18%, transparent),
        inset 0 0 20px rgba(0, 0, 0, 0.35);
    }}
    .panel-corner {{
      position: absolute;
      width: 10px;
      height: 10px;
      border-color: var(--accent);
      border-style: solid;
      opacity: 0.85;
    }}
    .panel-corner.tl {{ top: 4px; left: 4px; border-width: 1px 0 0 1px; }}
    .panel-corner.tr {{ top: 4px; right: 4px; border-width: 1px 1px 0 0; }}
    .panel-corner.bl {{ bottom: 4px; left: 4px; border-width: 0 0 1px 1px; }}
    .panel-corner.br {{ bottom: 4px; right: 4px; border-width: 0 1px 1px 0; }}
    .panel-title {{
      font-size: 0.85rem;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.5rem;
    }}
    .panel-blurb {{
      font-size: 0.7rem;
      color: var(--muted);
      margin-bottom: 0.75rem;
    }}
    .panel-blurb.solo {{ margin-bottom: 0; }}
    .chips {{
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }}
    .chip {{
      border: 1px solid color-mix(in srgb, var(--accent) 50%, #1a2233);
      padding: 0.65rem 0.75rem;
      background: rgba(4, 8, 14, 0.6);
      box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 12%, transparent);
    }}
    .chip-head {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }}
    .chip-type {{
      font-size: 0.62rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent);
    }}
    .chip-id {{
      font-size: 0.68rem;
      color: #9aa5ce;
    }}
    .chip-title {{
      font-size: 0.78rem;
      font-weight: 600;
      color: #e0e6ff;
      margin-bottom: 0.2rem;
    }}
    .chip-desc {{
      font-size: 0.68rem;
      color: var(--muted);
      margin-bottom: 0.45rem;
    }}
    .chip-badges {{
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }}
    .chip-badges .badge {{
      padding: 0.12rem 0.4rem;
      font-size: 0.6rem;
      border: 1px solid #2a3348;
      letter-spacing: 0.03em;
    }}
    .chip-badges .badge.on {{
      color: #c5d0ef;
      border-color: #6b7fae;
      background: rgba(90, 120, 180, 0.12);
    }}
    .chip-badges .badge.off {{
      color: #3a455c;
      border-color: #1a2233;
      background: transparent;
    }}
    .legend-coverage .badge.on {{
      color: #c5d0ef;
      border: 1px solid #6b7fae;
      padding: 0.12rem 0.4rem;
    }}
    .legend-coverage .badge.off {{
      color: #3a455c;
      border: 1px solid #1a2233;
      padding: 0.12rem 0.4rem;
    }}
    footer.page-footer {{
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #1e2a3d;
      font-size: 0.68rem;
      color: var(--muted);
    }}
    footer a {{ color: #00e5ff; }}
    @media (prefers-reduced-motion: reduce) {{
      .connectors .trace {{ stroke-opacity: 0.35; }}
    }}
    @media (max-width: 640px) {{
      .panels {{ grid-template-columns: 1fr; }}
    }}
  </style>
</head>
<body>
  <div class="substrate" aria-hidden="true"></div>
  <div class="wrap">
    <header class="page-header">
      <h1>AgentOS — Capability Map</h1>
      <p class="tagline">Chief-of-Staff system: planning, synthesis, delegation, and light execution across personal, household, and work.</p>
      <div class="stats">
        <span>{skill_n} skills</span>
        <span>{cmd_n} slash commands</span>
        <span>{agent_n} subagents</span>
        <span>{manifest_feature_count} features with saved test manifests</span>
      </div>
    </header>
    <div class="legend" aria-label="Map legend">
      <div class="legend-types" aria-label="Capability types">
        <span class="type-swatch skill">Skill</span>
        <span class="type-swatch command">Command</span>
        <span class="type-swatch agent">Agent</span>
      </div>
      <div class="legend-coverage" aria-label="Test coverage">
        <span>Coverage</span>
        <span class="badge on">Eval</span>
        <span class="badge off">Smoke</span>
        <span>bright = linked manifest · dim = not linked</span>
      </div>
    </div>
    <div class="map-stage">
      {connector_svg(len(domains))}
      <div class="panels">
        {''.join(panels)}
      </div>
    </div>
    <footer class="page-footer">
      <p>Evaluation checks spec conformance after a build; testing reruns saved manifests (<code>docs/testing/features/</code>).
      See <a href="../testing/README.md">docs/testing/README.md</a>. Regenerate this page:
      <code>python3 scripts/build-capability-map.py</code></p>
    </footer>
  </div>
</body>
</html>
"""


def main() -> int:
    if not DOMAINS_PATH.is_file():
        print(f"Missing {DOMAINS_PATH}", file=sys.stderr)
        return 1
    domains = load_domains_yaml(DOMAINS_PATH)
    skills = scan_skills()
    commands = scan_commands()
    agents = scan_agents()
    manifests = scan_manifests()
    html_out = render_html(domains, skills, commands, agents, manifests)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(html_out, encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"  {len(skills)} skills, {len(commands)} commands, {len(agents)} agents, {len(manifests)} manifests")
    return 0


if __name__ == "__main__":
    sys.exit(main())
