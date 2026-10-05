import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ChronologyIllustration, CHRONOLOGY_DURATION } from './ChronologyIllustration';
import { CHRONOLOGY_ILLUSTRATION, EVIDENCE_ILLUSTRATION } from '@/content/marketing';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole text present from the start; one performance that starts in
// view, settles, and can be played again. Then the chronology's own sequence: nothing is typed;
// the documents appear in turn, then the record's label, then each entry in date order, with an
// arrow drawn from its document.
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
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  delete global.IntersectionObserver;
  jest.useRealTimers();
});

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
const inView = (observer = observers[0]) => act(() => observer.callback([{ isIntersecting: true, intersectionRatio: 0.7, intersectionRect: { height: 400 }, rootBounds: { height: 800 } }]));
const text = () => container.textContent.replace(/ /g, ' ');

it('is labelled, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<ChronologyIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure');
  expect(figure.getAttribute('aria-labelledby')).toBe('chronology-illustration-title');
  expect(container.querySelector('#chronology-illustration-title').tagName).toBe('H3');
  expect(container.querySelector('#chronology-illustration-title').textContent).toBe(CHRONOLOGY_ILLUSTRATION.title);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The replay control is the only control, and it lives in the caption.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex], [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  expect(container.querySelector('#notes')).toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF/i);
  expect(container.querySelector('.mono, code')).toBeNull();
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates).toHaveLength(EVIDENCE_ILLUSTRATION.length);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
});

it('pairs each document with its dated entry on one record, in date order', () => {
  act(() => root.render(<ChronologyIllustration />));
  expect(container.querySelector('.chronology-record-label').textContent).toBe(CHRONOLOGY_ILLUSTRATION.recordLabel);
  const items = container.querySelectorAll('.chronology-flow > li');
  expect(items).toHaveLength(EVIDENCE_ILLUSTRATION.length);
  items.forEach((item, i) => {
    const source = EVIDENCE_ILLUSTRATION[i];
    // Reading order: the document, then its entry's date and title; the arrow between them is decorative.
    expect(item.textContent.replace(/ /g, ' ')).toBe(`${source.document}${source.date}${source.title}`);
    expect(item.querySelector('.chronology-doc').classList.contains('on-paper')).toBe(true);
    expect(item.querySelector('.chronology-doc svg').getAttribute('aria-hidden')).toBe('true');
    expect(item.querySelector('.chronology-arrow').getAttribute('aria-hidden')).toBe('true');
    expect(item.querySelector('.chronology-entry time').getAttribute('datetime')).toBe(source.isoDate);
    expect(item.style.getPropertyValue('--i')).toBe(String(i));
  });
  const stamps = [...container.querySelectorAll('time')].map((t) => t.getAttribute('datetime'));
  expect(stamps).toEqual([...stamps].sort());
});

it('types nothing, and holds every part of the record in the page before it plays', () => {
  jest.useFakeTimers();
  act(() => root.render(<ChronologyIllustration />));
  const figure = container.querySelector('figure');
  expect(container.querySelector('.typed, .live-prompt')).toBeNull();
  expect(figure.style.getPropertyValue('--typed-ms')).toBe('');
  // The parts that appear, in order: the three documents and their entries, and the record's label.
  const parts = [...container.querySelectorAll('[data-appear]')];
  expect(parts.map((p) => p.className.split(' ')[0])).toEqual([
    'live-output-label', 'chronology-doc', 'chronology-entry-text', 'chronology-doc', 'chronology-entry-text', 'chronology-doc', 'chronology-entry-text',
  ]);
  // The rule and node belong to the entry, not to the text that appears, so they can draw first.
  for (const part of parts) expect(part.classList.contains('chronology-entry')).toBe(false);
  const before = text();
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(observers[0].disconnected).toBe(true);
  // Nothing is added or removed as it plays: the whole text is present in every frame.
  expect(text()).toBe(before);
  expect(container.querySelector('[hidden]')).toBeNull();
  act(() => jest.advanceTimersByTime(CHRONOLOGY_DURATION - 100));
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(100));
  expect(figure.classList.contains('is-settled')).toBe(true);
  expect(text()).toBe(before);
  // Play again starts a fresh performance; leaving and re-entering the viewport does not.
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(CHRONOLOGY_DURATION));
  expect(figure.classList.contains('is-settled')).toBe(true);
  expect(observers).toHaveLength(1);
});

it('starts only when enough of it is in view', () => {
  act(() => root.render(<ChronologyIllustration />));
  const figure = container.querySelector('figure');
  act(() => observers[0].callback([{ isIntersecting: true, intersectionRatio: 0.05, intersectionRect: { height: 20 }, rootBounds: { height: 800 } }]));
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
});

it('shares one performance between its two copies', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: CHRONOLOGY_DURATION });
    return <><ChronologyIllustration play={play} /><ChronologyIllustration id="chronology-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll('figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(CHRONOLOGY_DURATION));
  // The second copy comes into view (after a rotation, say) and does not start the sequence again.
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
  for (const figure of container.querySelectorAll('figure[aria-labelledby]')) expect(document.getElementById(figure.getAttribute('aria-labelledby'))).not.toBeNull();
});
