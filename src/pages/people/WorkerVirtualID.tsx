import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { VirtualIDCard } from '../../components/common/VirtualIDCard';
import { mockWorkers } from '../../data/workers';
import { Worker } from '../../types';

export const WorkerVirtualID: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkers = workers.filter(w =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.workerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.cooperativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReissue = (workerId: string) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          virtualId: {
            issuedDate: new Date().toISOString().split('T')[0],
            qrCodeData: `APNAGIG-REISSUED-${w.workerId}-${Date.now().toString().slice(-4)}`,
            status: 'active'
          }
        };
      }
      return w;
    }));
  };

  const handleRevoke = (workerId: string) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          virtualId: {
            ...w.virtualId,
            status: 'revoked'
          }
        };
      }
      return w;
    }));
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Virtual Worker ID'
        description='Worker identification and digital QR credentials.'
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search by worker name, ID, or cooperative...'
      />

      {/* Grid of Virtual IDs */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredWorkers.map((w) => (
          <div key={w.id} className='flex flex-col items-center sm:items-start'>
            <VirtualIDCard
              worker={w}
              onReissue={() => handleReissue(w.id)}
              onRevoke={() => handleRevoke(w.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
