import fs from 'fs';
import path from 'path';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ReportIllustration, REPORT_DURATION } from './ReportIllustration';
import { EVIDENCE_ILLUSTRATION, REPORT_ILLUSTRATION } from '@/content/marketing';

// The checks every live illustration passes: labelled and captioned as fictional; inert apart from
// the replay control in its caption; no reference scheme, dashes or formats; dates as DD Month
// YYYY and never split; the whole text present from the start; one performance that starts in
// view, settles, and can be played again. Then the report's own: nothing is typed; the page is a
// sheet from the start and its content comes out top to bottom, a part at a time; the table stays
// a table; nothing suggests a machine at work.
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
const text = (el = container) => el.textContent.replace(/\u00a0/g, ' ');
const turn = (el) => Number(el.style.getPropertyValue('--i'));

it('is labelled, captioned, inert and set in the fictional matter', () => {
  act(() => root.render(<ReportIllustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure.live-figure');
  expect(figure.classList.contains('report-illustration')).toBe(true);
  expect(figure.getAttribute('aria-labelledby')).toBe('report-illustration-title');
  expect(container.querySelector('#report-illustration-title').tagName).toBe('H3');
  expect(container.querySelector('#report-illustration-title').textContent).toBe(REPORT_ILLUSTRATION.title);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
  // The "In context" sentence stands in the title column, after the title and before the page.
  const context = container.querySelector(':scope > figure > .report-context');
  expect(text(context)).toBe(`In context ${REPORT_ILLUSTRATION.context}`);
  expect(context.previousElementSibling.id).toBe('report-illustration-title');
  expect(context.nextElementSibling.classList.contains('report-main')).toBe(true);
  // The replay control is the only control, and it lives in the caption. The source link is a
  // citation in the report, not a link here.
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not(figure), [contenteditable]')).toHaveLength(1);
  expect(container.querySelector('figcaption > button.live-replay')).not.toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBe(5);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  // The page keeps its content in the content file's words.
  const page = container.querySelector('.report-page');
  expect(page.getAttribute('role')).toBe('group');
  expect(page.getAttribute('aria-label')).toBe(REPORT_ILLUSTRATION.pageName);
  expect(page.classList.contains('on-paper')).toBe(true);
  expect(text(page.querySelector('.report-title'))).toBe(REPORT_ILLUSTRATION.reportTitle);
  expect(container.querySelector('.report-title').textContent).toContain('type\u00a0B');
  expect(text(page.querySelector('.report-heading'))).toBe(REPORT_ILLUSTRATION.heading);
  expect(text(page.querySelector('.report-para'))).toBe(`${REPORT_ILLUSTRATION.paragraph} (${REPORT_ILLUSTRATION.source}, ${REPORT_ILLUSTRATION.sourceNote}).`);
  expect(page.querySelector('.report-source .sr-only').textContent).toBe(`, ${REPORT_ILLUSTRATION.sourceNote}`);
  const quoted = EVIDENCE_ILLUSTRATION[REPORT_ILLUSTRATION.quoteSource];
  expect(text(page.querySelector('.report-quote blockquote'))).toBe(`“${REPORT_ILLUSTRATION.quote}”`);
  expect(text(page.querySelector('.report-quote figcaption'))).toBe(`${quoted.document}, ${quoted.date}`);
  expect(page.querySelector('.report-folio').textContent).toBe(REPORT_ILLUSTRATION.folio.replace(/ /g, '\u00a0'));
});

it('keeps the table a table, each event beside its record and date', () => {
  act(() => root.render(<ReportIllustration />));
  const table = container.querySelector('table.report-table');
  expect(table.getAttribute('role')).toBe('table');
  expect(table.querySelector('caption').textContent).toBe(REPORT_ILLUSTRATION.tableCaption);
  expect([...table.querySelectorAll('thead [role="columnheader"]')].map((th) => th.textContent)).toEqual(REPORT_ILLUSTRATION.columns);
  const rows = [...table.querySelectorAll('tbody > tr[role="row"]')];
  expect(rows).toHaveLength(REPORT_ILLUSTRATION.rows.length);
  rows.forEach((row, k) => {
    const cells = [...row.querySelectorAll('[role="cell"]')];
    expect(cells.map((cell) => text(cell))).toEqual([REPORT_ILLUSTRATION.rows[k], EVIDENCE_ILLUSTRATION[k].document, EVIDENCE_ILLUSTRATION[k].date]);
    expect(row.querySelector('time').getAttribute('datetime')).toBe(EVIDENCE_ILLUSTRATION[k].isoDate);
  });
});

it('types nothing, and brings the page out top to bottom, one part at a time', () => {
  act(() => root.render(<ReportIllustration />));
  const figure = container.querySelector('figure');
  // An export is produced, not typed: no prompt, no typed line, and no typing time to wait for.
  expect(container.querySelector('.live-prompt, .typed')).toBeNull();
  expect(figure.style.getPropertyValue('--typed-ms')).toBe('');
  // The page is a sheet from the start: it does not appear, its content does.
  const page = container.querySelector('.report-page');
  expect(page.hasAttribute('data-appear')).toBe(false);
  expect(page.closest('[data-appear]')).toBeNull();
  const parts = [...page.querySelectorAll('[data-appear]')];
  expect(parts.map((el) => el.className || el.tagName.toLowerCase())).toEqual([
    'report-title', 'report-heading', 'report-para', 'report-quote', 'caption', 'tr', 'tr', 'tr', 'tr', 'report-folio',
  ]);
  // Top to bottom: each part's turn follows the one above it; the caption and the column heads
  // share one, and every other part has its own.
  expect(parts.map(turn)).toEqual([0, 1, 2, 3, 4, 4, 5, 6, 7, 8]);
  expect(parts[5].parentElement.tagName).toBe('THEAD');
  // Nothing on the page shows before its turn except the sheet itself: every text is in a part.
  const walker = document.createTreeWalker(page, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.textContent.trim()) expect(node.parentElement.closest('[data-appear]')).not.toBeNull();
  }
  // Only the page's own parts appear: the title column and the caption are there from the start.
  expect(container.querySelectorAll('[data-appear]')).toHaveLength(parts.length);
  // Nothing suggests a machine at work: no progress, no busy state, no exporting.
  expect(container.querySelector('[role="progressbar"], progress, [aria-busy], [aria-live]')).toBeNull();
  expect(text()).not.toMatch(/exporting|generating|loading|processing|\d+\s?%/i);
});

it('sets its duration from the rhythm in its stylesheet', () => {
  act(() => root.render(<ReportIllustration />));
  const css = fs.readFileSync(path.join(__dirname, 'report-illustration.css'), 'utf8');
  const ms = (name) => Number(css.match(new RegExp(`${name}:\\s*(\\d+)ms`))[1]);
  const last = Math.max(...[...container.querySelectorAll('[data-appear]')].map(turn));
  // The last part starts in its turn, takes the kit's 420ms to settle, and the performance ends 300ms later.
  expect(REPORT_DURATION).toBe(ms('--report-after') + last * ms('--report-step') + 420 + 300);
});

it('holds the whole page before it plays, plays once in view, settles, and plays again', () => {
  jest.useFakeTimers();
  act(() => root.render(<ReportIllustration />));
  const figure = container.querySelector('figure');
  // Idle: every word is in the DOM (the script only hides the parts until the figure plays).
  const whole = text();
  for (const words of [REPORT_ILLUSTRATION.reportTitle, REPORT_ILLUSTRATION.heading, REPORT_ILLUSTRATION.quote, REPORT_ILLUSTRATION.tableCaption, ...REPORT_ILLUSTRATION.rows, REPORT_ILLUSTRATION.folio]) expect(whole).toContain(words);
  expect(figure.classList.contains('is-in')).toBe(false);
  expect(observers[0].options.threshold).toContain(0.6);
  inView();
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(observers[0].disconnected).toBe(true);
  expect(text()).toBe(whole);
  act(() => jest.advanceTimersByTime(REPORT_DURATION - 1));
  expect(figure.classList.contains('is-settled')).toBe(false);
  act(() => jest.advanceTimersByTime(1));
  expect(figure.classList.contains('is-settled')).toBe(true);
  // Play again starts a fresh performance; leaving and re-entering the viewport does not.
  act(() => container.querySelector('.live-replay').click());
  expect(figure.classList.contains('is-settled')).toBe(false);
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(text()).toBe(whole);
  act(() => jest.advanceTimersByTime(REPORT_DURATION));
  expect(figure.classList.contains('is-settled')).toBe(true);
  expect(observers).toHaveLength(1);
});

it('shares one performance between two copies', () => {
  jest.useFakeTimers();
  const { useIllustrationPlay } = require('./illustrationKit');
  const Pair = () => {
    const play = useIllustrationPlay({ duration: REPORT_DURATION });
    return <><ReportIllustration play={play} /><ReportIllustration id="report-illustration-phone" play={play} /></>;
  };
  act(() => root.render(<Pair />));
  const [first, second] = container.querySelectorAll(':scope > figure');
  inView(observers[0]);
  expect(first.classList.contains('is-in')).toBe(true);
  expect(second.classList.contains('is-in')).toBe(true);
  act(() => jest.advanceTimersByTime(REPORT_DURATION));
  inView(observers[1]);
  for (const figure of [first, second]) expect(figure.classList.contains('is-settled')).toBe(true);
  expect(second.getAttribute('aria-labelledby')).toBe('report-illustration-phone-title');
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(new Set(ids).size).toBe(ids.length);
});
