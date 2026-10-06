import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { RESEARCH_DURATION, ResearchIllustration } from './ResearchIllustration';
import { EVIDENCE_ILLUSTRATION, RESEARCH_ILLUSTRATION } from '@/content/marketing';
import { typedSoFar } from './liveTestUtils';

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
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not(figure), [contenteditable]')).toHaveLength(1);
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
  expect(typedSoFar(typed)).toBe(RESEARCH_ILLUSTRATION.question);
  expect(figure.classList.contains('is-in')).toBe(false);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers[0].disconnected).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(RESEARCH_ILLUSTRATION.question.length);
  expect(typed.classList.contains('is-typing')).toBe(true);
  // The findings wait for the typing: each has its turn.
  const parts = container.querySelectorAll('[data-appear]');
  expect(parts).toHaveLength(RESEARCH_ILLUSTRATION.findings.length + 2);
  expect(figure.style.getPropertyValue('--typed-ms')).toMatch(/^\d+ms$/);
  act(() => jest.advanceTimersByTime(RESEARCH_DURATION));
  expect(typedSoFar(typed)).toBe(RESEARCH_ILLUSTRATION.question);
  expect(figure.classList.contains('is-settled')).toBe(true);
  // Play again starts a fresh performance; leaving and re-entering the viewport does not.
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(16));
  expect(typedSoFar(typed).length).toBeLessThan(RESEARCH_ILLUSTRATION.question.length);
  expect(observers).toHaveLength(1);
});

it('shares one performance between its two copies', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: RESEARCH_DURATION });
    return <><ResearchIllustration play={play} /><ResearchIllustration id="research-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll('figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(RESEARCH_DURATION));
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
});

it('lasts as long as its sequence, and no longer', () => {
  // The kit's rhythm, read from its stylesheet: the wait after typing and the turn of each part.
  const kit = require('fs').readFileSync(require('path').join(__dirname, 'live-figure.css'), 'utf8');
  const after = Number(kit.match(/--after:\s*(\d+)ms/)[1]);
  const step = Number(kit.match(/--step:\s*(\d+)ms/)[1]);
  act(() => root.render(<ResearchIllustration />));
  const typing = parseInt(container.querySelector('figure').style.getPropertyValue('--typed-ms'), 10);
  expect(typing).toBe(240 + Math.ceil((RESEARCH_ILLUSTRATION.question.length * 1000) / 34));
  // The last part to appear (what was not found) starts in its turn and settles 420 later.
  const last = Math.max(...[...container.querySelectorAll('[data-appear]')].map((part) => Number(part.style.getPropertyValue('--i'))));
  expect(last).toBe(RESEARCH_ILLUSTRATION.findings.length + 1);
  expect(RESEARCH_DURATION).toBe(typing + after + last * step + 420 + 300);
});
