---
name: email-ingest
description: >-
  Pull inbound AgentMail messages into AgentOS for triage. Polls a configured
  inbox, writes a local-only digest under docs/_private/email-ingest/, marks
  processed messages with agentos/ingested, and returns a redacted chat summary.
  Use when Tyler runs /email-ingest, asks to check AgentMail, or wants email
  intake for the commodity reporting workflow. Does not send replies by default.
disable-model-invocation: true
---

# Email ingest — AgentMail polling

## Scope

Ingest **inbound** email from the configured AgentMail inbox into AgentOS.

Primary use: commodity / analyst intake (stakeholder forwards business email).
Same workflow works for any inbox set in `AGENTMAIL_INBOX_ID`.

## Preconditions

1. Read [`docs/BOUNDARIES.md`](../../../docs/BOUNDARIES.md).
2. Read [`docs/integrations/agentmail-email-ingest.md`](../../../docs/integrations/agentmail-email-ingest.md).
3. Require local `AGENTMAIL_API_KEY` and `AGENTMAIL_INBOX_ID` (from `.env`).
4. Prefer the repo scripts over ad-hoc curl.

## Defaults

| Setting | Default |
| --- | --- |
| Mode | Poll + triage summary |
| Limit | 20 newest messages |
| Skip | Messages labeled `agentos/ingested` |
| Mark after success | Yes (`--mark`), unless Tyler says preview-only / do not mark |
| Private digest | `docs/_private/email-ingest/email-ingest-YYYY-MM-DD.md` |
| Outbound send/reply | **Off** |

## How to run

1. If inbox id is unknown, run `npm run email:list-inboxes` and ask Tyler which
   inbox to use (do not invent an id).
2. Pull messages:

```bash
npm run email:ingest -- --limit 20 --mark
```

For preview-only (no label write):

```bash
npm run email:ingest -- --limit 20
```

For chat JSON without a private file:

```bash
npm run email:ingest -- --limit 20 --chat-only
```

3. Parse the JSON stdout. Treat empty `messages` as a valid empty inbox, not a
   failure.
4. Write or refresh the private digest when the script did (path in `privatePath`).
5. Build a **redacted** chat triage table. Prefer domain + subject + gist; omit
   full bodies, phone numbers, account numbers, and other sensitive payloads
   unless Tyler explicitly asks for detail in this turn.

## Triage output shape

For each message:

| Field | Notes |
| --- | --- |
| From | Display as provided; may redact local-part in chat if sensitive |
| Subject | As provided |
| Received | Timestamp |
| Gist | 1–3 sentences from `extractedText` / body / preview |
| Attachments | Count only unless Tyler asks to inspect |
| Suggested next action | One concrete step (file, follow up, ignore, escalate) |
| Message ID | Keep for re-fetch |

Also return overall **Result**: `ingested`, `empty`, `preview-only`,
`blocked`, or `needs-clarification`.

## Hard rules

- Do **not** send, reply, forward, or create drafts unless Tyler explicitly asks.
- Do **not** commit files under `docs/_private/`.
- Do **not** claim messages were marked without script evidence (`marked: true`
  and per-message `markedIngested`).
- Do **not** invent email content when the API/script fails.
- If config is missing, return `blocked` with the exact missing env var(s).

## Done when

Tyler has either:

1. a triage summary plus evidence of pull/mark, or  
2. a clear blocker (missing key, missing inbox, API error) with the next setup step.
