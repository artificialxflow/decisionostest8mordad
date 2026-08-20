import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Gavel, Briefcase, FileText, Sparkles, UserCheck } from 'lucide-react';
import { usePlatformData } from './layout/PlatformLayout';
import { getMockServices, getMockExperts } from '../lib/mock';
import { semanticSearch } from '../lib/mock/semanticSearch';
import { ROUTES } from '../routes';
import { Badge } from './ui';

type SearchType = 'all' | 'case' | 'document' | 'service' | 'expert';

const RECENT_KEY = 'decisionos-recent-searches';

function loadRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRecent(q: string) {
  const trimmed = q.trim();
  if (!trimmed) return;
  const list = [trimmed, ...loadRecent().filter((s) => s !== trimmed)].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
}

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-amber-200 dark:bg-amber-900 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export const GlobalSearch: React.FC = () => {
  const { cases, documents } = usePlatformData();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [semantic, setSemantic] = useState(false);
  const [typeFilter, setTypeFilter] = useState<SearchType>('all');
  const [recent, setRecent] = useState<string[]>(() => loadRecent());
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const services = getMockServices();
  const experts = getMockExperts();

  const q = query.trim().toLowerCase();

  const caseResults = q && (typeFilter === 'all' || typeFilter === 'case')
    ? cases.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.caseNumber.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  const serviceResults = q && (typeFilter === 'all' || typeFilter === 'service')
    ? services.filter(
        (s) =>
          s.title.includes(q) ||
          s.description.includes(q)
      ).slice(0, 5)
    : [];

  const docResults = q && (typeFilter === 'all' || typeFilter === 'document')
    ? documents.filter((d) => d.title.toLowerCase().includes(q)).slice(0, 5)
    : [];

  const expertResults = q && (typeFilter === 'all' || typeFilter === 'expert')
    ? experts.filter((e) => e.name.includes(q) || e.specialty.includes(q)).slice(0, 5)
    : [];

  const semanticResults = semantic && q ? semanticSearch(query) : [];

  const hasResults =
    caseResults.length +
    serviceResults.length +
    docResults.length +
    expertResults.length +
    semanticResults.length >
    0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (path: string) => {
    saveRecent(query);
    setRecent(loadRecent());
    navigate(path);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={ref} className="relative w-full">
      <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        placeholder="جستجو... (Ctrl+K)"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full bg-slate-100 dark:bg-slate-800 text-xs rounded-md pr-9 pl-3 py-1.5 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden"
      />

      {open && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto text-right">
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 items-center">
            <button
              type="button"
              onClick={() => setSemantic(!semantic)}
              className={`text-[10px] px-2 py-1 rounded flex items-center gap-1 ${semantic ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
            >
              <Sparkles className="w-3 h-3" />
              جستجوی معنایی
            </button>
            {(['all', 'case', 'document', 'service', 'expert'] as SearchType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`text-[10px] px-2 py-1 rounded ${typeFilter === t ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                {t === 'all' ? 'همه' : t === 'case' ? 'پرونده' : t === 'document' ? 'سند' : t === 'service' ? 'خدمت' : 'کارشناس'}
              </button>
            ))}
          </div>

          {!q && recent.length > 0 && (
            <div className="p-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 px-2 mb-1">جستجوهای اخیر</p>
              {recent.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setQuery(r)}
                  className="w-full text-right px-2 py-1 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 rounded"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {q && !hasResults && (
            <p className="text-xs text-slate-500 p-4 text-center">نتیجه‌ای یافت نشد</p>
          )}

          {semantic && semanticResults.length > 0 && (
            <div className="p-2 border-b border-violet-100 dark:border-violet-900/50 bg-violet-50/30 dark:bg-violet-950/20">
              <p className="text-[10px] font-bold text-violet-600 px-2 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> نتایج معنایی
              </p>
              {semanticResults.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() =>
                    go(
                      r.type === 'case'
                        ? `${ROUTES.cases}/${r.id}`
                        : r.type === 'document'
                          ? ROUTES.documents
                          : ROUTES.appServices
                    )
                  }
                  className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-white/60 dark:hover:bg-slate-800 rounded text-xs text-right"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="truncate block font-semibold">{r.title}</span>
                    <span className="text-[10px] text-slate-500 truncate block">{r.snippet}</span>
                  </div>
                  <Badge tone="blue">{Math.round(r.score * 100)}%</Badge>
                </button>
              ))}
            </div>
          )}

          {caseResults.length > 0 && (
            <div className="p-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 px-2 mb-1">پرونده‌ها</p>
              {caseResults.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => go(`${ROUTES.cases}/${c.id}`)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs"
                >
                  <Gavel className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{highlight(c.title, query)}</span>
                </button>
              ))}
            </div>
          )}

          {serviceResults.length > 0 && (
            <div className="p-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 px-2 mb-1">خدمات</p>
              {serviceResults.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(ROUTES.appServices)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs"
                >
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{highlight(s.title, query)}</span>
                </button>
              ))}
            </div>
          )}

          {docResults.length > 0 && (
            <div className="p-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 px-2 mb-1">اسناد</p>
              {docResults.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => go(ROUTES.documents)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{highlight(d.title, query)}</span>
                </button>
              ))}
            </div>
          )}

          {expertResults.length > 0 && (
            <div className="p-2">
              <p className="text-[10px] font-bold text-slate-400 px-2 mb-1">کارشناسان</p>
              {expertResults.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => go(`${ROUTES.experts}/${e.id}`)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs"
                >
                  <UserCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate">{highlight(`${e.name} — ${e.specialty}`, query)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
