import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, AtSign, X } from 'lucide-react';
import { ChoiceToggle } from '@/components/workbench/ChoiceToggle';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { DISCUSSION_ID } from '@/components/claims/ids';
import { DISCUSSION, WORKBENCH, addressLabel, kindLabel, personLabel } from '@/content/sampleMatter';
import { formatDate } from '@/lib/format';
import { focusSection } from '@/lib/navigate';
import { mentionRoles, notRelevantResult, textView } from '@/components/workbench/lensModel';
import { MINI_ITEM } from '@/components/workbench/styles';

const D = WORKBENCH.drawer;
const ROLES = mentionRoles(DISCUSSION.comments);

// A labelled group inside the drawer: a mono heading and its content.
const Group = ({ title, aside, children }) => {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className="wb-section">
      <div className="flex min-h-[32px] items-center justify-between gap-2">
        <h4 id={id} className="wb-label">
          {title}
        </h4>
        {aside}
      </div>
      <div className="mt-2">{typeof children === 'function' ? children(id) : children}</div>
    </div>
  );
};

// The entry's properties, as the Source sheet lists them.
const properties = (e) => {
  const r = e.record;
  if (!r) {
    return [
      ['Type', 'Email'],
      ['From', addressLabel(e.from)],
      ['Date', `${formatDate(e.date)}, ${e.time}`],
      ['Attachments', e.attachments.join(', ')],
    ];
  }
  const sent =
    r.kind === 'email'
      ? [
          ['From', addressLabel(r.from)],
          ['To', r.to.map(addressLabel).join('; ')],
          ...(r.cc.length ? [['Cc', r.cc.map(addressLabel).join('; ')]] : []),
          ['Date', `${formatDate(r.date)}, ${r.time}`],
          ['Message-ID', r.messageId],
        ]
      : [
          ['Author', personLabel(r.from)],
          ['Date', formatDate(r.date)],
          ['File', r.file],
        ];
  return [['Type', kindLabel(r)], ...sent, ['Custodian', r.custodian], ['Source path', r.sourcePath], ['Attachments', r.attachments.join(', ') || 'None']];
};

// The message as HTML: what its author wrote, with any quoted history beneath it.
const HtmlView = ({ entry }) => {
  const r = entry.record;
  if (!r) {
    return (
      <div className="wb-html">
        <p>{entry.subject}</p>
        <p className="wb-attach mt-2">{entry.attachments.join(', ')}</p>
      </div>
    );
  }
  return (
    <div className={r.kind === 'scan' ? 'wb-html wb-html-page' : 'wb-html'}>
      <p>{r.authored}</p>
      {r.quoted.map((q) => (
        <blockquote key={`${q.date}${q.time}`}>
          <p className="wb-quoted-by">
            {personLabel(q.from)} · {formatDate(q.date)}, {q.time}
          </p>
          <p>{q.text}</p>
        </blockquote>
      ))}
    </div>
  );
};

// Removable chips, used for tags and for mentions.
const Chips = ({ items, format = (x) => x, onRemove, removeLabel }) => (
  <ul className="flex flex-wrap gap-1.5">
    {items.map((x) => (
      <li key={x}>
        <button type="button" className="wb-keyword" aria-label={`${removeLabel} ${x}`} onClick={() => onRemove(x)}>
          {format(x)}
          <X className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </li>
    ))}
  </ul>
);

// Tags: type one and press Enter; each chip removes itself.
const Tags = ({ labelId, tags, onChange, say }) => {
  const [draft, setDraft] = useState('');
  const input = useRef(null);
  const add = () => {
    const t = draft.trim();
    if (!t) return;
    if (!tags.some((x) => x.toLowerCase() === t.toLowerCase())) {
      onChange([...tags, t]);
      say(`Tag added: ${t}`);
    }
    setDraft('');
  };
  return (
    <>
      {tags.length ? (
        <Chips
          items={tags}
          removeLabel="Remove tag"
          onRemove={(t) => {
            onChange(tags.filter((x) => x !== t));
            say(`Tag removed: ${t}`);
            input.current?.focus();
          }}
        />
      ) : (
        <p className="wb-empty">{D.noTags}</p>
      )}
      <input
        ref={input}
        type="text"
        className="wb-input mt-2"
        value={draft}
        placeholder={D.tagPlaceholder}
        aria-labelledby={labelId}
        enterKeyHint="done"
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            add();
          }
        }}
      />
    </>
  );
};

// Mentions: pick a colleague by role; a discussion about this evidence opens with them.
const Mentions = ({ labelId, entry, mentioned, onChange, say }) => {
  const [query, setQuery] = useState('');
  const input = useRef(null);
  const q = query.trim().toLowerCase();
  const matches = ROLES.filter((r) => !mentioned.includes(r) && r.toLowerCase().includes(q));
  const mention = (role) => {
    onChange([...mentioned, role]);
    setQuery('');
    say(`${role} mentioned. ${D.discussionCreated}`);
    input.current?.focus();
  };
  return (
    <>
      {mentioned.length > 0 && (
        <Chips
          items={mentioned}
          format={(r) => `@${r}`}
          removeLabel="Remove mention"
          onRemove={(r) => {
            onChange(mentioned.filter((x) => x !== r));
            input.current?.focus();
          }}
        />
      )}
      <input
        ref={input}
        type="text"
        className="wb-input mt-2"
        value={query}
        placeholder={D.mentionPlaceholder}
        aria-labelledby={labelId}
        onChange={(e) => setQuery(e.target.value)}
      />
      {matches.length > 0 && (
        <ul className="mt-1.5 flex flex-wrap gap-1.5" aria-label="People to mention, by role">
          {matches.map((role) => (
            <li key={role}>
              <button type="button" className="wb-suggest" aria-label={`Mention ${role}`} onClick={() => mention(role)}>
                <AtSign className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                {role}
              </button>
            </li>
          ))}
        </ul>
      )}
      {mentioned.length > 0 && (
        <div className="wb-created">
          <p>{D.discussionCreated}</p>
          {entry.id === DISCUSSION.doc && (
            <a
              href={`#${DISCUSSION_ID}`}
              className="vc-btn vc-btn-quiet wb-btn -ml-2.5"
              onClick={(e) => {
                e.preventDefault();
                focusSection(DISCUSSION_ID, { updateHash: true });
              }}
            >
              {D.goToDiscussion}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </>
  );
};

// Relevance: Mark as Not Relevant takes the item and its attachments out of search, with Undo.
const Relevance = ({ entry, marked, onMark }) => {
  const markRef = useRef(null);
  const undoRef = useRef(null);
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) return;
    (marked ? undoRef : markRef).current?.focus();
    moved.current = false;
  }, [marked]);
  const set = (v) => {
    moved.current = true;
    onMark(v);
  };
  return (
    <>
      <p className="text-meta text-graphite">{D.relevanceHelp}</p>
      {marked ? (
        <div className="wb-result">
          <p>{notRelevantResult(entry)}</p>
          <button ref={undoRef} type="button" className="vc-btn vc-btn-quiet wb-btn -ml-2.5" onClick={() => set(false)}>
            {D.undo}
          </button>
        </div>
      ) : (
        <button ref={markRef} type="button" className="vc-btn vc-btn-secondary wb-btn mt-2.5" onClick={() => set(true)}>
          {D.markNotRelevant}
        </button>
      )}
    </>
  );
};

// The entry drawer: content as Text or HTML, properties, tags, mentions and relevance.
export const EntryDrawer = ({ entry, cites, onClose, tags, onTags, mentioned, onMentions, marked, onMark, say }) => {
  const uid = useId();
  const title = useRef(null);
  const [mode, setMode] = useState('text');
  useEffect(() => {
    title.current?.focus();
  }, [entry.id]);
  return (
    <section
      className="wb-drawer"
      aria-labelledby={`${uid}-title`}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onClose();
        }
      }}
    >
      <header className="wb-drawer-head">
        <div className="flex items-center gap-2">
          {entry.exhibit && <EvidenceChip id={entry.exhibit} list={cites} />}
          <button type="button" className="vc-close ml-auto -mr-2" aria-label="Close details" onClick={onClose}>
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <h3 id={`${uid}-title`} ref={title} tabIndex={-1} className="wb-drawer-title">
          {entry.subject}
        </h3>
        <p className="wb-drawer-meta">
          {formatDate(entry.date)}
          {entry.time && `, ${entry.time}`} · {entry.partiesLabel}
        </p>
      </header>

      <div key={entry.id} className="wb-drawer-body">
        <Group
          title={D.content}
          aside={
            <ChoiceToggle
              value={mode}
              onChange={setMode}
              options={D.contentModes.map((m) => [m.toLowerCase(), m])}
              label={D.content}
              className="wb-mini"
              itemClassName={MINI_ITEM}
            />
          }
        >
          {mode === 'text' ? <pre className="wb-pre">{textView(entry)}</pre> : <HtmlView entry={entry} />}
        </Group>

        <Group title={D.properties}>
          <dl className="wb-props">
            {properties(entry).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Group>

        <Group title={D.tags}>{(id) => <Tags labelId={id} tags={tags} onChange={onTags} say={say} />}</Group>

        <Group title={D.mentions}>{(id) => <Mentions labelId={id} entry={entry} mentioned={mentioned} onChange={onMentions} say={say} />}</Group>

        <Group title={D.relevance}>
          <Relevance entry={entry} marked={marked} onMark={onMark} />
        </Group>
      </div>
    </section>
  );
};
