import React from 'react';
import { Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui';
import { getDefaultAiAnalysis } from '../lib/mock/aiAnalysis';
import { DocumentAnalysisStatus } from '../types';

const STATUS_LABELS: Record<DocumentAnalysisStatus, string> = {
  analysis_complete: 'تحلیل کامل',
  analysis_incomplete: 'تحلیل ناقص',
  needs_clarification: 'نیاز به توضیح',
  mismatch: 'عدم تطابق',
};

interface AiAnalysisPanelProps {
  caseId: string;
}

export const AiAnalysisPanel: React.FC<AiAnalysisPanelProps> = ({ caseId }) => {
  const analysis = getDefaultAiAnalysis(caseId);

  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-violet-600" />
        <h3 className="font-bold">تحلیل هوشمند</h3>
        <Badge tone="blue">{STATUS_LABELS[analysis.documentStatus]}</Badge>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg border">
          <p className="text-slate-500 text-[10px]">امتیاز ریسک</p>
          <p className="text-2xl font-black text-orange-600">{analysis.riskScore}</p>
        </div>
        <div className="p-3 rounded-lg border sm:col-span-2">
          <p className="text-slate-500 text-[10px] mb-1">مفاهیم کلیدی</p>
          <div className="flex flex-wrap gap-1">
            {analysis.entities.map((e) => (
              <Badge key={e} tone="blue">
                {e}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="font-bold mb-2 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" /> اقدامات پیشنهادی
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          {analysis.suggestedActions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-bold mb-2">مراحل تحلیل</p>
        <div className="space-y-2">
          {analysis.steps.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              {s.done ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <span className="w-4 h-4 rounded-full border-2 border-slate-300" />
              )}
              <span className={s.done ? 'text-slate-600' : 'text-slate-400'}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
