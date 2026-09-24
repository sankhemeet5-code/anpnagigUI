import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ShieldCheck, QrCode } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockWorkers } from '../../data/workers';
import { Worker } from '../../types';

export const WorkersList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');

  const filteredWorkers = mockWorkers.filter(w => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.workerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    const matchesVerification = verificationFilter === 'all' || w.verificationStatus === verificationFilter;
    const matchesSkill = skillFilter === 'all' || w.primarySkill.toLowerCase().includes(skillFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesVerification && matchesSkill;
  });

  const columns: Column<Worker>[] = [
    {
      key: 'name',
      header: 'Worker',
      sortable: true,
      render: (w) => (
        <div className='flex items-center gap-2.5'>
          <div className='h-7 w-7 rounded-full bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center border border-slate-200'>
            {w.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <span className='font-medium text-slate-900 block'>{w.name}</span>
            <span className='text-xs text-slate-400'>{w.workerId}</span>
          </div>
        </div>
      )
    },
    {
      key: 'cooperativeName',
      header: 'Cooperative',
      sortable: true,
      render: (w) => (
        <span className='text-xs text-slate-700 block max-w-[180px] truncate'>
          {w.cooperativeName}
        </span>
      )
    },
    {
      key: 'primarySkill',
      header: 'Trade',
      render: (w) => (
        <div className='space-y-0.5'>
          <span className='font-medium text-slate-800 text-xs block'>{w.primarySkill}</span>
          <div className='flex flex-wrap gap-1'>
            {w.skills.slice(0, 2).map((s, i) => (
              <span key={i} className='px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] rounded'>
                {s}
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      render: (w) => (
        <div>
          <span className='text-xs text-slate-800 block'>{w.location}</span>
          <span className='text-xs text-slate-400'>{w.zone}</span>
        </div>
      )
    },
    {
      key: 'utilisationRate',
      header: 'Utilisation',
      sortable: true,
      render: (w) => (
        <div className='space-y-1 w-20'>
          <div className='flex justify-between text-xs text-slate-700'>
            <span>{w.utilisationRate}%</span>
            <span className='text-slate-400'>{w.completedJobs} jobs</span>
          </div>
          <div className='h-1.5 w-full bg-slate-100 rounded-full overflow-hidden'>
            <div
              className={`h-full ${
                w.utilisationRate > 85 ? 'bg-amber-500' : w.utilisationRate > 50 ? 'bg-emerald-500' : 'bg-[#159FE3]'
              }`}
              style={{ width: `${w.utilisationRate}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'verificationStatus',
      header: 'Verification',
      sortable: true,
      render: (w) => <StatusBadge status={w.verificationStatus} size='sm' />
    },
    {
      key: 'status',
      header: 'Duty status',
      sortable: true,
      render: (w) => <StatusBadge status={w.status} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (w) => (
        <Button
          size='sm'
          variant='outline'
          onClick={() => navigate(`/workers/${w.id}`)}
          className='h-7 text-xs px-2.5'
        >
          View
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Workers'
        description='Workforce directory and verification status.'
        action={
          <div className='flex items-center gap-2'>
            <Button size='sm' variant='outline' onClick={() => navigate('/workers/virtual-id')} className='text-xs h-8'>
              <QrCode className='h-3.5 w-3.5 mr-1.5' /> Virtual IDs
            </Button>
            <Button size='sm' onClick={() => navigate('/workers/verification')} className='text-xs h-8'>
              <ShieldCheck className='h-3.5 w-3.5 mr-1.5' /> Verification queue
            </Button>
          </div>
        }
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search by name, ID, trade, location...'
        filters={[
          {
            id: 'verification',
            label: 'Verification',
            selectedValue: verificationFilter,
            onChange: setVerificationFilter,
            options: [
              { label: 'Verified', value: 'verified' },
              { label: 'Pending', value: 'pending' },
              { label: 'Under Review', value: 'under_review' },
              { label: 'Needs Info', value: 'needs_info' }
            ]
          },
          {
            id: 'status',
            label: 'Status',
            selectedValue: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'Active', value: 'active' },
              { label: 'On Job', value: 'on_job' },
              { label: 'Offline', value: 'offline' }
            ]
          },
          {
            id: 'skill',
            label: 'Trade',
            selectedValue: skillFilter,
            onChange: setSkillFilter,
            options: [
              { label: 'Plumbing', value: 'plumbing' },
              { label: 'Electrical', value: 'electrical' },
              { label: 'Cleaning', value: 'cleaning' },
              { label: 'Carpentry', value: 'carpentry' },
              { label: 'Painting', value: 'painting' }
            ]
          }
        ]}
        onReset={() => {
          setSearchQuery('');
          setStatusFilter('all');
          setVerificationFilter('all');
          setSkillFilter('all');
        }}
      />

      <DataTable columns={columns} data={filteredWorkers} pageSize={8} />
    </div>
  );
};
