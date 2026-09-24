import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  HardHat,
  Building2,
  CheckCircle2,
  AlertCircle,
  Receipt
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { mockBookings } from '../../data/bookings';

export const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(mockBookings.find((b) => b.id === id) || mockBookings[0]);
  const [isDisputeDialogOpen, setIsDisputeDialogOpen] = useState(false);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState('');

  const handleForceEndOtp = () => {
    setBooking(prev => ({
      ...prev,
      status: 'completed',
      endOtpVerified: true,
      endOtpTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentStatus: 'paid'
    }));
    setStatusUpdateMessage('Booking marked as completed.');
  };

  return (
    <div className='space-y-6 pb-12'>
      {/* Back Navigation Bar */}
      <div className='flex items-center justify-between'>
        <button
          onClick={() => navigate('/bookings')}
          className='inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors'
        >
          <ArrowLeft className='h-4 w-4 mr-1' /> Back to bookings
        </button>

        <div className='flex items-center gap-2'>
          {booking.status !== 'completed' && (
            <Button size='sm' variant='outline' onClick={handleForceEndOtp} className='text-xs h-8'>
              <CheckCircle2 className='h-3.5 w-3.5 mr-1 text-emerald-600' /> Mark complete
            </Button>
          )}
          <Button size='sm' variant='danger' onClick={() => setIsDisputeDialogOpen(true)} className='text-xs h-8'>
            <AlertCircle className='h-3.5 w-3.5 mr-1' /> Log dispute
          </Button>
        </div>
      </div>

      {statusUpdateMessage && (
        <div className='p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2'>
          <CheckCircle2 className='h-4 w-4 text-emerald-600 shrink-0' />
          <span>{statusUpdateMessage}</span>
        </div>
      )}

      {/* Main Header Card */}
      <div className='card-soft p-6 space-y-5'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-slate-100'>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-xl font-semibold text-slate-900'>{booking.bookingCode}</h1>
              <StatusBadge status={booking.status} size='sm' />
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${booking.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>
                {booking.paymentStatus === 'paid' ? 'Paid' : 'Payment pending'}
              </span>
            </div>
            <p className='text-xs text-slate-500 mt-1'>
              Created {booking.createdAt} • {booking.categoryName}
            </p>
          </div>

          <div className='text-right'>
            <span className='text-xs text-slate-400 block'>Total amount</span>
            <span className='text-2xl font-semibold text-slate-900'>₹{booking.amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Customer & Worker Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-xs'>
          {/* Customer */}
          <div className='p-4 rounded-xl bg-slate-50/75 border border-slate-100 space-y-1.5'>
            <div className='flex items-center gap-1.5 text-slate-400 font-medium uppercase text-[11px]'>
              <User className='h-3.5 w-3.5 text-[#159FE3]' /> Customer
            </div>
            <p className='font-semibold text-slate-900 text-sm'>{booking.customerName}</p>
            <p className='text-slate-600 flex items-center gap-1.5'>
              <Phone className='h-3.5 w-3.5 text-slate-400' /> {booking.customerPhone}
            </p>
            <p className='text-slate-600 flex items-start gap-1.5'>
              <MapPin className='h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5' /> {booking.location}
            </p>
          </div>

          {/* Assigned Worker */}
          <div className='p-4 rounded-xl bg-slate-50/75 border border-slate-100 space-y-1.5'>
            <div className='flex items-center gap-1.5 text-slate-400 font-medium uppercase text-[11px]'>
              <HardHat className='h-3.5 w-3.5 text-[#159FE3]' /> Worker
            </div>
            <p className='font-semibold text-slate-900 text-sm'>{booking.workerName || 'Awaiting assignment'}</p>
            {booking.workerPhone && (
              <p className='text-slate-600 flex items-center gap-1.5'>
                <Phone className='h-3.5 w-3.5 text-slate-400' /> {booking.workerPhone}
              </p>
            )}
            <p className='text-slate-600 flex items-center gap-1.5'>
              <Building2 className='h-3.5 w-3.5 text-slate-400' /> {booking.cooperativeName || 'Cooperative'}
            </p>
          </div>

          {/* Service & Schedule */}
          <div className='p-4 rounded-xl bg-slate-50/75 border border-slate-100 space-y-1.5'>
            <div className='flex items-center gap-1.5 text-slate-400 font-medium uppercase text-[11px]'>
              <Calendar className='h-3.5 w-3.5 text-[#159FE3]' /> Schedule
            </div>
            <p className='font-semibold text-slate-900 text-sm'>{booking.serviceName}</p>
            <p className='text-slate-600 flex items-center gap-1.5'>
              <Clock className='h-3.5 w-3.5 text-slate-400' /> {booking.date} ({booking.timeSlot})
            </p>
            <div className='pt-1 flex items-center gap-2'>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${booking.startOtpVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                Start OTP: {booking.startOtpVerified ? 'Verified' : 'Pending'}
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${booking.endOtpVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                End OTP: {booking.endOtpVerified ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Milestones Timeline */}
      <div className='card-soft p-6 space-y-4'>
        <h3 className='text-card-title pb-2 border-b border-slate-100'>
          Milestones
        </h3>

        <div className='relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200'>
          {booking.milestones.map((m, idx) => (
            <div key={idx} className='relative flex items-start gap-3'>
              <div
                className={`absolute -left-6 mt-0.5 h-5 w-5 rounded-full flex items-center justify-center text-white ring-4 ring-white ${
                  m.completed ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                {m.completed ? <CheckCircle2 className='h-3.5 w-3.5' /> : <div className='h-1.5 w-1.5 rounded-full bg-white' />}
              </div>

              <div className='flex-1 text-xs'>
                <div className='flex items-center justify-between'>
                  <span className={`font-medium ${m.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                    {m.title}
                  </span>
                  {m.timestamp && <span className='text-slate-400'>{m.timestamp}</span>}
                </div>
                {m.notes && <p className='text-slate-500 mt-0.5'>{m.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Split */}
      <div className='card-soft p-6 space-y-4'>
        <h3 className='text-card-title pb-2 border-b border-slate-100'>
          Fee breakdown
        </h3>

        <div className='grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs'>
          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 uppercase text-[10px] font-medium block mb-0.5'>Base price</span>
            <span className='font-semibold text-slate-900'>₹{booking.feeBreakdown.basePrice}</span>
          </div>
          <div className='p-3 rounded-xl bg-sky-50/50 border border-sky-100'>
            <span className='text-sky-700 uppercase text-[10px] font-medium block mb-0.5'>Worker payout (80%)</span>
            <span className='font-semibold text-[#0369A1]'>₹{booking.feeBreakdown.workerPayout}</span>
          </div>
          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 uppercase text-[10px] font-medium block mb-0.5'>Cooperative fund</span>
            <span className='font-semibold text-slate-800'>₹{booking.feeBreakdown.cooperativeShare}</span>
          </div>
          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 uppercase text-[10px] font-medium block mb-0.5'>Platform fee (5%)</span>
            <span className='font-semibold text-slate-800'>₹{booking.feeBreakdown.platformFee}</span>
          </div>
          <div className='p-3 rounded-xl bg-slate-50/75 border border-slate-100'>
            <span className='text-slate-400 uppercase text-[10px] font-medium block mb-0.5'>Taxes (GST)</span>
            <span className='font-semibold text-slate-800'>₹{booking.feeBreakdown.taxes}</span>
          </div>
        </div>
      </div>

      {/* Dispute Modal */}
      <Dialog
        isOpen={isDisputeDialogOpen}
        onClose={() => setIsDisputeDialogOpen(false)}
        title='Log dispute'
        description='Initiate dispute arbitration for this booking.'
        footer={
          <div className='flex items-center justify-end gap-2'>
            <Button variant='ghost' size='sm' onClick={() => setIsDisputeDialogOpen(false)}>
              Cancel
            </Button>
            <Button size='sm' variant='danger' onClick={() => {
              setIsDisputeDialogOpen(false);
              navigate('/safety/disputes');
            }}>
              Submit dispute
            </Button>
          </div>
        }
      >
        <div className='space-y-3 py-2 text-xs'>
          <p className='text-slate-600'>Select dispute category:</p>
          <select className='w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white'>
            <option>Service quality</option>
            <option>Worker no-show</option>
            <option>Payment issue</option>
            <option>Other</option>
          </select>
        </div>
      </Dialog>
    </div>
  );
};
