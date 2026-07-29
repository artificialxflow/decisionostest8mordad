import React from 'react';
import { PageHeader, Badge, EmptyState, Button } from '../components/ui';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

interface PlaceholderPageProps {
  title: string;
  description: string;
  badge?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description, badge = 'Placeholder' }) => (
  <div className="space-y-5">
    <PageHeader title={title} description={description} badge={<Badge tone="blue">{badge}</Badge>} />
    <EmptyState
      title={`${title} — اسکلت آماده`}
      description="این بخش در Sprint 1 به‌صورت Placeholder تعریف شده تا معماری پلتفرم کامل باشد. منطق عمیق در Sprintهای بعد اضافه می‌شود."
      actionLabel="بازگشت به داشبورد"
      onAction={() => {
        window.location.href = ROUTES.dashboard;
      }}
    />
  </div>
);

export const ContractsPage = () => (
  <PlaceholderPage title="قراردادها" description="مدیریت و بازبینی قراردادها" />
);

export const ReportsPage = () => (
  <PlaceholderPage title="گزارش‌ها" description="گزارش‌های تحلیلی پرونده و Workspace" badge="AI Analysis Placeholder" />
);

export const SubscriptionPage = () => (
  <div className="space-y-5">
    <PageHeader title="اشتراک" description="مدیریت پلن و سقف استفاده" />
    <div className="grid sm:grid-cols-3 gap-4">
      {['Free', 'Starter', 'Pro'].map((plan) => (
        <div key={plan} className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="text-sm font-bold">{plan}</h3>
          <p className="text-[11px] text-slate-500 mt-2">جزئیات پلن در Pricing عمومی</p>
          {plan === 'Pro' && <Badge tone="green" className="mt-3">پلن فعلی</Badge>}
        </div>
      ))}
    </div>
    <Link to={ROUTES.pricing}>
      <Button variant="outline" size="sm">مشاهده تعرفه‌ها</Button>
    </Link>
  </div>
);

export const BillingPage = () => (
  <PlaceholderPage title="صورتحساب" description="فاکتورها و وضعیت پرداخت" />
);

export const SupportPage = () => (
  <PlaceholderPage title="پشتیبانی" description="تیکت و راهنمای استفاده" />
);

export const SettingsPage = () => (
  <div className="space-y-5">
    <PageHeader title="تنظیمات" description="تم، زبان، اعلان‌ها و ترجیحات Workspace" />
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-3 text-xs">
      <p>تم Dark/Light از نوار بالا قابل تغییر است.</p>
      <p>زبان از انتخابگر FA / EN / AR تنظیم می‌شود.</p>
      <Link to={ROUTES.profile} className="text-blue-600 font-bold inline-block">رفتن به پروفایل</Link>
    </div>
  </div>
);

export const VoicePlaceholderPage = () => (
  <PlaceholderPage title="Voice Assistant" description="دستیار صوتی — فقط Placeholder" badge="Placeholder" />
);

export const KnowledgeBasePage = () => (
  <PlaceholderPage title="Knowledge Base" description="پایگاه دانش — فقط Placeholder" />
);
