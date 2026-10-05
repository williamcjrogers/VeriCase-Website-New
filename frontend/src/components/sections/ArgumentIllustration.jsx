import { Fragment } from 'react';
import { ARGUMENT_ILLUSTRATION, EVIDENCE_ILLUSTRATION, ILLUSTRATION_LABEL } from '@/content/marketing';
import { cn } from '@/lib/utils';
import { useFigurePlay } from './illustrationKit';

// In running text a date is never split across lines ("03 March 2025").
const keepDates = (text) => text.replace(/(\d{2}) ([A-Z][a-z]+) (\d{4})/g, '$1\u00a0$2\u00a0$3');

export const ARGUMENT_DURATION = 2500;

// The point beside the records it cites. Once in view, in turn, each citation and its record are
// highlighted together and a brass rule is drawn beside the record. The rules stay drawn.
export const ArgumentIllustration = ({ id = 'argument-illustration', play }) => {
  const [ref, playClass] = useFigurePlay(play);
  return (
    <figure className={cn('evidence-figure argument-illustration', playClass)} aria-labelledby={`${id}-title`}>
      <div className="evidence-argument">
        <p className="section-kicker">{ILLUSTRATION_LABEL}</p>
        <h3 id={`${id}-title`} className="evidence-figure-title text-[1.625rem] leading-tight">{ARGUMENT_ILLUSTRATION.title}</h3>
        <p className="evidence-argument-text text-body">
          {ARGUMENT_ILLUSTRATION.points.map((point, i) => (
            <Fragment key={EVIDENCE_ILLUSTRATION[i].id}>
              {i > 0 && ' '}
              {keepDates(point)}{' '}
              <span className="evidence-cite" style={{ '--i': i }}>({EVIDENCE_ILLUSTRATION[i].document})</span>.
            </Fragment>
          ))}
        </p>
      </div>
      <div ref={ref} className="evidence-sources">
        <h4 className="capability-feature-title">{ARGUMENT_ILLUSTRATION.sourcesLabel}</h4>
        {EVIDENCE_ILLUSTRATION.map((source, i) => (
          <figure className="evidence-source" key={source.id} style={{ '--i': i }}>
            <blockquote>
              <p className="text-body">“{keepDates(source.excerpt)}”</p>
            </blockquote>
            <figcaption className="text-small text-graphite">{source.document}, {keepDates(source.date)}</figcaption>
          </figure>
        ))}
      </div>
      <figcaption>{ARGUMENT_ILLUSTRATION.caption}</figcaption>
    </figure>
  );
};

