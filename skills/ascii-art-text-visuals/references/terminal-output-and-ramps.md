# Terminal output, color, and photo-to-ASCII ramps

## ANSI SGR codes

Standard xterm/VT100 Select Graphic Rendition sequences: `ESC[<code>m` (ESC is `\033` or `\x1b`).

| Code | Effect | Code | Effect |
|---|---|---|---|
| 0 | reset | 31-37 | red, green, yellow, blue, magenta, cyan, white foreground |
| 1 | bold | 90-97 | bright foregrounds |
| 2 | dim | 40-47 | backgrounds (same order) |
| 3 | italic | 100-107 | bright backgrounds |
| 4 | underline | 30 / 39 | black foreground / default foreground |
| 7 | reverse | 38;5;N | 256-color foreground (N 0-255) |
| 5 | blink (poorly supported) | 38;2;R;G;B | truecolor foreground; background variants are 48;5;N and 48;2;R;G;B |

Rules:
- End every colored span with `\033[0m`; an unterminated color bleeds into the shell prompt and later output.
- Escape codes occupy zero cells: exclude them when computing width (strip with `re.sub(r"\x1b\[[0-9;]*m", "", s)` before measuring or padding).
- Emit color only when stdout is a terminal (`isatty`) and `NO_COLOR` is unset; otherwise print plain text. Honor a user's explicit flag to force or disable color.
- Use only the 16 basic colors for portability; 256-color and truecolor need capability detection (`COLORTERM=truecolor`).
- Colored art saved to a file conventionally uses `.ansi` (no standard extension exists); do not paste escape codes into Markdown, chat, or comments.
- Do not rely on color alone for meaning (status, diff); pair with a symbol or word.

## Terminal cell geometry

Cells are roughly twice as tall as wide (about 1:2). Consequences:
- A square of N x N characters looks like a tall rectangle; use about 2N columns for N rows to look square.
- When converting an image, resample to the target column count, and scale the row count by about 0.5.
- Half-block characters (`▀ ▄`) with separate foreground and background colors give two square-ish pixels per cell, doubling vertical resolution.

## Brightness ramp (photo to ASCII)

Pipeline: load, convert to grayscale, resize (columns = target width; rows = columns * aspect * 0.5), optionally boost contrast, map each pixel to a character.

Choose the ramp direction by target background:
- Light background (paper, light theme): bright pixel = space, dark pixel = `@`.
- Dark terminal: invert, bright pixel = `@`, dark pixel = space.

```python
RAMP = " .:*#@"          # light-to-heavy ink density, 6 levels
def to_char(brightness: float, dark_background: bool = True) -> str:
    """brightness in [0.0, 1.0]; returns one ramp character."""
    b = brightness if dark_background else 1.0 - brightness
    return RAMP[min(int(b * len(RAMP)), len(RAMP) - 1)]
```

Use an ordered sequence and an index computation (or `bisect` over bin edges for uneven bins such as 0.1, 0.2, 0.4, 0.6, 0.8). Interval-keyed dictionaries like `{(0.0, 0.1): ' '}` are not valid lookup structures.

Longer ramp for finer tone (about 70 levels, light to heavy; needs a high-resolution target, noisy at small sizes):

```
 .'`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$
```

Quality tips:
- Fewer, well-separated levels read better at small sizes than many similar ones.
- Apply gamma or histogram equalization first for low-contrast images.
- Edge-heavy subjects (logos, line art) work better with threshold plus `/ \ | -` than with a tonal ramp.

## Testing checklist

- View at the target width (80 columns default) and in the target font; re-check after any character change.
- View on both light and dark backgrounds if the destination is unknown, or state the assumption.
- Confirm UTF-8 round trip (write, read back, diff).
- Provide a plain ASCII fallback for limited environments.

## Delivery contexts

| Context | Guidance |
|---|---|
| Markdown | Fenced code block (`text` tag is fine); keep one indent level for every line inside list items |
| HTML | `<pre>` with monospace stack and `white-space: pre`; escape `<`, `>`, `&` |
| Source comments | Pure ASCII preferred; comment leader on every line; stay within the project line limit |
| Commit messages, plain email | Pure ASCII, under ~72 columns |
| Chat | Code block, short; non-code text may render proportionally |
| Files | Save as UTF-8 if any non-ASCII glyph; `.txt` plain art, `.md` documentation, `.ansi` colored art; no tabs |
| Accessibility | Add a one- or two-sentence prose description beside any non-trivial diagram |
