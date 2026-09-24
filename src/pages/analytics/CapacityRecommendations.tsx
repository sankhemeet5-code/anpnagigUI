import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockMonthlyCapacityPlans } from '../../data/emergencies';
import { CapacityPlanMonth } from '../../types';

export const CapacityRecommendations: React.FC = () => {
  const [plans, setPlans] = useState<CapacityPlanMonth[]>(mockMonthlyCapacityPlans);

  const handleApprove = (idx: number) => {
    setPlans(prev => prev.map((p, i) => i === idx ? { ...p, status: 'balanced' } : p));
  };

  const columns: Column<CapacityPlanMonth>[] = [
    {
      key: 'service',
      header: 'Trade & zone',
      sortable: true,
      render: (p) => (
        <div>
          <span className='font-medium text-slate-900 block text-xs'>{p.service}</span>
          <span className='text-xs text-slate-400'>{p.zone} • {p.month}</span>
        </div>
      )
    },
    {
      key: 'projectedDemand',
      header: 'Demand',
      sortable: true,
      render: (p) => <span className='text-xs text-slate-800'>{p.projectedDemand} orders</span>
    },
    {
      key: 'availableWorkers',
      header: 'Current / Needed',
      render: (p) => (
        <span className='text-xs text-slate-700'>
          {p.availableWorkers} / {p.requiredWorkers} workers
        </span>
      )
    },
    {
      key: 'gap',
      header: 'Deficit',
      sortable: true,
      render: (p) => (
        <span className={`text-xs font-medium ${p.gap > 0 ? 'text-amber-800' : 'text-emerald-700'}`}>
          {p.gap > 0 ? `+${p.gap} workers` : 'Optimal'}
        </span>
      )
    },
    {
      key: 'recommendedAction',
      header: 'Recommended action',
      render: (p) => (
        <span className='px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700'>
          {p.recommendedAction}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (p) => <StatusBadge status={p.status} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (p, idx) => (
        p.status !== 'balanced' ? (
          <Button size='sm' onClick={() => handleApprove(idx)} className='h-7 text-xs px-2.5'>
            Authorize
          </Button>
        ) : (
          <span className='text-xs text-emerald-700 font-medium'>Authorized</span>
        )
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Capacity Recommendations'
        description='Recommended staffing adjustments.'
      />

      <DataTable columns={columns} data={plans} pageSize={8} />
    </div>
  );
};
