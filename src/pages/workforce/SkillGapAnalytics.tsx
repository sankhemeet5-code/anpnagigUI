import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockSkillGaps } from '../../data/emergencies';
import { SkillGapItem } from '../../types';

export const SkillGapAnalytics: React.FC = () => {
  const [gaps, setGaps] = useState<SkillGapItem[]>(mockSkillGaps);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedGap, setSelectedGap] = useState<SkillGapItem | null>(null);

  const handleEnroll = () => {
    if (!selectedGap) return;
    setGaps(prev => prev.map(g => g.id === selectedGap.id ? { ...g, actionStatus: 'training_in_progress' } : g));
    setEnrollModalOpen(false);
  };

  const columns: Column<SkillGapItem>[] = [
    {
      key: 'serviceName',
      header: 'Trade & zone',
      sortable: true,
      render: (g) => (
        <div>
          <span className='font-medium text-slate-900 block'>{g.serviceName}</span>
          <span className='text-xs text-slate-400'>{g.zone}</span>
        </div>
      )
    },
    {
      key: 'demandLevel',
      header: 'Demand',
      sortable: true,
      render: (g) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${g.demandLevel === 'Very High' ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
          {g.demandLevel}
        </span>
      )
    },
    {
      key: 'qualifiedWorkersAvailable',
      header: 'Available vs Required',
      render: (g) => (
        <span className='text-xs text-slate-700'>
          {g.qualifiedWorkersAvailable} / {g.requiredWorkers} workers
        </span>
      )
    },
    {
      key: 'gapCount',
      header: 'Gap',
      sortable: true,
      render: (g) => (
        <span className={`text-xs font-medium ${g.gapCount > 0 ? 'text-amber-800' : 'text-emerald-700'}`}>
          {g.gapCount > 0 ? `+${g.gapCount} gap` : 'Optimal'}
        </span>
      )
    },
    {
      key: 'actionStatus',
      header: 'Status',
      sortable: true,
      render: (g) => <StatusBadge status={g.actionStatus} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (g) => (
        <Button
          size='sm'
          variant='outline'
          disabled={g.actionStatus === 'fulfilled' || g.actionStatus === 'training_in_progress'}
          onClick={() => {
            setSelectedGap(g);
            setEnrollModalOpen(true);
          }}
          className='h-7 text-xs px-2.5'
        >
          {g.actionStatus === 'training_in_progress' ? 'Training active' : 'Start training'}
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Skill Gap & Training'
        description='Trade demand and training programs.'
      />

      <DataTable columns={columns} data={gaps} pageSize={8} />

      <Dialog
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        title='Start training batch'
        description={selectedGap ? `Enroll candidates for ${selectedGap.serviceName} in ${selectedGap.zone}.` : ''}
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setEnrollModalOpen(false)}>Cancel</Button>
            <Button size='sm' onClick={handleEnroll}>Confirm batch</Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <p className='text-slate-600'>
            Enroll <strong>{selectedGap?.upskillCandidatesCount} apprentices</strong> into the 2-week accredited upskilling course.
          </p>
          <div className='p-3 bg-slate-50/75 rounded-xl border border-slate-100'>
            <span className='font-medium text-slate-800 block mb-0.5'>Training provider</span>
            <p className='text-slate-500'>State Skill Development Society & ITI Central</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
