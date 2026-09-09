import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Badge, Button } from './ui';
import { Check } from 'lucide-react';

const STEPS = [
  { id: 'rephrase', label: 'Rephrase Query', desc: 'بازنویسی پرسش کاربر' },
  { id: 'retrieve', label: 'Retrieve Evidence', desc: 'بازیابی شواهد از KB' },
  { id: 'context', label: 'Case Context', desc: 'ترکیب با رکورد پرونده' },
  { id: 'answer', label: 'Generate Answer', desc: 'پاسخ با استناد' },
  { id: 'sources', label: 'Show Sources', desc: 'نمایش منابع و confidence' },
];

const MOCK_SOURCES = [
  { title: 'قانون مدنی — ماده ۲۲۰', page: 12, chunkId: 'chk-44', confidence: 0.91 },
  { title: 'قرارداد مشارکت.pdf', page: 3, chunkId: 'chk-08', confidence: 0.84 },
  { title: 'آیین‌نامه ثبت', page: 5, chunkId: 'chk-21', confidence: 0.77 },
];

export const RagPipelineDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const run = () => {
    setRunning(true);
    setStep(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= STEPS.length) {
        clearInterval(t);
        setRunning(false);
      }
    }, 550);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
      <div className="px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2 bg-gradient-to-l from-violet-50 to-white dark:from-violet-950/30 dark:to-slate-900">
        <div>
          <p className="text-xs font-bold">جریان RAG نمایشی</p>
          <p className="text-[10px] text-slate-500">Frontend only — Vector DB not connected</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="amber">RAG demo</Badge>
          <Button size="sm" onClick={run} disabled={running}>
            {running ? 'در حال اجرا…' : 'اجرای دمو'}
          </Button>
        </div>
      </div>

      <div className="p-4 flex flex-wrap gap-2">
        {STEPS.map((s, i) => {
          const done = step > i;
          const current = step === i && running;
          return (
            <motion.div
              key={s.id}
              animate={{ scale: current ? 1.03 : 1 }}
              className={`flex-1 min-w-[120px] p-3 rounded-lg border text-center ${
                done
                  ? 'border-teal-300 bg-teal-50 dark:bg-teal-950/30'
                  : current
                    ? 'border-violet-400 bg-violet-50 dark:bg-violet-950/30'
                    : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex justify-center mb-1">
                {done ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <span className="text-[10px] font-bold text-slate-400">{i + 1}</span>}
              </div>
              <p className="text-[10px] font-bold">{s.label}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {step >= STEPS.length && (
        <div className="px-4 pb-4 space-y-2">
          <p className="text-xs leading-6 text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 rounded-lg p-3 border">
            بر اساس شواهد بازیابی‌شده، تعهدات طرفین در قرارداد قابل استناد است و ریسک فسخ در صورت تأخیر بالا ارزیابی می‌شود.
          </p>
          <p className="text-[10px] font-bold text-slate-500">Evidence & Citation</p>
          <div className="space-y-1.5">
            {MOCK_SOURCES.map((s) => (
              <div
                key={s.chunkId}
                className="flex flex-wrap justify-between gap-2 text-[10px] p-2 rounded-lg border bg-white dark:bg-slate-900"
              >
                <span>
                  {s.title} · ص {s.page} · <span className="font-mono">{s.chunkId}</span>
                </span>
                <Badge tone="green">{Math.round(s.confidence * 100)}٪</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
