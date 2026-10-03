# Product reference register

Reviewed: 03 October 2026.

This register records the four actual application QA captures recovered from WR2.0 Git history for the screenshot-led website. All four were inspected visually at their original resolution. Their fixture provenance was checked against the source repository. They are suitable for public display as **historical QA views with synthetic content**, using the presentation boundaries below.

They are not confirmed to be the complete screenshot set originally supplied by the owner. They do not prove the latest deployed interface, feature availability, production performance, completeness of retrieval or the results of a real claim. The live-matter Case Configuration attachments remain excluded from the website repository and public assets.

## Source and handling

- Source repository: `/Users/williamrogers/Projects/WR2.0`.
- Private recovered originals: `/Users/williamrogers/Documents/VeriCase/Website product references/2026-10-03/`.
- Public copies: `frontend/public/images/product/`.
- Review contact sheet: [product-references/contact-sheet.html](../../reviews/optimisation/product-references/contact-sheet.html).
- Extraction: `git show <revision>:<path>`, copied without rewriting the image bytes.
- Sanitisation review: the selected captures contain synthetic fixture records or an explicitly illustrative report. No redaction was necessary. No client identifiers, real correspondence, personal account details, credentials or confidential material were visible in the four inspected images.
- Image edits: **none**. Public copies are byte-for-byte identical to the recovered originals. No generative image operation, UI reconstruction, compositing, text replacement or raster cropping was performed.
- Presentation: CSS clipping and scaling only. Desktop, enlargement and print retain the approved crops. Phone previews may show a labelled focal detail wholly contained inside that crop. Historical sidebars must not appear through an uncropped enlargement or a public full-image action.
- Capture timestamps: exact capture times are not independently recorded here. The dates below are the archival commit dates, corroborated by the QA documents; the export image also visibly carries 12 September 2026.

## Image inventory and approved purpose

| ID | Public asset | Original dimensions | Archived | Screen and customer task | Suggested adjacent wording |
|---|---|---|---|---|---|
| PR-01 | `files-library-qa-2026-09-05.png` | 1440 × 1000 | 05 September 2026 | Files library. Locate a record in the file table, with filename, type, folder and processing state. Optional supporting view. | “Keep project records in a workspace and browse the files.” |
| PR-02 | `files-search-qa-2026-09-05.png` | 1440 × 1000 | 05 September 2026 | Files search. Read a highlighted document-text match beside its filename and folder. | “Find a matching passage and see which document it comes from.” |
| PR-03 | `document-reader-qa-2026-09-06.png` | 1440 × 760 | 06 September 2026 | Document reader. Keep the selected file list beside the original page. Preferred hero view. | “Read the source alongside the selected record.” |
| PR-04 | `report-export-qa-2026-09-12.png` | 1440 × 1107 | 12 September 2026 | Illustrative exported report. See headings, a source link, a quotation and a table in the exported output. | “Carry reviewed report content into an export, retaining its structure and source links.” |

The wording above is bounded by what the captures and source inspection establish. The capability register controls the final public copy. A photograph of a button does not demonstrate its operation. Separate views must not be presented as proof of an automatic sequence from search to a completed claim.

## Provenance and integrity

| ID | Private original filename | Historical repository path | Source revision | SHA-256 of original and public copy | Bytes |
|---|---|---|---|---|---|
| PR-01 | `library-desktop.png` | `vericase/docs/files-overhaul-qa/library-desktop.png` | `8eb7dfecafc325dc0ea5a202d98742210962b30c` | `f50d7bdb2f3d7eb4d827ebdb0e4cd42d68f56340e8203c8e0043cd79a98c0afe` | 210634 |
| PR-02 | `search-desktop.png` | `vericase/docs/files-overhaul-qa/search-desktop.png` | `8eb7dfecafc325dc0ea5a202d98742210962b30c` | `68f57cf492dbd4881836ecc3b18568d2732dab2ea410ec697d12af61b7c0bdf2` | 255235 |
| PR-03 | `reader-fix-desktop.png` | `vericase/docs/files-overhaul-qa/reader-fix-desktop.png` | `cb8b2c4ff286aa0f75c0b4d19b3fb3ff781922fa` | `65d0eeb34f9226fcf0e327b5504cddec42d381120bae6f56dea4656cd78ccede` | 174866 |
| PR-04 | `styled-report-preview.png` | `vericase/docs/qa/copilot-export/styled-report-preview.png` | `ba9621637f21858864ed13735cb71c8722d20d83` | `2089de031b425e91ecd6681d97aa485a807f8c83735eff6b29b35a75062eb7c3` | 128366 |

These hashes document copying integrity. They are not a public assurance about evidence preservation, admissibility or the application's storage architecture.

## Privacy and authenticity evidence

### Files library and search

`scripts/dms-demo/README.md`, checked both at revision `8eb7dfecafc325dc0ea5a202d98742210962b30c` and in the current checkout, states that the fixture serves the actual static application with a local fetch adapter replacing `/api/*` with synthetic responses. It never connects to production. The nine records, displayed workspace and folder counts, account, notes responses and three-page PDF are synthetic.

`scripts/dms-demo/fixture.js` supplies the visible Riverside Construction Dispute name, all nine filenames, dates, folder paths and the repeated “Contractual retention and payment provisions” snippet. The 16,619 workspace count and larger folder counts are presentation fixtures. They must not become a scale, corpus coverage, customer, throughput or performance claim. The QA fixture also does not establish live upload, AI filing, worker or permission behaviour.

`vericase/docs/FILES_OVERHAUL_REVIEW_2026-09.md`, “Browser evidence”, connects these captures to that fixture and distinguishes the browser checks from separate database tests and production behaviour.

### Document reader

The visible PDF says “VERICASE / SYNTHETIC TEST DOCUMENT” and repeats that it is synthetic evidence for document reader testing. `vericase/docs/DMS_DOWNLOAD_PREVIEW_FIX_2026-09-06.md` states that the browser images use synthetic documents and that production data was not copied into the verification artefacts. Preserve the synthetic-document label in the displayed crop.

### Report export

The image itself identifies an “Illustrative export preview” with no findings about a real dispute. The historical `vericase/scripts/copilot_export_smoke.cjs` at revision `ba9621637f21858864ed13735cb71c8722d20d83` contains the exact sample text, substitutes unrelated API data, injects the sample into the actual application, downloads the generated HTML and captures that output offline. Its source link is `https://example.com/evidence`; it does not establish a real citation or a verified chain from an actual document to the sample report.

The report is an exported output, not a screenshot of the Research screen, drafting editor or an automated delay analysis. Keep the illustrative disclaimer visible. Its delay-related headings are specimen content, not proof of programme, delay or entitlement capabilities.

## Current source comparison

Read-only inspection on 03 October 2026 used WR2.0 checkout HEAD `681e37903bb9c973be1e6d9418e34752af44d714`. Relevant security, frontend, navigation and product-removal instructions in WR2.0 `AGENTS.md` were consulted. No WR2.0 source, data, configuration, flags or deployment was changed.

| View | Current source evidence | What remains supported in source | Known differences and limit |
|---|---|---|---|
| Library/search | `vericase/ui/dms.html:122`; `vericase/ui/assets/js/dms/dms-app.js:697`; `vericase/ui/assets/js/dms/dms-grid.js:805` | File search input, result count and ranking label, filename/folder columns, match chips and highlighted snippets. | Content search can be unavailable; the current code then explicitly says “Filename search only”. Source presence is not confirmation of production flags, extraction coverage or live availability. |
| Reader | `vericase/ui/assets/js/dms/dms-preview.js:418`; `vericase/ui/assets/js/dms/dms-reader.js:47` | Selected document header; Document, Details, Text, Revisions and Notes tabs; workspace Curation tab; original-page reader, page controls, fit and document-find controls. | The application shell and typography have evolved. Quantum was removed after these captures. The screenshot does not establish every file type, extraction quality or operation of every control. |
| Export | `vericase/ui/assets/js/copilot-export.js:103`, `:195`, `:277`; `vericase/scripts/copilot_export_smoke.cjs` | Rendering supplied report text with headings, links, quotations and tables; exporting the prepared content through the existing formatter. | Current export branding and typography use Meritus, Cormorant Garamond and IBM Plex Sans. The old styled-HTML preview is historical, not the exact current export layout. No live export or issued-document quality was tested in this task. |

The useful relationships survive the source comparison; pixel identity with today's application does not. Do not caption any of these views “the current app” or “the live app”. Do not silently recolour or rebrand the screenshots to conceal their age.

## Display crops and captions

Coordinates are original-image pixels from the top-left corner: `x`, `y`, `width`, `height`. They define presentation clipping, not a newly edited source image.

| ID | Crop rectangle | CSS inset, top/right/bottom/left | Reason | Caption |
|---|---|---|---|---|
| PR-01 | `484, 76, 948, 725` | `76px 8px 199px 484px` | Retain library header and record table. Exclude old shell, synthetic large counts and unused blank area. | “Files library, September 2026 QA view. Synthetic records.” |
| PR-02 | `484, 76, 948, 766` | `76px 8px 158px 484px` | Retain actual query, result count, highlighted passage and source columns. Exclude the historical shell and synthetic scale counts. | “File search, September 2026 QA view. Synthetic records.” |
| PR-03 | `244, 76, 1196, 684` | `76px 0 0 244px` | Retain the selected-file rail, source page, reader tabs and explicit synthetic-document heading. Exclude the historical application sidebar and branding. | “Document reader, September 2026 QA view. Synthetic document.” |
| PR-04 | `272, 194, 896, 606` | `194px 272px 307px 272px` | Retain report title, illustrative disclaimer, source link, distinct quotation and table. Exclude historical brand/header and the programme-reference footer. | “Illustrative report export, September 2026. Sample content.” |

Use meaningful alt text describing the displayed relationship. Suggested reader alt: “A selected contract file beside its original page in the document reader; the page is labelled as a synthetic test document.” Suggested search alt: “A retention search shows highlighted matches beside each filename and folder in a synthetic records list.” Suggested export alt: “An illustrative report export with headings, a source link, a separate quotation and an event table.”

The phone repair of 03 October 2026 uses these focal preview rectangles: reader `640, 354, 496, 326`; search `756, 258, 304, 284`; export `305, 428, 536, 174`. Each lies wholly inside its approved wider crop. The reader retains its synthetic-document label, search shows highlighted matches, and export shows the source link and quotation. Phone labels and alternatives explain that these are details; the original sample-status captions remain. Preview images fit the page and do not scroll internally.

Enlargement reveals the wider approved crop at a useful scale with panning where necessary; it must not reveal the retired sidebar or imply controls in the image are interactive. The programme filename in the source list is an input record, not a programme-analysis advertisement; do not describe it as an application feature.

## Verification boundary and remaining work

- All four original images visually inspected; their dimensions, privacy provenance and exact-copy SHA-256 values checked.
- Public assets contain only the reviewed synthetic originals. No original live-matter attachment was added.
- Source comparison is read-only and limited to the depicted relationships. No current app browser session, deployment check, backend behaviour, flag activation or production test was performed as part of this reference task.
- The contact sheet is a review document using those originals and the same proposed CSS crops. Final website clipping, enlargement, keyboard behaviour, mobile readability, failed-image fallback and print still require rendered acceptance on the implemented page.
- Refreshing these images from a current synthetic fixture would remove known branding and typography drift. That is a separate current-app capture task, not a reason to alter or fabricate these historical screenshots.
