import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockServices } from '../../data/cooperatives';
import { ServiceItem } from '../../types';

export const ServicesList: React.FC = () => {
  const [services] = useState<ServiceItem[]>(mockServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = services.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || s.categoryName.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const columns: Column<ServiceItem>[] = [
    {
      key: 'name',
      header: 'Service SKU',
      sortable: true,
      render: (s) => (
        <div>
          <span className='font-medium text-slate-900 block'>{s.name}</span>
          <span className='text-xs text-slate-400'>{s.id}</span>
        </div>
      )
    },
    {
      key: 'categoryName',
      header: 'Category',
      sortable: true,
      render: (s) => (
        <span className='text-xs text-slate-700'>{s.categoryName}</span>
      )
    },
    {
      key: 'basePrice',
      header: 'Base tariff',
      sortable: true,
      align: 'right',
      render: (s) => (
        <span className='font-medium text-slate-900'>₹{s.basePrice.toLocaleString()}</span>
      )
    },
    {
      key: 'estimatedDurationMins',
      header: 'Duration',
      sortable: true,
      render: (s) => (
        <span className='text-xs text-slate-600'>{s.estimatedDurationMins} mins</span>
      )
    },
    {
      key: 'requiredSkillLevel',
      header: 'Skill tier',
      render: (s) => (
        <span className='px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700'>
          {s.requiredSkillLevel}
        </span>
      )
    },
    {
      key: 'demandIndex',
      header: 'Demand',
      render: (s) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${s.demandIndex === 'High' ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
          {s.demandIndex}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (s) => <StatusBadge status={s.status} size='sm' />
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Services'
        description='Service catalog, pricing, and duration.'
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder='Search by name, SKU, category...'
        filters={[
          {
            id: 'cat',
            label: 'Trade',
            selectedValue: categoryFilter,
            onChange: setCategoryFilter,
            options: [
              { label: 'Plumbing', value: 'plumbing' },
              { label: 'Electrical', value: 'electrical' },
              { label: 'Cleaning', value: 'cleaning' },
              { label: 'Carpentry', value: 'carpentry' },
              { label: 'Painting', value: 'painting' }
            ]
          }
        ]}
        onReset={() => {
          setSearchQuery('');
          setCategoryFilter('all');
        }}
      />

      <DataTable columns={columns} data={filtered} pageSize={8} />
    </div>
  );
};
