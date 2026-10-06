import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { FOLLOW_UP_DELAY, RESEARCH_DURATION, ResearchIllustration } from './ResearchIllustration';
import { RESEARCH_ILLUSTRATION } from '@/content/marketing';
import { typedSoFar } from './liveTestUtils';
import { typedMs } from './illustrationKit';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole typed text present from the start; one performance that starts
// in view, settles, and can be played again. Then Executive Analysis's own: the function named as
// the application names it, a question answered with its records, and a follow-up, typed once the
// answer has settled, whose answer ends in what was not found.
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

const R = RESEARCH_ILLUSTRATION;

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
  // No counts, scores, timings or validation marks.
  expect(text()).not.toMatch(/\d+\s*(sources|items|results)\b|%|\bscore|confidence|validat|seconds?\b|\bms\b/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  // The function, named as the application names it.
  expect(container.querySelector('.live-mode').textContent).toBe('Executive Analysis');
});

it('answers the question with its records, then the follow-up with what was not found', () => {
  act(() => root.render(<ResearchIllustration />));
  const [first, second] = container.querySelectorAll('ol.research-findings');
  expect(first.getAttribute('role')).toBe('list');
  const items = first.querySelectorAll(':scope > li.on-paper');
  expect(items).toHaveLength(R.findings.length);
  R.findings.forEach((finding, i) => {
    expect(items[i].querySelector('.text-body').textContent.replace(/ /g, ' ')).toBe(finding);
    expect(items[i].querySelector('.text-small').textContent.replace(/ /g, ' ')).toBe(`${R.sources[i].document}, ${R.sources[i].date}`);
  });
  const prompts = container.querySelectorAll('.live-prompt');
  expect(prompts).toHaveLength(2);
  expect(prompts[1].querySelector('.live-prompt-label').textContent).toBe(R.followUpLabel);
  expect(prompts[1].querySelector('.typed .sr-only').textContent).toBe(R.followUp);
  expect(second.querySelector('.text-body').textContent.replace(/ /g, ' ')).toBe(R.followUpFinding);
  expect(second.querySelector('.text-small').textContent.replace(/ /g, ' ')).toBe(`${R.followUpSource.document}, ${R.followUpSource.date}`);
  expect(container.querySelector('.research-gap').textContent).toBe(R.gap);
  expect(R.gap).toMatch(/^Not found in the records examined: /);
  // Reading order: question, answer, follow-up, its answer, the gap.
  const order = [...container.querySelectorAll('.live-prompt, ol.research-findings, .research-gap')];
  expect(order.map((el) => el.className.split(' ')[0])).toEqual(['live-prompt', 'research-findings', 'live-prompt', 'research-findings', 'research-gap']);
});

it('types the question, then the follow-up once the answer has settled', () => {
  jest.useFakeTimers();
  act(() => root.render(<ResearchIllustration />));
  const figure = container.querySelector('figure');
  const [question, followUp] = container.querySelectorAll('.typed');
  expect(question.querySelector('.sr-only').textContent).toBe(R.question);
  expect(followUp.querySelector('.sr-only').textContent).toBe(R.followUp);
  // Idle: both visual copies are complete (the script hides the answers until the figure plays).
  expect(typedSoFar(question)).toBe(R.question);
  expect(typedSoFar(followUp)).toBe(R.followUp);
  inView();
  act(() => jest.advanceTimersByTime(32));
  expect(typedSoFar(question).length).toBeLessThan(R.question.length);
  expect(typedSoFar(followUp)).toBe('');
  // The follow-up waits for the answer's turns: it starts after the follow-up label's turn.
  act(() => jest.advanceTimersByTime(FOLLOW_UP_DELAY - 100));
  expect(typedSoFar(question)).toBe(R.question);
  expect(typedSoFar(followUp)).toBe('');
  act(() => jest.advanceTimersByTime(600));
  expect(typedSoFar(followUp).length).toBeGreaterThan(0);
  expect(typedSoFar(followUp).length).toBeLessThan(R.followUp.length);
  act(() => jest.advanceTimersByTime(RESEARCH_DURATION));
  expect(typedSoFar(followUp)).toBe(R.followUp);
  expect(figure.classList.contains('is-settled')).toBe(true);
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(observers).toHaveLength(1);
});

it('lasts as long as its sequence, and no longer', () => {
  // The kit's rhythm, read from its stylesheet: the wait after typing and the turn of each part.
  const kit = require('fs').readFileSync(require('path').join(__dirname, 'live-figure.css'), 'utf8');
  const after = Number(kit.match(/--after:\s*(\d+)ms/)[1]);
  const step = Number(kit.match(/--step:\s*(\d+)ms/)[1]);
  act(() => root.render(<ResearchIllustration />));
  const first = parseInt(container.querySelector('figure').style.getPropertyValue('--typed-ms'), 10);
  expect(first).toBe(typedMs(R.question));
  // The follow-up starts 200 after its label's turn, the fourth after the question.
  const label = container.querySelectorAll('.live-prompt')[1].querySelector('[data-appear]');
  expect(Number(label.style.getPropertyValue('--i'))).toBe(R.findings.length + 1);
  expect(FOLLOW_UP_DELAY).toBe(first + after + (R.findings.length + 1) * step + 200);
  // Its answer waits for its own typing; the gap is the last part and settles 420 later.
  const second = container.querySelectorAll('.live-output')[1];
  const typedSecond = parseInt(second.style.getPropertyValue('--typed-ms'), 10);
  expect(typedSecond).toBe(typedMs(R.followUp, { delay: FOLLOW_UP_DELAY }));
  const last = Math.max(...[...second.querySelectorAll('[data-appear]')].map((part) => Number(part.style.getPropertyValue('--i'))));
  expect(RESEARCH_DURATION).toBe(typedSecond + after + last * step + 420 + 300);
});
