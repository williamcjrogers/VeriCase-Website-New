// Interface strings for Chapter III that the copy deck leaves to the component (labels, headings
// and one empty state), and the templated live messages with their singular forms. Everything
// else comes from the content files verbatim.
import { REPORT, itemsLabel } from '@/content/matter/research';
import { fill, plural } from '@/lib/format';

export const UI = {
  window: 'VeriCase · Research',
  question: 'Question',
  plan: 'Query Plan',
  editMode: 'Edit mode',
  summary: 'Summary',
  findings: 'Findings',
  pending: 'The report is produced when the plan runs.',
  cover: 'Cover sheet',
  index: 'Index',
  close: 'Close',
};

export const liveUpdated = (n) => fill(REPORT.live.updated, { sources: plural(n, 'source') });
export const liveBundle = (n) => fill(REPORT.live.bundle, { items: itemsLabel(n) });
export const badgeLine = (n) => (n === 1 ? REPORT.badgeLineOne : fill(REPORT.badgeLine, { n }));
export const hiddenLine = (report) => report.hiddenText;
