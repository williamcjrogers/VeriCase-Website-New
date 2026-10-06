import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { REBUTTAL_DURATION, RebuttalIllustration } from './RebuttalIllustration';
import { REBUTTAL_ILLUSTRATION } from '@/content/marketing';
import { typedSoFar } from './liveTestUtils';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole typed text present from the start; one performance that starts
// in view, settles, and can be played again. Then the checks for this figure's own sequence: the
// assertion typed in quotation marks, each record as paper with its relation in words beneath it,
// and the proposed reply last, marked for review and citing its record.
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

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
const NBSP = '\u00a0';
const R = REBUTTAL_ILLUSTRATION;
const keepDates = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, `$1${NBSP}$2${NBSP}$3`);
const ASSERTION = `“${keepDates(R.assertion)}”`;
const records = R.records.map(({ index, relation }) => ({ source: REBUTTAL_ILLUSTRATION.sources[index], relation }));
const inView = (observer = observers[0]) => act(() => observer.callback([{ isIntersecting: true, intersectionRatio: 0.7, intersectionRect: { height: 400 }, rootBounds: { height: 800 } }]));
const text = () => container.textContent.replace(/\u00a0/g, ' ');

it('is labelled, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<RebuttalIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure.rebuttal-illustration');
  expect(figure.getAttribute('aria-labelledby')).toBe('rebuttal-illustration-title');
  expect(container.querySelector('#rebuttal-illustration-title').tagName).toBe('H3');
  expect(container.querySelector('#rebuttal-illustration-title').textContent).toBe(R.title);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The replay control is the only control, and it lives in the caption.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not(figure), [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  // Each record is quoted and cited by document and date; the reply cites its record the same way.
  for (const { source, relation } of records) {
    expect(text()).toContain(`“${source.excerpt}”`);
    expect(text()).toContain(`${source.document}, ${source.date}`);
    expect(text()).toContain(relation);
  }
  expect(text()).toContain(`${R.reply} (${REBUTTAL_ILLUSTRATION.sources[R.replySource].document}).`);
  expect(text()).toContain(R.assertionLabel);
  expect(text()).toContain(R.recordsLabel);
  expect(text()).toContain(R.replyLabel);
});

it('sets the assertion on the ink, each record on paper with its relation beneath, and the reply on paper', () => {
  act(() => root.render(<RebuttalIllustration />));
  // The assertion is the typed input: its label, then the line in quotation marks.
  const prompt = container.querySelector('.rebuttal-pages > .live-prompt.rebuttal-assertion');
  expect(prompt.querySelector('.live-prompt-label').textContent).toBe(R.assertionLabel);
  expect(prompt.querySelector('.typed.live-prompt-line .sr-only').textContent).toBe(ASSERTION);
  expect(prompt.closest('.on-paper')).toBeNull();
  // The record: a list of the records, each a paper slip holding the quotation and its
  // attribution, with its relation stated in words on the ink beneath the slip.
  const page = container.querySelector('.rebuttal-pages > .live-output.rebuttal-records-page');
  expect(page.querySelector('h4.live-output-label').textContent).toBe(R.recordsLabel);
  const items = page.querySelectorAll('ol.rebuttal-records[role="list"] > li.rebuttal-record');
  expect(items).toHaveLength(records.length);
  items.forEach((item, k) => {
    const { source, relation } = records[k];
    const slip = item.querySelector(':scope > .rebuttal-slip.on-paper');
    expect(slip.querySelector('blockquote > p').textContent).toBe(`“${keepDates(source.excerpt)}”`);
    expect(slip.querySelector('.rebuttal-attribution.text-small.text-graphite').textContent).toBe(`${source.document}, ${keepDates(source.date)}`);
    const stated = item.querySelector(':scope > p.rebuttal-relation');
    expect(stated.textContent).toBe(relation);
    expect(stated.closest('.on-paper')).toBeNull();
    expect(slip.compareDocumentPosition(stated) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
  // The reply: its label on the ink, then the drafted sheet on paper, citing the lead-time email.
  const reply = container.querySelector('.rebuttal-pages ~ .live-output.rebuttal-reply');
  expect(reply.querySelector('h4.live-output-label').textContent).toBe(R.replyLabel);
  const sheet = reply.querySelector('p.rebuttal-reply-page.on-paper');
  expect(sheet.textContent).toBe(`${keepDates(R.reply)} (${REBUTTAL_ILLUSTRATION.sources[R.replySource].document}).`);
  expect(sheet.querySelector('.rebuttal-cite').textContent).toBe(`(${REBUTTAL_ILLUSTRATION.sources[R.replySource].document})`);
});

it('holds the whole assertion for assistive technology and types it only while playing', () => {
  jest.useFakeTimers();
  act(() => root.render(<RebuttalIllustration />));
  const figure = container.querySelector('figure');
  const typed = container.querySelector('.typed');
  expect(container.querySelectorAll('.typed')).toHaveLength(1);
  expect(typed.querySelector('.sr-only').textContent).toBe(ASSERTION);
  // Idle: the visual copy is complete (the script hides it until the figure plays).
  expect(typedSoFar(typed)).toBe(ASSERTION);
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers[0].disconnected).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(ASSERTION.length);
  expect(typed.classList.contains('is-typing')).toBe(true);
  // The record and the reply wait for the typing: each has its turn.
  expect(container.querySelectorAll('[data-appear]')).toHaveLength(1 + 2 * records.length + 2);
  expect(figure.style.getPropertyValue('--typed-ms')).toMatch(/^\d+ms$/);
  expect(parseInt(figure.style.getPropertyValue('--typed-ms'), 10)).toBeGreaterThan(2000);
  // The performance settles at its duration, counted from the moment it came into view.
  act(() => jest.advanceTimersByTime(REBUTTAL_DURATION - 17));
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(1));
  expect(typedSoFar(typed)).toBe(ASSERTION);
  expect(figure.classList.contains('is-settled')).toBe(true);
  // Play again starts a fresh performance; leaving and re-entering the viewport does not.
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(ASSERTION.length);
  expect(observers).toHaveLength(1);
});

it('gives the record its turns after the typing, each slip before its relation, and the reply last', () => {
  act(() => root.render(<RebuttalIllustration />));
  const parts = [...container.querySelectorAll('[data-appear]')];
  const turns = parts.map((el) => [el.className.replace(/\s*live-output-label\s*/, ' ').trim(), el.style.getPropertyValue('--i')]);
  expect(turns).toEqual([
    ['rebuttal-records-label', '0'],
    ['rebuttal-slip on-paper', '1'], ['rebuttal-relation', '1'],
    ['rebuttal-slip on-paper', '2'], ['rebuttal-relation', '2'],
    ['rebuttal-reply-label', '3'], ['rebuttal-reply-page on-paper', '3'],
  ]);
  // The duration covers the typing, the last turn and the beat the reply waits after its label.
  const typedMs = parseInt(container.querySelector('figure').style.getPropertyValue('--typed-ms'), 10);
  expect(REBUTTAL_DURATION).toBeGreaterThanOrEqual(typedMs + 320 + 3 * 480 + 240 + 420 + 300);
  // The typed line sits before the record, and the record before the reply, in reading order.
  const order = [...container.querySelectorAll('.typed, .rebuttal-records, .rebuttal-reply-page')].map((el) => el.className.split(' ')[0]);
  expect(order).toEqual(['typed', 'rebuttal-records', 'rebuttal-reply-page']);
});

it('shares one performance between its two copies', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: REBUTTAL_DURATION });
    return <><RebuttalIllustration play={play} /><RebuttalIllustration id="rebuttal-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll('figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(REBUTTAL_DURATION));
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
});
