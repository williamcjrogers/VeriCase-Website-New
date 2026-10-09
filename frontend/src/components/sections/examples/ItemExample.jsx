import { AtSign, Mail, MessagesSquare, Tag } from 'lucide-react';
import { ITEM_EXAMPLE as I } from '@/content/examples';
import { useFigurePlay } from '../illustrationKit';
import { AppFrame } from './AppFrame';

// The evidence item: the email in full; beside it the tags, then a colleague mentioned, and the
// discussion that mention opens, its two messages in turn. Nothing is typed: after the kit's wait
// of 320 the tags, the mention, and each message take a turn of 380, the last settling 420 later;
// the duration adds 300.
const PARTS = 2 + I.messages.length;
export const ITEM_DURATION = 320 + (PARTS - 1) * 380 + 420 + 300;

export const ItemExample = ({ id = 'item-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: ITEM_DURATION });
  return (
    <AppFrame id={id} className="item-example" title={I.title} view={I.view} caption={I.caption} play={play} playClass={playClass} figureRef={ref}>
      <div className="item-grid">
        <article className="item-email app-card" aria-labelledby={`${id}-subject`}>
          <div className="item-email-subject">
            <span className="app-icon-tile"><Mail aria-hidden="true" /></span>
            <h4 id={`${id}-subject`} className="app-h">{I.subject}</h4>
          </div>
          <dl>
            <dt>From</dt><dd>{I.from}</dd>
            <dt>To</dt><dd>{I.to}</dd>
            <dt>Sent</dt><dd>{I.date}</dd>
          </dl>
          <div className="item-email-body">
            {I.body.map((p) => <p key={p}>{p}</p>)}
          </div>
        </article>
        <div className="item-side">
          <div className="item-panel app-card" data-appear style={{ '--i': 0 }}>
            <span className="app-label"><Tag aria-hidden="true" />{I.tagsLabel}</span>
            <ul className="app-row" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {I.tags.map((t) => <li key={t} className="item-chip">{t}</li>)}
            </ul>
          </div>
          <div className="item-panel app-card" data-appear style={{ '--i': 1 }}>
            <span className="app-label"><AtSign aria-hidden="true" />{I.mentionsLabel}</span>
            <span className="item-chip is-person">{I.mention}</span>
            <p className="item-note">{I.discussionNote}</p>
          </div>
          <div className="item-panel app-card" data-appear style={{ '--i': 2 }}>
            <span className="app-label"><MessagesSquare aria-hidden="true" />{I.discussionLabel}</span>
            <ol className="item-thread" role="list">
              {I.messages.map((m, k) => (
                <li key={m.who} className="item-msg" data-appear style={{ '--i': 2 + k }}>
                  <span className="item-avatar" aria-hidden="true">{m.initials}</span>
                  <span className="item-msg-who">{m.who}</span>
                  <p className="item-msg-text">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </AppFrame>
  );
};
