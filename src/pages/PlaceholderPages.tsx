import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { ROUTES } from '../routes';
import { featureBadge } from '../config/features';

interface FeaturePageProps {
  title: string;
  description: string;
  purpose: string;
  futureFlow?: string[];
  featureKey?: string;
  children?: React.ReactNode;
}

export const FeaturePage: React.FC<FeaturePageProps> = ({
  title,
  description,
  purpose,
  futureFlow,
  featureKey,
  children,
}) => {
  const badge = featureKey ? featureBadge(featureKey) : 'در حال توسعه';
  return (
    <div className="space-y-5">
      <PageHeader
        title={title}
        description={description}
        badge={<Badge tone="amber">{badge || 'به‌زودی'}</Badge>}
      />
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-3">
        <h3 className="text-sm font-bold">این بخش برای چیست؟</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{purpose}</p>
        {futureFlow && futureFlow.length > 0 && (
          <div className="pt-2">
            <p className="text-[11px] font-bold text-slate-500 mb-2">فلو آینده:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
              {futureFlow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

const MOCK_CONTRACTS = [
  { id: 'c1', title: 'قرارداد مشارکت در ساخت', party: 'هلدینگ پارس', status: 'draft', date: '۱۴۰۳/۰۵/۰۱' },
  { id: 'c2', title: 'قرارداد کار', party: 'شرکت آریا', status: 'review', date: '۱۴۰۳/۰۴/۲۰' },
  { id: 'c3', title: 'قرارداد بیمه مسئولیت', party: 'بیمه آریا', status: 'signed', date: '۱۴۰۳/۰۳/۱۵' },
];

export const ContractsPage = () => (
  <FeaturePage
    title="قراردادها"
    description="مدیریت، بازبینی و امضای قراردادهای مرتبط با پرونده"
    purpose="این بخش برای نگهداری قراردادهای مرتبط با هر پرونده یا Workspace طراحی شده. مدیر می‌تواند پیش‌نویس را بارگذاری کند، کارشناس بازبینی کند و مشتری نسخه نهایی را تأیید کند."
    featureKey="contracts"
    futureFlow={[
      'آپلود پیش‌نویس قرارداد',
      'بازبینی حقوقی توسط Expert',
      'درخواست اصلاح از مشتری',
      'امضای دیجیتال و بایگانی',
    ]}
  >
    <div className="bg-white dark:bg-slate-900 border rounded-lg overflow-hidden">
      <table className="w-full text-xs">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th className="text-right p-3 font-bold">عنوان</th>
            <th className="text-right p-3 font-bold">طرف قرارداد</th>
            <th className="text-right p-3 font-bold">وضعیت</th>
            <th className="text-right p-3 font-bold">تاریخ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {MOCK_CONTRACTS.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="p-3 font-medium">{c.title}</td>
              <td className="p-3 text-slate-500">{c.party}</td>
              <td className="p-3">
                <Badge tone={c.status === 'signed' ? 'green' : c.status === 'review' ? 'blue' : 'neutral'}>
                  {c.status === 'signed' ? 'امضا شده' : c.status === 'review' ? 'در بازبینی' : 'پیش‌نویس'}
                </Badge>
              </td>
              <td className="p-3 text-slate-400">{c.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </FeaturePage>
);

export const ReportsPage = () => (
  <FeaturePage
    title="گزارش‌ها"
    description="گزارش‌های تحلیلی پرونده، Workspace و BI سازمانی"
    purpose="داشبورد BI برای مدیران و هلدینگ‌ها: تعداد پرونده به تفکیک خدمت، زمان میانگین رسیدگی، نرخ تکمیل مدارک و درآمد. فعلاً نمودارهای نمایشی — اتصال داده واقعی در Sprint Backend."
    featureKey="bi"
    futureFlow={['فیلتر بازه زمانی', 'خروجی PDF/Excel', 'گزارش سفارشی', 'داشبورد هلدینگ']}
  >
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        { label: 'پرونده فعال', value: '۱۲', trend: '+۳' },
        { label: 'میانگین رسیدگی', value: '۸ روز', trend: '-۱' },
        { label: 'نرخ تکمیل مدارک', value: '۸۷٪', trend: '+۵٪' },
        { label: 'درآمد ماه', value: '۴۲M', trend: '+۱۲٪' },
      ].map((s) => (
        <div key={s.label} className="p-4 rounded-lg border bg-white dark:bg-slate-900">
          <p className="text-[10px] text-slate-500">{s.label}</p>
          <p className="text-xl font-black mt-1">{s.value}</p>
          <p className="text-[10px] text-emerald-600 mt-1">{s.trend}</p>
        </div>
      ))}
    </div>
    <div className="h-48 rounded-lg border bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-400">
      نمودار BI — Placeholder
    </div>
  </FeaturePage>
);

export const SubscriptionPage = () => (
  <div className="space-y-5">
    <PageHeader
      title="اشتراک"
      description="مدیریت پلن، سقف استفاده و دسترسی سازمان"
      badge={<Badge tone="amber">{featureBadge('subscription') || 'به‌زودی'}</Badge>}
    />
    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
      مشترک <strong>اپلیکیشن</strong> را دریافت می‌کند؛ Landing و محتوای SEO جداست مگر کل سایت خریداری شود.
    </p>
    <div className="grid sm:grid-cols-3 gap-4">
      {[
        { name: 'Free', price: '۰', seats: '۱', features: ['۱ Workspace', '۵ پرونده'] },
        { name: 'Starter', price: '۲.۹M', seats: '۵', features: ['۵ Workspace', '۵۰ پرونده', 'Expert assign'] },
        { name: 'Pro', price: '۹.۹M', seats: 'نامحدود', features: ['هلدینگ', 'BI', 'Automation'] },
      ].map((plan) => (
        <div key={plan.name} className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="text-sm font-bold">{plan.name}</h3>
          <p className="text-lg font-black mt-2">{plan.price} <span className="text-xs font-normal text-slate-500">تومان/ماه</span></p>
          <p className="text-[10px] text-slate-500 mt-1">{plan.seats} کاربر</p>
          <ul className="mt-3 space-y-1">
            {plan.features.map((f) => (
              <li key={f} className="text-[11px] text-slate-600 dark:text-slate-400">• {f}</li>
            ))}
          </ul>
          {plan.name === 'Pro' && <Badge tone="green" className="mt-3">پلن پیشنهادی</Badge>}
        </div>
      ))}
    </div>
    <Link to={ROUTES.pricing}>
      <Button variant="outline" size="sm">مشاهده تعرفه‌های عمومی</Button>
    </Link>
  </div>
);

export const BillingPage = () => (
  <FeaturePage
    title="صورتحساب"
    description="فاکتورها، پرداخت‌ها و تاریخچه مالی"
    purpose="مدیریت فاکتورهای صادره برای مشتریان و پرداخت‌های متخصصین. شامل وضعیت pending/paid/overdue و یادآوری خودکار."
    featureKey="billing"
    futureFlow={['صدور فاکتور از پرونده', 'پرداخت آنلاین', 'رسید PDF', 'گزارش مالیاتی']}
  >
    <div className="space-y-2">
      {[
        { id: 'INV-001', amount: '۴,۵۰۰,۰۰۰', status: 'paid', date: '۱۴۰۳/۰۵/۰۱' },
        { id: 'INV-002', amount: '۲,۱۰۰,۰۰۰', status: 'pending', date: '۱۴۰۳/۰۵/۱۰' },
      ].map((inv) => (
        <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-900 text-xs">
          <span className="font-bold">{inv.id}</span>
          <span>{inv.amount} تومان</span>
          <Badge tone={inv.status === 'paid' ? 'green' : 'amber'}>{inv.status === 'paid' ? 'پرداخت شده' : 'در انتظار'}</Badge>
          <span className="text-slate-400">{inv.date}</span>
        </div>
      ))}
    </div>
  </FeaturePage>
);

export const SupportPage = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <FeaturePage
      title="پشتیبانی"
      description="تیکت، راهنما و ارتباط با تیم پشتیبانی"
      purpose="مشتریان داخل Workspace می‌توانند تیکت ثبت کنند. سؤالات عمومی از FAQ پاسخ داده می‌شود. تیکت‌ها به دسته خدمت (قرارداد، بیمه، حسابداری…) مسیریابی می‌شوند."
      featureKey="support"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <form
          className="bg-white dark:bg-slate-900 border rounded-lg p-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <h3 className="text-sm font-bold">ثبت تیکت</h3>
          <select className="w-full border rounded-md px-3 py-2 text-xs" defaultValue="">
            <option value="" disabled>دسته موضوع</option>
            <option>قرارداد</option>
            <option>بیمه</option>
            <option>حسابداری</option>
            <option>ثبت‌نام / فنی</option>
          </select>
          <input className="w-full border rounded-md px-3 py-2 text-xs" placeholder="موضوع" required />
          <textarea className="w-full border rounded-md px-3 py-2 text-xs" rows={4} placeholder="شرح مشکل..." required />
          <Button type="submit" size="sm">ارسال تیکت (نمایشی)</Button>
          {submitted && <p className="text-xs text-emerald-600">تیکت ثبت شد — پاسخ در ۲۴ ساعت (mock)</p>}
        </form>
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-5 space-y-2">
          <h3 className="text-sm font-bold">سؤالات متداول</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">برای سؤالات عمومی به FAQ مراجعه کنید.</p>
          <Link to={ROUTES.faq} className="text-xs text-blue-600 font-bold inline-block">رفتن به FAQ →</Link>
        </div>
      </div>
    </FeaturePage>
  );
};

export const AutomationPage = () => (
  <FeaturePage
    title="اتوماسیون"
    description="پرسش‌وپاسخ هوشمند، NDST و گردش کار خودکار"
    purpose="بخش اتوماسیون برای پاسخ به سؤالات تکراری، راهنمای ثبت‌نام و در آینده تحلیل مدارک با AI. NDST (Need Detection & Smart Triage) موضوع مشکل مشتری را تشخیص و به دسته مناسب هدایت می‌کند."
    featureKey="aiAnalysis"
    futureFlow={[
      'تشخیص موضوع: قرارداد؟ بیمه؟ حسابداری؟',
      'پرسش‌وپاسخ از FAQ داخلی',
      'ارجاع به Expert در صورت نیاز',
      'خلاصه‌سازی چند Agent AI',
    ]}
  >
    <div className="grid sm:grid-cols-2 gap-3">
      {['NDST — تشخیص نیاز', 'FAQ Bot', 'Document Q&A', 'Notification Rules'].map((item) => (
        <div key={item} className="p-4 rounded-lg border bg-white dark:bg-slate-900 flex items-center justify-between">
          <span className="text-xs font-bold">{item}</span>
          <Badge tone="amber">به‌زودی</Badge>
        </div>
      ))}
    </div>
  </FeaturePage>
);

export const SettingsPage = () => (
  <div className="space-y-5">
    <PageHeader title="تنظیمات" description="تم، زبان، سازمان و ترجیحات Workspace" />
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-3 text-xs">
      <p>تم Dark/Light از نوار بالا قابل تغییر است.</p>
      <p>زبان از انتخابگر FA / EN / AR تنظیم می‌شود.</p>
      <Link to={ROUTES.profile} className="text-blue-600 font-bold inline-block">رفتن به پروفایل</Link>
      <Link to={ROUTES.organizations} className="text-blue-600 font-bold block mt-2">مدیریت سازمان‌ها / هلدینگ →</Link>
    </div>
    <div className="p-4 rounded-lg border border-dashed border-slate-300 text-[11px] text-slate-500">
      <strong>تفاوت Landing و App:</strong> مشترک اپ را می‌گیرد؛ صفحات عمومی (About, Blog) برای SEO جداست.
    </div>
  </div>
);

export const VoicePlaceholderPage = () => (
  <FeaturePage title="Voice Assistant" description="دستیار صوتی" purpose="دستیار صوتی برای ثبت یادداشت و جستجو — Sprint 3" featureKey="voice" />
);

export const KnowledgeBasePage = () => (
  <FeaturePage title="Knowledge Base" description="پایگاه دانش" purpose="مقالات آموزشی و راهنمای استفاده" featureKey="rag" />
);
