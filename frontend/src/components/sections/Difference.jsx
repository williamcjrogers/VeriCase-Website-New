import { FileSearch, Brain, Layers, FileText, Shield, Download } from 'lucide-react';

export const Difference = () => {
  const features = [
    {
      icon: FileSearch,
      title: "Chronology Lens™",
      description: "Visualize and analyze email timelines with unparalleled clarity."
    },
    {
      icon: Brain,
      title: "Smart Search & AI Filters",
      description: "Instantly find crucial evidence with advanced AI-powered search."
    },
    {
      icon: Layers,
      title: "Message-Level Granularity",
      description: "Examine individual messages for the forensic details that matter."
    },
    {
      icon: FileText,
      title: "Claim Authoring & Citations",
      description: "Build compelling narratives and cite evidence directly from the platform."
    },
    {
      icon: Shield,
      title: "Rebuttal & Opponent Analysis",
      description: "Quickly identify inconsistencies and strengthen your arguments."
    },
    {
      icon: Download,
      title: "Audit-Ready Exports",
      description: "Export your findings in a format ready for any legal proceeding."
    }
  ];

  return (
    <section 
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--vericase-bg-light)' }}
      data-testid="difference-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: 'var(--vericase-primary-dark)' }}
            data-testid="difference-heading"
          >
            The VeriCase Difference
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--vericase-text-secondary)' }}
            data-testid="difference-subtitle"
          >
            Streamline your eDiscovery process with unparalleled precision and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
              data-testid={`feature-card-${index}`}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ 
                  backgroundColor: 'var(--vericase-bg-light)',
                  border: '1px solid var(--vericase-border)'
                }}
              >
                <feature.icon 
                  className="w-6 h-6"
                  style={{ color: 'var(--vericase-accent-teal)' }}
                />
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: 'var(--vericase-primary-dark)' }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--vericase-text-secondary)' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};