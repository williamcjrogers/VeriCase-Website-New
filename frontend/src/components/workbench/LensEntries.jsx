import { useId } from 'react';
import { Paperclip } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { ChoiceToggle } from '@/components/workbench/ChoiceToggle';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { Gated, isShown } from '@/components/editorial/Gated';
import { personLabel } from '@/content/records';
import { WORKBENCH } from '@/content/matter/workbench';
import { fill, formatDate, keepDates } from '@/lib/format';
import { QUOTED_ENTRY, marker } from '@/components/workbench/lensModel';
import { MINI_ITEM } from '@/components/workbench/styles';

const LIST_LABEL = 'Chronology of the sample matter, in date order';

// A run of entries that a filter hides leaves this marker in its place.
const hiddenLabel = (n) => marker(WORKBENCH.hiddenMarker, n);

// When the entry was sent or made: the date column of the chronology.
const When = ({ entry, id }) => (
  <time id={id} dateTime={entry.time ? `${entry.date}T${entry.time}` : entry.date} className="wb-when">
    <span className="wb-date">{formatDate(entry.date)}</span>
    {entry.time && <span className="wb-time">{entry.time}</span>}
  </time>
);

// The button that opens an entry's drawer. In Cards it stretches over the whole card.
const OpenButton = ({ entry, open, onOpen, describedBy }) => (
  <button type="button" className="wb-open" data-entry-open={entry.id} aria-expanded={open} aria-describedby={describedBy} onClick={() => onOpen(entry.id)}>
    {entry.subject}
  </button>
);

// Tags, attachments and the Not Relevant flag under an entry.
const Meta = ({ entry, tags, marked }) =>
  tags.length > 0 || entry.attachments.length > 0 || marked ? (
    <div className="wb-meta">
      {marked && <span className="wb-flag">Not relevant</span>}
      {tags.map((t) => (
        <span key={t} className="wb-tag">
          {t}
        </span>
      ))}
      {entry.attachments.length > 0 && (
        <span className="wb-attach">
          <Paperclip className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          {entry.attachments.join(', ')}
        </span>
      )}
    </div>
  ) : null;

// As received shows the quoted history; As authored folds it away and says how much was folded.
const QuotedFold = ({ quoted, authored, onAuthored }) => (
  <>
    <div className="wb-fold wb-raise">
      <Gated id="G5_quoted" as="div" className="flex items-center">
        <ChoiceToggle
          value={authored ? 'authored' : 'received'}
          onChange={(v) => onAuthored(v === 'authored')}
          options={[
            ['received', WORKBENCH.asReceived],
            ['authored', WORKBENCH.asAuthored],
          ]}
          label="Message view"
          className="wb-mini"
          itemClassName={MINI_ITEM}
        />
      </Gated>
      {authored && <span className="wb-folded">{fill(WORKBENCH.quotedChip, { n: quoted.length })}</span>}
    </div>
    <Collapsible open={!authored}>
      <CollapsibleContent className="wb-collapse">
        <ol className="wb-quoted" aria-label="Quoted history">
          {quoted.map((q) => (
            <li key={`${q.date}${q.time}`}>
              <p className="wb-quoted-by">
                {personLabel(q.from)} · {formatDate(q.date)}, {q.time}
              </p>
              <p>{keepDates(q.text)}</p>
            </li>
          ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  </>
);

// One entry in Cards view: its date on the spine, and a card with exhibit, parties and subject.
// `later` rows (after the first four entries) wait for Show all below 768 px.
const EntryCard = ({ entry, later, cites, open, onOpen, tags, marked, authored, onAuthored }) => {
  const uid = useId();
  const quoted = entry.id === QUOTED_ENTRY && isShown('G5_quoted') ? entry.record.quoted : null;
  return (
    <li className="wb-entry wb-row-in" data-later={later || undefined} data-selected={open || undefined} data-marked={marked || undefined}>
      <When entry={entry} id={`${uid}-when`} />
      <span className="wb-node" aria-hidden="true" />
      <div className="wb-card">
        <div className="wb-card-top">
          {entry.exhibit && <EvidenceChip id={entry.exhibit} list={cites} className="wb-raise" />}
          <span id={`${uid}-parties`} className="wb-parties">
            {entry.partiesLabel}
          </span>
        </div>
        <OpenButton entry={entry} open={open} onOpen={onOpen} describedBy={`${uid}-when ${uid}-parties`} />
        {entry.excerpt && <p className="wb-excerpt">{keepDates(entry.excerpt)}</p>}
        {quoted && <QuotedFold quoted={quoted} authored={authored} onAuthored={onAuthored} />}
        <Meta entry={entry} tags={tags} marked={marked} />
      </div>
    </li>
  );
};

// A marker row in Cards view, where filtered entries would have been.
const Gap = ({ n, later, as: Tag = 'li', className = 'wb-gap' }) => (
  <Tag className={className} data-later={later || undefined}>
    <span className="wb-gap-label">{hiddenLabel(n)}</span>
  </Tag>
);

export const EntryCards = ({ rows, state }) => (
  <ol className="wb-cards" aria-label={LIST_LABEL}>
    {rows.map((row) =>
      row.type === 'hidden' ? (
        <Gap key={row.key} n={row.n} later={row.later} />
      ) : (
        <EntryCard
          key={row.key}
          entry={row.entry}
          later={row.later}
          cites={state.cites}
          open={state.openId === row.entry.id}
          onOpen={state.onOpen}
          tags={state.tags[row.entry.id]}
          marked={state.marked.includes(row.entry.id)}
          authored={state.authored}
          onAuthored={state.onAuthored}
        />
      )
    )}
  </ol>
);

// Table view from 768 px: a real table with a caption. A click anywhere on a row opens it.
export const EntryTable = ({ rows, state }) => (
  <table className="wb-table">
    <caption className="sr-only">{LIST_LABEL}</caption>
    <thead>
      <tr>
        <th scope="col">Exhibit</th>
        <th scope="col">Date</th>
        <th scope="col">Time</th>
        <th scope="col">From and to</th>
        <th scope="col">Subject</th>
        <th scope="col" className="wb-th-icon">
          <Paperclip className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Attachments</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => {
        if (row.type === 'hidden') {
          return (
            <tr key={row.key} className="wb-gap-row">
              <td colSpan={6}>
                <span className="wb-gap-label">{hiddenLabel(row.n)}</span>
              </td>
            </tr>
          );
        }
        const { entry } = row;
        const open = state.openId === entry.id;
        const marked = state.marked.includes(entry.id);
        return (
          <tr
            key={row.key}
            className="wb-row-in"
            data-selected={open || undefined}
            data-marked={marked || undefined}
            onClick={(e) => !e.target.closest('button') && state.onOpen(entry.id)}
          >
            <td>{entry.exhibit && <EvidenceChip id={entry.exhibit} list={state.cites} />}</td>
            <td className="wb-mono">{formatDate(entry.date)}</td>
            <td className="wb-mono">{entry.time}</td>
            <td>{entry.partiesLabel}</td>
            <td>
              <OpenButton entry={entry} open={open} onOpen={state.onOpen} />
              {marked && <span className="wb-flag ml-2">Not relevant</span>}
            </td>
            <td className="wb-mono">{entry.attachments.length || ''}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

// Table view below 768 px: the same rows as stacked cards with labelled fields.
export const EntryStack = ({ rows, state }) => (
  <ol className="wb-stack" aria-label={LIST_LABEL}>
    {rows.map((row) => {
      if (row.type === 'hidden') return <Gap key={row.key} n={row.n} later={row.later} className="wb-gap wb-gap-flat" />;
      const { entry } = row;
      const marked = state.marked.includes(entry.id);
      return (
        <li
          key={row.key}
          className="wb-stack-item wb-row-in"
          data-later={row.later || undefined}
          data-selected={state.openId === entry.id || undefined}
          data-marked={marked || undefined}
        >
          <dl>
            <div>
              <dt>Date</dt>
              <dd className="wb-mono">
                {formatDate(entry.date)}
                {entry.time && `, ${entry.time}`}
              </dd>
            </div>
            <div>
              <dt>From and to</dt>
              <dd>{entry.partiesLabel}</dd>
            </div>
            <div>
              <dt>Subject</dt>
              <dd>
                <OpenButton entry={entry} open={state.openId === entry.id} onOpen={state.onOpen} />
                {marked && <span className="wb-flag ml-2">Not relevant</span>}
              </dd>
            </div>
            {entry.exhibit && (
              <div>
                <dt>Exhibit</dt>
                <dd>
                  <EvidenceChip id={entry.exhibit} list={state.cites} />
                </dd>
              </div>
            )}
          </dl>
        </li>
      );
    })}
  </ol>
);
