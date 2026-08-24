import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scale, Lock, Mail, Phone, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';
import { ROUTES } from '../routes';
import { getPostLoginRoute } from '../lib/mockAuth';

type LoginTab = 'email' | 'mobile';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || ROUTES.dashboard;

  const [tab, setTab] = useState<LoginTab>('email');
  const [identifier, setIdentifier] = useState('customer@decisionos.ir');
  const [password, setPassword] = useState('demo');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const email = tab === 'mobile' ? 'customer@decisionos.ir' : identifier;
      const user = await login(email, password);
      if (remember) localStorage.setItem('decisionos-remember', '1');
      navigate(getPostLoginRoute(user.role), { replace: true });
    } catch {
      setError('خطا در ورود. برای demo از ایمیل‌های نقش استفاده کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-10">
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg z-50">
          {toast}
        </div>
      )}
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900">
        {/* Brand panel */}
        <div className="bg-slate-900 text-white p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-4">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black mb-2">ورود به DecisionOS</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              دسترسی امن به داشبورد مشتری، متخصص یا مدیر سیستم — بر اساس نقش شما.
            </p>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 mt-8">
            <li className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" /> امنیت و حریم خصوصی
            </li>
            <li className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" /> کنترل دسترسی نقش‌محور
            </li>
          </ul>
          <p className="text-[10px] text-slate-500 mt-6">نسخه نمایشی — بدون OAuth واقعی</p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8 space-y-4 text-right">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => setTab('email')}
              className={`flex-1 text-xs font-bold py-2 rounded-md ${tab === 'email' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
            >
              ورود با ایمیل
            </button>
            <button
              type="button"
              onClick={() => setTab('mobile')}
              className={`flex-1 text-xs font-bold py-2 rounded-md ${tab === 'mobile' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
            >
              ورود با موبایل
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">{error}</div>
            )}

            <div>
              <label className="block text-xs font-bold mb-1">{tab === 'email' ? 'ایمیل' : 'شماره موبایل'}</label>
              <div className="relative">
                {tab === 'email' ? (
                  <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                ) : (
                  <Phone className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                )}
                <input
                  required
                  type={tab === 'email' ? 'email' : 'tel'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={tab === 'email' ? 'you@example.com' : '09xxxxxxxxx'}
                  className="w-full border rounded-lg pr-9 pl-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800"
                />
              </div>
              {tab === 'mobile' && (
                <p className="text-[10px] text-amber-700 mt-1">موبایل نمایشی — ورود با حساب مشتری demo</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">رمز عبور</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg pr-9 pl-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="نمایش رمز"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                مرا به خاطر بسپار
              </label>
              <button type="button" className="text-blue-600 font-bold" onClick={() => showToast('بازیابی رمز — نسخه نمایشی')}>
                فراموشی رمز؟
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '...' : 'ورود'}
            </Button>
          </form>

          <div className="relative text-center text-[10px] text-slate-400 py-1">
            <span className="bg-white dark:bg-slate-900 px-2 relative z-10">یا ورود سریع</span>
            <div className="absolute inset-x-0 top-1/2 border-t border-slate-200 dark:border-slate-700" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {['Google', 'LinkedIn', 'Microsoft'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => showToast(`ورود با ${p} — نسخه نمایشی`)}
                className="text-[10px] font-bold border rounded-lg py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {p}
              </button>
            ))}
          </div>

          <p className="text-[11px] text-center text-slate-500 pt-2">
            حساب ندارید؟{' '}
            <Link to={ROUTES.register} className="text-blue-600 font-bold">
              ثبت‌نام
            </Link>
          </p>
          <p className="text-[10px] text-center text-slate-400">
            Demo: customer@ / expert@ / admin@decisionos.ir — رمز: demo
          </p>
        </div>
      </div>
    </div>
  );
};
