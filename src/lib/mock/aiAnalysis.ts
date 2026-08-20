import { DocumentAnalysisStatus } from '../../types';

export interface AiAnalysisResult {
  caseId: string;
  riskScore: number;
  entities: string[];
  suggestedActions: string[];
  documentStatus: DocumentAnalysisStatus;
  steps: { label: string; done: boolean }[];
}

const analysisByCase: Record<string, AiAnalysisResult> = {
  'case-ai-1': {
    caseId: 'case-ai-1',
    riskScore: 62,
    entities: ['سند مالکیت', 'پلاک ۱۲۳/۴۵', 'خلع ید'],
    suggestedActions: ['درخواست نقشه UTM', 'ارجاع به کارشناس ثبتی', 'بررسی بخ‌نامه'],
    documentStatus: 'analysis_incomplete',
    steps: [
      { label: 'استخراج متن OCR', done: true },
      { label: 'تطبیق با دانش حقوقی', done: true },
      { label: 'ارزیابی ریسک', done: false },
    ],
  },
  'case-101': {
    caseId: 'case-101',
    riskScore: 45,
    entities: ['ملک مسکونی', 'تهران'],
    suggestedActions: ['تکمیل مدارک هویتی'],
    documentStatus: 'needs_clarification',
    steps: [
      { label: 'استخراج متن OCR', done: true },
      { label: 'تطبیق با دانش حقوقی', done: false },
      { label: 'ارزیابی ریسک', done: false },
    ],
  },
};

export function getAiAnalysis(caseId: string): AiAnalysisResult | null {
  return analysisByCase[caseId] ?? null;
}

export function getDefaultAiAnalysis(caseId: string): AiAnalysisResult {
  return (
    analysisByCase[caseId] ?? {
      caseId,
      riskScore: 35,
      entities: ['—'],
      suggestedActions: ['تحلیل در انتظار مدارک کامل'],
      documentStatus: 'analysis_incomplete',
      steps: [
        { label: 'استخراج متن OCR', done: false },
        { label: 'تطبیق با دانش حقوقی', done: false },
        { label: 'ارزیابی ریسک', done: false },
      ],
    }
  );
}
