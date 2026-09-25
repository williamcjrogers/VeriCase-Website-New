import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { INTEGRITY } from '@/content/home';

// Stub: replaced by the full chapter.
export const RecordIntegrity = () => (
  <section id="integrity" aria-labelledby="integrity-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="integrity" numeral={INTEGRITY.numeral} eyebrow={INTEGRITY.eyebrow} title={INTEGRITY.h2} lead={INTEGRITY.lead} />
    </div>
  </section>
);
