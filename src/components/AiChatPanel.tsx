import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { Badge, Button } from './ui';
import { ChatMessage, createChatMessage, getMockAiResponse } from '../lib/mock/aiChat';

interface AiChatPanelProps {
  compact?: boolean;
}

export const AiChatPanel: React.FC<AiChatPanelProps> = ({ compact }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createChatMessage('assistant', 'سلام! پرسش خود را درباره پرونده یا اسناد بپرسید.', 'نسخه نمایشی'),
  ]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState('case-101');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim() || typing) return;
    const userMsg = createChatMessage('user', input);
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const res = getMockAiResponse(userMsg.content);
      setMessages((m) => [...m, createChatMessage('assistant', res.content, res.citation)]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className={`flex flex-col ${compact ? 'h-80' : 'h-[480px]'} border rounded-lg bg-white dark:bg-slate-900 overflow-hidden`}>
      <div className="p-3 border-b flex flex-wrap items-center gap-2">
        <Bot className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-bold">چت AI</span>
        <Badge tone="amber">پاسخ نمایشی</Badge>
        <select
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="mr-auto text-[10px] border rounded px-2 py-1"
        >
          <option value="case-101">Context: پرونده 101</option>
          <option value="doc-1">Context: سند مالکیت</option>
        </select>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[85%] p-2.5 rounded-lg text-xs ${
                m.role === 'user' ? 'bg-slate-100 dark:bg-slate-800' : 'bg-blue-50 dark:bg-blue-950/40 border border-blue-100'
              }`}
            >
              {m.role === 'assistant' && (
                <p className="text-[10px] text-blue-600 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI
                </p>
              )}
              <p>{m.content}</p>
              {m.citation && <p className="text-[10px] text-slate-500 mt-1">📎 {m.citation}</p>}
            </div>
          </div>
        ))}
        {typing && (
          <div className="text-xs text-slate-400 animate-pulse flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> در حال نوشتن...
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="p-2 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="سؤال خود را بنویسید..."
          className="flex-1 border rounded-md px-3 py-2 text-xs"
        />
        <Button size="sm" onClick={send} disabled={typing}>
          <Send className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};
