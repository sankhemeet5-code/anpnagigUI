import { EmergencyCase, CommunityServiceRequest, FairAllocationRecord, SkillGapItem, CapacityPlanMonth } from '../types';

export const mockEmergencies: EmergencyCase[] = [
  {
    id: 'EMG-301',
    caseNumber: 'EMG-MUM-2026-0827-01',
    callerType: 'worker',
    callerName: 'Rahul Shah (Worker)',
    callerPhone: '+91 98205 11980',
    linkedBookingId: 'BK-9901',
    serviceName: 'Tap & Shower Leakage Fix',
    location: 'Building 4, Sea Breeze, Bandra West, Mumbai',
    zone: 'West Zone',
    gpsCoordinates: { lat: 19.0596, lng: 72.8295 },
    priority: 'critical',
    status: 'assigned',
    timeElapsedMinutes: 6,
    assignedResponder: {
      name: 'Bandra Rapid Response Unit (Coop Officer Sunil Patil)',
      unit: 'RRU-Zone-4',
      etaMinutes: 4,
      phone: '+91 98200 99881'
    },
    triggerReason: 'SOS Panic Button Pressed: Electrical Short Sparks during bathroom plumbing inspection',
    notes: 'Worker isolated main water shut-off. Building electrical mains tripping. Responder dispatched.',
    reportedAt: '10:14 AM'
  },
  {
    id: 'EMG-302',
    caseNumber: 'EMG-PUN-2026-0827-02',
    callerType: 'customer',
    callerName: 'Sunita Joshi (Customer)',
    callerPhone: '+91 97650 33112',
    linkedBookingId: 'BK-9906',
    serviceName: 'Wall Patch & Waterproof Treatment',
    location: 'Hinjawadi Phase 1, Pune',
    zone: 'Pune West',
    gpsCoordinates: { lat: 18.5913, lng: 73.7389 },
    priority: 'high',
    status: 'active',
    timeElapsedMinutes: 14,
    triggerReason: 'Customer reported unverified external assistant brought by technician',
    notes: 'Safety desk investigating unauthorized person on premises.',
    reportedAt: '09:50 AM'
  },
  {
    id: 'EMG-303',
    caseNumber: 'EMG-THA-2026-0826-09',
    callerType: 'worker',
    callerName: 'Suresh Deshmukh',
    callerPhone: '+91 98920 88711',
    location: 'Ghodbunder Road, Thane',
    zone: 'Thane Central',
    gpsCoordinates: { lat: 19.2612, lng: 72.9644 },
    priority: 'medium',
    status: 'resolved',
    timeElapsedMinutes: 45,
    assignedResponder: {
      name: 'Thane Field Supervisor Deepak Raut',
      unit: 'TF-02',
      etaMinutes: 0,
      phone: '+91 98330 22119'
    },
    triggerReason: 'Ladder slippage minor injury',
    notes: 'First-aid applied. Cooperative welfare emergency coverage initiated. Case closed.',
    reportedAt: 'Yesterday 03:20 PM'
  }
];

export const mockCommunityServices: CommunityServiceRequest[] = [
  {
    id: 'CSR-101',
    organizationName: 'Navi Mumbai Senior Citizens Trust',
    contactPerson: 'Dr. Ashok Ranade',
    contactPhone: '+91 22 2789 5541',
    serviceArea: 'Vashi Sector 14, Navi Mumbai',
    serviceCategory: 'Plumbing & Water Systems',
    description: 'Quarterly community sanitation inspection and fixture repair for 48 assisted living rooms.',
    beneficiariesCount: 48,
    requestedDate: '2026-09-02',
    assignedCooperativeId: 'COP-03',
    assignedCooperativeName: 'Navi Mumbai Urban Workers Union',
    assignedTeamSize: 4,
    status: 'assigned',
    subsidyCoveredPercent: 100
  },
  {
    id: 'CSR-102',
    organizationName: 'Dharavi Vocational Education Centre',
    contactPerson: 'Smt. Fatima Sheikh',
    contactPhone: '+91 98210 77610',
    serviceArea: 'Central Mumbai',
    serviceCategory: 'Electrical & Appliance Repairs',
    description: 'Rewiring of computer lab and setup of 12 ceiling fans before academic batch starts.',
    beneficiariesCount: 120,
    requestedDate: '2026-09-05',
    assignedCooperativeId: 'COP-01',
    assignedCooperativeName: 'Mumbai Shramik Seva Cooperative',
    assignedTeamSize: 6,
    status: 'pending',
    subsidyCoveredPercent: 85
  }
];

export const mockFairAllocation: FairAllocationRecord[] = [
  {
    workerId: 'WRK-2105',
    workerName: 'Neha Patil',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    skill: 'Deep Cleaning',
    currentUtilisation: 94,
    weeklyHours: 46,
    assignedJobsCount: 14,
    fairnessScore: 68,
    distanceToHotspotKm: 1.8,
    status: 'overloaded',
    recommendation: 'Shift upcoming 2 bookings to balanced workers (e.g. WRK-4089 or WRK-5120) to prevent burnout and ensure equal income distribution.'
  },
  {
    workerId: 'WRK-1042',
    workerName: 'Rahul Shah',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    skill: 'Plumbing',
    currentUtilisation: 88,
    weeklyHours: 42,
    assignedJobsCount: 12,
    fairnessScore: 82,
    distanceToHotspotKm: 2.1,
    status: 'balanced',
    recommendation: 'Optimal workload alignment with 6-month commitment targets.'
  },
  {
    workerId: 'WRK-3011',
    workerName: 'Arjun Mehta',
    cooperativeName: 'Pune Karigar Ekta Society',
    skill: 'Electrical',
    currentUtilisation: 76,
    weeklyHours: 35,
    assignedJobsCount: 9,
    fairnessScore: 89,
    distanceToHotspotKm: 3.4,
    status: 'balanced',
    recommendation: 'Well-distributed pipeline across Kothrud & Pune Central.'
  },
  {
    workerId: 'WRK-5120',
    workerName: 'Suresh Deshmukh',
    cooperativeName: 'Thane District Labour Federation',
    skill: 'Painting',
    currentUtilisation: 42,
    weeklyHours: 20,
    assignedJobsCount: 4,
    fairnessScore: 94,
    distanceToHotspotKm: 4.2,
    status: 'under_allocated',
    recommendation: 'Prioritize upcoming Thane waterproofing orders to bring weekly hours to standard 36h benchmark.'
  },
  {
    workerId: 'WRK-7102',
    workerName: 'Ganesh Shinde',
    cooperativeName: 'Pune Karigar Ekta Society',
    skill: 'Masonry',
    currentUtilisation: 15,
    weeklyHours: 8,
    assignedJobsCount: 1,
    fairnessScore: 40,
    distanceToHotspotKm: 6.0,
    status: 'under_allocated',
    recommendation: 'Resolve address document resubmission to unlock full dispatch queue.'
  }
];

export const mockSkillGaps: SkillGapItem[] = [
  {
    id: 'GAP-01',
    serviceName: 'Plumbing & Water Systems',
    zone: 'Mumbai North Zone',
    demandLevel: 'Very High',
    qualifiedWorkersAvailable: 12,
    requiredWorkers: 18,
    gapCount: 6,
    onboardingRecommended: 4,
    upskillCandidatesCount: 2,
    actionStatus: 'pending'
  },
  {
    id: 'GAP-02',
    serviceName: 'Electrical & Appliance Repairs',
    zone: 'Pune South Zone',
    demandLevel: 'High',
    qualifiedWorkersAvailable: 13,
    requiredWorkers: 14,
    gapCount: 1,
    onboardingRecommended: 1,
    upskillCandidatesCount: 2,
    actionStatus: 'training_in_progress'
  },
  {
    id: 'GAP-03',
    serviceName: 'Deep Cleaning & Sanitization',
    zone: 'Navi Mumbai East',
    demandLevel: 'High',
    qualifiedWorkersAvailable: 35,
    requiredWorkers: 32,
    gapCount: -3,
    onboardingRecommended: 0,
    upskillCandidatesCount: 0,
    actionStatus: 'fulfilled'
  },
  {
    id: 'GAP-04',
    serviceName: 'Painting & Waterproofing',
    zone: 'Thane Central',
    demandLevel: 'Very High',
    qualifiedWorkersAvailable: 8,
    requiredWorkers: 12,
    gapCount: 4,
    onboardingRecommended: 3,
    upskillCandidatesCount: 2,
    actionStatus: 'pending'
  }
];

export const mockMonthlyCapacityPlans: CapacityPlanMonth[] = [
  { month: 'September 2026', service: 'Plumbing & Water Systems', zone: 'Mumbai North', projectedDemand: 18, availableWorkers: 12, requiredWorkers: 18, gap: 6, recommendedAction: 'Recruit', status: 'action_required' },
  { month: 'September 2026', service: 'Electrical & Repairs', zone: 'Pune Central', projectedDemand: 14, availableWorkers: 13, requiredWorkers: 14, gap: 1, recommendedAction: 'Train', status: 'under_review' },
  { month: 'September 2026', service: 'Deep Cleaning', zone: 'Mumbai West', projectedDemand: 32, availableWorkers: 35, requiredWorkers: 32, gap: -3, recommendedAction: 'Optimal', status: 'balanced' },
  { month: 'September 2026', service: 'Painting & Waterproofing', zone: 'Thane Central', projectedDemand: 12, availableWorkers: 8, requiredWorkers: 12, gap: 4, recommendedAction: 'Reallocate', status: 'action_required' },
  { month: 'October 2026', service: 'Plumbing & Water Systems', zone: 'All Zones', projectedDemand: 84, availableWorkers: 70, requiredWorkers: 84, gap: 14, recommendedAction: 'Recruit', status: 'action_required' },
  { month: 'October 2026', service: 'Deep Cleaning', zone: 'All Zones', projectedDemand: 110, availableWorkers: 95, requiredWorkers: 110, gap: 15, recommendedAction: 'Increase Shifts', status: 'action_required' }
];
