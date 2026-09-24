import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, MapPin, AlertCircle, HardHat, RefreshCw, Eye } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockBookings } from '../../data/bookings';
import { Booking } from '../../types';

export const LiveOperations: React.FC = () => {
  const navigate = useNavigate();
  const [selectedZone, setSelectedZone] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const filteredJobs = mockBookings.filter(b => {
    if (selectedZone === 'all') return true;
    return b.zone.toLowerCase().includes(selectedZone.toLowerCase());
  });

  const columns: Column<Booking>[] = [
    {
      key: 'bookingCode',
      header: 'Booking ID',
      sortable: true,
      render: (b) => (
        <span className='font-semibold text-slate-900'>{b.bookingCode}</span>
      )
    },
    {
      key: 'serviceName',
      header: 'Service',
      render: (b) => (
        <div>
          <span className='font-medium text-slate-800 block'>{b.serviceName}</span>
          <span className='text-slate-400 text-xs'>{b.categoryName}</span>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (b) => (
        <div>
          <span className='font-medium text-slate-800 block'>{b.customerName}</span>
          <span className='text-slate-400 text-xs truncate max-w-xs block'>{b.location}</span>
        </div>
      )
    },
    {
      key: 'workerName',
      header: 'Assigned worker',
      render: (b) => (
        <div>
          <span className='font-medium text-slate-800 block'>{b.workerName || 'Matching...'}</span>
          <span className='text-xs text-slate-500'>{b.cooperativeName || 'Cooperative'}</span>
        </div>
      )
    },
    {
      key: 'startOtpVerified',
      header: 'Start OTP',
      render: (b) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${b.startOtpVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
          {b.startOtpVerified ? 'Verified' : 'Pending'}
        </span>
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
      render: (b) => (
        <Button size='sm' variant='outline' onClick={() => navigate(`/bookings/${b.id}`)} className='h-7 text-xs px-2.5'>
          View
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Live Operations'
        description='Real-time dispatch, zones, and status tracking.'
        action={
          <div className='flex items-center gap-2'>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className='h-8 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#159FE3]'
            >
              <option value='all'>All zones</option>
              <option value='West Zone'>Mumbai West</option>
              <option value='North Zone'>Mumbai North</option>
              <option value='Pune'>Pune</option>
              <option value='Thane'>Thane</option>
            </select>

            <Button size='sm' variant='outline' onClick={handleRefresh} isLoading={isRefreshing} className='h-8 text-xs'>
              <RefreshCw className='h-3.5 w-3.5 mr-1' /> Sync
            </Button>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <StatCard title='Active Jobs' value='42' change='12 in progress' trend='neutral' icon={<Radio className='h-4 w-4' />} />
        <StatCard title='Workers Dispatched' value='94%' change='Normal coverage' trend='up' icon={<HardHat className='h-4 w-4' />} />
        <StatCard title='Delayed Check-ins' value='1' change='Hinjawadi route' trend='down' icon={<AlertCircle className='h-4 w-4' />} />
        <StatCard title='Avg Start OTP Delay' value='2.8 min' change='Within SLA' trend='up' icon={<MapPin className='h-4 w-4' />} />
      </div>

      {/* Zone Overview Grid */}
      <div className='card-soft p-5 space-y-4'>
        <div className='flex items-center justify-between pb-2 border-b border-slate-100'>
          <h3 className='text-card-title'>Zone overview</h3>
          <div className='flex items-center gap-4 text-xs text-slate-500'>
            <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-emerald-500' /> In progress</span>
            <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-[#159FE3]' /> Arrived</span>
            <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-amber-500' /> Delayed</span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='p-4 rounded-xl bg-slate-50/75 border border-slate-100 space-y-1.5'>
            <div className='flex items-center justify-between'>
              <span className='font-semibold text-xs text-slate-900'>Zone A: Mumbai West</span>
              <span className='text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded'>Normal</span>
            </div>
            <p className='text-xs text-slate-500'>18 active jobs • 48 workers on duty</p>
          </div>

          <div className='p-4 rounded-xl bg-slate-50/75 border border-slate-100 space-y-1.5'>
            <div className='flex items-center justify-between'>
              <span className='font-semibold text-xs text-slate-900'>Zone B: Pune Central</span>
              <span className='text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded'>1 delayed</span>
            </div>
            <p className='text-xs text-slate-500'>14 active jobs • 32 workers on duty</p>
          </div>

          <div className='p-4 rounded-xl bg-slate-50/75 border border-slate-100 space-y-1.5'>
            <div className='flex items-center justify-between'>
              <span className='font-semibold text-xs text-slate-900'>Zone C: Thane</span>
              <span className='text-[11px] font-medium text-sky-700 bg-sky-50 px-2 py-0.5 rounded'>Normal</span>
            </div>
            <p className='text-xs text-slate-500'>10 active jobs • 24 workers on duty</p>
          </div>
        </div>
      </div>

      {/* Live Dispatches Table */}
      <DataTable columns={columns} data={filteredJobs} pageSize={5} />
    </div>
  );
};
