import React, { useState } from 'react';
import { Building2, Check, X, HelpCircle, FileText } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockCooperatives } from '../../data/cooperatives';
import { Cooperative } from '../../types';

export const CooperativeApproval: React.FC = () => {
  const [cooperatives, setCooperatives] = useState<Cooperative[]>(mockCooperatives);
  const [selectedCoop, setSelectedCoop] = useState<Cooperative | null>(
    mockCooperatives.find(c => c.status === 'pending_approval') || mockCooperatives[0]
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'request_info'>('approve');
  const [note, setNote] = useState('');

  const pendingList = cooperatives.filter(c => c.status === 'pending_approval' || c.status === 'under_review');

  const handleDecision = () => {
    if (!selectedCoop) return;
    const newStatus = actionType === 'approve' ? 'active' : 'under_review';
    setCooperatives(prev => prev.map(c => c.id === selectedCoop.id ? { ...c, status: newStatus as any } : c));
    setModalOpen(false);
    setSelectedCoop(null);
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Cooperative Approval'
        description='Review and approve cooperative registrations.'
      />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column: Applications Queue */}
        <div className='lg:col-span-1 space-y-3'>
          <h3 className='text-card-title'>
            Pending review ({pendingList.length})
          </h3>

          <div className='space-y-2.5'>
            {pendingList.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCoop(c)}
                className={`card-soft p-4 cursor-pointer transition-all ${
                  selectedCoop?.id === c.id
                    ? 'ring-1 ring-[#159FE3] bg-sky-50/20'
                    : 'hover:bg-slate-50/50'
                }`}
              >
                <div className='flex items-start justify-between gap-2 mb-1.5'>
                  <div className='flex items-center gap-2'>
                    <div className='h-7 w-7 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center'>
                      <Building2 className='h-3.5 w-3.5 text-slate-600' />
                    </div>
                    <div>
                      <h4 className='text-xs font-semibold text-slate-900'>{c.name}</h4>
                      <p className='text-xs text-slate-400'>{c.registrationNumber}</p>
                    </div>
                  </div>
                  <StatusBadge status={c.status} size='sm' />
                </div>
                <p className='text-xs text-slate-600'>{c.memberCount} members • {c.location}</p>
              </div>
            ))}
            {pendingList.length === 0 && (
              <p className='text-xs text-slate-400 text-center py-6'>No pending applications.</p>
            )}
          </div>
        </div>

        {/* Right Column: Application Details */}
        <div className='lg:col-span-2'>
          {selectedCoop ? (
            <div className='card-soft p-6 space-y-6'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100'>
                <div>
                  <h2 className='text-lg font-semibold text-slate-900'>{selectedCoop.name}</h2>
                  <p className='text-xs text-slate-500'>
                    Registration: {selectedCoop.registrationNumber}
                  </p>
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => {
                      setActionType('request_info');
                      setModalOpen(true);
                    }}
                    className='text-xs h-8'
                  >
                    Request info
                  </Button>
                  <Button
                    size='sm'
                    variant='danger'
                    onClick={() => {
                      setActionType('reject');
                      setModalOpen(true);
                    }}
                    className='text-xs h-8'
                  >
                    Reject
                  </Button>
                  <Button
                    size='sm'
                    variant='success'
                    onClick={() => {
                      setActionType('approve');
                      setModalOpen(true);
                    }}
                    className='text-xs h-8'
                  >
                    Approve
                  </Button>
                </div>
              </div>

              {/* Assessment Grid */}
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs'>
                <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
                  <span className='text-slate-400 text-[10px] uppercase font-medium block mb-0.5'>Contact</span>
                  <span className='font-medium text-slate-800 block'>{selectedCoop.contactPerson}</span>
                  <span className='text-slate-400 text-xs'>{selectedCoop.phone}</span>
                </div>

                <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
                  <span className='text-slate-400 text-[10px] uppercase font-medium block mb-0.5'>Members</span>
                  <span className='font-medium text-slate-900'>{selectedCoop.memberCount} workers</span>
                </div>

                <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
                  <span className='text-slate-400 text-[10px] uppercase font-medium block mb-0.5'>Location</span>
                  <span className='font-medium text-slate-800'>{selectedCoop.location}</span>
                </div>
              </div>

              {/* Documents & Verification status */}
              <div className='space-y-3'>
                <h4 className='text-xs font-semibold text-slate-700 uppercase tracking-wider'>Submitted documents</h4>
                {selectedCoop.documents?.map((doc, idx) => (
                  <div key={idx} className='p-3 rounded-xl bg-slate-50/75 border border-slate-100 flex items-center justify-between text-xs'>
                    <div className='flex items-center gap-2.5'>
                      <FileText className='h-4 w-4 text-slate-500' />
                      <div>
                        <span className='font-medium text-slate-800 block'>{doc.name}</span>
                        <span className='text-xs text-slate-400'>Type: {doc.type}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${doc.verified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>
                      {doc.verified ? 'Verified' : 'Pending verification'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='card-soft p-12 text-center text-slate-400'>
              <p className='text-xs text-slate-600'>Select a cooperative application to inspect.</p>
            </div>
          )}
        </div>
      </div>

      {/* Decision Dialog */}
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={actionType === 'approve' ? 'Approve cooperative' : 'Request information'}
        description={selectedCoop ? `Action for ${selectedCoop.name}.` : ''}
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size='sm'
              variant={actionType === 'approve' ? 'success' : 'primary'}
              onClick={handleDecision}
            >
              Confirm
            </Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <p className='text-slate-600'>
            {actionType === 'approve'
              ? 'This will approve the cooperative for platform dispatch.'
              : 'Add note for cooperative board:'}
          </p>
          {actionType !== 'approve' && (
            <textarea
              rows={2}
              placeholder='Enter reason or required documents...'
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className='w-full p-2 rounded-xl border border-slate-200 text-xs focus:ring-[#159FE3]'
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};
