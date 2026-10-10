# Research and automated-bundle emphasis: verification

10 October 2026. Implemented and verified locally. No commit, push or deployment. Existing founding-reason, dispute-statistics, portrait and unrelated working-tree changes were preserved.

## Result

- Research heading: **What goes unread can change the case.**
- Prominent **95%+** callout with “reported as unused” and the visible attribution “Autodesk, 24 June 2024, citing FMI (2018)”. The [source review](source-review.md) records the source-chain limitation. Reference [4] links Autodesk, FMI and the original Xpera article; references [1] to [3] retain their IDs.
- Chapter III lead: **Deep Research** produces a report with its sources. Select Create bundle to automatically bring the report and cited records together.
- Semantic strong emphasis renders at font weight 700. Existing G5_research and the user-controlled ordering, cover and PDF steps remain intact.
- New callout stacks below 768px. Existing chapter and statistics breakpoints are unchanged; no shared application tokens or demonstration colours changed.

## Automated checks

| Check | Result |
| --- | --- |
| Focused rendering, composition and publication-gate checks | 39 tests passed across four suites |
| Complete Jest suite | 193 tests passed across 26 suites |
| Copy-checker tests | Two passed |
| Source and prerendered copy checks | Passed, zero warnings |
| Production build and prerender | Passed |
| Generated sample hashes | Eight records, unchanged |
| Diff whitespace check | Passed |

The first complete-suite run caught a NotesPage assertion that still expected three citations. It now verifies all four source and return destinations. The complete suite was rerun successfully. Existing test-console server-rendering warnings and build tooling notices did not cause failures. Logs are retained alongside this document.

## Browser checks against the fresh production build

The local preview served the newly built `frontend/build` output. Baseline views were captured before rebuilding.

- **1359, 1024, 883, 768, 390 and 320px:** document width equalled viewport width. Measured new callout text and the revised report introduction stayed within the viewport. No horizontal scrolling or clipped changed text was found.
- **All four citations:** keyboard Enter moved to the correct source, then the return link restored focus to the correct figure. Source targets cleared the sticky header by approximately 31px; returned source markers cleared it by approximately 15px.
- **Numbers:** the retained animations finished at 50%, 33.4% and 65.8%. The 95%+ callout is static, identifying a differently scoped, dated claim.
- **Reduced motion at 390px:** all eight decorative reels had `animation-name: none`; the final values, callout, attribution and bold lead were visible.
- **JavaScript disabled at 390px:** prerendered HTML contained the new heading, complete callout and attribution, all three final values and the strong Deep Research element. Document width remained 390px. JavaScript, motion preferences and viewport overrides were restored afterwards.

Evidence: [responsive measurements](responsive-measurements.json), [keyboard citation round trips](citation-round-trips.json), and [reduced-motion / static output](motion-and-static-output.json). The responsive file's `finalValues` field was collected with an inapplicable selector and is empty; use the separately verified values in `motion-and-static-output.json` and the screenshots. No inference about animated values relies on that empty field.

## Independent reviews

An independent reviewer inspected the changed renderer, its callers, gate handling, source wording, references, tests and new CSS. No material findings. The reviewer confirmed that E18 supports automatic gathering on Create bundle, while the remaining steps preserve user responsibility for order and PDF preparation.

The same independent reviewer inspected statistics screenshots at 1359, 768 and 320px and bundle screenshots at 1359, 883 and 390px. No material visual findings: the claim's scope and dated attribution remain visible; Deep Research is visibly bold; labels are readable; gold separators are intact; the revised text is not crowded or clipped. Some application contents in screenshots are mid-animation and are unchanged by this revision.

## Screenshots

| View | Before | After |
| --- | --- | --- |
| Statistics, 1359px | [Before](before-statistics-1359.png) | [After](after-statistics-1359.png) |
| Reports, 1359px | [Before](before-bundle-1359.png) | [After](after-bundle-1359.png) |
| Statistics, 320px | Not captured for this revision | [After](after-statistics-320.png) |
| Reports, 390px | Not captured for this revision | [After](after-bundle-390.png) |

Additional screenshots for every tested width, reduced motion and JavaScript-disabled output are saved in this folder.
