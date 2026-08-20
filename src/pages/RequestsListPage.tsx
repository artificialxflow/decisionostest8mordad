import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipboardList, ExternalLink } from 'lucide-react';
import { PageHeader, Badge, Button } from '../components/ui';
import { getMockRequests, getMockServices } from '../lib/mock';
import { ROUTES } from '../routes';
import { REQUEST_STATUS_LABELS } from '../lib/labels';

const STATUS_TONE: Record<string, 'blue' | 'green' | 'amber' | 'neutral'> = {
  submitted: 'blue',
  reviewing: 'amber',
  approved: 'green',
  rejected: 'rose' as 'amber',
  draft: 'neutral',
};

export const RequestsListPage: React.FC = () => {
  const requests = getMockRequests();
  const services = getMockServices();
  const navigate = useNavigate();

  const serviceTitle = (id: string) => services.find((s) => s.id === id)?.title ?? id;

  return (
    <div className="space-y-5">
      <PageHeader
        title="درخواست‌ها"
        description="لیست درخواست‌های ثبت‌شده — mock"
        badge={<Badge tone="blue">{requests.length} درخواست</Badge>}
        actions={
          <Button size="sm" onClick={() => navigate(ROUTES.requestNew)}>
            درخواست جدید
          </Button>
        }
      />
      <div className="bg-white dark:bg-slate-900 border rounded-lg overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-right p-3 font-bold">عنوان</th>
              <th className="text-right p-3 font-bold">خدمت</th>
              <th className="text-right p-3 font-bold">وضعیت</th>
              <th className="text-right p-3 font-bold">تاریخ</th>
              <th className="text-right p-3 font-bold">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3 text-slate-500">{serviceTitle(r.serviceId)}</td>
                <td className="p-3">
                  <Badge tone={STATUS_TONE[r.status] ?? 'neutral'}>{REQUEST_STATUS_LABELS[r.status] ?? r.status}</Badge>
                </td>
                <td className="p-3 text-slate-400">{r.createdAt}</td>
                <td className="p-3">
                  {r.caseId && (
                    <Link to={`/app/cases/${r.caseId}`} className="text-blue-600 font-bold inline-flex items-center gap-1">
                      پرونده <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <p className="p-8 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
            <ClipboardList className="w-6 h-6" />
            درخواستی ثبت نشده
          </p>
        )}
      </div>
    </div>
  );
};
