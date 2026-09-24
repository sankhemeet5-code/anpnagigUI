import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { PageHeader } from '../../components/common/PageHeader';
import { ChartCard } from '../../components/common/ChartCard';
import { mockDemandForecastData } from '../../data/analytics';

export const DemandForecast: React.FC = () => {
  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Demand Forecast'
        description='Projected service demand across zones.'
      />

      {/* Recharts Chart */}
      <ChartCard
        title='Monthly demand projection'
        subtitle='2026 forecast with capacity benchmarks'
      >
        <div className='h-72 w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={mockDemandForecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id='forecastBand' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#159FE3' stopOpacity={0.15} />
                  <stop offset='95%' stopColor='#159FE3' stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey='date' stroke='#94A3B8' fontSize={11} tickLine={false} />
              <YAxis stroke='#94A3B8' fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '12px' }} />
              <Area type='monotone' dataKey='upperBound' stroke='transparent' fill='url(#forecastBand)' />
              <Area type='monotone' dataKey='forecast' stroke='#159FE3' strokeWidth={2} fillOpacity={0} name='Forecast' />
              <Area type='monotone' dataKey='capacity' stroke='#10B981' strokeWidth={2} fillOpacity={0} strokeDasharray='3 3' name='Capacity' />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className='flex items-center justify-center gap-6 mt-3 text-xs text-slate-500'>
          <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-[#159FE3]' /> Forecast demand</span>
          <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-[#10B981]' /> Max active capacity</span>
        </div>
      </ChartCard>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-xs'>
        <div className='card-soft p-4 space-y-1 bg-white'>
          <span className='font-medium text-slate-900 block'>Monsoon effect</span>
          <p className='text-slate-500'>Plumbing demand surges +34% from September to October.</p>
        </div>
        <div className='card-soft p-4 space-y-1 bg-white'>
          <span className='font-medium text-slate-900 block'>Festive season</span>
          <p className='text-slate-500'>Deep cleaning demand rises +45% ahead of Diwali in November.</p>
        </div>
        <div className='card-soft p-4 space-y-1 bg-white'>
          <span className='font-medium text-slate-900 block'>Apprentice cohort</span>
          <p className='text-slate-500'>30 apprentices scheduled to complete 6-month cycle in October.</p>
        </div>
      </div>
    </div>
  );
};
