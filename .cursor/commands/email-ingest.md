# /email-ingest — pull inbound AgentMail into AgentOS

You are executing the **AgentOS `/email-ingest` slash command**.

## Required: run as **email-ingester** subagent

1. **Delegate** this entire request to the **`email-ingester`** subagent
   (`.cursor/agents/email-ingester.md`) using your Task / subagent / Agent
   delegation mechanism for repo-defined subagents.
2. Pass **goal** + **context** so the child receives:
   - **Goal:** Poll the configured AgentMail inbox, triage new inbound messages,
     write a local-only digest when appropriate, and mark processed messages
     with `agentos/ingested` unless preview-only was requested.
   - **Context:** Any limit, message id, preview-only / do-not-mark, chat-only,
     or include-ingested instructions Tyler typed after the slash.

**If delegation is unavailable**, say so once, then **you** perform the same
workflow by following `.cursor/agents/email-ingester.md`,
`.cursor/skills/email-ingest/SKILL.md`, and
`docs/integrations/agentmail-email-ingest.md`.

## Defaults (unless user overrides in the same message)

- **Pull:** up to 20 newest messages that lack `agentos/ingested`.
- **Mark:** add `agentos/ingested` after a successful pull.
- **Privacy:** raw bodies under `docs/_private/email-ingest/`; redacted summary in chat.
- **Outbound:** do not send or reply.
- **Config:** `AGENTMAIL_API_KEY` and `AGENTMAIL_INBOX_ID` from the local environment.

## After the subagent finishes

Reply with:

1. **Result** — ingested, empty, preview-only, blocked, or needs-clarification.
2. **Triage** — compact table of new messages.
3. **Private path** — if a digest was written.
4. **Blockers / human checks** — missing env, API errors, or follow-ups Tyler must do.
