import React, { useState } from 'react';
import { Heart, Wallet, ShieldCheck, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { DataTable, Column } from '../../components/common/DataTable';
import { Button } from '../../components/ui/Button';
import { mockWorkers } from '../../data/workers';
import { Worker } from '../../types';

export const BenefitsWelfare: React.FC = () => {
  const navigate = useNavigate();
  const [workers] = useState<Worker[]>(mockWorkers);

  const columns: Column<Worker>[] = [
    {
      key: 'name',
      header: 'Worker',
      sortable: true,
      render: (w) => (
        <div>
          <span className='font-medium text-slate-900 block'>{w.name}</span>
          <span className='text-xs text-slate-400'>{w.workerId} • {w.cooperativeName}</span>
        </div>
      )
    },
    {
      key: 'insuranceStatus',
      header: 'Health insurance',
      render: (w) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${w.welfare.insuranceStatus === 'enrolled' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>
          {w.welfare.insuranceStatus === 'enrolled' ? 'Active' : 'Pending'}
        </span>
      )
    },
    {
      key: 'fundContribution',
      header: 'Welfare contribution',
      sortable: true,
      align: 'right',
      render: (w) => (
        <span className='text-slate-800 text-xs font-medium'>₹{w.welfare.fundContribution.toLocaleString()}</span>
      )
    },
    {
      key: 'benefitsClaimed',
      header: 'Claims settled',
      sortable: true,
      align: 'right',
      render: (w) => (
        <span className='text-xs text-slate-700 font-medium'>₹{w.welfare.benefitsClaimed.toLocaleString()}</span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (w) => (
        <Button size='sm' variant='outline' onClick={() => navigate(`/workers/${w.id}`)} className='h-7 text-xs px-2.5'>
          View
        </Button>
      )
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Benefits & Welfare'
        description='Insurance coverage and welfare reserve funds.'
        action={
          <Button size='sm' variant='outline' className='text-xs h-8'>
            <Download className='h-3.5 w-3.5 mr-1.5' /> Export
          </Button>
        }
      />

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <StatCard title='Covered Workers' value='1,048' change='98.5% insured' trend='up' icon={<Heart className='h-4 w-4' />} />
        <StatCard title='Welfare Reserve' value='₹1.20 Cr' change='↑ 8.4% YoY' trend='up' icon={<Wallet className='h-4 w-4' />} />
        <StatCard title='Settled Claims' value='14' change='24h turnaround' trend='neutral' icon={<ShieldCheck className='h-4 w-4' />} />
        <StatCard title='Emergency Fund' value='₹25.0 L' change='Available' trend='up' icon={<ShieldCheck className='h-4 w-4' />} />
      </div>

      <DataTable columns={columns} data={workers} pageSize={8} />
    </div>
  );
};
