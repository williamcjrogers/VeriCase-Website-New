import { useEffect, useRef } from 'react';
import { ChevronsLeftRight, Paperclip, Pause, Play, RotateCcw } from 'lucide-react';
import { COVER } from '@/content/home';
import { Rich } from '@/components/editorial/Rich';
import { Gated } from '@/components/editorial/Gated';
import { VerificationTick } from '@/components/editorial/VerificationTick';
import { DiaryPage } from '@/components/lens/DiaryPage';
import { CITE_LIST, FOOT, FRAGMENTS, HEADS, RAIL_LABEL, ROWS, STAGES, THREADS, TRAY } from '@/components/lens/lensFragments';
import { INITIAL_X, STOPS, stageOf } from '@/components/lens/lensStages';
import '@/components/lens/lens.css';

const FIG = COVER.fig;
const INITIAL_STAGE = stageOf(INITIAL_X);
// The prerendered state is the mid state: everything the lens has passed at 40% is processed.
const done = (t) => (t <= INITIAL_X ? '' : undefined);
const cast = (variant) => (variant === 'desktop' ? { 'data-desktop-only': '' } : { 'data-mobile-only': '' });
const Sep = ({ text = ', ' }) => <span className="sr-only">{text}</span>;
const ICON = { className: 'h-4 w-4 shrink-0', strokeWidth: 1.5, 'aria-hidden': 'true' };
// A no-break space keeps a separator on the line of the part it follows.
const NBSP = '\u00a0';

// Fig. 1: scattered correspondence on the right of the lens, the dated and cited chronology on
// its left. This markup is the whole figure; lensController.js only moves it.
export const LensStage = () => {
  const ref = useRef(null);

  // The controller loads when the browser is idle (200 ms later where there is no idle
  // callback), so it never competes with hydration.
  useEffect(() => {
    const fig = ref.current;
    let destroy = null;
    let cancelled = false;
    const start = () =>
      import(/* webpackChunkName: "lens-controller" */ '@/components/lens/lensController')
        .then(({ mountLens }) => {
          if (!cancelled && fig) destroy = mountLens(fig, { valueText: FIG.valueText });
        })
        .catch(() => {
          // The figure stays at its prerendered mid state if the controller cannot load.
        });
    const idle = typeof window.requestIdleCallback === 'function';
    const id = idle ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 200);
    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
      if (destroy) destroy();
    };
  }, []);

  return (
    <figure ref={ref} className="lens ph-no-capture" data-stage={INITIAL_STAGE} aria-labelledby="fig1-cap" aria-describedby="fig1-sum">
      <p id="fig1-sum" className="sr-only">
        <span {...cast('desktop')}>{FIG.summaryDesktop}</span>
        <span {...cast('mobile')}>{FIG.summaryMobile}</span>
      </p>
      <div className="lens-frame">
        {/* The figure is numbered once, at the start of its caption beneath the frame. */}
        <div className="lens-bar">
          <span className="lens-bar-title">
            {FIG.bar.split(' · ').map((part, i) => (
              <span key={part}>
                {i > 0 && `${NBSP}· `}
                <span className="lens-bar-part">{part}</span>
              </span>
            ))}
          </span>
        </div>
        <div className="lens-field" data-stage={INITIAL_STAGE}>
          <Chronology />
          <Desk />
          <Lens />
        </div>
        <CiteStrip />
        <Rail />
        <div className="lens-foot">
          {['desktop', 'mobile'].map((v) => (
            <p key={v} {...cast(v)}>
              {FOOT[v].lead}
              <span className="lens-verified">
                <VerificationTick className="lens-tick" />
                {FOOT[v].verified}
              </span>
            </p>
          ))}
        </div>
        <p className="lens-live sr-only" aria-live="polite" />
      </div>
      <figcaption id="fig1-cap" className="lens-caption">
        {FIG.caption}
      </figcaption>
    </figure>
  );
};

// The ordered layer: real content, always in the DOM, revealed left of the lens.
const Chronology = () => (
  <div className="lens-ordered">
    <div className="lens-head" aria-hidden="true">
      <span>{HEADS.date}</span>
      <span className="lens-head-time">{HEADS.time}</span>
      <span>{HEADS.parties}</span>
      <span>{HEADS.exhibit}</span>
    </div>
    <ol className="lens-list" aria-label="Chronology, sample matter">
      {ROWS.map((r, i) => (
        <li
          key={r.ev}
          className="row"
          data-row={r.n}
          data-t={r.t}
          data-processed={done(r.t)}
          data-desktop-only={r.desktopOnly ? '' : undefined}
          style={{ '--k': i }}
        >
          <span className="row-date">{r.date}</span>
          <span className="row-time">
            {r.time && (
              <>
                <Sep />
                {r.time}
              </>
            )}
          </span>
          <span className="row-parties">
            <Sep />
            {r.parties}
          </span>
          <span className="row-excerpt">
            <Sep text=": " />‘{r.excerpt}’
          </span>
          <span className="stamp">
            <Sep />
            <span className="ev-stamp">{r.ev}</span>
          </span>
          <span className="hash" aria-hidden="true">
            {r.hash.slice(0, 8)}…
          </span>
        </li>
      ))}
    </ol>
    {['desktop', 'mobile'].map((v) => (
      <p key={v} className="lens-tray" {...cast(v)}>
        <span>
          {/* A narrow tray wraps only after the label or after a separator, never inside an item. */}
          {TRAY[v].map((seg) => (
            <span key={seg.text} className="lens-tray-seg" data-t={seg.t} data-processed={done(seg.t)}>
              {seg.label ? <span className="lens-tray-label">{seg.label}</span> : `${NBSP}·`} <span className="lens-tray-item">{seg.text}</span>
            </span>
          ))}
        </span>
      </p>
    ))}
  </div>
);

// The raw layer: the record as received, scattered, shown right of the lens.
const Desk = () => (
  <div className="lens-raw" aria-hidden="true">
    {FRAGMENTS.map((f) => (
      <Item key={f.id} f={f} />
    ))}
    <svg className="lens-threads" width="100%" height="100%" focusable="false">
      {THREADS.map((th) => (
        <g key={th.t} className="lens-thread" data-t={th.t} data-processed={done(th.t)}>
          {[
            ['desktop', th.d],
            ['mobile', th.m],
          ].map(([v, [x1, y1, x2, y2]]) => (
            <g key={v} {...cast(v)}>
              <line x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} pathLength="1" />
              <circle cx={`${x1}%`} cy={`${y1}%`} r="3" />
              <circle cx={`${x2}%`} cy={`${y2}%`} r="3" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  </div>
);

// One item on the desk, with the label its processing adds.
const Item = ({ f }) => {
  const c = f.card;
  const style = { '--x': `${f.d[0]}%`, '--y': `${f.d[1]}%`, '--r': `${f.d[2]}deg` };
  if (f.m) Object.assign(style, { '--mx': `${f.m[0]}%`, '--my': `${f.m[1]}%`, '--mr': `${f.m[2]}deg` });
  const chip = f.gate ? <Gated id={f.gate}>{f.chip}</Gated> : f.chip;
  return (
    <article
      className={f.aside ? 'frag is-aside' : 'frag'}
      data-f={f.id}
      data-kind={f.kind}
      data-effect={f.effect}
      data-t={f.t}
      data-processed={done(f.t)}
      data-desktop-only={f.desktopOnly ? '' : undefined}
      style={style}
    >
      <div className="frag-paper">
        <span className="frag-sheet" />
        {f.kind === 'scan' ? (
          <div className="frag-content">
            <div className="frag-scan">
              <DiaryPage />
              <span className="frag-scanline" />
            </div>
            <div className="frag-scan-label">{c.subject}</div>
          </div>
        ) : (
          <div className="frag-content">
            <div className="frag-meta">
              {c.date}
              {c.time && <span className="frag-time">, {c.time}</span>}
            </div>
            {c.from && <div className="frag-from">{c.from}</div>}
            {c.subject && <div className="frag-subject">{c.subject}</div>}
            {c.body && <div className="frag-text">{c.body}</div>}
            {c.quoted && (
              <div className="frag-quote-wrap">
                <div className="frag-quoted">
                  {c.quoted.map((q) => (
                    <div key={q}>{q}</div>
                  ))}
                </div>
                <div className="frag-fold">{chip}</div>
              </div>
            )}
            {c.attachment && (
              <div className="frag-att">
                <Paperclip {...ICON} className="h-3.5 w-3.5 shrink-0" />
                {c.attachment}
              </div>
            )}
          </div>
        )}
        {f.aside && <span className="frag-scrim" />}
      </div>
      {f.effect === 'attachment' && <Paperclip {...ICON} className="frag-clip h-4 w-4" />}
      {f.effect === 'duplicate' && <span className="frag-ghost" />}
      {f.effect !== 'fold' &&
        (f.until ? (
          <span className="frag-chip-until" data-t={f.until} data-processed={done(f.until)}>
            <span className="frag-chip">{chip}</span>
          </span>
        ) : (
          <span className="frag-chip">{chip}</span>
        ))}
    </article>
  );
};

// The band, its stage label and the handle, carried across the field by --lens-x. The label names
// stages 0 to 4 only: at stage 5 the lens rests over the Exhibit column, and the rail marks Cite.
const Lens = () => (
  <div className="lens-track">
    <div className="lens-band" aria-hidden="true">
      <svg className="lens-bezel" width="100%" height="100%" focusable="false">
        <defs>
          <pattern id="lens-fig1-bezel" width="20" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 .5h6M14 .5h6M0 8.5h3M17 8.5h3M0 16.5h3M17 16.5h3M0 24.5h3M17 24.5h3M0 32.5h3M17 32.5h3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lens-fig1-bezel)" />
      </svg>
    </div>
    <span className="lens-stage-chip" aria-hidden="true">
      {STAGES.slice(0, 5).map((s, i) => (
        <span key={s} data-s={i}>
          {s}
        </span>
      ))}
    </span>
    <div
      className="lens-handle"
      role="slider"
      tabIndex={0}
      aria-label={FIG.handle}
      aria-valuemin={0}
      aria-valuemax={5}
      aria-valuenow={INITIAL_STAGE}
      aria-valuetext={FIG.valueText[INITIAL_STAGE]}
    >
      <ChevronsLeftRight {...ICON} />
      <span>{FIG.handle}</span>
    </div>
  </div>
);

// The strip under the field: the current operation in words, then at stage 5 the cited finding.
const CiteStrip = () => (
  <div className="lens-cite-strip">
    <p className="lens-narration" aria-hidden="true">
      {FIG.valueText.slice(0, 5).map((t, i) => {
        const at = t.indexOf(': ');
        return (
          <span key={t} data-s={i}>
            <span className="lens-narration-stage">{t.slice(0, at + 1)}</span> {t.slice(at + 2)}
          </span>
        );
      })}
    </p>
    <p className="lens-cite">
      <Rich text={FIG.cite} citeList={CITE_LIST} />
    </p>
  </div>
);

// Stage buttons (each glides to its stop) and the Play, Pause and Replay control.
const Rail = () => (
  <div className="lens-rail">
    <div className="lens-stops" role="group" aria-label={RAIL_LABEL}>
      {STAGES.map((s, i) => (
        <button key={s} type="button" className="lens-stop" data-stop={STOPS[i]} aria-current={i === INITIAL_STAGE ? 'step' : undefined} disabled>
          {s}
        </button>
      ))}
    </div>
    <button type="button" className="lens-play" data-mode="play" disabled>
      {[
        ['play', Play],
        ['pause', Pause],
        ['replay', RotateCcw],
      ].map(([m, Icon]) => (
        <span key={m} data-m={m}>
          <Icon {...ICON} />
          {FIG.controls[m]}
        </span>
      ))}
    </button>
  </div>
);
