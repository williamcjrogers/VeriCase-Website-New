import { Lock, Mail, Users } from 'lucide-react';
import { LANES_EXAMPLE as L } from '@/content/examples';
import { useFigurePlay } from '../illustrationKit';
import { AppFrame } from './AppFrame';

// Collaboration, lanes: the email at the top, then each lane in turn with its members and its
// messages. Nothing is typed: after the kit's wait of 320 each lane takes a turn of 380, the last
// settling 420 later, and the note follows; the duration adds 300.
export const LANES_DURATION = 320 + L.lanes.length * 380 + 420 + 300;

export const LanesExample = ({ id = 'lanes-example', play: shared, headingAs = 'h3' }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: LANES_DURATION });
  return (
    <AppFrame id={id} headingAs={headingAs} className="lanes-example" title={L.title} view={L.view} caption={L.caption} play={play} playClass={playClass} figureRef={ref}>
      <p className="lanes-record app-card">
        <span className="app-icon-tile"><Mail aria-hidden="true" /></span>
        <span className="lanes-record-subject">{L.record.subject}</span>
        <span className="app-quiet">{L.record.date}</span>
      </p>
      <ol className="lanes" role="list">
        {L.lanes.map((lane, k) => (
          <li key={lane.name} className="lane app-card" data-appear style={{ '--i': k }}>
            <p className="lane-name app-h">{lane.name}</p>
            <p className="lane-members"><Users aria-hidden="true" /><span className="sr-only">{L.membersLabel}: </span>{lane.members.join(', ')}</p>
            <ol className="item-thread" role="list">
              {lane.messages.map((m) => (
                <li key={m.text} className="item-msg">
                  <span className="item-avatar" aria-hidden="true">{m.initials}</span>
                  <span className="item-msg-who">{m.who}</span>
                  <p className="item-msg-text">{m.text}</p>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <p className="lanes-note" data-appear style={{ '--i': L.lanes.length }}><Lock aria-hidden="true" />{L.note}</p>
    </AppFrame>
  );
};
