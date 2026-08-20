import React, { useState } from 'react';
import { Sparkles, Loader2, UserCheck, X, MapPin, Briefcase, BarChart2 } from 'lucide-react';
import { Badge, Button } from './ui';
import { MOCK_EXPERTS_FULL } from '../lib/mock/experts';
import { featureBadge } from '../config/features';
import { Link } from 'react-router-dom';

interface ExpertMatchingPanelProps {
  serviceTitle?: string;
  city?: string;
  compact?: boolean;
}

const REASONS = ['شهر', 'تخصص', 'بار کاری'];

export const ExpertMatchingPanel: React.FC<ExpertMatchingPanelProps> = ({
  serviceTitle = 'خدمت انتخاب‌شده',
  city = 'تهران',
  compact = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
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
        بر اساس نوع پرونده «{serviceTitle}» و شهر «{city}»، متخصصین زیر پیشنهاد می‌شوند.
      </p>
      <Button size="sm" onClick={runMatch} disabled={loading}>
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
        تحلیل و پیشنهاد متخصص
      </Button>

      {loading && (
        <div className="space-y-2 pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      )}

      {shown && (
        <div className="space-y-2 pt-2 border-t animate-in fade-in duration-300">
          {suggestions.map((e, i) => (
            <div
              key={e.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-xs"
            >
              <Link to={`/app/experts/${e.id}`} className="flex-1">
                <span className="font-bold text-blue-600 ml-1">#{i + 1}</span>
                {e.name} — {e.specialty}
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge tone="neutral"><MapPin className="w-2.5 h-2.5 inline ml-0.5" />{e.city}</Badge>
                  <Badge tone="blue"><Briefcase className="w-2.5 h-2.5 inline ml-0.5" />{e.specialty}</Badge>
                  <Badge tone="green"><BarChart2 className="w-2.5 h-2.5 inline ml-0.5" />{e.activeCases} پرونده</Badge>
                </div>
              </Link>
              <Badge tone="green">{(95 - i * 7)}٪ تطابق</Badge>
            </div>
          ))}
          <Button size="sm" variant="outline" className="w-full mt-2" onClick={() => setCompareOpen(true)}>
            مقایسه side-by-side
          </Button>
        </div>
      )}

      {compareOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border max-w-3xl w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold">مقایسه متخصصین</h3>
              <button type="button" onClick={() => setCompareOpen(false)} aria-label="بستن">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {suggestions.map((e, i) => (
                <div key={e.id} className="border rounded-lg p-3 space-y-2 text-xs">
                  <p className="font-bold">{e.name}</p>
                  <p className="text-slate-500">{e.specialty}</p>
                  <div className="space-y-1">
                    {REASONS.map((r) => (
                      <Badge key={r} tone="blue">{r}</Badge>
                    ))}
                  </div>
                  <p className="text-emerald-600 font-bold">{(95 - i * 7)}٪ تطابق</p>
                  <p className="text-slate-400">⭐ {e.rating} · {e.experienceYears} سال</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
