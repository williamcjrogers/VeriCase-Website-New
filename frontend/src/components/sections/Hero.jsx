import { Button } from '@/components/ui/button';
import { ProjectChronologyLens } from '../visuals/ProjectChronologyLens';

export const Hero = () => {
  return (
    <section 
      className="relative py-20 md:py-32"
      style={{ 
        backgroundColor: 'var(--vericase-bg-light)',
        backgroundImage: `
          repeating-linear-gradient(0deg, var(--vericase-surface) 0px, transparent 1px, transparent 20px),
          repeating-linear-gradient(90deg, var(--vericase-surface) 0px, transparent 1px, transparent 20px)
        `,
        backgroundSize: '20px 20px'
      }}
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content - Left */}
          <div className="lg:col-span-4 space-y-6" data-testid="hero-text">
            <p 
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--vericase-accent-teal)' }}
              data-testid="hero-caption"
            >
              PST EVIDENCE SYSTEM
            </p>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
              style={{ color: 'var(--vericase-primary-dark)' }}
              data-testid="hero-heading"
            >
              Make Time Your Ally, Not Your Enemy.
            </h1>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'var(--vericase-text-secondary)' }}
              data-testid="hero-description"
            >
              Construction and commercial disputes live in email. VeriCase transforms complex, fragmented PST data into a single, forensic, message-level chronology—so you can prove, price, and prevail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md px-8 py-6 text-base"
                style={{ backgroundColor: 'var(--vericase-accent-teal)' }}
                data-testid="hero-primary-cta"
              >
                See VeriCase in Action
              </Button>
              <Button 
                variant="outline"
                className="font-semibold transition-all duration-200 px-8 py-6 text-base"
                style={{ 
                  borderColor: 'var(--vericase-accent-teal)',
                  color: 'var(--vericase-accent-teal)'
                }}
                data-testid="hero-secondary-cta"
              >
                How It Works
              </Button>
            </div>
          </div>

          {/* Main Visual - Center */}
          <div className="lg:col-span-5" data-testid="hero-visual">
            <ProjectChronologyLens />
          </div>

          {/* Stats - Right */}
          <div className="lg:col-span-3 space-y-6" data-testid="hero-stats">
            <div 
              className="bg-white rounded-xl p-8 text-center shadow-sm"
              style={{ borderColor: 'var(--vericase-border)' }}
              data-testid="hero-stat-1"
            >
              <div 
                className="text-5xl lg:text-6xl font-extrabold mb-2"
                style={{ color: 'var(--vericase-accent-teal)' }}
              >
                80%
              </div>
              <p 
                className="text-sm"
                style={{ color: 'var(--vericase-text-secondary)' }}
              >
                Time wasted on manual PST analysis
              </p>
            </div>
            
            <div 
              className="bg-white rounded-xl p-8 text-center shadow-sm"
              style={{ borderColor: 'var(--vericase-border)' }}
              data-testid="hero-stat-2"
            >
              <div 
                className="text-5xl lg:text-6xl font-extrabold mb-2"
                style={{ color: 'var(--vericase-accent-teal)' }}
              >
                $
              </div>
              <p 
                className="text-sm"
                style={{ color: 'var(--vericase-text-secondary)' }}
              >
                Expensive per-GB eDiscovery fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};