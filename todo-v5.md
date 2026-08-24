# DecisionOS — todo-v5.md
## هم‌راستاسازی UI با updates/05 (Landing + Role Dashboards)

**منابع:**
- `updates/05/02.txt` — تفکیک Public vs Customer/Expert/Admin
- `updates/05/photo_*.jpg` — mockupهای Landing / Login / ۳ Dashboard
- `todo-v4-frontend.md` — پایه Sprint 2–5 UI ✅
- `updates/05/01.txt` — سخت‌افزار (خارج از scope این todo)

**Scope:** فقط **Frontend** — mock data / mockAuth  
**هدف:** تطبیق بصری و ساختاری با mockupهای `05` بدون Backend واقعی  
**پیش‌نیاز:** Frontend v4 تکمیل شده  
**وضعیت اجرا:** ✅ تکمیل — Frontend v5 (updates/05) demo-ready

---

## Gap خلاصه (ورودی v5)

| حوزه | تطبیق تقریبی | اولویت |
|------|-------------|--------|
| معماری دو سطح (عمومی / پس‌ازورود) | ~80% | نگهداری |
| سه Dashboard جدا | ~40% | High |
| Landing بصری mockup | ~50% | High |
| Login (موبایل + social) | ~30% | Medium |
| جلسات / درآمد / نظرات روی داشبورد | ~25% | High |
| Case list / detail پایه | ~70%+ | Low polish |

**تصمیم واژگان (پیش‌فرض):**
- UI کاربر: «پروژه» به‌عنوان برچسب نمایشی برای Case/Workspace
- داخلی کد: همان `Case` / `Workspace` باقی می‌ماند

---

## قوانین اجرا

```
✅ Frontend only — mockAuth + src/lib/mock/*
✅ Dashboard جدا per role (نه فقط KPI متفاوت)
✅ جلسات / درآمد / نظرات → mock UI
❌ Database / JWT واقعی / Multi-tenant server
❌ خرید/پیکربندی سخت‌افزار (→ updates/05/01.txt جدا)
```

---

## ترتیب فازها

```
[F0] تصمیم واژگان + نقشه منو نقش‌ها
  ↓
[F1] Landing عمومی مطابق mockup
  ↓
[F2] Login / Register polish
  ↓
[F3] Customer Dashboard (Control Center)
  ↓
[F4] Expert Dashboard
  ↓
[F5] Admin Control Center
  ↓
[F6] Sidebar نقش‌محور + Sessions hub
  ↓
[F7] Case/Project list & Expert profile polish
  ↓
[F8] QA + Demo script v5
```

---

## فاز F0 — تصمیم‌ها و اسکلت
**اولویت:** Critical | **برآورد:** 0.5–1 روز

- [x] تصمیم واژگان: نمایش «پروژه» vs «پرونده» در UI مشتری (مستند در همین فایل)
- [x] جدول منوی Customer / Expert / Admin مطابق `02.txt` نوشته شود
- [x] Route map: `/app/dashboard` → redirect بر اساس role به dashboard اختصاصی یا یک صفحه با ۳ layout
- [x] Mock seed جدید: sessions، expertIncome، expertReviews، adminSystemHealth

**خروجی:** سند تصمیم + mock types آماده

---

## فاز F1 — Landing عمومی (mockup)
**اولویت:** High | **برآورد:** 2–3 روز  
**منبع عکس:** هر ۳ photo — پنل Landing

- [x] Header: لوگو + معرفی / خدمات / متخصصان / تعرفه‌ها / تماس + ورود + ثبت‌نام
- [x] Hero روشن (یا مطابق mockup انتخاب‌شده): تیتر + ۲ CTA (ثبت‌نام رایگان / ورود یا مشاهده بیشتر)
- [x] تصویر/موکاپ داشبورد در Hero (بدون داده واقعی کاربر)
- [x] بخش قابلیت‌ها (۴–۵ کارت آیکون‌دار)
- [x] شبکه خدمات / صنایع (حقوق، املاک، بیمه، مالی، IT، …)
- [x] نوار آمار اجتماعی (کاربر، پروژه، متخصص، رضایت) — فقط marketing numbers
- [x] فوتر CTA: «آماده تصمیم بهتر؟» + دکمه‌ها
- [x] تأیید: هیچ Case/سند/آمار خصوصی در Landing نیست (`02.txt`)

**فایل‌ها:** `LandingPage.tsx`, layout عمومی (Navbar/Footer)

**خروجی:** Landing قابل demo مطابق mockup

---

## فاز F2 — Login / Register
**اولویت:** Medium | **برآورد:** 1–2 روز

- [x] UI Login: تب «ایمیل» / «موبایل» (mock)
- [x] فیلدها: شناسه + رمز + نمایش رمز
- [x] Remember me + لینک فراموشی رمز (toast نمایشی)
- [x] دکمه‌های Social: Google / LinkedIn / Microsoft → toast «نسخه نمایشی»
- [x] split-screen برند + فرم
- [x] Register جدا بماند؛ Login بدون تداخل ثبت‌نام
- [x] بعد از login: هدایت به Dashboard نقش (`getPostLoginRoute`)

**فایل‌ها:** `LoginPage.tsx`, `RegisterPage.tsx`

---

## فاز F3 — Customer Dashboard
**اولویت:** High | **برآورد:** 3–4 روز  
**منبع:** `02.txt` §۲ + عکس‌ها (داشبورد مشتری)

- [x] صفحه/layout اختصاصی مشتری (جدا از Expert/Admin)
- [x] ردیف KPI: پروژه‌های من، اسناد، جلسات، تسک‌ها، درخواست‌ها
- [x] Quick Actions بزرگ: ایجاد پروژه / آپلود مدرک / پیدا کردن متخصص
- [x] ویجت پروژه‌های اخیر + status badge
- [x] ویجت جلسات پیش‌رو (تاریخ، ساعت، نام متخصص، آواتار)
- [x] ویجت اعلان‌ها / فعالیت اخیر
- [x] (اختیاری) sparkline فعالیت ساده
- [x] داده فقط متعلق به کاربر mock فعلی

**فایل‌ها:** `CustomerDashboard.tsx` (جدید) یا refactor `DashboardPage.tsx`, `mock/sessions.ts`

---

## فاز F4 — Expert Dashboard
**اولویت:** High | **برآورد:** 3–4 روز  
**منبع:** `02.txt` §۳ + عکس‌ها

- [x] صفحه اختصاصی Expert
- [x] KPI: درخواست‌های جدید، پروژه‌های ارجاع‌شده، جلسات، امتیاز
- [x] لیست درخواست‌های جدید + دکمه «مشاهده / پاسخ»
- [x] جلسات امروز + دکمه «ورود به جلسه» (mock)
- [x] کارت درآمد ماهانه + درصد رشد (mock)
- [x] بخش نظرات / امتیاز با breakdown ستاره
- [x] ویجت تقویم کوچک یا لینک به `/app/calendar`
- [x] پروفایل تخصصی: لینک به تکمیل پروفایل / درصد تکمیل

**فایل‌ها:** `ExpertDashboard.tsx`, `mock/expertStats.ts`

---

## فاز F5 — Admin Control Center
**اولویت:** High | **برآورد:** 2–3 روز  
**منبع:** `02.txt` §۴ + عکس‌ها

- [x] صفحه Admin Control Center (نه فقط KPI عمومی)
- [x] KPI سراسری: کاربران، متخصصان، پروژه‌ها، اسناد، جلسات، (درآمد اختیاری)
- [x] نمودار خطی رشد/فعالیت
- [x] دونات توزیع وضعیت/دسته پروژه
- [x] System Health: سرور، DB، Storage، Email، File processing (mock OK/Alert)
- [x] فید آخرین فعالیت‌های سیستم
- [x] لیست کاربران جدید (mock)
- [x] لینک سریع به Monitoring / Audit / Organizations / Integrations

**فایل‌ها:** `AdminDashboard.tsx`, گسترش `mock/monitoring.ts`

---

## فاز F6 — Sidebar و ناوبری نقش‌محور
**اولویت:** High | **برآورد:** 2 روز  
**منبع:** منوهای `02.txt` + عکس‌ها

### Customer menu
- [x] خانه، پروژه‌های من، اسناد من، متخصصان، درخواست مشاوره، جلسات من، تسک‌ها، اعلان‌ها، گزارش‌ها، تنظیمات

### Expert menu
- [x] خانه، درخواست‌های جدید (badge)، پروژه‌های ارجاع‌شده، جلسات، تقویم، تسک‌ها، نظرات، درآمد، پروفایل

### Admin menu
- [x] خانه، کاربران، متخصصان، Tenants/سازمان‌ها، Workspaces، پروژه‌ها، اسناد، Permissions، Audit، System Events، Reports، Monitoring

- [x] مخفی‌کردن آیتم‌های نقش دیگر (نه فقط disable)
- [x] Route جدید در صورت نیاز: `/app/sessions` (لیست جلسات mock)
- [x] Dark navy sidebar مطابق mockup (اختیاری ولی توصیه‌شده برای تطبیق بصری)

**فایل‌ها:** `PlatformSidebar.tsx`, `permissions.ts`, `SessionsPage.tsx` (در صورت نیاز)

---

## فاز F7 — لیست پروژه و پروفایل متخصص (polish)
**اولویت:** Medium | **برآورد:** 2–3 روز

- [x] Case list: کارت‌ها با progress، تعداد سند/جلسه/تسک، فیلتر وضعیت، دکمه «پروژه جدید»
- [x] Case detail tabs نزدیک mockup: Overview / Tasks / Documents / Experts / Timeline (بدون حذف قابلیت‌های AI موجود)
- [x] Expert public profile: هدر با امتیاز، تخصص، CTA درخواست مشاوره / پیام
- [x] تب‌ها: درباره من، مهارت‌ها، نظرات
- [x] برچسب‌های تخصص (chips)

**فایل‌ها:** `CaseListView.tsx`, `CaseDetailView.tsx`, `ExpertsPage.tsx`

---

## فاز F8 — QA + Demo v5
**اولویت:** Critical | **برآورد:** 1–2 روز

### Demo script
- [x] مهمان: Landing → Register → Login
- [x] Customer: Dashboard → پروژه → سند → جلسه → متخصص
- [x] Expert: Dashboard → درخواست → جلسه → درآمد/نظرات
- [x] Admin: Control Center → Monitoring → Audit
- [x] RoleSwitcher: سه داشبورد کاملاً متفاوت دیده شود

### Regression
- [x] RTL + Dark + Mobile
- [x] هیچ داده نقش دیگر در Dashboard مشتری نیست
- [x] `npm run lint` / `npm run build` بدون error
- [x] ویژگی‌های v4 (Calendar, AI Chat, Draft Review, …) نشکسته باشند

### Done معیار
- [x] Landing عمومی بدون داده خصوصی
- [x] ۳ Dashboard نقش‌محور قابل demo
- [x] Login نزدیک mockup (تب موبایل + social UI)
- [x] Sessions روی داشبورد مشتری/متخصص
- [x] Admin Control Center یکپارچه
- [x] Backend هنوز شروع نشده

---

## خارج از Scope (v5)

| مورد | توضیح |
|------|--------|
| سخت‌افزار / سرور (`01.txt`) | سند جدا — ops |
| JWT / Multi-tenant واقعی | Backend بعدی |
| ویدیوکنفرانس واقعی جلسات | دکمه mock کافی |
| پرداخت درآمد واقعی متخصص | UI عدد mock |
| Social OAuth واقعی | toast نمایشی |

---

## برآورد

| فاز | مدت |
|-----|-----|
| F0 | 0.5–1 روز |
| F1 | 2–3 روز |
| F2 | 1–2 روز |
| F3 | 3–4 روز |
| F4 | 3–4 روز |
| F5 | 2–3 روز |
| F6 | 2 روز |
| F7 | 2–3 روز |
| F8 | 1–2 روز |
| **جمع** | **~2–3 هفته** |

---

## اسناد مرتبط

| سند | نقش |
|-----|-----|
| `todo-v4-frontend.md` | ✅ Sprint 2–5 UI |
| `todo-v5.md` | **این سند — تطبیق updates/05** |
| `roadmap-unified.md` | نقشه Sprint کلی |
| `updates/05/01.txt` | سخت‌افزار (خارج از فرانت) |

---

*بر اساس Gap Analysis updates/05 در برابر Frontend v4*
