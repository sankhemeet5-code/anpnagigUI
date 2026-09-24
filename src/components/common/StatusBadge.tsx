import React from 'react';
import {
  BookingStatus,
  WorkerStatus,
  VerificationStatus,
  CooperativeStatus,
  EmergencyPriority,
  EmergencyStatus,
  PaymentStatus,
  GeneralStatus
} from '../../types';

export type AnyStatus =
  | BookingStatus
  | WorkerStatus
  | VerificationStatus
  | CooperativeStatus
  | EmergencyPriority
  | EmergencyStatus
  | PaymentStatus
  | GeneralStatus
  | string;

export interface StatusBadgeProps {
  status: AnyStatus;
  size?: 'sm' | 'md';
  className?: string;
}

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string; border: string }> = {
  // Booking statuses
  in_progress: { label: 'In progress', bg: 'bg-sky-50', text: 'text-[#0369A1]', dot: 'bg-[#159FE3]', border: 'border-sky-200' },
  completed: { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  cancelled: { label: 'Cancelled', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', border: 'border-slate-200' },
  arrived: { label: 'Arrived', bg: 'bg-sky-50', text: 'text-[#0369A1]', dot: 'bg-[#159FE3]', border: 'border-sky-200' },
  dispatched: { label: 'Dispatched', bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500', border: 'border-sky-200' },
  delayed: { label: 'Delayed', bg: 'bg-amber-50', text: 'text-amber-800', dot: 'bg-amber-500', border: 'border-amber-200' },
  disputed: { label: 'Disputed', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500', border: 'border-rose-200' },

  // Worker & general statuses
  active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  inactive: { label: 'Inactive', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', border: 'border-slate-200' },
  on_job: { label: 'On job', bg: 'bg-sky-50', text: 'text-[#0369A1]', dot: 'bg-[#159FE3]', border: 'border-sky-200' },
  offline: { label: 'Offline', bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400', border: 'border-slate-200' },
  suspended: { label: 'Suspended', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500', border: 'border-rose-200' },

  // Verification statuses
  verified: { label: 'Verified', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  pending: { label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-800', dot: 'bg-amber-500', border: 'border-amber-200' },
  under_review: { label: 'Under review', bg: 'bg-sky-50', text: 'text-[#0369A1]', dot: 'bg-[#159FE3]', border: 'border-sky-200' },
  rejected: { label: 'Rejected', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500', border: 'border-rose-200' },
  needs_info: { label: 'Needs info', bg: 'bg-amber-50', text: 'text-amber-800', dot: 'bg-amber-500', border: 'border-amber-200' },
  revoked: { label: 'Revoked', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500', border: 'border-rose-200' },

  // Cooperative approval
  pending_approval: { label: 'Pending approval', bg: 'bg-amber-50', text: 'text-amber-800', dot: 'bg-amber-500', border: 'border-amber-200' },

  // Payment statuses
  paid: { label: 'Paid', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  processing: { label: 'Processing', bg: 'bg-sky-50', text: 'text-[#0369A1]', dot: 'bg-[#159FE3]', border: 'border-sky-200' },
  failed: { label: 'Failed', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500', border: 'border-rose-200' },
  refunded: { label: 'Refunded', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500', border: 'border-purple-200' },

  // Safety & Emergency
  investigating: { label: 'Investigating', bg: 'bg-amber-50', text: 'text-amber-800', dot: 'bg-amber-500', border: 'border-amber-200' },
  resolved: { label: 'Resolved', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  dismissed: { label: 'Dismissed', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', border: 'border-slate-200' },
  assigned: { label: 'Assigned', bg: 'bg-sky-50', text: 'text-[#0369A1]', dot: 'bg-[#159FE3]', border: 'border-sky-200' },

  // Workforce
  balanced: { label: 'Balanced', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  overloaded: { label: 'High load', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500', border: 'border-rose-200' },
  under_allocated: { label: 'Under-allocated', bg: 'bg-sky-50', text: 'text-[#0369A1]', dot: 'bg-[#159FE3]', border: 'border-sky-200' },
  completing_soon: { label: 'Completing soon', bg: 'bg-amber-50', text: 'text-amber-800', dot: 'bg-amber-500', border: 'border-amber-200' },
  training_in_progress: { label: 'Training in progress', bg: 'bg-sky-50', text: 'text-[#0369A1]', dot: 'bg-[#159FE3]', border: 'border-sky-200' },
  committed: { label: 'Committed', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  draft: { label: 'Draft', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', border: 'border-slate-200' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', className = '' }) => {
  const normStatus = (status || '').toLowerCase().replace(/\s+/g, '_');
  const config = statusConfig[normStatus] || {
    label: (status || 'Unknown').replace(/_/g, ' '),
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    dot: 'bg-slate-400',
    border: 'border-slate-200',
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${config.dot}`} />
      <span className='leading-none'>{config.label}</span>
    </span>
  );
};
