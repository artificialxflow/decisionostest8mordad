import React, { useState } from 'react';
import { FileText, ScanLine } from 'lucide-react';
import { Badge } from './ui';
import { getMockOcrText } from '../lib/mock/documents';

interface OcrPreviewPanelProps {
  documentId: string;
}

export const OcrPreviewPanel: React.FC<OcrPreviewPanelProps> = ({ documentId }) => {
  const [tab, setTab] = useState<'preview' | 'ocr'>('preview');
  const ocr = getMockOcrText(documentId);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab('preview')}
          className={`text-xs px-3 py-1 rounded-md ${tab === 'preview' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}
        >
          <FileText className="w-3 h-3 inline ml-1" />
          پیش‌نمایش
        </button>
        <button
          type="button"
          onClick={() => setTab('ocr')}
          className={`text-xs px-3 py-1 rounded-md ${tab === 'ocr' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}
        >
          <ScanLine className="w-3 h-3 inline ml-1" />
          متن OCR
        </button>
      </div>
      {tab === 'preview' ? (
        <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-500 border">
          پیش‌نمایش سند (mock)
        </div>
      ) : (
        <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/50 text-xs whitespace-pre-line font-mono leading-relaxed">
          <div className="flex justify-between mb-2">
            <span className="font-bold">متن استخراج‌شده</span>
            <Badge tone="green">اطمینان {ocr.confidence}%</Badge>
          </div>
          {ocr.text}
        </div>
      )}
    </div>
  );
};
