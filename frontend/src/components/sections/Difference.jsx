import { Clock, Search, Target, Hash, FileDown, CheckCircle } from 'lucide-react';

export const Difference = () => {
  const features = [
    {
      icon: Clock,
      title: "The Chronology Lens™",
      description: "Brings thousands of email threads, documents and attachments into one time-ordered chronology across every participant, with each entry linked to its source.",
      benefits: [
        "Processes 50,000+ documents per hour*",
        "99.7% accuracy in date extraction*",
        "Every entry linked to its source"
      ]
    },
    {
      icon: Search,
      title: "Research With Citations",
      description: "Ask a question of the record in plain English and receive a report in which every point is cited to the emails and documents it relies on.",
      benefits: [
        "Numbered citations to source",
        "A Query Plan shows what was understood",
        "Create a bundle from the citations"
      ]
    },
    {
      icon: Target,
      title: "Claims and Rebuttal",
      description: "Structure Heads of Claim with citations linked to the evidence by message ID. In Rebuttal Mode, the opponent's submission is divided into numbered points, each paired with suggested evidence.",
      benefits: [
        "Heads of Claim structure",
        "Citations by message ID",
        "Opposing points answered in turn"
      ]
    },
    {
      icon: Hash,
      title: "Evidential Integrity",
      description: "Each item is hashed when it is ingested and every action on it is recorded, so its provenance can be shown if authenticity is challenged. Admissibility and weight remain matters for the tribunal.",
      benefits: [
        "Cryptographic hash on ingestion",
        "Complete audit trail",
        "Role-based access"
      ]
    },
    {
      icon: FileDown,
      title: "Bundles and Exports",
      description: "Create evidence bundles from search results or a research report, with a manifest listing the message ID, hash and source path of every item.",
      benefits: [
        "Bundles from cited results",
        "Manifest of IDs, hashes and paths",
        "Duplicates removed before review"
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
            What VeriCase Does
          </h2>
          <p 
            className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-gray-600"
            data-testid="difference-subtitle"
          >
            VeriCase ingests a project's correspondence and documents, brings every thread into one order of events, and lets your team research, draft and rebut with every point cited to its source.
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
                <feature.icon className="w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 text-teal-600" aria-hidden="true" />
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
        <p className="mt-8 text-center text-xs text-gray-500" data-testid="benchmark-note">
          * Internal benchmark by VeriCase; test conditions are available on request.
        </p>
      </div>
    </section>
  );
};