import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Paperclip } from 'lucide-react';
import { MockWindow } from '@/components/mock/MockWindow';
import { FileManagerMock } from '@/components/mock/FileManagerMock';
import { ChronologyLens as LensGlyph } from '@/components/icons';
import { LedgerDisclosure, LedgerRail } from '@/components/workbench/IngestionLedger';
import { LensToolbar } from '@/components/workbench/LensToolbar';
import { EntryCards, EntryStack, EntryTable } from '@/components/workbench/LensEntries';
import { EntryDrawer } from '@/components/workbench/EntryDrawer';
import { MockTab, MockTabList, MockTabPanel, MockTabs } from '@/components/workbench/MockTabs';
import { DEFAULT_FILTERS, ENTRIES, KEYWORD_MARKER, computeLens, entryById, marker, notRelevantStatus } from '@/components/workbench/lensModel';
import { WORKBENCH } from '@/content/matter/workbench';
import { DISCUSSION } from '@/content/matter/discussion';
import { plural } from '@/lib/format';
import '@/components/workbench/workbench.css';

// Tags start as the sample matter has them; mentions start with the discussion of Fig. 6, which
// already mentions External Counsel on EV-0139.
const initialTags = () => Object.fromEntries(ENTRIES.map((e) => [e.id, e.tags]));
const initialMentions = () => ({ [DISCUSSION.doc]: [DISCUSSION.comments[0].mention.replace(/^@/, '')] });

// What the status line says after the filters change.
const describe = (lens) => (lens.hidden ? marker(WORKBENCH.status.hidden, lens.hidden) : `${plural(lens.shown, 'entry', 'entries')} shown`);

// The first visible element that opens a given entry (Table view renders a table and a stack).
const opener = (root, id) => [...(root?.querySelectorAll(`[data-entry-open="${id}"]`) || [])].find((el) => el.offsetParent !== null);

// Fig. 3: the sample matter in the Chronology Lens workbench, with a File Manager tab. Every
// value lives in this component's state; nothing is sent anywhere. `bundleLink` is the chapter
// that shows Create bundle (passed in, so this chunk does not import the copy deck).
export function LensWorkbench({ bundleLink }) {
  const [tab, setTab] = useState('lens');
  const [view, setView] = useState('cards');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [openId, setOpenId] = useState(null);
  const [authored, setAuthored] = useState(true);
  const [tags, setTags] = useState(initialTags);
  const [mentions, setMentions] = useState(initialMentions);
  const [marked, setMarked] = useState([]);
  const [noise, setNoise] = useState(false);
  const [status, setStatus] = useState('');
  const listRef = useRef(null);
  const returnTo = useRef(null);

  const lens = computeLens(filters);
  const shown = lens.rows.filter((r) => r.type === 'entry').map((r) => r.entry);
  const cites = shown.filter((e) => e.exhibit).map((e) => e.exhibit);
  const open = openId ? entryById(openId) : null;

  // A repeated message still changes the region's text, so it is spoken again.
  const say = useCallback((text) => setStatus((s) => (s === text ? `${text}\u00a0` : text)), []);

  const apply = (next, message) => {
    const l = computeLens(next);
    setFilters(next);
    if (openId && !l.rows.some((r) => r.type === 'entry' && r.entry.id === openId)) setOpenId(null);
    say(message ? `${message}. ${describe(l)}` : describe(l));
  };
  const change = (patch) => apply({ ...filters, ...patch });
  const removeKeyword = (k) => {
    const next = { ...filters, keywords: filters.keywords.filter((x) => x !== k) };
    apply(next, marker(KEYWORD_MARKER, computeLens(next).excluded));
  };

  const close = () => {
    returnTo.current = openId;
    setOpenId(null);
  };
  // Once the drawer has gone (and the list is visible again), focus returns to the entry.
  useLayoutEffect(() => {
    if (openId || !returnTo.current) return;
    opener(listRef.current, returnTo.current)?.focus();
    returnTo.current = null;
  }, [openId]);
  const mark = (id, on) => {
    setMarked((m) => (on ? [...m, id] : m.filter((x) => x !== id)));
    say(on ? notRelevantStatus(entryById(id)) : 'Item restored to search');
  };

  const rowState = {
    cites,
    openId,
    onOpen: setOpenId,
    tags,
    marked,
    authored,
    onAuthored: setAuthored,
  };

  return (
    <MockWindow title={WORKBENCH.window} right={<span className="hidden sm:inline">Fig. 3</span>} className="wb-root flex h-full flex-col" bodyClassName="flex min-h-0 flex-1 flex-col">
      <MockTabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <MockTabList label="Workbench" className="wb-tabs">
          <MockTab value="lens" className="wb-tab">
            <LensGlyph size={18} className="hidden min-[400px]:block" />
            {WORKBENCH.tabs[0]}
          </MockTab>
          <MockTab value="files" className="wb-tab">
            <Paperclip className="hidden h-4 w-4 min-[400px]:block" strokeWidth={1.5} aria-hidden="true" />
            {WORKBENCH.tabs[1]}
          </MockTab>
        </MockTabList>

        <MockTabPanel value="lens" className="wb-lens">
          <LedgerRail />
          <div className="wb-main" data-drawer={open ? 'open' : undefined}>
            <LedgerDisclosure />
            <LensToolbar
              view={view}
              onView={setView}
              filters={filters}
              onChange={change}
              onRemoveKeyword={removeKeyword}
              onReset={() => apply(DEFAULT_FILTERS)}
              bundleLink={bundleLink}
            />
            <div className="wb-listwrap">
              <div ref={listRef} className="wb-list">
                <div key={view} className="wb-fade">
                  {view === 'cards' ? (
                    <EntryCards rows={lens.rows} state={rowState} />
                  ) : (
                    <>
                      <div className="hidden md:block">
                        <EntryTable rows={lens.rows} state={rowState} />
                      </div>
                      <div className="md:hidden">
                        <EntryStack rows={lens.rows} state={rowState} />
                      </div>
                    </>
                  )}
                  {lens.excluded > 0 && <p className="wb-kw">{marker(KEYWORD_MARKER, lens.excluded)}</p>}
                </div>
              </div>
              {open && (
                <EntryDrawer
                  entry={open}
                  cites={cites}
                  onClose={close}
                  tags={tags[open.id]}
                  onTags={(t) => setTags((all) => ({ ...all, [open.id]: t }))}
                  mentioned={mentions[open.id] || []}
                  onMentions={(m) => setMentions((all) => ({ ...all, [open.id]: m }))}
                  marked={marked.includes(open.id)}
                  onMark={(on) => mark(open.id, on)}
                  say={say}
                />
              )}
            </div>
          </div>
        </MockTabPanel>

        <MockTabPanel value="files" className="min-h-0 flex-1">
          <FileManagerMock
            noise={noise}
            onNoise={(on) => {
              setNoise(on);
              say(on ? WORKBENCH.status.noiseShown : 'Noise hidden');
            }}
          />
        </MockTabPanel>
      </MockTabs>
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
    </MockWindow>
  );
}
