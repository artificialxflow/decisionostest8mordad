import { UserRole } from '../types';

export type Permission =
  | 'view_dashboard'
  | 'view_services'
  | 'view_workspace'
  | 'view_cases'
  | 'create_case'
  | 'edit_case'
  | 'delete_case'
  | 'change_case_status'
  | 'assign_expert'
  | 'view_documents'
  | 'upload_document'
  | 'delete_document'
  | 'view_audit'
  | 'view_cms'
  | 'manage_services'
  | 'manage_experts'
  | 'view_requests'
  | 'manage_requests'
  | 'view_tasks'
  | 'manage_tasks'
  | 'view_notifications'
  | 'view_admin';

export type RouteKey =
  | 'dashboard'
  | 'services'
  | 'workspace'
  | 'cases'
  | 'documents'
  | 'contracts'
  | 'chat'
  | 'reports'
  | 'subscription'
  | 'billing'
  | 'notifications'
  | 'support'
  | 'settings'
  | 'audit'
  | 'cms'
  | 'experts'
  | 'adminServices'
  | 'requests';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'view_dashboard',
    'view_services',
    'view_workspace',
    'view_cases',
    'create_case',
    'edit_case',
    'delete_case',
    'change_case_status',
    'assign_expert',
    'view_documents',
    'upload_document',
    'delete_document',
    'view_audit',
    'view_cms',
    'manage_services',
    'manage_experts',
    'view_requests',
    'manage_requests',
    'view_tasks',
    'manage_tasks',
    'view_notifications',
    'view_admin',
  ],
  manager: [
    'view_dashboard',
    'view_services',
    'view_workspace',
    'view_cases',
    'create_case',
    'edit_case',
    'change_case_status',
    'assign_expert',
    'view_documents',
    'upload_document',
    'view_audit',
    'manage_services',
    'manage_experts',
    'view_requests',
    'manage_requests',
    'view_tasks',
    'manage_tasks',
    'view_notifications',
    'view_admin',
  ],
  expert: [
    'view_dashboard',
    'view_workspace',
    'view_cases',
    'edit_case',
    'change_case_status',
    'view_documents',
    'upload_document',
    'view_tasks',
    'manage_tasks',
    'view_notifications',
  ],
  customer: [
    'view_dashboard',
    'view_services',
    'view_workspace',
    'view_cases',
    'create_case',
    'view_documents',
    'upload_document',
    'view_requests',
    'view_notifications',
  ],
  partner: [
    'view_dashboard',
    'view_workspace',
    'view_cases',
    'view_documents',
    'upload_document',
    'view_tasks',
    'view_notifications',
  ],
};

const ROUTE_PERMISSIONS: Record<RouteKey, Permission> = {
  dashboard: 'view_dashboard',
  services: 'view_services',
  workspace: 'view_workspace',
  cases: 'view_cases',
  documents: 'view_documents',
  contracts: 'view_cases',
  chat: 'view_dashboard',
  reports: 'view_dashboard',
  subscription: 'view_dashboard',
  billing: 'view_dashboard',
  notifications: 'view_notifications',
  support: 'view_dashboard',
  settings: 'view_dashboard',
  audit: 'view_audit',
  cms: 'view_cms',
  experts: 'manage_experts',
  adminServices: 'manage_services',
  requests: 'view_requests',
};

export function hasPermission(role: UserRole | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canAccessRoute(role: UserRole | null | undefined, routeKey: RouteKey): boolean {
  const perm = ROUTE_PERMISSIONS[routeKey];
  return hasPermission(role, perm);
}

export function getPermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}
