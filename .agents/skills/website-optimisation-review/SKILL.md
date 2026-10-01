---
name: website-optimisation-review
description: Review the full VeriCase marketing website against its current design, delivery, accessibility, content and measurement contract.
---

# Website optimisation review

Read `docs/design/current-contract.md` before reviewing. Trace the current page from `frontend/src/pages/LandingPage.jsx`; content and publication gates live in `frontend/src/content/`. Resolve actual component paths before reporting. The forest-green working-record design is intentional. Never restore removed sections or historical design tokens from an old audit. British English; no em dashes; dates DD Month YYYY; GBP by default. Distinguish source findings, measured browser findings, live account data and unavailable evidence. Every actionable finding needs a current file/line, consequence, concrete fix and an acceptance check. Do not edit source during a review unless implementation is authorised.

For a full audit, dispatch the six specialist agents in `.agents/agents/`: design-compliance-auditor, accessibility-auditor, seo-analyst, conversion-strategist, brand-voice-guardian and site-performance-analyst. Give them a verified SHA, exact scope and the current contract. The main reviewer owns browser and public-domain verification; agents must not imply they performed unavailable measurements.

Deduplicate by root cause. P0 means public delivery or essential functionality is broken; P1 means confirmed accessibility, clarity, substantiation or enquiry-journey defects; P2 means lower-impact improvements. Keep unsupported privacy statements behind publication gates; missing policy information alone does not prove a compliance breach or insecure product.

Write `reviews/optimisation/site-review-YYYY-MM-DD.md` with scope, coverage, exclusions, source/deployment SHAs, prioritised findings, concrete fixes, acceptance evidence and unresolved account/fact dependencies. Include domain responses, content types and desktop/mobile measurements. Rank plugin additions by a specific unfilled capability, current installation/connection state and data access. Installed does not mean connected.

When implementation is already authorised, proceed within that scope without asking the owner to approve it again. Otherwise present the concrete findings and recommended sequence. Do not claim completion of unavailable service checks.
