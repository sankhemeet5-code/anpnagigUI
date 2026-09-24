import { AdminUser, AuditLogItem, NotificationItem } from '../types';

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'ADM-01',
    name: 'Vikram Seth',
    email: 'admin@apnagig.coop',
    avatar: 'VS',
    role: 'Super Admin',
    status: 'active',
    lastActive: 'Just now',
    createdDate: '2024-01-01',
    permissions: {
      users: { view: true, create: true, edit: true, delete: true },
      workers: { view: true, create: true, edit: true, delete: true },
      cooperatives: { view: true, create: true, edit: true, delete: true },
      finance: { view: true, create: true, edit: true, delete: true },
      safety: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, create: true, edit: true, delete: true }
    }
  },
  {
    id: 'ADM-02',
    name: 'Pooja Hegde',
    email: 'pooja.h@apnagig.coop',
    avatar: 'PH',
    role: 'Operations Admin',
    status: 'active',
    lastActive: '12 mins ago',
    createdDate: '2024-03-15',
    permissions: {
      users: { view: true, create: true, edit: true, delete: false },
      workers: { view: true, create: true, edit: true, delete: false },
      cooperatives: { view: true, create: false, edit: true, delete: false },
      finance: { view: true, create: false, edit: false, delete: false },
      safety: { view: true, create: true, edit: true, delete: false },
      settings: { view: false, create: false, edit: false, delete: false }
    }
  },
  {
    id: 'ADM-03',
    name: 'Manish Rathi',
    email: 'manish.r@apnagig.coop',
    avatar: 'MR',
    role: 'Finance Admin',
    status: 'active',
    lastActive: '1 hour ago',
    createdDate: '2024-05-10',
    permissions: {
      users: { view: true, create: false, edit: false, delete: false },
      workers: { view: true, create: false, edit: false, delete: false },
      cooperatives: { view: true, create: false, edit: true, delete: false },
      finance: { view: true, create: true, edit: true, delete: true },
      safety: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false }
    }
  }
];

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'LOG-5501',
    timestamp: '2026-08-27 10:16:02',
    adminName: 'Vikram Seth',
    adminEmail: 'admin@apnagig.coop',
    adminRole: 'Super Admin',
    action: 'DISPATCH_EMERGENCY_UNIT',
    targetEntity: 'EmergencyCase',
    entityId: 'EMG-301',
    ipAddressMasked: '192.168.1.•••',
    result: 'Success',
    details: 'Dispatched Bandra RRU unit for SOS panic trigger at Sea Breeze Apts.'
  },
  {
    id: 'LOG-5502',
    timestamp: '2026-08-27 09:42:15',
    adminName: 'Pooja Hegde',
    adminEmail: 'pooja.h@apnagig.coop',
    adminRole: 'Operations Admin',
    action: 'VERIFY_WORKER_DOCUMENT',
    targetEntity: 'Worker',
    entityId: 'WRK-5120',
    ipAddressMasked: '192.168.1.•••',
    result: 'Success',
    details: 'Verified Aadhaar and Address proofs for Suresh Deshmukh.'
  },
  {
    id: 'LOG-5503',
    timestamp: '2026-08-26 16:15:30',
    adminName: 'Manish Rathi',
    adminEmail: 'manish.r@apnagig.coop',
    adminRole: 'Finance Admin',
    action: 'EXECUTE_BATCH_PAYOUTS',
    targetEntity: 'WorkerPayout',
    entityId: 'BATCH-2026-W34',
    ipAddressMasked: '10.0.4.•••',
    result: 'Success',
    details: 'Approved ₹54,350 net payouts across 4 cooperative worker accounts.'
  },
  {
    id: 'LOG-5504',
    timestamp: '2026-08-26 14:20:10',
    adminName: 'Vikram Seth',
    adminEmail: 'admin@apnagig.coop',
    adminRole: 'Super Admin',
    action: 'UPDATE_PRIVACY_POLICY_RETENTION',
    targetEntity: 'PrivacyGovernance',
    entityId: 'POL-VID-RET',
    ipAddressMasked: '192.168.1.•••',
    result: 'Success',
    details: 'Updated maximum incident video retention window to 30 days.'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'NTF-01',
    title: 'Emergency Case Active in Bandra West',
    message: 'Technician triggered SOS alert during bathroom fixture installation. Response team assigned.',
    category: 'safety',
    severity: 'critical',
    timestamp: '5 mins ago',
    isRead: false,
    linkedUrl: '/emergency'
  },
  {
    id: 'NTF-02',
    title: 'High Demand Surge Forecasted',
    message: 'Plumbing demand in Mumbai North projected to exceed capacity by 6 workers next month.',
    category: 'demand',
    severity: 'warning',
    timestamp: '25 mins ago',
    isRead: false,
    linkedUrl: '/analytics/capacity-planning'
  },
  {
    id: 'NTF-03',
    title: 'Pending Cooperative Verification',
    message: 'Pimpri-Chinchwad Skilled Trades Guild submitted documents for accreditation.',
    category: 'operations',
    severity: 'info',
    timestamp: '2 hours ago',
    isRead: false,
    linkedUrl: '/cooperatives/approval'
  },
  {
    id: 'NTF-04',
    title: 'Weekly Payout Batch Processed',
    message: 'Batch W34 payouts processed successfully for 48 active cooperative members.',
    category: 'payments',
    severity: 'info',
    timestamp: '1 day ago',
    isRead: true,
    linkedUrl: '/finance/payouts'
  }
];
