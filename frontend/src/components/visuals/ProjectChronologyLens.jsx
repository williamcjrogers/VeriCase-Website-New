export const ProjectChronologyLens = () => {
  return (
    <div 
      className="bg-white rounded-xl p-6 md:p-8 shadow-lg"
      data-testid="chronology-lens-card"
    >
      <div 
        className="font-bold text-lg pb-4 mb-6"
        style={{ 
          color: 'var(--vericase-primary-dark)',
          borderBottom: '1px solid var(--vericase-border)'
        }}
      >
        Project Chronology Lens™ (Merged View)
      </div>
      
      <div className="space-y-4 mb-6">
        {/* Custodian A Timeline */}
        <div className="relative" data-testid="timeline-custodian-a">
          <div 
            className="absolute -left-32 w-28 text-right text-sm"
            style={{ color: 'var(--vericase-text-secondary)' }}
          >
            Custodian A
          </div>
          <div 
            className="relative h-8 rounded border"
            style={{ 
              backgroundColor: 'var(--vericase-surface)',
              borderColor: 'var(--vericase-border)'
            }}
          >
            <div 
              className="absolute h-full rounded opacity-70"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '60%',
                left: '0%'
              }}
            />
            <div 
              className="absolute h-full rounded z-10"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '20%',
                left: '60%'
              }}
            />
            <div 
              className="absolute h-full rounded opacity-70"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '15%',
                left: '82%'
              }}
            />
          </div>
        </div>

        {/* Custodian B Timeline */}
        <div className="relative" data-testid="timeline-custodian-b">
          <div 
            className="absolute -left-32 w-28 text-right text-sm"
            style={{ color: 'var(--vericase-text-secondary)' }}
          >
            Custodian B
          </div>
          <div 
            className="relative h-8 rounded border"
            style={{ 
              backgroundColor: 'var(--vericase-surface)',
              borderColor: 'var(--vericase-border)'
            }}
          >
            <div 
              className="absolute h-full rounded opacity-70"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '30%',
                left: '0%'
              }}
            />
            <div 
              className="absolute h-full rounded opacity-70"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '45%',
                left: '32%'
              }}
            />
            <div 
              className="absolute h-full rounded opacity-70"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '18%',
                left: '80%'
              }}
            />
          </div>
        </div>

        {/* Project Docs Timeline */}
        <div className="relative" data-testid="timeline-project-docs">
          <div 
            className="absolute -left-32 w-28 text-right text-sm"
            style={{ color: 'var(--vericase-text-secondary)' }}
          >
            Project Docs
          </div>
          <div 
            className="relative h-8 rounded border"
            style={{ 
              backgroundColor: 'var(--vericase-surface)',
              borderColor: 'var(--vericase-border)'
            }}
          >
            <div 
              className="absolute h-full rounded opacity-70"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '10%',
                left: '0%'
              }}
            />
            <div 
              className="absolute h-full rounded opacity-70"
              style={{ 
                backgroundColor: 'var(--vericase-accent-teal)',
                width: '85%',
                left: '12%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Highlighted Event */}
      <div 
        className="rounded-lg p-4 text-sm font-medium"
        style={{ 
          backgroundColor: 'var(--vericase-bg-light)',
          color: 'var(--vericase-primary-dark)',
          borderLeft: '3px solid var(--vericase-accent-teal)'
        }}
        data-testid="highlighted-event"
      >
        Key Email: Delay Notice
      </div>
    </div>
  );
};