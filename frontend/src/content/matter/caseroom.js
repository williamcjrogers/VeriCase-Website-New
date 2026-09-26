// The case room: the 28-day grid and the Rebuttal Mode schedule (Chapter V, Figs 7 and 8).
// Nothing here is real: see note A.
import { fill, plural } from '@/lib/format';

export const DAY_GRID = {
  title: '28 days from referral',
  markers: [
    { day: 0, date: '2026-01-20', label: 'Referral' },
    { day: 14, date: '2026-02-03', label: 'Response (fictional directions)' },
    { day: 21, date: '2026-02-10', label: 'Reply (fictional directions)' },
    { day: 28, date: '2026-02-17', label: 'Decision due' },
  ],
  extension: 'Days 29 to 42 · Extension to 42 days with the referring party’s consent',
  extensionNote: 2,
  note: 'Or longer, if both parties agree after referral. The dates for the Response and the Reply are the fictional adjudicator’s directions, not periods fixed by the Act.',
  textEquivalent:
    'Day 0, 20 January 2026: referral. Day 14, 03 February 2026: Response, under the fictional directions. Day 21, 10 February 2026: Reply, under the fictional directions. Day 28, 17 February 2026: decision due. Days 29 to 42, to 03 March 2026: available only with the referring party’s consent, or longer if both parties agree.',
  stations: [
    { day: 14, heading: 'Day 14 · 03 February 2026 · The Response arrives' },
    { day: 21, heading: 'Day 21 · 10 February 2026 · The Reply is served' },
    { day: 28, heading: 'Day 28 · 17 February 2026 · Decision due' },
  ],
  dayOf: 'Day {n} of 28',
};

export const SCOTT = {
  caption: 'Rebuttal Mode: the Employer’s Response (fictional), paragraphs 4.12 and 4.13',
  heads: ['Response', 'Proposed reply', 'Evidence, ranked', 'Decision'],
  rows: [
    {
      para: '4.12',
      response:
        'It was reasonably apparent by 12 March 2025 that progress was likely to be delayed. Notice on 28 March 2025 was not given forthwith and, under clause 2.24 as amended, the Contractor is not entitled to a later Completion Date.',
      replyBefore: 'Denied. Delay was not reasonably apparent until 26 March 2025.',
      replyAfter:
        'Denied. The email of 12 March 2025 gave a lead time from order, not a delivery date [EV-0138]. A delivery date was first given to the Contractor on 26 March 2025 [EV-0147], and notice followed two days later [EV-0151].',
      evidence: [
        { ev: 'EV-0138', reasons: ['Content: lead time, delivery date', 'Date window: March 2025', 'Participants: both parties to 4.12'] },
        { ev: 'EV-0147', reasons: ['Content: delivery confirmed'] },
        { ev: 'EV-0151', reasons: ['Content: notice, clause 2.24'] },
        { ev: 'EV-0139', reasons: ['Content: notify, firm date'] },
      ],
      decision: 'edited',
      audit: 'Edited by External Counsel · 05 February 2026, 17:02 · before and after retained',
      suggestion: {
        text: 'The Site Manager did not anticipate any delay before 26 March 2025 [EV-0139].',
        decision: 'rejected',
        reason: 'Rejected: EV-0139 does not support this. The email anticipates delay and asks for a firm date before notice.',
        audit: 'Rejected by Senior Lawyer · 05 February 2026, 17:10',
      },
      live: 'Point 4.12: four items suggested.',
    },
    {
      para: '4.13',
      response: 'The email of 03 March 2025 clarified the Employer’s Requirements. It was not an instruction requiring a Change.',
      replyAfter:
        'Denied. The email states that it is ‘an instruction requiring a Change’ [EV-0131], and the Contractor acted on it as a Change on 05 March 2025 [EV-0133].',
      evidence: [
        { ev: 'EV-0131', reasons: ['Content: instruction, Change', 'Date window: March 2025', 'Participants: both parties to 4.13'] },
        { ev: 'EV-0133', reasons: ['Content: Change, price, lead time'] },
      ],
      decision: 'accepted',
      audit: 'Accepted by Senior Lawyer · 04 February 2026, 09:40 · proposed text retained',
      live: 'Point 4.13: two items suggested.',
    },
  ],
  controls: { accept: 'Accept', edit: 'Edit', reject: 'Reject', save: 'Save', cancel: 'Cancel' },
  states: { accepted: 'Accepted', edited: 'Edited', rejected: 'Rejected' },
  guard: 'A reply point must cite at least one item of evidence.',
  guardPattern: /\[EV-\d{4}\]/,
  demoAudit: 'Changed in this demonstration · before and after retained',
  liveAccepted: 'Reply accepted and recorded.',
  liveEdited: 'Reply edited and recorded.',
  liveRejected: 'Reply rejected and recorded.',
  beforeLabel: 'Before',
  suggestedLabel: 'Suggested',
  exportLead: 'Export: each point in the Response paired with its reply and the evidence cited.',
  exportCounts: '{points} · {replies} · {exhibits}',
  // The counts as recorded in the sample matter; the schedule recomputes them from its decisions.
  exportRecorded: { points: 2, replies: 2, exhibits: 5 },
};

// "2 points · 2 replies · 5 exhibits", with singular forms. A count never parts from its noun, and
// the line breaks only after a middle dot.
export const exportCountsText = ({ points, replies, exhibits }) =>
  fill(SCOTT.exportCounts, { points: plural(points, 'point'), replies: plural(replies, 'reply', 'replies'), exhibits: plural(exhibits, 'exhibit') })
    .replace(/(\d) /g, '$1\u00a0')
    .replace(/ · /g, '\u00a0· ');
