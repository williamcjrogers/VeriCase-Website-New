import { ArrowRight, FileText, Mail } from 'lucide-react';

// A compact echo of the interactive paper illustration, not a second miniature interface.
// The full result and its readable passages follow directly below in the application example.
export const LensOverview = () => (
  <div className="lens-overview" aria-label="From scattered correspondence to matching passages with their sources">
    <div className="lens-overview-records" aria-hidden="true">
      <span><Mail />Emails</span>
      <span><FileText />Attachments</span>
      <span><FileText />Project records</span>
    </div>
    <ArrowRight className="lens-overview-arrow" aria-hidden="true" />
    <div className="lens-overview-process">
      <span className="lens-overview-wordmark">VeriCase</span>
      <span>Connect. Order. Find.</span>
    </div>
    <ArrowRight className="lens-overview-arrow" aria-hidden="true" />
    <div className="lens-overview-result">
      <span>Matching passages</span>
      <span>Linked to their sources</span>
    </div>
  </div>
);
