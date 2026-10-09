import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { UploadExample, UPLOAD_DURATION } from './UploadExample';
import { SearchExample, SEARCH_DURATION } from './SearchExample';
import { ItemExample, ITEM_DURATION } from './ItemExample';
import { AnalysisExample, ANALYSIS_DURATION } from './AnalysisExample';
import { ReportExample, REPORT_DURATION } from './ReportExample';
import { BundleExample, BUNDLE_DURATION } from './BundleExample';
import { ActivityExample, ACTIVITY_DURATION } from './ActivityExample';
import { ANALYSIS_EXAMPLE, BUNDLE_EXAMPLE, RAIL, SEARCH_EXAMPLE } from '@/content/examples';

let container;
let root;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

const EXAMPLES = [
  ['upload', UploadExample, UPLOAD_DURATION],
  ['search', SearchExample, SEARCH_DURATION],
  ['item', ItemExample, ITEM_DURATION],
  ['analysis', AnalysisExample, ANALYSIS_DURATION],
  ['report', ReportExample, REPORT_DURATION],
  ['bundle', BundleExample, BUNDLE_DURATION],
  ['activity', ActivityExample, ACTIVITY_DURATION],
];

describe.each(EXAMPLES)('the %s example', (name, Example, duration) => {
  it('is a titled figure in the application frame, with its caption, in house style', () => {
    act(() => root.render(<Example />));
    const figure = container.querySelector('figure.app-example');
    const title = figure.querySelector(`#${name}-example-title`);
    expect(figure.getAttribute('aria-labelledby')).toBe(`${name}-example-title`);
    expect(title.textContent).toMatch(/\.$/);
    expect(figure.querySelector('figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
    // The project bar and the application's own navigation, with this example's view marked.
    expect(figure.querySelector('.app-project').textContent).toBe('Sample project');
    expect([...figure.querySelectorAll('.app-rail > li')].map((li) => li.textContent)).toEqual(RAIL);
    expect(figure.querySelectorAll('.app-rail [aria-current="page"]')).toHaveLength(1);
    // Drawn controls are pictures: nothing in the window can take focus.
    expect(figure.querySelectorAll('.app-window :is(a, button, input, select, textarea, [tabindex])')).toHaveLength(0);
    // No dashes and no addresses (the copy check keeps real names out of the source).
    expect(figure.textContent).not.toMatch(/[\u2013\u2014]|@\w/);
    expect(duration).toBeGreaterThan(1000);
  });
});

it('shows the search term found inside an attachment, the strongest cue first', () => {
  act(() => root.render(<SearchExample />));
  const marks = [...container.querySelectorAll('mark')];
  expect(marks).toHaveLength(SEARCH_EXAMPLE.results.length);
  marks.forEach((m) => expect(m.textContent).toBe(SEARCH_EXAMPLE.term));
  expect(container.textContent).toContain(`Found in: ${SEARCH_EXAMPLE.results[0].foundIn}`);
});

it('gives the answer with its sources and a confidence score out of 100', () => {
  act(() => root.render(<AnalysisExample />));
  expect(container.textContent).toContain(`${ANALYSIS_EXAMPLE.confidence}/100`);
  expect(container.querySelectorAll('.chat-evidence > li')).toHaveLength(ANALYSIS_EXAMPLE.evidence.length);
});

it('builds the bundle with the cover page first and the report on top of its evidence', () => {
  act(() => root.render(<BundleExample />));
  const items = [...container.querySelectorAll('.bundle-list > li')].map((li) => li.querySelector('.bundle-item-title').firstChild.textContent);
  expect(items[0]).toBe(BUNDLE_EXAMPLE.cover);
  expect(items[1]).toBe('VeriCase Analysis Report');
  expect(items).toHaveLength(BUNDLE_EXAMPLE.items.length + 1);
  // The PDF as downloaded: cover sheet, index with one row per item, and an item page.
  expect(container.querySelectorAll('.bundle-page')).toHaveLength(3);
  expect(container.querySelectorAll('.bundle-index tbody tr')).toHaveLength(BUNDLE_EXAMPLE.items.length);
});
