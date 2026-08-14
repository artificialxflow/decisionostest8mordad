import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { User, UserRole } from '../types';
import { Permission, hasPermission } from '../lib/permissions';
import {
  loadStoredUser,
  saveUser,
  clearStoredUser,
  mockLogin,
  mockRegister,
  mockLogout,
} from '../lib/mockAuth';
import { normalizeRole } from '../lib/labels';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: { name: string; email: string; password: string; role: UserRole }) => Promise<User>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  can: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = loadStoredUser();
    setUserState(stored);
    setIsLoading(false);
  }, []);

  const setUser = useCallback((u: User | null) => {
    if (u) {
      const normalized = { ...u, role: normalizeRole(u.role) };
      saveUser(normalized);
      setUserState(normalized);
    } else {
      clearStoredUser();
      setUserState(null);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const logged = await mockLogin(email, password);
    const normalized = { ...logged, role: normalizeRole(logged.role) };
    saveUser(normalized);
    setUserState(normalized);
    return normalized;
  }, []);

  const register = useCallback(
    async (data: { name: string; email: string; password: string; role: UserRole }) => {
      const created = await mockRegister(data);
      saveUser(created);
      setUserState(created);
      return created;
    },
    []
  );

  const logout = useCallback(async () => {
    await mockLogout();
    setUserState(null);
  }, []);

  const can = useCallback(
    (permission: Permission) => hasPermission(user?.role, permission),
    [user?.role]
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      setUser,
      can,
    }),
    [user, isLoading, login, register, logout, setUser, can]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function usePermission(permission: Permission): boolean {
  const { can } = useAuth();
  return can(permission);
}
