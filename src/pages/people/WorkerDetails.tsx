import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  QrCode,
  Briefcase,
  Wallet,
  Heart,
  CalendarRange
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { VirtualIDCard } from '../../components/common/VirtualIDCard';
import { DataTable, Column } from '../../components/common/DataTable';
import { mockWorkers } from '../../data/workers';
import { mockBookings } from '../../data/bookings';
import { mockPayouts } from '../../data/finance';
import { Booking, WorkerPayoutItem } from '../../types';

export const WorkerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(mockWorkers.find(w => w.id === id) || mockWorkers[0]);
  const [activeTab, setActiveTab] = useState('identity');

  const workerBookings = mockBookings.filter(b => b.workerId === worker.id || b.workerName === worker.name);
  const workerPayouts = mockPayouts.filter(p => p.workerId === worker.id || p.workerName === worker.name);

  const bookingColumns: Column<Booking>[] = [
    { key: 'bookingCode', header: 'Booking ID', render: (b) => <span className='font-medium text-slate-900'>{b.bookingCode}</span> },
    { key: 'serviceName', header: 'Service', render: (b) => <span>{b.serviceName}</span> },
    { key: 'customerName', header: 'Customer', render: (b) => <span>{b.customerName}</span> },
    { key: 'date', header: 'Date', render: (b) => <span className='text-xs text-slate-500'>{b.date}</span> },
    { key: 'amount', header: 'Amount', align: 'right', render: (b) => <span className='font-medium text-slate-900'>₹{b.amount.toLocaleString()}</span> },
    { key: 'status', header: 'Status', render: (b) => <StatusBadge status={b.status} size='sm' /> },
  ];

  const payoutColumns: Column<WorkerPayoutItem>[] = [
    { key: 'payoutRef', header: 'Payout Ref', render: (p) => <span className='font-medium text-slate-900'>{p.payoutRef}</span> },
    { key: 'period', header: 'Period', render: (p) => <span className='text-xs text-slate-600'>{p.period}</span> },
    { key: 'grossEarnings', header: 'Gross', align: 'right', render: (p) => <span>₹{p.grossEarnings.toLocaleString()}</span> },
    { key: 'welfareDeductions', header: 'Welfare', align: 'right', render: (p) => <span className='text-slate-500'>-₹{p.welfareDeductions}</span> },
    { key: 'netPayout', header: 'Net payout', align: 'right', render: (p) => <span className='font-medium text-slate-900'>₹{p.netPayout.toLocaleString()}</span> },
    { key: 'status', header: 'Status', render: (p) => <StatusBadge status={p.status} size='sm' /> },
  ];

  return (
    <div className='space-y-6 pb-12'>
      <button
        onClick={() => navigate('/workers')}
        className='inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors'
      >
        <ArrowLeft className='h-4 w-4 mr-1' /> Back to workers
      </button>

      {/* Header Profile Card */}
      <div className='card-soft p-6 space-y-5'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-slate-100'>
          <div className='flex items-center gap-3.5'>
            <div className='h-12 w-12 rounded-xl bg-slate-100 text-slate-700 font-medium text-base flex items-center justify-center border border-slate-200'>
              {worker.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-xl font-semibold text-slate-900'>{worker.name}</h1>
                <StatusBadge status={worker.verificationStatus} size='sm' />
                <StatusBadge status={worker.status} size='sm' />
              </div>
              <p className='text-xs text-slate-400 mt-0.5'>
                ID: {worker.workerId} • {worker.cooperativeName}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Button size='sm' variant='outline' onClick={() => setActiveTab('virtual-id')} className='text-xs h-8'>
              <QrCode className='h-3.5 w-3.5 mr-1.5' /> Virtual ID
            </Button>
            <Button size='sm' onClick={() => navigate('/workers/verification')} className='text-xs h-8'>
              <ShieldCheck className='h-3.5 w-3.5 mr-1.5' /> Verify
            </Button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs'>
          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Primary trade</span>
            <span className='font-semibold text-slate-900'>{worker.primarySkill}</span>
          </div>

          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Completed jobs</span>
            <span className='font-semibold text-slate-900'>{worker.completedJobs}</span>
          </div>

          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Total earnings</span>
            <span className='font-semibold text-slate-900'>₹{worker.totalEarnings.toLocaleString()}</span>
          </div>

          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Rating</span>
            <span className='font-semibold text-slate-900'>★ {worker.rating || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'identity', label: 'Identity & KYC', icon: <ShieldCheck className='h-4 w-4' /> },
          { id: 'virtual-id', label: 'Virtual ID', icon: <QrCode className='h-4 w-4' /> },
          { id: 'commitment', label: 'Workforce commitment', icon: <CalendarRange className='h-4 w-4' /> },
          { id: 'welfare', label: 'Benefits & welfare', icon: <Heart className='h-4 w-4' /> },
          { id: 'jobs', label: 'Jobs', badge: workerBookings.length, icon: <Briefcase className='h-4 w-4' /> },
          { id: 'earnings', label: 'Payouts', badge: workerPayouts.length, icon: <Wallet className='h-4 w-4' /> },
        ]}
      />

      {/* Tab: Identity */}
      {activeTab === 'identity' && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='card-soft p-5 space-y-3 text-xs'>
            <h3 className='text-card-title pb-2 border-b border-slate-100'>Contact</h3>
            <div className='space-y-2'>
              <div className='flex justify-between py-1 border-b border-slate-50'>
                <span className='text-slate-400'>Email</span>
                <span className='font-medium text-slate-800'>{worker.email}</span>
              </div>
              <div className='flex justify-between py-1 border-b border-slate-50'>
                <span className='text-slate-400'>Phone</span>
                <span className='font-medium text-slate-800'>{worker.phone}</span>
              </div>
              <div className='flex justify-between py-1 border-b border-slate-50'>
                <span className='text-slate-400'>Location</span>
                <span className='font-medium text-slate-800'>{worker.location} ({worker.zone})</span>
              </div>
              <div className='flex justify-between py-1 border-b border-slate-50'>
                <span className='text-slate-400'>Joined</span>
                <span className='text-slate-800'>{worker.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className='card-soft p-5 space-y-3 text-xs'>
            <h3 className='text-card-title pb-2 border-b border-slate-100'>Verification documents</h3>
            {worker.documents ? (
              <div className='space-y-2'>
                {Object.entries(worker.documents).map(([key, doc]) => (
                  <div key={key} className='p-2.5 rounded-xl bg-slate-50/75 border border-slate-100 flex items-center justify-between'>
                    <div>
                      <span className='font-medium text-slate-800 capitalize block'>{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className='text-slate-400 text-xs'>{doc.name}</span>
                    </div>
                    <StatusBadge status={doc.status} size='sm' />
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-slate-400 py-3 text-center'>No documents submitted.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab: Virtual ID */}
      {activeTab === 'virtual-id' && (
        <div className='card-soft p-8 flex flex-col items-center'>
          <VirtualIDCard
            worker={worker}
            onReissue={() => {
              setWorker(prev => ({
                ...prev,
                virtualId: {
                  ...prev.virtualId,
                  status: 'active',
                  qrCodeData: `APNAGIG-REISSUED-${prev.workerId}-${Date.now().toString().slice(-4)}`
                }
              }));
            }}
            onRevoke={() => {
              setWorker(prev => ({
                ...prev,
                virtualId: { ...prev.virtualId, status: 'revoked' }
              }));
            }}
          />
        </div>
      )}

      {/* Tab: 6-Month Commitment */}
      {activeTab === 'commitment' && (
        <div className='card-soft p-6 space-y-4'>
          <div className='flex items-center justify-between pb-3 border-b border-slate-100'>
            <div>
              <h3 className='text-card-title'>Six-month workforce commitment</h3>
              <p className='text-xs text-slate-500 mt-0.5'>Tenure milestone tracking</p>
            </div>
            <StatusBadge status={worker.sixMonthCommitment.status} size='sm' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs'>
            <div className='p-3.5 rounded-xl bg-slate-50/75 border border-slate-100'>
              <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Tenure completed</span>
              <span className='font-semibold text-slate-900 text-base'>
                {worker.sixMonthCommitment.completedMonths} of {worker.sixMonthCommitment.targetMonths} months
              </span>
            </div>
            <div className='p-3.5 rounded-xl bg-slate-50/75 border border-slate-100'>
              <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Cycle dates</span>
              <span className='text-slate-700 block'>
                {worker.sixMonthCommitment.startDate} → {worker.sixMonthCommitment.endDate}
              </span>
            </div>
            <div className='p-3.5 rounded-xl bg-emerald-50 border border-emerald-100'>
              <span className='text-emerald-700 text-[10px] uppercase font-medium block mb-1'>Stipend eligibility</span>
              <span className='font-semibold text-emerald-800 text-base'>
                {worker.sixMonthCommitment.stipendEligible ? 'Eligible (₹15,000)' : 'In progress'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Welfare */}
      {activeTab === 'welfare' && (
        <div className='card-soft p-6 space-y-4'>
          <h3 className='text-card-title pb-3 border-b border-slate-100'>Benefits and welfare fund</h3>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs'>
            <div className='p-3.5 rounded-xl bg-slate-50/75 border border-slate-100'>
              <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Insurance status</span>
              <span className='font-medium text-emerald-700 capitalize'>{worker.welfare.insuranceStatus}</span>
            </div>
            <div className='p-3.5 rounded-xl bg-slate-50/75 border border-slate-100'>
              <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Fund contribution</span>
              <span className='font-semibold text-slate-900'>₹{worker.welfare.fundContribution.toLocaleString()}</span>
            </div>
            <div className='p-3.5 rounded-xl bg-slate-50/75 border border-slate-100'>
              <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Claims processed</span>
              <span className='font-semibold text-slate-900'>₹{worker.welfare.benefitsClaimed.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Jobs */}
      {activeTab === 'jobs' && (
        <DataTable columns={bookingColumns} data={workerBookings} emptyTitle='No jobs dispatched' />
      )}

      {/* Tab: Earnings */}
      {activeTab === 'earnings' && (
        <DataTable columns={payoutColumns} data={workerPayouts} emptyTitle='No payouts recorded' />
      )}
    </div>
  );
};
