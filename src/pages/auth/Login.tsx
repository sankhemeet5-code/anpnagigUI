import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@apnagig.coop');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShow2FAModal(true);
    }, 400);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify2FA = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShow2FAModal(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className='min-h-screen bg-[#F4F7FB] flex items-center justify-center p-4 selection:bg-sky-100'>
      <div className='max-w-md w-full space-y-6'>
        {/* Brand & Heading */}
        <div className='text-center space-y-2'>
          <div className='h-12 w-12 rounded-2xl bg-[#159FE3] text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md'>
            AG
          </div>
          <h1 className='text-2xl font-semibold text-slate-900 tracking-tight'>
            ApnaGig Operations
          </h1>
          <p className='text-xs text-slate-500'>
            Admin authentication portal
          </p>
        </div>

        {/* Login Card */}
        <div className='card-soft p-6 sm:p-8 space-y-5 bg-white'>
          <form onSubmit={handleLoginSubmit} className='space-y-4'>
            <Input
              label='Email address'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='operator@apnagig.coop'
              required
            />

            <Input
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••••••'
              required
            />

            <div className='flex items-center justify-between text-xs text-slate-500 pt-1'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type='checkbox' defaultChecked className='rounded border-slate-300 text-[#159FE3]' />
                <span>Remember session</span>
              </label>
              <a href='#' className='text-[#0369A1] hover:underline'>Reset password</a>
            </div>

            <Button
              type='submit'
              isLoading={isLoading}
              className='w-full text-xs h-9'
            >
              Sign in <ArrowRight className='h-3.5 w-3.5 ml-1' />
            </Button>
          </form>

          <div className='pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-400'>
            <Lock className='h-3.5 w-3.5' />
            <span>Encrypted administrative session</span>
          </div>
        </div>
      </div>

      {/* 2FA Verification Dialog */}
      <Dialog
        isOpen={show2FAModal}
        onClose={() => setShow2FAModal(false)}
        title='Two-factor authentication'
        description='Enter the 6-digit code sent to your registered device.'
        footer={
          <div className='flex items-center justify-end gap-2 w-full'>
            <Button variant='ghost' size='sm' onClick={() => setShow2FAModal(false)}>Cancel</Button>
            <Button size='sm' onClick={handleVerify2FA} isLoading={isLoading}>Verify session</Button>
          </div>
        }
      >
        <div className='space-y-4 py-3 text-center'>
          <div className='flex items-center justify-center gap-2'>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type='text'
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className='h-11 w-10 text-center text-base font-semibold font-mono border border-slate-200 rounded-xl focus:border-[#159FE3] focus:ring-1 focus:ring-[#159FE3] outline-none bg-slate-50'
              />
            ))}
          </div>
          <p className='text-xs text-slate-400'>
            Code expires in 4:59 min
          </p>
        </div>
      </Dialog>
    </div>
  );
};
