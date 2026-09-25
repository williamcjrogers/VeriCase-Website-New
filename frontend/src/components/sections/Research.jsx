import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { RESEARCH } from '@/content/home';

// Stub: replaced by the full chapter.
export const Research = () => (
  <section id="research" aria-labelledby="research-title" className="bg-paper py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="research" numeral={RESEARCH.numeral} eyebrow={RESEARCH.eyebrow} title={RESEARCH.h2} lead={RESEARCH.lead} />
    </div>
  </section>
);
