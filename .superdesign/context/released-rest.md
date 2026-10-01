# Remaining released homepage source, continuation of released-main.md

## frontend/src/components/sections/SharedWorkspace.jsx
```jsx
import { CLAIMS, IN_BRIEF } from '@/content/home';
import { ArgumentIllustration } from './EvidenceIllustrations';

export const SharedWorkspace = () => (
  <section id="worked-example" aria-labelledby="worked-example-title" className="clarity-section shared-workspace bg-parchment">
    <div className="container">
      <div className="workspace-intro">
        <h2 id="worked-example-title" tabIndex={-1} className="clarity-heading">{CLAIMS.h2}</h2>
        <div>
          <p className="text-body max-w-measure">{CLAIMS.lead}</p>
          <p className="mt-4 text-body max-w-measure">{CLAIMS.recover}</p>
        </div>
      </div>
      <ArgumentIllustration />
      <div className="workspace-detail">
        <div>
          <h3 className="text-[1.625rem] leading-tight">One workspace for the whole team.</h3>
          <p className="mt-4 max-w-measure text-body">{CLAIMS.fail}</p>
          <p className="mt-4 max-w-measure text-body">{CLAIMS.items.find((item) => item.title === 'Discussion on the document').text}</p>
          <p className="mt-4 max-w-measure text-body">{CLAIMS.items.find((item) => item.title === 'Heads of Claim').text}</p>
        </div>
        <div>
          <h3 className="text-[1.625rem] leading-tight">{IN_BRIEF.audience.label}</h3>
          <p className="mt-4 max-w-measure text-body">{IN_BRIEF.audience.text}</p>
        </div>
      </div>
    </div>
  </section>
);

```

## frontend/src/components/sections/Founder.jsx
```jsx
import { FOUNDER } from '@/content/home';
import { Gated } from '@/components/editorial/Gated';

export const Founder = () => (
  <section id="about" aria-labelledby="about-title" className="clarity-section bg-parchment">
    <div className="container team-container">
      <h2 id="about-title" tabIndex={-1} className="clarity-heading">{FOUNDER.h2}</h2>
      <p className="mt-5 max-w-measure text-body">{FOUNDER.body1}</p>
      <div className="clarity-team mt-8">
        {FOUNDER.people.map((person) => (
          <article key={person.name}>
            <h3 className="text-[1.625rem] leading-tight">{person.name}</h3>
            <p className="mt-2 text-small font-medium text-azure-700">{person.role}</p>
            {person.bio.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-measure text-body">{paragraph}</p>
            ))}
            <details className="mt-4 clarity-bio">
              <summary>{person.cases ? 'Credentials and reported matters' : 'Credentials and track record'}</summary>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-small" aria-label={`Credentials for ${person.name}`}>
                {person.credentials.map((credential) => <li key={credential}>{credential}</li>)}
              </ul>
              {person.cases && <ul className="mt-4 space-y-2 text-small" aria-label="Reported cases">
                {person.cases.map((item) => <li key={item.cite}>{item.name} {item.cite}</li>)}
              </ul>}
            </details>
          </article>
        ))}
      </div>
      <Gated id={FOUNDER.body2Gate} block className="mt-7 max-w-measure text-small text-graphite">{FOUNDER.body2}</Gated>
    </div>
  </section>
);

```

## frontend/src/components/sections/Demonstration.jsx
```jsx
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { Gated } from '@/components/editorial/Gated';
import { DEMONSTRATION } from '@/content/home';

export const Demonstration = () => (
  <section id="demonstration" aria-labelledby="demonstration-title" className="clarity-section on-ink bg-[#0B2516]">
    <div className="container clarity-narrow">
      <h2 id="demonstration-title" tabIndex={-1} className="clarity-heading">{DEMONSTRATION.h2}</h2>
      <p className="mt-5 max-w-measure text-lead">{DEMONSTRATION.body}</p>
      <Gated id={DEMONSTRATION.ownMaterialGate} block className="mt-4">
        <p className="max-w-measure text-body">{DEMONSTRATION.ownMaterial}</p>
      </Gated>
      <DemoCTA placement="demonstration" section="demonstration" onInk withCopy microcopy={DEMONSTRATION.microcopy} className="mt-7" />
    </div>
  </section>
);

```

## frontend/src/components/sections/SiteFooter.jsx
```jsx
import { trackDemonstration } from '@/lib/analytics';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Logo } from '@/components/brand/Logo';
import { Rich } from '@/components/editorial/Rich';
import { HOME_NAV, FOOTER } from '@/content/home';
import { COMPANY, CONTACT_EMAIL, DEMO_MAILTO, SIGN_IN_URL, SITE } from '@/lib/site';
import { onSectionClick, sectionHref } from '@/lib/navigate';
import { cn } from '@/lib/utils';

// The prerendered page carries this year; the client moves it on if a new year has begun.
const BUILD_YEAR = 2026;

const linkClass = 'text-azure-300 underline-offset-4 hover:underline focus-visible:underline';

// A column heading on wide screens; below 768 px a 48 px disclosure button. The links stay in
// the document either way, so they work without JavaScript and are always indexed.
const Column = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-mist/20 md:border-0">
      <h2 className="font-sans text-small font-medium hidden md:block">{title}</h2>
      <CollapsibleTrigger className="flex h-12 w-full items-center justify-between text-left md:hidden">
        <span className="text-small font-medium">{title}</span>
        <ChevronDown className={cn('h-5 w-5 text-mist transition-transform duration-200', open && 'rotate-180')} strokeWidth={1.5} aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent forceMount className="max-md:data-[state=closed]:hidden">
        <ul className="space-y-1 pb-4 md:mt-4 md:space-y-2 md:pb-0">{children}</ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

const Item = ({ children }) => <li className="text-small leading-relaxed">{children}</li>;

export const SiteFooter = () => {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const openCookies = () => window.dispatchEvent(new Event('vc-open-cookie-settings'));

  const contents = HOME_NAV;
  const about = HOME_NAV.find((m) => m.id === 'about');

  return (
    <footer className="on-ink bg-[#052314] text-parchment border-t border-[#1A3828]">
      <div className="container py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-12 lg:col-span-5">
            <a href={onHome ? '#top' : '/'} onClick={onHome ? onSectionClick('top') : undefined} aria-label="VeriCase home" className="inline-flex h-11 items-center">
              <Logo tone="reversed" decorative className="h-10 w-auto" />
            </a>
            <p className="mt-5 max-w-[30rem] text-small text-mist">{FOOTER.descriptor}</p>
          </div>

          <div className="grid md:col-span-12 md:grid-cols-3 md:gap-6 lg:col-span-7">
            <Column title={FOOTER.heads.contents}>
              {contents.map((c) => (
                <Item key={c.id}>
                  <a href={sectionHref(c.id, onHome)} onClick={onHome ? onSectionClick(c.id) : undefined} className={`${linkClass} inline-flex min-h-11 items-center`}>
                    <span>{c.title}</span>
                  </a>
                </Item>
              ))}
            </Column>
            <Column title={FOOTER.heads.company}>
              <Item>
                <a href={sectionHref(about.id, onHome)} onClick={onHome ? onSectionClick(about.id) : undefined} className={linkClass}>
                  {FOOTER.company.about}
                </a>
              </Item>
              <Item>
                <a href={DEMO_MAILTO} onClick={() => trackDemonstration('footer', 'top')} className={linkClass}>
                  {FOOTER.company.demo}
                </a>
              </Item>
              <Item>
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                  {CONTACT_EMAIL}
                </a>
              </Item>
              <Item>
                <a href={SIGN_IN_URL} className={linkClass}>
                  {FOOTER.company.signIn}
                </a>
              </Item>
            </Column>
            <Column title={FOOTER.heads.cookies}>
              <Item>
                <button type="button" onClick={openCookies} className={cn(linkClass, 'text-left')}>
                  {FOOTER.cookies.settings}
                </button>
              </Item>
              {SITE.legalPages.cookies && (
                <Item>
                  <a href="/cookies" className={linkClass}>
                    {FOOTER.cookies.notice}
                  </a>
                </Item>
              )}
              {SITE.legalPages.privacy && (
                <Item>
                  <a href="/privacy" className={linkClass}>
                    Privacy notice
                  </a>
                </Item>
              )}
            </Column>
          </div>
        </div>

        <div className="mt-14 border-t border-mist/25 pt-6 text-meta text-mist">
          {FOOTER.legal.map((line) => (
            <p key={line} className="mt-2 max-w-[62rem] first:mt-0">
              <Rich text={line} onInk />
            </p>
          ))}
          <p className="mt-2">
            © {year} {COMPANY.name}.
          </p>
        </div>
      </div>
    </footer>
  );
};

```

## frontend/src/content/gates.js
```jsx
// Publication gates. Each item is 'open', 'confirmed' or 'struck'.
//   open      shown on previews with an "Owner to confirm" marker; a production build fails.
//   confirmed shown normally.
//   struck    removed from the page. `tokens` lists the owner placeholders the struck item holds,
//             which a production build then allows, because they are never rendered.
// scripts/lint-copy.mjs reads this file and fails when VERCEL_ENV=production while any item is open.
//
// First publication, 27 September 2026 (the owner's instruction): the benchmarks (G4), the United
// Infrastructure account (G6) and the data-policy answer (G8) are held back until the owner
// supplies them; no generated imagery is used (G10); the masthead stays unattributed (G11). To
// restore an item, supply its text in place of each token and set the gate to 'confirmed'.
// The gate numbers follow the design specification (docs/design/the-working-record.md, section 8).

export const GATES = {
  G1_jct: { status: 'confirmed', gate: 'G1', label: 'JCT review of every contractual statement in the sample matter' },
  G2_legal: { status: 'confirmed', gate: 'G2', label: 'Practitioner approval of Schedule 1 and notes 2 to 5' },
  G3_stats: { status: 'struck', gate: 'G3', label: 'Context statistics band, removed from the page 30 September 2026; the numbered notes renumbered over the gap' },
  G4_benchmarks: { status: 'struck', gate: 'G4', label: 'Benchmark notes 9 and 10 (otherwise both figures are struck)', tokens: ['BENCHMARK_NOTE_THROUGHPUT', 'BENCHMARK_NOTE_DATES'] },
  G5_guard: { status: 'confirmed', gate: 'G5', label: 'Research: the broad-question guard (Question C)' },
  G5_badge: { status: 'confirmed', gate: 'G5', label: 'Research: what the validation badge checks' },
  G5_hash: { status: 'confirmed', gate: 'G5', label: 'Manifest: what the hash covers, and whether it is SHA-256' },
  G5_rebuttalCite: { status: 'confirmed', gate: 'G5', label: 'Rebuttal Mode enforces citations on edited replies' },
  G5_autoReply: { status: 'confirmed', gate: 'G5', label: 'Automatic replies are set aside as noise' },
  G5_showNoise: { status: 'confirmed', gate: 'G5', label: 'Show Noise in File Manager reveals attachments such as signature images' },
  G5_quoted: { status: 'confirmed', gate: 'G5', label: 'Quoted history is detected and folded' },
  G5_nearDup: { status: 'confirmed', gate: 'G5', label: 'Near-duplicates, not only exact duplicates, leave the review set' },
  G5_ownMaterial: { status: 'confirmed', gate: 'G5', label: 'Demonstrations on a prospect’s own material' },
  G5_equity: { status: 'confirmed', gate: 'G5', label: 'The practitioner equity sentence' },
  G5_claims: { status: 'confirmed', gate: 'G5', label: 'Claims builder: evidence finder, and Word and PDF export' },
  G5_roles: { status: 'confirmed', gate: 'G5', label: 'Access roles and restricted fields as listed' },
  G6_ui: { status: 'struck', gate: 'G6', label: 'United Infrastructure account, substantiation and consent', tokens: ['UI_CASE', 'UI_CASE_NOTE'] },
  G7_office: { status: 'confirmed', gate: 'G7', label: 'Registered office' },
  G8_data: { status: 'struck', gate: 'G8', label: 'Data policy answer (hosting, sub-processors, retention, model training)', tokens: ['DATA_POLICY'] },
  G8_host: { status: 'confirmed', gate: 'G8', label: 'PostHog host (EU or US) and the cookie notice to match' },
  G9_names: { status: 'confirmed', gate: 'G9', label: 'Fictional names checked and resemblance to real matters ruled out' },
  G10_images: { status: 'struck', gate: 'G10', label: 'Every Higgsfield image approved' },
  G11_attribution: { status: 'struck', gate: 'G11', label: 'Abrahamson attribution verified (until then the masthead stays unattributed)' },
  G12_typeface: { status: 'confirmed', gate: 'G12', label: 'Typeface accepted (Newsreader, or Playfair for headings)' },
};

export const gateStatus = (id) => {
  const g = GATES[id];
  if (!g) throw new Error(`Unknown gate: ${id}`);
  return g.status;
};
export const isStruck = (id) => gateStatus(id) === 'struck';
export const isOpen = (id) => gateStatus(id) === 'open';

// Vercel exposes REACT_APP_VERCEL_ENV to Create React App builds. Anything other than
// production (a preview, or a local build) shows open gates marked in place.
export const IS_PREVIEW = process.env.REACT_APP_VERCEL_ENV !== 'production';

```

## frontend/src/lib/site.js
```jsx
// Shared destinations for calls to action and sign-in, and the company's trading details.
export const CONTACT_EMAIL = 'enquiries@veri-case.com';

const SUBJECT = 'VeriCase demonstration request';
const BODY = [
  'Name:',
  'Organisation:',
  'Role:',
  'What would you like to see?',
  '',
  'Please do not include confidential details of a live matter.',
].join('\r\n');

export const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

const envUrl = process.env.REACT_APP_APP_URL;
const base = envUrl && envUrl.startsWith('https://') ? envUrl : 'https://app.veri-case.com/ui/';
export const APP_URL = base.endsWith('/') ? base : `${base}/`;
// The production build must resolve to https://app.veri-case.com/ui/login.html (checked by lint-copy).
export const SIGN_IN_URL = `${APP_URL}login.html`;

// As registered at Companies House (VERICASE LTD, company 16562435; checked 25 September 2026).
export const COMPANY = {
  name: 'VeriCase Ltd',
  number: '16562435',
  registeredOffice: '85 Great Portland Street, London, England, W1W 7LT',
};

export const SITE = {
  url: 'https://veri-case.com/',
  legalPages: { privacy: false, cookies: true },
};

```

```js
export const CLAIMS = {
  numeral: 'V',
  eyebrow: 'Chapter V · Claims builder and collaboration',
  h2: 'Draft the claim with the evidence already cited.',
  lead:
    'Organise the claim into sections, draft the narrative and link each point to its supporting evidence. The project team, solicitors, counsel and experts work on the same evidence, and discuss it where it sits.',
  fail: 'The narrative is drafted in one place, the evidence is kept in another, and the argument about the evidence happens in a reply-all thread.',
  recover: 'Each citation opens its message, and each discussion is anchored to the document it concerns.',
  items: [
    { title: 'Heads of Claim', text: 'Organise the claim by head and sub-head, with evidence linked to the head it supports.' },
    { title: 'Citations by message ID', text: 'Each citation points to one message, not to a file name that may change.' },
    { title: 'Evidence finder', text: 'For the section you are drafting, VeriCase proposes material from the record. It proposes; the drafter decides what is cited.', gate: 'G5_claims' },
    { title: 'Word and PDF', text: 'Export the narrative to Word or PDF with its citations intact.', gate: 'G5_claims' },
    { title: 'Discussion on the document', text: '@mention a colleague on a document and the discussion opens on that document, so the reasoning stays beside the evidence.' },
  ],
  fig: {
    caption: 'Fig. 5. The claims builder, illustrated with the sample matter. See note A.',
    summary:
      'Illustration: the Heads of Claim for the sample matter, and the narrative for section 1.2 with each paragraph cited by exhibit reference.',
  },
  discussionFig: {
    caption: 'Fig. 6. A discussion anchored to a document, illustrated with the sample matter. Participants are shown by role, not as people. See note A.',
    summary: 'Illustration: a discussion among the legal team, anchored to the Site Manager’s email of 13 March 2025.',
  },
};

```

```js
export const FOUNDER = {
  eyebrow: 'Who is behind it',
  h2: 'The people behind VeriCase.',
  body1:
    'Our team brings together construction claims, legal, commercial and software development experience.',
  people: [
    {
      name: 'William Rogers MCIArb',
      summary: 'Construction claims and disputes specialist with over 15 years’ experience. Qualified in quantity surveying and commercial management, and a Member of the Chartered Institute of Arbitrators.',
      role: 'Co-founder, claims and forensic quantum; testifying expert',
      firm: 'Founder, Quantum Commercial Solutions (2016)',
      bio:
        'William is a construction claims and disputes specialist with over 15 years’ experience across the water, power, rail, highways, infrastructure and residential sectors. He is qualified in quantity surveying and commercial management and is a Member of the Chartered Institute of Arbitrators.\n\nHe founded Quantum Commercial Solutions in 2016 and has since built Meritus Group, Orrery Group, Peak Developments and VeriCase, a legal technology platform for forensic evidence review.\n\nHis work spans adjudication, arbitration and litigation in the Technology and Construction Court (TCC), under NEC, JCT, FIDIC and IChemE forms. His live instructions are in excess of £100 million across residential, regeneration and infrastructure schemes, with prior roles on international arbitrations exceeding US$600 million.\n\nHe acts as a testifying quantum expert and leads claims and recovery across a national contractor’s distressed portfolio. He prepares each case in house so that experts and counsel are instructed only when it is ready.',
      credentials: [
        'Member of the Chartered Institute of Arbitrators (MCIArb)',
        'RICS Level 5 Diploma, Adjudication in the Construction Industry',
        'BSc (Hons) Quantity Surveying and Commercial Management',
        'Testifying quantum expert',
        'NEC, JCT, FIDIC and IChemE dispute specialist',
        'Founder, Quantum Commercial Solutions (2016)',
        'Founder, Meritus Group',
        'Founder, Orrery Group',
        'Founder, Peak Developments',
      ],
    },
    {
      name: 'Warren Kemp',
      summary: 'Construction disputes solicitor and partner at gunnercooke LLP, with experience advising contractors, developers and professional consultants.',
      role: 'Co-founder, dispute resolution',
      firm: 'Partner, gunnercooke LLP · GC, United Living Group',
      email: 'warren.kemp@gunnercooke.com',
      tel: '+44 (0) 7470 332 945',
      bio:
        'Warren advises in relation to construction disputes and is known to be highly skilled and knowledgeable in this field. Clients include developers, contractors and professional consultants in both the public and private sector. He achieves outstanding results through his pragmatic yet tenacious approach. Warren jointly led the construction and engineering team at international law firm DAC Beachcroft until joining gunnercooke LLP in February 2024. Qualified as a solicitor for over 20 years, he provides clients with an operational edge via sharp problem solving to deliver commercial advantage and avoid disputes. Warren is currently working, among his various roles, as General Counsel for United Living (a business approaching £1bn turnover with a telecoms division) and previously worked in-house on secondment for 18 months at global construction consultancy WS Atkins.',
      credentials: [
        'Dispute Resolution Partner, gunnercooke LLP',
        'Former Joint Head of Construction & Engineering, DAC Beachcroft',
        'General Counsel, United Living Group',
        'Solicitor of over 20 years qualification',
        'Former In-House Counsel (Secondment), WS Atkins (18 months)',
      ],
      cases: [
        { name: 'Van Elle Limited v Keynvor Morlift Limited', cite: '[2023] EWHC 3137 (TCC)' },
        { name: 'Celtic Bioenergy Limited v Knowles Limited', cite: '[2017] EWHC 472 (TCC)' },
        { name: 'Middle Level Commissioners v Atkins Limited', cite: '[2012] EWHC 2884 (TCC)' },
      ],
    },
    {
      name: 'Malcolm Brechin',
      role: 'Managing Director',
      summary: 'Commercial strategy and business development, with more than 25 years’ experience building and growing businesses.',
      bio:
        'Malcolm brings a background in commercial strategy, business development and bringing technology products to market. His career includes a role as Strategic Development Director at Mobile Rocket, where he worked with recruitment and healthcare software.\n\nAlongside his role at VeriCase, Malcolm is Chief Executive Officer of Invent Group. His work focuses on understanding clients’ operational needs and shaping practical technology products around them.',
      credentials: [
        'More than 25 years in commercial strategy and business development',
        'Chief Executive Officer, Invent Group',
        'Former Strategic Development Director, Mobile Rocket',
      ],
    },
    {
      name: 'Sam Whisker',
      role: 'Chief Technology Officer',
      summary: 'Software developer and AI implementation specialist, with a background in web applications, process automation and product engineering.',
      bio:
        'Sam is a Teesside University graduate with a background in web development and applied AI. His earlier work at Koodoo Creative included developing an online learning platform with a university lecturer.\n\nAlongside his role at VeriCase, Sam is Chief Technology Officer of Invent Group. Through his AI consultancy, he helps businesses implement process automation and custom software, and provides practical AI workshops.',
      credentials: [
        'Teesside University graduate',
        'Chief Technology Officer, Invent Group',
        'AI implementation consultant',
        'Web development experience at Koodoo Creative',
      ],
    },
  ],
  body2: 'Practitioners from law firms and claims consultancies hold equity in VeriCase Ltd. Their involvement is not an endorsement by the firms they work for.',
  body2Gate: 'G5_equity',
  credentials: [
    'William Rogers MCIArb · Co-Founder, VeriCase Ltd',
    'Warren Kemp · Co-Founder, VeriCase Ltd | Partner, gunnercooke LLP',
    'Chartered Institute of Arbitrators (MCIArb)',
    'Solicitor of the Senior Courts (20+ years)',
  ],
  declaration: {
    label: 'Declaration of interest',
    text: 'United Infrastructure is an associated company of VeriCase’s founder, William Rogers. Warren Kemp serves as General Counsel for United Living. We state these connections before the account, so that you can give the account the weight you think it deserves.',
  },
  h3: 'A record of use: United Infrastructure',
  account: '{{UI_CASE}}[[note:8]]',
  accountGate: 'G6_ui',
  closing:
    'Each adjudication turns on its own facts, its own law and its own adjudicator. This account describes one use of VeriCase. It is not a prediction or a promise of the result in any other matter.',
  plate: {
    caption: 'Plate {n}. A site office desk. Illustrative image (AI-generated). See note B.',
    alt: 'Illustrative image: a site diary and printed correspondence on a desk.',
    drawn: {
      caption: 'Plate {n}. The Change to bracket type B, valued and checked. An illustrative drawing of the fictional sample matter. See note B.',
      alt: 'Illustrative drawing: a valuation of the Change to bracket type B, Levels 3 to 6, in the fictional sample matter, ruled by hand as a schedule. Five items are priced by quantity, unit and rate: stainless brackets type B, the omission of aluminium brackets type A shown in brackets, thermal isolator pads, anchors, and extra labour to fix, for a total of £15,120. Each amount carries a checking tick and the total is ringed.',
    },
  },
};

```

```js
export const DEMONSTRATION = {
  eyebrow: 'Next step',
  h2: 'See it on a matter like yours.',
  body: 'We will take you through the Chronology Lens™, Research, the claims builder and Rebuttal Mode on sample correspondence, and answer your questions on integrity and access.',
  ownMaterial: 'If you would like to see VeriCase on your own material, we will first agree confidentiality terms with you.',
  ownMaterialGate: 'G5_ownMaterial',
  copy: 'Copy email address',
  copied: 'Email address copied.',
  microcopy: 'Request a demonstration opens an email to enquiries@veri-case.com with the subject line completed. Please do not include confidential details of a live matter.',
  plain: 'Or write to enquiries@veri-case.com.',
};

```

```js
export const FOOTER = {
  descriptor: 'Software to organise project records, find supporting evidence and prepare construction claims and responses.',
  heads: { contents: 'Contents', company: 'Company', cookies: 'Cookies' },
  company: { about: 'Who is behind it', demo: 'Request a demonstration', signIn: 'Sign in' },
  cookies: { settings: 'Cookie settings', notice: 'Cookie notice' },
  legal: [
    'VeriCase Ltd is registered in England and Wales (company number 16562435). Registered office: 85 Great Portland Street, London, England, W1W 7LT.',
    'The Chronology Lens™ is a trade mark of VeriCase Ltd. VeriCase is software and does not give legal advice. Illustrations on this site use a fictional matter.',
  ],
};

```

```js
export const BRAND_LINE = 'Making time your ally, not your enemy.';
```

```js
export const HOME_NAV = [
  { id: 'platform', title: 'How it works', nav: 'How it works' },
  { id: 'worked-example', title: 'Worked example', nav: 'Worked example' },
  { id: 'about', title: 'About', nav: 'About' },
  { id: 'questions', title: 'Questions', nav: 'Questions' },
];

```

```js
export const CHAPTERS = [
  { id: 'top', numeral: '', title: 'Records, records, records.', sheetLabel: 'Cover', nav: null },
  { id: 'clock', numeral: 'I', title: 'The clock', nav: 'The clock' },
  { id: 'chronology-lens', numeral: 'II', title: 'The Chronology Lens™', nav: 'Chronology Lens' },
  { id: 'case-room', numeral: 'III', title: 'The case room', nav: 'Rebuttal' },
  { id: 'research', numeral: 'IV', title: 'Ask, cite, bundle', nav: 'Ask, cite, bundle' },
  { id: 'claims', numeral: 'V', title: 'Build the claim', nav: 'Build the claim' },
  { id: 'integrity', numeral: 'VI', title: 'The record holds', nav: 'Integrity' },
];
```

```js
export const END_MATTER = [
  { id: 'platform', title: 'In brief' },
  { id: 'about', title: 'Who is behind it', nav: 'About' },
  { id: 'demonstration', title: 'Request a demonstration' },
  { id: 'notes', title: 'Notes' },
];

```
