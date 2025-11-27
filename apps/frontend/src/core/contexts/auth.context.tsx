'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  identifier: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load user from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedUser = localStorage.getItem('meli_user');
    if (storedUser) {
      try {
        // Defer setState to avoid synchronous setState in effect
        setTimeout(() => setUser(JSON.parse(storedUser)), 0);
      } catch (e) {
        console.error('Failed to parse user from local storage', e);
        localStorage.removeItem('meli_user');
      }
    }
    // Defer setMounted to avoid synchronous setState in effect
    setTimeout(() => setMounted(true), 0);
  }, []);

  const login = (data: User) => {
    setUser(data);
    localStorage.setItem('meli_user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('meli_user');
  };

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
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
