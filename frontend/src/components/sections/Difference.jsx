import { Clock, Search, Target, Lock, FileDown, CheckCircle } from 'lucide-react';

export const Difference = () => {
  const features = [
    {
      icon: Clock,
      title: "The Chronology Lens™",
      description: "Our proprietary AI technology creates a single, court-ready timeline from millions of documents, automatically linking events, communications, and evidence.",
      benefits: [
        "Processes 50,000+ documents per hour",
        "99.7% accuracy in date extraction",
        "Automatic cross-reference linking"
      ]
    },
    {
      icon: Search,
      title: "Natural Language Intelligence",
      description: "Ask complex questions in plain English. Our AI understands construction terminology, legal concepts, and industry context to find exactly what you need.",
      benefits: [
        "Context-aware search results",
        "Multi-language support",
        "Semantic understanding"
      ]
    },
    {
      icon: Target,
      title: "Auto-Evidence Selection",
      description: "For any claim or defense, our AI automatically identifies and ranks the most relevant supporting documents from your entire repository.",
      benefits: [
        "Relevance scoring algorithm",
        "Missing evidence alerts",
        "Counter-argument detection"
      ]
    },
    {
      icon: Lock,
      title: "Forensic-Grade Security",
      description: "Court-admissible audit trails, blockchain verification, and military-grade encryption ensure your evidence remains tamper-proof and legally defensible.",
      benefits: [
        "ISO 27001 certified",
        "Complete audit trail",
        "Hash verification"
      ]
    },
    {
      icon: FileDown,
      title: "One-Click Reporting",
      description: "Generate expert reports, Scott Schedules, and court bundles automatically. Export in any format with complete references and appendices.",
      benefits: [
        "30+ report templates",
        "Auto-pagination & indexing",
        "CPR compliant formats"
      ]
    }
  ];

  return (
    <section 
      id="platform"
      className="py-12 sm:py-16 md:py-24 lg:py-32"
      style={{ backgroundColor: 'var(--vericase-bg-light)' }}
      data-testid="difference-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-gray-900"
            data-testid="difference-heading"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Dispute Intelligence From Day One
          </h2>
          <p 
            className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-gray-600"
            data-testid="difference-subtitle"
          >
            Moving beyond reactive analysis to proactive Lifecycle Intelligence. VeriCase captures patterns from project inception, creating continuous intelligence rather than retrospective analysis.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)] bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              data-testid={`feature-card-${index}`}
            >
              {/* Top gradient bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center mb-4 sm:mb-6">
                <feature.icon className="w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 text-teal-600" />
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Benefits list */}
              <div className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};