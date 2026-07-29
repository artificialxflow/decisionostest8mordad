/**
 * طرح schema مقیاس‌پذیر DecisionOS (Sprint 1)
 * پیاده‌سازی فیزیکی DB در فاز بعد؛ این فایل قرارداد داده است.
 */

export const DB_SCHEMA = {
  users: {
    id: 'uuid PK',
    email: 'unique',
    passwordHash: 'string',
    role: 'client | expert | admin',
    name: 'string',
    organization: 'string?',
    createdAt: 'timestamp',
  },
  workspaces: {
    id: 'uuid PK',
    name: 'string',
    ownerId: 'FK users.id',
    status: 'active | archived',
    createdAt: 'timestamp',
  },
  workspace_members: {
    workspaceId: 'FK',
    userId: 'FK',
    role: 'owner | member | viewer',
  },
  cases: {
    id: 'uuid PK',
    workspaceId: 'FK workspaces.id',
    title: 'string',
    status: 'string',
    priority: 'high | medium | low',
    progress: '0-100',
    assignedExpertId: 'FK users.id?',
    deadline: 'timestamp?',
  },
  documents: {
    id: 'uuid PK',
    caseId: 'FK cases.id',
    title: 'string',
    currentVersion: 'int',
    ocrReady: 'boolean',
  },
  document_versions: {
    id: 'uuid PK',
    documentId: 'FK',
    version: 'int',
    fileUrl: 'string',
    uploadedBy: 'FK users.id',
  },
  notifications: {
    id: 'uuid PK',
    userId: 'FK',
    channel: 'in_app | email | sms',
    read: 'boolean',
  },
  subscriptions: {
    id: 'uuid PK',
    userId: 'FK',
    plan: 'free | starter | pro | enterprise',
  },
  invoices: {
    id: 'uuid PK',
    userId: 'FK',
    amount: 'number',
    status: 'draft | pending | paid | overdue',
  },
  audit_logs: {
    id: 'uuid PK',
    userId: 'FK',
    action: 'string',
    target: 'string',
    ipAddress: 'string',
    timestamp: 'timestamp',
  },
} as const;
