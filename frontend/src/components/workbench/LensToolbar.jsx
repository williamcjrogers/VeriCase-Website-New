import { useId, useRef, useState } from 'react';
import { ChevronDown, RotateCcw, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChoiceToggle } from '@/components/workbench/ChoiceToggle';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { TabbedBundle } from '@/components/icons';
import { WORKBENCH } from '@/content/matter/workbench';
import { focusSection } from '@/lib/navigate';
import { KINDS, WINDOWS, isDefault, smartSummary, windowByKey } from '@/components/workbench/lensModel';
import { PARTY_ITEM, SEG_ITEM } from '@/components/workbench/styles';

const POP = 'wb-pop w-[min(20rem,calc(100vw-2rem))] rounded-md border border-rule-strong bg-paper p-4 text-ink shadow-lift';

// Cards or Table. The active view sits under the Lens band: azure edges and brass bezel ticks.
const ViewToggle = ({ view, onView }) => {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <span id={id} className="wb-label">
        View
      </span>
      <ChoiceToggle
        value={view}
        onChange={onView}
        options={WORKBENCH.view.map((label) => [label.toLowerCase(), label])}
        labelledBy={id}
        className="wb-seg"
        itemClassName={SEG_ITEM}
        data-value={view}
      >
        <span className="wb-lensband" aria-hidden="true" />
      </ChoiceToggle>
    </div>
  );
};

// A beige app-family chip that opens a popover: its key in mono above its current value. The
// popover is named by the same key, which heads it; `children` receives that heading's id.
const FilterChip = ({ label, value, children }) => {
  const id = useId();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="wb-filter">
          <span className="chip-key">{label}</span>
          <span className="chip-value">{value}</span>
          <ChevronDown className="wb-filter-caret" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className={POP} aria-labelledby={id}>
        <p id={id} className="wb-label">
          {label}
        </p>
        {children(id)}
      </PopoverContent>
    </Popover>
  );
};

// The project date window, chosen from the windows the matter uses.
const DateWindow = ({ filters, onChange }) => (
  <FilterChip label={WORKBENCH.dateWindow.label} value={windowByKey(filters.windowKey).label}>
    {(id) => (
      <RadioGroup value={filters.windowKey} onValueChange={(v) => onChange({ windowKey: v })} aria-labelledby={id} className="mt-3 gap-1">
        {WINDOWS.map((w) => (
          <label key={w.key} className="wb-option">
            <RadioGroupItem value={w.key} className="wb-radio" />
            <span>{w.label}</span>
          </label>
        ))}
      </RadioGroup>
    )}
  </FilterChip>
);

// The Smart Filter: which kinds of record to keep, and whether only those with attachments.
const SmartFilter = ({ filters, onChange }) => {
  const toggleKind = (key, on) => onChange({ kinds: on ? KINDS.map((k) => k.key).filter((k) => k === key || filters.kinds.includes(k)) : filters.kinds.filter((k) => k !== key) });
  return (
    <FilterChip label={WORKBENCH.smartFilter} value={smartSummary(filters)}>
      {(id) => (
        <div role="group" aria-labelledby={id} className="mt-3 grid gap-1">
          {KINDS.map((k) => (
            <label key={k.key} className="wb-option">
              <Checkbox checked={filters.kinds.includes(k.key)} onCheckedChange={(on) => toggleKind(k.key, on === true)} />
              <span>{k.label}</span>
            </label>
          ))}
          <label className="wb-option mt-1 border-t border-rule pt-2">
            <Checkbox checked={filters.attachmentsOnly} onCheckedChange={(on) => onChange({ attachmentsOnly: on === true })} />
            <span>With attachments only</span>
          </label>
        </div>
      )}
    </FilterChip>
  );
};

// Create bundle: in this figure it points to Chapter III, where the bundle is made.
const CreateBundle = ({ link }) => {
  const [open, setOpen] = useState(false);
  const leaving = useRef(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="vc-btn vc-btn-secondary wb-btn">
          <TabbedBundle size={18} />
          <span className="max-[399px]:sr-only">{WORKBENCH.createBundle}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        className={POP}
        aria-label={WORKBENCH.createBundle}
        onCloseAutoFocus={(e) => {
          if (leaving.current) {
            e.preventDefault();
            leaving.current = false;
          }
        }}
      >
        <p className="text-caption text-ink">{WORKBENCH.createBundleNote}</p>
        <a
          href={link.href}
          className="vc-link mt-2 inline-flex min-h-[24px] items-center text-caption font-medium"
          onClick={(e) => {
            e.preventDefault();
            leaving.current = true;
            setOpen(false);
            requestAnimationFrame(() => focusSection(link.href.slice(1), { updateHash: true }));
          }}
        >
          {link.label}
        </a>
      </PopoverContent>
    </Popover>
  );
};

// The Chronology Lens toolbar: view, date window, Smart Filter, excluded keywords, parties.
export const LensToolbar = ({ view, onView, filters, onChange, onRemoveKeyword, onReset, bundleLink }) => {
  const kwId = useId();
  const partyId = useId();
  const bar = useRef(null);
  const chips = useRef(null);
  // Reset takes itself away, so focus moves to the first filter.
  const reset = () => {
    onReset();
    requestAnimationFrame(() => bar.current?.querySelector('.wb-filter')?.focus());
  };
  const remove = (k, i) => {
    onRemoveKeyword(k);
    // Keep focus in the row: the next chip, else the previous, else Reset.
    requestAnimationFrame(() => {
      const left = chips.current?.querySelectorAll('button');
      const next = left && (left[Math.min(i, left.length - 1)] || null);
      (next || document.getElementById(`${kwId}-reset`))?.focus();
    });
  };
  return (
    <div ref={bar} className="wb-toolbar">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <ViewToggle view={view} onView={onView} />
        <div className="order-3 flex basis-full flex-wrap items-center gap-2 sm:order-2 sm:basis-auto">
          <DateWindow filters={filters} onChange={onChange} />
          <SmartFilter filters={filters} onChange={onChange} />
        </div>
        <div className="order-2 ml-auto flex items-center gap-1 sm:order-3">
          {!isDefault(filters) && (
            <button id={`${kwId}-reset`} type="button" className="vc-btn vc-btn-quiet wb-btn" onClick={reset}>
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Reset
            </button>
          )}
          <CreateBundle link={bundleLink} />
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span id={kwId} className="wb-label mr-1">
          {WORKBENCH.excludeLabel}
        </span>
        <div ref={chips} role="group" aria-labelledby={kwId} className="flex flex-wrap gap-1.5">
          {filters.keywords.map((k, i) => (
            <button key={k} type="button" className="wb-keyword" aria-label={`Remove keyword ${k}`} onClick={() => remove(k, i)}>
              {k}
              <X className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span id={partyId} className="wb-label mr-1">
          Parties
        </span>
        <ToggleGroup
          type="multiple"
          value={filters.parties}
          onValueChange={(parties) => onChange({ parties: WORKBENCH.parties.filter((p) => parties.includes(p)) })}
          aria-labelledby={partyId}
          className="flex-wrap justify-start gap-1.5"
        >
          {WORKBENCH.parties.map((p) => (
            <ToggleGroupItem key={p} value={p} className={PARTY_ITEM}>
              {p}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};
