import React from 'react';

export interface ChartBarItem {
  label: string;
  value: number;
  color?: string;
}

export const SimpleBarChart: React.FC<{ data: ChartBarItem[]; max?: number }> = ({ data, max }) => {
  const peak = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-40 pt-4">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1 min-w-0">
          <div
            className="w-full rounded-t-md bg-blue-500/80 dark:bg-blue-600 transition-all"
            style={{ height: `${Math.max(8, (d.value / peak) * 100)}%`, backgroundColor: d.color }}
            title={`${d.value}`}
          />
          <span className="text-[9px] text-slate-500 truncate w-full text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

export const SimpleDonutChart: React.FC<{ data: ChartBarItem[] }> = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const colors = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];
  let acc = 0;
  const gradient = data
    .map((d, i) => {
      const start = (acc / total) * 100;
      acc += d.value;
      const end = (acc / total) * 100;
      return `${colors[i % colors.length]} ${start}% ${end}%`;
    })
    .join(', ');

  return (
    <div className="flex items-center gap-4">
      <div className="w-28 h-28 rounded-full shrink-0" style={{ background: `conic-gradient(${gradient})` }} />
      <div className="space-y-1 text-xs">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
            <span>{d.label}</span>
            <span className="text-slate-500">{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Sparkline: React.FC<{ values: number[] }> = ({ values }) => {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1 || 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg viewBox="0 0 100 30" className="w-full h-8 text-blue-500" preserveAspectRatio="none">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} />
    </svg>
  );
};
