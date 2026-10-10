# New statistics verification

10 October 2026. Local working tree based on `d3fd4ad6dc3fdfa150f4dbcd7d05ee8fca34ceaf`. No commit, push or deployment.

## Implemented result

The owner's selected **50%, 33.4% and 65.8%** replace the three headline figures under “Disputes put money and time at stake.” The continuous ink-and-gold band, upward digit animation, accessible static values, numbered references and phone stacking remain unchanged.

The first figure concerns respondents identifying inadequate contract administration as a leading cause of adjudicated disputes. The other two concern sums in dispute and time extensions claimed within HKA's investigated sample. The references identify dates, denominators, sample limitations and the shared HKA dataset. See [the primary-source review](source-review.md).

All fields of the former 40,000-email, 5.5-hour and 18% research records survive in the existing wider-research disclosure. It now contains six ordinary articles. There are still ten disclosures in the homepage. Source research is expressly distinguished from measured VeriCase results or savings.

The completed [founding-reason revision](../2026-10-10-founding-reason/verification.md) remains intact: the full quotation is permanently visible between the motto and Time section, with the existing publication gate and direct passage link.

## Automated checks

- Focused statistics, page-composition and motto checks: 34 tests, three suites passed, recorded in the SDD task report.
- Complete Jest suite after the statistics change: **189 tests, 25 suites passed** ([log](jest.log)).
- Copy-checker regression tests: **two passed** ([log](copy-tests.log)).
- Source and built-page copy checks: **zero warnings** ([source log](source-copy.log), [build log](build.log)).
- Production build passed. Eight generated sample hashes remained unchanged. No dependency or lockfile change.
- `git diff --check` passed.

Existing non-failing warnings concern the repository's Yarn package-manager declaration while using the owner's pnpm workflow, Radix server-rendering `useLayoutEffect`, and Node's deprecated `fs.F_OK` access.

## Browser evidence

Checked the freshly built site at `http://127.0.0.1:4183/` using the in-app browser. Before/after desktop captures use 1359px. The five normal-motion widths were 1359, 1024, 768, 390 and 320px. All five show the exact final values, no duplicate IDs, no measured horizontal overflow, readable complete labels and the permanently visible founding passage. Desktop and tablet retain three columns; phones retain one continuous stacked band. See [measurements](browser-checks.json) and `after-*.png`.

- All three numbered references were activated with Enter at 320px and returned with Enter. Source focus landed on `research-source-1`, `-2` and `-3`, approximately 96px below the viewport top with a 65px sticky header. Return focus landed on each corresponding `research-ref-*`, approximately 80px from the viewport top. See [round trips](citation-round-trips.json).
- The wider-research disclosure was opened and all six articles read back, including the original figures, source links and qualifications, then returned to its closed state. See [read-back](wider-research.json).
- Reduced-motion rendering at 390px showed the final digits with no reel animation. See [measurement](reduced-motion.json) and [capture](reduced-motion-390.png).
- JavaScript-disabled rendering was checked separately with normal motion preferences at 390px. Prerendered values and the founding passage remained visible, with no overflow. See [measurement](no-javascript.json) and [capture](no-javascript-390.png).
- A 200% desktop-reflow equivalent (680 CSS pixels, device scale factor 2) retained all labels and values without horizontal overflow. See [measurement](reflow.json) and [capture](reflow-200-percent.png). This is a responsive reflow check, not a claim that browser zoom was changed through its menu.
- The visible `.stat-digit` and `.stat-reel` colour was verified as `rgb(226, 193, 138)` (`#E2C18A`). The JSON `colours.value` field reads the containing paragraph's inherited colour, not the visible digit colour. The band remains `#15181F` and labels `#F3F0E9`.
- Temporary device metrics, reduced-motion and JavaScript overrides were restored. The finished local statistics section remains open for the owner.

The separate founding-reason review records actual PDF printing, all ten disclosures opening/restoring and the passage's print visibility. Those print regressions remain in the passing complete suite. Its additional combined 390px/doubled-root-text experiment identified pre-existing overflow in lower application/chapter content, outside these bounded changes; this record does not claim that combined whole-page experiment passed.

## Independent review

The independent task reviewer approved source, copy and specification compliance with no material findings. It confirmed the preserved research metadata, exact labels, meaningful regression tests and unchanged motion/link implementation. See [task review](task-review.md).

The fresh independent final reviewer approved visual, copy, accessibility and regression acceptance with no material findings after inspecting all seven supplied images and the recorded checks. See [final review](final-review.md). The final desktop view is [finished-1359.png](finished-1359.png).
