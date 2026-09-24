import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockMonthlyCapacityPlans } from '../../data/emergencies';
import { CapacityPlanMonth } from '../../types';

export const CapacityPlanning: React.FC = () => {
  const [plans, setPlans] = useState<CapacityPlanMonth[]>(mockMonthlyCapacityPlans);
  const [selectedPlan, setSelectedPlan] = useState<CapacityPlanMonth | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleApproveHiring = () => {
    if (!selectedPlan) return;
    setPlans(prev => prev.map(p => (p.month === selectedPlan.month && p.service === selectedPlan.service && p.zone === selectedPlan.zone) ? { ...p, status: 'balanced' } : p));
    setModalOpen(false);
  };

  const columns: Column<CapacityPlanMonth>[] = [
    {
      key: 'month',
      header: 'Month',
      sortable: true,
      render: (p) => (
        <span className='font-medium text-slate-900 text-xs'>{p.month}</span>
      )
    },
    {
      key: 'service',
      header: 'Trade & zone',
      sortable: true,
      render: (p) => (
        <div>
          <span className='font-medium text-slate-800 block text-xs'>{p.service}</span>
          <span className='text-xs text-slate-400'>{p.zone}</span>
        </div>
      )
    },
    {
      key: 'projectedDemand',
      header: 'Forecast demand',
      sortable: true,
      align: 'right',
      render: (p) => (
        <span className='text-slate-800 text-xs'>{p.projectedDemand} bookings</span>
      )
    },
    {
      key: 'availableWorkers',
      header: 'Capacity',
      render: (p) => (
        <span className='text-slate-700 text-xs'>{p.availableWorkers} / {p.requiredWorkers} workers</span>
      )
    },
    {
      key: 'gap',
      header: 'Deficit / Surplus',
      sortable: true,
      render: (p) => (
        <span className={`text-xs font-medium ${p.gap > 0 ? 'text-amber-800' : 'text-emerald-700'}`}>
          {p.gap > 0 ? `+${p.gap} deficit` : `${Math.abs(p.gap)} surplus`}
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
      render: (p) => (
        <Button
          size='sm'
          variant='outline'
          onClick={() => {
            setSelectedPlan(p);
            setModalOpen(true);
          }}
          className='h-7 text-xs px-2.5'
        >
          Adjust
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Capacity Planning'
        description='Monthly capacity forecasts and staffing requirements.'
      />

      <DataTable columns={columns} data={plans} pageSize={8} />

      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title='Adjust capacity plan'
        description={selectedPlan ? `${selectedPlan.service} in ${selectedPlan.month}.` : ''}
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size='sm' onClick={handleApproveHiring}>Authorize intake</Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <p className='text-slate-600'>
            Authorize <strong>+{selectedPlan?.gap || 0} apprentice positions</strong> for {selectedPlan?.zone}.
          </p>
        </div>
      </Dialog>
    </div>
  );
};
