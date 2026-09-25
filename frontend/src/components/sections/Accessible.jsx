import { Scale, Calculator, Building } from 'lucide-react';

export const Accessible = () => {
  const audiences = [
    {
      icon: Scale,
      title: "Law Firms & Counsel",
      description: "Receive a chronology and a claim or reply whose every citation resolves to the source document."
    },
    {
      icon: Calculator,
      title: "Claims Consultants & Experts",
      description: "Build the narrative on contemporaneous records, and see who knew what, and when."
    },
    {
      icon: Building,
      title: "Contractors & In-House Counsel",
      description: "Turn the archives left by departed staff into a record your advisers can use."
    }
  ];

  return (
    <section 
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--vericase-bg-light)' }}
      data-testid="accessible-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 
          className="text-4xl lg:text-5xl font-bold text-center mb-16"
          style={{ color: 'var(--vericase-primary-dark)', fontFamily: "'Playfair Display', Georgia, serif" }}
          data-testid="accessible-heading"
        >
          Accessible for Every Dispute
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {audiences.map((audience, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
              data-testid={`audience-card-${index}`}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ 
                  backgroundColor: 'var(--vericase-bg-light)',
                  border: '1px solid var(--vericase-border)'
                }}
              >
                <audience.icon 
                  className="w-6 h-6"
                  style={{ color: 'var(--vericase-accent-teal)' }}
                />
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: 'var(--vericase-primary-dark)' }}
              >
                {audience.title}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--vericase-text-secondary)' }}
              >
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};