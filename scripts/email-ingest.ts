/**
 * Pull inbound AgentMail messages for AgentOS email ingestion.
 *
 * Usage:
 *   npm run email:ingest
 *   npm run email:ingest -- --limit 10
 *   npm run email:ingest -- --include-ingested
 *   npm run email:ingest -- --mark
 *   npm run email:ingest -- --message-id <id>
 *
 * Requires: AGENTMAIL_API_KEY, AGENTMAIL_INBOX_ID
 *
 * By default, skips messages already labeled agentos/ingested.
 * --mark adds that label after a successful fetch (idempotent).
 * Does not send replies.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { AgentMailClient } from "agentmail";
import { loadEnvFile } from "./lib/load-env.js";

loadEnvFile();

const INGESTED_LABEL = "agentos/ingested";

type Args = {
  limit: number;
  includeIngested: boolean;
  mark: boolean;
  messageId: string | null;
  writePrivate: boolean;
  chatOnly: boolean;
};

function parseArgs(argv: string[]): Args {
  const args: Args = {
    limit: 20,
    includeIngested: false,
    mark: false,
    messageId: null,
    writePrivate: true,
    chatOnly: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit" && argv[i + 1]) {
      args.limit = Number(argv[++i]);
    } else if (a === "--include-ingested") {
      args.includeIngested = true;
    } else if (a === "--mark") {
      args.mark = true;
    } else if (a === "--message-id" && argv[i + 1]) {
      args.messageId = argv[++i];
    } else if (a === "--no-write") {
      args.writePrivate = false;
    } else if (a === "--chat-only") {
      args.chatOnly = true;
      args.writePrivate = false;
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: npm run email:ingest -- [options]

Options:
  --limit N              Max messages to fetch (default 20)
  --include-ingested     Include messages already labeled ${INGESTED_LABEL}
  --mark                 Add ${INGESTED_LABEL} after fetch
  --message-id ID        Fetch a single message by id
  --no-write             Print JSON only; do not write private digest
  --chat-only            Same as --no-write (for agent chat paths)
`);
      process.exit(0);
    }
  }

  if (!Number.isFinite(args.limit) || args.limit < 1) {
    console.error("--limit must be a positive number");
    process.exit(1);
  }

  return args;
}

function todayEtDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function truncate(text: string | undefined, max = 4000): string | null {
  if (!text) return null;
  const trimmed = text.trim();
  if (!trimmed) return null;
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed;
}

type IngestedMessage = {
  inboxId: string;
  threadId: string;
  messageId: string;
  timestamp: string;
  from: string;
  to: string[];
  cc: string[];
  subject: string | null;
  preview: string | null;
  labels: string[];
  extractedText: string | null;
  text: string | null;
  attachmentCount: number;
  markedIngested: boolean;
};

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.AGENTMAIL_API_KEY;
  const inboxId = process.env.AGENTMAIL_INBOX_ID;

  if (!apiKey) {
    console.error("Missing AGENTMAIL_API_KEY. Copy .env.example → .env and set your key.");
    process.exit(1);
  }
  if (!inboxId) {
    console.error(
      "Missing AGENTMAIL_INBOX_ID. Run `npm run email:list-inboxes`, then set the inbox id in .env.",
    );
    process.exit(1);
  }

  const client = new AgentMailClient({ apiKey });
  const ingested: IngestedMessage[] = [];
  const skipped: Array<{ messageId: string; reason: string }> = [];

  if (args.messageId) {
    const msg = await client.inboxes.messages.get(inboxId, args.messageId);
    const already = msg.labels.includes(INGESTED_LABEL);
    if (already && !args.includeIngested) {
      skipped.push({ messageId: msg.messageId, reason: `already has ${INGESTED_LABEL}` });
    } else {
      let marked = false;
      if (args.mark && !already) {
        await client.inboxes.messages.update(inboxId, msg.messageId, {
          addLabels: INGESTED_LABEL,
        });
        marked = true;
      }
      ingested.push({
        inboxId: msg.inboxId,
        threadId: msg.threadId,
        messageId: msg.messageId,
        timestamp: String(msg.timestamp),
        from: msg.from,
        to: msg.to ?? [],
        cc: msg.cc ?? [],
        subject: msg.subject ?? null,
        preview: msg.preview ?? null,
        labels: marked ? [...msg.labels, INGESTED_LABEL] : msg.labels,
        extractedText: truncate(msg.extractedText),
        text: truncate(msg.text),
        attachmentCount: msg.attachments?.length ?? 0,
        markedIngested: marked || already,
      });
    }
  } else {
    const listed = await client.inboxes.messages.list(inboxId, { limit: args.limit });
    for (const item of listed.messages) {
      const already = item.labels.includes(INGESTED_LABEL);
      if (already && !args.includeIngested) {
        skipped.push({ messageId: item.messageId, reason: `already has ${INGESTED_LABEL}` });
        continue;
      }

      const msg = await client.inboxes.messages.get(inboxId, item.messageId);
      let marked = false;
      if (args.mark && !msg.labels.includes(INGESTED_LABEL)) {
        await client.inboxes.messages.update(inboxId, msg.messageId, {
          addLabels: INGESTED_LABEL,
        });
        marked = true;
      }

      ingested.push({
        inboxId: msg.inboxId,
        threadId: msg.threadId,
        messageId: msg.messageId,
        timestamp: String(msg.timestamp),
        from: msg.from,
        to: msg.to ?? [],
        cc: msg.cc ?? [],
        subject: msg.subject ?? null,
        preview: msg.preview ?? null,
        labels: marked ? [...msg.labels, INGESTED_LABEL] : msg.labels,
        extractedText: truncate(msg.extractedText),
        text: truncate(msg.text),
        attachmentCount: msg.attachments?.length ?? 0,
        markedIngested: marked || msg.labels.includes(INGESTED_LABEL),
      });
    }
  }

  const date = todayEtDate();
  let privatePath: string | null = null;

  if (args.writePrivate && ingested.length > 0) {
    const dir = resolve(process.cwd(), "docs/_private/email-ingest");
    mkdirSync(dir, { recursive: true });
    privatePath = resolve(dir, `email-ingest-${date}.md`);

    const lines: string[] = [
      `# Email ingest — ${date}`,
      "",
      `- **Inbox:** \`${inboxId}\``,
      `- **Pulled:** ${new Date().toISOString()}`,
      `- **Count:** ${ingested.length}`,
      `- **Marked ingested:** ${args.mark ? "yes (requested)" : "no"}`,
      "",
      "> Local-only file under `docs/_private/` (gitignored). Do not commit raw business email.",
      "",
    ];

    for (const [i, msg] of ingested.entries()) {
      const body = msg.extractedText ?? msg.text ?? msg.preview ?? "(no body text)";
      lines.push(`## ${i + 1}. ${msg.subject ?? "(no subject)"}`);
      lines.push("");
      lines.push(`- **From:** ${msg.from}`);
      lines.push(`- **To:** ${msg.to.join(", ") || "(none)"}`);
      if (msg.cc.length) lines.push(`- **Cc:** ${msg.cc.join(", ")}`);
      lines.push(`- **Timestamp:** ${msg.timestamp}`);
      lines.push(`- **Message ID:** \`${msg.messageId}\``);
      lines.push(`- **Thread ID:** \`${msg.threadId}\``);
      lines.push(`- **Labels:** ${msg.labels.join(", ") || "(none)"}`);
      lines.push(`- **Attachments:** ${msg.attachmentCount}`);
      lines.push("");
      lines.push("### Body");
      lines.push("");
      lines.push("```");
      lines.push(body);
      lines.push("```");
      lines.push("");
    }

    writeFileSync(privatePath, lines.join("\n"), "utf8");
  }

  const payload = {
    status: ingested.length === 0 ? "empty" : "ok",
    inboxId,
    ingestedLabel: INGESTED_LABEL,
    count: ingested.length,
    skippedCount: skipped.length,
    marked: args.mark,
    privatePath,
    chatOnly: args.chatOnly,
    messages: ingested.map((m) => ({
      messageId: m.messageId,
      threadId: m.threadId,
      timestamp: m.timestamp,
      from: m.from,
      to: m.to,
      subject: m.subject,
      preview: m.preview,
      labels: m.labels,
      attachmentCount: m.attachmentCount,
      markedIngested: m.markedIngested,
      // Prefer extracted reply text; keep full text for agent summarization.
      body: m.extractedText ?? m.text,
    })),
    skipped,
  };

  console.log(JSON.stringify(payload, null, 2));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
