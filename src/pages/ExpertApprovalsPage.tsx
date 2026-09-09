import React, { useState } from 'react';
import { Check, X, UserPlus, TrendingUp } from 'lucide-react';
import { PageHeader, Button, Badge } from '../components/ui';
import { RequireRole } from '../components/auth/RequireRole';
import {
  getPendingExperts,
  setExpertApproval,
  MOCK_EXPERT_INCOME,
} from '../lib/mock/expertOnboarding';

export const ExpertApprovalsPage: React.FC = () => {
  const [items, setItems] = useState(() => getPendingExperts());
  const [toast, setToast] = useState('');

  const act = (id: string, status: 'approved' | 'rejected') => {
    setExpertApproval(id, status);
    setItems(getPendingExperts());
    setToast(status === 'approved' ? 'کارشناس تأیید شد (mock)' : 'درخواست رد شد (mock)');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <RequireRole roles={['admin', 'manager']}>
      <div className="space-y-6">
        <PageHeader
          title="تأیید کارشناسان"
          description="صف ثبت‌نام متخصص با رزومه — تأیید/رد نمایشی"
          badge={<Badge tone="amber">Pending queue</Badge>}
        />

        {toast && (
          <div className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg px-3 py-2">
            {toast}
          </div>
        )}

        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-xs text-slate-500">درخواستی در صف نیست.</p>
          ) : (
            items.map((e) => (
              <div
                key={e.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap gap-3 justify-between items-start"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{e.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {e.specialty} · {e.city} · {e.email}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      رزومه: {e.resumeTitle} · ثبت: {e.submittedAt}
                    </p>
                    <Badge
                      tone={e.status === 'approved' ? 'green' : e.status === 'rejected' ? 'rose' : 'amber'}
                      className="mt-2"
                    >
                      {e.status === 'pending' ? 'در انتظار' : e.status === 'approved' ? 'تأیید شده' : 'رد شده'}
                    </Badge>
                  </div>
                </div>
                {e.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => act(e.id, 'approved')}>
                      <Check className="w-3 h-3" />
                      تأیید
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => act(e.id, 'rejected')}>
                      <X className="w-3 h-3" />
                      رد
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-700" />
            <h2 className="text-sm font-black">رتبه درآمد کارشناسان (mock)</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs text-right">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-3">کارشناس</th>
                  <th className="p-3">مشاوره اولیه</th>
                  <th className="p-3">پروژه</th>
                  <th className="p-3">تعداد پروژه</th>
                  <th className="p-3">پشتیبانی</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white dark:bg-slate-900">
                {[...MOCK_EXPERT_INCOME]
                  .sort((a, b) => b.consultIncome + b.projectIncome - (a.consultIncome + a.projectIncome))
                  .map((row) => (
                    <tr key={row.expertId}>
                      <td className="p-3 font-bold">{row.name}</td>
                      <td className="p-3">{row.consultIncome} م</td>
                      <td className="p-3">{row.projectIncome} م</td>
                      <td className="p-3">{row.projectsCount}</td>
                      <td className="p-3">{row.supportCount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RequireRole>
  );
};
