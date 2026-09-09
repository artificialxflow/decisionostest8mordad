export interface KnowledgeDoc {
  id: string;
  title: string;
  category: 'law' | 'regulation' | 'verdict' | 'expert_kb';
  indexed: boolean;
  uploadedAt: string;
  owner?: 'platform' | 'expert';
  serviceTypeId?: string;
  caseId?: string;
}

export type KbUpdateMode = 'internal_only' | 'allow_external';
export type SystemReplySourceMode = 'general' | 'knowledge_base';

export const MOCK_KNOWLEDGE: KnowledgeDoc[] = [
  { id: 'k1', title: 'قانون مدنی — مواد ۲۲۰–۲۳۰', category: 'law', indexed: true, uploadedAt: '1403/04/01', owner: 'platform' },
  { id: 'k2', title: 'آیین‌نامه ثبت اسناد', category: 'regulation', indexed: true, uploadedAt: '1403/04/05', owner: 'platform' },
  { id: 'k3', title: 'رأی وحدت رویه ۸۲۰', category: 'verdict', indexed: false, uploadedAt: '1403/05/10', owner: 'platform' },
  { id: 'k4', title: 'جزوه تخصصی کارشناس — مزایده', category: 'expert_kb', indexed: true, uploadedAt: '1403/06/01', owner: 'expert' },
];

let kbUpdateMode: KbUpdateMode = 'internal_only';
let replySourceMode: SystemReplySourceMode = 'knowledge_base';

export function getKnowledgeDocs(): KnowledgeDoc[] {
  return [...MOCK_KNOWLEDGE];
}

export function addKnowledgeDoc(
  title: string,
  category: KnowledgeDoc['category'],
  owner: KnowledgeDoc['owner'] = 'platform'
): KnowledgeDoc {
  const doc: KnowledgeDoc = {
    id: `k-${Date.now()}`,
    title,
    category,
    indexed: false,
    uploadedAt: new Date().toLocaleDateString('fa-IR'),
    owner,
  };
  MOCK_KNOWLEDGE.unshift(doc);
  return doc;
}

export function getKbUpdateMode(): KbUpdateMode {
  return kbUpdateMode;
}

export function setKbUpdateMode(mode: KbUpdateMode) {
  kbUpdateMode = mode;
}

export function getReplySourceMode(): SystemReplySourceMode {
  return replySourceMode;
}

export function setReplySourceMode(mode: SystemReplySourceMode) {
  replySourceMode = mode;
}
