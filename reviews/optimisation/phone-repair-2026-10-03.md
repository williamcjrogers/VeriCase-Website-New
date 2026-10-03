# Phone layout repair

03 October 2026. The owner rejected the phone presentation after the commercial copy revision. The earlier overflow-only acceptance did not establish a satisfactory phone composition.

## Changes

- A phone-specific type scale, balanced display headings, tighter section rhythm and stable outer gutters replace the stacked desktop sizing.
- The genuine wordmark has useful prominence. The phone header contains the wordmark and menu; the full-width primary action appears in the opening, with sign-in and demonstration access retained in the menu.
- Product previews fit the page without nested scrolling. Focal crops remain inside the approved wider captures; the original image files are unchanged. View larger retains the wider capture, scrolling, keyboard focus containment, Escape and focus return.
- Long capability and process lists have optional phone disclosures. Desktop and print show the full content; JavaScript-failure views show the lists without dead disclosure buttons.
- Team identities use a grid. Initial summaries occupy three lines; opening a full profile restores the complete summary and biography. All approved text, contacts, portraits, credentials and representative experience are preserved.
- Cookie choices can wrap and stack with enlarged text. The header, display headings and team identities reflow without clipping at 200% root text size.

The commercial copy modules, claims, enquiry destination, confidentiality wording, original product assets, legal text and consent behaviour are unchanged.

## Verification

- Production build and prerender passed. Source and built copy checks passed with zero warnings. Eight sample hashes remain unchanged.
- Existing tests: 15 suites, 97 tests passed, plus two copy regression tests. Four new capture tests cover accessible preview/inspector behaviour and crop containment.
- Independent implementation review found no blocking issues after correcting the JavaScript-failure fallback.
- Rendered browser checks at 320, 360, 390, 430, 768 and 1440 pixels found no page or heading overflow. Each inline preview has equal client and scroll dimensions, confirming no nested scrolling.
- Visually inspected the opening, chronology, search capture, report detail, team cards, menu and image inspector. Verified capability expansion, complete-summary restoration on profile expansion, and access to sign-in and demonstration actions from the phone menu.
- At 320 pixels with 200% root text size, no overflowing text/control boxes were found in the checked header, main content and cookie choices. This is browser text enlargement, not a claim of testing a physical iPhone or every mobile browser.
- Print emulation showed every capability list and hid phone toggle controls. With script execution disabled, all capability lists remained visible and inactive toggles were hidden.
- The static Superdesign export uses native capability disclosures. At 390 pixels they open and close; at 1440 pixels their content stays visible and summaries disappear in the supported browser. It still omits the application runtime, and its menu/image-inspector buttons remain disabled.

Evidence is in `screenshots/phone-repair-2026-10-03/`, including before/after phone openings, team, search and report views, responsive geometry and enlarged-text geometry. Geometry includes the expanded cookie navigation column after its interaction test.

## Delivery

Implementation commit `dc2c7ac` is pushed to draft PR #5. Both Vercel deployment checks passed; primary deployment `6831073893` reports success.

Verified hosted preview: https://veri-case-website-cghvp8s45-quantum-commercial-solutions.vercel.app/

The 390 pixel hosted page serves the matching `main.0380adfb.css` asset, displays the 144 pixel wordmark and fitted image crops, and has no page overflow. All four capability lists start collapsed. The chronology disclosure expands and closes; rejecting analytics dismisses the cookie banner; the home link returns focus to `top-title`. Screenshot: `screenshots/phone-repair-2026-10-03/hosted-390.jpg`. Superdesign version 3 was refetched byte-identically to the verified static export. Production remains unchanged.
