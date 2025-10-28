import { Check } from 'lucide-react';

export const Benefits = () => {
  const benefits = [
    {
      category: 'For Law Firms',
      items: [
        'Win more cases with bulletproof chronologies',
        'Reduce billable hours on evidence review',
        'Impress clients with rapid turnaround',
        'Collaborate seamlessly across teams'
      ]
    },
    {
      category: 'For Claims Consultants',
      items: [
        'Build irrefutable quantum claims',
        'Access contemporaneous records instantly',
        'Auto-bundle evidence for submissions',
        'Track project evolution forensically'
      ]
    },
    {
      category: 'For Contractors',
      items: [
        'Defend against unfair claims',
        'Document project delays accurately',
        'Respond to variations with evidence',
        'Protect margins with solid records'
      ]
    }
  ];

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white" data-testid="benefits-section">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 space-y-4 md:space-y-6">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
            data-testid="benefits-heading"
          >
            Built For <span className="text-gradient-teal">Every Dispute</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're defending, claiming, or consulting—VeriCase delivers the evidence advantage.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200 hover:border-teal-200 hover:shadow-lg transition-all duration-300"
              data-testid={`benefit-card-${index}`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{benefit.category}</h3>
              <ul className="space-y-4">
                {benefit.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};