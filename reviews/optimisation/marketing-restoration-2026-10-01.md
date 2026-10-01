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

Application commit `fbed2ae9123205cdc0a4df8956ff2c4d84226410` was pushed to `main`. Vercel production deployment `dpl_eXY7H5ejU2yQM8mmGq57ZvUzhxPZ` reached READY with that exact commit and the apex/www aliases, without an alias error.

Public verification at `https://veri-case.com/` confirmed the exact approved passages, both static figures, all six capability descriptions, all four visible biographies and the intended typefaces. Browser document widths matched 320, 390, 768 and 1440 pixels. No console warnings or errors were reported in the sampled public session.

The apex returns HTTP 200; www returns HTTP 308 to the canonical apex. Robots, sitemap and sharing image return HTTP 200 with text/plain, application/xml and image/png content types respectively. The cookie page retains its own title and canonical address. An unknown route returns HTTP 404 with noindex.

Public evidence is in `marketing-public-http-2026-10-01.json`, `marketing-public-browser-2026-10-01.json` and `screenshots/marketing-public-1440.png`. A subsequent evidence-only commit records these results without changing the application. No real-user performance score or enquiry-conversion result is claimed.
