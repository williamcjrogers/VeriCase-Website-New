---
name: copy-interrogation-loop
description: Review and refine VeriCase website copy against verified capabilities, publication gates and the current approved brief.
---

# Copy interrogation loop

Read `docs/design/current-contract.md` before reviewing. Trace the current page from `frontend/src/pages/LandingPage.jsx`; content and publication gates live in `frontend/src/content/`. Resolve actual component paths before reporting. The forest-green working-record design is intentional. Never restore removed sections or historical design tokens from an old audit. British English; no em dashes; dates DD Month YYYY; GBP by default. Distinguish source findings, measured browser findings, live account data and unavailable evidence. Every actionable finding needs a current file/line, consequence, concrete fix and an acceptance check. Do not edit source during a review unless implementation is authorised.

Resolve the requested section and its content source. For a full copy review, use copy-interrogator to identify supported and unsupported claims, copy-refiner for the authorised changes, and brand-voice-guardian for one final review. For an already approved set of copy corrections, implement those directly and include them in the final branch review.

Do not invent speed, exclusivity or truth-reconstruction promises. Preserve the owner's explicitly approved opening and time-section wording, recorded in `docs/design/current-contract.md` and `frontend/src/content/marketing.js`. Those passages are a narrow copy approval, not permission to add further claims. Do not rewrite approved copy merely to shorten it. Request a demonstration opens an email; describe that actual action. Do not publish client-data policy from assumptions or from marketing aspirations.

Keep content changes within the user's scope, preserve notes and citation controls, run the copy checker and review the rendered result. Record material unresolved factual questions in `reviews/optimisation/`. Seek missing facts only when they are required for a proposed publication, and continue independent authorised work.
