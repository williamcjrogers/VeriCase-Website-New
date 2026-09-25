import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { CASE_ROOM } from '@/content/home';

// Stub: replaced by the full chapter.
export const CaseRoom = () => (
  <section id="case-room" aria-labelledby="case-room-title" className="on-ink bg-ink-950 py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="case-room" numeral={CASE_ROOM.numeral} eyebrow={CASE_ROOM.eyebrow} title={CASE_ROOM.h2} lead={CASE_ROOM.lead} onInk />
    </div>
  </section>
);
