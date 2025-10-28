import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section 
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #E6F7F7 0%, #FFFFFF 100%)'
      }}
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-8 md:space-y-10" data-testid="hero-text">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-gray-700">Records, Records... VeriCase</span>
            </div>
            
            {/* Main Headline */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-gray-900"
              data-testid="hero-heading"
            >
              Make Time Your <span className="text-gradient-teal">Ally</span>, Not Your Enemy.
            </h1>
            
            {/* Subheadline */}
            <p 
              className="text-xl md:text-2xl font-semibold text-teal-600"
              data-testid="hero-subheadline"
            >
              From Chaos to Clarity in Construction Disputes
            </p>
            
            {/* Description */}
            <p 
              className="text-lg leading-relaxed text-gray-600 max-w-2xl"
              data-testid="hero-description"
            >
              Extract mass data instantly. Build true chronologies nobody else can. Respond to rebuttals 
              with auto-selected evidence. Uncover years of contemporaneous records—all in one intelligent platform.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl px-10 py-7 text-lg group"
                style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
                data-testid="hero-primary-cta"
              >
                See VeriCase in Action
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="font-semibold border-2 border-teal-600 text-teal-600 hover:bg-teal-50 transition-all duration-200 px-10 py-7 text-lg"
                data-testid="hero-secondary-cta"
              >
                How It Works
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>Instant Deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-coral-500 rounded-full"></div>
                <span>UK-Based Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Visual - Chronology Lens Image */}
          <div className="relative" data-testid="hero-visual">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://customer-assets.emergentagent.com/job_smart-evidence/artifacts/vly647vf_ChronologyLens1jpg.jpg"
                alt="VeriCase Chronology Lens - Transform fragmented data into clear timelines"
                className="w-full h-auto"
              />
              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/10 to-transparent"></div>
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-200">
              <div className="text-4xl font-bold text-teal-600 mb-1">80%</div>
              <div className="text-sm text-gray-600">Faster evidence review</div>
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-200">
              <div className="text-4xl font-bold text-coral-500 mb-1">£M</div>
              <div className="text-sm text-gray-600">Saved in disputes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};