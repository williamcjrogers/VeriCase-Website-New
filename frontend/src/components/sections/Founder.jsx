import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { FOUNDER } from '@/content/home';

// Stub: replaced by the full section.
export const Founder = () => (
  <section id="about" aria-labelledby="about-title" className="bg-paper py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="about" eyebrow={FOUNDER.eyebrow} title={FOUNDER.h2} />
    </div>
  </section>
);
