import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { CLAIMS } from '@/content/home';

// Stub: replaced by the full chapter.
export const ClaimsBuilder = () => (
  <section id="claims" aria-labelledby="claims-title" className="bg-parchment py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="claims" numeral={CLAIMS.numeral} eyebrow={CLAIMS.eyebrow} title={CLAIMS.h2} lead={CLAIMS.lead} />
    </div>
  </section>
);
