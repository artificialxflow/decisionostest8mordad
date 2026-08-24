# Demo Script v6 — DecisionOS (Frontend-only)

مسیر پیشنهادی برای نمایش به کارفرما. همه نقش‌ها از **Quick Login** در صفحه ورود یا Landing قابل دسترسی‌اند.

**واژگان:** در UI مشتری از «پروژه» استفاده می‌شود؛ در جزئیات حقوقی همچنان می‌توان «پرونده» دید.

---

## ۱) مهمان (Public)

1. باز کردن `/`
2. مرور Hero، خدمات، آمار بازاریابی (بدون داده خصوصی)
3. کلیک **ثبت‌نام رایگان** یا **ورود**

---

## ۲) مشتری (Customer)

1. Login → **ورود به‌عنوان مشتری** (یا `client@pars-omid.ir` / `123456`)
2. Dashboard مشتری: KPI، Quick Actions، پروژه‌ها، جلسات
3. اگر Onboarding آمد: ۳ قدم یا Skip
4. **پروژه‌های من** → باز کردن یک پروژه
5. **اسناد** → Preview / OCR (mock)
6. **جلسات من** → ورود به جلسه (toast)
7. **متخصصان** → پروفایل → درخواست مشاوره (toast)
8. **اعلان‌ها** → کلیک روی اعلان دارای لینک

---

## ۳) متخصص (Expert)

1. RoleSwitcher → Expert **یا** Quick Login متخصص (`sadeghi@decisionos.ir` / `123456`)
2. Dashboard: درخواست‌های جدید، جلسات امروز، درآمد، امتیاز
3. **ورود به جلسه** → toast نمایشی
4. تقویم کوچک / لینک تقویم کامل
5. پروژه‌های ارجاع‌شده → جزئیات

---

## ۴) مدیر (Admin)

1. Quick Login مدیر (`admin@decisionos.ir` / `123456`)
2. Admin Control Center: KPI، نمودار، System Health
3. سوئیچ **سازمان تازه** → KPI صفر / empty (در صورت فعال بودن)
4. Monitoring / Audit / Organizations از لینک‌های سریع
5. Settings → Feature flags نمایشی (خاموش کردن چت AI)

---

## ۵) AI (اختیاری)

1. RoleSwitcher → AI Agent
2. صف تحلیل `/app/ai-queue`
3. پرونده `ai_analyzing` → Draft Review

---

*نسخه نمایشی — بدون Backend*
