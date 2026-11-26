# Readability metrics

## Formulas
- Flesch Reading Ease = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words); clamp to 0-100.
- Flesch-Kincaid Grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59.

| Reading Ease | Band |
|---|---|
| 90+ | very easy (about 5th grade) |
| 80-89 | easy (6th) |
| 70-79 | fairly easy (7th) |
| 60-69 | standard (8th-9th) |
| 50-59 | fairly difficult (10th-12th) |
| 30-49 | difficult (college) |
| under 30 | very confusing |

## Targets (heuristics, not standards)
| Metric | Target |
|---|---|
| Flesch Reading Ease | 60-80 for most marketing copy |
| Flesch-Kincaid grade | about 6-8 for general audiences |
| Average sentence length | under ~20 words (hard ceiling ~25) |
| Paragraph length | 2-3 sentences (2-4 acceptable) |
| Passive voice | under 10% of sentences |
| Adverb density | under 5% of words |
| Filler words | 0-3 per 100 words |

Adjust for audience: technical or B2B-expert copy may legitimately score lower; do not dumb down precise terminology to hit a number.

## Pitfalls when automating
- Syllable counts from a vowel-group heuristic with a silent-e rule are approximate; scores are rough. Compare drafts of the same piece (trend), do not quote absolute grades.
- Passive detection by "be-verb + word ending in -ed" misfires on adjectives ("is excited"); treat the percentage as an upper bound.
- Sentence splitting on `[.!?]` plus whitespace mishandles abbreviations and decimals ("e.g.", "3.5").
- "-ly" adverb detection needs a stop list (family, early, only, likely, daily, July...).
- Headlines, bullets and buttons have no terminal punctuation; exclude or special-case them.
