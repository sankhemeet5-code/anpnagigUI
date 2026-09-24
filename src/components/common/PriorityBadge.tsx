import React from 'react';
import { EmergencyPriority } from '../../types';

export interface PriorityBadgeProps {
  priority: EmergencyPriority | string;
  size?: 'sm' | 'md';
  className?: string;
}

const priorityConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  critical: { label: 'Critical', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  high: { label: 'High', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  medium: { label: 'Medium', bg: 'bg-sky-50', text: 'text-[#0369A1]', border: 'border-sky-200' },
  low: { label: 'Low', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md', className = '' }) => {
  const normPriority = (priority || '').toLowerCase();
  const config = priorityConfig[normPriority] || {
    label: priority || 'Normal',
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      {config.label}
    </span>
  );
};
