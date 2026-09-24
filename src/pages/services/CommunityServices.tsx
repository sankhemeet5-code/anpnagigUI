import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockCommunityServices } from '../../data/emergencies';
import { CommunityServiceRequest } from '../../types';

export const CommunityServices: React.FC = () => {
  const [requests, setRequests] = useState<CommunityServiceRequest[]>(mockCommunityServices);
  const [selectedReq, setSelectedReq] = useState<CommunityServiceRequest | null>(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const handleAssignTeam = () => {
    if (!selectedReq) return;
    setRequests(prev => prev.map(r => r.id === selectedReq.id ? {
      ...r,
      status: 'assigned',
      assignedCooperativeName: 'Mumbai Shramik Seva Cooperative',
      assignedTeamSize: 6
    } : r));
    setAssignModalOpen(false);
  };

  const columns: Column<CommunityServiceRequest>[] = [
    {
      key: 'organizationName',
      header: 'Organization',
      sortable: true,
      render: (r) => (
        <div>
          <span className='font-medium text-slate-900 block'>{r.organizationName}</span>
          <span className='text-xs text-slate-400'>{r.contactPerson} • {r.contactPhone}</span>
        </div>
      )
    },
    {
      key: 'serviceCategory',
      header: 'Service',
      sortable: true,
      render: (r) => (
        <span className='text-xs text-slate-700'>{r.serviceCategory}</span>
      )
    },
    {
      key: 'serviceArea',
      header: 'Area',
      render: (r) => (
        <span className='text-xs text-slate-600'>{r.serviceArea}</span>
      )
    },
    {
      key: 'beneficiariesCount',
      header: 'Beneficiaries',
      sortable: true,
      render: (r) => (
        <span className='text-slate-900 text-xs'>{r.beneficiariesCount}</span>
      )
    },
    {
      key: 'assignedCooperativeName',
      header: 'Assigned cooperative',
      render: (r) => (
        <div>
          <span className='text-slate-800 text-xs block'>{r.assignedCooperativeName || 'Unassigned'}</span>
          {r.assignedTeamSize && (
            <span className='text-xs text-emerald-700'>{r.assignedTeamSize} workers</span>
          )}
        </div>
      )
    },
    {
      key: 'subsidyCoveredPercent',
      header: 'Subsidy',
      render: (r) => (
        <span className='px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700'>
          {r.subsidyCoveredPercent}%
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
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (r) => (
        <Button
          size='sm'
          variant='outline'
          onClick={() => {
            setSelectedReq(r);
            setAssignModalOpen(true);
          }}
          className='h-7 text-xs px-2.5'
        >
          Assign
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Community Services'
        description='Subsidized community and welfare requests.'
      />

      <DataTable columns={columns} data={requests} pageSize={8} />

      <Dialog
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        title='Assign cooperative squad'
        description={selectedReq ? `Assign squad for ${selectedReq.organizationName}.` : ''}
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setAssignModalOpen(false)}>Cancel</Button>
            <Button size='sm' onClick={handleAssignTeam}>Assign squad</Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <p className='text-slate-600'>Select cooperative:</p>
          <select className='w-full p-2 rounded-xl border border-slate-200 text-xs bg-white'>
            <option>Mumbai Shramik Seva Cooperative</option>
            <option>Navi Mumbai Urban Workers Union</option>
            <option>Pune Karigar Ekta Society</option>
          </select>
        </div>
      </Dialog>
    </div>
  );
};
