import { Fragment } from 'react';
import { DISCUSSION_ILLUSTRATION, EVIDENCE_ILLUSTRATION } from '@/content/marketing';
import { LiveFigure, Typed, keepDates, typedMs, useFigurePlay } from './illustrationKit';
import './discussion-illustration.css';

// Discussion: the record under discussion lies on the panel as paper from the start, its
// attribution beneath the quoted words, and a brass thread runs from it to the comments on it.
// The first comment is typed in front of the reader under its author's role; the thread is then
// drawn on down to the reply, which arrives at its end as paper. Roles, not people: no mentions,
// notifications or avatars. The figure is mounted once, inside the phone disclosure that wider
// screens keep open, so `play` is only passed when two copies must share one performance.
//
// The sequence, in ms from the start (discussion-illustration.css sets the rhythm): the question
// is typed by 1652 (48 characters at the kit's pace); 440 later the thread is drawn on towards
// the reply, down and then across, over 560; the reply appears one step of 360 after the thread
// starts, as the thread turns towards it, and has settled 420 later, at
// 1652 + 440 + 360 + 420 = 2872; the duration adds 300.
export const DISCUSSION_DURATION = 3172;

// The reply is set a sentence to a line (the answer, then what rests on it), and a paragraph
// reference is never split from its number at a line's end. The words and spaces are unchanged.
// A plain split, then each full stop restored: a lookbehind would stop the whole bundle parsing
// on Safari before 16.4, which the production browser list still includes.
const sentences = (text) => {
  const parts = text.replace(/\b(Paragraph) (\d)/g, '$1\u00a0$2').split('. ');
  return parts.map((part, k) => (k < parts.length - 1 ? `${part}.` : part));
};

export const DiscussionIllustration = ({ id = 'discussion-illustration', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: DISCUSSION_DURATION });
  const D = DISCUSSION_ILLUSTRATION;
  const record = EVIDENCE_ILLUSTRATION[D.recordIndex];
  const [question, reply] = D.comments;
  const ms = typedMs(question.text);
  return (
    <LiveFigure id={id} className="discussion-illustration" title={D.title} caption={D.caption} play={play} playClass={playClass} figureRef={ref} style={{ '--typed-ms': `${ms}ms` }}>
      <div className="discussion-stage">
        {/* The record: a quotation, with its attribution outside the quoted words. */}
        <div className="discussion-record on-paper">
          <blockquote className="discussion-quote">
            <p className="text-body">“{keepDates(record.excerpt)}”</p>
          </blockquote>
          <p className="discussion-attribution text-small text-graphite">{record.document}, {keepDates(record.date)}</p>
        </div>
        {/* The heading introduces the list; the list is not labelled again, so it is announced once. */}
        <h4 className="live-prompt-label discussion-label">{D.commentsLabel}</h4>
        <ol className="discussion-thread" role="list">
          {/* The comment typed in front of the reader, under its author's role. */}
          <li className="discussion-comment discussion-question">
            <p className="discussion-role">{question.role}</p>
            <p className="discussion-question-text"><Typed className="live-prompt-line" text={question.text} play={play} /></p>
          </li>
          {/* The reply, as paper, at the end of the thread (drawn by the item's ::before). */}
          <li className="discussion-comment discussion-answer">
            <div className="discussion-reply on-paper" data-appear style={{ '--i': 1 }}>
              <p className="discussion-role text-graphite">{reply.role}</p>
              <p className="discussion-reply-text">
                {sentences(reply.text).map((sentence, k) => (
                  <Fragment key={sentence}>{k > 0 && ' '}<span className="discussion-sentence">{sentence}</span></Fragment>
                ))}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </LiveFigure>
  );
};
