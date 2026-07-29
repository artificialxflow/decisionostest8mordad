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

  // Platform
  app: '/app',
  dashboard: '/app/dashboard',
  appServices: '/app/services',
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
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
