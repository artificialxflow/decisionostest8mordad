import React from 'react';
import { FormSchemaDef, FieldValueKind } from '../types';
import { Badge } from './ui';

type FormValues = Record<string, string | number | string[] | null>;

interface Props {
  schema: FormSchemaDef;
  values: FormValues;
  onChange: (next: FormValues) => void;
  readOnly?: boolean;
}

function KindBadge({ kind }: { kind?: FieldValueKind }) {
  if (!kind) return null;
  return (
    <Badge tone={kind === 'fact' ? 'blue' : 'amber'} className="text-[9px]">
      {kind === 'fact' ? 'قطعی' : 'ترجیح'}
    </Badge>
  );
}

export const ServiceFormRenderer: React.FC<Props> = ({ schema, values, onChange, readOnly }) => {
  const set = (fieldId: string, value: string | number | string[] | null) => {
    onChange({ ...values, [fieldId]: value });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <p className="text-sm font-black text-slate-900 dark:text-white">{schema.title}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">برای نظر اولیه فقط فیلدهای ستاره‌دار لازم است — بقیه اختیاری است</p>
        </div>
        <Badge tone="neutral">{schema.version}</Badge>
      </div>

      {schema.sections.map((section) => (
        <section
          key={section.id}
          className="rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-l from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">{section.title}</h3>
            {section.description && (
              <p className="text-[10px] text-slate-500 mt-0.5">{section.description}</p>
            )}
          </div>
          <div className="p-4 grid sm:grid-cols-2 gap-3">
            {section.fields.map((field) => {
              const val = values[field.fieldId];
              const fullWidth = field.type === 'textarea' || field.type === 'multi-select';
              return (
                <div key={field.fieldId} className={fullWidth ? 'sm:col-span-2' : ''}>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                      {field.label}
                      {field.required && <span className="text-rose-500 mr-0.5">*</span>}
                    </label>
                    <KindBadge kind={field.kind} />
                  </div>
                  {field.hint && <p className="text-[10px] text-slate-400 mb-1">{field.hint}</p>}

                  {field.type === 'textarea' ? (
                    <textarea
                      disabled={readOnly}
                      rows={3}
                      value={(val as string) ?? ''}
                      onChange={(e) => set(field.fieldId, e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-slate-50/50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none"
                      placeholder={field.placeholder}
                    />
                  ) : field.type === 'enum' || field.type === 'importance' ? (
                    <select
                      disabled={readOnly}
                      value={(val as string) ?? ''}
                      onChange={(e) => set(field.fieldId, e.target.value || null)}
                      className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-slate-50/50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500/30 outline-none"
                    >
                      <option value="">انتخاب کنید…</option>
                      {field.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'multi-select' ? (
                    <div className="flex flex-wrap gap-2">
                      {field.options?.map((o) => {
                        const selected = Array.isArray(val) && val.includes(o.value);
                        return (
                          <button
                            key={o.value}
                            type="button"
                            disabled={readOnly}
                            onClick={() => {
                              const cur = Array.isArray(val) ? [...val] : [];
                              set(
                                field.fieldId,
                                selected ? cur.filter((x) => x !== o.value) : [...cur, o.value]
                              );
                            }}
                            className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                              selected
                                ? 'bg-teal-600 text-white border-teal-600'
                                : 'bg-white dark:bg-slate-900 border-slate-200 text-slate-600'
                            }`}
                          >
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        disabled={readOnly}
                        type={field.type === 'date' ? 'date' : field.type === 'number' || field.type === 'currency' || field.type === 'range' ? 'number' : 'text'}
                        value={val === null || val === undefined ? '' : String(val)}
                        min={field.min}
                        max={field.max}
                        onChange={(e) => {
                          const raw = e.target.value;
                          if (field.type === 'number' || field.type === 'currency' || field.type === 'range') {
                            set(field.fieldId, raw === '' ? null : Number(raw));
                          } else {
                            set(field.fieldId, raw || null);
                          }
                        }}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-slate-50/50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none"
                        placeholder={field.placeholder}
                      />
                      {field.unit && (
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                          {field.unit}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export function validateFormSchema(
  schema: FormSchemaDef,
  values: FormValues
): { ok: boolean; missing: string[] } {
  const missing: string[] = [];
  for (const section of schema.sections) {
    for (const field of section.fields) {
      if (!field.required) continue;
      const v = values[field.fieldId];
      if (v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) {
        missing.push(field.label);
      }
    }
  }
  return { ok: missing.length === 0, missing };
}
