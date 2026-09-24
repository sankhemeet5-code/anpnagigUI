import React, { useState } from 'react';
import { Download, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { mockReportTemplates } from '../../data/reports';

interface ReportTemplateItem {
  id: string;
  title: string;
  category: string;
  format: string;
  frequency: string;
  lastGenerated: string;
}

export const ReportsAnalytics: React.FC = () => {
  const [reports] = useState<ReportTemplateItem[]>(mockReportTemplates);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [downloadMsg, setDownloadMsg] = useState('');

  const handleExport = (id: string, name: string) => {
    setExportingId(id);
    setTimeout(() => {
      setExportingId(null);
      setDownloadMsg(`Generated export for ${name}.`);
      setTimeout(() => setDownloadMsg(''), 3000);
    }, 500);
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Reports & Analytics'
        description='Generate and export operational reports.'
      />

      {downloadMsg && (
        <div className='p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2'>
          <CheckCircle2 className='h-4 w-4 text-emerald-600 shrink-0' />
          <span>{downloadMsg}</span>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {reports.map((r) => (
          <div key={r.id} className='card-soft p-5 flex flex-col justify-between space-y-4'>
            <div className='space-y-2'>
              <div className='flex items-start justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <div className='h-8 w-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200'>
                    <FileSpreadsheet className='h-4 w-4 text-slate-600' />
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-slate-900'>{r.title}</h3>
                    <span className='text-xs text-slate-400 capitalize'>{r.category}</span>
                  </div>
                </div>
              </div>

              <p className='text-xs text-slate-600 leading-relaxed'>
                Format: {r.format} • Frequency: {r.frequency}
              </p>
            </div>

            <div className='pt-3 border-t border-slate-100 flex items-center justify-between text-xs'>
              <span className='text-slate-400'>Last run: {r.lastGenerated}</span>
              <Button
                size='sm'
                variant='outline'
                onClick={() => handleExport(r.id, r.title)}
                isLoading={exportingId === r.id}
                className='h-7 text-xs px-2.5'
              >
                <Download className='h-3.5 w-3.5 mr-1' /> Export
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
