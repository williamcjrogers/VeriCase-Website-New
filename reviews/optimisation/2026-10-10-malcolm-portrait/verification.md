# Malcolm portrait refinement

10 October 2026. Implemented locally under the owner's approved plan. No commit, push or deployment.

## Result

Created `frontend/public/assets/team/malcolm-brechin-editorial.jpg`, a 440 × 440 JPEG of 42,892 bytes. Malcolm's head is centred, the background is neutral medium grey, and the monochrome contrast is stronger. His expression, leftward gaze, three-quarter pose, close-cropped hair and white shirt remain recognisably faithful to the source photograph. The original asset is retained.

The only implementation edit is Malcolm's `photo.src` in `frontend/src/content/home.js`. The pre-existing founding-reason edits in that file were preserved, as were all other uncommitted changes. No component, stylesheet, profile copy, alt text or shared portrait dimensions changed.

The built-in image-editing tool used the original Malcolm portrait as the target and William, Warren and Sam as tonal references. The [exact prompt and export details](edit-prompt.md) record the edit. Native macOS `sips` exported the generated image as the approved 440 × 440 JPEG at quality 88.

## Verification

- Production build passed, including prerender and built-page copy checks with zero warnings. See [build log](build.log).
- The built asset and live rebuilt page use the new filename. All four portraits load at natural dimensions 440 × 440.
- Inspected all four portraits together at 1359, 768, 592, 390 and 320px. Existing 100 × 100 desktop and 64 × 80 phone presentation remains intact. No clipped facial details or horizontal page overflow was found.
- Before and after portrait bounds and team bounds are identical at every width. See [browser measurements](browser-checks.json) and the matching `before-*.png` / `after-*.png` files.
- For the saved before comparison, only Malcolm's image URL was temporarily restored to the original asset in the rebuilt page's DOM, keeping the unchanged layout and CSS. The new URL was then restored. A final reload confirmed the unmodified built page uses the edited asset. All temporary viewport overrides were cleared.
- The independent reviewer inspected all five after views, the 592px comparison, measurements, original and edited assets, and all three tonal references. It approved asset likeness, framing, tone and responsive presentation with no material findings. The head's approximate horizontal centre is 211px within the 440px square, comfortably inside the central 80% crop area.
- No additional unit tests were added or run for this asset-only replacement, as specified by the approved plan. The existing production build is the technical check.

The local browser is left at Malcolm's profile. [Final page capture](finished.png).
