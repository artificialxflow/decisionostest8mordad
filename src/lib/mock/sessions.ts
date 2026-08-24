/** Mock sessions for Customer / Expert dashboards (v5) */

export interface SessionItem {
  id: string;
  title: string;
  date: string;
  time: string;
  expertName: string;
  expertId?: string;
  clientName?: string;
  caseId?: string;
  caseTitle?: string;
  status: 'upcoming' | 'live' | 'done' | 'cancelled';
  avatarUrl?: string;
}

const sessions: SessionItem[] = [
  {
    id: 'ses-1',
    title: 'مشاوره حقوقی قرارداد مشارکت',
    date: '۱۴۰۳/۰۶/۲۰',
    time: '۱۱:۰۰',
    expertName: 'دکتر رضا کریمی',
    expertId: 'exp-1',
    clientName: 'علی محمدی',
    caseId: 'case-101',
    caseTitle: 'دعوای الزام به تنظیم سند',
    status: 'upcoming',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80',
  },
  {
    id: 'ses-2',
    title: 'بازبینی اسناد ثبتی',
    date: '۱۴۰۳/۰۶/۲۰',
    time: '۱۴:۰۰',
    expertName: 'مهندس مریم تهرانی',
    expertId: 'exp-2',
    clientName: 'علی محمدی',
    caseId: 'case-102',
    status: 'upcoming',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80',
  },
  {
    id: 'ses-3',
    title: 'جلسه پیگیری پرونده ملکی',
    date: '۱۴۰۳/۰۶/۲۲',
    time: '۰۹:۳۰',
    expertName: 'دکتر محمدرضا صادقی',
    expertId: 'exp-1',
    clientName: 'شرکت پارس امید',
    caseId: 'case-101',
    status: 'upcoming',
  },
  {
    id: 'ses-4',
    title: 'مشاوره بیمه مسئولیت',
    date: '۱۴۰۳/۰۶/۱۵',
    time: '۱۶:۰۰',
    expertName: 'علی رضایی',
    expertId: 'exp-5',
    clientName: 'علی محمدی',
    status: 'done',
  },
];

export function getMockSessions(): SessionItem[] {
  return [...sessions];
}

export function getUpcomingSessions(limit = 5): SessionItem[] {
  return sessions.filter((s) => s.status === 'upcoming' || s.status === 'live').slice(0, limit);
}

export function getTodaySessions(): SessionItem[] {
  return sessions.filter((s) => s.date.includes('۰۶/۲۰') || s.date.includes('06/20'));
}

export function getSessionsForExpert(_expertId?: string): SessionItem[] {
  return sessions.filter((s) => s.status !== 'cancelled');
}
