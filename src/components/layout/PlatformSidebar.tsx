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
  CalendarDays,
  BellRing,
  Activity,
  Plug,
  Database,
  BookOpen,
  Video,
  Wallet,
  Star,
  Inbox,
} from 'lucide-react';
import { ROUTES } from '../../routes';
import { useAuth } from '../../context/AuthContext';
import { canAccessRoute, RouteKey } from '../../lib/permissions';
import { featureBadge } from '../../config/features';
import { ROLE_LABELS } from '../../lib/labels';
import { Badge } from '../ui';
import { UserRole } from '../../types';
import { getMockRequests } from '../../lib/mock';

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
  badgeKey?: 'cases' | 'notif' | 'requests';
  showComingSoon?: boolean;
};

type MenuGroup = { title: string; items: MenuItem[] };

const customerMenu: MenuGroup[] = [
  {
    title: 'اصلی',
    items: [
      { to: ROUTES.dashboard, label: 'خانه', icon: LayoutDashboard, routeKey: 'dashboard' },
      { to: ROUTES.cases, label: 'پروژه‌های من', icon: Gavel, routeKey: 'cases', badgeKey: 'cases' },
      { to: ROUTES.documents, label: 'اسناد من', icon: FileText, routeKey: 'documents' },
      { to: ROUTES.experts, label: 'متخصصان', icon: UserCheck, routeKey: 'experts' },
      { to: ROUTES.requestNew, label: 'درخواست مشاوره', icon: ClipboardList, routeKey: 'requests' },
      { to: ROUTES.sessions, label: 'جلسات من', icon: Video, routeKey: 'sessions' },
      { to: ROUTES.workspace, label: 'تسک‌ها', icon: FolderKanban, routeKey: 'workspace' },
      { to: ROUTES.calendar, label: 'تقویم', icon: CalendarDays, routeKey: 'calendar' },
      { to: ROUTES.reminders, label: 'یادآورها', icon: BellRing, routeKey: 'reminders' },
    ],
  },
  {
    title: 'بیشتر',
    items: [
      { to: ROUTES.notifications, label: 'اعلان‌ها', icon: Bell, routeKey: 'notifications', badgeKey: 'notif' },
      { to: ROUTES.reports, label: 'گزارش‌ها', icon: BarChart3, routeKey: 'reports', featureKey: 'bi' },
      { to: ROUTES.chat, label: 'چت AI', icon: Bot, routeKey: 'chat', featureKey: 'chat' },
      { to: ROUTES.settings, label: 'تنظیمات', icon: Settings, routeKey: 'settings' },
      { to: ROUTES.support, label: 'پشتیبانی', icon: LifeBuoy, routeKey: 'support', featureKey: 'support' },
    ],
  },
];

const expertMenu: MenuGroup[] = [
  {
    title: 'اصلی',
    items: [
      { to: ROUTES.dashboard, label: 'خانه', icon: LayoutDashboard, routeKey: 'dashboard' },
      { to: ROUTES.requestsList, label: 'درخواست‌های جدید', icon: Inbox, routeKey: 'requestsList', badgeKey: 'requests' },
      { to: ROUTES.cases, label: 'پروژه‌های ارجاع‌شده', icon: Gavel, routeKey: 'cases', badgeKey: 'cases' },
      { to: ROUTES.sessions, label: 'جلسات', icon: Video, routeKey: 'sessions' },
      { to: ROUTES.calendar, label: 'تقویم', icon: CalendarDays, routeKey: 'calendar' },
      { to: ROUTES.workspace, label: 'تسک‌ها', icon: FolderKanban, routeKey: 'workspace' },
      { to: ROUTES.documents, label: 'اسناد', icon: FileText, routeKey: 'documents' },
    ],
  },
  {
    title: 'حرفه‌ای',
    items: [
      { to: ROUTES.profile, label: 'پروفایل تخصصی', icon: UserCheck, routeKey: 'settings' },
      { to: ROUTES.billing, label: 'درآمد', icon: Wallet, routeKey: 'billing', featureKey: 'billing' },
      { to: ROUTES.experts, label: 'نظرات و امتیاز', icon: Star, routeKey: 'experts' },
      { to: ROUTES.notifications, label: 'اعلان‌ها', icon: Bell, routeKey: 'notifications', badgeKey: 'notif' },
      { to: ROUTES.settings, label: 'تنظیمات', icon: Settings, routeKey: 'settings' },
    ],
  },
];

const adminMenu: MenuGroup[] = [
  {
    title: 'Control Center',
    items: [
      { to: ROUTES.dashboard, label: 'خانه', icon: LayoutDashboard, routeKey: 'dashboard' },
      { to: ROUTES.adminMonitoring, label: 'Monitoring', icon: Activity, routeKey: 'adminMonitoring' },
      { to: ROUTES.organizations, label: 'سازمان‌ها / Tenants', icon: Building2, routeKey: 'organizations' },
      { to: ROUTES.workspace, label: 'Workspaces', icon: FolderKanban, routeKey: 'workspace' },
      { to: ROUTES.cases, label: 'پروژه‌ها', icon: Gavel, routeKey: 'cases', badgeKey: 'cases' },
      { to: ROUTES.documents, label: 'اسناد', icon: FileText, routeKey: 'documents' },
      { to: ROUTES.experts, label: 'متخصصان', icon: UserCheck, routeKey: 'experts' },
      { to: ROUTES.adminServices, label: 'مدیریت خدمات', icon: Briefcase, routeKey: 'adminServices' },
    ],
  },
  {
    title: 'سیستم',
    items: [
      { to: ROUTES.audit, label: 'Audit Log', icon: ShieldCheck, routeKey: 'audit' },
      { to: ROUTES.reports, label: 'Reports', icon: BarChart3, routeKey: 'reports', featureKey: 'bi' },
      { to: ROUTES.adminIntegrations, label: 'یکپارچه‌سازی', icon: Plug, routeKey: 'adminIntegrations' },
      { to: ROUTES.automation, label: 'اتوماسیون', icon: Zap, routeKey: 'automation' },
      { to: ROUTES.workflows, label: 'Workflowها', icon: GitBranch, routeKey: 'workflows' },
      { to: ROUTES.adminAiPrep, label: 'آماده‌سازی AI', icon: Database, routeKey: 'adminAiPrep' },
      { to: ROUTES.adminKnowledge, label: 'پایگاه دانش', icon: BookOpen, routeKey: 'adminKnowledge' },
      { to: ROUTES.cms, label: 'CMS', icon: FilePenLine, routeKey: 'cms', featureKey: 'cms' },
      { to: ROUTES.settings, label: 'تنظیمات', icon: Settings, routeKey: 'settings' },
    ],
  },
];

const partnerMenu: MenuGroup[] = [
  {
    title: 'اصلی',
    items: [
      { to: ROUTES.dashboard, label: 'خانه', icon: LayoutDashboard, routeKey: 'dashboard' },
      { to: ROUTES.workspace, label: 'Workspace', icon: FolderKanban, routeKey: 'workspace' },
      { to: ROUTES.cases, label: 'پروژه‌ها', icon: Gavel, routeKey: 'cases', badgeKey: 'cases' },
      { to: ROUTES.documents, label: 'اسناد', icon: FileText, routeKey: 'documents' },
      { to: ROUTES.notifications, label: 'اعلان‌ها', icon: Bell, routeKey: 'notifications', badgeKey: 'notif' },
    ],
  },
];

const aiAgentMenu: MenuGroup[] = [
  {
    title: 'AI Agent',
    items: [
      { to: ROUTES.aiQueue, label: 'صف تحلیل', icon: Bot, routeKey: 'aiQueue' },
      { to: ROUTES.cases, label: 'پرونده‌ها', icon: Gavel, routeKey: 'cases' },
      { to: ROUTES.documents, label: 'اسناد', icon: FileText, routeKey: 'documents' },
    ],
  },
];

function menusForRole(role?: UserRole | null): MenuGroup[] {
  switch (role) {
    case 'expert':
      return expertMenu;
    case 'admin':
    case 'manager':
      return adminMenu;
    case 'partner':
      return partnerMenu;
    case 'ai_agent':
      return aiAgentMenu;
    default:
      return customerMenu;
  }
}

export const PlatformSidebar: React.FC<PlatformSidebarProps> = ({
  mobileOpen,
  onCloseMobile,
  caseCount,
  unreadNotifications,
}) => {
  const { user, isDemoMode } = useAuth();
  const menuGroups = menusForRole(user?.role);
  const requestBadge = getMockRequests().filter((r) => r.status === 'submitted').length;

  const getBadge = (key?: 'cases' | 'notif' | 'requests') => {
    if (key === 'cases' && caseCount > 0) return String(caseCount);
    if (key === 'notif' && unreadNotifications > 0) return String(unreadNotifications);
    if (key === 'requests' && requestBadge > 0) return String(requestBadge);
    return null;
  };

  const renderItem = (item: MenuItem) => {
    if (!canAccessRoute(user?.role, item.routeKey)) return null;

    const badge = getBadge(item.badgeKey);
    const comingSoon = item.showComingSoon && item.featureKey ? featureBadge(item.featureKey) : null;

    return (
      <NavLink
        key={item.to + item.label}
        to={item.to}
        onClick={onCloseMobile}
        className={({ isActive }) =>
          `flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-xs font-medium ${
            isActive
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`
        }
      >
        <item.icon className="w-4 h-4 shrink-0" />
        <span className="flex-1">{item.label}</span>
        {comingSoon && <Badge tone="amber" className="!text-[9px] !px-1">{comingSoon}</Badge>}
        {badge && (
          <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
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
        className={`fixed lg:static inset-y-0 right-0 z-50 w-64 bg-slate-900 text-slate-100 border-l border-slate-800 flex flex-col transform transition-transform lg:transform-none ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
          <span className="text-xs font-bold">منو</span>
          <button onClick={onCloseMobile} className="p-1" aria-label="بستن منو">
            <X className="w-5 h-5" />
          </button>
        </div>

        {user && (
          <div className="px-4 py-3 border-b border-slate-800">
            <p className="text-[10px] text-slate-500">نقش فعال</p>
            <p className="text-xs font-bold text-white">{ROLE_LABELS[user.role]}</p>
            {isDemoMode && <Badge tone="amber" className="mt-1">حالت نمایشی</Badge>}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {menuGroups.map((group) => {
            const visibleItems = group.items.filter((item) => canAccessRoute(user?.role, item.routeKey));
            if (visibleItems.length === 0) return null;
            return (
              <div key={group.title}>
                <p className="text-[10px] font-bold text-slate-500 px-3 mb-1.5 uppercase tracking-wide">
                  {group.title}
                </p>
                <div className="space-y-0.5">{group.items.map(renderItem)}</div>
              </div>
            );
          })}
        </nav>

        {/* Keep secondary links for subscription etc. only for non-ai */}
        {user?.role !== 'ai_agent' && user?.role !== 'customer' && user?.role !== 'expert' && (
          <div className="p-3 border-t border-slate-800 space-y-0.5">
            {[
              { to: ROUTES.subscription, label: 'اشتراک', icon: CreditCard, routeKey: 'subscription' as RouteKey },
              { to: ROUTES.billing, label: 'صورتحساب', icon: Receipt, routeKey: 'billing' as RouteKey },
              { to: ROUTES.contracts, label: 'قراردادها', icon: FileSignature, routeKey: 'contracts' as RouteKey },
            ].map((item) =>
              canAccessRoute(user?.role, item.routeKey) ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ) : null
            )}
          </div>
        )}
      </aside>
    </>
  );
};
