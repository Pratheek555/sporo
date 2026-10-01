"""Build the display font with fewer subpixel distress contours.

Run with Python and fonttools[woff] installed. The source font is preserved.
"""

from array import array
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._g_l_y_f import GlyphCoordinates

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/fonts/AkzidenzFreena-BoldCondense.woff2"
OUTPUT = ROOT / "public/fonts/AkzidenzFreena-BoldCondense-web.woff2"
MIN_AREA = 32


def contour_area(points):
    return abs(sum(
        x * points[(i + 1) % len(points)][1]
        - points[(i + 1) % len(points)][0] * y
        for i, (x, y) in enumerate(points)
    )) / 2


def main():
    font = TTFont(SOURCE)
    glyphs = font["glyf"]
    before = after = 0
    for name in font.getGlyphOrder():
        glyph = glyphs[name]
        glyph.removeHinting()
        if glyph.isComposite() or not glyph.numberOfContours:
            continue
        coordinates, ends, flags = glyph.getCoordinates(glyphs)
        before += len(coordinates)
        kept_coordinates = GlyphCoordinates()
        kept_flags = array("B")
        kept_ends = []
        start = 0
        for end in ends:
            points = coordinates[start:end + 1]
            if contour_area(points) >= MIN_AREA:
                kept_coordinates.extend(points)
                kept_flags.extend(flags[start:end + 1])
                kept_ends.append(len(kept_coordinates) - 1)
            start = end + 1
        glyph.coordinates = kept_coordinates
        glyph.flags = kept_flags
        glyph.endPtsOfContours = kept_ends
        glyph.numberOfContours = len(kept_ends)
        after += len(kept_coordinates)
    for table in ("fpgm", "prep", "cvt "):
        if table in font:
            del font[table]
    font.save(OUTPUT)
    print(f"Outline points: {before:,} -> {after:,}")
    print(f"Font bytes: {SOURCE.stat().st_size:,} -> {OUTPUT.stat().st_size:,}")


if __name__ == "__main__":
    main()
