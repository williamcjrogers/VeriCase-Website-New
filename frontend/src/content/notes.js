import { MEDIA } from '@/content/media';

// Numbered notes are cited in the text with [[note:n]] (a brass superscript that opens a Popover).
// `citedIn` is the section of the first citation: the back-link's target without JavaScript.
// Lettered notes cover the page as a whole. Tokens in {{DOUBLE_BRACES}} and open gates block a
// production build until the owner supplies or confirms them (see gates.js).
export const NOTES = [
  {
    n: 1,
    citedIn: 'clock',
    gate: 'G1_jct',
    title: 'JCT Design and Build Contract 2016, clauses 2.24 to 2.26 (summary).',
    body:
      'If and whenever it becomes reasonably apparent that the progress of the Works is being or is likely to be delayed, the Contractor is to give written notice forthwith of the material circumstances, including the cause or causes of the delay, and to identify in the notice any event that in its opinion is a Relevant Event. It is also to give particulars of the expected effects, including an estimate of any expected delay in the completion of the Works beyond the Completion Date, and to keep them up to date (clause 2.24). If, on receiving the notice and particulars, the Employer considers that a Relevant Event has caused or is likely to cause delay to completion beyond the Completion Date, the Employer is to fix such later Completion Date as it then estimates to be fair and reasonable (clause 2.25). Relevant Events are listed in clause 2.26 and include Changes. The amendment that makes notice a condition precedent is part of the fictional sample matter; whether a real contract has that effect depends on its terms.',
  },
  {
    n: 2,
    citedIn: 'clock',
    gate: 'G2_legal',
    title: 'Housing Grants, Construction and Regeneration Act 1996, section 108(2)(c) and (d).',
    body:
      'The contract must require the adjudicator to reach a decision within 28 days of referral, or such longer period as the parties agree after referral, and must allow the adjudicator to extend the period by up to 14 days with the consent of the referring party.',
  },
  {
    n: 3,
    citedIn: 'clock',
    gate: 'G2_legal',
    title: 'NEC4 Engineering and Construction Contract, clause 61.3 (summary).',
    body:
      'A compensation event that the Contractor notifies more than eight weeks after becoming aware that it has happened is barred, subject to the exceptions stated in the clause. Refer to the clause, and to any amendments, in the contract concerned.',
  },
  {
    n: 4,
    citedIn: 'clock',
    gate: 'G2_legal',
    title: 'FIDIC Conditions of Contract, 2017 editions, sub-clause 20.2.1 (summary).',
    body:
      'The claiming party gives notice as soon as practicable, and no later than 28 days after it became aware, or should have become aware, of the event or circumstance. The Particular Conditions may amend this.',
  },
  {
    n: 5,
    citedIn: 'clock',
    gate: 'G2_legal',
    title: 'Limitation Act 1980, sections 5 and 8(1) (England and Wales).',
    body:
      'Six years from the date on which the cause of action accrued for an action founded on simple contract (section 5); twelve years for an action upon a specialty, which includes a contract made by deed (section 8(1)).',
  },
  {
    n: 6,
    citedIn: 'platform',
    gate: 'G4_benchmarks',
    title: 'Throughput benchmark.',
    body:
      '{{BENCHMARK_NOTE_THROUGHPUT}} (to state what counts as a document, the date of the test, the corpus size and composition, the environment, and how the hourly rate was measured)',
  },
  {
    n: 7,
    citedIn: 'platform',
    gate: 'G4_benchmarks',
    title: 'Date-extraction benchmark.',
    body:
      '{{BENCHMARK_NOTE_DATES}} (to state which dates were extracted, the sample size, how extracted dates were verified, what counted as correct, and the date of the test)',
  },
  {
    n: 8,
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
