import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Keep the full explanation in the page; phones can open the detail as needed.
// Desktop and print layouts always show the content.
export const MobileDetails = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="mobile-details" data-open={open}>
      <button type="button" className="mobile-details-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span>{label}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      <div id={id} className="mobile-details-content">{children}</div>
    </div>
  );
};
