import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();
  
  return (
      <section
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-white"
        data-testid="hero-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* PST Evidence System Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">The Evidence Intelligence Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900" style={{ letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Transform Complex Evidence Into <span style={{ color: '#8B7355', fontStyle: 'italic', fontWeight: 700 }}>Compelling Legal Arguments</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto lg:mx-0">
              VeriCase approaches the evidence crisis differently. We don't just manage documents; we reconstruct truth. Where others see data graveyards, we see evidence goldmines. Our forensic-grade AI transforms scattered records into winning legal strategies.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-teal-600">91%</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Projects delayed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-teal-600">£13bn</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Annual industry loss</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-teal-600">3-4yr</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Dispute lifecycle</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl px-6 sm:px-10 py-4 sm:py-7 text-base sm:text-lg group"
                style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)' }}
                onClick={() => window.open('https://files.veri-case.com', '_blank')}
              >
                Access Secure Portal
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Visual - Chronology Lens */}
          <div className="mt-8 lg:mt-0">
            {/* Chronology Lens Box - Hidden on mobile, shown on tablet and up */}
            <div className="hidden md:block relative bg-white rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 border border-gray-200">
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-base md:text-lg lg:text-xl flex items-baseline justify-center gap-1">
                      <span className="italic" style={{ color: '#666666', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}>The</span>
                      <span style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}>Chronology</span>
                      <span style={{ color: '#0066cc', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700 }}>Lens</span>
                      <span style={{ color: '#666666', fontSize: '0.6em', verticalAlign: 'super', position: 'relative', top: '-0.2em', fontWeight: 600 }}>™</span>
                      <span className="ml-2" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}>Live</span>
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Processing real construction data</p>
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
                      <div className="px-3 py-1 bg-red-50 border border-red-200 rounded text-xs font-medium">Mar 03 — Variation Instruction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            
            {/* Mobile version - Simplified */}
            <div className="block md:hidden relative bg-white rounded-xl shadow-lg p-4 border border-gray-200 mt-6">
              <div className="text-center mb-4">
                <h3 className="text-sm flex items-baseline justify-center gap-1">
                  <span className="italic" style={{ color: '#666666', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}>The</span>
                  <span style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}>Chronology</span>
                  <span style={{ color: '#0066cc', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700 }}>Lens</span>
                  <span style={{ color: '#666666', fontSize: '0.6em', verticalAlign: 'super', position: 'relative', top: '-0.2em', fontWeight: 600 }}>™</span>
                </h3>
              </div>
              
              <div className="flex items-center justify-around gap-2 text-center">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-teal-600 mb-1">47K+</div>
                  <div className="text-[10px] text-gray-600">Documents</div>
                </div>
                <div className="text-teal-500">→</div>
                <div className="flex-1">
                  <img 
                    src="/ChronoLensVertical.jpg" 
                    alt="Process" 
                    className="h-16 w-auto mx-auto opacity-80"
                  />
                </div>
                <div className="text-teal-500">→</div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-teal-600 mb-1">1</div>
                  <div className="text-[10px] text-gray-600">Timeline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};