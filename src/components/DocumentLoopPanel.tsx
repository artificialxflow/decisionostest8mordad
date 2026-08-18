import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Upload, FileWarning } from 'lucide-react';
import { Badge, Button } from './ui';
import { useAuth } from '../context/AuthContext';
import {
  DocumentLoopState,
  getDocumentLoopState,
  getDocumentProgress,
  approveDocuments,
  requestDocumentCompletion,
  updateDocumentLoopState,
} from '../lib/mock/documentLoop';
import { DOCUMENT_STATUS_LABELS, CASE_STATUS_LABELS } from '../lib/labels';
import { DocumentStatus } from '../types';

interface DocumentLoopPanelProps {
  caseId?: string;
  onStatusChange?: (status: string) => void;
}

const STATUS_TONE: Record<DocumentStatus, 'green' | 'amber' | 'blue'> = {
  ready: 'green',
  incomplete: 'amber',
  needs_clarification: 'blue',
};

export const DocumentLoopPanel: React.FC<DocumentLoopPanelProps> = ({ caseId, onStatusChange }) => {
  const { can, user } = useAuth();
  const [state, setState] = useState<DocumentLoopState>(() => getDocumentLoopState(caseId));
  const progress = getDocumentProgress(state.checklist);
  const isWaiting = state.caseStatus === 'waiting_docs';
  const isManager = can('change_case_status') && user?.role !== 'customer';

  const refresh = (next: DocumentLoopState) => {
    setState(next);
    onStatusChange?.(next.caseStatus);
  };

  const handleApprove = () => {
    refresh(approveDocuments(state.caseId));
  };

  const handleRequestCompletion = () => {
    const missing = state.checklist.filter((c) => !c.uploaded || c.docStatus !== 'ready').map((c) => c.name);
    refresh(requestDocumentCompletion(state.caseId, missing, 'لطفاً مدارک ناقص را تکمیل کنید.'));
  };

  const handleReupload = (itemName: string) => {
    const checklist = state.checklist.map((c) =>
      c.name === itemName ? { ...c, uploaded: true, docStatus: 'ready' as DocumentStatus } : c
    );
    const missing = checklist.filter((c) => c.required && (!c.uploaded || c.docStatus !== 'ready')).map((c) => c.name);
    const nextStatus = missing.length === 0 ? 'under_review' : 'waiting_docs';
    refresh(
      updateDocumentLoopState({
        checklist,
        missingItems: missing,
        caseStatus: nextStatus,
        managerNote: missing.length ? state.managerNote : undefined,
      })
    );
  };

  return (
    <div className="space-y-4">
      {isWaiting && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold text-amber-900 dark:text-amber-200">مدارک ناقص — پرونده متوقف شده</p>
            <p className="text-amber-800 dark:text-amber-300 mt-1">{state.managerNote}</p>
            {state.missingItems.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-amber-700 dark:text-amber-400">
                {state.missingItems.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            )}
            {user?.role === 'customer' && (
              <Button size="sm" className="mt-3" onClick={() => state.missingItems[0] && handleReupload(state.missingItems[0])}>
                <Upload className="w-3 h-3" /> ارسال مجدد (mock)
              </Button>
            )}
          </div>
          <Badge tone="amber">{CASE_STATUS_LABELS.waiting_docs}</Badge>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold flex items-center gap-2">
            <FileWarning className="w-4 h-4 text-blue-600" />
            چک‌لیست مدارک
          </h3>
          <span className="text-[10px] font-bold text-slate-500">{progress}٪ تکمیل</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <ul className="space-y-2">
          {state.checklist.map((item) => (
            <li key={item.name} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
              <span className={item.uploaded ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}>
                {item.uploaded ? <CheckCircle className="w-3.5 h-3.5 inline text-emerald-500 ml-1" /> : '○ '}
                {item.name}
                {item.required && <span className="text-red-500 mr-1">*</span>}
              </span>
              {item.docStatus && (
                <Badge tone={STATUS_TONE[item.docStatus]}>{DOCUMENT_STATUS_LABELS[item.docStatus]}</Badge>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isManager && (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={handleApprove}>
            <CheckCircle className="w-3.5 h-3.5" /> تأیید کامل بودن مدارک
          </Button>
          <Button size="sm" variant="outline" onClick={handleRequestCompletion}>
            درخواست تکمیل مدارک
          </Button>
        </div>
      )}
    </div>
  );
};

export const CaseStatusBar: React.FC<{ currentStatus: string }> = ({ currentStatus }) => {
  const steps = ['new', 'waiting_docs', 'under_review', 'in_progress', 'quality_control', 'completed'] as const;
  const idx = steps.indexOf(currentStatus as (typeof steps)[number]);

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div
            className={`shrink-0 px-2 py-1 rounded text-[10px] font-bold ${
              i <= idx ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}
          >
            {CASE_STATUS_LABELS[s]}
          </div>
          {i < steps.length - 1 && <div className="w-3 h-0.5 bg-slate-200 shrink-0" />}
        </React.Fragment>
      ))}
    </div>
  );
};
