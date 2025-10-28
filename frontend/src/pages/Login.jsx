import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await register(email, password, fullName);
        toast.success('Account created!');
      } else {
        await login(email, password);
        toast.success('Logged in!');
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E6F7F7 0%, #FFFFFF 100%)' }}>
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div 
            className="h-16 mx-auto mb-4 inline-block"
            style={{ 
              backgroundColor: '#FAFAFA',
              borderRadius: '4px',
              padding: '4px'
            }}
          >
            <img 
              src="/Logo-Vector.png" 
              alt="VeriCase" 
              className="h-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full text-white"
            style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Login')}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-600">
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