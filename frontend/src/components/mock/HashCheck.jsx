import { Fragment, useEffect, useId, useMemo, useRef, useState } from 'react';
import { RotateCcw, X } from 'lucide-react';
import { HASHES, recordById } from '@/content/records';
import { HASH_CHECK } from '@/content/matter/integrity';
import { VerificationTick } from '@/components/editorial/VerificationTick';
import { diffTokens } from '@/components/integrity/diff';
import { truncateHash } from '@/lib/format';
import { cn } from '@/lib/utils';
import '@/components/integrity/hashcheck.css';

const CANONICAL = recordById(HASH_CHECK.subject).canonical;
const MANIFEST_HASH = HASHES[HASH_CHECK.subject];
const DEBOUNCE_MS = 60;
// Unchanged characters shown either side of a change, the most of a changed run shown, and the
// most excerpts shown.
const CONTEXT = 18;
const LONGEST_RUN = 60;
const MOST_EXCERPTS = 3;
const NONE = 'None';

// SHA-256 of the text as the manifest records it (NFC, UTF-8), in lowercase hex.
async function sha256(text) {
  const bytes = new TextEncoder().encode(text.normalize('NFC'));
  const digest = await window.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

// The edited text around each change, as short excerpts: inserted characters, removed ones and
// a little unchanged context either side. Changes close together share one excerpt.
function excerpts(before, after) {
  const chars = [];
  diffTokens(Array.from(before), Array.from(after)).forEach((op) => op.tokens.forEach((ch) => chars.push({ type: op.type, ch })));
  const windows = [];
  chars.forEach((c, i) => {
    if (c.type === 'equal') return;
    const last = windows[windows.length - 1];
    if (last && i - last.end <= CONTEXT * 2) last.end = i;
    else windows.push({ start: i, end: i });
  });
  const space = (i) => /\s/.test(chars[i].ch);
  return windows.slice(0, MOST_EXCERPTS).map(({ start, end }) => {
    // Where there is a space within the context, it starts and ends on a word boundary, so an
    // excerpt does not cut a word in two; inside a long token it keeps its full context.
    let from = Math.max(0, start - CONTEXT);
    for (let i = from; from > 0 && i < start; i += 1) {
      if (space(i)) {
        from = i + 1;
        break;
      }
    }
    let to = Math.min(chars.length, end + CONTEXT + 1);
    for (let i = to - 1; to < chars.length && i > end; i -= 1) {
      if (space(i)) {
        to = i;
        break;
      }
    }
    const runs = [];
    chars.slice(from, to).forEach((c) => {
      const last = runs[runs.length - 1];
      if (last && last.type === c.type) last.chars.push(c.ch);
      else runs.push({ type: c.type, chars: [c.ch] });
    });
    // A long changed run (a paste, say) is shortened, so that the excerpt shows what went and
    // what came in; unchanged runs inside an excerpt are short already.
    return {
      runs: runs.map((r) => ({ type: r.type, text: r.chars.slice(0, LONGEST_RUN).join(''), cut: r.chars.length > LONGEST_RUN })),
      head: from > 0,
      tail: to < chars.length,
    };
  });
}

// A run of the excerpt, with line breaks shown as a return mark so the excerpt stays one line.
const Run = ({ run }) => {
  const parts = run.text.split('\n').flatMap((part, i) => (i ? [{ nl: true }, part] : [part]));
  const body = parts.map((p, i) =>
    p.nl ? (
      <span key={i} className="ri-nl">
        ↵
      </span>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    )
  );
  const cut = run.cut && <span className="ri-ellipsis">…</span>;
  if (run.type === 'insert') return <><ins className="ri-changed">{body}</ins>{cut}</>;
  if (run.type === 'delete') return <><del className="ri-changed">{body}</del>{cut}</>;
  return <>{body}</>;
};

// Fig. 9: EV-0138 as a simplified .eml, hashed with SHA-256 in the browser as the visitor types
// and compared with the digest the manifest records. One changed character and the hash no
// longer matches; Reset restores the original. The status is announced only when it changes.
export const HashCheck = () => {
  const fieldId = useId();
  const [text, setText] = useState(CANONICAL);
  const [computed, setComputed] = useState(null);
  const [supported, setSupported] = useState(true);
  const [full, setFull] = useState(false);
  const [live, setLive] = useState('');
  const [rev, setRev] = useState(0);
  const lastState = useRef(null);

  // Web Crypto's digest exists only in a secure context (https, or this computer).
  useEffect(() => {
    setSupported(Boolean(window.isSecureContext && window.crypto && window.crypto.subtle));
  }, []);

  useEffect(() => {
    if (!supported) return undefined;
    let current = true;
    const timer = setTimeout(() => {
      sha256(text).then((hex) => {
        if (current) setComputed(hex);
      });
    }, DEBOUNCE_MS);
    return () => {
      current = false;
      clearTimeout(timer);
    };
  }, [text, supported]);

  const state = supported && computed ? (computed === MANIFEST_HASH ? 'match' : 'mismatch') : null;
  useEffect(() => {
    if (!state) return;
    if (lastState.current && lastState.current !== state) setLive(HASH_CHECK.live[state]);
    lastState.current = state;
  }, [state]);

  const changes = useMemo(() => excerpts(CANONICAL, text), [text]);
  const show = (hex) => (full ? hex : truncateHash(hex));
  const edit = (value) => {
    setText(value);
    setRev((r) => r + 1);
  };

  return (
    <div className="ri-check">
      <label htmlFor={fieldId} className="ri-field-label">
        {HASH_CHECK.field}
      </label>
      <textarea
        id={fieldId}
        className="ri-field"
        value={text}
        onChange={(e) => edit(e.target.value)}
        rows={9}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />

      <div className="ri-diff">
        <p className="ri-mini">{HASH_CHECK.diff}</p>
        <p key={rev} className="ri-diff-text">
          {changes.length ? (
            changes.map((x, i) => (
              <span key={i} className="ri-excerpt">
                {x.head && <span className="ri-ellipsis">…</span>}
                {x.runs.map((run, j) => (
                  <Run key={j} run={run} />
                ))}
                {x.tail && <span className="ri-ellipsis">…</span>}
              </span>
            ))
          ) : (
            <span className="ri-none">{NONE}</span>
          )}
        </p>
      </div>

      <dl className="ri-readouts">
        <div className="ri-readout">
          <dt>{HASH_CHECK.readouts.manifest}</dt>
          <dd>
            <code className={cn(full && 'ri-full')}>{show(MANIFEST_HASH)}</code>
          </dd>
        </div>
        <div className="ri-readout">
          <dt>{HASH_CHECK.readouts.now}</dt>
          <dd>
            {supported ? (
              <code className={cn(full && 'ri-full')}>{computed ? show(computed) : ''}</code>
            ) : (
              <span className="ri-fallback">{HASH_CHECK.fallback}</span>
            )}
          </dd>
        </div>
      </dl>

      {supported && (
        <p className={cn('ri-status', state && `is-${state}`)}>
          {state === 'match' && (
            <>
              <VerificationTick tone="ink" className="ri-status-icon" />
              {HASH_CHECK.states.match}
            </>
          )}
          {state === 'mismatch' && (
            <>
              <X className="ri-status-icon" strokeWidth={2} aria-hidden="true" />
              {HASH_CHECK.states.mismatch}
            </>
          )}
        </p>
      )}

      <div className="ri-actions">
        <button type="button" className="vc-btn vc-btn-secondary vc-btn-secondary-on-ink vc-btn-compact" onClick={() => setFull((f) => !f)}>
          {full ? HASH_CHECK.hideFull : HASH_CHECK.showFull}
        </button>
        <button type="button" className="vc-btn vc-btn-secondary vc-btn-secondary-on-ink vc-btn-compact" onClick={() => edit(CANONICAL)}>
          <RotateCcw className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {HASH_CHECK.reset}
        </button>
      </div>
      <p className="sr-only" role="status">
        {live}
      </p>
    </div>
  );
};

// Loaded lazily by its chapter (React.lazy needs a default export).
export default HashCheck;
