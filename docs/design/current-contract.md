# Current website contract

> **03 October 2026, next-revision authority:** follow the [consolidated screenshot-led plan](../plans/2026-10-03-screenshot-led-website-redesign.md). It supersedes this document's frozen opening/time copy, compulsory reading order, permanently expanded biographies and specific simulated filing animation. Retain the green/brass identity, factual roles, screenshot fidelity, useful restrained motion, capability substance and technical safeguards. Product captures retain actual application colours. Roles at other companies must be attributed accurately, not removed by a blanket founder-word ban. The text below records the earlier contract and does not establish current implementation or release acceptance.

Effective 01 October 2026. This contract supersedes older palette, typography, page-order and copy prescriptions in historical design documents. The owner approved a fuller marketing website in forest green and brass. Subsequent feedback explicitly permits useful, easily understood interaction; the earlier static-only rule is superseded. The blue branding, gradients and visual treatment at app.veri-case.com are excluded; that site is a copy reference only. A revised visual proposal is being prepared for review before further implementation.

## Sources of truth

- Rendered page order: `frontend/src/pages/LandingPage.jsx`.
- Copy and publication gates: `frontend/src/content/home.js`, `marketing.js`, `notes.js`, `gates.js`.
- Actual colour and type: `frontend/src/index.css`, `frontend/tailwind.config.js` and computed browser styles. Historical token names such as `navy` and `azure` do not describe their current hue.
- Route metadata: `frontend/src/lib/pageMetadata.js`; public delivery: `frontend/vercel.json` and the deployed domain.

## Visual contract

Forest green `#0B2516`, deep green `#041A0F`, paper `#FCFAF5`, parchment `#F5F0E6`, brass `#BF9B58` and dark bronze `#5C431B`. Use brass sparingly for actions and meaningful emphasis; use dark bronze for small text on light grounds. The existing light signal `#EE8E7E` remains available for warnings on dark grounds. Display: self-hosted Newsreader. Body: self-hosted IBM Plex Sans. No external font stylesheet. Headings stay in one colour, labels use sentence case, and body paragraphs remain approximately 68 characters wide at most. Preserve the responsive type scale and left alignment.

Product illustrations must stay as close as possible to the actual application, using the owner's supplied screenshots as the primary reference. Preserve the real screen hierarchy, terminology, visual relationships and control treatment. Simplification means selecting a useful part of a real screen, enlarging relevant content and omitting unrelated surrounding chrome. It does not mean inventing a different interface or substituting generic document diagrams. The website retains its green and brass identity; the old blue marketing website remains excluded.

The relationship between a source record and an argument is a useful subject when supported by the application references. Use the existing fictional matter, EV-0131, EV-0138 and EV-0147, rather than publishing live case data visible in reference screenshots. Each proposed illustration must identify its source screenshot and what it has simplified. Do not infer unsupported features or behaviours from a static image. A faithful application panel is permitted; a fabricated dashboard is not. Keep labels readable instead of shrinking an entire screen into a thumbnail.

Simple interactions may open a supporting record or show which excerpt supports a statement, where that matches the real application. Every example must communicate its main point before interaction; one action must have an immediate, obvious result. No decorative animated networks, scanning effects or counters. The underlying complex interactive components remain in the repository; a separate demo is outside this change. Do not replace useful graphics with generic feature cards or decorative technology imagery.

The owner wants at least some animation on the public page. The two evidence figures carry it as one-time procedural motion: in the opening figure the three documents square up and each is filed into the chronology in date order, its card and row lit together; in the argument figure each citation underlines as its supporting record comes forward once in view. Motion plays once, ends in a still and readable state, and is absent under reduced motion. Do not strip it as part of a simplification pass, and do not grow it into looping, scanning or counting effects.

The owner has reiterated that some illustrations are good when they communicate clearly. Assess each illustration on that basis. Retain explanatory visuals, simplify those with a useful idea but confusing execution, and remove only those that do not help understanding. Neither static-only treatment nor replacing graphics with prose is a general rule. Source inspection is one useful interaction, not the sole permitted form of visual explanation.

Reading order: opening and chronology illustration; time and competitive advantage; six fuller capabilities grouped into three practical jobs; argument illustration, shared workspace and audience; four full biographies; common questions; demonstration enquiry. The team includes William Rogers and Warren Kemp as co-founders, Malcolm Brechin as Managing Director, and Sam Whisker as Chief Technology Officer. Malcolm and Sam must not be labelled as founders or co-founders. All biographies are visible in the current two-column layout; only credentials and reported matters are expandable. Primary navigation remains How it works, Worked example, About and Questions. Preserve old chapter addresses by mapping them to the explanatory content, scrolling and focusing its heading. The context-statistics band, programme references and File Login remain removed. Sign in is an external application hand-off, not a local login page. No new routes, services or public APIs.

## Owner-approved copy

The following opening and time-section passages are explicitly approved, including their truth-reconstruction and timing wording. They override earlier generic copy guidance for these passages only. Preserve them word for word; do not shorten or soften them during a design review. The time heading uses a colon in accordance with the standing punctuation rule.

**Transform complex evidence into compelling legal arguments.**

VeriCase approaches the evidence crisis differently. We don't just manage documents; we reconstruct truth. Forensic-grade AI turns scattered records into winning, defensible strategies.

**Time is your ally: your competitive edge, not your enemy**

Time is the commodity everyone is chasing. There is a gold rush around AI. If you do not get on board, you will fall behind your competitors.

VeriCase transforms complex evidence into compelling, defensible claim arguments using AI, so legal and construction professionals can build stronger cases faster and with greater confidence.

It is an early case diagnostic tool. It saves substantial time and gives you an edge over your opponent. Imagine building a factual chronology by reading tens or hundreds of thousands of emails. VeriCase does that not in days, weeks, or months, but in minutes.

## Behaviour and wording

- Use “Request a demonstration” for the email action. Preserve the plain-address fallback and confidentiality guidance. A click is an intent signal, never a received enquiry or booking.
- Restore existing ingestion, chronology, research, rebuttal, claims preparation, integrity, collaboration, audience, FAQ and closing copy. Do not rewrite approved passages merely to shorten them. Outside the explicitly approved passages above, do not add truth guarantees, speed comparisons, benchmark numbers or training/security promises.
- Keep unverified client-data policy and privacy publication gates closed. A policy gap is not evidence of an insecure product.
- The sample matter is fictional; founders, company details and external sources are not covered by that disclaimer.
- Primary touch controls have at least 44 by 44 px targets. Test 320, 390, 768 and 1440 px without horizontal page overflow. Check readable graphics, contrast, visible focus, keyboard, native disclosures and mobile navigation. Compare the approved passages against the rendered page word for word.
- Public illustrations may use purposeful, optional interactions with plain labels. Preserve keyboard access, visible selection and focus, reduced-motion support and a meaningful initial state. Do not mount the old complex walkthrough wholesale. Preserve its existing pause, reduced-motion, viewport and document-visibility fixes in the retained components.
- Consent precedes every analytics request. Explicit events accept only fixed identifiers. Recording and automatic interaction capture stay disabled. Verify grant, rejection, withdrawal, regrant and blocked storage.
- `/cookies` has its own canonical metadata and prerendered body. Unknown addresses return HTTP 404 with noindex. Verify robots, sitemap and sharing image through the public canonical domain, not only a preview.

## Verification boundaries

Record repository SHA, deployed SHA, host and viewport. Distinguish local tests, preview acceptance, public delivery and live account data. Core Web Vitals targets are p75 LCP <=2.5 s, INP <=200 ms and CLS <=0.1; only real-user data establishes a field pass. Do not invent scores, enquiry rates or product capabilities from the fictional examples.
