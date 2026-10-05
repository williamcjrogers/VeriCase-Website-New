import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ReaderIllustration } from './ReaderIllustration';
import { SearchIllustration } from './SearchIllustration';
import { ReportIllustration } from './ReportIllustration';
import {
  EVIDENCE_ILLUSTRATION, MATTER_RECORDS, READER_ILLUSTRATION, REPORT_ILLUSTRATION, SEARCH_ILLUSTRATION,
} from '@/content/marketing';

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
const text = () => container.textContent.replace(/ /g, ' ');

// The three illustrations that stand where the application captures stood: labelled, captioned
// as fictional, inert (nothing to click, focus or type into), with no dashes and no reference
// scheme, every date as DD Month YYYY and never split, and no claim beyond the fictional matter.
it.each([['reader', ReaderIllustration], ['search', SearchIllustration], ['report', ReportIllustration]])('the %s illustration is labelled, inert and set in the fictional matter', (name, Illustration) => {
  act(() => root.render(<Illustration />));
  const figure = container.querySelector(':scope > figure.evidence-figure');
  expect(figure.getAttribute('aria-labelledby')).toBe(`${name}-illustration-title`);
  expect(document.getElementById(`${name}-illustration-title`).classList.contains('evidence-figure-title')).toBe(true);
  expect(container.querySelector('.section-kicker').textContent).toBe('Illustration');
  expect(container.querySelector(':scope > figure > figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\.$/);
  expect(container.querySelectorAll('button, a, input, select, textarea, [tabindex], [contenteditable]')).toHaveLength(0);
  expect(container.querySelector('img, video, canvas')).toBeNull();
  expect(text()).not.toMatch(/EV-\d|@\w|[\u2013\u2014]/);
  expect(text()).not.toMatch(/programme|delay analysis|\.pdf|\.docx|Word|PDF/i);
  const dates = container.textContent.match(new RegExp(`(?<!\\d)\\d{1,2}[ \\u00a0](${MONTHS})[ \\u00a0]?\\d{0,4}`, 'g')) || [];
  expect(dates.length).toBeGreaterThan(0);
  for (const date of dates) expect(date).toMatch(new RegExp(`^\\d{2}\\u00a0(${MONTHS})\\u00a0\\d{4}$`));
  for (const time of container.querySelectorAll('time')) expect(time.getAttribute('datetime')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});

it('reads the selected record beside its original page, with the found passage marked once in view', () => {
  jest.useFakeTimers();
  act(() => root.render(<ReaderIllustration />));
  const figure = container.querySelector('figure');
  const rows = container.querySelectorAll('.reader-list > li');
  expect(rows).toHaveLength(MATTER_RECORDS.length);
  MATTER_RECORDS.forEach((record, i) => {
    expect(rows[i].textContent.replace(/ /g, ' ')).toContain(`${record.document}${record.date}${record.folder}`);
    expect(rows[i].getAttribute('aria-current')).toBe(i === READER_ILLUSTRATION.selected ? 'true' : null);
  });
  // The page is the selected record, with its header and the passage the reader found.
  const page = container.querySelector('.reader-page');
  expect(page.getAttribute('aria-label')).toBe(`${MATTER_RECORDS[READER_ILLUSTRATION.selected].document}, original page`);
  expect(page.querySelector('mark').textContent).toBe(READER_ILLUSTRATION.findTerm);
  expect(container.querySelector('.reader-find').textContent).toContain(`Find in document: ${READER_ILLUSTRATION.findTerm}`);
  // The sideline's note is decorative; the passage is announced once, outside the record's text.
  expect(container.querySelector('.reader-pin').getAttribute('aria-hidden')).toBe('true');
  const body = container.querySelector('.reader-body').cloneNode(true);
  body.querySelectorAll('[aria-hidden="true"]').forEach((el) => el.remove());
  expect(body.textContent.replace(/\u00a0/g, ' ')).toBe(`${READER_ILLUSTRATION.email.before}${READER_ILLUSTRATION.email.found}${READER_ILLUSTRATION.email.after}`);
  expect(container.querySelector('.reader-found-note').textContent).toContain(READER_ILLUSTRATION.notes.found);
  // It plays once, when enough of it is in view, and then settles.
  expect(figure.classList.contains('is-in')).toBe(false);
  act(() => observers[0].callback([{ isIntersecting: true, intersectionRatio: 0.7, intersectionRect: { height: 400 }, rootBounds: { height: 800 } }]));
  expect(figure.classList.contains('is-in')).toBe(true);
  expect(observers[0].disconnected).toBe(true);
  act(() => jest.advanceTimersByTime(2500));
  expect(figure.classList.contains('is-settled')).toBe(true);
});

it('shows each matching passage beside the record it comes from, strongest match first', () => {
  act(() => root.render(<SearchIllustration />));
  expect(container.querySelector('.search-query').textContent).toContain(`Searched for “${SEARCH_ILLUSTRATION.query}”`);
  const results = container.querySelectorAll('.search-results > li');
  expect(results).toHaveLength(SEARCH_ILLUSTRATION.results.length);
  SEARCH_ILLUSTRATION.results.forEach(({ record, before, match, after }, i) => {
    const source = MATTER_RECORDS[record];
    expect(results[i].querySelector('.search-result-record').textContent.replace(/ /g, ' ')).toBe(`${source.document}${source.folder}, ${source.date}`);
    expect(results[i].querySelector('blockquote').textContent.replace(/ /g, ' ')).toBe(`“${before}${match}${after}”`);
    expect(results[i].querySelector('mark').textContent).toBe(match);
    expect(match).toBe(SEARCH_ILLUSTRATION.query);
  });
  expect(container.querySelectorAll('.search-results > li').length).toBeGreaterThan(0);
  expect(text()).not.toMatch(/\d+ results?/);
});

it('exports the report with its structure, a source link, a distinct quotation and the events table', () => {
  act(() => root.render(<ReportIllustration />));
  const page = container.querySelector('.report-page');
  expect(page.getAttribute('role')).toBe('group');
  expect(page.querySelector('.report-para').textContent.replace(/ /g, ' ')).toBe(`${REPORT_ILLUSTRATION.paragraph} (${REPORT_ILLUSTRATION.source}, source link).`);
  const quote = page.querySelector('figure.report-quote');
  expect(quote.querySelector('blockquote').textContent.replace(/ /g, ' ')).toBe(`“${REPORT_ILLUSTRATION.quote}”`);
  const quoted = EVIDENCE_ILLUSTRATION[REPORT_ILLUSTRATION.quoteSource];
  expect(quote.querySelector(':scope > figcaption').textContent.replace(/ /g, ' ')).toBe(`${quoted.document}, ${quoted.date}`);
  expect(quote.lastElementChild.tagName).toBe('FIGCAPTION');
  const table = page.querySelector('table');
  expect(table.querySelector('caption').textContent).toBe(REPORT_ILLUSTRATION.tableCaption);
  expect([...table.querySelectorAll('th')].map((th) => th.textContent)).toEqual(REPORT_ILLUSTRATION.columns);
  const rows = table.querySelectorAll('tbody tr');
  expect(rows).toHaveLength(EVIDENCE_ILLUSTRATION.length);
  rows.forEach((row, i) => {
    expect([...row.children].map((cell) => cell.textContent.replace(/ /g, ' '))).toEqual([REPORT_ILLUSTRATION.rows[i], EVIDENCE_ILLUSTRATION[i].document, EVIDENCE_ILLUSTRATION[i].date]);
    expect([...row.children].every((cell) => cell.getAttribute('role') === 'cell')).toBe(true);
  });
});
