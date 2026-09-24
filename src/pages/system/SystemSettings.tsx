import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';

export const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    dispatchRadiusKm: 5,
    maxWeeklyHoursPerWorker: 48,
    dualOtpVerificationRequired: true,
    videoRetentionDays: 30,
    emergencyHelplineNumber: '1800-APNAGIG',
    platformCommissionPercent: 5.0,
    cooperativeDuesPercent: 15.0
  });

  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = () => {
    setSavedMsg('Settings saved.');
    setTimeout(() => setSavedMsg(''), 2500);
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='System Settings'
        description='Configure platform rules and parameters.'
        action={
          <Button size='sm' onClick={handleSave} className='text-xs h-8'>
            <Save className='h-3.5 w-3.5 mr-1.5' /> Save changes
          </Button>
        }
      />

      {savedMsg && (
        <div className='p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2'>
          <CheckCircle2 className='h-4 w-4 text-emerald-600 shrink-0' />
          <span>{savedMsg}</span>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Dispatch Rules */}
        <div className='card-soft p-5 space-y-4 text-xs'>
          <h3 className='text-card-title pb-2 border-b border-slate-100'>Dispatch rules</h3>

          <div className='space-y-3'>
            <div>
              <label className='font-medium text-slate-700 block mb-1'>Dispatch search radius (km)</label>
              <input
                type='number'
                value={settings.dispatchRadiusKm}
                onChange={(e) => setSettings({ ...settings, dispatchRadiusKm: parseInt(e.target.value) || 5 })}
                className='w-full p-2 rounded-xl border border-slate-200 text-xs'
              />
            </div>

            <div>
              <label className='font-medium text-slate-700 block mb-1'>Maximum weekly worker hours</label>
              <input
                type='number'
                value={settings.maxWeeklyHoursPerWorker}
                onChange={(e) => setSettings({ ...settings, maxWeeklyHoursPerWorker: parseInt(e.target.value) || 48 })}
                className='w-full p-2 rounded-xl border border-slate-200 text-xs'
              />
            </div>

            <div className='flex items-center justify-between pt-2'>
              <div>
                <span className='font-medium text-slate-900 block'>Dual OTP verification</span>
                <span className='text-slate-400'>Require Start and End OTP handshakes.</span>
              </div>
              <input
                type='checkbox'
                checked={settings.dualOtpVerificationRequired}
                onChange={(e) => setSettings({ ...settings, dualOtpVerificationRequired: e.target.checked })}
                className='h-4 w-4 text-[#159FE3] rounded border-slate-300'
              />
            </div>
          </div>
        </div>

        {/* Safety & Video Retention */}
        <div className='card-soft p-5 space-y-4 text-xs'>
          <h3 className='text-card-title pb-2 border-b border-slate-100'>Safety & retention</h3>

          <div className='space-y-3'>
            <div>
              <label className='font-medium text-slate-700 block mb-1'>Video evidence retention (days)</label>
              <input
                type='number'
                value={settings.videoRetentionDays}
                onChange={(e) => setSettings({ ...settings, videoRetentionDays: parseInt(e.target.value) || 30 })}
                className='w-full p-2 rounded-xl border border-slate-200 text-xs'
              />
            </div>

            <div>
              <label className='font-medium text-slate-700 block mb-1'>Emergency helpline</label>
              <input
                type='text'
                value={settings.emergencyHelplineNumber}
                onChange={(e) => setSettings({ ...settings, emergencyHelplineNumber: e.target.value })}
                className='w-full p-2 rounded-xl border border-slate-200 text-xs'
              />
            </div>

            <div className='grid grid-cols-2 gap-3 pt-1'>
              <div>
                <label className='font-medium text-slate-700 block mb-1'>Platform fee (%)</label>
                <input
                  type='number'
                  step='0.5'
                  value={settings.platformCommissionPercent}
                  onChange={(e) => setSettings({ ...settings, platformCommissionPercent: parseFloat(e.target.value) || 5.0 })}
                  className='w-full p-2 rounded-xl border border-slate-200 text-xs'
                />
              </div>
              <div>
                <label className='font-medium text-slate-700 block mb-1'>Cooperative fund (%)</label>
                <input
                  type='number'
                  step='0.5'
                  value={settings.cooperativeDuesPercent}
                  onChange={(e) => setSettings({ ...settings, cooperativeDuesPercent: parseFloat(e.target.value) || 15.0 })}
                  className='w-full p-2 rounded-xl border border-slate-200 text-xs'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
