import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockCooperatives } from '../../data/cooperatives';
import { Cooperative } from '../../types';

export const CooperativesList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredData = mockCooperatives.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: Column<Cooperative>[] = [
    {
      key: 'name',
      header: 'Cooperative',
      sortable: true,
      render: (c) => (
        <div className='flex items-center gap-2.5'>
          <div className='h-8 w-8 rounded-xl bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center border border-slate-200'>
            <Building2 className='h-4 w-4 text-slate-600' />
          </div>
          <div>
            <span className='font-medium text-slate-900 block'>{c.name}</span>
            <span className='text-xs text-slate-400'>{c.registrationNumber}</span>
          </div>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      render: (c) => (
        <div>
          <span className='text-xs text-slate-800 block'>{c.location}</span>
          <span className='text-xs text-slate-400'>{c.zone}</span>
        </div>
      )
    },
    {
      key: 'memberCount',
      header: 'Members',
      sortable: true,
      render: (c) => (
        <div>
          <span className='font-medium text-slate-900'>{c.memberCount} members</span>
          <span className='text-xs text-slate-400 block'>{c.activeWorkers} active</span>
        </div>
      )
    },
    {
      key: 'servicesProvided',
      header: 'Trades',
      render: (c) => (
        <div className='flex flex-wrap gap-1'>
          {c.servicesProvided.map((s, i) => (
            <span key={i} className='px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] rounded'>
              {s}
            </span>
          ))}
        </div>
      )
    },
    {
      key: 'serviceQualityScore',
      header: 'Rating',
      sortable: true,
      render: (c) => (
        <span className='text-xs text-slate-700 font-medium'>
          ★ {c.serviceQualityScore > 0 ? c.serviceQualityScore : 'New'}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (c) => <StatusBadge status={c.status} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (c) => (
        <Button
          size='sm'
          variant='outline'
          onClick={() => navigate(`/cooperatives/${c.id}`)}
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
        title='Cooperatives'
        description='Registered cooperative societies.'
        action={
          <Button size='sm' onClick={() => navigate('/cooperatives/approval')} className='text-xs h-8'>
            <ShieldCheck className='h-3.5 w-3.5 mr-1.5' /> Approval queue
          </Button>
        }
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search by name, reg number, location...'
        filters={[
          {
            id: 'status',
            label: 'Status',
            selectedValue: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Pending Approval', value: 'pending_approval' },
              { label: 'Under Review', value: 'under_review' }
            ]
          }
        ]}
        onReset={() => {
          setSearchQuery('');
          setStatusFilter('all');
        }}
      />

      <DataTable columns={columns} data={filteredData} pageSize={8} />
    </div>
  );
};
