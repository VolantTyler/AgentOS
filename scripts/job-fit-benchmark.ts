/**
 * Opt-in usage benchmark for one job-description file.
 *
 * `/job-fit` still delegates to job-fit-analyst and does not call this script.
 * The metered LLM call stays off unless JOB_FIT_LLM_BENCHMARK=1.
 *
 *   npx tsx scripts/job-fit-benchmark.ts --self-check
 *   npx tsx scripts/job-fit-benchmark.ts --jd role.md --jev
 *   JOB_FIT_LLM_BENCHMARK=1 GEMINI_API_KEY=... npx tsx scripts/job-fit-benchmark.ts --jd role.md --llm
 *   JOB_FIT_LLM_BENCHMARK=1 npx tsx scripts/job-fit-benchmark.ts --jd role.md --jev --llm
 *
 * Token counts come only from provider usage objects. Elapsed time is wall
 * clock around each request. This script does not estimate either.
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { scoreWithJev } from "./job-fit-jev-preview.js";

/** Pinned text model. `gemini-flash-latest` would move without a code change. */
export const LLM_MODEL = "gemini-2.5-flash";

export const LLM_ENDPOINT = `POST https://generativelanguage.googleapis.com/v1beta/models/${LLM_MODEL}:generateContent`;

export const JEV_ENDPOINT = "POST https://api.typesafe.ai/v1/systemone";

const LLM_URL = `https://generativelanguage.googleapis.com/v1beta/models/${LLM_MODEL}:generateContent`;

export type UsageRecord = {
  method: "jev" | "llm";
  model: string;
  endpoint: string;
  outbound_tokens: number;
  inbound_tokens: number;
  elapsed_ms: number;
  /** Provider field when present. Not added into inbound_tokens. */
  thoughts_tokens?: number;
  finish_reason?: string;
};

export function llmBenchmarkEnabled(value: string | undefined): boolean {
  return value?.trim() === "1";
}

type GeminiUsage = {
  outbound_tokens: number;
  inbound_tokens: number;
  thoughts_tokens?: number;
  model: string | undefined;
  finish_reason: string | undefined;
};

/** Read provider usage. Throws if the response has no integer token counts. */
export function usageFromGemini(body: unknown): GeminiUsage {
  if (!body || typeof body !== "object") {
    throw new Error("Gemini response was not a JSON object. Not estimating tokens.");
  }
  const record = body as {
    modelVersion?: unknown;
    usageMetadata?: unknown;
    candidates?: unknown;
  };
  const usage = record.usageMetadata;
  if (!usage || typeof usage !== "object") {
    throw new Error("Gemini response had no usageMetadata. Not estimating tokens.");
  }
  const counts = usage as {
    promptTokenCount?: unknown;
    candidatesTokenCount?: unknown;
    thoughtsTokenCount?: unknown;
  };
  if (!Number.isInteger(counts.promptTokenCount) || !Number.isInteger(counts.candidatesTokenCount)) {
    throw new Error(
      "Gemini usageMetadata lacked integer promptTokenCount and candidatesTokenCount. Not estimating tokens.",
    );
  }
  const parsed: GeminiUsage = {
    outbound_tokens: counts.promptTokenCount as number,
    inbound_tokens: counts.candidatesTokenCount as number,
    model: typeof record.modelVersion === "string" ? record.modelVersion : undefined,
    finish_reason: finishReason(record.candidates),
  };
  if (Number.isInteger(counts.thoughtsTokenCount)) {
    parsed.thoughts_tokens = counts.thoughtsTokenCount as number;
  }
  return parsed;
}

function finishReason(candidates: unknown): string | undefined {
  if (!Array.isArray(candidates) || !candidates[0] || typeof candidates[0] !== "object") return undefined;
  const reason = (candidates[0] as { finishReason?: unknown }).finishReason;
  return typeof reason === "string" ? reason : undefined;
}

const SYSTEM = `You are scoring one role for Tyler using only the documents in the user message.
Do not invent employers, dates, compensation, team culture, or interview process.
If a document is silent, say that dimension is unclear.
Score capability, interest, environment, execution sustainability, and narrative from 1 (strong mismatch) to 5 (strong match).
Weights: capability 25%, interest 15%, environment 25%, execution sustainability 25%, narrative 10%.
A higher execution-sustainability score means lower risk and a better chance of steady performance.
Verdict bands: 4.2-5.0 strong fit, 3.5-4.1 conditional fit, 2.8-3.4 stretch but plausible, 2.0-2.7 weak fit, below 2.0 skip.
A severe environment or execution red flag can make the verdict lower than the weighted average.
Return a scorecard (overall weighted score, verdict, confidence high/medium/low, one-line call, and each dimension with a short rationale), why it fits, why it may not, unknowns to validate, a positioning angle, and a recommendation (apply now, apply if clarified, archive for later, or skip).`;

function repoRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "..");
}

function userPrompt(jobDescription: string): string {
  const root = repoRoot();
  const sections = [
    ["identity_brief", readRepoFile(root, "docs/identity-brief.md")],
    ["career_fit_context", readRepoFile(root, "docs/career-fit-context.md")],
    ["tech_stack", readRepoFile(root, "docs/TECH_STACK.md")],
    ["continuity", readRepoFile(root, "docs/CONTINUITY.md")],
    ["job_description", jobDescription.trim()],
  ];
  return sections.map(([name, text]) => `## ${name}\n\n${text}`).join("\n\n");
}

function readRepoFile(root: string, relativePath: string): string {
  return readFileSync(join(root, relativePath), "utf8");
}

function redact(message: string, secret: string): string {
  return secret ? message.split(secret).join("[redacted]") : message;
}

export async function scoreWithLlm(jobDescription: string, apiKey: string): Promise<UsageRecord> {
  const started = Date.now();
  let response: Response;
  try {
    response = await fetch(LLM_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: userPrompt(jobDescription) }] }],
        generationConfig: { thinkingConfig: { thinkingBudget: 0 } },
      }),
      signal: AbortSignal.timeout(120_000),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(redact(message, apiKey));
  }
  const raw = await response.text();
  const elapsed_ms = Date.now() - started;
  if (raw.includes(apiKey)) {
    throw new Error("Gemini response included the API key. Refusing to print it.");
  }
  if (!response.ok) {
    throw new Error(`Gemini HTTP ${response.status}. ${raw.slice(0, 300)}`);
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    throw new Error("Gemini response was not JSON. Not estimating tokens.");
  }
  const usage = usageFromGemini(body);
  return {
    method: "llm",
    model: usage.model ?? LLM_MODEL,
    endpoint: LLM_ENDPOINT,
    outbound_tokens: usage.outbound_tokens,
    inbound_tokens: usage.inbound_tokens,
    elapsed_ms,
    ...(usage.thoughts_tokens === undefined ? {} : { thoughts_tokens: usage.thoughts_tokens }),
    ...(usage.finish_reason === undefined ? {} : { finish_reason: usage.finish_reason }),
  };
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function selfCheck(): void {
  if (llmBenchmarkEnabled(undefined) || llmBenchmarkEnabled("") || llmBenchmarkEnabled("true")) {
    throw new Error("LLM benchmark must stay off unless the value is 1");
  }
  if (!llmBenchmarkEnabled("1")) {
    throw new Error("JOB_FIT_LLM_BENCHMARK=1 must enable the call");
  }
  const parsed = usageFromGemini({
    modelVersion: "gemini-2.5-flash",
    usageMetadata: { promptTokenCount: 11, candidatesTokenCount: 7, thoughtsTokenCount: 0 },
    candidates: [{ finishReason: "STOP" }],
  });
  if (parsed.outbound_tokens !== 11 || parsed.inbound_tokens !== 7 || parsed.thoughts_tokens !== 0) {
    throw new Error("usage parser did not read the provider fields");
  }
  if (parsed.finish_reason !== "STOP") throw new Error("finish reason was dropped");
  let rejected = false;
  try {
    usageFromGemini({ candidates: [{ finishReason: "STOP" }] });
  } catch {
    rejected = true;
  }
  if (!rejected) throw new Error("missing usageMetadata must fail instead of estimating");
  console.log("job-fit benchmark self-check passed");
}

function parseArgs(argv: string[]): { selfCheck: boolean; jdPath?: string; jev: boolean; llm: boolean } {
  let check = false;
  let jdPath: string | undefined;
  let jev = false;
  let llm = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--self-check") check = true;
    else if (arg === "--jev") jev = true;
    else if (arg === "--llm") llm = true;
    else if (arg === "--jd") {
      const next = argv[i + 1];
      if (!next) fail("--jd requires a file path.");
      jdPath = next;
      i += 1;
    } else {
      fail(`Unknown argument: ${arg}`);
    }
  }
  return { selfCheck: check, jdPath, jev, llm };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.selfCheck) {
    selfCheck();
    return;
  }
  if (!args.jdPath || (!args.jev && !args.llm)) {
    fail(
      "Usage: tsx scripts/job-fit-benchmark.ts --self-check | --jd <file> [--jev] [--llm]\n" +
        "The LLM call is off unless JOB_FIT_LLM_BENCHMARK=1 and GEMINI_API_KEY is set. /job-fit is unchanged.",
    );
  }
  if (args.llm && !llmBenchmarkEnabled(process.env.JOB_FIT_LLM_BENCHMARK)) {
    fail(
      "JOB_FIT_LLM_BENCHMARK is not 1. The metered LLM path is off by default. /job-fit still uses job-fit-analyst. Set JOB_FIT_LLM_BENCHMARK=1 to record provider usage.",
    );
  }
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (args.llm && !geminiKey) {
    fail("GEMINI_API_KEY is not set. The benchmark did not call Gemini.");
  }
  const typesafeKey = process.env.TYPESAFE_API_KEY?.trim();
  if (args.jev && !typesafeKey) {
    fail("TYPESAFE_API_KEY is not set. The benchmark did not call Jev.");
  }

  const jobDescription = readFileSync(resolve(args.jdPath), "utf8");
  if (!jobDescription.trim()) fail("Job description file is empty.");

  const records: UsageRecord[] = [];
  if (args.jev) {
    const scored = await scoreWithJev(jobDescription, typesafeKey!);
    records.push({
      method: "jev",
      model: scored.model,
      endpoint: JEV_ENDPOINT,
      outbound_tokens: scored.usage.input_tokens,
      inbound_tokens: scored.usage.output_tokens,
      elapsed_ms: scored.elapsed_ms,
    });
  }
  if (args.llm) {
    records.push(await scoreWithLlm(jobDescription, geminiKey!));
  }

  console.log(
    JSON.stringify(
      {
        llm_benchmark: args.llm ? "on" : "off",
        records,
      },
      null,
      2,
    ),
  );
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isDirectRun) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    const key = process.env.GEMINI_API_KEY?.trim();
    fail(key ? message.split(key).join("[redacted]") : message);
  });
}
