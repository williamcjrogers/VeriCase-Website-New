import { LANES_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, keepDates, useFigurePlay } from './illustrationKit';
import './lanes-illustration.css';

// Lanes (owner, 06 October 2026): the record the discussion figure shows, discussed in three
// lanes, each naming the roles taking part. Nothing is typed: the figure shows how the discussion
// is organised, and claims nothing about who may read a lane. The record lies on the panel as
// paper from the start; a brass trunk runs down from it and branches into the lanes (side by side
// on a wide panel, stacked down one spine on a narrow one); the label appears, the branch is
// drawn, and each lane opens in turn with its participants and its comments, as paper. Reduced
// motion, print and pages without the script show every lane open.
//
// The sequence, in ms from the start (lanes-illustration.css sets the rhythm): the label at the
// kit's 320; each lane takes a turn of 640, so the third opens at 320 + 3 x 640 = 2240 and has
// settled 420 later, at 2660; the duration adds 300.
export const LANES_DURATION = 2960;

// "the solicitor and counsel"; "the project manager, commercial manager and solicitor".
export const audienceOf = (roles) => {
  const names = roles.map((role) => role.charAt(0).toLowerCase() + role.slice(1));
  return names.length < 2 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
};

export const LanesIllustration = ({ id = 'lanes-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: LANES_DURATION });
  const L = LANES_ILLUSTRATION;
  const record = L.sources.find((source) => source.id === L.record);
  return (
    <LiveFigure id={id} className="lanes-illustration" title={L.title} caption={L.caption} play={play} playClass={playClass} figureRef={ref}>
      <div className="lanes-stage">
        {/* The record, as the discussion figure shows it: a quotation, with its attribution outside
            the quoted words. */}
        <div className="lanes-record on-paper">
          <blockquote className="lanes-quote">
            <p className="text-body">“{keepDates(record.excerpt)}”</p>
          </blockquote>
          <p className="lanes-attribution text-small text-graphite">{record.document}, {keepDates(record.date)}</p>
        </div>
        <h4 className="live-output-label lanes-label" data-appear style={{ '--i': 0 }}>{L.lanesLabel}</h4>
        <ol className="lanes" role="list">
          {L.lanes.map((lane, i) => (
            <li key={lane.id} className="lane" data-appear style={{ '--i': i + 1 }}>
              <h5 id={`${id}-${lane.id}`} className="lane-name">{lane.name}</h5>
              <p className="lane-audience">{L.audienceLead} the {audienceOf(lane.audience)}.</p>
              <ul className="lane-comments" role="list" aria-labelledby={`${id}-${lane.id}`}>
                {lane.comments.map((comment) => (
                  <li key={comment.text} className="lane-comment on-paper">
                    <p className="lane-role text-graphite">{comment.role}</p>
                    <p className="lane-text">{keepDates(comment.text)}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </LiveFigure>
  );
};
