# Extractable components

Baseline: released cf029e2, 01 October 2026. Local LandingPage, InBrief and SharedWorkspace edits and untracked CapabilityDetails are an unfinished, unapproved content-restoration draft. This analysis reproduces released HEAD and explicitly excludes that draft.

## SiteHeader
- Source: frontend/src/components/sections/SiteHeader.jsx
- Category: layout
- Description: sticky green navigation, wordmark, external sign-in, enquiry and mobile contents.
- Extractable props: homeHref (string), activeItem (string), menuOpen (boolean)
- Hardcoded: actual uploaded logo URL, labels, styles and icons.

## SiteFooter
- Source: frontend/src/components/sections/SiteFooter.jsx
- Category: layout
- Description: shared navigation, contact, legal and consent links.
- Extractable props: homeHref (string)
- Hardcoded: actual logo, company copy, links, visual styling.

## DemoCTA
- Source: frontend/src/components/editorial/DemoCTA.jsx
- Category: basic
- Description: email enquiry with optional copy-address fallback.
- Extractable props: showCopy (boolean)
- Hardcoded: label, email destination and icons. Inline in drafts rather than separately extracted.
