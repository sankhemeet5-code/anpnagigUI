import React, { useState } from 'react';
import { ShieldCheck, Check, X, HelpCircle, FileText, Eye } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockWorkers } from '../../data/workers';
import { Worker } from '../../types';

export const WorkerVerification: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [decisionType, setDecisionType] = useState<'approve' | 'reject' | 'request_info'>('approve');
  const [feedbackNote, setFeedbackNote] = useState('');

  const pendingWorkers = workers.filter(
    w => w.verificationStatus === 'pending' || w.verificationStatus === 'under_review' || w.verificationStatus === 'needs_info'
  );

  const handleDecision = () => {
    if (!selectedWorker) return;
    const newStatus =
      decisionType === 'approve'
        ? 'verified'
        : decisionType === 'reject'
        ? 'rejected'
        : 'needs_info';

    setWorkers(prev =>
      prev.map(w =>
        w.id === selectedWorker.id
          ? {
              ...w,
              verificationStatus: newStatus as any,
              virtualId:
                newStatus === 'verified'
                  ? {
                      issuedDate: new Date().toISOString().split('T')[0],
                      qrCodeData: `APNAGIG-VERIFIED-${w.workerId}-2026`,
                      status: 'active'
                    }
                  : w.virtualId
            }
          : w
      )
    );
    setDecisionModalOpen(false);
    setSelectedWorker(null);
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Worker Verification'
        description='Review identity, certificates, and verification status.'
      />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column: Verification Queue */}
        <div className='lg:col-span-1 space-y-3'>
          <h3 className='text-card-title'>
            Pending queue ({pendingWorkers.length})
          </h3>

          <div className='space-y-2.5'>
            {pendingWorkers.map((w) => (
              <div
                key={w.id}
                onClick={() => setSelectedWorker(w)}
                className={`card-soft p-4 cursor-pointer transition-all ${
                  selectedWorker?.id === w.id
                    ? 'ring-1 ring-[#159FE3] bg-sky-50/20'
                    : 'hover:bg-slate-50/50'
                }`}
              >
                <div className='flex items-start justify-between gap-2 mb-1.5'>
                  <div className='flex items-center gap-2'>
                    <div className='h-7 w-7 rounded-full bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center'>
                      {w.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className='text-xs font-semibold text-slate-900'>{w.name}</h4>
                      <p className='text-[11px] text-slate-400'>{w.workerId}</p>
                    </div>
                  </div>
                  <StatusBadge status={w.verificationStatus} size='sm' />
                </div>
                <p className='text-xs text-slate-600'>{w.primarySkill} • {w.cooperativeName}</p>
              </div>
            ))}
            {pendingWorkers.length === 0 && (
              <p className='text-xs text-slate-400 text-center py-6'>No pending verifications.</p>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Document Inspection */}
        <div className='lg:col-span-2'>
          {selectedWorker ? (
            <div className='card-soft p-6 space-y-6'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100'>
                <div>
                  <h2 className='text-lg font-semibold text-slate-900'>{selectedWorker.name}</h2>
                  <p className='text-xs text-slate-500'>
                    {selectedWorker.cooperativeName} • {selectedWorker.workerId}
                  </p>
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => {
                      setDecisionType('request_info');
                      setDecisionModalOpen(true);
                    }}
                    className='text-xs h-8'
                  >
                    Request info
                  </Button>
                  <Button
                    size='sm'
                    variant='danger'
                    onClick={() => {
                      setDecisionType('reject');
                      setDecisionModalOpen(true);
                    }}
                    className='text-xs h-8'
                  >
                    Reject
                  </Button>
                  <Button
                    size='sm'
                    variant='success'
                    onClick={() => {
                      setDecisionType('approve');
                      setDecisionModalOpen(true);
                    }}
                    className='text-xs h-8'
                  >
                    Approve
                  </Button>
                </div>
              </div>

              {/* Document Checklist */}
              <div className='space-y-3'>
                <h4 className='text-xs font-semibold text-slate-700 uppercase tracking-wider'>Submitted documents</h4>

                {selectedWorker.documents ? (
                  <div className='space-y-2.5'>
                    {Object.entries(selectedWorker.documents).map(([key, doc]) => (
                      <div key={key} className='p-3.5 rounded-xl bg-slate-50/75 border border-slate-100 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <FileText className='h-4 w-4 text-slate-500' />
                          <div>
                            <span className='font-medium text-slate-800 text-xs capitalize block'>
                              {key.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className='text-xs text-slate-400'>{doc.name}</span>
                          </div>
                        </div>

                        <div className='flex items-center gap-2'>
                          <StatusBadge status={doc.status} size='sm' />
                          <button className='text-xs text-[#0369A1] hover:underline font-medium px-2 py-1'>
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-xs text-slate-400'>No documents attached.</p>
                )}
              </div>
            </div>
          ) : (
            <div className='card-soft p-12 text-center text-slate-400'>
              <ShieldCheck className='h-8 w-8 mx-auto text-slate-300 mb-2' />
              <p className='text-xs text-slate-600'>Select a worker from the queue to review documents.</p>
            </div>
          )}
        </div>
      </div>

      {/* Decision Confirmation Modal */}
      <Dialog
        isOpen={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        title={
          decisionType === 'approve'
            ? 'Approve worker'
            : decisionType === 'reject'
            ? 'Reject verification'
            : 'Request information'
        }
        description={selectedWorker ? `Action for ${selectedWorker.name} (${selectedWorker.workerId}).` : ''}
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setDecisionModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size='sm'
              variant={decisionType === 'approve' ? 'success' : decisionType === 'reject' ? 'danger' : 'primary'}
              onClick={handleDecision}
            >
              Confirm
            </Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <p className='text-slate-600'>
            {decisionType === 'approve'
              ? 'This will mark the worker as verified and activate their Virtual Worker ID.'
              : 'Add note for cooperative coordinator:'}
          </p>
          {decisionType !== 'approve' && (
            <textarea
              rows={2}
              placeholder='Add reason for request or rejection...'
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              className='w-full p-2 rounded-xl border border-slate-200 text-xs focus:ring-[#159FE3]'
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};
