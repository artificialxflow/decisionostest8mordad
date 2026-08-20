export type IntegrationKey = 'email' | 'sms' | 'whatsapp' | 'webhook';

export interface IntegrationConfig {
  key: IntegrationKey;
  label: string;
  enabled: boolean;
  apiKeyMasked: string;
  lastTest?: string;
}

let integrations: IntegrationConfig[] = [
  { key: 'email', label: 'Email', enabled: true, apiKeyMasked: 'smtp-••••••••', lastTest: '1403/06/01' },
  { key: 'sms', label: 'SMS', enabled: false, apiKeyMasked: '—' },
  { key: 'whatsapp', label: 'WhatsApp', enabled: false, apiKeyMasked: '—' },
  { key: 'webhook', label: 'Webhook', enabled: true, apiKeyMasked: 'wh_••••••••', lastTest: '1403/05/28' },
];

export function getIntegrations(): IntegrationConfig[] {
  return integrations.map((i) => ({ ...i }));
}

export function toggleIntegration(key: IntegrationKey): void {
  integrations = integrations.map((i) => (i.key === key ? { ...i, enabled: !i.enabled } : i));
}

export function testIntegration(key: IntegrationKey): string {
  const i = integrations.find((x) => x.key === key);
  if (!i) return 'ناموفق';
  return i.enabled ? 'اتصال موفق (mock)' : 'غیرفعال';
}
