import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  Bell,
  PlusCircle,
  User as UserIcon,
  LogOut,
  Menu,
  Moon,
  Sun,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Language } from '../../types';
import { ROUTES } from '../../routes';
import { usePlatformData } from './PlatformLayout';
import { useAuth } from '../../context/AuthContext';
import { GlobalSearch } from '../GlobalSearch';
import { ROLE_LABELS } from '../../lib/labels';

interface PlatformNavbarProps {
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export const PlatformNavbar: React.FC<PlatformNavbarProps> = ({ onToggleMobile }) => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, can } = useAuth();
  const { openNewCase, notifications } = usePlatformData();
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.login);
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs px-4 md:px-6 py-2.5 flex items-center justify-between no-print h-14">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to={ROUTES.dashboard} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-blue-400 flex items-center justify-center border border-slate-800">
            <Scale className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-slate-900 dark:text-white text-base">
              Decision<span className="text-blue-600">OS</span>
            </span>
            <p className="text-[10px] text-slate-500 font-medium">{t('tagline')}</p>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-6">
        {can('create_case') && (
          <button
            onClick={openNewCase}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-md flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('newCase')}</span>
          </button>
        )}
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          title="تم"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        <div className="hidden xl:flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md border border-slate-200 dark:border-slate-700 text-xs">
          {(['fa', 'en', 'ar'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                lang === l
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate(ROUTES.notifications)}
          className="relative p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
        >
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-2 pr-2 border-r border-slate-200 dark:border-slate-700">
            <button onClick={() => navigate(ROUTES.profile)} className="flex items-center gap-2">
              <img
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'}
                alt={user.name}
                className="w-7 h-7 rounded-md object-cover border border-slate-300"
              />
              <div className="hidden xl:block text-right">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{user.name}</p>
                <p className="text-[10px] text-blue-700 dark:text-blue-400 font-medium">{ROLE_LABELS[user.role]}</p>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-md"
              title={t('logout')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate(ROUTES.login)}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>{t('login')}</span>
          </button>
        )}
      </div>
    </header>
  );
};
