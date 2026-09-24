import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { DataTable, Column } from '../../components/common/DataTable';
import { mockUsers } from '../../data/users';
import { mockBookings } from '../../data/bookings';
import { mockWorkers } from '../../data/workers';
import { Booking } from '../../types';

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState(mockUsers.find(u => u.id === id) || mockUsers[0]);
  const [activeTab, setActiveTab] = useState('bookings');

  const userBookings = mockBookings.filter(b => b.customerId === user.id || b.customerName === user.name);
  const preferredWorkerRecords = mockWorkers.filter(w => (user.preferredWorkers || []).includes(w.id));

  const bookingColumns: Column<Booking>[] = [
    { key: 'bookingCode', header: 'Booking ID', render: (b) => <span className='font-medium text-slate-900'>{b.bookingCode}</span> },
    { key: 'serviceName', header: 'Service', render: (b) => <span>{b.serviceName}</span> },
    { key: 'workerName', header: 'Worker', render: (b) => <span>{b.workerName || 'Auto Match'}</span> },
    { key: 'date', header: 'Date', render: (b) => <span className='text-xs text-slate-500'>{b.date}</span> },
    { key: 'amount', header: 'Amount', align: 'right', render: (b) => <span className='font-medium text-slate-900'>₹{b.amount.toLocaleString()}</span> },
    { key: 'status', header: 'Status', render: (b) => <StatusBadge status={b.status} size='sm' /> },
  ];

  const handleToggleSuspend = () => {
    setUser(prev => ({
      ...prev,
      status: prev.status === 'suspended' ? 'active' : 'suspended'
    }));
  };

  return (
    <div className='space-y-6 pb-12'>
      <button
        onClick={() => navigate('/users')}
        className='inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors'
      >
        <ArrowLeft className='h-4 w-4 mr-1' /> Back to users
      </button>

      {/* Profile Overview Card */}
      <div className='card-soft p-6 space-y-5'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-slate-100'>
          <div className='flex items-center gap-3.5'>
            <div className='h-12 w-12 rounded-xl bg-slate-100 text-slate-700 font-medium text-base flex items-center justify-center border border-slate-200'>
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-xl font-semibold text-slate-900'>{user.name}</h1>
                <StatusBadge status={user.status} size='sm' />
              </div>
              <p className='text-xs text-slate-400 mt-0.5'>ID: {user.id} • Joined {user.joinedDate}</p>
            </div>
          </div>

          <div>
            <Button
              size='sm'
              variant={user.status === 'suspended' ? 'success' : 'danger'}
              onClick={handleToggleSuspend}
              className='text-xs h-8'
            >
              {user.status === 'suspended' ? 'Restore user' : 'Suspend user'}
            </Button>
          </div>
        </div>

        {/* Info Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs'>
          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Email</span>
            <span className='font-medium text-slate-800 break-all flex items-center gap-1'>
              <Mail className='h-3 w-3 text-slate-400' /> {user.email}
            </span>
          </div>

          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Phone</span>
            <span className='font-medium text-slate-800 flex items-center gap-1'>
              <Phone className='h-3 w-3 text-slate-400' /> {user.phone}
            </span>
          </div>

          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Location</span>
            <span className='font-medium text-slate-800 flex items-center gap-1'>
              <MapPin className='h-3 w-3 text-slate-400' /> {user.location}
            </span>
          </div>

          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Lifetime spend</span>
            <span className='font-semibold text-slate-900'>₹{user.spentTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'bookings', label: 'Bookings', badge: userBookings.length },
          { id: 'preferred', label: 'Preferred workers', badge: preferredWorkerRecords.length },
          { id: 'complaints', label: 'Complaints', badge: user.complaintsCount || 0 },
        ]}
      />

      {/* Tab Contents */}
      {activeTab === 'bookings' && (
        <DataTable
          columns={bookingColumns}
          data={userBookings}
          emptyTitle='No bookings found'
        />
      )}

      {activeTab === 'preferred' && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {preferredWorkerRecords.map(w => (
            <div key={w.id} className='card-soft p-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='h-9 w-9 rounded-xl bg-slate-100 text-slate-600 font-medium flex items-center justify-center text-xs'>
                  {w.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className='text-xs font-semibold text-slate-900'>{w.name}</h4>
                  <p className='text-slate-400 text-xs'>{w.primarySkill} • {w.cooperativeName}</p>
                </div>
              </div>
              <Button size='sm' variant='outline' onClick={() => navigate(`/workers/${w.id}`)} className='text-xs h-7'>
                View
              </Button>
            </div>
          ))}
          {preferredWorkerRecords.length === 0 && (
            <p className='text-xs text-slate-500 col-span-full py-6 text-center'>No preferred workers listed.</p>
          )}
        </div>
      )}

      {activeTab === 'complaints' && (
        <div className='card-soft p-6 text-xs text-slate-600'>
          {user.complaintsCount && user.complaintsCount > 0 ? (
            <div className='p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800'>
              Service delay report logged for booking AG-2026-0826-22.
            </div>
          ) : (
            <p className='text-center py-4 text-slate-400'>No complaints on file.</p>
          )}
        </div>
      )}
    </div>
  );
};
