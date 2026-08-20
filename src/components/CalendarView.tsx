import React from 'react';
import { CalendarEventItem } from '../types';
import { Badge } from './ui';

const TYPE_LABELS: Record<CalendarEventItem['type'], string> = {
  deadline: 'مهلت',
  meeting: 'جلسه',
  reminder: 'یادآور',
  task: 'Task',
};

const TYPE_COLORS: Record<CalendarEventItem['type'], string> = {
  deadline: 'border-red-300 bg-red-50',
  meeting: 'border-blue-300 bg-blue-50',
  reminder: 'border-amber-300 bg-amber-50',
  task: 'border-cyan-300 bg-cyan-50',
};

interface CalendarViewProps {
  events: CalendarEventItem[];
  view: 'month' | 'week';
  onEventClick?: (event: CalendarEventItem) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, view, onEventClick }) => {
  const days = view === 'month' ? 30 : 7;
  const dayNums = Array.from({ length: days }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className={`grid gap-1 ${view === 'month' ? 'grid-cols-7' : 'grid-cols-7'}`}>
        {dayNums.map((d) => {
          const dayEvents = events.filter((e) => e.date.endsWith(`/${String(d).padStart(2, '0')}`) || e.date.includes(`06/${d}`));
          return (
            <div key={d} className="min-h-[72px] border rounded-md p-1 text-[10px] bg-white dark:bg-slate-900">
              <span className="font-bold text-slate-500">{d}</span>
              <div className="space-y-0.5 mt-1">
                {dayEvents.slice(0, 2).map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => onEventClick?.(ev)}
                    className={`w-full text-right truncate px-1 py-0.5 rounded border text-[9px] ${TYPE_COLORS[ev.type]}`}
                  >
                    {ev.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(TYPE_LABELS) as CalendarEventItem['type'][]).map((t) => (
          <Badge key={t} tone="neutral">
            {TYPE_LABELS[t]}
          </Badge>
        ))}
      </div>
    </div>
  );
};
