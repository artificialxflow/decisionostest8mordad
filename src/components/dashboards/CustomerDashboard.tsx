import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Upload,
  UserCheck,
  Gavel,
  FileText,
  Video,
  CheckSquare,
  ClipboardList,
  Bell,
  ChevronLeft,
} from 'lucide-react';
import { PageHeader, Badge, Button } from '../ui';
import { usePlatformData } from '../layout/PlatformLayout';
import { ROUTES } from '../../routes';
import { getMockTasks, getMockRequests, getUpcomingSessions } from '../../lib/mock';
import { CASE_STATUS_LABELS } from '../../lib/labels';
import { SimpleBarChart } from '../charts/SimpleCharts';

/** Customer Control Center — updates/05 */
export const CustomerDashboard: React.FC = () => {
  const { cases, documents, notifications, openNewCase, user } = usePlatformData();
  const navigate = useNavigate();
  const tasks = getMockTasks().filter((t) => t.status !== 'done');
  const requests = getMockRequests();
  const sessions = getUpcomingSessions(4);
  const unread = notifications.filter((n) => !n.read);
  const activeProjects = cases.filter((c) => !['completed', 'archived', 'cancelled'].includes(c.status));

  const kpis = [
    { label: 'پروژه‌های من', value: activeProjects.length, icon: Gavel, to: ROUTES.cases },
    { label: 'اسناد', value: documents.length, icon: FileText, to: ROUTES.documents },
    { label: 'جلسات', value: sessions.length, icon: Video, to: ROUTES.sessions },
    { label: 'تسک‌ها', value: tasks.length, icon: CheckSquare, to: ROUTES.workspace },
    { label: 'درخواست‌ها', value: requests.length, icon: ClipboardList, to: ROUTES.requestsList },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title={`سلام${user ? `، ${user.name.split(' ').slice(-1)[0]}` : ''}`}
        description="داشبورد مشتری — پروژه‌ها، جلسات و متخصصان"
        actions={
          <Button size="sm" onClick={openNewCase}>
            <Plus className="w-4 h-4" />
            پروژه جدید
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((k) => (
          <button
            key={k.label}
            type="button"
            onClick={() => navigate(k.to)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-right hover:border-blue-400 transition-colors"
          >
            <k.icon className="w-4 h-4 text-blue-600 mb-2" />
            <div className="text-2xl font-black">{k.value}</div>
            <div className="text-[10px] text-slate-500">{k.label}</div>
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={openNewCase}
          className="p-5 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 dark:bg-blue-950/20 text-center hover:border-blue-500 transition-colors"
        >
          <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-xs font-bold">ایجاد پروژه جدید</p>
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
          <p className="text-xs font-bold">پیدا کردن متخصص</p>
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
          {activeProjects.slice(0, 5).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => navigate(`${ROUTES.cases}/${c.id}`)}
              className="w-full flex justify-between items-center text-[11px] p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-right"
            >
              <span className="font-semibold line-clamp-1">{c.title}</span>
              <Badge tone="blue">{CASE_STATUS_LABELS[c.status]}</Badge>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold">جلسات پیش‌رو</h3>
            <Link to={ROUTES.sessions} className="text-[10px] text-blue-600 font-bold">
              همه
            </Link>
          </div>
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-[11px]">
              {s.avatarUrl ? (
                <img src={s.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold">
                  {s.expertName.slice(0, 1)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold truncate">{s.title}</p>
                <p className="text-slate-500">
                  {s.date} · {s.time} · {s.expertName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5" />
            اعلان‌های اخیر
          </h3>
          {unread.length === 0 && notifications.length === 0 ? (
            <p className="text-[11px] text-slate-500">اعلانی نیست</p>
          ) : (
            notifications.slice(0, 4).map((n) => (
              <div key={n.id} className={`text-[11px] p-2 rounded ${n.read ? 'text-slate-500' : 'font-semibold bg-blue-50/50 dark:bg-blue-950/20'}`}>
                {n.title}
              </div>
            ))
          )}
          <Link to={ROUTES.notifications} className="text-[11px] text-blue-600 font-bold inline-block pt-1">
            مشاهده همه
          </Link>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4">
          <h3 className="text-xs font-bold mb-3">فعالیت هفته</h3>
          <SimpleBarChart
            data={[
              { label: 'ش', value: 2 },
              { label: 'ی', value: 4 },
              { label: 'د', value: 3 },
              { label: 'س', value: 5 },
              { label: 'چ', value: 2 },
              { label: 'پ', value: 6 },
              { label: 'ج', value: 1 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
