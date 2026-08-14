import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Gavel, Briefcase, FileText } from 'lucide-react';
import { usePlatformData } from './layout/PlatformLayout';
import { getMockServices } from '../lib/mock';
import { ROUTES } from '../routes';

export const GlobalSearch: React.FC = () => {
  const { cases, documents } = usePlatformData();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const services = getMockServices();

  const q = query.trim().toLowerCase();

  const caseResults = q
    ? cases.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.caseNumber.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  const serviceResults = q
    ? services.filter(
        (s) =>
          s.title.includes(q) ||
          s.description.includes(q)
      ).slice(0, 5)
    : [];

  const docResults = q
    ? documents.filter((d) => d.title.toLowerCase().includes(q)).slice(0, 5)
    : [];

  const hasResults = caseResults.length + serviceResults.length + docResults.length > 0;

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

      {open && q && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto text-right">
          {!hasResults ? (
            <p className="text-xs text-slate-500 p-4 text-center">نتیجه‌ای یافت نشد</p>
          ) : (
            <>
              {caseResults.length > 0 && (
                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 px-2 mb-1">پرونده‌ها</p>
                  {caseResults.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        navigate(`${ROUTES.cases}/${c.id}`);
                        setOpen(false);
                        setQuery('');
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs"
                    >
                      <Gavel className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{c.title}</span>
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
                      onClick={() => {
                        navigate(ROUTES.appServices);
                        setOpen(false);
                        setQuery('');
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              )}
              {docResults.length > 0 && (
                <div className="p-2">
                  <p className="text-[10px] font-bold text-slate-400 px-2 mb-1">اسناد</p>
                  {docResults.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        navigate(ROUTES.documents);
                        setOpen(false);
                        setQuery('');
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{d.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
