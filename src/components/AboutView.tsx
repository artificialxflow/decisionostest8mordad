import React from 'react';
import { Scale, Building2, ShieldCheck, Cpu, Target, Users } from 'lucide-react';
import aboutData from '../content/about.json';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 text-right font-vazirmatn max-w-4xl mx-auto px-4 py-8">
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
          <Scale className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-white">درباره DecisionOS</h1>
        <p className="text-xs text-slate-300 leading-relaxed">{aboutData.mission}</p>
        <p className="text-xs text-slate-400 leading-relaxed">{aboutData.story}</p>
      </div>

      <div>
        <h2 className="text-sm font-black mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" /> ارزش‌ها
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aboutData.values.map((v) => (
            <div key={v.title} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="text-xs font-bold">{v.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-black mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" /> تیم (placeholder)
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {aboutData.team.map((t) => (
            <div key={t.name} className="p-4 rounded-lg border text-center bg-white dark:bg-slate-900">
              <p className="text-xs font-bold">{t.name}</p>
              <p className="text-[10px] text-slate-500 mt-1">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border space-y-2">
          <Building2 className="w-6 h-6 text-amber-600" />
          <h3 className="text-xs font-bold">هلدینگ و Multi-tenant</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            یک سقف برای حقوق، بیمه، حسابداری — هر شرکت Workspace جدا. مشترک اپ می‌گیرد؛ Landing برای SEO جداست.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border space-y-2">
          <ShieldCheck className="w-6 h-6 text-amber-600" />
          <h3 className="text-xs font-bold">Audit Log تغییرناپذیر</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            شاهد دیجیتال — append-only. پیاده‌سازی DB در Sprint Backend.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-dashed text-[11px] text-slate-500 flex items-start gap-2">
        <Cpu className="w-4 h-4 shrink-0" />
        <span>AI و OCR در Sprint 3 — پس از تأیید ظاهر و Backend پایدار.</span>
      </div>
    </div>
  );
};
