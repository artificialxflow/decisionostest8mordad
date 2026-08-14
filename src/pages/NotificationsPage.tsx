import React from 'react';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { usePlatformData } from '../components/layout/PlatformLayout';
import { apiUrl } from '../lib/api';
import { featureBadge } from '../config/features';

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
        description="In-App Notification فعال · سایر کانال‌ها به‌زودی"
        badge={<Badge tone="blue">{notifications.filter((n) => !n.read).length} خوانده‌نشده</Badge>}
      />

      <div className="grid sm:grid-cols-4 gap-3">
        {[
          { icon: Bell, label: 'In-app', status: 'فعال', active: true },
          { icon: Mail, label: 'Email', status: featureBadge('whatsapp') || 'به‌زودی', active: false },
          { icon: Smartphone, label: 'SMS', status: 'به‌زودی', active: false },
          { icon: MessageSquare, label: 'WhatsApp', status: featureBadge('whatsapp') || 'به‌زودی', active: false },
        ].map((c) => (
          <div key={c.label} className={`flex items-center gap-3 p-3 rounded-lg border ${c.active ? 'border-blue-200 bg-blue-50/50' : 'border-dashed opacity-70'}`}>
            <c.icon className="w-4 h-4 text-blue-600" />
            <div>
              <div className="text-xs font-bold">{c.label}</div>
              <div className="text-[10px] text-slate-500">{c.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border rounded-lg divide-y">
        {notifications.length === 0 ? (
          <EmptyState title="اعلانی وجود ندارد" description="اعلان‌های سیستم اینجا نمایش داده می‌شوند." icon={<Bell className="w-5 h-5" />} />
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="flex items-start justify-between gap-3 p-4">
              <div>
                <div className={`text-xs ${n.read ? 'text-slate-500' : 'font-bold'}`}>{n.title}</div>
                <p className="text-[11px] text-slate-500 mt-1">{n.body}</p>
                <div className="flex gap-2 mt-2">
                  <Badge tone={n.channel === 'in_app' ? 'blue' : 'amber'}>{n.channel}</Badge>
                  <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                </div>
              </div>
              {!n.read && (
                <Button size="sm" variant="ghost" onClick={() => markRead(n.id)}>خواندم</Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
