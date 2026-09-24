import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'md' | 'lg' | 'xl';
}

const widthStyles: Record<NonNullable<DrawerProps['width']>, string> = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'md',
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
    <div className='fixed inset-0 z-50 overflow-hidden'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity'
        onClick={onClose}
      />

      <div className='fixed inset-y-0 right-0 pl-10 max-w-full flex'>
        <div
          className={`w-screen ${widthStyles[width]} bg-white shadow-2xl border-l border-slate-100 flex flex-col justify-between`}
        >
          {/* Header */}
          <div className='p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4'>
            <div>
              <h3 className='text-base sm:text-lg font-bold text-slate-900'>{title}</h3>
              {subtitle && <p className='text-xs sm:text-sm text-slate-500 mt-0.5'>{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className='h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors'
            >
              <X className='h-4 w-4' />
            </button>
          </div>

          {/* Content Body */}
          <div className='p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-slate-600'>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className='p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-2'>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
