# DecisionOS — todo-v7.md
## Frontend: هم‌ترازی UI با معماری خدمت تخصصی + قیف محصول

**منابع:**
- `updates/06/02/New Text Document.txt` (معماری داده — الزامی)
- `updates/06/01/111.jpg` (فلوچارت شماتیک)
- `updates/06/03/New Text Document.txt` (محصول/UX/نقش‌ها/قیف جذب — الزامی برای فاز ۷–۹)

**اصل معماری (Freeze برای فرانت — ۰۶/۰۲):**
کاربر خدمت مشخص درخواست می‌کند → فرم تخصصی → Structured ServiceRecord → پرونده تخصصی (Case به‌عنوان container تصمیم) → اسناد متصل به همان Case → RAG نمایشی روی همان Case → (Agent تخصصی = خارج از v7 / Sprint بعد)

**اصل محصول (Freeze برای فرانت — ۰۶/۰۳):**
لندینگ/ثبت‌نام → پاسخ اولیه سیستم (AI مخفی، رایگان/محدود) → در صورت نیاز پرداخت → سپس دیدن و انتخاب متخصص → جلسات/تسک/تقویم

**چهار مفهوم جدا و متصل:** `Service` → `ServiceRecord` → `Case` → `Knowledge Base`

**محدوده v7:** فقط Frontend (types / mock / UI) — بدون Prisma، Embedding، Vector DB، API واقعی، پرداخت واقعی، خزش اینترنت واقعی  
**وضعیت پایه:** Frontend demo ✅ | Backend واقعی ❌

**پیشرفت اجرا (۱۴۰۵/۰۶):** فاز ۰–۳ و بخش عمده ۱/۲/۷/۸/۵ انجام شده در UI/mock. فاز ۹ جزئی.

**نگاشت اسناد → فازها (فقط لایه UI/mock):**

| منبع | موضوع | پوشش در v7 |
|------|--------|------------|
| ۶/۰۲ — 3A | Service & Case Data Architecture | فاز ۰ |
| ۶/۰۲ — 3G | Service-specific Record Engine | فاز ۲–۳ |
| ۶/۰۲ — 3B | Document Intelligence | فاز ۴ |
| ۶/۰۲ — 3C–3F | KB / Retrieval / RAG / Citation | فاز ۵ (نمایشی) |
| ۶/۰۳ | لندینگ، نقش‌ها، قیف جذب | فاز ۷ |
| ۶/۰۳ | AI مخفی → پرداخت → متخصص | فاز ۸ |
| ۶/۰۳ | KB نقش‌محور، کارشناس، سازمان، مالی UI | فاز ۹ |

**اولویت اجرا:** فاز ۰–۲ قبل از بازنویسی کامل ویزارد؛ فاز ۷–۸ را با فاز ۱ هماهنگ کنید تا ویزارد دو بار عوض نشود. paywall متخصص بر matching زودهنگام فعلی مقدم است.

---

## فاز ۰ — قرارداد داده فرانت (Types + Mock) ≡ Sprint 3A

### اصل و واژگان
- [x] تثبیت در کد/لیبل: **Service ≠ Case** (خدمت درخواستی vs پرونده عملیاتی با `caseNumber` مثل `INV-1405-000127`)
- [x] اصل UI: اطلاعات مهم نباید فقط در Chat بمانند؛ مسیر Accept به Record الزامی است
- [x] یک کاربر = چند Case موازی با انواع خدمت مختلف (seed نمونه)

### Service Registry (بخش ۱۶ سند ۶/۰۲)
- [x] mock registry با: `serviceId`, `name`, `category`, `version`, `active`, `formSchema`, `caseSchema`, `workflow` (نمایشی), `permissions` (نمایشی), `aiCapabilities` (لیست فقط‌خواندنی), `agents` (placeholder)
- [x] شناسه‌های استاندارد: `PROPERTY_INVESTMENT`, `PROPERTY_TRANSACTION`, `LEGAL_CASE`, `CONTRACT_ANALYSIS`, `AUCTION`, `TENDER`, `INVESTMENT_ADVISORY` (+ `TECHNOLOGY`)
- [x] نگاشت/سازگاری با کاتالوگ فعلی (`legacyServiceIds`) بدون شکستن مسیرهای قدیمی

### موجودیت‌ها (بخش ۳ سند ۶/۰۲)
- [x] `ServiceRequest` / `RequestItem` با فیلدهای v7
- [x] `Case` با `serviceTypeId`, `serviceRecordId`, `caseNumber` استاندارد
- [x] `ServiceRecord` با `data` + `structuredFields`

### Fact / Preference (بخش ۵ و ۲۱)
- [x] مدل فیلد: `field`, `value`, `importance`, `source`, `confidence`
- [x] تفکیک تایپی/UI: **Fact** (قطعی) vs **Preference** (ترجیح)
- [x] پشتیبانی **چند Source برای یک Fact**
- [x] Fact استخراج‌شده: `sourceDocument` / page / chunk / extractionMethod / confidence

### Case به‌عنوان container تصمیم (بخش ۱۹)
- [x] ساختار mock زیر Case + تب رکورد تخصصی (Requirements / Candidates / Facts / AI caps)
- [x] deprecate تدریجی `LegalDetails` / `RealEstateDetails` (هنوز در overview هستند؛ رکورد تخصصی مسیر اصلی v7)

### Seed
- [x] حداقل ۳ Case/Record نمونه چندخدمتی (سرمایه‌گذاری + حقوقی + مزایده)

---

## فاز ۱ — Intake: انتخاب خدمت و ثبت درخواست

- [x] UI جریان سند: انتخاب نوع خدمت → فرم تخصصی → ثبت Structured Record
- [x] به‌روزرسانی `ServicesPage` بر اساس Service Registry
- [x] ویزارد: خدمت → فرم تخصصی → مدارک → پاسخ سیستم → بررسی → متخصص
- [x] وضعیت درخواست در mock حفظ شد
- [x] پس از Submit: ساخت mock Case + ServiceRecord + caseNumber
- [x] خالی‌حالت و اعتبارسنجی فرانت (فیلدهای الزامی schema)
- [x] **هماهنگ با فاز ۸:** matching متخصص فقط بعد از پرداخت نمایشی

---

## فاز ۲ — Dynamic Form Engine + Field Registry ≡ بخشی از 3G

### موتور فرم
- [x] ساختار: ServiceType → FormSchema → Sections → Fields → Validation → Record
- [x] `ServiceFormRenderer` برای: text, textarea, number, currency, enum, date, multi-select, importance
- [x] پشتیبانی Importance روی فیلد
- [x] نسخه فرم badge (`v1`)
- [x] اتصال ویزارد به FormRenderer

### Field Registry
- [x] فیلدها داخل Form Schema (registry عملیاتی در schema؛ فایل جدا اختیاری مانده)

### Schemaها
- [x] PROPERTY_INVESTMENT (کامل‌تر)
- [x] LEGAL_CASE
- [x] CONTRACT_ANALYSIS
- [x] PROPERTY_TRANSACTION
- [x] AUCTION
- [x] TENDER
- [x] INVESTMENT_ADVISORY
- [x] TECHNOLOGY

---

## فاز ۳ — پرونده تخصصی (Case UI)

- [x] تب «رکورد تخصصی» در `CaseDetailView`
- [x] هدر/شماره پرونده استاندارد در seed (`INV-…` / `LEG-…`)
- [x] نمایش Service Record + Structured Facts + Sources
- [x] سرمایه‌گذاری: Requirements vs Property Candidates (Matching نمایشی)
- [x] Accept استخراج سند به Record
- [x] نمایش `aiCapabilities` فقط‌خواندنی
- [ ] تب‌های کامل container (Conversations / Tasks / Audit جدا) — هنوز از تب‌های قبلی استفاده می‌شود
- [x] فیلتر لیست پرونده‌ها بر اساس serviceType
- [x] ویرایش کامل Service Record از داخل پرونده

---

## فاز ۴ — اسناد و Document Intelligence (UI)

- [x] پنل Accept Fact از استخراج mock داخل تب رکورد
- [ ] دسته‌بندی اسناد وابسته به نوع خدمت (تقویت Document Center)
- [ ] آپلود نمایشی + metadata کامل‌تر یکدست با Case
- [ ] نسخه سند + OCR Preview موجود قبلی — یکپارچه‌سازی بیشتر با v7
- [x] UI چندمنبعی در ServiceRecordPanel

---

## فاز ۵ — KB / Retrieval / RAG / Citation نمایشی

- [x] ادمین KB: upload mock + indexed + مالک platform/expert
- [x] سوئیچ منبع KB داخلی / بیرونی (UI only)
- [x] سوئیچ منبع پاسخ سیستم: KB سایت | عمومی
- [x] بج RAG demo + پیام Vector DB not connected
- [x] برچسب مشتری «پاسخ سیستم» در ویزارد
- [x] استپ‌نمایشی کامل RAG pipeline در UI (`RagPipelineDemo`)
- [x] Evidence panel در دمو RAG
- [ ] جستجوی معنایی رتبه‌بندی‌شده در صفحه KB

---

## فاز ۶ — داشبورد، ادمین Registry، دمو، رگرسیون (معماری)

- [x] واژگان خدمت / رکورد تخصصی / پاسخ سیستم در مسیر اصلی
- [ ] Customer/Expert dashboard کارت‌های serviceType
- [x] Admin CRUD روی Service Registry
- [x] RTL و فرم‌های تخصصی در ویزارد
- [x] مسیر دمو: Landing → Login → Request(فرم) → System Reply → Paywall → Experts → Case Record
- [ ] اسکریپت دمو مکتوب در docs

---

## فاز ۷ — لندینگ، نقش‌ها، قیف جذب ≡ سند ۰۶/۰۳

- [x] لندینگ: پیام DecisionOS + مشکل‌یاب/تصمیم‌یار + مسیر ۳ قدمی
- [x] CTA ثبت‌نام / ورود / تعرفه
- [x] حوزه‌های تخصصی به‌روز (مزایده/مناقصه/فناوری/…)
- [x] پلن اولیه در کپی لندینگ توضیح داده شد
- [x] ثبت‌نام کارشناس با رزومه + pending (UI صف تأیید ادمین)
- [ ] جداسازی قوی‌تر منوی نقش‌ها
- [x] دسته‌خدمت هلدینگ: فناوری به‌جای بیمه

---

## فاز ۸ — جریان مشتری: پاسخ سیستم → پرداخت → متخصص ≡ سند ۰۶/۰۳

- [x] مسیر پیش‌پرداخت با «پاسخ سیستم»
- [x] تأخیر کوتاه آماده‌سازی پاسخ (نمایشی)
- [x] تا قبل از پرداخت: متخصص قفل
- [x] حذف matching از استپ زودهنگام
- [x] بعد از پرداخت: ExpertMatchingPanel + ثبت نهایی
- [x] امکان ثبت فقط با پاسخ سیستم (بدون متخصص)
- [x] اتصال به Service Registry و فرم تخصصی
- [x] دو منبع پاسخ در ادمین KB قابل تنظیم است
- [ ] تأخیر ۱–۲ روز قابل تنظیم در settings

---

## فاز ۹ — KB نقش‌محور، کارشناس، سازمان، عملیات، مالی UI ≡ سند ۰۶/۰۳

### پایگاه دانش
- [x] ادمین Upload + indexed
- [x] تفکیک owner platform/expert در mock
- [ ] UI آپلود KB مخصوص کارشناس
- [x] سوئیچ به‌روزرسانی داخلی/بیرونی

### چرخه حیات کارشناس
- [x] mock صف pending (`expertOnboarding.ts`)
- [x] UI ادمین تأیید/رد کارشناس (`/app/admin/expert-approvals`)
- [x] درآمد تفکیکی در صفحه تأیید کارشناسان
- [ ] بایگانی کارشناسی کامل

### سازمان و مدیران
- [ ] مدیران منطقه / CRM مدیران
- [ ] شریک پروژه % فقط‌دید مدیر
- [ ] سلسله‌مراتب منطقه→گروه→متخصص

### عملیات روزانه
- [ ] جلسات + علامت قابل ضبط
- [x] تقویم و یادآور یک صفحه
- [x] پشتیبانی فونت درشت‌تر
- [ ] مانیتور یک کاربر توسط مدیر بدون impersonation
- [ ] لیست پروژه نقش‌محور کامل

---

## خارج از محدوده v7

- [ ] Backend / Prisma / Auth واقعی
- [ ] Embedding / Chunking / Vector DB واقعی
- [ ] خزش/اتصال واقعی به گوگل یا رسانه‌های بیرونی
- [ ] درگاه پرداخت واقعی
- [ ] Service Agent و pipeline واقعی
- [ ] موتور Matching واقعی ملک/کارشناس
- [ ] تغییر اجباری شماره‌گذاری `roadmap-unified.md` بدون تصمیم محصول

---

## معیار Done فرانت v7

### معماری (۰۶/۰۱ + ۰۶/۰۲)
- [x] مسیر کامل در UI قابل دمو است: خدمت → فرم تخصصی → Record → Case → Accept Fact
- [x] Service و Case در UI و داده‌های mock از هم جدا هستند
- [x] هر ۷+ نوع خدمت در Registry هستند؛ فرم‌ها قابل پر کردن‌اند
- [x] Fact vs Preference و چند Source در UI دیده می‌شود
- [x] Requirements و Property Candidates در سرمایه‌گذاری جدا هستند
- [x] استخراج سند قابل Accept به Record است

### محصول (۰۶/۰۳)
- [x] لندینگ مسیر جذب را منتقل می‌کند
- [x] مشتری قبل از پرداخت متخصص نمی‌بیند؛ بعد از پرداخت mock می‌بیند
- [x] پاسخ اول با برچسب «پاسخ سیستم»
- [x] ادمین کارشناس pending را از UI تأیید می‌کند
- [x] سوئیچ منبع KB (داخلی/بیرونی) فقط UI است

### مشترک
- [x] همه AI/RAG/پرداخت/منبع بیرونی صراحتاً demo/mock هستند

---

## فایل‌های کلیدی اضافه‌شده/تغییر یافته

- `src/types.ts` — مدل‌های v7
- `src/lib/mock/serviceRegistry.ts` — Registry + Form Schemas
- `src/lib/mock/serviceRecords.ts` — ServiceRecord + Facts + Candidates
- `src/lib/mock/knowledge.ts` — KB modes
- `src/lib/mock/expertOnboarding.ts` — pending experts + income mock
- `src/components/ServiceFormRenderer.tsx`
- `src/components/ServiceRecordPanel.tsx`
- `src/pages/RequestWizardPage.tsx` — قیف کامل
- `src/pages/LandingPage.tsx` — پیام محصول ۰۶/۰۳
- `src/pages/ServicesPage.tsx` — کاتالوگ Registry
- `src/pages/AdminV4Pages.tsx` — KB controls
- `src/components/CaseDetailView.tsx` — تب رکورد تخصصی
