import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PageHeader } from '../../components/common/PageHeader';
import { ChartCard } from '../../components/common/ChartCard';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockWorkers } from '../../data/workers';
import { Worker } from '../../types';

const pieData = [
  { name: 'Balanced (60-85%)', value: 585, color: '#10B981' },
  { name: 'Over-utilised (>85%)', value: 266, color: '#FF6B4A' },
  { name: 'Under-utilised (<60%)', value: 213, color: '#159FE3' },
];

export const WorkerUtilisation: React.FC = () => {
  const [workers] = useState<Worker[]>(mockWorkers);

  const columns: Column<Worker>[] = [
    {
      key: 'name',
      header: 'Worker',
      sortable: true,
      render: (w) => (
        <div>
          <span className='font-medium text-slate-900 block text-xs'>{w.name}</span>
          <span className='text-xs text-slate-400'>{w.workerId} • {w.cooperativeName}</span>
        </div>
      )
    },
    {
      key: 'primarySkill',
      header: 'Trade',
      render: (w) => <span className='text-xs text-slate-700'>{w.primarySkill}</span>
    },
    {
      key: 'utilisationRate',
      header: 'Utilisation',
      sortable: true,
      render: (w) => (
        <div className='space-y-1 w-24'>
          <div className='flex justify-between text-xs'>
            <span className='font-medium text-slate-900'>{w.utilisationRate}%</span>
            <span className='text-slate-400'>{w.completedJobs} jobs</span>
          </div>
          <div className='h-1.5 w-full bg-slate-100 rounded-full overflow-hidden'>
            <div
              className={`h-full ${w.utilisationRate > 85 ? 'bg-amber-500' : w.utilisationRate < 50 ? 'bg-[#159FE3]' : 'bg-emerald-500'}`}
              style={{ width: `${w.utilisationRate}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (w) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${w.utilisationRate > 85 ? 'bg-amber-50 text-amber-800' : w.utilisationRate < 50 ? 'bg-sky-50 text-[#0369A1]' : 'bg-emerald-50 text-emerald-700'}`}>
          {w.utilisationRate > 85 ? 'High load' : w.utilisationRate < 50 ? 'Under-allocated' : 'Balanced'}
        </span>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Worker Utilisation'
        description='Workforce capacity and utilisation distribution.'
      />

      <ChartCard
        title='Utilisation breakdown'
        subtitle='Current active workforce'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
          <div className='h-52 w-full flex items-center justify-center'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie data={pieData} cx='50%' cy='50%' innerRadius={55} outerRadius={80} paddingAngle={4} dataKey='value'>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val} workers`, 'Volume']} contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className='space-y-2.5'>
            {pieData.map((item) => (
              <div key={item.name} className='flex items-center justify-between p-2.5 rounded-xl bg-slate-50/75 border border-slate-100 text-xs'>
                <div className='flex items-center gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full' style={{ backgroundColor: item.color }} />
                  <span className='font-medium text-slate-700'>{item.name}</span>
                </div>
                <span className='font-semibold text-slate-900'>{item.value} workers</span>
              </div>
            ))}
          </div>
        </div>
      </ChartCard>

      <DataTable columns={columns} data={workers} pageSize={8} />
    </div>
  );
};
