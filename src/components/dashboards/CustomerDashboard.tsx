import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Upload,
  UserCheck,
  Gavel,
  FileText,
  Video,
  CheckSquare,
  Bell,
  ChevronLeft,
} from 'lucide-react';
import { PageHeader, Badge, Button, EmptyState } from '../ui';
import { usePlatformData } from '../layout/PlatformLayout';
import { ROUTES } from '../../routes';
import { getMockTasks, getMockRequests, getUpcomingSessions } from '../../lib/mock';
import { CASE_STATUS_LABELS } from '../../lib/labels';
import { SimpleBarChart } from '../charts/SimpleCharts';

/** Customer Control Center — v8: درخواست مشاوره = نقطه شروع */
export const CustomerDashboard: React.FC = () => {
  const { cases, documents, notifications, user } = usePlatformData();
  const navigate = useNavigate();
  const tasks = getMockTasks().filter((t) => t.status !== 'done');
  const requests = getMockRequests();
  const sessions = getUpcomingSessions(4);
  const activeProjects = cases.filter((c) => !['completed', 'archived', 'cancelled'].includes(c.status));

  const kpis = [
    { label: 'پروژه‌های من', value: activeProjects.length, icon: Gavel, to: ROUTES.cases },
    { label: 'اسناد', value: documents.length, icon: FileText, to: ROUTES.documents },
    { label: 'جلسات', value: sessions.length, icon: Video, to: ROUTES.sessions },
    { label: 'تسک‌ها', value: tasks.length, icon: CheckSquare, to: ROUTES.workspace },
    { label: 'درخواست‌ها', value: requests.length, icon: ClipboardList, to: ROUTES.requestsList },
  ];

  const goRequest = () => navigate(ROUTES.requestNew);

  return (
    <div className="space-y-5">
      <PageHeader
        title={`سلام${user ? `، ${user.name.split(' ').slice(-1)[0]}` : ''}`}
        description="ابتدا درخواست مشاوره بدهید — پاسخ سیستمی رایگان، سپس در صورت نیاز مشاوره تخصصی"
        actions={
          <Button size="sm" onClick={goRequest}>
            <ClipboardList className="w-4 h-4" />
            درخواست مشاوره
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {kpis.map((k) => (
          <button
            key={k.label}
            type="button"
            onClick={() => navigate(k.to)}
            className="dos-card p-4 rounded-[var(--dos-radius-lg)] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-right hover:border-blue-400 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
          >
            <k.icon className="w-4 h-4 text-[var(--dos-primary)] mb-2" />
            <div className="text-2xl font-black">{k.value}</div>
            <div className="text-[10px] text-slate-500">{k.label}</div>
          </button>
        ))}
      </div>

      {activeProjects.length === 0 && (
        <EmptyState
          title="هنوز پروژه‌ای ندارید"
          description="با درخواست مشاوره شروع کنید؛ پاسخ اولیه سیستم رایگان است."
          actionLabel="درخواست مشاوره"
          onAction={goRequest}
          icon={<ClipboardList className="w-5 h-5" />}
        />
      )}

      <div className="grid sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={goRequest}
          className="p-5 rounded-[var(--dos-radius-lg)] border-2 border-dashed border-teal-400 bg-teal-50/50 dark:bg-teal-950/20 text-center hover:border-teal-600 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 outline-none"
        >
          <ClipboardList className="w-8 h-8 text-teal-700 mx-auto mb-2" />
          <p className="text-xs font-bold">درخواست مشاوره</p>
          <p className="text-[10px] text-slate-500 mt-1">قدم اول — رایگان سیستمی</p>
        </button>
        <button
          type="button"
          onClick={() => navigate(ROUTES.documents)}
          className="p-5 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 text-center hover:border-emerald-500 transition-colors"
        >
          <Upload className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <p className="text-xs font-bold">آپلود مدرک</p>
        </button>
        <button
          type="button"
          onClick={() => navigate(ROUTES.experts)}
          className="p-5 rounded-xl border-2 border-dashed border-violet-300 bg-violet-50/50 dark:bg-violet-950/20 text-center hover:border-violet-500 transition-colors"
        >
          <UserCheck className="w-8 h-8 text-violet-600 mx-auto mb-2" />
          <p className="text-xs font-bold">متخصصان من</p>
          <p className="text-[10px] text-slate-500 mt-1">فقط کسانی که با آن‌ها کار کرده‌اید</p>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold">پروژه‌های اخیر</h3>
            <Link to={ROUTES.cases} className="text-[10px] text-blue-600 font-bold flex items-center gap-0.5">
              همه <ChevronLeft className="w-3 h-3" />
            </Link>
          </div>
          {activeProjects.length === 0 ? (
            <EmptyState
              title="پروژه‌ای نیست"
              description="درخواست‌های شما پس از ثبت اینجا به‌عنوان پروژه دیده می‌شوند."
              actionLabel="درخواست مشاوره"
              onAction={goRequest}
            />
          ) : (
            activeProjects.slice(0, 5).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => navigate(`${ROUTES.cases}/${c.id}`)}
                className="w-full flex justify-between items-center text-[11px] p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-right"
              >
                <span className="font-semibold line-clamp-1">{c.title}</span>
                <Badge tone="blue">{CASE_STATUS_LABELS[c.status]}</Badge>
              </button>
            ))
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
            <h3 className="text-xs font-bold mb-1">جلسات پیش‌رو</h3>
            {sessions.length === 0 ? (
              <EmptyState
                title="جلسه‌ای نیست"
                description="می‌توانید از تقویم یا درخواست مشاوره جلسه بگذارید."
                actionLabel="درخواست مشاوره"
                onAction={goRequest}
              />
            ) : (
              sessions.map((s) => (
                <div key={s.id} className="text-[11px] p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <p className="font-bold">{s.title}</p>
                  <p className="text-slate-500">
                    {s.date} — {s.time}
                  </p>
                </div>
              ))
            )}
            <Link to={ROUTES.sessions} className="text-[10px] text-blue-600 font-bold">
              همه جلسات
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border p-4">
            <h3 className="text-xs font-bold mb-2 flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" /> اعلان‌ها
            </h3>
            {notifications.slice(0, 3).map((n) => (
              <p key={n.id} className="text-[10px] text-slate-600 dark:text-slate-400 py-1 border-b last:border-0">
                {n.title}
              </p>
            ))}
            <Link to={ROUTES.notifications} className="text-[10px] text-blue-600 font-bold mt-2 inline-block">
              همه
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border p-4">
        <h3 className="text-xs font-bold mb-3">وضعیت پروژه‌ها</h3>
        <SimpleBarChart
          data={[
            { label: 'فعال', value: activeProjects.length },
            { label: 'درخواست', value: requests.length },
            { label: 'تسک باز', value: tasks.length },
          ]}
        />
      </div>
    </div>
  );
};
