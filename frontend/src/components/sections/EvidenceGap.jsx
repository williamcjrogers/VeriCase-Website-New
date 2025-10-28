export const EvidenceGap = () => {
  return (
    <section className="py-24 lg:py-32 bg-white" data-testid="evidence-gap-section">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 
          className="text-4xl lg:text-5xl font-bold mb-8"
          style={{ color: 'var(--vericase-primary-dark)' }}
          data-testid="evidence-gap-heading"
        >
          The Evidence Gap in Modern Disputes
        </h2>
        <p 
          className="text-lg leading-relaxed"
          style={{ color: 'var(--vericase-text-secondary)' }}
          data-testid="evidence-gap-description"
        >
          Construction and commercial disputes live in email. VeriCase transforms complex, fragmented PST data 
          into a single, forensic, message-level chronology—so you can prove, price, and prevail. PST data is 
          chaotic, and existing platforms are either too complex and costly, or they miss the critical forensic 
          detail needed to build a winning case.
        </p>
      </div>
    </section>
  );
};