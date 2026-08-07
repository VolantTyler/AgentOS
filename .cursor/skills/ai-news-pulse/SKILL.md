---
name: ai-news-pulse
description: >-
  Daily scan of the top developments in artificial intelligence: agentic AI,
  applied AI, generative AI, machine learning research, AI science, and consumer
  AI products. Produces a dated markdown digest with exactly ten stories in a
  mobile-friendly single-column layout — each with category, headline, up to
  three sentences of summary, and a verified source link.
  Use when the user runs /ai-news, asks for today's AI news, or wants a recurring
  daily AI briefing; suitable for cron-style daily prompts.
disable-model-invocation: true
---

# AI news pulse — daily top 10

## Scope

Cover **developments published or announced in the last 24 hours** ending **today** in **America/New_York**, unless the parent passes a different window. Topics to include (balance across categories when possible):

| Category | Examples |
|----------|----------|
| **Agentic AI** | Autonomous agents, multi-agent systems, orchestration, MCP/A2A, agent frameworks, tool use, evaluations |
| **Applied AI** | Enterprise deployments, vertical AI (health, science, robotics, finance), coding agents, safety/governance in production |
| **Generative AI** | Foundation models, image/video/audio generation, multimodal releases |
| **ML research** | Papers, benchmarks, efficiency, training methods, open-weight models |
| **AI science** | Biology, chemistry, physics, medicine, climate — where AI is the method or headline |
| **Consumer AI** | ChatGPT, Gemini, Claude, Copilot, Siri, smart-home assistants, mobile AI, pricing/plan changes |

**Exclude** unless Tyler asks: pure crypto/token news, rumor-only posts without a primary source, and recycled explainers with no new facts in the window.

## Preconditions

1. Read **[`docs/BOUNDARIES.md`](../../../docs/BOUNDARIES.md)** — no fabricated stories, dates, or URLs.  
2. Prefer **primary sources**: official blogs, release notes, arXiv/Nature/Science links, company press rooms, reputable tech press that **links** to primaries.

## Time window

- **Default:** **last 24 hours** ending **today** (America/New_York).  
- State the exact ET window in the digest header.  
- If the window is thin (weekend/holiday), extend to **48 hours** and say so in the header — still return **10** stories.

## How to research

1. Use web search and fetch when available; open sources before summarizing.  
2. **Rank** by significance: industry standards, major product launches, peer-reviewed science, policy with broad impact, then notable research/engineering.  
3. **Deduplicate** — one row per story (merge multi-outlet coverage into the best primary link).  
4. **Exactly 10 stories** in the main list unless Tyler specifies another count.  
5. Each summary: **1–3 sentences**, factual, no hype.  
6. If fewer than 10 credible stories exist, say so in **## Gaps** and list what you searched — do not pad with stale or weak items.

## Output format (mobile-first)

Write **`docs/research/ai-news-YYYY-MM-DD.md`** (today in America/New_York) unless the parent requests chat-only or another path.

**Do not use wide markdown tables** for the top 10 — they are hard to read on a phone in Cursor, GitHub, or chat. Use a **single-column story card** per item: headline as an `###` heading, then category and source on their own lines, then the summary paragraph. Separate stories with `---`.

Default delivery is **markdown text** (file + chat). Do **not** generate PDF unless Tyler explicitly asks.

```markdown
# AI news — daily top 10

- **Researched:** [ISO date] (America/New_York)
- **Window:** [start ET] → [end ET]
- **Categories covered:** [comma-separated tags present in top 10]

## Summary

[2–3 sentences: the day's through-line — what mattered most]

## Top 10

### 1. [Headline]

**Category:** Agentic AI  
**Source:** [Primary title](URL)

[1–3 sentence summary — plain paragraph, no table cells.]

---

### 2. [Headline]

**Category:** …  
**Source:** [Primary title](URL)

[1–3 sentences]

---

… repeat through **10** …

## Gaps

- [Only if needed: thin window, unverified rumors skipped, searches performed]

## Searches performed (audit)

- [Short list of queries or sources consulted]
```

## Cron / automation

Invoke an agent with a prompt like:

`Apply the AgentOS skill ai-news-pulse. Write docs/research/ai-news-<today>.md and reply with the full single-column top 10.`

See [`docs/integrations/scheduled-ai-news.md`](../../../docs/integrations/scheduled-ai-news.md) for GitHub Actions scheduling.

## Invocation

- **Chat:** **`/ai-news`** → parent delegates to **`ai-news-scout`**.  
- **Direct:** Spawn **`ai-news-scout`** when the user asks for daily AI news without the slash.

## Extra reference

Source starting points: [reference.md](reference.md)
