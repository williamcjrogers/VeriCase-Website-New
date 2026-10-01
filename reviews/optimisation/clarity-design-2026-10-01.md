# Homepage clarity refinement

01 October 2026. The owner finds the page confusing and puzzle-like. This updates the clarity work in the approved optimisation plan.

## Design decision

The homepage must explain the product before asking a visitor to explore it. Use a short, left-aligned explanation, three practical jobs, one question with a source-linked answer, concise practitioner context, questions and the demonstration request. Keep the detailed fictional matter as an optional disclosure, with its existing evidence, diagrams and deep links preserved.

Palette: forest #0B2516, deep green #041A0F, paper #FCFAF5, parchment #F5F0E6, brass #BF9B58, text #535A6E. Newsreader carries headings; IBM Plex Sans carries explanation and controls. Mono is reserved for the detailed records. Use a 1.25 type scale with 17 px body, 20 px lead, 26 px subhead, 40 px section title and up to 64 px headline; body measures stay below 70 characters.

```
Logo          How it works / Worked example / About / Questions       Request

Clear product explanation              One question
Who it helps                           Cited answer
Request a demonstration                Read the source email

Three practical jobs: organise / find / prepare

[ Optional detailed worked example ]

Two short founder introductions
Questions
Demonstration request
Footer
```

The alternative, keeping six specialist chapters in the default reading path and merely shortening their paragraphs, still asks visitors to learn the sample dispute before understanding the product. Moving the summary to the top alone leaves the long page unresolved. Progressive disclosure retains the useful working-record material without making it the entry requirement.

## Self-critique before implementation

The existing brass-on-paper appearance is an approved identity, not an opportunity to impose another template. The distinctive element will be an actual question, answer and inspectable fictional source. Remove the animated hero, duplicated slogans, chapter numerals from primary navigation and the unrelated valuation drawing from the founder introduction. Do not add stock imagery, decorative metrics, a card grid or unsupported claims.

## Acceptance

A visitor can identify product, audience and primary action from the opening alone. The default page has no specialist chapter prerequisite. The optional worked example, existing deep links and source controls remain usable. Check 320, 390, 768 and 1440 px widths, keyboard navigation, disclosure state, source return focus, consent boundaries, copy checks, tests and production build. Actual first-time-user comprehension remains a usability-study question, not a claim inferred from tests.

## Verification completed

- 74 tests pass across 11 suites, including three new tests for links into collapsed content. Production build and both source/rendered copy checks pass with no warnings.
- Independent copy interrogation identified the unclear product/audience opening, compulsory legal example, terminology and overstrong analysis claims. These were addressed. Independent final code and brand-voice review reported no findings.
- Browser acceptance at 320, 390, 768 and 1440 px: document and body width match the viewport; the header demonstration action is 44 px high. The expanded worked example also fits 320 px.
- Source inspection opens EV-0147 and returns focus to its invoker. Native disclosure and FAQ operate by keyboard. An existing `#research` deep link opens the example and focuses its heading. The mobile menu uses the four plain-language destinations.
- At 1280 px, the default document measured 3,573 px against 25,761 px for the previous live page, about 86% shorter. Visible text measured 548 words against 4,473. These are layout/content measurements, not a conversion or comprehension result.
- With analytics rejected, the preview made zero PostHog resource requests. Existing consent/transport regression tests remain green. No new analytics provider or production project token was introduced.
- Browser evidence is in `clarity-browser-2026-10-01.json`; desktop/mobile captures are in `screenshots/clarity-desktop.png` and `screenshots/clarity-mobile.png`.
- An evidence-capture tab stalled after successful interaction checks. A fresh tab recovered and the final screenshots and measurements were captured. No security warning was bypassed.

The client-data publication gate, application sign-in destination and unverified analytics-project association remain outside this clarity change. The Vercel connector returned a scope-access error, so release verification uses the already authorised Vercel CLI and public URL.
