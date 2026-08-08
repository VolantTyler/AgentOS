/**
 * Post an AI news digest to Slack via Incoming Webhook.
 *
 * Usage:
 *   npm run notify:ai-news -- docs/research/ai-news-YYYY-MM-DD.md
 *   npm run notify:ai-news -- --dry-run docs/research/ai-news-YYYY-MM-DD.md
 *   npm run notify:ai-news -- --required docs/research/ai-news-YYYY-MM-DD.md
 *
 * Env:
 *   SLACK_AI_NEWS_WEBHOOK_URL — Incoming Webhook URL (required to post)
 *   GITHUB_REPOSITORY — optional, for digest deep link (default VolantTyler/AgentOS)
 *   GITHUB_SHA — optional, commit for blob URL when posting from Actions
 *
 * Flags:
 *   --dry-run   Print the payload JSON; do not POST
 *   --required  Exit 1 if the webhook env var is missing (CI)
 *   --skip-slack  Exit 0 without posting (agent opt-out)
 *
 * Never log or echo the webhook URL.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

type Story = {
  rank: number;
  headline: string;
  category: string;
  sourceTitle: string;
  sourceUrl: string;
  summary: string;
};

type Digest = {
  researched: string;
  window: string;
  summary: string;
  stories: Story[];
  filePath: string;
};

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function loadDotEnv(): void {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
    if (process.env[key] !== undefined) continue;
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function parseArgs(argv: string[]): {
  filePath: string | undefined;
  dryRun: boolean;
  required: boolean;
  skipSlack: boolean;
} {
  let dryRun = false;
  let required = false;
  let skipSlack = false;
  const positional: string[] = [];
  for (const arg of argv) {
    if (arg === "--dry-run") dryRun = true;
    else if (arg === "--required") required = true;
    else if (arg === "--skip-slack") skipSlack = true;
    else if (arg.startsWith("-")) fail(`Unknown flag: ${arg}`);
    else positional.push(arg);
  }
  return {
    filePath: positional[0],
    dryRun,
    required,
    skipSlack,
  };
}

function stripMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function escapeMrkdwn(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function parseDigest(filePath: string, raw: string): Digest {
  const researched =
    raw.match(/\*\*Researched:\*\*\s*([^\n(]+)/)?.[1]?.trim() ?? "unknown date";
  const window = raw.match(/\*\*Window:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "";

  const summaryMatch = raw.match(
    /## Summary\s*\n+([\s\S]*?)(?=\n## Top 10|\n## Gaps|\n## Searches|$)/,
  );
  const summary = stripMd(summaryMatch?.[1] ?? "").trim();

  const topSection =
    raw.match(/## Top 10\s*\n+([\s\S]*?)(?=\n## Gaps|\n## Searches|$)/)?.[1] ??
    "";

  const storyChunks = topSection
    .split(/\n---\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const stories: Story[] = [];
  for (const chunk of storyChunks) {
    const heading = chunk.match(/^###\s+(\d+)\.\s+(.+)$/m);
    if (!heading) continue;
    const rank = Number(heading[1]);
    const headline = heading[2].trim();
    const category =
      chunk.match(/\*\*Category:\*\*\s*(.+)$/m)?.[1]?.trim() ?? "AI";
    const sourceLine =
      chunk.match(/\*\*Source:\*\*\s*\[([^\]]+)\]\(([^)]+)\)/) ?? null;
    const sourceTitle = sourceLine?.[1]?.trim() ?? "Source";
    const sourceUrl = sourceLine?.[2]?.trim() ?? "";

    const afterSource = chunk
      .replace(/^###\s+\d+\.\s+.+$/m, "")
      .replace(/\*\*Category:\*\*[^\n]*/m, "")
      .replace(/\*\*Source:\*\*[^\n]*/m, "")
      .trim();
    const summaryPara = stripMd(afterSource.split(/\n\n+/)[0] ?? afterSource);

    stories.push({
      rank,
      headline,
      category,
      sourceTitle,
      sourceUrl,
      summary: summaryPara,
    });
  }

  if (stories.length === 0) {
    fail(`No Top 10 story cards parsed from ${filePath}`);
  }

  return { researched, window, summary, stories, filePath };
}

function digestGithubUrl(filePath: string): string {
  const repo = process.env.GITHUB_REPOSITORY ?? "VolantTyler/AgentOS";
  const sha = process.env.GITHUB_SHA?.trim();
  const normalized = filePath.replace(/^\.\//, "");
  if (sha) {
    return `https://github.com/${repo}/blob/${sha}/${normalized}`;
  }
  return `https://github.com/${repo}/blob/main/${normalized}`;
}

function buildSlackPayload(digest: Digest): {
  text: string;
  blocks: unknown[];
} {
  const fallback = `AI news — daily top 10 (${digest.researched})`;
  const blocks: unknown[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "AI news — daily top 10",
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `*Researched:* ${escapeMrkdwn(digest.researched)} (ET)${
            digest.window ? ` · ${escapeMrkdwn(truncate(digest.window, 120))}` : ""
          }`,
        },
      ],
    },
  ];

  if (digest.summary) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: truncate(escapeMrkdwn(digest.summary), 2900),
      },
    });
  }

  blocks.push({ type: "divider" });

  for (const story of digest.stories.slice(0, 10)) {
    const link = story.sourceUrl
      ? `<${story.sourceUrl}|${escapeMrkdwn(truncate(story.sourceTitle, 80))}>`
      : escapeMrkdwn(story.sourceTitle);
    const body = truncate(escapeMrkdwn(story.summary), 500);
    const text = [
      `*${story.rank}. ${escapeMrkdwn(truncate(story.headline, 200))}*`,
      `_${escapeMrkdwn(story.category)}_ · ${link}`,
      body,
    ].join("\n");
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: truncate(text, 2900) },
    });
  }

  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `<${digestGithubUrl(digest.filePath)}|Open digest on GitHub>`,
      },
    ],
  });

  // Slack caps payloads at 50 blocks.
  return { text: fallback, blocks: blocks.slice(0, 50) };
}

async function postWebhook(
  webhookUrl: string,
  payload: { text: string; blocks: unknown[] },
): Promise<void> {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.text();
  if (!response.ok) {
    fail(`Slack webhook failed: HTTP ${response.status} ${body.slice(0, 200)}`);
  }
  if (body && body !== "ok") {
    fail(`Slack webhook unexpected response: ${body.slice(0, 200)}`);
  }
  console.log(`Posted AI news digest to Slack (${payload.blocks.length} blocks).`);
}

async function main(): Promise<void> {
  loadDotEnv();
  const { filePath, dryRun, required, skipSlack } = parseArgs(
    process.argv.slice(2),
  );

  if (skipSlack) {
    console.log("Skipping Slack notify (--skip-slack).");
    return;
  }

  if (!filePath) {
    fail(
      "Usage: npm run notify:ai-news -- [--dry-run] [--required] <digest.md>",
    );
  }

  const abs = resolve(process.cwd(), filePath);
  if (!existsSync(abs)) {
    fail(`Digest not found: ${filePath}`);
  }
  if (!/ai-news-\d{4}-\d{2}-\d{2}\.md$/.test(filePath)) {
    fail(
      `Expected a digest path like docs/research/ai-news-YYYY-MM-DD.md; got ${filePath}`,
    );
  }

  const digest = parseDigest(filePath, readFileSync(abs, "utf8"));
  const payload = buildSlackPayload(digest);

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    console.log(
      `\nDry run OK — parsed ${digest.stories.length} stories from ${filePath}`,
    );
    return;
  }

  const webhook = process.env.SLACK_AI_NEWS_WEBHOOK_URL?.trim();
  if (!webhook) {
    if (required) {
      fail("Missing SLACK_AI_NEWS_WEBHOOK_URL (required in CI).");
    }
    console.log(
      "SLACK_AI_NEWS_WEBHOOK_URL not set — skipping Slack notify.",
    );
    return;
  }
  if (!webhook.startsWith("https://hooks.slack.com/services/")) {
    fail("SLACK_AI_NEWS_WEBHOOK_URL does not look like a Slack Incoming Webhook.");
  }

  await postWebhook(webhook, payload);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
