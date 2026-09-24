import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  variant?: 'default' | 'highlight' | 'warning' | 'danger';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  className = '',
}) => {
  return (
    <div className={`card-soft p-5 flex flex-col justify-between space-y-2.5 ${className}`}>
      <div className='flex items-center justify-between gap-2'>
        <span className='text-kpi-lbl truncate'>
          {title}
        </span>
        {icon && (
          <div className='h-7 w-7 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 border border-slate-100'>
            {icon}
          </div>
        )}
      </div>

      <div className='space-y-0.5'>
        <div className='text-kpi-val'>
          {value}
        </div>

        {change && (
          <div className='flex items-center gap-1 text-xs text-slate-500 font-normal'>
            {trend === 'up' && <TrendingUp className='h-3.5 w-3.5 text-emerald-600' />}
            {trend === 'down' && <TrendingDown className='h-3.5 w-3.5 text-rose-600' />}
            {trend === 'neutral' && <Minus className='h-3.5 w-3.5 text-slate-400' />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};
