# Source check, 25 September 2026

This report checks, at source, each statistic and legal statement that the VeriCase marketing site relies on, as the copy stands on branch `claude/kind-cannon-nid8si` (williamcjrogers/VeriCase-Website-New PR 1). Every source below was accessed on 25 September 2026 unless another date is given.

## Method

- Pages and PDFs were downloaded directly and their text extracted (legislation.gov.uk XML, the GOV.UK Content API, `pdftotext`, National Archives Find Case Law XML, Companies House pages, the TMview API). Quotations are taken from that raw text, not from a summary.
- Where a publisher blocked direct download, an archived copy of the same URL was used, and the report says so.
- Quotations from Crown copyright and Open Justice Licence material (legislation, GOV.UK, judiciary.uk, judgments) are given in full. Quotations from commercial publications are kept short.
- Status key: **confirmed** (source matches the site or brief), **corrected** (source differs; the change is stated), **not found** (not verifiable at a primary source).

## Summary

| No. | Item | Status | Change on the site |
|---|---|---|---|
| 1 | NISTA Major Projects Annual Report 2025-26: 49 of 68 (72%) Amber or Red | Confirmed | None |
| 2 | HKA CRUX Insight Eighth Annual Report: 33.4% and 65.8% | Confirmed | Footnote aligned to HKA's own wording |
| 3 | KCL and Adjudication Society report: 2,264 referrals; causes of disputes | Confirmed, with corrections to wording | Label no longer says "statutory"; footnote gives the full title and says "participating" nominating bodies |
| 4 | HGCRA 1996 s 108 | Confirmed | Footnote now says the longer period is agreed "after the dispute has been referred" |
| 5 | Limitation Act 1980 ss 5 and 8(1) | Confirmed | None |
| 6 | TCC Annual Report 2023-24: 423 claims; 83% settled | Corrected (432, not 423; 83% is of trials listed) | None (not on the site) |
| 7 | Building Safety Act 2022 s 135 (Limitation Act 1980 s 4B) | Confirmed | None (not on the site) |
| 8 | JCT Design and Build Contract 2016, clauses 2.24 to 2.26 | Confirmed | None (not on the site) |
| 9 | NEC4 ECC clause 61.3; FIDIC 2017 Red Book sub-clause 20.2.1 | NEC4 confirmed; FIDIC confirmed from secondary sources only | None (not on the site) |
| 10 | Abrahamson, "records" quotation | Corrected ("if there is arbitration", no "an"); 4th edn 1979 p 443, 3rd edn 1975 p 396 | None; site paraphrase and footnote are accurate |
| 11 | Judicial AI guidance; Ayinde; Gestmin at [22] | Confirmed, with two corrections | None (not on the site) |
| 12 | McKinsey, "Imagining construction's digital future" (June 2016) | Confirmed | None (not on the site) |
| 13 | CITB workforce forecast | Corrected (superseded; report renamed) | None (not on the site) |
| 14 | Companies House, VeriCase Ltd | Corrected (wrong company number) | Footer company number and registered office corrected |
| 15 | UK IPO trade marks | Not found for VeriCase; The Chronology Lens applied for and opposed | None in this PR; see recommendation |

## 1. NISTA Major Projects Annual Report 2025-26

**Status: confirmed.**

- Publication page: <https://www.gov.uk/government/publications/nista-major-projects-annual-report-2025-26>, first published 13 July 2026.
- HTML report: <https://www.gov.uk/government/publications/nista-major-projects-annual-report-2025-26/nista-major-projects-annual-report-2025-26>
- Interactive report (Annex A and Figure 5): <https://ar26.nista.grid.civilservice.gov.uk/report> and <https://ar26.nista.grid.civilservice.gov.uk/trends>
- Project data: <https://assets.publishing.service.gov.uk/media/6a4fb28da6586e258d371bfd/NISTA_Major_Projects_Annual_Report_2025-2026_Data.csv>

Quotations:

- Snapshot date (publication page): "The GMPP data presented here was reported to the NISTA by departments on 31 March 2026."
- Category size (section 6.1): "Currently there are 68 projects in the portfolio, also 68 last year, with a total WLC of £450.0bn".
- Portfolio totals (section 8): "At this year's snapshot (end of March 2026), 29 projects were rated Green (15% of the GMPP), 34 projects were assigned Red (18%), 109 projects (58%) were rated Amber and 17 were exempt (9%)."
- Figure 5 (DCAs by project category), Infrastructure and Construction, as shown in the chart's own tooltip: Red 14.71, Amber 57.35, Green 17.65, Exempt 10.29 (per cent of 68). These are exactly 10, 39, 12 and 7 projects.

Category counts. The report text does not state the Infrastructure and Construction counts in words; they come from Figure 5 and the published data. Taking each project's published rating (the NISTA rating where one is given, otherwise the SRO's), the data file gives **39 Amber, 10 Red, 12 Green and 7 exempt** for the 68 Infrastructure and Construction projects. The same method reproduces the report's portfolio totals exactly (109 Amber, 34 Red, 29 Green, 17 exempt), which validates it. 49 of 68 is 72.06%. Of the 61 projects with a published rating, 49 is 80%; the site correctly uses all 68 as the base.

Rating definitions (Annex A, "Explanation of DCA colour ratings"):

- "The DCA is an evaluation from the IPA or the SRO of a project's likelihood of achieving its aims and objectives and doing so on time and on budget."
- Green: "Successful delivery of the project on time, budget and quality appears highly likely and there are no major outstanding issues that at this stage appear to threaten delivery significantly."
- Amber: "Successful delivery appears feasible but significant issues already exist, requiring management attention. These appear resolvable at this stage and, if addressed promptly, should not present a cost/schedule overrun."
- Red: "Successful delivery of the project appears to be unachievable. There are major issues with project definition, schedule, budget, quality and/or benefits delivery, which at this stage do not appear to be manageable or resolvable. The project may need re-scoping and/or its overall viability reassessed."
- Section 8 adds: "a red delivery confidence assessment does not mean a project will fail."

The site's footnote ("The rating measures delivery confidence, not delay") is consistent with these definitions. Note for future edits: NISTA refocused the portfolio "to approximately 80 projects" in April 2026, so the 68 describes the portfolio as at 31 March 2026, as the footnote already says.

## 2. HKA, CRUX Insight Eighth Annual Report (November 2025)

**Status: confirmed.** The full report is behind a registration form, which was not submitted. HKA's own press release and pages are the primary quotation.

- Press release (published 5 November 2025): <https://www.hka.com/news/crux-insight-eighth-annual-report-from-insight-to-foresight/>
- Landing page: <https://www.hka.com/crux-insight/>
- "Distressed" wording: <https://www.hka.com/news/whats-changing-in-global-construction-disputes/> (27 January 2026) and <https://content.hka.com/crux-insight-eighth-annual-report-download>

Quotations (press release):

- Scope: "over 2,200 projects in 114 countries from investigations by HKA consultants".
- Cost: "Sums in dispute averaged 33.4% of contract budgets."
- Time: "Time extensions sought by contractors amounted to 65.8% of planned schedules."
- HKA calls both figures "cumulative averages".

Notes:

- The report's title is "From Insight to Foresight". The site's footnote phrase "on which HKA was engaged" was a paraphrase; it now follows HKA's wording.
- The brief's "Extensions of time sought averaged 65.8%" is a fair reading of "cumulative averages", though HKA's verb is "amounted to".
- HKA says these averages were "a couple of points lower than last year". The Seventh report gave 33.2% and 66.5%, so the cost figure in fact rose slightly. The site should not state a year-on-year trend.
- No Ninth edition had been published by 25 September 2026. The Seventh and Eighth were both autumn releases, so recheck before any relaunch after October 2026.

## 3. King's College London and the Adjudication Society (November 2024)

**Status: confirmed, with corrections to wording.**

- Report: <https://www.kcl.ac.uk/construction-law/assets/kcl-dpsl-construction-adjudication-report-3.0-2024-update-digital-aw1.pdf> (identical copy at <https://www.adjudication.org/sites/default/files/KCL_Update_2024_Report.pdf>)
- Launch: <https://www.kcl.ac.uk/news/kings-publishes-third-construction-adjudication-report-focusing-on-key-trends> (20 November 2024)

Title and authors: *2024 Construction Adjudication in the United Kingdom: Tracing trends and guiding reform*, by Professor Renato Nazzini and Aleksander Godhe, Centre of Construction Law and Dispute Resolution, King's College London, in collaboration with the Adjudication Society, published November 2024.

Quotations:

- Referrals (p 18): "Between May 2023 and April 2024, those ANBs received 2,264 referrals." The report continues that this is the "highest number of adjudication referrals ever recorded" since statutory adjudication began in 1998. "Highest" is the report's own wording, not an inference from its chart.
- Causes (p 28, Figure 16): inadequate contract administration was named "by 50% of questionnaire respondents", and lack of competence of project participants by 42%. The note to Figure 16 says the chart is based on 165 responses and that respondents could select several options.

Corrections:

- The count is of referrals received by the ten nominating bodies that answered the questionnaire, and the report calls them "adjudication referrals", not "statutory" referrals (some nominating-body work falls outside the statutory scheme). The site label now reads "adjudication referrals to nominating bodies in one year, the highest then recorded", and the footnote gives the full title and says "the participating adjudicator nominating bodies".
- The 50% and 42% are shares of **survey respondents** naming each cause, not shares of disputes. Any future copy should say so, for example: "named by 50% of respondents as a leading cause of adjudicated disputes". These figures are not on the site at present.

Later editions: none. The Adjudication Society home page still gives the November 2024 report as its latest, and the report's foreword describes it as possibly the final report in a three-year project. 2,264 has not been exceeded in any published edition, so "the highest then recorded" is accurate.

## 4. Housing Grants, Construction and Regeneration Act 1996, s 108

**Status: confirmed; footnote made more precise.**

- Source: <https://www.legislation.gov.uk/ukpga/1996/53/section/108> (revised text, via `/data.xml`; no outstanding effects shown).

Quotation, s 108(2) (the contract shall include provision in writing so as to):

> (a) enable a party to give notice at any time of his intention to refer a dispute to adjudication;
> (b) provide a timetable with the object of securing the appointment of the adjudicator and referral of the dispute to him within 7 days of such notice;
> (c) require the adjudicator to reach a decision within 28 days of referral or such longer period as is agreed by the parties after the dispute has been referred;
> (d) allow the adjudicator to extend the period of 28 days by up to 14 days, with the consent of the party by whom the dispute was referred;

All four points in the brief are correct. Correction: the footnote said the period is extendable "or longer if both parties agree". Section 108(2)(c) requires that agreement to be made after the dispute has been referred; an agreement in the contract itself does not suffice. The footnote now ends "or longer if both parties agree after the dispute has been referred."

## 5. Limitation Act 1980, ss 5 and 8(1)

**Status: confirmed.**

- s 5: <https://www.legislation.gov.uk/ukpga/1980/58/section/5>: "An action founded on simple contract shall not be brought after the expiration of six years from the date on which the cause of action accrued."
- s 8(1): <https://www.legislation.gov.uk/ukpga/1980/58/section/8>: "An action upon a specialty shall not be brought after the expiration of twelve years from the date on which the cause of action accrued."

Both provisions extend to England and Wales, as the footnote says. A contract executed as a deed is a specialty. legislation.gov.uk lists one unapplied effect against the whole Act (the Digital Markets, Competition and Consumers Act 2024, s 234(4), which applies the Act); it does not change the wording of either section.

## 6. Technology and Construction Court Annual Report 2023-24

**Status: corrected.** Neither figure is on the site at present.

- Report: <https://www.judiciary.uk/wp-content/uploads/2025/02/TCC-annual-report-23-24-Final-006.pdf> (landing page <https://www.judiciary.uk/guidance-and-resources/technology-and-construction-court-annual-report-2023-24/>, 20 February 2025). Reporting year: 1 October 2023 to 30 September 2024.

Quotations:

- Claims (para 4.7): "During October 2023 to September 2024 there were 432 new claims brought to the London TCC. This represents a decrease of 7.49% from the previous year, when 467 new claims were registered, falling back to the pre-Covid level."
- Settlement (para 4.8): "During the year there were 65 trials listed at the TCC. Only 11 were eventually contested resulting in 83% of cases settling before judgment."

Corrections:

- The figure is **432**, not 423. "423" does not appear in the report, and the stated 7.49% fall from 467 works only for 432. The 2024-25 report also gives the previous year as 432.
- The 83% is a share of the **65 cases listed for trial**, not of all cases. Suggested wording: "83% of the cases listed for trial in the London TCC settled before judgment (2023-24)".

Later edition: the 2024-25 report was published on 20 May 2026 (<https://www.judiciary.uk/guidance-and-resources/annual-report-of-the-technology-and-construction-court-2024-2025/>). It gives 450 new London claims for October 2024 to September 2025, and 85% of the 102 trials listed settling before judgment. Use these if current figures are wanted.

## 7. Building Safety Act 2022, s 135 (Limitation Act 1980, s 4B)

**Status: confirmed.** Not on the site at present.

- s 4B: <https://www.legislation.gov.uk/ukpga/1980/58/section/4B>; s 135: <https://www.legislation.gov.uk/ukpga/2022/30/section/135> (in force 28 June 2022).

Quotations (s 4B):

- (1) "Where by virtue of a relevant provision a person becomes entitled to bring an action against any other person, no action may be brought after the expiration of 15 years from the date on which the right of action accrued."
- (4) "Where by virtue of section 1 of the Defective Premises Act 1972 a person became entitled, before the commencement date, to bring an action against any other person, this section applies in relation to the action as if the reference in subsection (1) to 15 years were a reference to 30 years."

The brief's summary is accurate. For precision in any future copy: the 15-year period also covers s 2A of the 1972 Act and s 38 of the Building Act 1984 (s 4B(3)); the 30-year period applies only to s 1 claims that accrued before 28 June 2022; and s 135(3) to (6) make the change retrospective, subject to dismissal where needed to avoid a breach of a defendant's Convention rights and excluding claims already settled or finally determined.

## 8. JCT Design and Build Contract 2016

**Status: confirmed.** Not cited on the site at present. JCT forms are copyright and sold by the publisher, so quotations are kept short.

Sources (publisher's text):

- DB/Scot 2016 (JCT and SBCC), pp 32 to 33: <https://www.scottishbuildingcontracts.com/files/5d22610e120b9-sbc563.pdf>
- Two DB 2016 contracts produced on JCT's online service and published on Contracts Finder: <https://www.contractsfinder.service.gov.uk/Notice/Attachment/d70ff3ee-cd69-4260-892c-468c5471c977> (pp 34 to 35) and <https://www.contractsfinder.service.gov.uk/Notice/Attachment/6f851f33-d34c-475b-98c9-debb04248438> (pp 30 to 31)

The two online-service copies are marked "Amended from published version", but clauses 2.24 to 2.26 are identical, word for word, across all three texts, so this is taken to be the unamended wording. A publisher's copy of the unamended English form was not obtained.

- **Clause 2.24** ("Notice by Contractor of delay to progress"): confirmed. 2.24.1 matches the brief: if and whenever "it becomes reasonably apparent" that progress "is being or is likely to be delayed", the Contractor "shall forthwith give notice" of the material circumstances, including the cause or causes, and identify any Relevant Event. 2.24.2 requires particulars and an estimate of delay; 2.24.3 requires forthwith notice of any material change. The notice is not expressed as a condition precedent.
- **Clause 2.25** ("Fixing Completion Date"): confirmed. The Employer fixes the later Completion Date it estimates to be "fair and reasonable" (2.25.1), within 12 weeks of receiving the required particulars (2.25.2), and must review not later than 12 weeks after practical completion (2.25.5).
- **Clause 2.26** (Relevant Events): confirmed. There are 14, which in summary are: 2.26.1 Changes; 2.26.2 Employer's instructions (discrepancies under 2.13, except those in the Contractor's Proposals; postponement or Provisional Sums under 3.10 and 3.11; opening up or testing under 3.12 or 3.13.3, unless the work does not comply); 2.26.3 deferment of possession under 2.4; 2.26.4 antiquities (compliance with 3.15.1 or instructions under 3.15.2); 2.26.5 suspension by the Contractor under 4.11; 2.26.6 impediment, prevention or default by the Employer or an Employer's Person; 2.26.7 work, or failure to work, by a Statutory Undertaker; 2.26.8 exceptionally adverse weather; 2.26.9 Specified Perils; 2.26.10 civil commotion or terrorism; 2.26.11 strikes, lock-outs or local combination of workmen; 2.26.12 exercise of statutory powers after the Base Date; 2.26.13 delay in receiving statutory permissions despite all practicable steps; 2.26.14 force majeure.
- **Ground conditions**: confirmed that unforeseen ground conditions are **not** a Relevant Event in the unamended DB 2016. The full text contains no ground or physical conditions event; the only matches for ground conditions, asbestos or contamination are in the insurance provisions. Any relief would have to come through another event, such as antiquities (2.26.4), a Change (2.26.1, including a site-boundary divergence corrected under 2.10), Employer's impediment (2.26.6), Statutory Undertakers (2.26.7) or force majeure (2.26.14).

JCT 2024 edition (Design and Build Contract 2024, published 17 April 2024; publisher's text at <https://www.find-tender.service.gov.uk/Notice/Attachment/A-5394>, pp 29 to 32; corroborated by Brodies, 8 May 2024, <https://brodies.com/insights/construction-and-engineering/jct-2024-design-and-build-in-focus-relevant-events-relevant-matters-and-extensions-of-time/>). There are now 15 Relevant Events. 2.26.4 now also covers the discovery of asbestos, contaminated material or unexploded ordnance (3.15.3 and 3.15.4) unless identified in the Contract Documents or brought on site by the Contractor. There are new events for epidemics and for changes in law and guidance, and "Statutory Undertaker" becomes "Statutory Provider". The decision period in 2.25.2 falls from 12 weeks to 8, and a new 2.24.4 requires the Employer to ask for further information within 14 days. No general ground conditions event was added, and "forthwith" is kept. Any copy that relies on the ground conditions point should name the 2016 edition.

## 9. NEC4 ECC clause 61.3 and FIDIC 2017 Red Book sub-clause 20.2.1

Neither is cited on the site at present.

### NEC4 ECC clause 61.3

**Status: confirmed.**

- Source: *Premier Modular Ltd v Maidstone and Tunbridge Wells NHS Trust* [2026] EWHC 1404 (TCC) at [16], quoting clause 61.3 of an NEC4 Option A contract: <https://caselaw.nationalarchives.gov.uk/ewhc/tcc/2026/1404>. A judgment quoting the clause, not the publisher's text.
- The time bar: if the Contractor "does not notify a compensation event within eight weeks of becoming aware that the event has happened", the Prices, the Completion Date or a Key Date are not changed, unless the event arises from the Project Manager or the Supervisor giving an instruction or notification, issuing a certificate or changing an earlier decision.
- NEC's published amendment schedules (January 2019 and January 2023, <https://www.neccontract.com/>) make no change to 61.3.
- For any future copy: the NEC3 exception for an event the Project Manager "should have notified" but did not is not in NEC4, which uses the event-type exceptions above instead.

### FIDIC 2017 Red Book sub-clause 20.2.1

**Status: confirmed from secondary sources only.** The FIDIC text is sold by FIDIC and was not obtained; unauthorised copies were not used.

- Three practitioner sources quoting the clause agree that the claiming Party must give a Notice to the Engineer "as soon as practicable, and no later than 28 days" after it became aware, or should have become aware, of the event or circumstance: Howard Kennedy (28 November 2024), <https://internationalconstructionknowledgehub.com/no-notice-no-claim-conditions-precedent-in-fidic-contracts/>; HKA, <https://www.hka.com/article/delay-events-in-construction-delay-claims/>; Clyde & Co (May 2023), <https://www.clydeco.com/en/insights/2023/04/fidic-2022-reprints-do-they-achieve-fidic-s-aim>.
- The consequence of late notice (no entitlement to additional time or payment, and discharge of the other Party) sits in 20.2.1 itself. Under 20.2.2 the notice is deemed valid unless the Engineer objects within 14 days, and late notice can be revisited under 20.2.5.
- FIDIC's own list of 2022 reprint amendments (<https://www.fidic.org/sites/default/files/bean_files/2017%20FIDIC%20Red%20-seperated%20errata.pdf>, pp 6 to 7) changes 20.1, 20.2.2, 20.2.4 and 20.2.5, but not 20.2.1.
- For any future copy: the 2017 form says "no later than"; "not later than" is the 1999 wording of sub-clause 20.1.

## 10. Abrahamson, Engineering Law and the I.C.E. Contracts

**Status: corrected (one word); edition and page confirmed from scans of the book.**

How it was confirmed: by full-text search of scanned copies of the book on the Internet Archive, and the Library of Congress catalogue for the first edition. Google Books (quota exceeded) and Jisc Library Hub Discover (automated challenge) could not be used.

- 4th edition (Applied Science Publishers, London, 1979): <https://archive.org/details/engineeringlawic0000abra_x7a6>. The passage is on **p 443**, in the final chapter, "Tendermanship and Claimsmanship", under the paragraph "Records".
- 3rd edition (1975): <https://archive.org/details/engineeringlawic0000abra>. The same passage is on **p 396** (chapter 18). The imprint page reads "First Edition published 1965 Second Edition published 1969 ... Third Edition published 1975".
- First edition: Library of Congress, <https://lccn.loc.gov/65085769>: "C R Books, London, 1965".

Wording. The text in both scanned editions matches the brief's quotation except that the book reads "particularly if there is arbitration", without "an". The correct quotation is: "A party to a dispute, particularly if there is arbitration, will learn three lessons (often too late): the importance of records, the importance of records and the importance of records."

Caveats. The page images are lending-restricted, so the page numbers come from the Internet Archive's page labels (which run in sequence around each page), not from a view of the printed page. Whether the passage appears in the 1965 first edition was not established; the earliest edition confirmed is 1975. The widely repeated "if there is an arbitration" version appears to derive from a case note that gives no edition or page.

Site. The site paraphrases the passage and introduces it with "After", with the footnote "After Max W. Abrahamson, *Engineering Law and the I.C.E. Contracts* (first published 1965)." That footnote is accurate and is not changed. If a pinpoint is wanted, check the printed page first, then use: "After Max W. Abrahamson, *Engineering Law and the I.C.E. Contracts* (4th edn, Applied Science Publishers 1979) p 443 (first published 1965)."

## 11. Legal AI and evidence authorities

**Status: confirmed, with two corrections.** None of these authorities is cited on the site at present.

### (a) Judicial guidance on AI

| Version | Date | Source |
|---|---|---|
| First issue | 12 December 2023 | <https://www.judiciary.uk/wp-content/uploads/2023/12/AI-Judicial-Guidance.pdf> |
| First update | 14 April 2025 (page published 15 April 2025) | <https://www.judiciary.uk/wp-content/uploads/2025/04/Refreshed-AI-Guidance-published-version-website-version.pdf> |
| Current | 31 October 2025 | <https://www.judiciary.uk/guidance-and-resources/artificial-intelligence-ai-judicial-guidance-october-2025/> and <https://www.judiciary.uk/wp-content/uploads/2025/10/Artificial-Intelligence-AI-Guidance-for-Judicial-Office-Holders-2.pdf> |

The current document, *Artificial Intelligence (AI) Guidance for Judicial Office Holders*, "updates and replaces the guidance document issued in April 2025". Section 3 ("Ensure accountability and accuracy") states: "The accuracy of any information you have been provided by an AI tool must be checked before it is used or relied upon." It warns that AI tools may "make up fictitious cases, citations or quotes, or refer to legislation, articles or legal texts that do not exist". No 2026 update was found.

Correction: any copy that treats April 2025 as the latest version should read "first issued 12 December 2023; updated April 2025 and 31 October 2025".

### (b) R (Ayinde) v London Borough of Haringey [2025] EWHC 1383 (Admin)

- Source: <https://caselaw.nationalarchives.gov.uk/ewhc/admin/2025/1383>. Divisional Court (Dame Victoria Sharp P and Johnson J), judgment of the court, 6 June 2025; heard with Al-Haroun v Qatar National Bank QPSC.
- At [7]: "Those who use artificial intelligence to conduct legal research notwithstanding these risks have a professional duty therefore to check the accuracy of such research by reference to authoritative sources, before using it in the course of their professional work (to advise clients or before a court, for example)."
- At [8], the duty "rests on lawyers who use artificial intelligence to conduct research themselves or rely on the work of others who have done so."

### (c) Gestmin SGPS SA v Credit Suisse (UK) Ltd [2013] EWHC 3560 (Comm)

- Source: <https://caselaw.nationalarchives.gov.uk/ewhc/comm/2013/3560>. Leggatt J, 15 November 2013. (BAILII returned an automated challenge and was not used.)
- At [22]: "In the light of these considerations, the best approach for a judge to adopt in the trial of a commercial case is, in my view, to place little if any reliance at all on witnesses' recollections of what was said in meetings and conversations, and to base factual findings on inferences drawn from the documentary evidence and known or probable facts."

Correction: the claimant is **Gestmin SGPS SA** (the judgment also uses "S.A."). "SpA" does not appear in the judgment.

## 12. McKinsey & Company, "Imagining construction's digital future" (June 2016)

**Status: confirmed.** Not on the site at present.

- Article: <https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future> (24 June 2016; Rajat Agarwal, Shankar Chandrasekaran and Mukund Sridhar). mckinsey.com refused direct download on 25 September 2026, so the text was read from the Internet Archive's raw capture of the same URL (16 March 2026): <https://web.archive.org/web/20260316031619id_/https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future>. The PDF version (cover dated June 2016) was read from its capture of 9 January 2019.

The sentence in the brief matches the article's opening paragraph word for word, with "percent" spelt out; in the source it is followed by a reference to Exhibit 1. It is McKinsey's own statement in this article, not a quotation from another report.

Caution: Exhibit 1 draws on mining, infrastructure, and oil and gas projects, and its delay marker is labelled in months ("Average: 20 months"). The quotation is accurate, but any copy should quote it rather than restate it as a percentage delay of its own.

## 13. CITB workforce forecast

**Status: corrected (superseded).** Not on the site at present.

- CITB renamed the Construction Skills Network report the **Construction Workforce Outlook** in June 2025.
- 2025 to 2029 (archived copy of the UK report, <https://web.archive.org/web/20250617131724id_/https://www.citb.co.uk/cwo/reports/cwo_report_united_kingdom.pdf>): "the equivalent of 239,300 extra workers over the next five years" (47,860 a year). Confirmed.
- 2026 to 2030 (published 17 June 2026; <https://www.citb.co.uk/cwo/reports/cwo_report_united_kingdom.pdf>, printed pp 12 to 13): "the equivalent of over 206,000 extra workers over the next five years", an average of 41,200 a year. The landing page (<https://www.citb.co.uk/cwo/index.html>) says "around 206,000".

Correction: use the 2026 to 2030 figure and cite it as CITB, *Construction Workforce Outlook 2026-2030* (June 2026): an average of 41,200 extra workers a year, the equivalent of over 206,000 by 2030.

## 14. Companies House, VeriCase Ltd

**Status: corrected. The company number on the site belongs to a different company.**

- 14789532: <https://find-and-update.company-information.service.gov.uk/company/14789532>: **CURIOUS FLOW LTD**, incorporated 10 April 2023, registered office 90 Clacton Road, London E17 8AR, status "Dissolved", dissolved 11 November 2025 (voluntary strike-off). It has no connection with VeriCase.
- VeriCase: <https://find-and-update.company-information.service.gov.uk/company/16562435>

| Field | Register entry |
|---|---|
| Registered name | VERICASE LTD |
| Company number | 16562435 |
| Registered office | 85 Great Portland Street, London, England, W1W 7LT |
| Incorporated | 6 July 2025 |
| Status | Active |
| Type | Private limited Company |

Correction made: `frontend/src/lib/site.js` now gives company number 16562435 and the registered office above. The name stays "VeriCase Ltd", which is the registered name in mixed case. `main` still shows "Company No. 14789532" in the footer; PR 1 carries the fix to the live site once merged.

Also noted on the register: the company's first confirmation statement is shown as overdue (due by 19 July 2026).

VAT number GB 445 2891 47: this fails HMRC's check-digit test. The weighted sum of the first seven digits (weights 8 to 2) is 161; adding the check digits 47 gives 208, which is not divisible by 97 (remainder 14), and adding 55 as well gives 263 (remainder 69). A valid number with these first seven digits would end 33 or 75. It must not be used. PR 1 already removes it; `main` still displays it in the footer. HMRC's public lookup API now requires credentials, so no live lookup was made.

## 15. UK IPO trade marks

**Status: not found (VeriCase); applied for and opposed (The Chronology Lens).**

The UK IPO register (<https://trademarks.ipo.gov.uk/>) returned a security challenge to every automated request, and the challenge was not bypassed. The search was run instead on TMview (<https://www.tmdn.org/tmview/>), the EUIPO database that carries UK IPO data (UK data marked as updated 25 September 2026). Confirm on the UK IPO register itself before relying on this.

| Mark | Number | Filed | Classes | Owner | Status |
|---|---|---|---|---|---|
| The Chronology Lens (word) | UK00004277442 | 14 October 2025 | 9, 42, 45 | VeriCase Ltd, 85 Great Portland Street, London | Application opposed (26 January 2026) |
| VERICASE, VERI CASE, VERI-CASE | none | | | | No application or registration in any office |

Nearby third-party marks: VERICAST (UK00003649485, classes 9, 35, 42, registered, Vericast Corp); VeriCasa (EU 019022613, classes 9, 36, 37, 42, registered); Chronolens (EU 019320391, registered, JS Consult GmbH).

Recommendation (not changed in this PR, as it is not a statistic or footnote): the footer states "VeriCase™ and Chronology Lens™ are trade marks of VeriCase Ltd." Using ™ does not require registration, but the applied-for mark is "The Chronology Lens", the application is under opposition, and nothing has been filed for VERICASE. Consider "VeriCase™ and The Chronology Lens™ are trade marks of VeriCase Ltd.", never use ®, and review the opposition on UK00004277442.

## Changes made in this PR

| File | Change | Reason |
|---|---|---|
| `frontend/src/content/stats.js` | `adjudication.source`: adds "after the dispute has been referred" | Item 4 |
| `frontend/src/content/stats.js` | `referrals.label`: "statutory adjudication referrals" becomes "adjudication referrals to nominating bodies"; `referrals.source` gives the full title and "the participating adjudicator nominating bodies" | Item 3 |
| `frontend/src/content/stats.js` | `sumsInDispute.source`: adds the report title and follows HKA's "investigations by HKA consultants" | Item 2 |
| `frontend/src/lib/site.js` | `COMPANY.number` 14789532 becomes 16562435; `registeredOffice` filled from the register | Item 14 |

No figure shown on the site changed. No new claims were added.

## Observations outside scope

- `Difference.jsx` shows "Processes 50,000+ documents per hour*" and "99.7% accuracy in date extraction*", noted as "Internal benchmark by VeriCase; test conditions are available on request." These are internal performance claims with no external source, so they were not checked here. Before publication, confirm that the benchmark and its test conditions exist in a form that can be produced on request.
