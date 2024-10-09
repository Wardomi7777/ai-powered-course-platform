import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initialApiKey: string;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, initialApiKey }) => {
  const [apiKey, setApiKey] = useState(initialApiKey);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const updateApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('apiKey', key);
  };

  return (
    <UserContext.Provider value={{ apiKey, setApiKey: updateApiKey }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};