# Team role colour

10 October 2026. The owner requested all team role titles in the warm gold-brown shown in the chapter label and founding-reason label.

Changed `.team-role` to the existing `--vc-gold-ink` token (`#825A2A`) and removed the phone-specific graphite override. Profile copy, names, portraits, type sizes and spacing are unchanged.

The fresh production build and its source/prerendered copy checks passed. Generated sample hashes were unchanged. No additional unit tests were added for this bounded CSS colour change.

Browser checks at 1359, 768, 390 and 320px confirmed that all four role titles and both reference labels compute to `rgb(130, 90, 42)`. All measured role bounds fit the viewport, and document width equals viewport width. The desktop screenshot was visually inspected. Responsive measurements and desktop/phone screenshots are saved alongside this record.

Local implementation only. No commit, push or deployment. Existing uncommitted work was preserved.
