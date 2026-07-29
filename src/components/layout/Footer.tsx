import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm">
            Decision<span className="text-blue-400">OS</span>
          </h3>
          <p className="text-[11px] leading-relaxed text-slate-400">
            پلتفرم هوشمند مدیریت پرونده، اسناد و تصمیم‌گیری حقوقی، ملکی و کسب‌وکار.
          </p>
          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">نماد اعتماد</span>
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">مجوز فعالیت</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white">دسترسی سریع</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <Link to={ROUTES.services} className="hover:text-white">خدمات</Link>
            <Link to={ROUTES.pricing} className="hover:text-white">تعرفه</Link>
            <Link to={ROUTES.faq} className="hover:text-white">سوالات متداول</Link>
            <Link to={ROUTES.blog} className="hover:text-white">بلاگ</Link>
            <Link to={ROUTES.about} className="hover:text-white">درباره ما</Link>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white">تماس</h4>
          <p className="text-[11px] text-slate-400">تهران، خیابان ولیعصر</p>
          <p className="text-[11px] text-slate-400">۰۲۱-۹۱۰۰۰۰۰۰</p>
          <p className="text-[11px] text-slate-400">info@decisionos.ir</p>
          <p className="text-[11px] text-slate-400">ساعات کاری: ۹ تا ۱۸</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white">شبکه‌های اجتماعی</h4>
          <div className="flex gap-2 text-[11px]">
            <span className="px-2 py-1 rounded bg-slate-800">LinkedIn</span>
            <span className="px-2 py-1 rounded bg-slate-800">Instagram</span>
            <span className="px-2 py-1 rounded bg-slate-800">X</span>
          </div>
          <p className="text-[10px] text-slate-500 pt-2">نقشه دفتر — به‌زودی</p>
        </div>
      </div>
      <div className="border-t border-slate-800 text-center text-[10px] text-slate-500 py-3">
        DecisionOS © 2026 — تمامی حقوق محفوظ است
      </div>
    </footer>
  );
};
