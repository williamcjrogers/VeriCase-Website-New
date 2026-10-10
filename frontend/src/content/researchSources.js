// Construction research, not VeriCase performance claims. Keep the scope with each source.
const HKA_CITATION = 'HKA, CRUX Insight Eighth Annual Report, From Insight to Foresight, November 2025';
const HKA_URL = 'https://www.hka.com/news/crux-insight-eighth-annual-report-from-insight-to-foresight/';
const HKA_SCOPE = 'More than 2,200 distressed construction and engineering projects in 114 countries investigated by HKA consultants. Claimed, not awarded. This investigated sample is not an industry-wide average. Both HKA figures use the same dataset.';

// A dated publisher statement, not a verified joint-study measurement. Keep attribution visible.
export const UNUSED_DATA_SOURCE = {
  number: 4,
  value: '95%+',
  unit: 'of design and construction data reported as unused',
  attribution: 'Autodesk, 24 June 2024, citing FMI (2018)',
  citation: 'Autodesk, Democratizing AECO data, 24 June 2024',
  url: 'https://adsknews.autodesk.com/en/news/democratizing-aeco-data/',
  context: 'Autodesk reported that over 95% of data created in design and construction goes unused, citing FMI’s 2018 white paper.',
  scope: 'A published industry claim, with no sampling or calculation method stated. FMI cites a 2017 Xpera article that concerns data not analysed and gives a different percentage. This is not an established measurement from the joint Autodesk/FMI study, or a measure of unused dispute evidence.',
  relatedSources: [
    { label: 'FMI, Big Data white paper, 2018, p. 2', url: 'https://fmicorp.com/uploads/media/FMI_BigDataReport.pdf#page=2' },
    { label: 'Original Xpera article, 31 October 2017, republished by Vertex', url: 'https://vertexeng.com/insights/digging-for-the-bigdata-gold-in-todays-construction-projects/' },
  ],
};

export const RESEARCH_SOURCES = [
  {
    number: 1,
    value: '50%',
    unit: 'of respondents cited inadequate contract administration as a leading cause of adjudicated disputes',
    citation: 'KCL / Adjudication Society, Construction Adjudication in the United Kingdom: Tracing trends and guiding reform, 2024, p. 28, Figure 16',
    url: 'https://www.kcl.ac.uk/construction-law/assets/kcl-dpsl-construction-adjudication-report-3.0-2024-update-digital-aw1.pdf#page=28',
    context: '50% of respondents cited inadequate contract administration as a leading cause of adjudicated disputes. There were 165 answers to the causes question; multiple selections allowed.',
    scope: 'The survey covered 166 people involved in UK statutory adjudication, including quantity surveyors, solicitors and claims consultants. The reporting period was 01 May 2023 to 30 April 2024. These are respondents’ assessments, not a measured proportion of disputes.',
  },
  {
    number: 2,
    value: '33.4%',
    unit: 'average sums in dispute as a share of contract budgets in HKA’s sample',
    citation: HKA_CITATION,
    url: HKA_URL,
    context: 'Sums in dispute averaged 33.4% of contract budgets in the investigated projects.',
    scope: HKA_SCOPE,
  },
  {
    number: 3,
    value: '65.8%',
    unit: 'average time extensions claimed as a share of planned schedules in HKA’s sample',
    citation: HKA_CITATION,
    url: HKA_URL,
    context: 'Extensions of time sought averaged 65.8% of planned schedules in the investigated projects.',
    scope: HKA_SCOPE,
  },
];

// Former headline figures remain supporting research, without new numbered references.
export const SUPPORTING_RESEARCH = [
  {
    number: 1,
    value: '40,000',
    unit: 'emails, one project, five months',
    citation: 'Mail Manager customer account, 2026',
    url: 'https://www.mailmanager.com/blog/how-aec-firms-manage-email-across-10-50-or-200-concurrent-projects',
    context: '40,000 emails filed in five months on one Mercury Engineering project.',
    scope: 'One project, not an industry average.',
  },
  {
    number: 2,
    value: '5.5',
    unit: 'hours a week looking for project data',
    citation: 'PlanGrid / FMI, Construction Disconnected, 2018, p. 12',
    url: 'https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf',
    context: '5.5 hours a week spent looking for project data, as reported by construction professionals.',
    scope: 'Vendor-sponsored survey of 599 leaders, mostly in the US.',
  },
  {
    number: 3,
    value: '18%',
    unit: 'of project time searching for data in the UK and Ireland',
    citation: 'Procore / Dodge findings, reported in Building Design & Construction Magazine, 2026',
    url: 'https://bdcmagazine.com/2026/07/uk-construction-teams-lose-eight-working-weeks-a-year-searching-for-project-information/',
    context: '18% of project time estimated to be spent searching for data by surveyed UK and Ireland construction professionals.',
    scope: 'Vendor-commissioned survey of 688 professionals. A separate study from the 5.5-hour finding.',
  },
];
