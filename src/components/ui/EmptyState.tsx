import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => (
  <div className="flex flex-col items-center justify-center text-center py-12 px-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mb-3">
      {icon || <Inbox className="w-5 h-5" />}
    </div>
    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{title}</h3>
    {description && <p className="text-xs text-slate-500 mt-1 max-w-sm">{description}</p>}
    {actionLabel && onAction && (
      <Button className="mt-4" size="sm" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);
