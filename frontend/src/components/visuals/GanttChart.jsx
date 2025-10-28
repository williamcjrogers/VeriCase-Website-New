import { Badge } from '@/components/ui/badge';

export const GanttChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8" data-testid="gantt-chart-card">
      <div 
        className="font-bold text-lg pb-4 mb-6"
        style={{ 
          color: 'var(--vericase-primary-dark)',
          borderBottom: '1px solid var(--vericase-border)'
        }}
      >
        Schedule Integration (Baseline vs Actual)
      </div>

      <div className="space-y-4 mb-6">
        {/* Activity A101 */}
        <div className="flex items-center gap-4">
          <div 
            className="w-32 text-sm flex-shrink-0"
            style={{ color: 'var(--vericase-text-secondary)' }}
          >
            Activity A101
          </div>
          <div className="flex-1 space-y-1">
            <div 
              className="h-3 rounded"
              style={{ 
                backgroundColor: '#D1D5DB',
                width: '60%'
              }}
            />
            <div 
              className="h-3 rounded opacity-80"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '55%'
              }}
            />
          </div>
        </div>

        {/* Activity A102 - Highlighted */}
        <div className="flex items-center gap-4">
          <div 
            className="w-32 text-sm flex-shrink-0"
            style={{ color: 'var(--vericase-text-secondary)' }}
          >
            Activity A102
          </div>
          <div className="flex-1 space-y-1">
            <div 
              className="h-3 rounded"
              style={{ 
                backgroundColor: '#D1D5DB',
                width: '70%'
              }}
            />
            <div 
              className="h-3 rounded"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '85%'
              }}
            />
          </div>
        </div>

        {/* Activity B203 */}
        <div className="flex items-center gap-4">
          <div 
            className="w-32 text-sm flex-shrink-0"
            style={{ color: 'var(--vericase-text-secondary)' }}
          >
            Activity B203
          </div>
          <div className="flex-1 space-y-1">
            <div 
              className="h-3 rounded"
              style={{ 
                backgroundColor: '#D1D5DB',
                width: '50%'
              }}
            />
            <div 
              className="h-3 rounded opacity-80"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '48%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Dashed Arrow */}
      <div className="flex justify-center my-6">
        <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M25 0 L25 45" 
            stroke="#64748B" 
            strokeWidth="2" 
            strokeDasharray="4 2"
          />
          <path 
            d="M25 45 L20 35" 
            stroke="#64748B" 
            strokeWidth="2"
          />
          <path 
            d="M25 45 L30 35" 
            stroke="#64748B" 
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Linked Evidence */}
      <div 
        className="pt-6"
        style={{ borderTop: '1px solid var(--vericase-border)' }}
      >
        <div 
          className="font-semibold text-sm mb-3"
          style={{ color: 'var(--vericase-primary-dark)' }}
        >
          Linked Evidence & Delay Tags (A102)
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant="outline"
            className="text-xs"
            style={{ 
              borderColor: 'var(--vericase-border)',
              color: 'var(--vericase-primary-dark)'
            }}
          >
            Activity A102
          </Badge>
          <Badge 
            className="text-white text-xs"
            style={{ backgroundColor: 'var(--vericase-accent-teal)' }}
          >
            Delay Notice
          </Badge>
          <Badge 
            variant="outline"
            className="text-xs"
            style={{ 
              borderColor: 'var(--vericase-border)',
              color: 'var(--vericase-primary-dark)'
            }}
          >
            Site Condition
          </Badge>
        </div>
      </div>
    </div>
  );
};