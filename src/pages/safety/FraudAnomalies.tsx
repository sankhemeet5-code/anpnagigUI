import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockAnomalies } from '../../data/safety';
import { AnomalyCase } from '../../types';

export const FraudAnomalies: React.FC = () => {
  const [anomalies, setAnomalies] = useState<AnomalyCase[]>(mockAnomalies);
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyCase | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);

  const handleUpdateStatus = (status: AnomalyCase['status']) => {
    if (!selectedAnomaly) return;
    setAnomalies(prev => prev.map(a => a.id === selectedAnomaly.id ? { ...a, status } : a));
    setActionDialogOpen(false);
  };

  const columns: Column<AnomalyCase>[] = [
    {
      key: 'caseRef',
      header: 'Case ID',
      sortable: true,
      render: (a) => (
        <div>
          <span className='font-medium text-slate-900 block'>{a.caseRef}</span>
          <span className='text-xs text-slate-400'>{a.detectedAt}</span>
        </div>
      )
    },
    {
      key: 'type',
      header: 'Anomaly type',
      sortable: true,
      render: (a) => (
        <span className='text-xs text-slate-800'>{a.type}</span>
      )
    },
    {
      key: 'involvedEntity.name',
      header: 'Account',
      render: (a) => (
        <div>
          <span className='font-medium text-slate-800 block text-xs'>{a.involvedEntity.name}</span>
          <span className='text-xs text-slate-400 capitalize'>{a.involvedEntity.type} • {a.involvedEntity.id}</span>
        </div>
      )
    },
    {
      key: 'severity',
      header: 'Severity',
      sortable: true,
      render: (a) => <PriorityBadge priority={a.severity} size='sm' />
    },
    {
      key: 'evidenceSnippet',
      header: 'Signal',
      render: (a) => (
        <span className='text-xs text-slate-600 max-w-xs block truncate' title={a.evidenceSnippet}>
          {a.evidenceSnippet}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (a) => <StatusBadge status={a.status} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (a) => (
        <Button
          size='sm'
          variant='outline'
          onClick={() => {
            setSelectedAnomaly(a);
            setActionDialogOpen(true);
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
        title='Fraud & Anomalies'
        description='Monitor unusual patterns and account flags.'
      />

      <DataTable columns={columns} data={anomalies} pageSize={8} />

      <Dialog
        isOpen={actionDialogOpen}
        onClose={() => setActionDialogOpen(false)}
        title='Review anomaly'
        description={selectedAnomaly ? `Reviewing case ${selectedAnomaly.caseRef}.` : ''}
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button size='sm' variant='ghost' onClick={() => setActionDialogOpen(false)}>Close</Button>
            <Button size='sm' variant='secondary' onClick={() => handleUpdateStatus('dismissed')}>Dismiss</Button>
            <Button size='sm' variant='success' onClick={() => handleUpdateStatus('resolved')}>Mark resolved</Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <div className='p-3 bg-slate-50/75 rounded-xl border border-slate-100 space-y-1'>
            <span className='font-medium text-slate-900 block'>Signal description</span>
            <p className='text-slate-600'>{selectedAnomaly?.description}</p>
            <p className='text-slate-400 text-xs mt-1'>{selectedAnomaly?.evidenceSnippet}</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
