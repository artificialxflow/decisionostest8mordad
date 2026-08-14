import React from 'react';
import { PageHeader, Badge, EmptyState } from '../components/ui';
import { RequireRole } from '../components/auth/RequireRole';
import { getMockExperts } from '../lib/mock';

export const ExpertsPage: React.FC = () => {
  const experts = getMockExperts();

  return (
    <RequireRole roles={['admin', 'manager']}>
      <div className="space-y-5">
        <PageHeader
          title="مدیریت کارشناسان"
          description="لیست کارشناسان، تخصص و پرونده‌های فعال"
          badge={<Badge tone="blue">Expert Management</Badge>}
        />

        {experts.length === 0 ? (
          <EmptyState title="کارشناسی یافت نشد" description="هنوز کارشناسی ثبت نشده است." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {experts.map((e) => (
              <div
                key={e.id}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">{e.name}</p>
                  <Badge tone={e.status === 'active' ? 'green' : 'gray'}>
                    {e.status === 'active' ? 'فعال' : 'غیرفعال'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">تخصص: {e.specialty}</p>
                <p className="text-xs text-blue-600 font-bold">{e.activeCases} پرونده فعال</p>
                {e.email && <p className="text-[10px] text-slate-400">{e.email}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </RequireRole>
  );
};
