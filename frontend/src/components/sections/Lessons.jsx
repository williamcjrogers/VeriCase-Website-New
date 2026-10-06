import { LESSONS } from '@/content/home';
import { isShown } from '@/components/editorial/Gated';

// The passage the hero motto adapts, quoted in full under the opening: Abrahamson's three lessons,
// the emphasis VeriCase adds, and why it matters to VeriCase. Shown with the motto's credit (G11).
export const Lessons = () => {
  if (!isShown('G11_attribution')) return null;
  const [before, title, after] = LESSONS.intro;
  const [quoted, emphasised, end] = LESSONS.quote;
  return (
    <section id="lessons" aria-labelledby="lessons-title" className="clarity-section lessons">
      <div className="container lessons-inner">
        <h2 id="lessons-title" tabIndex={-1} className="section-kicker">{LESSONS.kicker}</h2>
        <figure className="lessons-figure">
          <figcaption className="lessons-intro">{before}<cite>{title}</cite>{after}</figcaption>
          <blockquote className="lessons-quote font-display">
            <p>“{quoted}<em>{emphasised}</em>{end}” <span className="lessons-emphasis">{LESSONS.emphasis}</span></p>
          </blockquote>
        </figure>
        <div className="lessons-close">
          {LESSONS.close.map((line) => <p key={line}>{line}</p>)}
        </div>
      </div>
    </section>
  );
};
