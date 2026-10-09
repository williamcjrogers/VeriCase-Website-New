import { Activity, FolderOpen, Layers, MessagesSquare, Search, Upload, Package } from 'lucide-react';
import { EXAMPLE_LABEL, PROJECT, RAIL } from '@/content/examples';
import { cn } from '@/lib/utils';
import { Replay } from '../illustrationKit';
import './app-example.css';

const RAIL_ICONS = {
  'Chronology Lens': Layers,
  Research: Search,
  'Add Evidence': Upload,
  Bundles: Package,
  Collaboration: MessagesSquare,
  'Activity Log': Activity,
};

// The frame every app example shares: kicker, title, then the example as the application shows
// it, in a window with the project named in its bar and the application's navigation beside it
// (from 768 px), the example's own view marked. It plays once in view, as the live illustrations do
// (illustrationKit), and holds its end state for reduced motion, print and pages without script.
// The controls drawn in it are pictures of controls, not controls: plain text, never focusable.
export const AppFrame = ({ id, className, title, view, caption, play, playClass, figureRef, style, children }) => (
  <figure ref={figureRef} tabIndex={-1} className={cn('evidence-figure live-figure app-example', className, playClass)} aria-labelledby={`${id}-title`} style={style}>
    <p className="section-kicker">{EXAMPLE_LABEL}</p>
    <h3 id={`${id}-title`} className="evidence-figure-title text-[1.625rem] leading-tight">{title}</h3>
    <div className="app-window">
      <div className="app-bar">
        <span className="app-dots" aria-hidden="true"><span /><span /><span /></span>
        <span className="app-mark" aria-hidden="true">V</span>
        <span className="app-project"><FolderOpen aria-hidden="true" />{PROJECT}</span>
        <span className="app-bar-view">{view}</span>
      </div>
      <div className="app-body">
        <ul className="app-rail" aria-label="Application sections">
          {RAIL.map((name) => {
            const Icon = RAIL_ICONS[name];
            return (
              <li key={name} className={cn(name === view && 'is-current')} aria-current={name === view ? 'page' : undefined}>
                <Icon aria-hidden="true" />{name}
              </li>
            );
          })}
        </ul>
        <div className="app-main">{children}</div>
      </div>
    </div>
    <figcaption><span>{caption}</span><Replay play={play} describedBy={`${id}-title`} /></figcaption>
  </figure>
);

// A drawn button: how the application labels the action, not an action on this page.
export const AppButton = ({ icon: Icon, primary, children, className, ...rest }) => (
  <span className={cn('app-btn', primary && 'is-primary', className)} {...rest}>
    {Icon && <Icon aria-hidden="true" />}{children}
  </span>
);

export const Badge = ({ children, tone }) => <span className={cn('app-badge', tone && `is-${tone}`)}>{children}</span>;
