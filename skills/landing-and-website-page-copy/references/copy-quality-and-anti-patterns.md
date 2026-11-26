# Copy quality, anti-patterns and site-page standards

## Voice rules

Second person ("you"), active voice, present tense, specific over abstract, sentences under 20 words (ideally under 12), paragraphs of 3-4 sentences maximum, bullets and bold key phrases for scannability. Use definitive statements; hedging ("might", "may be able to") weakens claims. Readability around grade 8; vary sentence length. Read the page aloud.

Tone by audience:

| Audience | Tone | Proof | CTA |
|---|---|---|---|
| B2B enterprise | Confident, evidence-based, ROI-focused | Case studies, metrics | Schedule a demo; Talk to an expert |
| B2C consumer | Friendly, benefit-driven, emotional | Reviews, before/after | Get started; Try free |
| SaaS | Clear, value-first, low friction | Free trial, feature tour, comparison table | Start free trial; See how it works |
| Service business | Trustworthy, relationship-focused | Testimonials, credentials, process transparency | Get a quote; Book a call |

Tone spectrum: professional (enterprise, finance) > professional-casual (default) > casual (consumer, creative, community) > bold or provocative (disruptive or personal brands).

## Vocabulary

Buzzwords and inflated wording (revolutionize, cutting-edge, seamless, leverage, unlock, empower, game-changing, "in today's fast-paced world" and similar): tiered lists and replacements are in `copywriting-ai-writing-patterns-and-humanizing` (`references/vocabulary-tiers.md`); plain-English substitutions are in `copywriting-copy-editing-and-review`. Replace each with a number, outcome and timeframe, or delete.

## Fix formula

Replace abstract verb plus buzzword with number, concrete outcome, and timeframe or context:

| Before | After |
|---|---|
| Revolutionize your workflow | Cut reporting time from 2 hours to 10 minutes |
| Empower your team | Your team ships 3x faster |
| Scalable solution | Handles 10 users or 10,000. Same price. |
| In today's fast-paced world, businesses must... | (delete) |

Use numbers only when they are real.

## Structural tells of generic copy

- "In today's [adjective] world/landscape, businesses must..." openers
- Three paragraphs of identical length in a row
- "Moreover", "Furthermore", "Additionally" every few sentences
- Vague claims with no number
- Copy that works for any product (logo-swap test: replace the logo with a competitor's; if it still reads true, add specificity)

## Design slop

Generic imagery (floating dashboards, faceless laptop scenes, stock team photos, identical icon cards) weakens credibility; use real product UI and real people. Visual anti-template checklist: `copywriting-landing-page-implementation`.

## Website copy anti-patterns

| Anti-pattern | Fix |
|---|---|
| Keyword stuffer | Say it once; use the entity's attributes and related terms |
| Wall of text | 3-4 sentences per paragraph, bullets, bold key phrases |
| "Click here" links | Descriptive link text |
| Feature fetishist | Lead with the benefit; feature in parentheses |
| Confirmshaming | Neutral "No thanks" or "Maybe later" |
| Same content repeated across pages | One home for each fact; link to it |
| Chatbot added to mask unclear copy | Fix copy first; add chat later |

Common landing page mistakes: no clear headline; "Learn more" CTA; product screenshot as the only hero visual; multiple competing CTAs; no social proof; too many form fields; desktop-only design; no recap or urgency in the final CTA; hidden price; stock handshake photos.

## Answer-first structure (informational and site pages)

For question-style headings, give the direct answer in the first 40-60 words, then detail:

```
<h2>How does X work?</h2>
<p>X works by ... [40-60 words, direct answer]</p>
<p>Supporting detail for readers who want more.</p>
```

- Name concrete entities, their attributes and relationships rather than repeating keywords.
- One H1 per page naming the primary entity; no skipped heading levels; semantic elements.
- FAQPage and Article structured data where the visible content matches; Organization on the root; AboutPage on About. Structured data must mirror visible content.
- This structure helps readers, voice search and snippet extraction; do not promise specific results from any search or answer engine.

## Site-page metadata and structure

- Check the live sitemap or fetch real pages before writing; never invent URLs.
- Page header block: URL, status (new page, rewrite, live), title (50-60 characters, brand plus key phrase), meta description (150-160 characters, key facts and pricing if applicable).
- Section pattern: headline (2-6 words), subheadline (one sentence), body.
- Key facts in the first 50 words; pricing mentioned if applicable; CTA at the end.
- Thin pages (under about 5 sections or 500 words) get merged or enriched.
- "Improve" means edit the existing copy in place; "rewrite" replaces content but keeps the file; delete only with explicit confirmation.

## Ethics

No dark patterns, no manipulative urgency, claims must be provable, inclusive language, highlight potential rather than inadequacy, no hallucinated facts. Quick-start check: entities mapped; question headings with concise answers; scannable; accessible; reads naturally aloud; benefit-first headlines; claims provable.
