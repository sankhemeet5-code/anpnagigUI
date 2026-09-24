import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, X } from 'lucide-react';
import { mockWorkers } from '../../data/workers';
import { mockBookings } from '../../data/bookings';
import { mockUsers } from '../../data/users';

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandSearch: React.FC<CommandSearchProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedWorkers = mockWorkers.filter(w =>
    w.name.toLowerCase().includes(query.toLowerCase()) ||
    w.workerId.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchedBookings = mockBookings.filter(b =>
    b.bookingCode.toLowerCase().includes(query.toLowerCase()) ||
    b.customerName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center pt-20 px-4'>
      <div className='fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity' onClick={onClose} />

      <div className='relative w-full max-w-lg bg-white rounded-2xl shadow-modal border border-slate-200 overflow-hidden z-10 animate-fade-in'>
        {/* Search Input Bar */}
        <div className='flex items-center px-4 border-b border-slate-100'>
          <Search className='h-4 w-4 text-slate-400 shrink-0 mr-2.5' />
          <input
            autoFocus
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search workers, bookings, users...'
            className='w-full py-3.5 text-xs text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none'
          />
          <button onClick={onClose} className='p-1 rounded-lg text-slate-400 hover:text-slate-600'>
            <X className='h-4 w-4' />
          </button>
        </div>

        {/* Results List */}
        <div className='max-h-80 overflow-y-auto p-2 space-y-3 text-xs custom-scrollbar'>
          {/* Workers Group */}
          {matchedWorkers.length > 0 && (
            <div className='space-y-1'>
              <span className='text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-2.5 py-1 block'>
                Workers
              </span>
              {matchedWorkers.map(w => (
                <div
                  key={w.id}
                  onClick={() => handleSelect(`/workers/${w.id}`)}
                  className='flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-slate-50 cursor-pointer'
                >
                  <div>
                    <span className='font-medium text-slate-900 block'>{w.name}</span>
                    <span className='text-xs text-slate-400'>{w.workerId} • {w.primarySkill}</span>
                  </div>
                  <ArrowRight className='h-3.5 w-3.5 text-slate-300' />
                </div>
              ))}
            </div>
          )}

          {/* Bookings Group */}
          {matchedBookings.length > 0 && (
            <div className='space-y-1'>
              <span className='text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-2.5 py-1 block'>
                Bookings
              </span>
              {matchedBookings.map(b => (
                <div
                  key={b.id}
                  onClick={() => handleSelect(`/bookings/${b.id}`)}
                  className='flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-slate-50 cursor-pointer'
                >
                  <div>
                    <span className='font-medium text-slate-900 block'>{b.bookingCode}</span>
                    <span className='text-xs text-slate-400'>{b.customerName} • {b.serviceName}</span>
                  </div>
                  <ArrowRight className='h-3.5 w-3.5 text-slate-300' />
                </div>
              ))}
            </div>
          )}

          {query && matchedWorkers.length === 0 && matchedBookings.length === 0 && (
            <div className='py-8 text-center text-slate-400 text-xs'>
              No results found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className='px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400'>
          <span>Navigate with arrows</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};
