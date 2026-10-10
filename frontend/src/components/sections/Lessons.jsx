import { LESSONS } from '@/content/home';
import { isShown } from '@/components/editorial/Gated';

// The full passage is part of the homepage's founding argument, governed by the motto's credit (G11).
export const Lessons = () => {
  if (!isShown('G11_attribution')) return null;
  const [before, title, after] = LESSONS.intro;
  return (
    <section id="lessons" aria-labelledby="lessons-title" className="clarity-section lessons solution-surface-paper">
      <div className="container lessons-inner">
        <div className="lessons-heading">
          <p className="lessons-label">{LESSONS.kicker}</p>
          <h2 id="lessons-title" tabIndex={-1}>{LESSONS.h2}</h2>
        </div>
        <div className="lessons-copy">
          <figure className="lessons-figure">
            <figcaption className="lessons-intro">{before}<cite>{title}</cite>{after}</figcaption>
            <blockquote className="lessons-quote">
              <p>“{LESSONS.quote.map((part, i) => {
                if (part.em) return <em key={i}>{part.text}</em>;
                if (part.stress) return <span key={i} className="lessons-stress">{part.text}</span>;
                return <span key={i}>{part.text}</span>;
              })}” <span className="lessons-emphasis">{LESSONS.emphasis}</span></p>
            </blockquote>
          </figure>
          <p className="lessons-close">{LESSONS.close}</p>
        </div>
      </div>
    </section>
  );
};
