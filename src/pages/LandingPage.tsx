import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Users,
  FileCheck,
  Building2,
  Briefcase,
  Scale,
  BarChart3,
  Video,
  ArrowLeft,
} from 'lucide-react';
import { ROUTES } from '../routes';
import { Button, Badge } from '../components/ui';
import { HOLDING_SERVICE_CATEGORIES } from '../lib/mock/organizations';

const marketingStats = [
  { label: 'کاربر ثبت‌شده', value: '۱۵٬۰۰۰+' },
  { label: 'پروژه موفق', value: '۸٬۵۰۰+' },
  { label: 'متخصص فعال', value: '۴٬۲۵۰+' },
  { label: 'رضایت کاربران', value: '۹۸٪' },
];

const features = [
  { icon: Briefcase, title: 'مدیریت پروژه یکپارچه', desc: 'پیگیری پرونده و Workspace در یک محیط' },
  { icon: Users, title: 'همکاری با متخصصان', desc: 'شبکه کارشناسان حقوقی، ملکی و مالی' },
  { icon: FileCheck, title: 'مدیریت هوشمند اسناد', desc: 'آپلود، نسخه، OCR و پیش‌نمایش' },
  { icon: Sparkles, title: 'تصمیم داده محور', desc: 'تحلیل و گزارش برای تصمیم بهتر' },
  { icon: ShieldCheck, title: 'امنیت و حریم خصوصی', desc: 'دسترسی نقش‌محور و لاگ امنیتی' },
];

const industries = [
  { id: 'legal', label: 'حقوقی' },
  { id: 'real_estate', label: 'املاک' },
  { id: 'insurance', label: 'بیمه' },
  { id: 'finance', label: 'مالی و مالیاتی' },
  { id: 'it', label: 'فناوری' },
  { id: 'engineering', label: 'مهندسی' },
];

/** Public Landing — مطابق updates/05؛ بدون داده خصوصی کاربر */
export const LandingPage: React.FC = () => {
  return (
    <div className="text-right">
      {/* Hero — روشن مطابق mockup */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-gradient-to-bl from-white via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <Badge tone="blue">پلتفرم هوشمند تصمیم‌سازی</Badge>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              تصمیم‌های بهتر
              <span className="block text-blue-600">با DecisionOS</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              مدیریت پروژه، همکاری با متخصصان و تصمیم‌گیری داده‌محور — در یک پلتفرم امن و یکپارچه.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link to={ROUTES.register}>
                <Button size="lg">ثبت‌نام رایگان</Button>
              </Link>
              <Link to={ROUTES.login}>
                <Button size="lg" variant="outline">
                  ورود
                </Button>
              </Link>
              <Link to={ROUTES.about}>
                <Button size="lg" variant="secondary">
                  بیشتر بدانید
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Mock dashboard preview — بدون داده واقعی */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-4 space-y-3">
              <div className="flex items-center gap-2 border-b pb-2">
                <div className="w-7 h-7 rounded-md bg-slate-900 text-blue-400 flex items-center justify-center">
                  <Scale className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold">پیش‌نمایش داشبورد</span>
                <Badge tone="neutral" className="mr-auto">
                  Demo
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['۲۴ پروژه', '۱۳۲ سند', '۷ جلسه'].map((t) => (
                  <div key={t} className="rounded-lg bg-slate-50 dark:bg-slate-800 p-2 text-center">
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200">{t}</p>
                  </div>
                ))}
              </div>
              <div className="h-24 rounded-lg bg-gradient-to-l from-blue-100 to-slate-100 dark:from-blue-950 dark:to-slate-800 flex items-end gap-1 p-3">
                {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500/70 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex gap-2 text-[10px] text-slate-500">
                <Video className="w-3 h-3" /> جلسات · <BarChart3 className="w-3 h-3" /> گزارش · <Users className="w-3 h-3" /> متخصصان
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-xl font-black mb-2 text-center">چرا DecisionOS؟</h2>
        <p className="text-xs text-slate-500 text-center mb-8">قابلیت‌های کلیدی برای تیم‌ها و سازمان‌ها</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2"
            >
              <f.icon className="w-6 h-6 text-blue-600 mx-auto" />
              <h3 className="text-xs font-bold">{f.title}</h3>
              <p className="text-[10px] text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services / industries */}
      <section className="bg-slate-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-black mb-4 text-center">حوزه‌های تخصصی</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <span
                key={ind.id}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-xs font-bold"
              >
                {ind.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-xl font-black mb-2">خدمات هلدینگ</h2>
        <p className="text-xs text-slate-500 mb-6">حقوق، بیمه، حسابداری و بیشتر — زیر یک سقف</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {HOLDING_SERVICE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <Building2 className="w-4 h-4 text-blue-600 mb-2" />
              <h3 className="text-sm font-bold">{cat.label}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{cat.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link to={ROUTES.services}>
            <Button variant="outline" size="sm">
              مشاهده همه خدمات <ArrowLeft className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Marketing stats — not private user data */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {marketingStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-blue-600">{s.value}</div>
              <div className="text-[11px] text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center space-y-4">
          <h2 className="text-2xl font-black">آماده تصمیم‌های بهتر هستید؟</h2>
          <p className="text-sm text-blue-100">همین حالا ثبت‌نام کنید یا درخواست دمو بدهید.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to={ROUTES.register}>
              <Button size="lg" className="!bg-white !text-blue-700 hover:!bg-blue-50">
                ثبت‌نام رایگان
              </Button>
            </Link>
            <Link to={ROUTES.contact}>
              <Button size="lg" variant="outline" className="!border-white !text-white hover:!bg-white/10">
                درخواست دمو
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
