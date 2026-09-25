import { useRef } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// A single-choice shadcn ToggleGroup. Radix gives its items the radio role but only moves focus
// on the arrow keys; here an arrow key also chooses, as a radio group should. Radix moves focus
// just after the keydown, so an item focused within 250 ms of an arrow key is chosen. `options`
// is a list of [value, label]; `children` render inside the group (the Lens band of the view).
export const ChoiceToggle = ({ value, onChange, options, label, labelledBy, className, itemClassName, children, ...rest }) => {
  const arrowAt = useRef(-Infinity);
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v)}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={className}
      {...rest}
      onKeyDownCapture={(e) => {
        if (/^(Arrow(Left|Right|Up|Down)|Home|End)$/.test(e.key)) arrowAt.current = e.timeStamp;
      }}
    >
      {children}
      {options.map(([v, text]) => (
        <ToggleGroupItem key={v} value={v} className={itemClassName} onFocus={(e) => e.timeStamp - arrowAt.current < 250 && onChange(v)}>
          {text}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
