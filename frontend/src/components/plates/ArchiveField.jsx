import { Sheet, T, r2, rng } from '@/components/plates/drawing';
import '@/components/plates/plates.css';

// Plate 2 (Chapter II): the record as it is kept. The correspondence of the sample matter drawn as
// data, one mark per message. Each mailbox has a lane. Time runs down the sheet a week to a line,
// from ISO week 1 of 2024 (Monday 01 January 2024) to Sunday 27 April 2025, and across each lane
// from Monday to Sunday, so that every message stands at its moment in its week and the weekend
// is the gutter between one mailbox and the next. A message kept in more than one mailbox repeats
// faintly on the same line, at the same moment; automatic replies, another project's mail and items
// not relevant are hollow; the eight exhibits are the only azure. The generator is seeded, so every
// render is the same sheet.

// The sheet and its type: one size of annotation, 10 px at 218 px wide, the narrowest width shown.
const W = 400;
const H = 500;
const FS = 18.5;
const CAP = 13; // cap height of the mono at FS
const LEAD = 25;
const M = 26; // side margins
const GAP = 8; // between a rule and the text or marks beside it

// Across: the sideline in the margin, six lanes, the time scale and its years.
const LANES = ['EA', 'DM', 'SM', 'CM', 'PM', 'SO'];
const [EA, DM, SM, CM, PM, SO] = [0, 1, 2, 3, 4, 5];
const BX = M;
const X0 = BX + 12;
const AX = W - M - FS * 0.6 * 4 - 12;
const X1 = AX - 6;
const LW = (X1 - X0) / LANES.length;
const DAYW = LW / 7;

// Down: the lane heads, the field ruled off above and below, and the note, centred on the sheet.
const WEEKS = 69;
const RP = 5; // one week
const BLOCK = CAP + 2 * GAP + WEEKS * RP + 2 * GAP + CAP + LEAD + 4;
const HEAD = (H - BLOCK) / 2 + CAP;
const Y0 = HEAD + 2 * GAP;
const Y1 = Y0 + WEEKS * RP;
const NOTE = Y1 + 2 * GAP + CAP;
const TICK = 3.2; // a message
const ISSUE = 4; // an exhibit: taller, but short of a week, so that neighbours never touch
const RING = 1.2; // a message set aside

// Time: day 0 is Monday 01 January 2024. Within a day, 07:00 to 19:00 takes the middle three
// fifths and the night closes up.
const DAY0 = Date.UTC(2024, 0, 1);
const day = (iso) => Math.round((Date.parse(`${iso}T00:00:00Z`) - DAY0) / 864e5);
const SPAN = WEEKS * 7;
const hm = (s) => Number(s.slice(0, 2)) + Number(s.slice(3)) / 60;
const inDay = (h) => (h < 7 ? (0.2 * h) / 7 : h > 19 ? 0.8 + (0.2 * (h - 19)) / 5 : 0.2 + (0.6 * (h - 7)) / 12);
const at = (lane, d, h) => ({ x: X0 + LW * lane + DAYW * ((d % 7) + inDay(h)), y: Y0 + RP * (Math.floor(d / 7) + 0.5) });
const rowY = (w) => Y0 + RP * w;

// The calendar: weekdays, bank holidays (England and Wales), the Christmas shutdown and leave.
const dates = Array.from({ length: SPAN }, (_, d) => new Date(DAY0 + d * 864e5));
const BANK = new Set(['2024-01-01', '2024-03-29', '2024-04-01', '2024-05-06', '2024-05-27', '2024-08-26', '2024-12-25', '2024-12-26', '2025-01-01', '2025-04-18', '2025-04-21'].map(day));
const between = (d, a, b) => d >= day(a) && d <= day(b);
const SHUT = (d) => between(d, '2024-12-21', '2025-01-01');
const LEAVE = {
  [EA]: [['2024-07-29', '2024-08-09'], ['2025-02-17', '2025-02-21']],
  [DM]: [['2024-08-12', '2024-08-23'], ['2024-10-28', '2024-11-01'], ['2025-03-12', '2025-03-16']],
  [SM]: [['2024-05-28', '2024-05-31'], ['2024-08-05', '2024-08-09']],
  [CM]: [['2024-04-02', '2024-04-05'], ['2024-08-19', '2024-08-30']],
  [PM]: [['2024-07-22', '2024-08-02'], ['2024-12-16', '2024-12-20']],
  [SO]: [],
};
// The Design Manager is away from noon on 12 March 2025 until 17 March (N-1 answers EV-0138).
const away = (lane, d, h) => SHUT(d) || LEAVE[lane].some(([a, b]) => between(d, a, b) && !(d === day('2025-03-12') && lane === DM && h < 12));
const DOW = [1, 1.08, 1.04, 1, 0.82, 0.05, 0.03];
const dayFactor = (d) => {
  if (BANK.has(d) || SHUT(d)) return 0.03;
  const f = DOW[d % 7];
  return between(d, '2024-01-02', '2024-01-05') || between(d, '2025-01-02', '2025-01-03') ? f * 0.5 : f;
};

// The events of the job that bring bursts of correspondence.
const E = {
  stage4: day('2024-02-05'),
  contract: day('2024-02-26'),
  start: day('2024-03-04'),
  tender: day('2024-05-13'),
  award: day('2024-06-17'),
  facadeDesign: day('2024-07-15'),
  submission: day('2024-09-16'),
  orderA: day('2024-10-14'),
  facadeStart: day('2024-11-11'),
  deliveryA: day('2025-01-13'),
  samples: day('2025-02-10'),
  instruction: day('2025-03-03'),
  notice: day('2025-03-28'),
  reply: day('2025-04-04'),
};
const BURST = 1.6;
const g = (d, c, w, a) => BURST * a * Math.exp(-0.5 * ((d - c) / w) ** 2);
// The weeks of the matter are busy, but no busier than the rest of the job: the record in issue
// sits inside the ordinary traffic of the project.
const gm = (d, c, w, a) => g(d, c, w, a * 0.55);
const ramp = (d, a, b) => Math.min(1, Math.max(0, (d - a) / (b - a)));
const mo = (d, dom, w, a) => g(dates[d].getUTCDate(), dom, w, a);
// The project gathers pace through the first half of 2024.
const pace = (d) => 0.35 + 0.65 * ramp(d, 0, 190);

// Who writes to whom, and how often (messages per working day before the weights below).
const CHANNELS = [
  { lanes: [EA], rate: (d) => 0.3 * pace(d) + g(d, E.samples, 6, 0.4) },
  { lanes: [DM], rate: (d) => 0.55 - 0.2 * ramp(d, E.award, E.facadeStart) + g(d, E.stage4, 5, 1.2) + g(d, E.facadeDesign, 8, 0.5) + g(d, E.submission, 6, 0.5) },
  { lanes: [SM], rate: (d) => 0.08 + 0.55 * ramp(d, E.start - 7, E.start + 28) + g(d, E.facadeStart, 10, 0.5) + gm(d, E.instruction + 12, 8, 0.4) },
  { lanes: [CM], rate: (d) => 0.3 * pace(d) + mo(d, 24, 2, 0.7) * pace(d) + g(d, E.tender, 12, 0.5) },
  { lanes: [PM], rate: (d) => 0.04 + 0.28 * ramp(d, E.award, E.award + 21) + gm(d, E.instruction + 10, 8, 0.4) },
  { lanes: [SO], rate: (d) => 0.03 + 0.08 * ramp(d, E.facadeDesign, E.facadeDesign + 30) },
  { lanes: [EA, DM], cc: [[SM, 0.2], [CM, 0.15]], rate: (d) => 0.22 * pace(d) + g(d, E.stage4, 4, 1.6) + g(d, E.submission, 6, 1) + g(d, E.samples, 6, 1.4) + gm(d, E.instruction, 3, 1) },
  { lanes: [EA, SM], cc: [[DM, 0.3]], rate: (d) => 0.03 + (0.12 + (d % 7 === 1 ? 0.3 : 0)) * ramp(d, E.start, E.start + 30) + g(d, E.facadeStart, 6, 0.4) },
  { lanes: [EA, CM], cc: [[DM, 0.15]], rate: (d) => 0.06 + g(d, E.contract, 4, 1.2) + mo(d, 26, 1.5, 1.1) * (d > E.start ? 1 : 0) + gm(d, E.notice, 2.5, 1) + gm(d, E.reply, 2.5, 0.8) },
  { lanes: [DM, SM], cc: [[CM, 0.15]], rate: (d) => 0.06 + 0.25 * ramp(d, E.start, E.start + 30) + g(d, E.facadeStart, 8, 0.5) + gm(d, E.instruction, 5, 0.6) },
  { lanes: [DM, CM], cc: [[SM, 0.25]], rate: (d) => 0.1 * pace(d) + g(d, E.tender, 10, 0.6) + gm(d, E.instruction + 8, 6, 0.6) },
  { lanes: [SM, CM], cc: [[DM, 0.25]], rate: (d) => 0.03 + 0.2 * ramp(d, E.start, E.start + 30) + mo(d, 22, 2, 0.35) + gm(d, E.instruction + 10, 6, 0.7) },
  { lanes: [DM, PM], cc: [[SM, 0.35]], rate: (d) => 0.02 + 0.2 * ramp(d, E.award, E.award + 14) + g(d, E.facadeDesign, 10, 1.2) + g(d, E.submission, 6, 0.7) + g(d, E.samples, 6, 0.8) + gm(d, E.instruction, 4, 0.8) },
  { lanes: [SM, PM], cc: [[DM, 0.3]], rate: (d) => 0.01 + 0.3 * ramp(d, E.facadeStart - 14, E.facadeStart + 14) + g(d, E.deliveryA, 4, 0.7) + gm(d, E.instruction + 12, 7, 0.7) },
  { lanes: [CM, PM], cc: [[DM, 0.2]], rate: (d) => 0.01 + g(d, E.tender, 7, 1) + g(d, E.award, 4, 1.4) + 0.08 * ramp(d, E.award, E.award + 30) + mo(d, 20, 2, 0.4) * (d > E.award + 20 ? 1 : 0) },
  { lanes: [PM, SO], cc: [[SM, 0.1]], rate: (d) => 0.08 * ramp(d, E.facadeDesign - 14, E.facadeDesign + 14) + g(d, E.facadeDesign, 6, 0.6) + g(d, E.orderA, 4, 1) + g(d, E.deliveryA, 4, 0.6) + gm(d, E.instruction + 12, 6, 1) },
  { lanes: [CM, SO], rate: (d) => 0.005 + g(d, E.orderA, 5, 0.15) },
];
const SCALE = 0.54;
const SOLO = 0.85; // mail kept in one mailbox only
const PAIR = 1.3; // mail between two of the six
// Share of each mailbox's mail that concerns another project.
const OTHER = [0.04, 0.03, 0.03, 0.06, 0.08, 0.16];
// Time of day: morning, afternoon, evening and early weights by the sender's lane.
const HOURS = [
  [0.46, 0.46, 0.05, 0.03],
  [0.44, 0.44, 0.09, 0.03],
  [0.46, 0.38, 0.04, 0.12],
  [0.42, 0.44, 0.11, 0.03],
  [0.46, 0.44, 0.06, 0.04],
  [0.5, 0.47, 0.02, 0.01],
];
// The Contractor's own mailboxes hold the copy the record keeps.
const CONTRACTOR = [DM, SM, CM];

// The record in issue (content/sampleEvidence.json): the lane each exhibit is kept in, and its
// copies elsewhere. The copy of EV-0131 in the Site Manager's mailbox is N-3, the near-duplicate.
const EXHIBITS = [
  { date: '2025-03-03', time: '09:14', lane: DM, copies: [[EA, '09:14'], [SM, '09:14']] }, // EV-0131
  { date: '2025-03-05', time: '10:02', lane: DM, copies: [[PM, '10:02']] }, // EV-0133
  { date: '2025-03-12', time: '16:42', lane: SM, copies: [[PM, '16:42'], [DM, '16:42']] }, // EV-0138
  { date: '2025-03-13', time: '07:55', lane: SM, copies: [[CM, '07:55']] }, // EV-0139
  { date: '2025-03-21', time: '13:00', lane: SM, copies: [] }, // EV-0144, site diary page 41 (a scan, undated by the hour)
  { date: '2025-03-26', time: '11:20', lane: SM, copies: [[PM, '11:20'], [SO, '10:58']] }, // EV-0147, forwarding the Supplier
  { date: '2025-03-28', time: '15:48', lane: CM, copies: [[EA, '15:48']] }, // EV-0151
  { date: '2025-04-04', time: '12:00', lane: CM, copies: [[EA, '12:00']] }, // EV-0153
];
// The other noise items the product sets aside.
const SET_ASIDE = [
  { date: '2025-03-12', time: '16:43', lane: DM }, // N-1, automatic reply
  { date: '2025-03-13', time: '09:30', lane: SO }, // N-2, another project
  { date: '2025-03-17', time: '12:05', lane: SM }, // N-4, weekly canteen menu
];

const build = () => {
  const rand = rng(20250303);
  const normal = () => Math.sqrt(-2 * Math.log(rand() + 1e-12)) * Math.cos(2 * Math.PI * rand());
  const poisson = (l) => {
    const L = Math.exp(-l);
    let k = 0;
    let p = rand();
    while (p > L) {
      k += 1;
      p *= rand();
    }
    return k;
  };
  const hour = (lane) => {
    const [m, a, e] = HOURS[lane];
    const u = rand();
    let h;
    if (u < m) h = 10.2 + 1.3 * normal();
    else if (u < m + a) h = 14.8 + 1.4 * normal();
    else if (u < m + a + e) h = 17.5 + 4 * rand();
    else h = 6 + 2 * rand();
    return Math.min(23.9, Math.max(0.2, h));
  };

  const marks = [];
  const put = (kind, lane, d, h) => marks.push({ kind, lane, ...at(lane, d, h) });
  for (let d = 0; d < SPAN; d += 1) {
    const f = dayFactor(d) * SCALE;
    CHANNELS.forEach((ch) => {
      const pair = ch.lanes.length > 1;
      const absent = ch.lanes.some((l) => away(l, d, 12));
      const n = poisson(ch.rate(d) * f * (pair ? PAIR : SOLO) * (absent ? (pair ? 0.35 : 0.05) : 1));
      for (let i = 0; i < n; i += 1) {
        let sender = ch.lanes[Math.floor(rand() * ch.lanes.length)];
        const h = hour(sender);
        if (away(sender, d, h) && pair) sender = ch.lanes.find((l) => l !== sender);
        const holders = [...ch.lanes];
        (ch.cc || []).forEach(([l, p]) => {
          if (rand() < p && !holders.includes(l)) holders.push(l);
        });
        const kept = CONTRACTOR.includes(sender) ? sender : holders.find((l) => CONTRACTOR.includes(l)) ?? sender;
        if (rand() < OTHER[kept]) {
          put('noise', kept, d, h);
        } else {
          put('navy', kept, d, h);
          holders.filter((l) => l !== kept).forEach((l) => put('faint', l, d, h));
        }
        // An automatic reply from each recipient who is away.
        holders.filter((l) => l !== sender && away(l, d, h)).forEach((l) => {
          if (rand() < 0.6) put('noise', l, d, h + 1 / 60);
        });
      }
    });
  }

  // A clear field round each exhibit, so that the azure reads; then the named items themselves.
  const issue = EXHIBITS.map((e) => ({ lane: e.lane, ...at(e.lane, day(e.date), hm(e.time)) }));
  const kept = marks.filter((m) => !issue.some((e) => e.lane === m.lane && Math.abs(e.y - m.y) < RP * 1.5 && Math.abs(e.x - m.x) < (e.y === m.y ? 4.5 : 2)));
  EXHIBITS.forEach((e) => e.copies.forEach(([l, t]) => kept.push({ kind: 'faint', lane: l, ...at(l, day(e.date), hm(t)) })));
  SET_ASIDE.forEach((n) => kept.push({ kind: 'noise', lane: n.lane, ...at(n.lane, day(n.date), hm(n.time)) }));

  const tick = (m, t = TICK) => `M${r2(m.x)} ${r2(m.y - t / 2)}v${t}`;
  const ring = (m) => `M${r2(m.x - RING)} ${r2(m.y)}a${RING} ${RING} 0 1 0 ${2 * RING} 0a${RING} ${RING} 0 1 0 ${-2 * RING} 0`;
  const path = (kind, fn) => kept.filter((m) => m.kind === kind).map((m) => fn(m)).join('');
  return { navy: path('navy', tick), faint: path('faint', tick), noise: path('noise', ring), issue: issue.map((m) => tick(m, ISSUE)).join('') };
};
const MARKS = build();

// The time scale: a fine tick at each week, a longer one at the week in which each month begins,
// and the longest at each year (ISO week 1 of 2025 begins on Monday 30 December 2024).
const YEAR_ROW = 52;
const monthRows = new Set(dates.map((dt, d) => (dt.getUTCDate() === 1 ? Math.floor(d / 7) : -1)));
const SCALE_PATH = `M${r2(AX)} ${r2(Y0)}V${r2(Y1)}${Array.from({ length: WEEKS + 1 }, (_, w) => `M${r2(AX)} ${r2(rowY(w))}h${w === 0 || w === YEAR_ROW ? 8 : monthRows.has(w) ? 4.5 : 2}`).join('')}`;

// The part of the record in issue: a sideline in the margin across the five weeks from Monday
// 03 March to Sunday 06 April 2025, its stem the leader to the note.
const SIDELINE = `M${BX + 6} ${r2(rowY(61))}H${BX}V${r2(rowY(66))}H${BX + 6}M${BX} ${r2(rowY(66))}V${r2(NOTE - 4.5)}H${X0 - 5}`;

const LABEL =
  'Illustrative drawing: the correspondence of the fictional sample matter as it is kept, one mark per message, in six lanes for the mailboxes of the Employer’s Agent (EA), the Contractor’s Design Manager (DM), Site Manager (SM) and Commercial Manager (CM), the Façade Sub-Contractor’s Package Manager (PM) and the Supplier’s Sales Office (SO). Time runs down the sheet a week to a line, from January 2024 to April 2025. A message kept in more than one mailbox repeats faintly on the same line; automatic replies, another project’s mail and items not relevant are drawn hollow. Near the foot, a bracket gathers the five weeks from 03 March 2025 in which the eight exhibits in issue, EV-0131 to EV-0153, dated 03 March to 04 April 2025, are marked in blue.';

export const ArchiveField = ({ label = LABEL }) => (
  <Sheet viewBox={`0 0 ${W} ${H}`} label={label}>
    {LANES.map((code, i) => (
      <T key={code} x={X0 + LW * i + DAYW * 2.5 + FS * 0.04} y={HEAD} size={FS} anchor="middle" className="dw-t-label">
        {code}
      </T>
    ))}
    <path d={`M${r2(X0)} ${r2(Y0 - GAP)}H${r2(X1)}M${r2(X0)} ${r2(Y1 + GAP)}H${r2(X1)}`} className="dw-thin" />
    <path d={`M${r2(X0)} ${r2(rowY(YEAR_ROW))}H${r2(X1)}`} className="dw-grid" />
    <path d={SCALE_PATH} className="dw-thin" />
    <T x={AX + 12} y={Y0 + CAP / 2} size={FS}>
      2024
    </T>
    <T x={AX + 12} y={rowY(YEAR_ROW) + CAP / 2} size={FS}>
      2025
    </T>

    <path d={MARKS.faint} className="dw-hatch" />
    <path d={MARKS.navy} className="dw-line" />
    <path d={MARKS.noise} className="dw-thin" />
    <path d={MARKS.issue} className="dw-cut dw-issue" />

    <path d={SIDELINE} className="dw-thin" />
    <T x={X0} y={NOTE} size={FS}>
      In issue: EV-0131 to EV-0153
    </T>
    <T x={X0} y={NOTE + LEAD} size={FS}>
      03 March to 04 April 2025
    </T>
  </Sheet>
);
