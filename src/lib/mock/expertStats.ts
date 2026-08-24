/** Expert dashboard stats — mock (v5) */

export interface ExpertReview {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ExpertDashboardStats {
  newRequests: number;
  assignedProjects: number;
  completedProjects: number;
  upcomingSessions: number;
  rating: number;
  monthlyIncome: number;
  incomeGrowthPercent: number;
  profileCompletion: number;
  ratingBreakdown: { stars: number; count: number }[];
  reviews: ExpertReview[];
}

export const MOCK_EXPERT_STATS: ExpertDashboardStats = {
  newRequests: 5,
  assignedProjects: 18,
  completedProjects: 6,
  upcomingSessions: 6,
  rating: 4.8,
  monthlyIncome: 24500000,
  incomeGrowthPercent: 12,
  profileCompletion: 85,
  ratingBreakdown: [
    { stars: 5, count: 42 },
    { stars: 4, count: 18 },
    { stars: 3, count: 4 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 },
  ],
  reviews: [
    {
      id: 'rev-1',
      clientName: 'علی محمدی',
      rating: 5,
      comment: 'مشاوره دقیق و پیگیری عالی.',
      date: '۱۴۰۳/۰۵/۲۸',
    },
    {
      id: 'rev-2',
      clientName: 'سارا نوری',
      rating: 5,
      comment: 'در پرونده ملکی بسیار کمک‌کننده بودند.',
      date: '۱۴۰۳/۰۵/۲۰',
    },
    {
      id: 'rev-3',
      clientName: 'هلدینگ پارس',
      rating: 4,
      comment: 'زمان‌بندی خوب، گزارش کامل.',
      date: '۱۴۰۳/۰۵/۱۲',
    },
  ],
};

export function getExpertDashboardStats(): ExpertDashboardStats {
  return { ...MOCK_EXPERT_STATS, reviews: [...MOCK_EXPERT_STATS.reviews] };
}

export function formatToman(n: number): string {
  return new Intl.NumberFormat('fa-IR').format(n);
}
