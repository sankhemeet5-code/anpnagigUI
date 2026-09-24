import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { EmptyState } from './EmptyState';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  pageSize = 10,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your search criteria or filters.',
  onRowClick,
  className = '',
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === 'asc') setSortOrder('desc');
      else {
        setSortKey(null);
        setSortOrder('asc');
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      return sortOrder === 'asc' ? 1 : -1;
    });
  }, [data, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const getAlignClass = (col: Column<T>) => {
    if (col.align === 'right' || col.key === 'actions' || col.key === 'amount' || col.key === 'spentTotal' || col.key === 'totalEarnings' || col.key === 'monthlyRevenue') return 'text-right';
    if (col.align === 'center') return 'text-center';
    return 'text-left';
  };

  return (
    <div className={`card-soft overflow-hidden ${className}`}>
      <div className='overflow-x-auto custom-scrollbar'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-slate-50/75 border-b border-slate-200/80 text-table-head'>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`py-3 px-4 select-none ${getAlignClass(col)} ${col.sortable ? 'cursor-pointer hover:text-slate-800' : ''} ${col.className || ''}`}
                >
                  <div className={`inline-flex items-center gap-1.5 ${getAlignClass(col) === 'text-right' ? 'justify-end' : ''}`}>
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className='text-slate-400'>
                        {sortKey === col.key ? (
                          sortOrder === 'asc' ? <ChevronUp className='h-3.5 w-3.5 text-[#159FE3]' /> : <ChevronDown className='h-3.5 w-3.5 text-[#159FE3]' />
                        ) : (
                          <ChevronsUpDown className='h-3.5 w-3.5' />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 bg-white text-table-cell'>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='py-8 text-center'>
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id || index}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`table-row-hover ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`py-3.5 px-4 ${getAlignClass(col)} ${col.className || ''}`}>
                      {col.render ? col.render(item, index) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {sortedData.length > pageSize && (
        <div className='py-3 px-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500'>
          <span>
            Showing <strong className='text-slate-700 font-medium'>{(currentPage - 1) * pageSize + 1}</strong> to{' '}
            <strong className='text-slate-700 font-medium'>{Math.min(currentPage * pageSize, sortedData.length)}</strong> of{' '}
            <strong className='text-slate-700 font-medium'>{sortedData.length}</strong> records
          </span>
          <div className='flex items-center gap-1'>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className='p-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600'
            >
              <ChevronLeft className='h-3.5 w-3.5' />
            </button>
            <span className='px-2 font-medium text-slate-700'>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className='p-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600'
            >
              <ChevronRight className='h-3.5 w-3.5' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
