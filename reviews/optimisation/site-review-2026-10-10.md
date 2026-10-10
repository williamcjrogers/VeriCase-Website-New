# Homepage review, 10 October 2026

Scope: the public homepage and the uncommitted local revision on `claude/market-agnostic-palette-o59jgr`. The six specialist briefs in `.agents/agents/` were applied by this review. They were not run as separate sessions, and they did not take their own browser measurements.

## Coverage

- Contract: `docs/design/current-contract.md`, read before the findings below.
- Page trace: `frontend/src/pages/LandingPage.jsx` mounts Hero, Lessons, InBrief, Difference, the capability explanations, SharedWorkspace, Collaboration, TimeAdvantage, Founder, Questions, Demonstration, then SiteFooter.
- Source SHA: `297a7ab` (pull request 16), plus uncommitted edits in the hero, motto, lessons, header, clock copy, wordmark and contract. Those edits are not on the public site.
- Public HTTP, 10 October 2026, from this machine: `https://veri-case.com/` returned 200, `text/html`, Vercel, HSTS. `https://www.veri-case.com/` returned 308 to the apex. `/robots.txt` returned 200 `text/plain`. `/sitemap.xml` returned 200 `application/xml`. An unknown path returned 404 `text/html`. CSS `main.423b534e.css` returned 200 `text/css` with a long immutable cache.
- Production HTML title: “VeriCase | Search and question your project evidence”. Assets: `main.423b534e.css`, `main.2acb6bd3.js`. The HTML contains “Transform complex” and “Making Time Your Ally”. It does not contain “Time is your ally”.
- Local browser, this session, desktop and one 390 px check of the motto line: the motto’s first line did not overflow; the scrolled header turned near-black; the demonstration was then returned to blue. No full pass at 320, 480, 600, 768, 1024 and 1440. No screen reader. No field LCP, INP or CLS. No Search Console.

## Exclusions

Forest green is not the current identity. The contract replaced it on 09 October 2026. This review does not restore it. Account-side analytics receipt, Search Console, and real-user Core Web Vitals were not available.

## Findings

### P1. The opening headline is the generic accent the owner has already rejected

`frontend/src/components/sections/Hero.jsx` line 21 and `frontend/src/components/sections/clarity.css` line 120 paint “compelling arguments.” with a blue text gradient. On 10 October 2026 the owner, looking at that heading, called it incredibly bland.

Consequence: the first sentence still reads as a template highlight. The rest of the opening work (motto line break, removed email note, typed lines restored) does not fix that.

Fix, after a direction is chosen: change the heading’s type treatment in those two files. Do not add a second colour on one phrase as the remedy. That split was tried on “VeriCase.” in the motto and rejected as tacky the same evening.

Acceptance: at 390 and 1440 the whole sentence is readable, “arguments.” is not clipped, and the owner accepts the heading without a one-phrase colour accent.

### P1. The near-black band is a rare pause, and it must not sit on another dark band

`frontend/src/components/sections/TimeAdvantage.jsx` line 4 is the only `is-ink` section. The owner liked that block and then rejected the same colour on `section#demonstration`, because it sat on the black footer and read as one block.

Consequence: a second use of that colour next to the footer, or next to the clock, undoes the alternation.

Fix: leave Demonstration on `on-blue` without `is-ink`. Any later dark band needs a light section on both sides, and there should be at most one besides the clock.

Acceptance: scrolling the homepage shows light, then the clock, then light, then the blue demonstration, then the black footer. No two dark bands touch.

### P1. The contract’s time sentence no longer matches the motto

`docs/design/current-contract.md` says the typed lines are “Time is your ally,” and “Not your enemy.” `frontend/src/content/home.js` lines 64 to 65 now type “Making Time Your Ally.” and “Not Your Enemy.”, which the owner restored on 10 October 2026. The clock title in `frontend/src/content/marketing.js` is still “Time is your ally. Not your enemy.”

Consequence: a later pass can “correct” the motto back to the contract and undo the owner’s restoration. The public HTML still shows the older “Making Time Your Ally” and does not show the new clock title.

Fix: record the restored motto lines in the contract, and keep the clock title as the separate section heading unless the owner changes it.

Acceptance: the contract, `COVER.motto.lines`, and the rendered card agree. The clock heading is named separately.

### P2. Local wordmark and opening edits are not what the public site is serving

The reversed wordmark’s CASE is `#BF9B58` only in the working tree. Production still serves `main.2acb6bd3.js` and `main.423b534e.css`. Favicons were not regenerated from `frontend/scripts/render-icons.mjs`.

Consequence: the footer and scrolled header the owner is judging locally will not match veri-case.com until a release.

Fix: do not treat tonight’s files as released. Regenerate icons only when the wordmark colour is accepted.

Acceptance: a release record names the git SHA, the deployment, and the CSS and JS filenames, and those filenames match the public HTML.

## What this session did not find broken

The apex, www redirect, robots file, sitemap and unknown-route 404 responded as above. The hero email note under the two buttons is removed in source (`Hero.jsx` passes an empty microcopy). That removal is local only. Copy checks earlier this session passed on the local tree. They are not a production acceptance.

## Plugins

Superdesign is authenticated for team “Personal”. Project `3c76a4ca-5759-439e-84c8-e463d9921c70` exists. Its saved homepage draft is the 03 October import, which is not the current page. It does not fill the missing owner decision on the headline. No other plugin was required for this review. Bright Data was not used. Installed does not mean a fresh measurement was taken.

## Recommended sequence

1. Agree what the next design pass is allowed to change.
2. Correct the contract sentence so it matches the restored motto.
3. Redesign only the opening headline, then look at it at 390 and 1440 before touching other sections.
4. Keep the clock as the single near-black pause unless a second site is chosen with light sections on both sides.
5. Release only after the public HTML, assets and rendered page are checked against the accepted source.
