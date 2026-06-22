'use client';

import React, { createContext, useContext, useState } from 'react';
import { API_BASE_URL } from '@/lib/api';

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
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('zenith_auth_user');
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('zenith_auth_token');
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
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
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Network error');
      setIsLoading(false);
      return false;
    }
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Network error');
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
