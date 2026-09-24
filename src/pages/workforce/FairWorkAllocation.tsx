import React, { useState } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockFairAllocation } from '../../data/emergencies';
import { FairAllocationRecord } from '../../types';

export const FairWorkAllocation: React.FC = () => {
  const [records, setRecords] = useState<FairAllocationRecord[]>(mockFairAllocation);
  const [rebalancingActive, setRebalancingActive] = useState(false);
  const [successBanner, setSuccessBanner] = useState('');

  const handleRebalance = () => {
    setRebalancingActive(true);
    setTimeout(() => {
      setRebalancingActive(false);
      setRecords(prev => prev.map(r => ({
        ...r,
        status: 'balanced',
        currentUtilisation: r.status === 'overloaded' ? 78 : r.status === 'under_allocated' ? 68 : r.currentUtilisation,
        fairnessScore: 92
      })));
      setSuccessBanner('Workload balanced across active workers.');
    }, 400);
  };

  const columns: Column<FairAllocationRecord>[] = [
    {
      key: 'workerName',
      header: 'Worker',
      sortable: true,
      render: (r) => (
        <div>
          <span className='font-medium text-slate-900 block'>{r.workerName}</span>
          <span className='text-xs text-slate-400'>{r.skill} • {r.cooperativeName}</span>
        </div>
      )
    },
    {
      key: 'currentUtilisation',
      header: 'Utilisation',
      sortable: true,
      render: (r) => (
        <div className='space-y-1 w-20'>
          <div className='flex justify-between text-xs font-normal'>
            <span>{r.currentUtilisation}%</span>
            <span className='text-slate-400'>{r.weeklyHours}h/wk</span>
          </div>
          <div className='h-1.5 w-full bg-slate-100 rounded-full overflow-hidden'>
            <div
              className={`h-full ${r.currentUtilisation > 85 ? 'bg-amber-500' : r.currentUtilisation < 50 ? 'bg-[#159FE3]' : 'bg-emerald-500'}`}
              style={{ width: `${r.currentUtilisation}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'assignedJobsCount',
      header: 'Weekly jobs',
      sortable: true,
      render: (r) => <span className='text-slate-800 text-xs'>{r.assignedJobsCount} jobs</span>
    },
    {
      key: 'fairnessScore',
      header: 'Balance index',
      sortable: true,
      render: (r) => (
        <span className='text-xs text-slate-700'>
          {r.fairnessScore} / 100
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (r) => <StatusBadge status={r.status} size='sm' />
    },
    {
      key: 'recommendation',
      header: 'Recommended action',
      render: (r) => (
        <span className='text-xs text-slate-600 max-w-sm block truncate' title={r.recommendation}>
          {r.recommendation || 'Balanced distribution'}
        </span>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Fair Work Allocation'
        description='Workload balance and shift allocation.'
        action={
          <Button size='sm' onClick={handleRebalance} isLoading={rebalancingActive} className='text-xs h-8'>
            <RefreshCw className='h-3.5 w-3.5 mr-1' /> Balance workload
          </Button>
        }
      />

      {successBanner && (
        <div className='p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2'>
          <CheckCircle2 className='h-4 w-4 text-emerald-600 shrink-0' />
          <span>{successBanner}</span>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-xs'>
        <div className='card-soft p-4 space-y-1 bg-white'>
          <span className='font-medium text-slate-900 block'>Proximity matching</span>
          <p className='text-slate-500'>Prioritizes verified workers within a 4km radius.</p>
        </div>
        <div className='card-soft p-4 space-y-1 bg-white'>
          <span className='font-medium text-slate-900 block'>Target hours</span>
          <p className='text-slate-500'>Target benchmark of 32 billable hours per week.</p>
        </div>
        <div className='card-soft p-4 space-y-1 bg-white'>
          <span className='font-medium text-slate-900 block'>Shift cap</span>
          <p className='text-slate-500'>Soft throttles dispatches beyond 45 weekly hours.</p>
        </div>
      </div>

      <DataTable columns={columns} data={records} pageSize={8} />
    </div>
  );
};
