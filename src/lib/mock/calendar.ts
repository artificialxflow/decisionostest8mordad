import { CalendarEventItem } from '../../types';

export const MOCK_CALENDAR_EVENTS: CalendarEventItem[] = [
  { id: 'ce-1', title: 'مهلت تکمیل مدارک', date: '1403/06/10', type: 'deadline', caseId: 'case-101', workspaceId: 'ws-1' },
  { id: 'ce-2', title: 'جلسه با مشتری', date: '1403/06/12', type: 'meeting', caseId: 'case-101', workspaceId: 'ws-1' },
  { id: 'ce-3', title: 'یادآوری QC', date: '1403/06/15', type: 'reminder', caseId: 'case-102', workspaceId: 'ws-1' },
  { id: 'ce-4', title: 'Task: بررسی سند', date: '1403/06/08', type: 'task', caseId: 'case-101', workspaceId: 'ws-1' },
  { id: 'ce-5', title: 'تحلیل AI پرونده', date: '1403/06/18', type: 'task', caseId: 'case-ai-1', workspaceId: 'ws-1' },
];

export function getMockCalendarEvents(month?: string): CalendarEventItem[] {
  if (!month) return [...MOCK_CALENDAR_EVENTS];
  return MOCK_CALENDAR_EVENTS.filter((e) => e.date.startsWith(month));
}
