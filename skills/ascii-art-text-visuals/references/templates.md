# Templates

All templates are width-checked: every row of a box has the same cell count. Copy, then edit content and re-pad.

## Boxes

```
┌──────────────┐   ╔══════════════╗   ┏━━━━━━━━━━━━━━┓   ╭──────────────╮
│ single       │   ║ double       ║   ┃ thick        ┃   │ rounded      │
└──────────────┘   ╚══════════════╝   ┗━━━━━━━━━━━━━━┛   ╰──────────────╯
```

Titled box with divider:

```
┌─ Status ─────────┐
│ Service   running│
├──────────────────┤
│ Uptime    3d 4h  │
└──────────────────┘
```

## Headers

```
Section Title            ┏━━━━━━━━━━━━━━━┓          Centered Title
═════════════            ┃ Section Title ┃          ━━━━━━━━━━━━━━━━━━━━
                         ┗━━━━━━━━━━━━━━━┛
```

## Table

```
┌────────┬────────┬───────┐
│ Name   │ Status │ Count │
├────────┼────────┼───────┤
│ alpha  │ ok     │    12 │
│ beta   │ fail   │     3 │
└────────┴────────┴───────┘
```

Right-align numbers; pad every cell to its column width.

## Flowchart (vertical)

```
┌─────────┐
│  Start  │
└────┬────┘
     ▼
┌─────────┐   yes   ┌─────────┐
│ Ready?  ├────────►│  Run    │
└────┬────┘         └─────────┘
     │ no
     ▼
┌─────────┐
│  Wait   │
└─────────┘
```

## Feedback loop

```
┌───────┐   ┌───────┐   ┌───────┐
│   A   ├──►│   B   ├──►│   C   │
└───▲───┘   └───────┘   └───┬───┘
    │                       │
    └───────────────────────┘
```

## Fan-out / tree

```
        ┌────────┐
        │ Router │
        └───┬────┘
      ┌─────┴─────┐
      ▼           ▼
 ┌────────┐  ┌────────┐
 │ Node 1 │  │ Node 2 │
 └────────┘  └────────┘
```

Directory tree (no boxes needed):

```
project/
├── src/
│   ├── main.rs
│   └── lib.rs
└── Cargo.toml
```

`├──` for entries with later siblings, `└──` for the last, `│   ` to continue a parent's line.

## Layers / architecture

```
┌──────────────────────────────┐
│ Clients                      │
├──────────────────────────────┤
│ API                          │
├──────────────────────────────┤
│ Storage                      │
└──────────────────────────────┘
```

## Progress and gauges

```
[████████░░░░░░░░] 50%         ☑ done   ☐ todo   ☒ failed
[########--------] 50%         (•) chosen  ( ) other
```

Fill count = `round(ratio * width)`; clamp ratio to 0..1.

## Shading

```
░░░░░░░░   gradient band, light to heavy:
▒▒▒▒▒▒▒▒   ░ ▒ ▓ █
▓▓▓▓▓▓▓▓   ASCII fallback: . : # @
████████
```

## Small illustrations

```
    ▲          /\
   ▲▲▲        /  \        ~~~~~~~~
  ▲▲▲▲▲      /____\         ~~~~~~~~
    │││
```

## ASCII-only fallback of the single-line box

```
+----------+
| fallback |
+----------+
```

## ANSI snippet

```python
RED, GREEN, RESET = "\033[31m", "\033[32m", "\033[0m"
print(f"{RED}error{RESET} {GREEN}ok{RESET}")
```

Strip escapes before measuring width (see `alignment-and-width.md`).
