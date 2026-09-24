import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are currently no items matching your criteria in this view.',
  icon,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-3 ${className}`}>
      <div className='h-12 w-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center'>
        {icon || <Inbox className='h-6 w-6' />}
      </div>
      <div className='max-w-sm space-y-1'>
        <h4 className='text-sm sm:text-base font-bold text-slate-800 tracking-tight'>{title}</h4>
        <p className='text-xs text-slate-500 leading-relaxed'>{description}</p>
      </div>
      {actionLabel && onAction && (
        <div className='pt-2'>
          <Button size='sm' onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
