import { CaseComment } from '../../types';

const commentsByCase: Record<string, CaseComment[]> = {
  'case-101': [
    {
      id: 'cm-1',
      caseId: 'case-101',
      authorName: 'مدیر',
      authorRole: 'manager',
      content: 'لطفاً سند مالکیت را با نسخه جدید جایگزین کنید.',
      timestamp: '1403/05/04 — 14:00',
      visibility: 'customer',
    },
    {
      id: 'cm-2',
      caseId: 'case-101',
      authorName: 'دکتر صادghi',
      authorRole: 'expert',
      content: 'یادداشت داخلی: ریسک ثبتی متوسط — @مدیر',
      timestamp: '1403/05/05 — 09:30',
      visibility: 'internal',
      mentions: ['مدیر'],
    },
    {
      id: 'cm-3',
      caseId: 'case-101',
      authorName: 'شرکت پارس امید',
      authorRole: 'customer',
      content: 'نسخه جدید آپلود شد.',
      timestamp: '1403/05/06 — 11:00',
      visibility: 'customer',
      replyToId: 'cm-1',
    },
  ],
};

export function getCaseComments(caseId: string): CaseComment[] {
  return commentsByCase[caseId] ?? [];
}

export function addCaseComment(comment: Omit<CaseComment, 'id'>): CaseComment {
  const item: CaseComment = { ...comment, id: `cm-${Date.now()}` };
  commentsByCase[comment.caseId] = [...(commentsByCase[comment.caseId] ?? []), item];
  return item;
}
