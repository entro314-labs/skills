# Fact-checking and evidence attachment

Purpose: raise citation trust by ensuring every checkable claim on a page is true, scoped, dated and traceable. Run before restructuring content.

## Workflow

1. **Scope.** Set time horizon (evergreen: as of today; historical: relative to the stated year), criticality (legal, medical, financial, B2B comparisons are strict) and region/industry limits. Write these assumptions at the top of the output.
2. **Extract claims.** Pick sentences with numbers, dates, rankings, superlatives, competitor statements, or quotes/attributions to external sources. Assign IDs (C1, C2...) and a claim type. Skip generic statements.
3. **Plan.** 2-6 bullets: search terms, entities, time qualifiers, source priority.
4. **Verify.** At least one high-quality supporting or refuting source per claim; two independent sources for controversial or high-stakes claims. Record source title, domain, year and the key sentence or number.
5. **Classify** each claim with exactly one status (below).
6. **Correct** according to status.
7. **Report** in the fixed order below.

Source priority: official/primary (company filings, standards bodies, product documentation, changelogs) > government and statistical agencies > research organizations and peer-reviewed work > major news. Avoid content farms, undated pages, scraped copies and circular citations (many pages citing each other with no primary origin).

## Status taxonomy

| Status | Meaning | Correction |
|---|---|---|
| verified | Trusted source confirms claim, scope and date | Optionally add "as of [year]" |
| partially_verified | True but missing scope, segment or time | Narrow scope ("In Europe", not "worldwide"), name metric and year |
| outdated | Was true, now superseded | Update number and year, or reframe as historical |
| contradicted | Trusted source conflicts | Replace with the evidence-backed fact, or delete if it cannot be rewritten responsibly |
| uncertain | Insufficient or conflicting evidence | Hedge ("is often described as", "some reports suggest") or remove |

When in doubt choose `uncertain` or `partially_verified`; never stretch evidence to `verified`.

## Claim types

| Type | What to check |
|---|---|
| numeric-statistic | Metric, unit, timeframe, scope, sample; newer reliable data differing means `outdated` |
| date | Official announcement, changelog, reputable news; time zones; ongoing events ("since 2022") |
| ranking | Who ranked, on which metric, region and period. Safe wording: "frequently ranked among the top N", "a leading provider"; avoid "#1 in the world" unless unambiguous |
| competitor-info | Competitor's own site plus independent segment reports; avoid "only", "always", "never" and anything defamatory |
| quote | Source exists, wording is faithful, year and publication match; prefer linking the original |
| general-fact | Still holds today; avoid "all" and "always" unless clearly supported |

Sensitive domains (health, finance, legal, safety): use conservative wording ("may help", "is associated with"), state limits of the verification, and prefer primary guidance bodies.

## Evidence attachment (how to cite on the page)

- Cite inline next to the claim: `According to [Publisher], [claim] ([year]).` with a link to the primary source.
- Prefer the original dataset or report over a blog summarizing it.
- Time-anchor volatile numbers; split multi-claim sentences so each claim has its own source.
- Keep a sources section with title, publisher, date, and access date for key claims.
- Use rounded wording ("about 5 million") when the exact figure is unverified.
- Do not attribute quotes you cannot find in the original. Do not reuse illustrative numbers from templates or examples as facts.
- Re-verify on a schedule: statistics yearly, product/pricing facts when the product changes.

## Report format

1. Assumptions and scope.
2. Claim table: ID | original claim | claim type | status | key evidence | primary sources (domain + year).
3. Revised wording grouped by section.
4. Risks and open questions.

If a full rewrite is requested, present the report first, then the revised text. Output rules: short quotes with domain attribution; no raw URLs unless asked; `##`/`###` headings.

## Example row

| ID | Claim | Type | Status | Evidence | Source |
|---|---|---|---|---|---|
| C3 | "The market grew 40% last year" | numeric-statistic | partially_verified | Agency report shows 31% for EU only, 2023 | agency domain, 2024 |

Revision: "In the EU, the market grew 31% in 2023 (agency name)."
