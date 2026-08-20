export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citation?: string;
  timestamp: string;
}

const MOCK_RESPONSES: Record<string, string> = {
  default: 'بر اساس مدارک پرونده، برای تکمیل ثبت شرکت به اساسنامه و آگهی تأسیس نیز نیاز است.',
  contract: 'بند فسخ قرارداد باید مطابق ماده ۲۲۷ قانون مدنی تنظیم شود.',
};

export function getMockAiResponse(prompt: string): { content: string; citation?: string } {
  const lower = prompt.toLowerCase();
  if (lower.includes('قرارداد') || lower.includes('contract')) {
    return { content: MOCK_RESPONSES.contract, citation: 'بند ۳ — پیش‌نویس قرارداد c1' };
  }
  return { content: MOCK_RESPONSES.default, citation: 'بند ۲ — سند مالکیت' };
}

export function createChatMessage(role: 'user' | 'assistant', content: string, citation?: string): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    role,
    content,
    citation,
    timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
  };
}
