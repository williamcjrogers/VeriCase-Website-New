# Screenshot-led implementation acceptance

03 October 2026. Source baseline `1805b2f3d20416e08c3b9360fc4a3fb1adb1ffb0`; implementation branch `codex/screenshot-led-website`. The managed worktree preserves the primary checkout's existing plan and anchor changes.

## Result

The website implementation is complete for review. The page retains its real wordmark and green/brass identity, uses three unmodified synthetic application captures, restores substantive explanations, clarifies the audience and professional-review boundary, keeps full approved team profiles, and repairs navigation, print and clipboard failure behaviour. It introduces no service, public API or dependency migration.

The hero places copy above a wide document reader. A side-by-side copy/image layout would reduce the 1,196-pixel reader to approximately half its natural width before enlargement; the selected arrangement gives the real interface the available page width. The mobile capture remains readable through contained scrolling and enlargement. This was an implementation choice informed by source geometry and rendered review, not a claimed buyer preference test.

Reference evidence: [product reference register](../../docs/design/product-reference-register.md), [capability register](../../docs/design/website-capability-register.md), [copy deck](../../docs/design/website-copy-2026-10-03.md). All four full profiles match the approved baseline apart from added summaries of 69, 66, 69 and 68 words.

## Automated verification

Final local checks use Corepack pnpm 9.15.9 with package-manager strictness disabled for this repository's existing Yarn declaration. No lockfile/dependency migration was made.

| Check | Result |
|---|---|
| React/unit/integration suite | 15 suites, 93 tests passed |
| Copy regression suite | 2 passed |
| Source and built copy checks | Zero warnings |
| Production compilation | Passed |
| Prerender | Homepage, cookies and 404 generated |
| Whitespace/diff check | Passed |
| Independent implementation review | No remaining material findings after fixes |

Tests exposed the claims fragment's incorrect focus target, image failure removing a dialog's return-focus control, and closed disclosures being omitted from print. These were fixed and covered by regression tests. The build exposed the old `/ui/` environment suffix and obsolete footer assertion; both were reconciled.

The final local build emits `main.3a46e2c6.js` (127.70 kB gzip) and `main.3bd319f3.css` (19.94 kB gzip). Baseline main assets were 125.29 kB and 19.54 kB respectively. The three displayed PNGs total approximately 552 kB uncompressed transfer assets; lower views are lazy-loaded. Main bundle size is a build observation, not a field-performance result.

## Rendered acceptance

Browser evidence is in [screenshots/implementation-2026-10-03](screenshots/implementation-2026-10-03/). Captures retain their actual dimensions; the early desktop proof is 1,280 × 720, with additional 1,440 × 1,000 and 390 × 844 views. Image files are JPEG captures; original product assets remain PNGs.

| Area | Evidence and outcome |
|---|---|
| Responsive layout | Actual document/header/heading/control bounds checked at 320, 390, 480, 600, 768, 1,024 and 1,440 CSS pixels. No horizontal page overflow found. Independent reviewer repeated these widths. |
| Reflow | 720 CSS pixel view checked as the layout equivalent of 200% zoom on a 1,440-pixel viewport. Native browser zoom and a full assistive-technology session are not claimed. |
| Accessibility | Axe 4.10.3 WCAG 2 A/AA and 2.1 AA tags: no violations on desktop/mobile. The browser tool's injected `browser-mcp-container` is excluded, not website content. Actual document language is `en-GB`. |
| Contrast review | Desktop axe required manual review where absolute screenshot bounds extend beyond clipped frames. The captures remain clipped in the rendered page. Computed text/background pairs were measured: minimum 6.05:1 for the flagged copy, 8.85:1 for enlargement controls and 13.21:1 for the restored dark section. See `contrast-manual.json`. |
| Image inspection | All three controls open the correct named image dialog. Approved crop excludes old sidebar/footer in normal and enlarged views. Keyboard enters, stays contained, closes with Escape and returns to the trigger. Mobile source pane starts in view; file list remains reachable. |
| Menu and fragments | Mobile menu closes and focuses the chosen heading. Actual mounted-page tests cover all navigation/legacy IDs, initial fragments and off-home links. |
| Profiles and FAQ | Full profile disclosure inspected in browser; all ten disclosures retained. Print PDF includes complete profiles, credentials and answers, then restores their original closed/open state. See `print-review.pdf` and extracted text. |
| Motion | All essential content present from first paint. Reduced-motion emulation makes the decorative frame animation `none`. |
| Image/clipboard failures | Component tests cover failed preview, failure after opening, restored focus, blocked clipboard and visible selectable manual-copy instructions. No real email was sent. |
| Metadata | Built homepage/cookies canonicals correct; 404 has no canonical and is `noindex`. Public delivery checked separately below. |

## Consent and performance boundaries

The production-build browser test found zero PostHog requests before consent, three loader/configuration requests after opt-in, persisted grant after reload, stored denial after withdrawal and zero analytics requests after the subsequent reload. The already-loaded SDK remains present until navigation; existing unit tests verify opting out, storage failure and cross-tab changes. Account-side event receipt is not verified. See `consent-lifecycle.json`.

A small **warm-cache localhost** comparison at 1,280 × 720 recorded LCP 72 ms before and 68 ms after, CLS 0 in both and a 24 ms Questions-link click event in both. Neither observation recorded a long task. These are only two local observations, not a reliable speed comparison, mobile benchmark, INP measurement or p75 field data. Network/CPU throttling was unavailable through the connected browser's raw CDP surface; fresh tabs were used for the unthrottled comparison. See `local-performance.json`. No performance improvement is claimed. Field targets remain LCP ≤2.5 seconds, INP ≤200 ms and CLS ≤0.1.

## Review artefacts and release status

[Superdesign preview](https://p.superdesign.dev/draft/425b94c7-c50b-4d91-9bd9-edc561547894), draft `425b94c7-c50b-4d91-9bd9-edc561547894`, version 1, is a static review copy of the implementation. Native profile/FAQ disclosures work; React-dependent controls are deliberately disabled. It is not the functional website deployment. The preview was also opened and visually checked in the browser. Export/source verification is in [superdesign/README.md](superdesign/README.md).

Frontend Design Premium, Superpowers, 10x-Team, Superdesign, Browser and Codex worktree/review capabilities were applied to the implementation and verification. Plugin Management was used to assess requested connections. Kling had no callable generation connection; Higgsfield required connection setup. No generated product footage was needed or inserted. No live case material was sent to a design service.

The repaired sign-in destination is `https://app.veri-case.com/login` on the existing VeriCase host. The old `/ui/login.html` returned 404; `/login` returned its VeriCase authentication page. `www.meritusiq.com/ui/login.html` is a separate application. The owner was asked which product destination is intended; absent a correction, this implementation preserves the existing VeriCase host and fixes its path. Authenticated application availability is unverified.

This report does not claim production publication. The implementation is prepared on an isolated branch for review. Deployment/PR evidence, when available, is recorded below.

## Outstanding validation

- Five representative buyer interviews/comprehension checks have not been conducted.
- Current customer capability availability and the intended customer application identity still need product-owner confirmation before treating source support as a release claim.
- Native screen-reader review, native browser zoom and cross-browser/device testing remain additional validation; the checks above are bounded Chromium/browser evidence.
- Field Core Web Vitals, account-side analytics receipt and actual enquiries/bookings require post-release observations.

## Hosted preview verification

Implementation commit `078df978f28dee6c0b64b4191212cc9540bc544c` is pushed in [draft PR #5](https://github.com/williamcjrogers/VeriCase-Website-New/pull/5). Both Vercel preview checks and GitGuardian passed.

[Functional preview](https://veri-case-website-7l0k1xn4l-quantum-commercial-solutions.vercel.app), GitHub deployment `6829967899`, Vercel project `veri-case-website-new`, was inspected in the authorised browser session. Vercel access protection remains enabled; unauthenticated requests redirect to SSO. No bypass token was created and no access policy was changed.

The rendered headline, real image inspector, Escape/focus return and cookie-page navigation match the implementation. The hosted homepage and cookies route return 200 with the expected canonicals. An unknown route returns a genuine 404 and `noindex`, without a canonical. The hosted CSS and all three displayed PNGs match the local assets byte for byte. Hosted JavaScript is `main.61511e24.js`, differing from the local build hash; source revision is established by the successful deployment record, and the hosted bundle includes the print handlers. See [hosted verification](hosted-verification-2026-10-03.json) and `screenshots/implementation-2026-10-03/hosted-desktop-1440.jpg`.

The second connected project also reports a successful preview, deployment `6829972428`. The primary preview above is the one functionally inspected. Main and production remain at the earlier revision; the PR is draft.
