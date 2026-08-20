import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Badge } from '../components/ui';
import { ROUTES } from '../routes';
import { ArrowLeft, Users, FileCheck, UserCheck, CheckCircle, Archive, XCircle, Share2 } from 'lucide-react';
import { WorkflowDiagram } from '../components/WorkflowDiagram';

const WORKFLOWS = [
  {
    id: 1,
    title: 'ثبت درخواست → پرونده',
    desc: 'Customer خدمت را انتخاب و درخواست ثبت می‌کند → Manager اعلان دریافت می‌کند → Case و Workspace خودکار ساخته می‌شود.',
    roles: ['Customer', 'Manager', 'System'],
    icon: FileCheck,
  },
  {
    id: 2,
    title: 'بررسی مدارک (Document Loop)',
    desc: 'Manager مدارک را بررسی می‌کند → در صورت نقص، Case به waiting_docs می‌رود → Customer مجدداً آپلود می‌کند.',
    roles: ['Manager', 'Customer'],
    icon: FileCheck,
    link: ROUTES.documents,
  },
  {
    id: 3,
    title: 'تخصیص Expert',
    desc: 'Manager کارشناس مناسب را assign می‌کند → Expert و Customer اعلان دریافت می‌کنند.',
    roles: ['Manager', 'Expert'],
    icon: UserCheck,
  },
  {
    id: 4,
    title: 'اجرای کار',
    desc: 'Expert Tasks را انجام می‌دهد → وضعیت in_progress → هماهنگی با Customer در صورت نیاز.',
    roles: ['Expert', 'Customer'],
    icon: Users,
  },
  {
    id: 5,
    title: 'کنترل کیفیت (QC)',
    desc: 'Manager خروجی را QC می‌کند → quality_control gate → تأیید یا بازگشت به Expert.',
    roles: ['Manager', 'Expert'],
    icon: CheckCircle,
  },
  {
    id: 6,
    title: 'تکمیل / بایگانی',
    desc: 'پرونده completed → archived. Timeline و Audit ثبت می‌شود.',
    roles: ['Manager', 'System'],
    icon: Archive,
  },
  {
    id: 7,
    title: 'ارجاع متخصص خارجی',
    desc: 'Customer از Expert Marketplace متخصص انتخاب می‌کند → AI matching (آینده) پیشنهاد می‌دهد.',
    roles: ['Customer', 'Expert'],
    icon: Share2,
    link: ROUTES.experts,
  },
  {
    id: 8,
    title: 'لغo پرونده',
    desc: 'cancelled با ثبت دلیل در Audit Log.',
    roles: ['Manager', 'Admin'],
    icon: XCircle,
  },
];

export const WorkflowsDocPage: React.FC = () => (
  <div className="space-y-5">
    <PageHeader
      title="Workflowها"
      description="تعریف گردش‌کارهای پیشنهادی — بدون engine (فقط مستندسازی UI)"
      badge={<Badge tone="blue">طراحی engine در Sprint Backend</Badge>}
    />

    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-xs text-amber-900 dark:text-amber-200">
      طبق دستور کارفرما: فعلاً Workflow طراحی نمی‌شود. این صفحه مشخص می‌کند چه workflowهایی در Backend تعریف خواهند شد.
    </div>

    <div className="bg-white dark:bg-slate-900 border rounded-lg p-5">
      <p className="text-xs font-bold mb-3">فلو بصری (نمونه waiting_docs)</p>
      <WorkflowDiagram highlightStatus="waiting_docs" />
    </div>

    <div className="bg-white dark:bg-slate-900 border rounded-lg p-5 font-mono text-[10px] text-slate-600 dark:text-slate-400 overflow-x-auto">
      <pre>{`Customer ──submit──▶ Request ──auto──▶ Case + Workspace
                              │
                              ▼
Manager ──review docs──▶ [complete?] ──no──▶ waiting_docs ──▶ Customer re-upload
                              │ yes
                              ▼
                         assign Expert ──▶ Tasks ──▶ QC ──▶ completed`}</pre>
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
      {WORKFLOWS.map((wf) => (
        <div key={wf.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="flex items-center gap-2">
            <wf.icon className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-black text-slate-400">#{wf.id}</span>
            <h3 className="text-sm font-bold flex-1">{wf.title}</h3>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{wf.desc}</p>
          <div className="flex flex-wrap gap-1">
            {wf.roles.map((r) => (
              <Badge key={r} tone="neutral">{r}</Badge>
            ))}
          </div>
          {wf.link && (
            <Link to={wf.link} className="text-[11px] text-blue-600 font-bold inline-flex items-center gap-1">
              مشاهده UI مرتبط
              <ArrowLeft className="w-3 h-3" />
            </Link>
          )}
        </div>
      ))}
    </div>
  </div>
);
