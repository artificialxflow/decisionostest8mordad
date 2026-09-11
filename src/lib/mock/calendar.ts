import { CalendarEventItem } from '../../types';

export const MOCK_CALENDAR_EVENTS: CalendarEventItem[] = [
  { id: 'ce-1', title: 'مهلت تکمیل مدارک', date: '1403/06/10', type: 'deadline', caseId: 'case-101', workspaceId: 'ws-1' },
  { id: 'ce-2', title: 'جلسه با دفتر حقوقی', date: '1403/06/12', type: 'office', caseId: 'case-101', workspaceId: 'ws-1' },
  { id: 'ce-3', title: 'یادآوری QC', date: '1403/06/15', type: 'reminder', caseId: 'case-102', workspaceId: 'ws-1' },
  { id: 'ce-4', title: 'جلسه با کارشناس املاک', date: '1403/06/08', type: 'expert', caseId: 'case-101', workspaceId: 'ws-1' },
  { id: 'ce-5', title: 'حضور در دادگاه', date: '1403/06/18', type: 'court', caseId: 'case-ai-1', workspaceId: 'ws-1' },
  { id: 'ce-6', title: 'کار انجام‌شده: بررسی سند', date: '1403/06/05', type: 'task', caseId: 'case-101', workspaceId: 'ws-1' },
  { id: 'ce-7', title: 'کار آینده: ارسال لایحه', date: '1403/06/22', type: 'task', caseId: 'case-101', workspaceId: 'ws-1' },
];

export function getMockCalendarEvents(month?: string): CalendarEventItem[] {
  if (!month) return [...MOCK_CALENDAR_EVENTS];
  return MOCK_CALENDAR_EVENTS.filter((e) => e.date.startsWith(month));
}
