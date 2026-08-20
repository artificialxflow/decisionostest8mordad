import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Users,
  FileCheck,
  Building2,
  ArrowLeft,
  Bot,
  Scale,
} from 'lucide-react';
import { ROUTES } from '../routes';
import { Button, Badge } from '../components/ui';
import { IS_PRODUCTION } from '../lib/env';
import posts from '../content/blog-posts.json';
import { HOLDING_SERVICE_CATEGORIES } from '../lib/mock/organizations';
import { featureBadge } from '../config/features';

const stats = IS_PRODUCTION
  ? []
  : [
      { label: 'پرونده تحلیل‌شده', value: '۱۲٬۴۰۰+' },
      { label: 'متخصص همکار', value: '۱۸۰+' },
      { label: 'سازمان مشتری', value: '۴۵+' },
    ];

const processSteps = [
  { title: 'ثبت درخواست', desc: 'شرح نیاز یا بارگذاری مدارک' },
  { title: 'ایجاد Workspace', desc: 'فضای کاری اختصاصی پرونده' },
  { title: 'بررسی کارشناس', desc: 'پیگیری وضعیت پرونده' },
  { title: 'تخصیص متخصص', desc: 'همراهی کارشناس تا نتیجه' },
];

const testimonials = IS_PRODUCTION
  ? []
  : [
      {
        name: 'مدیر حقوقی هلدینگ پارس',
        text: 'DecisionOS زمان بررسی قراردادهای ملکی ما را از هفته‌ها به چند ساعت کاهش داد.',
      },
      {
        name: 'وکیل پایه یک دادگستری',
        text: 'داشبورد پرونده و Workspace برای پرونده‌های ثبتی واقعاً کاربردی است.',
      },
    ];

export const LandingPage: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="text-right">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-bl from-slate-900 via-slate-800 to-blue-950" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-500/40 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-5"
          >
            <p className="text-blue-300 text-xs font-bold tracking-wide">DecisionOS Platform</p>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              تصمیم‌گیری حقوقی و کسب‌وکار
              <span className="block text-blue-300">با هوش مصنوعی قابل اعتماد</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              DecisionOS پلتفرم Workspaceمحور برای مدیریت پرونده، اسناد، قرارداد و تحلیل هوشمند است —
              نه فقط یک وب‌سایت معرفی خدمات.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `${ROUTES.services}?q=${encodeURIComponent(query)}`;
              }}
              className="relative max-w-lg"
            >
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="چه خدمتی نیاز دارید؟"
                className="w-full bg-white/95 text-slate-800 text-sm rounded-lg pr-10 pl-3 py-3 border-0 focus:outline-hidden focus:ring-2 focus:ring-blue-400"
              />
            </form>

            <div className="flex flex-wrap gap-2 pt-1">
              <Link to={ROUTES.register}>
                <Button size="lg">ثبت‌نام رایگان</Button>
              </Link>
              <Link to={ROUTES.login}>
                <Button size="lg" variant="outline" className="!border-slate-500 !text-white hover:!bg-white/10">
                  ورود به اپ
                </Button>
              </Link>
              <Link to={ROUTES.services}>
                <Button size="lg" variant="secondary">
                  مشاهده خدمات
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="text-center p-4"
          >
            <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-[11px] text-slate-500 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </section>
      )}

      {/* AI Section */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold">
              <Bot className="w-4 h-4" />
              DecisionOS AI
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              هوش مصنوعی، هسته اصلی سیستم
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              ساختار AI در Workspace آماده است. قابلیت‌های Agent، RAG و OCR در Sprint بعد فعال می‌شوند.
            </p>
            <Badge tone="amber">{featureBadge('rag') || 'به‌زودی'}</Badge>
          </div>
          <div className="rounded-xl bg-slate-900 text-slate-200 p-6 border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              نمونه خروجی تحلیل اولیه
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              ریسک ثبتی متوسط (۳۴٪) · پیشنهاد استعلام ثبت · احتمال موفقیت اولیه ۷۸٪ · نیاز به بررسی بند وجه التزام
            </p>
            <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
              <div className="h-full w-[78%] bg-blue-500 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Holding categories + News */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-black">خدمات هلدینگ</h2>
          <p className="text-xs text-slate-500">دسته‌بندی زیر یک سقف — حقوق، بیمه، حسابداری و بیشتر</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {HOLDING_SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-sm font-bold">{cat.label}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-black">اخبار و الهام</h2>
          {posts.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="block p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400"
            >
              <p className="text-[10px] text-slate-400">{p.date}</p>
              <p className="text-xs font-bold mt-1">{p.title}</p>
            </Link>
          ))}
          <Link to={ROUTES.blog} className="text-xs text-blue-600 font-bold">همه مقالات →</Link>
        </div>
      </section>

      {/* Trust blocks */}
      <section className="max-w-6xl mx-auto px-4 py-14 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">چرا به DecisionOS اعتماد کنیم؟</h2>
          <p className="text-xs text-slate-500">رزومه، تیم، مجوز و تجربه سازمانی در یک نگاه</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Building2, title: 'رزومه شرکت', desc: 'تخصص در حقوق ثبتی، قرارداد و تصمیم‌گیری سازمانی' },
            { icon: Users, title: 'تیم متخصص', desc: 'وکلا، کارشناسان ثبت و تحلیل‌گران داده' },
            { icon: FileCheck, title: 'نمونه پرونده', desc: 'کیس‌های واقعی ملکی، قراردادی و تجاری' },
            { icon: ShieldCheck, title: 'مجوز و گواهی', desc: 'رعایت امنیت داده و لاگ غیرقابل تغییر' },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
            >
              <item.icon className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold">{item.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-xl font-black text-center mb-8">روند انجام خدمات</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <div key={step.title} className="relative p-4">
                <div className="text-3xl font-black text-blue-600/20 mb-2">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-sm font-bold">{step.title}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials + orgs */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-lg font-black flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            نظرات مشتریان
          </h2>
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">«{t.text}»</p>
              <footer className="text-[11px] font-bold text-slate-800 dark:text-slate-100 mt-2">{t.name}</footer>
            </blockquote>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-black">مشتریان سازمانی</h2>
          <div className="grid grid-cols-2 gap-3">
            {['هلدینگ پارس', 'گروه ساختمانی آریا', 'موسسه حقوقی راستین', 'شرکت سرمایه‌گذاری امید'].map((org) => (
              <div
                key={org}
                className="h-16 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                {org}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
