# Make VeriCase's founding reason a prominent, permanent section

Approved by the owner on 10 October 2026. Implementation and verification are local; no commit, push or deployment is part of this revision.

## Purpose and copy

Make the Abrahamson passage part of the homepage's argument, visible to every reader. Order: opening, motto, founding reason, Time is your ally, statistics, THE VERICASE SOLUTION. The section is unnumbered; six Roman numerals remain reserved for the solution chapters.

- Label: THE REASON WE BUILT VERICASE
- H2: Your case begins with the record.
- Attribution: As Max W. Abrahamson observed in *Engineering Law and the I.C.E. Contracts* (first published in 1965):
- Quote: retain both current sentences, word for word, including existing emphasis and [Emphasis added].
- Closing: VeriCase exists so these lessons need not be learned the hard way.

Do not add the longer supplied feature narrative, named-client results or broader performance claims. Keep the attribution precise: 1965 describes first publication of the book, not verified first appearance of this particular passage.

## Composition and styling

Use the existing Lessons component as a full-width paper section (#FCFAF5), navy lettering and gold detailing. At 1024px and above use the existing 5:7 layout: label and heading on the left; attribution, full quote and closing statement on the right. Below 1024px use natural reading order in one column.

Heading: Newsreader 500, existing responsive 32-52px scale. Quote: italic Newsreader, existing 22-28px scale, retained emphasis. Closing: Newsreader 500, responsive 24-32px, applied directly to its one paragraph. Replace the grey vertical rule with 2px gold. One paired ornament per boundary; Lessons owns its upper boundary and Time owns the lower. Space the motto footer clear of the new rule. No box, concealment or entry animation. Use existing 24px gutters at 360px and above, 20px below.

## Implementation

1. Move Lessons out of HeroMotto into LandingPage, directly before TimeAdvantage. Remove details and summary, retain #lessons, #lessons-title, labelled H2 and tabIndex=-1. Keep the motto attribution link and generic focus navigation.
2. Preserve G11_attribution for both passage and motto attribution. Keep original quote data unchanged apart from heading/label/closing fields. Preserve all surrounding approved content and illustrations.
3. Remove obsolete disclosure styling and Lessons-specific print selectors. Keep the remaining ten disclosures' print and restoration behaviour.
4. Update the current design contract to supersede the hidden-passage instruction. Preserve unrelated work and existing evidence.

## Acceptance

- Default-visible passage in SSR and hydrated output, no details ancestor, unique IDs, correct sequence and heading hierarchy.
- Exact quote and attribution preserved; gate-struck regression hides passage and motto attribution link.
- Motto link and direct /#lessons focus its H2 below the sticky header.
- All ten remaining print disclosures expand and restore; passage is always visible.
- Inspect 1359, 1024, 768, 390 and 320px, enlarged-text reflow, no JavaScript, reduced motion and print. Measure bounds and inspect rule spacing and readable lines.
- Run relevant tests, complete Jest suite, copy checks and production build. Independently review code, copy and final rendered composition.
- Additional height is intentional; no earlier shortening target justifies hiding this passage.
