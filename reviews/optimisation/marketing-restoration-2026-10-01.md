# Fuller marketing page, simpler evidence graphics

01 October 2026. Baseline: `cfffa0fd1fb070b538694b041519c2934625afdf` on `main`.

## Approved scope and implementation

The owner approved the existing forest-green and brass identity, current navigation and page structure, fuller existing copy, and two static document illustrations. The supplied opening and time section are preserved verbatim, with the approved colon in the time heading. `app.veri-case.com` is a copy reference only; its branding has not been adopted.

The homepage now presents the opening, time section, three capability groups containing all six existing descriptions, an argument with supporting sources, shared-workspace and audience information, all four full biographies, the fuller FAQ and closing enquiry panel. Credentials and reported matters remain expandable. Malcolm Brechin is Managing Director and Sam Whisker is Chief Technology Officer; neither is described as a founder.

The interactive walkthrough and its provider are unmounted from the public page. Their underlying components remain in the repository. The new static illustrations use EV-0131, EV-0138 and EV-0147 from the existing fictional matter, with matching dates and excerpts. Existing section addresses resolve to explanatory content. No routes, services or public APIs were added. Programme references and File Login remain absent from the rendered page.

The current design contract now records the exact approved passages, retained palette and typography, simpler graphics, fuller composition and current roles. Copy-review guidance recognises the narrow owner-approved wording exception rather than silently rewriting those passages.

## Verification

- Production build and prerender succeeded. Source and built copy checks passed with zero warnings.
- All 74 tests across 11 suites passed, including consent, analytics, navigation and the retained animation controls. The additional copy-check regression test passed.
- The rendered headline, opening paragraph, time heading and three time paragraphs matched the supplied wording exactly.
- Browser geometry: document widths of 320, 390, 768 and 1440 pixels matched their respective viewports. No overflowing main-content elements were found. Screenshots cover all four widths.
- The 320-pixel review identified broken document-label wrapping. The final small-screen version gives each source document a single readable row. Figure text is at least 15 pixels at every tested width.
- All six capability descriptions and all four biographies are rendered outside disclosures. Credentials and reported matters expand with Enter, with a visible 3-pixel focus outline. The fuller FAQ answers also expand with Enter.
- The mobile menu closes and moves focus to the chosen section. Legacy addresses for clock, chronology-lens, case-room, research, claims, integrity and notes remain operable, including under reduced motion.
- Both figures contain no controls, CSS animations or SVG animations. The public composition contains no walkthrough. Existing interactive components and their accessibility fixes remain available in source.
- Sampled contrast ratios: source references 8.85:1, figure captions 6.59:1, time-section copy 14.33:1 and header enquiry action 6.23:1.
- All demonstration links retain the email destination and prefilled enquiry content. The address-copy button displayed its success confirmation and the visible email fallback remains available. Automated clipboard read-back did not return the address, so delivery to the operating-system clipboard is not independently confirmed by this check.
- A fresh local origin displayed the consent banner and made no analytics requests before a choice. Rejecting analytics closed the banner. Consent and analytics regression tests also passed; their behaviour was not changed.

Detailed measurements: `marketing-browser-2026-10-01.json`. Screenshots: `screenshots/marketing-*`.

## Delivery boundary

These checks establish the local production build and browser behaviour. Public deployment identity, HTTP responses and final public-browser evidence are recorded separately after the authorised commit and push. No real-user performance score or enquiry-conversion result is claimed.
