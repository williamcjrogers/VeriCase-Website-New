# Refined phone presentation

03 October 2026. The owner rejected the previous phone presentation, prohibited the previous technology label and requested something more sophisticated. This revision supersedes the previous phone acceptance as the current design direction.

## Design and implementation

The opening now reads **Complex evidence. Compelling arguments.** A single supporting paragraph and a contained green enquiry action lead directly to the genuine document workspace. Repeated audience, practitioner and enquiry explanations have been removed from the opening; the relevant information remains in the page, full enquiry section and prefilled email.

The existing green, brass, parchment and approved wordmark are retained. Mobile uses 24 pixel gutters (20 pixels on narrow phones), an upright Newsreader headline, restrained supporting type, shorter section headings and consistent section spacing. Brass is an accent; the opening no longer combines several competing text treatments. The task overview is a concise set of linked headings. Detail and collaboration controls reveal the longer explanations. Desktop retains the complete explanations and column composition.

The mobile document-reader crop now shows the source list and document together. The search crop shows document names alongside matching passages. Original image bytes and approved wider inspector crops are unchanged. Every screenshot remains labelled as illustrative. The image inspector starts fitted to the available screen; explicit zoom enlarges it on both phone and desktop and resets on reopening.

Team identities form a compact directory. The complete summaries, biographies, qualifications and experience remain in native disclosures. Printed profiles include each summary once. Product caveats, professional review, company information and confidentiality guidance remain present.

The prohibited wording has been removed from all public content and metadata, including profile terminology and historical illustration captions. Captions retain appropriate generated-content provenance. The change introduces no new product, security, performance or legal-outcome claim.

## Verification

- Production build, prerender and source/built copy checks passed with zero copy warnings. Eight sample hashes remain unchanged.
- 98 tests across 15 application suites passed; both copy tests passed, giving 100 passing tests in total.
- Independent code review found and resolved duplicate printed summaries and a desktop zoom sizing issue. No blocking findings remain.
- Independent visual review of the actual 390 pixel opening and full page found no blocking composition issue. The review confirmed that the change materially improves hierarchy and the team directory, rather than merely reducing overflow.
- Rendered widths of 320, 360, 390, 430, 768 and 1440 pixels have no page or heading overflow. Inline image previews have equal client and scroll widths.
- At 390 pixels the complete opening product preview is visible within an 844 pixel viewport, beginning at approximately 505 pixels. The page is 7,353 pixels high, compared with 9,819 pixels before this revision, approximately 25% shorter before opening optional detail.
- At 320 pixels with 200% root text size, the checked header, headings, main links, buttons and image toolbars have no horizontal overflow.
- Menu navigation, chronology expansion/collapse, complete profile opening, cookie rejection, image fit/zoom and focus restoration were checked in the browser. The fitted export inspector is approximately 346 pixels wide on a 390 pixel viewport and enlarges to 896 pixels on request; at desktop it enlarges from 1,236 to 1,854 pixels.
- Print emulation shows all five capability/collaboration explanations and one summary for each person. With JavaScript disabled, explanations remain visible and inactive toggle buttons remain hidden.
- The final first-visit phone composition was also inspected with cookie choices displayed.
- Superdesign version 4 is a byte-identical static export of this build. Its five native phone disclosures open and close; desktop shows their contents. Runtime-only controls remain disabled in the static review.

These are rendered browser viewport checks, not physical-device certification. The small inline captures communicate the product's structure; the inspector provides detailed reading.

## Evidence and release

Evidence is in `screenshots/refined-mobile-2026-10-03/`. The verified local build serves `main.f9095e2a.css` and `main.aa8a0cea.js`. Production deployment and live verification are recorded separately after release.
