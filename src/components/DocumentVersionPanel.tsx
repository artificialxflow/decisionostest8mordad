import React from 'react';
import { History, RotateCcw } from 'lucide-react';
import { DocumentVersion } from '../types';
import { Badge, Button } from './ui';

interface DocumentVersionPanelProps {
  documentId: string;
  versions: DocumentVersion[];
  onRestore?: () => void;
}

export const DocumentVersionPanel: React.FC<DocumentVersionPanelProps> = ({ versions, onRestore }) => {
  if (versions.length === 0) {
    return <p className="text-xs text-slate-500">نسخه‌ای ثبت نشده.</p>;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-bold">
        <History className="w-3.5 h-3.5" />
        تاریخچه نسخه‌ها
      </div>
      {versions.map((v) => (
        <div key={v.id} className="flex items-center justify-between p-2 rounded-md border text-xs bg-slate-50 dark:bg-slate-800/50">
          <div>
            <span className="font-bold">v{v.version}</span>
            <span className="text-slate-500 mr-2"> · {v.uploadedBy}</span>
            <span className="text-slate-400">{v.uploadedAt}</span>
            {v.note && <Badge tone="blue" className="mr-2">{v.note}</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">{v.fileSize}</span>
            {v.version === versions.length && <Badge tone="green">فعلی</Badge>}
            {v.version < versions.length && onRestore && (
              <Button size="sm" variant="ghost" onClick={onRestore}>
                <RotateCcw className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
