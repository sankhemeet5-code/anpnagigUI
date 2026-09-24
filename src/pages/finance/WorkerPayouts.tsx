import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockPayouts } from '../../data/finance';
import { WorkerPayoutItem } from '../../types';

export const WorkerPayouts: React.FC = () => {
  const [payouts] = useState<WorkerPayoutItem[]>(mockPayouts);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = payouts.filter(p =>
    p.payoutRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.cooperativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<WorkerPayoutItem>[] = [
    {
      key: 'payoutRef',
      header: 'Payout Ref',
      sortable: true,
      render: (p) => (
        <div>
          <span className='font-medium text-slate-900 block'>{p.payoutRef}</span>
          <span className='text-xs text-slate-400'>{p.period}</span>
        </div>
      )
    },
    {
      key: 'workerName',
      header: 'Worker',
      sortable: true,
      render: (p) => (
        <div>
          <span className='font-medium text-slate-900 block'>{p.workerName}</span>
          <span className='text-xs text-slate-400'>{p.workerId} • {p.cooperativeName}</span>
        </div>
      )
    },
    {
      key: 'bankAccountMasked',
      header: 'Disbursement account',
      render: (p) => (
        <span className='text-xs text-slate-700 font-mono'>{p.bankAccountMasked}</span>
      )
    },
    {
      key: 'grossEarnings',
      header: 'Gross earnings',
      sortable: true,
      align: 'right',
      render: (p) => <span className='text-slate-800 font-medium'>₹{p.grossEarnings.toLocaleString()}</span>
    },
    {
      key: 'welfareDeductions',
      header: 'Welfare fund',
      sortable: true,
      align: 'right',
      render: (p) => <span className='text-slate-500 text-xs'>-₹{p.welfareDeductions.toLocaleString()}</span>
    },
    {
      key: 'netPayout',
      header: 'Net payout',
      sortable: true,
      align: 'right',
      render: (p) => <span className='font-semibold text-slate-900'>₹{p.netPayout.toLocaleString()}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (p) => <StatusBadge status={p.status} size='sm' />
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Worker Payouts'
        description='Worker disbursements and welfare deductions.'
        action={
          <Button size='sm' variant='outline' className='text-xs h-8'>
            <Download className='h-3.5 w-3.5 mr-1.5' /> Export
          </Button>
        }
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search by payout reference, worker, cooperative...'
      />

      <DataTable columns={columns} data={filtered} pageSize={8} />
    </div>
  );
};
