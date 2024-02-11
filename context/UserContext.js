import React, { createContext, useContext, useState } from 'react';

// Étape 1: Créer le context
const UserContext = createContext();

// Étape 2: Créer le composant du context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserContext = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

// Étape 3: Créer un hook personnalisé pour utiliser le context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
