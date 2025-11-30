import { Zap, Target, Clock, Users, FileText, Shield, Database, MessageSquare } from 'lucide-react';

export const ValuePropositions = () => {
  const values = [
    {
      icon: Zap,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      title: 'Extract Mass Data Instantly',
      description: 'Ingest years of records at the blink of an eye. No more manual sorting through endless files.'
    },
    {
      icon: Target,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      title: 'Build True Chronologies',
      description: 'Create forensic-grade timelines that nobody else can. Every email, every date, perfectly sequenced.'
    },
    {
      icon: Database,
      color: 'text-coral-500',
      bgColor: 'bg-coral-50',
      title: 'Intelligently Indexed',
      description: 'AI-powered indexing means you find what you need in seconds, not days.'
    },
    {
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      title: 'Respond to Rebuttals Quickly',
      description: 'High-paced adjudications demand speed. Auto-select relevant evidence and respond with confidence.'
    },
    {
      icon: Shield,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      title: 'Auto-Select Evidence',
      description: 'Let the system identify and surface the most relevant documents for your arguments.'
    },
    {
      icon: FileText,
      color: 'text-coral-500',
      bgColor: 'bg-coral-50',
      title: 'Uncover Contemporaneous Records',
      description: 'Access years of true, time-stamped records. Build your case on irrefutable evidence.'
    },
    {
      icon: MessageSquare,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      title: 'Team Collaboration Hub',
      description: 'Discuss heads of claims with your team. Comment, tag, and share insights in real-time.'
    },
    {
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      title: 'All in One Place',
      description: 'Auto-bundle, tag evidence, fileshare, and collaborate. Everything you need, unified.'
    }
  ];

  return (
    <section id="pricing" className="py-12 md:py-16 lg:py-20 bg-white" data-testid="value-props-section">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
            data-testid="value-props-heading"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What VeriCase Does <span className="text-gradient-teal">For You</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Built for legal professionals who need speed, precision, and intelligence in complex construction disputes.
          </p>
        </div>

        {/* Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group p-8 md:p-10 bg-gray-50 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-gray-200"
              data-testid={`value-card-${index}`}
            >
              <div className={`w-14 h-14 rounded-xl ${value.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className={`w-7 h-7 ${value.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};