import React from 'react';
import { QrCode, ShieldCheck, RefreshCw, XCircle, Building2 } from 'lucide-react';
import { Worker } from '../../types';
import { Button } from '../ui/Button';

export interface VirtualIDCardProps {
  worker: Worker;
  onReissue?: () => void;
  onRevoke?: () => void;
}

export const VirtualIDCard: React.FC<VirtualIDCardProps> = ({ worker, onReissue, onRevoke }) => {
  const isRevoked = worker.virtualId.status === 'revoked';

  return (
    <div className='w-full max-w-sm rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 shadow-card border border-slate-700/60 relative overflow-hidden flex flex-col justify-between space-y-6'>
      {/* Top Holographic / Watermark Bar */}
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <div className='h-8 w-8 rounded-xl bg-[#159FE3] flex items-center justify-center font-black text-sm text-white shadow-xs'>
            AG
          </div>
          <div>
            <h4 className='text-xs font-bold tracking-tight text-white'>ApnaGig Co-op</h4>
            <p className='text-[10px] text-slate-400 font-mono'>State Labour Accredited</p>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider ${
            isRevoked ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}
        >
          {worker.virtualId.status}
        </span>
      </div>

      {/* Center Details */}
      <div className='flex items-center gap-4'>
        <div className='h-16 w-16 rounded-2xl bg-slate-700 border-2 border-white/20 flex items-center justify-center font-bold text-lg text-slate-200 shadow-inner shrink-0'>
          {worker.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div className='min-w-0 space-y-0.5'>
          <h3 className='text-base font-bold text-white truncate'>{worker.name}</h3>
          <p className='text-xs font-medium text-[#159FE3] truncate'>{worker.primarySkill}</p>
          <p className='text-[11px] text-slate-400 truncate flex items-center gap-1'>
            <Building2 className='h-3 w-3 text-slate-500' /> {worker.cooperativeName}
          </p>
        </div>
      </div>

      {/* QR Code Container Simulation */}
      <div className='bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-slate-900 space-y-2 shadow-sm'>
        <div className='h-24 w-24 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200'>
          <QrCode className='h-20 w-20 text-slate-800' />
        </div>
        <div className='text-center'>
          <span className='text-[10px] font-mono font-bold text-slate-500 tracking-wider block'>
            {worker.workerId}
          </span>
          <span className='text-[9px] text-slate-400 block'>
            Issued: {worker.virtualId.issuedDate || '2026-01-15'}
          </span>
        </div>
      </div>

      {/* Card Action Controls */}
      {(onReissue || onRevoke) && (
        <div className='pt-2 border-t border-slate-700/60 flex items-center justify-between gap-2 text-xs'>
          {onReissue && (
            <button
              onClick={onReissue}
              className='text-slate-300 hover:text-white inline-flex items-center gap-1 text-[11px] font-medium transition-colors'
            >
              <RefreshCw className='h-3 w-3' /> Re-issue QR
            </button>
          )}

          {onRevoke && !isRevoked && (
            <button
              onClick={onRevoke}
              className='text-rose-400 hover:text-rose-300 inline-flex items-center gap-1 text-[11px] font-medium transition-colors'
            >
              <XCircle className='h-3 w-3' /> Revoke ID
            </button>
          )}
        </div>
      )}
    </div>
  );
};
