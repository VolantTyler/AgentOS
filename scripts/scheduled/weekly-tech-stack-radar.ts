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

const apiKey = process.env.CURSOR_API_KEY;
if (!apiKey) {
  console.error("Missing CURSOR_API_KEY");
  process.exit(1);
}

const repoUrl = process.env.GITHUB_REPOSITORY
  ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
  : "https://github.com/VolantTyler/AgentOS";

const startingRef = process.env.GITHUB_REF_NAME ?? "main";

const DIGEST_PROMPT = `You are running the AgentOS scheduled weekly tech-stack radar.

Execute the **/tech-stack-updates** slash command exactly as defined in \`.cursor/commands/tech-stack-updates.md\`:

1. Delegate to the **stack-radar** subagent (\`.cursor/agents/stack-radar.md\`).
2. Follow \`.cursor/skills/tech-stack-pulse/SKILL.md\` completely.
3. Defaults: last 7 days ending today in **America/New_York**; stack source \`docs/TECH_STACK.md\`; core-first research and sectioning.
4. Write \`docs/research/tech-stack-updates-YYYY-MM-DD.md\` (today's date in America/New_York).
5. Commit the digest on your working branch with a clear message (e.g. "Add weekly tech-stack digest for YYYY-MM-DD").
6. Reply with: five executive bullets (core-first when material), the digest file path, and synergy callout per the slash command.

Do not skip web research for vendor changelogs. Observe \`docs/BOUNDARIES.md\` — no invented versions or CVEs.`;

const QUALITY_PROMPT = `You are running the second step of the AgentOS scheduled weekly tech-stack radar (quality gate).

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

async function main(): Promise<void> {
  console.log(`Repo: ${repoUrl} @ ${startingRef}`);

  await using agent = await Agent.create({
    apiKey,
    model: { id: "composer-2.5" },
    cloud: {
      repos: [{ url: repoUrl, startingRef }],
      autoCreatePR: true,
    },
  });

  const steps: Array<{ name: string; prompt: string }> = [
    { name: "tech-stack-updates", prompt: DIGEST_PROMPT },
    { name: "evaluate-and-test", prompt: QUALITY_PROMPT },
  ];

  for (const step of steps) {
    console.log(`\n=== ${step.name} ===\n`);
    const run = await agent.send(step.prompt);
    for await (const event of run.stream()) {
      if (event.type === "assistant") {
        for (const block of event.message.content) {
          if (block.type === "text") process.stdout.write(block.text);
        }
      } else if (event.type === "status") {
        console.log(`\n[status] ${event.status}${event.message ? `: ${event.message}` : ""}`);
      }
    }
    const result = await run.wait();
    console.log(`\n[${step.name}] status=${result.status}`);
    if (result.status === "error" || result.status === "cancelled") {
      process.exit(1);
    }
    if (result.result) {
      console.log(`\n--- ${step.name} result (truncated) ---\n`);
      const text = result.result;
      console.log(text.length > 4000 ? `${text.slice(0, 4000)}…` : text);
    }
  }

  console.log("\nWeekly tech-stack radar finished.");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
