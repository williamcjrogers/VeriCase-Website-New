import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!chatMessage.trim()) return;
    
    setLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', content: chatMessage }]);
    
    try {
      const { data } = await axios.post(`${API_URL}/api/ai/chat`, {
        message: chatMessage
      });
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
      setChatMessage('');
    } catch (error) {
      toast.error('AI chat failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
        style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-40 w-96 h-[500px] flex flex-col shadow-2xl">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-gray-900">AI Assistant</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatHistory.length === 0 && (
          <div className="text-center text-sm text-gray-500 mt-8">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-teal-600" />
            <p>Ask me anything!</p>
            <p className="mt-1">I can help improve text, suggest ideas, or answer questions.</p>
          </div>
        )}
        {chatHistory.map((msg, i) => (
          <div key={i} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-teal-50 ml-8' : 'bg-gray-100 mr-8'}`}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="p-3 rounded-lg bg-gray-100 mr-8 text-sm text-gray-500">
            AI is thinking...
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 flex gap-2">
        <Input
          placeholder="Ask AI..."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleChat()}
        />
        <Button 
          onClick={handleChat}
          disabled={loading || !chatMessage.trim()}
          size="sm"
          style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
          className="text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};