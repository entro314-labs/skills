# Scoring and page-level audit

## 1. Weighted copy score (0-100)

Score each dimension 0-10, composite = sum(score * weight) * 10.

| Dimension | Weight | Measures |
|---|---|---|
| Hook strength | 0.25 | Does the first line stop the reader in about 3 seconds |
| Emotional resonance | 0.25 | Connects to the reader's situation, fear or desire |
| Technique usage | 0.20 | Persuasion devices present (rhetorical technique, pacing, reframes) |
| Specificity | 0.15 | Concrete numbers, outcomes, timeframes |
| CTA strength | 0.10 | Clear next step with no exit ramp ("if you're interested" is a ramp) |
| Compliance | 0.05 | No prohibited terms |

Honest framing: weights are hand-set, not validated against conversion data. Use the score to compare variants of the same piece, not to predict performance. The "technique" dimension is the weakest (persuasion-device checklists have thin evidence); drop it and reweight if it does not fit the channel. Any benchmark ranges (e.g. "good post = 60-75") are unvalidated anchors.

### Compliance check: use word boundaries
Substring matching produces false positives ("blending" matches "lending", "separates" matches "rates").

```python
import re

def compliance_check(copy: str, forbidden: list[str]) -> list[str]:
    text = copy.lower()
    return [w for w in forbidden if re.search(r"\b" + re.escape(w.lower()) + r"\b", text)]

# penalty: 10 if clean, else max(0, 10 - 3 * len(violations))
```
The forbidden list is project/industry specific (regulated claims, banned brand terms); supply it, do not assume one.

### Output contract
- Per-dimension score with a one-line reason.
- One "weakest point" line and one "top suggestion" line.
- List of missing techniques.
- For multiple variants: comparison table naming a winner.
- Machine-readable (JSON) output when feeding a pipeline.
- Rewrite only when the composite falls below a chosen threshold (e.g. 85).

### If scoring with an LLM
Instruct it to be strict, return JSON only, with a reason and an improvement per dimension. A parse failure must raise an error, never fall back to default scores (silent defaults hide broken runs). Check current model identifiers rather than hard-coding remembered ones.

## 2. Page-level rubric (grades A/B/C/D per category)

Grade to a professional copywriter standard; be strict.

1. **Value proposition**: primary benefit clear within 5 seconds; headline answers "what's in it for me"; subheadline adds number, outcome or timeframe; one specific audience; features framed as benefits.
2. **Clarity**: average sentence under 20 words; paragraphs 2-3 sentences; jargon explained or deliberate; passive under 10%; no filler adverbs.
3. **Persuasion**: social proof where claims are made; urgency is real (no fake countdowns); objections answered before they arise; risk reversal present; emotional trigger fits the audience's main motivation.
4. **CTAs**: action verb plus benefit ("Start free trial", not "Submit"); one primary CTA per section; label matches what happens next; button text works without surrounding context; lower-commitment secondary option available.
5. **Microcopy**: form labels clear, not clever; errors say what went wrong and how to fix it; success messages confirm the action; empty states guide the next action; loading states set expectations; navigation labels predictable.
6. **Tone**: consistent across the page; matches brand; humor does not undermine trust; address form (formal/informal) consistent; technical level consistent.
7. **Grammar**: zero spelling/grammar errors; consistent capitalization and punctuation; no placeholder or broken interpolation (`{name}`, lorem ipsum).

### Reporting and rewriting rules
- For every item graded B or worse: quote the copy, say why it is weak, give the rewrite in place.
- For subjective tone choices, offer two options and ask.
- Never change direct quotes or testimonials.
- Rewrites must fit UI limits (button width, card height, character caps).
- Analysis tasks are read-only; apply fixes only when asked.

### Multi-page / site audit
- Order: homepage and pricing first (highest impact), then CTAs site-wide, then inconsistent terminology, then grammar, then microcopy.
- Fix terminology at the source (translation files or shared constants), not page by page.
- Produce a mini style guide from the findings: canonical terms, banned synonyms, address form, capitalization rules.
