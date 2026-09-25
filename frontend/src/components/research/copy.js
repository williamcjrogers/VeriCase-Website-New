// Interface strings for Chapter III that the copy deck leaves to the component (labels, headings
// and one empty state), and singular forms that wait on a shared change to REPORT in
// src/content/sampleMatter.js. Everything else comes from the content files verbatim.
import { REPORT } from '@/content/sampleMatter';
import { fill } from '@/lib/format';

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

// PENDING shared change: REPORT.live.updated has no singular ("1 sources cited").
export const liveUpdated = (n) => (n === 1 ? 'Report updated: 1 source cited' : fill(REPORT.live.updated, { n }));

// PENDING shared change: REPORT.live.bundle has no singular ("1 items").
export const liveBundle = (n) => (n === 1 ? 'Bundle created with 1 item.' : fill(REPORT.live.bundle, { n }));

// PENDING shared change: REPORT.badgeLine has no singular ("1 of 1 citations resolve").
export const badgeLine = (n) => (n === 1 ? '1 of 1 citation resolves to items in this matter.' : fill(REPORT.badgeLine, { n }));

// PENDING shared change: REPORT.hidden keeps a plural verb for one finding ("1 finding fall outside").
export const hiddenLine = (report) => (report.hidden === 1 ? '1 finding falls outside the plan and is not shown.' : report.hiddenText);
