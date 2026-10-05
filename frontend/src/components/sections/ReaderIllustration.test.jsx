import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { READER_DURATION, ReaderIllustration } from './ReaderIllustration';
import { MATTER_RECORDS, READER_ILLUSTRATION } from '@/content/marketing';

// The opening figure passes the checks every live illustration passes (labelled and captioned as
// fictional; inert apart from the replay control in its caption; no reference scheme, dashes or
// formats; dates as DD Month YYYY and never split; the whole typed text present from the start;
// one performance that starts in view, settles, and can be played again), and its own: the record
// selected beside its original page, the four notes in reading order after the parts they name,
// and the find term typed after its label before the passage is marked.
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
    observe(el) { this.el = el; }
    disconnect() { this.disconnected = true; }
  };
  global.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
  global.cancelAnimationFrame = (id) => clearTimeout(id);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  delete global.IntersectionObserver;
  delete window.matchMedia;
  jest.useRealTimers();
});

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
const inView = (observer = observers[0]) => act(() => observer.callback([{ isIntersecting: true, intersectionRatio: 0.96, intersectionRect: { height: 400 }, rootBounds: { height: 800 } }]));
const text = () => container.textContent.replace(/\u00a0/g, ' ');
const R = READER_ILLUSTRATION;
// The kit types at 34 characters a second after 240ms.
const TYPED_MS = 240 + Math.ceil((R.findTerm.length * 1000) / 34);

it('is labelled by a paragraph under the h1, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<ReaderIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure.reader-illustration');
  expect(figure.getAttribute('aria-labelledby')).toBe('reader-illustration-title');
  // A paragraph, not a heading: the figure sits directly under the h1.
  const title = container.querySelector('#reader-illustration-title');
  expect(title.tagName).toBe('P');
  expect(title.textContent).toBe(R.title);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The replay control is the only control, and it lives in the caption.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex], [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  expect(container.querySelector('img, video, canvas')).toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  for (const time of container.querySelectorAll('time')) expect(time.getAttribute('datetime')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  // The drawing is paper on the ink panel.
  expect(container.querySelector('.reader-plate').classList.contains('on-paper')).toBe(true);
});

it('reads the selected record beside its original page, each note after the part it names', () => {
  act(() => root.render(<ReaderIllustration />));
  const rows = container.querySelectorAll('.reader-list > li');
  expect(rows).toHaveLength(MATTER_RECORDS.length);
  MATTER_RECORDS.forEach((record, i) => {
    expect(rows[i].textContent.replace(/\u00a0/g, ' ')).toContain(`${record.document}${record.date}${record.folder}`);
    expect(rows[i].getAttribute('aria-current')).toBe(i === R.selected ? 'true' : null);
  });
  expect(container.querySelector('.reader-list').getAttribute('aria-label')).toBe(R.recordsName);
  // The notes, in reading order directly after the part each names.
  expect(rows[R.selected].lastElementChild.textContent).toBe(R.notes.selected);
  expect(container.querySelector('.reader-reach').lastElementChild.textContent).toBe(R.notes.details);
  const page = container.querySelector('.reader-page');
  expect(page.firstElementChild.textContent).toBe(R.notes.page);
  expect(container.querySelectorAll('.reader-note')).toHaveLength(4);
  // The page is the selected record, with its header and the passage found.
  expect(page.getAttribute('role')).toBe('group');
  expect(page.getAttribute('aria-label')).toBe(`${MATTER_RECORDS[R.selected].document}, original page`);
  expect(page.querySelector('mark.reader-found').textContent).toBe(R.findTerm);
  expect(R.email.found).toBe(R.findTerm);
  expect([...page.querySelectorAll('.reader-mailhead dt')].map((dt) => dt.textContent)).toEqual(R.email.header.map(([term]) => term));
  // The reader's views are type, not tabs, and the strip keeps the page number.
  expect(container.querySelector('[role="tab"], [role="tablist"]')).toBeNull();
  expect(container.querySelector('.reader-views').textContent).toBe(`Views: ${R.views.join('')}`);
  expect(container.querySelector('.reader-find').textContent.replace(/\u00a0/g, ' ')).toBe(`${R.findLabel}: ${R.findTerm}${R.findTerm}${R.page}`);
  expect(container.querySelector('.reader-find-page').textContent).toBe(R.page.replace(/ /g, '\u00a0'));
  // The sideline and its note are decorative; the passage is announced once, outside the record's text.
  expect(container.querySelector('.reader-pin').getAttribute('aria-hidden')).toBe('true');
  const body = container.querySelector('.reader-body').cloneNode(true);
  body.querySelectorAll('[aria-hidden="true"]').forEach((el) => el.remove());
  expect(body.textContent.replace(/\u00a0/g, ' ')).toBe(`${R.email.before}${R.email.found}${R.email.after}`);
  expect(container.querySelector('.reader-found-note').textContent).toBe(`${R.notes.found}: \u201c${R.findTerm}\u201d.`);
});

it('types the find term after its label, holding its place and the whole term for assistive technology', () => {
  jest.useFakeTimers();
  act(() => root.render(<ReaderIllustration />));
  const figure = container.querySelector('figure');
  // The term is typed in the strip, after "Find in document:", not in a prompt of its own.
  expect(container.querySelector('.live-prompt')).toBeNull();
  const field = container.querySelector('.reader-find-input > .reader-find-field');
  const typed = field.querySelector(':scope > .typed.reader-find-term');
  expect(typed.querySelector('.sr-only').textContent).toBe(R.findTerm);
  // Idle: the visual copy is complete (the script hides it until the figure plays).
  expect(typed.querySelector('.typed-visual').textContent).toBe(R.findTerm);
  expect(typed.querySelector('.typed-visual').getAttribute('aria-hidden')).toBe('true');
  expect(figure.style.getPropertyValue('--typed-ms')).toBe(`${TYPED_MS}ms`);
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typed.querySelector('.typed-visual').textContent).toBe('');
  expect(typed.classList.contains('is-typing')).toBe(true);
  act(() => jest.advanceTimersByTime(500));
  const partway = typed.querySelector('.typed-visual').textContent;
  expect(partway.length).toBeGreaterThan(0);
  expect(partway.length).toBeLessThan(R.findTerm.length);
  expect(R.findTerm.startsWith(partway)).toBe(true);
  act(() => jest.advanceTimersByTime(TYPED_MS));
  expect(typed.querySelector('.typed-visual').textContent).toBe(R.findTerm);
  expect(typed.classList.contains('is-typing')).toBe(false);
  // The answer follows the typing: the sideline's note and, for phones and assistive technology,
  // the note beneath the text, each in the first turn after it.
  const parts = [...container.querySelectorAll('[data-appear]')];
  expect(parts.map((el) => el.className)).toEqual(['reader-note-text', 'reader-found-note sr-only']);
  for (const part of parts) expect(part.style.getPropertyValue('--i')).toBe('0');
});

it('starts when the page is all but wholly in view, settles, and plays again from the start', () => {
  jest.useFakeTimers();
  act(() => root.render(<ReaderIllustration />));
  const figure = container.querySelector('figure');
  // The page, not the figure's top edge, starts the performance.
  expect(observers).toHaveLength(1);
  expect(observers[0].el).toBe(container.querySelector('.reader-page'));
  expect(observers[0].options.threshold).toContain(0.95);
  inView();
  expect(observers[0].disconnected).toBe(true);
  // The duration covers the typing, the mark, the sideline, the leader and the note (1920ms after
  // the typing), and 300ms more.
  expect(READER_DURATION).toBeGreaterThanOrEqual(TYPED_MS + 1920 + 300);
  act(() => jest.advanceTimersByTime(READER_DURATION - 1));
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(1));
  expect(figure.classList.contains('is-settled')).toBe(true);
  // Play again starts a fresh performance and types the term afresh; it adds no observer.
  const typed = container.querySelector('.typed');
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typed.querySelector('.typed-visual').textContent).toBe('');
  act(() => jest.advanceTimersByTime(READER_DURATION));
  expect(typed.querySelector('.typed-visual').textContent).toBe(R.findTerm);
  expect(figure.classList.contains('is-settled')).toBe(true);
  expect(observers).toHaveLength(1);
});

it('shows the whole term at once under reduced motion', () => {
  jest.useFakeTimers();
  window.matchMedia = (query) => ({ matches: query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {} });
  act(() => root.render(<ReaderIllustration />));
  inView();
  act(() => jest.advanceTimersByTime(16));
  const typed = container.querySelector('.typed');
  expect(typed.querySelector('.typed-visual').textContent).toBe(R.findTerm);
  expect(typed.classList.contains('is-typing')).toBe(false);
});

it('shares one performance between two copies, with distinct ids', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: READER_DURATION });
    return <><ReaderIllustration play={play} /><ReaderIllustration id="reader-illustration-second" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll('figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(READER_DURATION));
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
});
