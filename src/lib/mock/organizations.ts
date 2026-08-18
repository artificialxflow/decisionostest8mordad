export interface OrganizationUnit {
  id: string;
  name: string;
  type: 'holding' | 'company' | 'department';
  parentId?: string;
  memberCount: number;
  workspaceCount: number;
  status: 'active' | 'pending';
}

export interface TenantInvite {
  id: string;
  email: string;
  role: string;
  orgName: string;
  status: 'pending' | 'accepted';
  sentAt: string;
}

export const MOCK_ORGANIZATIONS: OrganizationUnit[] = [
  {
    id: 'org-holding-1',
    name: 'هلدینگ پارس امید',
    type: 'holding',
    memberCount: 24,
    workspaceCount: 8,
    status: 'active',
  },
  {
    id: 'org-company-1',
    name: 'شرکت حقوقی پارس',
    type: 'company',
    parentId: 'org-holding-1',
    memberCount: 12,
    workspaceCount: 4,
    status: 'active',
  },
  {
    id: 'org-company-2',
    name: 'شرکت بیمه آریا',
    type: 'company',
    parentId: 'org-holding-1',
    memberCount: 8,
    workspaceCount: 2,
    status: 'active',
  },
  {
    id: 'org-company-3',
    name: 'واحد حسابداری گروه',
    type: 'department',
    parentId: 'org-holding-1',
    memberCount: 4,
    workspaceCount: 2,
    status: 'active',
  },
];

export const MOCK_INVITES: TenantInvite[] = [
  {
    id: 'inv-1',
    email: 'legal@newco.ir',
    role: 'مدیر',
    orgName: 'شرکت جدید',
    status: 'pending',
    sentAt: '۱۴۰۳/۰۶/۱۰',
  },
];

export const HOLDING_SERVICE_CATEGORIES = [
  { id: 'legal', label: 'حقوق', desc: 'دعاوی، لایحه، مشاوره حقوقی' },
  { id: 'contract', label: 'قرارداد', desc: 'تنظیم و بازبینی قراردادها' },
  { id: 'insurance', label: 'بیمه', desc: 'اختلافات و پوشش بیمه‌ای' },
  { id: 'accounting', label: 'حسابداری', desc: 'اسناد مالی و مالیاتی' },
  { id: 'real_estate', label: 'املاک', desc: 'ثبت، سند و معاملات ملکی' },
  { id: 'business', label: 'کسب‌وکار', desc: 'ثبت شرکت و حاکمیت شرکتی' },
];
