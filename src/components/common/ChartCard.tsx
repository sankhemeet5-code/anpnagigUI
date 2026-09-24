import React from 'react';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
}) => {
  return (
    <div className={`card-soft p-5 sm:p-6 space-y-4 ${className}`}>
      <div className='flex items-start justify-between gap-4 pb-1'>
        <div>
          <h3 className='text-card-title'>{title}</h3>
          {subtitle && <p className='text-xs text-slate-500 mt-0.5'>{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};
