---
name: copy-interrogation-loop
description: Interrogate, question, challenge, refine, rewrite and improve website copy one section at a time. Dispatches the copy-interrogator, copy-refiner and brand-voice-guardian agents in sequence, presents CHALLENGE/FAIL verdicts, and writes a review report to reviews/copy/. Use whenever the user wants to sharpen, rewrite or audit VeriCase website copy, or says "interrogate the copy", "challenge the hero", "refine this section".
arguments:
  - section
---

# Copy Interrogation Loop

Question-then-refine workflow for VeriCase marketing copy. Run one section at a time; `$section` (default: `all sections`) is a section name (`Hero`, `ValuePropositions`) or a file path (`frontend/src/components/sections/Hero.jsx`).

Audience for every judgement: construction dispute lawyers, claims consultants, forensic delay analysts, quantity surveyors, adjudicators — sophisticated, sceptical, time-poor UK professionals.

## Embedded brand voice (agents must enforce these)

- Personality: confident, powerful, fast, intelligent, comprehensive — "nobody else can do this".
- DO: focus on business outcomes; active strong verbs; emphasise speed and intelligence; highlight unique capabilities; British English (organisation); £ (GBP) pricing; UK legal/construction context; GDPR awareness.
- DON'T: technical jargon (e.g. "PST"); passive or uncertain language; features over benefits; corporate buzzwords; downplaying capabilities.
- 8 core value props copy must map to: extract mass data at the blink of an eye; build true chronologies nobody else can; intelligently indexed for instant access; respond quickly in high-paced adjudications; auto-select evidence for rebuttals; uncover years of true contemporaneous records; all in one place (auto-bundle, tag evidence, fileshare); discuss heads of claims with team members.
- Canonical messaging: tagline "Records, Records... VeriCase"; headline "Make Time Your Ally, Not Your Enemy"; subhead "From Chaos to Clarity in Construction Disputes". Treat deviations as CHALLENGE items, not automatic FAILs — the live site may intentionally diverge.

## Workflow

### 1. Resolve the section argument

- If `$section` is a file path that exists, use it. If it is a name, resolve to `frontend/src/components/sections/<Section>.jsx` (case-insensitive; e.g. `hero` → `frontend/src/components/sections/Hero.jsx`). Check `frontend/src/pages/LandingPage.jsx` and `frontend/src/pages/Login.jsx` for page-level or inline copy too.
- If `$section` is empty or `all`, target every file in `frontend/src/components/sections/` plus `frontend/src/pages/LandingPage.jsx`. Handle them one section per loop pass — never interrogate the whole site in a single agent dispatch.
- Read the resolved file(s) and list the copy found: headlines, subheads, body paragraphs, stat labels, CTA button text, badge/eyebrow text, card titles and descriptions. State this inventory to the user before dispatching.

### 2. Dispatch copy-interrogator

Dispatch the `copy-interrogator` agent via the Agent tool on the resolved file(s). Instruct it to question every line of copy like a sceptical buyer: Is this claim substantiated? Is it jargon? Is it a feature masquerading as a benefit? Would a construction lawyer believe it? Collect its full question log and its PASS / CHALLENGE / FAIL verdict per copy line.

### 3. Present verdicts, choose scope

Present the CHALLENGE and FAIL verdicts to the user and ask which to act on — use AskUserQuestion with concrete options (e.g. "Fix all FAILs", "Fix FAILs + CHALLENGEs", "Pick individual items"). If AskUserQuestion is unavailable or the session is in auto mode, act on ALL FAIL and CHALLENGE verdicts autonomously.

### 4. Dispatch copy-refiner

Dispatch the `copy-refiner` agent via the Agent tool with: the interrogation findings (only the verdicts in scope), the original copy, and the embedded brand-voice rules above. Collect its before/after proposals. Require every proposal to preserve existing `data-testid` attributes, JSX structure, Tailwind classes and `className` logic — copy strings only.

### 5. Dispatch brand-voice-guardian

Dispatch the `brand-voice-guardian` agent via the Agent tool on the PROPOSED copy (not the source). If it returns FAIL, send the guardian's specific fixes back to `copy-refiner` for one revision — one revision loop maximum; if it still fails, record the failure in the report and exclude those proposals.

### 6. Write the report

Get the date with Bash `date +%Y-%m-%d`. `mkdir -p reviews/copy`, then Write `reviews/copy/<section-slug>-<YYYY-MM-DD>.md` (section-slug = kebab-case section name) containing:

- **Question log** — every interrogator question with its target copy line and verdict.
- **Verdicts acted on** — which FAIL/CHALLENGE items were in scope and why.
- **Before/after table** — `| Location | Before | After | Verdict addressed |`.
- **Guardian scorecard** — the brand-voice-guardian's scores and any revision-loop outcome.
- **Founder-only substantiation questions** — claims no agent can verify (e.g. "91% of projects delayed", "£13bn annual industry loss", "3-4yr dispute lifecycle" in `Hero.jsx`): list each as a question for the founder to evidence or soften. Never invent substantiation.

### 7. Apply on approval

Present the before/after table in chat and ask whether to apply the edits to the source files. Apply via Edit only on explicit approval, editing string literals only. In auto mode: apply FAIL-fixes only; leave CHALLENGE-derived rewrites as proposals in the report. After applying, confirm the files touched and remind the user the copy renders via `frontend/src/pages/LandingPage.jsx`.
