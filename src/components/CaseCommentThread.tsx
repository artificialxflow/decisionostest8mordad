import React, { useState } from 'react';
import { MessageSquare, Lock, Users } from 'lucide-react';
import { CaseComment } from '../types';
import { Badge, Button } from './ui';
import { ROLE_LABELS } from '../lib/labels';
import { getCaseComments, addCaseComment } from '../lib/mock/comments';
import { useAuth } from '../context/AuthContext';

interface CaseCommentThreadProps {
  caseId: string;
}

export const CaseCommentThread: React.FC<CaseCommentThreadProps> = ({ caseId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<CaseComment[]>(() => getCaseComments(caseId));
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState<'internal' | 'customer'>('customer');

  const send = () => {
    if (!text.trim() || !user) return;
    const c = addCaseComment({
      caseId,
      authorName: user.name,
      authorRole: user.role,
      content: text,
      timestamp: new Date().toLocaleString('fa-IR'),
      visibility,
      mentions: text.includes('@') ? ['مدیر'] : undefined,
    });
    setComments([...comments, c]);
    setText('');
  };

  return (
    <div className="space-y-3">
      {comments.map((c) => (
        <div
          key={c.id}
          className={`p-3 rounded-lg border text-xs ${c.visibility === 'internal' ? 'bg-amber-50/50 border-amber-200' : 'bg-white dark:bg-slate-900'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            {c.visibility === 'internal' ? <Lock className="w-3 h-3 text-amber-600" /> : <Users className="w-3 h-3 text-blue-600" />}
            <span className="font-bold">{c.authorName}</span>
            <Badge tone="neutral">{ROLE_LABELS[c.authorRole]}</Badge>
            {c.replyToId && <Badge tone="blue">پاسخ</Badge>}
            <span className="text-slate-400 mr-auto">{c.timestamp}</span>
          </div>
          <p>{c.content}</p>
          {c.mentions?.map((m) => (
            <Badge key={m} tone="amber" className="mt-1">
              @{m}
            </Badge>
          ))}
        </div>
      ))}
      <div className="border rounded-lg p-3 space-y-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setVisibility('customer')}
            className={`text-[10px] px-2 py-1 rounded ${visibility === 'customer' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}
          >
            پیام به مشتری
          </button>
          <button
            type="button"
            onClick={() => setVisibility('internal')}
            className={`text-[10px] px-2 py-1 rounded ${visibility === 'internal' ? 'bg-amber-600 text-white' : 'bg-slate-100'}`}
          >
            یادداشت داخلی
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="پیام یا @mention..."
          className="w-full border rounded-md p-2 text-xs min-h-[60px]"
        />
        <Button size="sm" onClick={send}>
          <MessageSquare className="w-3.5 h-3.5" />
          ارسال
        </Button>
      </div>
    </div>
  );
};
