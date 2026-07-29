import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg max-h-[90vh] overflow-y-auto`}
      >
        {title && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};
