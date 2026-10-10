# Founding reason verification

10 October 2026. Local working tree based on d3fd4ad6dc3fdfa150f4dbcd7d05ee8fca34ceaf. No commit, push or deployment performed for this revision.

## Implemented result

The full Abrahamson passage is permanently visible between the continuous motto and Time section. The approved label, H2 and single closing paragraph are set on a full-width paper surface. Desktop uses a 5:7 split from 1024px; smaller widths stack in reading order. Quotation text, emphasis, attribution and book publication qualifier are unchanged. The G11 gate controls the whole section and motto attribution link. There is no Lessons disclosure or animation dependency.

The opening, interactive Lens, motto, four Time paragraphs, statistics and six chapters are preserved. The design contract supersedes the older concealment instruction. This section's additional height is intentional.

## Automated checks

- Focused red/green proof: four expected initial failures; final 47 tests across four suites pass.
- Complete Jest: 25 suites, 186 tests pass. See `jest.log`.
- Copy-checker tests: two pass. See `copy-tests.log`.
- Source copy check: passes with zero warnings. See `source-copy.log`.
- Production build and prerender: successful; built copy check passes with zero warnings. See `build.log`.
- Eight generated sample hashes unchanged; no diff to the sample evidence or hash source.
- `git diff --check` passes.

Non-failing tool warnings: the Corepack wrapper notes the existing Yarn package-manager declaration; the development SSR tests emit existing Radix useLayoutEffect warnings. The build emits Node's fs.F_OK deprecation notice. No dependencies or lockfiles changed.

## Rendered checks

The freshly built page at `http://127.0.0.1:4183/` was reloaded and inspected with the in-app browser. `browser-checks.json` records computed styles, visible text, actual bounds, IDs and navigation state.

| Viewport | Layout | Page width | Passage overflow | Heading clearance |
| --- | --- | --- | --- | --- |
| 1359px | 5:7, 483px / 677px | 1359px | None | 210px top, header 65px |
| 1024px | 5:7, 377px / 527px | 1024px | None | 188px top, header 65px |
| 768px | Stacked | 768px | None | 167px top, header 57px |
| 390px | Stacked, 24px gutters | 390px | None | 167px top, header 65px |
| 320px | Stacked, 20px gutters | 320px | None | 167px top, header 65px |

Screenshots `after-1359.png`, `after-1024.png`, `after-768.png`, `after-390.png` and `after-320.png` were visually inspected. Complete quotation, readable lines, gold vertical rule, unboxed heading and closing sentence are intact. The motto footer clears the new boundary by 54px at 1359, 41px at 1024 and 32px on smaller widths. Each boundary has one paired ornament. `before-1359.png` records the prior presentation at the same viewport.

All five widths retained ten details elements, zero duplicate IDs, zero hidden passage descendants and no disclosure ancestor. The motto link focuses `lessons-title`. A direct navigation from `/#top` to `/#lessons` also focuses that heading, with the section at 80px below a 65px sticky header. Navigation was measured after fonts and scroll settling, not during transient layout restoration.

Reduced-motion rendering was inspected at all five widths. A desktop 200% reflow equivalent (680 CSS pixels, DPR 2 for the 1359px desktop) passes without horizontal overflow. An additional 390px, 200% root-text stress check shows the new passage remains within bounds with a 64px heading and 44px quote. That stronger combined stress test exposes pre-existing overflow in unchanged solution chapter grids/application examples (page width 552px); it is outside this bounded section revision and is not claimed as a whole-page pass. The temporary text-size override was removed.

With JavaScript disabled before reload, the prerendered page contains the complete section and visible text with no hidden descendants, no disclosure ancestor and no overflow. `after-no-javascript.png` records it. The browser's locator/animation-frame helpers require script execution, so the no-JavaScript interaction was verified with native browser pointer input against the observed link bounds. It changed the hash to #lessons and landed the section at 80px, with its heading at 210px below the 65px header. JavaScript was restored afterwards.

## Print

Actual `Page.printToPDF` produced `print.pdf`; page 3 was rendered to `print-page-3.png` and visually inspected. The complete quote and closing statement print together with readable typography. The full text is also recorded in `print.txt`.

One FAQ was opened before print to check mixed-state restoration. `print-checks.json` proves all ten remaining disclosures opened during beforeprint, then returned to their exact previous states afterprint. The founding section stayed visible and outside a disclosure throughout. The test FAQ was closed afterwards.

## Independent review

Source/specification review approved with no material findings. The review is recorded in `.superpowers/sdd/2026-10-10-founding-reason/task-1-review.md`.

Final independent review (purpose_final_review, GPT-6 Astra) approved this bounded local revision with no material actionable findings. The reviewer inspected actual source, the approved plan, test logs, browser measurements, all five screen captures and the print capture. They confirmed exact copy/emphasis, publication gating, structural visibility, scoped CSS, readable phone typography, native fragment behaviour and print restoration. They accepted the accurately documented pre-existing combined phone/text stress-test limitation. The reviewer did not independently rerun the browser interactions or tests. Approval establishes local acceptance, not deployment.

Browser emulation, temporary root text sizing, print instrumentation and JavaScript disabling were removed after verification. The local page was left available at #lessons with normal motion and all disclosures closed.
