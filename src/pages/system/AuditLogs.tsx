import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { mockAuditLogs } from '../../data/system';
import { AuditLogItem } from '../../types';

export const AuditLogs: React.FC = () => {
  const [logs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = logs.filter(l =>
    l.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.targetEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<AuditLogItem>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (l) => <span className='text-xs text-slate-500 font-mono'>{l.timestamp}</span>
    },
    {
      key: 'adminName',
      header: 'Admin user',
      sortable: true,
      render: (l) => (
        <div>
          <span className='font-medium text-slate-900 block text-xs'>{l.adminName}</span>
          <span className='text-xs text-slate-400'>{l.adminRole} • {l.ipAddressMasked}</span>
        </div>
      )
    },
    {
      key: 'action',
      header: 'Action',
      sortable: true,
      render: (l) => (
        <span className='px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700'>
          {l.action}
        </span>
      )
    },
    {
      key: 'targetEntity',
      header: 'Target resource',
      render: (l) => <span className='text-xs text-slate-800 font-medium'>{l.targetEntity} ({l.entityId})</span>
    },
    {
      key: 'details',
      header: 'Details',
      render: (l) => <span className='text-xs text-slate-600 max-w-sm block truncate' title={l.details}>{l.details}</span>
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Audit Logs'
        description='System activity and change history.'
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search by actor, action type, resource...'
      />

      <DataTable columns={columns} data={filtered} pageSize={8} />
    </div>
  );
};
