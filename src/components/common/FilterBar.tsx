import React from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export interface FilterBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  filters?: FilterGroup[];
  onReset?: () => void;
  extraActions?: React.ReactNode;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search records...',
  filters = [],
  onReset,
  extraActions,
  className = '',
}) => {
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    filters.some((f) => f.selectedValue !== 'all' && f.selectedValue !== '');

  return (
    <div
      className={`card-soft p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${className}`}
    >
      <div className='flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2.5'>
        {/* Search Field */}
        {onSearchChange && (
          <div className='relative flex-1 min-w-[220px] max-w-md'>
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              leftIcon={<Search className='h-4 w-4' />}
              className='h-9 text-xs'
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
              >
                <X className='h-3.5 w-3.5' />
              </button>
            )}
          </div>
        )}

        {/* Dropdown Select Filters */}
        {filters.length > 0 && (
          <div className='flex flex-wrap items-center gap-2'>
            {filters.map((filter) => (
              <div key={filter.id} className='relative'>
                <select
                  value={filter.selectedValue}
                  onChange={(e) => filter.onChange(e.target.value)}
                  aria-label={filter.label}
                  className='h-9 rounded-xl border border-slate-200 bg-white px-3 pr-8 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#159FE3] cursor-pointer appearance-none'
                >
                  <option value='all'>All {filter.label}</option>
                  {filter.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal className='h-3 w-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none' />
              </div>
            ))}
          </div>
        )}

        {/* Reset Filter Button */}
        {hasActiveFilters && onReset && (
          <button
            onClick={onReset}
            className='inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors'
          >
            <RotateCcw className='h-3 w-3' /> Reset
          </button>
        )}
      </div>

      {extraActions && <div className='flex items-center gap-2 shrink-0'>{extraActions}</div>}
    </div>
  );
};
