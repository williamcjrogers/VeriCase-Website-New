export const SiteFooter = () => {
  return (
    <footer 
      className="py-16"
      style={{ 
        backgroundColor: 'var(--vericase-bg-light)',
        borderTop: '1px solid var(--vericase-border)'
      }}
      data-testid="site-footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1">
            <img 
              src="https://customer-assets.emergentagent.com/job_smart-evidence/artifacts/3mjzkyva_Logo2.jpg" 
              alt="VeriCase Logo" 
              className="h-10 w-auto mb-4"
            />
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--vericase-text-secondary)' }}
            >
              The PST evidence platform for complex disputes.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 
              className="font-bold text-base mb-4"
              style={{ color: 'var(--vericase-primary-dark)' }}
            >
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#features" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#integrations" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  Integrations
                </a>
              </li>
              <li>
                <a 
                  href="#security" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 
              className="font-bold text-base mb-4"
              style={{ color: 'var(--vericase-primary-dark)' }}
            >
              Solutions
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#construction" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  Construction Disputes
                </a>
              </li>
              <li>
                <a 
                  href="#litigation" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  Commercial Litigation
                </a>
              </li>
              <li>
                <a 
                  href="#forensics" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  Forensic Analysis
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 
              className="font-bold text-base mb-4"
              style={{ color: 'var(--vericase-primary-dark)' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#about" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#careers" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div 
          className="pt-8 text-center"
          style={{ borderTop: '1px solid var(--vericase-border)' }}
        >
          <p 
            className="text-sm"
            style={{ color: 'var(--vericase-text-secondary)' }}
          >
            &copy; {new Date().getFullYear()} VeriCase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};