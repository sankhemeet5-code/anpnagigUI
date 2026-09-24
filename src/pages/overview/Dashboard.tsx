import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  HardHat,
  Building2,
  CalendarCheck,
  Zap,
  TrendingUp,
  ShieldAlert,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { ChartCard } from '../../components/common/ChartCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { Button } from '../../components/ui/Button';
import { mockBookings } from '../../data/bookings';
import { mockWorkers } from '../../data/workers';
import { mockEmergencies } from '../../data/emergencies';

const bookingTrendData = [
  { day: 'Mon', bookings: 142, completed: 138 },
  { day: 'Tue', bookings: 168, completed: 162 },
  { day: 'Wed', bookings: 195, completed: 188 },
  { day: 'Thu', bookings: 210, completed: 204 },
  { day: 'Fri', bookings: 240, completed: 231 },
  { day: 'Sat', bookings: 290, completed: 278 },
  { day: 'Sun', bookings: 265, completed: 259 },
];

const serviceDemandData = [
  { service: 'Plumbing', orders: 480 },
  { service: 'Electrical', orders: 410 },
  { service: 'Cleaning', orders: 620 },
  { service: 'Carpentry', orders: 230 },
  { service: 'Painting', orders: 190 },
];

const utilisationPieData = [
  { name: 'Balanced (60-85%)', value: 55, color: '#10B981' },
  { name: 'Over-utilised (>85%)', value: 25, color: '#FF6B4A' },
  { name: 'Under-utilised (<60%)', value: 20, color: '#159FE3' },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const activeJobs = mockBookings.filter(b => b.status === 'in_progress' || b.status === 'arrived');
  const pendingVerifications = mockWorkers.filter(w => w.verificationStatus === 'pending' || w.verificationStatus === 'under_review');
  const activeEmergencies = mockEmergencies.filter(e => e.status !== 'resolved');

  return (
    <div className='space-y-6 pb-12'>
      <PageHeader
        title='Dashboard'
        description='Overview of bookings, worker utilisation, and service operations.'
        action={
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' onClick={() => navigate('/operations/live')}>
              Live operations
            </Button>
            <Button size='sm' onClick={() => navigate('/emergency')} variant='danger'>
              <AlertTriangle className='h-3.5 w-3.5 mr-1.5' /> Emergency
            </Button>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard
          title='Registered Users'
          value='14,820'
          change='↑ 12.4% this month'
          trend='up'
          icon={<Users className='h-4 w-4' />}
        />
        <StatCard
          title='Active Workers'
          value='1,064'
          change='88% on duty'
          trend='neutral'
          icon={<HardHat className='h-4 w-4' />}
        />
        <StatCard
          title='Member Cooperatives'
          value='5'
          change='1 pending review'
          trend='neutral'
          icon={<Building2 className='h-4 w-4' />}
        />
        <StatCard
          title="Today's Bookings"
          value='265'
          change='↑ 8.1% vs yesterday'
          trend='up'
          icon={<CalendarCheck className='h-4 w-4' />}
        />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard
          title='Active Jobs'
          value='42'
          change='14 in progress'
          trend='neutral'
          icon={<Zap className='h-4 w-4' />}
        />
        <StatCard
          title='Monthly Volume'
          value='₹41.8 L'
          change='↑ 14.2% MoM'
          trend='up'
          icon={<TrendingUp className='h-4 w-4' />}
        />
        <StatCard
          title='Service Level'
          value='99.4%'
          change='Avg OTP: 3.2m'
          trend='up'
          icon={<CheckCircle2 className='h-4 w-4' />}
        />
        <StatCard
          title='Pending Attention'
          value={activeEmergencies.length > 0 ? `${activeEmergencies.length} Emergency` : '0 Critical'}
          change='3 verifications pending'
          trend={activeEmergencies.length > 0 ? 'down' : 'neutral'}
          icon={<ShieldAlert className='h-4 w-4' />}
        />
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Weekly Bookings Trend */}
        <div className='lg:col-span-2'>
          <ChartCard
            title='Weekly bookings'
            subtitle='Last 7 days'
          >
            <div className='h-64 w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={bookingTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id='colorBookings' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#159FE3' stopOpacity={0.25} />
                      <stop offset='95%' stopColor='#159FE3' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey='day' stroke='#94A3B8' fontSize={11} tickLine={false} />
                  <YAxis stroke='#94A3B8' fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  />
                  <Area type='monotone' dataKey='bookings' stroke='#159FE3' strokeWidth={2} fillOpacity={1} fill='url(#colorBookings)' name='Bookings' />
                  <Area type='monotone' dataKey='completed' stroke='#10B981' strokeWidth={1.5} fillOpacity={0} strokeDasharray='3 3' name='Completed' />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className='flex items-center justify-center gap-6 mt-2 text-xs text-slate-500'>
              <span className='flex items-center gap-1.5'>
                <span className='h-2 w-2 rounded-full bg-[#159FE3]' /> Total requested
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='h-2 w-2 rounded-full bg-[#10B981]' /> Completed
              </span>
            </div>
          </ChartCard>
        </div>

        {/* Worker Utilisation Breakdown */}
        <div>
          <ChartCard
            title='Worker utilisation'
            subtitle='Current active workforce'
          >
            <div className='h-48 w-full flex items-center justify-center'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={utilisationPieData}
                    cx='50%'
                    cy='50%'
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey='value'
                  >
                    {utilisationPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [`${val}%`, 'Workforce']}
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='space-y-1.5 mt-2'>
              {utilisationPieData.map((item) => (
                <div key={item.name} className='flex items-center justify-between text-xs'>
                  <div className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full' style={{ backgroundColor: item.color }} />
                    <span className='text-slate-600'>{item.name}</span>
                  </div>
                  <span className='font-medium text-slate-800'>{item.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Demand & Operational Breakdown */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Service Demand Bar Chart */}
        <div className='lg:col-span-1'>
          <ChartCard
            title='Demand by trade'
            subtitle='Current week'
          >
            <div className='h-60 w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={serviceDemandData} layout='vertical' margin={{ top: 5, right: 10, left: 15, bottom: 5 }}>
                  <XAxis type='number' stroke='#94A3B8' fontSize={11} tickLine={false} />
                  <YAxis type='category' dataKey='service' stroke='#64748B' fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey='orders' fill='#159FE3' radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Live Operational Snapshot */}
        <div className='lg:col-span-2 space-y-4'>
          <div className='card-soft p-5'>
            <div className='flex items-center justify-between pb-3 border-b border-slate-100'>
              <div className='flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-emerald-500' />
                <h3 className='text-card-title'>Active jobs</h3>
              </div>
              <button
                onClick={() => navigate('/bookings')}
                className='text-xs text-[#0369A1] hover:underline font-medium flex items-center gap-1'
              >
                View all <ArrowRight className='h-3 w-3' />
              </button>
            </div>

            <div className='divide-y divide-slate-100 text-xs'>
              {activeJobs.slice(0, 3).map((job) => (
                <div key={job.id} className='py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors'>
                  <div className='space-y-0.5'>
                    <div className='flex items-center gap-2'>
                      <span className='font-semibold text-slate-900'>{job.bookingCode}</span>
                      <span className='text-slate-400'>•</span>
                      <span className='text-slate-600'>{job.serviceName}</span>
                    </div>
                    <p className='text-slate-400'>{job.customerName} • {job.location}</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='text-right hidden sm:block'>
                      <span className='font-medium text-slate-700'>{job.workerName || 'Assigning'}</span>
                      <p className='text-slate-400 text-[11px]'>{job.timeSlot}</p>
                    </div>
                    <StatusBadge status={job.status} size='sm' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='card-soft p-4 space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-xs font-semibold text-slate-800 flex items-center gap-1.5'>
                  <Clock className='h-3.5 w-3.5 text-slate-400' />
                  Verification queue ({pendingVerifications.length})
                </span>
                <button onClick={() => navigate('/workers/verification')} className='text-xs text-[#0369A1] hover:underline font-medium'>
                  Review
                </button>
              </div>
              <p className='text-xs text-slate-500'>
                {pendingVerifications[0]?.name || 'Applicant'} submitted credentials for review.
              </p>
              <Button size='sm' variant='outline' onClick={() => navigate('/workers/verification')} className='w-full text-xs h-7'>
                Open queue
              </Button>
            </div>

            <div className='card-soft p-4 space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-xs font-semibold text-slate-800 flex items-center gap-1.5'>
                  <AlertTriangle className='h-3.5 w-3.5 text-rose-500' />
                  Active emergencies ({activeEmergencies.length})
                </span>
                {activeEmergencies.length > 0 && <PriorityBadge priority='critical' size='sm' />}
              </div>
              <p className='text-xs text-slate-500'>
                {activeEmergencies[0]?.location || 'No active alerts'}
              </p>
              <Button size='sm' variant='danger' onClick={() => navigate('/emergency')} className='w-full text-xs h-7'>
                View emergency desk
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
