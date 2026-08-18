import React, { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Upload, FileText } from 'lucide-react';
import { PageHeader, Button, Badge, EmptyState } from '../components/ui';
import { getMockServices, submitMockRequest } from '../lib/mock';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes';
import { ExpertMatchingPanel } from '../components/ExpertMatchingPanel';
import { ServiceItem } from '../types';

const STEPS = ['انتخاب خدمت', 'اطلاعات', 'مدارک', 'بررسی', 'ثبت'];

export const RequestWizardPage: React.FC = () => {
  const [params] = useSearchParams();
  const preselected = params.get('serviceId');
  const { user } = useAuth();
  const navigate = useNavigate();
  const services = getMockServices().filter((s) => s.status !== 'inactive');

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(preselected || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<{ name: string; size: string; preview?: string }[]>([]);
  const [uploadToast, setUploadToast] = useState('');
  const [error, setError] = useState('');

  const selected = services.find((s) => s.id === serviceId);

  const canNext = () => {
    if (step === 0) return !!serviceId;
    if (step === 1) return title.trim().length >= 3 && description.trim().length >= 10;
    if (step === 2) return true;
    return true;
  };

  const handleSubmit = () => {
    if (!user || !selected) return;
    const result = submitMockRequest({
      serviceId: selected.id,
      customerId: user.id,
      title,
      description,
    });
    navigate(ROUTES.requestSuccess, {
      state: {
        requestId: result.request.id,
        caseId: result.caseId,
        workspaceId: result.workspaceId,
        serviceTitle: selected.title,
      },
    });
  };

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles(
      Array.from(list).map((f) => ({
        name: f.name,
        size: `${(f.size / 1024).toFixed(0)} KB`,
        preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
      }))
    );
    setUploadToast('فایل ذخیره شد (نمایشی)');
    setTimeout(() => setUploadToast(''), 3000);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <PageHeader
        title="ثبت درخواست خدمت"
        description="انتخاب خدمت → تکمیل اطلاعات → بارگذاری مدارک → ثبت نهایی"
        badge={<Badge tone="blue">Request Wizard</Badge>}
      />

      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-1 shrink-0">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {i < step ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            <span className={`text-[10px] font-medium ${i === step ? 'text-blue-700' : 'text-slate-500'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <ChevronLeft className="w-3 h-3 text-slate-300 mx-1" />}
          </div>
        ))}
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {step === 0 && (
        <div className="grid sm:grid-cols-2 gap-3">
          {services.length === 0 ? (
            <EmptyState title="خدمتی یافت نشد" description="لطفاً بعداً مراجعه کنید." />
          ) : (
            services.map((s: ServiceItem) => (
              <button
                key={s.id}
                onClick={() => setServiceId(s.id)}
                className={`text-right p-4 rounded-lg border transition-all ${
                  serviceId === s.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-300'
                }`}
              >
                <p className="text-sm font-bold">{s.title}</p>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.description}</p>
              </button>
            ))
          )}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
          <div>
            <label className="text-xs font-bold">عنوان درخواست *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-xs"
              placeholder="مثال: بررسی سند ملکی..."
            />
          </div>
          <div>
            <label className="text-xs font-bold">شرح درخواست * (حداقل ۱۰ کاراکتر)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full mt-1 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-xs"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center space-y-3">
            <Upload className="w-8 h-8 text-blue-600 mx-auto" />
            <p className="text-xs font-bold">بارگذاری مدارک مورد نیاز</p>
            {selected?.requiredDocuments && (
              <p className="text-[10px] text-slate-500">
                مدارک: {selected.requiredDocuments.join('، ')}
              </p>
            )}
            <label className="inline-block cursor-pointer text-xs text-blue-600 font-bold">
              <input type="file" multiple accept=".pdf,image/*" onChange={(e) => handleFiles(e.target.files)} className="hidden" />
              انتخاب فایل
            </label>
            {uploadToast && <p className="text-xs text-emerald-600 font-bold">{uploadToast}</p>}
            {files.length > 0 && (
              <ul className="text-xs space-y-2 mt-4">
                {files.map((f) => (
                  <li key={f.name} className="flex items-center gap-2 justify-center p-2 rounded border bg-slate-50 dark:bg-slate-800">
                    {f.preview ? (
                      <img src={f.preview} alt="" className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    {f.name} — {f.size}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selected && <ExpertMatchingPanel serviceTitle={selected.title} compact />}
        </div>
      )}

      {step === 3 && selected && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border space-y-2 text-xs">
          <p><span className="font-bold">خدمت:</span> {selected.title}</p>
          <p><span className="font-bold">عنوان:</span> {title}</p>
          <p><span className="font-bold">شرح:</span> {description}</p>
          <p><span className="font-bold">مدارک:</span> {files.length} فایل</p>
        </div>
      )}

      {step === 4 && (
        <div className="text-center space-y-3 py-6">
          <Check className="w-12 h-12 text-emerald-500 mx-auto" />
          <p className="text-sm font-bold">آماده ثبت نهایی</p>
          <Button onClick={handleSubmit}>ثبت درخواست</Button>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          variant="ghost"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
        >
          <ChevronRight className="w-4 h-4" />
          قبلی
        </Button>
        {step < 4 && (
          <Button
            size="sm"
            disabled={!canNext()}
            onClick={() => {
              if (!canNext()) {
                setError('لطفاً فیلدهای الزامی را تکمیل کنید.');
                return;
              }
              setError('');
              setStep((s) => s + 1);
            }}
          >
            بعدی
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export const RequestSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = (location.state as {
    requestId?: string;
    caseId?: string;
    workspaceId?: string;
    serviceTitle?: string;
  }) || {};

  return (
    <div className="max-w-md mx-auto text-center space-y-4 py-10">
      <Check className="w-14 h-14 text-emerald-500 mx-auto" />
      <h1 className="text-lg font-black">درخواست با موفقیت ثبت شد</h1>
      {data.serviceTitle && <p className="text-xs text-slate-500">خدمت: {data.serviceTitle}</p>}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 text-xs space-y-2 text-right font-mono">
        {data.requestId && <p>Request ID: {data.requestId}</p>}
        {data.caseId && <p>Case ID: {data.caseId}</p>}
        {data.workspaceId && <p>Workspace ID: {data.workspaceId}</p>}
      </div>
      <div className="flex gap-2 justify-center flex-wrap">
        <Button onClick={() => navigate(data.workspaceId ? `/app/workspace/${data.workspaceId}` : ROUTES.workspace)}>
          رفتن به Workspace
        </Button>
        <Button variant="outline" onClick={() => navigate(ROUTES.cases)}>
          پرونده‌ها
        </Button>
      </div>
    </div>
  );
};
