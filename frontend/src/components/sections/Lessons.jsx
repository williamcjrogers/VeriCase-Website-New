import { LESSONS } from '@/content/home';
import { isShown } from '@/components/editorial/Gated';

// The passage the hero motto adapts, quoted in full under the opening: Abrahamson's three lessons,
// the emphasis VeriCase adds, and why it matters to VeriCase. Shown with the motto's credit (G11).
export const Lessons = () => {
  if (!isShown('G11_attribution')) return null;
  const [before, title, after] = LESSONS.intro;
  return (
    <details className="lessons-disclosure">
      <summary>The passage behind the words</summary>
      <section id="lessons" aria-labelledby="lessons-title" className="lessons">
        <h2 id="lessons-title" tabIndex={-1}>{LESSONS.kicker}</h2>
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
        <div className="lessons-close">
          {LESSONS.close.map((line) => <p key={line}>{line}</p>)}
        </div>
      </section>
    </details>
  );
};
