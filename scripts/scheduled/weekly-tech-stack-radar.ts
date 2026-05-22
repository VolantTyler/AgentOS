/**
 * Weekly tech-stack radar — invoked by GitHub Actions (or locally).
 *
 * Runs two slash workflow bundles on a cloud agent:
 * 1. /tech-stack-updates → stack-radar digest
 * 2. /evaluate-feature + /run-feature-tests feature tech-stack-updates
 *
 * Requires CURSOR_API_KEY. Optional: GITHUB_REPOSITORY, GITHUB_REF_NAME.
 */

import { Agent } from "@cursor/sdk";
import { pathToFileURL } from "node:url";

const DEFAULT_REPO_URL = "https://github.com/VolantTyler/AgentOS";
const DEFAULT_STARTING_REF = "main";
const RESULT_PREVIEW_LIMIT = 4000;

export const DIGEST_PROMPT = `You are running the AgentOS scheduled weekly tech-stack radar.

Execute the **/tech-stack-updates** slash command exactly as defined in \`.cursor/commands/tech-stack-updates.md\`:

1. Delegate to the **stack-radar** subagent (\`.cursor/agents/stack-radar.md\`).
2. Follow \`.cursor/skills/tech-stack-pulse/SKILL.md\` completely.
3. Defaults: last 7 days ending today in **America/New_York**; stack source \`docs/TECH_STACK.md\`; core-first research and sectioning.
4. Write \`docs/research/tech-stack-updates-YYYY-MM-DD.md\` (today's date in America/New_York).
5. Commit the digest on your working branch with a clear message (e.g. "Add weekly tech-stack digest for YYYY-MM-DD").
6. Reply with: five executive bullets (core-first when material), the digest file path, and synergy callout per the slash command.

Do not skip web research for vendor changelogs. Observe \`docs/BOUNDARIES.md\` — no invented versions or CVEs.`;

export const QUALITY_PROMPT = `You are running the second step of the AgentOS scheduled weekly tech-stack radar (quality gate).

Run these two slash workflows in order:

## A) /evaluate-feature (tech-stack-updates)

Per \`.cursor/commands/evaluate-feature.md\`, delegate to **feature-evaluator** and verify the tech-stack-updates feature still meets \`docs/testing/features/tech-stack-updates.md\` acceptance criteria. Verdict: pass, fail, or needs-human-check.

## B) /run-feature-tests feature tech-stack-updates

Per \`.cursor/commands/run-feature-tests.md\`, delegate to **feature-testing-agent** and run all regression checks in \`docs/testing/features/tech-stack-updates.md\`.

Rules:
- Do not re-run the weekly digest; step 1 already did that.
- Do not delete the digest file from step 1.
- Report evaluate verdict, then test pass/fail/needs-human-check counts.
- If either step fails, say so explicitly.`;

export interface WeeklyRadarConfig {
  apiKey: string;
  repoUrl: string;
  startingRef: string;
}

export interface WeeklyRadarStep {
  name: string;
  prompt: string;
}

export interface WeeklyRadarIO {
  log: (message: string) => void;
  write: (text: string) => void;
  error: (message: string) => void;
}

interface EventTextBlock {
  type: "text";
  text: string;
}

interface EventStatus {
  type: "status";
  status: string;
  message?: string;
}

interface EventAssistant {
  type: "assistant";
  message: {
    content: Array<EventTextBlock | { type: string; [key: string]: unknown }>;
  };
}

type RunEvent = EventAssistant | EventStatus | { type: string; [key: string]: unknown };

interface AgentRun {
  stream: () => AsyncIterable<RunEvent>;
  wait: () => Promise<{ status: string; result?: string | null }>;
}

interface AgentClient {
  send: (prompt: string) => Promise<AgentRun>;
}

export function resolveConfig(env: NodeJS.ProcessEnv): WeeklyRadarConfig {
  const apiKey = env.CURSOR_API_KEY;
  if (!apiKey) {
    throw new Error("Missing CURSOR_API_KEY");
  }

  return {
    apiKey,
    repoUrl: env.GITHUB_REPOSITORY ? `https://github.com/${env.GITHUB_REPOSITORY}` : DEFAULT_REPO_URL,
    startingRef: env.GITHUB_REF_NAME ?? DEFAULT_STARTING_REF,
  };
}

export function buildSteps(): WeeklyRadarStep[] {
  return [
    { name: "tech-stack-updates", prompt: DIGEST_PROMPT },
    { name: "evaluate-and-test", prompt: QUALITY_PROMPT },
  ];
}

export function truncateResult(text: string, maxLength = RESULT_PREVIEW_LIMIT): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

export async function runSteps(agent: AgentClient, steps: WeeklyRadarStep[], io: WeeklyRadarIO): Promise<boolean> {
  for (const step of steps) {
    io.log(`\n=== ${step.name} ===\n`);
    const run = await agent.send(step.prompt);
    for await (const event of run.stream()) {
      if (event.type === "assistant") {
        for (const block of event.message.content) {
          if (block.type === "text") io.write(block.text);
        }
      } else if (event.type === "status") {
        io.log(`\n[status] ${event.status}${event.message ? `: ${event.message}` : ""}`);
      }
    }
    const result = await run.wait();
    io.log(`\n[${step.name}] status=${result.status}`);
    if (result.status === "error" || result.status === "cancelled") {
      return false;
    }
    if (typeof result.result === "string" && result.result.length > 0) {
      io.log(`\n--- ${step.name} result (truncated) ---\n`);
      io.log(truncateResult(result.result));
    }
  }

  return true;
}

function createDefaultIO(): WeeklyRadarIO {
  return {
    log: (message: string) => console.log(message),
    write: (text: string) => process.stdout.write(text),
    error: (message: string) => console.error(message),
  };
}

export async function main(env: NodeJS.ProcessEnv = process.env, io: WeeklyRadarIO = createDefaultIO()): Promise<number> {
  let config: WeeklyRadarConfig;
  try {
    config = resolveConfig(env);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    io.error(message);
    return 1;
  }

  io.log(`Repo: ${config.repoUrl} @ ${config.startingRef}`);

  await using agent = await Agent.create({
    apiKey: config.apiKey,
    model: { id: "composer-2.5" },
    cloud: {
      repos: [{ url: config.repoUrl, startingRef: config.startingRef }],
      autoCreatePR: true,
    },
  });

  const succeeded = await runSteps(agent, buildSteps(), io);
  if (!succeeded) {
    return 1;
  }

  io.log("\nWeekly tech-stack radar finished.");
  return 0;
}

function isDirectExecution(): boolean {
  return Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
}

if (isDirectExecution()) {
  main()
    .then((exitCode) => process.exit(exitCode))
    .catch((err: unknown) => {
      console.error(err);
      process.exit(1);
    });
}
