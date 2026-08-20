export type FeatureStatus = 'active' | 'coming_soon' | 'placeholder';

export interface FeatureConfig {
  status: FeatureStatus;
  label?: string;
}

export const FEATURES: Record<string, FeatureConfig> = {
  cases: { status: 'active' },
  documents: { status: 'active' },
  services: { status: 'active' },
  workspace: { status: 'active' },
  dashboard: { status: 'active' },
  notifications: { status: 'active' },
  audit: { status: 'active' },
  requests: { status: 'active' },
  tasks: { status: 'active' },
  experts: { status: 'active' },
  search: { status: 'active' },

  contracts: { status: 'placeholder', label: 'نسخه نمایشی' },
  reports: { status: 'placeholder', label: 'نسخه نمایشی' },
  subscription: { status: 'placeholder', label: 'نسخه نمایشی' },
  billing: { status: 'placeholder', label: 'نسخه نمایشی' },
  support: { status: 'placeholder', label: 'نسخه نمایشی' },
  cms: { status: 'placeholder', label: 'نسخه نمایشی' },

  chat: { status: 'active', label: 'نسخه نمایشی' },
  aiChat: { status: 'active', label: 'نسخه نمایشی' },
  workspaceAi: { status: 'coming_soon', label: 'به‌زودی' },
  ocr: { status: 'active', label: 'نسخه نمایشی' },
  rag: { status: 'active', label: 'نسخه نمایشی' },
  whatsapp: { status: 'coming_soon', label: 'به‌زودی' },
  voice: { status: 'coming_soon', label: 'به‌زودی' },
  bi: { status: 'placeholder', label: 'نسخه نمایشی' },
  aiAnalysis: { status: 'active', label: 'نسخه نمایشی' },
};

export function isFeatureActive(key: string): boolean {
  return FEATURES[key]?.status === 'active';
}

export function featureBadge(key: string): string | null {
  const f = FEATURES[key];
  if (!f || f.status === 'active') return null;
  return f.label || (f.status === 'coming_soon' ? 'به‌زودی' : 'Placeholder');
}
