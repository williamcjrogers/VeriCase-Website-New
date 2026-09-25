import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Paperclip } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { HASHES, addressLabel, kindLabel, personLabel, recordById } from '@/content/sampleMatter';
import { Gated } from '@/components/editorial/Gated';
import { formatDate, truncateHash } from '@/lib/format';

const SourceSheetContext = createContext({ open: () => {} });
export const useSourceSheet = () => useContext(SourceSheetContext);

// One Source sheet per page. Citations anywhere on the page open it; previous and next move
// through the list of exhibits supplied by the opener (for example, a report's citations).
export function SourceSheetProvider({ children }) {
  const [state, setState] = useState({ id: null, list: null, side: 'right' });
  const invoker = useRef(null);

  const open = useCallback((id, list, fromEl) => {
    invoker.current = fromEl || null;
    const wide = typeof window !== 'undefined' && window.matchMedia?.('(min-width: 640px)').matches;
    setState({ id, list: list && list.length ? list : [id], side: wide ? 'right' : 'bottom' });
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, id: null })), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <SourceSheetContext.Provider value={value}>
      {children}
      <SourceSheet state={state} setState={setState} onClose={close} invoker={invoker} />
    </SourceSheetContext.Provider>
  );
}

const Row = ({ k, children }) => (
  <div className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-rule py-2 last:border-b-0">
    <dt className="font-mono text-[0.75rem] uppercase tracking-[0.06em] text-graphite">{k}</dt>
    <dd className="min-w-0 break-words text-caption text-ink">{children}</dd>
  </div>
);

function SourceSheet({ state, setState, onClose, invoker }) {
  const { id, list, side } = state;
  const [fullHash, setFullHash] = useState(false);
  const r = id ? recordById(id) : null;
  const index = id && list ? list.indexOf(id) : -1;
  const go = (d) => {
    const next = list[index + d];
    if (next) {
      setFullHash(false);
      setState((s) => ({ ...s, id: next }));
    }
  };

  return (
    <Sheet open={Boolean(id)} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side={side}
        className={
          side === 'right'
            ? 'vc-sheet ph-no-capture flex w-full flex-col gap-0 overflow-y-auto border-l border-rule-strong bg-paper p-0 sm:max-w-[30rem]'
            : 'vc-sheet ph-no-capture flex max-h-[85vh] flex-col gap-0 overflow-y-auto border-t border-rule-strong bg-paper p-0'
        }
        overlayClassName="bg-ink-950/55"
        closeLabel="Close source"
        closeClassName="vc-close on-azure right-1.5 top-1.5 opacity-100 focus:ring-white focus:ring-offset-0 data-[state=open]:bg-transparent"
        onCloseAutoFocus={(e) => {
          if (invoker.current && document.body.contains(invoker.current)) {
            e.preventDefault();
            invoker.current.focus();
          }
        }}
      >
        {r && (
          <>
            <div className="border-b border-rule bg-azure-500 py-3 pl-5 pr-14 text-white">
              <SheetTitle className="font-mono text-[0.9375rem] font-medium tracking-[0.02em] text-white">
                {r.id} · {kindLabel(r)}
              </SheetTitle>
              <SheetDescription className="mt-0.5 text-[0.8125rem] text-white/90">
                Sample matter (fictional). {r.subject}
              </SheetDescription>
            </div>
            <div className="flex-1 px-5 py-4">
              <dl>
                {r.kind === 'email' ? (
                  <>
                    <Row k="From">{addressLabel(r.from)}</Row>
                    <Row k="To">{r.to.map(addressLabel).join('; ')}</Row>
                    {r.cc.length > 0 && <Row k="Cc">{r.cc.map(addressLabel).join('; ')}</Row>}
                    <Row k="Date">
                      {formatDate(r.date)}, {r.time}
                    </Row>
                    <Row k="Subject">{r.subject}</Row>
                    <Row k="Message-ID">
                      <span className="font-mono text-[0.8125rem]">{r.messageId}</span>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row k="Author">{personLabel(r.from)}</Row>
                    <Row k="Date">{formatDate(r.date)} (resolved from the page)</Row>
                    <Row k="File">
                      <span className="font-mono text-[0.8125rem]">{r.file}</span>
                    </Row>
                  </>
                )}
                <Row k="Custodian">{r.custodian}</Row>
                <Row k="Source path">
                  <span className="font-mono text-[0.8125rem]">{r.sourcePath}</span>
                </Row>
                <Row k="Hash">
                  <Gated id="G5_hash">
                    <span className="font-mono text-[0.8125rem]">
                      SHA-256 {fullHash ? HASHES[r.id] : truncateHash(HASHES[r.id])}
                    </span>
                  </Gated>{' '}
                  <button
                    type="button"
                    className="ml-1 text-[0.8125rem] font-medium text-azure-700 underline underline-offset-2"
                    onClick={() => setFullHash((v) => !v)}
                    aria-pressed={fullHash}
                  >
                    {fullHash ? 'Hide full hash' : 'Show full hash'}
                  </button>
                </Row>
              </dl>

              <h3 className="mt-6 eyebrow">{r.kind === 'email' ? 'Authored text' : 'Text read by OCR'}</h3>
              <p className="mt-2 font-display text-[1.0625rem] leading-relaxed text-ink">{r.authored}</p>

              {r.quoted.length > 0 && (
                <Collapsible className="mt-5 border-t border-rule pt-3">
                  <CollapsibleTrigger className="group flex w-full items-center justify-between py-1 text-left text-caption font-medium text-azure-700">
                    <span>Quoted history ({r.quoted.length})</span>
                    <span className="font-mono text-[0.75rem] text-graphite group-data-[state=open]:hidden">Show</span>
                    <span className="hidden font-mono text-[0.75rem] text-graphite group-data-[state=open]:inline">Hide</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-3 border-l-2 border-rule pl-3">
                    {r.quoted.map((q, i) => (
                      <div key={i} className="text-caption text-graphite">
                        <p className="font-mono text-[0.75rem]">
                          {personLabel(q.from)} · {formatDate(q.date)}, {q.time}
                        </p>
                        <p className="mt-1">{q.text}</p>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

              <p className="mt-5 flex items-center gap-2 border-t border-rule pt-3 text-caption text-graphite">
                <Paperclip className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {r.attachments.length ? `Attachments: ${r.attachments.join(', ')}` : 'Attachments: none'}
              </p>
            </div>
            <div className="sticky bottom-0 flex items-center justify-between gap-2 border-t border-rule bg-paper px-5 py-3">
              <button
                type="button"
                className="vc-btn vc-btn-quiet"
                onClick={() => go(-1)}
                disabled={index <= 0}
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                Previous citation
              </button>
              <span className="font-mono text-[0.75rem] text-graphite">
                {index + 1} of {list.length}
              </span>
              <button
                type="button"
                className="vc-btn vc-btn-quiet"
                onClick={() => go(1)}
                disabled={index >= list.length - 1}
              >
                Next citation
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
