# Implemented website review canvas

03 October 2026.

The current owner-authorised website is saved in the existing implementation draft at **version 4**, using the free literal HTML-import workflow. This refresh includes the concise opening and section headings, evidence/software wording and the revised phone composition. No generation credits were used. The earlier proposal, draft `fbfcaa83-889f-4fdd-a68d-c14082ad6b97`, remains unchanged at version 4.

- [Open the review preview](https://p.superdesign.dev/draft/425b94c7-c50b-4d91-9bd9-edc561547894).
- [Open the draft on the project canvas](https://superdesign.dev/teams/442d52f1-9ceb-487d-9c33-5479d0169097/projects/3c76a4ca-5759-439e-84c8-e463d9921c70?node=draft-variant-425b94c7-c50b-4d91-9bd9-edc561547894).
- Local export: [implementation-2026-10-03.html](implementation-2026-10-03.html).
- [Asset manifest and source hashes](implementation-2026-10-03.manifest.json).
- [Import response](implementation-2026-10-03.import-result.json).
- [Fetched draft verification](implementation-2026-10-03.remote-verification.json).

The export uses the final production build's exact CSS, original wordmark, self-hosted fonts, four public portraits and three unchanged synthetic product captures. All assets are embedded; no machine-local URL or private record is included. The import returned no warnings. The saved version was refetched and its SHA-256 matched the local export exactly: `6c7f82a267be9e9552868bbb614e9cd08e4793152be44f33cf6290b3b540c4ee`. This proves saved-source fidelity. A separate browser check of the byte-identical local export passed at 390 and 1440 pixels wide: no page overflow; five closed native phone disclosures with visible summaries; the first disclosure opened and closed; all five desktop contents remained visible with summaries hidden. The phone opening visually matched the implementation. This scope does not include a separate rendering inspection of the remotely hosted preview.

The static canvas contains fifteen native disclosures: four full profiles, six FAQs and five capability/process/collaboration disclosures. Phone capability disclosures start closed. Browsers supporting `::details-content` show their complete content on desktop and in print; other browsers retain a visible, working native summary. Nine application-dependent buttons are disabled, including the menu and image inspector. Enquiry and telephone links point to the relevant page section, while contact details remain visible. The mobile footer is expanded for access to its contents. React, analytics and application JavaScript are absent. Live menu behaviour, image zoom, clipboard fallback and React print-state restoration require checks on the implemented website.

The phone reader preserves the workspace and source file rail; search retains names beside highlighted matches. Their current preview rectangles are recorded in the [product reference register](../../../docs/design/product-reference-register.md). Source images remain unchanged. The website's wider inspector now fits the image first and offers explicit optional zoom; it is disabled in this static review.

The current target in `.superdesign/resume.json` preserves its existing project, implementation draft, historical proposal and six validated context files. Fingerprints cover the design system, current contract, plan, product/capability registers, active copy snapshot and implementation source. Historical extracted component IDs remain recorded but require source comparison before future component-based generation.

To refresh this canvas after a visible site change, build the website through its normal workflow, run `uv run --no-project python reviews/optimisation/superdesign/export-implementation.py`, then import the resulting HTML with `import-design-draft --into 425b94c7-c50b-4d91-9bd9-edc561547894`. Refetch the resulting version and update its manifest, verification and resume metadata. Do not replace the historical proposal or spend generation credits for a literal implementation refresh.
