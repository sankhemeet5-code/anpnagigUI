import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, ShieldAlert, Lock, Eye } from 'lucide-react';
import { VideoEvidenceItem } from '../../types';
import { Button } from '../ui/Button';

export interface EvidenceViewerProps {
  evidence: VideoEvidenceItem;
  onAuditAction?: (action: string) => void;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ evidence, onAuditAction }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='card-soft overflow-hidden space-y-4 p-5'>
      {/* Evidence Meta Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100'>
        <div>
          <div className='flex items-center gap-2'>
            <span className='font-mono font-bold text-slate-900 text-sm'>{evidence.id}</span>
            <span className='px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200'>
              {evidence.accessStatus}
            </span>
          </div>
          <p className='text-xs text-slate-500 mt-0.5'>
            Linked Incident: <span className='font-medium text-slate-700'>{evidence.incidentRef}</span>
          </p>
        </div>

        <div className='flex items-center gap-2 text-xs text-slate-500'>
          <Lock className='h-3.5 w-3.5 text-slate-400' />
          <span>Retention: <strong className='text-slate-800'>{evidence.retentionDaysRemaining} days</strong> left</span>
        </div>
      </div>

      {/* Forensic Media Player Container */}
      <div className='relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4'>
        {/* Top Watermark & Chain of Custody */}
        <div className='flex items-center justify-between text-[11px] font-mono text-slate-400 z-10 select-none'>
          <span className='bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800 text-rose-400 font-bold'>
            FORENSIC AUDIT RECORDING
          </span>
          <span className='bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800'>
            REC: {evidence.recordingTimestamp}
          </span>
        </div>

        {/* Center Play Graphic Simulation */}
        <div className='self-center flex flex-col items-center justify-center text-center text-slate-500 space-y-2 select-none'>
          <button
            onClick={togglePlay}
            className='h-16 w-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg backdrop-blur-xs'
          >
            {isPlaying ? <Pause className='h-7 w-7' /> : <Play className='h-7 w-7 ml-1' />}
          </button>
          <span className='text-xs font-medium text-slate-400'>
            {isPlaying ? 'Streaming verified playback' : 'Click to inspect video audit stream'}
          </span>
        </div>

        {/* Bottom Player Controls Bar */}
        <div className='space-y-2 z-10'>
          {/* Progress scrubber */}
          <div className='h-1.5 w-full bg-slate-800 rounded-full overflow-hidden cursor-pointer'>
            <div
              className='h-full bg-[#159FE3] transition-all'
              style={{ width: isPlaying ? '65%' : '20%' }}
            />
          </div>

          <div className='flex items-center justify-between text-xs text-slate-300 font-mono select-none'>
            <div className='flex items-center gap-3'>
              <button onClick={togglePlay} className='hover:text-white'>
                {isPlaying ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
              </button>
              <span>00:14 / 00:{evidence.durationSeconds < 10 ? `0${evidence.durationSeconds}` : evidence.durationSeconds}</span>
            </div>
            <div className='flex items-center gap-2 text-slate-400'>
              <Volume2 className='h-4 w-4' />
              <span>1080p Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Hash & Chain of Custody */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs'>
        <div className='p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1'>
          <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400 block'>SHA-256 Checksum</span>
          <span className='font-mono text-slate-700 text-[11px] break-all block'>
            {evidence.sha256Hash}
          </span>
        </div>

        <div className='p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1'>
          <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400 block'>Authorized Custodian</span>
          <span className='font-medium text-slate-800 block'>
            Safety & Legal Officer ({evidence.uploadedBy})
          </span>
        </div>
      </div>
    </div>
  );
};
