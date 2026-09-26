# The plates: "Measured Record"

The plates are drawings made in code, not photographs. Each one is drawn from the fictional sample
matter, in the visual language that the site's readers already trust: the construction drawing
and the court bundle. This note is the design philosophy and the drawing standard that every plate
follows. The components live in `frontend/src/components/plates/`.

## Philosophy

**Measured Record** holds that a thing becomes evidence when it has been measured, dated and
referenced, and that a drawing can carry that authority without a word of argument. The plates
borrow the draughtsman's discipline: a sheet, a grid, a title block, dimension strings that close,
a revision cloud around the one thing that changed. Nothing is decorative. Every line is there
because a careful person would have had to draw it, and each plate should read as the product of
painstaking, master-level draughtsmanship: weights that step with purpose, text that never
collides, hatching laid at exactly the angle and pitch the material demands.

Space is the drawing's silence. Linework occupies a disciplined field inside generous margins, the
way a detail sits on an A1 sheet with room to breathe. Composition follows the drawing office, not
the magazine: views are placed on a grid, aligned to one another, annotated to one side, and closed
off by the title block. Balance comes from the weight of the linework against the emptiness of the
sheet, never from ornament.

Colour is a register, not a mood. Navy ink carries every line that describes the object. Graphite
carries what describes the drawing: grids, leaders, notes. Brass marks measurement and revision,
the two acts by which a record is made to hold. Azure appears once in each plate, on the single
element that is in issue, so the eye finds it before the mind does. Paper stays paper. There are no
gradients, glows, shadows or tints beyond these, and the restraint is itself the mark of expertise.

Scale and rhythm come from repetition done exactly: a hundred hatch lines at one pitch, a thousand
message marks on one baseline, twelve tabs at one interval. Density is earned by patience, the
visual equivalent of a record kept every day for two years, and it rewards the reader who looks
closely: a revision letter that matches the chronology, a date on the programme that matches an
exhibit, a box number that is missing from the shelf. Only those who know the subject will catch
every reference; everyone else should simply see a drawing laboured over with care.

Text is sparse, clinical and exact: labels, references and dimensions, never sentences of
argument. It is set in the site's own faces, so the plates belong to the page, and it is sized so
that it stays legible at the width at which each plate is shown. A plate must look, to a
construction professional, like the work of someone at the very top of the field, meticulously
checked, with nothing overlapping and nothing falling off the sheet.

## Drawing standard

**Construction.** Each plate is a React component that returns an inline `<svg>` with a fixed
`viewBox`, `role="img"` and an `aria-label` (the alt text), inside the `Plate` frame's
aspect-ratio box. Plates load lazily, as their own chunks, behind a paper skeleton of the same
size. A plate shown on phones has its own portrait composition, with its own `viewBox`, rather than
a scaled-down desktop sheet. Generative plates use a seeded generator (`rng(seed)` in
`drawing.jsx`), so every render is identical.

**Colour.** Only the site tokens, through the CSS classes in `plates.css`:

| Role | Token | Class |
|---|---|---|
| Object lines (cut and profile) | navy #1A2550 | `dw-cut`, `dw-line` |
| Secondary lines, grids, leaders | graphite #535A6E | `dw-thin`, `dw-grid`, `dw-leader` |
| Hatching and construction lines | rule-strong #857A62 at reduced opacity | `dw-hatch` |
| Dimensions and revisions | brass-700 #7A5A28 | `dw-dim`, `dw-rev` |
| The element in issue (once per plate) | azure-500 #2D78B7 | `dw-issue` |
| Sheet | paper #FCFAF5 | `dw-sheet` |

On ink (the demonstration panel), `.on-ink` swaps navy for parchment, graphite for mist and
brass-700 for brass-400. Signal red is never used in a plate.

**Line weights.** Strokes do not scale (`vector-effect: non-scaling-stroke`), so a plate is equally
crisp at every width: cut 1.5 px, profile 1 px, secondary 0.75 px, hatching and construction
0.5 px.

**Type.** IBM Plex Mono 400 for annotations, dimensions and references; Newsreader italic for the
drawing title in the title block. Sentence case throughout, except the title block's field labels,
which follow drawing-office convention in small capitals. The smallest annotation must render at
10 px or more at the narrowest width at which the plate is shown.

**Conventions.**
- Dimension lines with 45 degree oblique ticks, extension lines that stop 2 units short of the
  object and run 3 units past the dimension line, and the value above the line, centred.
- Grid lines as chain lines (long dash, dot), with lettered or numbered bubbles.
- Level datums as a filled triangle on a short rule, with the level to three decimal places.
- A revision cloud of outward arcs around the change, with a revision triangle carrying its letter.
- Leaders with a 1.5 unit dot at the object end; notes left-aligned to the leader's end.
- Hatching by material: concrete (stipple and small aggregate), insulation (batt curve), steel
  (45 degree lines at close pitch), ground (short strokes). Hatch patterns are defined once in
  `<defs>` and reused.

**Content.** Every name, number, date and reference comes from the sample matter or is plainly
fictional. Dates are written in full (03 March 2025). No real project, party, person or place is
named or depicted. Captions state that each plate is an illustrative drawing of the fictional
sample matter, and note B says how the plates were made.

**Motion.** At most one drawn moment per plate, and only where it depicts the procedure (for
example, a revision cloud drawn once when the plate enters view). Under reduced motion every plate
renders in its final state.
