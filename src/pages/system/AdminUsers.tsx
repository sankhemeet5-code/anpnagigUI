import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { Input } from '../../components/ui/Input';
import { mockAdminUsers } from '../../data/system';
import { AdminUser } from '../../types';

export const AdminUsers: React.FC = () => {
  const [admins, setAdmins] = useState<AdminUser[]>(mockAdminUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Operations Admin' });

  const handleInvite = () => {
    const newAdmin: AdminUser = {
      id: `ADM-00${admins.length + 1}`,
      name: formData.name,
      email: formData.email,
      role: formData.role as any,
      status: 'active',
      lastActive: 'Never',
      createdDate: new Date().toISOString().split('T')[0],
      permissions: {
        users: { view: true, create: true, edit: true, delete: false },
        workers: { view: true, create: true, edit: true, delete: false },
        cooperatives: { view: true, create: false, edit: true, delete: false },
        finance: { view: false, create: false, edit: false, delete: false },
        safety: { view: true, create: true, edit: true, delete: false },
        settings: { view: false, create: false, edit: false, delete: false }
      }
    };
    setAdmins(prev => [...prev, newAdmin]);
    setModalOpen(false);
  };

  const columns: Column<AdminUser>[] = [
    {
      key: 'name',
      header: 'Administrator',
      sortable: true,
      render: (a) => (
        <div className='flex items-center gap-2.5'>
          <div className='h-7 w-7 rounded-full bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center border border-slate-200'>
            {a.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <span className='font-medium text-slate-900 block'>{a.name}</span>
            <span className='text-xs text-slate-400'>{a.id}</span>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      header: 'Email',
      render: (a) => <span className='text-xs text-slate-700'>{a.email}</span>
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (a) => (
        <span className='px-2 py-0.5 rounded text-xs font-medium bg-sky-50 text-[#0369A1]'>
          {a.role}
        </span>
      )
    },
    {
      key: 'lastActive',
      header: 'Last active',
      render: (a) => <span className='text-xs text-slate-500'>{a.lastActive}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (a) => <StatusBadge status={a.status} size='sm' />
    }
  ];

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Admin Users & Roles'
        description='Manage administrator accounts and permissions.'
        action={
          <Button size='sm' onClick={() => setModalOpen(true)} className='text-xs h-8'>
            <UserPlus className='h-3.5 w-3.5 mr-1.5' /> Invite admin
          </Button>
        }
      />

      <DataTable columns={columns} data={admins} pageSize={8} />

      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title='Invite administrator'
        description='Send account setup invitation.'
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size='sm' onClick={handleInvite}>Send invitation</Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <Input
            label='Full name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder='e.g., Priya Nair'
            required
          />
          <Input
            label='Email address'
            type='email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder='priya@apnagig.coop'
            required
          />
          <div>
            <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1'>Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className='w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white'
            >
              <option>Super Admin</option>
              <option>Operations Admin</option>
              <option>Safety Admin</option>
              <option>Finance Admin</option>
            </select>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
