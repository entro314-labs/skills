# GEO audit and monitoring

## Audit checklist

Score each item pass / partial / fail with evidence. Fix in the listed order; earlier groups gate later ones.

**A. Access and indexing**
- [ ] robots.txt reviewed; no unintended blanket blocks; per-agent policy documented
- [ ] No WAF/bot challenge blocking legitimate crawlers; server logs show AI user agents receiving 200s
- [ ] Primary content present in raw HTML (no JS-only rendering)
- [ ] Target pages indexed, canonical correct, no `noindex`, in sitemap, no redirect chains
- [ ] Snippet controls (`nosnippet`, `max-snippet`) not accidentally suppressing extraction
- [ ] llms.txt (optional) valid, lists only canonical 200 URLs

**B. Retrieval relevance**
- [ ] Each target question has a page whose heading matches that question or a close paraphrase
- [ ] Page ranks or is at least indexed for the head term and obvious sub-queries
- [ ] Internal links from related pages with descriptive anchors

**C. Passage quality**
- [ ] Answer-first leads (40-60 words) under question headings
- [ ] Self-contained paragraphs (2-4 sentences); no dangling references
- [ ] Definition blocks, comparison tables, numbered steps where applicable
- [ ] Quantitative claims have metric, unit, scope, date, primary source
- [ ] No unverifiable statistics or unattributed quotes (run the claim pass)

**D. Entity and trust**
- [ ] Canonical naming consistent across site, schema, profiles
- [ ] Organization/Person/Article schema valid and matching visible content
- [ ] Author bylines with credentials; update dates visible
- [ ] Third-party descriptions accurate and consistent
- [ ] Original data or unique insight on key pages

**E. Freshness**
- [ ] Time-sensitive facts reviewed within 12 months (sooner in fast-moving topics)
- [ ] `dateModified` changes only with substantive edits

Report structure: summary of blockers (group A first), prioritized fixes with expected effect and effort, per-page notes, open questions. State clearly which findings are verified facts (e.g. a blocked crawler) vs. judgment (e.g. "passage not quotable").

## Manual citation monitoring

Dedicated tooling for AI-citation tracking is immature and results are non-deterministic, so use a repeatable manual protocol:

1. Build a query set of 20-50 prompts: questions real users ask, brand queries, comparison queries, "best X for Y", and definitional queries. Fix the wording.
2. Choose engines (e.g. AI Overviews, a chat assistant with search, an answer engine). Use the same account state/location; note logged-in vs logged-out.
3. Monthly, run each prompt (repeat 2-3 times because outputs vary). Record per run: date, engine, prompt, whether your domain is cited, which URL/passage, whether brand is mentioned without a link, sentiment/accuracy, which competitors are cited and from which passages.
4. Compute: citation rate (prompts with at least one citation / total), mention rate, share vs top competitors, accuracy errors found.
5. Indirect signals: referral traffic from AI products, spikes in direct or branded traffic, server-log hits from AI user agents.
6. Test deliberately: exact-match FAQ questions, defined terms, a cited statistic, a documented process; check whether the passage is reproduced and attributed.
7. After each content change record the date, so changes can be correlated (weakly) with movement. Avoid claiming causation from a single run.

Sheet columns: date | engine | prompt | run # | cited (Y/N) | cited URL | mentioned (Y/N) | accurate (Y/N) | competitors cited | notes.

Actions on findings:
- Competitor cited, you are not: read their cited passage; identify the specific claim, format or source advantage.
- You are mentioned but not linked: strengthen entity signals and give the engine a distinct, attributable fact to cite.
- Inaccurate answer about you: find the source of the error (often an outdated third-party page or your own stale page), correct at the source, add a dated, scoped statement on your site.

## Continuous monitoring: metrics, schema, alerts

Use when the manual monthly protocol grows into an ongoing dashboard with alert rules. Because answers are non-deterministic, every metric is computed over a fixed prompt set with repeated runs, and alerts compare rolling windows, never single runs.

| Metric | Definition | Dimensions |
|---|---|---|
| Visibility rate | Sampled answers that cite the brand or use it as the primary source / total sampled answers, per intent | engine, intent cluster, locale |
| Share of model | Answers where the brand appears / answers where the brand or any tracked competitor appears, same intent; optionally weight by prominence (first mention vs list tail) | engine, intent, competitor |
| Citation volume | Count of links, brand mentions and product references in sampled outputs | engine, page, intent |
| Intent coverage | Number of intents with at least one brand citation | engine, intent cluster |
| Reaction latency | Days from a content publish or fix to first appearance in answers | page, engine |

Keep the team's own metric names where they exist and map them to this table; version the definition when it changes so history stays comparable.

**Schema (one row per run):** date, engine, prompt id, intent cluster, run number, cited (bool), cited URL, mentioned (bool), accurate (bool), competitors cited, locale, prompt-set version. Key: date + engine + prompt id + run. Store raw runs and compute rates in views; late or re-run data replaces by key.

**Dashboards by audience**
- Leadership: 3-7 KPIs (visibility rate, share of model, coverage), 30/90-day trend, against-target status.
- Operations: breakdown by intent, engine and page, with content launches overlaid as events to read cause and effect cautiously.
- Experiment: pre/post metrics for a page or cluster change, same prompt set, same window length.

**Alert rules**

| Pattern | Example condition | Severity |
|---|---|---|
| Sharp drop | 3-day average below 70% of the prior 14-day average for a core intent | Critical |
| Threshold breach | Visibility rate below target for 3 consecutive weeks | Warning |
| Competitor gain | Share of model down against one named competitor for 2 consecutive periods | Warning |
| Slow drift | Four consecutive weekly declines | Info |
| Positive spike | Citation volume above 150% of baseline | Info; find the cause before claiming a win |

Before acting on any alert, rerun the affected prompts and check crawler access and indexing (audit group A): a drop often traces to a blocked crawler, a deploy that broke rendering or a removed page, not to engine behavior.

**Routines:** daily scan of alerts; weekly review of trend, launches and incidents; monthly review of prompt set, targets and definitions. Playbooks: visibility drop on a core intent (verify, check access, compare with competitor passages, refresh the page, log the date); competitor share gain (read their cited passages, close the evidence or format gap); unexpected spike (record the change that preceded it, keep the pattern).
