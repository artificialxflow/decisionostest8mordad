import { PlatformTask } from '../../types';

let mockTasks: PlatformTask[] = [
  {
    id: 'task-1',
    title: 'بررسی سند مالکیت',
    workspaceId: 'ws-1',
    caseId: 'case-101',
    assigneeId: 'usr-1',
    assigneeName: 'دکتر صادقی',
    status: 'doing',
    dueDate: '1403/05/01',
    priority: 'high',
    subTasks: [
      { id: 'st-1', title: 'تطبیق پلاک ثبتی', done: true },
      { id: 'st-2', title: 'بررسی بخ‌نامه', done: false },
    ],
  },
  {
    id: 'task-2',
    title: 'تماس با مشتری برای تکمیل مدارک',
    workspaceId: 'ws-1',
    caseId: 'case-101',
    assigneeId: 'usr-2',
    assigneeName: 'مدیر',
    status: 'todo',
    dueDate: '1403/04/28',
    priority: 'medium',
    subTasks: [{ id: 'st-3', title: 'ارسال لیست مدارک ناقص', done: false }],
  },
  {
    id: 'task-3',
    title: 'تهیه پیش‌نویس لایحه',
    workspaceId: 'ws-1',
    caseId: 'case-102',
    assigneeId: 'usr-1',
    assigneeName: 'دکتر صادقی',
    status: 'todo',
    dueDate: '1403/06/20',
    priority: 'high',
  },
];

export function isTaskOverdue(dueDate?: string): boolean {
  if (!dueDate) return false;
  return dueDate.includes('04/') || dueDate.includes('05/01');
}

export function getMockTasks(workspaceId?: string, caseId?: string): PlatformTask[] {
  return mockTasks.filter((t) => {
    if (workspaceId && t.workspaceId !== workspaceId) return false;
    if (caseId && t.caseId !== caseId) return false;
    return true;
  });
}

export function addMockTask(task: Omit<PlatformTask, 'id'>): PlatformTask {
  const newTask: PlatformTask = { ...task, id: `task-${Date.now()}` };
  mockTasks = [...mockTasks, newTask];
  return newTask;
}

export function updateMockTask(id: string, patch: Partial<PlatformTask>): PlatformTask | null {
  const idx = mockTasks.findIndex((t) => t.id === id);
  if (idx < 0) return null;
  mockTasks[idx] = { ...mockTasks[idx], ...patch };
  return mockTasks[idx];
}

export function toggleSubTask(taskId: string, subTaskId: string): PlatformTask | null {
  const task = mockTasks.find((t) => t.id === taskId);
  if (!task?.subTasks) return null;
  const subTasks = task.subTasks.map((s) => (s.id === subTaskId ? { ...s, done: !s.done } : s));
  return updateMockTask(taskId, { subTasks });
}
