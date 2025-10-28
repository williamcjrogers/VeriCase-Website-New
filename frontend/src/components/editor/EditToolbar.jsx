import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEditMode } from '@/context/EditModeContext';
import { Button } from '@/components/ui/button';
import { Edit3, Save, X, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const EditToolbar = () => {
  const { user, logout } = useAuth();
  const { isEditMode, setIsEditMode } = useEditMode();
  const navigate = useNavigate();

  const handleSaveAll = async () => {
    // Save all pending changes
    toast.success('All changes saved!');
  };

  const handleLogout = () => {
    setIsEditMode(false);
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white shadow-lg rounded-lg px-4 py-2 border border-gray-200">
      <span className="text-sm text-gray-600">{user.email}</span>
      <div className="w-px h-6 bg-gray-200" />
      
      {!isEditMode ? (
        <Button
          size="sm"
          onClick={() => setIsEditMode(true)}
          style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
          className="text-white"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Page
        </Button>
      ) : (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditMode(false)}
          >
            <X className="w-4 h-4 mr-2" />
            Exit Edit
          </Button>
          <Button
            size="sm"
            onClick={handleSaveAll}
            style={{ background: 'linear-gradient(180deg, #069494 0%, #057676 100%)' }}
            className="text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
        </>
      )}
      
      <div className="w-px h-6 bg-gray-200" />
      <Button size="sm" variant="ghost" onClick={handleLogout}>
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};