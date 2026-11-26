# Diagram templates

All templates use the single-line style. Convert the whole template to one style (double, heavy, or ASCII) rather than mixing.

## Boxes

```
┌──────────────────┐   ╭──────────╮   ╔══════════╗
│ Title            │   │ Rounded  │   ║ Double   ║
├──────────────────┤   ╰──────────╯   ╚══════════╝
│ body line        │
└──────────────────┘
```

Different styles are shown side by side only for comparison; use one style per artwork.

## Table with header rule

```
┌──────────┬───────┬─────────┐
│ Name     │ Count │ Status  │
├──────────┼───────┼─────────┤
│ alpha    │    12 │ ok      │
│ beta     │   103 │ failed  │
└──────────┴───────┴─────────┘
```

Text columns left-aligned, numeric columns right-aligned. Column width = widest cell + 2.

Compact variant without side borders (easier to maintain, survives edits):

```
Name    Count  Status
------  -----  ------
alpha      12  ok
beta      103  failed
```

## Tree

```
root/
├── dir/
│   ├── a.txt
│   └── b.txt
├── other/
│   └── c.txt
└── README
```

Rules: `├──` for non-last siblings, `└──` for last; continuation column `│   ` under non-last parents, four spaces under last parents. ASCII fallback: `|--` and `` `-- ``.

## Flow with branch

```
        ┌───────┐
        │ Start │
        └───┬───┘
            ↓
        ┌───────┐
        │ Check │
        └───┬───┘
       yes  │  no
     ┌──────┴──────┐
     ↓             ↓
┌────────┐    ┌────────┐
│  Ship  │    │  Fix   │
└────────┘    └────────┘
```

Keep the decision labels on their own row between the join and the branches.

## Retry loop (vertical, return edge on the right)

```
┌─────────┐
│   Try   │◄────┐
└────┬────┘     │
     ▼          │
┌──────────┐ no │
│ Success? ├────┘
└────┬─────┘
     │ yes
     ▼
   Done
```

## Layered view

```
┌─────────────────────────────┐
│         Presentation        │
├─────────────────────────────┤
│           Domain            │
├─────────────────────────────┤
│        Infrastructure       │
└─────────────────────────────┘
```

## Horizontal pipeline with feedback

```
┌───────┐    ┌─────────┐    ┌────────┐
│ Input │───→│ Process │───→│ Output │
└───────┘    └─────────┘    └───┬────┘
                  ↑             │
                  └─ feedback ──┘
```

Draw the return path on its own rows; do not run a line through a label.

## Sequence

```
 Client         Server          Store
   │──request────→│               │
   │              │──query───────→│
   │              │←──rows────────│
   │←─response────│               │
```

Lifelines are `│` in fixed columns; each message is a run of `─` ending in `→` or `←` between two lifeline columns, with the label inline.

## State

```
        start
          │
          ↓
      ┌───────┐   fail   ┌────────┐
      │ Ready │─────────→│ Error  │
      └───┬───┘          └───┬────┘
          │ run              │ retry
          ↓                  │
      ┌───────┐              │
      │ Busy  │←─────────────┘
      └───────┘
```

## Layout sketch (UI wireframe)

```
┌──────────────────────────────┐
│  Logo        Home  About [=] │
├──────────┬───────────────────┤
│ Sidebar  │  Content          │
│ - Item 1 │  ┌─────────────┐  │
│ - Item 2 │  │   Card      │  │
│          │  └─────────────┘  │
├──────────┴───────────────────┤
│  Footer                      │
└──────────────────────────────┘
```

Nested boxes need one cell of padding inside the parent on every side.

## Banners and headers

```
══════════════════════
  Section Title
══════════════════════
```

```
╔════════════════════╗
║    Section Title   ║
╚════════════════════╝
```

Large block lettering (figlet-style) is font-specific and error-prone to hand-draw; generate it with a figlet-compatible tool when needed, and check the width against the 80-column limit.

## Bars and meters

```
cpu  ████████████░░░░░░░░  60%
mem  ██████░░░░░░░░░░░░░░  30%
disk ██████████████████░░  90%
```

Fixed bar width (20), labels padded to the longest label, percent right-aligned.

Sparkline with vertical eighths: `▁▂▃▅▇█▆▃▂▁`.

## Small shapes (classic motifs)

```
  /\_/\
 ( o.o )
  > ^ <
```

Hand-drawn pictures are stylistic; verify row-by-row alignment and keep them under ~20 rows so they read at a glance.
