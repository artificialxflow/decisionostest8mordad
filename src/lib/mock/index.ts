import { ServiceItem, ExpertProfile, RequestItem, TimelineEventItem, ServiceTypeId } from '../../types';
import { MOCK_EXPERTS_FULL } from './experts';
import {
  getServiceRegistry,
  resolveServiceTypeFromLegacy,
  generateSystemReply,
  getServiceById,
} from './serviceRegistry';
import { createServiceRecord, nextCaseNumber } from './serviceRecords';

export const MOCK_SERVICES: ServiceItem[] = getServiceRegistry()
  .filter((s) => s.active)
  .map((s) => ({
  id: s.legacyServiceIds?.[0] ?? `svc-${s.serviceId}`,
  title: s.name,
  category: (s.category === 'auction' || s.category === 'tender' || s.category === 'technology'
    ? s.category === 'technology'
      ? 'business'
      : 'real_estate'
    : s.category) as ServiceItem['category'],
  description: s.description,
  icon: s.icon,
  requiredDocuments: ['مدارک هویتی', 'اسناد مرتبط با خدمت'],
  estimatedTime: '۳–۱۰ روز',
  pricingType: 'quote' as const,
  status: 'active' as const,
  sortOrder: s.sortOrder,
  features: s.aiCapabilities.slice(0, 3),
  ctaLabel: 'شروع درخواست',
}));

/** Map catalog service id → ServiceTypeId */
export function serviceTypeIdForCatalog(serviceId: string): ServiceTypeId {
  return (
    resolveServiceTypeFromLegacy(serviceId) ??
    getServiceRegistry().find((s) => `svc-${s.serviceId}` === serviceId)?.serviceId ??
    'LEGAL_CASE'
  );
}

export const MOCK_EXPERTS: ExpertProfile[] = MOCK_EXPERTS_FULL;

export { MOCK_EXPERTS_FULL, getExpertById } from './experts';
export * from './documentLoop';
export * from './organizations';
export * from './tasks';
export * from './calendar';
export * from './reminders';
export * from './comments';
export * from './satisfaction';
export * from './reports';
export * from './monitoring';
export * from './integrations';
export * from './automationRules';
export * from './documents';
export * from './aiChat';
export * from './aiAnalysis';
export * from './drafts';
export * from './knowledge';
export * from './semanticSearch';
export * from './aiAgentQueue';
export * from './sessions';
export * from './expertStats';
export * from './adminSystem';
export * from './expertOnboarding';
export * from './serviceRegistry';
export * from './serviceRecords';

export {
  getMockTasks,
  addMockTask,
  updateMockTask,
  toggleSubTask,
  isTaskOverdue,
} from './tasks';

let mockRequests: RequestItem[] = [
  {
    id: 'req-seed-1',
    serviceId: 's3',
    customerId: 'usr-3',
    title: 'درخواست بررسی سند ملکی',
    description: 'بررسی ریسک ثبتی',
    status: 'submitted',
    caseId: 'case-101',
    workspaceId: 'ws-1',
    serviceTypeId: 'PROPERTY_INVESTMENT',
    serviceRecordId: 'rec-seed-inv',
    paymentStatus: 'none',
    createdAt: '1403/05/01',
    updatedAt: '1403/05/01',
  },
  {
    id: 'req-seed-2',
    serviceId: 's2',
    customerId: 'usr-3',
    title: 'تنظیم قرارداد مشارکت',
    description: 'پیش‌نویس و بازبینی',
    status: 'reviewing',
    caseId: 'case-102',
    workspaceId: 'ws-1',
    serviceTypeId: 'LEGAL_CASE',
    serviceRecordId: 'rec-seed-leg',
    paymentStatus: 'paid',
    createdAt: '1403/05/10',
    updatedAt: '1403/05/12',
  },
];

export function getMockServices(): ServiceItem[] {
  return [...MOCK_SERVICES].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function getMockExperts(): ExpertProfile[] {
  return [...MOCK_EXPERTS];
}

export function getMockRequests(): RequestItem[] {
  return [...mockRequests];
}

export function submitMockRequest(data: {
  serviceId: string;
  customerId: string;
  title: string;
  description: string;
  formData?: Record<string, string | number | string[] | null>;
  serviceTypeId?: ServiceTypeId;
  paymentStatus?: 'none' | 'pending' | 'paid';
  systemReply?: string;
}): {
  request: RequestItem;
  caseId: string;
  workspaceId: string;
  caseNumber: string;
  serviceRecordId: string;
} {
  const ts = new Date().toLocaleDateString('fa-IR');
  const requestId = `req-${Date.now()}`;
  const caseId = `case-${Date.now()}`;
  const workspaceId = `ws-${Date.now()}`;
  const serviceTypeId = data.serviceTypeId ?? serviceTypeIdForCatalog(data.serviceId);
  const caseNumber = nextCaseNumber(serviceTypeId);
  const entry = getServiceById(serviceTypeId);

  const record = createServiceRecord({
    caseId,
    serviceTypeId,
    data: data.formData ?? {},
  });

  const systemReply =
    data.systemReply ??
    generateSystemReply(entry?.name ?? 'خدمت', data.title, data.formData ?? {});

  const request: RequestItem = {
    id: requestId,
    serviceId: data.serviceId,
    customerId: data.customerId,
    title: data.title,
    description: data.description,
    status: 'submitted',
    caseId,
    workspaceId,
    serviceTypeId,
    serviceRecordId: record.recordId,
    formData: data.formData,
    paymentStatus: data.paymentStatus ?? 'none',
    systemReply,
    priority: 'medium',
    source: 'web',
    createdAt: ts,
    updatedAt: ts,
  };

  mockRequests = [request, ...mockRequests];
  return { request, caseId, workspaceId, caseNumber, serviceRecordId: record.recordId };
}

export function getMockTimelineEvents(caseId?: string, workspaceId?: string): TimelineEventItem[] {
  const events: TimelineEventItem[] = [
    {
      id: 'tl-1',
      caseId: 'case-101',
      workspaceId: 'ws-1',
      action: 'ایجاد پرونده',
      actorName: 'سیستم',
      objectType: 'case',
      objectId: 'case-101',
      timestamp: '۱۴۰۳/۰۵/۰۱ — ۱۰:۳۰',
    },
    {
      id: 'tl-2',
      caseId: 'case-101',
      workspaceId: 'ws-1',
      action: 'بارگذاری سند',
      actorName: 'شرکت پارس امید',
      objectType: 'document',
      timestamp: '۱۴۰۳/۰۵/۰۲ — ۱۴:۱۵',
      details: 'سند مالکیت',
    },
    {
      id: 'tl-3',
      caseId: 'case-101',
      workspaceId: 'ws-1',
      action: 'تغییر وضعیت',
      actorName: 'دکتر صادقی',
      objectType: 'case',
      timestamp: '۱۴۰۳/۰۵/۰۳ — ۰۹:۰۰',
      details: 'جدید → در حال بررسی',
    },
    {
      id: 'tl-4',
      caseId: 'case-101',
      workspaceId: 'ws-1',
      action: 'تخصیص کارشناس',
      actorName: 'مدیر',
      objectType: 'expert',
      objectId: 'usr-1',
      timestamp: '۱۴۰۳/۰۵/۰۳ — ۱۱:۰۰',
    },
    {
      id: 'tl-5',
      caseId: 'case-101',
      workspaceId: 'ws-1',
      action: 'مدارک ناقص اعلام شد',
      actorName: 'مدیر',
      objectType: 'document',
      timestamp: '۱۴۰۳/۰۵/۰۴ — ۱۴:۰۰',
      details: 'پرونده → waiting_docs',
    },
    {
      id: 'tl-ai',
      caseId: 'case-ai-1',
      workspaceId: 'ws-1',
      action: 'تحلیل AI شروع شد',
      actorName: 'DecisionOS AI',
      objectType: 'case',
      timestamp: '۱۴۰۳/۰۶/۱۸ — ۰۸:۰۰',
      details: 'وضعیت → ai_analyzing',
    },
  ];

  return events.filter((e) => {
    if (caseId && e.caseId !== caseId) return false;
    if (workspaceId && e.workspaceId !== workspaceId) return false;
    return true;
  });
}

export function getExtendedMockAuditLogs() {
  return [
    {
      id: 'log-login',
      userId: 'usr-1',
      userEmail: 'sadeghi@decisionos.ir',
      action: 'Login',
      target: 'Session',
      ipAddress: '127.0.0.1',
      timestamp: '۱۴۰۳/۰۶/۰۱ — ۰۸:۰۰',
    },
    {
      id: 'log-case',
      userId: 'usr-1',
      userEmail: 'sadeghi@decisionos.ir',
      action: 'Create Case',
      target: 'پرونده ۱۴۰۳/۱۰۱/۸۸۷',
      ipAddress: '127.0.0.1',
      timestamp: '۱۴۰۳/۰۶/۰۱ — ۰۸:۱۵',
    },
    {
      id: 'log-upload',
      userId: 'usr-3',
      userEmail: 'client@pars-omid.ir',
      action: 'Upload',
      target: 'سند مالکیت',
      ipAddress: '127.0.0.1',
      timestamp: '۱۴۰۳/۰۶/۰۱ — ۰۹:۳۰',
    },
    {
      id: 'log-status',
      userId: 'usr-1',
      userEmail: 'sadeghi@decisionos.ir',
      action: 'Change Status',
      target: 'پرونده ۱۴۰۳/۱۰۱/۸۸۷',
      ipAddress: '127.0.0.1',
      timestamp: '۱۴۰۳/۰۶/۰۲ — ۱۰:۰۰',
      details: 'under_review → in_progress',
    },
    {
      id: 'log-assign',
      userId: 'usr-admin',
      userEmail: 'admin@decisionos.ir',
      action: 'Assign Expert',
      target: 'دکتر محمدرضا صادقی',
      ipAddress: '127.0.0.1',
      timestamp: '۱۴۰۳/۰۶/۰۲ — ۱۱:۰۰',
    },
  ];
}
