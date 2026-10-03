# ADR 001: Screenshot-led marketing page

03 October 2026. Accepted for implementation following the owner's instruction to implement the consolidated plan.

## Context

The site has conflicting historic plans and lost capability/layout detail. The accepted plan is docs/plans/2026-10-03-screenshot-led-website-redesign.md. Product presentation must stay faithful to actual captures; a screenshot alone does not prove behaviour or availability.

## Decision

Retain React, routing, content exports, consent and the email enquiry service boundary. Use actual synthetic QA captures with provenance, CSS framing and accessible image inspection. Keep essential copy visible, restore substantive task explanations and aliases, and disclose full biographies beneath concise summaries. Use existing Radix dialog primitives for image inspection and CSS for nonessential one-time motion.

Reuse the current application captures only after a privacy/provenance check. Exclude retired navigation from displayed crops. Keep unverified capability claims out of public copy and document omissions. No new service, product API, authentication flow, data storage or dependency migration.

## Alternatives

- Rebuild the older interactive prototype: rejected because states and controls lack current verification.
- Generate animated product screens: rejected for this implementation because generated controls or actions would undermine screenshot fidelity.
- Plain text without product views: rejected because visitors need to recognise the software and its evidence context.

## Consequences and verification

Image enlargement must maintain meaningful crops, have an accessible name, support keyboard/Escape/focus return and remain useful without JavaScript. Captions distinguish QA captures and report export. Check the full responsive page, source/built copy, navigation, consent, clipboard failure, metadata and deployment identity. Current app availability, field metrics and buyer comprehension remain separately evidenced.
