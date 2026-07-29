import React, { useState } from 'react';
import { User, Shield, CreditCard, History, KeyRound, Settings } from 'lucide-react';
import { PageHeader, Badge, Button, Input } from '../components/ui';
import { usePlatformData } from '../components/layout/PlatformLayout';

const tabs = [
  { id: 'info', label: 'اطلاعات', icon: User },
  { id: 'subscription', label: 'اشتراک', icon: CreditCard },
  { id: 'history', label: 'سوابق', icon: History },
  { id: 'security', label: 'امنیت', icon: Shield },
  { id: 'kyc', label: 'احراز هویت', icon: KeyRound },
  { id: 'settings', label: 'تنظیمات', icon: Settings },
] as const;

export const ProfilePage: React.FC = () => {
  const { user, openAuth } = usePlatformData();
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('info');

  if (!user) {
    return (
      <div className="text-center py-16 space-y-3">
        <p className="text-sm font-bold">برای مشاهده پروفایل وارد شوید</p>
        <Button onClick={openAuth}>ورود</Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="پروفایل کاربر"
        description="اطلاعات حساب، اشتراک، امنیت و احراز هویت"
        badge={<Badge tone="blue">{user.role}</Badge>}
      />

      <div className="flex flex-wrap gap-1 border-b border-slate-200 dark:border-slate-800 pb-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold ${
                tab === t.id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5">
        {tab === 'info' && (
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
            <Input label="نام" defaultValue={user.name} readOnly />
            <Input label="ایمیل" defaultValue={user.email} readOnly />
            <Input label="تلفن" defaultValue={user.phone || ''} readOnly />
            <Input label="سازمان" defaultValue={user.organization || ''} readOnly />
          </div>
        )}
        {tab === 'subscription' && (
          <div className="space-y-2 text-xs">
            <p>پلن فعلی: <strong>Pro</strong></p>
            <p className="text-slate-500">وضعیت: فعال · تمدید ماهانه</p>
            <Badge tone="green">Active</Badge>
          </div>
        )}
        {tab === 'history' && (
          <p className="text-xs text-slate-500">سوابق ورود و عملیات — متصل به Audit Logs</p>
        )}
        {tab === 'security' && (
          <div className="space-y-3 max-w-sm">
            <Input label="رمز عبور جدید" type="password" placeholder="••••••••" />
            <Button size="sm">به‌روزرسانی رمز</Button>
          </div>
        )}
        {tab === 'kyc' && (
          <div className="space-y-2">
            <Badge tone="amber">در انتظار تکمیل</Badge>
            <p className="text-xs text-slate-500">احراز هویت با کد ملی / پروانه وکالت — اسکلت Sprint 1</p>
          </div>
        )}
        {tab === 'settings' && (
          <p className="text-xs text-slate-500">ترجیحات اعلان، زبان و تم از نوار بالا و تنظیمات قابل تغییر است.</p>
        )}
      </div>
    </div>
  );
};
