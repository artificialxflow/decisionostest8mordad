import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { ROUTES } from '../routes';
import { featureBadge } from '../config/features';
import { SimpleBarChart, SimpleDonutChart } from '../components/charts/SimpleCharts';
import { MOCK_CASE_TREND, MOCK_DOC_COMPLETION, MOCK_RESOLUTION_DAYS } from '../lib/mock/reports';
import { getAverageRating } from '../lib/mock/satisfaction';
import { AutomationRulesList } from '../components/AutomationRulesList';
import { AutomationRuleBuilder } from '../components/AutomationRuleBuilder';
import { HoldingDashboard } from '../components/HoldingDashboard';

interface FeaturePageProps {
  title: string;
  description: string;
  purpose: string;
  futureFlow?: string[];
  featureKey?: string;
  demoUI?: boolean;
  children?: React.ReactNode;
}

export const FeaturePage: React.FC<FeaturePageProps> = ({
  title,
  description,
  purpose,
  futureFlow,
  featureKey,
  demoUI,
  children,
}) => {
  const badgeLabel = demoUI
    ? 'نسخه نمایشی'
    : featureKey
      ? featureBadge(featureKey) || 'به‌زودی'
      : 'در حال توسعه';
  const badgeTone = demoUI ? 'blue' : 'amber';
  return (
    <div className="space-y-5">
      <PageHeader
        title={title}
        description={description}
        badge={<Badge tone={badgeTone}>{badgeLabel}</Badge>}
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
    demoUI
    futureFlow={[
      'آپلود پیش‌نویس قرارداد',
      'بازبینی حقوقی توسط Expert',
      'درخواست اصلاح از مشتری',
      'امضای دیجیتال و بایگانی',
    ]}
  >
    <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
      {['پیش‌نویس', 'بازبینی', 'امضا'].map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{i + 1}</span>
          <span>{step}</span>
          {i < 2 && <span className="text-slate-300 mx-1">→</span>}
        </div>
      ))}
    </div>
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
                {c.status === 'signed' && <Badge tone="green" className="mr-1">امضای دیجیتال ✓</Badge>}
              </td>
              <td className="p-3 text-slate-400">{c.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </FeaturePage>
);

export const ReportsPage = () => {
  const [tab, setTab] = useState<'ops' | 'holding'>('ops');
  const [range, setRange] = useState('6m');
  const [exportToast, setExportToast] = useState('');

  const exportMock = (type: string) => {
    setExportToast(`خروجی ${type} — نسخه نمایشی`);
    setTimeout(() => setExportToast(''), 2000);
  };

  return (
    <FeaturePage
      title="گزارش‌ها"
      description="گزارش‌های تحلیلی پرونده، Workspace و BI سازمانی"
      purpose="داشبورد BI برای مدیران: KPI، نمودار و export. داده mock."
      demoUI
    >
      {exportToast && <div className="text-xs bg-emerald-100 text-emerald-800 p-2 rounded">{exportToast}</div>}
      <div className="flex flex-wrap gap-2 items-center">
        <button type="button" onClick={() => setTab('ops')} className={`text-xs px-3 py-1 rounded ${tab === 'ops' ? 'bg-blue-600 text-white' : 'border'}`}>عملیاتی</button>
        <button type="button" onClick={() => setTab('holding')} className={`text-xs px-3 py-1 rounded ${tab === 'holding' ? 'bg-blue-600 text-white' : 'border'}`}>نمای هلدینگ</button>
        <select value={range} onChange={(e) => setRange(e.target.value)} className="text-xs border rounded px-2 py-1 mr-auto">
          <option value="1m">۱ ماه</option>
          <option value="6m">۶ ماه</option>
          <option value="1y">۱ سال</option>
        </select>
        <Button size="sm" variant="outline" onClick={() => exportMock('PDF')}>PDF</Button>
        <Button size="sm" variant="outline" onClick={() => exportMock('Excel')}>Excel</Button>
      </div>
      {tab === 'holding' ? (
        <HoldingDashboard />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'پرونده فعال', value: '۱۲', trend: '+۳' },
              { label: 'میانگین رسیدگی', value: '۸ روز', trend: '-۱' },
              { label: 'نرخ تکمیل مدارک', value: '۸۷٪', trend: '+۵٪' },
              { label: 'رضایت', value: `${getAverageRating()} ⭐`, trend: '+۰.۲' },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-lg border bg-white dark:bg-slate-900">
                <p className="text-[10px] text-slate-500">{s.label}</p>
                <p className="text-xl font-black mt-1">{s.value}</p>
                <p className="text-[10px] text-emerald-600 mt-1">{s.trend}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
              <p className="text-xs font-bold mb-2">روند پرونده</p>
              <SimpleBarChart data={MOCK_CASE_TREND.map((d) => ({ label: d.label, value: d.value }))} />
            </div>
            <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
              <p className="text-xs font-bold mb-2">تکمیل مدارک</p>
              <SimpleDonutChart data={MOCK_DOC_COMPLETION.map((d) => ({ label: d.label, value: d.value }))} />
            </div>
          </div>
          <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
            <p className="text-xs font-bold mb-2">زمان رسیدگی (روز)</p>
            <SimpleBarChart data={MOCK_RESOLUTION_DAYS.map((d) => ({ label: d.label, value: d.days }))} />
          </div>
        </>
      )}
    </FeaturePage>
  );
};

export const SubscriptionPage = () => (
  <div className="space-y-5">
    <PageHeader
      title="اشتراک"
      description="مدیریت پلن، سقف استفاده و دسترسی سازمان"
      badge={<Badge tone="blue">نسخه نمایشی</Badge>}
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

const MOCK_INVOICES = [
  { id: 'INV-001', amount: '۴,۵۰۰,۰۰۰', status: 'paid' as const, date: '۱۴۰۳/۰۵/۰۱' },
  { id: 'INV-002', amount: '۲,۱۰۰,۰۰۰', status: 'pending' as const, date: '۱۴۰۳/۰۵/۱۰' },
];

export const BillingPage = () => {
  const [selected, setSelected] = useState<(typeof MOCK_INVOICES)[0] | null>(null);

  return (
  <FeaturePage
    title="صورتحساب"
    description="فاکتورها، پرداخت‌ها و تاریخچه مالی"
    purpose="مدیریت فاکتورهای صادره برای مشتریان و پرداخت‌های متخصصین. شامل وضعیت pending/paid/overdue و یادآوری خودکار."
    demoUI
    futureFlow={['صدور فاکتور از پرونده', 'پرداخت آنلاین', 'رسید PDF', 'گزارش مالیاتی']}
  >
    <div className="space-y-2">
      {MOCK_INVOICES.map((inv) => (
        <button
          key={inv.id}
          type="button"
          onClick={() => setSelected(inv)}
          className="w-full flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-900 text-xs hover:border-blue-400 text-right"
        >
          <span className="font-bold">{inv.id}</span>
          <span>{inv.amount} تومان</span>
          <Badge tone={inv.status === 'paid' ? 'green' : 'amber'}>{inv.status === 'paid' ? 'پرداخت شده' : 'در انتظار'}</Badge>
          <span className="text-slate-400">{inv.date}</span>
        </button>
      ))}
    </div>
    {selected && (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 max-w-sm w-full space-y-3 text-xs" onClick={(e) => e.stopPropagation()}>
          <h3 className="font-bold text-sm">جزئیات فاکتور {selected.id}</h3>
          <p>مبلغ: {selected.amount} تومان</p>
          <p>وضعیت: {selected.status === 'paid' ? 'پرداخت شده' : 'در انتظار'}</p>
          <p>تاریخ: {selected.date}</p>
          <p className="text-slate-500">شرح: خدمات مشاوره حقوقی — پرونده نمونه (mock)</p>
          <Button size="sm" className="w-full" onClick={() => setSelected(null)}>بستن</Button>
        </div>
      </div>
    )}
  </FeaturePage>
  );
};

export const SupportPage = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <FeaturePage
      title="پشتیبانی"
      description="تیکت، راهنما و ارتباط با تیم پشتیبانی"
      purpose="مشتریان داخل Workspace می‌توانند تیکت ثبت کنند. سؤالات عمومی از FAQ پاسخ داده می‌شود. تیکت‌ها به دسته خدمت (قرارداد، بیمه، حسابداری…) مسیریابی می‌شوند."
      demoUI
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

export const AutomationPage = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [, refresh] = useState(0);

  return (
    <FeaturePage
      title="اتوماسیون"
      description="پرسش‌وپاسخ هوشمند، NDST و گردش کار خودکار"
      purpose="اتوماسیون برای پاسخ تکراری، triage و rule-based actions. NDST موضوع مشکل را تشخیص می‌دهد."
      demoUI
    >
      <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs mb-4">
        <p className="font-bold mb-2">NDST Flow</p>
        <p className="text-slate-600">درخواست → تشخیص موضوع (قرارداد/بیمه/…) → FAQ یا ارجاع Expert</p>
      </div>
      <AutomationRulesList key={refresh} />
      <Button size="sm" className="mt-3" onClick={() => setShowBuilder(!showBuilder)}>
        {showBuilder ? 'بستن سازنده' : 'Rule جدید'}
      </Button>
      {showBuilder && <AutomationRuleBuilder onCreated={() => refresh((x) => x + 1)} />}
    </FeaturePage>
  );
};

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
