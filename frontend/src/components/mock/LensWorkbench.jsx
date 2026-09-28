import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, Paperclip } from 'lucide-react';
import { MockWindow } from '@/components/mock/MockWindow';
import { FileManagerMock } from '@/components/mock/FileManagerMock';
import { ChronologyLens as LensGlyph } from '@/components/icons';
import { LedgerDisclosure, LedgerRail } from '@/components/workbench/IngestionLedger';
import { LensToolbar } from '@/components/workbench/LensToolbar';
import { EntryCards, EntryStack, EntryTable } from '@/components/workbench/LensEntries';
import { EntryDrawer } from '@/components/workbench/EntryDrawer';
import { MockTab, MockTabList, MockTabPanel, MockTabs } from '@/components/workbench/MockTabs';
import { DEFAULT_FILTERS, ENTRIES, FIRST_ENTRIES, KEYWORD_MARKER, computeLens, entryById, isDefault, markLater, marker, notRelevantStatus } from '@/components/workbench/lensModel';
import { WORKBENCH } from '@/content/matter/workbench';
import { DISCUSSION } from '@/content/matter/discussion';
import { fill, plural } from '@/lib/format';
import '@/components/workbench/workbench.css';

// Tags start as the sample matter has them; mentions start with the discussion of Fig. 6, which
// already mentions External Counsel on EV-0139.
const initialTags = () => Object.fromEntries(ENTRIES.map((e) => [e.id, e.tags]));
const initialMentions = () => ({ [DISCUSSION.doc]: [DISCUSSION.comments[0].mention.replace(/^@/, '')] });

// What the status line says after the filters change.
const describe = (lens) => (lens.hidden ? marker(WORKBENCH.status.hidden, lens.hidden) : `${plural(lens.shown, 'entry', 'entries')} shown`);

const visible = (el) => el.offsetParent !== null;

// The first visible element that opens a given entry (Table view renders a table and a stack).
const opener = (root, id) => [...(root?.querySelectorAll(`[data-entry-open="${id}"]`) || [])].find(visible);

// An entry as the list shows it: a card, a stacked card or a table row.
const ENTRY = '.wb-entry, .wb-stack-item, tbody > tr';

// From 768 px the list scrolls inside the frame. While there is more below, a fade lies over its
// foot with a count of the entries not wholly in view; `bar` keeps the fade off a scrollbar.
const NO_CLIP = { fade: false, n: 0, bar: 0 };
const clipOf = (list) => {
  const fade = list.scrollHeight - list.scrollTop - list.clientHeight > 1;
  const edge = list.getBoundingClientRect().bottom + 1;
  const n = fade ? [...list.querySelectorAll('[data-entry-open]')].filter((b) => visible(b) && b.closest(ENTRY).getBoundingClientRect().bottom > edge).length : 0;
  return { fade, n, bar: list.offsetWidth - list.clientWidth };
};

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
  const [all, setAll] = useState(false);
  const [clip, setClip] = useState(NO_CLIP);
  const listRef = useRef(null);
  const fadeRef = useRef(null);
  const moreRef = useRef(null);
  const returnTo = useRef(null);
  const afterToggle = useRef(null);

  const lens = computeLens(filters);
  const rows = markLater(lens.rows);
  const shown = lens.rows.filter((r) => r.type === 'entry').map((r) => r.entry);
  const cites = shown.filter((e) => e.exhibit).map((e) => e.exhibit);
  const open = openId ? entryById(openId) : null;
  // Below 768 px: more entries than the list opens on, and whether all of them are showing.
  const long = lens.shown > FIRST_ENTRIES;
  // Below 768 px the frame holds the height of the view the figure opens on (the Lens, as Cards,
  // unfiltered), which is the skeleton's; any other view takes its own height (wb-own).
  const opening = tab === 'lens' && view === 'cards' && isDefault(filters);

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

  // Show all moves focus to the first entry it reveals, so the keyboard carries on in date
  // order. Show fewer keeps focus on the button and keeps the button where it was on screen,
  // while the entries above it fold away.
  const toggleAll = () => {
    afterToggle.current = all ? { top: moreRef.current.getBoundingClientRect().top } : { entry: true };
    setAll(!all);
    say(all ? fill(WORKBENCH.status.firstShown, { m: FIRST_ENTRIES, n: lens.shown }) : fill(WORKBENCH.status.allShown, { n: lens.shown }));
  };
  useLayoutEffect(() => {
    const after = afterToggle.current;
    afterToggle.current = null;
    if (after?.entry) [...(listRef.current?.querySelectorAll('[data-later] [data-entry-open]') || [])].find(visible)?.focus();
    else if (after && moreRef.current) window.scrollBy(0, moreRef.current.getBoundingClientRect().top - after.top);
  }, [all]);

  // The fade and its count follow the list's scroll, its size and every change to its rows.
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const next = clipOf(list);
    setClip((c) => (c.fade === next.fade && c.n === next.n && c.bar === next.bar ? c : next));
  }, []);
  useLayoutEffect(() => measure());
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => measure());
    [list, ...list.children].forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [view, measure]);

  // Focus that moves into an entry cut off by the frame, or lying under the fade, scrolls the list
  // until the whole entry shows (or the focused control, for an entry taller than the list).
  const reveal = (e) => {
    const list = listRef.current;
    if (!list || list.scrollHeight - list.clientHeight <= 1) return;
    const box = list.getBoundingClientRect();
    const head = list.querySelector('thead');
    const top = box.top + (head && visible(head) ? head.getBoundingClientRect().height : 0);
    const bottom = box.bottom - (fadeRef.current?.offsetHeight || 0);
    const entry = e.target.closest(ENTRY);
    let r = (entry || e.target).getBoundingClientRect();
    if (r.height > bottom - top) r = e.target.getBoundingClientRect();
    if (r.bottom > bottom) list.scrollTop += Math.ceil(r.bottom - bottom);
    else if (r.top < top) list.scrollTop -= Math.ceil(top - r.top);
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
    <MockWindow title={WORKBENCH.window} className={opening ? 'wb-root flex flex-col' : 'wb-root wb-own flex flex-col'} bodyClassName="flex min-h-0 flex-1 flex-col">
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
            <div className="wb-listwrap" data-view={view}>
              <div ref={listRef} className="wb-list" data-collapsed={long && !all ? '' : undefined} onScroll={measure} onFocus={reveal}>
                <div key={view} className="wb-fade">
                  {view === 'cards' ? (
                    <EntryCards rows={rows} state={rowState} />
                  ) : (
                    <>
                      <div className="hidden md:block">
                        <EntryTable rows={rows} state={rowState} />
                      </div>
                      <div className="md:hidden">
                        <EntryStack rows={rows} state={rowState} />
                      </div>
                    </>
                  )}
                  {long && (
                    <div className="wb-showall">
                      <button ref={moreRef} type="button" className="vc-btn vc-btn-secondary wb-btn" onClick={toggleAll}>
                        {all ? WORKBENCH.showFewer : fill(WORKBENCH.showAll, { n: lens.shown })}
                      </button>
                    </div>
                  )}
                  {lens.excluded > 0 && <p className="wb-kw">{marker(KEYWORD_MARKER, lens.excluded)}</p>}
                </div>
              </div>
              <div ref={fadeRef} className="wb-more" data-shown={clip.fade || undefined} style={{ right: clip.bar }} aria-hidden="true">
                {clip.n > 0 && (
                  <span className="wb-more-count">
                    <ArrowDown className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    {marker(WORKBENCH.moreEntries, clip.n)}
                  </span>
                )}
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
