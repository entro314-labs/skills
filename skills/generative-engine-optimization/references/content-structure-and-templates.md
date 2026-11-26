# Content structure and quotable templates

Principle: engines extract passages, not pages. Every section should survive being lifted out of context and still be correct, specific and attributable.

## Structure rules

| Element | Rule |
|---|---|
| Headings | H2/H3 phrased as the question a user asks ("How does connection pooling work?") rather than a topic label ("Pooling") |
| Lead | First 40-60 words under a heading state the direct answer; context follows |
| Paragraphs | 2-4 sentences, one idea, no dependence on "as mentioned above" |
| Definitions | `**Term** is [category] that [function], [key characteristic].` 25-50 words, standalone, starts with the term; add one sentence with an example or sourced data point |
| Comparisons | Table near the top, explicit column headers, concrete values, a "Best for" row; avoid prose-only comparisons |
| Processes | Numbered steps, prerequisites first, expected time, success indicator, troubleshooting |
| Lists | `**Item**: description with key benefit` |
| Summary | Key-takeaways box near the top |
| FAQ | Visible Q&A for the top ~5 real user questions, each answer self-contained; schema optional and must match visible text |
| Pronouns/refs | Name the entity ("Product X supports...") instead of "it" at the start of a passage |
| Dates | Time-anchor volatile facts ("as of 2025") and show a last-updated date |

## Quotable templates

Fill with real, sourced values only.

- Statistic: `According to [Source], [specific statistic] as of [timeframe].`
- Expert quote: `[Name], [credential] at [organization], says: "[quote]."` (named, checkable person; never invent one)
- Comparison: `Unlike [A], [B] [specific difference], which means [implication].`
- Callout: `> **Key insight**: [short, attributed statement]`
- Scoped claim: `In [region/segment], [metric] was [value] in [year] ([Source]).`
- Method statement (for original data): `[N] respondents/samples, collected [dates], method [x], margin/limitations [y].`

## Before / after

Before: "Many companies struggle with cloud costs."
After: "According to [named report, year], [specific percentage] of surveyed enterprises exceeded their cloud budget in [fiscal year]." (replace brackets with a verified figure; if none exists, say what you can support or drop the sentence)

Before: "Our tool is very fast and popular."
After: "[Tool] processed [N] [units] per second in [benchmark name, date, hardware], measured by [method]."

Edit-review format: **Before** (weak) / **After** (strong) / **Why** (specificity, attribution, quantification).

## Factual density rules

- Every quantitative claim carries metric, unit, scope, timeframe and a primary source.
- Replace vague quantifiers ("many", "very") with sourced values or delete them.
- Use "about 5 million" for rounded or unverified figures instead of false precision.
- One claim per sentence; avoid stacking several figures in one sentence.
- Heuristic targets (editing aids, not standards): several quotable definitions, a handful of sourced statistics, at least one citation per ~500 words, update within 12 months.

## Authority elements (use those that are genuinely available)

Author byline with relevant credentials and a bio page; expert quotes with attribution; citations to primary or peer-reviewed sources; named case studies with outcomes; original data and methodology; visible update date and change note.

## Page-type quick specs

- Explainer/pillar: answer-first intro, definition block, 5-10 question H2s, comparison table, FAQ, sources section.
- How-to: prerequisites, numbered steps with one action each, verification step, troubleshooting list.
- Comparison/"best X": criteria stated, table, per-option "best for", dated pricing/feature facts with sources, disclosure of conflicts.
- Data/research post: headline finding in the first sentence, method, sample, downloadable data or full tables, limitations.

## Create or refresh a page to win a target prompt

1. Landscape: run the exact prompt and close variants in the target engines and a search engine; fetch the 5-10 pages that are cited or rank. For each record main points, structure, unique data or frameworks, gaps and errors, and last-updated date. Also read community discussions on the topic for real phrasing of questions.
2. Brief: mandatory sub-topics (everything the current answers cover), questions to answer, entities to include (people, tools, organizations, figures), one unique value angle (original data, own framework, practitioner view, deeper coverage, newer facts, clearer structure), outline with question-style H2/H3, target length and format. The unique angle is the most important decision: if ten pages say the same thing, the engine cites the one that adds something.
3. Write: lead every section with a quotable 1-2 sentence answer, cover every sub-question the engines currently answer, then go deeper on 2-3. Balanced treatment for "X vs Y" prompts; engines avoid citing visibly biased sources. Use first-party data prominently.
4. Self-check against the cited sources: coverage, depth on 2-3 areas, uniqueness, extractability of each section, entity specificity, freshness.
5. Publish: byline with credentials, publication and updated dates, indexable and not gated, suitable schema matching visible content, internal links from related pages; re-run the prompt 2-4 weeks after indexing.

Refresh mode, in addition: audit the existing page first (structure, depth, dates, stale stats, what is already strong); diff it against the landscape (missing topics, outdated facts, missing entities, buried answers, freshness gaps); then edit surgically and keep sections that already work. Mark changes (added, updated, restructured, unchanged with the reason) and summarize before/after. Check that voice is preserved, links still resolve, and the date is updated.

Anti-patterns that cost citations: thin pages, pure aggregation without analysis, keyword stuffing, outdated facts, anonymous authorship, gated content.
