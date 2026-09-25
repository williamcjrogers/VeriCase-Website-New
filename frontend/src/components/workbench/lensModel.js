// The Chronology Lens workbench (Fig. 3) as data: the entries of the sample matter, the filters
// the toolbar applies to them, and every count the figure shows, computed rather than typed in.
import { NOISE, PARTIES, PERIOD_PRESETS, RECORDS, WORKBENCH, addressLabel, personLabel } from '@/content/sampleMatter';
import { fill, formatDate, plural } from '@/lib/format';

// PENDING shared change (content/sampleMatter.js, WORKBENCH): the keyword marker of spec 3.5 and
// the per-keyword split of excludedByKeyword (14), so that removing a keyword can be counted.
export const KEYWORD_MARKER = '{n} items excluded by keyword';
export const KEYWORD_COUNTS = { newsletter: 9, canteen: 1, parking: 4 };
// PENDING shared change: singular forms of the two markers.
const ONE = { [WORKBENCH.hiddenMarker]: '1 entry hidden by filter', [KEYWORD_MARKER]: '1 item excluded by keyword' };

// "{n} entries hidden by filter", with its singular form.
export const marker = (template, n) => (n === 1 && ONE[template]) || fill(template, { n });

const range = (from, to) => `${formatDate(from)} to ${formatDate(to)}`;

// The date windows offered by the Date window popover: the project's own window first.
export const WINDOWS = [
  { key: 'project', from: WORKBENCH.dateWindow.from, to: WORKBENCH.dateWindow.to, label: range(WORKBENCH.dateWindow.from, WORKBENCH.dateWindow.to) },
  { key: 'march', from: PERIOD_PRESETS.march.from, to: PERIOD_PRESETS.march.to, label: PERIOD_PRESETS.march.label },
  { key: 'early', from: PERIOD_PRESETS.early.from, to: PERIOD_PRESETS.early.to, label: PERIOD_PRESETS.early.label },
];
export const windowByKey = (key) => WINDOWS.find((w) => w.key === key);

// The kinds of record the Smart Filter can keep.
export const KINDS = [
  { key: 'email', label: 'Emails' },
  { key: 'scan', label: 'Scanned pages (OCR)' },
];

// The record with the longest quoted history carries the As received / As authored toggle, and
// its card shows what its author wrote rather than the short excerpt.
const listed = RECORDS.filter((r) => WORKBENCH.entries.includes(r.id));
export const QUOTED_ENTRY = listed.reduce((a, b) => (b.quoted.length > a.quoted.length ? b : a)).id;

// One entry per record, with what the toolbar filters on.
const fromRecord = (r) => ({
  id: r.id,
  exhibit: r.id,
  date: r.date,
  time: r.time,
  kind: r.kind,
  subject: r.subject,
  partiesLabel: r.partiesLabel,
  parties: WORKBENCH.entryParties[r.id],
  excerpt: r.id === QUOTED_ENTRY ? r.authored : r.excerpt,
  record: r,
  attachments: r.attachments,
  tags: WORKBENCH.drawer.sampleTags[r.id] || [],
});

// The canteen menu (N-4): not evidence, and excluded by the keyword its subject contains.
const menu = NOISE.find((x) => x.id === WORKBENCH.notRelevant.id);
const menuEntry = {
  id: menu.id,
  exhibit: null,
  date: menu.date,
  time: menu.time,
  kind: 'email',
  subject: WORKBENCH.notRelevant.title,
  partiesLabel: personLabel(menu.from),
  parties: [PARTIES[menu.from].side],
  excerpt: null,
  record: null,
  from: menu.from,
  attachments: menu.attachments,
  tags: [],
  keyword: WORKBENCH.exclude.find((k) => WORKBENCH.notRelevant.title.toLowerCase().includes(k)),
};

// Every entry the Lens can show, in date and time order.
const stamp = (e) => `${e.date}T${e.time || '00:00'}`;
export const ENTRIES = [...listed.map(fromRecord), menuEntry].sort((a, b) => stamp(a).localeCompare(stamp(b)));
export const entryById = (id) => ENTRIES.find((e) => e.id === id);

// The filters as the workbench opens: the project's window, every kind, party and keyword.
export const DEFAULT_FILTERS = {
  windowKey: 'project',
  kinds: KINDS.map((k) => k.key),
  attachmentsOnly: false,
  parties: WORKBENCH.parties,
  keywords: WORKBENCH.exclude,
};

// True while nothing has been changed (each list is a subset of its default, so lengths suffice).
export const isDefault = (f) =>
  f.windowKey === DEFAULT_FILTERS.windowKey &&
  f.attachmentsOnly === DEFAULT_FILTERS.attachmentsOnly &&
  f.kinds.length === DEFAULT_FILTERS.kinds.length &&
  f.parties.length === DEFAULT_FILTERS.parties.length &&
  f.keywords.length === DEFAULT_FILTERS.keywords.length;

// The rows the Lens shows under a set of filters. Entries a filter hides leave one marker row per
// run, in place, so the chronology keeps its shape; keyword exclusions are counted separately.
export function computeLens(f) {
  const win = windowByKey(f.windowKey);
  const candidates = ENTRIES.filter((e) => !(e.keyword && f.keywords.includes(e.keyword)));
  const rows = [];
  let run = [];
  const flush = () => {
    if (run.length) rows.push({ type: 'hidden', key: `hidden-${run[0].id}`, n: run.length });
    run = [];
  };
  for (const e of candidates) {
    const pass =
      e.date >= win.from &&
      e.date <= win.to &&
      f.kinds.includes(e.kind) &&
      (!f.attachmentsOnly || e.attachments.length > 0) &&
      e.parties.some((p) => f.parties.includes(p));
    if (pass) {
      flush();
      rows.push({ type: 'entry', key: e.id, entry: e });
    } else run.push(e);
  }
  flush();
  const hidden = rows.filter((r) => r.type === 'hidden').reduce((sum, r) => sum + r.n, 0);
  return {
    rows,
    hidden,
    shown: candidates.length - hidden,
    excluded: f.keywords.reduce((sum, k) => sum + KEYWORD_COUNTS[k], 0),
  };
}

// What a Smart Filter chip says it is doing.
export const smartSummary = (f) => {
  const kinds = KINDS.filter((k) => f.kinds.includes(k.key)).map((k) => k.label);
  const parts = kinds.length === KINDS.length ? [] : [kinds.length ? kinds.join(', ') : 'No record types'];
  if (f.attachmentsOnly) parts.push('With attachments');
  return parts.length ? parts.join(' · ') : 'All records';
};

// The Not Relevant result and its announcement. For the canteen menu these are the copy-deck
// strings; for any other entry the same sentence is composed from its own attachments.
const attachmentClause = (e) => (e.attachments.length ? ` with its ${plural(e.attachments.length, 'attachment')} (${e.attachments.join(', ')})` : '');
export const notRelevantResult = (e) =>
  e.id === WORKBENCH.notRelevant.id ? WORKBENCH.notRelevant.result : `Not relevant: excluded from search${attachmentClause(e)}`;
export const notRelevantStatus = (e) =>
  e.id === WORKBENCH.notRelevant.id
    ? WORKBENCH.status.notRelevant
    : `Item marked Not Relevant${e.attachments.length ? `; ${plural(e.attachments.length, 'attachment')} excluded from search` : ''}`;

// The plain-text view of an entry: the record's canonical text (the text that is hashed), or,
// for the canteen menu, its headers in the same form.
export const textView = (e) =>
  e.record
    ? e.record.canonical
    : [`From: ${addressLabel(e.from)}`, `Date: ${formatDate(e.date)}, ${e.time}`, `Subject: ${e.subject}`, `Attachments: ${e.attachments.join(', ')}`].join('\n');

// People who can be mentioned, by role only (the roles of the discussion in Fig. 6).
export const mentionRoles = (comments) => [...new Set(comments.map((c) => c.role))];
