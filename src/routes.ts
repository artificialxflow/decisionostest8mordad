/** تعریف متمرکز مسیرهای DecisionOS */

export const ROUTES = {
  // Public
  home: '/',
  services: '/services',
  pricing: '/pricing',
  about: '/about',
  faq: '/faq',
  blog: '/blog',
  contact: '/contact',

  // Auth
  login: '/login',
  register: '/register',

  // Platform
  app: '/app',
  dashboard: '/app/dashboard',
  appServices: '/app/services',
  requestNew: '/app/request/new',
  requestSuccess: '/app/request/success',
  workspace: '/app/workspace',
  workspaceDetail: '/app/workspace/:workspaceId',
  cases: '/app/cases',
  caseDetail: '/app/cases/:caseId',
  documents: '/app/documents',
  contracts: '/app/contracts',
  chat: '/app/chat',
  reports: '/app/reports',
  subscription: '/app/subscription',
  billing: '/app/billing',
  notifications: '/app/notifications',
  support: '/app/support',
  settings: '/app/settings',
  profile: '/app/profile',
  audit: '/app/audit',
  cms: '/app/cms',
  experts: '/app/experts',
  expertProfile: '/app/experts/:id',
  adminServices: '/app/admin/services',
  workflows: '/app/workflows',
  automation: '/app/automation',
  organizations: '/app/settings/organizations',
  blogPost: '/blog/:slug',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
