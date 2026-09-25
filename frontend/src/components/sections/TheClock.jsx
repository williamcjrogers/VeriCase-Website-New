import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { CLOCK } from '@/content/home';

// Stub: replaced by the full chapter.
export const TheClock = () => (
  <section id="clock" aria-labelledby="clock-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="clock" numeral={CLOCK.numeral} eyebrow={CLOCK.eyebrow} title={CLOCK.h2} lead={CLOCK.lead} />
    </div>
  </section>
);
