export interface KnowledgeDoc {
  id: string;
  title: string;
  category: 'law' | 'regulation' | 'verdict';
  indexed: boolean;
  uploadedAt: string;
}

export const MOCK_KNOWLEDGE: KnowledgeDoc[] = [
  { id: 'k1', title: 'قانون مدنی — مواد ۲۲۰–۲۳۰', category: 'law', indexed: true, uploadedAt: '1403/04/01' },
  { id: 'k2', title: 'آیین‌نامه ثبت اسناد', category: 'regulation', indexed: true, uploadedAt: '1403/04/05' },
  { id: 'k3', title: 'رأی وحدت رویه ۸۲۰', category: 'verdict', indexed: false, uploadedAt: '1403/05/10' },
];

export function getKnowledgeDocs(): KnowledgeDoc[] {
  return [...MOCK_KNOWLEDGE];
}

export function addKnowledgeDoc(title: string, category: KnowledgeDoc['category']): KnowledgeDoc {
  const doc: KnowledgeDoc = {
    id: `k-${Date.now()}`,
    title,
    category,
    indexed: false,
    uploadedAt: new Date().toLocaleDateString('fa-IR'),
  };
  MOCK_KNOWLEDGE.unshift(doc);
  return doc;
}
