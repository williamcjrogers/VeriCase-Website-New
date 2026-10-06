import { MEDIA } from '@/content/media';

// Numbered notes are cited in the text with [[note:n]] (a brass superscript that opens a Popover).
// `citedIn` is the section of the first citation: the back-link's target without JavaScript.
// Lettered notes cover the page as a whole. Tokens in {{DOUBLE_BRACES}} and open gates block a
// production build until the owner supplies or confirms them (see gates.js).
export const NOTES = [
  // The collaboration section's figures (owner, 06 October 2026). Note 1 is sourced; notes 2 and 3
  // set out a model, and the page marks both of its figures as estimates.
  {
    n: 1,
    citedIn: 'collaboration',
    gate: 'G13_collabStats',
    title: 'Email volume.',
    body:
      'Microsoft WorkLab, “Breaking down the infinite workday”, Work Trend Index Special Report, 17 June 2025: the average worker receives 117 emails a day, most of them skimmed in under a minute. The figure is a mean across aggregated and anonymised productivity signals from Microsoft’s workplace software, to 15 February 2025, excluding education and European Union customers. It is not specific to construction or legal work.',
  },
  {
    n: 2,
    citedIn: 'collaboration',
    gate: 'G13_collabStats',
    title: 'One round by email: a modelled example.',
    body:
      'A modelled example, not a measurement. (1) The contractor’s commercial manager emails the document to the solicitor, copying the supervising partner: two deliveries. (2) The solicitor forwards it to counsel, copying the partner: two. (3) The solicitor forwards it to both experts, copying the partner: three. (4) Counsel replies to the solicitor and the partner: two. (5) One expert replies to all: three. (6) The solicitor reports back to the commercial manager, copying the partner: two. That is six emails and fourteen inbox deliveries, with the document in five inboxes. In VeriCase the same round is one thread on the record, with nothing attached; VeriCase may still notify people by email.',
  },
  {
    n: 3,
    citedIn: 'collaboration',
    gate: 'G13_collabStats',
    title: 'Professional time: a modelled cost.',
    // The owner's verified rates and model (owner, 06 October 2026, with the workbook of the same
    // date): the basis of each rate is in docs/design/website-capability-register.md (E13). The page
    // shows the figures rounded; collaborationModel.test.js checks the sums.
    body: [
      'A modelled cost of the time spent on the email rounds, not a measured saving: what share of that time a shared thread removes has not been measured. Each round is assumed to take 40 minutes of professional time in all: the contractor’s commercial manager 10 minutes at £47.50 an hour, the solicitor 12 minutes at £305, the supervising partner 3 minutes at £579, counsel 5 minutes at £150, and each of two experts, on delay and on quantum, 5 minutes at £253.73. That is £152.66 a round: £18,318.60 for 120 rounds in one adjudication and, over a dispute lasting two to three years, £137,389.50 for 900 rounds (300 documents, each discussed three times), £22,898.25 on a conservative case of 300 rounds at half the minutes, and £366,372.00 on a high case of 2,400 rounds (600 documents, each discussed four times).',
      'The commercial manager’s rate is an estimate of the internal cost to the contractor, not a charge-out rate: a gross salary of £57,000 (the lower end of the range RICS publishes for senior and management quantity surveyors), with employer National Insurance at 15% of earnings above £5,000 (HMRC, rates and thresholds for employers 2026 to 2027), the statutory minimum employer pension contribution of 3% of qualifying earnings and a 25% overhead, divided by 1,740 working hours a year (a 37.5-hour week, less 5.6 weeks’ statutory holiday).',
      'The solicitor’s and partner’s rates are the HMCTS guideline hourly rates for Grade\u00a0C and Grade\u00a0A fee earners in London\u00a01 (very heavy commercial and corporate work by centrally based London firms), in effect from 01 January 2026. The courts use guideline rates as a starting point for the summary assessment of costs; actual charges may be higher.',
      'There is no official guideline hourly rate for barristers, so counsel’s rate is the Attorney General’s London A Panel rate for government civil work, in effect from 01 April 2025: a conservative figure, as rates charged to private clients in construction disputes are typically higher.',
      'The experts’ rate is the average hourly rate for report writing reported by expert witnesses working in the civil courts, across all disciplines, in the Bond Solon Expert Witness Survey 2025 (published 07 November 2025; 525 respondents). It is not specific to delay or quantum experts.',
      'The minutes, the numbers of rounds, the overhead and the working week are our assumptions; the rates are as checked on 06 October 2026. Much of the time in a round is reading and replying, which takes place wherever the discussion is held. The cost in any matter depends on its volume of correspondence and the rates paid.',
    ],
  },
  {
    n: 12,
    citedIn: 'clock',
    gate: 'G1_jct',
    title: 'JCT Design and Build Contract 2016, clauses 2.24 to 2.26 (summary).',
    body:
      'If and whenever it becomes reasonably apparent that the progress of the Works is being or is likely to be delayed, the Contractor is to give written notice forthwith of the material circumstances, including the cause or causes of the delay, and to identify in the notice any event that in its opinion is a Relevant Event. It is also to give particulars of the expected effects, including an estimate of any expected delay in the completion of the Works beyond the Completion Date, and to keep them up to date (clause 2.24). If, on receiving the notice and particulars, the Employer considers that a Relevant Event has caused or is likely to cause delay to completion beyond the Completion Date, the Employer is to fix such later Completion Date as it then estimates to be fair and reasonable (clause 2.25). Relevant Events are listed in clause 2.26 and include Changes. The amendment that makes notice a condition precedent is part of the fictional sample matter; whether a real contract has that effect depends on its terms.',
  },
  {
    n: 13,
    citedIn: 'clock',
    gate: 'G2_legal',
    title: 'Housing Grants, Construction and Regeneration Act 1996, section 108(2)(c) and (d).',
    body:
      'The contract must require the adjudicator to reach a decision within 28 days of referral, or such longer period as the parties agree after referral, and must allow the adjudicator to extend the period by up to 14 days with the consent of the referring party.',
  },
  {
    n: 14,
    citedIn: 'clock',
    gate: 'G2_legal',
    title: 'NEC4 Engineering and Construction Contract, clause 61.3 (summary).',
    body:
      'A compensation event that the Contractor notifies more than eight weeks after becoming aware that it has happened is barred, subject to the exceptions stated in the clause. Refer to the clause, and to any amendments, in the contract concerned.',
  },
  {
    n: 15,
    citedIn: 'clock',
    gate: 'G2_legal',
    title: 'FIDIC Conditions of Contract, 2017 editions, sub-clause 20.2.1 (summary).',
    body:
      'The claiming party gives notice as soon as practicable, and no later than 28 days after it became aware, or should have become aware, of the event or circumstance. The Particular Conditions may amend this.',
  },
  {
    n: 16,
    citedIn: 'clock',
    gate: 'G2_legal',
    title: 'Limitation Act 1980, sections 5 and 8(1) (England and Wales).',
    body:
      'Six years from the date on which the cause of action accrued for an action founded on simple contract (section 5); twelve years for an action upon a specialty, which includes a contract made by deed (section 8(1)).',
  },
  {
    n: 9,
    citedIn: 'platform',
    gate: 'G4_benchmarks',
    title: 'Throughput benchmark.',
    body:
      '{{BENCHMARK_NOTE_THROUGHPUT}} (to state what counts as a document, the date of the test, the corpus size and composition, the environment, and how the hourly rate was measured)',
  },
  {
    n: 10,
    citedIn: 'platform',
    gate: 'G4_benchmarks',
    title: 'Date-extraction benchmark.',
    body:
      '{{BENCHMARK_NOTE_DATES}} (to state which dates were extracted, the sample size, how extracted dates were verified, what counted as correct, and the date of the test)',
  },
  {
    n: 11,
    citedIn: 'about',
    gate: 'G6_ui',
    title: 'United Infrastructure.',
    body:
      '{{UI_CASE_NOTE}} (forum, dates and outcome in the party’s own factual terms, as approved and substantiated). United Infrastructure is an associated company of VeriCase’s founder.',
  },
];

export const LETTERED_NOTES = [
  {
    k: 'A',
    title: 'The sample matter and illustrations.',
    body:
      'The parties, events, documents, message IDs and exhibit references in the sample matter and its product demonstrations are fictional, as is the sample amendment to clause 2.24. This does not apply to the named founders, company details or cited external sources. The hashes shown are the real SHA-256 values of the fictional text. Product screens are simplified illustrations built in code, not screenshots of any real matter.',
  },
  {
    k: 'B',
    title: 'Plates and imagery.',
    // The plates are drawn in code unless an approved photograph replaces one (gate G10); the
    // computer-generated sentence appears only when some photograph, film or the EV-0144 scan is in use.
    body: [
      'The plates are illustrative drawings of the fictional sample matter, made in code for this page. They do not reproduce any real drawing, schedule or bundle.',
      Object.values(MEDIA).some((m) => m && m.src)
        ? MEDIA.diaryPage.src
          ? 'Photographs and video captioned as illustrative, and the scanned diary page shown as EV-0144, are computer-generated. They do not depict a VeriCase client, project, person or matter.'
          : 'Photographs and video captioned as illustrative are computer-generated. They do not depict a VeriCase client, project, person or matter.'
        : '',
    ]
      .filter(Boolean)
      .join(' '),
  },
  {
    k: 'C',
    title: 'Legal summaries.',
    body:
      'Summaries of legislation and contract terms are for orientation only. The statute and the contract govern, contracts are often amended, and nothing on this page is legal advice.',
  },
];

export const noteByNumber = (n) => NOTES.find((note) => note.n === n);
