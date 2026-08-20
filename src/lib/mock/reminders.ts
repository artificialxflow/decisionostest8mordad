import { ReminderItem } from '../../types';

let reminders: ReminderItem[] = [
  { id: 'rem-1', title: 'پیگیری مدارک ناقص', dueDate: '1403/06/10', caseId: 'case-101', caseTitle: 'پرونده ملکی 887', done: false },
  { id: 'rem-2', title: 'تماس QC', dueDate: '1403/06/12', caseId: 'case-102', caseTitle: 'قرارداد مشارکت', done: false },
  { id: 'rem-3', title: 'ارسال گزارش هفتگی', dueDate: '1403/06/08', done: true },
];

export function getMockReminders(): ReminderItem[] {
  return [...reminders];
}

export function getTodayReminders(): ReminderItem[] {
  return reminders.filter((r) => !r.done && (r.dueDate.includes('06/10') || r.dueDate.includes('06/08')));
}

export function addMockReminder(data: Omit<ReminderItem, 'id'>): ReminderItem {
  const item = { ...data, id: `rem-${Date.now()}` };
  reminders = [item, ...reminders];
  return item;
}

export function toggleReminder(id: string): void {
  reminders = reminders.map((r) => (r.id === id ? { ...r, done: !r.done } : r));
}

export function deleteReminder(id: string): void {
  reminders = reminders.filter((r) => r.id !== id);
}
