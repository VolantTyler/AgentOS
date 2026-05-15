import re
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
COMMAND_PATH = REPO_ROOT / ".cursor/commands/lookahead-match.md"
AGENT_PATH = REPO_ROOT / ".cursor/agents/lookahead-networker.md"
SKILL_PATH = REPO_ROOT / ".cursor/skills/lookahead-networker/SKILL.md"
README_PATH = REPO_ROOT / "README.md"
AGENTS_DOC_PATH = REPO_ROOT / "AGENTS.md"
RESEARCH_README_PATH = REPO_ROOT / "docs/research/README.md"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_frontmatter(markdown_text: str) -> dict[str, str]:
    match = re.match(r"^---\n(.*?)\n---\n", markdown_text, re.DOTALL)
    if not match:
        return {}

    frontmatter = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        frontmatter[key.strip()] = value.strip()
    return frontmatter


def get_heading_section(markdown_text: str, heading: str) -> str:
    match = re.search(
        rf"^### {re.escape(heading)}\n(.*?)(?=^### |\Z)",
        markdown_text,
        re.DOTALL | re.MULTILINE,
    )
    if not match:
        return ""
    return match.group(1)


class LookaheadNetworkingWorkflowContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.command_text = read_text(COMMAND_PATH)
        cls.agent_text = read_text(AGENT_PATH)
        cls.skill_text = read_text(SKILL_PATH)
        cls.readme_text = read_text(README_PATH)
        cls.agents_doc_text = read_text(AGENTS_DOC_PATH)
        cls.research_readme_text = read_text(RESEARCH_README_PATH)
        cls.continuity_text = read_text(REPO_ROOT / "docs/CONTINUITY.md")
        cls.agent_frontmatter = parse_frontmatter(cls.agent_text)
        cls.skill_frontmatter = parse_frontmatter(cls.skill_text)
        cls.agents_verification_section = get_heading_section(cls.agents_doc_text, "Verifying the environment")

    def test_command_requires_delegation_to_repo_subagent(self) -> None:
        self.assertIn("`lookahead-networker`", self.command_text)
        self.assertIn(".cursor/agents/lookahead-networker.md", self.command_text)
        self.assertIn(".cursor/skills/lookahead-networker/SKILL.md", self.command_text)
        self.assertIn("If delegation is unavailable", self.command_text)

    def test_command_documents_defaults_and_expected_response_shape(self) -> None:
        self.assertIn("docs/research/events-YYYY-MM-DD.md", self.command_text)
        self.assertIn("events-research-YYYY-MM-DD.md", self.command_text)
        self.assertIn("docs/research/networking-targets-YYYY-MM-DD-<eventslug>.md", self.command_text)
        self.assertIn("Top 3 targets", self.command_text)
        self.assertIn("Human checks", self.command_text)

    def test_command_defaults_keep_non_guessing_selection_and_chat_only_reply(self) -> None:
        self.assertIn("if there is a real tie, ask Tyler to pick rather than guessing", self.command_text)
        self.assertIn("or say `chat-only`", self.command_text)
        self.assertIn(
            "engineering leads, founders, research or product builders, and technical PMs",
            self.command_text,
        )

    def test_default_digest_priority_orders_current_naming_before_legacy(self) -> None:
        self.assertRegex(
            self.command_text,
            re.compile(
                r"Input digest:.*events-YYYY-MM-DD\.md.*if none exist, try legacy.*events-research-YYYY-MM-DD\.md",
                re.DOTALL,
            ),
        )
        self.assertRegex(
            self.agent_text,
            re.compile(
                r"If no digest path was provided, use the latest:.*1\.\s+`docs/research/events-YYYY-MM-DD\.md`, or.*2\.\s+legacy `docs/research/events-research-YYYY-MM-DD\.md`",
                re.DOTALL,
            ),
        )

    def test_command_fallback_keeps_career_fit_grounding(self) -> None:
        self.assertIn("If delegation is unavailable", self.command_text)
        self.assertIn("say so once", self.command_text)
        self.assertIn("ground the result in `docs/career-fit-context.md`", self.command_text)

    def test_command_reply_contract_keeps_ordered_three_item_handoff(self) -> None:
        self.assertRegex(
            self.command_text,
            re.compile(
                r"Reply with:\n\n"
                r"1\. \*\*Top 3 targets\*\*.*\n"
                r"2\. \*\*Path\*\*.*\n"
                r"3\. \*\*Human checks\*\*",
                re.DOTALL,
            ),
        )

    def test_agent_frontmatter_and_authority_are_present(self) -> None:
        self.assertEqual("lookahead-networker", self.agent_frontmatter.get("name"))
        self.assertEqual("inherit", self.agent_frontmatter.get("model"))
        self.assertIn(".cursor/skills/lookahead-networker/SKILL.md", self.agent_text)
        self.assertIn("docs/career-fit-context.md", self.agent_text)
        self.assertIn("docs/research/networking-targets-YYYY-MM-DD-<eventslug>.md", self.agent_text)

    def test_agent_reads_identity_brief_only_when_parent_requests_it(self) -> None:
        self.assertIn(
            "Read `docs/identity-brief.md` only if the parent asks for extra positioning or tone context.",
            self.agent_text,
        )

    def test_agent_guardrails_include_honesty_and_overlap_clarity(self) -> None:
        self.assertIn("No fabrication", self.agent_text)
        self.assertIn("docs/BOUNDARIES.md", self.agent_text)
        self.assertIn("direct overlap", self.agent_text)
        self.assertIn("adjacent overlap", self.agent_text)
        self.assertIn("best 3 targets or fewer", self.agent_text)

    def test_agent_rules_require_timezone_people_first_and_specificity(self) -> None:
        self.assertIn("America/New_York", self.agent_text)
        self.assertIn("Prefer people first", self.agent_text)
        self.assertIn("Specificity over flattery", self.agent_text)
        self.assertIn("one-line event-fit summary", self.agent_text)

    def test_agent_parameters_preserve_user_intent_inputs(self) -> None:
        self.assertIn("target event name", self.agent_text)
        self.assertIn("explicit digest path", self.agent_text)
        self.assertIn("`attending` vs `considering`", self.agent_text)
        self.assertIn("any company or topic bias", self.agent_text)
        self.assertIn("whether Tyler wants the output saved", self.agent_text)

    def test_agent_return_payload_contract_stays_ordered_for_parent(self) -> None:
        self.assertRegex(
            self.agent_text,
            re.compile(
                r"Return to parent:\n\n"
                r"1\. \*\*file path\*\* \(or `chat-only`\)\n"
                r"2\. \*\*top 3 targets\*\*\n"
                r"3\. \*\*one-line event-fit summary\*\*",
                re.DOTALL,
            ),
        )

    def test_skill_frontmatter_and_required_io_contract(self) -> None:
        self.assertEqual("lookahead-networker", self.skill_frontmatter.get("name"))
        self.assertEqual("true", self.skill_frontmatter.get("disable-model-invocation"))
        self.assertIn("docs/research/events-*.md", self.skill_text)
        self.assertIn("docs/career-fit-context.md", self.skill_text)
        self.assertIn("Choose up to 3 highest-value targets", self.skill_text)

    def test_skill_output_template_keeps_required_sections(self) -> None:
        self.assertIn("# Networking targets — [event title]", self.skill_text)
        self.assertIn("## Best targets", self.skill_text)
        self.assertIn("## Watchlist / secondary targets", self.skill_text)
        self.assertIn('**The "Why":**', self.skill_text)
        self.assertIn("## Human check before the event", self.skill_text)

    def test_skill_guardrails_and_workflow_cover_tie_and_source_quality(self) -> None:
        self.assertIn("Do **not** invent attendance, bios, funding, recent launches", self.skill_text)
        self.assertIn("Prefer official speaker pages, organizer agendas", self.skill_text)
        self.assertIn("best company-level targets plus a human-check list", self.skill_text)
        self.assertIn("ask Tyler to choose instead of pretending certainty", self.skill_text)

    def test_audience_filter_and_chat_only_contracts_are_consistent(self) -> None:
        self.assertIn("skip pure marketing or sales contacts", self.command_text)
        self.assertIn("Skip low-signal marketing or sales contacts", self.agent_text)
        self.assertIn("Exclude low-signal marketing or sales contacts", self.skill_text)
        self.assertIn("or say `chat-only`", self.command_text)
        self.assertIn("chat output is acceptable", self.skill_text)

    def test_skill_output_template_keeps_key_fields_for_downstream_use(self) -> None:
        self.assertIn("- **Prepared:** [ISO date] (America/New_York)", self.skill_text)
        self.assertIn("- **Source digest:** [path]", self.skill_text)
        self.assertIn("- **Target event:** [event name]", self.skill_text)
        self.assertIn("- **Status:** [attending | considering | unknown]", self.skill_text)
        self.assertIn("- **Focus lens:** [1-2 lines on why this event matches Tyler's goals]", self.skill_text)
        self.assertIn("- **Digital Outreach Draft:** [Under 300 characters]", self.skill_text)
        self.assertIn("- **Sources / Confidence:** [What this is based on and any uncertainty]", self.skill_text)

    def test_all_layers_keep_legacy_digest_fallback(self) -> None:
        self.assertIn("events-research-YYYY-MM-DD.md", self.command_text)
        self.assertIn("events-research-YYYY-MM-DD.md", self.agent_text)
        self.assertIn("events-research-*.md", self.skill_text)

    def test_default_output_path_pattern_is_consistent_across_workflow(self) -> None:
        output_pattern = "networking-targets-YYYY-MM-DD-<eventslug>.md"
        self.assertIn(output_pattern, self.command_text)
        self.assertIn(output_pattern, self.agent_text)
        self.assertIn(output_pattern, self.skill_text)
        self.assertIn(output_pattern, self.research_readme_text)

    def test_cross_file_linkage_uses_same_subagent_and_skill(self) -> None:
        subagent_name = self.agent_frontmatter.get("name")
        self.assertIsNotNone(subagent_name)
        self.assertIn(f"`{subagent_name}`", self.command_text)
        self.assertIn(".cursor/skills/lookahead-networker/SKILL.md", self.command_text)
        self.assertIn(".cursor/skills/lookahead-networker/SKILL.md", self.agent_text)

    def test_readme_registers_new_skill_and_slash_command(self) -> None:
        self.assertIn("`/lookahead-match`", self.readme_text)
        self.assertIn(".cursor/commands/lookahead-match.md", self.readme_text)
        self.assertIn("`lookahead-networker`", self.readme_text)
        self.assertIn(".cursor/agents/lookahead-networker.md", self.readme_text)

    def test_agents_doc_lists_lookahead_workflow_assets(self) -> None:
        self.assertIn(".cursor/skills/lookahead-networker/", self.agents_doc_text)
        self.assertIn(".cursor/commands/lookahead-match.md", self.agents_doc_text)
        self.assertIn(".cursor/agents/lookahead-networker.md", self.agents_doc_text)
        self.assertIn("**`lookahead-networker`**", self.agents_doc_text)
        self.assertIn("**`/lookahead-match`**", self.agents_doc_text)

    def test_research_index_tracks_lookahead_output_contract(self) -> None:
        self.assertIn("| **`/lookahead-match`** | `lookahead-networker` | `lookahead-networker` |", self.research_readme_text)
        self.assertIn("docs/research/networking-targets-YYYY-MM-DD-<eventslug>.md", self.research_readme_text)
        self.assertIn("events-YYYY-MM-DD.md", self.research_readme_text)
        self.assertIn("tech-stack-updates-YYYY-MM-DD.md", self.research_readme_text)

    def test_command_to_agent_preserves_save_or_archive_persistence_intent(self) -> None:
        self.assertIn("`save` / `archive` instruction", self.command_text)
        self.assertIn("whether Tyler wants the output saved", self.agent_text)
        self.assertIn("If Tyler did not ask to save, chat output is acceptable", self.skill_text)

    def test_uncertainty_handling_requires_human_checks_across_all_layers(self) -> None:
        self.assertIn("Human checks", self.command_text)
        self.assertIn("human-check list", self.agent_text)
        self.assertIn("## Human check before the event", self.skill_text)
        self.assertIn("ask Tyler to choose instead of pretending certainty", self.skill_text)

    def test_agents_verification_section_lists_lookahead_assets(self) -> None:
        self.assertNotEqual("", self.agents_verification_section.strip())
        self.assertIn(".cursor/commands/lookahead-match.md", self.agents_verification_section)
        self.assertIn(".cursor/skills/lookahead-networker/SKILL.md", self.agents_verification_section)
        self.assertIn("lookahead-networker.md", self.agents_verification_section)

    def test_agents_verification_section_keeps_existing_event_and_stack_assets(self) -> None:
        self.assertIn(".cursor/commands/events-research.md", self.agents_verification_section)
        self.assertIn(".cursor/commands/tech-stack-updates.md", self.agents_verification_section)
        self.assertIn(".cursor/skills/events-research/SKILL.md", self.agents_verification_section)
        self.assertIn(".cursor/skills/tech-stack-pulse/SKILL.md", self.agents_verification_section)
        self.assertIn("events-scout.md", self.agents_verification_section)
        self.assertIn("stack-radar.md", self.agents_verification_section)

    def test_agents_verification_section_keeps_core_documentation_baseline_assets(self) -> None:
        self.assertIn("AGENTS.md", self.agents_verification_section)
        self.assertIn("README.md", self.agents_verification_section)
        self.assertIn("docs/CONTINUITY.md", self.agents_verification_section)
        self.assertIn("docs/RUNTIME_AND_AGENTS.md", self.agents_verification_section)
        self.assertIn("docs/BOUNDARIES.md", self.agents_verification_section)
        self.assertIn("docs/identity-brief.md", self.agents_verification_section)
        self.assertIn("docs/ONBOARDING_OPEN_QUESTIONS.md", self.agents_verification_section)
        self.assertIn(".cursor/agents/*.md", self.agents_verification_section)

    def test_agents_verification_section_keeps_git_and_env_health_checks(self) -> None:
        self.assertIn("`git status` runs cleanly", self.agents_verification_section)
        self.assertIn("`.env` has been created from `.env.example`", self.agents_verification_section)
        self.assertIn("(never committed)", self.agents_verification_section)

    def test_continuity_log_tracks_event_to_networking_loop_next_step(self) -> None:
        self.assertIn("Run the new event-to-networking loop on a real event", self.continuity_text)
        self.assertIn("`/events-research`", self.continuity_text)
        self.assertIn("`/lookahead-match`", self.continuity_text)


if __name__ == "__main__":
    unittest.main()
