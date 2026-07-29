import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  FileText,
  Clock,
  Bot,
  BarChart3,
  Receipt,
  Sparkles,
  Activity,
  ChevronLeft,
  Plus,
} from 'lucide-react';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { usePlatformData } from '../components/layout/PlatformLayout';
import { ROUTES } from '../routes';

const tabs = [
  { id: 'overview', label: 'نمای کلی', icon: FolderKanban },
  { id: 'cases', label: 'Case', icon: FileText },
  { id: 'documents', label: 'Document', icon: FileText },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'chat', label: 'Chat', icon: Bot },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'invoice', label: 'Invoice', icon: Receipt },
  { id: 'ai', label: 'AI', icon: Sparkles },
  { id: 'activity', label: 'Activity', icon: Activity },
] as const;

type TabId = (typeof tabs)[number]['id'];

export const WorkspacePage: React.FC = () => {
  const { workspaces, cases, documents, openNewCase } = usePlatformData();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedId, setSelectedId] = useState<string | null>(workspaces[0]?.id || null);
  const navigate = useNavigate();

  const selected = workspaces.find((w) => w.id === selectedId) || workspaces[0];
  const wsCases = cases.filter((c) => !selected || c.workspaceId === selected?.id || !c.workspaceId);
  const wsDocs = documents.filter((d) => wsCases.some((c) => c.id === d.caseId));

  if (workspaces.length === 0) {
    return (
      <EmptyState
        title="هنوز Workspace ندارید"
        description="اولین فضای کاری خود را بسازید تا پرونده‌ها، اسناد و AI در یک محیط یکپارچه مدیریت شوند."
        actionLabel="ایجاد Workspace"
        onAction={openNewCase}
        icon={<FolderKanban className="w-5 h-5" />}
      />
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Workspace"
        description="محیط کاری یکپارچه پرونده، سند، چت و گزارش"
        badge={<Badge tone="blue">هسته پلتفرم</Badge>}
        actions={
          <Button size="sm" onClick={openNewCase}>
            <Plus className="w-4 h-4" />
            پرونده جدید
          </Button>
        }
      />

      <div className="grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => setSelectedId(ws.id)}
              className={`w-full text-right p-3 rounded-lg border transition-colors ${
                selected?.id === ws.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">{ws.name}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{ws.description}</p>
              <Badge tone={ws.status === 'active' ? 'green' : 'neutral'} className="mt-2">
                {ws.status === 'active' ? 'فعال' : 'آرشیو'}
              </Badge>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
          <div className="border-b border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold">{selected?.name}</h2>
              <p className="text-[10px] text-slate-500">{selected?.description}</p>
            </div>
            <Badge>{wsCases.length} پرونده</Badge>
          </div>

          <div className="flex gap-1 overflow-x-auto px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-4 min-h-[280px]">
            {activeTab === 'overview' && (
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'پرونده‌ها', value: wsCases.length, to: ROUTES.cases },
                  { label: 'اسناد', value: wsDocs.length, to: ROUTES.documents },
                  { label: 'اعضا', value: selected?.memberIds.length || 0, to: ROUTES.settings },
                ].map((m) => (
                  <Link
                    key={m.label}
                    to={m.to}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-colors"
                  >
                    <div className="text-2xl font-black text-slate-800 dark:text-white">{m.value}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{m.label}</div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'cases' && (
              <div className="space-y-2">
                {wsCases.slice(0, 8).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/app/cases/${c.id}`)}
                    className="w-full flex items-center justify-between p-3 rounded-md border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-right"
                  >
                    <div>
                      <div className="text-xs font-bold">{c.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{c.caseNumber}</div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-2">
                {wsDocs.slice(0, 8).map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3 rounded-md border border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="text-xs font-bold">{d.title}</div>
                      <div className="text-[10px] text-slate-500">{d.uploadedAt} · {d.fileSize}</div>
                    </div>
                    <Badge>{d.fileType}</Badge>
                  </div>
                ))}
                {wsDocs.length === 0 && <p className="text-xs text-slate-500">سندی در این Workspace نیست.</p>}
              </div>
            )}

            {['timeline', 'chat', 'reports', 'invoice', 'ai', 'activity'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
                <Badge tone="blue">Placeholder</Badge>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  بخش {tabs.find((t) => t.id === activeTab)?.label}
                </p>
                <p className="text-xs text-slate-500 max-w-sm">
                  اسکلت این بخش در Sprint 1 آماده است. منطق عمیق در Sprintهای بعد پیاده می‌شود.
                </p>
                {activeTab === 'chat' && (
                  <Button size="sm" className="mt-2" onClick={() => navigate(ROUTES.chat)}>
                    رفتن به چت AI
                  </Button>
                )}
                {activeTab === 'reports' && (
                  <Button size="sm" className="mt-2" onClick={() => navigate(ROUTES.reports)}>
                    مشاهده گزارش‌ها
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
