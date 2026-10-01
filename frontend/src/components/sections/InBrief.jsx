import { IN_BRIEF } from '@/content/home';
import { isShown } from '@/components/editorial/Gated';
import { Rich } from '@/components/editorial/Rich';
import { onSectionClick } from '@/lib/navigate';

const EXPLANATIONS = [
  { id: 'chronology-lens', label: 'Ingestion and chronology' },
  { id: 'research', label: 'Research and rebuttal' },
  { id: 'claims', label: 'Claims and collaboration' },
];

export const InBrief = () => (
  <section id="platform" aria-labelledby="platform-title" className="clarity-section bg-paper">
    <div className="container">
      <h2 id="platform-title" tabIndex={-1} className="clarity-heading">Three jobs, one place.</h2>
      <div className="clarity-jobs mt-8">
        {IN_BRIEF.jobs.map((job, index) => (
          <article key={job.title} className="capability-group">
            <h3 className="text-[1.625rem] leading-tight">{job.title}</h3>
            <p className="mt-3 max-w-measure text-body">{job.text}</p>
            <a href={`#${EXPLANATIONS[index].id}`} onClick={onSectionClick(EXPLANATIONS[index].id)} className="clarity-link mt-4">{EXPLANATIONS[index].label}</a>
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
