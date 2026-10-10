import { IN_BRIEF, SOLUTION_CHAPTERS } from '@/content/home';
import { isShown } from '@/components/editorial/Gated';
import { Rich } from '@/components/editorial/Rich';
import { onSectionClick } from '@/lib/navigate';
import { ArrowUpRight } from 'lucide-react';

export const InBrief = ({ children }) => (
  <section id="platform" aria-labelledby="platform-title" className="solution-introduction">
    <div className="container solution-overview">
      <h2 id="platform-title" tabIndex={-1} className="solution-title">{IN_BRIEF.h2}</h2>
      <nav className="capability-index" aria-label="Explore the platform">
        {SOLUTION_CHAPTERS.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`} onClick={onSectionClick(chapter.id)}>{chapter.indexTitle}<ArrowUpRight size={20} aria-hidden="true" /></a>
        ))}
      </nav>
    </div>
      {children}
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
