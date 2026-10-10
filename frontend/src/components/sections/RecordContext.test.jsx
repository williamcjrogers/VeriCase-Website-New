import { renderToString } from 'react-dom/server';
import { RecordContext, ResearchFigure, ResearchSources } from './RecordContext';

const expectedFigures = [
  ['50%', 'of respondents cited inadequate contract administration as a leading cause of adjudicated disputes'],
  ['33.4%', 'average sums in dispute as a share of contract budgets in HKA’s sample'],
  ['65.8%', 'average time extensions claimed as a share of planned schedules in HKA’s sample'],
];

it.each(expectedFigures)('keeps %s exact and readable without motion', (value, unit) => {
  const container = document.createElement('div');
  container.innerHTML = renderToString(<ResearchFigure value={value} unit={unit} />);
  expect(container.querySelector('.sr-only').textContent.trim()).toBe(value);
  expect(container.querySelector('.record-context-unit').textContent).toBe(unit);
  const visual = container.querySelector('.stat-digits');
  expect(visual.getAttribute('aria-hidden')).toBe('true');
  const settled = [...visual.children].map((slot) => slot.classList.contains('stat-digit')
    ? slot.querySelector('.stat-reel').lastElementChild.textContent
    : slot.textContent).join('');
  expect(settled).toBe(value);
  expect(container.querySelector('.is-in-view')).toBeNull();
});

it('renders the approved figures and one numbered reference for each, including static return targets', () => {
  const container = document.createElement('div');
  container.innerHTML = renderToString(<><RecordContext /><ResearchSources /></>);
  const band = container.querySelector('.record-context');
  expect(band.querySelector('h2').textContent).toBe('What goes unread can change the case.');
  expect([...band.querySelectorAll('.record-context-number')].map((figure) => [
    figure.querySelector('.sr-only').textContent.trim(),
    figure.querySelector('.record-context-unit').textContent,
  ])).toEqual(expectedFigures);
  expect(band.querySelectorAll('[role="doc-noteref"]')).toHaveLength(4);
  expect(container.querySelectorAll('[role="doc-backlink"]')).toHaveLength(4);
  for (const [index, [value, unit]] of expectedFigures.entries()) {
    const number = index + 1;
    const reference = container.querySelector(`#research-ref-${number}`);
    const source = container.querySelector(`#research-source-${number}`);
    expect(container.querySelectorAll(`#research-ref-${number}`)).toHaveLength(1);
    expect(container.querySelectorAll(`#research-source-${number}`)).toHaveLength(1);
    expect(reference.getAttribute('aria-label')).toBe(`Source ${number} for ${value} ${unit}`);
    expect(reference.getAttribute('href')).toBe(`#research-source-${number}`);
    expect(reference.tabIndex).toBe(0);
    expect(source.tabIndex).toBe(-1);
    expect(source.querySelector('[role="doc-backlink"]').getAttribute('href')).toBe(`#research-ref-${number}`);
  }
});

it('keeps the source denominators, dates and claimed-versus-awarded qualifications beside the primary sources', () => {
  const container = document.createElement('div');
  container.innerHTML = renderToString(<ResearchSources />);
  expect(container.querySelector('.research-sources-note').textContent).toBe('These sources describe construction disputes and project information. They do not measure VeriCase results or savings.');
  const kcl = container.querySelector('#research-source-1');
  expect(kcl.querySelector('a').getAttribute('href')).toBe('https://www.kcl.ac.uk/construction-law/assets/kcl-dpsl-construction-adjudication-report-3.0-2024-update-digital-aw1.pdf#page=28');
  expect(kcl.textContent).toContain('2024');
  expect(kcl.textContent).toContain('p. 28, Figure 16');
  expect(kcl.textContent).toContain('165 answers');
  expect(kcl.textContent).toContain('multiple selections allowed');
  expect(kcl.textContent).toContain('166 people involved in UK statutory adjudication');
  expect(kcl.textContent).toContain('including quantity surveyors, solicitors and claims consultants');
  expect(kcl.textContent).toContain('01 May 2023 to 30 April 2024');
  expect(kcl.textContent).toContain('These are respondents’ assessments, not a measured proportion of disputes.');
  for (const number of [2, 3]) {
    const hka = container.querySelector(`#research-source-${number}`);
    expect(hka.querySelector('a').getAttribute('href')).toBe('https://www.hka.com/news/crux-insight-eighth-annual-report-from-insight-to-foresight/');
    expect(hka.textContent).toContain('CRUX Insight Eighth Annual Report');
    expect(hka.textContent).toContain('November 2025');
    expect(hka.textContent).toContain('More than 2,200 distressed construction and engineering projects in 114 countries');
    expect(hka.textContent).toContain('investigated by HKA consultants');
    expect(hka.textContent).toContain('Claimed, not awarded');
    expect(hka.textContent).toContain('not an industry-wide average');
    expect(hka.textContent).toContain('same dataset');
    expect(hka.querySelector('a').textContent).not.toMatch(/p\./);
  }
  expect(container.querySelector('#research-source-2 p').textContent).toContain('Sums in dispute averaged 33.4% of contract budgets in the investigated projects.');
  expect(container.querySelector('#research-source-3 p').textContent).toContain('Extensions of time sought averaged 65.8% of planned schedules in the investigated projects.');
});

it('keeps the unused-data claim visible with its dated attribution and source-chain limitations', () => {
  const container = document.createElement('div');
  container.innerHTML = renderToString(<><RecordContext /><ResearchSources /></>);
  const callout = container.querySelector('.record-context-unused');
  expect(callout.querySelector('strong').textContent).toBe('95%+');
  expect(callout.querySelector('.record-context-unused-label').textContent).toBe('of design and construction data reported as unused');
  expect(callout.querySelector('.record-context-unused-attribution').textContent).toBe('Autodesk, 24 June 2024, citing FMI (2018)');
  expect(callout.closest('details, [hidden], [aria-hidden="true"]')).toBeNull();
  expect(callout.querySelector('.stat-reel')).toBeNull();
  const reference = callout.querySelector('#research-ref-4');
  expect(reference.getAttribute('href')).toBe('#research-source-4');
  const source = container.querySelector('#research-source-4');
  expect(source.tabIndex).toBe(-1);
  expect(source.querySelector('a').href).toBe('https://adsknews.autodesk.com/en/news/democratizing-aeco-data/');
  expect(source.textContent).toContain('no sampling or calculation method stated');
  expect(source.textContent).toContain('data not analysed and gives a different percentage');
  expect(source.textContent).toContain('not an established measurement from the joint Autodesk/FMI study');
  expect(source.querySelector('a[href="https://fmicorp.com/uploads/media/FMI_BigDataReport.pdf#page=2"]')).not.toBeNull();
  expect(source.querySelector('a[href="https://vertexeng.com/insights/digging-for-the-bigdata-gold-in-todays-construction-projects/"]')).not.toBeNull();
  expect(source.querySelector('[role="doc-backlink"]').getAttribute('href')).toBe('#research-ref-4');
  expect(container.querySelectorAll('#research-ref-4')).toHaveLength(1);
  expect(container.querySelectorAll('#research-source-4')).toHaveLength(1);
});

it('preserves all former headline research and existing wider studies in one disclosure without numbered references', () => {
  const container = document.createElement('div');
  container.innerHTML = renderToString(<ResearchSources />);
  expect(container.querySelectorAll('details')).toHaveLength(1);
  const disclosure = container.querySelector('.record-context-research');
  expect(disclosure.open).toBe(false);
  const articles = [...disclosure.querySelectorAll('article')];
  expect(articles).toHaveLength(6);
  for (const [value, unit, citation, url, context, scope] of [
    ['40,000', 'emails, one project, five months', 'Mail Manager customer account, 2026', 'https://www.mailmanager.com/blog/how-aec-firms-manage-email-across-10-50-or-200-concurrent-projects', '40,000 emails filed in five months on one Mercury Engineering project.', 'One project, not an industry average.'],
    ['5.5', 'hours a week looking for project data', 'PlanGrid / FMI, Construction Disconnected, 2018, p. 12', 'https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf', '5.5 hours a week spent looking for project data, as reported by construction professionals.', 'Vendor-sponsored survey of 599 leaders, mostly in the US.'],
    ['18%', 'of project time searching for data in the UK and Ireland', 'Procore / Dodge findings, reported in Building Design & Construction Magazine, 2026', 'https://bdcmagazine.com/2026/07/uk-construction-teams-lose-eight-working-weeks-a-year-searching-for-project-information/', '18% of project time estimated to be spent searching for data by surveyed UK and Ireland construction professionals.', 'Vendor-commissioned survey of 688 professionals. A separate study from the 5.5-hour finding.'],
  ]) {
    const article = articles.find((item) => item.querySelector('a').getAttribute('href') === url);
    expect(article).toBeDefined();
    expect(article.querySelector('h3').textContent).toBe(`${value} ${unit}`);
    expect(article.querySelector('a').textContent).toBe(citation);
    expect(article.textContent).toContain(context);
    expect(article.querySelector('.record-context-scope').textContent).toBe(scope);
  }
  expect(disclosure.textContent).toContain('1,083,807 requests for information. 1,362 projects.');
  expect(disclosure.textContent).toContain('48% of US rework attributed to poor data and miscommunication.');
  expect(disclosure.textContent).toContain('One in three poor decisions attributed to bad data.');
  expect(disclosure.querySelector('[id^="research-source-"], [id^="research-ref-"], [role="doc-noteref"], [role="doc-backlink"]')).toBeNull();
});
