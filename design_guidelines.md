# VeriCase website: design guidelines ("The Working Record")

**Current authority:** `docs/design/current-contract.md` (01 October 2026) supersedes earlier palette and behaviour prescriptions.

These guidelines summarise the design system of the marketing site. The full specification, with
the reasoning behind each decision, is `docs/design/the-working-record.md`. Copy lives in
`frontend/src/content/`, which is canonical.

## 1. The idea

The page is a working record, and the visitor works it. It reads like a well set legal document:
a cover, six chapters and end matter, with numbered figures, exhibit references and notes. Every
claim about the product, the law or the industry is either demonstrated on a fictional sample
matter or carries a note with its source. Restraint is part of the craft.

## 2. Colour

Re-based on the logo. Tokens are defined once in `frontend/src/index.css` (as `--vc-*`) and in
`frontend/tailwind.config.js`.

| Token | Hex | Use |
|---|---|---|
| `ink-950` | #041A0F | The case room, the footer, dark panels |
| `navy` | #052314 | Headings, the demonstration panel |
| `ink` | #0B2516 | Body text |
| `graphite` | #535A6E | Secondary text on light grounds |
| `mist` | #B9BFD0 | Secondary text on ink or navy (never over imagery) |
| `azure-500` | #8C6A36 | Bronze accent: app-family header strips, focus rings, the Lens band |
| `azure-700` | #5C431B | Links, product citations, the primary button |
| `azure-300` | #C4A05A | Links and focus on ink; the reversed logo |
| `azure-50` | #E7EFF8 | Highlights and selected rows |
| `parchment` | #F5F0E6 | The page |
| `parchment-300` | #ECE4D3 | Bands and beige chips |
| `paper` | #FCFAF5 | Panels, mocks and documents |
| `rule` | #D8CDB6 | Decorative hairlines only |
| `rule-strong` | #857A62 | Informative borders (inputs, chips, controls) |
| `brass-400` | #BF9B58 | Stamps, declaration borders; text only on dark grounds |
| `brass-700` | #7A5A28 | Eyebrows, note markers and chapter numerals on light grounds |
| `signal` | #A8352A | Warnings on light grounds |
| `signal-300` | #EE8E7E | Warnings on dark green grounds, including Time bar |

Rules: every ink or navy ground carries `.on-ink`, and every paper panel inside one carries
`.on-paper`. Brass stays under about 5% of a viewport. Signal red always comes with a word and an
icon, and never marks emphasis or a call to action. No gradients: the only overlay is a flat navy
scrim over imagery.

## 3. Type

- Newsreader (optical sizes, a true italic) for display: the masthead, headings, numerals,
  declarations and report text.
- IBM Plex Sans for text and controls.
- IBM Plex Mono for evidence metadata: dates, exhibit references, message IDs, hashes, labels.
- Self-hosted Latin subsets in `frontend/public/fonts/`, with metric-matched fallbacks so the
  swap does not shift the layout. Weights 400, 500 and 600 only; `font-synthesis: none`.
- Sizes are named in Tailwind (`text-masthead`, `numeral`, `display`, `h2`, `h3`, `stat`, `lead`,
  `body`, `small`, `caption`, `meta`, `label`).
- Capitals (eyebrows, stamps, mono labels) are set by CSS from sentence-case text.

## 4. Motifs

Each motif does one job.

1. Section openers, set like a statute: a side note in the margin (the chapter's large italic
   numeral over its own title, in italic), a double hairline that draws once, and a heading of
   several sentences set one sentence per line. Below 1024 px the side note sits on one line
   above the heading. There are no capitalised mono eyebrows above headings.
2. "Where the record fails" (dashed graphite rule) and "Where VeriCase comes in" (solid azure).
3. Figures in fixed-ratio paper frames. Each figure's number appears once, at the start of its
   own caption directly beneath it: "Fig. n. … See note A.", with the note linked.
4. App-family mocks: an azure header strip with white text, a paper body, beige chips.
5. Exhibit stamps: EV references in a brass-edged mono tab.
6. The verification tick, the logo's swoosh, used only where something has been checked.
7. Two superscripts: brass site notes (a popover with the note) and azure product citations
   (the source sheet).
8. The Lens band: two azure edges and brass bezel ticks.
9. The hard cut from parchment to ink, labelled "Case time", used once.
10. Declaration boxes: a brass border, a mono label and Newsreader text.
11. Ledger rules instead of cards; one paper shadow, on mocks only.

Never: gradients, blobs, glowing AI imagery, padlocks, shields, gavels, scales, handshakes, emoji,
icon tiles or icon grids, count-ups, typewriter effects, hover lift or hover scaling.

## 5. Layout

- A 12-column grid with 24 px gutters inside a 1280 px container (16, 24 and 40 px side padding).
- Desktop: columns 1 to 2 are the margin, text runs in columns 3 to 8, figures take 7 to 12 or,
  when wide, 3 to 12. Section padding is 128, 96 and 64 px by breakpoint.
- Radii: 0 for documents and figures, 2 px for buttons, inputs and chips, 4 px for mock windows.
- Every image, video and figure sits in an aspect-ratio box or a fixed min-height, so nothing
  shifts. There is no horizontal page scroll at any width down to 320 px.

## 6. Motion

Motion is procedure: each animation depicts an operation of the product and ends in a still
state. Only transform and opacity animate (the exceptions are the Lens clip-path, small stroke
draws and Radix disclosure heights), over 150 to 400 ms with `ease-settle`. Nothing loops except
the case-room film, which has a pause control. Under `prefers-reduced-motion: reduce` every final
state renders from first paint and every demonstration stays operable. Content that reveals on
scroll is hidden only once the app bundle has run, so it is never lost if scripts fail.

## 7. Icons and imagery

- lucide-react at a 1.5 px stroke, plus twelve domain glyphs in
  `frontend/src/components/icons/` (24 px grid, 1.5 px strokes, round caps, no fills), used only
  in ruled lists.
- The plates are drawings made in code, in the language of the construction drawing and the court
  bundle, drawn from the sample matter (docs/design/plates.md: the "Measured Record" standard).
  Each is captioned as an illustrative drawing of the fictional sample matter.
- A photograph replaces a plate only once approved (gate G10). Photographs are restrained
  documentary images of UK construction and archive settings: overcast light, about 30% less
  saturation, shadows towards navy, highlights towards parchment. No people, hands, legible text,
  logos or hi-vis. Each is captioned as illustrative and AI-generated.

## 8. Accessibility

WCAG 2.2 AA throughout: the contrast pairs above, visible focus on every ground, 24 px minimum
targets (44 px for primary touch controls), accessible names that contain the visible label,
live regions that speak once per change, captions on tables, figure summaries in the markup, and
keyboard operation of every demonstration.

## 9. Copy

British English; dates as DD Month YYYY, never broken across lines (`formatDate` and
`keepDates` join them with no-break spaces); no em or en dashes; no unsubstantiated or banned
claims; no real matter, party or place names. Running text avoids a lone last word, headings
balance their lines, and a citation chip keeps the punctuation that follows it. `frontend/scripts/lint-copy.mjs` enforces these rules on
the sources and on the prerendered HTML, and a production build fails while any owner gate in
`frontend/src/content/gates.js` is open.
