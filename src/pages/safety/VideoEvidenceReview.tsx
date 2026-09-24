import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { EvidenceViewer } from '../../components/common/EvidenceViewer';
import { mockVideoEvidence } from '../../data/safety';
import { VideoEvidenceItem } from '../../types';

export const VideoEvidenceReview: React.FC = () => {
  const [evidenceList] = useState<VideoEvidenceItem[]>(mockVideoEvidence);
  const [selectedItem, setSelectedItem] = useState<VideoEvidenceItem>(mockVideoEvidence[0]);

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Video Evidence'
        description='Review recorded incident evidence.'
      />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column: Evidence List */}
        <div className='lg:col-span-1 space-y-3'>
          <h3 className='text-card-title'>
            Recordings ({evidenceList.length})
          </h3>

          <div className='space-y-2.5'>
            {evidenceList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`card-soft p-4 cursor-pointer transition-all ${
                  selectedItem.id === item.id
                    ? 'ring-1 ring-[#159FE3] bg-sky-50/20'
                    : 'hover:bg-slate-50/50'
                }`}
              >
                <div className='flex items-start justify-between gap-2 mb-1'>
                  <span className='font-medium text-slate-900 text-xs'>{item.id}</span>
                  <span className='px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-100'>
                    {item.accessStatus}
                  </span>
                </div>
                <p className='text-xs text-slate-600 mb-1'>Incident: {item.incidentRef}</p>
                <div className='flex items-center justify-between text-[11px] text-slate-400'>
                  <span>Duration: {item.durationSeconds}s</span>
                  <span>{item.retentionDaysRemaining} days remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Player View */}
        <div className='lg:col-span-2'>
          <EvidenceViewer evidence={selectedItem} />
        </div>
      </div>
    </div>
  );
};
