export interface AiQueueItem {
  id: string;
  caseId: string;
  caseTitle: string;
  task: string;
  status: 'queued' | 'processing' | 'done';
  priority: 'high' | 'medium' | 'low';
}

export const MOCK_AI_QUEUE: AiQueueItem[] = [
  { id: 'aq-1', caseId: 'case-ai-1', caseTitle: 'تحلیل AI — ملکی', task: 'تحلیل مدارک', status: 'processing', priority: 'high' },
  { id: 'aq-2', caseId: 'case-101', caseTitle: 'پرونده 887', task: 'استخراج OCR', status: 'queued', priority: 'medium' },
  { id: 'aq-3', caseId: 'case-102', caseTitle: 'قرارداد مشارکت', task: 'Draft قرارداد', status: 'done', priority: 'low' },
];

export function getAiQueue(): AiQueueItem[] {
  return [...MOCK_AI_QUEUE];
}
