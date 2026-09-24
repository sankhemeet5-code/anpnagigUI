import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  AlertTriangle,
  Radio,
  LogOut
} from 'lucide-react';
import { mockEmergencies } from '../../data/emergencies';
import { mockNotifications } from '../../data/notifications';

interface TopbarProps {
  onOpenMobileSidebar: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenMobileSidebar,
  onOpenSearch,
  onOpenNotifications,
}) => {
  const navigate = useNavigate();
  const activeEmergencies = mockEmergencies.filter(e => e.status !== 'resolved');
  const unreadNotifications = mockNotifications.filter(n => !n.isRead);

  return (
    <header className='h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 select-none'>
      {/* Left Section */}
      <div className='flex items-center gap-3'>
        <button
          onClick={onOpenMobileSidebar}
          className='md:hidden h-9 w-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50'
        >
          <Menu className='h-5 w-5' />
        </button>

        {/* System Status */}
        <div className='hidden sm:flex items-center gap-2 text-xs text-slate-500'>
          <span className='h-2 w-2 rounded-full bg-emerald-500' />
          <span>System online</span>
        </div>
      </div>

      {/* Center Section: Quick Search Trigger Button */}
      <div className='flex-1 max-w-md hidden sm:block'>
        <button
          onClick={onOpenSearch}
          className='w-full h-9 px-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 text-slate-400 flex items-center justify-between text-xs transition-colors'
        >
          <div className='flex items-center gap-2'>
            <Search className='h-3.5 w-3.5' />
            <span>Search workers, bookings, users...</span>
          </div>
          <kbd className='px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400'>
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-2 sm:gap-3'>
        {/* Mobile Search Icon */}
        <button
          onClick={onOpenSearch}
          className='sm:hidden h-9 w-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50'
        >
          <Search className='h-4 w-4' />
        </button>

        {/* Emergency SOS Shortcut if active */}
        {activeEmergencies.length > 0 && (
          <button
            onClick={() => navigate('/emergency')}
            className='flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-medium transition-colors'
          >
            <AlertTriangle className='h-3.5 w-3.5 text-rose-600' />
            <span className='hidden sm:inline'>{activeEmergencies.length} Emergency</span>
          </button>
        )}

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          className='relative h-9 w-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors'
        >
          <Bell className='h-4 w-4' />
          {unreadNotifications.length > 0 && (
            <span className='absolute top-2 right-2 h-2 w-2 rounded-full bg-[#159FE3]' />
          )}
        </button>

        <div className='h-5 w-px bg-slate-200 mx-1 hidden sm:block' />

        {/* Operator Profile */}
        <div className='flex items-center gap-2 pl-1'>
          <div className='h-8 w-8 rounded-full bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center border border-slate-200'>
            AD
          </div>
          <button
            onClick={() => navigate('/login')}
            title='Sign out'
            className='h-8 w-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors'
          >
            <LogOut className='h-4 w-4' />
          </button>
        </div>
      </div>
    </header>
  );
};
