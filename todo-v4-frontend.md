# DecisionOS — todo-v4-frontend.md
## تکمیل UI Sprint 2–5 — بدون Backend

**منابع:**
- `roadmap-unified.md` — نقشه راه یکپارچه + Gap Analysis
- `updates/04/*` — دیاگرام‌های Sprint 2–5
- `todo-v3.md` — پایه Frontend ✅ (فاز ۰–۱۰)
- `todo-v2.md` — Sprint 1+2 UI پایه ✅

**Scope:** فقط **Frontend** — mock data، mockAuth، بدون DB/API/JWT واقعی  
**هدف:** UI کامل همه Sprintها برای demo، طراحی و تأیید کارفرما — **قبل از** Backend  
**برآورد کل:** 10–14 هفته (۱ dev فرانت)  
**تاریخ:** ۱۴۰۵/۰۵/۳۰  
**وضعیت اجرا:** ✅ تکمیل — Frontend v4 demo-ready

---

## وضعیت پایه (ورود به v4)

| Sprint | پوشش UI فعلی | هدف v4 |
|--------|--------------|--------|
| Sprint 1 — UI/RBAC | ✅ ~95% | نگهداری |
| Sprint 2 — Core Flow | ✅ ~85% | → 100% |
| Sprint 3 — عملیاتی | 🟡 ~45% | → 90% |
| Sprint 4 — یکپارچه/BI | 🟡 ~30% | → 85% |
| Sprint 5 — AI/RAG UI | 🟡 ~25% | → 85% |
| Backend | ⏸️ freeze | **خارج از scope** |

---

## قوانین اجرا

```
✅ فقط Frontend — mockAuth + src/lib/mock/*
✅ state محلی / mock layer — persist واقعی نداریم
✅ AI/RAG/OCR → UI کامل + mock response (نه LLM production)
✅ Workflow → UI status + فلو بصری (نه engine سرور)
✅ Chart/Calendar/Export → کتابخانه UI + mock data
❌ Database / Postgres / SQLite production
❌ JWT واقعی / RBAC server-side
❌ File storage واقعی / multer / S3
❌ npm install بک‌اند جدید (مگر chart/calendar UI سبک)
```

**اصل:** هر صفحه باید **قابل demo** باشد — کارفرما فلو را ببیند حتی اگر داده mock باشد.

---

## ترتیب اجرا

```
[A] تکمیل Sprint 2 UI          (~1–2 هفته)
    ↓
[B] Sprint 3 — عملیاتی         (~3–4 هفته)
    ↓
[C] Sprint 4 — یکپارچه/BI      (~2–3 هفته)
    ↓
[D] Sprint 5 — AI/RAG UI       (~3–4 هفته)
    ↓
[E] QA نهایی + Demo v4         (~1 هفته)
```

---

## فاز A — تکمیل Sprint 2 UI
**اولویت:** High | **برآورد:** 1–2 هفته  
**منبع:** `9420`, `updates/02/1.txt` (فقط بخش UI)  
**پوشش فعلی:** ~85%

### A-1 Task پیشرفته
- [x] فیلدهای Task: `priority` (low/medium/high)، `dueDate`، `assigneeId`
- [x] Sub-task: لیست تو در تو زیر هر task (mock)
- [x] Badge overdue برای deadline گذشته
- [x] فیلتر task: وضعیت / اولویت / مسئول
- [x] Empty state + skeleton loading

**فایل‌ها:** `WorkspacePage.tsx` (TasksTab), `src/lib/mock/tasks.ts` (جدید/گسترش), `src/types.ts`

### A-2 فیلتر پیشرفته پرونده
- [x] `CaseListView`: فیلتر چندگانه — وضعیت، خدمت، تاریخ، کارشناس
- [x] Sort: جدیدترین / deadline / اولویت
- [x] Chip فیلتر فعال + «پاک کردن همه»
- [x] URL query sync (`?status=waiting_docs`)

**فایل‌ها:** `CaseListView.tsx`, `src/lib/mock/index.ts`

### A-3 صفحه لیست درخواست‌ها
- [x] Route: `/app/requests`
- [x] جدول درخواست‌های submitted (mock) — وضعیت، خدمت، تاریخ
- [x] لینک به Case/Workspace مرتبط
- [x] Sidebar item برای Manager/Admin

**فایل‌ها:** `src/pages/RequestsListPage.tsx` (جدید), `App.tsx`, `PlatformSidebar.tsx`, `permissions.ts`

### A-4 Register UI جدا
- [x] `/register` — فرم ثبت‌نام (mock submit → toast)
- [x] تفکیک بصری از Login
- [x] CTA Landing → Register

**فایل‌ها:** `RegisterPage.tsx` (جدید), `App.tsx`, `LandingPage.tsx`

### A-5 Preview و Dashboard polish
- [x] Preview PDF/image بهتر (iframe mock یا thumbnail)
- [x] Dashboard KPI یکدست از mock (بدون عدد پراکنده)
- [x] Widget نقش‌محور: Customer vs Manager vs Expert

**فایل‌ها:** `DocumentCenterView.tsx`, `DashboardView.tsx`, `PlatformPages.tsx`

**خروجی فاز A:** Sprint 2 UI ~100% — فلو end-to-end demo بدون Backend

---

## فاز B — Sprint 3 UI (عملیاتی)
**اولویت:** High | **برآورد:** 3–4 هفته  
**منبع:** `9417`, Master 9418 (Sprint 3)  
**پوشش فعلی:** ~45%

### B-1 تقویم و زمان‌بندی
- [x] Route: `/app/calendar`
- [x] نمای ماه / هفته (mock events: deadline task، جلسه، یادآور)
- [x] Event card: پرونده، task، نوع
- [x] کلیک event → navigate به Case/Workspace
- [x] Sidebar + permission

**فایل‌ها:** `src/pages/CalendarPage.tsx`, `src/components/CalendarView.tsx`, `src/lib/mock/calendar.ts`

**وابستگی پیشنهادی:** `@fullcalendar/react` یا UI ساده custom — بدون backend

### B-2 Versioning مدارک
- [x] در `DocumentCenterView` / Case documents: پنل «نسخه‌ها»
- [x] لیست v1, v2, v3 — تاریخ، uploader، diff badge
- [x] دکمه «بازگشت به نسخه» (mock toast)
- [x] Mock data: `DocumentVersion` در `types.ts` (موجود)

**فایل‌ها:** `DocumentVersionPanel.tsx` (جدید), `DocumentCenterView.tsx`, `mock/documents.ts`

### B-3 رضایت مشتری (Survey)
- [x] Modal/Page پس از `completed`: ستاره ۱–۵ + نظر
- [x] Mock aggregate در Reports
- [x] Badge «نظر ثبت شد» در Case detail

**فایل‌ها:** `SatisfactionSurveyModal.tsx`, `CaseDetailView.tsx`, `mock/satisfaction.ts`

### B-4 یادآور و Reminder
- [x] Route یا panel: `/app/reminders` یا تب در Workspace
- [x] CRUD یادآور mock: عنوان، تاریخ، پرونده مرتبط
- [x] Badge «سررسید امروز» در Navbar
- [x] لینک به Calendar

**فایل‌ها:** `RemindersPage.tsx` یا `RemindersPanel.tsx`, `mock/reminders.ts`

### B-5 گزارش‌ها با Chart واقعی
- [x] `ReportsPage`: نمودار خط/میله/دونات (Recharts یا Chart.js)
- [x] Mock series: پرونده ماهانه، نرخ تکمیل مدارک، زمان رسیدگی
- [x] فیلتر بازه زمانی (UI)
- [x] دکمه Export PDF/Excel → toast «نسخه نمایشی»

**فایل‌ها:** `ReportsPage.tsx`, `src/components/charts/*`, `mock/reports.ts`

### B-6 ارتباطات درون پرونده
- [x] Thread comment در CaseDetail (فراتر از notes ساده)
- [x] Reply، timestamp، نقش فرستنده
- [x] @mention mock (badge)
- [x] تفکیک «یادداشت داخلی» vs «پیام به مشتری»

**فایل‌ها:** `CaseCommentThread.tsx`, `CaseDetailView.tsx`, `mock/comments.ts`

### B-7 مالی و قرارداد — polish
- [x] `BillingPage`: detail modal فاکتور
- [x] `ContractsPage`: flow steps بصری (پیش‌نویس → بازبینی → امضا)
- [x] امضای دیجیتال mock (دکمه + badge)

**فایل‌ها:** `PlaceholderPages.tsx` (Billing, Contracts)

### B-8 اتوماسیون اولیه
- [x] `AutomationPage`: لیست rule mock (اگر X → اعلان Y)
- [x] فرم «rule جدید» (UI only)
- [x] NDST flow diagram بصری

**فایل‌ها:** `AutomationPage.tsx`, `AutomationRulesList.tsx`

### B-9 جستجوی پیشرفته
- [x] `GlobalSearch`: فیلتر نوع (پرونده/سند/خدمت/کارشناس)
- [x] Recent searches (localStorage)
- [x] Highlight match در نتایج

**فایل‌ها:** `GlobalSearch.tsx`

**خروجی فاز B:** Sprint 3 UI ~90% — Calendar، Versioning، Survey، Reports chart

---

## فاز C — Sprint 4 UI (یکپارچه‌سازی و BI)
**اولویت:** Medium | **برآورد:** 2–3 هفته  
**منبع:** `9416`, Master 9418 (Sprint 4)  
**پوشش فعلی:** ~30%

### C-1 Monitoring Admin Dashboard
- [x] Route: `/app/admin/monitoring` (Admin only)
- [x] Mock metrics: uptime، request/min، error rate، active users
- [x] Sparkline / gauge charts
- [x] Alert list (mock)

**فایل‌ها:** `MonitoringDashboardPage.tsx`, `mock/monitoring.ts`

### C-2 Automation Rules Builder (Visual)
- [x] UI drag یا step builder: Trigger → Condition → Action
- [x] Trigger mock: status change، doc upload، deadline
- [x] Action mock: notify، assign، change status
- [x] Preview rule JSON (read-only)

**فایل‌ها:** `AutomationRuleBuilder.tsx`, گسترش `AutomationPage.tsx`

### C-3 Integration Settings
- [x] Route: `/app/admin/integrations`
- [x] کارت‌های SMS، Email، WhatsApp، Webhook — toggle mock
- [x] فرم API key (masked placeholder)
- [x] Test connection → toast mock

**فایل‌ها:** `IntegrationsPage.tsx`, `mock/integrations.ts`

### C-4 Workflow Visual (Read-only)
- [x] `/app/workflows`: Mermaid یا SVG interactive
- [x] Highlight مسیر فعلی پرونده نمونه
- [x] Return paths (waiting_docs loop)

**فایل‌ها:** `WorkflowsDocPage.tsx`, `WorkflowDiagram.tsx`

### C-5 BI Dashboard هلدینگ
- [x] Tab در Reports: «نمای هلدینگ»
- [x] KPI: درآمد، SLA، رضایت، پرونده فعال
- [x] Compare workspace/tenant mock

**فایل‌ها:** `ReportsPage.tsx`, `HoldingDashboard.tsx`

### C-6 AI Data Prep UI (بدون AI واقعی)
- [x] Route: `/app/admin/ai-prep`
- [x] Checklist: داده پاک، برچسب‌گذاری، export JSON mock
- [x] Progress bar «آمادگی Sprint 5»

**فایل‌ها:** `AiDataPrepPage.tsx`

### C-7 PWA Shell (UI)
- [x] `manifest.json` + meta tags
- [x] Install prompt banner (mock)
- [x] Offline badge در Navbar — «نسخه نمایشی»

**فایل‌ها:** `public/manifest.json`, `index.html`, `PlatformNavbar.tsx`

**خروجی فاز C:** Sprint 4 UI ~85% — Admin monitoring، Integrations، BI

---

## فاز D — Sprint 5 UI (AI/RAG)
**اولویت:** Medium | **برآورد:** 3–4 هفته  
**منبع:** `9419`, Master 9418 (Sprint 5)  
**پوشش فعلی:** ~25%

### D-1 Chat AI کامل (Mock)
- [x] Input فعال + ارسال پیام
- [x] Mock streaming typing indicator
- [x] Context selector: پرونده / سند
- [x] Citation mock «بند ۳ سند X»
- [x] History گفتگو (session mock)
- [x] Badge: «پاسخ نمایشی — Sprint Backend»

**فایل‌ها:** `ChatPage.tsx`, `AiChatPanel.tsx`, `mock/aiChat.ts`

### D-2 وضعیت `ai_analyzing`
- [x] اضافه به `CaseStatus` + labels + colors
- [x] `CaseStatusBar` + filters
- [x] Timeline event: «تحلیل AI شروع شد»
- [x] Case نمونه با این وضعیت در mock

**فایل‌ها:** `types.ts`, `labels.ts`, `DocumentLoopPanel.tsx`, `mock/index.ts`

### D-3 AI Analysis Panel
- [x] Tab/panel در CaseDetail: «تحلیل هوشمند»
- [x] Mock: risk score، key entities، suggested actions
- [x] وضعیت تحلیل مدرک: complete / incomplete / needs_clarification / mismatch
- [x] Progress steps UI

**فایل‌ها:** `AiAnalysisPanel.tsx`, `CaseDetailView.tsx`, `mock/aiAnalysis.ts`

### D-4 Draft Review (Human-in-the-loop)
- [x] Route: `/app/cases/:id/draft-review`
- [x] Split view: AI draft | Expert editor (textarea mock)
- [x] دکمه‌ها: تأیید، رد، درخواست بازبینی
- [x] QC gate badge برای Manager

**فایل‌ها:** `DraftReviewPage.tsx`, `mock/drafts.ts`

### D-5 Knowledge Base UI
- [x] `/app/admin/knowledge` — لیست اسناد حقوقی mock
- [x] Upload zone (mock) + index status
- [x] Category: قانون، آیین‌نامه، رأی
- [x] «Indexed» badge — آماده RAG

**فایل‌ها:** `KnowledgeBaseAdminPage.tsx`, `mock/knowledge.ts`

### D-6 Semantic Search UI
- [x] Toggle در GlobalSearch: «جستجوی معنایی»
- [x] Mock results با relevance score
- [x] Icon/sparkle متمایز از keyword search

**فایل‌ها:** `GlobalSearch.tsx`, `mock/semanticSearch.ts`

### D-7 OCR Preview UI
- [x] در Document preview: tab «متن استخراج‌شده (OCR)»
- [x] Mock OCR text + confidence badge
- [x] `featureKey: ocr` → active در UI (نه coming_soon)

**فایل‌ها:** `DocumentCenterView.tsx`, `OcrPreviewPanel.tsx`

### D-8 AI Agent Role (Demo)
- [x] در RoleSwitcher: «AI Agent» (read-only demo)
- [x] Sidebar محدود: Cases assigned to AI، Analysis queue
- [x] توضیح: نقش سیستمی — نه login واقعی

**فایل‌ها:** `RoleSwitcher.tsx`, `permissions.ts`, `mock/aiAgentQueue.ts`

### D-9 Expert Matching — polish
- [x] Skeleton → result animation
- [x] Reason chips: «شهر»، «تخصص»، «بار کاری»
- [x] Compare experts side-by-side modal

**فایل‌ها:** `ExpertMatchingPanel.tsx`

**خروجی فاز D:** Sprint 5 UI ~85% — Chat، Analysis، Draft Review، KB

---

## فاز E — QA نهایی + Demo v4
**اولویت:** Critical | **برآورد:** 1 هفته

### E-1 Demo Script v4

**۱. Sprint 2 flow**
- [x] Customer: register → request → workspace → document loop
- [x] Manager: filter cases → assign → task with deadline

**۲. Sprint 3 flow**
- [x] Calendar event → case
- [x] Document version history
- [x] Satisfaction survey on complete
- [x] Reports charts

**۳. Sprint 4 flow**
- [x] Admin: monitoring + integrations toggle
- [x] Automation rule builder demo

**۴. Sprint 5 flow**
- [x] AI chat mock conversation
- [x] Case `ai_analyzing` → analysis panel → draft review

### E-2 Regression
- [x] Role switcher × همه صفحات جدید
- [x] RTL + Dark + Mobile همه فازها
- [x] Sidebar permissions درست
- [x] `npm run build` بدون error
- [x] هیچ صفحه «مرده» بدون توضیح

### E-3 features.ts به‌روز
- [x] `ocr`, `rag`, `chat` → `active` یا `placeholder` با demo (نه فقط coming_soon)
- [x] Sidebar badge هماهنگ

**خروجی:** Frontend v4 آماده demo کامل ۵ Sprint

---

## فایل‌های پیشنهادی (جدید)

```
src/
  pages/
    RequestsListPage.tsx
    RegisterPage.tsx
    CalendarPage.tsx
    RemindersPage.tsx
    DraftReviewPage.tsx
    MonitoringDashboardPage.tsx
    IntegrationsPage.tsx
    AiDataPrepPage.tsx
    KnowledgeBaseAdminPage.tsx
  components/
    CalendarView.tsx
    DocumentVersionPanel.tsx
    SatisfactionSurveyModal.tsx
    RemindersPanel.tsx
    CaseCommentThread.tsx
    AutomationRulesList.tsx
    AutomationRuleBuilder.tsx
    WorkflowDiagram.tsx
    HoldingDashboard.tsx
    AiChatPanel.tsx
    AiAnalysisPanel.tsx
    OcrPreviewPanel.tsx
    charts/
      CaseTrendChart.tsx
      DocumentCompletionChart.tsx
  lib/mock/
    tasks.ts
    calendar.ts
    reminders.ts
    comments.ts
    satisfaction.ts
    reports.ts
    monitoring.ts
    integrations.ts
    aiChat.ts
    aiAnalysis.ts
    drafts.ts
    knowledge.ts
    semanticSearch.ts
    aiAgentQueue.ts
public/
  manifest.json
```

---

## برآورد زمانی

| فاز | Sprint | مدت |
|-----|--------|-----|
| A | تکمیل Sprint 2 UI | 1–2 هفته |
| B | Sprint 3 عملیاتی | 3–4 هفته |
| C | Sprint 4 یکپارچه/BI | 2–3 هفته |
| D | Sprint 5 AI/RAG UI | 3–4 هفته |
| E | QA + Demo | 1 هفته |
| **جمع** | | **10–14 هفته** |

---

## معیار Done (Frontend v4)

- [x] Sprint 2 UI: Task پیشرفته، فیلتر Case، Requests list
- [x] Sprint 3 UI: Calendar، Versioning، Survey، Reports chart، Comments
- [x] Sprint 4 UI: Monitoring، Integrations، Automation builder، PWA shell
- [x] Sprint 5 UI: Chat mock، ai_analyzing، Analysis panel، Draft review، KB
- [x] Demo script ۴ فلو (E-1) اجرا شده
- [x] Build موفق + RTL/Dark/Mobile
- [x] **Backend هنوز شروع نشده**

---

## خارج از Scope (همچنان)

| قابلیت | توضیح |
|--------|--------|
| Database / API واقعی | → `todo-v4-backend.md` |
| LLM / RAG / Vector DB واقعی | UI mock کافی |
| WhatsApp/SMS/Email ارسال واقعی | Integration UI فقط |
| Workflow engine سرور | UI + mock rules |
| File persist | Upload → toast/mock blob |

---

## اسناد مرتبط

| سند | نقش |
|-----|-----|
| `todo-v3.md` | ✅ Frontend v3 — آرشیو |
| `roadmap-unified.md` | مرجع Sprint و Gap |
| `todo-v4-frontend.md` | **این سند — اجرای فعلی** |
| `todo-v4-backend.md` | 🔜 بعد از تأیید UI v4 + تصمیم Backend |

---

## شروع فوری

1. **فاز A** — Task پیشرفته + Case filters (سریع‌ترین impact)
2. **فاز B-1** — Calendar (بزرگ‌ترین gap Sprint 3)
3. **فاز D-1** — Chat mock کامل (اگر کارفرما AI می‌خواهد ببیند)

---

*آخرین به‌روزرسانی: ۱۴۰۵/۰۵/۳۰ — بر اساس Gap Analysis Frontend-only*
