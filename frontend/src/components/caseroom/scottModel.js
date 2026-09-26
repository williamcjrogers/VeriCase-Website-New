// The Rebuttal Mode schedule as data: one entry per reply point, in the order of the Employer's
// Response, as recorded in the sample matter, with the rules the schedule applies to it.
import { RECORDS } from '@/content/records';
import { SCOTT, exportCountsText } from '@/content/matter/caseroom';

const KNOWN = new Set(RECORDS.map((r) => r.id));
const CITATION = new RegExp(SCOTT.guardPattern.source, 'g');

export const isKnownRecord = (id) => KNOWN.has(id);

// Exhibit references cited in a reply, in order of first citation, records of the matter only.
export const citationsIn = (text) => [...new Set((text.match(CITATION) || []).map((m) => m.slice(1, -1)))].filter(isKnownRecord);

// True when the reply cites at least one item in the form the citation guard requires.
export const passesGuard = (text) => SCOTT.guardPattern.test(text);

// Reply points as recorded: the reply to each paragraph, then any suggested point for it.
export const RECORDED_REPLIES = SCOTT.rows.flatMap((row) => [
  { key: row.para, para: row.para, suggested: false, decision: row.decision, text: row.replyAfter, before: row.replyBefore || null, audit: row.audit },
  ...(row.suggestion
    ? [
        {
          key: `${row.para}-suggested`,
          para: row.para,
          suggested: true,
          decision: row.suggestion.decision,
          text: row.suggestion.text,
          before: null,
          reason: row.suggestion.reason,
          audit: row.suggestion.audit,
        },
      ]
    : []),
]);

// The export's counts for a set of reply points: the paragraphs answered, the replies that stand
// (not rejected) and the distinct exhibits those replies cite. As recorded, this is the count
// the content gives ("2 points · 2 replies · 5 exhibits.").
export function exportCounts(replies) {
  const points = new Set(replies.map((r) => r.para)).size;
  const standing = replies.filter((r) => r.decision !== 'rejected');
  const exhibits = new Set(standing.flatMap((r) => citationsIn(r.text)));
  return exportCountsText({ points, replies: standing.length, exhibits: exhibits.size });
}
