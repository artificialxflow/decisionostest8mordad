/** Admin Control Center system health & platform KPIs — mock (v5) */

export interface SystemHealthItem {
  id: string;
  label: string;
  status: 'ok' | 'warn' | 'down';
}

export interface AdminPlatformKpis {
  totalUsers: number;
  totalExperts: number;
  totalProjects: number;
  totalDocuments: number;
  totalSessions: number;
  totalRevenue: number;
}

export interface AdminActivityItem {
  id: string;
  text: string;
  time: string;
}

export interface NewUserItem {
  id: string;
  name: string;
  role: string;
  joinedAt: string;
}

export const MOCK_ADMIN_KPIS: AdminPlatformKpis = {
  totalUsers: 1245,
  totalExperts: 286,
  totalProjects: 3857,
  totalDocuments: 24612,
  totalSessions: 1024,
  totalRevenue: 1250000000,
};

export const MOCK_SYSTEM_HEALTH: SystemHealthItem[] = [
  { id: 'core', label: 'سرور اصلی', status: 'ok' },
  { id: 'db', label: 'پایگاه داده', status: 'ok' },
  { id: 'storage', label: 'ذخیره‌سازی', status: 'warn' },
  { id: 'email', label: 'سرویس ایمیل', status: 'ok' },
  { id: 'files', label: 'پردازش فایل', status: 'ok' },
];

export const MOCK_ADMIN_ACTIVITIES: AdminActivityItem[] = [
  { id: 'a1', text: 'کاربر جدید ثبت‌نام کرد — سارا احمدی', time: '۵ دقیقه پیش' },
  { id: 'a2', text: 'پروژه جدید ایجاد شد — قرارداد مشارکت', time: '۱۸ دقیقه پیش' },
  { id: 'a3', text: 'متخصص تأیید شد — دکتر کریمی', time: '۱ ساعت پیش' },
  { id: 'a4', text: 'هشدار Storage: ۸۵٪ پر', time: '۲ ساعت پیش' },
  { id: 'a5', text: 'به‌روزرسانی سیستم v2.3.0 در دسترس', time: 'دیروز' },
];

export const MOCK_NEW_USERS: NewUserItem[] = [
  { id: 'u1', name: 'سارا احمدی', role: 'مشتری', joinedAt: '۱۴۰۳/۰۶/۱۸' },
  { id: 'u2', name: 'مهندس نوری', role: 'متخصص', joinedAt: '۱۴۰۳/۰۶/۱۷' },
  { id: 'u3', name: 'هلدینگ آریا', role: 'سازمان', joinedAt: '۱۴۰۳/۰۶/۱۶' },
  { id: 'u4', name: 'رضا کاظمی', role: 'مشتری', joinedAt: '۱۴۰۳/۰۶/۱۵' },
];

export const MOCK_GROWTH_SERIES = [
  { label: 'فروردین', value: 120 },
  { label: 'اردیبهشت', value: 145 },
  { label: 'خرداد', value: 168 },
  { label: 'تیر', value: 190 },
  { label: 'مرداد', value: 210 },
  { label: 'شهریور', value: 245 },
];

export const MOCK_PROJECT_DISTRIBUTION = [
  { label: 'در حال انجام', value: 35 },
  { label: 'تکمیل', value: 30 },
  { label: 'فعال', value: 20 },
  { label: 'در انتظار', value: 15 },
];

export function getAdminPlatformKpis(): AdminPlatformKpis {
  return { ...MOCK_ADMIN_KPIS };
}

export function getSystemHealth(): SystemHealthItem[] {
  return [...MOCK_SYSTEM_HEALTH];
}

export function getAdminActivities(): AdminActivityItem[] {
  return [...MOCK_ADMIN_ACTIVITIES];
}

export function getNewUsers(): NewUserItem[] {
  return [...MOCK_NEW_USERS];
}
