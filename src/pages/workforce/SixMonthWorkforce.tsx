import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockWorkers } from '../../data/workers';
import { Worker } from '../../types';

export const SixMonthWorkforce: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockWorkers.filter(w => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.workerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.cooperativeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || w.sixMonthCommitment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: Column<Worker>[] = [
    {
      key: 'name',
      header: 'Worker',
      sortable: true,
      render: (w) => (
        <div>
          <span className='font-medium text-slate-900 block'>{w.name}</span>
          <span className='text-xs text-slate-400'>{w.workerId} • {w.cooperativeName}</span>
        </div>
      )
    },
    {
      key: 'sixMonthCommitment.startDate',
      header: 'Cycle period',
      render: (w) => (
        <div className='text-xs text-slate-700'>
          <span>{w.sixMonthCommitment.startDate}</span>
          <span className='text-slate-400 block'>Ends {w.sixMonthCommitment.endDate}</span>
        </div>
      )
    },
    {
      key: 'progress',
      header: 'Tenure progress',
      render: (w) => (
        <div className='space-y-1 w-24'>
          <div className='flex justify-between text-xs text-slate-700'>
            <span>{w.sixMonthCommitment.completedMonths}/{w.sixMonthCommitment.targetMonths} mo</span>
            <span className='text-slate-400'>
              {Math.round((w.sixMonthCommitment.completedMonths / w.sixMonthCommitment.targetMonths) * 100)}%
            </span>
          </div>
          <div className='h-1.5 w-full bg-slate-100 rounded-full overflow-hidden'>
            <div
              className='h-full bg-[#159FE3]'
              style={{ width: `${(w.sixMonthCommitment.completedMonths / w.sixMonthCommitment.targetMonths) * 100}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'stipendEligible',
      header: 'Stipend eligibility',
      render: (w) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${w.sixMonthCommitment.stipendEligible ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
          {w.sixMonthCommitment.stipendEligible ? 'Eligible (₹15,000)' : 'In progress'}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (w) => <StatusBadge status={w.sixMonthCommitment.status} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (w) => (
        <Button size='sm' variant='outline' onClick={() => navigate(`/workers/${w.id}`)} className='h-7 text-xs px-2.5'>
          View
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Six-Month Workforce'
        description='Track workforce commitment milestones and stipends.'
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search candidates...'
        filters={[
          {
            id: 'status',
            label: 'Milestone',
            selectedValue: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Completing Soon', value: 'completing_soon' },
              { label: 'Completed', value: 'completed' }
            ]
          }
        ]}
        onReset={() => {
          setSearchQuery('');
          setStatusFilter('all');
        }}
      />

      <DataTable columns={columns} data={filtered} pageSize={8} />
    </div>
  );
};
