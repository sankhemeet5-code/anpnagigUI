import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className='w-full space-y-1.5'>
        {label && (
          <label htmlFor={inputId} className='block text-xs font-semibold uppercase tracking-wider text-slate-600'>
            {label}
            {props.required && <span className='text-rose-500 ml-1'>*</span>}
          </label>
        )}

        <div className='relative rounded-xl'>
          {leftIcon && (
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400'>
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={`w-full h-10 px-3.5 ${
              leftIcon ? 'pl-9' : ''
            } ${rightIcon ? 'pr-9' : ''} text-xs sm:text-sm bg-white border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#159FE3] focus:border-transparent transition-all duration-150 ${
              error ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300'
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400'>
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className='text-xs text-rose-500 font-medium'>{error}</p>}
        {!error && helperText && <p className='text-xs text-slate-400'>{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
