import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Check, Pencil, X } from 'lucide-react';
import { APP_WINDOW, recordById } from '@/content/records';
import { SCOTT } from '@/content/matter/caseroom';
import { Gated, isShown } from '@/components/editorial/Gated';
import { MockWindow } from '@/components/mock/MockWindow';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { CitedText, Redline } from '@/components/caseroom/CitedText';
import { RECORDED_REPLIES, exportCounts, passesGuard } from '@/components/caseroom/scottModel';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import '@/components/caseroom/scott.css';

// Whether Rebuttal Mode's citation guard is shown (gate G5: it enforces citations on edits).
const GUARD_ON = isShown('G5_rebuttalCite');
const DECISION_ICON = { accepted: Check, edited: Pencil, rejected: X };
const START = RECORDED_REPLIES.map((r) => ({ ...r, changed: false, rev: 0 }));

// "Content: lead time" becomes the key and value of a beige reason chip.
const reasonParts = (reason) => {
  const i = reason.indexOf(': ');
  return i < 0 ? ['', reason] : [reason.slice(0, i), reason.slice(i + 2)];
};

// Names a reply point for its controls: "paragraph 4.12", or the suggested point for it.
const pointName = (reply) => (reply.suggested ? `the suggested point for paragraph ${reply.para}` : `paragraph ${reply.para}`);

// The decision on a reply point: an icon and a word. "Accepted" is stamped when it is new.
const Stamp = ({ reply }) => {
  const Icon = DECISION_ICON[reply.decision];
  return (
    <p className={cn('cr-stamp', `is-${reply.decision}`, reply.changed && reply.decision === 'accepted' && 'stamp-in')}>
      <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      {SCOTT.states[reply.decision]}
    </p>
  );
};

// The paragraph of the Employer's Response, in italic, with its number in mono.
const ResponseCell = ({ row, span }) => (
  <td role="cell" rowSpan={span} className="cr-response">
    <span className="cr-label" aria-hidden="true">
      {SCOTT.heads[0]}
    </span>
    <p className="cr-para">{row.para}</p>
    <p className="cr-response-text">{row.response}</p>
  </td>
);

// The evidence ranked for a paragraph, each item with the reasons it ranks where it does.
const EvidenceCell = ({ row, span }) => {
  const ids = row.evidence.map((e) => e.ev);
  return (
    <td role="cell" rowSpan={span} className="cr-evidence">
      <span className="cr-label" aria-hidden="true">
        {SCOTT.heads[2]}
      </span>
      <ol className="cr-ranked" role="list">
        {row.evidence.map((e, i) => (
          <li key={e.ev} className="cr-ranked-item">
            <span className="cr-rank">{i + 1}</span>
            <div className="min-w-0">
              <p className="cr-ranked-head">
                <EvidenceChip id={e.ev} list={ids} />
                <span className="cr-ranked-date" aria-hidden="true">
                  {formatDate(recordById(e.ev).date)}
                </span>
              </p>
              <ul className="cr-reasons" role="list">
                {e.reasons.map((reason) => {
                  const [key, value] = reasonParts(reason);
                  return (
                    <li key={reason} className="chip">
                      <span className="chip-key">{key}</span>
                      <span className="sr-only">: </span>
                      <span className="chip-value">{value}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </td>
  );
};

// A reply point as it stands: the text (a redline once edited, struck through once rejected),
// the text before the edit, the reason for a rejection and the audit trail.
const ReplyView = ({ reply }) => {
  const edited = reply.decision === 'edited' && reply.before;
  const rejected = reply.decision === 'rejected';
  return (
    <>
      <div key={reply.rev} className={cn('cr-text', rejected && 'is-rejected', reply.changed && 'is-fresh')}>
        {edited ? <Redline before={reply.before} after={reply.text} side="after" /> : <CitedText text={reply.text} />}
        {rejected && (
          <span className={cn('cr-strike', reply.changed && 'is-drawing')} aria-hidden="true">
            <CitedText text={reply.text} inert />
          </span>
        )}
      </div>
      {edited && (
        <div className="cr-before">
          <p className="cr-mini">{SCOTT.beforeLabel}</p>
          <p className="cr-before-text">
            <Redline before={reply.before} after={reply.text} side="before" />
          </p>
        </div>
      )}
      {rejected && reply.reason && <p className="cr-reason">{reply.reason}</p>}
    </>
  );
};

// Fig. 8: Rebuttal Mode as a Scott Schedule. Each paragraph of the Response sits beside its
// proposed reply points and the evidence ranked for it; a person accepts, edits or rejects each
// point. An edit is saved only if it cites evidence, and every decision is recorded and announced.
export const ScottSchedule = ({ onExportChange }) => {
  const [replies, setReplies] = useState(START);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState('');
  const [guard, setGuard] = useState(false);
  const [live, setLive] = useState('');
  const field = useRef(null);
  const editButtons = useRef({});
  const returnTo = useRef(null);

  useEffect(() => {
    onExportChange?.(exportCounts(replies));
  }, [replies, onExportChange]);

  // Into the field when editing starts; back to the Edit button when it ends.
  useEffect(() => {
    if (editing) field.current?.focus();
    else if (returnTo.current) {
      editButtons.current[returnTo.current]?.focus();
      returnTo.current = null;
    }
  }, [editing]);

  // The same message twice in a row still changes the region, so it is spoken again.
  const announce = (message) => setLive((prev) => (prev === message ? `${message}\u00a0` : message));
  const update = (key, change) => setReplies((all) => all.map((r) => (r.key === key ? { ...r, ...change, changed: true, rev: r.rev + 1 } : r)));

  const decide = (reply, decision) => {
    if (reply.decision === decision) return;
    update(reply.key, { decision });
    announce(decision === 'accepted' ? SCOTT.liveAccepted : SCOTT.liveRejected);
  };
  const startEdit = (reply) => {
    setDraft(reply.text);
    setGuard(false);
    setEditing(reply.key);
  };
  const stopEdit = (key) => {
    returnTo.current = key;
    setGuard(false);
    setEditing(null);
  };
  const save = (reply) => {
    const text = draft.trim();
    if (!text || (GUARD_ON && !passesGuard(text))) {
      setGuard(true);
      field.current?.focus();
      return;
    }
    stopEdit(reply.key);
    if (text === reply.text) return;
    update(reply.key, { decision: 'edited', before: reply.text, text });
    announce(SCOTT.liveEdited);
  };
  const onDraft = (e) => {
    setDraft(e.target.value);
    if (guard && passesGuard(e.target.value)) setGuard(false);
  };

  return (
    <MockWindow title={APP_WINDOW} className="on-paper" bodyClassName="px-3 pb-4 pt-4 sm:px-5 sm:pb-5">
      <table role="table" className="cr-scott">
        <caption className="cr-scott-caption">{SCOTT.caption}</caption>
        <colgroup>
          <col className="cr-col-response" />
          <col className="cr-col-reply" />
          <col className="cr-col-evidence" />
          <col className="cr-col-decision" />
        </colgroup>
        <thead role="rowgroup">
          <tr role="row">
            {SCOTT.heads.map((head) => (
              <th key={head} role="columnheader" scope="col">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        {SCOTT.rows.map((row) => {
          const group = replies.filter((r) => r.para === row.para);
          return (
            <tbody key={row.para} role="rowgroup" className="cr-point">
              {group.map((reply, i) => {
                const isEditing = editing === reply.key;
                const hintId = `cr-hint-${reply.key.replace(/\./g, '-')}`;
                return (
                  <tr key={reply.key} role="row" className={cn('cr-row', reply.suggested && 'is-suggested')}>
                    {i === 0 && <ResponseCell row={row} span={group.length} />}
                    <td role="cell" className="cr-reply">
                      <span className="cr-label" aria-hidden="true">
                        {SCOTT.heads[1]}
                      </span>
                      {reply.suggested && <p className="cr-mini cr-suggested">{SCOTT.suggestedLabel}</p>}
                      {isEditing ? (
                        <div>
                          <textarea
                            ref={field}
                            className="cr-field"
                            value={draft}
                            onChange={onDraft}
                            rows={6}
                            spellCheck={false}
                            aria-label={`${SCOTT.heads[1]}: ${pointName(reply)}`}
                            aria-describedby={GUARD_ON ? hintId : undefined}
                            aria-invalid={guard || undefined}
                          />
                          {GUARD_ON && (
                            <p id={hintId} className={cn('cr-hint', guard && 'is-error')}>
                              {guard && <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />}
                              <Gated id="G5_rebuttalCite">{SCOTT.guard}</Gated>
                            </p>
                          )}
                          <div className="cr-edit-actions">
                            <button type="button" className="cr-btn is-primary" onClick={() => save(reply)}>
                              {SCOTT.controls.save}
                            </button>
                            <button type="button" className="cr-btn" onClick={() => stopEdit(reply.key)}>
                              {SCOTT.controls.cancel}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <ReplyView reply={reply} />
                      )}
                      <ul className="cr-audit" role="list">
                        <li>{reply.audit}</li>
                        {reply.changed && (
                          <li key={reply.rev} className="cr-audit-demo">
                            {SCOTT.demoAudit}
                          </li>
                        )}
                      </ul>
                    </td>
                    {i === 0 && <EvidenceCell row={row} span={group.length} />}
                    <td role="cell" className="cr-decision">
                      <span className="cr-label" aria-hidden="true">
                        {SCOTT.heads[3]}
                      </span>
                      <Stamp key={reply.rev} reply={reply} />
                      {!isEditing && (
                        <div role="group" aria-label={`Decision on ${pointName(reply)}`} className="cr-controls">
                          <button type="button" className="cr-btn" onClick={() => decide(reply, 'accepted')}>
                            <Check className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                            {SCOTT.controls.accept}
                          </button>
                          <button
                            type="button"
                            className="cr-btn"
                            ref={(el) => {
                              editButtons.current[reply.key] = el;
                            }}
                            onClick={() => startEdit(reply)}
                          >
                            <Pencil className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                            {SCOTT.controls.edit}
                          </button>
                          <button type="button" className="cr-btn" onClick={() => decide(reply, 'rejected')}>
                            <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                            {SCOTT.controls.reject}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>
      <p className="sr-only" role="status">
        {live}
      </p>
    </MockWindow>
  );
};

// Loaded lazily by its chapter (React.lazy needs a default export).
export default ScottSchedule;
