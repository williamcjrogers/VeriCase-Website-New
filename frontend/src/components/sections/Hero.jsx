import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-white"
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* PST Evidence System Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">The Evidence Intelligence Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-gray-900">
              Turn Years of Evidence Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Winning Arguments</span> in Minutes
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-2xl">
              VeriCase transforms how construction disputes are won. Our AI processes millions of documents, emails, and data points to build forensic-grade chronologies that prove your case beyond doubt.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-black text-teal-600">40%</div>
                <div className="text-sm text-gray-600 mt-1">of disputes fail due to poor documentation</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-black text-teal-600">£7.8bn</div>
                <div className="text-sm text-gray-600 mt-1">Annual UK construction disputes</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-black text-teal-600">14.8mo</div>
                <div className="text-sm text-gray-600 mt-1">Average resolution time</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl px-10 py-7 text-lg group bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
              >
                See Live Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-teal-600 hover:text-teal-600 transition-all duration-200 px-10 py-7 text-lg"
              >
                Calculate Your ROI
              </Button>
            </div>
          </div>

          {/* Right Visual - Chronology Lens */}
          <div>
            {/* Chronology Lens Box */}
            <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">The Chronology Lens™ Live</h3>
                <p className="text-sm text-gray-600 mt-1">Processing real construction data</p>
              </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Input Sources */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Evidence</p>
                <div className="space-y-2">
                  <div className="px-3 py-2 bg-gray-100 rounded text-xs text-gray-700 font-medium">
                    <span className="text-teal-600">📧</span> 47,832 Emails
                  </div>
                  <div className="px-3 py-2 bg-gray-100 rounded text-xs text-gray-700 font-medium">
                    <span className="text-teal-600">📄</span> 3,421 Contracts
                  </div>
                  <div className="px-3 py-2 bg-gray-100 rounded text-xs text-gray-700 font-medium">
                    <span className="text-teal-600">📊</span> 892 Site Reports
                  </div>
                  <div className="px-3 py-2 bg-gray-100 rounded text-xs text-gray-700 font-medium">
                    <span className="text-teal-600">📷</span> 12,453 Photos
                  </div>
                  <div className="px-3 py-2 bg-gray-100 rounded text-xs text-gray-700 font-medium">
                    <span className="text-teal-600">🔧</span> P6 Schedule
                  </div>
                </div>
              </div>
              
              {/* ChronoLens Vertical in the middle */}
              <div className="flex flex-col items-center justify-center">
                <img 
                  src="/ChronoLensVertical.jpg" 
                  alt="The Chronology Lens Process" 
                  className="h-64 w-auto"
                />
              </div>
              
              {/* Timeline Output */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Forensic Timeline</p>
                <div className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-blue-500"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-teal-500 rounded-full shadow-sm"></div>
                      <div className="px-3 py-1 bg-teal-50 border border-teal-200 rounded text-xs font-medium">Jan 12 — Contract Var CV-042</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-teal-500 rounded-full shadow-sm"></div>
                      <div className="px-3 py-1 bg-teal-50 border border-teal-200 rounded text-xs font-medium">Jan 28 — Weather Event</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-teal-500 rounded-full shadow-sm"></div>
                      <div className="px-3 py-1 bg-teal-50 border border-teal-200 rounded text-xs font-medium">Feb 15 — Design RFI-2134</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                      <div className="px-3 py-1 bg-red-50 border border-red-200 rounded text-xs font-medium">Mar 03 — Critical Path Impact</div>
                    </div>
                  </div>
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