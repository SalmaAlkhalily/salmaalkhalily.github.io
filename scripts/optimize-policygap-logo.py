"""Create lossless responsive logo assets; keep the supplied PNG unchanged.

Run from any directory with Python and Pillow installed. Each decoded WebP is
checked against the RGB pixels produced by the Lanczos resize before finishing.
"""
from hashlib import sha256
from pathlib import Path

from PIL import Image


ASSETS = Path(__file__).resolve().parents[1] / "public" / "images" / "projects"
ORIGINAL = ASSETS / "policygap-logo.png"
original_hash = sha256(ORIGINAL.read_bytes()).hexdigest()

with Image.open(ORIGINAL) as source:
    source_rgb = source.convert("RGB")
    for width in (320, 640):
        height = round(source_rgb.height * width / source_rgb.width)
        resized = source_rgb.resize((width, height), Image.Resampling.LANCZOS)
        destination = ASSETS / f"policygap-logo-{width}.webp"
        resized.save(destination, format="WEBP", lossless=True, method=6, exact=True)
        with Image.open(destination) as decoded:
            if decoded.size != resized.size or decoded.convert("RGB").tobytes() != resized.tobytes():
                raise RuntimeError(f"Decoded pixels differ: {destination.name}")
        payload = destination.read_bytes()
        print(f"{destination.name}: {len(payload):,} bytes; SHA-256 {sha256(payload).hexdigest()}")

if sha256(ORIGINAL.read_bytes()).hexdigest() != original_hash:
    raise RuntimeError("The supplied PNG changed.")
print(f"Original PNG unchanged; SHA-256 {original_hash}")
