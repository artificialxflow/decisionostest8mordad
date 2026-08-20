export interface SemanticSearchResult {
  id: string;
  type: 'case' | 'document' | 'service';
  title: string;
  snippet: string;
  score: number;
}

export function semanticSearch(query: string): SemanticSearchResult[] {
  const q = query.trim();
  if (!q) return [];
  return [
    { id: 'case-101', type: 'case', title: 'پرونده ملکی 887', snippet: '...خلع ید و الزام به تنظیم سند...', score: 0.94 },
    { id: 'doc-1', type: 'document', title: 'سند مالکیت', snippet: '...پلاک ثبتی ۱۲۳/۴۵...', score: 0.88 },
    { id: 's3', type: 'service', title: 'املاک و ثبتی', snippet: 'ریسک ثبتی، سند و معاملات ملکی', score: 0.72 },
  ];
}
