import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Users,
  FileText
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { DataTable, Column } from '../../components/common/DataTable';
import { mockCooperatives } from '../../data/cooperatives';
import { mockWorkers } from '../../data/workers';
import { Worker } from '../../types';

export const CooperativeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coop] = useState(mockCooperatives.find(c => c.id === id) || mockCooperatives[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const coopWorkers = mockWorkers.filter(w => w.cooperativeId === coop.id || w.cooperativeName === coop.name);

  const workerColumns: Column<Worker>[] = [
    { key: 'name', header: 'Worker', render: (w) => <span className='font-medium text-slate-900'>{w.name}</span> },
    { key: 'primarySkill', header: 'Trade', render: (w) => <span>{w.primarySkill}</span> },
    { key: 'verificationStatus', header: 'Verification', render: (w) => <StatusBadge status={w.verificationStatus} size='sm' /> },
    { key: 'completedJobs', header: 'Jobs done', render: (w) => <span>{w.completedJobs}</span> },
    { key: 'totalEarnings', header: 'Earnings', align: 'right', render: (w) => <span className='font-medium text-slate-900'>₹{w.totalEarnings.toLocaleString()}</span> },
    {
      key: 'action',
      header: 'Actions',
      align: 'right',
      render: (w) => (
        <Button size='sm' variant='outline' onClick={() => navigate(`/workers/${w.id}`)} className='text-xs h-7'>
          View
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <button
        onClick={() => navigate('/cooperatives')}
        className='inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors'
      >
        <ArrowLeft className='h-4 w-4 mr-1' /> Back to cooperatives
      </button>

      {/* Header Profile */}
      <div className='card-soft p-6 space-y-5'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-slate-100'>
          <div className='flex items-center gap-3.5'>
            <div className='h-12 w-12 rounded-xl bg-slate-100 text-slate-700 font-medium flex items-center justify-center border border-slate-200'>
              <Building2 className='h-6 w-6 text-slate-600' />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-xl font-semibold text-slate-900'>{coop.name}</h1>
                <StatusBadge status={coop.status} size='sm' />
              </div>
              <p className='text-xs text-slate-400 mt-0.5'>
                Reg: {coop.registrationNumber} • Contact: {coop.contactPerson}
              </p>
            </div>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs'>
          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Members</span>
            <span className='font-semibold text-slate-900'>{coop.memberCount} workers</span>
          </div>

          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Monthly volume</span>
            <span className='font-semibold text-slate-900'>₹{coop.monthlyRevenue.toLocaleString()}</span>
          </div>

          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Jobs completed</span>
            <span className='font-semibold text-slate-900'>{coop.totalJobsCompleted.toLocaleString()}</span>
          </div>

          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 text-[10px] uppercase font-medium block mb-1'>Rating</span>
            <span className='font-semibold text-slate-900'>★ {coop.serviceQualityScore}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'overview', label: 'Overview', icon: <Building2 className='h-4 w-4' /> },
          { id: 'members', label: 'Members', badge: coopWorkers.length, icon: <Users className='h-4 w-4' /> },
          { id: 'documents', label: 'Documents', icon: <FileText className='h-4 w-4' /> },
        ]}
      />

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-xs'>
          <div className='card-soft p-5 space-y-3'>
            <h3 className='text-card-title pb-2 border-b border-slate-100'>Contact details</h3>
            <div className='space-y-2'>
              <div className='flex justify-between py-1 border-b border-slate-50'>
                <span className='text-slate-400'>Office address</span>
                <span className='font-medium text-slate-800'>{coop.location} ({coop.zone})</span>
              </div>
              <div className='flex justify-between py-1 border-b border-slate-50'>
                <span className='text-slate-400'>Email</span>
                <span className='font-medium text-slate-800'>{coop.email}</span>
              </div>
              <div className='flex justify-between py-1 border-b border-slate-50'>
                <span className='text-slate-400'>Phone</span>
                <span className='font-medium text-slate-800'>{coop.phone}</span>
              </div>
            </div>
          </div>

          <div className='card-soft p-5 space-y-3'>
            <h3 className='text-card-title pb-2 border-b border-slate-100'>Services offered</h3>
            <div className='flex flex-wrap gap-2 pt-1'>
              {coop.servicesProvided.map((s, idx) => (
                <span key={idx} className='px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs'>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Members */}
      {activeTab === 'members' && (
        <DataTable columns={workerColumns} data={coopWorkers} emptyTitle='No members registered under this cooperative' />
      )}

      {/* Tab: Documents */}
      {activeTab === 'documents' && (
        <div className='card-soft p-6 space-y-3'>
          <h3 className='text-card-title pb-2 border-b border-slate-100'>Filed documents</h3>
          {coop.documents ? (
            <div className='space-y-2'>
              {coop.documents.map((doc, idx) => (
                <div key={idx} className='p-3 rounded-xl bg-slate-50/75 border border-slate-100 flex items-center justify-between text-xs'>
                  <div className='flex items-center gap-2.5'>
                    <FileText className='h-4 w-4 text-slate-400' />
                    <span className='font-medium text-slate-800'>{doc.name}</span>
                  </div>
                  <span className='text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-medium'>
                    Verified
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-slate-400 text-xs text-center py-4'>No documents on file.</p>
          )}
        </div>
      )}
    </div>
  );
};
