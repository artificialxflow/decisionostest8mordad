import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Menu, X, Scale, Moon, Sun } from 'lucide-react';
import { ROUTES } from '../../routes';
import { useTheme } from '../../context/ThemeContext';
import { Footer } from './Footer';
import { Button } from '../ui';

const navLinks = [
  { to: ROUTES.home, label: 'خانه' },
  { to: ROUTES.services, label: 'خدمات' },
  { to: ROUTES.pricing, label: 'تعرفه' },
  { to: ROUTES.about, label: 'درباره ما' },
  { to: ROUTES.faq, label: 'سوالات متداول' },
  { to: ROUTES.blog, label: 'بلاگ' },
  { to: ROUTES.contact, label: 'تماس' },
];

export const PublicLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-vazirmatn">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link to={ROUTES.home} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-blue-400 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white text-base">
              Decision<span className="text-blue-600">OS</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === ROUTES.home}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="تغییر تم"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link to={ROUTES.login} className="hidden sm:block">
              <Button variant="outline" size="sm">
                ورود
              </Button>
            </Link>
            <Link to={ROUTES.dashboard} className="hidden sm:block">
              <Button size="sm">ورود به Workspace</Button>
            </Link>
            <button
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1 bg-white dark:bg-slate-950">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === ROUTES.home}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                {l.label}
              </NavLink>
            ))}
            <Link to={ROUTES.dashboard} onClick={() => setOpen(false)} className="block pt-2">
              <Button fullWidth size="sm">
                ورود به Workspace
              </Button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
