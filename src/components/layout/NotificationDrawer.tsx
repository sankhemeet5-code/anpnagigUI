import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, ArrowRight } from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { mockNotifications } from '../../data/notifications';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title='Notifications'
      subtitle='Recent system updates'
      width='md'
      footer={
        <div className='flex items-center justify-between w-full text-xs'>
          <button
            onClick={() => {
              navigate('/notifications');
              onClose();
            }}
            className='text-[#0369A1] font-medium hover:underline flex items-center gap-1'
          >
            View all notifications <ArrowRight className='h-3 w-3' />
          </button>
        </div>
      }
    >
      <div className='space-y-3 py-1'>
        {mockNotifications.map((n) => (
          <div
            key={n.id}
            className={`p-3.5 rounded-xl border transition-colors ${
              !n.isRead ? 'bg-sky-50/30 border-sky-100' : 'bg-white border-slate-100'
            }`}
          >
            <div className='flex items-start justify-between gap-2 mb-1'>
              <span className='font-semibold text-slate-900 text-xs'>{n.title}</span>
              {!n.isRead && <span className='h-2 w-2 rounded-full bg-[#159FE3] shrink-0' />}
            </div>
            <p className='text-xs text-slate-600 leading-relaxed mb-1.5'>{n.message}</p>
            <span className='text-[11px] text-slate-400'>{n.timestamp}</span>
          </div>
        ))}
      </div>
    </Drawer>
  );
};
