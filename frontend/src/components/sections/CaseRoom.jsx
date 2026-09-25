import { lazy, useState } from 'react';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { FailRecover } from '@/components/editorial/FailRecover';
import { Gated } from '@/components/editorial/Gated';
import { LazyMount } from '@/components/editorial/LazyMount';
import { NoteRef } from '@/components/editorial/NoteRef';
import { DomainIcon } from '@/components/icons';
import { CaseBand, HAS_PLATE } from '@/components/caseroom/CaseBand';
import { FIG8_SUMMARY } from '@/components/caseroom/pending';
import { CASE_ROOM } from '@/content/home';
import { DAY_GRID, SCOTT } from '@/content/sampleMatter';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { fill } from '@/lib/format';
import '@/components/caseroom/caseroom.css';

const DayGrid = lazy(() => import(/* webpackChunkName: "day-grid" */ '@/components/mock/DayGrid'));
const ScottSchedule = lazy(() => import(/* webpackChunkName: "scott-schedule" */ '@/components/mock/ScottSchedule'));

// A station counts as reached once its heading has risen above the middle of the viewport.
const STATION_VIEW = { threshold: 0, rootMargin: '0px 0px -45% 0px' };
// The export strip: its sentence, then its counts as recorded, which the schedule recomputes
// (from the same records) whenever the visitor changes a decision.
const EXPORT_AT = SCOTT.exportStrip.search(/\d+ points?\b/);
const EXPORT_LEAD = SCOTT.exportStrip.slice(0, EXPORT_AT).trim();
const RECORDED_COUNTS = SCOTT.exportStrip.slice(EXPORT_AT).trim();
// "Project time ends. Case time begins.": the second sentence is set in italic.
const [KICK_FROM, KICK_TO] = CASE_ROOM.kicker.match(/[^.]+\./g).map((s) => s.trim());
// The figure's text equivalent, one sentence per list item.
const TEXT_EQUIVALENT = DAY_GRID.textEquivalent.match(/[^.]+\./g).map((s) => s.trim());
const skeleton = <div className="vc-skeleton absolute inset-0" aria-hidden="true" />;

// One stop on the adjudication timetable: the day and date in mono over what happens. Below
// 1024 px, where the day grid is not beside it, "Day n of 28" and a short bar stand in for it.
const Station = ({ anchor, day, heading, children }) => {
  const [dayPart, datePart, what] = heading ? heading.split(' · ') : [];
  return (
    <div ref={anchor} className="cr-station">
      <p className="cr-dayof">
        <span className="cr-dayof-bar" style={{ '--p': day / 28 }} aria-hidden="true" />
        {fill(DAY_GRID.dayOf, { n: day })}
      </p>
      {heading && (
        <h3 className="cr-station-heading">
          <span className="cr-when">{`${dayPart} · ${datePart}`}</span>
          <span className="sr-only"> · </span>
          <span className="cr-what">{what}</span>
        </h3>
      )}
      {children}
    </div>
  );
};

// Fig. 7 in the margin rail: the 28 days from referral, filled to the station reached, with the
// extension and its note. The drawing is decorative; the list before it is the text equivalent.
const Timetable = ({ reached }) => (
  <figure className="cr-fig7" aria-labelledby="cr-fig7-title">
    <div className="cr-fig7-head">
      <p className="cr-fig-label">Fig. 7</p>
      <p className="cr-readout" aria-hidden="true">
        {fill(DAY_GRID.dayOf, { n: reached })}
      </p>
    </div>
    <p id="cr-fig7-title" className="cr-fig7-title">
      {DAY_GRID.title}
    </p>
    <ol className="sr-only">
      {TEXT_EQUIVALENT.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
    <LazyMount className="cr-grid-mount" skeleton={skeleton}>
      <DayGrid reached={reached} />
    </LazyMount>
    <p className="cr-ext">
      {DAY_GRID.extension}
      <NoteRef n={DAY_GRID.extensionNote} onInk />
    </p>
    <p className="cr-note">{DAY_GRID.note}</p>
  </figure>
);

// Chapter V, on ink: the cut from project time to case time, the header band, then the
// adjudication timetable (Fig. 7) beside its three stations: the Response answered point by
// point in Rebuttal Mode (Fig. 8), the Reply served, and the decision, which is the adjudicator's.
export const CaseRoom = () => {
  const [counts, setCounts] = useState(RECORDED_COUNTS);
  const [cutRef, cutIn] = useInViewOnce({ threshold: 0.6 });
  const [at14Ref, at14] = useInViewOnce(STATION_VIEW);
  const [at21Ref, at21] = useInViewOnce(STATION_VIEW);
  const [at28Ref, at28] = useInViewOnce(STATION_VIEW);
  const reached = at28 ? 28 : at21 ? 21 : at14 ? 14 : 0;
  // The Day 28 station's heading is the card's own stamp, so only its day is used here.
  const [s14, s21, s28] = DAY_GRID.stations;

  return (
    <section id="case-room" aria-labelledby="case-room-title" className="on-ink bg-ink-950">
      <CaseBand>
        <div className="cr-band-inner container">
          <div ref={cutRef} className={cutIn ? 'cr-cut is-in' : 'cr-cut'}>
            <p className="cr-cut-label">{CASE_ROOM.cut}</p>
            <span className="cr-cut-rule double-rule is-brass draw-x" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-12 gap-x-6">
            <p className="cr-kicker col-span-12 lg:col-span-9 lg:col-start-3">
              {KICK_FROM} <span className="italic">{KICK_TO}</span>
            </p>
          </div>
          <ChapterHeader id="case-room" numeral={CASE_ROOM.numeral} eyebrow={CASE_ROOM.eyebrow} title={CASE_ROOM.h2} onInk className="cr-header">
            <p className="mt-5 max-w-measure text-lead text-parchment">
              <Gated id={CASE_ROOM.leadGate}>{CASE_ROOM.lead}</Gated>
            </p>
          </ChapterHeader>
        </div>
      </CaseBand>
      {HAS_PLATE && <p className="cr-plate-caption container">{CASE_ROOM.plate.caption}</p>}

      <div className="container pb-16 pt-12 md:pb-24 md:pt-16 lg:pb-32 lg:pt-20">
        <div className="grid grid-cols-12 gap-x-6">
          <FailRecover onInk fail={CASE_ROOM.fail} recover={CASE_ROOM.recover} className="col-span-12 lg:col-span-9 lg:col-start-3 xl:col-span-8 xl:col-start-3" />
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-6 md:mt-20 lg:mt-24">
          <div className="col-span-12 lg:col-span-3">
            <div className="cr-rail">
              <Timetable reached={reached} />
            </div>
          </div>

          <div className="col-span-12 mt-16 lg:col-span-9 lg:col-start-4 lg:mt-0">
            <Station anchor={at14Ref} day={s14.day} heading={s14.heading}>
              <figure className="cr-fig8" aria-labelledby="cr-fig8-label" aria-describedby="cr-fig8-summary">
                <p id="cr-fig8-label" className="cr-fig-label">
                  Fig. 8
                </p>
                <p id="cr-fig8-summary" className="sr-only">
                  {FIG8_SUMMARY}
                </p>
                <LazyMount className="cr-scott-mount" skeleton={skeleton}>
                  <ScottSchedule onExportChange={setCounts} />
                </LazyMount>
              </figure>
            </Station>

            <Station anchor={at21Ref} day={s21.day} heading={s21.heading}>
              <div className="cr-export">
                <DomainIcon name="RebuttalPair" className="cr-export-icon" />
                <p>
                  {EXPORT_LEAD} <span className="cr-export-counts">{counts}</span>
                </p>
              </div>
              <p className="cr-standing">{CASE_ROOM.standing}</p>
            </Station>

            <Station anchor={at28Ref} day={s28.day}>
              <div className="cr-day28 on-paper">
                <p className="eyebrow">{CASE_ROOM.day28.stamp}</p>
                <h3 className="cr-day28-title">{CASE_ROOM.day28.h3}</h3>
                <p className="cr-day28-body">{CASE_ROOM.day28.body}</p>
              </div>
            </Station>

            <div className="cr-close">
              <p className="cr-cta-line">{CASE_ROOM.day28.cta}</p>
              <DemoCTA onInk className="mt-5" />
            </div>
            <p className="cr-caption">{CASE_ROOM.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
