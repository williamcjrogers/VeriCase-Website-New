import { Clock, PoundSterling, FileText, TrendingDown, Database, FileSpreadsheet, Image, MessageCircle, FileX } from 'lucide-react';

export const EvidenceGap = () => {
  const documentTypes = [
    { name: 'PST Archives', icon: Database, bgColor: '#EEF2F8', iconColor: '#5B7C99' },
    { name: 'Excel Sheets', icon: FileSpreadsheet, bgColor: '#E8F5E9', iconColor: '#689F7A' },
    { name: 'PDF Reports', icon: FileText, bgColor: '#FAF5F0', iconColor: '#A68B6E' },
    { name: 'Email Threads', icon: MessageCircle, bgColor: '#F3F0F8', iconColor: '#8B7AA6' },
    { name: 'Site Photos', icon: Image, bgColor: '#FFF0F5', iconColor: '#B5848C' },
    { name: 'CAD Files', icon: FileX, bgColor: '#F8F5EE', iconColor: '#C19B6C' },
    { name: 'Contracts', icon: FileText, bgColor: '#E8F7F5', iconColor: '#6B9B94' },
    { name: 'WhatsApp', icon: MessageCircle, bgColor: '#E6F4EA', iconColor: '#7A9F84' },
    { name: 'Meeting Minutes', icon: FileText, bgColor: '#F5F5F8', iconColor: '#8A8AA6' }
  ];

  return (
    <section className="py-16 lg:py-20 bg-white" data-testid="evidence-gap-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Problem Visualization */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-3">
              {documentTypes.map((item, index) => (
                <div 
                  key={item.name}
                  className="relative rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <div className="relative z-10">
                    <div 
                      className="w-11 h-11 mx-auto mb-2 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.iconColor}15` }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: item.iconColor }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 block">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Problem Statement */}
          <div>
            <h2 
              className="text-4xl lg:text-5xl font-black mb-6 text-gray-900 leading-tight"
              data-testid="evidence-gap-heading"
            >
              The Hidden Cost of Fragmented Evidence in Construction Disputes
            </h2>
            <p 
              className="text-lg lg:text-xl leading-relaxed text-gray-600 mb-8"
              data-testid="evidence-gap-description"
            >
              With construction disputes averaging £5.2 million and taking over a year to resolve, 
              the ability to quickly find and present compelling evidence is critical. Yet most 
              firms still rely on manual processes that miss vital connections.
            </p>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-5 border border-teal-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-teal-600">14.8 Months</div>
                    <div className="text-xs text-gray-600 mt-1">Average resolution time</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-5 border border-teal-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <PoundSterling className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-teal-600">£5.2M</div>
                    <div className="text-xs text-gray-600 mt-1">Average dispute value</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <TrendingDown className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-blue-600">68%</div>
                    <div className="text-xs text-gray-600 mt-1">Document-intensive delays</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-blue-600">40%</div>
                    <div className="text-xs text-gray-600 mt-1">Fail due to poor docs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};