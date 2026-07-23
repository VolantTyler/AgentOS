/**
 * List AgentMail inboxes for the configured API key.
 *
 * Usage: npm run email:list-inboxes
 * Requires: AGENTMAIL_API_KEY
 */

import { AgentMailClient } from "agentmail";
import { loadEnvFile } from "./lib/load-env.js";

loadEnvFile();

const apiKey = process.env.AGENTMAIL_API_KEY;
if (!apiKey) {
  console.error("Missing AGENTMAIL_API_KEY. Copy .env.example → .env and set your key.");
  process.exit(1);
}

async function main(): Promise<void> {
  const client = new AgentMailClient({ apiKey });
  const res = await client.inboxes.list({ limit: 50 });
  const rows = res.inboxes.map((inbox) => ({
    inboxId: inbox.inboxId,
    email: inbox.email,
    displayName: inbox.displayName ?? null,
    createdAt: inbox.createdAt,
  }));
  console.log(JSON.stringify({ count: rows.length, inboxes: rows }, null, 2));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
