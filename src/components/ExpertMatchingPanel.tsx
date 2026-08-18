import React, { useState } from 'react';
import { Sparkles, Loader2, UserCheck } from 'lucide-react';
import { Badge, Button } from './ui';
import { MOCK_EXPERTS_FULL } from '../lib/mock/experts';
import { featureBadge } from '../config/features';
import { Link } from 'react-router-dom';

interface ExpertMatchingPanelProps {
  serviceTitle?: string;
  city?: string;
  compact?: boolean;
}

export const ExpertMatchingPanel: React.FC<ExpertMatchingPanelProps> = ({
  serviceTitle = 'خدمت انتخاب‌شده',
  city = 'تهران',
  compact = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const aiBadge = featureBadge('aiAnalysis');

  const suggestions = MOCK_EXPERTS_FULL.filter((e) => e.status === 'active' && e.availability === 'available').slice(0, 3);

  const runMatch = () => {
    setLoading(true);
    setShown(false);
    setTimeout(() => {
      setLoading(false);
      setShown(true);
    }, 1200);
  };

  return (
    <div className={`rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${compact ? 'p-3' : 'p-5'} space-y-3`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          پیشنهاد متخصص
        </h3>
        {aiBadge && <Badge tone="amber">{aiBadge}</Badge>}
      </div>
      <p className="text-[11px] text-slate-500">
        بر اساس نوع پرونده «{serviceTitle}» و شهر «{city}»، متخصصین زیر پیشنهاد می‌شوند (تحلیل هوشمند — به‌زودی).
      </p>
      <Button size="sm" onClick={runMatch} disabled={loading}>
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
        تحلیل و پیشنهاد متخصص
      </Button>
      {shown && (
        <div className="space-y-2 pt-2 border-t">
          {suggestions.map((e, i) => (
            <Link
              key={e.id}
              to={`/app/experts/${e.id}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-xs"
            >
              <span>
                <span className="font-bold text-blue-600 ml-1">#{i + 1}</span>
                {e.name} — {e.specialty}
              </span>
              <Badge tone="green">{(95 - i * 7)}٪ تطابق</Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
