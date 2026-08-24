import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, CalendarDays, ClipboardList } from 'lucide-react';
import { PageHeader, Badge, Button, EmptyState } from '../components/ui';
import { getMockSessions } from '../lib/mock/sessions';
import { ROUTES } from '../routes';
import { useAuth } from '../context/AuthContext';

export const SessionsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const sessions = getMockSessions();
  const [toast, setToast] = useState('');

  const join = (title: string) => {
    setToast(`ورود به جلسه «${title}» — نسخه نمایشی`);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg z-50">
          {toast}
        </div>
      )}
      <PageHeader
        title="جلسات من"
        description="جلسات مشاوره و آنلاین — mock"
        badge={<Badge tone="blue">نسخه نمایشی</Badge>}
        actions={
          <Link to={ROUTES.calendar}>
            <Button size="sm" variant="outline">
              <CalendarDays className="w-3.5 h-3.5" /> تقویم
            </Button>
          </Link>
        }
      />
      {sessions.length === 0 ? (
        <EmptyState
          title="جلسه‌ای ثبت نشده"
          description="از تقویم زمان‌بندی کنید یا درخواست مشاوره بفرستید."
          actionLabel="درخواست مشاوره"
          onAction={() => navigate(ROUTES.requestNew)}
          icon={<ClipboardList className="w-5 h-5" />}
        />
      ) : (
        <div className="space-y-2">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border bg-white dark:bg-slate-900 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold">{s.title}</p>
                  <p className="text-slate-500">
                    {s.date} · {s.time} · {user?.role === 'expert' ? s.clientName : s.expertName}
                  </p>
                  {s.caseTitle && <p className="text-slate-400 mt-0.5">{s.caseTitle}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={s.status === 'upcoming' ? 'blue' : s.status === 'done' ? 'green' : 'amber'}>
                  {s.status === 'upcoming' ? 'آینده' : s.status === 'done' ? 'برگزار شده' : s.status}
                </Badge>
                {(s.status === 'upcoming' || s.status === 'live') && (
                  <Button size="sm" onClick={() => join(s.title)}>
                    ورود به جلسه
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
