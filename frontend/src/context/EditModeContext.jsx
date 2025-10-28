import { createContext, useContext, useState } from 'react';

const EditModeContext = createContext();

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode, selectedElement, setSelectedElement }}>
      {children}
    </EditModeContext.Provider>
  );
};