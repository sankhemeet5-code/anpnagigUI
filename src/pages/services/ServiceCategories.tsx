import React, { useState } from 'react';
import { Plus, Edit2, Layers } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { Input } from '../../components/ui/Input';
import { mockServiceCategories } from '../../data/cooperatives';
import { ServiceCategory } from '../../types';

export const ServiceCategories: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>(mockServiceCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<ServiceCategory | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', commission: '5.0' });

  const handleOpenModal = (cat?: ServiceCategory) => {
    if (cat) {
      setEditCategory(cat);
      setFormData({ name: cat.name, description: cat.description, commission: cat.baseCommissionRate.toString() });
    } else {
      setEditCategory(null);
      setFormData({ name: '', description: '', commission: '5.0' });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editCategory) {
      setCategories(prev => prev.map(c => c.id === editCategory.id ? {
        ...c,
        name: formData.name,
        description: formData.description,
        baseCommissionRate: parseFloat(formData.commission) || 5.0
      } : c));
    } else {
      const newCat: ServiceCategory = {
        id: `CAT-0${categories.length + 1}`,
        name: formData.name,
        description: formData.description,
        iconName: 'Wrench',
        serviceCount: 0,
        activeCount: 0,
        status: 'active',
        baseCommissionRate: parseFloat(formData.commission) || 5.0
      };
      setCategories(prev => [...prev, newCat]);
    }
    setModalOpen(false);
  };

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Service Categories'
        description='Manage service categories and commission rates.'
        action={
          <Button size='sm' onClick={() => handleOpenModal()} className='text-xs h-8'>
            <Plus className='h-3.5 w-3.5 mr-1' /> Add category
          </Button>
        }
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {categories.map((cat) => (
          <div key={cat.id} className='card-soft p-5 flex flex-col justify-between space-y-3'>
            <div>
              <div className='flex items-start justify-between gap-2 mb-2'>
                <div className='flex items-center gap-2'>
                  <div className='h-8 w-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200'>
                    <Layers className='h-4 w-4 text-slate-600' />
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-slate-900'>{cat.name}</h3>
                    <span className='text-xs text-slate-400'>{cat.id}</span>
                  </div>
                </div>
                <StatusBadge status={cat.status} size='sm' />
              </div>

              <p className='text-xs text-slate-500 leading-relaxed'>
                {cat.description}
              </p>
            </div>

            <div className='pt-3 border-t border-slate-100 flex items-center justify-between text-xs'>
              <div>
                <span className='text-slate-400 text-[10px] uppercase font-medium block'>Services</span>
                <span className='font-medium text-slate-800'>{cat.activeCount} of {cat.serviceCount} active</span>
              </div>
              <div className='text-right'>
                <span className='text-slate-400 text-[10px] uppercase font-medium block'>Platform fee</span>
                <span className='font-semibold text-[#0369A1]'>{cat.baseCommissionRate}%</span>
              </div>
              <Button size='sm' variant='outline' onClick={() => handleOpenModal(cat)} className='h-7 px-2 text-xs'>
                <Edit2 className='h-3 w-3' />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editCategory ? 'Edit category' : 'New category'}
        description='Configure service category and commission.'
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size='sm' onClick={handleSave}>Save</Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <Input
            label='Category name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder='e.g., Plumbing & Water Systems'
            required
          />
          <div>
            <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1'>
              Description
            </label>
            <textarea
              rows={2}
              className='w-full p-2 rounded-xl border border-slate-200 text-xs focus:ring-[#159FE3]'
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder='Specify scope...'
            />
          </div>
          <Input
            label='Platform fee (%)'
            type='number'
            step='0.5'
            value={formData.commission}
            onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
            required
          />
        </div>
      </Dialog>
    </div>
  );
};
