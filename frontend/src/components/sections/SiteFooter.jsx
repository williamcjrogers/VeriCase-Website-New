import { Linkedin, Twitter, Youtube } from 'lucide-react';

export const SiteFooter = () => {
  return (
    <footer className="py-16 md:py-20 bg-gray-900 text-gray-300" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="/vericase-logo-white.svg" 
                alt="VeriCase" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              The evidence intelligence platform that turns years of complex construction documentation into winning arguments. Trusted by the industry's leading contractors, consultants, and legal teams.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Product</h4>
            <ul className="space-y-3">
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
              <li>
                <a href="#pricing" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Solutions</h4>
            <ul className="space-y-3">
              <li>
                <a href="#delay-analysis" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Delay Analysis
                </a>
              </li>
              <li>
                <a href="#quantum" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Quantum Assessment
                </a>
              </li>
              <li>
                <a href="#adjudication" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Adjudication
                </a>
              </li>
              <li>
                <a href="#arbitration" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Arbitration
                </a>
              </li>
              <li>
                <a href="#litigation" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Litigation
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Company</h4>
            <ul className="space-y-3">
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
                <a href="#partners" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Partners
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#blog" className="text-sm hover:text-teal-400 transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} VeriCase Ltd. All rights reserved. Company No. 14789532 | VAT No. GB 445 2891 47
          </p>
        </div>
      </div>
    </footer>
  );
};