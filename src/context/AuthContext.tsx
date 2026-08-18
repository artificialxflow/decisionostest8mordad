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
  getDemoUserForRole,
} from '../lib/mockAuth';
import { normalizeRole } from '../lib/labels';

const DEMO_ROLE_KEY = 'decisionos_demo_role';

interface AuthContextType {
  user: User | null;
  baseUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  demoRole: UserRole | null;
  login: (email: string, password: string) => Promise<User>;
  register: (data: { name: string; email: string; password: string; role: UserRole }) => Promise<User>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setDemoRole: (role: UserRole) => void;
  clearDemoRole: () => void;
  can: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function loadDemoRole(): UserRole | null {
  try {
    const raw = sessionStorage.getItem(DEMO_ROLE_KEY);
    if (!raw) return null;
    return normalizeRole(raw) as UserRole;
  } catch {
    return null;
  }
}

function saveDemoRole(role: UserRole | null) {
  if (role) sessionStorage.setItem(DEMO_ROLE_KEY, role);
  else sessionStorage.removeItem(DEMO_ROLE_KEY);
}

function applyDemoRole(base: User | null, demoRole: UserRole | null): User | null {
  if (!demoRole) return base;
  const demo = getDemoUserForRole(demoRole);
  if (!base) return demo;
  return { ...base, role: demoRole, name: demo.name, organization: demo.organization };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [baseUser, setBaseUserState] = useState<User | null>(null);
  const [demoRole, setDemoRoleState] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = loadStoredUser();
    setBaseUserState(stored);
    setDemoRoleState(loadDemoRole());
    setIsLoading(false);
  }, []);

  const user = useMemo(() => applyDemoRole(baseUser, demoRole), [baseUser, demoRole]);

  const setUser = useCallback((u: User | null) => {
    if (u) {
      const normalized = { ...u, role: normalizeRole(u.role) };
      saveUser(normalized);
      setBaseUserState(normalized);
    } else {
      clearStoredUser();
      setBaseUserState(null);
      saveDemoRole(null);
      setDemoRoleState(null);
    }
  }, []);

  const setDemoRole = useCallback(
    (role: UserRole) => {
      const normalized = normalizeRole(role) as UserRole;
      saveDemoRole(normalized);
      setDemoRoleState(normalized);
      if (!baseUser) {
        const demo = getDemoUserForRole(normalized);
        saveUser(demo);
        setBaseUserState(demo);
      }
    },
    [baseUser]
  );

  const clearDemoRole = useCallback(() => {
    saveDemoRole(null);
    setDemoRoleState(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const logged = await mockLogin(email, password);
    const normalized = { ...logged, role: normalizeRole(logged.role) };
    saveUser(normalized);
    setBaseUserState(normalized);
    saveDemoRole(null);
    setDemoRoleState(null);
    return normalized;
  }, []);

  const register = useCallback(
    async (data: { name: string; email: string; password: string; role: UserRole }) => {
      const created = await mockRegister(data);
      saveUser(created);
      setBaseUserState(created);
      saveDemoRole(null);
      setDemoRoleState(null);
      return created;
    },
    []
  );

  const logout = useCallback(async () => {
    await mockLogout();
    setBaseUserState(null);
    saveDemoRole(null);
    setDemoRoleState(null);
  }, []);

  const can = useCallback(
    (permission: Permission) => hasPermission(user?.role, permission),
    [user?.role]
  );

  const value = useMemo(
    () => ({
      user,
      baseUser,
      isAuthenticated: !!user,
      isLoading,
      isDemoMode: demoRole !== null,
      demoRole,
      login,
      register,
      logout,
      setUser,
      setDemoRole,
      clearDemoRole,
      can,
    }),
    [user, baseUser, isLoading, demoRole, login, register, logout, setUser, setDemoRole, clearDemoRole, can]
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
