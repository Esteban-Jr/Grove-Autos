"""Make small, fast versions of the photos for the website.

    <python with Pillow> scripts/optimize_images.py

Reads the originals in images/gallery/ and writes images/opt/<name>-<width>.webp and .jpg
at a few widths (never bigger than the original). index.html uses them through <picture>,
so each browser downloads the smallest file that still looks sharp on its screen.
Run it again after adding or replacing a photo.
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images" / "gallery"
OUT = ROOT / "images" / "opt"
WIDTHS = [480, 960, 1600]          # phone, tablet / half-width, full-width desktop

OUT.mkdir(parents=True, exist_ok=True)
total_before = total_after = 0
for path in sorted(SRC.glob("*.jpg")):
    total_before += path.stat().st_size
    img = ImageOps.exif_transpose(Image.open(path)).convert("RGB")   # respect phone rotation, drop metadata
    sizes = [w for w in WIDTHS if w < img.width] + [min(img.width, WIDTHS[-1])]
    for w in sorted(set(sizes)):
        h = round(img.height * w / img.width)
        small = img.resize((w, h), Image.LANCZOS)
        small.save(OUT / f"{path.stem}-{w}.webp", "WEBP", quality=72, method=6)
        small.save(OUT / f"{path.stem}-{w}.jpg", "JPEG", quality=76, optimize=True, progressive=True)
    largest = OUT / f"{path.stem}-{sorted(set(sizes))[-1]}.webp"
    total_after += largest.stat().st_size
    print(f"{path.name:14} {img.width}x{img.height}  {path.stat().st_size/1024:5.0f} KB -> "
          + ", ".join(f"{w}: {(OUT / f'{path.stem}-{w}.webp').stat().st_size/1024:.0f} KB" for w in sorted(set(sizes))))
print(f"\nLargest WebP sizes total {total_after/1024:.0f} KB (originals {total_before/1024:.0f} KB)")
