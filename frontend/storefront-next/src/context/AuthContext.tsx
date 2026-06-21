'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthCtx {
  user: User | null;
  token: string | null;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage
    try {
      const savedToken = localStorage.getItem('zenith_auth_token');
      const savedUser = localStorage.getItem('zenith_auth_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {}
    setIsLoading(false);
  }, []);

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8002/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Registration failed');
      }
      setIsLoading(false);
      // Auto login after registration
      return await login(email, pass);
    } catch (e: any) {
      setError(e.message || 'Network error');
      setIsLoading(false);
      return false;
    }
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Invalid email or password');
      }
      const data = await res.json();
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('zenith_auth_token', data.access_token);
      localStorage.setItem('zenith_auth_user', JSON.stringify(data.user));
      setIsLoading(false);
      return true;
    } catch (e: any) {
      setError(e.message || 'Network error');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('zenith_auth_token');
    localStorage.removeItem('zenith_auth_user');
  };

  const clearError = () => setError(null);

  return (
    <Ctx.Provider value={{ user, token, register, login, logout, isLoading, error, clearError }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
