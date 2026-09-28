import { createContext, useContext, useId, useRef } from 'react';
import { cn } from '@/lib/utils';

// Tabs for the app mocks, following the WAI-ARIA tabs pattern: arrow keys, Home and End move
// between tabs and select them. (ui/tabs.jsx cannot be used: @radix-ui/react-tabs is not
// installed.) Every panel stays mounted, so each tab keeps its state and aria-controls resolves.
const TabsContext = createContext(null);

export const MockTabs = ({ value, onValueChange, className, children }) => {
  const base = useId();
  return (
    <TabsContext.Provider value={{ value, onValueChange, base }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const KEYS = { ArrowRight: 1, ArrowLeft: -1 };

export const MockTabList = ({ label, className, children }) => {
  const ref = useRef(null);
  const onKeyDown = (e) => {
    const tabs = [...ref.current.querySelectorAll('[role="tab"]')];
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    let j = null;
    if (e.key in KEYS) j = (i + KEYS[e.key] + tabs.length) % tabs.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = tabs.length - 1;
    if (j === null) return;
    e.preventDefault();
    tabs[j].focus();
    tabs[j].click();
  };
  return (
    <div ref={ref} role="tablist" aria-label={label} className={className} onKeyDown={onKeyDown}>
      {children}
    </div>
  );
};

export const MockTab = ({ value, className, children }) => {
  const { value: current, onValueChange, base } = useContext(TabsContext);
  const selected = current === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${base}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${base}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      data-state={selected ? 'active' : 'inactive'}
      onClick={() => onValueChange(value)}
      className={className}
    >
      {children}
    </button>
  );
};

export const MockTabPanel = ({ value, className, children }) => {
  const { value: current, base } = useContext(TabsContext);
  const selected = current === value;
  return (
    <div
      role="tabpanel"
      id={`${base}-panel-${value}`}
      aria-labelledby={`${base}-tab-${value}`}
      hidden={!selected}
      data-state={selected ? 'active' : 'inactive'}
      className={cn(className, !selected && 'hidden')}
    >
      {children}
    </div>
  );
};
