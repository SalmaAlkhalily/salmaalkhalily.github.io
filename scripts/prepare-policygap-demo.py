"""Prepare the supplied 60-second PolicyGap recording for the project page.

Usage: python scripts/prepare-policygap-demo.py <path-to-original-mp4>
Requires ffmpeg and ffprobe on PATH. The original recording stays outside the
repository. Its top 150 pixels contain Chrome's tabs, address and bookmarks.
The application viewport retains its native width so interface text stays clear.
"""

import argparse
from hashlib import sha256
import json
from pathlib import Path
import shutil
import subprocess


def probe(executable: str, path: Path) -> dict:
    result = subprocess.run(
        [executable, "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)],
        check=True, capture_output=True, text=True,
    )
    return json.loads(result.stdout)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="External original recording (1920 × 1020).")
    args = parser.parse_args()
    source = args.source.resolve(strict=True)
    ffmpeg = shutil.which("ffmpeg")
    ffprobe = shutil.which("ffprobe")
    if not ffmpeg or not ffprobe:
        parser.error("Install ffmpeg and ffprobe and add them to PATH.")

    metadata = probe(ffprobe, source)
    video = next(stream for stream in metadata["streams"] if stream["codec_type"] == "video")
    if (video["width"], video["height"]) != (1920, 1020):
        parser.error("This crop is verified only for the supplied 1920 × 1020 recording.")
    if abs(float(metadata["format"]["duration"]) - 60) > 0.1:
        parser.error("Expected the supplied 60-second recording.")
    if any(stream["codec_type"] == "audio" for stream in metadata["streams"]):
        parser.error("Expected the supplied silent recording; do not discard an audio track.")

    original_hash = sha256(source.read_bytes()).hexdigest()
    root = Path(__file__).resolve().parents[1]
    destination = root / "public" / "videos" / "policygap-demo.mp4"
    poster = root / "public" / "images" / "projects" / "policygap-demo-poster.webp"
    destination.parent.mkdir(parents=True, exist_ok=True)
    poster.parent.mkdir(parents=True, exist_ok=True)
    crop = "crop=1920:870:0:150,setsar=1"

    subprocess.run(
        [ffmpeg, "-hide_banner", "-loglevel", "warning", "-y", "-i", str(source),
         "-map", "0:v:0", "-vf", crop, "-c:v", "libx264", "-preset", "slow",
         "-crf", "22", "-pix_fmt", "yuv420p", "-g", "60", "-an",
         "-map_metadata", "-1", "-movflags", "+faststart", str(destination)],
        check=True,
    )
    subprocess.run(
        [ffmpeg, "-hide_banner", "-loglevel", "warning", "-y", "-ss", "48",
         "-i", str(source), "-vf", crop, "-frames:v", "1", "-c:v", "libwebp",
         "-quality", "90", "-compression_level", "6", "-map_metadata", "-1", str(poster)],
        check=True,
    )

    prepared = probe(ffprobe, destination)
    prepared_video = prepared["streams"][0]
    if ((prepared_video["width"], prepared_video["height"]) != (1920, 870)
            or prepared_video["codec_name"] != "h264"
            or prepared_video["pix_fmt"] != "yuv420p"
            or abs(float(prepared["format"]["duration"]) - 60) > 0.1
            or len(prepared["streams"]) != 1):
        raise RuntimeError("Prepared video does not match the expected web format.")
    if sha256(source.read_bytes()).hexdigest() != original_hash:
        raise RuntimeError("The source recording changed.")
    for asset in (destination, poster):
        print(f"{asset.relative_to(root)}: {asset.stat().st_size:,} bytes")
    print("Verified: 60 seconds; 1920 × 870; H.264/yuv420p; silent; source unchanged.")
    print(f"Original SHA-256: {original_hash}")


if __name__ == "__main__":
    main()
