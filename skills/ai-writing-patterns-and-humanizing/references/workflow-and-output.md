# Workflow, output modes and drafting pipeline

## Rewrite workflow

1. Read the whole piece. Note purpose, audience, register. Choose a profile (`profiles-and-triage.md`).
2. Scan in order: vocabulary, phrase and sentence level, structure and formatting. Name each pattern and quote the text before fixing it.
3. Triage with P0/P1/P2. Quick pass = P0 + P1; full audit = all.
4. Decide patch or rebuild.
5. Mark the one or two genuinely good paragraphs to preserve.
6. Rewrite flagged spans. Preserve meaning and every factual claim. Prefer deletion to substitution.
7. Check for introduced tells: new em-dash asides, forced triplets, filler affirmations, replacement hedges, slogan closers, fake reasoning.
8. Anti-AI pass with two prompts: "What makes the below so obviously AI generated?" (list remaining tells briefly), then "Now make it not obviously AI generated." (revise).
9. Read aloud; vary structure; prefer concrete detail; use is/are/has where they fit.
10. Deliver in the requested mode.

## Output modes

| Mode | Contents |
|---|---|
| Full audit (four parts) | (1) Issues found, each with quoted text. (2) Rewritten version, preserving structure, intent and technical details. (3) What changed, meaningful edits only. (4) Second-pass audit re-reading the rewrite and fixing surviving tells, corrected text inline |
| Rewrite only (default) | Rewritten text in the input's format, then one line naming categories addressed, e.g. "Removed: throat-clearing, em-dash overuse, sycophantic opener, buzzwords." |
| Detection report | Each hit listed with category, quoted phrase, then the rewrite |
| Inline audit | Bracket annotations in the text, e.g. "The company [leverage -> use] uses its supply chain" |

## Edge cases

| Situation | Handling |
|---|---|
| Text over about 1,500 words | Process by heading or paragraph group; report per section |
| Single sentence | Apply the matching rules; note that cross-paragraph patterns (rhythm, uniformity) cannot show |
| Non-English text | The vocabulary lists do not apply; apply only structural rules (formatting, rhythm, filler structure, chatbot residue) |
| Code, legal or technical documentation | Confirm the user wants stylistic editing before starting |
| Zero tells found | Say so plainly; return the original unchanged |
| Strong original | Say so; make only necessary cuts |
| User disputes a rewrite | Accept the user's preference |
| Stated register ("casual", "legal brief") | Preserve it |
| Text the user did not submit | Do not process it |

## Guardrails

- Never change a factual claim while fixing a stylistic one.
- No fabricated anecdotes, quotes, experiences, statistics, sources or citations. Use bracketed placeholders and tell the user.
- Do not add sycophantic commentary to the output.
- Do not add hedges as replacements for removed ones.
- Do not claim guaranteed reach, virality or detection immunity.
- Do not reuse figures or citations from example texts without checking primary sources.
- No numeric "AI-likeness" score is validated. If one is required, define a separate rubric and state it.

## Multi-stage drafting pipeline (for promotional or social posts)

Use when writing new copy so that it does not need humanizing afterward.

1. **Base draft, message first:** one strong claim, one concrete example, one practical takeaway, one question. Avoid list-heavy first drafts.
2. **Pattern cleanup:** remove inflated symbolism, generic conclusions, over-structured cadence; replace vague claims with specifics. Same meaning, fewer tells.
3. **Voice pass:** remove transitions and hedging, tighten to direct language, vary sentence length. It should sound like a person with a point of view.
4. **Persuasion pass:** hook (bold thesis, tension, or contrarian angle), body as problem then insight then implication, close with one engagement question. One call to action only. Choose AIDA, PAS or FAB by goal and avoid an over-salesy tone on social.
5. **Platform adaptation:** adapt length and structure to the channel. For a short multi-post thread: hook, context or problem, key insight, practical framework or example, question closer. Keep continuity and do not repeat sentences across posts.

Quality gates before output (any failure returns "Needs Revision" with reasons):

| Gate | Pass condition |
|---|---|
| Authenticity | no rigid template feel |
| Specificity | at least one concrete detail |
| Rhythm | varied sentence lengths |
| Persuasion | one clear hook, one clear call to action |
| Platform fit | length and format suit the channel |
| Integrity | no fabricated data, experiences or citations |

Optional deliverables: voice-edit summary, the framework used and why, two alternative hooks, two alternative closing questions.
