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

  contracts: { status: 'placeholder', label: 'به‌زودی' },
  reports: { status: 'placeholder', label: 'به‌زودی' },
  subscription: { status: 'placeholder', label: 'به‌زودی' },
  billing: { status: 'placeholder', label: 'به‌زودی' },
  support: { status: 'placeholder', label: 'به‌زودی' },
  cms: { status: 'placeholder', label: 'به‌زودی' },

  chat: { status: 'coming_soon', label: 'به‌زودی' },
  aiChat: { status: 'coming_soon', label: 'به‌زودی' },
  workspaceAi: { status: 'coming_soon', label: 'به‌زودی' },
  ocr: { status: 'coming_soon', label: 'به‌زودی' },
  rag: { status: 'coming_soon', label: 'به‌زودی' },
  whatsapp: { status: 'coming_soon', label: 'به‌زودی' },
  voice: { status: 'coming_soon', label: 'به‌زودی' },
  bi: { status: 'coming_soon', label: 'به‌زودی' },
  aiAnalysis: { status: 'coming_soon', label: 'به‌زودی' },
};

export function isFeatureActive(key: string): boolean {
  return FEATURES[key]?.status === 'active';
}

export function featureBadge(key: string): string | null {
  const f = FEATURES[key];
  if (!f || f.status === 'active') return null;
  return f.label || (f.status === 'coming_soon' ? 'به‌زودی' : 'Placeholder');
}
