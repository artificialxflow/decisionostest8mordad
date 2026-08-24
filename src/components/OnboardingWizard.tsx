import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Upload, UserCheck, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui';
import { ROUTES } from '../routes';

const ONBOARD_KEY = 'decisionos-onboarding-done';

export function shouldShowOnboarding(): boolean {
  return localStorage.getItem(ONBOARD_KEY) !== '1';
}

export function markOnboardingDone(): void {
  localStorage.setItem(ONBOARD_KEY, '1');
}

const STEPS = [
  {
    title: 'نیاز خود را مشخص کنید',
    desc: 'از طریق ثبت درخواست یا ایجاد پروژه شروع کنید.',
    icon: ClipboardList,
    action: ROUTES.requestNew,
    actionLabel: 'ثبت درخواست',
  },
  {
    title: 'مدارک را بارگذاری کنید',
    desc: 'اسناد را در مرکز اسناد آپلود کنید تا بررسی آغاز شود.',
    icon: Upload,
    action: ROUTES.documents,
    actionLabel: 'رفتن به اسناد',
  },
  {
    title: 'متخصص پیدا کنید',
    desc: 'از بازار متخصصین، کارشناس مناسب را انتخاب کنید.',
    icon: UserCheck,
    action: ROUTES.experts,
    actionLabel: 'مشاهده متخصصان',
  },
];

interface OnboardingWizardProps {
  open: boolean;
  onClose: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  if (!open) return null;

  const current = STEPS[step];
  const Icon = current.icon;

  const finish = () => {
    markOnboardingDone();
    onClose();
  };

  const goAction = () => {
    markOnboardingDone();
    onClose();
    navigate(current.action);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="onboard-title">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border shadow-xl max-w-md w-full p-6 space-y-4 text-right">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-slate-400 font-bold">شروع سریع · {step + 1} از {STEPS.length}</p>
            <h2 id="onboard-title" className="text-sm font-black mt-1">{current.title}</h2>
          </div>
          <button type="button" onClick={finish} aria-label="بستن راهنما" className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </div>

        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-center space-y-2">
          <Icon className="w-8 h-8 text-blue-600 mx-auto" />
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{current.desc}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={goAction} className="flex-1">
            {current.actionLabel}
          </Button>
          {step < STEPS.length - 1 ? (
            <Button size="sm" variant="outline" onClick={() => setStep(step + 1)}>
              بعدی <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={finish}>
              پایان
            </Button>
          )}
        </div>

        <div className="flex justify-between items-center text-[11px]">
          <button type="button" className="text-slate-400 hover:text-slate-600" onClick={finish}>
            فعلاً نه / Skip
          </button>
          {step > 0 && (
            <button type="button" className="text-blue-600 font-bold flex items-center gap-1" onClick={() => setStep(step - 1)}>
              <ChevronRight className="w-3 h-3" /> قبلی
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
