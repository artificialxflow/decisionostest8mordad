import React, { useState } from 'react';
import { Check, GitCompareArrows, Layers, Pencil, X } from 'lucide-react';
import { Badge, Button } from './ui';
import {
  getServiceRecordByCase,
  SEED_PROPERTY_CANDIDATES,
  MOCK_EXTRACTED_FACTS,
  acceptExtractedFactToRecord,
  updateServiceRecordData,
  getServiceById,
  getFormSchemaForService,
} from '../lib/mock';
import { CaseItem, StructuredFieldValue } from '../types';
import { ServiceFormRenderer } from './ServiceFormRenderer';

interface Props {
  caseItem: CaseItem;
}

export const ServiceRecordPanel: React.FC<Props> = ({ caseItem }) => {
  const [tick, setTick] = useState(0);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string | number | string[] | null>>({});
  const record = getServiceRecordByCase(caseItem.id) ?? getServiceRecordByCase('case-101');
  const entry = record ? getServiceById(record.serviceTypeId) : undefined;
  const schema = record ? getFormSchemaForService(record.serviceTypeId) : undefined;
  const isInvestment = record?.serviceTypeId === 'PROPERTY_INVESTMENT';
  const candidates = caseItem.propertyCandidates?.length
    ? caseItem.propertyCandidates
    : isInvestment
      ? SEED_PROPERTY_CANDIDATES
      : [];

  const acceptFact = (fact: StructuredFieldValue) => {
    acceptExtractedFactToRecord(record?.caseId ?? caseItem.id, fact);
    setTick((t) => t + 1);
  };

  const startEdit = () => {
    if (!record) return;
    setDraft({ ...record.data });
    setEditing(true);
  };

  const saveEdit = () => {
    if (!record) return;
    updateServiceRecordData(record.caseId, draft);
    setEditing(false);
    setTick((t) => t + 1);
  };

  if (!record) {
    return (
      <div className="p-4 rounded-xl border border-dashed text-xs text-slate-500">
        رکورد تخصصی برای این پرونده هنوز ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="space-y-4" key={tick}>
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-700" />
          <p className="text-sm font-black">رکورد تخصصی خدمت</p>
          <Badge tone="blue">{entry?.name ?? record.serviceTypeId}</Badge>
          <Badge tone="neutral">{record.version}</Badge>
        </div>
        <div className="flex items-center gap-2">
          {!editing ? (
            <Button size="sm" variant="outline" onClick={startEdit}>
              <Pencil className="w-3 h-3" />
              ویرایش mock
            </Button>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
                <X className="w-3 h-3" />
                انصراف
              </Button>
              <Button size="sm" onClick={saveEdit}>
                ذخیره
              </Button>
            </>
          )}
          <p className="text-[10px] font-mono text-slate-400">{record.recordId}</p>
        </div>
      </div>

      {entry && (
        <div className="flex flex-wrap gap-1">
          {entry.caseSchemaSections.map((s) => (
            <span key={s} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600">
              {s}
            </span>
          ))}
        </div>
      )}

      {editing && schema ? (
        <ServiceFormRenderer schema={schema} values={draft} onChange={setDraft} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-2">
          {(record.structuredFields ??
            Object.entries(record.data).map(([fieldId, value]) => ({
              fieldId,
              value,
              kind: 'fact' as const,
              sources: [{ kind: 'user' as const, label: 'فرم' }],
            }))).map((f) => (
            <div
              key={f.fieldId}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="flex justify-between gap-2 mb-1">
                <span className="text-[10px] text-slate-500 font-mono">{f.fieldId}</span>
                <Badge tone={f.kind === 'preference' ? 'amber' : 'blue'}>
                  {f.kind === 'preference' ? 'ترجیح' : 'قطعی'}
                </Badge>
              </div>
              <p className="text-xs font-bold">
                {Array.isArray(f.value) ? f.value.join('، ') : String(f.value ?? '—')}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {f.sources?.map((s, i) => (
                  <span
                    key={i}
                    className="text-[9px] text-slate-500 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded"
                  >
                    {s.label}
                    {s.page != null ? ` · ص ${s.page}` : ''}
                    {s.chunkId ? ` · ${s.chunkId}` : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isInvestment && !editing && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GitCompareArrows className="w-4 h-4 text-teal-700" />
            <p className="text-xs font-bold">نیازمندی‌ها در برابر گزینه‌های ملک (Matching نمایشی)</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {candidates.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl border bg-gradient-to-bl from-teal-50/50 to-white dark:from-teal-950/20 dark:to-slate-900"
              >
                <div className="flex justify-between gap-2">
                  <p className="text-xs font-bold">{c.title}</p>
                  <Badge tone="green">{c.matchScore}٪</Badge>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  {c.areaSqm}م² · {c.rooms} خواب · {c.ageYears} سال · {c.price} میلیارد
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{c.address}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!editing && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-3 py-2 border-b bg-slate-50 dark:bg-slate-950 text-xs font-bold">
            استخراج ساختاریافته از سند → Accept به Record
          </div>
          <div className="divide-y">
            {MOCK_EXTRACTED_FACTS.map((fact) => (
              <div key={fact.fieldId} className="p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <p className="font-bold">
                    {fact.fieldId} = {String(fact.value)}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {fact.sources.map((s) => `${s.label}${s.page ? ` ص${s.page}` : ''}`).join(' · ')} · confidence:{' '}
                    {fact.confidence}
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => acceptFact(fact)}>
                  <Check className="w-3 h-3" />
                  ثبت در Record
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {entry && (
        <div className="text-[10px] text-slate-500 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border">
          قابلیت‌های AI این خدمت (فقط‌خواندنی): {entry.aiCapabilities.join(' · ')}
        </div>
      )}
    </div>
  );
};
