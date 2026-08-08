# AgentMail email ingestion

Pull inbound email from an [AgentMail](https://docs.agentmail.to/) inbox into
AgentOS for triage and (later) commodity / analyst workflows.

Official docs index: https://docs.agentmail.to/llms.txt  
Full reference: https://docs.agentmail.to/llms-full.txt

## Design choice

AgentOS has no public webhook endpoint today, so **v1 uses on-demand polling**
via the AgentMail TypeScript SDK:

1. Slash command **`/email-ingest`**
2. Subagent **`email-ingester`**
3. Local scripts `npm run email:list-inboxes` and `npm run email:ingest`
4. Processed-state label **`agentos/ingested`** on each handled message

Webhooks / WebSockets remain a later option when a durable public URL exists.
See [Handling inbound emails](https://docs.agentmail.to/knowledge-base/handling-inbound-emails).

## What this is for

Primary target: the **commodity reporting** intake path in
[`docs/TECH_STACK.md`](../TECH_STACK.md) (stakeholder forwards business email →
AgentMail → structured intake). The same plumbing works for any AgentMail inbox
Tyler points at.

## Hard rules

- **Inbound only by default.** Do not send, reply, or forward unless Tyler
  explicitly asks in the same turn.
- **No secrets in git.** `AGENTMAIL_API_KEY` stays in local `.env` or a secret
  manager — never in markdown or commits.
- **Raw email stays private.** Full bodies write under
  `docs/_private/email-ingest/` (gitignored). Chat output is a redacted triage
  summary unless Tyler asks for more detail.
- **Honest blockers.** If the API key or inbox id is missing, say so and stop.
  Do not invent messages.

## Local configuration

Copy `.env.example` → `.env` and set:

| Variable | Purpose |
| --- | --- |
| `AGENTMAIL_API_KEY` | Bearer token from the AgentMail Console (`am_...`) |
| `AGENTMAIL_INBOX_ID` | Inbox id to poll (from list-inboxes or the Console) |

Optional later: custom domain inboxes (paid plan). Default `@agentmail.to`
addresses work for intake.

## Setup flow

1. Create an API key in the [AgentMail Console](https://console.agentmail.to/).
2. Install deps: `npm ci` (includes the `agentmail` package).
3. Put the key in local `.env` as `AGENTMAIL_API_KEY`.
4. List inboxes:

```bash
npm run email:list-inboxes
```

5. Create an inbox if none exist (Console, or SDK `client.inboxes.create()`).
6. Save the chosen `inboxId` as `AGENTMAIL_INBOX_ID`.
7. Forward a test message to that inbox address, then run:

```bash
npm run email:ingest -- --limit 5
```

8. When the pull looks right, mark messages as processed:

```bash
npm run email:ingest -- --limit 5 --mark
```

## Script behavior

| Command | Effect |
| --- | --- |
| `npm run email:list-inboxes` | JSON list of inboxes for the API key |
| `npm run email:ingest` | Fetch up to 20 messages **without** label `agentos/ingested`; write private digest; print JSON |
| `npm run email:ingest -- --mark` | Same, then add `agentos/ingested` |
| `npm run email:ingest -- --include-ingested` | Do not skip already-labeled messages |
| `npm run email:ingest -- --message-id <id>` | Fetch one message |
| `npm run email:ingest -- --chat-only` | JSON only (no private file write) |

Default private digest path:

`docs/_private/email-ingest/email-ingest-YYYY-MM-DD.md`

(America/New_York date.)

## Slash workflow

Run **`/email-ingest`** in Cursor. The parent delegates to **`email-ingester`**,
which:

1. Runs the ingest script (or reports the config blocker).
2. Summarizes each new message for triage (from, subject, 1–3 sentence gist,
   suggested next action).
3. Marks messages with `agentos/ingested` unless Tyler says **preview-only** /
   **do not mark**.
4. Never claims success without script/API evidence.

## Labels

| Label | Meaning |
| --- | --- |
| `agentos/ingested` | AgentOS already pulled and triaged this message |

Do not remove system labels casually. Prefer adding `agentos/ingested` over
mutating `unread` / `read` unless Tyler asks.

## Future expansion

- Scheduled poll via GitHub Actions + `@cursor/sdk` (same pattern as daily AI news).
- Webhook receiver once a public URL exists.
- Commodity analyst report generation from private digests.
- Allowlists / blocklists via AgentMail Lists for sender control.

## Related

- Skill: [`.cursor/skills/email-ingest/SKILL.md`](../../.cursor/skills/email-ingest/SKILL.md)
- Command: [`.cursor/commands/email-ingest.md`](../../.cursor/commands/email-ingest.md)
- Agent: [`.cursor/agents/email-ingester.md`](../../.cursor/agents/email-ingester.md)
- Feature manifest: [`docs/testing/features/email-ingest.md`](../testing/features/email-ingest.md)
