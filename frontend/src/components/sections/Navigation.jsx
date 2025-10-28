import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const Navigation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Mocked login - will be connected to backend later
    toast.success('Login feature will be connected soon!');
    setOpen(false);
    setEmail('');
    setPassword('');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: 'var(--vericase-border)' }} data-testid="navigation-header">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0" data-testid="nav-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_smart-evidence/artifacts/3mjzkyva_Logo2.jpg" 
              alt="VeriCase Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" data-testid="nav-links">
            <a 
              href="#platform" 
              className="font-medium transition-colors duration-200 hover:opacity-100"
              style={{ color: 'var(--vericase-primary-dark)' }}
              data-testid="nav-link-platform"
            >
              Platform
            </a>
            <a 
              href="#construction" 
              className="font-medium transition-colors duration-200 hover:opacity-100"
              style={{ color: 'var(--vericase-primary-dark)' }}
              data-testid="nav-link-construction"
            >
              Construction
            </a>
            <a 
              href="#pricing" 
              className="font-medium transition-colors duration-200 hover:opacity-100"
              style={{ color: 'var(--vericase-primary-dark)' }}
              data-testid="nav-link-pricing"
            >
              Pricing
            </a>
            <a 
              href="#about" 
              className="font-medium transition-colors duration-200 hover:opacity-100"
              style={{ color: 'var(--vericase-primary-dark)' }}
              data-testid="nav-link-about"
            >
              About Us
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="hidden md:inline-flex font-semibold transition-colors duration-200"
                  style={{ color: 'var(--vericase-text-secondary)' }}
                  data-testid="navbar-login-btn"
                >
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" data-testid="login-dialog">
                <DialogHeader>
                  <DialogTitle data-testid="login-dialog-title">Welcome Back</DialogTitle>
                  <DialogDescription data-testid="login-dialog-description">
                    Enter your credentials to access your VeriCase account.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" data-testid="login-email-label">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-testid="login-email-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" data-testid="login-password-label">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      data-testid="login-password-input"
                    />
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      className="w-full font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
                      style={{ backgroundColor: 'var(--vericase-accent-teal)' }}
                      data-testid="login-submit-btn"
                    >
                      Sign In
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button 
              className="font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
              style={{ backgroundColor: 'var(--vericase-accent-teal)' }}
              data-testid="header-request-demo-btn"
            >
              Request Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};