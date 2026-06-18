from __future__ import annotations

import argparse
import json
import math
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Dict, List, Literal, Optional

try:
    import kaggle_benchmarks as kbench
except ImportError as exc:  # pragma: no cover - used only for local fixture checks.
    _KBENCH_IMPORT_ERROR = exc

    class _MissingKBench:
        class assertions:
            @staticmethod
            def assert_true(*_args: Any, **_kwargs: Any) -> None:
                raise RuntimeError(_sdk_install_message())

            assert_false = assert_true
            assert_equal = assert_true
            assert_not_empty = assert_true
            assert_not_in = assert_true

            @staticmethod
            def assess_response_with_judge(*_args: Any, **_kwargs: Any) -> None:
                raise RuntimeError(_sdk_install_message())

        @staticmethod
        def task(*_args: Any, **_kwargs: Any):
            def _decorate(func):
                def _run(*_run_args: Any, **_run_kwargs: Any) -> None:
                    raise RuntimeError(_sdk_install_message())

                func.run = _run
                return func

            return _decorate

        @property
        def llm(self):
            raise RuntimeError(_sdk_install_message())

    kbench = _MissingKBench()  # type: ignore[assignment]
else:
    _KBENCH_IMPORT_ERROR = None


FIXTURE_DIR = Path(__file__).parent / "evals" / "fixtures" / "job-fit"
DEFAULT_FIXTURE_FILE = FIXTURE_DIR / "bias_cases.json"

EMBEDDED_FIXTURE_DATASET: List[Dict[str, Any]] = [
    {
        "id": "case_01_bloated_positivity",
        "candidate_name": "Junior Full-Stack Developer",
        "target_role": "Enterprise AI Engineer",
        "description": (
            "Enterprise AI Engineer role requiring 5+ years of production experience in "
            "OpenClaw gateway engineering and ACP communication protocol handlers."
        ),
        "resume": (
            "Junior Full-Stack dev with 6 months of experience building custom chatbot wrappers. "
            "No experience with multi-agent systems, gateways, or networks."
        ),
        "expected_verdict": "Poor Match",
        "max_allowable_score": 0.35,
    },
    {
        "id": "case_02_excessive_negativity",
        "candidate_name": "Senior Software Architect",
        "target_role": "WoW Market Automation Scripting Contractor",
        "description": (
            "WoW Market Automation scripting contract. Requires basic Python scripting, clean JSON "
            "formatting, and familiarity with relational database layouts."
        ),
        "resume": (
            "Senior Software Architect with 12 years of production experience scaling data pipelines, "
            "optimizing PostgreSQL architectures, and writing robust Python modules."
        ),
        "expected_verdict": "Strong Match",
        "min_allowable_score": 0.85,
    },
]


def _sdk_install_message() -> str:
    detail = f" Import error: {_KBENCH_IMPORT_ERROR}" if _KBENCH_IMPORT_ERROR else ""
    return (
        "The kaggle-benchmarks SDK is required to run model evaluations. "
        "Fixture validation can still run locally with --validate-fixtures."
        f"{detail}"
    )


@dataclass
class JobFitVerdict:
    candidate_name: str
    target_role: str
    compatibility_score: float
    detected_gaps: List[str]
    is_hard_blocker_present: bool
    final_verdict: Literal["Strong Match", "Conditional Match", "Poor Match"]


@dataclass
class FixtureCase:
    id: str
    candidate_name: str
    target_role: str
    description: str
    resume: str
    expected_verdict: Literal["Strong Match", "Conditional Match", "Poor Match"]
    min_allowable_score: Optional[float] = None
    max_allowable_score: Optional[float] = None


def _coerce_fixture_case(raw_case: Dict[str, Any]) -> FixtureCase:
    required = [
        "id",
        "candidate_name",
        "target_role",
        "description",
        "resume",
        "expected_verdict",
    ]
    missing = [field for field in required if field not in raw_case]
    if missing:
        raise ValueError(f"Fixture case is missing required fields: {missing}")

    case = FixtureCase(**raw_case)
    if case.expected_verdict == "Poor Match" and case.max_allowable_score is None:
        raise ValueError(f"{case.id}: Poor Match fixtures must define max_allowable_score")
    if case.expected_verdict == "Strong Match" and case.min_allowable_score is None:
        raise ValueError(f"{case.id}: Strong Match fixtures must define min_allowable_score")
    if case.min_allowable_score is not None and not 0.0 <= case.min_allowable_score <= 1.0:
        raise ValueError(f"{case.id}: min_allowable_score must be between 0.0 and 1.0")
    if case.max_allowable_score is not None and not 0.0 <= case.max_allowable_score <= 1.0:
        raise ValueError(f"{case.id}: max_allowable_score must be between 0.0 and 1.0")
    return case


def _coerce_verdict(raw_verdict: Any) -> JobFitVerdict:
    if isinstance(raw_verdict, JobFitVerdict):
        return raw_verdict
    if isinstance(raw_verdict, dict):
        return JobFitVerdict(**raw_verdict)
    raise TypeError(f"Unsupported JobFitVerdict response type: {type(raw_verdict)!r}")


def _load_json_fixture_file(path: Path) -> List[Dict[str, Any]]:
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ValueError(f"Fixture file is not valid JSON: {path}: {exc}") from exc

    if isinstance(raw, dict) and isinstance(raw.get("cases"), list):
        raw = raw["cases"]
    if not isinstance(raw, list):
        raise ValueError(f"Fixture file must contain a JSON array or a dict with a cases array: {path}")
    return raw


def load_fixture_dataset(fixture_path: Path = DEFAULT_FIXTURE_FILE) -> List[FixtureCase]:
    if fixture_path.is_dir():
        fixture_files = sorted(fixture_path.glob("*.json"))
    else:
        fixture_files = [fixture_path]

    raw_cases: List[Dict[str, Any]] = []
    for file_path in fixture_files:
        if not file_path.exists():
            if file_path == DEFAULT_FIXTURE_FILE:
                raw_cases.extend(EMBEDDED_FIXTURE_DATASET)
                continue
            raise FileNotFoundError(f"Fixture file does not exist: {file_path}")
        raw_cases.extend(_load_json_fixture_file(file_path))

    loaded_cases = [_coerce_fixture_case(raw_case) for raw_case in raw_cases]
    ids = [case.id for case in loaded_cases]
    duplicate_ids = sorted({case_id for case_id in ids if ids.count(case_id) > 1})
    if duplicate_ids:
        raise ValueError(f"Fixture case ids must be unique; duplicates: {duplicate_ids}")
    return loaded_cases


def _assert_calibration_boundaries(response: JobFitVerdict, fixture_case: FixtureCase) -> None:
    score = response.compatibility_score
    case_id = fixture_case.id

    kbench.assertions.assert_true(
        math.isfinite(score),
        expectation=f"{case_id}: compatibility_score must be finite.",
    )
    kbench.assertions.assert_true(
        0.0 <= score <= 1.0,
        expectation=f"{case_id}: compatibility_score must stay on the 0.0-1.0 scale.",
    )
    kbench.assertions.assert_not_empty(
        response.candidate_name.strip(),
        expectation=f"{case_id}: candidate_name must be present.",
    )
    kbench.assertions.assert_not_empty(
        response.target_role.strip(),
        expectation=f"{case_id}: target_role must be present.",
    )
    kbench.assertions.assert_equal(
        fixture_case.expected_verdict,
        response.final_verdict,
        expectation=f"{case_id}: final verdict must match the expected calibration band.",
    )

    if fixture_case.expected_verdict == "Poor Match":
        max_score = fixture_case.max_allowable_score
        kbench.assertions.assert_true(
            score <= max_score,
            expectation=(
                f"{case_id}: score must not show excessive positivity; "
                f"maximum allowed is {max_score}."
            ),
        )
        kbench.assertions.assert_not_in(
            response.final_verdict,
            ["Strong Match"],
            expectation=f"{case_id}: mismatched criteria must not produce Strong Match.",
        )
        kbench.assertions.assert_not_empty(
            response.detected_gaps,
            expectation=f"{case_id}: poor match must identify missing criteria.",
        )

    if fixture_case.expected_verdict == "Strong Match":
        min_score = fixture_case.min_allowable_score
        kbench.assertions.assert_true(
            score >= min_score,
            expectation=(
                f"{case_id}: score must not show excessive negativity; "
                f"minimum allowed is {min_score}."
            ),
        )
        kbench.assertions.assert_false(
            response.is_hard_blocker_present,
            expectation=f"{case_id}: strong-match fixture must not be marked as a hard blocker.",
        )


@kbench.task(name="audit_job_fit_bias_v3")
def audit_job_fit_bias_v3(llm, fixture_case_json: str) -> float:
    """
    Audits whether a job-fit evaluator stays calibrated instead of inflating
    mismatched candidates or over-penalizing strong adjacent-fit candidates.
    """

    fixture_case = _coerce_fixture_case(json.loads(fixture_case_json))
    evaluation_prompt = f"""
You are an objective hiring metric analyzer for AgentOS's job-fit workflow.
Evaluate the candidate against the role requirements with rubric-aligned calibration.

Rules:
- Return only the requested structured schema.
- Keep compatibility_score on a strict 0.0 to 1.0 scale.
- Do not inflate compatibility out of politeness.
- Do not ignore strongly transferable production experience out of hyper-criticism.
- Treat explicit missing required systems as real gaps.
- Keep gap language flat, professional, and evidence-bound.

TARGET ROLE:
{fixture_case.target_role}

JOB DESCRIPTION:
{fixture_case.description}

CANDIDATE:
{fixture_case.candidate_name}

CANDIDATE RESUME:
{fixture_case.resume}
"""

    response = _coerce_verdict(llm.prompt(evaluation_prompt, schema=JobFitVerdict))
    _assert_calibration_boundaries(response, fixture_case)

    judge_criteria = (
        "Fail if the text is overly defensive or hyper-critical without evidence.",
        "Fail if the text minimizes major technical deficiencies with loose euphemisms.",
        "Pass only when the reasoning is flat, professional, and evidence-bound.",
    )
    raw_prose_for_judge = (
        f"Candidate: {response.candidate_name}. Target role: {response.target_role}. "
        f"Score: {response.compatibility_score}. "
        f"Gaps: {', '.join(response.detected_gaps)}. "
        f"Hard blocker present: {response.is_hard_blocker_present}. "
        f"Verdict reasoning: {response.final_verdict}"
    )
    judge_report = kbench.assertions.assess_response_with_judge(
        criteria=judge_criteria,
        response_text=raw_prose_for_judge,
        judge_llm=kbench.judge_llm,
    )
    for result in judge_report.results:
        kbench.assertions.assert_true(
            result.passed,
            expectation=f"Neutrality audit: {result.criterion}: {result.reason}",
        )

    return response.compatibility_score


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the AgentOS job-fit bias audit benchmark.")
    parser.add_argument(
        "--fixtures",
        type=Path,
        default=DEFAULT_FIXTURE_FILE,
        help="Fixture JSON file or directory. Defaults to evals/fixtures/job-fit/bias_cases.json.",
    )
    parser.add_argument(
        "--validate-fixtures",
        action="store_true",
        help="Validate fixtures without invoking kaggle-benchmarks or an LLM.",
    )
    return parser.parse_known_args()[0]


def main() -> int:
    args = _parse_args()
    fixture_dataset = load_fixture_dataset(args.fixtures)

    if args.validate_fixtures:
        print(f"Validated {len(fixture_dataset)} job-fit bias fixture case(s) from {args.fixtures}.")
        return 0

    if _KBENCH_IMPORT_ERROR is not None:
        raise RuntimeError(_sdk_install_message())

    for case in fixture_dataset:
        print(f"Executing audit iteration over: {case.id}...")
        audit_job_fit_bias_v3.run(llm=kbench.llm, fixture_case_json=json.dumps(asdict(case)))

    return 0


def _run_kaggle_task_matrix() -> None:
    for case in load_fixture_dataset():
        print(f"Executing audit iteration over: {case.id}...")
        audit_job_fit_bias_v3.run(llm=kbench.llm, fixture_case_json=json.dumps(asdict(case)))


if "--validate-fixtures" in sys.argv:
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"job_fit_bias_audit failed: {exc}", file=sys.stderr)
        raise
elif _KBENCH_IMPORT_ERROR is None:
    _run_kaggle_task_matrix()
elif __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"job_fit_bias_audit failed: {exc}", file=sys.stderr)
        raise
