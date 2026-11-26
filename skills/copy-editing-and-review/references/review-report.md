# Structured copy review

## Four phases
1. **Context analysis**: document type; audience (technical, general, executive, customer); intended tone; purpose (inform, persuade, instruct, engage). Marketing copy gets more stylistic latitude than documentation.
2. **Style guide resolution**: use the project's own style guide if one exists (check the repo root, then common config/docs locations); its rules win and a general default fills gaps. If none exists, say so and apply general plain-language conventions; do not pretend a house guide exists.
3. **Line-by-line review**, grouped:
   - Grammar and mechanics: agreement, punctuation, capitalization, number format, typos.
   - Voice and clarity: active voice, sentence length, jargon, redundancy, parallel lists.
   - Style adherence: terminology, formatting, address form.
   - Content quality: flow, headlines, CTAs, accuracy of claims.
   - AI-writing tells (below).
4. **Report**.

## Report template
- Summary: 1-2 sentences, overall copy health first.
- Issues by category with counts, as a table:

| Location | Original (verbatim) | Issue or rule | Suggested fix |
|---|---|---|---|

- Recurring patterns.
- Top 3 recommendations.
- Style-guide compliance checklist.
- AI-writing check.

Rules: quote exactly; cite the rule; preserve voice; order by impact on comprehension; frame suggestions constructively; when two rules conflict show both options. Tag each finding: clear improvement / judgment call / needs author input.

Output modes: full report; quick scan (top 5); single category focus; inline edits (only with permission).

## AI-writing tells to flag
Treat as signals of generic text, not proof of authorship; fix by making the line specific or cutting it. Flag clusters (inflated vocabulary, formulaic openers and closers, vague attributions, uniform paragraph shape, assistant residue, stacked intensifiers). The full catalogue, vocabulary tiers and fixes are in `copywriting-ai-writing-patterns-and-humanizing`.
