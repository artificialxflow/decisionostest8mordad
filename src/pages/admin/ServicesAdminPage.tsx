import React, { useState } from 'react';
import { PageHeader, Button, Badge, EmptyState } from '../../components/ui';
import { RequireRole } from '../../components/auth/RequireRole';
import { getMockServices } from '../../lib/mock';
import { ServiceItem, ServiceCategory } from '../../types';

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  legal: 'حقوقی',
  contract: 'قراردادی',
  real_estate: 'املاک و ثبتی',
  insurance: 'بیمه',
  finance: 'مالی',
  accounting: 'مالی و حسابداری',
  investment: 'سرمایه‌گذاری',
  business: 'کسب‌وکار',
  ai: 'تحلیل داده',
};

export const ServicesAdminPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(() => getMockServices());
  const [editing, setEditing] = useState<ServiceItem | null>(null);

  const toggleStatus = (id: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
      )
    );
  };

  const saveEdit = () => {
    if (!editing) return;
    setServices((prev) => prev.map((s) => (s.id === editing.id ? editing : s)));
    setEditing(null);
  };

  return (
    <RequireRole roles={['admin', 'manager']}>
      <div className="space-y-5">
        <PageHeader
          title="مدیریت کatalog خدمات"
          description="ایجاد، ویرایش، فعال/غیرفعال و مرتب‌سازی خدمات"
          badge={<Badge tone="blue">Admin</Badge>}
        />

        {services.length === 0 ? (
          <EmptyState title="خدمتی ثبت نشده" description="اولین خدمت را اضافه کنید." />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-3">ترتیب</th>
                  <th className="p-3">عنوان</th>
                  <th className="p-3">دسته</th>
                  <th className="p-3">زمان</th>
                  <th className="p-3">وضعیت</th>
                  <th className="p-3">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {services.map((s) => (
                  <tr key={s.id} className="bg-white dark:bg-slate-900">
                    <td className="p-3">{s.sortOrder}</td>
                    <td className="p-3 font-bold">{s.title}</td>
                    <td className="p-3">{CATEGORY_LABELS[s.category]}</td>
                    <td className="p-3">{s.estimatedTime || '—'}</td>
                    <td className="p-3">
                      <Badge tone={s.status === 'active' ? 'green' : 'neutral'}>
                        {s.status === 'active' ? 'فعال' : 'غیرفعال'}
                      </Badge>
                    </td>
                    <td className="p-3 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditing({ ...s })}>
                        ویرایش
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => toggleStatus(s.id)}>
                        {s.status === 'active' ? 'غیرفعال' : 'فعال'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editing && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-5 w-full max-w-md space-y-3 text-right">
              <h3 className="font-bold text-sm">ویرایش خدمت</h3>
              <input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-xs"
              />
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-xs"
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setEditing(null)}>انصراف</Button>
                <Button onClick={saveEdit}>ذخیره</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireRole>
  );
};
