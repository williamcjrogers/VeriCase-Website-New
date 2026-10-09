import { IN_BRIEF } from '@/content/home';
import { isShown } from '@/components/editorial/Gated';
import { Rich } from '@/components/editorial/Rich';
import { onSectionClick } from '@/lib/navigate';
import { MessagesSquare, MessageSquareText, Package, PenLine, Scale, Search } from 'lucide-react';

// Each job is drawn as one of the application's workspace cards: a blue tile with its icon, then
// the title and a line (app.veri-case.com, seen 09 October 2026).
const JOB_ICONS = { 'chronology-lens': Search, research: MessageSquareText, 'worked-example': Package, 'case-room': Scale, claims: PenLine, collaboration: MessagesSquare };

export const InBrief = () => (
  <section id="platform" aria-labelledby="platform-title" className="clarity-section bg-parchment">
    <div className="container">
      <h2 id="platform-title" tabIndex={-1} className="clarity-heading">{IN_BRIEF.h2}</h2>
      <div className="clarity-jobs mt-8">
        {IN_BRIEF.jobs.map((job) => {
          const Icon = JOB_ICONS[job.section];
          return (
          <article key={job.title} className="capability-group">
            {Icon && <span className="capability-tile" aria-hidden="true"><Icon /></span>}
            <h3 className="text-[1.625rem] leading-tight"><a className="capability-title-link" href={`#${job.section}`} onClick={onSectionClick(job.section)}>{job.title}<span aria-hidden="true">↗</span></a></h3>
            <p className="mt-3 max-w-measure text-body">{job.text}</p>
          </article>
          );
        })}
      </div>
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
