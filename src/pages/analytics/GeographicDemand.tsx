import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { mockGeoDemandZones } from '../../data/analytics';

interface GeoZone {
  id: string;
  name: string;
  demandLevel: string;
  activeWorkers: number;
  openJobs: number;
  coverage: string;
  avgEta: string;
  status: string;
}

export const GeographicDemand: React.FC = () => {
  const [geoData] = useState<GeoZone[]>(mockGeoDemandZones);

  const columns: Column<GeoZone>[] = [
    {
      key: 'name',
      header: 'Zone',
      sortable: true,
      render: (g) => <span className='font-medium text-slate-900 text-xs'>{g.name}</span>
    },
    {
      key: 'demandLevel',
      header: 'Demand level',
      sortable: true,
      render: (g) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${g.demandLevel === 'Very High' || g.demandLevel === 'High' ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
          {g.demandLevel}
        </span>
      )
    },
    {
      key: 'activeWorkers',
      header: 'Active workers',
      sortable: true,
      render: (g) => <span className='text-xs text-slate-800'>{g.activeWorkers} workers</span>
    },
    {
      key: 'openJobs',
      header: 'Open jobs',
      sortable: true,
      render: (g) => <span className='text-xs text-slate-800'>{g.openJobs} orders</span>
    },
    {
      key: 'coverage',
      header: 'Coverage',
      render: (g) => <span className='text-xs text-emerald-700 font-medium'>{g.coverage}</span>
    },
    {
      key: 'avgEta',
      header: 'Avg ETA',
      sortable: true,
      render: (g) => <span className='text-xs text-slate-700'>{g.avgEta}</span>
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Geographic Demand'
        description='Regional demand and active worker distribution.'
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {geoData.map((g) => (
          <div key={g.id} className='card-soft p-5 space-y-3'>
            <div className='flex items-start justify-between'>
              <div>
                <h3 className='text-sm font-semibold text-slate-900'>{g.name}</h3>
                <span className='text-xs text-slate-400'>Status: {g.status}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${g.demandLevel === 'Very High' || g.demandLevel === 'High' ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                {g.demandLevel}
              </span>
            </div>

            <div className='grid grid-cols-2 gap-2 text-xs'>
              <div className='p-2.5 rounded-xl bg-slate-50/75 border border-slate-100'>
                <span className='text-slate-400 text-[10px] uppercase font-medium block'>Active workers</span>
                <span className='font-semibold text-slate-900'>{g.activeWorkers}</span>
              </div>
              <div className='p-2.5 rounded-xl bg-slate-50/75 border border-slate-100'>
                <span className='text-slate-400 text-[10px] uppercase font-medium block'>Open jobs</span>
                <span className='font-semibold text-slate-900'>{g.openJobs}</span>
              </div>
            </div>

            <div className='text-xs text-slate-500 flex justify-between pt-1'>
              <span>Avg arrival time:</span>
              <span className='font-medium text-slate-800'>{g.avgEta}</span>
            </div>
          </div>
        ))}
      </div>

      <DataTable columns={columns} data={geoData} pageSize={8} />
    </div>
  );
};
