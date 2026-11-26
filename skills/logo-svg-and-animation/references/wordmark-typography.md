# Wordmark typography

## Typeface category by personality

| Category | Fits |
|---|---|
| Geometric sans | Tech, startups, SaaS |
| Grotesque / neo-grotesque | Corporate, enterprise |
| Humanist sans | Consumer, wellness, education |
| Didone | Fashion, luxury |
| Transitional serif | Finance, law |
| Slab serif | Hardware, industrial |

Pick the specific face by category and license, not by trend. Check the license permits logo use and outlining/redistribution of the outlines (open-licensed faces are the safe default; some commercial or platform-bound faces restrict this). Consider customizing a few letterforms so the wordmark is not just typed text.

## Tracking (units of 1/1000 em; starting values, tune by eye)

| Case | Tracking |
|---|---|
| Short (<= 5 chars) | -20 to -10 |
| Medium (6-10 chars) | 0 |
| Long (11+ chars) | +10 to +20 |
| All caps | +50 to +100 |

Luxury and editorial settings use loose tracking (+20 to +50); +100 or more is display-only. Extreme tracking, either direction, fails at small sizes. Test light weights and wide tracking at the 80 px horizontal minimum.

## Weight

| Weight | Use |
|---|---|
| 300 light | Luxury (check 16-48px legibility) |
| 400 regular | Long names; legibility first |
| 500 medium | Balanced default |
| 600 semibold | Modern |
| 700 bold | Impact, short names |

## Case

| Case | Reads as |
|---|---|
| ALL CAPS | Authority, impact (add tracking) |
| lowercase | Friendly, tech, accessible |
| Title Case | Professional services |
| camelCase | Developer tools |

## Rules

- One typeface per wordmark; do not mix weights inside it.
- Pairing balance: icon complexity x wordmark complexity is roughly constant. Complex icon: simple, heavy wordmark. Simple icon: can carry a more distinctive wordmark.
- Geometric icon pairs with geometric or neo-grotesque sans; organic icon pairs with humanist sans.
- Match stroke weight of the wordmark to the icon's stroke or mass.

## SVG wordmark process

1. Set the type. 2. Apply tracking, then manual kerning (check pairs like AV, To, rn, il; squint test at small size). 3. Convert text to outlines. 4. Merge into one compound path. 5. Remove redundant points. 6. Export clean SVG (no `<text>`, no font references).

Anti-patterns: more than one typeface; script faces for a primary logo; trendy display faces that date; extreme tracking; mixed weights. Avoid the most overused default sans families: a distinctive face within the right category beats a safe default.

Descenders (g, y, p, q): optically shift the line slightly up when centering against an icon.
