import React, { useState } from 'react';
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from './ui';
import { addAutomationRule } from '../lib/mock/automationRules';

export const AutomationRuleBuilder: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
  const [trigger, setTrigger] = useState('case.status.change');
  const [condition, setCondition] = useState('');
  const [action, setAction] = useState('notify.customer');
  const [preview, setPreview] = useState('');

  const build = () => {
    const rule = addAutomationRule({
      name: `Rule ${Date.now()}`,
      trigger,
      condition: condition || undefined,
      action,
      enabled: true,
    });
    setPreview(JSON.stringify(rule, null, 2));
    onCreated?.();
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="text-xs font-bold flex items-center gap-1">
          <Zap className="w-3.5 h-3.5" /> ساخت Rule
        </h4>
        <label className="block text-[10px] font-bold">Trigger</label>
        <select value={trigger} onChange={(e) => setTrigger(e.target.value)} className="w-full border rounded px-2 py-1.5 text-xs">
          <option value="case.status.change">تغییر وضعیت پرونده</option>
          <option value="document.upload">آپلود مدرک</option>
          <option value="task.due_soon">نزدیک deadline</option>
        </select>
        <label className="block text-[10px] font-bold">Condition (اختیاری)</label>
        <input value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full border rounded px-2 py-1.5 text-xs" placeholder="status = waiting_docs" />
        <label className="block text-[10px] font-bold">Action</label>
        <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full border rounded px-2 py-1.5 text-xs">
          <option value="notify.customer">اعلان مشتری</option>
          <option value="assign.expert">تخصیص کارشناس</option>
          <option value="change.status">تغییر وضعیت</option>
        </select>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <ArrowLeft className="w-3 h-3" /> Trigger → Condition → Action
        </div>
        <Button size="sm" onClick={build}>
          ذخیره Rule (mock)
        </Button>
      </div>
      {preview && (
        <pre className="p-3 bg-slate-900 text-emerald-400 text-[10px] rounded-lg overflow-auto max-h-48">{preview}</pre>
      )}
    </div>
  );
};
