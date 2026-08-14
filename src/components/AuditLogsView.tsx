import React, { useMemo, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { AuditLog } from '../types';
import { EmptyState } from './ui/EmptyState';

interface AuditLogsViewProps {
  logs: AuditLog[];
}

const ACTION_TYPES = [
  'همه',
  'Login',
  'Logout',
  'Create Case',
  'Create Request',
  'Upload',
  'Delete',
  'Change Status',
  'Assign Expert',
  'Edit',
];

export const AuditLogsView: React.FC<AuditLogsViewProps> = ({ logs }) => {
  const [actionFilter, setActionFilter] = useState('همه');

  const filtered = useMemo(() => {
    if (actionFilter === 'همه') return logs;
    return logs.filter((l) => l.action.includes(actionFilter) || l.action === actionFilter);
  }, [logs, actionFilter]);

  return (
    <div className="space-y-6 text-right font-vazirmatn">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-amber-600" />
          <span>لاگ امنیتی (Audit Log)</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          User / Action / Object / Date-Time
        </p>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-slate-600">فیلتر Action:</label>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="text-xs border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1.5 bg-white dark:bg-slate-900"
        >
          {ACTION_TYPES.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="رویدادی ثبت نشده"
          description="فعالیت‌های سیستم در اینجا نمایش داده می‌شوند."
          icon={<ShieldCheck className="w-5 h-5" />}
        />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-900 text-white font-bold text-[11px]">
                <tr>
                  <th className="p-3.5">Date-Time</th>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">Object</th>
                  <th className="p-3.5">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300">{log.timestamp}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900 dark:text-white">{log.userEmail}</div>
                      <div className="text-[10px] text-slate-400">{log.userId}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold px-2.5 py-0.5 rounded-md text-[11px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">
                      {log.target}
                      {log.details && (
                        <div className="text-[10px] text-slate-500 mt-0.5">{log.details}</div>
                      )}
                    </td>
                    <td className="p-3.5 font-mono text-slate-500 text-[11px]">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
