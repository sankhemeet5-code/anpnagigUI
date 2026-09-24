import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { mockCooperativeFinances } from '../../data/finance';
import { CooperativeFinanceItem } from '../../types';

export const CooperativeFinance: React.FC = () => {
  const [finances] = useState<CooperativeFinanceItem[]>(mockCooperativeFinances);

  const columns: Column<CooperativeFinanceItem>[] = [
    {
      key: 'cooperativeName',
      header: 'Cooperative society',
      sortable: true,
      render: (f) => (
        <div>
          <span className='font-medium text-slate-900 block text-xs'>{f.cooperativeName}</span>
          <span className='text-xs text-slate-400'>{f.cooperativeId}</span>
        </div>
      )
    },
    {
      key: 'totalMembers',
      header: 'Members',
      sortable: true,
      render: (f) => <span className='text-xs text-slate-700'>{f.totalMembers} workers</span>
    },
    {
      key: 'monthlyRevenue',
      header: 'Monthly volume',
      sortable: true,
      align: 'right',
      render: (f) => <span className='font-medium text-slate-900'>₹{f.monthlyRevenue.toLocaleString()}</span>
    },
    {
      key: 'collectedDues',
      header: 'Collected dues',
      sortable: true,
      align: 'right',
      render: (f) => <span className='text-slate-800 text-xs font-medium'>₹{f.collectedDues.toLocaleString()}</span>
    },
    {
      key: 'welfareReserve',
      header: 'Welfare reserve',
      sortable: true,
      align: 'right',
      render: (f) => <span className='text-emerald-700 text-xs font-medium'>₹{f.welfareReserve.toLocaleString()}</span>
    },
    {
      key: 'platformSettlementDue',
      header: 'Settlement due',
      sortable: true,
      align: 'right',
      render: (f) => <span className='text-slate-500 text-xs'>₹{f.platformSettlementDue.toLocaleString()}</span>
    },
    {
      key: 'lastSettlementDate',
      header: 'Last settlement',
      render: (f) => <span className='text-xs text-slate-400'>{f.lastSettlementDate}</span>
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Cooperative Finance'
        description='Cooperative revenue and dues summary.'
      />

      <DataTable columns={columns} data={finances} pageSize={8} />
    </div>
  );
};
