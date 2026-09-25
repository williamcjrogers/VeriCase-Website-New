import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { LENS_CHAPTER } from '@/content/home';

// Stub: replaced by the full chapter.
export const ChronologyLens = () => (
  <section id="chronology-lens" aria-labelledby="chronology-lens-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="chronology-lens" numeral={LENS_CHAPTER.numeral} eyebrow={LENS_CHAPTER.eyebrow} title={LENS_CHAPTER.h2} lead={LENS_CHAPTER.lead} />
    </div>
  </section>
);
