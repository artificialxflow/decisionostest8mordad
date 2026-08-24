import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { usePlatformData } from '../components/layout/PlatformLayout';
import { apiUrl } from '../lib/api';
import { featureBadge } from '../config/features';
import { ROUTES } from '../routes';

export const NotificationsPage: React.FC = () => {
  const { notifications, refresh } = usePlatformData();
  const navigate = useNavigate();

  const markRead = async (id: string) => {
    await fetch(apiUrl(`/notifications/${id}/read`), { method: 'POST' });
    await refresh();
  };

  const openNotif = async (id: string, link?: string) => {
    await markRead(id);
    if (link) navigate(link);
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
          <EmptyState
            title="اعلانی وجود ندارد"
            description="وقتی متخصص پاسخ دهد، مدرک لازم باشد یا جلسه‌ای نزدیک شود، اینجا می‌بینید."
            actionLabel="رفتن به داشبورد"
            onAction={() => navigate(ROUTES.dashboard)}
            icon={<Bell className="w-5 h-5" />}
          />
        ) : (
          notifications.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => openNotif(n.id, n.link)}
              className="w-full flex items-start justify-between gap-3 p-4 text-right hover:bg-slate-50 dark:hover:bg-slate-800/50 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
            >
              <div>
                <div className={`text-xs ${n.read ? 'text-slate-500' : 'font-bold'}`}>{n.title}</div>
                <p className="text-[11px] text-slate-500 mt-1">{n.body}</p>
                <div className="flex gap-2 mt-2 items-center">
                  <Badge tone={n.channel === 'in_app' ? 'blue' : 'amber'}>{n.channel}</Badge>
                  <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                  {n.link && <span className="text-[10px] text-blue-600 font-bold">مشاهده ←</span>}
                </div>
              </div>
              {!n.read && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    markRead(n.id);
                  }}
                >
                  خواندم
                </Button>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
