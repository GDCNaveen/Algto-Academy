
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  checkExpiry: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Expiry date: June 30, 2025
  const EXPIRY_DATE = new Date('2025-06-30T23:59:59');

  useEffect(() => {
    // Check if user was previously logged in and not expired
    const savedAuth = localStorage.getItem('algot_auth');
    const savedCredentials = localStorage.getItem('algot_credentials');
    
    if (savedAuth === 'true' && savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      // Verify current credentials are still valid
      if (credentials.username === 'Naveen' && credentials.password === '123') {
        if (checkExpiry()) {
          setIsAuthenticated(true);
        } else {
          logout(); // Auto logout if expired
        }
      } else {
        logout(); // Invalid credentials, logout
      }
    }
  }, []);

  const checkExpiry = (): boolean => {
    const now = new Date();
    if (now > EXPIRY_DATE) {
      return false;
    }
    return true;
  };

  const login = (username: string, password: string): boolean => {
    if (!checkExpiry()) {
      alert('This application has expired. Please contact support.');
      return false;
    }

    if (username === 'Naveen' && password === '123') {
      setIsAuthenticated(true);
      localStorage.setItem('algot_auth', 'true');
      localStorage.setItem('algot_credentials', JSON.stringify({ username, password }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('algot_auth');
    localStorage.removeItem('algot_credentials');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkExpiry }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
