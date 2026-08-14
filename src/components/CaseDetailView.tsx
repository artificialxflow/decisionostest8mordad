import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowRight,
  Printer,
  Sparkles,
  Scale,
  Building2,
  FileText,
  Clock,
  ShieldCheck,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Bot,
  Trash2,
  Calendar,
  UserCheck
} from 'lucide-react';
import { CaseItem, CaseNote, DocumentItem, CaseReport, CaseStatus } from '../types';
import { ReportPrintModal } from './ReportPrintModal';
import { apiUrl } from '../lib/api';
import { normalizeCaseStatus, CASE_STATUS_LABELS, CASE_STATUS_COLORS, ALL_CASE_STATUSES, CASE_STATUS_TRANSITIONS } from '../lib/labels';
import { useAuth } from '../context/AuthContext';
import { getMockExperts, getMockTimelineEvents } from '../lib/mock';
import { TimelineFeed } from './TimelineEvent';
import { featureBadge } from '../config/features';
import { Badge } from './ui';

interface CaseDetailViewProps {
  caseId: string;
  onBack: () => void;
  onGoToChatWithCase: (caseId: string) => void;
}

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({
  caseId,
  onBack,
  onGoToChatWithCase
}) => {
  const { t } = useLanguage();
  const { can } = useAuth();
  const experts = getMockExperts();
  const aiBadge = featureBadge('aiAnalysis');

  const [caseItem, setCaseItem] = useState<CaseItem | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [notes, setNotes] = useState<CaseNote[]>([]);
  const [report, setReport] = useState<CaseReport | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'ai' | 'docs' | 'notes' | 'audit'>('overview');
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);

  // New Note Modal
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // New Doc Modal
  const [showDocModal, setShowDocModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<any>('deed');

  const [showAssignExpert, setShowAssignExpert] = useState(false);

  // Print Report Modal
  const [showReportModal, setShowReportModal] = useState(false);

  // Fetch Case Data
  useEffect(() => {
    fetchCaseData();
  }, [caseId]);

  const handleStatusChange = async (newStatus: CaseStatus) => {
    if (!caseItem || !can('change_case_status')) return;
    const res = await fetch(apiUrl(`/cases/${caseId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...caseItem, status: newStatus }),
    });
    if (res.ok) fetchCaseData();
  };

  const handleAssignExpert = async (expertId: string) => {
    if (!caseItem || !can('assign_expert')) return;
    const res = await fetch(apiUrl(`/cases/${caseId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...caseItem, assignedExpertId: expertId }),
    });
    if (res.ok) {
      setShowAssignExpert(false);
      fetchCaseData();
    }
  };

  const allowedStatuses = caseItem
    ? CASE_STATUS_TRANSITIONS[caseItem.status] || ALL_CASE_STATUSES
    : [];

  const timelineEvents = getMockTimelineEvents(caseId);

  const fetchCaseData = async () => {
    try {
      const [cRes, dRes, nRes, rRes] = await Promise.all([
        fetch(apiUrl(`/cases/${caseId}`)),
        fetch(apiUrl(`/cases/${caseId}/documents`)),
        fetch(apiUrl(`/cases/${caseId}/notes`)),
        fetch(apiUrl(`/reports/${caseId}`))
      ]);

      if (cRes.ok) {
        const raw = await cRes.json();
        setCaseItem({ ...raw, status: normalizeCaseStatus(raw.status) });
      }
      if (dRes.ok) setDocuments(await dRes.json());
      if (nRes.ok) setNotes(await nRes.json());
      if (rRes.ok) setReport(await rRes.json());
    } catch (err) {
      console.error('Error fetching case detail:', err);
    }
  };

  const handleRunAIAnalysis = async () => {
    if (!caseItem) return;
    setIsAnalyzingAI(true);

    try {
      const res = await fetch(apiUrl(`/cases/${caseItem.id}/ai-analyze`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        const newReport = await res.json();
        setReport(newReport);
        setActiveTab('ai');
      }
    } catch (err) {
      alert('خطا در تحلیل هوش مصنوعی.');
    } finally {
      setIsAnalyzingAI(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    try {
      const res = await fetch(apiUrl(`/cases/${caseId}/notes`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noteTitle,
          content: noteContent,
          category: 'court_session'
        })
      });

      if (res.ok) {
        setNoteTitle('');
        setNoteContent('');
        setShowNoteModal(false);
        fetchCaseData();
      }
    } catch (err) {
      alert('خطا در ثبت یادداشت.');
    }
  };

  const handleAddDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    try {
      const res = await fetch(apiUrl(`/cases/${caseId}/documents`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: docTitle,
          category: docCategory,
          fileType: 'PDF',
          fileSize: '2.1 MB'
        })
      });

      if (res.ok) {
        setDocTitle('');
        setShowDocModal(false);
        fetchCaseData();
      }
    } catch (err) {
      alert('خطا در بارگذاری مدرک.');
    }
  };

  const handleDeleteDoc = async (docId: string) => {
    if (!confirm('آیا از حذف این سند اطمینان دارید؟')) return;

    try {
      const res = await fetch(apiUrl(`/documents/${docId}`), { method: 'DELETE' });
      if (res.ok) fetchCaseData();
    } catch (err) {
      alert('خطا در حذف مدرک.');
    }
  };

  if (!caseItem) {
    return (
      <div className="p-12 text-center text-slate-500 font-vazirmatn">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">در حال دریافت اطلاعات جامع پرونده...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-right font-vazirmatn">
      {/* Assign Expert Modal */}
      {showAssignExpert && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full space-y-3 text-right">
            <h3 className="font-bold text-sm">تخصیص کارشناس</h3>
            {experts.map((e) => (
              <button
                key={e.id}
                onClick={() => handleAssignExpert(e.userId)}
                className="w-full text-right p-3 rounded-lg border hover:border-blue-400 text-xs"
              >
                <p className="font-bold">{e.name}</p>
                <p className="text-slate-500">{e.specialty}</p>
              </button>
            ))}
            <button onClick={() => setShowAssignExpert(false)} className="text-xs text-slate-500 w-full pt-2">انصراف</button>
          </div>
        </div>
      )}

      {/* Top Header & Actions */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              title="بازگشت به لیست"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    caseItem.category === 'real_estate'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {caseItem.category === 'real_estate' ? 'ملکی و ثبتی' : 'حقوقی عام'}
                </span>

                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  شماره بایگانی: {caseItem.caseNumber}
                </span>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${CASE_STATUS_COLORS[caseItem.status]}`}>
                  {CASE_STATUS_LABELS[caseItem.status]}
                </span>
              </div>

              <h1 className="text-lg md:text-xl font-black text-slate-900 leading-snug">
                {caseItem.title}
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {can('change_case_status') && (
              <select
                value={caseItem.status}
                onChange={(e) => handleStatusChange(e.target.value as CaseStatus)}
                className="text-xs border rounded-lg px-2 py-1.5 font-bold"
              >
                <option value={caseItem.status}>{CASE_STATUS_LABELS[caseItem.status]}</option>
                {allowedStatuses.map((s) => (
                  <option key={s} value={s}>{CASE_STATUS_LABELS[s]}</option>
                ))}
              </select>
            )}
            {can('assign_expert') && (
              <button
                onClick={() => setShowAssignExpert(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                تخصیص کارشناس
              </button>
            )}
            {aiBadge ? (
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                AI {aiBadge}
              </span>
            ) : (
              <button
                onClick={handleRunAIAnalysis}
                disabled={isAnalyzingAI}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5"
              >
                {isAnalyzingAI ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>بازتحلیل AI</span>
              </button>
            )}

            <button
              onClick={() => setShowReportModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>چاپ گزارش رسمی</span>
            </button>

            <button
              onClick={() => onGoToChatWithCase(caseItem.id)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-amber-600" />
              <span>گفتگوی اسناد</span>
            </button>
          </div>
        </div>

        {/* Detail View Sub-Tabs */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>مشخصات عمومی و ثبتی</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>تحلیل هوش مصنوعی & ارزیابی ریسک</span>
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'docs'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>اسناد و مدارک ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>یادداشت‌ها و خط زمانی ({notes.length})</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Specs */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
                شرح و خلاصه موضوع دعوا
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {caseItem.description}
              </p>
            </div>

            {/* Legal Parties */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-600" />
                <span>مشخصات قضایی و طرفین دعوا</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">خواهان / شاکی (موکل):</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {caseItem.legalDetails?.plaintiff || 'مشخص نشده'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">خوانده / مشتکی عنه:</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {caseItem.legalDetails?.defendant || 'مشخص نشده'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">خواسته‌ها و نوع دعوا:</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {caseItem.legalDetails?.disputeType || 'عادی'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">شعبه و مرجع قضایی:</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {caseItem.legalDetails?.courtBranch || 'دادگاه حقوقی'}
                  </span>
                </div>
              </div>
            </div>

            {/* Real Estate Specifics */}
            {caseItem.realEstateDetails && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>مشخصات کامل ثبتی و ملکی</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-amber-50/40 p-4 rounded-xl border border-amber-200/60">
                  <div>
                    <span className="text-slate-500 block text-[11px]">پلاک ثبتی اصلی/فرعی:</span>
                    <span className="font-bold text-slate-900">
                      {caseItem.realEstateDetails.parcelMainNumber} / {caseItem.realEstateDetails.parcelSubNumber}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">نوع سند مالکیت:</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.deedType}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">مساحت (متراژ):</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.areaSqMeters} مترمربع</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">بخش ثبتی:</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.registrationSection}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">کاربری:</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.zoning}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">کد پستی:</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.postalCode || 'ندارد'}</span>
                  </div>

                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-slate-500 block text-[11px]">آدرس دقیق ملک:</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.address}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Index Cards */}
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-right space-y-2">
              <span className="text-xs font-bold text-emerald-800 block">احتمال موفقیت حقوقی</span>
              <div className="text-3xl font-black text-emerald-900">
                {caseItem.realEstateDetails?.successProbability || 85}٪
              </div>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                بر اساس الگوریتم هوشمند ارزیابی ادله و آرای مشابه دیوان عالی کشور.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-right space-y-2">
              <span className="text-xs font-bold text-amber-900 block">شاخص ریسک حقوقی ثبتی</span>
              <div className="text-3xl font-black text-amber-900">
                {caseItem.realEstateDetails?.riskScore || 24} / ۱۰0
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                سطح ریسک: {report?.riskAnalysis.level || 'پایین'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
                اطلاعات ثبت و مسئول پرونده
              </h4>
              <div className="text-xs space-y-2 text-slate-700">
                <div><span className="text-slate-400">وکیل / کارشناس:</span> <strong className="text-slate-900">{caseItem.assignedAdvocate}</strong></div>
                <div><span className="text-slate-400">اولویت:</span> <strong className="text-slate-900">{caseItem.priority}</strong></div>
                <div><span className="text-slate-400">وضعیت:</span> <strong className="text-slate-900">{caseItem.status}</strong></div>
                <div><span className="text-slate-400">مهلت (Deadline):</span> <strong className="text-slate-900">{caseItem.deadline || '—'}</strong></div>
                <div><span className="text-slate-400">تاریخ ایجاد:</span> <strong className="text-slate-900">{caseItem.createdAt}</strong></div>
                <div><span className="text-slate-400">آخرین بروزرسانی:</span> <strong className="text-slate-900">{caseItem.updatedAt}</strong></div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{caseItem.progress ?? 0}٪</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${caseItem.progress ?? 0}%` }}
                  />
                </div>
              </div>
            </div>

            {caseItem.history && caseItem.history.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">History</h4>
                <div className="space-y-2">
                  {caseItem.history.map((h) => (
                    <div key={h.id} className="text-[11px] border-r-2 border-blue-400 pr-2">
                      <div className="font-semibold text-slate-800">{h.action}</div>
                      <div className="text-slate-500">{h.actorName} · {h.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: AI ANALYSIS */}
      {activeTab === 'ai' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">گزارش ارزیابی تخصصی هوش مصنوعی Gemini</h2>
                <p className="text-xs text-slate-500">تحلیل ادله، ریسک ثبتی و پیش‌بینی رای دادگاه</p>
              </div>
            </div>

            <button
              onClick={handleRunAIAnalysis}
              disabled={isAnalyzingAI}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-xs"
            >
              {isAnalyzingAI ? 'در حال تحلیل...' : 'اجرای تحلیل جدید'}
            </button>
          </div>

          {!report ? (
            <div className="p-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
              <Sparkles className="w-10 h-10 text-amber-500 mx-auto animate-pulse" />
              <h3 className="text-xs font-bold text-slate-800">گزارش تحلیل هنوز تولید نشده است</h3>
              <p className="text-xs text-slate-500">جهت دریافت گزارش تحلیل هوشمند، دکمه بالا را فشرید.</p>
              <button
                onClick={handleRunAIAnalysis}
                className="mt-2 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                تولید گزارش هوشمند
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-xs text-slate-800">
              {/* Summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1">
                  خلاصه کارشناسی حقوقی پرونده
                </h3>
                <p className="leading-relaxed">{report.summary}</p>
              </div>

              {/* Risks & Strategies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50/60 p-4 rounded-xl border border-red-200 space-y-2">
                  <h4 className="font-bold text-red-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>چالش‌ها و ریسک‌های کلیدی</span>
                  </h4>
                  <ul className="list-disc pr-4 space-y-1 text-slate-700">
                    {report.riskAnalysis.keyRisks.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-2">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>راهکارهای دفاعی و اجرایی</span>
                  </h4>
                  <ul className="list-disc pr-4 space-y-1 text-slate-700">
                    {report.recommendedActions.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Laws */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-1">
                  مستندات قانونی و آراء وحدت رویه مرتبط
                </h3>
                <div className="flex flex-wrap gap-2">
                  {report.relevantLaws.map((law, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                      {law}
                    </span>
                  ))}
                </div>
              </div>

              {/* Forecast */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">پیش‌بینی رای احتمالی دادگاه:</span>
                <p className="text-slate-800 leading-relaxed font-medium">{report.verdictForecast}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: DOCUMENTS */}
      {activeTab === 'docs' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold text-slate-900">اسناد و مدارک ثبت‌شده برای این پرونده</h3>
            <button
              onClick={() => setShowDocModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>بارگذاری مدرک جدید</span>
            </button>
          </div>

          <div className="space-y-3">
            {documents.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">هیچ مدرکی برای این پرونده ثبت نشده است.</p>
            ) : (
              documents.map((d) => (
                <div key={d.id} className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center border border-amber-200">
                      {d.fileType}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{d.title}</h4>
                      <p className="text-[10px] text-slate-500">تاریخ ثبت: {d.uploadedAt} • حجم: {d.fileSize}</p>
                      {d.ocrSummary && <p className="text-[11px] text-slate-600 mt-1">{d.ocrSummary}</p>}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteDoc(d.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: NOTES */}
      {activeTab === 'notes' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold text-slate-900">یادداشت‌ها و روند جلسات دادگاه</h3>
            <button
              onClick={() => setShowNoteModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت یادداشت جدید</span>
            </button>
          </div>

          <div className="space-y-3">
            {notes.map((n) => (
              <div key={n.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                  <span className="text-[10px] text-slate-500">{n.date}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{n.content}</p>
                <div className="text-[10px] text-amber-800 font-medium">نویسنده: {n.authorName}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD NOTE MODAL */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">ثبت یادداشت جدید برای پرونده</h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <input
                type="text"
                required
                placeholder="عنوان یادداشت..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
              <textarea
                rows={4}
                required
                placeholder="متن یادداشت جلسه دادگاه..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowNoteModal(false)} className="px-3 py-1.5 text-xs text-slate-600">انصراف</button>
                <button type="submit" className="bg-amber-500 text-slate-950 font-bold px-4 py-1.5 text-xs rounded-lg">ثبت</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD DOC MODAL */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">بارگذاری مدرک جدید</h3>
            <form onSubmit={handleAddDoc} className="space-y-3">
              <input
                type="text"
                required
                placeholder="عنوان مدرک (مثلا: تصویر مبایعه‌نامه)..."
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
              <select
                value={docCategory}
                onChange={(e) => setDocCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              >
                <option value="deed">سند مالکیت</option>
                <option value="contract">قرارداد / مبایعه‌نامه</option>
                <option value="petition">دادخواست / لایحه</option>
                <option value="verdict">دادنامه / رای دادگاه</option>
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowDocModal(false)} className="px-3 py-1.5 text-xs text-slate-600">انصراف</button>
                <button type="submit" className="bg-amber-500 text-slate-950 font-bold px-4 py-1.5 text-xs rounded-lg">ذخیره مدرک</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINT REPORT MODAL */}
      <ReportPrintModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        caseItem={caseItem}
        report={report}
      />
    </div>
  );
};
