import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GanttChart } from '../visuals/GanttChart';

export const ConstructionAddIn = () => {
  return (
    <section 
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--vericase-primary-dark)' }}
      data-testid="construction-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content - Left */}
          <div className="space-y-6" data-testid="construction-content">
            <p 
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--vericase-accent-teal)' }}
            >
              THE CONSTRUCTION ADD-IN
            </p>
            <h2 
              className="text-4xl lg:text-5xl font-bold leading-tight text-white"
            >
              Built for the Nuance of Construction Disputes
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'var(--vericase-caption)' }}
            >
              VeriCase integrates seamlessly with project management tools like Primavera P6 and MS Project. 
              Link critical schedule events directly to email evidence, providing a complete picture of project 
              evolution and potential delays.
            </p>
            <Button 
              className="font-semibold transition-all duration-200 hover:scale-[1.02] px-8 py-6 text-base bg-white"
              style={{ color: 'var(--vericase-primary-dark)' }}
              data-testid="construction-cta"
            >
              Explore the Construction Add-In
            </Button>
          </div>

          {/* Visual - Right */}
          <div data-testid="construction-visual">
            <GanttChart />
          </div>
        </div>
      </div>
    </section>
  );
};