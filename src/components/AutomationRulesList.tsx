import React from 'react';
import { getAutomationRules, AutomationRule } from '../lib/mock/automationRules';
import { Badge } from './ui';

export const AutomationRulesList: React.FC<{ rules?: AutomationRule[] }> = ({ rules = getAutomationRules() }) => (
  <div className="divide-y border rounded-lg overflow-hidden">
    {rules.map((r) => (
      <div key={r.id} className="flex items-center justify-between p-3 text-xs bg-white dark:bg-slate-900">
        <div>
          <p className="font-bold">{r.name}</p>
          <p className="text-slate-500 mt-0.5">
            {r.trigger} → {r.action}
            {r.condition && ` · ${r.condition}`}
          </p>
        </div>
        <Badge tone={r.enabled ? 'green' : 'neutral'}>{r.enabled ? 'فعال' : 'غیرفعال'}</Badge>
      </div>
    ))}
  </div>
);
