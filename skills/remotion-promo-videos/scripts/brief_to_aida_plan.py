#!/usr/bin/env python3
"""Turn a product brief into an AIDA plan for templates/aida-product-video.

The output is `{"plan": {...}}` so it can be passed straight to Remotion:

    python3 scripts/brief_to_aida_plan.py --in brief.json --out plan.json --duration-sec 45
    npx remotion render ProductAida out/video.mp4 --props=plan.json

Brief fields (all strings except use_cases, a list of 1 to 4 concrete scenarios):
    product_name, audience, problem, solution, use_cases, cta, incentive

Time allocation: attention 20%, interest 25%, desire 35% (split evenly across use cases),
action 20%. Headlines are the brief text verbatim; edit plan.json to tighten them.
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
from typing import Any

REQUIRED_FIELDS = (
    "product_name",
    "audience",
    "problem",
    "solution",
    "use_cases",
    "cta",
    "incentive",
)


def load_brief(path: Path) -> dict[str, Any]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("Brief must be a JSON object.")
    missing = [field for field in REQUIRED_FIELDS if field not in data]
    if missing:
        raise ValueError(f"Missing brief fields: {', '.join(missing)}")
    use_cases = data["use_cases"]
    if not isinstance(use_cases, list) or not 1 <= len(use_cases) <= 4:
        raise ValueError("`use_cases` must be a list of 1 to 4 scenarios.")
    if not all(isinstance(item, str) and item.strip() for item in use_cases):
        raise ValueError("Every use case must be a non-empty string.")
    return data


def build_plan(brief: dict[str, Any], duration_sec: int, fps: int) -> dict[str, Any]:
    total = duration_sec * fps
    attention = math.floor(total * 0.20)
    interest = math.floor(total * 0.25)
    desire = math.floor(total * 0.35)
    action = total - attention - interest - desire

    use_cases: list[str] = brief["use_cases"]
    per_case = desire // len(use_cases)
    case_frames = [per_case] * len(use_cases)
    case_frames[-1] += desire - per_case * len(use_cases)

    scenes: list[dict[str, Any]] = [
        {
            "id": "attention-problem",
            "stage": "attention",
            "durationInFrames": attention,
            "headline": brief["problem"],
            "voiceover": f"{brief['audience']} deal with this every day: {brief['problem']}",
        },
        {
            "id": "interest-solution",
            "stage": "interest",
            "durationInFrames": interest,
            "headline": f"Meet {brief['product_name']}",
            "subheadline": brief["solution"],
            "voiceover": f"Meet {brief['product_name']}: {brief['solution']}",
        },
    ]
    for index, (use_case, frames) in enumerate(zip(use_cases, case_frames), start=1):
        scenes.append(
            {
                "id": f"desire-use-case-{index}",
                "stage": "desire",
                "durationInFrames": frames,
                "headline": use_case,
                "voiceover": use_case,
            }
        )
    scenes.append(
        {
            "id": "action-cta",
            "stage": "action",
            "durationInFrames": action,
            "headline": brief["cta"],
            "subheadline": brief["incentive"],
            "voiceover": f"{brief['cta']}. {brief['incentive']}.",
        }
    )

    return {
        "plan": {
            "productName": brief["product_name"],
            "cta": brief["cta"],
            "incentive": brief["incentive"],
            "scenes": scenes,
        }
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--in", dest="input_path", required=True, type=Path)
    parser.add_argument("--out", dest="output_path", required=True, type=Path)
    parser.add_argument("--duration-sec", type=int, default=45)
    parser.add_argument("--fps", type=int, default=30)
    args = parser.parse_args()

    if not 15 <= args.duration_sec <= 180:
        parser.error("--duration-sec must be between 15 and 180")
    if not 1 <= args.fps <= 120:
        parser.error("--fps must be between 1 and 120")

    plan = build_plan(load_brief(args.input_path), args.duration_sec, args.fps)
    args.output_path.parent.mkdir(parents=True, exist_ok=True)
    args.output_path.write_text(json.dumps(plan, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
