import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileEdit, Check, X, RotateCcw } from 'lucide-react';
import { PageHeader, Badge, Button } from '../components/ui';
import { getDraftReview, updateDraftReview } from '../lib/mock/drafts';
import { ROUTES } from '../routes';
import { useAuth } from '../context/AuthContext';

export const DraftReviewPage: React.FC = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { can } = useAuth();
  const draft = caseId ? getDraftReview(caseId) : null;
  const [expertText, setExpertText] = useState(draft?.expertEdit ?? draft?.aiDraft ?? '');

  if (!caseId || !draft) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        پیش‌نویس یافت نشد.{' '}
        <button type="button" className="text-blue-600" onClick={() => navigate(ROUTES.cases)}>
          بازگشت
        </button>
      </div>
    );
  }

  const setStatus = (status: typeof draft.status) => {
    updateDraftReview(caseId, { expertEdit: expertText, status });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="بازبینی Draft"
        description={draft.title}
        badge={<Badge tone="blue">Human-in-the-loop</Badge>}
      />
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg bg-violet-50/30 dark:bg-violet-950/20">
          <h3 className="text-xs font-bold mb-2">پیش‌نویس AI</h3>
          <pre className="text-xs whitespace-pre-wrap font-vazirmatn leading-relaxed">{draft.aiDraft}</pre>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-xs font-bold mb-2 flex items-center gap-1">
            <FileEdit className="w-3.5 h-3.5" /> ویرایش کارشناس
          </h3>
          <textarea
            value={expertText}
            onChange={(e) => setExpertText(e.target.value)}
            className="w-full min-h-[200px] border rounded-md p-3 text-xs"
            disabled={!can('edit_case')}
          />
        </div>
      </div>
      {can('change_case_status') && (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => setStatus('approved')}>
            <Check className="w-3.5 h-3.5" /> تأیید QC
          </Button>
          <Button size="sm" variant="outline" onClick={() => setStatus('revision')}>
            <RotateCcw className="w-3.5 h-3.5" /> بازبینی
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setStatus('rejected')}>
            <X className="w-3.5 h-3.5" /> رد
          </Button>
          {can('view_admin') && <Badge tone="amber" className="mr-auto">QC Gate — Manager</Badge>}
        </div>
      )}
      <Badge tone={draft.status === 'approved' ? 'green' : draft.status === 'rejected' ? 'rose' : 'amber'}>
        وضعیت: {draft.status}
      </Badge>
    </div>
  );
};
