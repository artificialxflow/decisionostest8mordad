export interface DraftReviewItem {
  caseId: string;
  title: string;
  aiDraft: string;
  expertEdit?: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision';
}

const drafts: Record<string, DraftReviewItem> = {
  'case-ai-1': {
    caseId: 'case-ai-1',
    title: 'پیش‌نویس لایحه — پرونده تحلیل AI',
    aiDraft:
      'ریاست محترم دادگاه...\n\nبا استناد به مدارک پیوست و ماده ۲ قانون آیین دادرسی مدنی، خواهان تقاضای صدور حکم به...',
    status: 'pending',
  },
  'case-101': {
    caseId: 'case-101',
    title: 'پیش‌نویس نامه — تکمیل مدارک',
    aiDraft: 'احتراماً، به استحضار می‌رساند مدارک زیر ناقص است:\n۱. سند مالکیت\n۲. کارت ملی',
    expertEdit: 'احتراماً، لطفاً نسخه جدید سند با پلاک اصلاح‌شده ارسال فرمایید.',
    status: 'revision',
  },
};

export function getDraftReview(caseId: string): DraftReviewItem | null {
  return drafts[caseId] ?? null;
}

export function updateDraftReview(caseId: string, patch: Partial<DraftReviewItem>): DraftReviewItem {
  const current = drafts[caseId] ?? {
    caseId,
    title: 'پیش‌نویس',
    aiDraft: '',
    status: 'pending' as const,
  };
  drafts[caseId] = { ...current, ...patch };
  return drafts[caseId];
}
