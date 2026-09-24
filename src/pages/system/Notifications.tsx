import React, { useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { mockNotifications } from '../../data/notifications';
import { NotificationItem } from '../../types';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter(n => filter === 'all' || !n.isRead);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Notifications'
        description='System alerts and updates.'
        action={
          <Button size='sm' variant='outline' onClick={markAllRead} className='text-xs h-8'>
            <CheckCheck className='h-3.5 w-3.5 mr-1.5' /> Mark all as read
          </Button>
        }
      />

      <div className='flex items-center gap-2 border-b border-slate-200 pb-2 text-xs'>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg font-medium transition-colors ${
            filter === 'all' ? 'bg-sky-50 text-[#0369A1]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 rounded-lg font-medium transition-colors ${
            filter === 'unread' ? 'bg-sky-50 text-[#0369A1]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Unread ({notifications.filter(n => !n.isRead).length})
        </button>
      </div>

      <div className='space-y-3'>
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`card-soft p-4 flex items-start justify-between gap-3 ${
              !n.isRead ? 'border-sky-200 bg-sky-50/10' : 'bg-white'
            }`}
          >
            <div className='space-y-1 text-xs'>
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-slate-900'>{n.title}</span>
                {!n.isRead && <span className='h-2 w-2 rounded-full bg-[#159FE3]' />}
              </div>
              <p className='text-slate-600 leading-relaxed'>{n.message}</p>
              <span className='text-slate-400 text-[11px] block pt-1'>{n.timestamp}</span>
            </div>

            {!n.isRead && (
              <button
                onClick={() => setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, isRead: true } : item))}
                className='text-xs text-[#0369A1] hover:underline shrink-0'
              >
                Mark read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const NotificationsPage = Notifications;
