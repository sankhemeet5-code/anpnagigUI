import { mockUsers } from '../data/users';
import { mockWorkers } from '../data/workers';
import { mockCooperatives, mockServiceCategories, mockServices } from '../data/cooperatives';
import { mockBookings } from '../data/bookings';
import { mockEmergencies, mockCommunityServices, mockFairAllocation, mockSkillGaps, mockMonthlyCapacityPlans } from '../data/emergencies';
import { mockAnomalies, mockIncidents, mockVideoEvidence, mockDisputes } from '../data/safety';
import { mockDemandForecastData, mockAIInsights, mockGeoDemandZones, mockWorkerUtilisationStats } from '../data/analytics';
import { mockTransactions, mockPayouts, mockCooperativeFinances } from '../data/finance';
import { mockImpactMetrics, mockReportTemplates } from '../data/reports';
import { mockAdminUsers, mockAuditLogs, mockNotifications } from '../data/system';
import { User, Worker, Cooperative, Booking, EmergencyCase, IncidentCase, DisputeCase } from '../types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    return [...mockUsers];
  },
  getUserById: async (id: string): Promise<User | undefined> => {
    return mockUsers.find(u => u.id === id);
  },
  updateUserStatus: async (id: string, status: 'active' | 'inactive' | 'suspended') => {
    const user = mockUsers.find(u => u.id === id);
    if (user) user.status = status;
    return user;
  }
};

export const workerService = {
  getWorkers: async (): Promise<Worker[]> => {
    return [...mockWorkers];
  },
  getWorkerById: async (id: string): Promise<Worker | undefined> => {
    return mockWorkers.find(w => w.id === id);
  },
  updateVerificationStatus: async (id: string, status: Worker['verificationStatus']) => {
    const worker = mockWorkers.find(w => w.id === id);
    if (worker) {
      worker.verificationStatus = status;
      if (status === 'verified') {
        worker.virtualId.status = 'active';
        worker.virtualId.issuedDate = new Date().toISOString().split('T')[0];
        worker.virtualId.qrCodeData = `APNAGIG-VERIFIED-${worker.workerId}-2026`;
      }
    }
    return worker;
  },
  reissueVirtualId: async (id: string) => {
    const worker = mockWorkers.find(w => w.id === id);
    if (worker) {
      worker.virtualId.status = 'active';
      worker.virtualId.issuedDate = new Date().toISOString().split('T')[0];
      worker.virtualId.qrCodeData = `APNAGIG-REISSUED-${worker.workerId}-${Date.now().toString().slice(-4)}`;
    }
    return worker;
  },
  revokeVirtualId: async (id: string) => {
    const worker = mockWorkers.find(w => w.id === id);
    if (worker) {
      worker.virtualId.status = 'revoked';
    }
    return worker;
  }
};

export const cooperativeService = {
  getCooperatives: async (): Promise<Cooperative[]> => {
    return [...mockCooperatives];
  },
  getCooperativeById: async (id: string): Promise<Cooperative | undefined> => {
    return mockCooperatives.find(c => c.id === id);
  },
  updateApprovalStatus: async (id: string, status: 'active' | 'suspended' | 'under_review') => {
    const coop = mockCooperatives.find(c => c.id === id);
    if (coop) coop.status = status;
    return coop;
  }
};

export const bookingService = {
  getBookings: async (): Promise<Booking[]> => {
    return [...mockBookings];
  },
  getBookingById: async (id: string): Promise<Booking | undefined> => {
    return mockBookings.find(b => b.id === id);
  },
  updateStatus: async (id: string, status: Booking['status']) => {
    const booking = mockBookings.find(b => b.id === id);
    if (booking) {
      booking.status = status;
      if (status === 'in_progress') booking.startOtpVerified = true;
      if (status === 'completed') {
        booking.endOtpVerified = true;
        booking.paymentStatus = 'paid';
      }
    }
    return booking;
  }
};

export const emergencyService = {
  getEmergencies: async (): Promise<EmergencyCase[]> => {
    return [...mockEmergencies];
  },
  resolveEmergency: async (id: string) => {
    const item = mockEmergencies.find(e => e.id === id);
    if (item) item.status = 'resolved';
    return item;
  }
};

export const workforceService = {
  getFairAllocationRecords: async () => [...mockFairAllocation],
  getSkillGaps: async () => [...mockSkillGaps],
  getCapacityPlans: async () => [...mockMonthlyCapacityPlans],
  getCommunityServices: async () => [...mockCommunityServices]
};

export const safetyService = {
  getAnomalies: async () => [...mockAnomalies],
  getIncidents: async (): Promise<IncidentCase[]> => [...mockIncidents],
  getVideoEvidence: async () => [...mockVideoEvidence],
  getDisputes: async (): Promise<DisputeCase[]> => [...mockDisputes],
  updateDisputeStatus: async (id: string, status: DisputeCase['status']) => {
    const d = mockDisputes.find(item => item.id === id);
    if (d) d.status = status;
    return d;
  }
};

export const analyticsService = {
  getDemandForecast: async () => [...mockDemandForecastData],
  getAIInsights: async () => [...mockAIInsights],
  getGeoDemand: async () => [...mockGeoDemandZones],
  getWorkerUtilisation: async () => [...mockWorkerUtilisationStats]
};

export const financeService = {
  getTransactions: async () => [...mockTransactions],
  getPayouts: async () => [...mockPayouts],
  getCooperativeFinances: async () => [...mockCooperativeFinances],
  executePayout: async (payoutId: string) => {
    const p = mockPayouts.find(item => item.id === payoutId);
    if (p) p.status = 'paid';
    return p;
  }
};

export const reportService = {
  getImpactMetrics: async () => ({ ...mockImpactMetrics }),
  getReportTemplates: async () => [...mockReportTemplates]
};

export const systemService = {
  getAdminUsers: async () => [...mockAdminUsers],
  getAuditLogs: async () => [...mockAuditLogs],
  getNotifications: async () => [...mockNotifications],
  markNotificationAsRead: async (id: string) => {
    const n = mockNotifications.find(item => item.id === id);
    if (n) n.isRead = true;
    return n;
  },
  getCategories: async () => [...mockServiceCategories],
  getServices: async () => [...mockServices]
};
