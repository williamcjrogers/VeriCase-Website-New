# Website capability register

03 October 2026. Implementation companion to the approved screenshot-led plan.

The register covers the concepts in the previous detailed homepage deck, including inactive chapter data and publication-gated material. It distinguishes the existence of source code, captured appearance and verified customer behaviour. It does not certify product release or availability. Product sources below are relative to `/Users/williamrogers/Projects/WR2.0`; website sources are relative to this repository.

The first review inspected WR2.0 at `942428d2ad3d95c22dd0347b8844d7e1773eb59d`. During implementation the checkout advanced to `681e37903bb9c973be1e6d9418e34752af44d714`; the storage, duplicate, keyword-audit and rebuttal findings were rechecked there. No product files were changed. No live account, provider, bucket configuration or customer availability was inspected. A historical `confirmed` publication gate is not operational proof.

## Evidence keys and limits

| Key | Inspected source | What it supports and what it cannot prove |
|---|---|---|
| E1 | `vericase/api/app/correspondence/routes.py:921`, `:1093`; `correspondence/utils.py:759`; `evidence/services.py:7301`, `:7395`, `:7480`, `:7813` | Individual email/archive ingestion context, retained body fields, Office previews and OCR state. Supports generic input families, not every format/version, successful parsing of every input or complete OCR. |
| E2 | `vericase/api/app/project_data_hygiene.py:589-604` | Near-duplicate checks bucket by sender and exact second, then compare subject/body, with reversible metadata and a decision record. Does not establish exhaustive duplicate discovery or routine production execution. |
| E3 | `vericase/api/app/evidence_finder/routes.py:29-39`, `:44-69`, `:73-92`, `:382`, `:486` | Authorised Finder scopes, saved selections, coverage/status fields and export endpoints. Plugin and runtime availability checks apply; source presence does not prove current production availability or complete reading. |
| E4 | `vericase/api/app/vericase_rebuttal.py:2208`, `:2268-2272`, `:2636-2646`, `:3026-3035`, `:3150`, `:3345` | Citation registry, model instructions, review/redraft and plan approval. Does not prove mandatory citations after a user edit, every assertion resolved or persistent per-point acceptance history. |
| E5 | `vericase/api/app/drafting/exports.py:25`, `:162`, `:300`; `drafting/export_routes.py:21-65` | Word/PDF formats, export payload and publication controls exist. Current deployed format behaviour, source-reference fidelity and downloading were not exercised. |
| E6 | `vericase/api/app/collaboration.py:47`, `:234-261`, `:318`, `:347` | Mentions and document-comment routes exist. Does not establish delivery receipt, live presence, whole-team approval or current participant access. |
| E7 | `vericase/api/app/storage.py:314-321`, `:344-348`, `:399-409`; `correspondence/routes.py:3300-3316` | AWS bucket access check, local versioning and ordinary object write; keyword changes retain latest actor/time in metadata. Cannot substantiate WORM or a universal before/after audit. The searched infrastructure did not establish Object Lock; absence of source configuration does not prove the production control is absent. |
| E8 | `vericase/api/app/admin_settings.py:1288-1309`; `evidence_finder/routes.py:29-39`; `vericase/ui/ai-assistants.html:177-181` | Product labels differ across screens: VeriCase Analysis, Evidence Search, Rebuttal, VeriDraft and MeritusIQ. Public copy uses task vocabulary and VeriCase as the website brand, without inventing a platform rename or promoting assistant connections. |
| E9 | `vericase/api/app/config.py:20`, `:317`, `:1104`, `:1134-1146`; WR2.0 `AGENTS.md`, Quantum removal entry | Default-off Matter Review, private knowledge, simple workflow and newer programme capabilities; recorded Quantum removal. No newly available capability can be inferred from these sources. |
| E10 | `docs/design/product-reference-register.md` | The image owner's selected references, sanitisation, capture dates and limitations. Use its final status before publication; this register does not independently certify screenshot acceptance. |
| E11 | `frontend/src/content/gates.js`; approved full team records in `frontend/src/content/home.js` | Existing company and profile copy is preserved as owner-supplied material, not newly fact-checked credentials or endorsements. Data-policy, benchmark and case-study publication remain gated. |

Availability default for every retained product concept: described as a practical capability at the general level supported by source and existing references; current end-to-end live behaviour remains unverified in this copy workstream. The release owner must use the reference and acceptance records to avoid representing untested detailed behaviour as proven.

## Complete concept dispositions

| Previous concept | Disposition and published treatment | Evidence, screenshot and verification boundary |
|---|---|---|
| Reconstruct truth; winning strategies; forensic-grade AI | Omitted. Reviewed opening: “Transform complex evidence into compelling legal arguments.” Adjacent copy identifies the construction market and investigation, chronology and AI-assisted drafting. | An intended evidence-to-argument benefit, not an accuracy or legal-outcome guarantee. |
| Chronology across tens/hundreds of thousands of emails in minutes; competitive gold rush | Omitted. Timing headline: “The project took years. Your response cannot.” The body describes a dispute-response scenario. | No reproducible corpus/task benchmark; E11 benchmark gate stays struck. The scenario adds no processing-time promise. |
| PST, MSG, EML; bodies and attachments | Narrowed to email archives, individual messages and attachments. | E1; exact parsing and archive completeness remain task-dependent. |
| PDF, DOC/DOCX, spreadsheets and images | Retained as generic document families. | E1, E10 Files references; no universal format/version promise. |
| OCR for scans | Retained as text recognition that helps search scanned pages. | E1; no extraction accuracy claim. |
| One record per message; Message-ID/References threading and heuristics | Merged into “Follow the correspondence”. | E1 body/storage context; header-level guarantees omitted pending route-specific behaviour checks. |
| Folding quoted history, keeping original text | Narrowed to quoted-text handling that helps distinguish replies. | E1 retained body fields; no claim about every quote or exact visual behaviour. |
| Near-duplicates leave the review set; retained originals | Narrowed to duplicate handling and certain near-duplicate checks; review exclusions. | E2; reversible metadata supports review, not exhaustive detection or immutable originals. |
| Automatic replies set aside | Omitted from new visible copy. | Historical G5_autoReply remains for retained examples; no live behaviour checked. |
| File Manager by attachment type; Show Noise for signature images | Merged into organising records; named controls omitted. | E10 supplies actual screen appearance; no current behaviour proof for every control. |
| Exclude other projects automatically | Narrowed to choosing scope and relevance controls. | E3 authorisation/scope; no inference that all unrelated material is automatically identified. |
| Date window; Smart Filter; excluded keywords | Merged into dates, search terms and relevance controls. | E3 plus screen references; no fabricated control labels. |
| Not Relevant removes attached items from search | Omitted as a specific propagation guarantee. | Requires cross-source exclusion/search behaviour verification. |
| Chronology across every party | Narrowed to examining correspondence in date order. | Source scope determines coverage; “every party” cannot establish complete collection. |
| Cards/Table presentation | Omitted as a marketing promise; chronology task retained. | Screen-specific detail needs a suitable current capture. |
| Forecast, instruction and confirmation dates | Retained and clarified as different kinds of record. | Sample chronology is illustrative; no inferred actual progress, critical delay or entitlement. |
| Export the chronology; bundle selected records | Narrowed to selecting supporting records and reviewing downloads. | E3 selection/export structure; chronology export not exercised. |
| Plain-English project question | Retained as a focused issue question. | E3/E4; no full-corpus or correctness guarantee. |
| Editable Query Plan chips: mode, period, parties, topics, sources | Narrowed to reviewing proposed scope and refining it. | UI detail omitted unless the capture/behaviour register supports it. |
| Numbered citations open source | Narrowed to following source references and checking context. | E3/E4 and E10 reader; no assumption that every cited reference resolves correctly. |
| Counts of sources/items analysed; validation badge | Omitted as public proof of completeness or correctness. | E3 coverage/status fields do not establish complete reading; E4 model review is not certification. |
| Create bundle includes every cited item and metadata fields | Omitted automatic completeness claim. | Selected-source and cited-source bundle workflows require separate verification. |
| Download research PDF | Narrowed to reviewing output before sharing; selected export image labelled as an export. | E10 export reference establishes appearance only. |
| Upload opposing submission; numbered points | Retained as examining an opposing submission and its factual points. | E4; exact segmentation is not guaranteed. |
| Ranked support and contradiction; proposed replies | Retained in practical terms, subject to source review. | E4; ranked evidence is not an exhaustive case assessment. |
| Mandatory citations, including user edits | Omitted; G5_rebuttalCite struck. | E4 model instructions do not establish edited-response enforcement. |
| Accept/edit/reject every point with before/after audit | Omitted universal workflow promise. | E4 inspected routes did not substantiate it. Retained inactive fictional data is not mounted as product proof. |
| Human author responsible for served work | Retained in one clear main professional-judgement statement and the relevant FAQ; repeated generic caveats removed from sales sections. | Professional review boundary; no capability activation claim. |
| Heads and sub-heads of claim | Narrowed to organising work in sections. | E5 structured drafting; exact legacy interface labels not promised. |
| Narrative automatically cited by message ID | Narrowed to inspecting supporting records and source references. | Sources include documents as well as messages; no automatic support guarantee. |
| Evidence finder proposes material for a section | Broadened in task terms to investigation and selection for the work. | E3; saved packs and exact download options not promoted without live checks. |
| Word/PDF with citations intact | Narrowed to review before export/share. | E5 formats exist; no tested all-output citation fidelity. |
| Whole team shares evidence; document discussion and mentions | Retained as discussion connected to records; mentions and notification behaviour omitted. | E6; current participant permissions and receipt unverified. |
| Raw messages in write-once storage | Omitted; G5_hash struck. | E7; hashing/versioning does not establish immutability. |
| Cryptographic hash for each original; SHA-256 coverage | Omitted universal hash coverage promise. | Requires ingest-path and live-object/manifest verification. |
| Everything audited; tags/notes/links/edits with before/after values | Omitted. | E7 gives a concrete boundary: keyword mutation keeps latest actor/time, not a full history in that path. |
| Sequential bundle numbering; message-ID/hash/source-path manifest | Narrowed to checking bundle contents and references. | No manifest completeness/current export receipt captured. |
| Seven named roles and restricted BCC/sensitive fields | Omitted detailed universal access claim; G5_roles struck. Discuss team access arrangements. | Requires role/field endpoint and live account matrix. |
| Server-side AI and API keys | Omitted from public persuasion copy. | Technical implementation detail; it is not a complete confidentiality or security assurance. |
| Court-ready/admissible | Not asserted. FAQ preserves tribunal responsibility for admissibility/weight. | No legal acceptance guarantee. |
| Pre-litigation only; “before disclosure” | Rewritten: preparation for construction claims and disputes alongside existing systems. | Supports users already in an adjudication or dispute. No automatic platform integration promised. |
| Contractors, consultants, legal teams, counsel and experts | Retained; claims consultants and commercial teams lead. | Explicit approved audience priority. |
| Practitioner foundation/equity and firm disclaimer | Retained. Full four approved profiles kept in individual disclosures. | E11, owner-supplied facts preserved; affiliations are not firm endorsements. |
| United Infrastructure success account | Omitted; G6_ui remains struck. | Substantiation and publication consent not supplied. |
| 50,000 documents/hour; 99.7% date accuracy | Omitted from mounted page; G4 remains struck. | Historical inactive data is not performance evidence. |
| Hosting, subprocessors, retention and training policy | Assurance remains omitted; ungated FAQ invites due diligence using sample material. | G8_data remains struck; no inference from infrastructure or marketing aspirations. |
| Confidentiality before own-material demonstration | Retained as a prospective arrangement, not an existing NDA or data-policy guarantee. | Demonstration instructs use of sample material until arrangements are agreed. |
| Email CTA, copy fallback and sign-in | Retained existing destinations and “Request a demonstration”. | Email/copy are intent signals, not bookings or receipt. Behaviour owned by CTA workstream. |
| Fictional sample facts, notices and legal timing ruler | Not used as a real matter or product result. Historical inactive chapter content retained for compatibility. | Sample/source labels and existing notes must remain truthful if reused. |
| Programme/delay automation, Final Account/Quantum, File Login, statistics band | Remain omitted. | Explicit owner scope; E9. No resurrection from older roadmaps. |

## Publication gates and maintenance

`G5_sourceReview` and `G5_rebuttalReview` cover the narrower new copy. They do not approve technical assurances formerly bundled into `G5_hash` or `G5_rebuttalCite`. Those old gates, broad near-duplicate and detailed-role gates are struck. Other historical gates remain only for compatibility with unmounted components; their status cannot substitute for a release check.

Retained inactive exports and fictional diagram labels are compatibility data, not approved new product imagery. Any future remount requires comparison with this register and the product reference register. Remount comparison, 04 October 2026: the owner asked for the unmounted chronology and argument illustrations to return. “From documents to chronology.” illustrates examining correspondence in date order (rows “Chronology across every party” and “Forecast, instruction and confirmation dates”); its entry titles are written for the illustration and no copy says VeriCase generates them. “An argument with its sources.” illustrates following source references and checking context (row “Numbered citations open source”); it cites each record by document and date, as the export capture (PR-04) does, in plain text. Neither shows reference numbers, citation controls, a Source sheet, message IDs, custodians or hashes, so G5_hash and G5_rebuttalCite stay struck. Both use the fictional records in `frontend/src/content/marketing.js` and are labelled as illustrations. Full owner-approved biographies are preserved verbatim, including their existing professional statements; the concise summaries introduce no new credentials.

Release verification still belongs to the overall website acceptance record: rendered copy, actual selected screenshots, live availability where needed, image confidentiality review and final public deployment. This workstream has not performed those checks.
