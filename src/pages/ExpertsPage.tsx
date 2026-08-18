import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { getExpertById, MOCK_EXPERTS_FULL, EXPERT_CITIES, EXPERT_SPECIALTIES } from '../lib/mock/experts';
import { ROUTES } from '../routes';
import { useAuth } from '../context/AuthContext';
import { MapPin, Star, Briefcase, Mail, DollarSign } from 'lucide-react';

export const ExpertCard: React.FC<{ expert: (typeof MOCK_EXPERTS_FULL)[0]; link?: boolean }> = ({
  expert,
  link = true,
}) => {
  const content = (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 hover:border-blue-400 transition-colors h-full">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold">{expert.name}</p>
        <Badge tone={expert.availability === 'available' ? 'green' : 'amber'}>
          {expert.availability === 'available' ? 'آماده' : 'مشغول'}
        </Badge>
      </div>
      <p className="text-xs text-blue-600 font-medium">{expert.specialty}</p>
      {expert.city && (
        <p className="text-[10px] text-slate-500 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {expert.city}
        </p>
      )}
      {expert.rating && (
        <p className="text-[10px] flex items-center gap-1 text-amber-600">
          <Star className="w-3 h-3 fill-current" /> {expert.rating}
        </p>
      )}
      <p className="text-[10px] text-slate-400">{expert.activeCases} پرونده فعال</p>
    </div>
  );
  if (link) {
    return <Link to={`/app/experts/${expert.id}`}>{content}</Link>;
  }
  return content;
};

export const ExpertsPage: React.FC = () => {
  const { can } = useAuth();
  const [city, setCity] = useState('همه');
  const [specialty, setSpecialty] = useState('همه');

  const filtered = MOCK_EXPERTS_FULL.filter((e) => {
    if (city !== 'همه' && e.city !== city) return false;
    if (specialty !== 'همه' && e.specialty !== specialty) return false;
    return true;
  });

  const isManager = can('manage_experts');

  return (
    <div className="space-y-5">
      <PageHeader
        title={isManager ? 'مدیریت و بازار متخصصین' : 'متخصصین'}
        description="فیلتر بر اساس شهر و تخصص — پروفایل، رزومه و حساب‌کتاب"
        badge={<Badge tone="blue">Expert Marketplace</Badge>}
      />

      <div className="flex flex-wrap gap-3">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="border rounded-md px-3 py-1.5 text-xs">
          {EXPERT_CITIES.map((c) => (
            <option key={c} value={c}>{c === 'همه' ? 'همه شهرها' : c}</option>
          ))}
        </select>
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="border rounded-md px-3 py-1.5 text-xs">
          {EXPERT_SPECIALTIES.map((s) => (
            <option key={s} value={s}>{s === 'همه' ? 'همه تخصص‌ها' : s}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="متخصصی یافت نشد" description="فیلترها را تغییر دهید." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((e) => (
            <ExpertCard key={e.id} expert={e} />
          ))}
        </div>
      )}
    </div>
  );
};

const MOCK_INVOICES = [
  { id: 'EXP-001', amount: '۳,۴۰۰,۰۰۰', status: 'paid', date: '۱۴۰۳/۰۴/۲۸' },
  { id: 'EXP-002', amount: '۱,۸۰۰,۰۰۰', status: 'pending', date: '۱۴۰۳/۰۵/۰۵' },
];

export const ExpertProfilePage: React.FC = () => {
  const { id } = useParams();
  const expert = id ? getExpertById(id) : undefined;
  const { can, user } = useAuth();
  const [tab, setTab] = useState<'profile' | 'invoices' | 'earnings' | 'payouts'>('profile');
  const showAccounting = can('manage_experts') || user?.role === 'expert';

  if (!expert) {
    return <EmptyState title="متخصص یافت نشد" actionLabel="بازگشت" onAction={() => window.history.back()} />;
  }

  const tabs = [
    { id: 'profile' as const, label: 'پروفایل' },
    ...(showAccounting
      ? [
          { id: 'invoices' as const, label: 'فاکتورها' },
          { id: 'earnings' as const, label: 'درآمد' },
          { id: 'payouts' as const, label: 'پرداخت‌ها' },
        ]
      : []),
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title={expert.name}
        description={expert.specialty}
        badge={<Badge tone={expert.status === 'active' ? 'green' : 'gray'}>{expert.status === 'active' ? 'فعال' : 'غیرفعال'}</Badge>}
        actions={
          <Link to={ROUTES.experts}>
            <Button variant="outline" size="sm">بازگشت به لیست</Button>
          </Link>
        }
      />

      <div className="flex gap-2 border-b pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-xs font-bold px-3 py-1.5 rounded-md ${tab === t.id ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{expert.bio}</p>
            {expert.education && (
              <div>
                <h4 className="text-xs font-bold mb-2">تحصیلات</h4>
                <ul className="text-[11px] text-slate-500 space-y-1">
                  {expert.education.map((e) => (
                    <li key={e}>• {e}</li>
                  ))}
                </ul>
              </div>
            )}
            {expert.workHistory && (
              <div>
                <h4 className="text-xs font-bold mb-2">سوابق</h4>
                {expert.workHistory.map((w) => (
                  <div key={w.title} className="text-[11px] text-slate-500 mb-2">
                    <strong>{w.title}</strong> — {w.org} ({w.years})
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-3 p-4 rounded-lg border bg-white dark:bg-slate-900 text-xs">
            {expert.city && (
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {expert.city}</p>
            )}
            {expert.email && (
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {expert.email}</p>
            )}
            {expert.hourlyRate && (
              <p className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> {expert.hourlyRate.toLocaleString('fa-IR')} تومان/ساعت</p>
            )}
            <p className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {expert.activeCases} پرونده فعال</p>
            {expert.rating && (
              <p className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" /> {expert.rating} / ۵</p>
            )}
          </div>
        </div>
      )}

      {tab === 'invoices' && (
        <div className="space-y-2">
          {MOCK_INVOICES.map((inv) => (
            <div key={inv.id} className="flex justify-between p-3 border rounded-lg text-xs bg-white dark:bg-slate-900">
              <span className="font-bold">{inv.id}</span>
              <span>{inv.amount} تومان</span>
              <Badge tone={inv.status === 'paid' ? 'green' : 'amber'}>{inv.status === 'paid' ? 'پرداخت شده' : 'در انتظار'}</Badge>
            </div>
          ))}
        </div>
      )}

      {tab === 'earnings' && (
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
            <p className="text-[10px] text-slate-500">درآمد این ماه</p>
            <p className="text-xl font-black">۵.۲M</p>
          </div>
          <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
            <p className="text-[10px] text-slate-500">پرونده‌های تکمیل‌شده</p>
            <p className="text-xl font-black">۸</p>
          </div>
          <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
            <p className="text-[10px] text-slate-500">میانگین نرخ</p>
            <p className="text-xl font-black">720K</p>
          </div>
        </div>
      )}

      {tab === 'payouts' && (
        <EmptyState title="پرداخت بعدی" description="۱۵ شهریور — ۲,۱۰۰,۰۰۰ تومان (mock)" />
      )}
    </div>
  );
};
