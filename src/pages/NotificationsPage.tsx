import React from 'react';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { PageHeader, Badge, Button } from '../components/ui';
import { usePlatformData } from '../components/layout/PlatformLayout';
import { apiUrl } from '../lib/api';

export const NotificationsPage: React.FC = () => {
  const { notifications, refresh } = usePlatformData();

  const markRead = async (id: string) => {
    await fetch(apiUrl(`/notifications/${id}/read`), { method: 'POST' });
    await refresh();
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="اعلان‌ها"
        description="اعلان‌های داخل سیستم · کانال‌های Email و SMS طراحی شده‌اند"
        badge={<Badge tone="blue">{notifications.filter((n) => !n.read).length} خوانده‌نشده</Badge>}
      />

      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { icon: Bell, label: 'In-app', status: 'فعال' },
          { icon: Mail, label: 'Email', status: 'طراحی‌شده' },
          { icon: Smartphone, label: 'SMS', status: 'طراحی‌شده' },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <c.icon className="w-4 h-4 text-blue-600" />
            <div>
              <div className="text-xs font-bold">{c.label}</div>
              <div className="text-[10px] text-slate-500">{c.status}</div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-slate-500">
          <MessageSquare className="w-4 h-4" />
          <div>
            <div className="text-xs font-bold">WhatsApp</div>
            <div className="text-[10px]">بعداً — ساخته نشود</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg divide-y divide-slate-100 dark:divide-slate-800">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-start justify-between gap-3 p-4">
            <div>
              <div className={`text-xs ${n.read ? 'text-slate-500' : 'font-bold text-slate-800 dark:text-slate-100'}`}>
                {n.title}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{n.body}</p>
              <div className="flex gap-2 mt-2">
                <Badge>{n.channel}</Badge>
                <span className="text-[10px] text-slate-400">{n.createdAt}</span>
              </div>
            </div>
            {!n.read && (
              <Button size="sm" variant="ghost" onClick={() => markRead(n.id)}>
                خواندم
              </Button>
            )}
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="p-8 text-center text-xs text-slate-500">اعلانی وجود ندارد.</p>
        )}
      </div>
    </div>
  );
};
