import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Scale, Lock, Mail, User as UserIcon, Shield } from 'lucide-react';
import { User, UserRole } from '../types';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../lib/labels';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t } = useLanguage();
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = isRegister
      ? await register({ name, email, password, role })
      : await login(email, password);
    onLoginSuccess?.(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-right">
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base">{isRegister ? 'ثبت‌نام' : 'ورود'}</h3>
          </div>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <>
              <input type="text" required placeholder="نام" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-xs" />
              <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full border rounded-lg px-3 py-2 text-xs">
                {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </select>
            </>
          )}
          <div className="relative">
            <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg pr-9 pl-3 py-2 text-xs" />
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg pr-9 pl-3 py-2 text-xs" />
          </div>
          <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            {isRegister ? 'ثبت‌نام' : t('login')}
          </button>
          <button type="button" onClick={() => setIsRegister(!isRegister)} className="w-full text-xs text-amber-700 font-bold">
            {isRegister ? 'ورود' : 'ثبت‌نام'}
          </button>
        </form>
      </div>
    </div>
  );
};
