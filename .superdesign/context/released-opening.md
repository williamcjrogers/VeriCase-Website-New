# Released homepage opening: cf029e2

Target for reproduction: header, hero, time section, three-job capability overview only. End after the overview. Do not invent further sections during reproduction. Local uncommitted component changes are excluded.

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
