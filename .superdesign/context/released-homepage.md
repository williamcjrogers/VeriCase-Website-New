# Released homepage: cf029e2

Target for reproduction: the full released homepage. Render header, hero, time, InBrief, SharedWorkspace, Founder, Questions, Demonstration, SiteFooter in that order. Local uncommitted component changes are excluded.

## frontend/src/components/sections/Hero.jsx
```jsx
import { COVER, CTA_MICROCOPY } from '@/content/home';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { ChronologyIllustration } from './EvidenceIllustrations';
import { onSectionClick } from '@/lib/navigate';

export const Hero = () => (
    <section id="top" aria-labelledby="top-title" className="clarity-hero bg-parchment">
      <div className="container clarity-hero-grid">
        <div>
          <h1 id="top-title" tabIndex={-1} className="clarity-title">{COVER.h1}</h1>
          <p className="clarity-lead mt-6">{COVER.subhead}</p>
          <p className="mt-4 max-w-measure text-body text-graphite">{COVER.audience}</p>
          <DemoCTA placement="hero" section="top" className="mt-7" microcopy={CTA_MICROCOPY} />
          <a href="#platform" onClick={onSectionClick('platform')} className="clarity-link mt-3">See how it works</a>
        </div>
        <ChronologyIllustration />
      </div>
    </section>
);

```

## frontend/src/components/sections/TimeAdvantage.jsx
```jsx
import { TIME_ADVANTAGE } from '@/content/marketing';

export const TimeAdvantage = () => (
  <section id="clock" aria-labelledby="clock-title" className="clarity-section time-advantage on-ink">
    <div className="container time-advantage-grid">
      <h2 id="clock-title" tabIndex={-1} className="clarity-heading">{TIME_ADVANTAGE.title}</h2>
      <div className="time-advantage-copy">
        {TIME_ADVANTAGE.paragraphs.map((paragraph) => <p key={paragraph} className="text-body">{paragraph}</p>)}
      </div>
    </div>
  </section>
);

```

## frontend/src/components/sections/InBrief.jsx
```jsx
import { IN_BRIEF } from '@/content/home';
import { isShown } from '@/components/editorial/Gated';
import { Rich } from '@/components/editorial/Rich';

const GROUPS = [
  { id: 'chronology-lens', entries: [0, 1] },
  { id: 'research', entries: [3, 2] },
  { id: 'claims', entries: [4, 5] },
];

export const InBrief = () => (
  <section id="platform" aria-labelledby="platform-title" className="clarity-section bg-paper">
    <div className="container">
      <h2 id="platform-title" tabIndex={-1} className="clarity-heading">Three jobs, one place.</h2>
      <div className="clarity-jobs mt-8">
        {IN_BRIEF.jobs.map((job, index) => (
          <article key={job.title} id={GROUPS[index].id} className="capability-group">
            <h3 id={`${GROUPS[index].id}-title`} tabIndex={-1} className="text-[1.625rem] leading-tight">{job.title}</h3>
            <p className="mt-3 max-w-measure text-body">{job.text}</p>
            {GROUPS[index].entries.map((entryIndex) => {
              const entry = IN_BRIEF.ledger[entryIndex];
              const anchor = entryIndex === 2 ? 'case-room' : entryIndex === 5 ? 'integrity' : undefined;
              return (
                <div key={entry.title} id={anchor} className="capability-detail">
                  <h4 id={anchor ? `${anchor}-title` : undefined} tabIndex={anchor ? -1 : undefined} className="text-body font-medium">{entry.title}</h4>
                  <p className="mt-2 text-body">{entry.text}</p>
                </div>
              );
            })}
          </article>
        ))}
      </div>
      <p className="mt-8 max-w-measure text-body text-graphite">AI helps find and draft. Your team checks the evidence and approves the work.</p>
    </div>
  </section>
);

export const Questions = () => (
  <section id="questions" aria-labelledby="questions-title" className="clarity-section bg-paper">
    <div className="container clarity-narrow">
      <h2 id="questions-title" tabIndex={-1} className="clarity-heading">Common questions</h2>
      <div className="mt-7">
        {IN_BRIEF.questions.filter((item) => isShown(item.gate)).map((item) => (
          <details key={item.q} className="clarity-question">
            <summary>{item.q}</summary>
            <p className="max-w-measure pb-5 text-body"><Rich text={item.a} /></p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

```

## frontend/src/components/sections/EvidenceIllustrations.jsx
```jsx
import { EVIDENCE_ILLUSTRATION } from '@/content/marketing';

// Static, semantic documents. These figures have no simulated software controls.
export const ChronologyIllustration = () => (
  <figure className="evidence-figure chronology-illustration" aria-labelledby="chronology-illustration-title">
    <h2 id="chronology-illustration-title" className="evidence-figure-title">From documents to chronology.</h2>
    <div className="evidence-documents" aria-label="Three source documents">
      {EVIDENCE_ILLUSTRATION.map((source) => (
        <div className="evidence-document" key={source.id}>
          <svg width="26" height="32" viewBox="0 0 26 32" fill="none" aria-hidden="true">
            <path d="M1 1h16l8 8v22H1zM17 1v8h8M6 15h14M6 20h14M6 25h9" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <p>{source.document}</p>
        </div>
      ))}
    </div>
    <p className="evidence-order-label">One record, in date order</p>
    <ol className="evidence-chronology">
      {EVIDENCE_ILLUSTRATION.map((source) => (
        <li key={source.id}>
          <time dateTime={source.isoDate}>{source.date}</time>
          <div><p>{source.title}</p><span>{source.id}</span></div>
        </li>
      ))}
    </ol>
    <figcaption>Illustrative chronology from a fictional construction matter.</figcaption>
  </figure>
);

export const ArgumentIllustration = () => (
  <figure className="evidence-figure argument-illustration" aria-labelledby="argument-illustration-title">
    <div className="evidence-argument">
      <h3 id="argument-illustration-title" className="evidence-figure-title">An argument with its sources.</h3>
      <p className="evidence-argument-text">The change was instructed on 03 March. The ten-week lead time was recorded on 12 March. Delivery was confirmed on 26 March for the week commencing 19 May 2025.</p>
      <p className="text-small text-azure-700">Supported by EV-0131, EV-0138 and EV-0147.</p>
    </div>
    <div className="evidence-sources">
      <h4 className="text-body font-medium">Supporting records</h4>
      {EVIDENCE_ILLUSTRATION.map((source) => (
        <blockquote className="evidence-source" key={source.id}>
          <p>“{source.excerpt}”</p>
          <footer>{source.document}, {source.date}<span>{source.id}</span></footer>
        </blockquote>
      ))}
    </div>
    <figcaption id="notes" tabIndex={-1}>The documents and argument shown here are fictional. The source references connect each point to the record behind it.</figcaption>
  </figure>
);

```

## frontend/src/components/sections/clarity.css
```css
/* Marketing page: readable copy and static source records, without product controls. */
.clarity-hero { padding: clamp(2.75rem, 6vw, 5.5rem) 0; }
.clarity-hero-grid { display: grid; gap: 2.75rem; align-items: center; }
.clarity-title { max-width: 18ch; font-size: clamp(2.625rem, 4.7vw, 4rem); line-height: 1.06; letter-spacing: -0.025em; }
.clarity-lead { max-width: 36rem; font-size: 1.25rem; line-height: 1.6; }
.clarity-link { display: inline-flex; min-height: 44px; align-items: center; color: var(--vc-azure-700); font-weight: 500; text-decoration: underline; text-underline-offset: 4px; }
.clarity-link:hover { color: var(--vc-ink); }
.clarity-section { padding: clamp(2.75rem, 5vw, 4.5rem) 0; }
.clarity-heading { max-width: 27ch; font-size: clamp(2rem, 3vw, 2.5rem); line-height: 1.15; }
.clarity-jobs, .clarity-team { display: grid; gap: 2rem; }
.clarity-jobs article, .clarity-team article { min-width: 0; }
.capability-group { border-top: 2px solid var(--vc-brass-400); padding-top: 1.5rem; }
.capability-detail { margin-top: 1.5rem; }
.capability-detail h4, .evidence-sources h4 { font-family: inherit; }
.time-advantage { background: var(--vc-ink); }
.time-advantage-grid, .workspace-intro, .workspace-detail { display: grid; gap: 2rem; }
.time-advantage-copy p { max-width: 68ch; }
.time-advantage-copy p + p { margin-top: 1.25rem; }
.team-container { border-top: 1px solid var(--vc-rule); padding-top: clamp(2.75rem, 5vw, 4.5rem); }
#about.clarity-section { padding-top: 0; }

/* Document shapes carry meaning: source records above, the ordered record below. */
.evidence-figure { min-width: 0; margin: 0; background: var(--vc-paper); padding: clamp(1rem, 2.5vw, 2rem); border-top: 3px solid var(--vc-brass-400); }
.evidence-figure-title { font-size: clamp(1.625rem, 2.2vw, 2rem); line-height: 1.15; }
.evidence-documents { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; margin-top: 1.5rem; }
.evidence-document { padding: 0.75rem 0.5rem; border: 1px solid var(--vc-rule); background: var(--vc-parchment); }
.evidence-document svg { color: var(--vc-azure-700); margin-bottom: 0.75rem; }
.evidence-document p { font-size: 0.9375rem; line-height: 1.4; }
.evidence-order-label { margin-top: 1.5rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--vc-rule); font-size: 1rem; font-weight: 500; }
.evidence-chronology { list-style: none; padding: 0; }
.evidence-chronology li { display: grid; grid-template-columns: minmax(6.5rem, 0.85fr) minmax(0, 1fr); gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--vc-rule); }
.evidence-chronology time { font-size: 0.9375rem; line-height: 1.5; color: var(--vc-azure-700); }
.evidence-chronology p { font-size: 1rem; line-height: 1.4; font-weight: 500; }
.evidence-chronology span { display: block; margin-top: 0.25rem; font-size: 0.9375rem; color: var(--vc-graphite); }
.evidence-figure figcaption { margin-top: 1.25rem; font-size: 0.9375rem; line-height: 1.5; color: var(--vc-graphite); max-width: 68ch; }
.argument-illustration { display: grid; gap: 2rem; margin: 2.5rem 0; }
.evidence-argument-text { font-family: 'Newsreader', 'Newsreader Fallback', Georgia, serif; font-size: clamp(1.375rem, 2.2vw, 1.75rem); line-height: 1.45; margin: 1.5rem 0; max-width: 40ch; }
.evidence-source { margin-top: 1.25rem; padding-left: 1rem; border-left: 2px solid var(--vc-brass-400); }
.evidence-source p { font-size: 1rem; line-height: 1.6; }
.evidence-source footer { margin-top: 0.5rem; font-size: 0.9375rem; line-height: 1.5; color: var(--vc-azure-700); }
.evidence-source footer span { display: block; }
.argument-illustration figcaption { margin: 0; padding-top: 1.25rem; border-top: 1px solid var(--vc-rule); }
.clarity-question { border-bottom: 1px solid var(--vc-rule); }
.clarity-question:first-child { border-top: 1px solid var(--vc-rule); }
.clarity-question > summary, .clarity-bio > summary { cursor: pointer; min-height: 48px; padding: 0.75rem 0; font-weight: 500; }
.clarity-question > summary { font-size: 1.125rem; }
.clarity-bio > summary { color: var(--vc-azure-700); text-decoration: underline; text-underline-offset: 4px; }
.clarity-narrow { max-width: 56rem; }
@media (max-width: 479px) {
  .evidence-documents { grid-template-columns: minmax(0, 1fr); }
  .evidence-document { display: flex; align-items: center; gap: 1rem; padding: 0.625rem 0.75rem; }
  .evidence-document svg { flex-shrink: 0; margin: 0; }
}
@media (min-width: 768px) {
  .clarity-jobs { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; }
  .clarity-team { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4rem; }
  .workspace-detail, .argument-illustration { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2.5rem; }
  .argument-illustration figcaption { grid-column: 1 / -1; }
}
@media (min-width: 1024px) {
  .clarity-hero-grid { grid-template-columns: 1.15fr 0.85fr; gap: 5rem; }
  .time-advantage-grid, .workspace-intro { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 5rem; }
}

```

## frontend/src/components/editorial/DemoCTA.jsx
```jsx
import { useEffect, useRef, useState } from 'react';
import { Copy, Mail } from 'lucide-react';
import { CONTACT_EMAIL, DEMO_MAILTO } from '@/lib/site';
import { CTA_LABEL, CTA_MICROCOPY, DEMONSTRATION } from '@/content/home';
import { trackDemonstration } from '@/lib/analytics';
import { cn } from '@/lib/utils';

// "Request a demonstration": a mailto with the subject and body prefilled, an optional
// "Copy email address" button (confirmed in a status line beside it) and the confidentiality
// microcopy. No form submits anything. The compact form is for the header band: the same
// mailto and copy fallback, with the copy button reduced to an icon and the confirmation
// announced rather than shown, so the band keeps its height.
export const DemoCTA = ({ onInk = false, withCopy = false, compact = false, microcopy = CTA_MICROCOPY, className, align = 'start', placement, section }) => {
  const plain = useRef(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 4000);
    return () => clearTimeout(t);
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      trackDemonstration(placement, section, true);
    } catch {
      // Clipboard unavailable: select the plain address so it can be copied by hand.
      const el = plain.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };
  if (compact) {
    return (
      <div className={cn('flex items-center gap-1 sm:gap-2', className)}>
        <a href={DEMO_MAILTO} onClick={() => trackDemonstration(placement, section)} className={cn('vc-btn vc-btn-primary max-sm:px-3 max-sm:text-[0.875rem]', onInk && 'vc-btn-on-ink')}>
          {CTA_LABEL}
        </a>
        {withCopy && (
          <button
            type="button"
            onClick={copy}
            aria-label={DEMONSTRATION.copy}
            title={DEMONSTRATION.copy}
            className={cn('vc-btn vc-btn-secondary w-11 shrink-0 px-0 max-sm:hidden', onInk && 'vc-btn-secondary-on-ink')}
          >
            <Copy className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        )}
        {withCopy && (
          <span role="status" className="sr-only">
            {copied ? DEMONSTRATION.copied : ''}
          </span>
        )}
        <span ref={plain} className="sr-only">
          {CONTACT_EMAIL}
        </span>
      </div>
    );
  }
  return (
    <div className={cn('flex flex-col gap-3', align === 'center' && 'items-center text-center', className)}>
      <div className={cn('flex flex-wrap items-center gap-3', align === 'center' && 'justify-center')}>
        <a href={DEMO_MAILTO} onClick={() => trackDemonstration(placement, section)} className={cn('vc-btn vc-btn-primary', onInk && 'vc-btn-on-ink')}>
          <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {CTA_LABEL}
        </a>
        {withCopy && (
          <button type="button" onClick={copy} className={cn('vc-btn vc-btn-secondary', onInk && 'vc-btn-secondary-on-ink')}>
            <Copy className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {DEMONSTRATION.copy}
          </button>
        )}
        {withCopy && (
          <span role="status" className={cn('text-caption font-medium', onInk ? 'text-azure-300' : 'text-azure-700')}>
            {copied ? DEMONSTRATION.copied : ''}
          </span>
        )}
      </div>
      {microcopy && <p className={cn('max-w-[34rem] text-caption', onInk ? 'text-mist' : 'text-graphite')}>{microcopy}</p>}
      {withCopy && (
        <p className={cn('text-caption', onInk ? 'text-mist' : 'text-graphite')}>
          Or write to{' '}
          <a ref={plain} href={`mailto:${CONTACT_EMAIL}`} onClick={() => trackDemonstration(placement, section)} className={cn('underline underline-offset-2', onInk ? 'text-azure-300' : 'text-azure-700')}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
    </div>
  );
};

```

## Copy used by released sections
```js
export const COVER = {
  masthead: ['Records,', 'records,', 'records.'],
  eyebrow: 'The early case diagnostic tool for construction disputes',
  h1: 'Transform complex evidence into compelling legal arguments.',
  subhead:
    "VeriCase approaches the evidence crisis differently. We don't just manage documents; we reconstruct truth. Forensic-grade AI turns scattered records into winning, defensible strategies.",
  audience: 'Software for contractors, claims consultants and construction lawyers.',
  fastPath: 'See how it works',
  strip: [
    { label: 'Founded by practitioners', text: 'William Rogers MCIArb & Warren Kemp (Partner, gunnercooke): forensic quantum, claims and dispute resolution.' },
    {
      label: 'Owned in part by practitioners',
      text: 'Practitioners from law firms and claims consultancies hold equity in VeriCase Ltd.',
      gate: 'G5_equity',
    },
    { label: 'Before disclosure, not instead of it', text: 'VeriCase prepares the record and works alongside your disclosure platform.' },
  ],
  fig: {
    number: 1,
    bar: 'The Chronology Lens™ · Sample matter (fictional)',
    caption:
      'Fig. 1. The Chronology Lens™, illustrated with the sample matter. Names, message IDs and exhibit references are fictional. See note A.',
    summaryDesktop:
      'Illustration: nine items of fictional correspondence and records are threaded, stripped of quoted history and, where they are a near-duplicate, an automatic reply or another project’s email, set aside. Six remain and take their places in date order, each with a citation to its source.',
    summaryMobile:
      'Illustration: seven items of fictional correspondence are threaded, stripped of quoted history and, where they are a near-duplicate or another project’s email, set aside. Five remain and take their places in date order, each with a citation to its source.',
    handle: 'Drag the Lens',
    stages: ['Raw', 'Thread', 'Read', 'Set aside', 'Order', 'Cite'],
    valueText: [
      'Stage 0 of 5: the raw record, as received.',
      'Stage 1 of 5: threads rebuilt from message headers.',
      'Stage 2 of 5: quoted history folded, so each entry shows what its author wrote.',
      'Stage 3 of 5: items that do not belong in the review set are set aside.',
      'Stage 4 of 5: the remaining entries in date order.',
      'Stage 5 of 5: each entry cited to its source.',
    ],
    controls: { play: 'Play', pause: 'Pause', replay: 'Replay' },
    chips: {
      thread: 'Thread {n} · {count} messages',
      references: 'Threaded by References header',
      quoted: 'Quoted history folded ({n})',
      ocr: 'Scanned page read by OCR',
      attachment: 'Attachment extracted: {file}',
      placed: 'Placed in order: {date}',
    },
    trayDesktop: 'Set aside: 1 near-duplicate · 1 automatic reply · 1 other project',
    trayMobile: 'Set aside: 1 near-duplicate · 1 other project',
    cite: 'Notice was given on 28 March 2025 [[ev:EV-0151]]: sixteen days after the lead-time email [[ev:EV-0138]] and two days after delivery was confirmed [[ev:EV-0147]].',
    footDesktop: '6 entries · 4 parties · 3 set aside · 6 of 6 linked to source',
    footMobile: '5 entries · 4 parties · 2 set aside · 5 of 5 linked to source',
  },
};

export const CTA_LABEL = 'Request a demonstration';
export const CTA_MICROCOPY = 'Opens an email to enquiries@veri-case.com. Please do not include confidential details of a live matter.';
export const IN_BRIEF = {
  jobs: [
    { title: 'Put the record in order', text: 'Bring together emails and documents from the project. Read events in date order, with a link back to each source.' },
    { title: 'Find the evidence', text: 'Ask a question about the records. Check the answer against the emails and documents it refers to.' },
    { title: 'Prepare your case', text: 'Build a claim or respond to the other side’s arguments. Review proposed wording with the supporting evidence alongside it.' },
  ],
  eyebrow: 'In brief',
  h2: 'The platform, on one page.',
  sub: 'VeriCase is deliberately lean: evidence, chronology, claims and rebuttal. Each line links to the chapter that shows it.',
  ledger: [
    { numeral: 'II', href: '#chronology-lens', title: 'Ingestion', text: 'PST, MSG, EML, PDF, DOC, DOCX, spreadsheets and images, with OCR. One record per message, threaded by header, with quoted text folded, near-duplicates set aside and attachments listed by type in File Manager.' },
    { numeral: 'II', href: '#chronology-lens', title: 'The Chronology Lens™', text: 'One time-ordered view across every party, in Cards or Table view, with a project date window, Smart Filter, Exclude keywords and Create bundle.' },
    { numeral: 'III', href: '#case-room', title: 'Rebuttal Mode', text: 'Numbered points, ranked evidence, reply points with mandatory citations, accept, edit or reject with an audit trail, and an export pairing each point with its reply and cited evidence.' },
    { numeral: 'IV', href: '#research', title: 'Research', text: 'Plain-English questions, an editable Query Plan, and an Analysis Report with numbered citations, counts and a validation badge. Download PDF or create a bundle.' },
    { numeral: 'V', href: '#claims', title: 'Claims builder', text: 'Heads of Claim, a narrative cited by message ID, an evidence finder, and Word or PDF export.' },
    { numeral: 'VI', href: '#integrity', title: 'Integrity and access', text: 'Originals kept as received, with hashes, a per-message audit trail, numbered bundles with manifests, role-based access and server-side AI.' },
  ],
  benchmarks: {
    gate: 'G4_benchmarks',
    text: 'In benchmark testing, VeriCase processed more than 50,000 documents per hour[[note:6]] and extracted dates with 99.7% accuracy.[[note:7]] The notes describe how each figure was measured, so that you can judge them for yourself.',
  },
  audience: {
    label: 'Who it is for',
    text: 'For construction solicitors and counsel, including King’s Counsel; claims consultants; quantum and other experts; and contractors’ commercial and in-house legal teams.',
  },
  questionsLabel: 'Questions',
  questions: [
    { q: 'What can we upload?', a: 'Email archives and individual emails, PDFs, Word documents, spreadsheets and images. Scanned pages can be read using text recognition.' },
    { q: 'Does VeriCase replace our disclosure platform?', a: 'No. VeriCase is a pre-litigation workspace. It prepares evidence, chronology, claim and rebuttal material, which then moves to the platform your solicitors use.' },
    { q: 'Will the output be accepted by the tribunal?', a: 'Admissibility and weight are for the tribunal. VeriCase keeps each original with its hash, message ID and source path, and records what was done to it, so that its provenance can be examined.' },
    { q: 'Does the AI write our submissions?', a: 'No. It suggests evidence and proposes reply points, each with citations. A person accepts, edits or rejects every proposal, and the decision is recorded. Responsibility for anything served stays with its author.' },
    { q: 'Who sees what?', a: 'Access is by role: Team Leader, Senior Lawyer, Claims Consultant, QS, Project Manager, External Counsel and Client Viewer. BCC recipients and other sensitive fields are restricted by permission.', gate: 'G5_roles' },
    { q: 'Where is our data held, and is it used to train AI models?', a: '{{DATA_POLICY}}', gate: 'G8_data' },
  ],
};

```

## Time copy and fictional records
```js
// Owner-approved copy, 01 October 2026. Preserve these passages verbatim.
export const TIME_ADVANTAGE = {
  title: 'Time is your ally: your competitive edge, not your enemy',
  paragraphs: [
    'Time is the commodity everyone is chasing. There is a gold rush around AI. If you do not get on board, you will fall behind your competitors.',
    'VeriCase transforms complex evidence into compelling, defensible claim arguments using AI, so legal and construction professionals can build stronger cases faster and with greater confidence.',
    'It is an early case diagnostic tool. It saves substantial time and gives you an edge over your opponent. Imagine building a factual chronology by reading tens or hundreds of thousands of emails. VeriCase does that not in days, weeks, or months, but in minutes.',
  ],
};

// Excerpts and dates from the existing fictional sampleEvidence.json, not live client data.
export const EVIDENCE_ILLUSTRATION = [
  { id: 'EV-0131', date: '03 March 2025', isoDate: '2025-03-03', document: 'Instruction', title: 'Change instructed', excerpt: 'Please proceed with bracket type B. This is an instruction requiring a Change.' },
  { id: 'EV-0138', date: '12 March 2025', isoDate: '2025-03-12', document: 'Lead-time email', title: 'Lead time given', excerpt: 'Stainless brackets are ten weeks from order.' },
  { id: 'EV-0147', date: '26 March 2025', isoDate: '2025-03-26', document: 'Order confirmation', title: 'Delivery confirmed', excerpt: 'Supplier confirms delivery week commencing 19 May 2025.' },
];

```

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
