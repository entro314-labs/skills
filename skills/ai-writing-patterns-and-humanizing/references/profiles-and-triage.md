# Profiles, tolerance, scoring and rewrite decisions

## Profiles

State which profile was used and why. If none is given, infer:

| Signal | Profile |
|---|---|
| Under 300 words with hashtags or mentions | social (short-form, punchy) |
| Code blocks, API references, architecture discussion | technical-blog (technical terms get a pass) |
| Salutation plus fundraising or investor language | investor-email (promotional language is the biggest risk) |
| Step-by-step instructions, parameter docs, README structure | docs (clarity over voice) |
| Explicit casual register | casual (only the worst offenders) |
| No strong signal | blog (default, all rules at full strength) |

## Tolerance matrix

Rules not listed apply at full strength everywhere. "Extra strict" means flag borderline cases too.

| Rule | social | blog | technical-blog | investor-email | docs | casual |
|---|---|---|---|---|---|---|
| Em dashes | relaxed (2/post) | strict | strict | strict | relaxed | skip |
| Bold overuse | relaxed | strict | strict | strict | relaxed | skip |
| Emoji in headers | relaxed (1-2, end of line) | strict | strict | strict | skip | skip |
| Excessive bullets | skip | strict | relaxed | strict | skip | skip |
| Hedging | strict | strict | relaxed ("may" is accurate) | strict | relaxed | skip |
| Word table | strict | strict | partial | strict | relaxed | P0 only |
| Promotional language | relaxed | strict | strict | extra strict | strict | skip |
| Significance inflation | strict | strict | strict | extra strict | relaxed | skip |
| Copula avoidance | skip | strict | relaxed | strict | skip | skip |
| Uniform paragraph length | skip | strict | strict | strict | relaxed | skip |
| Numbered list inflation | relaxed | strict | relaxed | strict | skip | skip |
| Rhetorical questions | relaxed (1 as hook) | strict | strict | strict | strict | skip |
| Transition phrases | skip | strict | strict | strict | relaxed | skip |
| Generic conclusions | skip | strict | strict | extra strict | skip | skip |

## Thresholds (working defaults, not empirically derived)

| Metric | Default |
|---|---|
| Em dashes | target zero; cap 1 per 1,000 words (blog, technical, investor) |
| Bold | at most 1 phrase per major section |
| Tier 2 words | flag at 2+ in one paragraph |
| Tier 3 words | flag at about 3% of words or more |
| Sentence length | most sentences in 15-25 words means monotony; mix 3-8 with 20+ |
| Structure | over 3 headings in under 300 words; 8+ bullets in under 200 words |
| "Not X, it's Y" | max 1 per piece |
| Adjective triplets | max 1 per piece |

Other sources suggest looser em-dash caps (one per paragraph, or three per page). The 1-per-1,000 cap is used here because it is tied to profile-specific tolerance.

## Quick score (per 1,000 words)

Count: red-flag vocabulary (Tier 1 hits), opening hedges, vague authority ("studies show"), em dashes, paragraphs following the same Statement, Explanation, Example, Bridge shape, false-warmth phrases.

| Signal | Concerning above |
|---|---|
| Tier 1 vocabulary | 5 |
| Opening hedges | 2 |
| Vague authority | 2 |
| Em dashes | 4 |
| Same-shape paragraphs | 60% |
| False warmth | 1 |

Rough totals of tripped signals: 0-5 hits light edit, 6-12 full humanize, above 12 full rewrite. These are rough checks without a stated empirical basis; the multi-signal rewrite rule below takes precedence.

## Patch or rebuild

Rebuild when all of: 5+ vocabulary hits across several categories, 3+ pattern categories, uniform sentence or paragraph length. Procedure: write the core point in one sentence, list the supporting facts the source actually contains, rewrite from that list. Do not add facts.

## Self-reference exemption

When writing about AI-writing patterns (tutorials, style guides), quoted examples, code blocks and text marked illustrative are exempt. Flag only the author's own prose.

## Counting aids

- Em dashes: `grep -o '—' file | wc -l`. Count `--` separately. Do not use byte counts.
- Template residue: search for `[`, "As an AI", "Based on my training", "I hope this helps" before publishing.
