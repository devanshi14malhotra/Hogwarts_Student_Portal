import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  house: string;
  year: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy user data for Harry Potter
const DUMMY_USER: User = {
  id: '1',
  name: 'Harry Potter',
  email: 'harry.potter@hogwarts.edu',
  house: 'Gryffindor',
  year: 7
};

// Dummy credentials
const VALID_CREDENTIALS = {
  email: 'harry.potter@hogwarts.edu',
  password: 'expelliarmus'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved auth state
    const savedUser = localStorage.getItem('hogwartsUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      setUser(DUMMY_USER);
      setIsAuthenticated(true);
      localStorage.setItem('hogwartsUser', JSON.stringify(DUMMY_USER));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, any signup is successful and creates a new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      house: 'Gryffindor', // Default house
      year: 1
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('hogwartsUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hogwartsUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};