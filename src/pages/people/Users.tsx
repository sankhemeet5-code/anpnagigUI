import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Star } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockUsers } from '../../data/users';
import { User } from '../../types';

export const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');

  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery) ||
      u.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchesZone = zoneFilter === 'all' || u.zone.toLowerCase().includes(zoneFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesZone;
  });

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Customer',
      sortable: true,
      render: (u) => (
        <div className='flex items-center gap-2.5'>
          <div className='h-7 w-7 rounded-full bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center border border-slate-200'>
            {u.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <span className='font-medium text-slate-900 block'>{u.name}</span>
            <span className='text-xs text-slate-400'>{u.id}</span>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      header: 'Contact',
      render: (u) => (
        <div>
          <span className='text-xs text-slate-700 block'>{u.email}</span>
          <span className='text-xs text-slate-400'>{u.phone}</span>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      render: (u) => (
        <div>
          <span className='text-xs text-slate-800 block'>{u.location}</span>
          <span className='text-xs text-slate-400'>{u.zone}</span>
        </div>
      )
    },
    {
      key: 'totalBookings',
      header: 'Bookings',
      sortable: true,
      render: (u) => (
        <span className='text-slate-800'>{u.totalBookings} orders</span>
      )
    },
    {
      key: 'spentTotal',
      header: 'Total spend',
      sortable: true,
      align: 'right',
      render: (u) => (
        <span className='font-medium text-slate-900'>₹{u.spentTotal.toLocaleString()}</span>
      )
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      render: (u) => (
        <div className='flex items-center gap-1 text-xs text-slate-700'>
          <Star className='h-3.5 w-3.5 fill-amber-400 text-amber-400' />
          <span>{u.rating}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (u) => <StatusBadge status={u.status} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (u) => (
        <Button
          size='sm'
          variant='outline'
          onClick={() => navigate(`/users/${u.id}`)}
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
        title='Users'
        description='Customer directory and account status.'
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search by name, phone, email...'
        filters={[
          {
            id: 'status',
            label: 'Status',
            selectedValue: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Suspended', value: 'suspended' }
            ]
          },
          {
            id: 'zone',
            label: 'Zone',
            selectedValue: zoneFilter,
            onChange: setZoneFilter,
            options: [
              { label: 'Mumbai West', value: 'west' },
              { label: 'Mumbai North', value: 'north' },
              { label: 'Pune', value: 'pune' },
              { label: 'Thane', value: 'thane' }
            ]
          }
        ]}
        onReset={() => {
          setSearchQuery('');
          setStatusFilter('all');
          setZoneFilter('all');
        }}
      />

      <DataTable columns={columns} data={filteredUsers} pageSize={8} />
    </div>
  );
};
