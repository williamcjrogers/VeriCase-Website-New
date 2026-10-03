# Production release

03 October 2026. The owner explicitly authorised redeployment to production after the copy and phone-layout revisions.

## Released revision

- PR #5: https://github.com/williamcjrogers/VeriCase-Website-New/pull/5, merged at 19:37 BST.
- Production and remote main revision: `cedd40db74eba8984f63340efd68f806d55842d3`.
- The merge tree is identical to reviewed branch head `f7254dbbde2d37ac9f8f04eb60451dd72d9330fb`.
- Vercel project owning the public domains: `veri-case-website-new-re2v` (`prj_JavSKONSjXnMvEpWc3lIYoMVLuGV`).
- Deployment: `dpl_BGyGq7Dv2jrBbEQTs2kBb6TuaTVX`, production, READY.
- Deployment URL: https://veri-case-website-new-re2v-92f5hzpc8.vercel.app/
- Canonical public URL: https://veri-case.com/
- Both public aliases are assigned to this deployment; https://www.veri-case.com/ returns HTTP 308 to the canonical apex.
- GitHub production deployment record `6831539857` identifies the same commit. Both Vercel commit checks succeeded.

## Verification

The production build log identifies main commit `cedd40d`, successful compilation, eight unchanged sample hashes, successful prerendering and source/built copy checks with zero warnings. Production serves `main.0380adfb.css` and `main.5edba4de.js`, matching this deployment's build log. The production build took 17 seconds.

The public domain was checked in the browser at 320, 390 and 1440 pixels. Document width equals viewport width at each size. At 390 pixels all three inline product previews have equal client and scroll dimensions, with no nested scrolling. All four capability disclosures start collapsed. The phone menu opens with sign-in and demonstration links; closing it works. The chronology disclosure reveals its content and closes again. The home link restores focus to `top-title`. No browser warning or error was captured during these checks.

The public cookie notice returns HTTP 200 and an unknown route returns HTTP 404. The genuine application captures and the stronger evidence-to-argument copy are visible on the production domain.

Screenshots:
- `screenshots/phone-repair-2026-10-03/production-390.jpg`
- `screenshots/phone-repair-2026-10-03/production-1440.jpg`

This production verification supplements the 97 passing application tests, two passing copy regression tests, responsive and 200% text reflow checks recorded in `phone-repair-2026-10-03.md`. It is a browser viewport check, not a claim of physical-device testing. Runtime log drains and ongoing monitoring were not audited as part of this static-site release.

The primary local checkout remains on its existing main revision with its unrelated planning changes preserved. Remote main and production are at the released revision. This release record supersedes the earlier acceptance documents' statements that production remained unchanged.
