import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { Button } from '../components/ui';
import { ROUTES } from '../routes';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ROLE_LABELS } from '../lib/labels';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password, role });
      setToast('ثبت‌نام موفق (نسخه نمایشی) — در حال ورود...');
      setTimeout(() => navigate(ROUTES.dashboard), 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-xs px-4 py-2 rounded-lg z-50">
          {toast}
        </div>
      )}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border shadow-lg overflow-hidden">
        <div className="bg-emerald-700 text-white p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold">ثبت‌نام</h1>
            <p className="text-xs text-emerald-100">ایجاد حساب جدید — mock</p>
          </div>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1">نام</label>
            <div className="relative">
              <User className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg pr-9 pl-3 py-2 text-xs" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">ایمیل</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg pr-9 pl-3 py-2 text-xs" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">رمز عبور</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg pr-9 pl-3 py-2 text-xs" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">نقش</label>
            <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full border rounded-lg px-3 py-2 text-xs">
              {(['customer', 'expert', 'partner'] as UserRole[]).map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '...' : 'ثبت‌نام'}
          </Button>
          <p className="text-[10px] text-center text-slate-500">
            حساب دارید؟{' '}
            <Link to={ROUTES.login} className="text-blue-600 font-bold">
              ورود
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
