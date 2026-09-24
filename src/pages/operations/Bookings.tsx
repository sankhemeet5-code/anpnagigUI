import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Download } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockBookings } from '../../data/bookings';
import { Booking } from '../../types';

export const Bookings: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const filteredData = mockBookings.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.workerName && b.workerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesService = serviceFilter === 'all' || b.categoryName.toLowerCase().includes(serviceFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesService;
  });

  const columns: Column<Booking>[] = [
    {
      key: 'bookingCode',
      header: 'Booking ID',
      sortable: true,
      render: (b) => (
        <div>
          <span className='font-semibold text-slate-900 block'>{b.bookingCode}</span>
          <span className='text-slate-400 text-xs'>{b.date} • {b.timeSlot}</span>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (b) => (
        <div>
          <span className='font-medium text-slate-800 block'>{b.customerName}</span>
          <span className='text-slate-400 text-xs'>{b.customerPhone}</span>
        </div>
      )
    },
    {
      key: 'workerName',
      header: 'Worker',
      render: (b) => (
        <div>
          <span className='font-medium text-slate-800 block'>{b.workerName || 'Unassigned'}</span>
          <span className='text-xs text-slate-500'>{b.cooperativeName || 'Cooperative'}</span>
        </div>
      )
    },
    {
      key: 'serviceName',
      header: 'Service',
      render: (b) => (
        <div>
          <span className='font-medium text-slate-800 block'>{b.serviceName}</span>
          <span className='text-xs text-slate-400'>{b.categoryName}</span>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      render: (b) => (
        <span className='text-xs text-slate-600 block max-w-xs truncate'>{b.location}</span>
      )
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'right',
      render: (b) => (
        <span className='font-medium text-slate-900'>₹{b.amount.toLocaleString()}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (b) => <StatusBadge status={b.status} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (b) => (
        <Button
          size='sm'
          variant='outline'
          onClick={() => navigate(`/bookings/${b.id}`)}
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
        title='Bookings'
        description='Manage bookings, technician dispatches, and status.'
        action={
          <Button variant='outline' size='sm' className='text-xs h-8'>
            <Download className='h-3.5 w-3.5 mr-1.5' /> Export
          </Button>
        }
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search by booking code, customer, worker, address...'
        filters={[
          {
            id: 'status',
            label: 'Status',
            selectedValue: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'In Progress', value: 'in_progress' },
              { label: 'Completed', value: 'completed' },
              { label: 'Arrived', value: 'arrived' },
              { label: 'Pending', value: 'pending' },
              { label: 'Delayed', value: 'delayed' }
            ]
          },
          {
            id: 'service',
            label: 'Trade',
            selectedValue: serviceFilter,
            onChange: setServiceFilter,
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
          setServiceFilter('all');
        }}
      />

      <DataTable columns={columns} data={filteredData} pageSize={8} />
    </div>
  );
};
