import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, BellRing } from 'lucide-react';
import { PageHeader, Badge, Button } from '../components/ui';
import { CalendarView } from '../components/CalendarView';
import { MOCK_CALENDAR_EVENTS } from '../lib/mock/calendar';
import { addMockReminder, getMockReminders } from '../lib/mock/reminders';
import { CalendarEventItem } from '../types';

export const CalendarPage: React.FC = () => {
  const [view, setView] = useState<'month' | 'week'>('month');
  const [items, setItems] = useState(getMockReminders);
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('1403/06/20');
  const navigate = useNavigate();

  const onEventClick = (ev: CalendarEventItem) => {
    if (ev.caseId) navigate(`/app/cases/${ev.caseId}`);
    else if (ev.workspaceId) navigate(`/app/workspace/${ev.workspaceId}`);
  };

  const add = () => {
    if (!title.trim()) return;
    addMockReminder({ title, dueDate: due, done: false });
    setItems(getMockReminders());
    setTitle('');
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="تقویم و یادآورها"
        description="دفتر، کارشناس، دادگاه + کارهای انجام‌شده و آینده"
        badge={<Badge tone="blue">{MOCK_CALENDAR_EVENTS.length} رویداد</Badge>}
        actions={
          <div className="flex gap-1">
            {(['month', 'week'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`text-xs px-3 py-1.5 rounded-md ${view === v ? 'bg-teal-700 text-white' : 'border'}`}
              >
                {v === 'month' ? 'ماه' : 'هفته'}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border rounded-xl p-4">
          <CalendarView events={MOCK_CALENDAR_EVENTS} view={view} onEventClick={onEventClick} />
        </div>

        <div className="bg-white dark:bg-slate-900 border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-teal-700" />
            <p className="text-xs font-bold">یادآورها</p>
          </div>
          <div className="flex flex-col gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان یادآور…"
              className="w-full border rounded-lg px-3 py-2 text-xs"
            />
            <div className="flex gap-2">
              <input
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="flex-1 border rounded-lg px-2 py-2 text-xs"
              />
              <Button size="sm" onClick={add}>
                افزودن
              </Button>
            </div>
          </div>
          <div className="space-y-2 max-h-[420px] overflow-y-auto">
            <p className="text-[10px] font-bold text-slate-500 pt-1">رویدادها (دفتر / کارشناس / دادگاه)</p>
            {MOCK_CALENDAR_EVENTS.filter((e) => ['office', 'expert', 'court'].includes(e.type)).map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => onEventClick(e)}
                className="w-full text-right text-[11px] p-2 rounded-lg border hover:border-teal-400"
              >
                <span className="font-bold">{e.title}</span>
                <span className="block text-slate-500">{e.date} · {e.type === 'office' ? 'دفتر' : e.type === 'expert' ? 'کارشناس' : 'دادگاه'}</span>
              </button>
            ))}
            <p className="text-[10px] font-bold text-slate-500 pt-2">کارهای انجام‌شده / آینده</p>
            {MOCK_CALENDAR_EVENTS.filter((e) => e.type === 'task').map((e) => (
              <div key={e.id} className="text-[11px] p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="font-bold">{e.title}</p>
                <p className="text-slate-500">{e.date}</p>
              </div>
            ))}
            {items.map((r) => (
              <div
                key={r.id}
                className={`flex items-center justify-between p-3 border rounded-lg text-xs ${r.done ? 'opacity-50' : ''}`}
              >
                <div>
                  <p className="font-bold">{r.title}</p>
                  <p className="text-slate-500">
                    {r.dueDate} {r.caseTitle && `· ${r.caseTitle}`}
                  </p>
                </div>
                <CalendarIcon className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Keep route for reminders — redirects UX to combined page content */
export const RemindersPage: React.FC = () => <CalendarPage />;
