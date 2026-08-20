# DecisionOS — roadmap-unified.md
## نقشه راه یکپارچه (از صفر تا صد)

**منابع:**
- `updates/04/-5775945008795029418_121.jpg` — نقشه راه کامل (Master)
- `updates/04/-5775945008795029420_121.jpg` — Sprint 2: هسته عملیاتی
- `updates/04/-5775945008795029417_121.jpg` — Sprint 3 (جزئیات): عملیاتی و ارتباطات
- `updates/04/-5775945008795029416_121.jpg` — Sprint 4 (جزئیات): یکپارچه‌سازی و آماده‌سازی AI
- `updates/04/-5775945008795029419_121.jpg` — Sprint 5 (جزئیات): AI/RAG و اتوماسیون پیشرفته
- `updates/02/1.txt` — معیار قطعی Sprint 2 Backend
- `todo-v2.md` — Frontend Sprint 1+2 ✅
- `todo-v3.md` — Frontend Polish ✅ (فاز ۰–۱۰)

**تاریخ:** ۱۴۰۵/۰۵/۳۰  
**وضعیت پروژه:** Frontend آماده demo — Backend واقعی شروع نشده

---

## ۱. هدف کلی پلتفرم

> پلتفرم یکپارچه مدیریت تخصصی — اتصال مشتری و کارشناس — ارائه خدمات باکیفیت با شفافیت، ردیابی و آمادگی برای هوشمندسازی.

**فلو کسب‌وکار:**

```
نیاز مشتری → ثبت درخواست → ایجاد پرونده → مدیریت مدارک
→ تخصیص کارشناس → ارائه خدمت → QC → تحویل نتیجه → رضایت → درآمد
```

---

## ۲. تناقض شماره‌گذاری — و مدل یکپارچه

در `updates/04` دو مدل شماره‌گذاری وجود دارد. **این سند از نقشه Master (9418) به‌عنوان مرجع استفاده می‌کند** و تصاویر جزئی را به آن نگاشت می‌دهد.

| موضوع | Master (9418) | تصویر جزئی | توضیح |
|--------|---------------|------------|--------|
| UI/UX + RBAC پایه | **Sprint 1** | — | `todo-v1/v2` |
| Backend + Core Flow | **Sprint 2** | `9420` | هسته عملیاتی |
| تکمیل عملیاتی + مالی + اتوماسیون | **Sprint 3** | `9417` | پرونده، Task، Report، Calendar |
| یکپارچه‌سازی + BI + PWA | **Sprint 4** | `9416` | API، Automation، Monitoring، AI prep |
| AI/RAG + OCR + Agent | **Sprint 5** | `9419` | ⚠️ در 9419 عنوان «Sprint 3» آمده — محتوا = Sprint 5 |

**قانون:** AI/RAG/OCR/Vector DB **همیشه Sprint 5** — تا Sprint 2 Backend و Sprint 4 زیرساخت پایدار نشود، وارد Sprint 5 نشوید.

---

## ۳. نقش‌ها و وضعیت‌ها (مشترک همه Sprintها)

### نقش‌های اصلی

| نقش | وظایف |
|-----|--------|
| **Admin / Manager** | مدیریت سیستم، خدمات، کارشناسان، گزارش، QC |
| **Expert** | اجرای وظایف، بررسی مدارک، به‌روزرسانی وضعیت |
| **Customer** | ثبت درخواست، ارسال مدارک، پیگیری، دریافت نتیجه |
| **Partner** | همکاری در خدمات خاص (اختیاری) |
| **AI Agent** | تحلیل، پیشنهاد، Draft — **فقط Sprint 5** |

### وضعیت‌های پرونده (Workflow)

| کلید | برچسب | رنگ |
|------|--------|-----|
| `new` | جدید | خاکستری |
| `waiting_docs` | در انتظار مدارک | زرد |
| `under_review` | در حال بررسی | آبی |
| `in_progress` | در حال اجرا | فیروزه‌ای |
| `waiting_customer` | در انتظار مشتری | نارنجی |
| `quality_control` | کنترل کیفیت | بنفش |
| `completed` | تکمیل‌شده | سبز |
| `archived` / `cancelled` | بایگانی / لغو | قرمز |

**Sprint 5 اضافه:** `ai_analyzing` — در حال تحلیل AI

### وضعیت‌های مدرک (Document Loop)

| وضعیت | معنی |
|--------|------|
| `ready` | آماده ارسال |
| `incomplete` | ناقص |
| `needs_clarification` | نیاز به توضیح |

### Event Flow (فنی)

```
عملیات کاربر → بررسی مجوز (RBAC) → اجرای عملیات → Audit Log → ذخیره DB → (Notification)
```

---

## ۴. نقشه ۵ Sprint — خلاصه

```
Sprint 1 ──► Sprint 2 ──► Sprint 3 ──► Sprint 4 ──► Sprint 5
 UI/RBAC      Backend       عملیاتی      یکپارچه       AI/RAG
   ✅           ❌            ❌            ❌            🟡 UI
```

| Sprint | عنوان | هدف | برآورد |
|--------|--------|-----|--------|
| **1** | زیرساخت و هسته | UI/UX، RBAC UI، Layout، Routing | ✅ انجام شد |
| **2** | هسته عملیاتی | DB، API، Auth، Request→Case→Workspace | 6–8 هفته |
| **3** | تکمیل عملیاتی | Task، Calendar، Report، مالی، اتوماسیون اولیه | 6–8 هفته |
| **4** | یکپارچه‌سازی و تحلیل | Automation پیشرفته، Monitoring، BI، PWA، AI prep | 8 هفته |
| **5** | هوشمندسازی | RAG، Agent، OCR، Draft، Human-in-the-loop | 8+ هفته |

---

## ۵. Sprint 1 — زیرساخت و هسته

**منبع:** `updates/01/*`, `todo-v2.md`, `todo-v3.md`

### Scope

- تحلیل نیاز، طراحی UI/UX
- React + Vite + Tailwind + RTL
- Layout: Landing، Platform، Sidebar، Navbar
- Routing + ProtectedRoute
- RBAC **Frontend** (`permissions.ts`, `AuthContext`)
- Role Demo Switcher
- Empty states، Placeholder pages
- محتوای عمومی: About، FAQ، Blog، Landing

### معیار پایان

- [x] کاربر پس از login وارد **محیط کاری** شود (نه سایت معرفی)
- [x] ۵ نقش با sidebar و dashboard متفاوت
- [x] Production build بدون fake stats
- [x] Demo flow کامل برای کارفرما

### Gap

| مورد | UI | Backend |
|------|-----|---------|
| Auth واقعی | 🟡 Login UI | ❌ JWT/Session |
| RBAC | ✅ UI guard | ❌ Server-side |
| Dashboard | ✅ mock | ❌ DB |

**وضعیت:** ✅ **تکمیل (Frontend)**

---

## ۶. Sprint 2 — هسته عملیاتی

**منبع:** `9420`, `updates/02/1.txt`

### ۱۶ مرحله اجرایی

1. Freeze Sprint 1
2. **زیرساخت Backend** — DB، API `/api/v1/*`، Identity، RBAC، امنیت
3. **مدیریت خدمات** — CRUD + مدارک موردنیاز
4. **ثبت درخواست** — Wizard → submit
5. **ایجاد پرونده** — Case ID یکتا
6. **Workspace** — Overview، Documents، Tasks، Timeline
7. **مدیریت مدارک** — Upload، Preview، Download + **Document Loop**
8. **تخصیص کارشناس**
9. **ایجاد Task**
10. **Workflow** — تغییر وضعیت استاندارد
11. **Timeline & Audit Log**
12. **Notifications**
13. **Search & Filter**
14. **Dashboard & Reports** (پایه — از DB)
15. **QA** — عملکرد، RBAC، امنیت
16. **Deploy Sprint 2**

### Decision Point (مرحله ۷)

```
مدارک کامل است؟
├─ خیر → waiting_docs + notification → مشتری تکمیل کند
└─ بله → تخصیص کارشناس
```

### API Modules (الزامی)

```
/api/v1/auth
/api/v1/users
/api/v1/services
/api/v1/requests
/api/v1/cases
/api/v1/workspaces
/api/v1/documents
/api/v1/tasks
/api/v1/notifications
/api/v1/audit-logs
```

**اصول:** Authentication، Authorization، Validation، Error Handling، Logging، Rate Limiting

### معیار قطعی پایان (`updates/02/1.txt`)

**Customer:**
```
ثبت‌نام → ورود → انتخاب خدمت → درخواست → آپلود → پرونده → Workspace → وضعیت
```

**Manager:**
```
مشاهده درخواست → مدیریت پرونده → تعیین کارشناس → تغییر وضعیت → فعالیت‌ها
```

**+** RBAC، Audit، Notification، Search، **ذخیره واقعی** — بدون fake data در production.

### خارج از Scope

AI Agent، RAG، Vector DB، OCR پیشرفته، تحلیل خودکار، WhatsApp، BI کامل، Native App

### Gap Analysis

| قابلیت | UI (todo-v2/v3) | Backend | فایل/مسیر مرتبط |
|--------|-----------------|---------|------------------|
| Login/Register | ✅ | ❌ | `LoginPage`, `mockAuth` |
| Service Catalog | ✅ Admin UI | ❌ persist | `ServicesAdminPage` |
| Request Wizard | ✅ | ❌ API | `RequestWizardPage` |
| Case CRUD | ✅ | 🟡 in-memory | `server.ts`, `CaseListView` |
| Workspace | ✅ tabs | 🟡 mock | `WorkspacePage` |
| Documents upload | ✅ drag-drop | ❌ file storage | `DocumentCenterView` |
| Document Loop | ✅ UI | ❌ state machine | `DocumentLoopPanel` |
| Expert assign | ✅ UI | ❌ | `CaseDetailView` |
| Tasks | ✅ UI | ❌ | `WorkspacePage` |
| Workflow status | ✅ UI change | ❌ engine | `WorkflowsDocPage` (فقط doc) |
| Timeline | ✅ mock | ❌ append-only | `TimelineEvent` |
| Audit Log | ✅ UI | 🟡 memory | `server.ts` logAudit |
| Notifications | ✅ mock | ❌ pipeline | `PlatformPages` |
| Search | ✅ GlobalSearch | ❌ indexed | `GlobalSearch.tsx` |
| Dashboard | ✅ mock charts | ❌ DB query | Dashboard pages |
| JWT/RBAC server | — | ❌ placeholder | `server.ts` Bearer stub |
| Database | — | ❌ | `better-sqlite3` در package ولی unused |

**وضعیت:** 🟡 UI ✅ — Backend ❌ **← اولویت بعد از تأیید کارفرما**

### ترتیب اجرای پیشنهادی (Backend)

```
Database + Migration + Seed
    ↓
JWT Auth + RBAC middleware
    ↓
Services + Requests
    ↓
Case + Workspace (atomic transaction)
    ↓
Documents (storage + Document Loop API)
    ↓
Expert + Tasks
    ↓
Workflow status + Timeline
    ↓
Notifications + Audit
    ↓
Dashboard + Search (real queries)
    ↓
Security hardening + QA + Deploy
```

**→ جزئیات اجرایی:** `todo-v4-backend.md` (بعداً)

---

## ۷. Sprint 3 — تکمیل و بهینه‌سازی عملیاتی

**منبع:** Master 9418 + جزئیات `9417`

### ۱۴ قابلیت (9417)

1. مدیریت پرونده و دسته‌بندی پیشرفته
2. Task / Sub-task
3. تقویم و زمان‌بندی
4. ارتباطات داخلی (یادداشت، کامنت، ایمیل درون‌پرونده)
5. Timeline فعالیت
6. اعلان پیشرفته
7. گزارش عملیاتی و مدیریتی
8. جستجو و فیلتر پیشرفته
9. یادداشت و یادآور
10. Versioning مدارک
11. داشبورد تحلیلی
12. رضایت مشتری (Rating/Feedback)
13. اتوماسیون اولیه
14. RBAC پیشرفته (granular)

**+ Master 9418:** مدیریت مالی (صورتحساب، تسویه)، یکپارچه‌سازی SMS/API

### فلو ۱۵ مرحله‌ای (9417)

```
Login → Dashboard → پرونده → وضعیت → Task → Calendar → Comms → Update
    → [مدارک کامل?] → Timeline → Notify → QC → Report → Satisfaction → Archive
```

### Gap Analysis

| قابلیت | UI | Backend |
|--------|-----|---------|
| Task/Sub-task | 🟡 پایه | ❌ |
| Calendar | ❌ | ❌ |
| In-case messaging | 🟡 notes mock | ❌ |
| Advanced reports | 🟡 placeholder | ❌ |
| Document versioning | ❌ | ❌ |
| Customer satisfaction | ❌ | ❌ |
| Billing/Invoices | 🟡 mock UI | ❌ |
| Process automation | 🟡 صفحه توضیح | ❌ |

**وضعیت:** ❌ — **وابسته به Sprint 2**

---

## ۸. Sprint 4 — یکپارچه‌سازی، اتوماسیون و آماده‌سازی AI

**منبع:** Master 9418 (BI/PWA) + جزئیات `9416`

### ۱۲ کار (9416)

1. تحلیل و بهینه‌سازی
2. بهینه‌سازی Workflow (قوانین انتقال، مسیر بازگشت)
3. یکپارچه‌سازی API (REST/GraphQL)
4. مدیریت داده و ایندکس
5. امنیت و RBAC granular
6. اتوماسیون پیشرفته (Trigger، Cron)
7. اعلان چندکاناله
8. گزارش و KPI + Export
9. یکپارچه‌سازی سرویس‌های خارجی
10. **آماده‌سازی داده برای AI** (پاک‌سازی، برچسب، ساختار)
11. Monitoring & Logging مرکزی
12. تست نهایی + Deploy

**+ Master 9418:** BI Dashboard، هشدار پیش‌بینی، امتیازدهی، ML پایه، PWA

### خروجی برای Sprint 5

- داده ساختاریافته
- API پایدار
- Monitoring فعال
- قوانین سیستمی
- **آمادگی AI — نه خود AI**

### خارج از Scope (9416)

AI Agent، RAG، OCR، Vector DB، WhatsApp Automation، Native App

### Gap Analysis

| قابلیت | وضعیت |
|--------|--------|
| Workflow engine | ❌ |
| Job scheduler | ❌ |
| External API integrations | ❌ |
| Centralized monitoring | ❌ |
| BI / KPI dashboards | 🟡 UI placeholder |
| PWA | ❌ |
| AI data pipeline | ❌ |

**وضعیت:** ❌ — **وابسته به Sprint 2+3**

**تایم‌لاین پیشنهادی (9416):** ۸ هفته

---

## ۹. Sprint 5 — AI/RAG و اتوماسیون پیشرفته

**منبع:** Master 9418 + جزئیات `9419`

### ۱۵ مرحله (9419)

1. Freeze Sprint 4
2. تقویت زیرساخت (Cache، Queue، Scaling)
3. **AI Engine + RAG Pipeline** (LLM، Embedding، Vector DB)
4. **مدیریت دانش حقوقی** → Vector DB
5. **AI Agent** (تحلیل، تحقیق، Draft)
6. **تحلیل هوشمند پرونده**
7. **تولید Draft** (دادخواست، قرارداد، نامه)
8. **بازبینی کارشناس** (Human-in-the-loop)
9. **QC نهایی**
10. ارسال خودکار (Email/SMS/WhatsApp)
11. Workflow Automation + SLA
12. اعلان هوشمند
13. جستجوی معنایی + KPI
14. داشبورد Real-time
15. UAT + Penetration test + Deploy

### اصول (9419)

- AI پیشنهاد می‌دهد — **انسان تأیید می‌کند**
- امنیت و محرمانگی مدارک
- مقیاس‌پذیری

### وضعیت‌های AI

| پرونده | تحلیل مدرک |
|--------|-------------|
| `ai_analyzing` | `analysis_complete` |
| `waiting_expert` | `analysis_incomplete` |
| `waiting_approval` | `needs_clarification` |
| | `mismatch` |

### Gap Analysis

| قابلیت | UI | Backend |
|--------|-----|---------|
| AI Chat | 🟡 mock | 🟡 Gemini stub در `server.ts` |
| RAG Pipeline | ❌ | ❌ |
| Vector DB | ❌ | ❌ |
| OCR | 🟡 badge | ❌ |
| AI Agent role | ❌ | ❌ |
| Smart draft | ❌ | ❌ |
| Semantic search | ❌ | ❌ |

**وضعیت:** 🟡 UI placeholder — **عمداً خارج از scope تا Sprint 4**

---

## ۱۰. ماتریس Gap — نمای کلی

| لایه | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 |
|------|----------|----------|----------|----------|----------|
| **Frontend UI** | ✅ | ✅ | 🟡 | 🟡 | 🟡 |
| **Backend API** | — | ❌ | ❌ | ❌ | ❌ |
| **Database** | — | ❌ | ❌ | ❌ | ❌ |
| **Auth/RBAC real** | — | ❌ | ❌ | 🟡 | 🟡 |
| **Workflow Engine** | — | ❌ | 🟡 | ✅ هدف | ✅ |
| **Document Loop** | UI ✅ | ❌ | ✅ هدف | ✅ | ✅ |
| **Automation** | — | ❌ | 🟡 اولیه | ✅ پیشرفته | ✅ AI |
| **AI/RAG** | — | ⛔ | ⛔ | prep only | ✅ |

**Legend:** ✅ انجام/هدف | 🟡 جزئی/placeholder | ❌ نشده | ⛔ خارج از scope

---

## ۱۱. خارج از Scope — تجمیع

| قابلیت | Sprint مجاز |
|--------|-------------|
| UI/UX پایه | 1 |
| Backend MVP | 2 |
| Task، Calendar، Report، Billing | 3 |
| Automation، Monitoring، BI، PWA | 4 |
| AI Agent، RAG، OCR، Vector DB | **5 فقط** |
| WhatsApp Automation | 4–5 |
| Native Mobile App | بعد از 5 |
| Voice AI | بعد از 5 |

---

## ۱۲. وضعیت فعلی پروژه (۱۴۰۵/۰۵/۳۰)

### انجام شده

- ✅ Sprint 1 Frontend کامل (`todo-v2`, `todo-v3`)
- ✅ Demo ۵ نقش + Document Loop UI + Expert Marketplace UI
- ✅ محتوای عمومی + SEO + Multi-tenant ظاهری
- ✅ `server.ts` با `/api/v1/*` — **in-memory mock** (نه production backend)

### انجام نشده (بحرانی)

- ❌ Database + Migration
- ❌ JWT + RBAC server-side
- ❌ Persist فایل و پرونده
- ❌ Workflow engine
- ❌ Notification pipeline واقعی
- ❌ AI/RAG (طبق plan — درست است)

### مسیر بعدی

```
1. تأیید کارفرما روی UI (todo-v3 ✅)
       ↓
2. todo-v4-backend.md — Sprint 2 Backend
       ↓
3. Sprint 3 عملیاتی
       ↓
4. Sprint 4 یکپارچه‌سازی
       ↓
5. Sprint 5 AI/RAG
```

---

## ۱۳. نگاشت تصاویر updates/04

| فایل | عنوان در تصویر | Sprint یکپارچه |
|------|----------------|----------------|
| `9418` | نقشه راه کامل ۰–۱۰۰ | **Master — همه** |
| `9420` | Sprint 2 — هسته عملیاتی | **Sprint 2** |
| `9417` | Sprint 3 — فلو عملیاتی | **Sprint 3** |
| `9416` | Sprint 4 — یکپارچه‌سازی | **Sprint 4** |
| `9419` | هوشمندسازی AI/RAG | **Sprint 5** (⚠️ برچسب Sprint 3 در تصویر) |

---

## ۱۴. اسناد مرتبط

| سند | نقش |
|-----|-----|
| `todo-v2.md` | ✅ Frontend Sprint 1+2 — آرشیو |
| `todo-v3.md` | ✅ Frontend Polish — آرشیو |
| `roadmap-unified.md` | **این سند — مرجع کل** |
| `todo-v4-frontend.md` | 🔜 تکمیل UI Sprint 2–5 (بدون Backend) |
| `todo-v4-backend.md` | 🔜 Sprint 2 Backend — بعد از تأیید UI |

---

## ۱۵. چک‌لیست تصمیم‌گیری برای کارفرما

قبل از شروع Backend، تأیید کنید:

- [ ] UI فعلی (`todo-v3`) مورد تأیید است
- [ ] ترتیب Sprint 2 → 3 → 4 → 5 پذیرفته می‌شود
- [ ] AI/RAG تا Sprint 5 به تعویق می‌افتد
- [ ] Database: SQLite dev / Postgres prod (یا یکی انتخاب شود)
- [ ] Hosting و Deploy Sprint 2 مشخص است

---

*آخرین به‌روزرسانی: ۱۴۰۵/۰۵/۳۰ — بر اساس بررسی ۵ تصویر `updates/04` و وضعیت `todo-v2/v3`*
