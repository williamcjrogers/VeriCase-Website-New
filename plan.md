# VeriCase Landing Page — Implementation Plan

## 1) Executive Summary
A single-page, premium B2B SaaS landing experience for VeriCase will replace the current App.js content and showcase eight core sections: Navigation, Hero, Evidence Gap, VeriCase Difference, Intelligent Evidence Hub (DMS), Construction Add‑In (dark), Accessible for Every Dispute, and Footer. The UI will strictly follow the approved design system (Slate Navy #1E293B, Forensic Teal #0D9488, Neutral Grey #64748B) with Inter typography and Shadcn UI primitives for consistency, accessibility, and velocity. A functional Login button will be implemented using a Shadcn Dialog (mocked for now) to be wired to real auth later. Provided assets (Logo2.jpg, ChronologyLens1jpg.jpg) will be incorporated per guidelines while maintaining the hero’s CSS‑only visualization for the Project Chronology Lens™.

## 2) Objectives
- Deliver a sophisticated, trustworthy Legal-Tech landing page that cleanly communicates VeriCase’s value.
- Implement all 8 sections with responsive behavior (mobile/tablet/desktop), generous whitespace, and strong hierarchy.
- Enforce design tokens and consistent component usage (Shadcn UI) for fast iteration and future scalability.
- Provide a functional Login button via Dialog (email/password inputs + non-blocking mocked action) to satisfy “functional now, integrate later.”
- Integrate uploaded assets: use Logo2.jpg in navigation; feature ChronologyLens1 image tastefully (non‑hero) while hero visualization remains CSS‑based per spec.
- Ensure accessibility (WCAG-friendly contrast, keyboard navigation, focus states) and testability via data-testid attributes.

## 3) UI/UX Design Guidelines (Applied)
- Color usage (per guidelines):
  - Headings, dark section backgrounds: #1E293B (Slate Navy)
  - Primary CTAs, highlights, tags: #0D9488 (Forensic Teal)
  - Body text: #64748B (Neutral Grey)
  - Surfaces: #FFFFFF; Light sections: #F8FAFC; Borders: #E2E8F0
- Typography:
  - Inter only. H1 64–72px (800), H2 36–42px (700), H3 20–24px (600), body 16px base in Neutral Grey.
- Layout and spacing:
  - Container max-width: 1200px (or Tailwind max-w-7xl equivalent), centered; section spacing ~py-24 lg:py-32.
  - Flex/Grid used throughout (3-col hero: text | visual | stats; 3x2 features grid; 1x3 audience cards).
- Components:
  - Use Shadcn UI: Button, Card, Dialog, Badge, Tabs/Separator as needed.
  - All interactive elements must have hover/focus-visible/active/disabled states.
- Gradients and backgrounds:
  - Subtle grid pattern in hero using CSS; no heavy gradients; gradients limited to <20% of viewport if used at all.
- Testability:
  - Every actionable or critical content element includes data-testid (e.g., header-request-demo-btn, navbar-login-btn, hero-primary-cta, login-submit-btn).
- Accessibility:
  - Semantic landmarks, aria-labels where needed, keyboard navigable Dialog, sufficient contrast, visible focus.

## 4) Implementation Steps (Phased)

Phase 1 — Foundation (In Progress)
1. Global design tokens: ensure CSS variables in src/index.css (or brand.css) reflect the palette and shadows from guidelines.
2. Import Inter in index.html or index.css; verify typography scale via utility classes and/or scoped CSS.
3. Asset wiring: reference uploaded assets via their public URLs; define constants for asset URLs for maintainability.

Phase 2 — Navigation + Header
4. Create <Navigation /> component with:
   - Left-aligned brand logo (Logo2.jpg from uploaded URL)
   - Nav links (Platform, Construction, Pricing, About Us)
   - Right-aligned CTAs: Request Demo (primary), Login (secondary/ghost) → opens Dialog
   - Sticky header, subtle bottom border (#E2E8F0)

Phase 3 — Hero (CSS visual + CTAs + Stats)
5. Build 3-column hero layout:
   - Left: caption, H1, paragraph, primary/secondary CTAs
   - Center-right: CSS-only Project Chronology Lens™ card with labeled timelines and accent bars (one highlighted: “Key Email: Delay Notice”)
   - Right: stacked stats cards (“80%…”, “$…”) in Forensic Teal accent
   - Light grid background via repeating-linear-gradient and border tokens

Phase 4 — Evidence Gap + VeriCase Difference
6. Evidence Gap: headline + explanatory body, generous padding.
7. VeriCase Difference: centered H2/subtitle; 3x2 features grid; each feature = icon placeholder (teal SVG), H3 + description.

Phase 5 — Intelligent Evidence Hub (DMS)
8. Full-width light background; two columns (content left, visual right).
9. Content: caption, H2, body, bullets (OCR & Full-Text Indexing; AI Tagging & Mass Querying) with icon placeholders.
10. Visual: white card with two panels: left “scanned doc” mock (OCR highlights via semi-transparent teal blocks) and right AI Insights (entities, pill tags, OCR status Complete & Indexed).

Phase 6 — Construction Add‑In (Dark Mode)
11. Full-width #1E293B background; white headers, #CBD5E1 body copy.
12. Two columns: left content (caption, H2, body, white button), right visual card with simplified Gantt (baseline grey vs actual teal), linked evidence & delay tags below.
13. Add dashed connector arrow from Gantt to evidence list using SVG.

Phase 7 — Audience + Footer
14. Accessible for Every Dispute: 1x3 Cards (Law Firms & Arbitrators; Claims Consultants & Experts; Contractors & In-House Counsel).
15. Footer: Logo + tagline + 3 link columns; light or bg-light background; copyright.

Phase 8 — Login Dialog & Interactivity
16. Login Dialog (Shadcn Dialog): email + password inputs, Submit (primary) and Close (secondary), mocked success toast; maintain validation hints.
17. Add Sonner toaster for feedback; integrate data-testid across all interactive elements.

Phase 9 — Responsiveness, QA, and Polish
18. Tablet/mobile stacks: hero stacks, feature grids reduce to 2 / 1 columns, cards adapt; verify min 44x44px touch targets.
19. A11y checks: focus order, escape to close dialog, aria roles/labels.
20. Performance pass: image decoding=async, width/height attributes, avoid layout shift, reduce shadow usage on mobile; verify no console errors.

## 5) Technical Details
- Tech/Libs: React (existing), Tailwind + Shadcn UI primitives already present in project.
- File structure (proposal):
  - src/App.js (mount all sections)
  - src/components/sections/Navigation.jsx
  - src/components/sections/Hero.jsx
  - src/components/sections/EvidenceGap.jsx
  - src/components/sections/Difference.jsx
  - src/components/sections/EvidenceHub.jsx
  - src/components/sections/ConstructionAddIn.jsx
  - src/components/sections/Accessible.jsx
  - src/components/sections/SiteFooter.jsx
  - src/components/visuals/ProjectChronologyLens.jsx (CSS-only)
  - src/components/visuals/GanttChart.jsx (baseline vs actual bars, dashed arrow)
  - src/components/common/Tag.jsx (pill component variants)
  - src/styles/brand.css (optional; or extend index.css)
- Assets (via uploaded public URLs):
  - Logo: https://customer-assets.emergentagent.com/job_smart-evidence/artifacts/3mjzkyva_Logo2.jpg
  - Chronology Lens Image (used as supporting visual in Difference or Evidence Hub): https://customer-assets.emergentagent.com/job_smart-evidence/artifacts/vly647vf_ChronologyLens1jpg.jpg
- Data-testids: Include on all buttons, inputs, critical headings, cards, and toast containers (e.g., data-testid="navbar-login-btn", "login-submit-btn", "hero-primary-cta").
- Accessibility: Dialog must trap focus, close on ESC, provide aria-labelledby/aria-describedby.
- Styling tokens reference:
  - Primary Dark: #1E293B; Accent: #0D9488; Body: #64748B; BG Light: #F8FAFC; Surface: #FFFFFF; Border: #E2E8F0; Shadows per design guidelines.
- Routing: Keep single-page structure for now; login is a Dialog (no route change). A future /login route can be added without breaking this layout.
- Env: Do not modify REACT_APP_BACKEND_URL; no API calls for auth yet (mock only).

## 6) Next Actions (Awaiting Confirmation)
- Confirm the dual approach for the hero:
  - Keep hero visualization as CSS-only per spec, and use the uploaded ChronologyLens image in a supporting section (Difference/Evidence Hub). If you prefer the image in hero instead, confirm and we’ll adapt.
- Confirm logo usage: use uploaded Logo2.jpg across header/footer (replacing SVG placeholder). 
- Approve proposed file/component structure and proceed to build Phase 1–3 immediately.

## 7) Success Criteria
- Visual fidelity to design guidelines (typography, colors, spacing, states) and premium B2B aesthetic.
- All 8 sections implemented, responsive, and accessible (keyboard + screen reader friendly).
- Functional Login button: opens Dialog, accepts input, shows mocked success toast, closes as expected.
- Proper use of tokens; no hardcoded magic values outside tokens; gradients within constraints.
- No console errors; Lighthouse/axe pass on major issues; assets load efficiently; hero renders CSS visualization correctly.
- Every interactive/critical element has a data-testid.
