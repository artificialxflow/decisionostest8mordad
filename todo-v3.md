# DecisionOS — todo-v3.md
## تکمیل ظاهر Frontend — تأیید کارفرما (بدون Backend)

**منابع:**
- `updates/03/3.txt` — دستور مستقیم کارفرما (اولویت ۱)
- `updates/03/2.txt` — یادداشت جلسه (محتوا، هلدینگ، SEO، upload)
- `updates/03/1.txt` — تحلیل فنی (Document Loop، RBAC UI، AI placeholder)
- `updates/02/1.txt` + `updates/02/photo_2026-08-14_03-42-17.jpg` — فلو ۱۶ مرحله‌ای (فقط UI)
- `todo-v2.md` — پایه Frontend ✅ (~90%)

**Scope:** فقط **Frontend** — mock data، بدون DB/API/JWT واقعی  
**هدف:** ظاهر کامل → تأیید کارفرما → بعداً Backend (Sprint جدا)  
**برآورد کل:** 3–4 هفته (۱ dev فرانت)  
**تاریخ:** ۱۴۰۵/۰۵/۲۷  
**وضعیت اجرا:** ✅ فاز ۰–۹ + **فاز ۱۰ (Polish کارفرما)** تکمیل شد

---

## فاز ۱۰ — Polish کارفرما (بازخورد نهایی)
**اولویت:** Critical | **منبع:** بازخورد کارفرما + `updates/03/2.txt`

### چک‌لیست
- [x] Request Wizard: مرحله «انتخاب دسته هلدینگ» قبل از خدمت (`HOLDING_SERVICE_CATEGORIES`)
- [x] فیلتر `MOCK_SERVICES` بر اساس دسته هلدینگ
- [x] هدر mock: نام tenant / «هلدینگ پارس امید» — برچسب «سقف هلدینگ» (نه «هلدینگ تجاری»)
- [x] Sidebar: حذف badge «به‌زودی» از صفحات UI کامل (قرارداد، گزارش، پشتیبانی، automation، billing، subscription)
- [x] Sidebar: badge «به‌زودی» فقط برای AI/OCR/Backend واقعی (چت AI)
- [x] صفحه چت AI: `FeaturePage` کامل با mock گفتگو
- [x] `DocumentLoopPanel` در `CaseDetailView` (overview + documents)
- [x] Notification mock «مدارک ناقص» برای customer (`usr-3`)
- [x] Upload zone (drag-drop) در تب documents پرونده

**خروجی:** ظاهر آماده ارائه مجدد به کارفرما

---

## وضعیت پایه

| لایه | todo-v2 | todo-v3 (هدف) |
|------|---------|----------------|
| Frontend UI پایه | ✅ ~90% | ✅ 100% + محتوا + demo |
| Role Demo Switcher | ❌ | ✅ Dropdown بالای Navbar |
| صفحات «به‌زودی» | 🟡 disabled | ✅ صفحات توضیحی — badge sidebar فقط AI/OCR |
| Document Loop UI | 🟡 جزئی | ✅ Workspace + **CaseDetailView** |
| Workflow | ❌ | ✅ صفحه توضیح (بدون engine) |
| Multi-tenant ظاهری | ❌ | ✅ سازمان + **فلو هلدینگ در Request Wizard** |
| Expert Marketplace | 🟡 پایه | ✅ فیلتر + پروفایل + حساب‌کتاب |
| AI Matching UI | ❌ | ✅ Placeholder ظاهری |
| محتوای عمومی | 🟡 | ✅ About, FAQ, Blog, Landing |
| Upload/Download UI | 🟡 | ✅ polish کامل (mock) |
| Backend / DB | ⏸️ freeze | **خارج از scope** |

---

## قوانین اجرا

```
✅ فقط Frontend — mockAuth + mockData
✅ AI/RAG/OCR → Coming Soon + توضیح (نه کد واقعی)
✅ Workflow → فقط مستندسازی UI (نه engine)
❌ SQLite / Postgres / JWT / API واقعی
❌ npm install بک‌اند (better-sqlite3, bcrypt, multer واقعی)
```

**منبع:** `updates/03/3.txt` — «فعلاً فقط رو فرانت… تا تایید بشه بعد بریم سراغ بک‌اند»

---

## ترتیب اجرا

```
[0] QA باقی‌مانده todo-v2
    ↓
[1] Role Demo Switcher (Navbar)
    ↓
[2] تکمیل صفحات «به‌زودی»
    ↓
[3] Document Loop UI
    ↓
[4] Workflow — صفحه توضیح
    ↓
[5] Expert Marketplace + Matching UI
    ↓
[6] Multi-tenant / هلدینگ (ظاهری)
    ↓
[7] محتوای عمومی + SEO
    ↓
[8] Upload/Download UI polish
    ↓
[9] QA نهایی + Demo flow
```

---

## فاز ۰ — QA پایه + Freeze
**اولویت:** Critical | **برآورد:** ۱–۲ روز  
**منبع:** `todo-v2` فاز K + `03/2.txt` (ظاهر قبل از Backend)

### چک‌لیست
- [x] تست دستی فلو Customer (login → request → workspace)
- [x] تست دستی فلو Manager (cases → assign → status)
- [x] RTL + Dark/Light همه صفحات
- [x] Responsive mobile/tablet
- [x] Permission هر نقش (UI فعلی با login)
- [x] Accessibility basics (focus, aria-labels)
- [x] Production build بدون fake stats (`LandingPage`)
- [x] Tag mental: `frontend-v3-start`

**خروجی:** baseline QA ثبت شده، لیست باگ UI

---

## فاز ۱ — Role Demo Switcher
**اولویت:** Critical | **برآورد:** ۲–۳ روز  
**منبع:** `updates/03/3.txt` — «منوی کشویی نقش‌ها… بریم تو صفحه اون نقش»

### هدف
بدون logout/login، کارفرما هر نقش را ببیند (حالت نمایشی).

### چک‌لیست
- [x] Dropdown در Navbar (یا AppHeader): Admin | Manager | Expert | Customer | Partner
- [x] با انتخاب نقش → `AuthContext` یا state demo نقش عوض شود
- [x] Sidebar فیلتر شود (مطابق `permissions.ts`)
- [x] Dashboard widgets نقش‌محور
- [x] Quick Actions نقش‌محور
- [x] Redirect پیش‌فرض هر نقش:
  - [x] Customer → `/app/services` یا `/app/request/new`
  - [x] Manager → `/app/dashboard`
  - [x] Expert → `/app/cases` (assigned)
  - [x] Admin → `/app/admin`
- [x] Badge «حالت نمایشی» — متمایز از login واقعی
- [x] Demo switch + login واقعی conflict نداشته باشد

### فایل‌های پیشنهادی
- `src/components/RoleSwitcher.tsx` (جدید)
- `src/context/AuthContext.tsx` — `setDemoRole()`
- `src/components/PlatformSidebar.tsx`
- `src/components/AppHeader.tsx` (یا Navbar موجود)

**خروجی:** کارفرما با یک کلیک UI هر ۵ نقش را می‌بیند

---

## فاز ۲ — تکمیل منوهای «به‌زودی»
**اولویت:** High | **برآورد:** ۳–۴ روز  
**منبع:** `updates/03/3.txt` + `03/2.txt` — «به‌زودی‌ها رو تکمیل کن… مشخص کن هر کدوم برای چه کاریه»

### هدف
هر Placeholder → صفحه با عنوان + توضیح ۲–۳ خط + Badge وضعیت + mock UI

### صفحات

| منو | Route پیشنهادی | محتوا |
|-----|----------------|-------|
| قراردادها | `/app/contracts` | مدیریت قرارداد، فلو آینده، mock list |
| گزارش‌ها | `/app/reports` | BI آینده — نمودار/جدول placeholder |
| اشتراک / صورتحساب | `/app/billing` | پلن‌ها، mock pricing |
| پشتیبانی | `/app/support` | فرم تیکت UI + FAQ لینک |
| CMS | `/app/admin/cms` | اسکلت ویرایش محتوا |
| چت AI | `/app/ai-chat` | Coming Soon + توضیح Sprint 3 |
| Automation | `/app/automation` | بخش اتوماسیون (از `03/2.txt`) |
| OCR | — | Badge در DocumentCenter |
| WhatsApp/SMS/Email | — | Badge در Notifications |

### چک‌لیست
- [x] Sidebar: آیتم‌های ناقص **قابل کلیک** (نه فقط disabled)
- [x] هر صفحه: `PageHeader` + توضیح هدف + badge (نسخه نمایشی / به‌زودی AI)
- [x] Mock data برای list/table (قراردادها، گزارش‌ها)
- [x] لینک متقابل: Support ↔ FAQ
- [x] Automation: توضیح NDST / پرسش‌وپاسخ (placeholder از جلسه)
- [x] چت AI: `FeaturePage` کامل (فاز ۱۰)
- [x] Sidebar: badge «به‌زودی» فقط AI/OCR — نه صفحات mock کامل (فاز ۱۰)

**خروجی:** هیچ منوی مرده بدون توضیح نماند

---

## فاز ۳ — Document Loop UI
**اولویت:** Critical | **برآورد:** ۴–۵ روز  
**منبع:** `updates/03/1.txt` (خط ۶۳–۸۴) + دیاگرام `02/photo`

### مفهوم (از پادکست)
نقص مدرک = **وضعیت ساختاری** پرونده (`waiting_docs`)، نه فقط notification.

### وضعیت‌های مدرک (UI)
- [x] `ready` — آماده ارسال
- [x] `incomplete` — ناقص
- [x] `needs_clarification` — نیاز به توضیح

### چک‌لیست UI (mock state)
- [x] Checklist: `requiredDocuments` (از service) vs uploaded
- [x] Progress bar درصد تکمیل مدارک
- [x] Badge زرد «مدارک ناقص» در CaseList + Workspace
- [x] Manager/Expert panel:
  - [x] «تأیید کامل بودن مدارک»
  - [x] «درخواست تکمیل» + لیست موارد ناقص + یادداشت
- [x] Customer panel:
  - [x] بنر هشدار + CTA «ارسال مجدد»
  - [x] Case status → `waiting_docs` (mock)
- [x] Status bar ۸ مرحله‌ای در Workspace (از دیاگرام)
- [x] Timeline mock event: «مدارک ناقص اعلام شد»
- [x] Notification mock: «لطفاً مدارک را تکمیل کنید» (customer / case-101)
- [x] `DocumentLoopPanel` در `CaseDetailView` (فاز ۱۰)

### فایل‌ها
- `src/components/DocumentLoopPanel.tsx` (جدید)
- `src/components/DocumentCenterView.tsx`
- `src/pages/WorkspacePage.tsx`
- `src/components/CaseDetailView.tsx` (فاز ۱۰)
- `src/lib/mock/index.ts` — state نمونه waiting_docs

**خروجی:** فلو بصری Document Loop قابل demo (بدون API)

---

## فاز ۴ — Workflow (فقط توضیح)
**اولویت:** Medium | **برآورد:** ۱–۲ روز  
**منبع:** `updates/03/3.txt` — «اصلاً نمی‌خوام ورک‌فلو طراحی کنی… توضیح بده چه ورک‌فلویی به درد می‌خوره»

### هدف
صفحه مستندات — **بدون workflow engine**

### Workflowهای پیشنهادی (محتوا)

| # | Workflow | شرح |
|---|----------|-----|
| 1 | ثبت درخواست → پرونده | Customer submit → Manager notify |
| 2 | بررسی مدارک (Document Loop) | Manager review → Customer re-upload |
| 3 | تخصیص Expert | Manager assign → Expert notify |
| 4 | اجرای کار | Expert tasks → status in_progress |
| 5 | QC | Manager quality_control gate |
| 6 | تکمیل / بایگانی | completed → archived |
| 7 | ارجاع متخصص خارجی | Customer → Expert marketplace |
| 8 | لغo | cancelled با audit |

### چک‌لیست
- [x] Route: `/app/workflows` یا `/app/admin/workflows`
- [x] کارت/جدول هر workflow + نقش‌های درگیر
- [x] Diagram ساده (Mermaid یا ASCII در UI)
- [x] Badge: «طراحی engine در Sprint Backend»
- [x] لینک به Document Loop (فاز ۳)
- [x] Sidebar item برای Admin/Manager

**خروجی:** کارفرما می‌داند چه workflowهایی تعریف می‌شود — بدون پیاده‌سازی

---

## فاز ۵ — Expert Marketplace + Matching
**اولویت:** High | **برآورد:** ۱ هفته  
**منبع:** `updates/03/3.txt` + `03/2.txt`

### ۵-۱ دایرکتوری متخصصین
- [x] `/app/experts` — گسترش صفحه موجود
- [x] فیلتر: شهر + تخصص (حقوقی، مالی، بیمه، …)
- [x] کارت expert: نام، تخصص، شهر، rating mock، وضعیت (available/busy)
- [x] صفحه پروفایل: `/app/experts/:id`
  - [x] رزومه / bio
  - [x] سوابق کاری (mock)
  - [x] نرخ مشاوره (mock)
  - [x] پرونده‌های فعال (mock count)

### ۵-۲ حساب‌کتاب متخصص (UI)
- [x] تب Invoices — لیست mock
- [x] تب Earnings — خلاصه درآمد
- [x] تب Payouts — وضعیت پرداخت
- [x] فقط Expert/Admin ببیند (permission)

### ۵-۳ ارجاع مشتری + AI Matching (ظاهری)
- [x] در Request Wizard یا Case: «پیشنهاد متخصص»
- [x] UI تحلیل AI (placeholder):
  - [x] «بر اساس نوع پرونده و شهر، این متخصصین پیشنهاد می‌شوند»
  - [x] Skeleton loading + نتیجه mock
  - [x] Badge: «تحلیل هوشمند — به‌زودی»
- [x] دکمه «ارجاع به متخصص» → modal انتخاب

### Mock data
- [x] `src/lib/mock/experts.ts` — ۱۰–۱۵ expert با city/specialty
- [x] شهرها: تهران، اصفهان، مشهد، …
- [x] تخصص‌ها: حقوق تجاری، خانواده، مالیاتی، …

**خروجی:** marketplace ظاهری + matching demo

---

## فاز ۶ — Multi-tenant / هلدینگ (ظاهری)
**اولویت:** Medium | **برآورد:** ۳–۴ روز  
**منبع:** `updates/03/3.txt` + `03/2.txt` (خط ۳–۴، ۸–۱۰)

### مفهوم (از جلسه)
- مشترک **اپ** می‌گیرد، Landing جداست (مگر کل سایت)
- هلدینگ = سقف چند شرکت/دسته خدمات
- دسته‌بندی: حقوق، بیمه، حسابداری، قرارداد، …

### چک‌لیست
- [x] صفحه «سازمان‌ها» `/app/settings/organizations` یا `/app/admin/tenants`
- [x] Mock: «هلدینگ X» → workspace «شرکت A» / «شرکت B»
- [x] Organization switcher (UI) در Settings
- [x] توضیح: «چطور شرکت دیگر دسترسی می‌گیرد» (invite mock)
- [x] Service catalog: گروه‌بندی زیر سقف هلدینگ
- [x] **Request Wizard:** مرحله انتخاب دسته هلدینگ → فیلتر خدمات (فاز ۱۰)
- [x] Landing vs App: callout در About/Settings
- [x] برچسب «فقط UI — Backend بعداً»

**خروجی:** کارفرما مفهوم multi-tenant را می‌بیند

---

## فاز ۷ — محتوای عمومی + SEO
**اولویت:** High | **برآورد:** ۱ هفته  
**منبع:** `updates/03/2.txt` (خط ۳–۵)

### About / FAQ
- [x] `AboutPage` — غنی‌تر (داستان، ماموریت، تیم placeholder)
- [x] `FAQPage` — دسته‌بندی: ثبت‌نام، پرونده، پرداخت، …
- [x] فایل محتوا: `src/content/faq.json` + `about.json` (ویرایش آسان)

### Blog / News (SEO)
- [x] `/blog` — لیست ۳–۵ مقاله mock
- [x] `/blog/:slug` — صفحه مقاله
- [x] meta title/description برای SEO
- [x] Landing: ستون «اخبار / جملات الهام‌بخش» (از جلسه)

### Landing polish
- [x] CTA واضح: «ثبت درخواست» vs «ورود»
- [x] بخش خدمات هلدینگ (دسته‌بندی)
- [x] Contact form — UI تأیید (mock submit)
- [x] Testimonials — فقط dev یا حذف در production

### Support flow (عمومی vs workspace)
- [x] FAQ عمومی → Landing
- [x] تیکت داخل workspace → `/app/support` (فاز ۲)

**خروجی:** سایت برای Google و کارفرما محتوای کافی دارد

---

## فاز ۸ — Upload / Download UI
**اولویت:** High | **برآورد:** ۲–۳ روز  
**منبع:** `updates/03/2.txt` (خط ۸) — «آپلود نداره… دانلود هم…»

### چک‌لیست
- [x] `DocumentCenterView`: drag-drop + progress bar (mock)
- [x] Preview فایل (PDF/image placeholder)
- [x] دکمه Download روی هر سند (mock blob / toast)
- [x] Request Wizard step: upload + preview
- [x] Case detail tab documents: upload zone (drag-drop — فاز ۱۰)
- [x] Workspace documents tab: sync با mock list
- [x] Toast: «فایل ذخیره شد (نمایشی)»
- [x] Empty state: «هنوز مدرکی آپلود نشده»

**خروجی:** UX آپلود/دانلود کامل — بدون persist واقعی

---

## فاز ۹ — QA نهایی + Demo Flow
**اولویت:** Critical | **برآورد:** ۳–۴ روز  
**منبع:** همه `updates/03/*`

### Demo Script (برای کارفرما)

**۱. Role Switcher**
- [x] Admin → Manager → Expert → Customer → Partner (هر کدام sidebar متفاوت)

**۲. Customer Journey**
- [x] Landing → ثبت‌نام/login → **دسته هلدینگ** → انتخاب خدمت → wizard → upload → workspace
- [x] Document Loop: بنر ناقص → re-upload mock (Workspace + CaseDetail)

**۳. Manager Journey**
- [x] Dashboard stats → case list → document review → assign expert

**۴. Expert Journey**
- [x] Cases assigned → tasks → profile/earnings tab

**۵. Placeholder Pages**
- [x] صفحات mock کامل — badge sidebar فقط برای AI/OCR واقعی

**۶. Public Site**
- [x] About, FAQ, Blog, Contact

### Regression
- [x] Role switcher × login واقعی
- [x] RTL + Dark + Mobile
- [x] هیچ AI فعال به نظر نرسد
- [x] `npm run build` / `vite build` بدون error (tsc ممکن است warning/error قدیمی mockData داشته باشد)
- [x] Demo credentials در README/dev banner

**خروجی:** آماده ارائه و تأیید ظاهر

---

## خارج از Scope (فعلاً — فقط Placeholder)

طبق `updates/03/1.txt` و `updates/02/1.txt`:

| قابلیت | اقدام Frontend |
|--------|----------------|
| AI Agent / RAG واقعی | `features.ts` → coming_soon + صفحه توضیح |
| Vector Database | — |
| OCR واقعی | Badge به‌زودی |
| Workflow engine | فقط صفحه توضیح (فاز ۴) |
| Database / Postgres | ⏸️ Sprint Backend |
| JWT / API واقعی | ⏸️ Sprint Backend |
| Audit append-only DB | UI mock در todo-v2 |
| WhatsApp / SMS / Email | Badge + type در notification |
| BI کامل | Reports placeholder |
| Native App | — |

---

## وابستگی به todo-v2

| todo-v2 (انجام‌شده) | todo-v3 (تکمیل) |
|---------------------|-----------------|
| Auth UI + ProtectedRoute | + Role Demo Switcher |
| Services + Request Wizard | + Upload polish |
| Case + Workspace tabs | + Document Loop UI |
| Experts page پایه | + Marketplace کامل |
| Dashboard mock | + role-based با switcher |
| Placeholder badges | + صفحات توضیحی کامل |
| Landing پایه | + Blog, FAQ, About |

---

## فایل‌های پیشنهادی (جدید)

```
src/
  components/
    RoleSwitcher.tsx
    DocumentLoopPanel.tsx
    ExpertCard.tsx
    ExpertMatchingPanel.tsx
    OrganizationSwitcher.tsx
  pages/
    ContractsPage.tsx
    ReportsPage.tsx
    BillingPage.tsx
    SupportPage.tsx
    WorkflowsDocPage.tsx
    ExpertProfilePage.tsx
    OrganizationsPage.tsx
    blog/
      BlogListPage.tsx
      BlogPostPage.tsx
  content/
    faq.json
    about.json
    blog-posts.json
  lib/mock/
    experts.ts          (گسترش)
    documentLoop.ts     (state نمونه)
    organizations.ts
```

---

## برآورد زمانی

| فاز | مدت |
|-----|-----|
| ۰ QA پایه | ۱–۲ روز |
| ۱ Role Switcher | ۲–۳ روز |
| ۲ صفحات به‌زودی | ۳–۴ روز |
| ۳ Document Loop UI | ۴–۵ روز |
| ۴ Workflow توضیح | ۱–۲ روز |
| ۵ Expert Marketplace | ۱ هفته |
| ۶ Multi-tenant UI | ۳–۴ روز |
| ۷ محتوا + SEO | ۱ هفته |
| ۸ Upload/Download | ۲–۳ روز |
| ۹ QA + Demo | ۳–۴ روز |
| **جمع** | **~3–4 هفته** |

---

## معیار Done (Frontend v3)

- [x] کارفرما با Role Switcher هر ۵ نقش را بدون login ببیند
- [x] صفحات mock کامل بدون badge «به‌زودی» در sidebar (به جز AI/OCR)
- [x] Document Loop بصری demo شود (checklist + waiting_docs + CaseDetail)
- [x] فلو Request Wizard: دسته هلدینگ → خدمت فیلترشده
- [x] صفحه Workflow فقط توضیح — بدون engine
- [x] Expert directory + profile + earnings UI
- [x] AI matching فقط placeholder
- [x] Multi-tenant concept قابل فهم
- [x] About / FAQ / Blog / Landing غنی
- [x] Upload/Download UX کامل (mock)
- [x] Build موفق + demo script اجرا شده
- [x] **Backend شروع نشده**

---

## Sprint بعدی (جدا از این فایل)

**Frontend v4 (بدون Backend):** [`todo-v4-frontend.md`](todo-v4-frontend.md) — تکمیل UI Sprint 2–5

**Backend (بعد از تأیید UI):** **`todo-v4-backend.md`** — موارد زیر برنامه‌ریزی می‌شود:

- Database + Migration + Seed
- JWT Auth + RBAC Backend
- Request → Case → Workspace transaction
- Document storage + Document Loop API
- Notification pipeline
- Audit append-only
- Wire frontend به API واقعی

---

## شروع فوری — وضعیت

1. ~~فاز ۰–۹~~ — پایه Frontend
2. ~~فاز ۱۰~~ — Polish کارفرما (هلدینگ در wizard، sidebar، CaseDetail، Chat AI)
3. **بعد از تأیید کارفرما** → `todo-v4-backend.md`
