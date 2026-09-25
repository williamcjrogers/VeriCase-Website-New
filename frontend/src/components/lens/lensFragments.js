// Fig. 1 data: the scattered record on the desk, where each item lies, the lens position at
// which its processing begins, what the processing shows and what becomes of it. Positions are
// percentages of the field: `d` for the desktop cast (5:4), `m` for the mobile cast (4:5).
// EV-0144 and N-1 are desktop only; CSS removes them below 640 px from first paint.
import { COVER } from '@/content/home';
import { LENS_ROWS, NOISE, PARTIES, WORKBENCH, recordById } from '@/content/sampleMatter';
import { fill, formatDate } from '@/lib/format';

// PENDING shared change: these processing labels are in the spec (3.3, "Fragment processing
// labels") but not yet in src/content/home.js. Proposed home: COVER.fig.chips.
export const PENDING_CHIPS = {
  thread: 'Thread {n} · {count} messages',
  references: 'Threaded by References header',
  ocr: 'Scanned page read by OCR',
  attachment: 'Attachment extracted: {file}',
  placed: 'Placed in order: {date}',
};

// Column heads over the chronology, and the name of the stage rail (small UI strings).
export const HEADS = { date: 'Date', time: 'Time', parties: 'Parties', exhibit: 'Exhibit' };
export const RAIL_LABEL = 'Lens stages';

// The stage names from the copy deck, one for each stop of the lens.
export const STAGES = COVER.fig.stages;

const noise = (id) => NOISE.find((n) => n.id === id);
const thread = ['EV-0131', 'EV-0138', 'EV-0139'];
const email = (id) => PARTIES[recordById(id).from].email;

// One entry per item on the desk, in the order they sit in the pile (later ones on top).
export const FRAGMENTS = [
  {
    id: 'EV-0131',
    kind: 'email',
    t: 6,
    d: [3, 8, -3],
    m: [3, 2, -3],
    effect: 'straighten',
    chip: fill(PENDING_CHIPS.thread, { n: 1, count: thread.length }),
  },
  { id: 'EV-0138', kind: 'email', t: 14, d: [12, 46, 2], m: [7, 44, 2], chip: PENDING_CHIPS.references },
  {
    id: 'EV-0139',
    kind: 'email',
    t: 24,
    d: [26, 18, -1.5],
    m: [20, 17, -1.5],
    effect: 'fold',
    gate: 'G5_quoted',
    chip: fill(WORKBENCH.quotedChip, { n: recordById('EV-0139').quoted.length }),
  },
  // The thumbnail's label hangs beside it, so it leaves once the lens has passed the page (`until`).
  { id: 'EV-0144', kind: 'scan', t: 34, until: 50, d: [32, 62, 3], m: null, effect: 'scan', chip: PENDING_CHIPS.ocr, desktopOnly: true },
  { id: 'N-3', kind: 'nearDuplicate', t: 44, d: [42, 47, 4], m: [37, 31, 4], effect: 'duplicate', aside: true, gate: noise('N-3').gate, chip: noise('N-3').fate },
  { id: 'N-1', kind: 'autoReply', t: 50, d: [50, 70, -4], m: null, effect: 'fade', aside: true, gate: noise('N-1').gate, chip: noise('N-1').fate, desktopOnly: true },
  { id: 'N-2', kind: 'otherProject', t: 56, d: [56, 10, -2], m: [52, 4, -2], effect: 'exclude', aside: true, chip: noise('N-2').fate },
  {
    id: 'EV-0147',
    kind: 'email',
    t: 64,
    d: [64, 44, 2.5],
    m: [55, 52, 2.5],
    effect: 'attachment',
    chip: fill(PENDING_CHIPS.attachment, { file: recordById('EV-0147').attachments[0] }),
  },
  {
    id: 'EV-0151',
    kind: 'email',
    t: 72,
    d: [70, 72, -1],
    m: [55, 77, -1],
    chip: fill(PENDING_CHIPS.placed, { date: formatDate(recordById('EV-0151').date) }),
  },
].map((f) => ({ ...f, card: cardOf(f) }));

// What a fragment shows as received: the message's own date, sender, subject and opening text.
function cardOf(f) {
  if (f.kind === 'nearDuplicate' || f.kind === 'email') {
    const r = recordById(f.kind === 'nearDuplicate' ? noise(f.id).of : f.id);
    return {
      date: formatDate(r.date),
      time: r.time,
      from: email(r.id),
      subject: r.subject,
      body: r.authored,
      quoted: f.effect === 'fold' ? r.quoted.map((q) => q.text) : null,
      attachment: r.attachments[0] && f.effect === 'attachment' ? r.attachments[0] : null,
    };
  }
  if (f.kind === 'scan') {
    const r = recordById(f.id);
    return { date: formatDate(r.date), subject: r.subject };
  }
  const n = noise(f.id);
  return {
    date: formatDate(n.date),
    time: n.time,
    from: PARTIES[n.from].email,
    subject: f.kind === 'otherProject' ? n.text : null,
    body: f.kind === 'otherProject' ? null : n.text,
  };
}

const thresholdOf = (id) => FRAGMENTS.find((f) => f.id === id).t;

// The chronology rows, in date order, each revealed when its fragment has been processed.
export const ROWS = LENS_ROWS.map((row, i) => ({ ...row, n: i + 1, t: thresholdOf(row.ev) }));

// Thread lines drawn over the pile as the first two messages are threaded (x1, y1, x2, y2).
export const THREADS = [
  { t: 6, d: [27, 11, 36, 49], m: [40, 5, 44, 47] },
  { t: 14, d: [36, 49, 47, 21], m: [44, 47, 60, 20] },
];

// The set-aside tray, split into the parts each noise item adds as it is set aside.
const traySegments = (text, ids) => {
  const at = text.indexOf(': ');
  const parts = text.slice(at + 2).split(' · ');
  if (parts.length !== ids.length) throw new Error('Lens tray copy and set-aside items disagree');
  return parts.map((part, i) => ({ label: i === 0 ? text.slice(0, at + 1) : null, text: part, t: thresholdOf(ids[i]) }));
};
export const TRAY = {
  desktop: traySegments(COVER.fig.trayDesktop, ['N-3', 'N-1', 'N-2']),
  mobile: traySegments(COVER.fig.trayMobile, ['N-3', 'N-2']),
};

// The footer, with its closing clause set apart for the verification tick.
const splitFoot = (text) => {
  const at = text.lastIndexOf(' · ');
  return { lead: text.slice(0, at + 3), verified: text.slice(at + 3) };
};
export const FOOT = { desktop: splitFoot(COVER.fig.footDesktop), mobile: splitFoot(COVER.fig.footMobile) };

// The exhibits the cite sentence opens, in the order the Source sheet steps through them.
export const CITE_LIST = ['EV-0151', 'EV-0138', 'EV-0147'];
