/**
 * Preview a TypeSafe Jev score request for the job-fit rubric.
 *
 * Jev returns typed scores. It does not write the fit brief, and TypeSafe
 * does not fine-tune a private copy on customer data. This script keeps the
 * weighted 1.0–5.0 scorecard in code.
 *
 * Default path is local. `--live` sends the committed career context plus
 * the job description to https://api.typesafe.ai.
 *
 *   npx tsx scripts/job-fit-jev-preview.ts --self-check
 *   npx tsx scripts/job-fit-jev-preview.ts --dry-run --jd role.md
 *   TYPESAFE_API_KEY=... npx tsx scripts/job-fit-jev-preview.ts --live --jd role.md
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

/** Pinned so a later `jev-latest` move does not silently shift thresholds. */
export const JEV_MODEL = "jev-1.13.0";

/**
 * Same weights as docs/JOB_FIT_WORKFLOW.md.
 * Arithmetic stays here because Jev 1.13 is unreliable at math.
 */
export const DIMENSION_WEIGHTS = {
  capability: 0.25,
  interest: 0.15,
  environment: 0.25,
  execution_sustainability: 0.25,
  narrative: 0.1,
} as const;

export const DIMENSIONS = [
  "capability",
  "interest",
  "environment",
  "execution_sustainability",
  "narrative",
] as const;

export type Dimension = (typeof DIMENSIONS)[number];

const LEVELS = 5;

/**
 * Situations, low to high. Jev matches these descriptions; it does not
 * treat the numbers 1–5 as a scale. Code maps level index 0–4 onto 1–5.
 */
const RUBRIC: Record<Dimension, readonly [string, string, string, string, string]> = {
  capability: [
    "The core day-to-day work in the posting is outside the skills and projects in the candidate profile, and closing it would be a career change rather than a supported ramp.",
    "Only a small slice of the posting matches documented skills. Most of the core work has no evidence in the profile.",
    "The posting mixes work the profile already shows with work that would be a real stretch, or the posting is too vague to tell which.",
    "Most of the core work matches documented skills, or the unmatched part is a short ramp the profile's learning pattern can support.",
    "The core work is work the profile already shows at a similar level of ownership and stack.",
  ],
  interest: [
    "The posting's main work is the kind of work the profile says he wants less of.",
    "The posting is mostly adjacent to stated interests, with little of the work he wants more of.",
    "The posting mixes wanted and unwanted work, or interests cannot be judged from the text.",
    "The posting's main work aligns with the kinds of problems and tools the profile says he wants more of.",
    "The posting is centered on the work the profile treats as the target of the career transition.",
  ],
  environment: [
    "The posting describes a working setup the profile says to avoid, such as unclear ownership, weak support, or constant context switching as the job itself.",
    "The posting leans toward those avoid-traits, with little evidence of clarity, collaboration, or scaffolding.",
    "The posting does not describe how the team works, so environment fit is unclear.",
    "The posting describes enough clarity, collaboration, or support to look compatible with the profile.",
    "The posting describes the kind of clear ownership, collaboration, and support the profile says to seek.",
  ],
  execution_sustainability: [
    "The role shape matches recurring pain points in the profile, such as heavy ambiguity, vague ownership, or constant switching, as the normal week.",
    "Those pain points look likely to be a large share of the job.",
    "Risk is mixed, or the posting does not say enough about pace, ownership, or switching.",
    "The role shape looks sustainable against the profile's documented pain points, with only ordinary stretch.",
    "The role shape looks steady against those pain points: clear ownership, limited switching, and enough support to keep performance consistent.",
  ],
  narrative: [
    "There is no coherent story from the profile's path to this role without inventing experience.",
    "A story would depend on a stretch the profile does not yet support.",
    "A story is possible but would have to skip or downplay a large part of the posting.",
    "The profile's path, including the non-linear background, supports a credible story for this role.",
    "This role is a direct next chapter of the path the profile is already building.",
  ],
};

const GROUNDING =
  "Use only `candidate.identity_brief`, `candidate.career_fit_context`, `candidate.tech_stack`, and `role.job_description`. Do not assume unstated employers, compensation, team culture, or interview process. If the posting is silent, treat that dimension as unclear rather than positive.";

export function jobFitQuestions() {
  return {
    capability: score(
      `${GROUNDING} How well can this person credibly do the core work now, or grow into it with reasonable support?`,
      RUBRIC.capability,
    ),
    interest: score(
      `${GROUNDING} How well does the posting's main work match the work the profile says he wants more of?`,
      RUBRIC.interest,
    ),
    environment: score(
      `${GROUNDING} How well does the posting's described working setup match the environments the profile says to seek, and avoid the ones it says to avoid?`,
      RUBRIC.environment,
    ),
    execution_sustainability: score(
      `${GROUNDING} How sustainable does this role shape look against the profile's documented pain points? A higher level means lower risk and better odds of steady performance.`,
      RUBRIC.execution_sustainability,
    ),
    narrative: score(
      `${GROUNDING} How coherent a story can this person tell for why this role fits the path already in the profile?`,
      RUBRIC.narrative,
    ),
    environment_blocker: noul(
      `${GROUNDING} Does the posting explicitly describe a working environment the profile says to avoid, such as unclear ownership, weak management support, or constant context switching as the normal job? Silence is not a yes.`,
      {
        true: "The posting states those avoid-traits as the shape of the job.",
        false: "The posting does not state those avoid-traits, or it describes clarity, collaboration, and support.",
      },
    ),
    execution_blocker: noul(
      `${GROUNDING} Does the posting explicitly describe a week that matches the profile's recurring execution pain points strongly enough to treat the role as a severe sustainability mismatch? Silence is not a yes.`,
      {
        true: "The posting states ambiguity, vague ownership, or heavy switching as the normal week.",
        false: "The posting does not state that week, or it describes clearer ownership and a steadier pace.",
      },
    ),
  };
}

export type ScoreAnswer = {
  score: number;
  confidence: number;
  probabilities: Record<string, number>;
};

export type JobFitJevAnswers = Record<Dimension, ScoreAnswer> & {
  environment_blocker: { noul: number };
  execution_blocker: { noul: number };
};

export type Verdict =
  | "strong fit"
  | "conditional fit"
  | "stretch but plausible"
  | "weak fit"
  | "skip";

export function fitPoint(jevScore: number): number {
  return round2(jevScore + 1);
}

export function verdictFor(overall: number): Verdict {
  if (overall >= 4.2) return "strong fit";
  if (overall >= 3.5) return "conditional fit";
  if (overall >= 2.8) return "stretch but plausible";
  if (overall >= 2.0) return "weak fit";
  return "skip";
}

/** Lower index on a tie. This is a display choice, not a calibrated threshold. */
export function modalLevel(probabilities: Record<string, number>): number {
  let best = 0;
  let bestP = -1;
  for (let level = 0; level < LEVELS; level += 1) {
    const p = probabilities[String(level)] ?? 0;
    if (p > bestP) {
      best = level;
      bestP = p;
    }
  }
  return best;
}

/**
 * Provisional label only. TypeSafe says confidence thresholds must be
 * tuned on labeled job-fit outcomes before they gate a decision.
 */
export function provisionalConfidence(minConfidence: number): "high" | "medium" | "low" {
  if (minConfidence >= 0.7) return "high";
  if (minConfidence >= 0.4) return "medium";
  return "low";
}

export function composeScorecard(answers: JobFitJevAnswers) {
  const dimensions = {} as Record<
    Dimension,
    {
      weight: number;
      jev_expected_level: number;
      fit_from_expectation: number;
      modal_level_index: number;
      fit_from_modal: number;
      confidence: number;
    }
  >;

  let weighted = 0;
  let minConfidence = 1;
  for (const dimension of DIMENSIONS) {
    const answer = answers[dimension];
    const weight = DIMENSION_WEIGHTS[dimension];
    const fromExpectation = fitPoint(answer.score);
    const modal = modalLevel(answer.probabilities);
    dimensions[dimension] = {
      weight,
      jev_expected_level: round2(answer.score),
      fit_from_expectation: fromExpectation,
      modal_level_index: modal,
      fit_from_modal: modal + 1,
      confidence: round2(answer.confidence),
    };
    weighted += weight * fromExpectation;
    minConfidence = Math.min(minConfidence, answer.confidence);
  }

  const overall = round2(weighted);
  return {
    model: JEV_MODEL,
    overall_from_expectation: overall,
    verdict_from_workflow_bands: verdictFor(overall),
    min_dimension_confidence: round2(minConfidence),
    provisional_confidence_label: provisionalConfidence(minConfidence),
    dimensions,
    signals_not_applied_to_verdict: {
      environment_blocker_probability: round2(answers.environment_blocker.noul),
      execution_blocker_probability: round2(answers.execution_blocker.noul),
    },
    limits: [
      "Overall score is a code-side weighted mean of Jev expected levels, shifted from 0–4 onto the 1–5 job-fit scale.",
      "Jev 1.13 score levels are weakly calibrated as numbers. Read modal level and confidence next to the expectation.",
      "Blocker probabilities are printed only. They do not change the verdict until labeled outcomes set a threshold.",
      "Jev does not produce evidence bullets, questions, or a positioning angle. /job-fit still owns that brief.",
    ],
  };
}

export function buildState(jobDescription: string) {
  const root = repoRoot();
  return {
    candidate: {
      identity_brief: readRepoFile(root, "docs/identity-brief.md"),
      career_fit_context: readRepoFile(root, "docs/career-fit-context.md"),
      tech_stack: readRepoFile(root, "docs/TECH_STACK.md"),
    },
    role: {
      job_description: jobDescription.trim(),
    },
  };
}

function repoRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "..");
}

function readRepoFile(root: string, relativePath: string): string {
  return readFileSync(join(root, relativePath), "utf8");
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv: string[]): { mode: "self-check" | "dry-run" | "live"; jdPath?: string } {
  let mode: "self-check" | "dry-run" | "live" | undefined;
  let jdPath: string | undefined;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--self-check") mode = "self-check";
    else if (arg === "--dry-run") mode = "dry-run";
    else if (arg === "--live") mode = "live";
    else if (arg === "--jd") {
      const next = argv[i + 1];
      if (!next) fail("--jd requires a file path.");
      jdPath = next;
      i += 1;
    } else {
      fail(`Unknown argument: ${arg}`);
    }
  }
  if (!mode) {
    fail(
      "Usage: tsx scripts/job-fit-jev-preview.ts --self-check | --dry-run --jd <file> | --live --jd <file>",
    );
  }
  if (mode !== "self-check" && !jdPath) {
    fail(`${mode} requires --jd <file>.`);
  }
  return { mode, jdPath };
}

function peaked(level: number): ScoreAnswer {
  const probabilities: Record<string, number> = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
  };
  probabilities[String(level)] = 1;
  return { score: level, confidence: 0.91, probabilities };
}

export function selfCheck(): void {
  const weightSum = DIMENSIONS.reduce((sum, dimension) => sum + DIMENSION_WEIGHTS[dimension], 0);
  if (Math.abs(weightSum - 1) > 1e-9) {
    throw new Error(`weights sum to ${weightSum}`);
  }

  const questions = jobFitQuestions();
  for (const dimension of DIMENSIONS) {
    const question = questions[dimension];
    if (question.type !== "score" || question.criteria.length !== LEVELS) {
      throw new Error(`${dimension} must be a 5-level score`);
    }
  }
  if (questions.environment_blocker.type !== "noul" || questions.execution_blocker.type !== "noul") {
    throw new Error("blocker questions must be noul");
  }

  const strong = composeScorecard({
    capability: peaked(4),
    interest: peaked(4),
    environment: peaked(4),
    execution_sustainability: peaked(4),
    narrative: peaked(4),
    environment_blocker: { noul: 0.05 },
    execution_blocker: { noul: 0.04 },
  });
  if (strong.overall_from_expectation !== 5 || strong.verdict_from_workflow_bands !== "strong fit") {
    throw new Error(`strong case mapped wrong: ${JSON.stringify(strong)}`);
  }

  const skip = composeScorecard({
    capability: peaked(0),
    interest: peaked(0),
    environment: peaked(0),
    execution_sustainability: peaked(0),
    narrative: peaked(0),
    environment_blocker: { noul: 0.92 },
    execution_blocker: { noul: 0.88 },
  });
  if (skip.overall_from_expectation !== 1 || skip.verdict_from_workflow_bands !== "skip") {
    throw new Error(`skip case mapped wrong: ${JSON.stringify(skip)}`);
  }
  if (skip.verdict_from_workflow_bands !== "skip") {
    throw new Error("blocker probability must not be required for the skip verdict");
  }
  if (skip.signals_not_applied_to_verdict.environment_blocker_probability !== 0.92) {
    throw new Error("blocker probability was dropped");
  }

  const split = composeScorecard({
    capability: { score: 2.5, confidence: 0.35, probabilities: { "0": 0, "1": 0, "2": 0.5, "3": 0.5, "4": 0 } },
    interest: peaked(2),
    environment: peaked(2),
    execution_sustainability: peaked(2),
    narrative: peaked(2),
    environment_blocker: { noul: 0.5 },
    execution_blocker: { noul: 0.5 },
  });
  if (split.dimensions.capability.fit_from_expectation !== 3.5) {
    throw new Error("expected level 2.5 must land at 3.5 on the 1–5 scale");
  }
  if (split.dimensions.capability.fit_from_modal !== 3) {
    throw new Error("a 50/50 tie between levels 2 and 3 must keep the lower modal level");
  }
  if (split.provisional_confidence_label !== "low") {
    throw new Error("min confidence 0.35 must stay low");
  }

  console.log("job-fit Jev preview self-check passed");
}

async function main(): Promise<void> {
  const { mode, jdPath } = parseArgs(process.argv.slice(2));
  if (mode === "self-check") {
    selfCheck();
    return;
  }

  const jobDescription = readFileSync(resolve(jdPath!), "utf8");
  if (!jobDescription.trim()) fail("Job description file is empty.");

  if (mode === "dry-run") {
    const state = buildState(jobDescription);
    const questions = jobFitQuestions();
    console.log(
      JSON.stringify(
        {
          mode: "dry-run",
          model: JEV_MODEL,
          network: "not called",
          state_bytes: {
            identity_brief: Buffer.byteLength(state.candidate.identity_brief),
            career_fit_context: Buffer.byteLength(state.candidate.career_fit_context),
            tech_stack: Buffer.byteLength(state.candidate.tech_stack),
            job_description: Buffer.byteLength(state.role.job_description),
          },
          questions: Object.keys(questions),
          weights: DIMENSION_WEIGHTS,
          note: "Pass --live with TYPESAFE_API_KEY to score this state. That call sends the career context and job description to TypeSafe.",
        },
        null,
        2,
      ),
    );
    return;
  }

  const apiKey = process.env.TYPESAFE_API_KEY?.trim();
  if (!apiKey) {
    fail("TYPESAFE_API_KEY is not set. Use --dry-run to build the request without calling TypeSafe.");
  }

  const scored = await scoreWithJev(jobDescription, apiKey);
  console.log(
    JSON.stringify(
      {
        mode: "live",
        resolved_model: scored.model,
        usage: scored.usage,
        elapsed_ms: scored.elapsed_ms,
        scorecard: scored.scorecard,
      },
      null,
      2,
    ),
  );
}

/** Live System One call. `elapsed_ms` is wall time around the request, not an estimate. */
export async function scoreWithJev(jobDescription: string, apiKey: string) {
  const client = new TypeSafeClient({ apiKey, defaultModel: JEV_MODEL });
  const state = buildState(jobDescription);
  const questions = jobFitQuestions();
  const started = Date.now();
  const result = await client.systemOne({
    model: JEV_MODEL,
    state,
    questions,
  });
  const elapsed_ms = Date.now() - started;

  const answers: JobFitJevAnswers = {
    capability: result.answers.capability,
    interest: result.answers.interest,
    environment: result.answers.environment,
    execution_sustainability: result.answers.execution_sustainability,
    narrative: result.answers.narrative,
    environment_blocker: result.answers.environment_blocker,
    execution_blocker: result.answers.execution_blocker,
  };

  return {
    model: result.model,
    usage: result.usage,
    elapsed_ms,
    scorecard: composeScorecard(answers),
  };
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isDirectRun) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    fail(message);
  });
}
