import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Gavel,
  FileText,
  Bell,
  CheckSquare,
  Clock,
  ChevronLeft,
  ClipboardList,
} from 'lucide-react';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { usePlatformData } from '../components/layout/PlatformLayout';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes';
import { apiUrl } from '../lib/api';
import { getMockTasks, getMockRequests } from '../lib/mock';
import { featureBadge } from '../config/features';
import { CASE_STATUS_LABELS } from '../lib/labels';

export const DashboardPage: React.FC = () => {
  const { cases, documents, notifications, workspaces, openNewCase, user } = usePlatformData();
  const { can } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<{ plan: string; status: string } | null>(null);

  const activeCases = cases.filter((c) => !['completed', 'archived', 'cancelled'].includes(c.status));
  const unread = notifications.filter((n) => !n.read);
  const tasks = getMockTasks();
  const requests = getMockRequests();
  const aiBadge = featureBadge('aiAnalysis');

  useEffect(() => {
    fetch(apiUrl('/subscriptions'))
      .then((r) => (r.ok ? r.json() : []))
      .then((data: { plan?: string; status?: string }[]) => {
        const sub = data[0];
        if (sub) setSubscription({ plan: sub.plan || '—', status: sub.status || '—' });
      })
      .catch(() => setSubscription(null));
  }, []);

  const quickActions = [
    can('view_requests') && { label: 'ثبت درخواست', to: ROUTES.requestNew, icon: ClipboardList },
    can('create_case') && { label: 'پرونده جدید', action: openNewCase, icon: Plus },
    can('view_documents') && { label: 'بارگذاری مدرک', to: ROUTES.documents, icon: FileText },
    can('view_cases') && { label: 'پرونده‌ها', to: ROUTES.cases, icon: Gavel },
    can('view_notifications') && { label: 'اعلان‌ها', to: ROUTES.notifications, icon: Bell },
  ].filter(Boolean) as { label: string; to?: string; action?: () => void; icon: React.ElementType }[];

  return (
    <div className="space-y-5">
      <PageHeader
        title={`سلام${user ? `، ${user.name.split(' ').slice(-1)[0]}` : ''}`}
        description="محیط کاری DecisionOS — پرونده‌ها، اسناد و درخواست‌ها"
        actions={
          can('create_case') ? (
            <Button size="sm" onClick={openNewCase}>
              <Plus className="w-4 h-4" />
              پرونده جدید
            </Button>
          ) : can('view_requests') ? (
            <Button size="sm" onClick={() => navigate(ROUTES.requestNew)}>
              <ClipboardList className="w-4 h-4" />
              ثبت درخواست
            </Button>
          ) : undefined
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'درخواست جدید', value: requests.length, icon: ClipboardList },
          { label: 'پرونده فعال', value: activeCases.length, icon: Gavel },
          { label: 'اسناد', value: documents.length, icon: FileText },
          { label: 'Tasks', value: tasks.filter((t) => t.status !== 'done').length, icon: CheckSquare },
          { label: 'اعلان', value: unread.length, icon: Bell },
        ].map((w) => (
          <div key={w.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <w.icon className="w-4 h-4 text-blue-600 mb-2" />
            <div className="text-2xl font-black">{w.value}</div>
            <div className="text-[10px] text-slate-500">{w.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {quickActions.map((a) =>
          a.to ? (
            <Link key={a.label} to={a.to} className="flex items-center gap-2 p-3 rounded-lg border hover:border-blue-400 text-xs font-bold">
              <a.icon className="w-4 h-4 text-blue-600" />
              {a.label}
            </Link>
          ) : (
            <button key={a.label} onClick={a.action} className="flex items-center gap-2 p-3 rounded-lg border hover:border-blue-400 text-xs font-bold text-right">
              <a.icon className="w-4 h-4 text-blue-600" />
              {a.label}
            </button>
          )
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-lg border p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1.5">
            <Gavel className="w-3.5 h-3.5 text-blue-600" />
            Recent Cases
          </h3>
          {cases.length === 0 ? (
            <EmptyState title="پرونده‌ای نیست" description="اولین پرونده را ایجاد کنید." />
          ) : (
            cases.slice(0, 5).map((c) => (
              <button key={c.id} onClick={() => navigate(`/app/cases/${c.id}`)} className="w-full flex justify-between items-center text-[11px] p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
                <span className="font-semibold line-clamp-1">{c.title}</span>
                <Badge tone="blue">{CASE_STATUS_LABELS[c.status]}</Badge>
              </button>
            ))
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg border p-4">
            <h3 className="text-xs font-bold mb-2">Subscription</h3>
            {subscription ? (
              <p className="text-[11px] text-slate-500">پلن {subscription.plan} · {subscription.status}</p>
            ) : (
              <EmptyState title="اشتراک فعال نیست" description="—" />
            )}
          </div>
          {aiBadge && (
            <div className="bg-white dark:bg-slate-900 rounded-lg border p-4 text-center">
              <Badge tone="amber">{aiBadge}</Badge>
              <p className="text-[10px] text-slate-500 mt-2">تحلیل AI در Sprint بعد</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-lg border p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Timeline
          </h3>
          {cases.length === 0 ? (
            <p className="text-[11px] text-slate-500">رویدادی نیست</p>
          ) : (
            cases.slice(0, 3).map((c) => (
              <div key={c.id} className="text-[11px] border-r-2 border-blue-500 pr-2">
                <div className="font-semibold line-clamp-1">{c.title}</div>
                <div className="text-slate-500">{c.updatedAt}</div>
              </div>
            ))
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5" />
            Notifications
          </h3>
          {notifications.length === 0 ? (
            <EmptyState title="اعلانی نیست" />
          ) : (
            <>
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className={`text-[11px] ${n.read ? 'text-slate-500' : 'font-semibold'}`}>{n.title}</div>
              ))}
              <Link to={ROUTES.notifications} className="text-[11px] text-blue-600 font-bold">مشاهده همه</Link>
            </>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5" />
            Tasks
          </h3>
          {tasks.length === 0 ? (
            <EmptyState title="تسکی نیست" />
          ) : (
            tasks.slice(0, 3).map((t) => (
              <div key={t.id} className="text-[11px] line-clamp-2">{t.title}</div>
            ))
          )}
          <p className="text-[10px] text-slate-500">{workspaces.length} Workspace فعال</p>
        </div>
      </div>
    </div>
  );
};
