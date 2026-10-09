import { TIME_ADVANTAGE } from '@/content/marketing';

export const TimeAdvantage = () => (
  <section id="clock" aria-labelledby="clock-title" className="clarity-section time-advantage on-ink on-blue">
    <div className="container time-advantage-grid">
      <h2 id="clock-title" tabIndex={-1} className="clarity-heading">{TIME_ADVANTAGE.title}</h2>
      <div className="time-advantage-copy">
        {TIME_ADVANTAGE.paragraphs.map((paragraph) => <p key={paragraph} className="text-body">{paragraph}</p>)}
      </div>
    </div>
  </section>
);
