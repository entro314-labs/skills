#!/usr/bin/env python3
"""Capture a screenshot of a page, for the before-and-after check.

Usage:
    screenshot.py <url-or-html-file> <out.png> [--width 1280] [--height 800]
                  [--full-page] [--dark] [--wait 300]

Needs Playwright with Chromium (pip install playwright; playwright install chromium).
If it is missing, the script says so and exits with status 2. In that case use
any other browser or screenshot tool you have, or report that the screen could
not be rendered.
"""

import argparse
import sys
from pathlib import Path


def main():
    ap = argparse.ArgumentParser(description="Screenshot a URL or a local HTML file.")
    ap.add_argument("target", help="http(s) URL or path to an .html file")
    ap.add_argument("out", help="output .png path")
    ap.add_argument("--width", type=int, default=1280)
    ap.add_argument("--height", type=int, default=800)
    ap.add_argument("--full-page", action="store_true", help="capture the whole scroll height")
    ap.add_argument("--dark", action="store_true", help="emulate prefers-color-scheme: dark")
    ap.add_argument("--wait", type=int, default=300, help="extra milliseconds to wait after load")
    args = ap.parse_args()

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("screenshot: Playwright is not installed. Use another screenshot tool, "
              "or report that the screen could not be rendered.", file=sys.stderr)
        return 2

    target = args.target
    if not target.startswith(("http://", "https://", "file://")):
        path = Path(target).resolve()
        if not path.is_file():
            print("screenshot: file not found: %s" % target, file=sys.stderr)
            return 1
        target = path.as_uri()

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)

    try:
        with sync_playwright() as p:
            try:
                browser = p.chromium.launch()
            except Exception:
                # Fall back to a system Chrome if the bundled Chromium is absent.
                browser = p.chromium.launch(channel="chrome")
            page = browser.new_page(
                viewport={"width": args.width, "height": args.height},
                color_scheme="dark" if args.dark else "light",
            )
            page.goto(target, wait_until="load")
            page.wait_for_timeout(args.wait)
            page.screenshot(path=str(out), full_page=args.full_page)
            browser.close()
    except Exception as exc:  # launch or navigation failure
        print("screenshot: could not capture %s (%s)" % (args.target, exc), file=sys.stderr)
        return 1

    print("saved %s" % out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
