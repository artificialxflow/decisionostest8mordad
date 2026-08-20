export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition?: string;
  action: string;
  enabled: boolean;
}

export const MOCK_AUTOMATION_RULES: AutomationRule[] = [
  { id: 'rule-1', name: 'مدارک ناقص', trigger: 'document.incomplete', action: 'notify.customer', enabled: true },
  { id: 'rule-2', name: 'تخصیص کارشناس', trigger: 'case.status.under_review', action: 'assign.expert.auto', enabled: true },
  { id: 'rule-3', name: 'یادآوری deadline', trigger: 'task.due_soon', condition: '24h before', action: 'notify.assignee', enabled: false },
];

export function getAutomationRules(): AutomationRule[] {
  return [...MOCK_AUTOMATION_RULES];
}

export function addAutomationRule(rule: Omit<AutomationRule, 'id'>): AutomationRule {
  const item = { ...rule, id: `rule-${Date.now()}` };
  MOCK_AUTOMATION_RULES.push(item);
  return item;
}
