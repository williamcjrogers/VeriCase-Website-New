import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { LogOut, Save, MessageSquare, Send, Sparkles } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [editData, setEditData] = useState({});
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [improvingText, setImprovingText] = useState('');

  useEffect(() => {
    // Initialize with default content
    setEditData({
      hero: {
        tagline: 'Records, Records... VeriCase',
        headline: 'Make Time Your Ally, Not Your Enemy.',
        subheadline: 'From Chaos to Clarity in Construction Disputes',
        description: 'Extract mass data instantly. Build true chronologies nobody else can. Respond to rebuttals with auto-selected evidence. Uncover years of contemporaneous records—all in one intelligent platform.'
      }
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = async (section, field, value) => {
    try {
      await axios.put(`${API_URL}/api/content/${section}-${field}`, {
        section,
        field,
        content: value
      });
      toast.success('Saved!');
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  const handleChat = async () => {
    if (!chatMessage.trim()) return;
    
    setLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', content: chatMessage }]);
    
    try {
      const { data } = await axios.post(`${API_URL}/api/ai/chat`, {
        message: chatMessage,
        session_id: sessionId || undefined
      });
      
      if (!sessionId) setSessionId(data.session_id);
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
      setChatMessage('');
    } catch (error) {
      toast.error('AI chat failed');
    } finally {
      setLoading(false);
    }
  };

  const handleImprove = async (text) => {
    setImprovingText(text);
    try {
      const { data } = await axios.post(`${API_URL}/api/ai/improve`, { text });
      toast.success('AI improved your text!');
      return data.improved;
    } catch (error) {
      toast.error('AI improve failed');
    } finally {
      setImprovingText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_smart-evidence/artifacts/3mjzkyva_Logo2.jpg" 
              alt="VeriCase" 
              className="h-10"
            />
            <span className="text-sm text-gray-600">Editing Mode</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Editor */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="hero">Hero</TabsTrigger>
                <TabsTrigger value="values">Values</TabsTrigger>
                <TabsTrigger value="how">How It Works</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="hero" className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Tagline</label>
                  <Input
                    value={editData.hero?.tagline || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, hero: { ...prev.hero, tagline: e.target.value } }))}
                    onBlur={(e) => handleSave('hero', 'tagline', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                    <span>Headline</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={async () => {
                        const improved = await handleImprove(editData.hero?.headline || '');
                        if (improved) {
                          setEditData(prev => ({ ...prev, hero: { ...prev.hero, headline: improved } }));
                        }
                      }}
                      disabled={improvingText === editData.hero?.headline}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI Improve
                    </Button>
                  </label>
                  <Input
                    value={editData.hero?.headline || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, hero: { ...prev.hero, headline: e.target.value } }))}
                    onBlur={(e) => handleSave('hero', 'headline', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Subheadline</label>
                  <Input
                    value={editData.hero?.subheadline || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, hero: { ...prev.hero, subheadline: e.target.value } }))}
                    onBlur={(e) => handleSave('hero', 'subheadline', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                    <span>Description</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={async () => {
                        const improved = await handleImprove(editData.hero?.description || '');
                        if (improved) {
                          setEditData(prev => ({ ...prev, hero: { ...prev.hero, description: improved } }));
                        }
                      }}
                      disabled={improvingText === editData.hero?.description}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI Improve
                    </Button>
                  </label>
                  <Textarea
                    rows={4}
                    value={editData.hero?.description || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))}
                    onBlur={(e) => handleSave('hero', 'description', e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="values">
                <p className="text-gray-600">Value propositions editing coming soon...</p>
              </TabsContent>

              <TabsContent value="how">
                <p className="text-gray-600">How It Works editing coming soon...</p>
              </TabsContent>

              <TabsContent value="benefits">
                <p className="text-gray-600">Benefits editing coming soon...</p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* AI Chat Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-gray-900">AI Assistant</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-teal-50 ml-4' : 'bg-gray-100 mr-4'}`}>
                  <p className="text-sm text-gray-800">{msg.content}</p>
                </div>
              ))}
              {loading && (
                <div className="p-3 rounded-lg bg-gray-100 mr-4">
                  <p className="text-sm text-gray-500">AI is thinking...</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask AI for suggestions..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChat()}
              />
              <Button 
                onClick={handleChat}
                disabled={loading || !chatMessage.trim()}
                style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};