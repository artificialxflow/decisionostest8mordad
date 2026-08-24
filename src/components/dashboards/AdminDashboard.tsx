import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Gavel,
  FileText,
  Video,
  Wallet,
  Activity,
  ShieldCheck,
  Building2,
  Plug,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { PageHeader, Badge, Button } from '../ui';
import { ROUTES } from '../../routes';
import {
  getAdminPlatformKpis,
  getSystemHealth,
  getAdminActivities,
  getNewUsers,
  MOCK_GROWTH_SERIES,
  MOCK_PROJECT_DISTRIBUTION,
} from '../../lib/mock/adminSystem';
import { formatToman } from '../../lib/mock/expertStats';
import { SimpleBarChart, SimpleDonutChart } from '../charts/SimpleCharts';

/** Admin Control Center — updates/05 */
export const AdminDashboard: React.FC = () => {
  const kpis = getAdminPlatformKpis();
  const health = getSystemHealth();
  const activities = getAdminActivities();
  const newUsers = getNewUsers();

  const cards = [
    { label: 'کاربران', value: kpis.totalUsers, icon: Users },
    { label: 'متخصصان', value: kpis.totalExperts, icon: UserCheck },
    { label: 'پروژه‌ها', value: kpis.totalProjects, icon: Gavel },
    { label: 'اسناد', value: kpis.totalDocuments, icon: FileText },
    { label: 'جلسات', value: kpis.totalSessions, icon: Video },
    { label: 'درآمد کل', value: formatToman(kpis.totalRevenue), icon: Wallet, isText: true },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Admin Control Center"
        description="نظارت سراسری پلتفرم — کاربران، پروژه، سلامت سیستم"
        badge={<Badge tone="blue">Admin</Badge>}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link to={ROUTES.adminMonitoring}>
              <Button size="sm" variant="outline">
                <Activity className="w-3.5 h-3.5" /> Monitoring
              </Button>
            </Link>
            <Link to={ROUTES.audit}>
              <Button size="sm" variant="outline">
                <ShieldCheck className="w-3.5 h-3.5" /> Audit
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="p-4 rounded-xl border bg-white dark:bg-slate-900">
            <c.icon className="w-4 h-4 text-blue-600 mb-2" />
            <div className={`font-black ${c.isText ? 'text-sm' : 'text-xl'}`}>{c.value}</div>
            <div className="text-[10px] text-slate-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4">
          <h3 className="text-xs font-bold mb-3">روند رشد پروژه‌ها</h3>
          <SimpleBarChart data={MOCK_GROWTH_SERIES.map((d) => ({ label: d.label, value: d.value }))} />
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4">
          <h3 className="text-xs font-bold mb-3">توزیع وضعیت پروژه‌ها</h3>
          <SimpleDonutChart data={MOCK_PROJECT_DISTRIBUTION.map((d) => ({ label: d.label, value: d.value }))} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <h3 className="text-xs font-bold mb-2">سلامت سیستم</h3>
          {health.map((h) => (
            <div key={h.id} className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <span>{h.label}</span>
              {h.status === 'ok' ? (
                <Badge tone="green">
                  <CheckCircle2 className="w-3 h-3 inline ml-0.5" /> فعال
                </Badge>
              ) : h.status === 'warn' ? (
                <Badge tone="amber">
                  <AlertTriangle className="w-3 h-3 inline ml-0.5" /> هشدار
                </Badge>
              ) : (
                <Badge tone="rose">قطع</Badge>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <h3 className="text-xs font-bold mb-2">آخرین فعالیت‌های سیستم</h3>
          {activities.map((a) => (
            <div key={a.id} className="text-[11px] border-r-2 border-blue-500 pr-2 py-1">
              <p className="font-semibold">{a.text}</p>
              <p className="text-slate-400">{a.time}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 space-y-2">
          <h3 className="text-xs font-bold mb-2">کاربران جدید</h3>
          {newUsers.map((u) => (
            <div key={u.id} className="flex justify-between text-[11px] p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
              <div>
                <p className="font-bold">{u.name}</p>
                <p className="text-slate-500">{u.role}</p>
              </div>
              <span className="text-slate-400">{u.joinedAt}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to={ROUTES.organizations}>
          <Button size="sm" variant="outline">
            <Building2 className="w-3.5 h-3.5" /> سازمان‌ها / Tenants
          </Button>
        </Link>
        <Link to={ROUTES.adminIntegrations}>
          <Button size="sm" variant="outline">
            <Plug className="w-3.5 h-3.5" /> یکپارچه‌سازی
          </Button>
        </Link>
        <Link to={ROUTES.experts}>
          <Button size="sm" variant="outline">
            <UserCheck className="w-3.5 h-3.5" /> متخصصان
          </Button>
        </Link>
        <Link to={ROUTES.reports}>
          <Button size="sm" variant="outline">
            گزارش‌ها
          </Button>
        </Link>
      </div>
    </div>
  );
};
