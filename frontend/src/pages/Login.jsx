import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Redirect to VeriCase signup/login pages (with admin approval flow)
    const appUrl = process.env.REACT_APP_APP_URL || 
                  (window.location.hostname === 'localhost' ? 'http://localhost:8010/ui/' : 'https://app.veri-case.com/ui/');
    
    if (isRegister) {
      // Redirect to signup page for registration with admin approval
      window.location.href = `${appUrl}signup.html`;
    } else {
      // Redirect to login page
      window.location.href = `${appUrl}login.html`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E6F7F7 0%, #FFFFFF 100%)' }}>
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img 
            src="/Logo2-Copy.png" 
            alt="VeriCase" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">{isRegister ? 'Create Account' : 'Welcome to VeriCase'}</h1>
          <p className="text-sm text-gray-600 mt-2">Access the Dispute Intelligence Platform</p>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full text-white text-base py-6"
            style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
            onClick={handleRedirect}
          >
            {isRegister ? 'Create New Account' : 'Login to VeriCase'}
          </Button>
          
          <div className="text-center text-sm text-gray-600 py-4">
            {isRegister ? (
              <>
                <p className="mb-2">New accounts require admin approval</p>
                <p className="text-xs text-gray-500">You'll receive an email once approved</p>
              </>
            ) : (
              <p>Secure access to your evidence and cases</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
          {isRegister ? 'Already have an account?' : 'Need an account?'}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="ml-2 text-teal-600 font-semibold hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </div>
      </Card>
    </div>
  );
};