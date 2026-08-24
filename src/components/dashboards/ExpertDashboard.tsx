import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Inbox,
  Gavel,
  Video,
  Star,
  Wallet,
  CalendarDays,
  UserCircle,
  ChevronLeft,
} from 'lucide-react';
import { PageHeader, Badge, Button } from '../ui';
import { usePlatformData } from '../layout/PlatformLayout';
import { ROUTES } from '../../routes';
import { getMockRequests, getTodaySessions } from '../../lib/mock';
import { getExpertDashboardStats, formatToman } from '../../lib/mock/expertStats';
import { CASE_STATUS_LABELS } from '../../lib/labels';

/** Expert Control Center — updates/05 */
export const ExpertDashboard: React.FC = () => {
  const { cases, user } = usePlatformData();
  const navigate = useNavigate();
  const stats = getExpertDashboardStats();
  const requests = getMockRequests().slice(0, 4);
  const todaySessions = getTodaySessions();
  const assigned = cases.filter((c) => !['completed', 'archived', 'cancelled'].includes(c.status)).slice(0, 5);
  const [joinToast, setJoinToast] = useState('');

  const joinSession = (title: string) => {
    setJoinToast(`ورود به جلسه «${title}» — نسخه نمایشی`);
    setTimeout(() => setJoinToast(''), 2500);
  };

  const kpis = [
    { label: 'درخواست جدید', value: stats.newRequests, icon: Inbox },
    { label: 'پروژه ارجاع‌شده', value: stats.assignedProjects, icon: Gavel },
    { label: 'جلسات پیش‌رو', value: stats.upcomingSessions, icon: Video },
    { label: 'امتیاز', value: stats.rating, icon: Star },
  ];

  const maxStars = Math.max(...stats.ratingBreakdown.map((r) => r.count), 1);

  return (
    <div className="space-y-5">
      {joinToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg z-50">
          {joinToast}
        </div>
      )}
      <PageHeader
        title={`${user?.name || 'متخصص'} — داشبورد تخصصی`}
        description="درخواست‌ها، جلسات، درآمد و نظرات"
        badge={<Badge tone="blue">Expert</Badge>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="p-4 rounded-xl border bg-white dark:bg-slate-900">
            <k.icon className="w-4 h-4 text-blue-600 mb-2" />
            <div className="text-2xl font-black">{k.value}</div>
            <div className="text-[10px] text-slate-500">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold flex items-center gap-1">
              <Inbox className="w-3.5 h-3.5 text-amber-600" />
              درخواست‌های جدید
              <Badge tone="amber">{stats.newRequests}</Badge>
            </h3>
            <Link to={ROUTES.requestsList} className="text-[10px] text-blue-600 font-bold">
              همه
            </Link>
          </div>
          {requests.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-2.5 rounded-lg border text-[11px]">
              <div className="min-w-0">
                <p className="font-bold truncate">{r.title}</p>
                <p className="text-slate-500">{r.createdAt}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => navigate(ROUTES.requestsList)}>
                مشاهده و پاسخ
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1 mb-2">
            <Video className="w-3.5 h-3.5 text-emerald-600" />
            جلسات امروز
          </h3>
          {todaySessions.length === 0 ? (
            <p className="text-[11px] text-slate-500">جلسه‌ای برای امروز نیست</p>
          ) : (
            todaySessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-[11px]">
                <div>
                  <p className="font-bold">{s.time} — {s.title}</p>
                  <p className="text-slate-500">{s.clientName || 'مشتری'}</p>
                </div>
                <Button size="sm" onClick={() => joinSession(s.title)}>
                  ورود به جلسه
                </Button>
              </div>
            ))
          )}
          <Link to={ROUTES.calendar} className="text-[10px] text-blue-600 font-bold flex items-center gap-1 pt-1">
            <CalendarDays className="w-3 h-3" /> تقویم کامل
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-bl from-emerald-600 to-emerald-800 text-white rounded-xl p-5 space-y-2">
          <p className="text-[10px] opacity-80 flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5" /> درآمد ماهانه
          </p>
          <p className="text-2xl font-black">{formatToman(stats.monthlyIncome)} تومان</p>
          <p className="text-[11px] text-emerald-100">+{stats.incomeGrowthPercent}٪ نسبت به ماه قبل</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <div className="flex justify-between">
            <h3 className="text-xs font-bold">تکمیل پروفایل</h3>
            <span className="text-xs font-black text-blue-600">{stats.profileCompletion}٪</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${stats.profileCompletion}%` }} />
          </div>
          <Link to={ROUTES.profile} className="text-[10px] text-blue-600 font-bold flex items-center gap-1">
            <UserCircle className="w-3 h-3" /> تکمیل پروفایل
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            امتیاز {stats.rating}
          </h3>
          {stats.ratingBreakdown.map((r) => (
            <div key={r.stars} className="flex items-center gap-2 text-[10px]">
              <span className="w-6">{r.stars}★</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(r.count / maxStars) * 100}%` }} />
              </div>
              <span className="text-slate-400 w-6">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <h3 className="text-xs font-bold mb-2">پروژه‌های ارجاع‌شده</h3>
          {assigned.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => navigate(`${ROUTES.cases}/${c.id}`)}
              className="w-full flex justify-between items-center text-[11px] p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-right"
            >
              <span className="font-semibold line-clamp-1">{c.title}</span>
              <Badge tone="blue">{CASE_STATUS_LABELS[c.status]}</Badge>
            </button>
          ))}
          <Link to={ROUTES.cases} className="text-[10px] text-blue-600 font-bold flex items-center gap-0.5">
            همه <ChevronLeft className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-3">
          <h3 className="text-xs font-bold">نظرات اخیر</h3>
          {stats.reviews.map((rev) => (
            <div key={rev.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-[11px]">
              <div className="flex justify-between mb-1">
                <span className="font-bold">{rev.clientName}</span>
                <span className="text-amber-600">{'★'.repeat(rev.rating)}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">{rev.comment}</p>
              <p className="text-slate-400 mt-1">{rev.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
