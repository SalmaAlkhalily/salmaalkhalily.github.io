"""Crop the PolicyGap dashboard from the demo poster for the homepage browser mockup.

Run `python scripts/generate-policygap-mockup.py` with Pillow after the poster changes.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "images" / "projects"
CROP = (385, 80, 1520, 770)  # dashboard cards inside the 1920 x 870 poster

dashboard = Image.open(ASSETS / "policygap-demo-poster.webp").convert("RGB").crop(CROP)
for width in (480, 960):
    image = dashboard.resize((width, round(width * dashboard.height / dashboard.width)), Image.LANCZOS)
    path = ASSETS / f"policygap-dashboard-{width}.webp"
    image.save(path, "WEBP", quality=86, method=6)
    print(f"Wrote {path.relative_to(ROOT)} {image.size}")
