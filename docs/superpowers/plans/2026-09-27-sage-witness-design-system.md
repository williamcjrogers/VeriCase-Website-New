# Sage-as-Witness Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the VeriCase marketing site's design system (guidelines doc + design tokens + shared UI primitives) with the "Sage-as-witness" brand system derived from the Datum & Register positioning, without touching section content or breaking current rendering.

**Architecture:** Three layers, migrated in order: (1) the governing document `design_guidelines.md` is rewritten as the new system of record; (2) the token foundation (`frontend/src/index.css` + `frontend/tailwind.config.js`) gains the new palette, fonts, radii and motion utilities *alongside* legacy tokens, which stay functional but deprecated; (3) the three shared primitives every section consumes (`button.jsx`, `card.jsx`, `badge.jsx`) are restyled onto the new tokens. Section-level redesign (137 legacy class occurrences across 11 files, inline `var(--vericase-*)` styles, Playfair Display in `Accessible.jsx`/`EvidenceHub.jsx`) is explicitly **out of scope** and sequenced as a follow-up plan after copy passes the copy-interrogation loop.

**Tech Stack:** React 18 + CRA/craco, Tailwind CSS 3.4, shadcn/ui (class-variance-authority), Google Fonts CDN (IBM Plex Sans + IBM Plex Mono). No new npm dependencies.

**Spec:**
- `Research/compass_artifact_wf-33d90c11-78f6-538e-8571-950252fe9362_text_markdown.md` — the Datum & Register positioning brief this plan argues from (palette roles §8c, typography direction §9, cliché bans §4, metaphor scores §7).
- Brand decision record (below) — the archetype ruling the guidelines doc encodes.

## Brand Decision Record

- **Archetype:** Sage, cast as the *expert witness / registrar*, not the oracle. VeriCase does not uncover truth (Everlaw/Relativity own the word; tribunals find facts) and does not rule (Ruler signals = navy-and-gold, luxury materials, premium pricing — all rejected by the positioning). It preserves the record from which truth is found. Ruler survives only as *method* (order, sequence, standards), never as *stance* (status, command, premium).
- **Five core adjectives:** **Exact** (exact because standard, not expensive — OS benchmark, ISO 8601, bundle pagination), **Impartial** (the record has no personality; no advocacy in type or colour), **Verifiable** (every visual claim has a product counterpart; seal renders only when hash + timestamp verify), **Sequential** (time as the organising idea; append-only register), **Working-grade** (Mitutoyo/Bloomberg Terminal, not Leica/Braun; un-luxurious exactness).
- **Governing design principle for a skeptical legal audience:** design is testimony. Ornament = advocacy = doubt. Consistency = credibility. Every element must survive the question "why is this here?"

## Global Constraints

Every task's requirements implicitly include this section.

- **No gradients anywhere** on the marketing surface. This supersedes the old "20% of viewport" rule.
- **No high-contrast editorial serif.** Ruled out by name: Playfair Display, TWK Ghost style faces. Also ruled out as generic-SaaS tells: Inter, Geist, Diatype. Space Grotesk and Manrope are retired (geometric-friendly = occupied territory).
- **Seal red `#C8341C`** renders only for a cryptographically verified state and the benchmark mark at "now"; ≤2% of any surface; never for CTAs, links, or errors.
- **Time is encoded by position, never by hue.** Sequence density uses graphite tints only.
- **WCAG 2.2 AA:** ≥4.5:1 body text, ≥3:1 large text and non-text UI.
- **British English, £ pricing, ISO 8601 dates** with a UK-readable secondary format.
- **No new npm dependencies in this plan.** Fonts load via Google Fonts `@import` (existing pattern in `index.css`).
- **No scale/lift hover transforms; no universal `transition: all`.** Colour/opacity transitions only, ≤150ms.
- **Component conventions:** named exports for components, default exports for pages; `data-testid` on interactive elements.
- **Testing approach (adapted):** the project has no frontend test infrastructure (no `*.test.*` files, no testing-library dependencies) and project convention is not to add scaffolding for styling work. Verification per task is: `yarn build` passes, targeted `grep` checks pass, contrast values re-derived, and a dev-server visual smoke check. Where a task cannot be test-driven, its acceptance checks are listed as explicit commands.

---

### Task 1: Rewrite `design_guidelines.md` as the Sage-witness system

**Files:**
- Modify: `design_guidelines.md` (full replacement of all 1369 lines)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: the rules document every later task and the `design-compliance-auditor` agent enforce. Token names it legislates (`bond`, `ink`, `record`, `rule`, `seal`, `graphite/60/30`, `font-heading`, `font-body`, `font-mono`, `.data-text`, `.transition-tick`) are created in Task 2 and consumed in Task 3.

- [ ] **Step 1: Replace `design_guidelines.md` with the complete new system**

Write the file with exactly this content:

````markdown
# VeriCase Design System — Sage-as-Witness ("Datum & Register")

## 1. Design Philosophy

**Archetype:** The Sage, cast as the expert witness. VeriCase does not declare truth and does not rule; it preserves the contemporaneous record from which a tribunal finds facts. Order is the brand's method, never its stance.

**Five brand adjectives:** Exact · Impartial · Verifiable · Sequential · Working-grade

**Governing principle:** For a skeptical legal audience, design is testimony. Ornament = advocacy = doubt. Consistency = credibility. Every element must survive the question "why is this here?". Nothing decorative that cannot be justified as evidence.

**Anti-signals (never):** luxury materials, law-firm-lobby photography, hi-vis construction stock, AI sparkles, personified AI, navy-and-gold, scales/gavels, block/chain/hexagon imagery, neon-on-black, bento-grid generic-SaaS styling.

---

## 2. Gradient Rule

**Gradients are banned.** No gradient backgrounds, gradient text, gradient buttons, or gradient overlays, at any size, on any surface. This supersedes all previous "20% viewport" guidance. The only permitted colour transitions are discrete state changes (e.g. unsealed → sealed) rendered as hard swaps, not blends.

---

## 3. Colour System

Colour does functional work, never brand decoration. Recognition is carried by shape (the chronology spine), not colour.

### 3.1 Token roles

| Token | Value | Role | Contrast on `#FFFFFF` |
|---|---|---|---|
| `bond` | `#FFFFFF` | Surface. White bond paper. | — |
| `ink` | `#1A1A1A` | Graphite. UI text, logo, primary hover. | ≈17.4:1 |
| `record` | `#1F2A44` | Registrar blue-black. Record text, primary actions, links, focus ring. | ≈14.3:1 |
| `rule` | `#8A8F98` | Survey grey. Spine graduations, hairline dividers, non-text marks only. | ≈3.2:1 (non-text only) |
| `seal` | `#C8341C` | Vermilion seal. **Verified state and benchmark mark ONLY.** | ≈5.3:1 |
| `graphite-60` | `#767676` | Sequence density, secondary text on `bond`. | ≈4.9:1 |
| `graphite-30` | `#BABABA` | Sequence density, disabled affordances (never text). | decorative only |
| muted text | `#5A5F68` | Captions, secondary copy. | ≈6.4:1 |

### 3.2 The seal rule (highest-priority colour law)

- `seal` renders **only** when a record has a hash and timestamp token that verify, plus the benchmark mark at "now".
- Budget: ≤2% of any rendered surface.
- Never: CTAs, links, hover states, errors, badges of honour, decorative emphasis.
- Errors use destructive crimson `#B91C1C`, never `seal`.

### 3.3 Functional colour rules

- Time is encoded by **position** on the spine, never by hue.
- State is encoded by **shape first, label second, colour third**: ● filled vermilion = sealed; ○ outline graphite = received, unsealed; ◐ = disputed/annotated. Superseded entries stay visible with a revision letter; nothing is struck out.
- Party colours: Okabe–Ito colour-blind-safe categorical set, always paired with a text label or initials. Never red-vs-green.
- Everything must survive a photocopier: the system works in pure monochrome.

### 3.4 Deprecated tokens (scheduled for removal in the section-migration plan)

Still present for legacy sections; **do not use in new work**: Tailwind `teal-*`, `coral-*`, `orange-*` brand usage; `--color-teal-*`, `--color-coral-*`, `--color-orange-*`, all `--vericase-*` custom properties; the `.text-gradient-teal` utility.

---

## 4. Typography

One grotesk + one true monospace companion. The display type is data.

### 4.1 Families

- **Grotesk (everything):** IBM Plex Sans — headings and body. Weights 400/500/600/700.
- **Mono (proof layer):** IBM Plex Mono — ISO 8601 timestamps, register IDs (`VC-000417`), short hashes (`sha256:9f2c…e41a`), verification tokens, eyebrow labels. Weights 400/500/600.
- Must-haves verified at license time: tabular lining figures, a dotted/slashed zero distinct from `O`, unambiguous `I l 1`, small-size legibility.
- **Never:** any serif; Inter, Geist, Diatype (generic-SaaS); Space Grotesk, Manrope (retired).
- Upgrade path when licensing budget exists: GT Standard + GT Standard Mono, Atlas Grotesk + Atlas Typewriter, or Maison Neue + Maison Neue Mono. Swap at the token level only.
- Lettering reference for labels: ISO 3098 technical-drawing lettering — mono, uppercase, letter-spaced.

### 4.2 Utilities

- `.data-text` — mono + `tabular-nums` + `font-feature-settings: "tnum", "zero"`. Mandatory for every date, ID, amount and hash.
- Eyebrow labels: `font-mono uppercase tracking-wider text-xs` in muted text colour.
- Dates render ISO 8601 first (`2026-09-27T14:03:11Z`), with UK-readable secondary on hover or print ("27 Sep 2026, 14:03 BST").

### 4.3 Scale (unchanged rhythm, new families)

| Element | Mobile | Desktop | Weight | Notes |
|---|---|---|---|---|
| H1 | 36px | 60px | 700 | `tracking-tight`, `leading-tight` |
| H2 | 30px | 48px | 700 | as above |
| H3 | 24px | 36px | 600 | |
| H4 | 20px | 30px | 600 | |
| Subhead | 16px | 20px | 500 | `leading-relaxed` |
| Body | 16px | 16px | 400 | `leading-relaxed` |
| Small | 14px | 14px | 400 | |
| Caption / data | 12px | 12px | 500 mono | `.data-text` |

Body copy never center-aligned (reading-flow rule).

---

## 5. Spacing

8px baseline grid; everything snaps to it. Alignment so regular it invites checking — measured, like the datum the brand references.

### 5.1 Dual density

- **Marketing surfaces — generous (examination room, not luxury):** sections `py-20 md:py-28 lg:py-32`; hero `py-24 md:py-32 lg:py-40`; card padding `p-8 md:p-10`; grid gaps `gap-8 md:gap-10 lg:gap-12`; container `px-6 md:px-8 lg:px-12`, `max-w-7xl`.
- **Working surfaces — dense but ordered (Bloomberg-terminal trust):** tables, registers, metadata panels use `px-3 py-2` cells on a 4px sub-grid; vertical rhythm as regular as site-diary ruling. Density is credible where it does work.
- **Never cramped.** Cramped reads as hiding something.
- Whitespace is room to examine, like a bundle's margins — not the airy emptiness of a luxury brochure.

---

## 6. Components

### 6.1 Buttons

- Radius: 2px (`rounded-md` under `--radius: 0.25rem`). No pill buttons.
- No shadows. No scale, lift, or glow on hover. Colour/opacity transition only, ≤150ms.
- **Primary:** `record` background, white text, `ink` on hover. **Secondary:** hairline outline (`border-input`), surface hover. **Destructive:** `#B91C1C`, reserved for genuine destructive actions.
- Focus: 2px `record` ring, 2px offset — always visible.
- Labels: sentence case, grotesk 600. No mono, no uppercase on buttons.

### 6.2 Cards

- Hairline border (`border-border`), 2px radius, **no shadow** (shadows are lift rhetoric). Border colour deepens on hover; nothing moves.

### 6.3 Badges / status labels

- Mono, uppercase, tracked (`font-mono uppercase tracking-wider text-xs`). This is the register-number voice.
- Sealed status: `seal` filled dot + label; the dot only renders on verified records (§3.2).

### 6.4 Data tables / registers

- Dense density (§5.1), `rule` hairlines between rows, header row in mono uppercase labels, all dates/IDs/amounts in `.data-text`, left-aligned text, right-aligned figures.

### 6.5 Test IDs

`data-testid` on all interactive and key informational elements, kebab-case by role (`hero-primary-cta`, `pricing-card-professional`).

---

## 7. Motion

- **The mechanical tick:** state changes use hard, fast transitions — colour/opacity only, ≤150ms, `steps()` or linear timing. Like a counter stepping.
- **Banned:** scale/lift hovers, parallax, glow, particle effects, bouncy easing, universal `transition: all`.
- Scroll entrances: opacity-only, ≤200ms, no translation. When in doubt, no motion.

---

## 8. Accessibility

- WCAG 2.2 AA: ≥4.5:1 body text, ≥3:1 large text and non-text components.
- Passing pairs (verified): `ink` on `bond` 17.4:1 · `record` on `bond` 14.3:1 · white on `record` 14.3:1 · muted `#5A5F68` on `bond` 6.4:1 · `graphite-60` on `bond` 4.9:1.
- `rule` `#8A8F98` at 3.2:1: non-text marks only (spine ticks, dividers), never text.
- `seal` at 5.3:1 passes for text but is reserved by the seal rule — do not use it as text colour.
- Focus states: 2px `record` ring with 2px offset on every interactive element; keyboard-navigable everything; ARIA labels on icon-only controls; 44px touch targets.

---

## 9. Imagery & Iconography

- Documentary monochrome photography only; working tools and records, not lobbies or luxury.
- No hi-vis, hard hats, cranes, BIM renders, blueprint blue, marble, columns.
- Icons: Lucide React, stroke weight as shipped (thin, functional). No emoji as icons.
- The signature asset is the chronology spine with its vermilion benchmark mark; it appears as logo crop, layout margin rule, and (in product) the chronology view itself.

---

## 10. Voice & UK Specifics

- British English (`organisation`), £ pricing, ISO 8601 dates with UK-readable secondary.
- Confidence without superlatives: claim only what the product can prove. Banned words: "truth", "immutable", "ledger", "precision" (all occupied or overclaiming). Preferred: contemporaneous, provenance, integrity, tamper-evident, chain of custody, fixed at a verifiable time.

---

## 11. Common Mistakes

**Never:** gradients · serifs · pill buttons · hover scale/lift · shadows on cards · `seal` red for anything but verified state · colour-coded time · centered body copy · cramped data surfaces · superlative claims · `$` pricing · US spellings · emoji icons · Inter/Geist-style default sans.

**Always:** `.data-text` for dates/IDs/hashes · 8px grid · hairline borders · mono uppercase for labels · focus rings · `data-testid` · photocopier-safe monochrome.

---

## 12. Migration Status

- Sections under `frontend/src/components/sections/` predate this system and carry deprecated tokens (§3.4) pending the section-migration plan. They are non-conforming by designation, not by accident. All **new** components and primitives conform fully.
````

- [ ] **Step 2: Verify no stale system references survive in the doc**

Run: `grep -nE "fonts.googleapis.com/css2\?family=Space|#069494|#FF7F50|#FD5901" design_guidelines.md`
Expected: no matches (exit code 1 from grep). The old system's font-import URL and brand hex values must be gone; font and colour *names* may still appear inside prohibition/deprecation sentences, which is correct.

- [ ] **Step 3: Commit**

```bash
git add design_guidelines.md docs/superpowers/plans/2026-09-27-sage-witness-design-system.md
git commit -m "docs: replace design guidelines with Sage-as-witness (Datum & Register) system"
```

---

### Task 2: Font and design-token foundation

**Files:**
- Modify: `frontend/tailwind.config.js` (full replacement)
- Modify: `frontend/src/index.css` (full replacement)

**Interfaces:**
- Consumes: token names legislated in Task 1.
- Produces (consumed by Task 3 and all future section work): Tailwind colours `bond`, `ink`, `record`, `rule`, `seal`, `graphite.{DEFAULT,60,30}`; font families `font-sans`/`font-heading`/`font-body` (all IBM Plex Sans) and `font-mono` (IBM Plex Mono); utilities `.data-text` and `.transition-tick`; shadcn CSS vars remapped (`--primary` → registrar blue-black, `--ring` → record, `--muted-foreground` → `#5A5F68`, `--radius` → `0.25rem`, `--destructive` → `#B91C1C`). Legacy `--vericase-*` vars and `.text-gradient-teal` **remain exported** (deprecated) so `Accessible.jsx`, `Difference.jsx`, `EvidenceHub.jsx`, `ValuePropositions.jsx`, `HowItWorks.jsx`, `Benefits.jsx` keep rendering unchanged.

- [ ] **Step 1: Replace `frontend/tailwind.config.js`**

Full replacement content:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			bond: '#FFFFFF',
  			ink: '#1A1A1A',
  			record: '#1F2A44',
  			rule: '#8A8F98',
  			seal: '#C8341C',
  			graphite: {
  				DEFAULT: '#1A1A1A',
  				'60': '#767676',
  				'30': '#BABABA'
  			}
  		},
  		fontFamily: {
  			sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
  			heading: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
  			body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
  			mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
```

- [ ] **Step 2: Replace `frontend/src/index.css`**

Full replacement content (note: legacy block deliberately retained and marked deprecated — sections depend on it):

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        /* Sage-as-witness tokens */
        --background: 0 0% 100%;
        --foreground: 0 0% 10%;
        --card: 0 0% 100%;
        --card-foreground: 0 0% 10%;
        --popover: 0 0% 100%;
        --popover-foreground: 0 0% 10%;
        --primary: 222 37% 19%;
        --primary-foreground: 0 0% 100%;
        --secondary: 210 10% 96%;
        --secondary-foreground: 0 0% 10%;
        --muted: 210 10% 96%;
        --muted-foreground: 219 7% 38%;
        --accent: 210 10% 96%;
        --accent-foreground: 0 0% 10%;
        --destructive: 0 74% 42%;
        --destructive-foreground: 0 0% 98%;
        --border: 210 8% 86%;
        --input: 210 8% 86%;
        --ring: 222 37% 19%;
        --radius: 0.25rem;

        /* DEPRECATED — retained for pre-migration sections (Accessible, Difference,
           EvidenceHub). Do not use in new work. Removal is part of the
           section-migration plan. Values for text-secondary and accent-teal were
           darkened 2026-09-27 as P1 contrast hotfixes (measured 4.46:1 and 2.83:1
           on #F0F9FF; new values measure ~7.2:1 and 5.44:1). */
        --vericase-primary-dark: #1E293B;
        --vericase-accent-teal: #057676;
        --vericase-text-secondary: #475569;
        --vericase-bg-light: #F0F9FF;
        --vericase-border: #E2E8F0;
        --vericase-surface: #FFFFFF;
        --vericase-caption: #CBD5E1;
    }
}

@layer base {
    * {
        @apply border-border;
    }
    body {
        margin: 0;
        font-family: 'IBM Plex Sans', system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        @apply bg-white text-foreground;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: 'IBM Plex Sans', system-ui, sans-serif;
    }
}

@layer utilities {
    /* DEPRECATED — used by ValuePropositions, HowItWorks, Benefits.
       Removal is part of the section-migration plan. */
    .text-gradient-teal {
        background: linear-gradient(135deg, #069494 0%, #057676 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
}

/* Proof-layer and motion utilities. Deliberately NOT inside @layer:
   Tailwind tree-shakes hand-authored @layer styles until first use, and
   these must ship in the production CSS before any component references
   them (first consumers arrive in the section-migration plan). */

/* Proof-layer typography: dates, IDs, amounts, hashes */
.data-text {
    @apply font-mono tabular-nums;
    font-feature-settings: "tnum" 1, "zero" 1;
}

/* The mechanical tick: hard state swaps, colour/opacity only */
.transition-tick {
    transition-property: color, background-color, border-color, opacity;
    transition-duration: 120ms;
    transition-timing-function: steps(2, jump-none);
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `cd frontend && yarn build`
Expected: `Compiled successfully.` and a `build/` output with no Tailwind errors.

- [ ] **Step 4: Verify legacy exports survived**

Run: `grep -c "vericase-" frontend/src/index.css && grep -c "text-gradient-teal" frontend/src/index.css`
Expected: `7` then `1` (the deprecated block is intact — legacy sections must render unchanged).

- [ ] **Step 5: Verify the retired fonts are gone from source**

Run: `grep -rn "Space Grotesk\|Manrope" frontend/src frontend/tailwind.config.js`
Expected: no matches.

- [ ] **Step 6: Commit**

```bash
git add frontend/tailwind.config.js frontend/src/index.css
git commit -m "feat: add Sage-witness design tokens (Plex type, register palette, tick motion)"
```

---

### Task 3: Restyle shared primitives (button, card, badge)

**Files:**
- Modify: `frontend/src/components/ui/button.jsx:8-28`
- Modify: `frontend/src/components/ui/card.jsx:8` and `frontend/src/components/ui/card.jsx:24`
- Modify: `frontend/src/components/ui/badge.jsx:7-19`

**Interfaces:**
- Consumes (from Task 2): `--primary` (record), `--ring` (record), `--radius` (`0.25rem` → `rounded-md` = 2px), `bg-ink`, `font-mono`, `transition-tick`.
- Produces: the same component APIs (`Button`/`buttonVariants`, `Card`…, `Badge`/`badgeVariants`) with unchanged prop signatures — call sites need no changes.

- [ ] **Step 1: Restyle `button.jsx` variants**

In the `buttonVariants` cva call, make exactly these replacements:

Replace the base string (first argument to `cva`):
```js
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
```
with:
```js
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-tick focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
```

Replace the `default` variant:
```js
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
```
with:
```js
        default:
          "bg-primary text-primary-foreground hover:bg-ink",
```

Replace the `destructive` variant:
```js
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
```
with:
```js
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
```

Replace the `outline` variant:
```js
        outline:
          "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
```
with:
```js
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
```

Replace the `secondary` variant:
```js
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
```
with:
```js
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
```

(Rationale: shadows are lift rhetoric; `transition-tick` replaces the eased `transition-colors` to satisfy the mechanical-tick motion law; the ring moves to the legislated 2px + 2px offset; and the remapped `--radius` delivers the 2px corner automatically.)

- [ ] **Step 2: Restyle `card.jsx` root and title**

Replace the `Card` root className:
```js
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
```
with:
```js
    className={cn("rounded-md border bg-card text-card-foreground", className)}
```

Replace the `CardTitle` className:
```js
    className={cn("font-semibold leading-none tracking-tight", className)}
```
with:
```js
    className={cn("font-heading font-semibold leading-none tracking-tight", className)}
```

- [ ] **Step 3: Restyle `badge.jsx` base and variants**

Replace the `badgeVariants` base string:
```js
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
```
with:
```js
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-mono font-medium uppercase tracking-wider transition-tick focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
```

Replace the `default` variant:
```js
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
```
with:
```js
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
```

Replace the `destructive` variant:
```js
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
```
with:
```js
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
```

- [ ] **Step 4: Verify the build compiles**

Run: `cd frontend && yarn build`
Expected: `Compiled successfully.`

- [ ] **Step 5: Verify banned patterns are out of the primitives**

Run: `grep -nE "shadow|rounded-full|scale-|rounded-xl" frontend/src/components/ui/button.jsx frontend/src/components/ui/card.jsx frontend/src/components/ui/badge.jsx`
Expected: no matches.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/ui/button.jsx frontend/src/components/ui/card.jsx frontend/src/components/ui/badge.jsx
git commit -m "feat: restyle shared primitives to Sage-witness system (hairline, 2px, no lift)"
```

---

### Task 3A: P0/P1 accessibility hotfix batch (from the 2026-09-27 design review)

**Files:**
- Modify: `frontend/src/components/sections/Navigation.jsx` (CTA colours; mobile menu button accessible name)
- Modify: `frontend/src/components/sections/HowItWorks.jsx` (CTA colour, around lines 69-77)
- Modify: `frontend/src/pages/Login.jsx` (CTA colour ~line 40; toggle link ~line 62)
- Modify: `frontend/src/components/sections/SiteFooter.jsx` (social link accessible names, around lines 22-30)

**Interfaces:**
- Consumes (from Task 2): `bg-record`, `text-record`, `hover:bg-ink` tokens.
- Produces: P0 contrast clearance on all primary CTAs (white on `#1F2A44` = 14.3:1) and accessible names on icon-only controls. Findings deliberately NOT in scope (rulings recorded in the ledger): functional mobile menu rendering, footer dead-link pruning, the raw-IP "Analysis Login" destination, and a request-demo path — all require product/content decisions and route to the section-migration plan.

- [ ] **Step 1: Fix the three P0 contrast failures on CTAs**

In `Navigation.jsx`, on the "Get Started" and "Open App" buttons (around lines 101 and 134): replace every `bg-teal-600` with `bg-record` and every `hover:bg-teal-700` (or `hover:bg-teal-500`, whichever is present) with `hover:bg-ink`.

In `HowItWorks.jsx` (the "Start Your Free Trial" CTA, around lines 69-77): replace the teal gradient background classes (e.g. `bg-gradient-to-r from-teal-600 to-teal-500` — read the file for the exact classes) with `bg-record`, and any teal hover class with `hover:bg-ink`.

In `Login.jsx`: on the primary CTA (~line 40) apply the same `bg-record hover:bg-ink` replacement; on the "Register"/"Login" toggle link (~line 62) replace `text-teal-600` with `text-record`.

- [ ] **Step 2: Add accessible names to icon-only controls**

In `Navigation.jsx` on the mobile menu button (around lines 76-81): add `aria-label="Menu"` and `aria-expanded={isOpen}` (use the component's existing open-state variable — read the file for its name; if none exists, add `aria-label` only).

In `SiteFooter.jsx` (around lines 22-30): add a descriptive `aria-label` to each of the three social icon links (e.g. `aria-label="VeriCase on LinkedIn"`, matching each icon's actual destination).

- [ ] **Step 3: Verify the build compiles**

Run: `cd frontend && yarn build`
Expected: `Compiled successfully.`

- [ ] **Step 4: Verify the hotfixes**

Run each and confirm:
- `grep -n "bg-teal-600\|from-teal" frontend/src/components/sections/Navigation.jsx frontend/src/components/sections/HowItWorks.jsx frontend/src/pages/Login.jsx` → no matches in the CTA locations edited (other teal uses elsewhere in these files are legacy section styling and expected until the section-migration plan — verify only the edited CTA elements no longer carry them).
- `grep -n 'aria-label="Menu"' frontend/src/components/sections/Navigation.jsx` → one match.
- `grep -c "aria-label" frontend/src/components/sections/SiteFooter.jsx` → at least 3.
- White on `#1F2A44` measures ≈14.3:1 (recorded in Task 2) — P0 contrast items cleared.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/sections/Navigation.jsx frontend/src/components/sections/HowItWorks.jsx frontend/src/components/sections/SiteFooter.jsx frontend/src/pages/Login.jsx
git commit -m "fix: clear P0 CTA contrast failures and name icon-only controls (design-review hotfixes)"
```

---

### Task 4: Verification sweep

**Files:**
- No files modified unless a check fails; fixes land in the responsible task's file.

**Interfaces:**
- Consumes: everything from Tasks 1–3A.
- Produces: a verified foundation. If every check passes there is nothing to commit.

- [ ] **Step 1: Full production build**

Run: `cd frontend && yarn build`
Expected: `Compiled successfully.` with no new warnings about missing classes or fonts.

- [ ] **Step 2: Static ban sweep across primitives and tokens**

Run each and confirm the expected result:
- `grep -rn "linear-gradient" frontend/src/index.css` → exactly one match, the deprecated `.text-gradient-teal` block.
- `grep -rn "Space Grotesk\|Manrope\|Playfair" frontend/tailwind.config.js frontend/src/index.css` → no matches (Playfair remains only in the legacy section files `Accessible.jsx`/`EvidenceHub.jsx`, which is expected until the section-migration plan).
- `grep -n "seal" frontend/src/components/ui/*.jsx` → no matches (the seal token exists in config only; nothing may render it yet).
- Task 3A spot-checks: `grep -n 'aria-label="Menu"' frontend/src/components/sections/Navigation.jsx` → one match; `grep -c "aria-label" frontend/src/components/sections/SiteFooter.jsx` → at least 3; the CTA elements named in Task 3A Step 1 carry `bg-record`/`text-record`, not teal classes.

- [ ] **Step 3: Contrast spot-check**

Re-derive the two load-bearing ratios with any contrast tool (e.g. webaim.org/resources/contrastchecker):
- `#1F2A44` on `#FFFFFF` → expect ≈14.3:1 (passes AA for all text).
- `#5A5F68` on `#FFFFFF` → expect ≈6.4:1 (passes AA for body text).
Record the measured values in the task report; a deviation >0.2 from expected means a hex value drifted — find and fix it before continuing.

- [ ] **Step 4: Font specimen check**

Create `/tmp/plex-specimen.html`:

```html
<!doctype html>
<html><head><style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap');
body { font-family: 'IBM Plex Mono', monospace; font-size: 24px; font-feature-settings: "tnum" 1, "zero" 1; }
</style></head><body>
<p>Il1 | 0O o08 | VC-000417</p>
<p>2026-09-27T14:03:11Z</p>
<p>sha256:9f2c…e41a</p>
<p>0123456789 0123456789</p>
</body></html>
```

Open it in a browser (`open /tmp/plex-specimen.html`) and confirm: `I`, `l`, `1` are mutually distinct; `0` is dotted or slashed and unmistakable next to `O`; the two figure rows align column-for-column (tabular figures). If the zero is ambiguous, switch `fontFamily.mono` in `tailwind.config.js` and the `@import` in `index.css` to `Roboto Mono` (slashed zero) and re-run Task 2 Step 3. Delete the file afterwards.

- [ ] **Step 5: Dev-server visual smoke check**

Run: `cd frontend && yarn start`, open `http://localhost:3000`, and confirm:
1. Headings and body render in IBM Plex Sans (compare letterforms against the pre-change site — the geometric `g`/`a` quirks of Space Grotesk are gone).
2. The nav "Request Demo" button renders record blue-black (`#1F2A44`) with square(ish) 2px corners and no shadow; hover darkens to ink with no scale movement.
3. Sections otherwise look unchanged (teal/coral legacy styling still renders — expected until the section-migration plan; this check guards against accidental deletion of the deprecated exports).
4. Tab through the nav and hero: a visible 2px record-coloured focus ring appears on every interactive element.

- [ ] **Step 6: Report and (only if fixes were needed) commit**

Summarise each check's result in the task report. If any fix was required:

```bash
git add -u
git commit -m "fix: correct issues found in design-foundation verification sweep"
```

---

## Follow-up (not in this plan)

- **Section-migration plan:** 137 deprecated-class occurrences across 11 section files (`teal|coral|gradient|scale-105|rounded-full`), inline `var(--vericase-*)` styles in `Accessible.jsx`/`Difference.jsx`/`EvidenceHub.jsx`, and Playfair Display in `Accessible.jsx`/`EvidenceHub.jsx`. Sequence after copy passes the copy-interrogation loop, then delete the deprecated exports from `index.css` as that plan's final task.
