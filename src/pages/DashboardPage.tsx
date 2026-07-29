import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Sparkles,
  Gavel,
  FileText,
  Bell,
  CreditCard,
  CheckSquare,
  Clock,
  Bot,
  ChevronLeft,
} from 'lucide-react';
import { PageHeader, Badge, Button } from '../components/ui';
import { usePlatformData } from '../components/layout/PlatformLayout';
import { ROUTES } from '../routes';
import { apiUrl } from '../lib/api';

export const DashboardPage: React.FC = () => {
  const { cases, documents, notifications, workspaces, openNewCase, user } = usePlatformData();
  const navigate = useNavigate();
  const [riskText, setRiskText] = React.useState('');
  const [riskResult, setRiskResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const highPriority = cases.filter((c) => c.priority === 'high');
  const unread = notifications.filter((n) => !n.read);

  const runQuickRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskText.trim()) return;
    setLoading(true);
    setRiskResult(null);
    try {
      const res = await fetch(apiUrl('/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `ارزیابی سریع ریسک برای: "${riskText}" — ۲ ریسک اصلی و ۱ پیشنهاد فوری.`,
        }),
      });
      const data = await res.json();
      setRiskResult(data.text || 'ارزیابی انجام شد.');
    } catch {
      setRiskResult('خطا در ارتباط با AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title={`سلام${user ? `، ${user.name.split(' ').slice(-1)[0]}` : ''}`}
        description="محیط کاری DecisionOS — پرونده‌ها، اسناد و AI در یک نگاه"
        actions={
          <div className="flex gap-2">
            <Button size="sm" onClick={openNewCase}>
              <Plus className="w-4 h-4" />
              پرونده جدید
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate(ROUTES.chat)}>
              <Sparkles className="w-4 h-4 text-blue-600" />
              چت AI
            </Button>
          </div>
        }
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: 'ایجاد Workspace', to: ROUTES.workspace, icon: Plus },
          { label: 'بارگذاری مدرک', to: ROUTES.documents, icon: FileText },
          { label: 'پرونده‌ها', to: ROUTES.cases, icon: Gavel },
          { label: 'اعلان‌ها', to: ROUTES.notifications, icon: Bell },
        ].map((a) => (
          <Link
            key={a.label}
            to={a.to}
            className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 text-xs font-semibold"
          >
            <a.icon className="w-4 h-4 text-blue-600" />
            {a.label}
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent Cases */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-xs font-bold flex items-center gap-2">
              <Gavel className="w-4 h-4 text-blue-600" />
              Recent Cases
            </h2>
            <Link to={ROUTES.cases} className="text-[11px] text-blue-600 font-bold">
              همه
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {cases.slice(0, 5).map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/app/cases/${c.id}`)}
                className="w-full flex items-center justify-between px-4 py-3 text-right hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div>
                  <div className="text-xs font-bold">{c.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {c.caseNumber} · پیشرفت {c.progress ?? 25}٪
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={c.priority === 'high' ? 'rose' : 'neutral'}>
                    {c.priority === 'high' ? 'فوری' : 'عادی'}
                  </Badge>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Status + Subscription */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-lg p-4 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
              <Bot className="w-4 h-4" />
              AI Status
            </div>
            <p className="text-[11px] text-slate-300">موتور Gemini آماده · تحلیل پرونده و چت فعال</p>
            <form onSubmit={runQuickRisk} className="space-y-2">
              <textarea
                rows={3}
                value={riskText}
                onChange={(e) => setRiskText(e.target.value)}
                placeholder="شرح کوتاه برای ارزیابی سریع..."
                className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-[11px] text-white focus:outline-hidden focus:border-blue-500"
              />
              <Button type="submit" size="sm" fullWidth disabled={loading}>
                {loading ? 'در حال تحلیل...' : 'تحلیل سریع AI'}
              </Button>
            </form>
            {riskResult && (
              <p className="text-[11px] text-slate-300 whitespace-pre-line border-t border-slate-700 pt-2">
                {riskResult}
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-2 text-xs font-bold mb-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              Subscription
            </div>
            <p className="text-[11px] text-slate-500">پلن Pro · فعال</p>
            <Link to={ROUTES.subscription} className="text-[11px] text-blue-600 font-bold mt-2 inline-block">
              مدیریت اشتراک
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Timeline */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Timeline
          </h3>
          {cases
            .filter((c) => c.legalDetails?.nextHearingDate)
            .slice(0, 3)
            .map((c) => (
              <div key={c.id} className="text-[11px] border-r-2 border-blue-500 pr-2">
                <div className="font-semibold line-clamp-1">{c.title}</div>
                <div className="text-slate-500">{c.legalDetails?.nextHearingDate}</div>
              </div>
            ))}
          {cases.filter((c) => c.legalDetails?.nextHearingDate).length === 0 && (
            <p className="text-[11px] text-slate-500">جلسه‌ای ثبت نشده</p>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-blue-600" />
            Notification
            {unread.length > 0 && <Badge tone="blue">{unread.length}</Badge>}
          </h3>
          {notifications.slice(0, 3).map((n) => (
            <div key={n.id} className={`text-[11px] ${n.read ? 'text-slate-500' : 'font-semibold'}`}>
              {n.title}
            </div>
          ))}
          <Link to={ROUTES.notifications} className="text-[11px] text-blue-600 font-bold">
            مشاهده همه
          </Link>
        </div>

        {/* Recent Documents */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            Recent Documents
          </h3>
          {documents.slice(0, 3).map((d) => (
            <div key={d.id} className="text-[11px]">
              <div className="font-semibold line-clamp-1">{d.title}</div>
              <div className="text-slate-500">{d.uploadedAt}</div>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-2">
          <h3 className="text-xs font-bold flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
            Tasks
          </h3>
          {highPriority.slice(0, 3).map((c) => (
            <div key={c.id} className="text-[11px] flex items-start gap-1.5">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span className="line-clamp-2">{c.title}</span>
            </div>
          ))}
          <p className="text-[10px] text-slate-500">{workspaces.length} Workspace فعال</p>
        </div>
      </div>
    </div>
  );
};
