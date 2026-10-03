# Website Optimisation Review
**Date**: 03 October 2026
**Commit SHA**: 6bd5ac45999bd218d6c45edfbddbac8f30032894

## Scope and Coverage
This audit covers the current rendering of `frontend/src/pages/LandingPage.jsx`, its component tree, content files in `frontend/src/content/`, metadata, and styling in `frontend/src/index.css` and `tailwind.config.js`.

**Exclusions**: The external login application (`app.veri-case.com`).

## Unresolved Account/Fact Dependencies & Unavailable Evidence
- **Core Web Vitals Field Data**: This review relies on static source inspection. The contract mandates field targets of p75 LCP <=2.5s, INP <=200ms, and CLS <=0.1. A formal pass requires live-user field data (e.g., CrUX or PostHog), which is currently unavailable.
- **Rendered Browser Metrics**: Screen reader accessibility, focus trap behaviour, computed WCAG contrast, and manual touch target audits are inferred from source tokens and have not been executed in a live browser context.

## Prioritised Findings & Action Plan

### P0 (Public delivery / Essential functionality)

**1. Interactive Product Mock-ups Replaced by Static Diagrams**
- **File/Line**: `frontend/src/components/sections/EvidenceIllustrations.jsx`
- **Consequence**: The interactive application panels were entirely removed and replaced with static, generic SVG diagrams. This violates the contract which states: *"Subsequent feedback explicitly permits useful, easily understood interaction; the earlier static-only rule is superseded... Product illustrations must stay as close as possible to the actual application."*
- **Concrete Fix**: Revert the static SVG components. Restore the actual interactive product mock-up components from the repository. Ensure they use the fictional matter (EV-0131, EV-0138, EV-0147) and retain accessibility features.
- **Acceptance Check**: `LandingPage.jsx` renders application panels that visually match actual product screenshots and support optional interactions.

**2. Severe INP Performance Bottleneck (Scroll Lag)**
- **File/Line**: `frontend/src/index.css` (lines 54-65)
- **Consequence**: The `body::before` pseudo-element applies a full-viewport SVG `feTurbulence` noise filter with `mix-blend-mode: multiply`. This procedural noise causes continuous recalculation during scrolling, severely degrading scrolling performance on mobile devices and threatening the INP <=200ms goal.
- **Concrete Fix**: Pre-render the noise into a small, tiling static WebP/PNG image. Apply it as a standard `background-image` without `mix-blend-mode`.
- **Acceptance Check**: Scroll interactions remain fluid on simulated lower-end mobile devices, with INP staying well below 200ms.

### P1 (Accessibility, Clarity, Substantiation, Enquiry Journey)

**3. Reading Order and Component Grouping Violation**
- **File/Line**: `frontend/src/pages/LandingPage.jsx`
- **Consequence**: The page renders the old, long-form chapters (`RecordExplanation`, `EvidenceExplanation`, `IntegrityExplanation`), cluttering the page and violating the approved 7-section reading order. The contract dictates that the "six fuller capabilities" are now grouped into "three practical jobs" (which corresponds to the `<InBrief />` component). Furthermore, `<IntegrityExplanation />` is incorrectly placed after `<SharedWorkspace />`.
- **Concrete Fix**: Remove `<RecordExplanation />`, `<EvidenceExplanation />`, and `<IntegrityExplanation />` from the `<main>` block in `LandingPage.jsx`, relying entirely on `<InBrief />` to cover the capabilities. Ensure the remaining 7 sections follow the exact order: Hero, TimeAdvantage, InBrief, SharedWorkspace, Founder, Questions, Demonstration.
- **Acceptance Check**: Verify the `<main>` element contains exactly the 7 mandated components in the correct order.

**4. Prohibited Founder Labelling**
- **File/Line**: `frontend/src/content/home.js`
- **Consequence**: Malcolm Brechin and Sam Whisker are incorrectly labelled as "Founder and CEO" and "Co-Founder and CTO" of previous ventures within their expandable credentials. The contract explicitly mandates: *"Malcolm and Sam must not be labelled as founders or co-founders."*
- **Concrete Fix**: Edit the `bio` and `credentials` text in the `FOUNDER.people` array. Rephrase their involvement (e.g., using "Director" or "established") to entirely remove the words "Founder", "founded", and "co-founder".
- **Acceptance Check**: A case-insensitive search for "founder" on Malcolm and Sam's data objects within `home.js` returns zero matches.

**5. Undersized Touch Targets in Footer**
- **File/Line**: `frontend/src/components/sections/SiteFooter.jsx`
- **Consequence**: Links in the "Company" and "Cookies" columns lack the required minimum height padding, resulting in touch targets smaller than 44x44px, which fails WCAG 2.5.8 Target Size.
- **Concrete Fix**: Update the `linkClass` definition to enforce a 44px minimum height (e.g., add `inline-flex min-h-[44px] items-center` or `min-h-11`).
- **Acceptance Check**: Browser inspection at 320/390px confirms the computed bounding box for all footer links is at least 44px high.

**6. Missing Font Preloads (LCP / FOUT Risk)**
- **File/Line**: `frontend/public/index.html`
- **Consequence**: The `500` font weights (`plex-sans-500.woff2` and `plex-mono-500.woff2`) are not preloaded. Because `font-display: swap` is active, this will cause a Flash of Unstyled Text (FOUT), delaying the final paint of critical navigation and call-to-action elements.
- **Concrete Fix**: Add `<link rel="preload" href="%PUBLIC_URL%/fonts/plex-sans-500.woff2" as="font" type="font/woff2" crossorigin />` and similarly for the mono font to the document head.
- **Acceptance Check**: The Network tab (with cache disabled) confirms the 500-weight fonts begin downloading concurrently with the HTML.

### P2 (Lower-impact improvements)

**7. Hardcoded Hex Values / Bypassing Tokens**
- **File/Line**: `SiteHeader.jsx`, `SiteFooter.jsx`, `Demonstration.jsx`
- **Consequence**: Components are bypassing the design system by using arbitrary hex values (e.g., `bg-[#0B2516]`, `border-[#1A3828]`, `outline-[#BF9B58]`, `text-[#E8DCC8]`) instead of the approved Tailwind tokens (`ink`, `navy`, `brass`, `paper`, etc.).
- **Concrete Fix**: Replace all hardcoded hex utilities with their contract-approved semantic token equivalents (e.g., `bg-ink`, `outline-brass-400`).
- **Acceptance Check**: Running `grep -r '#[0-9A-Fa-f]' frontend/src/components/sections` returns zero arbitrary colour values.

## Plugin Additions & Measurement
*No analytics or optimization plugins (e.g. PostHog, Vercel Analytics) are currently connected or reporting in the codebase. To achieve full measurement capabilities for Core Web Vitals and event tracking as per the contract, an analytics suite must be formally connected with explicit consent logic.*
