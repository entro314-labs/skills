# Voice-of-customer research

Goal: collect the exact words customers use so copy mirrors them.

## Rules

1. Verbatim quotes only. No paraphrase, no summary, no AI-generated quotes. Preserve typos and slang.
2. Record context for each quote: where and why it was said.
3. Date every quote; customer language changes.
4. Gold rule: a phrase recurring across 3 or more independent sources is strong messaging language. Cross-reference sources.

## Five categories

| Category | Typical openers |
|---|---|
| Pain points | "I hate when...", "Why can't...", "This is ridiculous..." |
| Symptoms | "I noticed...", "Whenever I...", "The problem is..." |
| Dream outcomes | "I wish...", "If only...", "Imagine if..." |
| Failed solutions | "I tried X but...", "Nothing works", "I've already done..." |
| Buying decisions | "What sold me was...", "The reason I switched..." |

## Sources

Industry forums and discussion communities, public review sites, user groups, support tickets, sales call transcripts, customer interviews. Ranked source list, tagging and the VoC brief: `copywriting-principles-and-frameworks` (`references/research-voc.md`).

## Record shape

```json
{
  "quote": "verbatim text",
  "source": "where/when",
  "category": "pain_point | symptom | dream_outcome | failed_solution | buying_decision",
  "sentiment": -100,
  "keywords": ["invoice", "late", "chasing"],
  "is_gold": false
}
```

`sentiment` ranges -100 to 100. Set `is_gold` when the phrase appears in 3+ independent sources.

## Use VOC before

Landing page copy, campaign creation, brand messaging updates, client onboarding, A/B test hypotheses. Feed gold phrases into headlines, pillar names and objection responses.
