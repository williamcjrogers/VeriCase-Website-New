import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, StaticRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { Cookies } from './Cookies';
import { NotFound } from './NotFound';
import { ARGUMENT, CASE_ROOM, CHAPTERS, CLAIMS, COLLABORATION, COVER, HOME_NAV, IN_BRIEF, INTEGRITY, LENS_CHAPTER, RESEARCH, SOLUTION_CHAPTERS } from '@/content/home';
import { GATES } from '@/content/gates';
import { TIME_ADVANTAGE } from '@/content/marketing';
import { RESEARCH_SOURCES } from '@/content/researchSources';
import { focusSection } from '@/lib/navigate';
import { plainText } from '@/components/editorial/Rich';

let container;
let root;
let frames;
const legacy = ['lessons', 'chronology-lens', 'research', 'case-room', 'integrity', 'clock', 'claims', 'notes'];
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  frames = [];
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => { frames.push(callback); return frames.length; });
  Element.prototype.scrollIntoView = jest.fn();
  window.history.replaceState(null, '', '/');
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});
const render = async (page = <LandingPage />, path = '/') => act(async () => {
  root.render(<MemoryRouter initialEntries={[path]}>{page}</MemoryRouter>);
});

it('composes the opening, motto, founding reason, time and figures before the full-width solution and audience', async () => {
  await render();
  const main = container.querySelector('main');
  expect([...main.children].map((el) => el.id || el.firstElementChild?.classList[0] || el.classList[0])).toEqual([
    'top', 'hero-motto', 'lessons', 'clock', 'record-context', 'platform',
    'container', 'about', 'questions', 'demonstration', 'research-sources',
  ]);
  const hero = main.querySelector('#top');
  expect(hero.querySelector('.hero-motto, .record-context, #platform, .search-example')).toBeNull();
  expect(main.children[1].classList.contains('container')).toBe(true);
  expect(main.children[4].classList.contains('container')).toBe(true);
  const platform = main.querySelector('#platform');
  expect(platform.parentElement).toBe(main);
  expect(platform.firstElementChild.classList.contains('container')).toBe(true);
  expect(platform.firstElementChild.querySelector('h2#platform-title').textContent).toBe(IN_BRIEF.h2);
  expect([...platform.children].slice(1).map((section) => section.id)).toEqual([
    ...SOLUTION_CHAPTERS.map((chapter) => chapter.id), 'integrity',
  ]);
  expect(main.querySelector('.collaboration-audience-section').previousElementSibling).toBe(platform);
  expect(platform.querySelector('.collaboration-audience')).toBeNull();
  expect(main.querySelector('.record-context').textContent).toContain('of respondents cited inadequate contract administration as a leading cause of adjudicated disputes');
});

it('renders the founding reason as a visible, unnumbered section before hydration and after mount', async () => {
  const serverPage = document.createElement('div');
  serverPage.innerHTML = renderToString(<StaticRouter><LandingPage /></StaticRouter>);
  await render();
  for (const page of [serverPage, container]) {
    const section = page.querySelector('#lessons');
    expect(section).not.toBeNull();
    expect(page.querySelectorAll('#lessons, #lessons-title')).toHaveLength(2);
    expect(section.parentElement.tagName).toBe('MAIN');
    expect(section.previousElementSibling.querySelector('.hero-motto')).not.toBeNull();
    expect(section.nextElementSibling.id).toBe('clock');
    expect(section.closest('details, [hidden], [aria-hidden="true"]')).toBeNull();
    expect(section.querySelector('details, summary, .ch-numeral')).toBeNull();
    expect(section.getAttribute('aria-labelledby')).toBe('lessons-title');
    const heading = section.querySelector('#lessons-title');
    expect(heading.tagName).toBe('H2');
    expect(heading.getAttribute('tabindex')).toBe('-1');
    expect(heading.textContent).toBe('Your case begins with the record.');
    expect(section.querySelector('blockquote').textContent).toContain('meticulously established records');
    expect(section.querySelector('.lessons-close').tagName).toBe('P');
  }
});

it('focuses the founding heading from the motto attribution link', async () => {
  await render();
  await act(async () => container.querySelector('.hero-motto-source a[href="#lessons"]').click());
  expect(document.activeElement.id).toBe('lessons-title');
  expect(window.location.hash).toBe('#lessons');
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
});

it('removes both the full passage and its motto attribution link when G11 is struck', async () => {
  const previous = GATES.G11_attribution.status;
  try {
    GATES.G11_attribution.status = 'confirmed';
    await render();
    expect(container.querySelector('#lessons')).not.toBeNull();
    expect(container.querySelector('.hero-motto-source a[href="#lessons"]')).not.toBeNull();
    GATES.G11_attribution.status = 'struck';
    await render();
    expect(container.querySelector('#lessons, #lessons-title, .hero-motto-source')).toBeNull();
    expect(container.querySelector('a[href="#lessons"]')).toBeNull();
    expect(container.querySelector('.hero-motto .sr-only').textContent).toBe(COVER.motto.whole);
  } finally {
    GATES.G11_attribution.status = previous;
  }
});

it('uses the shared registry for six linked h3 chapters and unnumbered source-review support', async () => {
  await render();
  const links = [...container.querySelectorAll('#platform .capability-index a')];
  expect(links).toHaveLength(6);
  expect(links.map((link) => link.textContent)).toEqual([
    'Bring the records together', 'Ask a question', 'Build the bundle',
    'Test an account', 'Develop the argument', 'Work together',
  ]);
  for (const [index, chapter] of SOLUTION_CHAPTERS.entries()) {
    const section = container.querySelector(`#${chapter.id}`);
    expect(section.parentElement.id).toBe('platform');
    expect(section.querySelector(`h3#${chapter.id}-title`)).not.toBeNull();
    expect(section.querySelector('.ch-numeral').textContent).toBe(chapter.numeral);
    expect(section.querySelector('.ch-note').textContent).toBe(chapter.label);
    expect(CHAPTERS.find((item) => item.id === chapter.id).numeral).toBe(chapter.numeral);
    expect(IN_BRIEF.jobs[index]).toMatchObject({ section: chapter.id, title: chapter.indexTitle });
    expect(links[index].getAttribute('href')).toBe(`#${chapter.id}`);
    await act(async () => links[index].click());
    expect(document.activeElement).toBe(section.querySelector(`#${chapter.id}-title`));
    expect(window.location.hash).toBe(`#${chapter.id}`);
  }
  expect(container.querySelector('#integrity h3#integrity-title')).not.toBeNull();
  expect(container.querySelector('#integrity .ch-numeral')).toBeNull();
  expect(container.querySelector('#chronology-lens .search-example')).not.toBeNull();
});

it('mounts unique real destinations for navigation and all supported legacy fragments', async () => {
  await render();
  for (const id of new Set([...HOME_NAV.map((item) => item.id), ...legacy])) {
    expect(container.querySelectorAll(`[id="${id}"]`)).toHaveLength(1);
    expect(focusSection(id, { smooth: false })).toBe(true);
    const target = document.getElementById(id);
    const heading = document.getElementById(`${id}-title`) || document.getElementById(target.getAttribute('aria-labelledby'));
    expect(heading).not.toBeNull();
    expect(document.activeElement).toBe(heading);
  }
});

it('gives every region landmark a distinct name', async () => {
  await render();
  const name = (el) => (el.getAttribute('aria-label')
    || (el.getAttribute('aria-labelledby') || '').split(/\s+/).map((id) => document.getElementById(id)?.textContent.trim()).join(' ')).trim();
  const regions = [...container.querySelectorAll('section[aria-label], section[aria-labelledby], [role="region"]')].map(name);
  expect(regions.length).toBeGreaterThan(0);
  expect(regions.filter((n, i) => regions.indexOf(n) !== i)).toEqual([]);
});

it('opens the fictional record from the restored Lens citation and closes it again', async () => {
  await render();
  const citation = container.querySelector('button[aria-label="EV-0151: open source, email of 28 March 2025"]');
  expect(citation).not.toBeNull();
  await act(async () => citation.click());
  const source = document.querySelector('[role="dialog"]');
  expect(source).not.toBeNull();
  expect(source.textContent).toContain('Sample matter (fictional).');
  expect(source.textContent).toContain('EV-0151');
  expect(source.textContent).toMatch(/28\sMarch\s2025/);
  expect(source.textContent).not.toContain('Show full hash');
  await act(async () => source.querySelector('button[aria-label="Next citation"]').click());
  expect(source.textContent).toContain('EV-0138');
  expect(source.textContent).toMatch(/12\sMarch\s2025/);
  const close = [...source.querySelectorAll('button')].find((button) => button.textContent.includes('Close source'));
  await act(async () => close.click());
  expect(document.querySelector('[role="dialog"]')).toBeNull();
});

it('mounts every app example once, in place, in page order, each with unique ids and its own title', async () => {
  await render();
  const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
  expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  const figures = [...container.querySelectorAll('figure.evidence-figure')];
  // Each retained illustration introduces a distinct workflow. Source-reading, report-export
  // and citation variations no longer repeat those already shown. The bundle includes the report.
  expect(figures.map((f) => f.getAttribute('aria-labelledby'))).toEqual(
    ['search', 'analysis', 'bundle', 'rebuttal', 'drafting', 'lanes', 'activity'].map((name) => `${name}-example-title`),
  );
  for (const figure of figures) {
    expect(figure.classList.contains('app-example')).toBe(true);
    expect(figure.closest('details, .mobile-details-content, .desktop-context, .mobile-context')).toBeNull();
    expect(figure.querySelector(`h4[id="${figure.getAttribute('aria-labelledby')}"]`)).not.toBeNull();
  }
});

it.each(['research', 'lessons'])('follows an initial %s fragment to its mounted heading', async (id) => {
  window.history.replaceState(null, '', `/#${id}`);
  await render();
  const initialFrames = frames.splice(0);
  act(() => initialFrames.forEach((callback) => callback()));
  expect(document.activeElement.id).toBe(`${id}-title`);
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
});

it.each([['/cookies', Cookies], ['/missing-page', NotFound]])('sends section navigation back home from %s', async (path, Page) => {
  await render(<Page />, path);
  const links = [...container.querySelectorAll('a[href*="#"]')].filter((link) => link.getAttribute('href') !== '#main');
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) expect(link.getAttribute('href')).toMatch(/^\/#.+/);
});

it('expands the ten research, profile and question disclosures for print, then restores their prior states', async () => {
  await render();
  const disclosures = [...container.querySelectorAll('#about details, details.clarity-question, .record-context-research')];
  expect(disclosures).toHaveLength(10);
  const passage = container.querySelector('#lessons');
  expect(passage.closest('details')).toBeNull();
  const research = container.querySelector('.record-context-research');
  expect(disclosures).toContain(research);
  expect(research.open).toBe(false);
  disclosures[1].open = true;
  disclosures[7].open = true;
  const previous = disclosures.map((details) => details.open);
  act(() => window.dispatchEvent(new Event('beforeprint')));
  expect(disclosures.every((details) => details.open)).toBe(true);
  expect(passage.querySelector('blockquote')).not.toBeNull();
  // Some browsers repeat beforeprint while the print preview is open.
  act(() => window.dispatchEvent(new Event('beforeprint')));
  act(() => window.dispatchEvent(new Event('afterprint')));
  expect(disclosures.map((details) => details.open)).toEqual(previous);
  expect(passage.closest('details')).toBeNull();
});

it('removes print handlers on unmount and restores disclosures if printing is interrupted', async () => {
  const add = jest.spyOn(window, 'addEventListener');
  const remove = jest.spyOn(window, 'removeEventListener');
  await render();
  const disclosures = [...container.querySelectorAll('#about details, details.clarity-question, .record-context-research')];
  disclosures[0].open = true;
  const previous = disclosures.map((details) => details.open);
  act(() => window.dispatchEvent(new Event('beforeprint')));
  expect(disclosures.every((details) => details.open)).toBe(true);
  const registered = add.mock.calls.filter(([event]) => ['beforeprint', 'afterprint'].includes(event));
  expect(registered.map(([event]) => event).sort()).toEqual(['afterprint', 'beforeprint']);
  act(() => root.render(null));
  for (const [event, handler] of registered) expect(remove).toHaveBeenCalledWith(event, handler);
  expect(disclosures.map((details) => details.open)).toEqual(previous);
  act(() => window.dispatchEvent(new Event('beforeprint')));
  expect(disclosures.map((details) => details.open)).toEqual(previous);
});


it('links the compact figures to numbered sources at the page end and returns keyboard focus', async () => {
  await render();
  const main = container.querySelector('main');
  expect(main.lastElementChild.id).toBe('research-sources');
  const figures = container.querySelector('.record-context');
  expect(figures.querySelectorAll('a')).toHaveLength(4);
  expect(figures.querySelector('a[href^="https:"]')).toBeNull();
  expect(figures.querySelector('details')).toBeNull();
  for (const number of [1, 2, 3, 4]) {
    const ref = container.querySelector(`#research-ref-${number}`);
    const source = container.querySelector(`#research-source-${number}`);
    expect(ref.getAttribute('href')).toBe(`#research-source-${number}`);
    await act(async () => ref.click());
    expect(document.activeElement).toBe(source);
    expect(source.querySelector('a[href^="https:"]')).not.toBeNull();
    await act(async () => source.querySelector('[role="doc-backlink"]').click());
    expect(document.activeElement).toBe(ref);
    expect(ref.tabIndex).toBe(0);
  }
  expect(container.querySelector('#research-source-1').textContent).toContain('165 answers');
  expect(container.querySelector('#research-source-2').textContent).toContain('Claimed, not awarded');
  expect(container.querySelector('#research-source-3').textContent).toContain('not an industry-wide average');
});


it('renders the exact approved opening and leads, with only the three approved comparison pairs', async () => {
  await render();
  const hero = container.querySelector('#top');
  expect(hero.querySelector('h1').textContent).toBe('When the story changes, the records matter.');
  expect(hero.querySelector('.hero-lead').textContent).toBe('Bring scattered emails and documents into focus with Chronology Lens™. Follow the correspondence, ask questions of the record and prepare a report, claim or response with the evidence beside you.');
  expect(hero.querySelector('.hero-situation')).toBeNull();
  expect(hero.querySelector('.hero-outcome').textContent).toBe('Know what happened. Show why it matters.');
  expect(hero.querySelector('a[href="#chronology-lens"]').textContent).toBe('Explore Chronology Lens');
  expect(hero.querySelector('a[href^="mailto:"]').textContent).toContain('Request a demonstration');
  const copy = [
    ['chronology-lens', 'Many threads. One order of events.', 'Bring emails, attachments and project documents into one searchable record. Read the correspondence in date order, with each entry linked to its source.'],
    ['research', 'Ask a question. Read a cited answer.', 'Ask a focused question in plain English. Executive Analysis answers from the evidence and lets you follow up as new points emerge.'],
    ['worked-example', 'A report. Its evidence. One bundle.', 'Deep Research produces a report with its sources. Select Create bundle to automatically bring the report and cited records together.'],
    ['case-room', 'Their points, numbered. Your replies, cited.', 'Examine the other side’s account point by point. Bring supporting and conflicting records alongside each assertion, with proposed replies for your team to review.'],
    ['claims', 'Develop the argument. Keep the evidence beside it.', 'Structure your claim or response in sections. Draft with the relevant records beside the wording, including material that challenges your position.'],
    ['collaboration', 'Keep the discussion with the evidence.', 'Discuss the email or document where it sits. Bring your team, consultants and advisers into the conversation, with the history kept alongside the record.'],
  ];
  for (const [id, title, lead] of copy) {
    const section = container.querySelector(`#${id}`);
    const heading = section.querySelector(`#${id}-title`);
    expect(heading.textContent).toBe(title);
    expect(section.querySelector('.solution-chapter-header .text-lead').textContent).toBe(lead);
    expect(section.querySelector('.section-issue, .section-method')).toBeNull();
    expect(section.classList.contains('solution-chapter')).toBe(true);
    expect([...section.querySelectorAll('.thread-title')].every((heading) => heading.tagName === 'H4')).toBe(true);
  }
  expect(container.querySelector('#worked-example .text-lead strong').textContent).toBe('Deep Research');
  const comparisons = [...container.querySelectorAll('.solution-comparison')];
  expect(comparisons.map((comparison) => comparison.closest('section').id)).toEqual(['chronology-lens', 'research', 'case-room']);
  expect(comparisons.map((comparison) => [...comparison.querySelectorAll('h4')].map((heading) => heading.textContent))).toEqual(Array(3).fill(['Where the record fails', 'Where VeriCase comes in']));
  expect(comparisons.map((comparison) => [...comparison.querySelectorAll('p')].map((paragraph) => paragraph.textContent))).toEqual([
    ['An instruction sits in an email. The qualification is in its attachment. A later reply changes the picture.', 'Search emails and attachments together. See matching passages in date order, then open the records behind them.'],
    ['A summary reaches you without its sources. Before you can rely on it, the checking starts again.', 'Read the answer alongside its supporting records. Follow the citations and check what the material establishes.'],
    ['Under time pressure, the easiest points to answer can take attention from the assertions that need further investigation.', 'Consider the evidence beside each point. Review the proposed reply, its references and any gaps before developing your response.'],
  ]);
});

it.each([
  ['G5_rebuttalReview', 'case-room', CASE_ROOM.lead, CASE_ROOM.recover],
  ['G5_claims', 'claims', ARGUMENT.lead, undefined],
  ['G5_research', 'research', RESEARCH.lead, RESEARCH.recover],
  ['G5_research', 'worked-example', CLAIMS.lead, undefined],
  ['G5_collab', 'collaboration', COLLABORATION.lead, undefined],
  ['G5_sourceReview', 'integrity', INTEGRITY.method, undefined],
])('removes the migrated %s promise from %s when publication is struck', async (gate, id, lead, recovery) => {
  const previous = GATES[gate].status;
  try {
    GATES[gate].status = 'confirmed';
    await render();
    let section = container.querySelector(`#${id}`);
    expect(section.textContent).toContain(plainText(lead));
    if (recovery) expect(section.textContent).toContain(recovery);
    GATES[gate].status = 'struck';
    await render();
    section = container.querySelector(`#${id}`);
    expect(section.textContent).not.toContain(plainText(lead));
    if (recovery) expect(section.textContent).not.toContain(recovery);
    expect(section.querySelector(`#${id}-title`)).not.toBeNull();
    if (id === 'case-room') expect(section.textContent).toContain(CASE_ROOM.fail);
    // The gate also keeps its existing governed steps out of the supporting text.
    const deck = { research: RESEARCH, collaboration: COLLABORATION }[id];
    for (const step of deck?.steps.filter((item) => item.gate === gate) || []) {
      expect(section.textContent).not.toContain(step.text);
    }
  } finally {
    GATES[gate].status = previous;
  }
});

it('keeps supporting ingestion, tags and mentions while omitting the duplicate app panels and search preamble', async () => {
  await render();
  const search = container.querySelector('.search-example');
  expect(search.closest('section').id).toBe('chronology-lens');
  expect(search.querySelector('.app-example-intro, .lens-overview')).toBeNull();
  expect(container.querySelector('.upload-example, .item-example, .report-example, .export-example')).toBeNull();
  expect(container.querySelector('#chronology-lens').textContent).toContain(LENS_CHAPTER.steps[0].text);
  expect(container.querySelector('#collaboration').textContent).toContain(COLLABORATION.steps[0].text);
  expect(container.querySelector('#collaboration').textContent).toContain(COLLABORATION.steps[2].text);
  expect(container.querySelector('#worked-example .bundle-report-summary')).not.toBeNull();
  expect(container.querySelector('#worked-example .bundle-head h5.app-h')).not.toBeNull();
  expect(container.querySelector('#integrity .app-window h5.app-h')).not.toBeNull();
});

it('preserves the motto, four Time paragraphs, research figures, cost qualifications and audience copy', async () => {
  await render();
  expect(container.querySelector('.hero-motto .sr-only').textContent).toBe(COVER.motto.whole);
  expect(container.querySelector('.hero-motto-source').textContent).toContain('Adapted from Max W. Abrahamson.');
  expect([...container.querySelectorAll('.time-advantage-copy > p')].map((paragraph) => paragraph.textContent)).toEqual(TIME_ADVANTAGE.paragraphs);
  expect(TIME_ADVANTAGE.paragraphs).toHaveLength(4);
  expect([...container.querySelectorAll('.record-context-number > .sr-only')].map((value) => value.textContent.trim())).toEqual(['50%', '33.4%', '65.8%']);
  for (const source of RESEARCH_SOURCES) {
    expect(container.querySelector(`#research-source-${source.number} > a`).getAttribute('href')).toBe(source.url);
  }
  const cost = container.querySelector('#collaboration .discussion-cost-example');
  expect(cost.querySelector('h4').textContent).toBe(COLLABORATION.costExample.title);
  expect([...cost.querySelectorAll('dd')].map((value) => value.textContent)).toEqual(['6', '40 min', '£153']);
  expect(cost.textContent).toContain('Illustrative professional-time cost, not a measured saving.');
  expect(cost.querySelector('a[href="/notes#note-3"]')).not.toBeNull();
  expect(cost.querySelector('a[href="/discussion-cost"]')).not.toBeNull();
  expect(container.querySelector('#collaboration .section-figures')).toBeNull();
  const cards = [...container.querySelectorAll('.collaboration-audience-group')];
  expect(cards).toHaveLength(IN_BRIEF.audience.groups.length);
  cards.forEach((card, index) => {
    expect(card.querySelector('h3').textContent).toBe(IN_BRIEF.audience.groups[index].title);
    expect(card.querySelector('p').textContent).toBe(IN_BRIEF.audience.groups[index].text);
    expect(card.querySelector('.collaboration-audience-icon svg')).not.toBeNull();
  });
  expect(container.querySelector('#notes').textContent).toContain(INTEGRITY.declaration.text);
});

it('isolates the empty case-room texture layer from the unchanged application example', async () => {
  await render();
  const wrapper = container.querySelector('#case-room .case-room-editorial-copy');
  const texture = wrapper.querySelector('.case-room-texture');
  expect(wrapper.classList.contains('relative')).toBe(true);
  expect(texture.getAttribute('aria-hidden')).toBe('true');
  expect(texture.childNodes).toHaveLength(0);
  expect(texture.textContent).toBe('');
  expect(wrapper.querySelector('.solution-chapter-header')).not.toBeNull();
  expect(wrapper.querySelector('.app-example')).toBeNull();
  expect(wrapper.nextElementSibling.classList.contains('rebuttal-example')).toBe(true);
});
