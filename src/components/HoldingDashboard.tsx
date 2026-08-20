import React from 'react';
import { MOCK_SLA } from '../lib/mock/reports';
import { Badge } from './ui';

export const HoldingDashboard: React.FC = () => (
  <div className="space-y-4">
    <div className="grid sm:grid-cols-2 gap-3">
      {MOCK_SLA.map((t) => (
        <div key={t.tenant} className="p-4 rounded-lg border bg-white dark:bg-slate-900">
          <p className="text-xs font-bold">{t.tenant}</p>
          <div className="grid grid-cols-2 gap-2 mt-3 text-[10px]">
            <div>
              <span className="text-slate-500">پرونده فعال</span>
              <p className="text-lg font-black">{t.active}</p>
            </div>
            <div>
              <span className="text-slate-500">SLA</span>
              <p className="text-lg font-black text-emerald-600">{t.sla}%</p>
            </div>
            <div>
              <span className="text-slate-500">درآمد (M)</span>
              <p className="font-bold">{t.revenue}</p>
            </div>
            <div>
              <span className="text-slate-500">رضایت</span>
              <p className="font-bold">{t.satisfaction} ⭐</p>
            </div>
          </div>
          <Badge tone="blue" className="mt-2">
            هلدینگ
          </Badge>
        </div>
      ))}
    </div>
  </div>
);
