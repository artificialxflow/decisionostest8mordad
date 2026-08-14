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
  UserCheck,
  ClipboardList,
} from 'lucide-react';
import { ROUTES } from '../../routes';
import { useAuth } from '../../context/AuthContext';
import { canAccessRoute, RouteKey } from '../../lib/permissions';
import { FEATURES, featureBadge } from '../../config/features';
import { ROLE_LABELS } from '../../lib/labels';
import { Badge } from '../ui';

interface PlatformSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  caseCount: number;
  unreadNotifications: number;
}

type MenuItem = {
  to: string;
  label: string;
  icon: React.ElementType;
  routeKey: RouteKey;
  featureKey?: string;
  badgeKey?: 'cases' | 'notif';
  disabled?: boolean;
};

const menuGroups: { title: string; items: MenuItem[] }[] = [
  {
    title: 'اصلی',
    items: [
      { to: ROUTES.dashboard, label: 'داشبورد', icon: LayoutDashboard, routeKey: 'dashboard' },
      { to: ROUTES.appServices, label: 'خدمات', icon: Briefcase, routeKey: 'services' },
      { to: ROUTES.workspace, label: 'Workspace', icon: FolderKanban, routeKey: 'workspace' },
      { to: ROUTES.requestNew, label: 'ثبت درخواست', icon: ClipboardList, routeKey: 'requests' },
    ],
  },
  {
    title: 'عملیات',
    items: [
      { to: ROUTES.cases, label: 'پرونده‌ها', icon: Gavel, routeKey: 'cases', badgeKey: 'cases' },
      { to: ROUTES.documents, label: 'اسناد', icon: FileText, routeKey: 'documents' },
      {
        to: ROUTES.contracts,
        label: 'قراردادها',
        icon: FileSignature,
        routeKey: 'contracts',
        featureKey: 'contracts',
        disabled: true,
      },
      {
        to: ROUTES.chat,
        label: 'چت AI',
        icon: Bot,
        routeKey: 'chat',
        featureKey: 'chat',
        disabled: true,
      },
      {
        to: ROUTES.reports,
        label: 'گزارش‌ها',
        icon: BarChart3,
        routeKey: 'reports',
        featureKey: 'reports',
        disabled: true,
      },
    ],
  },
  {
    title: 'مدیریت',
    items: [
      { to: ROUTES.experts, label: 'کارشناسان', icon: UserCheck, routeKey: 'experts' },
      { to: ROUTES.adminServices, label: 'مدیریت خدمات', icon: Briefcase, routeKey: 'adminServices' },
    ],
  },
  {
    title: 'حساب',
    items: [
      { to: ROUTES.subscription, label: 'اشتراک', icon: CreditCard, routeKey: 'subscription', featureKey: 'subscription', disabled: true },
      { to: ROUTES.billing, label: 'صورتحساب', icon: Receipt, routeKey: 'billing', featureKey: 'billing', disabled: true },
      { to: ROUTES.notifications, label: 'اعلان‌ها', icon: Bell, routeKey: 'notifications', badgeKey: 'notif' },
      { to: ROUTES.support, label: 'پشتیبانی', icon: LifeBuoy, routeKey: 'support', featureKey: 'support', disabled: true },
      { to: ROUTES.settings, label: 'تنظیمات', icon: Settings, routeKey: 'settings' },
      { to: ROUTES.audit, label: 'لاگ امنیتی', icon: ShieldCheck, routeKey: 'audit' },
      { to: ROUTES.cms, label: 'CMS', icon: FilePenLine, routeKey: 'cms', featureKey: 'cms', disabled: true },
    ],
  },
];

export const PlatformSidebar: React.FC<PlatformSidebarProps> = ({
  mobileOpen,
  onCloseMobile,
  caseCount,
  unreadNotifications,
}) => {
  const { user } = useAuth();

  const getBadge = (key?: 'cases' | 'notif') => {
    if (key === 'cases' && caseCount > 0) return String(caseCount);
    if (key === 'notif' && unreadNotifications > 0) return String(unreadNotifications);
    return null;
  };

  const renderItem = (item: MenuItem) => {
    if (!canAccessRoute(user?.role, item.routeKey)) return null;

    const badge = getBadge(item.badgeKey);
    const comingSoon = item.featureKey ? featureBadge(item.featureKey) : null;
    const isDisabled = item.disabled || (item.featureKey && FEATURES[item.featureKey]?.status !== 'active');

    if (isDisabled) {
      return (
        <div
          key={item.to}
          title="به‌زودی"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 cursor-not-allowed opacity-60"
        >
          <item.icon className="w-4 h-4 shrink-0" />
          <span className="text-xs font-medium flex-1">{item.label}</span>
          {comingSoon && <Badge tone="amber">{comingSoon}</Badge>}
        </div>
      );
    }

    return (
      <NavLink
        key={item.to}
        to={item.to}
        onClick={onCloseMobile}
        className={({ isActive }) =>
          `flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-xs font-medium ${
            isActive
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`
        }
      >
        <item.icon className="w-4 h-4 shrink-0" />
        <span className="flex-1">{item.label}</span>
        {badge && (
          <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
            {badge}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {mobileOpen && (
        <div onClick={onCloseMobile} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />
      )}

      <aside
        className={`fixed lg:static inset-y-0 right-0 z-50 w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform lg:transform-none ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 lg:hidden">
          <span className="text-xs font-bold">منو</span>
          <button onClick={onCloseMobile} className="p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {user && (
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-500">نقش فعال</p>
            <p className="text-xs font-bold">{ROLE_LABELS[user.role]}</p>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {menuGroups.map((group) => {
            const visibleItems = group.items.filter((item) => canAccessRoute(user?.role, item.routeKey));
            if (visibleItems.length === 0) return null;
            if (group.title === 'مدیریت' && !canAccessRoute(user?.role, 'experts') && !canAccessRoute(user?.role, 'adminServices')) {
              return null;
            }

            return (
              <div key={group.title}>
                <p className="text-[10px] font-bold text-slate-400 px-3 mb-1.5 uppercase tracking-wide">
                  {group.title}
                </p>
                <div className="space-y-0.5">{group.items.map(renderItem)}</div>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
