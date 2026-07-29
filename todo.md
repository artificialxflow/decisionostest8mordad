# DecisionOS — Sprint 1 Checklist

منبع: `updates/01/1.txt`  
هدف: تبدیل پروتوتایپ فعلی از «سایت/ابزار پرونده» به پایهٔ یک **پلتفرم کاری** قابل توسعه.

**برآورد کلی:** ۳–۴ هفته (یک نفر تمام‌وقت)  
**وضعیت اجرا:** فاز ۰ تا ۵ اسکلت‌بندی و پیاده‌سازی اولیه انجام شد (۲۰۲۶-۰۷-۲۹)

---

## ترتیب اجرا

```
فاز ۰ → فاز ۱ → فاز ۲ → فاز ۳ → فاز ۴ → فاز ۵
         └─ Placeholderها موازی با فاز ۱–۳
```

---

## فاز ۰ — تثبیت معماری
**اولویت:** Critical | **برآورد:** ۲–۳ روز  
قبل از افزودن UI جدید انجام شود.

- [x] تعریف همه Routeهای نهایی (Landing، Auth، Dashboard، Workspace، Cases، Documents، …)
- [x] نصب و اتصال React Router
- [x] جدا کردن Layout سایت عمومی از Layout پلتفرم (پس از ورود)
- [x] استخراج Componentهای مشترک (Button، Input، Modal، Table، Badge، EmptyState، PageHeader)
- [x] تعریف مدل‌های داده نهایی: User، Workspace، Case، Document، Service، Notification، Subscription، Invoice
- [x] تعریف نقش کاربران (client / expert / admin)
- [x] اسکلت Theme: Dark / Light / RTL
- [x] پیش‌نویس API با پیشوند `/api/v1/`

**خروجی فاز:** اسکلت مسیرها، Layoutها، مدل‌ها و API versioned آماده باشد. ✅

---

## فاز ۱ — هسته پلتفرم
**اولویت:** بسیار بالا | **برآورد:** ۴–۵ روز

### ۱-۱ منوی اصلی
- [x] بازطراحی Sidebar/منو به معماری پلتفرم:
  - [x] داشبورد
  - [x] خدمات
  - [x] Workspace
  - [x] پرونده‌ها
  - [x] اسناد
  - [x] قراردادها
  - [x] چت
  - [x] گزارش‌ها
  - [x] اشتراک
  - [x] صورتحساب
  - [x] اعلان‌ها
  - [x] پشتیبانی
  - [x] تنظیمات

### ۱-۲ Workspace
- [x] طراحی و پیاده‌سازی مفهوم Workspace (مهم‌ترین بخش نرم‌افزار)
- [x] اسکلت داخل Workspace:
  - [x] Case
  - [x] Document
  - [x] Timeline
  - [x] Chat
  - [x] Reports
  - [x] Invoice
  - [x] AI
  - [x] Activity

### ۱-۳ Dashboard
- [x] بازطراحی داشبورد شبیه Notion / ClickUp / Monday
- [x] بخش‌ها:
  - [x] Quick Action
  - [x] Recent Cases
  - [x] Timeline
  - [x] Notification
  - [x] Recent Documents
  - [x] AI Status
  - [x] Subscription
  - [x] Tasks
- [x] حس «ورود به محیط کاری» بعد از Login (نه وب‌سایت معرفی)

**خروجی فاز:** کاربر بعد از ورود وارد فضای کاری پلتفرم شود، نه لندینگ. ✅

---

## فاز ۲ — اعتمادسازی و ورودی کاربر
**اولویت:** بسیار بالا / بالا | **برآورد:** ۳–۴ روز

### ۲-۱ Landing Page
- [x] صفحه Landing جدا از اپلیکیشن
- [x] در ۱۰ ثانیه اول مشخص شود: شرکت چیست؟ چه مشکلی حل می‌کند؟ چرا اعتماد؟
- [x] افزودن بخش‌های اعتماد:
  - [x] رزومه شرکت
  - [x] آمار
  - [x] تیم متخصص
  - [x] نمونه پرونده
  - [x] روند انجام خدمات
  - [x] مشتریان سازمانی
  - [x] نظرات مشتری
  - [x] مجوزها
  - [x] گواهینامه‌ها

### ۲-۲ CTA
- [x] جایگزینی «شروع کنید» با دکمه‌های عملیاتی:
  - [x] ثبت درخواست
  - [x] شروع مشاوره
  - [x] ایجاد Workspace
  - [x] بارگذاری مدارک
  - [x] دریافت تحلیل اولیه

### ۲-۳ Search
- [x] Search واقعی در صفحه اول با متن: «چه خدمتی نیاز دارید؟»
- [x] اتصال جستجو به خدمات / پرونده / اسناد (حداقل UI + فیلتر mock)

### ۲-۴ AI در صفحه اول
- [x] Section اختصاصی DecisionOS AI در Landing

### ۲-۵ ساختار خدمات
- [x] دسته‌بندی خدمات:
  - [x] حقوقی
  - [x] قرارداد
  - [x] مالی
  - [x] حسابداری
  - [x] املاک
  - [x] بیمه
  - [x] سرمایه‌گذاری
  - [x] کسب‌وکار
  - [x] هوش مصنوعی

**خروجی فاز:** ورودی عمومی سایت اعتمادساز و CTAمحور باشد. ✅

---

## فاز ۳ — عملیات پرونده و کاربر
**اولویت:** بالا | **برآورد:** ۴–۵ روز

### ۳-۱ Case Management
- [x] غنی‌سازی مدل و UI پرونده:
  - [x] Progress
  - [x] Status
  - [x] Assigned Expert
  - [x] Deadline
  - [x] Priority
  - [x] History
- [x] فراتر رفتن از «فقط فرم ایجاد پرونده»

### ۳-۲ Upload حرفه‌ای
- [x] Drag & Drop واقعی (نه فقط alert)
- [x] Preview فایل
- [x] Version
- [x] File History
- [x] OCR Ready به‌صورت placeholder (بدون پیاده‌سازی OCR واقعی)

### ۳-۳ Notification
- [x] سیستم اعلان داخل اپ
- [x] طراحی کانال‌ها:
  - [x] In-app
  - [x] Email
  - [x] SMS
  - [x] WhatsApp (فقط برنامه برای بعد — ساخته نشود)

### ۳-۴ User Profile
- [x] صفحه پروفایل کامل:
  - [x] اطلاعات
  - [x] اشتراک
  - [x] سوابق
  - [x] امنیت
  - [x] احراز هویت
  - [x] تنظیمات

**خروجی فاز:** جریان روزمره پرونده، سند و کاربر قابل استفاده باشد. ✅

---

## فاز ۴ — محتوا، اعتماد و SEO
**اولویت:** متوسط | **برآورد:** ۳–۴ روز

- [x] بازنویسی کامل FAQ (تمرکز SEO)
- [x] Footer حرفه‌ای:
  - [x] مجوزها
  - [x] نمادها
  - [x] شبکه‌های اجتماعی
  - [x] شماره تماس
  - [x] دفتر
  - [x] ساعات کاری
  - [x] نقشه
- [x] Blog — حداقل Placeholder
- [x] تقویت About Us:
  - [x] داستان شرکت
  - [x] Mission
  - [x] Vision
  - [x] Values
  - [x] اعضای تیم
- [x] Contact حرفه‌ای + Ticket
- [x] اسکلت CMS (ویرایش مطالب بدون برنامه‌نویس — حداقل ساختار)

**خروجی فاز:** صفحات محتوایی و اعتماد عمومی تکمیل/اسکلت‌بندی شده باشند. ✅

---

## فاز ۵ — معماری فنی پایدار
**اولویت:** فنی (از همین Sprint طراحی/اسکلت) | **برآورد:** ۳–۴ روز

- [x] طراحی Database مقیاس‌پذیر (`src/db/schema.ts`)
- [ ] پیاده‌سازی اسکلت DB فیزیکی (مثلاً SQLite/Postgres) — هنوز in-memory
- [ ] Auth واقعی با JWT — اسکلت Bearer آماده؛ صدور توکن واقعی مانده
- [x] Rate Limit (اسکلت in-memory)
- [x] CSRF (headerهای امنیتی پایه؛ cookie CSRF با session واقعی بعداً)
- [x] Validation (requireFields روی ایجاد پرونده)
- [x] Logging (Audit Logs)
- [x] API Versioning کامل (`/api/v1/...`)
- [x] Theme Dark / Light / RTL پایدار و سراسری

**خروجی فاز:** زیرساخت امن و مقیاس‌پذیر برای Sprintهای بعد آماده باشد. 🟡 (اسکلت کامل؛ DB فیزیکی و JWT واقعی باقی مانده)

---

## فقط Placeholder در همین Sprint
این موارد UI/اسکلت داشته باشند؛ منطق عمیق ساخته نشود.

- [x] Chat AI (اسکلت/بهبود نمایش — منطق عمیق بعداً)
- [x] AI Analysis (placeholder در Reports / Case)
- [x] Voice Assistant (placeholder در PlaceholderPages)
- [x] Knowledge Base (placeholder)
- [x] Expert Assignment (فیلد assignedExpert در Case)
- [x] Online Meeting (placeholder — بخش Activity/Workspace)
- [x] Workflow Automation (placeholder — خارج از اسکوپ عمیق)

---

## فعلاً ساخته نشود
این موارد عمداً خارج از Sprint 1 هستند:

- AI Agent
- Vector DB
- OCR واقعی
- Voice واقعی
- Accounting
- CRM کامل
- BI
- RAG
- Automation کامل

---

## معیار اتمام Sprint 1

- [x] منوی پلتفرمی نهایی شده است
- [x] Workspace طراحی و اسکلت‌بندی شده است
- [x] Dashboard حس محیط کاری دارد
- [x] Landing اعتمادساز و جدا از اپ است
- [x] مدل پرونده، Routing، نقش کاربر و Component base تثبیت شده‌اند
- [x] فیچرهای سنگین AI/RAG/OCR وارد اسکوپ نشده‌اند

---

## کارهای باقی‌مانده (نوبت بعد)

1. اتصال DB واقعی (SQLite/Postgres) بر اساس `src/db/schema.ts`
2. صدور و اعتبارسنجی JWT واقعی + refresh token
3. CSRF cookie-based با session واقعی
4. غنی‌سازی Placeholderهای Workspace (Timeline/Invoice/Activity)
5. پولیش UI و تست end-to-end مسیر Landing → Workspace → Case

---

## یادداشت برای برنامه‌نویس

قبل از افزودن قابلیت‌های جدید، معماری پایه را تثبیت کنید. اگر منو، Workspace، مدل پرونده، Routing، نقش کاربران، Components و مدل داده اکنون درست طراحی شوند، Sprintهای بعدی با حداقل بازطراحی پیش می‌روند.
