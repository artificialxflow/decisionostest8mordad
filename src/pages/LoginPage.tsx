import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scale, Lock, Mail, User as UserIcon, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui';
import { ROUTES } from '../routes';
import { UserRole } from '../types';
import { getPostLoginRoute } from '../lib/mockAuth';
import { ROLE_LABELS } from '../lib/labels';

export const LoginPage: React.FC = () => {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || ROUTES.dashboard;

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = isRegister
        ? await register({ name, email, password, role })
        : await login(email, password);
      navigate(getPostLoginRoute(user.role), { replace: true });
    } catch {
      setError('خطا در ورود. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
        <div className="bg-slate-900 text-white p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base">{isRegister ? 'ثبت‌نام' : 'ورود به DecisionOS'}</h1>
            <p className="text-xs text-slate-400">دسترسی به Workspace و محیط کاری</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-right">
          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">{error}</div>
          )}

          {isRegister && (
            <>
              <Input label="نام و نام خانوادگی" value={name} onChange={(e) => setName(e.target.value)} required />
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">نقش</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs"
                >
                  {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
                    <option key={r} value={r}>
                      {ROLE_LABELS[r]}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">ایمیل</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@decisionos.ir"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pr-9 pl-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">رمز عبور</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pr-9 pl-3 py-2 text-xs"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            <Shield className="w-4 h-4" />
            {loading ? 'لطفاً صبر کنید...' : isRegister ? 'ثبت‌نام و ورود' : 'ورود'}
          </Button>

          <p className="text-[10px] text-slate-500 text-center leading-relaxed">
            دمو: admin / manager / sadeghi / client / partner @decisionos.ir — رمز: 123456
            <br />
            پس از ورود، از منوی «پیش‌نمایش نقش» بالای صفحه برای دیدن UI هر نقش استفاده کنید.
          </p>

          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="w-full text-xs text-amber-700 font-bold pt-2 border-t border-slate-200 dark:border-slate-700"
          >
            {isRegister ? 'حساب دارید؟ ورود' : 'حساب ندارید؟ ثبت‌نام'}
          </button>

          <Link to={ROUTES.home} className="block text-center text-xs text-blue-600 font-bold">
            بازگشت به صفحه اصلی
          </Link>
        </form>
      </div>
    </div>
  );
};
