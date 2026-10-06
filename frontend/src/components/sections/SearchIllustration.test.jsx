import { readFileSync } from 'fs';
import { join } from 'path';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { SearchIllustration, SEARCH_DURATION, SEARCH_TYPING } from './SearchIllustration';
import { CONTEXT_LABEL, MATTER_RECORDS, SEARCH_ILLUSTRATION } from '@/content/marketing';
import { typedSoFar } from './liveTestUtils';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole typed text present from the start; one performance that starts
// in view, settles, and can be played again. Then the search's own: the query typed in quotation
// marks in the title column, the answer ranked with no count, each result's parts on its turn and
// its match marked, and a duration that covers the rhythm its stylesheet sets.
let container;
let root;
let observers;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  observers = [];
  global.IntersectionObserver = class {
    constructor(callback, options) { this.callback = callback; this.options = options; this.disconnected = false; observers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  };
  global.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
  global.cancelAnimationFrame = (id) => clearTimeout(id);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  delete global.IntersectionObserver;
  jest.useRealTimers();
});

const S = SEARCH_ILLUSTRATION;
const QUERY = `“${S.query}”`;
const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
const inView = (observer = observers[0]) => act(() => observer.callback([{ isIntersecting: true, intersectionRatio: 0.7, intersectionRect: { height: 400 }, rootBounds: { height: 800 } }]));
const text = () => container.textContent.replace(/\u00a0/g, ' ');

it('is labelled, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<SearchIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure.search-illustration');
  expect(figure.getAttribute('aria-labelledby')).toBe('search-illustration-title');
  expect(container.querySelector('#search-illustration-title').tagName).toBe('H3');
  expect(container.querySelector('#search-illustration-title').textContent).toBe(S.title);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The replay control is the only control, and it lives in the caption.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not(figure), [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF/i);
  // No count, score, percentage or timing: the order is the ranking.
  expect(text()).not.toMatch(/\d+\s*(results?|matches|documents|hits)\b|%|\bscore|seconds?\b|\bms\b/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  // Why someone would look, in the title column after the query.
  const head = figure.querySelector('.search-head');
  expect(head.querySelector('.live-prompt-label').textContent).toBe(S.queryLabel);
  expect(head.querySelector('.evidence-context-label').textContent).toBe(CONTEXT_LABEL);
  expect(head.querySelector('.evidence-context-text').textContent.replace(/\u00a0/g, ' ')).toBe(S.context);
  expect(head.querySelector('.live-prompt').compareDocumentPosition(head.querySelector('.evidence-context')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

it('ranks each passage beside the document it comes from, with the match marked', () => {
  act(() => root.render(<SearchIllustration />));
  const rank = container.querySelector('h4.search-rank');
  expect(rank.textContent).toBe(S.rankLabel);
  const list = container.querySelector('ol.search-results');
  // The list keeps its semantics with its markers removed, and is named by the ranking's label.
  expect(list.getAttribute('role')).toBe('list');
  expect(list.getAttribute('aria-labelledby')).toBe(rank.id);
  const items = [...list.children];
  expect(items).toHaveLength(S.results.length);
  items.forEach((item, k) => {
    const { record, before, match, after } = S.results[k];
    const source = MATTER_RECORDS[record];
    expect(item.tagName).toBe('LI');
    // The rank is a numeral for the eye; the list's order gives it to a screen reader.
    const numeral = item.querySelector('.search-result-rank');
    expect(numeral.textContent).toBe(String(k + 1));
    expect(numeral.getAttribute('aria-hidden')).toBe('true');
    expect(item.querySelector('.search-result-name').textContent).toBe(source.document);
    expect(item.querySelector('.search-result-meta').textContent.replace(/\u00a0/g, ' ')).toBe(`${source.folder}, ${source.date}`);
    expect(item.querySelector('time').getAttribute('datetime')).toBe(source.isoDate);
    const slip = item.querySelector('blockquote.search-slip.on-paper');
    expect(slip.textContent.replace(/\u00a0/g, ' ')).toBe(`“${before}${match}${after}”`);
    // The match is the query, marked where it occurs in the passage.
    const marks = slip.querySelectorAll('mark.search-match');
    expect(marks).toHaveLength(1);
    expect(marks[0].textContent).toBe(S.query);
  });
});

it('holds the whole query for assistive technology and types it only while playing', () => {
  jest.useFakeTimers();
  act(() => root.render(<SearchIllustration />));
  const figure = container.querySelector('figure');
  const typed = container.querySelector('.search-head .typed');
  expect(typed.querySelector('.sr-only').textContent).toBe(QUERY);
  // Idle: the visual copy is complete (the script hides it until the figure plays).
  expect(typedSoFar(typed)).toBe(QUERY);
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers[0].disconnected).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(QUERY.length);
  expect(typed.classList.contains('is-typing')).toBe(true);
  // Partway through, the query is being typed from its opening quotation mark.
  act(() => jest.advanceTimersByTime(SEARCH_TYPING.delay + 300));
  const partial = typedSoFar(typed);
  expect(partial.length).toBeGreaterThan(0);
  expect(partial.length).toBeLessThan(QUERY.length);
  expect(QUERY.startsWith(partial)).toBe(true);
  // The answer waits for the typing, which the figure times at the query's own pace.
  expect(figure.style.getPropertyValue('--typed-ms')).toBe(`${SEARCH_TYPING.delay + Math.ceil((QUERY.length * 1000) / SEARCH_TYPING.cps)}ms`);
  act(() => jest.advanceTimersByTime(SEARCH_DURATION));
  expect(typedSoFar(typed)).toBe(QUERY);
  expect(typed.classList.contains('is-typing')).toBe(false);
  expect(figure.classList.contains('is-settled')).toBe(true);
  // Play again starts a fresh performance; leaving and re-entering the viewport does not.
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(QUERY.length);
  expect(observers).toHaveLength(1);
  act(() => jest.advanceTimersByTime(SEARCH_DURATION));
  expect(figure.classList.contains('is-settled')).toBe(true);
  expect(typedSoFar(typed)).toBe(QUERY);
});

it('brings the answer in turn: the label, then each result with its rank, record and slip', () => {
  act(() => root.render(<SearchIllustration />));
  const parts = [...container.querySelectorAll('[data-appear]')];
  // The label, then three parts for each result; nothing in the title column waits.
  expect(parts).toHaveLength(1 + 3 * S.results.length);
  expect(container.querySelector('.search-head [data-appear]')).toBeNull();
  expect(parts[0]).toBe(container.querySelector('.search-rank'));
  expect(parts[0].style.getPropertyValue('--i')).toBe('0');
  // Each result's turn is set on its item, and its parts take it from there, in reading order.
  [...container.querySelectorAll('.search-result')].forEach((item, k) => {
    expect(item.style.getPropertyValue('--i')).toBe(String(k));
    const own = [...item.querySelectorAll('[data-appear]')];
    expect(own.map((el) => el.className.split(' ')[0])).toEqual(['search-result-rank', 'search-result-record', 'search-slip']);
    for (const el of own) expect(el.style.getPropertyValue('--i')).toBe('');
  });
});

it('settles only after the last match is marked', () => {
  // The rhythm is set in the stylesheet; the duration must cover it, plus the kit's 300.
  const css = readFileSync(join(__dirname, 'search-illustration.css'), 'utf8');
  const v = (name) => {
    const m = new RegExp(`--search-${name}:\\s*(\\d+)ms`).exec(css);
    expect(m).not.toBeNull();
    return Number(m[1]);
  };
  const typed = SEARCH_TYPING.delay + Math.ceil((QUERY.length * 1000) / SEARCH_TYPING.cps);
  const lastTurn = typed + v('after') + v('lead') + (S.results.length - 1) * v('step');
  const lastMark = lastTurn + v('beat') + v('mark-at') + v('mark-ms');
  // The last slip has landed (the kit's 420) before its match is marked.
  expect(v('mark-at')).toBeGreaterThanOrEqual(300);
  expect(lastTurn + v('beat') + 420).toBeLessThanOrEqual(lastMark);
  expect(SEARCH_DURATION).toBe(lastMark + 300);
});

it('shares one performance between two copies', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: SEARCH_DURATION });
    return <><SearchIllustration play={play} /><SearchIllustration id="search-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll('figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(SEARCH_DURATION));
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
  // Each copy's list is named by its own label.
  for (const figure of [first, second]) expect(figure.querySelector(`#${figure.querySelector('ol').getAttribute('aria-labelledby')}`)).not.toBeNull();
});
