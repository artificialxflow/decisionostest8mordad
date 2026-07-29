import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Gavel,
  FileText,
  FileSignature,
  Bot,
  BarChart3,
  CreditCard,
  Receipt,
  Bell,
  LifeBuoy,
  Settings,
  ShieldCheck,
  FilePenLine,
  X,
  Sparkles,
} from 'lucide-react';
import { ROUTES } from '../../routes';

interface PlatformSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  caseCount: number;
  unreadNotifications: number;
}

const menuGroups = [
  {
    title: 'اصلی',
    items: [
      { to: ROUTES.dashboard, label: 'داشبورد', icon: LayoutDashboard },
      { to: ROUTES.appServices, label: 'خدمات', icon: Briefcase },
      { to: ROUTES.workspace, label: 'Workspace', icon: FolderKanban },
    ],
  },
  {
    title: 'عملیات',
    items: [
      { to: ROUTES.cases, label: 'پرونده‌ها', icon: Gavel, badgeKey: 'cases' as const },
      { to: ROUTES.documents, label: 'اسناد', icon: FileText },
      { to: ROUTES.contracts, label: 'قراردادها', icon: FileSignature },
      { to: ROUTES.chat, label: 'چت', icon: Bot, isAi: true },
      { to: ROUTES.reports, label: 'گزارش‌ها', icon: BarChart3 },
    ],
  },
  {
    title: 'حساب',
    items: [
      { to: ROUTES.subscription, label: 'اشتراک', icon: CreditCard },
      { to: ROUTES.billing, label: 'صورتحساب', icon: Receipt },
      { to: ROUTES.notifications, label: 'اعلان‌ها', icon: Bell, badgeKey: 'notif' as const },
      { to: ROUTES.support, label: 'پشتیبانی', icon: LifeBuoy },
      { to: ROUTES.settings, label: 'تنظیمات', icon: Settings },
      { to: ROUTES.cms, label: 'CMS', icon: FilePenLine },
      { to: ROUTES.audit, label: 'لاگ امنیتی', icon: ShieldCheck },
    ],
  },
];

export const PlatformSidebar: React.FC<PlatformSidebarProps> = ({
  mobileOpen,
  onCloseMobile,
  caseCount,
  unreadNotifications,
}) => {
  const getBadge = (key?: 'cases' | 'notif') => {
    if (key === 'cases' && caseCount > 0) return String(caseCount);
    if (key === 'notif' && unreadNotifications > 0) return String(unreadNotifications);
    return null;
  };

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 right-0 z-50 lg:z-20 h-screen w-60 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out border-l border-slate-700/80 no-print ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
          <span className="font-bold text-white text-sm">
            Decision<span className="text-blue-500">OS</span>
          </span>
          <button onClick={onCloseMobile} className="p-1 text-slate-400 hover:text-white rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <div className="px-3 pb-1 text-[10px] font-bold tracking-tight text-slate-500 uppercase">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const badge = getBadge(item.badgeKey);
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white font-medium'
                            : item.isAi
                              ? 'hover:bg-slate-800 text-slate-300 border border-blue-900/30'
                              : 'hover:bg-slate-800 text-slate-300'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-2.5">
                            <Icon
                              className={`w-4 h-4 ${isActive ? 'text-white' : item.isAi ? 'text-blue-400' : 'text-slate-400'}`}
                            />
                            <span>{item.label}</span>
                          </div>
                          {badge && (
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                                isActive ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {badge}
                            </span>
                          )}
                          {item.isAi && !badge && (
                            <Sparkles className="w-3 h-3 text-blue-400" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-800 text-center text-[10px] text-slate-500">
          DecisionOS Platform © 2026
        </div>
      </aside>
    </>
  );
};
