import { DocumentStatus } from '../../types';

export interface DocumentChecklistItem {
  name: string;
  required: boolean;
  uploaded: boolean;
  docStatus?: DocumentStatus;
}

export interface DocumentLoopState {
  caseId: string;
  serviceId: string;
  caseStatus: 'waiting_docs' | 'under_review' | 'in_progress';
  checklist: DocumentChecklistItem[];
  managerNote?: string;
  missingItems: string[];
  reviewedAt?: string;
}

const defaultLoopState: DocumentLoopState = {
  caseId: 'case-101',
  serviceId: 's3',
  caseStatus: 'waiting_docs',
  managerNote: 'کپی کارت ملی یکی از شرکا موجود نیست. لطفاً مدارک را تکمیل کنید.',
  missingItems: ['کارت ملی شریک دوم', 'فرم ثبت‌نام تکمیل‌شده'],
  reviewedAt: '۱۴۰۳/۰۵/۰۴ — ۱۴:۰۰',
  checklist: [
    { name: 'شناسنامه', required: true, uploaded: true, docStatus: 'ready' },
    { name: 'کارت ملی', required: true, uploaded: true, docStatus: 'ready' },
    { name: 'کارت ملی شریک دوم', required: true, uploaded: false, docStatus: 'incomplete' },
    { name: 'سند مالکیت', required: true, uploaded: true, docStatus: 'needs_clarification' },
    { name: 'فرم ثبت‌نام', required: true, uploaded: false, docStatus: 'incomplete' },
  ],
};

let loopState = { ...defaultLoopState };

export function getDocumentLoopState(caseId?: string): DocumentLoopState {
  if (!caseId || caseId === loopState.caseId) return { ...loopState };
  return {
    ...defaultLoopState,
    caseId,
    caseStatus: 'under_review',
    checklist: defaultLoopState.checklist.map((c) => ({ ...c, uploaded: true, docStatus: 'ready' as DocumentStatus })),
    missingItems: [],
    managerNote: undefined,
  };
}

export function updateDocumentLoopState(patch: Partial<DocumentLoopState>): DocumentLoopState {
  loopState = { ...loopState, ...patch };
  return { ...loopState };
}

export function approveDocuments(caseId: string): DocumentLoopState {
  loopState = {
    ...loopState,
    caseId,
    caseStatus: 'under_review',
    missingItems: [],
    managerNote: undefined,
    checklist: loopState.checklist.map((c) => ({ ...c, uploaded: true, docStatus: 'ready' as DocumentStatus })),
  };
  return { ...loopState };
}

export function requestDocumentCompletion(caseId: string, missing: string[], note?: string): DocumentLoopState {
  loopState = {
    ...loopState,
    caseId,
    caseStatus: 'waiting_docs',
    missingItems: missing,
    managerNote: note,
    checklist: loopState.checklist.map((c) =>
      missing.includes(c.name) ? { ...c, uploaded: false, docStatus: 'incomplete' as DocumentStatus } : c
    ),
  };
  return { ...loopState };
}

export function getDocumentProgress(checklist: DocumentChecklistItem[]): number {
  const required = checklist.filter((c) => c.required);
  if (required.length === 0) return 100;
  const done = required.filter((c) => c.uploaded && c.docStatus === 'ready').length;
  return Math.round((done / required.length) * 100);
}
