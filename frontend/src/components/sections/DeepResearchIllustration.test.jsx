import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { DEEP_RESEARCH_DURATION, DEEP_RESEARCH_PARTS, DeepResearchIllustration } from './DeepResearchIllustration';
import { DEEP_RESEARCH_ILLUSTRATION } from '@/content/marketing';
import { typedSoFar } from './liveTestUtils';
import { typedMs } from './illustrationKit';

// The checks every live illustration passes, then Deep Research's own: the question typed; the
// report as paper with its research angles, a section whose references point into the evidence
// appendix, and the appendix itself; then the bundle, as downloaded, built from that evidence with
// its cover page first. No controls, counts, timings, validation marks or file format.
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
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    disconnect() {}
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

const D = DEEP_RESEARCH_ILLUSTRATION;
const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
const text = (el = container) => el.textContent.replace(/ /g, ' ');
const inView = () => act(() => observers[0].callback([{ isIntersecting: true, intersectionRatio: 0.7, intersectionRect: { height: 400 }, rootBounds: { height: 800 } }]));

it('is labelled, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<DeepResearchIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure.deep-research-illustration');
  expect(figure.getAttribute('aria-labelledby')).toBe('deep-research-illustration-title');
  expect(container.querySelector('#deep-research-illustration-title').tagName).toBe('H3');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not(figure), [contenteditable]')).toHaveLength(1);
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|\bPDF\b|Word/i);
  expect(text()).not.toMatch(/\d+\s*(sources|items|evidence analysed)\b|%|\bscore|confidence|validat|processing|seconds?\b|\bms\b/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  expect(container.querySelector('.live-mode').textContent).toBe('Deep Research');
});

it('sets out the report: angles, a section referenced to the appendix, and the appendix', () => {
  act(() => root.render(<DeepResearchIllustration />));
  const report = container.querySelector('article.deep-report.on-paper');
  expect(report.getAttribute('aria-labelledby')).toBe('deep-research-illustration-report-title');
  expect(text(report.querySelector('.deep-report-title'))).toBe(D.question);
  expect([...report.querySelectorAll('.deep-angles > li')].map((li) => text(li))).toEqual(D.angles);
  // Each sentence ends with its reference, numbered as the appendix numbers its entries.
  const refs = [...report.querySelectorAll('.deep-text sup.deep-ref')];
  expect(refs).toHaveLength(D.sentences.length);
  refs.forEach((ref, k) => expect(text(ref)).toBe(`(evidence ${k + 1})`));
  const entries = report.querySelectorAll('ol.deep-appendix-list > li');
  expect(entries).toHaveLength(D.appendix.length);
  D.appendix.forEach((item, k) => {
    expect(entries[k].querySelector('.deep-appendix-n').textContent).toBe(String(k + 1));
    expect(text(entries[k].querySelector('.deep-appendix-entry'))).toBe(`${item.kind} ${item.document}, ${item.date}`);
    expect(entries[k].querySelector('time').getAttribute('datetime')).toBe(item.isoDate);
  });
  expect(D.sentences.length).toBe(D.appendix.length);
});

it('builds the bundle from the appendix, its cover page first and its title given', () => {
  act(() => root.render(<DeepResearchIllustration />));
  const bundle = container.querySelector('.deep-bundle.on-paper');
  expect(bundle.getAttribute('role')).toBe('group');
  expect(bundle.getAttribute('aria-labelledby')).toBe('deep-research-illustration-bundle-title');
  expect(text(bundle.querySelector('.deep-bundle-title'))).toBe(D.bundleTitle);
  const items = [...bundle.querySelectorAll('ol.deep-bundle-list > li')].map((li) => text(li));
  expect(items).toEqual([`1${D.cover}`, ...D.appendix.map((item, k) => `${k + 2}${item.document}, ${item.date}`)]);
  // The bundle follows the report in reading order.
  const report = container.querySelector('.deep-report');
  expect(report.compareDocumentPosition(bundle) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

it('types the question, sets out the report in turn, and lasts as long as its sequence', () => {
  jest.useFakeTimers();
  act(() => root.render(<DeepResearchIllustration />));
  const figure = container.querySelector('figure');
  const typed = container.querySelector('.typed');
  expect(typed.querySelector('.sr-only').textContent).toBe(D.question);
  expect(figure.style.getPropertyValue('--typed-ms')).toBe(`${typedMs(D.question)}ms`);
  const turns = [...container.querySelectorAll('[data-appear]')].map((part) => Number(part.style.getPropertyValue('--i')));
  expect(turns).toEqual([...Array(DEEP_RESEARCH_PARTS).keys()]);
  expect(DEEP_RESEARCH_DURATION).toBe(typedMs(D.question) + 320 + (DEEP_RESEARCH_PARTS - 1) * 420 + 420 + 300);
  inView();
  act(() => jest.advanceTimersByTime(32));
  expect(typedSoFar(typed).length).toBeLessThan(D.question.length);
  act(() => jest.advanceTimersByTime(DEEP_RESEARCH_DURATION));
  expect(typedSoFar(typed)).toBe(D.question);
  expect(figure.classList.contains('is-settled')).toBe(true);
});
