import React, { useState } from 'react';
import { FileVideo, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { Button } from '../../components/ui/Button';
import { Drawer } from '../../components/ui/Drawer';
import { mockIncidents } from '../../data/safety';
import { IncidentCase } from '../../types';

export const IncidentSafety: React.FC = () => {
  const [incidents, setIncidents] = useState<IncidentCase[]>(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<IncidentCase | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const columns: Column<IncidentCase>[] = [
    {
      key: 'incidentNumber',
      header: 'Incident ID',
      sortable: true,
      render: (inc) => (
        <div>
          <span className='font-medium text-slate-900 block'>{inc.incidentNumber}</span>
          <span className='text-xs text-slate-400'>{inc.reportedAt}</span>
        </div>
      )
    },
    {
      key: 'type',
      header: 'Category',
      sortable: true,
      render: (inc) => (
        <div className='space-y-0.5'>
          <span className='text-slate-800 text-xs block'>{inc.type}</span>
          <PriorityBadge priority={inc.severity} size='sm' />
        </div>
      )
    },
    {
      key: 'reporterName',
      header: 'Reporter',
      render: (inc) => (
        <div>
          <span className='text-slate-800 text-xs block'>{inc.reporterName} ({inc.reporterType})</span>
          <span className='text-xs text-slate-400'>Booking: {inc.linkedBookingId}</span>
        </div>
      )
    },
    {
      key: 'assignedAdmin',
      header: 'Assigned to',
      render: (inc) => <span className='text-xs text-slate-700'>{inc.assignedAdmin}</span>
    },
    {
      key: 'hasVideoEvidence',
      header: 'Evidence',
      render: (inc) => (
        inc.hasVideoEvidence ? (
          <span className='inline-flex items-center gap-1 text-xs text-[#0369A1]'>
            <FileVideo className='h-3.5 w-3.5' /> Video attached
          </span>
        ) : (
          <span className='text-slate-400 text-xs'>None</span>
        )
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (inc) => <StatusBadge status={inc.status} size='sm' />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (inc) => (
        <Button
          size='sm'
          variant='outline'
          onClick={() => {
            setSelectedIncident(inc);
            setDrawerOpen(true);
          }}
          className='h-7 text-xs px-2.5'
        >
          Review
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Incidents & Safety'
        description='Reported incidents, investigations, and safety records.'
      />

      <DataTable columns={columns} data={incidents} pageSize={8} />

      {/* Incident Detail Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedIncident ? `Incident: ${selectedIncident.incidentNumber}` : 'Incident details'}
        subtitle={selectedIncident ? `Reported by ${selectedIncident.reporterName}` : ''}
        width='lg'
        footer={
          <div className='flex items-center justify-end gap-2 w-full'>
            <Button size='sm' variant='ghost' onClick={() => setDrawerOpen(false)}>Close</Button>
            <Button size='sm' variant='success' onClick={() => {
              if (selectedIncident) {
                setIncidents(prev => prev.map(i => i.id === selectedIncident.id ? { ...i, status: 'resolved' } : i));
              }
              setDrawerOpen(false);
            }}>
              <CheckCircle2 className='h-3.5 w-3.5 mr-1' /> Mark resolved
            </Button>
          </div>
        }
      >
        <div className='space-y-4 text-xs'>
          {/* Summary Box */}
          <div className='p-4 rounded-xl bg-slate-50/75 border border-slate-100 space-y-1'>
            <span className='font-medium text-slate-900 block'>Summary</span>
            <p className='text-slate-600 leading-relaxed'>{selectedIncident?.summary}</p>
          </div>

          {/* Key Facts */}
          <div className='grid grid-cols-2 gap-3'>
            <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
              <span className='text-slate-400 text-[10px] uppercase font-medium block mb-0.5'>Location</span>
              <span className='text-slate-800'>{selectedIncident?.location}</span>
            </div>
            <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
              <span className='text-slate-400 text-[10px] uppercase font-medium block mb-0.5'>Booking reference</span>
              <span className='text-slate-800'>{selectedIncident?.linkedBookingId}</span>
            </div>
          </div>

          {/* Chronological Timeline */}
          <div className='space-y-2 pt-2'>
            <span className='font-medium text-slate-900 block'>Event timeline</span>
            <div className='relative pl-5 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200'>
              {selectedIncident?.timeline.map((item, idx) => (
                <div key={idx} className='relative flex items-start gap-3'>
                  <div className='absolute -left-5 mt-1 h-3 w-3 rounded-full bg-[#159FE3] ring-4 ring-white' />
                  <div>
                    <span className='font-medium text-slate-800 text-xs'>{item.event}</span>
                    <p className='text-slate-400 text-[11px]'>{item.time} • {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
