import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Scale,
  FileSignature,
  Wallet,
  Calculator,
  Building2,
  Shield,
  TrendingUp,
  Briefcase,
  Bot,
} from 'lucide-react';
import { PageHeader, Badge, Button } from '../components/ui';
import { ServiceItem } from '../types';
import { ROUTES } from '../routes';

const services: ServiceItem[] = [
  { id: 's1', title: 'حقوقی', category: 'legal', description: 'مدیریت دعاوی، لایحه و پیگیری قضایی', icon: 'Scale' },
  { id: 's2', title: 'قرارداد', category: 'contract', description: 'تنظیم، بازبینی و ریسک‌سنجی قراردادها', icon: 'FileSignature' },
  { id: 's3', title: 'مالی', category: 'finance', description: 'تحلیل تعهدات مالی و مطالبات', icon: 'Wallet' },
  { id: 's4', title: 'حسابداری', category: 'accounting', description: 'اسناد مالی مرتبط با پرونده و Workspace', icon: 'Calculator' },
  { id: 's5', title: 'املاک', category: 'real_estate', description: 'ریسک ثبتی، سند و معاملات ملکی', icon: 'Building2' },
  { id: 's6', title: 'بیمه', category: 'insurance', description: 'بررسی پوشش و اختلافات بیمه‌ای', icon: 'Shield' },
  { id: 's7', title: 'سرمایه‌گذاری', category: 'investment', description: 'ارزیابی حقوقی طرح‌های سرمایه‌گذاری', icon: 'TrendingUp' },
  { id: 's8', title: 'کسب‌وکار', category: 'business', description: 'مشاوره سازمانی و حاکمیت شرکتی', icon: 'Briefcase' },
  { id: 's9', title: 'هوش مصنوعی', category: 'ai', description: 'تحلیل اولیه، خلاصه‌سازی و پیشنهاد مسیر', icon: 'Bot' },
];

const icons: Record<string, React.ElementType> = {
  Scale, FileSignature, Wallet, Calculator, Building2, Shield, TrendingUp, Briefcase, Bot,
};

interface ServicesPageProps {
  embedded?: boolean;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ embedded }) => {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim().toLowerCase();
  const filtered = q
    ? services.filter((s) => s.title.includes(q) || s.description.includes(q) || s.category.includes(q))
    : services;

  const content = (
    <div className="space-y-5">
      <PageHeader
        title="خدمات DecisionOS"
        description="دسته‌بندی کامل خدمات پلتفرم — از حقوقی تا هوش مصنوعی"
        badge={q ? <Badge tone="blue">نتایج: {q}</Badge> : undefined}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => {
          const Icon = icons[s.icon || 'Briefcase'] || Briefcase;
          return (
            <div
              key={s.id}
              className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
            >
              <Icon className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold">{s.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{s.description}</p>
              <Link to={embedded ? ROUTES.workspace : ROUTES.dashboard}>
                <Button size="sm" variant="outline">
                  شروع از Workspace
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="text-xs text-slate-500 text-center py-8">خدمتی با این عبارت یافت نشد.</p>
      )}
    </div>
  );

  if (embedded) return content;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {content}
    </div>
  );
};
