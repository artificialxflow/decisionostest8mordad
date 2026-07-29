import React, { useState } from 'react';
import { FileText, Upload, Search, Trash2, Eye, History } from 'lucide-react';
import { DocumentItem, CaseItem } from '../types';
import { Badge, Button } from './ui';

interface DocumentCenterViewProps {
  documents: DocumentItem[];
  cases: CaseItem[];
  onSelectCase: (caseId: string) => void;
  onDeleteDocument: (docId: string) => void;
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
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [pending, setPending] = useState<PendingUpload | null>(null);
  const [historyDocId, setHistoryDocId] = useState<string | null>(null);

  const filteredDocs = documents.filter((d) => {
    if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return d.title.toLowerCase().includes(q) || d.ocrSummary?.toLowerCase().includes(q);
    }
    return true;
  });

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6 text-right font-vazirmatn">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>مرکز مدیریت اسناد</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Drag & Drop · Preview · Version · File History · OCR Ready (placeholder)
          </p>
        </div>
        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
          {documents.length} مدرک
        </span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-6 rounded-lg border-2 border-dashed text-center transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400'
        }`}
      >
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 flex items-center justify-center mx-auto mb-2 border border-blue-200 dark:border-blue-800">
          <Upload className="w-5 h-5" />
        </div>
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">فایل را بکشید و رها کنید</h3>
        <p className="text-[11px] text-slate-500 mt-1">PDF, PNG, JPG</p>
        <label className="inline-block mt-3">
          <input
            type="file"
            className="hidden"
            accept=".pdf,image/*"
            onChange={(e) => processFiles(e.target.files)}
          />
          <span className="cursor-pointer text-[11px] font-bold text-blue-600">یا از دستگاه انتخاب کنید</span>
        </label>
      </div>

      {pending && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold">Preview بارگذاری</h3>
            <Badge tone="blue">OCR Ready</Badge>
          </div>
          <div className="flex gap-4 items-start">
            {pending.previewUrl ? (
              <img src={pending.previewUrl} alt="preview" className="w-24 h-24 object-cover rounded-md border border-slate-200" />
            ) : (
              <div className="w-24 h-24 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                {pending.type}
              </div>
            )}
            <div className="text-xs space-y-1">
              <p className="font-bold">{pending.name}</p>
              <p className="text-slate-500">{pending.size} · Version 1</p>
              <p className="text-[10px] text-slate-400">OCR واقعی در Sprintهای بعد — فعلاً Ready flag</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => setPending(null)}>
                  تأیید (mock)
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setPending(null)}>
                  انصراف
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجو در عنوان یا متن خلاصه مدرک..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md pr-9 pl-3 py-1.5 text-xs focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:outline-hidden"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1.5 text-xs"
          >
            <option value="all">همه دسته‌ها</option>
            <option value="deed">سند مالکیت</option>
            <option value="contract">قرارداد</option>
            <option value="petition">دادخواست</option>
            <option value="verdict">رأی</option>
            <option value="other">سایر</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {filteredDocs.map((d) => (
          <div
            key={d.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 font-bold text-[10px] flex items-center justify-center border border-blue-200 dark:border-blue-800 uppercase">
                {d.fileType}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{d.title}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {getCaseTitle(d.caseId)} · {d.uploadedAt} · {d.fileSize}
                </p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  <Badge>v{d.versions?.length || 1}</Badge>
                  <Badge tone="blue">OCR Ready</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onSelectCase(d.caseId)}
                className="p-2 text-slate-500 hover:text-blue-600 rounded-md"
                title="پرونده"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => setHistoryDocId(historyDocId === d.id ? null : d.id)}
                className="p-2 text-slate-500 hover:text-blue-600 rounded-md"
                title="File History"
              >
                <History className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteDocument(d.id)}
                className="p-2 text-slate-500 hover:text-rose-600 rounded-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {historyDocId === d.id && (
              <div className="w-full sm:col-span-2 border-t border-slate-100 dark:border-slate-800 pt-2 text-[11px] text-slate-500">
                <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">File History</p>
                <p>v1 · {d.uploadedAt} · {d.uploadedBy}</p>
                {(d.versions || []).map((v) => (
                  <p key={v.id}>
                    v{v.version} · {v.uploadedAt} · {v.uploadedBy}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
