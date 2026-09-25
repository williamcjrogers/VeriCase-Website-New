import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { IN_BRIEF } from '@/content/home';

// Stub: replaced by the full section.
export const InBrief = () => (
  <section id="platform" aria-labelledby="platform-title" className="bg-parchment-300 py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="platform" eyebrow={IN_BRIEF.eyebrow} title={IN_BRIEF.h2} />
    </div>
  </section>
);
