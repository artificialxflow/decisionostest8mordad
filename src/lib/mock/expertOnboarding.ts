import { ExpertApprovalStatus, ExpertProfile } from '../../types';

export interface ExpertOnboardingRequest {
  id: string;
  name: string;
  email: string;
  specialty: string;
  city: string;
  resumeTitle: string;
  status: ExpertApprovalStatus;
  submittedAt: string;
}

let pendingExperts: ExpertOnboardingRequest[] = [
  {
    id: 'exp-pend-1',
    name: 'مهندس مریم علوی',
    email: 'alavi@example.ir',
    specialty: 'مزایده و ارزیابی',
    city: 'بندرعباس',
    resumeTitle: 'resume-alavi.pdf',
    status: 'pending',
    submittedAt: '1403/06/01',
  },
];

export function getPendingExperts(): ExpertOnboardingRequest[] {
  return [...pendingExperts];
}

export function setExpertApproval(id: string, status: ExpertApprovalStatus) {
  pendingExperts = pendingExperts.map((e) => (e.id === id ? { ...e, status } : e));
}

export interface ExpertIncomeBreakdown {
  expertId: string;
  name: string;
  consultIncome: number;
  projectIncome: number;
  projectsCount: number;
  supportCount: number;
}

export const MOCK_EXPERT_INCOME: ExpertIncomeBreakdown[] = [
  { expertId: 'usr-1', name: 'دکتر محمدرضا صادقی', consultIncome: 42, projectIncome: 180, projectsCount: 12, supportCount: 34 },
  { expertId: 'usr-2', name: 'مهندس مریم تهرانی', consultIncome: 28, projectIncome: 95, projectsCount: 7, supportCount: 18 },
];
