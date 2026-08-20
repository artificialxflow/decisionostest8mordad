import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlatformData } from '../components/layout/PlatformLayout';
import { CaseListView } from '../components/CaseListView';
import { CaseDetailView } from '../components/CaseDetailView';
import { DocumentCenterView } from '../components/DocumentCenterView';
import { AuditLogsView } from '../components/AuditLogsView';
import { PricingView } from '../components/PricingView';
import { AboutView } from '../components/AboutView';
import { FeaturePage } from './PlaceholderPages';
import { AiChatPanel } from '../components/AiChatPanel';
import { apiUrl } from '../lib/api';
import { ROUTES } from '../routes';
import { PageHeader, Badge, Button } from '../components/ui';
import { Scale, Target, Eye, Heart, Users, Bot, MessageSquare, Sparkles } from 'lucide-react';

export const CasesPage: React.FC = () => {
  const { cases, refresh, openNewCase } = usePlatformData();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این پرونده اطمینان دارید؟')) return;
    const res = await fetch(apiUrl(`/cases/${id}`), { method: 'DELETE' });
    if (res.ok) refresh();
  };

  return (
    <CaseListView
      cases={cases}
      onSelectCase={(id) => navigate(`/app/cases/${id}`)}
      onDeleteCase={handleDelete}
      onOpenNewCaseModal={openNewCase}
    />
  );
};

export const CaseDetailPage: React.FC<{ caseId: string }> = ({ caseId }) => {
  const navigate = useNavigate();
  return (
    <CaseDetailView
      caseId={caseId}
      onBack={() => navigate(ROUTES.cases)}
      onGoToChatWithCase={(id) => navigate(`${ROUTES.chat}?caseId=${id}`)}
    />
  );
};

export const DocumentsPage: React.FC = () => {
  const { documents, cases, refresh } = usePlatformData();
  const navigate = useNavigate();

  const handleDelete = async (docId: string) => {
    if (!confirm('آیا از حذف این سند اطمینان دارید؟')) return;
    const res = await fetch(apiUrl(`/documents/${docId}`), { method: 'DELETE' });
    if (res.ok) refresh();
  };

  const handleUpload = async (caseId: string, title: string) => {
    await fetch(apiUrl(`/cases/${caseId}/documents`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category: 'other', fileType: 'PDF', fileSize: '—' }),
    });
    await refresh();
  };

  return (
    <DocumentCenterView
      documents={documents}
      cases={cases}
      onSelectCase={(id) => navigate(`/app/cases/${id}`)}
      onDeleteDocument={handleDelete}
      onUploadDocument={handleUpload}
    />
  );
};

export const ChatPage: React.FC = () => (
  <FeaturePage
    title="چت AI"
    description="دستیار هوشمند پرونده، اسناد و سؤالات حقوقی"
    purpose="چت AI به مشتری و کارشناس کمک می‌کند سؤالات پرونده را بپرسد. پاسخ‌ها نمایشی هستند — Sprint Backend به RAG واقعی متصل می‌شود."
    featureKey="chat"
    demoUI
  >
    <AiChatPanel />
  </FeaturePage>
);

export const AuditPage: React.FC = () => {
  const { auditLogs } = usePlatformData();
  return <AuditLogsView logs={auditLogs} />;
};

export const PricingPage: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 py-10">
    <PricingView />
  </div>
);

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
    <AboutView />
    <div className="grid sm:grid-cols-2 gap-4">
      {[
        { icon: Target, title: 'Mission', text: 'تسریع و شفاف‌سازی تصمیم‌گیری حقوقی و سازمانی با Workspace و AI.' },
        { icon: Eye, title: 'Vision', text: 'پلتفرم مرجع مدیریت پرونده و دانش تخصصی در ایران.' },
        { icon: Heart, title: 'Values', text: 'دقت، امنیت، مسئولیت‌پذیری و قابل‌اعتماد بودن.' },
        { icon: Users, title: 'تیم', text: 'وکلا، کارشناسان ثبت، محصول و هوش مصنوعی.' },
      ].map((item) => (
        <div key={item.title} className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <item.icon className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-bold">{item.title}</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
    <div className="space-y-3">
      <PageHeader title="داستان شرکت" description="از ابزار پرونده تا پلتفرم DecisionOS" badge={<Badge tone="blue"><Scale className="w-3 h-3" /></Badge>} />
      <p className="text-xs text-slate-500 leading-relaxed">
        DecisionOS با هدف تبدیل دانش پراکنده حقوقی به محیط کاری یکپارچه شکل گرفت. امروز تمرکز ما روی Workspace،
        مدل پرونده مقیاس‌پذیر و پایه‌ای است که خدمات تخصصی و AI روی آن سوار شوند.
      </p>
    </div>
  </div>
);
