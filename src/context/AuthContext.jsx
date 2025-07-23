import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem('blockbuster_user') || 'null');
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      const userData = { id: 1, username: 'admin', role: 'admin' };
      setUser(userData);
      sessionStorage.setItem('blockbuster_user', JSON.stringify(userData));
      return true;
    }
    if (username === 'user' && password === 'user') {
      const userData = { id: 2, username: 'user', role: 'user' };
      setUser(userData);
      sessionStorage.setItem('blockbuster_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('blockbuster_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
