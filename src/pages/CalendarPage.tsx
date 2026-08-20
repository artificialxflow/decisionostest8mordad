import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon } from 'lucide-react';
import { PageHeader, Badge, Button } from '../components/ui';
import { CalendarView } from '../components/CalendarView';
import { MOCK_CALENDAR_EVENTS } from '../lib/mock/calendar';
import { addMockReminder, getMockReminders } from '../lib/mock/reminders';
import { CalendarEventItem } from '../types';

export const CalendarPage: React.FC = () => {
  const [view, setView] = useState<'month' | 'week'>('month');
  const navigate = useNavigate();

  const onEventClick = (ev: CalendarEventItem) => {
    if (ev.caseId) navigate(`/app/cases/${ev.caseId}`);
    else if (ev.workspaceId) navigate(`/app/workspace/${ev.workspaceId}`);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="تقویم"
        description="مهلت‌ها، جلسات و یادآورها — mock"
        badge={<Badge tone="blue">{MOCK_CALENDAR_EVENTS.length} رویداد</Badge>}
        actions={
          <div className="flex gap-1">
            {(['month', 'week'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`text-xs px-3 py-1.5 rounded-md ${view === v ? 'bg-blue-600 text-white' : 'border'}`}
              >
                {v === 'month' ? 'ماه' : 'هفته'}
              </button>
            ))}
          </div>
        }
      />
      <div className="bg-white dark:bg-slate-900 border rounded-lg p-4">
        <CalendarView events={MOCK_CALENDAR_EVENTS} view={view} onEventClick={onEventClick} />
      </div>
    </div>
  );
};

export const RemindersPage: React.FC = () => {
  const [items, setItems] = useState(getMockReminders);
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('1403/06/20');

  const add = () => {
    if (!title.trim()) return;
    addMockReminder({ title, dueDate: due, done: false });
    setItems(getMockReminders());
    setTitle('');
  };

  return (
    <div className="space-y-5">
      <PageHeader title="یادآورها" description="Follow-up و deadline — mock" badge={<Badge tone="amber">نسخه نمایشی</Badge>} />
      <div className="flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان..." className="flex-1 border rounded-md px-3 py-2 text-xs" />
        <input value={due} onChange={(e) => setDue(e.target.value)} className="w-28 border rounded-md px-2 py-2 text-xs" />
        <Button size="sm" onClick={add}>
          افزودن
        </Button>
      </div>
      <div className="space-y-2">
        {items.map((r) => (
          <div key={r.id} className={`flex items-center justify-between p-3 border rounded-lg text-xs ${r.done ? 'opacity-50' : ''}`}>
            <div>
              <p className="font-bold">{r.title}</p>
              <p className="text-slate-500">
                {r.dueDate} {r.caseTitle && `· ${r.caseTitle}`}
              </p>
            </div>
            <CalendarIcon className="w-4 h-4 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
