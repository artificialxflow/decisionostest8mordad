import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
  secondary: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 dark:hover:bg-slate-800 dark:text-slate-200',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white',
  outline: 'bg-transparent border border-slate-300 hover:border-blue-500 text-slate-700 dark:border-slate-600 dark:text-slate-200',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-3.5 py-2 text-xs',
  lg: 'px-5 py-2.5 text-sm',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className = '',
  children,
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center gap-1.5 font-semibold rounded-md transition-colors disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    {...props}
  >
    {children}
  </button>
);
