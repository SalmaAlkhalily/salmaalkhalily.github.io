"""Draw public/images/social-card.png, the 1200 x 630 preview shown when the portfolio is shared.

Run `python scripts/generate-social-card.py` with Pillow and an internet connection: it
downloads the site's Erode heading font from Fontshare, whose license does not allow
committing the font files.
"""
from pathlib import Path
import io
import math
import re
import urllib.request

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "images" / "social-card.png"
FONT_CSS = "https://api.fontshare.com/v2/css?f[]=erode@600,501,601&display=swap"
W, H = 1200, 630
BG, INK, PLUM, SAGE = (251, 249, 252), (34, 26, 44), (91, 59, 122), (63, 107, 90)


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()


css = fetch(FONT_CSS).decode("utf-8")
erode = {}
for block in css.split("@font-face")[1:]:
    weight = re.search(r"font-weight:\s*(\d+)", block).group(1)
    style = re.search(r"font-style:\s*(\w+)", block).group(1)
    erode[(weight, style)] = fetch("https:" + re.search(r"url\('([^']+\.woff2)'\)", block).group(1))


def font(size, style="normal", weight="600"):
    return ImageFont.truetype(io.BytesIO(erode[(weight, style)]), size)


card = Image.new("RGB", (W, H), BG)

# Wave lines from the homepage hero, drawn on a transparent layer.
waves = Image.new("RGBA", (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(waves)
for i in range(8):
    p = i / 7
    base, amplitude = H * (0.62 + p * 0.3), 16 + p * 28
    frequency = (1.1 + p * 0.5) * math.pi * 2 / W
    points = [(x, base + math.sin(x * frequency + i * 0.75) * amplitude
               + math.sin(x * frequency * 0.45 - i * 0.45) * amplitude * 0.5) for x in range(0, W + 8, 8)]
    draw.line(points, fill=(*PLUM, round(255 * (0.08 + (1 - p) * 0.16))), width=2)
card.paste(waves, mask=waves)

draw = ImageDraw.Draw(card)
draw.rectangle((0, 0, W, 10), fill=PLUM)
small = font(30)
draw.text((80, 92), "M2 Data, Knowledge & Hybrid AI · Université Paris-Saclay", font=small, fill=SAGE)
draw.text((76, 150), "Salma Alkhalily", font=font(104), fill=INK)
draw.text((80, 290), "AI & Data Science Engineer", font=font(50, "italic", "500"), fill=PLUM)
draw.text((80, 370), "Machine learning · NLP · RAG · Knowledge graphs", font=small, fill=INK)

# Monogram, as in the homepage profile panel.
cx, cy, r = 1045, 300, 88
draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=PLUM)
draw.text((cx, cy), "SA", font=font(86, "italic"), fill=(255, 255, 255), anchor="mm")

draw.text((80, H - 92), "salmaalkhalily.github.io", font=small, fill=SAGE)
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
card.save(OUTPUT, optimize=True)
print(f"Wrote {OUTPUT.relative_to(ROOT)} ({OUTPUT.stat().st_size // 1024} KB)")
