import React from 'react';
import { Badge, PageHeader } from '../components/ui';

const posts = [
  { title: 'Workspace چیست و چرا برای وکلا مهم است؟', date: '۱۴۰۴/۰۴/۰۱', tag: 'پلتفرم' },
  { title: 'چگونه ریسک سند تک‌برگ را سریع ارزیابی کنیم؟', date: '۱۴۰۴/۰۳/۲۰', tag: 'املاک' },
  { title: 'نقش AI در تحلیل اولیه پرونده حقوقی', date: '۱۴۰۴/۰۳/۱۰', tag: 'هوش مصنوعی' },
];

export const BlogPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <PageHeader
      title="بلاگ DecisionOS"
      description="محتوای آموزشی و خبری — فعلاً Placeholder"
      badge={<Badge tone="blue">Placeholder</Badge>}
    />
    <div className="space-y-3">
      {posts.map((p) => (
        <article
          key={p.title}
          className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        >
          <div className="flex items-center gap-2 mb-2">
            <Badge>{p.tag}</Badge>
            <span className="text-[10px] text-slate-400">{p.date}</span>
          </div>
          <h2 className="text-sm font-bold">{p.title}</h2>
          <p className="text-[11px] text-slate-500 mt-1">متن کامل به‌زودی از طریق CMS منتشر می‌شود.</p>
        </article>
      ))}
    </div>
  </div>
);
