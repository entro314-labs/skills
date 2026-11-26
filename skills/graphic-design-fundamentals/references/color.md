# Color Reference

## Models

| Model | Use |
|---|---|
| HSL | Thinking and generating variations (hue offsets, lightness steps) |
| Hex / rgba() | Output for screen |
| CMYK | Print only; convert at the end and proof, saturated screen colors will shift |

## Harmony recipes (HSL hue offsets)

| Scheme | Rule | Character |
|---|---|---|
| Monochromatic | One hue, vary S and L | Calm, cohesive, needs value contrast |
| Analogous | Hues within ~30 deg | Harmonious, low tension |
| Complementary | 180 deg | High energy; use one as accent only |
| Split-complementary | Complement +/- 15 deg | Contrast with less clash |
| Triadic | 120 deg apart | Playful; mute two, saturate one |

Proportion: 60% dominant surface, 30% secondary, 10% accent.

Temperature: warm = energy, urgency, appetite; cool = calm, trust, tech; neutral = sophistication, lets content lead.

## Production roles

Define as CSS custom properties on `:root`; components use roles, never raw values.

| Group | Roles |
|---|---|
| Surface | primary, secondary, tertiary, inverse |
| Text | primary, secondary, tertiary, inverse, link |
| Brand | primary, hover, light, secondary |
| Semantic | success, warning, error, info |
| Border | default, strong |

```css
:root {
  --surface-primary: hsl(220 20% 98%);
  --surface-inverse: hsl(220 25% 10%);
  --text-primary:    hsl(220 25% 10%);
  --text-secondary:  hsl(220 12% 35%);
  --brand-primary:   hsl(250 70% 45%);
  --border-default:  hsl(220 14% 85%);
}
```

## Scales

- **Accent scale:** 10 steps (50, 100 ... 900). Treat 500 as base; tints raise lightness and slightly lower saturation; shades lower lightness and slightly raise saturation (pure darkening looks muddy).
- **Neutral scale:** about 8 steps from near-black (L ~10%) to near-white (L ~98%), low saturation (~5-15%) carrying a faint tint of the brand hue (e.g. hue 220 for a cool brand).
- **Dark mode neutrals:** text from L ~90% down, backgrounds around L 8%, raised surfaces L 12-18%. Do not invert the light palette mechanically.

## Perceptual adjustments

- Saturated yellows and greens look lighter than blues and purples at equal HSL lightness; set lightness per hue, not globally.
- On dark backgrounds keep accent text lightness above ~65%; on light backgrounds keep it below ~40%.
- Desaturate large colored areas; reserve full saturation for small accents.
- Pure black on pure white is harsh at large sizes; near-black on off-white reduces glare while still passing contrast.
- In dark mode, reduce saturation of accents slightly; elevate surfaces with lighter fills rather than heavy shadows.

## Contrast thresholds (WCAG 2.x)

| Element | AA | AAA |
|---|---|---|
| Normal text | 4.5:1 | 7:1 |
| Large text (>= 24px regular, or >= ~18.66px / 14pt bold) | 3:1 | 4.5:1 |
| UI components, icons, meaningful graphics, focus rings | 3:1 against adjacent colors | |

Placeholder, disabled-looking text that carries information, and text over images or gradients are common failures: measure the worst point behind the text, or add a scrim.

Never carry meaning by color alone: pair with icon, label, pattern or position. Simulate protanopia, deuteranopia and tritanopia. Red/green status pairs are the classic failure.

## Color in graphics and imagery

- Limit a piece to 1 dominant hue + 1 accent + neutrals unless the brief is deliberately maximal.
- Overlay text on photos with a semi-transparent block, a gradient scrim over low-detail area, or `mix-blend-mode`.
- Gradients: keep the hue shift small (analogous) or use them as texture; a gradient is not a substitute for a color decision.
- Test the palette in grayscale: value structure should carry the hierarchy even without hue.
