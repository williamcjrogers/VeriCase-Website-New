import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEditMode } from '@/context/EditModeContext';
import { Button } from '@/components/ui/button';
import { Edit3, X } from 'lucide-react';

export const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isEditMode, setIsEditMode } = useEditMode();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/90" data-testid="navigation-header">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0" data-testid="nav-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_smart-evidence/artifacts/3mjzkyva_Logo2.jpg" 
              alt="VeriCase Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10" data-testid="nav-links">
            <a 
              href="#platform" 
              className="text-gray-700 font-medium hover:text-teal-600 transition-colors duration-200"
              data-testid="nav-link-platform"
            >
              Platform
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-700 font-medium hover:text-teal-600 transition-colors duration-200"
              data-testid="nav-link-how-it-works"
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="text-gray-700 font-medium hover:text-teal-600 transition-colors duration-200"
              data-testid="nav-link-pricing"
            >
              Pricing
            </a>
            <a 
              href="#about" 
              className="text-gray-700 font-medium hover:text-teal-600 transition-colors duration-200"
              data-testid="nav-link-about"
            >
              About Us
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.email}</span>
                {!isEditMode ? (
                  <Button 
                    onClick={() => setIsEditMode(true)}
                    className="font-semibold text-white"
                    style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Page
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setIsEditMode(false)}
                    variant="outline"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Exit Edit
                  </Button>
                )}
                <Button 
                  variant="ghost"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="text-gray-700"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="font-semibold text-gray-700 hover:text-teal-600"
                  onClick={() => navigate('/login')}
                  data-testid="navbar-login-btn"
                >
                  Login
                </Button>
                
                <Button 
                  size="lg"
                  className="font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg px-8"
                  style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
                  data-testid="header-request-demo-btn"
                >
                  Request Demo
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};