---
name: copywriting-ai-writing-patterns-and-humanizing
description: Detect and rewrite AI-sounding prose (inflated vocabulary, stock phrases, template structure, chatbot residue, em-dash and bold overuse, uniform rhythm) and restore a human voice without inventing facts. Use when asked to humanize, de-AI, audit or polish text, or when drafting copy that must not read as machine-written.
---

# Removing AI writing patterns (humanizing)

AI-sounding text is not defined by single words. It is defined by clusters of generic wording, template structure, uniform rhythm and unearned claims. The job: find those clusters, replace them with specifics, keep every fact, and add voice only from material the author actually has.

## Core rules (in priority order)

1. **Never change or invent facts.** Fixing style must not alter a claim. Do not fabricate anecdotes, quotes, statistics, sources, citations or experiences. When a fix needs a concrete detail the author has not supplied, insert a bracketed placeholder (`[your example here]`) and tell the user. Prose can be improved; proof cannot be invented.
2. **Fix by specificity, not by synonym.** Replacing "robust" with "strong" changes nothing. Replace a vague claim with a number, a name, a comparison, a mechanism, or delete it. Prefer deletion when the phrase adds no meaning.
3. **Density over presence.** Judge clusters. One "notably" in 2,000 words is fine; three in 500 is stacking. Use the three vocabulary tiers (below) instead of a blacklist.
4. **Triage by severity.** P0 first (below). A quick pass is P0 + P1; a full audit adds P2.
5. **Patch or rebuild.** If the text has 5+ vocabulary hits across several categories, 3+ pattern categories, and uniform sentence and paragraph length, patching phrases will not fix it. State the core point in one sentence and rebuild from that.
6. **Do not over-edit.** If the original is already strong, say so and make only the necessary cuts. Mark the one or two genuinely good paragraphs before rewriting so they are not flattened. Personality is a repair for flat text, not a default addition.
7. **Respect register and profile.** Docs and technical writing stay neutral; casual text tolerates almost everything; investor and promotional copy is held to the strictest standard. See `references/profiles-and-triage.md`.
8. **Check the rewrite for new tells.** Humanizing commonly introduces fresh patterns: new em-dash asides, forced triplets, filler affirmations, replacement hedges, a slogan closer, inserted fake reasoning ("Actually, let me back up...").
9. **Audit only the author's prose.** Quoted examples, code blocks and text marked as illustrative are exempt (needed when the text is itself about AI-writing patterns).
10. **Zero tells means zero edits.** Say so plainly and return the original unchanged. If the user disputes a rewrite, accept their preference.

## Severity triage

| Level | Fix when | Examples |
|---|---|---|
| P0 | Immediately | knowledge-cutoff disclaimers, chatbot artifacts and sycophancy, vague attributions, significance inflation on routine events, template residue (`[Your Name]`, "As an AI") |
| P1 | Before publishing | Tier 1 vocabulary, stock phrases, "Let's dive in" openers, synonym cycling, formulaic openings, bold overuse, em dashes over the cap |
| P2 | When time allows | generic conclusions, compulsive rule of three, uniform paragraph length, copula avoidance, stacked transitions |

## Vocabulary tiers (summary)

- **Tier 1, replace on sight:** delve, tapestry, realm, landscape (metaphor), embark, testament to, pivotal, underscores, meticulous, seamless, utilize, leverage (verb), robust, comprehensive, cutting-edge, nestled, showcasing, holistic, actionable, game-changer, "at its core", "serves as", "boasts", "in order to", "due to the fact that".
- **Tier 2, flag only when two or more share a paragraph:** harness, navigate, foster, elevate, streamline, empower, bolster, facilitate, resonate, nuanced, multifaceted, myriad, plethora, ecosystem (metaphor), transformative, cornerstone, paramount, poised, burgeoning, quintessential.
- **Tier 3, flag only at high density (about 3% of words or more):** significant, innovative, effective, dynamic, scalable, compelling, unprecedented, exceptional, remarkable, sophisticated, instrumental, world-class, state-of-the-art, best-in-class. Fix with a number, comparison or named precedent.

Full replacement tables, filler phrases and technical-writing exceptions: `references/vocabulary-tiers.md`. The replacement table gives defaults, not mandates: keep a flagged word that is clearly right.

## The patterns that matter most

| Pattern | Tell | Fix |
|---|---|---|
| Significance inflation | "marking a pivotal moment in the evolution of..." | State what happened. If the sentence survives without the clause, delete it |
| Negative parallelism | "It's not just X, it's Y" | State the positive claim once. Max one per piece |
| Superficial -ing analysis | ", highlighting / underscoring / reflecting / fostering..." | Replace with a fact or cut |
| Copula avoidance | "serves as", "stands as", "features", "boasts" | Use "is" or "has" |
| Vague attribution | "Experts believe", "Studies show" | Name the source or state the claim without attribution. Never invent a citation |
| Rule of three | "fast, reliable, and scalable" everywhere | Vary group size; max one triple-adjective stack per piece |
| Synonym cycling | developers / engineers / practitioners / builders in one paragraph | Repeat the clearest word |
| Formulaic opening | "In today's rapidly evolving landscape..." | Lead with the news or insight |
| Generic conclusion | "The future looks bright" | Cut, or end on a specific next step |
| Filler transitions | Moreover, Furthermore, Additionally | "and", "but", "so", "because", or restructure |
| Hedge stacking | "could potentially", "it could be argued" | Cut when the hedge protects a claim that should be stated; make real uncertainty specific |
| Chatbot residue | "Great question!", "I hope this helps", "Let me know if..." | Remove entirely |
| Cutoff disclaimer | "As of my last update", "details are limited" | Find the information or delete the hedge |
| Emotional announcement | "What surprised me most", "I was fascinated to discover" | Show the surprising content; claim emotion only if the writing earns it |
| Rhetorical-question transition | "So what does this mean for you?" | State the answer. A question pointing at a real tension is fine |

Complete catalogue with before/after pairs: `references/pattern-catalogue.md`.

## Formatting tells

- **Em dashes:** target zero; default cap one per 1,000 words (blog, technical, investor, docs-relaxed). Replace with comma, period, colon, parentheses or "and". Also catch the `--` substitute. Count with `grep -o '—' file | wc -l` (byte counts are wrong: an em dash is 3 bytes in UTF-8).
- **Bold:** at most one bolded phrase per major section; strip bold from list leads.
- **Inline-header bullets** (`- **Speed:** Speed improved...`): write prose.
- **Headings:** sentence case for subheadings; replace "Overview / Key Points / Summary / Conclusion" with headers naming the content. More than 3 headings in under 300 words, or 8+ bullets in under 200 words, is over-structured: merge or write prose.
- **Lists:** number only genuinely discrete parallel items ("Three key takeaways" is inflation). Convert bullets to prose when items are under ten words, form a sequence, or sit in prose context. Keep bullets for feature comparisons, steps and parameters.
- **Emoji** in headers or bullet leads: remove (social posts may keep one or two at the end of a line).
- **Curly quotes, "whilst", "swift", "commendable":** weak signals (typography or dialect). Do not rewrite on these alone.

## Rhythm and uniformity

- If most sentences fall in 15 to 25 words, mix short (3 to 8) with long (20+). Fragments and questions are legitimate tools. These are rough checks; variety matters more than the mean.
- Vary paragraph size; a one-sentence paragraph is a tool. Avoid the same Statement, Explanation, Example, Bridge shape in every paragraph, and sections of identical length.
- Read-aloud test: if a text-to-speech engine could read it without sounding odd, it is probably too uniform.
- Contractions are normal; their stilted absence reads as machine-made.
- Start where the interest starts and stop when the point is made. No definition-first opener, no restatement closer, no meta-narration ("In this article we will...").

## Voice injection (only after the generic layer is gone)

Add voice through rhythm, specificity, and stance already present in the author's material: opinions the author holds, mixed feelings stated plainly, concrete named details, an aside, an honest admission, a conclusion-first sentence. Use "I" only where the author has the experience. Never invent credibility ("in my experience") or a first-person anecdote. Ask for one sample of the author's writing instead of guessing a voice. Details, voice types and earned endings: `references/voice-injection.md`.

## Working process

1. Read the whole piece. Note purpose, audience, register; infer or ask for the profile and say which was used.
2. Scan in order: vocabulary, phrase and sentence level, structure and formatting. Triage with P0/P1/P2.
3. Rewrite flagged spans, preserving meaning and every fact.
4. Check for newly introduced tells (rule 8).
5. Anti-AI pass: ask "What makes this obviously AI generated?", list remaining tells briefly, then revise them.
6. Deliver in the requested output mode.

Output modes, edge cases (long text, single sentence, non-English, code/legal text) and the multi-stage drafting pipeline: `references/workflow-and-output.md`.

## Routing

| Need | Open |
|---|---|
| Word-level replacements, filler phrases, technical exceptions | `references/vocabulary-tiers.md` |
| Full pattern list with before/after fixes | `references/pattern-catalogue.md` |
| Profiles, tolerance matrix, scoring, rewrite-vs-patch | `references/profiles-and-triage.md` |
| Adding a human voice, voice types, earned endings | `references/voice-injection.md` |
| Output formats, edge cases, drafting pipeline, quality gates | `references/workflow-and-output.md` |

## Limits

These are heuristics. No rule here is a validated detector, no numeric "AI-likeness" score is reliable, and nothing guarantees detection immunity or reach. The thresholds are working defaults without empirical basis; the pattern list is observed behavior, not a measured model property. Treat humanizing as editing for quality, not evasion.
