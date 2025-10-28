import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/content`);
      const contentMap = {};
      data.forEach(item => {
        if (!contentMap[item.section]) contentMap[item.section] = {};
        contentMap[item.section][item.field] = item.content;
      });
      setContent(contentMap);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (section, field, newContent) => {
    try {
      const contentId = `${section}-${field}`;
      await axios.put(`${API_URL}/api/content/${contentId}`, {
        section,
        field,
        content: newContent
      });
      setContent(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: newContent }
      }));
    } catch (error) {
      console.error('Failed to update content:', error);
      throw error;
    }
  };

  return (
    <ContentContext.Provider value={{ content, loading, fetchContent, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};