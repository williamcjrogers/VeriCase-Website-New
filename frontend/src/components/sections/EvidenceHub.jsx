import { FileText, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const EvidenceHub = () => {
  return (
    <section className="py-24 lg:py-32 bg-white" data-testid="evidence-hub-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content - Left */}
          <div className="space-y-8" data-testid="evidence-hub-content">
            <p 
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--vericase-accent-teal)' }}
            >
              INTELLIGENT DOCUMENT MANAGEMENT
            </p>
            <h2 
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: 'var(--vericase-primary-dark)' }}
            >
              Beyond Email: The Comprehensive Evidence Hub.
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'var(--vericase-text-secondary)' }}
            >
              Disputes rely on more than just PST files. Manage contracts, site reports, images, and large 
              datasets within VeriCase. Our integrated, intelligent DMS ensures every file is secure, searchable, 
              and ready for analysis.
            </p>

            {/* Features */}
            <div className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: 'var(--vericase-bg-light)',
                    border: '1px solid var(--vericase-border)'
                  }}
                >
                  <FileText 
                    className="w-6 h-6"
                    style={{ color: 'var(--vericase-accent-teal)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--vericase-primary-dark)' }}
                  >
                    Automatic OCR & Full-Text Indexing
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--vericase-text-secondary)' }}
                  >
                    Ensure all documents, including scanned images, are fully searchable.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: 'var(--vericase-bg-light)',
                    border: '1px solid var(--vericase-border)'
                  }}
                >
                  <Tag 
                    className="w-6 h-6"
                    style={{ color: 'var(--vericase-accent-teal)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--vericase-primary-dark)' }}
                  >
                    AI-Powered Tagging & Mass Data Querying
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--vericase-text-secondary)' }}
                  >
                    Leverage AI to categorize documents and perform complex queries across your entire evidence repository.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual - Right */}
          <div data-testid="evidence-hub-visual">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div 
                className="font-bold text-lg pb-4 mb-6"
                style={{ 
                  color: 'var(--vericase-primary-dark)',
                  borderBottom: '1px solid var(--vericase-border)'
                }}
              >
                Document Intelligence & AI Classification
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Document Preview */}
                <div 
                  className="rounded-lg p-5 space-y-3"
                  style={{ 
                    backgroundColor: 'var(--vericase-bg-light)',
                    border: '1px solid var(--vericase-border)'
                  }}
                >
                  <div 
                    className="font-semibold text-sm"
                    style={{ color: 'var(--vericase-primary-dark)' }}
                  >
                    SITE INSPECTION REPORT - SECTOR 4B
                  </div>
                  <div 
                    className="text-xs space-y-1"
                    style={{ color: 'var(--vericase-text-secondary)' }}
                  >
                    <div>Date: 15/03/2025</div>
                    <div>Inspector: A. Bell</div>
                  </div>
                  <div 
                    className="text-xs leading-relaxed relative"
                    style={{ color: 'var(--vericase-text-secondary)' }}
                  >
                    <div className="space-y-2">
                      <p>Summary: Inspection focused on foundation integrity following recent weather events.</p>
                      <p 
                        className="relative inline-block"
                        style={{ 
                          backgroundColor: 'rgba(13, 148, 136, 0.15)',
                          padding: '2px 4px',
                          borderRadius: '3px'
                        }}
                      >
                        Noted significant water pooling near Pier 7.
                      </p>
                      <p>Recommendations: Immediate drainage mitigation required.</p>
                      <p 
                        className="relative inline-block"
                        style={{ 
                          backgroundColor: 'rgba(13, 148, 136, 0.15)',
                          padding: '2px 4px',
                          borderRadius: '3px'
                        }}
                      >
                        Potential delay to Activity A102 if not resolved within 48hrs.
                      </p>
                    </div>
                  </div>
                  <div 
                    className="h-20 rounded flex items-center justify-center text-xs"
                    style={{ 
                      backgroundColor: 'var(--vericase-border)',
                      color: 'var(--vericase-text-secondary)'
                    }}
                  >
                    [Image]
                  </div>
                </div>

                {/* AI Insights */}
                <div 
                  className="rounded-lg p-5 space-y-4"
                  style={{ 
                    backgroundColor: 'var(--vericase-surface)',
                    border: '1px solid var(--vericase-border)'
                  }}
                >
                  <div 
                    className="font-semibold text-sm"
                    style={{ color: 'var(--vericase-primary-dark)' }}
                  >
                    AI Insights & Tags
                  </div>
                  
                  <div>
                    <div 
                      className="text-xs mb-1"
                      style={{ color: 'var(--vericase-text-secondary)' }}
                    >
                      Entities Detected:
                    </div>
                    <div 
                      className="text-sm font-medium"
                      style={{ color: 'var(--vericase-primary-dark)' }}
                    >
                      A. Bell, Pier 7
                    </div>
                  </div>

                  <div>
                    <div 
                      className="text-xs mb-2"
                      style={{ color: 'var(--vericase-text-secondary)' }}
                    >
                      Suggested Tags:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        className="text-white text-xs"
                        style={{ backgroundColor: 'var(--vericase-accent-teal)' }}
                      >
                        Site Condition
                      </Badge>
                      <Badge 
                        className="text-white text-xs"
                        style={{ backgroundColor: 'var(--vericase-accent-teal)' }}
                      >
                        Potential Delay
                      </Badge>
                      <Badge 
                        className="text-white text-xs"
                        style={{ backgroundColor: 'var(--vericase-primary-dark)' }}
                      >
                        Activity A102
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <div 
                      className="text-xs mb-1"
                      style={{ color: 'var(--vericase-text-secondary)' }}
                    >
                      OCR Status:
                    </div>
                    <div 
                      className="text-sm font-bold"
                      style={{ color: 'var(--vericase-accent-teal)' }}
                    >
                      Complete & Indexed
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