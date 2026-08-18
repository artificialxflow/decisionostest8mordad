import React, { useState } from 'react';
import { PageHeader, Badge, Button, Input } from '../components/ui';
import { featureBadge } from '../config/features';

const initialPages = [
  { id: 'home', title: 'صفحه اصلی', body: 'متن معرفی DecisionOS...' },
  { id: 'about', title: 'درباره ما', body: 'داستان شرکت و مأموریت...' },
  { id: 'faq', title: 'سوالات متداول', body: 'محتوای FAQ قابل ویرایش...' },
];

/** اسکلت CMS — ویرایش مطالب بدون برنامه‌نویس (Sprint 1) */
export const CmsPage: React.FC = () => {
  const [pages, setPages] = useState(initialPages);
  const [selected, setSelected] = useState(initialPages[0].id);
  const current = pages.find((p) => p.id === selected)!;

  return (
    <div className="space-y-5">
      <PageHeader
        title="CMS"
        description="ویرایش مطالب سایت بدون نیاز به برنامه‌نویس — محتوای About، FAQ و Landing"
        badge={<Badge tone="amber">{featureBadge('cms') || 'به‌زودی'}</Badge>}
      />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`w-full text-right p-3 rounded-lg border text-xs font-bold ${
                selected === p.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-3">
          <Input
            label="عنوان"
            value={current.title}
            onChange={(e) =>
              setPages((prev) => prev.map((p) => (p.id === selected ? { ...p, title: e.target.value } : p)))
            }
          />
          <div className="space-y-1">
            <label className="text-xs font-semibold">محتوا</label>
            <textarea
              rows={8}
              value={current.body}
              onChange={(e) =>
                setPages((prev) => prev.map((p) => (p.id === selected ? { ...p, body: e.target.value } : p)))
              }
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-3 text-xs focus:border-blue-500 focus:outline-hidden"
            />
          </div>
          <Button
            size="sm"
            onClick={() => alert('ذخیره mock — اتصال DB در فاز ۵')}
          >
            ذخیره تغییرات
          </Button>
        </div>
      </div>
    </div>
  );
};
