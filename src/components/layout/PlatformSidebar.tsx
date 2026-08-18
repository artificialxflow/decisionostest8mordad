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
  GitBranch,
  Zap,
  Building2,
} from 'lucide-react';
import { ROUTES } from '../../routes';
import { useAuth } from '../../context/AuthContext';
import { canAccessRoute, RouteKey } from '../../lib/permissions';
import { featureBadge } from '../../config/features';
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
  showComingSoon?: boolean;
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
      { to: ROUTES.contracts, label: 'قراردادها', icon: FileSignature, routeKey: 'contracts', featureKey: 'contracts', showComingSoon: true },
      { to: ROUTES.chat, label: 'چت AI', icon: Bot, routeKey: 'chat', featureKey: 'chat', showComingSoon: true },
      { to: ROUTES.reports, label: 'گزارش‌ها', icon: BarChart3, routeKey: 'reports', featureKey: 'bi', showComingSoon: true },
      { to: ROUTES.automation, label: 'اتوماسیون', icon: Zap, routeKey: 'automation', featureKey: 'aiAnalysis', showComingSoon: true },
      { to: ROUTES.workflows, label: 'Workflowها', icon: GitBranch, routeKey: 'workflows' },
    ],
  },
  {
    title: 'متخصصین',
    items: [{ to: ROUTES.experts, label: 'بازار متخصصین', icon: UserCheck, routeKey: 'experts' }],
  },
  {
    title: 'مدیریت',
    items: [
      { to: ROUTES.adminServices, label: 'مدیریت خدمات', icon: Briefcase, routeKey: 'adminServices' },
      { to: ROUTES.organizations, label: 'سازمان‌ها', icon: Building2, routeKey: 'organizations' },
    ],
  },
  {
    title: 'حساب',
    items: [
      { to: ROUTES.subscription, label: 'اشتراک', icon: CreditCard, routeKey: 'subscription', featureKey: 'subscription', showComingSoon: true },
      { to: ROUTES.billing, label: 'صورتحساب', icon: Receipt, routeKey: 'billing', featureKey: 'billing', showComingSoon: true },
      { to: ROUTES.notifications, label: 'اعلان‌ها', icon: Bell, routeKey: 'notifications', badgeKey: 'notif' },
      { to: ROUTES.support, label: 'پشتیبانی', icon: LifeBuoy, routeKey: 'support', featureKey: 'support', showComingSoon: true },
      { to: ROUTES.settings, label: 'تنظیمات', icon: Settings, routeKey: 'settings' },
      { to: ROUTES.audit, label: 'لاگ امنیتی', icon: ShieldCheck, routeKey: 'audit' },
      { to: ROUTES.cms, label: 'CMS', icon: FilePenLine, routeKey: 'cms', featureKey: 'cms', showComingSoon: true },
    ],
  },
];

export const PlatformSidebar: React.FC<PlatformSidebarProps> = ({
  mobileOpen,
  onCloseMobile,
  caseCount,
  unreadNotifications,
}) => {
  const { user, isDemoMode } = useAuth();

  const getBadge = (key?: 'cases' | 'notif') => {
    if (key === 'cases' && caseCount > 0) return String(caseCount);
    if (key === 'notif' && unreadNotifications > 0) return String(unreadNotifications);
    return null;
  };

  const renderItem = (item: MenuItem) => {
    if (!canAccessRoute(user?.role, item.routeKey)) return null;

    const badge = getBadge(item.badgeKey);
    const comingSoon = item.showComingSoon && item.featureKey ? featureBadge(item.featureKey) : null;

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
        {comingSoon && (
          <Badge tone="amber" className="!text-[9px] !px-1">{comingSoon}</Badge>
        )}
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
          <button onClick={onCloseMobile} className="p-1" aria-label="بستن منو">
            <X className="w-5 h-5" />
          </button>
        </div>

        {user && (
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-500">نقش فعال</p>
            <p className="text-xs font-bold">{ROLE_LABELS[user.role]}</p>
            {isDemoMode && (
              <Badge tone="amber" className="mt-1">حالت نمایشی</Badge>
            )}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {menuGroups.map((group) => {
            const visibleItems = group.items.filter((item) => canAccessRoute(user?.role, item.routeKey));
            if (visibleItems.length === 0) return null;

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
