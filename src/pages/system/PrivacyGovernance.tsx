import React, { useState } from 'react';
import { Lock, Trash2, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';

export const PrivacyGovernance: React.FC = () => {
  const [purgeSuccess, setPurgeSuccess] = useState('');
  const [isPurging, setIsPurging] = useState(false);

  const handleManualPurge = () => {
    setIsPurging(true);
    setTimeout(() => {
      setIsPurging(false);
      setPurgeSuccess('Purged 14 expired media recordings per 30-day policy.');
      setTimeout(() => setPurgeSuccess(''), 3000);
    }, 400);
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Privacy & Data Governance'
        description='Data protection and retention policies.'
        action={
          <Button size='sm' variant='danger' onClick={handleManualPurge} isLoading={isPurging} className='text-xs h-8'>
            <Trash2 className='h-3.5 w-3.5 mr-1.5' /> Purge expired media
          </Button>
        }
      />

      {purgeSuccess && (
        <div className='p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2'>
          <CheckCircle2 className='h-4 w-4 text-emerald-600 shrink-0' />
          <span>{purgeSuccess}</span>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-xs'>
        <div className='card-soft p-5 space-y-3'>
          <h3 className='text-card-title pb-2 border-b border-slate-100'>Data protection policies</h3>
          <div className='space-y-2.5 text-slate-600 leading-relaxed'>
            <p>
              • <strong>Incident video recordings</strong>: Automatically purged after 30 days unless pinned by an open legal dispute.
            </p>
            <p>
              • <strong>Customer location telemetry</strong>: Masked after booking completion.
            </p>
            <p>
              • <strong>Worker Aadhaar & identity</strong>: Redacted after initial verification approval.
            </p>
          </div>
        </div>

        <div className='card-soft p-5 space-y-3'>
          <h3 className='text-card-title pb-2 border-b border-slate-100'>Compliance status</h3>
          <div className='space-y-2'>
            <div className='flex justify-between py-1 border-b border-slate-50'>
              <span className='text-slate-500'>Regulatory standard</span>
              <span className='font-medium text-slate-800'>Digital Personal Data Protection Act</span>
            </div>
            <div className='flex justify-between py-1 border-b border-slate-50'>
              <span className='text-slate-500'>Data residency</span>
              <span className='font-medium text-slate-800'>India Central (Mumbai)</span>
            </div>
            <div className='flex justify-between py-1 border-b border-slate-50'>
              <span className='text-slate-500'>Encryption</span>
              <span className='font-medium text-emerald-700'>AES-256 (In transit & at rest)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
