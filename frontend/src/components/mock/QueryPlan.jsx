import { useId, useRef, useState } from 'react';
import { ChevronDown, Plus, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Gated } from '@/components/editorial/Gated';
import { ALL_PARTIES, ALL_SOURCES, PERIOD_PRESETS, QUESTIONS, REPORT } from '@/content/matter/research';
import { UI } from '@/components/research/copy';

// The chips of a Query Plan, in the order the question is parsed.
const PLAN_KEYS = ['mode', 'period', 'parties', 'topics', 'sources'];

const UNSET = QUESTIONS.find((q) => q.guard)?.guard.unset;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// What a chip reads: a preset's label, a list joined by semicolons, or "not set".
const chipText = (key, value) => {
  if (value == null) return UNSET;
  if (key === 'period') return PERIOD_PRESETS[value].label;
  return Array.isArray(value) ? value.join('; ') : value;
};

// The editor a chip opens: presets as radios, or a list of checkboxes that can be removed.
const editorFor = (key, question) => {
  if (key === 'mode') return { type: 'radio', options: REPORT.modes.map((m) => [m, m]) };
  if (key === 'period') return { type: 'radio', options: question.periodOptions.map((p) => [p, PERIOD_PRESETS[p].label]) };
  if (key === 'parties') return { type: 'check', options: ALL_PARTIES };
  if (key === 'topics') return { type: 'check', options: question.plan.topics };
  return { type: 'check', options: ALL_SOURCES };
};

// The command bar: the question as it was asked (read-only) and the Filter or Evidence mode, as a
// segmented pair of native radios.
export function CommandBar({ question, mode, onMode }) {
  const group = useId();
  return (
    <div className="rs-command">
      <div className="rs-command-field">
        <Search className="rs-command-icon" strokeWidth={1.5} aria-hidden="true" />
        <p className="rs-command-text">
          <span className="sr-only">{UI.question}: </span>
          {question.text}
        </p>
      </div>
      <div role="radiogroup" aria-label={REPORT.chipKeys.mode} className="rs-mode">
        {REPORT.modes.map((m) => (
          <label key={m} className="rs-mode-item">
            <input type="radio" name={group} value={m} checked={mode === m} onChange={() => onMode(m)} className="rs-overlay-input" />
            <span className="rs-mode-face">{m}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Presets as a group of native radios (period, mode).
function RadioOptions({ options, draft, onDraft, labelledBy }) {
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="rs-options">
      {options.map(([value, label]) => (
        <label key={value} className="rs-opt">
          <input type="radio" name={labelledBy} value={value} checked={draft === value} onChange={() => onDraft(value)} className="rs-radio" />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}

// A list as native checkboxes (parties, topics, sources).
function CheckOptions({ options, draft, onDraft, labelledBy }) {
  const toggle = (option, on) => {
    const next = new Set(draft || []);
    if (on) next.add(option);
    else next.delete(option);
    onDraft([...next]);
  };
  return (
    <div role="group" aria-labelledby={labelledBy} className="rs-options">
      {options.map((option) => (
        <label key={option} className="rs-opt">
          <input type="checkbox" checked={(draft || []).includes(option)} onChange={(e) => toggle(option, e.target.checked)} className="rs-check" />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

// One chip: a button that opens its editor in a Popover. Apply changes the plan; Cancel and
// Escape leave it as it was. A chip that differs from the parsed question carries an azure rule.
function PlanChip({ name, question, value, onApply, delay }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const titleId = useId();
  const content = useRef(null);
  const editor = editorFor(name, question);
  const edited = !same(value, question.plan[name]);
  const title = name === 'mode' ? UI.editMode : REPORT.editLabels[name];

  const onOpenChange = (next) => {
    if (next) setDraft(value);
    setOpen(next);
  };
  const apply = (next) => {
    setOpen(false);
    if (!same(next, value)) onApply(name, next);
  };
  const result = () => {
    if (editor.type === 'radio') return draft ?? value;
    const list = editor.options.filter((o) => (draft || []).includes(o));
    return list.length ? list : null;
  };

  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="rs-chip rs-seq"
          style={{ '--d': `${delay}ms` }}
          data-edited={edited ? '' : undefined}
          data-unset={value == null ? '' : undefined}
        >
          <span className="rs-chip-body">
            <span className="chip-key">{REPORT.chipKeys[name]}</span>{' '}
            <span className="chip-value">{chipText(name, value)}</span>
            {edited && <span className="sr-only">, edited</span>}
          </span>
          <ChevronDown className="rs-chip-caret" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        ref={content}
        align="start"
        sideOffset={6}
        collisionPadding={16}
        aria-labelledby={titleId}
        onOpenAutoFocus={(e) => {
          // Start on the chosen preset, as a radio group does, rather than on the first.
          const target = content.current?.querySelector('input:checked') || content.current?.querySelector('input');
          if (target) {
            e.preventDefault();
            target.focus();
          }
        }}
        className="rs-pop ph-no-capture w-[min(20rem,calc(100vw-2rem))] rounded-md border-rule-strong bg-paper p-0 text-ink shadow-lift"
      >
        <p id={titleId} className="eyebrow px-4 pt-4">
          {title}
        </p>
        {editor.type === 'radio' ? (
          <RadioOptions options={editor.options} draft={draft} onDraft={setDraft} labelledBy={titleId} />
        ) : (
          <CheckOptions options={editor.options} draft={draft} onDraft={setDraft} labelledBy={titleId} />
        )}
        <div className="rs-pop-actions">
          <button type="button" className="vc-btn vc-btn-primary vc-btn-compact" onClick={() => apply(result())}>
            {REPORT.editLabels.apply}
          </button>
          <button type="button" className="vc-btn vc-btn-secondary vc-btn-compact" onClick={() => setOpen(false)}>
            {REPORT.editLabels.cancel}
          </button>
          {editor.type === 'check' && value != null && (
            <button type="button" className="vc-btn vc-btn-quiet ml-auto" onClick={() => apply(null)}>
              {REPORT.editLabels.remove}
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// The Query Plan: the chips assemble in parse order; "Run plan" recomputes the report. A broad
// question (Question C) is held back by the guard until it has a period or a party.
export function QueryPlan({ question, plan, dirty, guard, assembleKey, onChange, onQuick, onRun, runRef }) {
  const labelId = useId();
  const noticeId = useId();
  return (
    <div className="rs-plan">
      <p id={labelId} className="rs-plan-label">
        {UI.plan}
      </p>
      <div key={assembleKey} role="group" aria-labelledby={labelId} className="rs-chips">
        {PLAN_KEYS.map((name, i) => (
          <PlanChip key={name} name={name} question={question} value={plan[name]} onApply={onChange} delay={i * 70} />
        ))}
      </div>
      <div className="rs-plan-foot">
        <div className="rs-plan-status">
          <div id={noticeId} role="status" className={guard ? 'rs-guard' : 'sr-only'}>
            {guard && <Gated id={question.gate}>{question.guard.notice}</Gated>}
          </div>
          {guard && (
            <div role="group" aria-labelledby={noticeId} className="rs-quick">
              {question.guard.quick.map((q) => (
                <button key={q.label} type="button" className="rs-quick-chip" onClick={() => onQuick(q.set)}>
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                  {q.label}
                </button>
              ))}
            </div>
          )}
          {!guard && dirty && <p className="rs-changed rs-enter">{REPORT.planChanged}</p>}
        </div>
        <button
          ref={runRef}
          type="button"
          className="vc-btn vc-btn-primary rs-run"
          aria-disabled={guard || undefined}
          aria-describedby={guard ? noticeId : undefined}
          onClick={() => {
            if (!guard) onRun();
          }}
        >
          {REPORT.runPlan}
        </button>
      </div>
    </div>
  );
}
