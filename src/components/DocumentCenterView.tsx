import React, { useState } from 'react';
import { FileText, Upload, Search, Trash2, Eye, History, Loader2, Download } from 'lucide-react';
import { DocumentItem, CaseItem } from '../types';
import { Badge, Button, EmptyState } from './ui';
import { useAuth } from '../context/AuthContext';
import { featureBadge } from '../config/features';
import { DOCUMENT_STATUS_LABELS } from '../lib/labels';

interface DocumentCenterViewProps {
  documents: DocumentItem[];
  cases: CaseItem[];
  onSelectCase: (caseId: string) => void;
  onDeleteDocument: (docId: string) => void;
  onUploadDocument?: (caseId: string, title: string) => Promise<void>;
}

interface PendingUpload {
  name: string;
  size: string;
  previewUrl?: string;
  type: string;
}

export const DocumentCenterView: React.FC<DocumentCenterViewProps> = ({
  documents,
  cases,
  onSelectCase,
  onDeleteDocument,
  onUploadDocument,
}) => {
  const { can } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [pending, setPending] = useState<PendingUpload | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || '');
  const [toast, setToast] = useState('');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const ocrBadge = featureBadge('ocr');

  const handleDownload = (doc: DocumentItem) => {
    const blob = new Blob([`Mock content: ${doc.title}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setToast('دانلود آغاز شد (نمایشی)');
    setTimeout(() => setToast(''), 2500);
  };

  const filteredDocs = documents.filter((d) => {
    if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return d.title.toLowerCase().includes(q) || d.ocrSummary?.toLowerCase().includes(q);
    }
    return true;
  });

  const isEmptySystem = documents.length === 0;
  const isEmptyFiltered = !isEmptySystem && filteredDocs.length === 0;

  const getCaseTitle = (caseId: string) => {
    const found = cases.find((c) => c.id === caseId);
    return found ? found.title : 'پرونده ناشناخته';
  };

  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
    setPending({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      previewUrl,
      type: file.type.includes('pdf') ? 'PDF' : file.type.split('/')[1]?.toUpperCase() || 'FILE',
    });
  };

  const confirmUpload = async () => {
    if (!pending || !selectedCaseId || !onUploadDocument) {
      setPending(null);
      return;
    }
    setUploading(true);
    try {
      await onUploadDocument(selectedCaseId, pending.name.replace(/\.[^.]+$/, ''));
      setPending(null);
      setToast('فایل ذخیره شد (نمایشی)');
      setTimeout(() => setToast(''), 2500);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (can('upload_document')) processFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6 text-right font-vazirmatn">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>مرکز مدیریت اسناد</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Upload · Preview · Download · Search · Category</p>
        </div>
        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-md border">
          {documents.length} مدرک
        </span>
      </div>

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}

      {can('upload_document') && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`p-6 rounded-lg border-2 border-dashed text-center transition-all ${
            isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
          }`}
        >
          <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xs font-bold">فایل را بکشید و رها کنید</h3>
          <label className="inline-block mt-3 cursor-pointer text-[11px] font-bold text-blue-600">
            <input type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => processFiles(e.target.files)} />
            یا از دستگاه انتخاب کنید
          </label>
        </div>
      )}

      {pending && (
        <div className="bg-white dark:bg-slate-900 border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold">Preview بارگذاری</h3>
            {ocrBadge && <Badge tone="amber">{ocrBadge}</Badge>}
          </div>
          <div className="flex gap-4 items-start">
            {pending.previewUrl ? (
              <img src={pending.previewUrl} alt="preview" className="w-24 h-24 object-cover rounded-md border" />
            ) : (
              <div className="w-24 h-24 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-bold">{pending.type}</div>
            )}
            <div className="text-xs space-y-2 flex-1">
              <p className="font-bold">{pending.name}</p>
              <p className="text-slate-500">{pending.size}</p>
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full border rounded-md px-2 py-1 text-xs"
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <Button size="sm" onClick={confirmUpload} disabled={uploading}>
                  {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'تأیید بارگذاری'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setPending(null)}>انصراف</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجو در عنوان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border rounded-md pr-9 pl-3 py-1.5 text-xs"
            />
          </div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border rounded-md px-3 py-1.5 text-xs">
            <option value="all">همه دسته‌ها</option>
            <option value="deed">سند مالکیت</option>
            <option value="contract">قرارداد</option>
            <option value="petition">دادخواست</option>
            <option value="other">سایر</option>
          </select>
        </div>

        {isEmptySystem ? (
          <EmptyState title="هنوز سندی بارگذاری نشده" description="مدارک پرونده را از اینجا مدیریت کنید." icon={<FileText className="w-5 h-5" />} />
        ) : isEmptyFiltered ? (
          <EmptyState title="سندی مطابق جستجو یافت نشد" actionLabel="پاک کردن فیلتر" onAction={() => { setSearchQuery(''); setSelectedCategory('all'); }} />
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredDocs.map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{d.title}</p>
                  <p className="text-[10px] text-slate-500">{getCaseTitle(d.caseId)} · {d.uploadedAt}</p>
                  {d.docStatus && (
                    <Badge tone={d.docStatus === 'ready' ? 'green' : 'amber'} className="mt-1">
                      {DOCUMENT_STATUS_LABELS[d.docStatus]}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => handleDownload(d)} className="p-1.5 hover:bg-slate-100 rounded" title="Download" aria-label="دانلود"><Download className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setPreviewDoc(d)} className="p-1.5 hover:bg-slate-100 rounded" title="Preview" aria-label="پیش‌نمایش"><Eye className="w-3.5 h-3.5" /></button>
                  {can('delete_document') && (
                    <button onClick={() => onDeleteDocument(d.id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                  <button onClick={() => onSelectCase(d.caseId)} className="p-1.5 hover:bg-slate-100 rounded text-[10px] font-bold">پرونده</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setPreviewDoc(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-5 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-sm mb-2">{previewDoc.title}</h3>
            <p className="text-xs text-slate-500 mb-4">Preview — {previewDoc.fileType} · {previewDoc.fileSize}</p>
            {previewDoc.previewUrl || previewDoc.fileUrl ? (
              <img src={previewDoc.previewUrl || previewDoc.fileUrl} alt="" className="max-h-48 mx-auto rounded border" />
            ) : (
              <div className="h-32 bg-slate-100 rounded flex items-center justify-center text-xs text-slate-500">پیش‌نمایش فایل</div>
            )}
            <Button size="sm" className="mt-4 w-full" onClick={() => { handleDownload(previewDoc); setPreviewDoc(null); }}>دانلود</Button>
            <Button size="sm" variant="ghost" className="mt-2 w-full" onClick={() => setPreviewDoc(null)}>بستن</Button>
          </div>
        </div>
      )}
    </div>
  );
};
