import React from 'react';

export const WorkflowDiagram: React.FC<{ highlightStatus?: string }> = ({ highlightStatus = 'waiting_docs' }) => {
  const steps = [
    'new',
    'waiting_docs',
    'under_review',
    'in_progress',
    'quality_control',
    'completed',
  ];
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex items-center gap-2 min-w-max">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div
              className={`px-3 py-2 rounded-lg border text-[10px] font-bold ${
                s === highlightStatus ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200' : 'border-slate-200 bg-white dark:bg-slate-900'
              }`}
            >
              {s}
            </div>
            {i < steps.length - 1 && <span className="text-slate-400">→</span>}
          </React.Fragment>
        ))}
      </div>
      <p className="text-[10px] text-amber-700 mt-3">
        ↺ مسیر بازگشت: waiting_docs ← under_review (مدارک ناقص)
      </p>
    </div>
  );
};
