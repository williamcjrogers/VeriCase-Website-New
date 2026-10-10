import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { UploadExample, UPLOAD_DURATION } from './UploadExample';
import { SearchExample, SEARCH_DURATION } from './SearchExample';
import { ItemExample, ITEM_DURATION } from './ItemExample';
import { AnalysisExample, ANALYSIS_DURATION } from './AnalysisExample';
import { ReportExample, REPORT_DURATION } from './ReportExample';
import { BundleExample, BUNDLE_DURATION } from './BundleExample';
import { ActivityExample, ACTIVITY_DURATION } from './ActivityExample';
import { LanesExample, LANES_DURATION } from './LanesExample';
import { RebuttalExample, REBUTTAL_DURATION } from './RebuttalExample';
import { DraftingExample, DRAFTING_DURATION } from './DraftingExample';
import { ReaderExample, READER_DURATION } from './ReaderExample';
import { ArgumentExample, ARGUMENT_DURATION } from './ArgumentExample';
import { ExportExample, EXPORT_DURATION } from './ExportExample';
import { ANALYSIS_EXAMPLE, ARGUMENT_EXAMPLE, BUNDLE_EXAMPLE, DRAFTING_EXAMPLE, EXPORT_EXAMPLE, READER_EXAMPLE, LANES_EXAMPLE, RAIL, REBUTTAL_EXAMPLE, SEARCH_EXAMPLE } from '@/content/examples';

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
  ['lanes', LanesExample, LANES_DURATION],
  ['rebuttal', RebuttalExample, REBUTTAL_DURATION],
  ['drafting', DraftingExample, DRAFTING_DURATION],
  ['reader', ReaderExample, READER_DURATION],
  ['argument', ArgumentExample, ARGUMENT_DURATION],
  ['export', ExportExample, EXPORT_DURATION],
];

describe.each(EXAMPLES)('the %s example', (name, Example, duration) => {
  it('is a titled figure in the application frame, with its caption, in house style', () => {
    act(() => root.render(<Example />));
    const figure = container.querySelector('figure.app-example');
    const title = figure.querySelector(`#${name}-example-title`);
    expect(figure.getAttribute('aria-labelledby')).toBe(`${name}-example-title`);
    expect(title.tagName).toBe('H3');
    if (name === 'search') expect(title.textContent).toBe('The Chronology Lens™');
    else expect(title.textContent).toMatch(/\.$/);
    expect(figure.querySelector('figcaption').textContent).toMatch(/^Illustrative .* fictional construction matter\./);
    // The project bar and the application's own navigation, with this example's view marked when
    // the navigation names it, and the view named in the bar either way.
    expect(figure.querySelector('.app-project').textContent).toBe('Sample project');
    expect([...figure.querySelectorAll('.app-rail > li')].map((li) => li.textContent.replace('™', ''))).toEqual(RAIL);
    const view = figure.querySelector('.app-bar-view').textContent.replace('™', '');
    expect(figure.querySelectorAll('.app-rail [aria-current="page"]')).toHaveLength(RAIL.includes(view) ? 1 : 0);
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

it('answers a question and its follow-up, the last with its sources and a confidence score out of 100', () => {
  act(() => root.render(<AnalysisExample />));
  expect(container.querySelectorAll('.chat-ask')).toHaveLength(ANALYSIS_EXAMPLE.turns.length);
  expect(container.querySelectorAll('.chat-answer')).toHaveLength(ANALYSIS_EXAMPLE.turns.length);
  expect(container.textContent).toContain(`${ANALYSIS_EXAMPLE.confidence}/100`);
  expect(container.querySelectorAll('.chat-evidence > li')).toHaveLength(ANALYSIS_EXAMPLE.evidence.length);
});

it('builds the bundle with the cover page first and the report on top of its evidence', () => {
  act(() => root.render(<BundleExample />));
  const items = [...container.querySelectorAll('.bundle-list > li')].map((li) => li.querySelector('.bundle-item-title').firstChild.textContent);
  expect(items[0]).toBe(BUNDLE_EXAMPLE.cover);
  expect(items[1]).toBe('VeriCase Analysis Report');
  expect(items).toHaveLength(BUNDLE_EXAMPLE.items.length + 1);
  // The PDF as downloaded: cover sheet, index with one row per item, and the report inside it.
  expect(container.querySelectorAll('.bundle-page')).toHaveLength(3);
  expect(container.querySelectorAll('.bundle-index tbody tr')).toHaveLength(BUNDLE_EXAMPLE.items.length);
  expect(container.querySelectorAll('.bundle-page')[2].textContent).toContain(BUNDLE_EXAMPLE.items[0].title);
  expect(container.querySelector('.bundle-report-summary').textContent).toContain(BUNDLE_EXAMPLE.pdfItem.summary);
});

it('shows each lane with its own members and the note that a lane is read only by them', () => {
  act(() => root.render(<LanesExample />));
  expect(container.querySelectorAll('.lane')).toHaveLength(LANES_EXAMPLE.lanes.length);
  expect(container.textContent).toContain(LANES_EXAMPLE.note);
});

it('sets each record beside the other side’s point and offers a reply for review', () => {
  act(() => root.render(<RebuttalExample />));
  expect(container.querySelectorAll('.rebuttal-record')).toHaveLength(REBUTTAL_EXAMPLE.records.length);
  expect(container.querySelector('.rebuttal-reply').textContent).toContain(REBUTTAL_EXAMPLE.review);
});

it('cites a record for every drafted paragraph and leaves the draft for review', () => {
  act(() => root.render(<DraftingExample />));
  expect(container.querySelectorAll('.drafting-source')).toHaveLength(DRAFTING_EXAMPLE.paragraphs.length);
  expect(container.textContent).toContain(DRAFTING_EXAMPLE.status);
});

it('reads the selected document beside its file record, the passage found marked in it', () => {
  act(() => root.render(<ReaderExample />));
  expect(container.querySelector('.reader-record[aria-current="true"]').textContent).toContain(READER_EXAMPLE.records[READER_EXAMPLE.selected].document);
  expect(container.querySelector('.reader-body mark').textContent).toBe(READER_EXAMPLE.email.found);
});

it('cites a record for every point of the argument and sets each record beside it', () => {
  act(() => root.render(<ArgumentExample />));
  expect(container.querySelectorAll('.argument-cite')).toHaveLength(ARGUMENT_EXAMPLE.points.length);
  expect(container.querySelectorAll('.argument-record')).toHaveLength(ARGUMENT_EXAMPLE.records.length);
});

it('exports the report with its source, its quotation and a row for every record', () => {
  act(() => root.render(<ExportExample />));
  expect(container.querySelector('.export-source').textContent).toBe(EXPORT_EXAMPLE.source);
  expect(container.querySelectorAll('.export-table tbody tr')).toHaveLength(EXPORT_EXAMPLE.rows.length);
});


it.each(EXAMPLES.filter(([name]) => ['search', 'analysis', 'bundle', 'rebuttal', 'drafting', 'lanes', 'activity'].includes(name)))('accepts an h4 figure title for the retained %s chapter example', (name, Example) => {
  act(() => root.render(<Example headingAs="h4" contentHeadingAs="h5" />));
  expect(container.querySelector(`h4#${name}-example-title`)).not.toBeNull();
  if (name === 'bundle' || name === 'activity') {
    expect(container.querySelector('.app-window h5.app-h')).not.toBeNull();
    expect(container.querySelector('.app-window h4')).toBeNull();
  }
});

it('can omit the duplicate search introduction and process diagram while keeping the same search records', () => {
  act(() => root.render(<SearchExample showIntro={false} showOverview={false} />));
  expect(container.querySelector('.app-example-intro, .lens-overview')).toBeNull();
  expect(container.querySelectorAll('.search-card')).toHaveLength(SEARCH_EXAMPLE.results.length);
  expect(container.querySelectorAll('mark')).toHaveLength(SEARCH_EXAMPLE.results.length);
  act(() => root.render(<SearchExample />));
  expect(container.querySelector('.app-example-intro').textContent).toBe(SEARCH_EXAMPLE.intro);
  expect(container.querySelector('.lens-overview')).not.toBeNull();
});
