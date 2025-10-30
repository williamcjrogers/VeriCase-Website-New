import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Records',
      description: 'Drag and drop PST files, emails, documents, and project data. VeriCase ingests everything instantly.'
    },
    {
      number: '02',
      title: 'Intelligent Processing',
      description: 'Our AI indexes, tags, and organizes every record. Building a forensic chronology in minutes.'
    },
    {
      number: '03',
      title: 'Review & Collaborate',
      description: 'Navigate your timeline, auto-select evidence, and discuss claims with your team—all in one platform.'
    },
    {
      number: '04',
      title: 'Win Your Case',
      description: 'Export evidence bundles, respond to rebuttals rapidly, and present irrefutable chronologies.'
    }
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50" data-testid="how-it-works-section" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-3 md:space-y-4">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
            data-testid="how-it-works-heading"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How VeriCase <span className="text-gradient-teal">Works</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From data chaos to courtroom clarity in four simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-12 md:mb-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative"
              data-testid={`step-card-${index}`}
            >
              {/* Connecting line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-5 w-10 h-0.5 bg-gradient-to-r from-teal-400 to-teal-200"></div>
              )}
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-teal mb-3 sm:mb-4 md:mb-6">{step.number}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            className="font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl px-6 sm:px-8 md:px-10 py-4 sm:py-6 md:py-7 text-base sm:text-lg group"
            style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
            data-testid="how-it-works-cta"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};