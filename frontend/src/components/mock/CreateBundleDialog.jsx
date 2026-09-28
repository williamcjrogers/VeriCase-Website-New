import { useId, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FolderPlus, X } from 'lucide-react';
import { Dialog, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BUNDLE, itemsLabel } from '@/content/matter/research';
import { fill } from '@/lib/format';
import { UI } from '@/components/research/copy';

// Fields that take the full width of the dialog; the rest pair up from 640 px.
const WIDE = new Set(['title', 'description', 'matter', 'notes']);

const FIELD_CLASS = 'rs-field h-11 rounded-sm border-rule-strong bg-paper px-3 text-[0.9375rem] text-ink shadow-none sm:h-10 md:text-[0.9375rem]';
const AREA_CLASS = 'rs-field min-h-[4.25rem] rounded-sm border-rule-strong bg-paper px-3 py-2 text-[0.9375rem] leading-normal text-ink shadow-none md:text-[0.9375rem]';

// After a bundle is created: focus its heading and bring the whole bundle into view (at once
// under reduced motion).
const reveal = (el) => {
  if (!el) return;
  el.focus({ preventScroll: true });
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  (el.closest('section') || el).scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
};

const CreateLabel = () => (
  <>
    <FolderPlus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    {BUNDLE.create}
  </>
);

// Create bundle: a dialog with the nine prefilled fields of the live product. Nothing is
// submitted: the values live in the demonstration's state, and "Create bundle" is a plain
// button. Once created, focus moves to the new bundle (`focusAfter`).
export function CreateBundleDialog({ count, fields, onFieldsChange, onCreate, focusAfter, describedBy }) {
  const [open, setOpen] = useState(false);
  const created = useRef(false);
  const firstField = useRef(null);
  const uid = useId();

  // With no items cited there is nothing to bundle; the reason is the hidden-findings line.
  if (!count) {
    return (
      <button type="button" className="vc-btn vc-btn-primary" aria-disabled="true" aria-describedby={describedBy}>
        <CreateLabel />
      </button>
    );
  }

  const create = () => {
    created.current = true;
    onCreate();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="vc-btn vc-btn-primary">
          <CreateLabel />
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-ink-950/55" />
        <div className="rs-dialog-frame">
          <DialogPrimitive.Content
            className="rs-dialog ph-no-capture"
            onOpenAutoFocus={(e) => {
              // Start in the first field (the close button comes first in the header).
              e.preventDefault();
              firstField.current?.focus();
            }}
            onCloseAutoFocus={(e) => {
              if (!created.current) return;
              created.current = false;
              e.preventDefault();
              reveal(focusAfter.current);
            }}
          >
            <div className="rs-dialog-head">
              <DialogTitle className="font-sans text-[0.9375rem] font-medium leading-tight tracking-normal text-white">{BUNDLE.title}</DialogTitle>
              <DialogPrimitive.Close className="vc-close on-azure">
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only">{UI.close}</span>
              </DialogPrimitive.Close>
            </div>
            <div className="rs-dialog-body">
              <DialogDescription className="text-small text-ink">{fill(BUNDLE.description, { items: itemsLabel(count) })}</DialogDescription>
              <div className="mt-4 grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
                {BUNDLE.fields.map((f) => {
                  const id = `${uid}-${f.key}`;
                  const Control = f.multiline ? Textarea : Input;
                  return (
                    <div key={f.key} className={WIDE.has(f.key) ? 'sm:col-span-2' : undefined}>
                      <Label htmlFor={id} className="rs-field-label">
                        {f.label}
                      </Label>
                      <Control
                        ref={f.key === 'title' ? firstField : undefined}
                        id={id}
                        value={fields[f.key]}
                        onChange={(e) => {
                          const { value } = e.target;
                          onFieldsChange((prev) => ({ ...prev, [f.key]: value }));
                        }}
                        className={f.multiline ? AREA_CLASS : FIELD_CLASS}
                        rows={f.multiline ? 2 : undefined}
                        spellCheck={false}
                      />
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-caption text-graphite">{BUNDLE.note}</p>
            </div>
            <div className="rs-dialog-foot">
              <button type="button" className="vc-btn vc-btn-primary" onClick={create}>
                <CreateLabel />
              </button>
              <DialogPrimitive.Close asChild>
                <button type="button" className="vc-btn vc-btn-secondary">
                  {BUNDLE.cancel}
                </button>
              </DialogPrimitive.Close>
            </div>
          </DialogPrimitive.Content>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
