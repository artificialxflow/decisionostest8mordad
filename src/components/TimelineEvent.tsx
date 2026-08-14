import React from 'react';
import { Clock, FileText, User, Gavel, Upload, UserCheck, ArrowRightLeft } from 'lucide-react';
import { TimelineEventItem } from '../types';

const ACTION_ICONS: Record<string, React.ElementType> = {
  'ایجاد پرونده': Gavel,
  'بارگذاری سند': Upload,
  'تغییر وضعیت': ArrowRightLeft,
  'تخصیص کارشناس': UserCheck,
  Login: User,
  default: FileText,
};

interface TimelineEventProps {
  event: TimelineEventItem;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({ event }) => {
  const Icon = ACTION_ICONS[event.action] || ACTION_ICONS.default;

  return (
    <div className="flex gap-3 pb-4 border-r-2 border-slate-200 dark:border-slate-700 pr-4 mr-2 relative last:pb-0">
      <div className="absolute -right-[9px] top-1 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
        <Icon className="w-2 h-2 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{event.action}</p>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {event.timestamp}
          </span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{event.actorName}</p>
        {event.details && (
          <p className="text-[10px] text-slate-500 mt-1 bg-slate-50 dark:bg-slate-800 rounded px-2 py-1 inline-block">
            {event.details}
          </p>
        )}
      </div>
    </div>
  );
};

interface TimelineFeedProps {
  events: TimelineEventItem[];
  emptyTitle?: string;
}

export const TimelineFeed: React.FC<TimelineFeedProps> = ({
  events,
  emptyTitle = 'هنوز رویدادی ثبت نشده',
}) => {
  if (events.length === 0) {
    return <p className="text-xs text-slate-500 text-center py-6">{emptyTitle}</p>;
  }

  return (
    <div className="space-y-0">
      {events.map((e) => (
        <TimelineEvent key={e.id} event={e} />
      ))}
    </div>
  );
};
