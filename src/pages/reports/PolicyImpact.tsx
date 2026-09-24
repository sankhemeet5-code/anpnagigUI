import React from 'react';
import { Globe, TrendingUp, Users, Heart, Download } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/ui/Button';
import { mockImpactMetrics } from '../../data/reports';

export const PolicyImpact: React.FC = () => {
  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Policy & Impact'
        description='Social and economic impact metrics.'
        action={
          <Button size='sm' variant='outline' className='text-xs h-8'>
            <Download className='h-3.5 w-3.5 mr-1.5' /> Export impact brief
          </Button>
        }
      />

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <StatCard title='Living Wage Index' value='142%' change='Above regional minimum' trend='up' icon={<TrendingUp className='h-4 w-4' />} />
        <StatCard title='Banking Enrolled' value={mockImpactMetrics.jobsCreatedTotal.toLocaleString()} change='100% formal accounts' trend='up' icon={<Users className='h-4 w-4' />} />
        <StatCard title='Social Insurance' value={mockImpactMetrics.workerRetentionRate} change='Retention rate' trend='up' icon={<Heart className='h-4 w-4' />} />
        <StatCard title='Female Participation' value={mockImpactMetrics.femaleParticipationRate} change='↑ 3.2% this quarter' trend='up' icon={<Globe className='h-4 w-4' />} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-xs'>
        <div className='card-soft p-5 space-y-2 bg-white'>
          <h3 className='font-semibold text-slate-900 text-sm'>Earnings disbursed</h3>
          <p className='text-xl font-semibold text-slate-900'>₹{(mockImpactMetrics.workerEarningsDisbursed / 10000000).toFixed(2)} Cr</p>
          <p className='text-slate-500'>Direct bank payouts to certified cooperative technicians.</p>
        </div>

        <div className='card-soft p-5 space-y-2 bg-white'>
          <h3 className='font-semibold text-slate-900 text-sm'>Average hourly rate</h3>
          <p className='text-xl font-semibold text-slate-900'>₹{mockImpactMetrics.averageHourlyRate}/hr</p>
          <p className='text-slate-500'>1.42x above state minimum wage floor.</p>
        </div>

        <div className='card-soft p-5 space-y-2 bg-white'>
          <h3 className='font-semibold text-slate-900 text-sm'>Graduated apprentices</h3>
          <p className='text-xl font-semibold text-slate-900'>{mockImpactMetrics.sixMonthGraduates} workers</p>
          <p className='text-slate-500'>Completed 6-month tenure and received completion stipends.</p>
        </div>
      </div>
    </div>
  );
};
