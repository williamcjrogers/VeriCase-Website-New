---
name: website-optimisation-review
description: Full-site audit orchestrator for the VeriCase marketing website. Use for a full website review, site audit, optimise website request, pre-launch review, or marketing site check. Dispatches six specialist audit agents in parallel (design compliance, accessibility, SEO, conversion, brand voice, performance) and consolidates their reports into one prioritised backlog written to reviews/optimisation/.
whenToUse: User asks to review/audit/optimise the whole site, run a pre-launch check, or asks "is the website ready to launch/ship". Not for single-section edits — delegate those to the individual agent.
arguments: [scope]
---

# Website Optimisation Review

Orchestrate a full audit of the VeriCase marketing site. You coordinate; the six specialist agents (`.agents/agents/`) do the analysis. Never audit sections yourself — dispatch.

## Site context (brief every agent with this)

- Repo: `/Users/williamrogers/Projects/VeriCase-Website-New`. Source: `frontend/src/`.
- Pages: `pages/LandingPage.jsx` (renders sections Navigation → Hero → EvidenceGap → Collaboration → Difference → EvidenceHub → HowItWorks → Accessible → SiteFooter, all in `components/sections/`) and `pages/Login.jsx`. ValuePropositions.jsx and Benefits.jsx exist in sections/ but are NOT rendered by LandingPage — flag if this is unexpected.
- Canonical brand/design spec: `design_guidelines.md` (repo root) — gradient 20% rule, teal/coral palette, Space Grotesk headings + Manrope body, pill CTAs, £ (GBP), British English, generous spacing, `data-testid` on interactive elements, no emoji icons.
- Product: VeriCase, AI evidence platform for UK construction disputes. Buyers: dispute lawyers, claims consultants, forensic delay analysts, QS, adjudicators — sceptical, time-poor.
- Canonical messaging: tagline "Records, Records... VeriCase"; headline "Make Time Your Ally, Not Your Enemy"; subhead "From Chaos to Clarity in Construction Disputes". Voice: confident, active verbs, outcomes over features, no jargon (never "PST"), no buzzwords.
- 8 core value props (extract mass data instantly; true chronologies; intelligent indexing; fast adjudication responses; auto-select rebuttal evidence; contemporaneous records; all-in-one bundle/tag/fileshare; discuss heads of claim with team).

## 1. Establish scope

- $ARGUMENTS (`$scope`) may narrow the review (e.g. "hero only", "login page"). Default scope: **whole landing page + login page** — every section rendered by `LandingPage.jsx`, plus `Login.jsx`, `Navigation.jsx`, `SiteFooter.jsx`, and anything they import from `components/visuals/` and `components/ui/`.
- Confirm the section list by reading `frontend/src/pages/LandingPage.jsx` before dispatching; sections render order there is the audit order.

## 2. Dispatch in parallel

Dispatch all six agents in ONE parallel batch (AgentSwarm, or six parallel Agent calls — never sequentially). Each is read-only and returns a self-contained report. Tell each agent the agreed scope and instruct it to cite every finding as `file:line` with a concrete fix.

| Agent | File | Mandate in one line |
|---|---|---|
| design-compliance-auditor | `.agents/agents/design-compliance-auditor.md` | Conformance to design_guidelines.md (colour, gradients, typography, spacing, components, testids) |
| accessibility-auditor | `.agents/agents/accessibility-auditor.md` | WCAG 2.1 AA: contrast, focus states, ARIA, keyboard, alt text, motion |
| seo-analyst | `.agents/agents/seo-analyst.md` | Metadata, semantic HTML, indexability, performance-adjacent markup, UK search intent |
| conversion-strategist | `.agents/agents/conversion-strategist.md` | CTA hierarchy, persuasion flow, objection handling, buyer fit |
| brand-voice-guardian | `.agents/agents/brand-voice-guardian.md` | Copy vs brand voice, British English, £/GDPR, value-prop coverage |
| site-performance-analyst | `.agents/agents/site-performance-analyst.md` | Bundle weight, images, fonts, animation cost, render blocking |

If any agent file is missing or errors out, note it in the report as "agent unavailable" and continue with the rest — do not abort the review.

## 3. Consolidate

Merge the six reports into ONE backlog. Rules:

- **De-duplicate**: same root cause from two agents = one row, list both in "Source agent" (e.g. "accessibility-auditor + design-compliance-auditor").
- **Prioritise**:
  - **P0 launch-blocker** — broken functionality, unreadable text/contrast failures, missing page metadata, legal/compliance exposure (e.g. no privacy/GDPR link), CTAs that go nowhere.
  - **P1 high** — measurable damage to conversion, SEO, accessibility or brand credibility (e.g. emoji icons in `Hero.jsx:83-92` violating the icon rule; off-brand Playfair Display headline instead of Space Grotesk).
  - **P2 polish** — deviations with minor user impact.
- **Trade-offs**: where agents disagree (e.g. site-performance-analyst wants a heavy framer-motion visual removed that design-compliance-auditor considers on-brand), DO NOT pick a winner silently. Keep one row, mark it ⚖️ TRADE-OFF, and state both positions with their evidence so the owner decides.
- **Effort**: S = <30 min, M = half day, L = multi-day.

Backlog row format (Markdown table):

```
| Priority | Area | Finding | Evidence (file:line) | Fix | Effort S/M/L | Source agent |
```

## 4. Write the report

```bash
mkdir -p reviews/optimisation && date +%F
```

Write to `reviews/optimisation/site-review-<YYYY-MM-DD>.md` (use the real date from Bash). Structure:

1. Header: date, scope, agents run (and any unavailable).
2. Executive summary — 5-8 sentences: overall launch-readiness verdict, P0 count, dominant theme.
3. **Prioritised backlog** — the full merged table from step 3 (P0 first, then P1, then P2).
4. Quick wins — rows with Effort S and P0/P1 priority.
5. Per-agent summaries — each agent's headline verdict + its top 3 findings, attributed.
6. Trade-off register — every ⚖️ row with both positions.

## 5. Present in chat (concise — under 150 lines total)

Do NOT paste the full report. Show only:

- **P0 launch-blockers** — every one, verbatim from the backlog.
- **Top 10 P1s** — one line each (finding + file:line).
- **Quick wins** — S-effort, high-impact items.
- Pointer to the report path.
- Closing note: "Each specialist agent can also be run standalone for a focused re-check — e.g. delegate just the accessibility-auditor after fixing contrast issues."

End by asking which P0/P1 items to fix first.
