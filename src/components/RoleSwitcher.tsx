import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Eye, X } from 'lucide-react';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../lib/labels';
import { getPostLoginRoute } from '../lib/mockAuth';
import { Badge } from './ui';

const ROLES: UserRole[] = ['admin', 'manager', 'expert', 'customer', 'partner', 'ai_agent'];

export const RoleSwitcher: React.FC = () => {
  const { user, isDemoMode, demoRole, setDemoRole, clearDemoRole } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const activeRole = user?.role;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (role: UserRole) => {
    setDemoRole(role);
    setOpen(false);
    navigate(getPostLoginRoute(role));
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="تغییر نقش نمایشی"
        aria-expanded={open}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-semibold transition-colors ${
          isDemoMode
            ? 'border-amber-400 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-600'
            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
        }`}
      >
        <Eye className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline max-w-[80px] truncate">
          {activeRole ? ROLE_LABELS[activeRole] : 'نقش'}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 py-1 text-right">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-500">پیش‌نمایش نقش</p>
            {isDemoMode && (
              <Badge tone="amber" className="mt-1">
                حالت نمایشی
              </Badge>
            )}
          </div>
          {ROLES.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleSelect(role)}
              className={`w-full text-right px-3 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 ${
                activeRole === role ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              {ROLE_LABELS[role]}
            </button>
          ))}
          {isDemoMode && (
            <button
              type="button"
              onClick={() => {
                clearDemoRole();
                setOpen(false);
              }}
              className="w-full text-right px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-1 border-t border-slate-100 dark:border-slate-800 mt-1"
            >
              <X className="w-3 h-3" />
              خروج از حالت نمایشی
            </button>
          )}
        </div>
      )}
    </div>
  );
};
