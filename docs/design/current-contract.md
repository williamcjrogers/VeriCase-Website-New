# Current website contract

Effective 01 October 2026. This contract supersedes older palette, typography, page-order and copy prescriptions in historical design documents. The approved scope retains the forest-green working-record identity.

## Sources of truth

- Rendered page order: `frontend/src/pages/LandingPage.jsx`.
- Copy and publication gates: `frontend/src/content/home.js`, `notes.js`, `gates.js`.
- Actual colour and type: `frontend/src/index.css`, `frontend/tailwind.config.js` and computed browser styles. Historical token names such as `navy` and `azure` do not describe their current hue.
- Route metadata: `frontend/src/lib/pageMetadata.js`; public delivery: `frontend/vercel.json` and the deployed domain.

## Visual contract

Forest green `#0B2516`, deep green `#041A0F`, paper `#FCFAF5`, parchment `#F5F0E6`, brass `#BF9B58` and light signal `#EE8E7E` on dark grounds. Display: self-hosted Newsreader. Body: self-hosted IBM Plex Sans. Monospaced record data: IBM Plex Mono. No external font stylesheet.

The opening must explain the software, its audience and the next action in plain language. Its memorable element is a simple question, answer and inspectable fictional source. The continuous fictional matter and its source links and diagrams remain available in an optional worked-example disclosure. Quiet spacing, restrained rules and square-to-small-radius controls support that content. Do not impose an old teal/coral palette, pill CTAs or animation on every control.

Reading order: plain product explanation and simple example; three practical jobs; optional worked example; concise team profiles; common questions; demonstration. The team includes William Rogers and Warren Kemp as co-founders, Malcolm Brechin as Managing Director, and Sam Whisker as Chief Technology Officer. Malcolm and Sam must not be labelled as founders or co-founders. Show names, roles and short introductions first, with full backgrounds available on request. The detailed chapters and notes appear only when the worked example is opened. Primary navigation uses How it works, Worked example, About and Questions. Preserve existing chapter deep links by opening their enclosing disclosure before scrolling and focusing. The context-statistics band was removed deliberately. Login is an external application hand-off, not a local login page.

## Behaviour and wording

- Use “Request a demonstration” for the email action. Preserve the plain-address fallback and confidentiality guidance. A click is an intent signal, never a received enquiry or booking.
- Describe cited chronology, analysis and professional review. No truth guarantees, unsupported speed comparisons, benchmark numbers or training/security promises.
- Keep unverified client-data policy and privacy publication gates closed. A policy gap is not evidence of an insecure product.
- The sample matter is fictional; founders, company details and external sources are not covered by that disclaimer.
- Primary touch controls have at least 44 by 44 px targets. Test 320, 390, 768 and 1440 px without horizontal page overflow. Check selected states, visible focus, keyboard, source drawer and mobile navigation.
- Pause must stop CSS and SVG animation and timers. Reduced motion, offscreen state and hidden documents must remain static and operable. Browser geometry/matrices are evidence; source flags alone are not.
- Consent precedes every analytics request. Explicit events accept only fixed identifiers. Recording and automatic interaction capture stay disabled. Verify grant, rejection, withdrawal, regrant and blocked storage.
- `/cookies` has its own canonical metadata and prerendered body. Unknown addresses return HTTP 404 with noindex. Verify robots, sitemap and sharing image through the public canonical domain, not only a preview.

## Verification boundaries

Record repository SHA, deployed SHA, host and viewport. Distinguish local tests, preview acceptance, public delivery and live account data. Core Web Vitals targets are p75 LCP <=2.5 s, INP <=200 ms and CLS <=0.1; only real-user data establishes a field pass. Do not invent scores, enquiry rates or product capabilities from the fictional examples.
