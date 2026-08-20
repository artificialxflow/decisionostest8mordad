import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Button } from './ui';
import { submitSatisfaction } from '../lib/mock/satisfaction';

interface SatisfactionSurveyModalProps {
  caseId: string;
  caseTitle: string;
  open: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

export const SatisfactionSurveyModal: React.FC<SatisfactionSurveyModalProps> = ({
  caseId,
  caseTitle,
  open,
  onClose,
  onSubmitted,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!open) return null;

  const submit = () => {
    if (rating < 1) return;
    submitSatisfaction(caseId, rating, comment || undefined);
    onSubmitted?.();
    onClose();
    setRating(0);
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-xl max-w-md w-full p-5 space-y-4 text-right">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold">نظرسنجی رضایت</h3>
          <button type="button" onClick={onClose} aria-label="بستن">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-500">{caseTitle}</p>
        <div className="flex gap-1 justify-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setRating(n)} className="p-1">
              <Star className={`w-8 h-8 ${n <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="نظر شما (اختیاری)"
          className="w-full border rounded-md p-2 text-xs min-h-[80px]"
        />
        <Button onClick={submit} disabled={rating < 1} className="w-full">
          ثبت نظر
        </Button>
      </div>
    </div>
  );
};
