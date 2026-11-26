---
name: aeo-geo-generative-engine-optimization
description: Optimize content, entities and site structure so AI answer engines (AI Overviews, ChatGPT Search, Perplexity, Copilot, Gemini, Claude) retrieve and cite them. Covers the RAG citation model, crawler access, llms.txt, passage structure, entity presence, fact-checking and sourcing claims, audits and manual citation monitoring. Use for GEO/AEO audits, rewriting pages to be citable, or verifying claims before publishing.
---

# Generative Engine Optimization (GEO / AEO)

Goal: get a page retrieved, then have one of its passages quoted or paraphrased with attribution inside an AI-generated answer. The metric is citation inclusion, not rank position.

## Core model: RAG pipeline

1. Retrieve candidate pages from a search index (query, often fanned out into sub-queries).
2. Extract passages (chunks) from those pages.
3. Feed passages to an LLM.
4. Generate an answer, with citations to the passages used.

A page must be **retrievable** (crawlable, indexed, ranking for the topic or a sub-query) AND **quotable** (a passage that stands alone, states a specific claim, and can be attributed). Failing either step means zero citations. Diagnose in this order: access, indexing, retrieval relevance, passage quality, entity/trust.

## Rules, ordered by importance

1. **GEO supplements SEO; it does not replace it.** Engines mostly cite pages that are already indexed and rank. Indexability, crawlability, internal linking and authority are prerequisites. Why: retrieval happens against a search index; format tweaks cannot rescue a page that is never retrieved.
2. **Audit crawler access first.** A blanket `Disallow: /`, a legacy "block all bots" rule, a WAF/bot-challenge, a login/cookie wall or content only present after client-side JS can remove a site from AI search. Decide per user agent (training vs search vs user-initiated fetch). See `references/crawler-access-and-llms-txt.md`.
3. **Make claims specific, sourced and checkable.** Fact-dense, attributable statements (numbers with unit, scope, date, primary source; named expert quotes) are the strongest content lever. Keyword stuffing does not help. Fabricated or unsourced statistics get pages dropped when they conflict with known data. Never write a number you cannot trace to a primary source.
4. **Write for extraction.** Question-style headings, answer first, self-contained 2-4 sentence paragraphs, definition blocks, tables for comparisons, numbered steps for processes. See `references/content-structure-and-templates.md`.
5. **Build entity presence.** One canonical brand/person/product name used identically in content, titles, schema, URLs and profiles; `Organization`/`Person`/`Product` schema with `sameAs` to verifiable profiles; presence in third-party sources engines trust (Wikipedia/Wikidata where notability genuinely exists, reputable publications, directories). See `references/entity-and-authority.md`.
6. **Publish original data.** First-party surveys, benchmarks, measurements and documented methods are citation magnets because nothing else can be cited for them.
7. **Cluster, don't scatter.** 5-10 related pages around one entity/topic with dense internal links beat isolated pages.
8. **Keep it fresh and dated.** Visible "last updated" date; review time-sensitive facts at least yearly (quarterly in fast-moving topics). Freshness weighting varies by engine (Perplexity-style live retrieval leans heavily on it).
9. **Treat llms.txt as a weak, optional navigation aid.** No evidence in hand shows major engines rely on it for citation. Never use it as the primary fix, and never expect it to override robots or indexing problems.
10. **Name the target engine before tuning, and re-test regularly.** Tactics and engine behavior shift within months; avoid hard-coding per-engine "citation count targets".

## Decision table

| Symptom | Likely cause | First action |
|---|---|---|
| Never cited, not even for brand queries | Blocked, unindexed, JS-only content | robots.txt, indexation status, fetch page without JS |
| Indexed and ranks, but competitors get cited | Passage not quotable, thin or vague claims | Rewrite lead paragraphs, add sourced specifics and tables |
| Cited with wrong facts | Ambiguous or outdated page, conflicting sources across web | Add dated, scoped statements; fix third-party listings; entity consistency |
| Brand named incorrectly or confused with another entity | Weak/inconsistent entity signals | Canonical naming, schema `sameAs`, disambiguating "About" copy |
| Cited by one engine only | Engine-specific retrieval (different index or crawler allowance) | Check that engine's crawler access and the index it draws from |
| Traffic from AI referrers but no conversions | Answer satisfies query; landing page weak | Provide value beyond the quoted passage; clear next step on page |

## Workflow: optimize a page

1. State target queries (the questions a user would ask an assistant) and the target engine(s).
2. Check access and indexing (rule 2). Stop and fix if blocked.
3. Run a claim pass: list every number, date, ranking, quote; verify or remove (see `references/fact-checking-and-evidence.md`). Do this before polishing format.
4. Restructure: answer-first intro (40-60 words), question headings, definition block, comparison table, steps, FAQ for the top ~5 questions.
5. Add authority elements: byline with credentials, named sources, original data, update date.
6. Add structured data that matches visible content (see entity reference).
7. Record baseline in the monitoring sheet, re-test monthly (`references/audit-and-monitoring.md`).

## Heuristics (not engine rules)

These numbers come from practice, not documented engine behavior. Use as editing targets, never as pass/fail claims to clients.

- Answer paragraph directly under a heading: 40-60 words. Definition block: 25-50 words, starts with the term.
- Paragraph: 2-4 sentences. One claim per sentence where possible.
- At least one cited source per ~500 words; several quotable definitions and precisely quantified data points per pillar page; Q&A section covering top ~5 questions.
- Content reviewed within 12 months.

## Things not to do

- Do not promise or report "guaranteed citations"; engine output is non-deterministic and varies by prompt, session, location and time. Sample several runs.
- Do not stuff keywords, add fake FAQ/expert quotes, or auto-generate statistics.
- Do not cloak (serve engines different content than users) or hide text for crawlers.
- Do not mark up content in schema that is not visible on the page.
- Do not rely on FAQPage schema as a lever: Google restricted FAQ rich results to a narrow set of sites, and benefit for AI extraction is unproven. Visible Q&A content is still useful on its own.
- Do not block all AI crawlers by default if citation is the goal, and do not allow training crawlers by default if licensing/IP matters; decide deliberately.
- Do not cite per-engine statistics (e.g. "engine X shows N sources") as fact; they are unsourced observations.
- Do not infer Claude/Gemini-specific tactics from thin data; several engines now retrieve live web content.

## Research basis (direction only)

A 2023 academic study of generative-engine optimization tested content edits on a benchmark with a simulated generative engine plus a subset on a live answer engine. Direction of findings: adding statistics, source citations and quotations, and fluent authoritative phrasing, raised visibility; keyword stuffing was weak. The exact percentage gains do not transfer to production engines; treat them as directional.

## References

| File | Read when |
|---|---|
| `references/crawler-access-and-llms-txt.md` | Auditing robots.txt, AI user agents, rendering, llms.txt layout |
| `references/content-structure-and-templates.md` | Rewriting pages: heading, definition, table, steps, quotable templates, before/after, create/refresh workflow for a target prompt |
| `references/entity-and-authority.md` | Naming consistency, schema types, authority checklist, clusters |
| `references/fact-checking-and-evidence.md` | Verifying claims, status taxonomy, claim types, report format |
| `references/audit-and-monitoring.md` | Running a GEO audit, scoring checklist, manual citation tracking |
