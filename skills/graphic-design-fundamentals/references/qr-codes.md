# QR codes

Generate with an open-source library (Python `qrcode[pil]` or `segno`; JS `qrcode`). Install in a virtual environment, never with `--break-system-packages`.

## Payload formats

| Type | Payload |
|---|---|
| URL / text | the string itself |
| Wi-Fi | `WIFI:T:WPA;S:<ssid>;P:<password>;H:false;;` (T = WPA, WEP or nopass; H:true for hidden) |
| vCard | `BEGIN:VCARD` / `VERSION:3.0` / `FN:` / `TEL:` / `EMAIL:` / `ORG:` / `TITLE:` / `URL:` / `END:VCARD`, one field per line |
| Email | `mailto:a@b.com?subject=...&body=...` (percent-encode subject and body) |
| Phone | `tel:+441234567890` (international format) |
| SMS | `sms:+441234567890?body=...` |
| Geo | `geo:lat,lon` (optional `,altitude`) |
| Calendar event | iCalendar `BEGIN:VEVENT` block with DTSTART/DTEND/SUMMARY/LOCATION |

Escape `;`, `,`, `:` and `\` inside Wi-Fi fields with a backslash. More data means a denser, harder-to-scan code: shorten URLs and prefer a short redirect or a plain path over long query strings.

## Error correction

| Level | Recovery | Use |
|---|---|---|
| L | ~7% | clean digital display, smallest code |
| M | ~15% | default |
| Q | ~25% | logo overlay |
| H | ~30% | print, rough surfaces, logo overlay |

## Design rules

- Dark modules on a light background; do not invert (some scanners fail) and keep contrast high; colored modules must stay clearly darker than the background.
- Quiet zone (empty border) of at least 4 modules; never crop it.
- Logo overlay: centered, at most ~30% of the width (about 20% is safer), square or round, with Q or H correction; always test-scan after adding it.
- Minimum printed size about 2 x 2 cm; size for scan distance (distance / 10 as a rule of thumb). Test with at least two phones, in the real print and lighting.
- Module size: whole-pixel multiples (box size 10 px or more) to avoid blurry edges; transparent background only when the surface behind is light and uniform.
- Add a short call-to-action caption and a human-readable fallback URL beside the code.

## Export

| Format | Use |
|---|---|
| SVG | print, scaling to any size, design tools |
| PNG | web and digital display |
| PDF / EPS | print-ready, vector pipelines |
| Terminal block characters | quick checks in a shell |

## Batch

Drive generation from a text file (one payload per line), CSV (payload plus filename and options) or JSON (per-code options such as colors and type). Name outputs deterministically (`qr_001.png` or a key column), and for tickets or per-user codes encode a unique opaque ID rather than personal data.
