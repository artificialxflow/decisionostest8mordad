import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function Table<T>({ columns, rows, rowKey, onRowClick, emptyMessage = 'موردی یافت نشد.' }: TableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-8 text-center text-xs text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto">
      <table className="w-full text-right text-xs">
        <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800">
          <tr className="text-slate-500">
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3 font-medium ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={`${onRowClick ? 'cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50' : ''} transition-colors`}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 ${col.className || ''}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
