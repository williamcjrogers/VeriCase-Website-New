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
    <section className="py-12 sm:py-16 lg:py-20 bg-white" data-testid="evidence-gap-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left: Problem Visualization */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {documentTypes.map((item, index) => (
                <div 
                  key={item.name}
                  className="relative rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <div className="relative z-10">
                    <div 
                      className="w-8 h-8 sm:w-10 md:w-11 sm:h-10 md:h-11 mx-auto mb-1 sm:mb-2 rounded-md sm:rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.iconColor}15` }}
                    >
                      <item.icon className="w-4 h-4 sm:w-5 md:w-6 sm:h-5 md:h-6" style={{ color: item.iconColor }} />
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-800 block leading-tight">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Problem Statement */}
          <div className="order-1 lg:order-2">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-gray-900 leading-tight"
              data-testid="evidence-gap-heading"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The £13 Billion Evidence Crisis
            </h2>
            <p 
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 mb-6 sm:mb-8 italic border-l-4 border-teal-500 pl-4"
              data-testid="evidence-gap-description"
            >
              "A £50 million claim lands on your desk. The project spanned six years. Half the original team has moved on. The evidence that will determine victory or defeat is scattered across thousands of locations. You have 90 days."
            </p>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg sm:rounded-xl p-3 sm:p-5 border border-teal-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Clock className="w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-teal-600">91%</div>
                    <div className="text-[10px] sm:text-xs text-gray-600">Projects delayed</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg sm:rounded-xl p-3 sm:p-5 border border-teal-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <PoundSterling className="w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-teal-600">£27.7M</div>
                    <div className="text-[10px] sm:text-xs text-gray-600">Avg dispute value</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl p-3 sm:p-5 border border-blue-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <TrendingDown className="w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-blue-600">80%</div>
                    <div className="text-[10px] sm:text-xs text-gray-600">Litigation cost is review</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl p-3 sm:p-5 border border-blue-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-blue-600">3M+</div>
                    <div className="text-[10px] sm:text-xs text-gray-600">Emails per project</div>
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