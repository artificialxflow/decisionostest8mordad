import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Scale,
  FileSignature,
  Wallet,
  Calculator,
  Building2,
  Shield,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { ServiceItem, ServiceCategory } from '../types';
import { ROUTES } from '../routes';
import { getMockServices } from '../lib/mock';

const icons: Record<string, React.ElementType> = {
  Scale, FileSignature, Wallet, Calculator, Building2, Shield, TrendingUp, Briefcase,
};

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  legal: 'حقوقی',
  contract: 'قراردادی',
  real_estate: 'املاک و ثبتی',
  insurance: 'بیمه',
  finance: 'تحلیل داده',
  accounting: 'مالی و حسابداری',
  investment: 'سرمایه‌گذاری',
  business: 'کسب‌وکار',
  ai: 'تحلیل داده',
};

interface ServicesPageProps {
  embedded?: boolean;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ embedded }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = (params.get('q') || '').trim().toLowerCase();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const services = useMemo(() => getMockServices().filter((s) => s.status !== 'inactive'), []);

  const filtered = services.filter((s) => {
    if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
    if (q) {
      return s.title.includes(q) || s.description.includes(q) || CATEGORY_LABELS[s.category]?.includes(q);
    }
    return true;
  });

  const content = (
    <div className="space-y-5">
      <PageHeader
        title="کatalog خدمات"
        description="انتخاب خدمت و ثبت درخواست"
        badge={q ? <Badge tone="blue">نتایج: {q}</Badge> : undefined}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="text-xs border rounded-md px-3 py-1.5"
      >
        <option value="all">همه دسته‌ها</option>
        {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>

      {filtered.length === 0 ? (
        <EmptyState title="خدمتی یافت نشد" description="فیلتر یا عبارت جستجو را تغییر دهید." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => {
            const Icon = icons[s.icon || 'Briefcase'] || Briefcase;
            return (
              <div key={s.id} className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <Badge tone="neutral">{CATEGORY_LABELS[s.category]}</Badge>
                </div>
                <h3 className="text-sm font-bold">{s.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{s.description}</p>
                {s.estimatedTime && (
                  <p className="text-[10px] text-slate-400">زمان تقریبی: {s.estimatedTime}</p>
                )}
                <Button
                  size="sm"
                  onClick={() => navigate(`${ROUTES.requestNew}?serviceId=${s.id}`)}
                >
                  ثبت درخواست
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  if (embedded) return content;
  return <div className="max-w-6xl mx-auto px-4 py-10">{content}</div>;
};
