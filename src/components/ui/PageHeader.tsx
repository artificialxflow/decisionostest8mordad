import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actions, badge }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h1>
        {badge}
      </div>
      {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </div>
);
