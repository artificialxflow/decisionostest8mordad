import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'DecisionOS چیست؟',
    a: 'پلتفرم Workspaceمحور برای مدیریت پرونده، اسناد، قرارداد و تحلیل هوشمند حقوقی و کسب‌وکار.',
  },
  {
    q: 'آیا هوش مصنوعی جایگزین وکیل می‌شود؟',
    a: 'خیر. AI برای تسریع تحلیل و پیشنهاد مسیر است؛ تصمیم نهایی با متخصص و کاربر است.',
  },
  {
    q: 'Workspace چه کاربردی دارد؟',
    a: 'فضای کاری یکپارچه برای پرونده، سند، Timeline، چت، گزارش و صورتحساب یک موضوع یا سازمان.',
  },
  {
    q: 'چه خدماتی پوشش داده می‌شود؟',
    a: 'حقوقی، قرارداد، مالی، حسابداری، املاک، بیمه، سرمایه‌گذاری، کسب‌وکار و هوش مصنوعی.',
  },
  {
    q: 'داده‌های من امن است؟',
    a: 'لاگ دسترسی، کنترل نقش و رمزنگاری در معماری امنیت Sprint 1 پیش‌بینی شده است.',
  },
  {
    q: 'چطور شروع کنم؟',
    a: 'از صفحه اصلی درخواست ثبت کنید یا Workspace بسازید و مدارک را بارگذاری کنید.',
  },
];

export const FaqPage: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black">سوالات متداول</h1>
        <p className="text-xs text-slate-500">پاسخ‌های کوتاه برای شروع سریع با DecisionOS</p>
      </div>
      <div className="space-y-2">
        {faqs.map((item, i) => (
          <div key={item.q} className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-right text-sm font-bold"
            >
              {item.q}
              <ChevronDown className={`w-4 h-4 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <p className="px-4 pb-4 text-xs text-slate-500 leading-relaxed">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
