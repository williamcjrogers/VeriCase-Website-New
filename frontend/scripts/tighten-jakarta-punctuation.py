"""Tighten the left side of Plus Jakarta Sans's comma, full stop, colon, semicolon and exclamation mark.

At display sizes, with the headings' negative tracking, the font's punctuation keeps its text-size
sidebearing (80 to 103 units) and reads as detached: "Records ," (owner, 09 October 2026). This moves
each outline left by SHIFT units and shortens its advance by the same amount, so the mark sits on
the word before it and the space after it is unchanged. The ellipsis, built from three full stops,
is moved back so it does not change. The font is under the OFL, which declares no reserved name.

Run once from frontend/ (needs fontTools and brotli): python3 scripts/tighten-jakarta-punctuation.py
It does nothing if the file has already been tightened.
"""
from fontTools.ttLib import TTFont

PATH = 'public/fonts/plus-jakarta-sans-wght.woff2'
SHIFT = 45
GLYPHS = ['comma', 'period', 'colon', 'semicolon', 'exclam']

font = TTFont(PATH)
glyf, hmtx = font['glyf'], font['hmtx']
if hmtx['comma'][1] < 60:
    print('already tightened')
    raise SystemExit(0)
for name in GLYPHS:
    glyph = glyf[name]
    glyph.coordinates.translate((-SHIFT, 0))
    glyph.recalcBounds(glyf)
    advance, lsb = hmtx[name]
    hmtx[name] = (advance - SHIFT, lsb - SHIFT)
for component in glyf['ellipsis'].components:
    if component.glyphName == 'period':
        component.x += SHIFT
font.flavor = 'woff2'
font.save(PATH)
print('tightened', ', '.join(GLYPHS))
