import { ServiceItem, ExpertProfile, RequestItem, TimelineEventItem } from '../../types';
import { MOCK_EXPERTS_FULL } from './experts';

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'حقوقی',
    category: 'legal',
    description: 'مدیریت دعاوی، لایحه و پیگیری قضایی',
    icon: 'Scale',
    requiredDocuments: ['شناسنامه', 'وکالتنامه'],
    estimatedTime: '۷–۱۴ روز',
    pricingType: 'quote',
    status: 'active',
    sortOrder: 1,
  },
  {
    id: 's2',
    title: 'قراردادی',
    category: 'contract',
    description: 'تنظیم، بازبینی و ریسک‌سنجی قراردادها',
    icon: 'FileSignature',
    requiredDocuments: ['پیش‌نویس قرارداد'],
    estimatedTime: '۳–۷ روز',
    pricingType: 'fixed',
    status: 'active',
    sortOrder: 2,
  },
  {
    id: 's3',
    title: 'املاک و ثبتی',
    category: 'real_estate',
    description: 'ریسک ثبتی، سند و معاملات ملکی',
    icon: 'Building2',
    requiredDocuments: ['سند مالکیت', 'کارت ملی'],
    estimatedTime: '۵–۱۰ روز',
    pricingType: 'quote',
    status: 'active',
    sortOrder: 3,
  },
  {
    id: 's4',
    title: 'بیمه',
    category: 'insurance',
    description: 'بررسی پوشش و اختلافات بیمه‌ای',
    icon: 'Shield',
    requiredDocuments: ['بیمه‌نامه'],
    estimatedTime: '۳–۵ روز',
    pricingType: 'hourly',
    status: 'active',
    sortOrder: 4,
  },
  {
    id: 's5',
    title: 'مالی و حسابداری',
    category: 'accounting',
    description: 'اسناد مالی مرتبط با پرونده',
    icon: 'Calculator',
    requiredDocuments: ['صورت‌حساب'],
    estimatedTime: '۵ روز',
    pricingType: 'hourly',
    status: 'active',
    sortOrder: 5,
  },
  {
    id: 's6',
    title: 'سرمایه‌گذاری',
    category: 'investment',
    description: 'ارزیابی حقوقی طرح‌های سرمایه‌گذاری',
    icon: 'TrendingUp',
    requiredDocuments: ['طرح سرمایه‌گذاری'],
    estimatedTime: '۱۰ روز',
    pricingType: 'quote',
    status: 'active',
    sortOrder: 6,
  },
  {
    id: 's7',
    title: 'کسب‌وکار',
    category: 'business',
    description: 'مشاوره سازمانی و حاکمیت شرکتی',
    icon: 'Briefcase',
    requiredDocuments: ['اساسنامه'],
    estimatedTime: '۷ روز',
    pricingType: 'quote',
    status: 'active',
    sortOrder: 7,
  },
  {
    id: 's8',
    title: 'تحلیل داده',
    category: 'finance',
    description: 'تحلیل داده‌های حقوقی و مالی پرونده',
    icon: 'Wallet',
    requiredDocuments: ['فایل داده'],
    estimatedTime: '۵ روز',
    pricingType: 'hourly',
    status: 'active',
    sortOrder: 8,
  },
];

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
}): { request: RequestItem; caseId: string; workspaceId: string } {
  const ts = new Date().toLocaleDateString('fa-IR');
  const requestId = `req-${Date.now()}`;
  const caseId = `case-${Date.now()}`;
  const workspaceId = `ws-${Date.now()}`;

  const request: RequestItem = {
    id: requestId,
    serviceId: data.serviceId,
    customerId: data.customerId,
    title: data.title,
    description: data.description,
    status: 'submitted',
    caseId,
    workspaceId,
    createdAt: ts,
    updatedAt: ts,
  };

  mockRequests = [request, ...mockRequests];
  return { request, caseId, workspaceId };
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
