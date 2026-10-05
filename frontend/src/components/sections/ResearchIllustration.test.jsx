import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ResearchIllustration } from './ResearchIllustration';
import { EVIDENCE_ILLUSTRATION, RESEARCH_ILLUSTRATION } from '@/content/marketing';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole typed text present from the start; one performance that starts
// in view, settles, and can be played again.
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
const inView = (observer = observers[0]) => act(() => observer.callback([{ isIntersecting: true, intersectionRatio: 0.7, intersectionRect: { height: 400 }, rootBounds: { height: 800 } }]));
const text = () => container.textContent.replace(/ /g, ' ');

it('is labelled, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<ResearchIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure');
  expect(figure.getAttribute('aria-labelledby')).toBe('research-illustration-title');
  expect(container.querySelector('#research-illustration-title').tagName).toBe('H3');
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The replay control is the only control, and it lives in the caption.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex], [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  for (const source of EVIDENCE_ILLUSTRATION) expect(text()).toContain(`${source.document}, ${source.date}`);
});

it('holds the whole question for assistive technology and types it only while playing', () => {
  jest.useFakeTimers();
  act(() => root.render(<ResearchIllustration />));
  const figure = container.querySelector('figure');
  const typed = container.querySelector('.typed');
  expect(typed.querySelector('.sr-only').textContent).toBe(RESEARCH_ILLUSTRATION.question);
  // Idle: the visual copy is complete (the script hides it until the figure plays).
  expect(typed.querySelector('.typed-visual').textContent).toBe(RESEARCH_ILLUSTRATION.question);
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers[0].disconnected).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typed.querySelector('.typed-visual').textContent.length).toBeLessThan(RESEARCH_ILLUSTRATION.question.length);
  expect(typed.classList.contains('is-typing')).toBe(true);
  // The findings wait for the typing: each has its turn.
  const parts = container.querySelectorAll('[data-appear]');
  expect(parts).toHaveLength(RESEARCH_ILLUSTRATION.findings.length + 2);
  expect(figure.style.getPropertyValue('--typed-ms')).toMatch(/^\d+ms$/);
  act(() => jest.advanceTimersByTime(4600));
  expect(typed.querySelector('.typed-visual').textContent).toBe(RESEARCH_ILLUSTRATION.question);
  expect(figure.classList.contains('is-settled')).toBe(true);
  // Play again starts a fresh performance; leaving and re-entering the viewport does not.
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typed.querySelector('.typed-visual').textContent.length).toBeLessThan(RESEARCH_ILLUSTRATION.question.length);
  expect(observers).toHaveLength(1);
});

it('shares one performance between its two copies', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: 4600 });
    return <><ResearchIllustration play={play} /><ResearchIllustration id="research-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll('figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(4600));
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
});
