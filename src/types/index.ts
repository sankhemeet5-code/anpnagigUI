export type StatusType = 
  | 'active' | 'inactive' | 'pending' | 'verified' | 'unverified' 
  | 'under_review' | 'rejected' | 'needs_info' | 'completed' 
  | 'in_progress' | 'cancelled' | 'delayed' | 'critical' 
  | 'high' | 'medium' | 'low' | 'paid' | 'processing' | 'failed'
  | 'investigating' | 'resolved' | 'dismissed' | 'open' | 'closed'
  | 'completing_soon' | 'leave' | 'exception_review';

export type BookingStatus = 'pending' | 'assigned' | 'arrived' | 'in_progress' | 'completed' | 'cancelled' | 'delayed';
export type WorkerStatus = 'active' | 'offline' | 'on_job' | 'suspended' | 'leave';
export type VerificationStatus = 'verified' | 'pending' | 'under_review' | 'rejected' | 'needs_info';
export type CooperativeStatus = 'active' | 'pending_approval' | 'suspended' | 'under_review';
export type EmergencyPriority = 'critical' | 'high' | 'medium' | 'low';
export type EmergencyStatus = 'active' | 'assigned' | 'on_scene' | 'resolved' | 'escalated';
export type PaymentStatus = 'paid' | 'pending' | 'refunded' | 'processing' | 'failed';
export type GeneralStatus = 'active' | 'inactive' | 'suspended' | 'draft' | 'under_review';
export type MonthlyCapacityPlan = CapacityPlanMonth;

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  location: string;
  zone: string;
  totalBookings: number;
  spentTotal: number;
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  lastActive: string;
  rating: number;
  preferredWorkers?: string[];
  complaintsCount?: number;
}

export interface Worker {
  id: string;
  workerId: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  cooperativeId: string;
  cooperativeName: string;
  skills: string[];
  primarySkill: string;
  location: string;
  zone: string;
  verificationStatus: 'verified' | 'pending' | 'under_review' | 'rejected' | 'needs_info';
  status: 'active' | 'offline' | 'on_job' | 'suspended' | 'leave';
  utilisationRate: number; // percentage
  rating: number;
  completedJobs: number;
  totalEarnings: number;
  joinedDate: string;
  sixMonthCommitment: {
    startDate: string;
    endDate: string;
    completedMonths: number;
    targetMonths: number;
    status: 'active' | 'completing_soon' | 'completed' | 'exception_review';
    stipendEligible: boolean;
  };
  virtualId: {
    issuedDate: string;
    qrCodeData: string;
    status: 'active' | 'reissued' | 'revoked';
  };
  welfare: {
    insuranceStatus: 'enrolled' | 'pending' | 'ineligible';
    fundContribution: number;
    benefitsClaimed: number;
  };
  documents?: {
    idProof: { status: 'verified' | 'pending' | 'rejected'; name: string; url?: string };
    addressProof: { status: 'verified' | 'pending' | 'rejected'; name: string; url?: string };
    tradeCertificate: { status: 'verified' | 'pending' | 'rejected'; name: string; url?: string };
    policeClearance: { status: 'verified' | 'pending' | 'rejected'; name: string; url?: string };
  };
}

export interface Cooperative {
  id: string;
  name: string;
  registrationNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  zone: string;
  memberCount: number;
  activeWorkers: number;
  servicesProvided: string[];
  totalJobsCompleted: number;
  monthlyRevenue: number;
  balance: number;
  serviceQualityScore: number; // e.g. 4.8 / 5
  status: 'active' | 'pending_approval' | 'suspended' | 'under_review';
  joinedDate: string;
  documents?: { name: string; type: string; verified: boolean }[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  serviceCount: number;
  activeCount: number;
  status: 'active' | 'inactive';
  baseCommissionRate: number; // percentage
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  estimatedDurationMins: number;
  status: 'active' | 'inactive' | 'seasonal';
  serviceAreas: string[];
  requiredSkillLevel: 'Basic' | 'Intermediate' | 'Certified' | 'Master';
  demandIndex: 'High' | 'Medium' | 'Low';
}

export interface BookingMilestone {
  id: string;
  title: string;
  timestamp?: string;
  completed: boolean;
  notes?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  workerId?: string;
  workerName?: string;
  workerPhone?: string;
  cooperativeId?: string;
  cooperativeName?: string;
  serviceId: string;
  serviceName: string;
  categoryName: string;
  date: string;
  timeSlot: string;
  location: string;
  zone: string;
  amount: number;
  currency: string;
  status: 'pending' | 'assigned' | 'arrived' | 'in_progress' | 'completed' | 'cancelled' | 'delayed';
  startOtpVerified: boolean;
  startOtpTimestamp?: string;
  endOtpVerified: boolean;
  endOtpTimestamp?: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  evidenceSubmitted?: boolean;
  disputeId?: string;
  createdAt: string;
  milestones: BookingMilestone[];
  feeBreakdown: {
    basePrice: number;
    platformFee: number;
    cooperativeShare: number;
    workerPayout: number;
    taxes: number;
  };
}

export interface EmergencyCase {
  id: string;
  caseNumber: string;
  callerType: 'worker' | 'customer';
  callerName: string;
  callerPhone: string;
  linkedBookingId?: string;
  serviceName?: string;
  location: string;
  zone: string;
  gpsCoordinates: { lat: number; lng: number };
  priority: 'critical' | 'high' | 'medium';
  status: 'active' | 'assigned' | 'on_scene' | 'resolved' | 'escalated';
  timeElapsedMinutes: number;
  assignedResponder?: {
    name: string;
    unit: string;
    etaMinutes: number;
    phone: string;
  };
  triggerReason: string;
  notes: string;
  reportedAt: string;
}

export interface CommunityServiceRequest {
  id: string;
  organizationName: string;
  contactPerson: string;
  contactPhone: string;
  serviceArea: string;
  serviceCategory: string;
  description: string;
  beneficiariesCount: number;
  requestedDate: string;
  assignedCooperativeId?: string;
  assignedCooperativeName?: string;
  assignedTeamSize?: number;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  subsidyCoveredPercent: number;
}

export interface FairAllocationRecord {
  workerId: string;
  workerName: string;
  cooperativeName: string;
  skill: string;
  currentUtilisation: number;
  weeklyHours: number;
  assignedJobsCount: number;
  fairnessScore: number; // 0-100
  distanceToHotspotKm: number;
  status: 'balanced' | 'overloaded' | 'under_allocated';
  recommendation?: string;
}

export interface SkillGapItem {
  id: string;
  serviceName: string;
  zone: string;
  demandLevel: 'High' | 'Very High' | 'Medium' | 'Low';
  qualifiedWorkersAvailable: number;
  requiredWorkers: number;
  gapCount: number;
  onboardingRecommended: number;
  upskillCandidatesCount: number;
  actionStatus: 'pending' | 'training_in_progress' | 'fulfilled';
}

export interface CapacityPlanMonth {
  month: string;
  service: string;
  zone: string;
  projectedDemand: number;
  availableWorkers: number;
  requiredWorkers: number;
  gap: number;
  recommendedAction: 'Recruit' | 'Train' | 'Reallocate' | 'Increase Shifts' | 'Optimal';
  status: 'action_required' | 'under_review' | 'balanced';
}

export interface AnomalyCase {
  id: string;
  caseRef: string;
  type: 'GPS Anomaly' | 'Suspicious Booking Pattern' | 'Rating Manipulation' | 'Payment Velocity' | 'Frequent Cancellations';
  severity: 'high' | 'medium' | 'low';
  involvedEntity: {
    type: 'worker' | 'customer' | 'cooperative';
    id: string;
    name: string;
  };
  description: string;
  detectedAt: string;
  status: 'new' | 'investigating' | 'resolved' | 'dismissed';
  evidenceSnippet: string;
  assignedAdmin?: string;
}

export interface IncidentCase {
  id: string;
  incidentNumber: string;
  type: 'Safety Concern' | 'Property Damage' | 'Verbal Dispute' | 'Service Delay / No-show' | 'Payment Dispute';
  severity: 'critical' | 'high' | 'medium' | 'low';
  reporterType: 'customer' | 'worker';
  reporterName: string;
  reporterContact: string;
  linkedBookingId: string;
  location: string;
  reportedAt: string;
  status: 'open' | 'under_review' | 'awaiting_info' | 'resolved' | 'escalated';
  assignedAdmin: string;
  hasVideoEvidence: boolean;
  videoEvidenceId?: string;
  summary: string;
  timeline: { time: string; event: string; user: string }[];
}

export interface VideoEvidenceItem {
  id: string;
  caseId: string;
  incidentRef: string;
  bookingRef: string;
  recordingTimestamp: string;
  durationSeconds: number;
  retentionDaysRemaining: number;
  accessStatus: 'Restricted - Tier 2 Admin' | 'Under Legal Hold' | 'Archived';
  consentVerified: boolean;
  fileSizeMb: number;
  uploadedBy: string;
  sha256Hash: string;
  accessLogs: { timestamp: string; adminName: string; action: string }[];
}

export interface DisputeCase {
  id: string;
  disputeRef: string;
  bookingRef: string;
  customerName: string;
  workerName: string;
  cooperativeName: string;
  amountDisputed: number;
  reason: string;
  status: 'open' | 'under_review' | 'awaiting_information' | 'resolved' | 'closed';
  filedDate: string;
  resolutionSummary?: string;
  refundApproved?: boolean;
}

export interface TransactionItem {
  id: string;
  transactionRef: string;
  bookingRef: string;
  customerName: string;
  workerName: string;
  cooperativeName: string;
  totalAmount: number;
  workerPayout: number;
  cooperativeFee: number;
  platformCommission: number;
  paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Coop Wallet';
  status: 'completed' | 'pending' | 'refunded' | 'failed';
  date: string;
}

export interface WorkerPayoutItem {
  id: string;
  payoutRef: string;
  workerId: string;
  workerName: string;
  cooperativeName: string;
  bankAccountMasked: string;
  grossEarnings: number;
  welfareDeductions: number;
  netPayout: number;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  period: string;
  payoutDate: string;
}

export interface CooperativeFinanceItem {
  cooperativeId: string;
  cooperativeName: string;
  totalMembers: number;
  monthlyRevenue: number;
  collectedDues: number;
  welfareReserve: number;
  platformSettlementDue: number;
  lastSettlementDate: string;
  status: 'in_good_standing' | 'review_required';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'Super Admin' | 'Operations Admin' | 'Finance Admin' | 'Safety Admin' | 'Workforce Admin' | 'Support Admin';
  status: 'active' | 'inactive' | 'locked';
  lastActive: string;
  createdDate: string;
  permissions: {
    users: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    workers: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    cooperatives: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    finance: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    safety: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    settings: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  };
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  adminName: string;
  adminEmail: string;
  adminRole: string;
  action: string;
  targetEntity: string;
  entityId: string;
  ipAddressMasked: string;
  result: 'Success' | 'Failed' | 'Blocked';
  details: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'system' | 'safety' | 'demand' | 'operations' | 'payments';
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  isRead: boolean;
  linkedUrl?: string;
}
