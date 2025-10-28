export const SiteFooter = () => {
  return (
    <footer className="py-16 md:py-20 bg-gray-900 text-gray-300" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1">
            <img 
              src="https://customer-assets.emergentagent.com/job_smart-evidence/artifacts/3mjzkyva_Logo2.jpg" 
              alt="VeriCase Logo" 
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-gray-400">
              The intelligent evidence platform for complex construction disputes.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Platform</h4>
            <ul className="space-y-4">
              <li>
                <a href="#features" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#integrations" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#security" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Solutions</h4>
            <ul className="space-y-4">
              <li>
                <a href="#construction" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Construction Disputes
                </a>
              </li>
              <li>
                <a href="#litigation" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Commercial Litigation
                </a>
              </li>
              <li>
                <a href="#forensics" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Forensic Analysis
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} VeriCase. All rights reserved. UK Company.
          </p>
        </div>
      </div>
    </footer>
  );
};