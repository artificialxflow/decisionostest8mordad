import React, { useState } from 'react';
import { Activity, AlertTriangle } from 'lucide-react';
import { PageHeader, Badge, Button } from '../components/ui';
import { MOCK_MONITORING } from '../lib/mock/monitoring';
import { Sparkline } from '../components/charts/SimpleCharts';
import { getIntegrations, toggleIntegration, testIntegration, IntegrationConfig } from '../lib/mock/integrations';
import { getKnowledgeDocs, addKnowledgeDoc, KnowledgeDoc } from '../lib/mock/knowledge';
import { getAiQueue, AiQueueItem } from '../lib/mock/aiAgentQueue';

export const MonitoringDashboardPage: React.FC = () => {
  const m = MOCK_MONITORING;
  return (
    <div className="space-y-5">
      <PageHeader title="Monitoring" description="سلامت سیستم — mock admin" badge={<Badge tone="green">Live (demo)</Badge>} />
      <div className="grid sm:grid-cols-4 gap-3">
        {[
          { label: 'Uptime', value: `${m.uptime}%` },
          { label: 'Req/min', value: m.requestsPerMin },
          { label: 'Error rate', value: `${m.errorRate}%` },
          { label: 'Active users', value: m.activeUsers },
        ].map((s) => (
          <div key={s.label} className="p-4 border rounded-lg bg-white dark:bg-slate-900">
            <p className="text-[10px] text-slate-500">{s.label}</p>
            <p className="text-xl font-black">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border rounded-lg">
        <p className="text-xs font-bold mb-2">Traffic (12h)</p>
        <Sparkline values={m.sparkline} />
      </div>
      <div className="border rounded-lg divide-y">
        <div className="p-3 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Alerts
        </div>
        {m.alerts.map((a) => (
          <div key={a.id} className="p-3 text-xs flex justify-between gap-2">
            <span>{a.message}</span>
            <Badge tone={a.level === 'error' ? 'rose' : a.level === 'warning' ? 'amber' : 'blue'}>{a.time}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export const IntegrationsPage: React.FC = () => {
  const [items, setItems] = useState<IntegrationConfig[]>(() => getIntegrations());
  const [toast, setToast] = useState('');

  const toggle = (key: IntegrationConfig['key']) => {
    toggleIntegration(key);
    setItems(getIntegrations());
  };

  const test = (key: IntegrationConfig['key']) => {
    setToast(testIntegration(key));
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="space-y-5">
      <PageHeader title="یکپارچه‌سازی" description="SMS · Email · WhatsApp · Webhook" />
      {toast && <div className="text-xs bg-emerald-100 text-emerald-800 p-2 rounded">{toast}</div>}
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((i) => (
          <div key={i.key} className="p-4 border rounded-lg space-y-3 bg-white dark:bg-slate-900">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold">{i.label}</span>
              <button type="button" onClick={() => toggle(i.key)} className={`text-xs px-2 py-1 rounded ${i.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100'}`}>
                {i.enabled ? 'فعال' : 'غیرفعال'}
              </button>
            </div>
            <input readOnly value={i.apiKeyMasked} className="w-full border rounded px-2 py-1 text-xs bg-slate-50 dark:bg-slate-800" />
            <button type="button" onClick={() => test(i.key)} className="text-xs text-blue-600 font-bold">
              Test connection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AiDataPrepPage: React.FC = () => {
  const steps = [
    { label: 'پاک‌سازی داده', done: true },
    { label: 'برچسب‌گذاری', done: true },
    { label: 'Export JSON', done: false },
    { label: 'آمادگی Vector DB', done: false },
  ];
  const progress = Math.round((steps.filter((s) => s.done).length / steps.length) * 100);

  return (
    <div className="space-y-5">
      <PageHeader title="آماده‌سازی داده AI" description="Sprint 5 prep — mock" badge={<Badge tone="blue">{progress}%</Badge>} />
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-violet-600 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <ul className="space-y-2 text-xs">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2 p-2 border rounded bg-white dark:bg-slate-900">
            <Activity className={`w-4 h-4 ${s.done ? 'text-emerald-600' : 'text-slate-300'}`} />
            {s.label}
          </li>
        ))}
      </ul>
      <Button size="sm" onClick={() => alert('Export JSON (mock)')}>
        Export JSON
      </Button>
    </div>
  );
};

export const KnowledgeBaseAdminPage: React.FC = () => {
  const [docs, setDocs] = useState<KnowledgeDoc[]>(() => getKnowledgeDocs());
  const [title, setTitle] = useState('');

  const upload = () => {
    if (!title.trim()) return;
    addKnowledgeDoc(title, 'law');
    setDocs(getKnowledgeDocs());
    setTitle('');
  };

  return (
    <div className="space-y-5">
      <PageHeader title="پایگاه دانش" description="اسناد حقوقی برای RAG — mock" />
      <div className="flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان سند..." className="flex-1 border rounded-md px-3 py-2 text-xs" />
        <Button size="sm" onClick={upload}>
          Upload (mock)
        </Button>
      </div>
      <div className="divide-y border rounded-lg bg-white dark:bg-slate-900">
        {docs.map((d) => (
          <div key={d.id} className="flex justify-between p-3 text-xs">
            <span>{d.title}</span>
            <Badge tone={d.indexed ? 'green' : 'amber'}>{d.indexed ? 'Indexed' : 'Pending'}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AiQueuePage: React.FC = () => {
  const queue: AiQueueItem[] = getAiQueue();
  return (
    <div className="space-y-5">
      <PageHeader title="صف تحلیل AI" description="AI Agent — demo queue" badge={<Badge tone="blue">نقش سیستمی</Badge>} />
      <div className="space-y-2">
        {queue.map((q) => (
          <div key={q.id} className="flex justify-between p-3 border rounded-lg text-xs bg-white dark:bg-slate-900">
            <div>
              <p className="font-bold">{q.caseTitle}</p>
              <p className="text-slate-500">{q.task}</p>
            </div>
            <div className="flex gap-2">
              <Badge tone="neutral">{q.priority}</Badge>
              <Badge tone={q.status === 'done' ? 'green' : q.status === 'processing' ? 'blue' : 'amber'}>{q.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
