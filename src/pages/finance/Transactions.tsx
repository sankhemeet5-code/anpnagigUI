import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockTransactions } from '../../data/finance';
import { TransactionItem } from '../../types';

export const Transactions: React.FC = () => {
  const [transactions] = useState<TransactionItem[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = transactions.filter(t => {
    const matchesSearch =
      t.transactionRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: Column<TransactionItem>[] = [
    {
      key: 'transactionRef',
      header: 'Transaction ID',
      sortable: true,
      render: (t) => (
        <div>
          <span className='font-medium text-slate-900 block'>{t.transactionRef}</span>
          <span className='text-xs text-slate-400'>{t.date}</span>
        </div>
      )
    },
    {
      key: 'bookingRef',
      header: 'Booking',
      render: (t) => <span className='text-xs text-slate-700'>{t.bookingRef}</span>
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (t) => <span className='text-xs text-slate-800 font-medium'>{t.customerName}</span>
    },
    {
      key: 'paymentMethod',
      header: 'Method',
      render: (t) => <span className='text-xs text-slate-600'>{t.paymentMethod}</span>
    },
    {
      key: 'totalAmount',
      header: 'Gross amount',
      sortable: true,
      align: 'right',
      render: (t) => <span className='font-medium text-slate-900'>₹{t.totalAmount.toLocaleString()}</span>
    },
    {
      key: 'workerPayout',
      header: 'Worker share',
      sortable: true,
      align: 'right',
      render: (t) => <span className='text-xs text-emerald-700 font-medium'>₹{t.workerPayout.toLocaleString()}</span>
    },
    {
      key: 'platformCommission',
      header: 'Fee',
      sortable: true,
      align: 'right',
      render: (t) => <span className='text-xs text-slate-500'>₹{t.platformCommission.toLocaleString()}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (t) => <StatusBadge status={t.status} size='sm' />
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Transactions'
        description='Payment records and revenue breakdown.'
        action={
          <Button size='sm' variant='outline' className='text-xs h-8'>
            <Download className='h-3.5 w-3.5 mr-1.5' /> Export
          </Button>
        }
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search by transaction ID, booking, customer...'
        filters={[
          {
            id: 'status',
            label: 'Status',
            selectedValue: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'Completed', value: 'completed' },
              { label: 'Pending', value: 'pending' },
              { label: 'Refunded', value: 'refunded' }
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
