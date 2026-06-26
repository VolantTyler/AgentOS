/**
 * Daily AI news — invoked by GitHub Actions (or locally).
 *
 * Runs two slash workflow bundles on a cloud agent:
 * 1. /ai-news → ai-news-scout digest
 * 2. /evaluate-feature + /run-feature-tests feature ai-news
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

const DIGEST_PROMPT = `You are running the AgentOS scheduled daily AI news pulse.

Execute the **/ai-news** slash command exactly as defined in \`.cursor/commands/ai-news.md\`:

1. Delegate to the **ai-news-scout** subagent (\`.cursor/agents/ai-news-scout.md\`).
2. Follow \`.cursor/skills/ai-news-pulse/SKILL.md\` completely.
3. Defaults: last 24 hours ending today in **America/New_York** (extend to 48h if thin); exactly **10** stories with headline, 1–3 sentence summary, and source link each.
4. Write \`docs/research/ai-news-YYYY-MM-DD.md\` (today's date in America/New_York).
5. Commit the digest on your working branch with a clear message (e.g. "Add daily AI news digest for YYYY-MM-DD").
6. Reply with the full top 10 table per the slash command.

Do not skip web research. Observe \`docs/BOUNDARIES.md\` — no invented stories or URLs.`;

const QUALITY_PROMPT = `You are running the second step of the AgentOS scheduled daily AI news pulse (quality gate).

Run these two slash workflows in order:

## A) /evaluate-feature (ai-news)

Per \`.cursor/commands/evaluate-feature.md\`, delegate to **feature-evaluator** and verify the ai-news feature still meets \`docs/testing/features/ai-news.md\` acceptance criteria. Verdict: pass, fail, or needs-human-check.

## B) /run-feature-tests feature ai-news

Per \`.cursor/commands/run-feature-tests.md\`, delegate to **feature-testing-agent** and run all regression checks in \`docs/testing/features/ai-news.md\`.

Rules:
- Do not re-run the daily digest; step 1 already did that.
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
    { name: "ai-news", prompt: DIGEST_PROMPT },
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

  console.log("\nDaily AI news finished.");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
