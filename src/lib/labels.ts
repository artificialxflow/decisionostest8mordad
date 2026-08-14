import { CaseStatus, UserRole, CasePriority } from '../types';

/** Legacy statuses from Sprint 1 backend/mock */
export type LegacyCaseStatus =
  | 'open'
  | 'under_review'
  | 'court_pending'
  | 'closed'
  | 'appealed'
  | 'in_progress'
  | 'waiting_docs'
  | 'completed';

const LEGACY_STATUS_MAP: Record<LegacyCaseStatus, CaseStatus> = {
  open: 'new',
  waiting_docs: 'waiting_docs',
  under_review: 'under_review',
  in_progress: 'in_progress',
  court_pending: 'waiting_customer',
  appealed: 'under_review',
  closed: 'archived',
  completed: 'completed',
};

export function normalizeCaseStatus(status: string): CaseStatus {
  if (status in LEGACY_STATUS_MAP) {
    return LEGACY_STATUS_MAP[status as LegacyCaseStatus];
  }
  return status as CaseStatus;
}

export const CASE_STATUS_LABELS: Record<CaseStatus, string> = {
  new: 'جدید',
  waiting_docs: 'در انتظار مدارک',
  under_review: 'در حال بررسی',
  in_progress: 'در حال انجام',
  waiting_customer: 'در انتظار مشتری',
  quality_control: 'کنترل کیفیت',
  completed: 'تکمیل',
  archived: 'بایگانی',
  cancelled: 'لغو',
};

export const CASE_STATUS_COLORS: Record<CaseStatus, string> = {
  new: 'bg-slate-100 text-slate-700 border-slate-200',
  waiting_docs: 'bg-amber-50 text-amber-800 border-amber-200',
  under_review: 'bg-blue-50 text-blue-800 border-blue-200',
  in_progress: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  waiting_customer: 'bg-orange-50 text-orange-800 border-orange-200',
  quality_control: 'bg-pink-50 text-pink-800 border-pink-200',
  completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  archived: 'bg-slate-200 text-slate-600 border-slate-300',
  cancelled: 'bg-red-50 text-red-800 border-red-200',
};

export const ALL_CASE_STATUSES: CaseStatus[] = [
  'new',
  'waiting_docs',
  'under_review',
  'in_progress',
  'waiting_customer',
  'quality_control',
  'completed',
  'archived',
  'cancelled',
];

/** Allowed transitions for workflow UI */
export const CASE_STATUS_TRANSITIONS: Partial<Record<CaseStatus, CaseStatus[]>> = {
  new: ['waiting_docs', 'under_review', 'cancelled'],
  waiting_docs: ['under_review', 'cancelled'],
  under_review: ['in_progress', 'waiting_docs', 'cancelled'],
  in_progress: ['waiting_customer', 'quality_control', 'cancelled'],
  waiting_customer: ['in_progress', 'cancelled'],
  quality_control: ['completed', 'in_progress'],
  completed: ['archived'],
  archived: [],
  cancelled: [],
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'مدیر سیستم',
  manager: 'مدیر',
  expert: 'کارشناس',
  customer: 'مشتری',
  partner: 'شریک',
};

export type LegacyUserRole =
  | 'client'
  | 'advocate'
  | 'legal_specialist'
  | 'real_estate_agent';

const LEGACY_ROLE_MAP: Record<LegacyUserRole, UserRole> = {
  client: 'customer',
  advocate: 'expert',
  legal_specialist: 'expert',
  real_estate_agent: 'partner',
};

export function normalizeRole(role: string): UserRole {
  if (role in LEGACY_ROLE_MAP) {
    return LEGACY_ROLE_MAP[role as LegacyUserRole];
  }
  return role as UserRole;
}

export const PRIORITY_LABELS: Record<CasePriority, string> = {
  high: 'بالا',
  medium: 'متوسط',
  low: 'پایین',
};

export const TASK_STATUS_LABELS = {
  todo: 'انجام نشده',
  doing: 'در حال انجام',
  done: 'انجام شده',
} as const;

export const DOCUMENT_STATUS_LABELS = {
  ready: 'آماده ارسال',
  incomplete: 'ناقص',
  needs_clarification: 'نیاز به توضیح',
} as const;
