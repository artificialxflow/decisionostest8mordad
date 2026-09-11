import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  Sparkles,
  Lock,
  Unlock,
  MessageSquareText,
} from 'lucide-react';
import { PageHeader, Button, Badge, EmptyState } from '../components/ui';
import {
  getMockServices,
  submitMockRequest,
  getServiceRegistry,
  getFormSchemaForService,
  serviceTypeIdForCatalog,
  generateSystemReply,
  getServiceById,
} from '../lib/mock';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes';
import { ExpertMatchingPanel } from '../components/ExpertMatchingPanel';
import { ServiceFormRenderer, validateFormSchema } from '../components/ServiceFormRenderer';
import { ServiceItem, ServiceTypeId } from '../types';

const STEPS = ['خدمت', 'فرم', 'مدارک', 'پاسخ سیستم', 'بررسی', 'مشاوره تخصصی'];

export const RequestWizardPage: React.FC = () => {
  const [params] = useSearchParams();
  const preselected = params.get('serviceId');
  const { user } = useAuth();
  const navigate = useNavigate();
  const catalog = getMockServices().filter((s) => s.status !== 'inactive');
  const registry = getServiceRegistry().filter((s) => s.active);

  const [step, setStep] = useState(0);
  const [serviceTypeId, setServiceTypeId] = useState<ServiceTypeId | null>(null);
  const [title, setTitle] = useState('');
  const [formValues, setFormValues] = useState<Record<string, string | number | string[] | null>>({});
  const [files, setFiles] = useState<{ name: string; size: string; preview?: string }[]>([]);
  const [uploadToast, setUploadToast] = useState('');
  const [error, setError] = useState('');
  const [systemReply, setSystemReply] = useState('');
  const [replyReady, setReplyReady] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paying, setPaying] = useState(false);

  const entry = serviceTypeId ? getServiceById(serviceTypeId) : undefined;
  const schema = serviceTypeId ? getFormSchemaForService(serviceTypeId) : undefined;
  const catalogService: ServiceItem | undefined = serviceTypeId
    ? catalog.find((s) => serviceTypeIdForCatalog(s.id) === serviceTypeId) ?? catalog[0]
    : undefined;

  useEffect(() => {
    if (!preselected) return;
    const st = serviceTypeIdForCatalog(preselected);
    setServiceTypeId(st);
  }, [preselected]);

  useEffect(() => {
    setFormValues({});
    setTitle('');
    setSystemReply('');
    setReplyReady(false);
    setPaymentDone(false);
  }, [serviceTypeId]);

  const canNext = () => {
    if (step === 0) return !!serviceTypeId;
    if (step === 1) {
      if (!schema) return false;
      if (title.trim().length < 3) return false;
      return validateFormSchema(schema, formValues).ok;
    }
    if (step === 2) return true;
    if (step === 3) return replyReady;
    if (step === 4) return true;
    if (step === 5) return paymentDone;
    return true;
  };

  const prepareReply = () => {
    if (!entry) return;
    setReplyReady(false);
    setTimeout(() => {
      setSystemReply(generateSystemReply(entry.name, title || entry.name, formValues));
      setReplyReady(true);
    }, 900);
  };

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaymentDone(true);
    }, 800);
  };

  const handleSubmit = () => {
    if (!user || !catalogService || !serviceTypeId) return;
    const result = submitMockRequest({
      serviceId: catalogService.id,
      customerId: user.id,
      title: title || entry?.name || 'درخواست',
      description: systemReply.slice(0, 180) || 'ثبت از فرم تخصصی',
      formData: formValues,
      serviceTypeId,
      paymentStatus: paymentDone ? 'paid' : 'none',
      systemReply,
    });
    navigate(ROUTES.requestSuccess, {
      state: {
        requestId: result.request.id,
        caseId: result.caseId,
        workspaceId: result.workspaceId,
        caseNumber: result.caseNumber,
        serviceTitle: entry?.name,
        serviceTypeId,
        paymentUnlocked: paymentDone,
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

  const goNext = () => {
    if (!canNext()) {
      if (step === 1 && schema) {
        const { missing } = validateFormSchema(schema, formValues);
        setError(missing.length ? `فیلدهای الزامی: ${missing.join('، ')}` : 'عنوان را تکمیل کنید.');
      } else if (step === 5 && !paymentDone) {
        setError('برای دیدن متخصصان، ابتدا «درخواست مشاوره تخصصی» را ثبت کنید.');
      } else {
        setError('لطفاً این مرحله را تکمیل کنید.');
      }
      return;
    }
    setError('');
    if (step === 2) prepareReply();
    if (step === 4 && !paymentDone) {
      // stay allowed to review; experts on next step locked until pay
    }
    if (step === 5) {
      handleSubmit();
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setError('');
    setStep((s) => Math.max(0, s - 1));
  };

  const keySummary = useMemo(() => {
    if (!schema) return [];
    return schema.sections
      .flatMap((s) => s.fields)
      .filter((f) => formValues[f.fieldId] !== null && formValues[f.fieldId] !== undefined && formValues[f.fieldId] !== '')
      .slice(0, 8)
      .map((f) => ({
        label: f.label,
        kind: f.kind,
        value: Array.isArray(formValues[f.fieldId])
          ? (formValues[f.fieldId] as string[]).join('، ')
          : String(formValues[f.fieldId]),
      }));
  }, [schema, formValues]);

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-teal-800/20 bg-gradient-to-bl from-slate-900 via-slate-900 to-teal-950 text-white p-5">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-400/40 via-transparent to-transparent" />
        <div className="relative flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <p className="text-[10px] text-teal-200/80 tracking-wide">DecisionOS · درخواست مشاوره</p>
            <p className="text-sm font-black mt-0.5">خدمت → فرم حداقلی → پاسخ سیستم → (اختیاری) مشاوره تخصصی</p>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              قدم اول فقط پاسخ سیستمی رایگان است. متخصصان فقط پس از «درخواست مشاوره تخصصی» دیده می‌شوند.
            </p>
          </div>
        </div>
      </div>

      <PageHeader
        title="درخواست مشاوره"
        description="فرم حداقلی برای نظر اولیه — اطلاعات شخصی از پروفایل شماست و دوباره پرسیده نمی‌شود"
        badge={<Badge tone="blue">v8</Badge>}
      />

      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-1 shrink-0">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                i < step
                  ? 'bg-teal-600 text-white'
                  : i === step
                    ? 'bg-slate-900 text-white ring-2 ring-teal-400/50'
                    : 'bg-slate-200 text-slate-500'
              }`}
            >
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={`text-[10px] font-medium ${i === step ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <ChevronLeft className="w-3 h-3 text-slate-300 mx-1" />}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {step === 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {registry.map((s) => (
                <button
                  key={s.serviceId}
                  type="button"
                  onClick={() => setServiceTypeId(s.serviceId)}
                  className={`text-right p-4 rounded-xl border transition-all ${
                    serviceTypeId === s.serviceId
                      ? 'border-teal-500 bg-teal-50/80 dark:bg-teal-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-teal-300 bg-white dark:bg-slate-900'
                  }`}
                >
                  <p className="text-sm font-bold">{s.name}</p>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.aiCapabilities.slice(0, 2).map((c) => (
                      <span key={c} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600">
                        {c}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && schema && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <label className="text-xs font-bold">عنوان درخواست *</label>
                <p className="text-[10px] text-slate-500 mb-1">برای نظر اولیه همین و چند فیلد ستاره‌دار کافی است</p>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-teal-500/30 outline-none"
                  placeholder={`مثال: ${entry?.name} — درخواست جدید`}
                />
              </div>
              <ServiceFormRenderer schema={schema} values={formValues} onChange={setFormValues} />
            </div>
          )}

          {step === 2 && (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center space-y-3 bg-white/60 dark:bg-slate-900/60">
              <Upload className="w-8 h-8 text-teal-600 mx-auto" />
              <p className="text-xs font-bold">بارگذاری مدارک (نمایشی)</p>
              <p className="text-[10px] text-slate-500">مدارک بعداً به پرونده و پایگاه دانش همان Case متصل می‌شوند</p>
              <label className="inline-block cursor-pointer text-xs text-teal-700 font-bold">
                <input type="file" multiple accept=".pdf,image/*" onChange={(e) => handleFiles(e.target.files)} className="hidden" />
                انتخاب فایل
              </label>
              {uploadToast && <p className="text-xs text-emerald-600 font-bold">{uploadToast}</p>}
              {files.length > 0 && (
                <ul className="text-xs space-y-2 mt-4">
                  {files.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 justify-center p-2 rounded-lg border bg-slate-50 dark:bg-slate-800">
                      {f.preview ? <img src={f.preview} alt="" className="w-10 h-10 object-cover rounded" /> : <FileText className="w-4 h-4" />}
                      {f.name} — {f.size}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b bg-gradient-to-l from-teal-50 to-white dark:from-teal-950/40 dark:to-slate-900 flex items-center gap-2">
                <MessageSquareText className="w-4 h-4 text-teal-700" />
                <p className="text-xs font-bold">پاسخ سیستم</p>
                <Badge tone="green">رایگان / محدود</Badge>
              </div>
              <div className="p-5 min-h-[120px]">
                {!replyReady ? (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    در حال آماده‌سازی پاسخ اولیه…
                  </div>
                ) : (
                  <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">{systemReply}</p>
                )}
              </div>
              {replyReady && (
                <div className="px-4 py-3 border-t text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-950/50 space-y-2">
                  <p>اگر این پاسخ کافی نیست، در مرحله بعد می‌توانید «درخواست مشاوره تخصصی» بدهید.</p>
                  <Button size="sm" variant="outline" onClick={() => { setError(''); setStep(4); }}>
                    ادامه به بررسی
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border space-y-2 text-xs">
                <p>
                  <span className="font-bold">خدمت:</span> {entry?.name}
                </p>
                <p>
                  <span className="font-bold">عنوان:</span> {title}
                </p>
                <p>
                  <span className="font-bold">مدارک:</span> {files.length} فایل
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {keySummary.length === 0 ? (
                  <EmptyState title="فیلدی ثبت نشده" description="به مرحله فرم برگردید." />
                ) : (
                  keySummary.map((k) => (
                    <div key={k.label} className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-900 text-xs">
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="text-slate-500">{k.label}</span>
                        <Badge tone={k.kind === 'preference' ? 'amber' : 'blue'}>
                          {k.kind === 'preference' ? 'ترجیح' : 'قطعی'}
                        </Badge>
                      </div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">{k.value}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              {!paymentDone ? (
                <div className="rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-700" />
                    <p className="text-sm font-bold text-amber-900 dark:text-amber-100">متخصصان هنوز نمایش داده نمی‌شوند</p>
                  </div>
                  <p className="text-xs text-amber-900/80 dark:text-amber-100/70 leading-relaxed">
                    پاسخ اولیه رایگان و سیستمی بود. تا «درخواست مشاوره تخصصی» ثبت نشود، امکان دریافت هزینه و دیدن متخصص وجود ندارد.
                  </p>
                  <Button size="sm" onClick={handlePay} disabled={paying}>
                    {paying ? 'در حال ثبت…' : 'درخواست مشاوره تخصصی (دمو)'}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleSubmit}>
                    ثبت فقط با پاسخ سیستم (بدون متخصص)
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                    <Unlock className="w-4 h-4" />
                    درخواست مشاوره تخصصی ثبت شد — متخصصان مرتبط را ببینید و انتخاب کنید
                  </div>
                  {entry && <ExpertMatchingPanel serviceTitle={entry.name} compact />}
                  <Button onClick={handleSubmit}>ثبت نهایی به‌عنوان پروژه</Button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" size="sm" disabled={step === 0} onClick={goBack}>
          <ChevronRight className="w-4 h-4" />
          قبلی
        </Button>
        {step < 5 && (
          <Button size="sm" onClick={goNext}>
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
  const data =
    (location.state as {
      requestId?: string;
      caseId?: string;
      workspaceId?: string;
      caseNumber?: string;
      serviceTitle?: string;
      serviceTypeId?: string;
      paymentUnlocked?: boolean;
    }) || {};

  return (
    <div className="max-w-md mx-auto text-center space-y-4 py-10">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-500/15 flex items-center justify-center">
        <Check className="w-8 h-8 text-teal-600" />
      </div>
      <h1 className="text-lg font-black">درخواست و پرونده تخصصی ثبت شد</h1>
      {data.serviceTitle && <p className="text-xs text-slate-500">خدمت: {data.serviceTitle}</p>}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-xs space-y-2 text-right border">
        {data.caseNumber && (
          <p>
            <span className="text-slate-500">شماره پرونده:</span>{' '}
            <span className="font-mono font-bold">{data.caseNumber}</span>
          </p>
        )}
        {data.requestId && <p className="font-mono text-slate-500">{data.requestId}</p>}
        {data.caseId && <p className="font-mono text-slate-500">{data.caseId}</p>}
        <Badge tone={data.paymentUnlocked ? 'green' : 'amber'}>
          {data.paymentUnlocked ? 'متخصص آزاد شده' : 'فقط پاسخ سیستم'}
        </Badge>
      </div>
      <div className="flex gap-2 justify-center flex-wrap">
        <Button onClick={() => navigate(data.caseId ? `/app/cases/${data.caseId}` : ROUTES.cases)}>مشاهده پرونده</Button>
        <Button variant="outline" onClick={() => navigate(ROUTES.requestsList)}>
          لیست درخواست‌ها
        </Button>
      </div>
    </div>
  );
};
