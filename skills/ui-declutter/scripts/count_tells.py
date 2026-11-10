#!/usr/bin/env python3
"""Find candidate interface clutter in source files.

A regex pass that lists places worth reading and gives a before/after number.
It cannot judge meaning: rules C3, C4, C5, C7, A2 and V3 are never counted,
and some hits are legitimate. Read the candidates; do not chase zero.

Usage:
    count_tells.py <file-or-folder> [more paths...] [--surface] [--json]
                   [--max N] [--counts-only]
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

MARKUP = {".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".mdx",
          ".erb", ".hbs", ".njk", ".twig", ".php"}
SCRIPT = {".js", ".ts", ".mjs", ".cjs"}
STYLE = {".css", ".scss", ".sass", ".less"}
DATA = {".json", ".yaml", ".yml"}
ALL_EXTS = MARKUP | SCRIPT | STYLE | DATA

SKIP_DIRS = {"node_modules", ".git", "dist", "build", "out", ".next", ".nuxt",
             ".svelte-kit", ".turbo", ".cache", "coverage", "vendor",
             "__pycache__", ".venv", "venv"}
SKIP_FILES = {"package.json", "package-lock.json", "tsconfig.json",
              "jsconfig.json", "composer.json", "pnpm-lock.yaml", "yarn.lock",
              ".eslintrc.json", "manifest.json", "components.json"}
MAX_BYTES = 1_000_000

# Paths where placeholder people and companies are expected (rule F2).
FIXTURE_HINT = re.compile(
    r"(\.test\.|\.spec\.|\.stories\.|__tests__|__mocks__|/fixtures?/|/mocks?/|/seeds?/|/storybook/)",
    re.I)

COMMENT_LINE = re.compile(r"^\s*(//|/\*|\*(?!\s*\{)|<!--|\{/\*)")

I = re.I

VAGUE = (r"Get started|Learn more|Click here|Submit|Read more|Explore|Discover more|"
         r"See more|Find out more|Try it now|Try now")
# Quoted form is case-sensitive so that type="submit" is not a hit.
VAGUE_QUOTED = (r"Get [Ss]tarted|Learn [Mm]ore|Click [Hh]ere|Submit|Read [Mm]ore|Explore|"
                r"Discover [Mm]ore|See [Mm]ore|Find [Oo]ut [Mm]ore|Try [Ii]t [Nn]ow|Try [Nn]ow")
BADGE = r"NEW|New|LIVE|Live|BETA|Beta|PRO|Pro|AI|HOT|Hot|POPULAR|Popular|AI[- ]powered|Coming soon"

# (id, label, kinds, regex). kinds: which file groups the rule reads.
T = MARKUP | SCRIPT | DATA          # anywhere a visible string can live
M = MARKUP
C = MARKUP | SCRIPT                 # code that can hold chart config or JSX
S = MARKUP | STYLE | SCRIPT

RULES = [
    ("C1", "eyebrow label", M | SCRIPT, re.compile(
        r"(?=[^\n]*\buppercase\b)(?=[^\n]*\btracking-(?:wide|wider|widest|\[))"
        r"(?=[^\n]*\btext-(?:xs|sm|\[1[0-3]px\]))"
        r"|class(?:Name)?\s*=\s*[\"'{`][^\"'`>]*\b(?:eyebrow|kicker|overline|pretitle|supertitle)\b", I)),
    ("C2", "decorative numbering", T, re.compile(
        r">\s*0[1-9]\s*(?://|/|\.|—|–)?\s*<"
        r"|[\"'`]0[1-9]\s*(?://|\.)?[\"'`]"
        r"|§\s*\d")),
    ("C6", "status string", T, re.compile(
        r"(?:\s(?:[·•]|&middot;|&bull;)\s[^\n]*){2,}"
        r"|>[^<>{}\n]*\s\|\s[^<>{}\n]*\s\|\s[^<>{}\n]*<")),
    ("C9", "generic section heading", T, re.compile(
        r"Why choose us|Everything you need|How it works|What our (?:customers|users|clients) (?:say|are saying)"
        r"|Built for (?:teams|developers|everyone|the modern|you)|Powerful features|Key features|Our features"
        r"|Ready to get started|Get started today|to the next level|Features that", I)),
    ("C10", "tip or hint callout", T, re.compile(
        r"\bPro tip\b|(?<![\w-])Tip:|(?<![\w-])Hint:|Did you know\b|\bPsst\b", I)),
    ("A1", "vague action label", T, re.compile(
        r">\s*(?:(?i:%s)|OK|Ok|Okay)\s*(?:\u2192|&rarr;|->)?\s*<"
        r"|[\"'`](?:%s)[\"'`]" % (VAGUE, VAGUE_QUOTED))),
    ("A3", "generic confirmation", T, re.compile(r"Are you sure", I)),
    ("S1", "loading filler", T, re.compile(
        r"Hang tight|Sit tight|Just a (?:moment|sec|second)|Please wait|Bear with us"
        r"|Working (?:our|its|some) magic|Crunching|Brewing|Getting things ready|Almost there", I)),
    ("S2", "success filler", T, re.compile(
        r"\bsuccessfully\b|has been (?:saved|updated|created|deleted|sent|added|removed)", I)),
    ("S3", "empty-state filler", T, re.compile(
        r"Nothing (?:here|to see|to show)|No \w+(?: \w+)? yet!|Looks like you (?:haven't|don't|have no)"
        r"|Get started by (?:creating|adding)|It's (?:quiet|empty) (?:in )?here", I)),
    ("S4", "vague or cute error", T, re.compile(
        r"\b(?:Oops|Whoops|Uh[ -]oh|Yikes)\b|Something went wrong"
        r"|An (?:unexpected )?error (?:has )?occurred|Please try again later", I)),
    ("F1", "unsourced proof", T, re.compile(
        r"Trusted by|Loved by|As seen (?:in|on)"
        r"|Join (?:over |more than )?[\d,.]+\s*[kKmM]?\+?"
        r"|\b\d[\d,.]*\s*[kKmM]?\+\s+(?:happy |active |satisfied )?"
        r"(?:users|customers|teams|developers|companies|businesses|downloads|reviews|creators|students)"
        r"|\b99\.9+%|★{4,}|⭐{3,}|\b[45]\.\d\s*(?:/\s*5|stars|out of 5)", I)),
    ("F2", "placeholder data", T, re.compile(
        r"\bJohn Doe\b|\bJane Doe\b|\bJohn Smith\b|\bJane Smith\b|\bAcme\b|Lorem ipsum"
        r"|@example\.(?:com|org)|placeholder\.com|placehold\.(?:co|it)|picsum\.photos"
        r"|pravatar\.cc|randomuser\.me|source\.unsplash\.com|dicebear", I)),
    ("D1", "badge without state", M | SCRIPT, re.compile(
        r"<(?:span|div|p|small|sup|Badge|Chip|Tag|Pill)\b[^>]*>\s*(?:\S{1,2}\s)?(?:%s)!?\s*</" % BADGE)),
    ("D2", "status dot", S, re.compile(
        r"(?=[^\n]*animate-(?:pulse|ping))(?=[^\n]*rounded-full)"
        r"|\.(?:status|pulse|live)-?dot\b", I)),
    ("D3", "decorative emoji", MARKUP | DATA | SCRIPT, re.compile(
        "[\U0001F300-\U0001FAFF✨⚡⭐❤]")),
    ("V1", "title names chart type", T, re.compile(
        r"\b(?:bar|line|pie|area|scatter|donut|doughnut|column)\s+(?:chart|graph|plot)\s+"
        r"(?:of|showing|for|displaying)\b", I)),
    ("V2", "reading instructions", T, re.compile(
        r"Hover (?:over|on|for)\b|Each (?:bar|point|dot|line|slice|segment|column) (?:represents|shows|is)\b"
        r"|Click (?:on )?(?:a|any|the) (?:bar|point|slice|legend)|Tap (?:a|any) (?:bar|point)", I)),
    ("V4", "chart scaffolding", C, re.compile(
        r"lineWidth:\s*[2-9]|drawBorder:\s*true|border:\s*\{\s*display:\s*true|shadowBlur|is3D|options3d")),
    ("V5", "legend turned on", C, re.compile(
        r"legend:\s*\{[^}\n]*display:\s*true|<Legend\b|showLegend(?::\s*true|=\{true\})")),
    ("W2", "sales adjective", T, re.compile(
        r"\b(?:seamless(?:ly)?|effortless(?:ly)?|supercharge[ds]?|blazing(?:ly)?[- ]fast|next[- ]gen(?:eration)?"
        r"|all[- ]in[- ]one|cutting[- ]edge|game[- ]chang(?:er|ing)|world[- ]class|revolutioni[sz]e[ds]?"
        r"|unlock (?:the|your)|elevate your)\b", I)),
    ("W3", "exclamation mark", T, re.compile(
        r">[^<>{}\n]*[a-z]!\s*<|[a-z]![\"'`]\s*[,;)\]}]?\s*$|[a-z]![\"'`]\s*[,)]")),
    ("W5", "em dash in text", MARKUP | DATA, re.compile("—")),
]

SURFACE_RULES = [
    ("X1", "gradient or glow", S, re.compile(
        r"\bbg-gradient-to-|\bbg-linear-to-|\b(?:linear|radial|conic)-gradient\(|\bbg-clip-text\b"
        r"|shadow-\[0_0_|\bshadow-[a-z]+-\d{2,3}(?:/\d+)?\b|\bblur-(?:2xl|3xl)\b"
        r"|box-shadow\s*:[^;\n]*\b0 0 \d{2,}px|text-shadow\s*:[^;\n]*\b0 0 \d+px|drop-shadow-\[0_0")),
    ("X3", "heavy weight", S, re.compile(
        r"\bfont-(?:extrabold|black)\b|font-weight\s*:\s*(?:800|900)\b|fontWeight\s*:\s*[\"']?(?:800|900)\b")),
    ("X4", "decorative motion", S, re.compile(
        r"\btransition-all\b|transition\s*:\s*all\b|\bhover:scale-|\banimate-bounce\b")),
]

# X2 needs arithmetic, so it gets its own matcher.
TW_SPACING = re.compile(
    r"(?<![\w-])-?(?:[mp][trblxyse]?|gap(?:-[xy])?|space-[xy])-\[(\d+(?:\.\d+)?)px\]")
CSS_SPACING = re.compile(
    r"(?:margin|padding|gap|row-gap|column-gap)(?:-[a-z]+)*\s*:\s*([^;{}\n]+)")
PX = re.compile(r"(?<![\w.])(\d+(?:\.\d+)?)px")

# A CSS block that looks like an eyebrow: uppercase, tracked, small.
CSS_BLOCK = re.compile(r"([^{}]*)\{([^{}]*)\}")
SMALL_FONT = re.compile(
    r"font-size\s*:\s*(?:(?:[0-9]|1[0-3])(?:\.\d+)?px|0?\.(?:[5-8]\d*)(?:r?em)|x-small|xx-small|smaller)")
TRACKED = re.compile(r"letter-spacing\s*:\s*(?!0(?:[a-z%]*)\s*[;}]|normal)[\d.]")
EYEBROW_NAME = re.compile(r"eyebrow|kicker|overline|pretitle|supertitle", I)

NOT_COUNTED = "C3 C4 C5 C7 A2 V3"


def off_scale(value):
    if value <= 2 or value in (6, 10):
        return False
    return value % 4 != 0


def iter_files(paths):
    for raw in paths:
        p = Path(raw)
        if p.is_file():
            if p.suffix.lower() in ALL_EXTS:
                yield p
            continue
        if not p.is_dir():
            print("count_tells: not found: %s" % raw, file=sys.stderr)
            continue
        for root, dirs, files in os.walk(p):
            dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS and not d.startswith("."))
            for name in sorted(files):
                f = Path(root) / name
                if f.suffix.lower() not in ALL_EXTS:
                    continue
                if name in SKIP_FILES or ".min." in name:
                    continue
                yield f


def read(path):
    try:
        if path.stat().st_size > MAX_BYTES:
            return None
        return path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return None


def snippet(line):
    s = " ".join(line.split())
    return s if len(s) <= 110 else s[:107] + "..."


def scan_file(path, surface, hits):
    text = read(path)
    if text is None:
        return False
    ext = path.suffix.lower()
    is_fixture = bool(FIXTURE_HINT.search(str(path).replace(os.sep, "/")))
    lines = text.splitlines()
    rules = RULES + (SURFACE_RULES if surface else [])

    for n, line in enumerate(lines, 1):
        if not line.strip() or COMMENT_LINE.match(line):
            continue
        for rid, _label, kinds, rx in rules:
            if ext not in kinds:
                continue
            if rid == "F2" and is_fixture:
                continue
            if rid in ("W3", "S2") and "console." in line:
                continue
            if rx.search(line):
                hits.setdefault(rid, []).append((str(path), n, snippet(line)))
        if surface and ext in S:
            bad = [float(v) for v in TW_SPACING.findall(line)]
            for decl in CSS_SPACING.findall(line):
                bad += [float(v) for v in PX.findall(decl)]
            if any(off_scale(v) for v in bad):
                hits.setdefault("X2", []).append((str(path), n, snippet(line)))

    # Eyebrow-shaped CSS rules span lines, so look at whole blocks.
    if ext in STYLE | {".html", ".htm", ".vue", ".svelte", ".astro"}:
        for m in CSS_BLOCK.finditer(text):
            selector, body = m.group(1), m.group(2)
            named = EYEBROW_NAME.search(selector.splitlines()[-1] if selector.strip() else "")
            shaped = ("uppercase" in body and TRACKED.search(body) and SMALL_FONT.search(body))
            if named or shaped:
                n = text.count("\n", 0, m.start(2)) + 1
                sel = snippet(selector.strip().splitlines()[-1]) if selector.strip() else "(block)"
                entry = (str(path), n, sel + " { uppercase, tracked, small }" if shaped else sel)
                if entry[:2] not in [(h[0], h[1]) for h in hits.get("C1", [])]:
                    hits.setdefault("C1", []).append(entry)
    return True


def main():
    ap = argparse.ArgumentParser(description="Find candidate interface clutter in source files.")
    ap.add_argument("paths", nargs="+", help="files or folders to scan")
    ap.add_argument("--surface", action="store_true", help="also count X1 to X4")
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    ap.add_argument("--max", type=int, default=15, help="candidates listed per rule (default 15)")
    ap.add_argument("--counts-only", action="store_true", help="print the table without the candidate list")
    args = ap.parse_args()

    hits, scanned = {}, 0
    for f in iter_files(args.paths):
        if scan_file(f, args.surface, hits):
            scanned += 1

    order = [(r[0], r[1]) for r in RULES]
    if args.surface:
        order += [("X1", "gradient or glow"), ("X2", "off-scale spacing"),
                  ("X3", "heavy weight"), ("X4", "decorative motion")]
    total = sum(len(v) for v in hits.values())

    if args.json:
        print(json.dumps({
            "files_scanned": scanned,
            "total": total,
            "not_counted": NOT_COUNTED.split(),
            "rules": [{"id": rid, "label": label, "count": len(hits.get(rid, [])),
                       "candidates": [{"file": f, "line": n, "text": t} for f, n, t in hits.get(rid, [])]}
                      for rid, label in order],
        }, indent=2, ensure_ascii=False))
        return 0

    if scanned == 0:
        print("count_tells: no interface files found in: %s" % ", ".join(args.paths))
        return 0

    print("%d file%s scanned\n" % (scanned, "" if scanned == 1 else "s"))
    print("%-5s %-28s %s" % ("Rule", "", "Candidates"))
    for rid, label in order:
        count = len(hits.get(rid, []))
        if count:
            print("%-5s %-28s %10d" % (rid, label, count))
    print("%-5s %-28s %10d" % ("", "Total", total))
    print("\nNot counted, needs reading: %s" % NOT_COUNTED)
    print("These are candidates. Some will be legitimate; keep those and say why.")

    if args.counts_only or total == 0:
        return 0

    print("\nCandidates")
    for rid, label in order:
        found = hits.get(rid, [])
        if not found:
            continue
        print("\n%s %s" % (rid, label))
        for f, n, t in found[:args.max]:
            print("  %s:%d  %s" % (f, n, t))
        if len(found) > args.max:
            print("  ... and %d more (raise --max to list them)" % (len(found) - args.max))
    return 0


if __name__ == "__main__":
    sys.exit(main())
