# DecisionOS — todo-v6.md
## Demo UX Polish + کیفیت فرانت (بدون Backend)

**منابع:** پیشنهادهای بهبود پس از v4/v5  
**Scope:** فقط Frontend — mockAuth + mock data  
**هدف:** demo روان‌تر برای کارفرما، یکدستی UI، موبایل، empty states  
**پیش‌نیاز:** todo-v4 ✅ · todo-v5 ✅  
**وضعیت اجرا:** ✅ تکمیل — Frontend v6 demo polish

---

## خارج از Scope

```
❌ Backend / DB / JWT / API واقعی
❌ OAuth واقعی
❌ LLM / OCR engine واقعی
❌ ویدیوکنفرانس / پرداخت واقعی
```

---

## ترتیب فازها

```
[G0] سند Demo Script + تصمیم واژگان
  ↓
[G1] ورود سریع نقش‌ها (Quick Login)
  ↓
[G2] Empty states + CTA اکشن‌دار
  ↓
[G3] واژگان یکدست (پروژه / پرونده)
  ↓
[G4] Mobile polish — ۳ داشبورد + sidebar
  ↓
[G5] Onboarding کوتاه بعد از Register
  ↓
[G6] اعلان‌های اکشن‌دار
  ↓
[G7] Design tokens + یکدستی بصری
  ↓
[G8] A11y پایه + حالت داده خالی سازمان
  ↓
[G9] Feature flags نمایشی + فاصله mockup 05
  ↓
[G10] QA Demo + tick
```

---

## فاز G0 — Demo Script و واژگان
- [x] فایل `docs/demo-script-v6.md`: مسیر Customer / Expert / Admin
- [x] تصمیم نهایی واژگان UI: مشتری «پروژه»؛ در جزئیات حقوقی می‌توان «پرونده» نگه داشت
- [x] لینک از Help/Support به Demo Script (اختیاری UI)

---

## فاز G1 — Quick Login نقش‌ها
- [x] در Login: ۳ دکمه «ورود به‌عنوان مشتری / متخصص / مدیر»
- [x] پر کردن mock credentials و login خودکار
- [x] همان دکمه‌ها در Landing زیر Hero (اختیاری)
- [x] بعد از ورود → `/app/dashboard` نقش درست

**فایل‌ها:** `LoginPage.tsx`, `LandingPage.tsx`, `mockAuth.ts`

---

## فاز G2 — Empty states قوی‌تر
- [x] Dashboard مشتری بدون پروژه → CTA «ثبت اولین پروژه»
- [x] لیست پروژه خالی فیلتر → «پاک کردن فیلتر» + توضیح
- [x] جلسات خالی → لینک تقویم / درخواست مشاوره
- [x] Expert بدون درخواست → empty مفید
- [x] اعلان خالی → پیام راهنما

**فایل‌ها:** dashboards، `CaseListView`, `SessionsPage`, `NotificationsPage`

---

## فاز G3 — یکدستی واژگان
- [x] Sidebar/Customer: «پروژه‌های من»
- [x] CaseList / CaseDetail labels هم‌راستا
- [x] Dashboard KPI labels یکدست
- [x] جستجو placeholderها

---

## فاز G4 — Mobile polish
- [x] Customer / Expert / Admin dashboard در عرض <768px بدون overflow افقی
- [x] KPI cards ۲ ستونه تمیز
- [x] Sidebar تیره: بسته شدن بعد از navigate
- [x] Navbar + PWA banner روی موبایل
- [x] Login split-screen → stack عمودی موبایل

---

## فاز G5 — Onboarding بعد از Register
- [x] Modal یا صفحه ۳ قدمی: نیاز → مدرک → متخصص
- [x] Skip / بعداً
- [x] ذخیره flag در localStorage
- [x] لینک به request wizard / documents / experts

**فایل‌ها:** `OnboardingWizard.tsx`, `RegisterPage` / `DashboardPage`

---

## فاز G6 — اعلان اکشن‌دار
- [x] هر اعلان mock: `link` به case / session / request
- [x] کلیک → navigate
- [x] Badge خوانده‌شده بعد از کلیک (mock state)

**فایل‌ها:** mock notifications، `NotificationsPage`

---

## فاز G7 — Design tokens سبک
- [x] CSS variables: `--dos-primary`, radius, status colors
- [x] Badge وضعیت از map مشترک
- [x] فاصله/padding کارت‌های داشبورد یکدست
- [x] CTAهای اصلی هم‌راستا

**فایل‌ها:** `index.css`, `labels.ts`

---

## فاز G8 — A11y + سازمان خالی
- [x] focus-visible روی دکمه‌ها/لینک‌های اصلی
- [x] aria-label روی modal بستن و icon-only
- [x] سوئیچ demo در Admin: «سازمان پر / سازمان تازه»
- [x] کنتراست متن sidebar تیره

---

## فاز G9 — Feature flags نمایشی + polish mockup 05
- [x] پنل Settings: خاموش کردن chat/AI در sidebar (features.ts)
- [x] Expert Dashboard: ویجت تقویم ماه کوچک
- [x] Landing: تأیید بدون داده خصوصی
- [x] تأیید Landing عمومی

---

## فاز G10 — QA Demo v6
- [x] اجرای Demo Script هر ۳ نقش
- [x] RTL + Dark + Mobile
- [x] Quick Login کار می‌کند
- [x] Onboarding یک‌بار نشان داده می‌شود
- [x] `npm run lint` / `npm run build`
- [x] Backend همچنان شروع نشده

---

## برآورد

| فاز | مدت |
|-----|-----|
| G0–G1 | 0.5–1 روز |
| G2–G3 | 1 روز |
| G4 | 1 روز |
| G5–G6 | 1–1.5 روز |
| G7–G8 | 1–1.5 روز |
| G9–G10 | 1 روز |
| **جمع** | **~5–7 روز** |

---

*Frontend-only polish پس از v5 — بدون Backend*
