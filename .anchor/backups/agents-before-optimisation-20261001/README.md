# VeriCase Site-Optimisation Squad

A bespoke squad of agents and skills for optimising the VeriCase marketing website — copy, brand voice, conversion, SEO, accessibility, design compliance and performance.

## 1. What this is

Everything lives at project level so it **versions with git** and **auto-loads in new Kimi Code sessions**:

- `.agents/agents/` — project agents (delegated to as read-only sub-agents; each returns a self-contained report)
- `.agents/skills/` — project skills (workflow playbooks the main agent follows)

The website being optimised is a React (CRA + craco) + Tailwind + shadcn/ui + framer-motion site. Copy lives in `frontend/src/components/sections/*.jsx` (Navigation, Hero, EvidenceGap, EvidenceHub, ValuePropositions, Benefits, HowItWorks, Difference, Collaboration, Accessible, SiteFooter), assembled by `frontend/src/pages/LandingPage.jsx`. The canonical brand/design spec is `design_guidelines.md` at the repo root — every auditor in the squad reads it.

The squad is tuned to the VeriCase voice: confident, powerful, fast, intelligent — business outcomes over features, active verbs, no jargon, British English, £ pricing, UK construction-dispute context.

## 2. The roster

### Agents (`.agents/agents/`)

| Agent | What it does |
|---|---|
| **copy-interrogator** | Stress-tests a section's copy with a forensic question battery: clarity, specificity, sceptical-buyer objections, benefit-vs-feature, evidence of claims. |
| **copy-refiner** | Rewrites flagged copy in the VeriCase voice (confident, active, outcome-led) — proposed before/after edits, not applied silently. |
| **brand-voice-guardian** | Audits copy against the brand voice rules: no jargon (e.g. "PST"), no passives, no buzzwords, British English, £ pricing, GDPR awareness. |
| **conversion-strategist** | Reviews the page as a funnel: CTA hierarchy, message match, friction, trust signals for time-poor lawyers, claims consultants, QSs and adjudicators. |
| **seo-analyst** | Audits on-page SEO: titles, meta, headings, semantic structure, internal links, indexability of the CRA build. |
| **accessibility-auditor** | Audits against WCAG AA: contrast ratios from the design-system palette, focus states, ARIA, keyboard navigation, alt text. |
| **design-compliance-auditor** | Checks `frontend/src/` against `design_guidelines.md`: gradient restrictions, colour palette, spacing scale, typography, `data-testid` coverage. |
| **site-performance-analyst** | Reviews bundle size, image weight, animation cost, lazy loading and render performance of the landing page. |

### Skills (`.agents/skills/`)

| Skill | What it does |
|---|---|
| **copy-interrogation-loop** | Section-by-section workflow: interrogate copy → refine → re-check voice → report. The standard unit of copy work. |
| **website-optimisation-review** | Full-site sweep orchestrating the audit agents (voice, conversion, SEO, accessibility, design, performance) into one prioritised report. |

## 3. How to use

Agents and skills appear after **starting a new session** (or `/reload`). Then invoke naturally or explicitly:

```
Run the copy-interrogation-loop skill on the Hero section
Use the seo-analyst agent to audit the site
/skill:copy-interrogation-loop Hero
Ask the design-compliance-auditor to check EvidenceHub.jsx against design_guidelines.md
```

Section names map to files under `frontend/src/components/sections/` — e.g. "Hero" → `Hero.jsx`, "Value Propositions" → `ValuePropositions.jsx`.

All audit agents are read-only: they report; they never edit website source. Copy changes are proposed as diffs for you (or the main agent) to apply.

## 4. Suggested operating rhythm

- **Writing or changing copy in a section** → run `copy-interrogation-loop` on that section before committing.
- **Weekly / after significant edits** → run `brand-voice-guardian` and `accessibility-auditor` over the touched files.
- **Before each deploy** → run `website-optimisation-review` for a full sweep; fix blockers, triage the rest.
- **Quarterly** → re-run `seo-analyst` and `site-performance-analyst` even if nothing changed; baselines drift.

## 5. Extending the squad

- **`design_guidelines.md` is the source of truth.** The design and accessibility auditors read it directly — update that file, not the agents, when brand rules change (colours, spacing, tone, gradient rules).
- New agent: add a `.md` file in `.agents/agents/` with YAML frontmatter (`name`, `description`, optional `tools` — keep auditors read-only: `Read`, `Grep`, `Glob`) and a system-prompt body ending with the handoff statement (its final message is the complete report; the caller sees nothing else).
- New skill: add a `<skill-name>/SKILL.md` directory in `.agents/skills/` with `name` and `description` frontmatter (third person, WHAT + WHEN) and a workflow body; declare `arguments` (e.g. `[section]`) and reference them as `$section`.
- Keep everything specific to this repo: reference real paths and real copy (e.g. the Hero headline "Transform Complex Evidence Into Compelling Legal Arguments" in `frontend/src/components/sections/Hero.jsx:24`), and write in British English.
