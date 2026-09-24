import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading operational telemetry...',
  className = '',
}) => {
  return (
    <div className={`p-12 flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className='h-10 w-10 rounded-2xl bg-sky-50 text-[#159FE3] flex items-center justify-center'>
        <Loader2 className='h-5 w-5 animate-spin' />
      </div>
      <p className='text-xs font-medium text-slate-500 animate-pulse'>{message}</p>
    </div>
  );
};
