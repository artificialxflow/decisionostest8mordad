import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, hint, className = '', id, ...props }) => {
  const inputId = id || props.name;
  return (
    <div className="space-y-1 text-right">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-hidden ${error ? 'border-rose-400' : ''} ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-[10px] text-slate-500">{hint}</p>}
      {error && <p className="text-[10px] text-rose-600">{error}</p>}
    </div>
  );
};
