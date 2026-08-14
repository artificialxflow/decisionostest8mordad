import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PlatformSidebar } from './PlatformSidebar';
import { PlatformNavbar } from './PlatformNavbar';
import { NewCaseModal } from '../NewCaseModal';
import { CaseItem, DocumentItem, AuditLog, AppNotification, Workspace } from '../../types';
import { apiUrl } from '../../lib/api';
import { ROUTES } from '../../routes';
import { useAuth } from '../../context/AuthContext';
import { normalizeCaseStatus } from '../../lib/labels';
import { USE_MOCK_DATA } from '../../lib/env';
import { getExtendedMockAuditLogs } from '../../lib/mock';

interface PlatformDataContextType {
  cases: CaseItem[];
  documents: DocumentItem[];
  auditLogs: AuditLog[];
  notifications: AppNotification[];
  workspaces: Workspace[];
  refresh: () => Promise<void>;
  openNewCase: () => void;
}

const PlatformDataContext = createContext<PlatformDataContextType | null>(null);

export function usePlatformData() {
  const ctx = useContext(PlatformDataContext);
  if (!ctx) throw new Error('usePlatformData must be used within PlatformLayout');
  return ctx;
}

export const PlatformLayout: React.FC = () => {
  const navigate = useNavigate();
  const { can } = useAuth();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [casesRes, logsRes, notifRes, wsRes] = await Promise.all([
        fetch(apiUrl('/cases')),
        fetch(apiUrl('/audit-logs')),
        fetch(apiUrl('/notifications')),
        fetch(apiUrl('/workspaces')),
      ]);

      if (casesRes.ok) {
        const fetchedCases: CaseItem[] = await casesRes.json();
        const normalized = fetchedCases.map((c) => ({
          ...c,
          status: normalizeCaseStatus(c.status),
        }));
        setCases(normalized);
        const allDocs: DocumentItem[] = [];
        for (const c of normalized) {
          const dRes = await fetch(apiUrl(`/cases/${c.id}/documents`));
          if (dRes.ok) allDocs.push(...(await dRes.json()));
        }
        setDocuments(allDocs);
      }
      if (logsRes.ok) {
        const apiLogs: AuditLog[] = await logsRes.json();
        const merged = USE_MOCK_DATA
          ? [...getExtendedMockAuditLogs(), ...apiLogs]
          : apiLogs;
        setAuditLogs(merged);
      }
      if (notifRes.ok) setNotifications(await notifRes.json());
      if (wsRes.ok) setWorkspaces(await wsRes.json());
    } catch (err) {
      console.error('Failed to connect to backend:', err);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleCreateCase = async (payload: unknown) => {
    if (!can('create_case')) {
      alert('شما مجوز ایجاد پرونده ندارید.');
      return;
    }
    try {
      const res = await fetch(apiUrl('/cases'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await refresh();
        navigate(ROUTES.cases);
      }
    } catch {
      alert('خطا در ایجاد پرونده جدید.');
    }
  };

  return (
    <PlatformDataContext.Provider
      value={{
        cases,
        documents,
        auditLogs,
        notifications,
        workspaces,
        refresh,
        openNewCase: () => setIsNewCaseOpen(true),
      }}
    >
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-vazirmatn antialiased">
        <PlatformNavbar
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />
        <div className="flex-1 flex overflow-hidden">
          <PlatformSidebar
            mobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
            caseCount={cases.length}
            unreadNotifications={notifications.filter((n) => !n.read).length}
          />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        </div>

        {can('create_case') && (
          <NewCaseModal
            isOpen={isNewCaseOpen}
            onClose={() => setIsNewCaseOpen(false)}
            onSubmit={handleCreateCase}
          />
        )}
      </div>
    </PlatformDataContext.Provider>
  );
};
