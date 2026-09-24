import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockDisputes } from '../../data/safety';
import { DisputeCase } from '../../types';

export const Disputes: React.FC = () => {
  const [disputes, setDisputes] = useState<DisputeCase[]>(mockDisputes);
  const [selectedDispute, setSelectedDispute] = useState<DisputeCase | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleResolve = (refund: boolean) => {
    if (!selectedDispute) return;
    setDisputes(prev => prev.map(d => d.id === selectedDispute.id ? {
      ...d,
      status: 'resolved',
      refundApproved: refund,
      resolutionSummary: refund ? 'Customer refund approved.' : 'Resolved without financial adjustment.'
    } : d));
    setModalOpen(false);
  };

  const columns: Column<DisputeCase>[] = [
    {
      key: 'disputeRef',
      header: 'Dispute ID',
      sortable: true,
      render: (d) => (
        <div>
          <span className='font-medium text-slate-900 block'>{d.disputeRef}</span>
          <span className='text-xs text-slate-400'>Filed {d.filedDate}</span>
        </div>
      )
    },
    {
      key: 'bookingRef',
      header: 'Booking',
      render: (d) => (
        <span className='text-xs text-slate-700 font-medium'>{d.bookingRef}</span>
      )
    },
    {
      key: 'customerName',
      header: 'Parties',
      render: (d) => (
        <div className='text-xs'>
          <span className='font-medium text-slate-800 block'>{d.customerName}</span>
          <span className='text-slate-400'>{d.workerName} ({d.cooperativeName})</span>
        </div>
      )
    },
    {
      key: 'amountDisputed',
      header: 'Amount',
      sortable: true,
      align: 'right',
      render: (d) => <span className='font-medium text-slate-900'>₹{d.amountDisputed.toLocaleString()}</span>
    },
    {
      key: 'reason',
      header: 'Issue',
      render: (d) => (
        <span className='text-xs text-slate-600 max-w-xs block truncate' title={d.reason}>{d.reason}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (d) => <StatusBadge status={d.status} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (d) => (
        <Button
          size='sm'
          variant='outline'
          onClick={() => {
            setSelectedDispute(d);
            setModalOpen(true);
          }}
          className='h-7 text-xs px-2.5'
        >
          Review
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Disputes'
        description='Customer and worker dispute claims.'
      />

      <DataTable columns={columns} data={disputes} pageSize={8} />

      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedDispute ? `Dispute ${selectedDispute.disputeRef}` : 'Dispute details'}
        description={selectedDispute ? `${selectedDispute.customerName} vs ${selectedDispute.workerName}` : ''}
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setModalOpen(false)}>Close</Button>
            <Button size='sm' variant='secondary' onClick={() => handleResolve(false)}>Reject claim</Button>
            <Button size='sm' variant='success' onClick={() => handleResolve(true)}>Approve refund</Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <div className='p-3.5 bg-slate-50/75 rounded-xl border border-slate-100 space-y-1'>
            <span className='font-medium text-slate-900 block'>Claim detail</span>
            <p className='text-slate-600 leading-relaxed'>{selectedDispute?.reason}</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
