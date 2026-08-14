import { User, UserRole } from '../types';
import { normalizeRole } from './labels';

const STORAGE_KEY = 'decisionos_auth_user';

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@decisionos.ir': {
    password: '123456',
    user: {
      id: 'usr-admin',
      name: 'مدیر سیستم',
      email: 'admin@decisionos.ir',
      role: 'admin',
      organization: 'DecisionOS',
    },
  },
  'manager@decisionos.ir': {
    password: '123456',
    user: {
      id: 'usr-manager',
      name: 'علی مدیر',
      email: 'manager@decisionos.ir',
      role: 'manager',
      organization: 'DecisionOS',
    },
  },
  'sadeghi@decisionos.ir': {
    password: '123456',
    user: {
      id: 'usr-1',
      name: 'دکتر محمدرضا صادقی',
      email: 'sadeghi@decisionos.ir',
      role: 'expert',
      licenseNumber: '۱۲۳۴۵ / ک',
      organization: 'کانون وکلای دادگستری مرکز',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      workspaceIds: ['ws-1', 'ws-2'],
    },
  },
  'client@pars-omid.ir': {
    password: '123456',
    user: {
      id: 'usr-3',
      name: 'شرکت پارس امید',
      email: 'client@pars-omid.ir',
      role: 'customer',
      organization: 'شرکت سرمایه‌گذاری پارس امید',
      workspaceIds: ['ws-1'],
    },
  },
};

export function loadStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    return { ...parsed, role: normalizeRole(parsed.role) };
  } catch {
    return null;
  }
}

export function saveUser(user: User): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export async function mockLogin(email: string, password: string): Promise<User> {
  await delay(300);
  const entry = DEMO_USERS[email.toLowerCase()];
  if (entry && entry.password === password) {
    return entry.user;
  }
  // Allow any login in dev with selected role from form
  return {
    id: `usr-${Date.now()}`,
    name: email.split('@')[0],
    email,
    role: 'customer',
  };
}

export async function mockRegister(data: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}): Promise<User> {
  await delay(400);
  const user: User = {
    id: `usr-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role,
    organization: data.role === 'expert' || data.role === 'partner' ? 'همکار DecisionOS' : undefined,
  };
  return user;
}

export async function mockLogout(): Promise<void> {
  await delay(100);
  clearStoredUser();
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function getPostLoginRoute(role: UserRole): string {
  switch (role) {
    case 'customer':
      return '/app/services';
    case 'admin':
    case 'manager':
      return '/app/dashboard';
    default:
      return '/app/dashboard';
  }
}
