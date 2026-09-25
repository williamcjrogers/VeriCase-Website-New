import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { DEMONSTRATION } from '@/content/home';

// Stub: replaced by the full section.
export const Demonstration = () => (
  <section id="demonstration" aria-labelledby="demonstration-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="demonstration" eyebrow={DEMONSTRATION.eyebrow} title={DEMONSTRATION.h2} />
    </div>
  </section>
);
