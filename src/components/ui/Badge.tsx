import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'neutral' | 'blue' | 'green' | 'rose' | 'amber';
  className?: string;
}

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  blue: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
  amber: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
};

export const Badge: React.FC<BadgeProps> = ({ children, tone = 'neutral', className = '' }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${tones[tone]} ${className}`}>
    {children}
  </span>
);
