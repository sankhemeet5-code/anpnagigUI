import React, { useState } from 'react';
import {
  AlertTriangle,
  Radio,
  Phone,
  Clock,
  CheckCircle2,
  Navigation,
  Send
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockEmergencies } from '../../data/emergencies';
import { EmergencyCase } from '../../types';

export const EmergencyCommand: React.FC = () => {
  const [cases, setCases] = useState<EmergencyCase[]>(mockEmergencies);
  const [selectedCase, setSelectedCase] = useState<EmergencyCase | null>(null);
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [dispatchDialogOpen, setDispatchDialogOpen] = useState(false);

  const activeCases = cases.filter(c => c.status !== 'resolved');

  const handleResolve = () => {
    if (!selectedCase) return;
    setCases(prev => prev.map(c => c.id === selectedCase.id ? { ...c, status: 'resolved' } : c));
    setResolveDialogOpen(false);
  };

  const handleDispatch = () => {
    if (!selectedCase) return;
    setCases(prev => prev.map(c => c.id === selectedCase.id ? {
      ...c,
      status: 'assigned',
      assignedResponder: {
        name: 'Patrol Unit 3',
        unit: 'RRU-P3',
        etaMinutes: 6,
        phone: '+91 98201 00911'
      }
    } : c));
    setDispatchDialogOpen(false);
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Emergency Operations'
        description='Active alerts and responder dispatch.'
        action={
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium'>
            <AlertTriangle className='h-3.5 w-3.5 text-rose-600' />
            {activeCases.length} active
          </span>
        }
      />

      {/* Metrics Row */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <StatCard
          title='Active Alerts'
          value={activeCases.length}
          change={activeCases.length > 0 ? 'Requires attention' : 'All clear'}
          trend={activeCases.length > 0 ? 'down' : 'neutral'}
          icon={<AlertTriangle className='h-4 w-4' />}
        />
        <StatCard
          title='Responders On Standby'
          value='18'
          change='Across 6 zones'
          trend='neutral'
          icon={<Radio className='h-4 w-4' />}
        />
        <StatCard
          title='Avg Response Time'
          value='4.2 min'
          change='Within SLA'
          trend='up'
          icon={<Clock className='h-4 w-4' />}
        />
        <StatCard
          title='Escalated Cases'
          value='0'
          change='Resolved safely'
          trend='up'
          icon={<CheckCircle2 className='h-4 w-4' />}
        />
      </div>

      {/* Emergency Active Cases Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column: Live Queue */}
        <div className='lg:col-span-2 space-y-3'>
          <h3 className='text-card-title'>Active incidents</h3>

          <div className='space-y-3'>
            {cases.map((emg) => (
              <div
                key={emg.id}
                className={`card-soft p-5 space-y-3 ${
                  emg.priority === 'critical' && emg.status !== 'resolved'
                    ? 'border-rose-200 bg-rose-50/10'
                    : ''
                }`}
              >
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2.5 border-b border-slate-100'>
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold text-slate-900 text-xs'>{emg.caseNumber}</span>
                    <PriorityBadge priority={emg.priority} size='sm' />
                    <StatusBadge status={emg.status} size='sm' />
                  </div>
                  <span className='text-xs text-slate-400'>
                    Reported {emg.reportedAt}
                  </span>
                </div>

                <div className='space-y-2 text-xs'>
                  <div className='p-2.5 rounded-xl bg-slate-50/75 border border-slate-100 text-slate-800'>
                    <span className='text-[10px] text-slate-400 font-medium uppercase block mb-0.5'>Reason</span>
                    {emg.triggerReason}
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600'>
                    <div className='flex items-center gap-1.5'>
                      <Phone className='h-3.5 w-3.5 text-slate-400' />
                      <span>{emg.callerName} ({emg.callerPhone})</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <Navigation className='h-3.5 w-3.5 text-slate-400' />
                      <span>{emg.location}</span>
                    </div>
                  </div>

                  {emg.assignedResponder ? (
                    <div className='p-2.5 rounded-xl bg-sky-50/50 border border-sky-100 text-xs flex items-center justify-between'>
                      <div>
                        <span className='text-[10px] text-sky-700 uppercase font-medium block'>Assigned responder</span>
                        <span className='font-medium text-slate-900'>{emg.assignedResponder.name}</span>
                      </div>
                      <span className='text-xs text-[#0369A1] font-medium'>ETA: ~{emg.assignedResponder.etaMinutes} min</span>
                    </div>
                  ) : (
                    <div className='p-2 rounded-xl bg-amber-50 border border-amber-100 text-xs text-amber-800'>
                      Awaiting responder assignment.
                    </div>
                  )}
                </div>

                <div className='pt-2 border-t border-slate-100 flex items-center justify-end gap-2'>
                  {emg.status !== 'resolved' && (
                    <>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => {
                          setSelectedCase(emg);
                          setDispatchDialogOpen(true);
                        }}
                        className='text-xs h-7'
                      >
                        <Send className='h-3 w-3 mr-1' /> Assign responder
                      </Button>
                      <Button
                        size='sm'
                        variant='success'
                        onClick={() => {
                          setSelectedCase(emg);
                          setResolveDialogOpen(true);
                        }}
                        className='text-xs h-7'
                      >
                        <CheckCircle2 className='h-3 w-3 mr-1' /> Resolve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Safety Map & Protocols */}
        <div className='space-y-4'>
          <div className='card-soft p-5 space-y-3'>
            <h3 className='text-card-title'>Safety map</h3>

            {/* Simple Map Container */}
            <div className='h-48 rounded-xl bg-slate-900 p-3 relative overflow-hidden flex flex-col justify-between text-white'>
              <div className='flex items-center justify-between text-[11px] text-slate-400'>
                <span>Mumbai Zone</span>
                <span className='h-2 w-2 rounded-full bg-emerald-500' />
              </div>

              {/* Marker simulation */}
              <div className='self-center flex flex-col items-center'>
                <span className='h-3 w-3 rounded-full bg-rose-500 ring-4 ring-rose-500/30' />
                <span className='text-[10px] text-rose-300 mt-1 bg-slate-800 px-1.5 py-0.5 rounded'>EMG-301</span>
              </div>

              <div className='text-[11px] text-slate-400 text-center'>
                Patrol Unit 3 en route (4m ETA)
              </div>
            </div>

            <div className='space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100'>
              <div className='flex justify-between py-1'>
                <span className='text-slate-400'>Emergency helpline</span>
                <span className='font-medium text-slate-800'>1800-APNAGIG</span>
              </div>
              <div className='flex justify-between py-1'>
                <span className='text-slate-400'>Safety desk</span>
                <span className='font-medium text-slate-800'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch Modal */}
      <Dialog
        isOpen={dispatchDialogOpen}
        onClose={() => setDispatchDialogOpen(false)}
        title='Assign responder'
        description={selectedCase ? `Assign field responder for case ${selectedCase.caseNumber}.` : ''}
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setDispatchDialogOpen(false)}>
              Cancel
            </Button>
            <Button size='sm' onClick={handleDispatch}>
              Confirm
            </Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <p className='text-slate-600'>Select available unit in {selectedCase?.location}:</p>
          <select className='w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white'>
            <option>Bandra Patrol Unit 3 (ETA 4 min)</option>
            <option>Andheri Safety Coordinator (ETA 8 min)</option>
          </select>
        </div>
      </Dialog>

      {/* Resolve Modal */}
      <Dialog
        isOpen={resolveDialogOpen}
        onClose={() => setResolveDialogOpen(false)}
        title='Resolve emergency'
        description={selectedCase ? `Confirm resolution of case ${selectedCase.caseNumber}.` : ''}
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setResolveDialogOpen(false)}>
              Cancel
            </Button>
            <Button size='sm' variant='success' onClick={handleResolve}>
              Resolve
            </Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <p className='text-slate-600'>Resolution note:</p>
          <textarea
            rows={2}
            className='w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-[#159FE3]'
            defaultValue='On-site responder confirmed situation resolved safely.'
          />
        </div>
      </Dialog>
    </div>
  );
};
