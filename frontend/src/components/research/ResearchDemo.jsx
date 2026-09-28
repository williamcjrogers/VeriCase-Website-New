import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { MockWindow } from '@/components/mock/MockWindow';
import { CommandBar, QueryPlan } from '@/components/mock/QueryPlan';
import { AnalysisReport, ReportPending } from '@/components/mock/AnalysisReport';
import { BundleIndex } from '@/components/mock/BundleIndex';
import { Gated, isShown } from '@/components/editorial/Gated';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { MATTER } from '@/content/records';
import { BUNDLE, QUESTIONS, REPORT, computeReport, planIsComplete } from '@/content/matter/research';
import { UI, liveBundle, liveUpdated } from '@/components/research/copy';
import '@/components/research/research.css';

const SHOWN = QUESTIONS.filter((q) => isShown(q.gate));
const questionById = (id) => SHOWN.find((q) => q.id === id);
const copyPlan = (p) => ({ ...p, parties: p.parties && [...p.parties], topics: p.topics && [...p.topics], sources: p.sources && [...p.sources] });
const samePlan = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const initialFields = () => Object.fromEntries(BUNDLE.fields.map((f) => [f.key, f.value]));

// The last of the five chips (70 ms apart, 200 ms each) settles at 480 ms; the report follows.
const AFTER_CHIPS = 4 * 70 + 200 + 120;

// A question as asked: its parsed plan, and the report when the plan is complete enough to run.
const ask = (question, seq) => {
  const plan = copyPlan(question.plan);
  const runs = planIsComplete(plan);
  return { qid: question.id, plan, ran: runs ? plan : null, report: runs ? computeReport(question, plan) : null, asked: seq, seq, via: 'ask', bundle: null };
};

// A polite live region that speaks each message once, even when the same words repeat.
function useAnnouncer() {
  const [message, setMessage] = useState('');
  const timer = useRef(null);
  const announce = useCallback((text) => {
    clearTimeout(timer.current);
    setMessage('');
    timer.current = setTimeout(() => setMessage(text), 90);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return [message, announce];
}

// The first sequence waits until the figure fills about 40% of the viewport (or runs at once
// under reduced motion, or when focus arrives first).
function usePlayOnView(ref, reduced) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing) return undefined;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setPlaying(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlaying(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -40% 0px', threshold: 0 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, reduced, playing]);
  return [playing, setPlaying];
}

// Fig. 4: choose a prepared question, correct its Query Plan, run it, read the cited report,
// open each source and create a numbered bundle. Everything is computed from sampleMatter.js.
export default function ResearchDemo() {
  const root = useRef(null);
  const bundleHeading = useRef(null);
  const runButton = useRef(null);
  const pickerLabel = useId();
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = usePlayOnView(root, reduced);
  const [message, announce] = useAnnouncer();
  const [state, setState] = useState(() => ask(SHOWN[0], 0));
  const [fields, setFields] = useState(initialFields);

  const question = questionById(state.qid);
  const guard = Boolean(question.guard) && !planIsComplete(state.plan);
  const dirty = !samePlan(state.plan, state.ran || question.plan);

  const choose = (id) => {
    const next = ask(questionById(id), state.seq + 1);
    setState(next);
    if (next.report) announce(liveUpdated(next.report.cited));
  };

  const changePlan = (plan) => {
    setState((s) => ({ ...s, plan }));
    if (!dirty && !samePlan(plan, state.ran || question.plan)) announce(REPORT.live.planChanged);
  };

  const run = () => {
    const report = computeReport(question, state.plan);
    setState((s) => ({ ...s, ran: s.plan, report, seq: s.seq + 1, via: 'run', bundle: null }));
    announce(liveUpdated(report.cited));
  };

  const createBundle = () => {
    const items = state.report.findings.map((f) => f.ev);
    setState((s) => ({ ...s, bundle: { items, fields } }));
    announce(liveBundle(items.length));
  };

  return (
    <div
      ref={root}
      className="rs-demo ph-no-capture"
      data-play={playing ? 'run' : 'idle'}
      onFocusCapture={() => {
        if (!playing) setPlaying(true);
      }}
    >
      <div className="rs-picker">
        <p id={pickerLabel} className="rs-picker-label">
          {REPORT.pickerLabel}
        </p>
        <div role="radiogroup" aria-labelledby={pickerLabel} className="rs-questions">
          {SHOWN.map((q) => (
            <label key={q.id} className="rs-q-wrap">
              <input
                type="radio"
                name={pickerLabel}
                value={q.id}
                checked={state.qid === q.id}
                onChange={() => choose(q.id)}
                className="rs-overlay-input"
              />
              <span className="rs-q">
                <span className="rs-q-mark" aria-hidden="true">
                  {q.id}
                </span>
                <span className="sr-only">{`${UI.question} ${q.id}: `}</span>
                <span className="rs-q-text">{q.gate ? <Gated id={q.gate}>{q.text}</Gated> : q.text}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Below 360 px the matter reference gives way to the title. */}
      <MockWindow
        title={UI.window}
        right={<span className="max-[359px]:hidden">{MATTER.reference}</span>}
        className="rs-window"
        bodyClassName="rs-canvas"
      >
        <CommandBar question={question} mode={state.plan.mode} onMode={(mode) => changePlan({ ...state.plan, mode })} />
        <QueryPlan
          question={question}
          plan={state.plan}
          dirty={dirty}
          guard={guard}
          assembleKey={`${state.qid}-${state.asked}`}
          onChange={(name, value) => changePlan({ ...state.plan, [name]: value })}
          onQuick={(set) => {
            changePlan({ ...state.plan, ...set });
            requestAnimationFrame(() => runButton.current?.focus());
          }}
          onRun={run}
          runRef={runButton}
        />
        <div className="rs-sheet-slot">
          {state.report ? (
            <AnalysisReport
              key={state.seq}
              report={state.report}
              start={state.via === 'ask' ? AFTER_CHIPS : 0}
              enter={state.via === 'ask'}
              playing={playing}
              bundle={{ fields, onFieldsChange: setFields, onCreate: createBundle, focusAfter: bundleHeading }}
            />
          ) : (
            <ReportPending />
          )}
          {state.bundle && <BundleIndex bundle={state.bundle} headingRef={bundleHeading} />}
        </div>
      </MockWindow>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {message}
      </div>
    </div>
  );
}
