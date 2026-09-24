import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, Users, HardHat } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { mockAIInsights } from '../../data/analytics';

export const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState(mockAIInsights);
  const [appliedId, setAppliedId] = useState<string | null>(null);

  const handleApply = (id: string) => {
    setAppliedId(id);
    setTimeout(() => {
      setAppliedId(null);
    }, 400);
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='AI Insights'
        description='Automated analysis and recommendations.'
      />

      <div className='space-y-4'>
        {insights.map((ins) => (
          <div key={ins.id} className='card-soft p-5 space-y-4 bg-white'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2.5 border-b border-slate-100'>
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-slate-900 text-sm'>{ins.title}</span>
                <span className='px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 capitalize'>
                  {ins.category}
                </span>
                <span className='px-2 py-0.5 rounded text-xs font-medium bg-sky-50 text-[#0369A1]'>
                  {ins.impactLevel} priority
                </span>
              </div>
              <span className='text-xs text-slate-400'>
                {ins.period}
              </span>
            </div>

            <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
              {ins.description}
            </p>

            <div className='p-3.5 rounded-xl bg-slate-50/75 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs'>
              <div className='space-y-1'>
                <span className='text-slate-400 uppercase text-[10px] font-medium block'>Recommended actions</span>
                <ul className='space-y-0.5 text-slate-800 list-disc list-inside'>
                  {ins.recommendedActions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>

              <div>
                <Button
                  size='sm'
                  onClick={() => handleApply(ins.id)}
                  isLoading={appliedId === ins.id}
                  className='text-xs h-8'
                >
                  Apply recommendation
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
