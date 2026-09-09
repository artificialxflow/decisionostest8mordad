import React, { useState } from 'react';
import { PageHeader, Button, Badge, EmptyState } from '../../components/ui';
import { RequireRole } from '../../components/auth/RequireRole';
import {
  getServiceRegistry,
  updateServiceRegistryEntry,
} from '../../lib/mock';
import { ServiceTypeRegistryEntry, ServiceTypeId } from '../../types';

export const ServicesAdminPage: React.FC = () => {
  const [items, setItems] = useState<ServiceTypeRegistryEntry[]>(() => getServiceRegistry());
  const [editing, setEditing] = useState<ServiceTypeRegistryEntry | null>(null);

  const refresh = () => setItems(getServiceRegistry());

  const toggleActive = (id: ServiceTypeId) => {
    const cur = items.find((s) => s.serviceId === id);
    if (!cur) return;
    updateServiceRegistryEntry(id, { active: !cur.active });
    refresh();
  };

  const move = (id: ServiceTypeId, dir: -1 | 1) => {
    const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = sorted.findIndex((s) => s.serviceId === id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    updateServiceRegistryEntry(id, { sortOrder: swap.sortOrder });
    updateServiceRegistryEntry(swap.serviceId, { sortOrder: sorted[idx].sortOrder });
    refresh();
  };

  const saveEdit = () => {
    if (!editing) return;
    updateServiceRegistryEntry(editing.serviceId, {
      name: editing.name,
      description: editing.description,
      version: editing.version,
      sortOrder: editing.sortOrder,
      active: editing.active,
    });
    setEditing(null);
    refresh();
  };

  return (
    <RequireRole roles={['admin', 'manager']}>
      <div className="space-y-5">
        <PageHeader
          title="Service Registry"
          description="فعال/غیرفعال، ترتیب، نسخه فرم و مشاهده case_schema / aiCapabilities — mock"
          badge={<Badge tone="blue">v7 Admin</Badge>}
        />

        {items.length === 0 ? (
          <EmptyState title="خدمتی ثبت نشده" description="Registry خالی است." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-3">ترتیب</th>
                  <th className="p-3">خدمت</th>
                  <th className="p-3">فرم</th>
                  <th className="p-3">نسخه</th>
                  <th className="p-3">وضعیت</th>
                  <th className="p-3">AI</th>
                  <th className="p-3">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {items.map((s) => (
                  <tr key={s.serviceId} className="bg-white dark:bg-slate-900 align-top">
                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono">{s.sortOrder}</span>
                        <div className="flex gap-1">
                          <button type="button" className="text-[9px] text-slate-500" onClick={() => move(s.serviceId, -1)}>
                            ↑
                          </button>
                          <button type="button" className="text-[9px] text-slate-500" onClick={() => move(s.serviceId, 1)}>
                            ↓
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-bold">{s.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{s.description}</p>
                      <p className="text-[9px] font-mono text-slate-400 mt-1">{s.serviceId}</p>
                    </td>
                    <td className="p-3 font-mono text-[10px]">{s.formSchemaId}</td>
                    <td className="p-3">
                      <Badge tone="neutral">v{s.version}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge tone={s.active ? 'green' : 'neutral'}>{s.active ? 'فعال' : 'غیرفعال'}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {s.aiCapabilities.slice(0, 3).map((c) => (
                          <span key={c} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                            {c}
                          </span>
                        ))}
                      </div>
                      <p className="text-[9px] text-slate-400 mt-1">schema: {s.caseSchemaSections.length} بخش</p>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="outline" onClick={() => setEditing({ ...s })}>
                          ویرایش
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => toggleActive(s.serviceId)}>
                          {s.active ? 'غیرفعال' : 'فعال'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editing && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 w-full max-w-lg space-y-3 text-right max-h-[90vh] overflow-y-auto">
              <h3 className="font-bold text-sm">ویرایش Registry — {editing.serviceId}</h3>
              <label className="text-[11px] font-bold block">نام</label>
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-xs"
              />
              <label className="text-[11px] font-bold block">توضیح</label>
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-xs"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold block">نسخه</label>
                  <input
                    value={editing.version}
                    onChange={(e) => setEditing({ ...editing, version: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold block">ترتیب</label>
                  <input
                    type="number"
                    value={editing.sortOrder}
                    onChange={(e) => setEditing({ ...editing, sortOrder: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border text-[10px] space-y-1">
                <p className="font-bold">case_schema</p>
                <p>{editing.caseSchemaSections.join(' · ')}</p>
                <p className="font-bold mt-2">aiCapabilities</p>
                <p>{editing.aiCapabilities.join(' · ')}</p>
                <p className="font-bold mt-2">agents (placeholder)</p>
                <p>{editing.agents.join(' · ')}</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setEditing(null)}>
                  انصراف
                </Button>
                <Button onClick={saveEdit}>ذخیره</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireRole>
  );
};
