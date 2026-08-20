import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FolderKanban,
  FileText,
  Clock,
  Sparkles,
  BarChart3,
  ChevronLeft,
  Plus,
  MessageSquare,
  CheckSquare,
  Upload,
} from 'lucide-react';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { usePlatformData } from '../components/layout/PlatformLayout';
import { ROUTES } from '../routes';
import { TimelineFeed } from '../components/TimelineEvent';
import { getMockTimelineEvents, getMockTasks, addMockTask, updateMockTask, toggleSubTask, isTaskOverdue } from '../lib/mock';
import { CASE_STATUS_LABELS, CASE_STATUS_COLORS, TASK_STATUS_LABELS, PRIORITY_LABELS } from '../lib/labels';
import { featureBadge } from '../config/features';
import { PlatformTask } from '../types';
import { useAuth } from '../context/AuthContext';
import { DocumentLoopPanel, CaseStatusBar } from '../components/DocumentLoopPanel';
import { getDocumentLoopState } from '../lib/mock/documentLoop';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FolderKanban },
  { id: 'cases', label: 'Case', icon: FileText },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'ai', label: 'AI', icon: Sparkles },
] as const;

type TabId = (typeof tabs)[number]['id'];

export const WorkspacePage: React.FC = () => {
  const { workspaceId } = useParams();
  const { workspaces, cases, documents, openNewCase } = usePlatformData();
  const { can } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedId, setSelectedId] = useState<string | null>(workspaceId || workspaces[0]?.id || null);
  const [tasks, setTasks] = useState<PlatformTask[]>([]);
  const navigate = useNavigate();

  const selected = workspaces.find((w) => w.id === selectedId) || workspaces[0];
  const wsCases = cases.filter((c) => selected && (c.workspaceId === selected.id || !c.workspaceId));
  const wsDocs = documents.filter((d) => wsCases.some((c) => c.id === d.caseId));
  const primaryCase = wsCases[0];
  const docLoop = getDocumentLoopState(primaryCase?.id);
  const caseStatus = docLoop.caseStatus || primaryCase?.status || 'new';
  const timelineEvents = getMockTimelineEvents(primaryCase?.id, selected?.id);
  const aiBadge = featureBadge('workspaceAi');

  React.useEffect(() => {
    if (selected?.id) setTasks(getMockTasks(selected.id));
  }, [selected?.id]);

  if (workspaces.length === 0) {
    return (
      <EmptyState
        title="هنوز Workspace ندارید"
        description="با ثبت درخواست یا ایجاد پرونده، Workspace ساخته می‌شود."
        actionLabel={can('create_case') ? 'ایجاد پرونده' : 'ثبت درخواست'}
        onAction={() => (can('create_case') ? openNewCase() : navigate(ROUTES.requestNew))}
        icon={<FolderKanban className="w-5 h-5" />}
      />
    );
  }

  if (workspaceId && !workspaces.find((w) => w.id === workspaceId)) {
    return (
      <EmptyState
        title="Workspace یافت نشد"
        description="شناسه Workspace نامعتبر است."
        actionLabel="بازگشت"
        onAction={() => navigate(ROUTES.workspace)}
      />
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Workspace"
        description="محیط مرکزی پرونده — Overview · Case · Documents · Tasks · Timeline"
        badge={<Badge tone="blue">هسته پلتفرم</Badge>}
        actions={
          can('create_case') ? (
            <Button size="sm" onClick={openNewCase}>
              <Plus className="w-4 h-4" />
              پرونده جدید
            </Button>
          ) : undefined
        }
      />

      <div className="grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => {
                setSelectedId(ws.id);
                navigate(`/app/workspace/${ws.id}`);
              }}
              className={`w-full text-right p-3 rounded-lg border transition-colors ${
                selected?.id === ws.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">{ws.name}</span>
              </div>
              <Badge tone={ws.status === 'active' ? 'green' : 'neutral'} className="mt-2">
                {ws.status === 'active' ? 'فعال' : 'آرشیو'}
              </Badge>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border rounded-lg overflow-hidden">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-bold">{selected?.name}</h2>
            <p className="text-[10px] text-slate-500">{selected?.description}</p>
          </div>

          <div className="flex gap-1 overflow-x-auto px-3 py-2 border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  {tab.id === 'ai' && aiBadge && <span className="text-[9px] opacity-80">({aiBadge})</span>}
                </button>
              );
            })}
          </div>

          <div className="p-4 min-h-[280px]">
            {activeTab === 'overview' && primaryCase && (
              <div className="space-y-4">
                <CaseStatusBar currentStatus={caseStatus} />
                <DocumentLoopPanel caseId={primaryCase.id} />
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border">
                    <p className="text-[10px] text-slate-500">وضعیت</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border inline-block ${CASE_STATUS_COLORS[primaryCase.status]}`}>
                      {CASE_STATUS_LABELS[primaryCase.status]}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <p className="text-[10px] text-slate-500">Deadline</p>
                    <p className="text-xs font-bold">{primaryCase.deadline || '—'}</p>
                  </div>
                </div>
                <p className="text-xs"><span className="font-bold">پرونده:</span> {primaryCase.title}</p>
                <p className="text-xs"><span className="font-bold">Expert:</span> {primaryCase.assignedExpertId || 'تعیین نشده'}</p>
              </div>
            )}

            {activeTab === 'cases' && (
              <div className="space-y-2">
                {wsCases.length === 0 ? (
                  <EmptyState title="پرونده‌ای در Workspace نیست" />
                ) : (
                  wsCases.map((c) => (
                    <button key={c.id} onClick={() => navigate(`/app/cases/${c.id}`)} className="w-full flex justify-between p-3 rounded-md border hover:border-blue-400 text-right">
                      <div>
                        <div className="text-xs font-bold">{c.title}</div>
                        <div className="text-[10px] text-slate-500">{c.caseNumber}</div>
                      </div>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  ))
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-2">
                {wsDocs.length === 0 ? (
                  <EmptyState title="سندی نیست" actionLabel="مرکز اسناد" onAction={() => navigate(ROUTES.documents)} icon={<Upload className="w-5 h-5" />} />
                ) : (
                  wsDocs.map((d) => (
                    <div key={d.id} className="flex justify-between p-3 rounded-md border">
                      <div>
                        <div className="text-xs font-bold">{d.title}</div>
                        <div className="text-[10px] text-slate-500">{d.uploadedAt}</div>
                      </div>
                      <Badge>{d.fileType}</Badge>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'tasks' && (
              <TasksTab tasks={tasks} workspaceId={selected?.id} caseId={primaryCase?.id} onChange={setTasks} />
            )}

            {activeTab === 'timeline' && <TimelineFeed events={timelineEvents} />}

            {activeTab === 'messages' && (
              <EmptyState title="Messages" description="ساختار پیام‌رسانی — Placeholder Sprint 2" />
            )}

            {activeTab === 'reports' && (
              <EmptyState title="Reports" description="گزارش‌های تحلیلی — Placeholder" />
            )}

            {activeTab === 'ai' && (
              <div className="text-center py-10 space-y-2">
                <Sparkles className="w-10 h-10 text-blue-400 mx-auto" />
                <Badge tone="amber">{aiBadge || 'Coming Soon'}</Badge>
                <p className="text-sm font-bold">AI Workspace</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">فقط ساختار UI — AI Agent در Sprint بعد</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function TasksTab({
  tasks,
  workspaceId,
  caseId,
  onChange,
}: {
  tasks: PlatformTask[];
  workspaceId?: string;
  caseId?: string;
  onChange: (t: PlatformTask[]) => void;
}) {
  const { can } = useAuth();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<PlatformTask['priority']>('medium');
  const [dueDate, setDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const addTask = () => {
    if (!title.trim() || !can('manage_tasks')) return;
    const t = addMockTask({
      title,
      workspaceId,
      caseId,
      status: 'todo',
      priority,
      dueDate: dueDate || undefined,
      assigneeName: 'کارشناس',
    });
    onChange([...tasks, t]);
    setTitle('');
    setDueDate('');
  };

  const filtered = tasks.filter((t) => {
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-md" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0 && !can('manage_tasks')) {
    return <EmptyState title="تسکی ثبت نشده" />;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded px-2 py-1 text-[10px]">
          <option value="all">همه وضعیت‌ها</option>
          <option value="todo">To Do</option>
          <option value="doing">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="border rounded px-2 py-1 text-[10px]">
          <option value="all">همه اولویت‌ها</option>
          <option value="high">بالا</option>
          <option value="medium">متوسط</option>
          <option value="low">پایین</option>
        </select>
      </div>
      {can('manage_tasks') && (
        <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان task..." className="flex-1 min-w-[120px] border rounded-md px-3 py-1.5 text-xs" />
          <select value={priority} onChange={(e) => setPriority(e.target.value as PlatformTask['priority'])} className="border rounded px-2 py-1 text-[10px]">
            <option value="high">بالا</option>
            <option value="medium">متوسط</option>
            <option value="low">پایین</option>
          </select>
          <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="deadline" className="w-24 border rounded-md px-2 py-1.5 text-[10px]" />
          <Button size="sm" onClick={addTask}>افزودن</Button>
        </div>
      )}
      {filtered.length === 0 ? (
        <EmptyState title="تسکی نیست" description="اولین task را اضافه کنید." />
      ) : (
        filtered.map((t) => (
          <div key={t.id} className="p-3 rounded-md border text-xs space-y-2 bg-white dark:bg-slate-900">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold flex items-center gap-2 flex-wrap">
                  {t.title}
                  <Badge tone={t.priority === 'high' ? 'rose' : t.priority === 'medium' ? 'amber' : 'neutral'}>{PRIORITY_LABELS[t.priority]}</Badge>
                  {isTaskOverdue(t.dueDate) && t.status !== 'done' && <Badge tone="rose">Overdue</Badge>}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {t.dueDate || 'بدون deadline'} · {t.assigneeName || '—'} · {TASK_STATUS_LABELS[t.status]}
                </p>
              </div>
              {can('manage_tasks') && (
                <select
                  value={t.status}
                  onChange={(e) => {
                    const updated = updateMockTask(t.id, { status: e.target.value as PlatformTask['status'] });
                    if (updated) onChange(tasks.map((x) => (x.id === t.id ? updated : x)));
                  }}
                  className="border rounded px-2 py-1 text-[10px]"
                >
                  <option value="todo">To Do</option>
                  <option value="doing">In Progress</option>
                  <option value="done">Done</option>
                </select>
              )}
            </div>
            {t.subTasks && t.subTasks.length > 0 && (
              <ul className="mr-3 space-y-1 border-r-2 border-slate-200 pr-2">
                {t.subTasks.map((st) => (
                  <li key={st.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={st.done}
                      onChange={() => {
                        toggleSubTask(t.id, st.id);
                        onChange(getMockTasks(workspaceId, caseId));
                      }}
                    />
                    <span className={st.done ? 'line-through text-slate-400' : ''}>{st.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}
