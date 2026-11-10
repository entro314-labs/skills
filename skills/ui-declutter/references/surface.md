# Surface

For rules X1 to X4, and only when the user asked for visual cleanup.

## Contents
- First: is there design intent?
- X1 Gradients and glows
- X2 Spacing
- X3 Weights
- X4 Motion
- Fallback values
- What these rules never change

## First: is there design intent?

These rules fix accidents. They must not flatten decisions. Before applying any of them, look for signs that the visual choices were made on purpose:

- A token system: a Tailwind theme, CSS custom properties, a design-system package.
- A consistent treatment: the same heavy display face on every title, the same gradient on every primary button, one recurring motion.
- A genre that calls for expression: games, marketing and campaign pages, editorial layouts, portfolios, anything for children, anything with a strong brand.
- The user telling you the look is intended.

Then choose:

| What you find | Do |
|---|---|
| A token system | Fix only where the code bypasses the tokens. Fix toward the tokens. |
| A consistent, deliberate treatment | Leave it. Fix only the outliers that break the system's own pattern. |
| An expressive genre | Apply X2 and the performance parts of X4 only. Leave weights, gradients and display type. |
| Product UI (tables, forms, settings, dashboards) with no system and scattered one-off values | Apply all four rules, using the fallback values below. |

Example: a game's pause menu sets "PAUSED" in a heavy condensed face with wide tracking and an amber rule across the panel. That is a style, applied consistently. X3 does not apply. A settings page where one card title is 900 and its siblings are 600 has an outlier, and X3 does.

When in doubt, leave the surface alone and list what you saw in the report. A wrong cut to copy costs a sentence. A wrong normalization costs the product its look.

## X1 Gradients and glows

**Flag:** a gradient from one hue to another on a surface, button or active item; gradient text (`bg-clip-text`); colored glows (`shadow-[0_0_20px_...]`, `shadow-purple-500/50`); blurred color blobs behind content.

**Fix:** a solid surface from the project's palette, solid text color, a neutral shadow or a hairline border.

**Keep:** a gradient that is a tone shift inside one color; a scrim over an image that keeps text legible; anything the intent check protects.

## X2 Spacing

**Flag:** one-off values (`mt-[13px]`, `py-[11px]`, `gap: 7px`) where the rest of the project uses a scale; siblings that do the same job with different padding.

**Fix:** the nearest step of the project's scale. Siblings get one value.

**Keep:** a 1 to 2px optical nudge inside a small control; an odd value that exactly centers something; values computed from other values.

## X3 Weights

**Flag:** 800 and 900 (`font-extrabold`, `font-black`) on body text, labels, table cells, navigation and controls, where the weight is doing the job that size and color should do.

**Fix:** the weight the project uses for emphasis in running UI, usually 500 or 600.

**Keep:** display headings, hero titles, numerals in a scoreboard or KPI where the face was chosen for it, and any type family built around heavy weights. Never change the type family.

## X4 Motion

**Flag:** `transition-all` and `transition: all`; cards that scale on hover; `animate-bounce`; springs and overshoot on ordinary controls; loops that never stop; animated `width`, `height`, `top`, `left` or margins.

**Fix:** transition named properties (`transition-colors`, `transition-[opacity,transform]`); remove the hover scale on cards; replace layout-property animation with `transform` and `opacity`.

**Keep:** motion that explains something (a menu rising from its trigger, a number counting to its value, an item sliding to where it went); a press scale on a control. Check that `prefers-reduced-motion` is respected, and list it as a task if it isn't.

## Fallback values

Only for product UI with no system of its own. These are a neutral default, not a target style. If the project has any consistent values, use those.

**Spacing scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

| Where | Value |
|---|---|
| Inside a control | 4 to 12 |
| Between rows in a list | 2 to 8 |
| Between groups | 12 to 24 |
| Between sections | 32 to 64 |
| Card padding | 16 to 24, one value for sibling cards |
| Row height | 32 compact, 36 default, 44 touch |

Space inside a group is smaller than the space between groups.

**Color use:** keep the palette. Text contrast at least 4.5:1 on its surface, including muted text and text on the accent. Semantic colors (error, success) carry meaning only. List contrast failures as tasks if fixing them means choosing a new color.

**Running-text weights:** 400 for body, 500 to 600 for emphasis.

**Shadows:** `0 1px 2px rgb(0 0 0 / 0.05)` resting, `0 8px 24px rgb(0 0 0 / 0.06)` floating.

**Motion:**

| Use | Duration |
|---|---|
| Hover, press, toggle | 120 to 180ms |
| Menu, popover, tooltip | 160 to 220ms |
| Entrance, layout change | 300 to 400ms |

One easing curve per screen: the framework's ease-out, or `cubic-bezier(0.22, 1, 0.36, 1)`.

## What these rules never change

The palette, the type family, the layout structure, the order of sections, radii, or letter spacing on text that is styled on purpose (uppercase labels need positive tracking to stay legible). They replace an accidental value with a consistent one. They don't redesign.
