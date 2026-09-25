import { useCallback, useRef, useState } from 'react';
import { MockWindow } from '@/components/mock/MockWindow';
import { HeadsTree } from '@/components/claims/HeadsTree';
import { Narrative } from '@/components/claims/Narrative';
import { DECIDED, EvidenceFinder } from '@/components/claims/EvidenceFinder';
import { MockTab, MockTabList, MockTabPanel, MockTabs } from '@/components/workbench/MockTabs';
import { Gated, isShown } from '@/components/editorial/Gated';
import { CLAIMS_BUILDER as B, WORKBENCH } from '@/content/sampleMatter';
import '@/components/claims/claims.css';

const WIDE = '(min-width: 1024px)';
const PANES = ['draft', 'tree', 'finder'];
// Every exhibit the narrative cites, in its order, for the Source sheet's previous and next.
const BASE_CITES = B.paragraphs.flatMap((p) => [...p.text.matchAll(/\[\[ev:(EV-\d{4})\]\]/g)].map((m) => m[1]));
const HEADS_WITH_CHILDREN = B.tree.filter((h) => h.children.length).map((h) => h.n);

// A media query read when the visitor acts (never while rendering).
const matches = (q) => typeof window !== 'undefined' && window.matchMedia?.(q).matches;

// Flashes an azure outline round a citation once it has arrived (the ring's opacity animates).
const flash = (chip) => {
  const wrap = chip?.closest('.cb-new');
  if (!wrap) return;
  wrap.classList.remove('cb-flash');
  void wrap.offsetWidth; // eslint-disable-line no-void
  wrap.classList.add('cb-flash');
};

// Moves a ghost copy of the finder's chip to the new citation (240 ms), then flashes it. Under
// reduced motion, or when the finder is not on screen, the citation simply appears.
const fly = (from, to) => {
  if (!to) return;
  if (!from || !from.offsetParent || matches('(prefers-reduced-motion: reduce)') || !to.animate) {
    flash(to);
    return;
  }
  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  const ghost = from.cloneNode(true);
  ghost.setAttribute('aria-hidden', 'true');
  ghost.tabIndex = -1;
  Object.assign(ghost.style, { position: 'fixed', left: `${a.left}px`, top: `${a.top}px`, margin: '0', zIndex: '60', pointerEvents: 'none' });
  document.body.appendChild(ghost);
  to.style.opacity = '0';
  const move = ghost.animate([{ transform: 'none' }, { transform: `translate(${b.left - a.left}px, ${b.top - a.top}px)` }], {
    duration: 240,
    easing: 'cubic-bezier(0.2, 0, 0, 1)',
  });
  move.onfinish = () => {
    ghost.remove();
    to.style.opacity = '';
    flash(to);
  };
};

// Fig. 5: the claims builder for the sample matter. From 1024 px the tree, the draft and the
// evidence finder sit side by side; below that they are tabs, with the draft first. Values live
// in this component's state; nothing is sent anywhere.
export function ClaimsBuilderMock({ labels }) {
  const [open, setOpen] = useState(HEADS_WITH_CHILDREN);
  const [inserted, setInserted] = useState([]);
  const [decisions, setDecisions] = useState({});
  const [pane, setPane] = useState(PANES[0]);
  const [status, setStatus] = useState('');
  const desk = useRef(null);
  const tabs = useRef(null);

  const say = useCallback((text) => setStatus((s) => (s === text ? `${text}\u00a0` : text)), []);
  const cites = [...BASE_CITES, ...inserted];
  const onOpen = (n, o) => setOpen((all) => (o ? [...all, n] : all.filter((x) => x !== n)));
  const scope = () => (matches(WIDE) ? desk.current : tabs.current);

  // The drafter's decisions. Each moves focus to what replaces the button pressed; below 1024 px
  // Insert citation also turns to the draft, where the new citation takes focus.
  const decide = (ev, state) => setDecisions((d) => ({ ...d, [ev]: state }));
  const insert = (ev, button) => {
    const wide = matches(WIDE);
    const source = button.closest('[data-sug]')?.querySelector('.ev-chip');
    setInserted((list) => [...list, ev]);
    decide(ev, 'inserted');
    if (!wide) setPane('draft');
    say(`${ev}: ${DECIDED.inserted}`);
    requestAnimationFrame(() => {
      const root = scope();
      const chip = root?.querySelector(`[data-cite="${ev}"] .ev-chip`);
      if (wide) {
        root?.querySelector(`[data-sug="${ev}"] [data-undo]`)?.focus();
        fly(source, chip);
      } else {
        chip?.scrollIntoView({ block: 'nearest' });
        chip?.focus();
        fly(null, chip);
      }
    });
  };
  const dismiss = (ev) => {
    decide(ev, 'dismissed');
    say(`${ev}: ${DECIDED.dismissed}`);
    requestAnimationFrame(() => scope()?.querySelector(`[data-sug="${ev}"] [data-undo]`)?.focus());
  };
  const undo = (ev) => {
    setInserted((list) => list.filter((x) => x !== ev));
    setDecisions((d) => Object.fromEntries(Object.entries(d).filter(([k]) => k !== ev)));
    say(`${ev}: ${B.suggested}`);
    requestAnimationFrame(() => scope()?.querySelector(`[data-sug="${ev}"] [data-insert]`)?.focus());
  };

  const finder = isShown('G5_claims') && (
    <Gated id="G5_claims" block>
      <EvidenceFinder decisions={decisions} onInsert={insert} onDismiss={dismiss} onUndo={undo} />
    </Gated>
  );
  const tree = (
    <Gated id="G1_jct" block>
      <HeadsTree label={labels.tree} open={open} onOpen={onOpen} cited={cites.length} />
    </Gated>
  );

  return (
    <MockWindow title={WORKBENCH.window} right={<span className="hidden sm:inline">Fig. 5</span>} className="cb-root flex h-full flex-col" bodyClassName="flex min-h-0 flex-1 flex-col">
      <div ref={desk} className="cb-desk">
        <div className="cb-pane cb-pane-tree">{tree}</div>
        <div className="cb-pane cb-pane-draft">
          <Narrative inserted={inserted} cites={cites} />
        </div>
        {finder && <div className="cb-pane cb-pane-finder">{finder}</div>}
      </div>

      <div ref={tabs} className="cb-tabs-layout">
        <MockTabs value={pane} onValueChange={setPane} className="flex min-h-0 flex-1 flex-col">
          <MockTabList label={labels.tabs} className="cb-tabs">
            {B.mobileTabs.map((label, i) =>
              PANES[i] === 'finder' && !finder ? null : (
                <MockTab key={label} value={PANES[i]} className="cb-tab">
                  {label}
                </MockTab>
              )
            )}
          </MockTabList>
          <MockTabPanel value="draft" className="cb-pane cb-pane-draft">
            <Narrative inserted={inserted} cites={cites} />
          </MockTabPanel>
          <MockTabPanel value="tree" className="cb-pane cb-pane-tree">
            {tree}
          </MockTabPanel>
          {finder && (
            <MockTabPanel value="finder" className="cb-pane cb-pane-finder">
              {finder}
            </MockTabPanel>
          )}
        </MockTabs>
      </div>
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
    </MockWindow>
  );
}
