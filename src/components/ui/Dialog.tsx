import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const widthStyles: Record<NonNullable<DialogProps['maxWidth']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity'
        onClick={onClose}
      />

      {/* Dialog Body */}
      <div
        className={`relative z-10 w-full ${widthStyles[maxWidth]} bg-white rounded-2xl shadow-modal border border-slate-100 p-5 sm:p-6 text-slate-800 space-y-4 animate-scale-up`}
      >
        <div className='flex items-start justify-between gap-3'>
          <div>
            <h3 className='text-base sm:text-lg font-bold text-slate-900 tracking-tight'>{title}</h3>
            {description && (
              <p className='text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed'>{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className='h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <div className='text-xs sm:text-sm text-slate-600'>{children}</div>

        {footer && <div className='pt-3 border-t border-slate-100 flex justify-end gap-2'>{footer}</div>}
      </div>
    </div>
  );
};
