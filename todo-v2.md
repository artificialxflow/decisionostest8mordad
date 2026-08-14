# DecisionOS — todo-v2.md
## Final Fix Sprint 1 + Sprint 2 — Frontend Only

**منبع:** دستور اجرایی نهایی v1.0 + دیاگرام Sprint 2  
**Scope:** فقط **Frontend** (React + UI/UX + Client-side logic)  
**Backend:** خارج از scope — فرانت با API موجود/mock کار می‌کند  
**وضعیت:** ✅ پیاده‌سازی Frontend انجام شد (۱۴۰۵/۰۵/۲۳)  
**برآورد کل:** 6–8 هفته (۱ dev فرانت تمام‌وقت)

---

## ترتیب اجرا

```
Final Fix Sprint 1 (UI) ✅
    ↓
Auth UI + RBAC Frontend ✅
    ↓
Service Catalog UI ✅
    ↓
Request Flow UI ✅
    ↓
Case + Workflow UI ✅
    ↓
Workspace Tabs ✅
    ↓
Documents UI ✅
    ↓
Expert + Task UI ✅
    ↓
Timeline + Notification UI ✅
    ↓
Dashboard + Search UI ✅
    ↓
QA + Polish 🟡 (نیاز به تست دستی)
```

---

## فاز A — Final Fix Sprint 1 (Frontend) ✅
**برآورد:** 1–1.5 هفته

### A-1 Role & Permission (Frontend)
- [x] یکسان‌سازی `UserRole`: admin | manager | expert | customer | partner
- [x] نگاشت نقش‌های قدیمی در `src/lib/labels.ts`
- [x] ساخت `src/lib/permissions.ts`
- [x] ساخت `ProtectedRoute` + `RequireRole`
- [x] Guard روی `/app/*`
- [x] فیلتر `PlatformSidebar` بر اساس نقش + disabled برای Coming Soon
- [x] فیلتر دکمه‌های عملیاتی (create case, upload, assign, status)
- [x] به‌روزرسانی `LoginPage` با نقش‌های جدید
- [x] `AuthContext` با user + role + permissions

### A-2 Empty State پرونده‌ها
- [x] تفکیک دو حالت در `CaseListView.tsx`
- [x] استفاده از `EmptyState` component
- [x] Documents، Notifications، Tasks

### A-3 Active vs Placeholder
- [x] `FeatureStatus` + `src/config/features.ts`
- [x] Badge «به‌زودی» روی OCR، WhatsApp، RAG، AI
- [x] AI Chat عمومی → Placeholder
- [x] `DocumentCenterView`: UI upload واقعی (mock API)
- [x] `LandingPage`: stats/testimonials در production خالی
- [x] `ServicesPage`: بدون سرویس AI فعال

### A-4 تعیین تکلیف «عملیات»
- [x] Active: پرونده‌ها، اسناد
- [x] Disabled: قراردادها، گزارش‌ها، چت AI
- [x] برچسب Coming Soon

### A-5 Audit Log UI
- [x] ستون‌های User / Action / Object / Date-Time
- [x] فیلتر action type
- [x] حذف متن‌های cosmetic
- [x] Empty state
- [x] Mock events در dev

### A-6 حذف Fake Data از UI
- [x] `DashboardPage`: subscription از API
- [x] `LandingPage`: stats/testimonials با `IS_PRODUCTION`
- [x] `src/lib/env.ts` — `VITE_USE_MOCK_DATA`

### A-7 Types & Core Models (Frontend)
- [x] `CaseItem`: customerId, serviceId, expertId, requestId
- [x] `Request` type
- [x] `CaseStatus` مطابق Spec
- [x] `src/lib/labels.ts`
- [x] ✅ Freeze UI Sprint 1

---

## فاز B — Auth UI + RBAC Frontend ✅
- [x] صفحه `/login` و `/register`
- [x] `AuthContext` + localStorage persist
- [x] `useAuth()`, `usePermission()`
- [x] Navbar: نقش + logout
- [x] Redirect بعد از login بر اساس نقش
- [x] `src/lib/mockAuth.ts`
- [x] `RequireRole` / EmptyState برای 403

---

## فاز C — Service Catalog UI ✅
- [x] `ServicesPage`: mock services
- [x] کارت: title, category, description, estimatedTime, pricingType
- [x] ۸ دسته
- [x] فیلتر category + جستجو
- [x] Empty state
- [x] CTA «ثبت درخواست»
- [x] Admin UI `/app/admin/services`
- [x] `RequireRole(['admin', 'manager'])`

---

## فاز D — Request Flow UI ✅
- [x] Wizard 5 مرحله‌ای
- [x] Progress stepper
- [x] Validation
- [x] Success page: Request/Case/Workspace ID
- [x] Mock submit + redirect

---

## فاز E — Case Management UI ✅
- [x] فیلتر status (CaseListView)
- [x] Badge رنگی وضعیت
- [x] `CaseDetailView`: status change + assign expert
- [x] State transition UI
- [x] `NewCaseModal`: statusهای جدید

---

## فاز F — Workspace UI ✅
- [x] Overview | Case | Documents | Tasks | Timeline | Messages | Reports | AI
- [x] Route `/app/workspace/:workspaceId`
- [x] Empty states
- [x] Tasks tab CRUD
- [x] AI skeleton Coming Soon

---

## فاز G — Document Management UI ✅
- [x] Upload drag-drop + progress UI
- [x] Preview modal
- [x] Delete + permission
- [x] Category filter + search
- [x] Document status badges
- [x] Empty states

---

## فاز H — Expert + Task UI ✅
- [x] `/app/experts`
- [x] Modal تخصیص در Case detail
- [x] Tasks در Workspace + Dashboard
- [x] Empty states

---

## فاز I — Timeline + Notification UI ✅
- [x] `TimelineEvent` component
- [x] Workspace Timeline tab
- [x] Mock events
- [x] Notifications: list + mark read + channel badges
- [x] Empty state

---

## فاز J — Dashboard + Search UI ✅
- [x] Widgets: Requests, Cases, Documents, Tasks, Notifications
- [x] Quick Actions بر اساس نقش
- [x] `GlobalSearch` + Ctrl+K
- [x] Empty states

---

## فاز K — QA + Polish 🟡
### سناریوی UI — Customer
- [x] Login/register (UI)
- [x] انتخاب خدمت → wizard
- [x] upload مدرک (UI)
- [x] Workspace + وضعیت

### سناریوی UI — Manager
- [x] مشاهده پرونده‌ها
- [x] تخصیص expert
- [x] تغییر وضعیت
- [x] Timeline + Audit

### QA Checklist (تست دستی توصیه می‌شود)
- [ ] RTL + Dark/Light همه صفحات
- [ ] Responsive mobile/tablet
- [ ] Permission هر نقش
- [x] Empty states
- [x] Placeholder/Coming Soon
- [x] Production build بدون stats fake
- [ ] Accessibility basics

---

## معیار اتمام (Frontend Sprint 2)

- [x] Customer فلو UI از login تا workspace
- [x] Manager: manage case، assign، status change
- [x] RBAC UI روی `/app/*`
- [x] Empty state و Placeholder consistent
- [x] Mock layer در `src/lib/mock/`

---

## فایل‌های جدید

```
src/lib/permissions.ts
src/lib/labels.ts
src/lib/env.ts
src/lib/mockAuth.ts
src/lib/mock/index.ts
src/config/features.ts
src/context/AuthContext.tsx
src/components/auth/ProtectedRoute.tsx
src/components/auth/RequireRole.tsx
src/components/GlobalSearch.tsx
src/components/TimelineEvent.tsx
src/pages/RequestWizardPage.tsx
src/pages/ExpertsPage.tsx
src/pages/admin/ServicesAdminPage.tsx
```

---

## دمو Login

| ایمیل | رمز | نقش |
|-------|-----|-----|
| admin@decisionos.ir | 123456 | admin |
| manager@decisionos.ir | 123456 | manager |
| sadeghi@decisionos.ir | 123456 | expert |
| client@pars-omid.ir | 123456 | customer |
