import { AnomalyCase, IncidentCase, VideoEvidenceItem, DisputeCase } from '../types';

export const mockAnomalies: AnomalyCase[] = [
  {
    id: 'ANM-101',
    caseRef: 'ANM-2026-0827-01',
    type: 'GPS Anomaly',
    severity: 'medium',
    involvedEntity: {
      type: 'worker',
      id: 'WRK-7102',
      name: 'Ganesh Shinde'
    },
    description: 'Start OTP attempted 3.2km away from customer geo-fence coordinates.',
    detectedAt: '2026-08-26 14:15',
    status: 'investigating',
    evidenceSnippet: 'GPS delta: 3200m outside booking boundary (Hinjawadi Sector 2 vs 1)',
    assignedAdmin: 'Pooja Hegde (Safety Ops)'
  },
  {
    id: 'ANM-102',
    caseRef: 'ANM-2026-0826-04',
    type: 'Frequent Cancellations',
    severity: 'low',
    involvedEntity: {
      type: 'customer',
      id: 'USR-8808',
      name: 'Sneha Shinde'
    },
    description: '4 consecutive bookings cancelled within 5 minutes of worker arrival confirmation.',
    detectedAt: '2026-08-26 09:30',
    status: 'new',
    evidenceSnippet: 'Cancellation rate 66% over 30 days. No cancellation fee collected due to grace window.'
  },
  {
    id: 'ANM-103',
    caseRef: 'ANM-2026-0825-09',
    type: 'Rating Manipulation',
    severity: 'medium',
    involvedEntity: {
      type: 'cooperative',
      id: 'COP-02',
      name: 'Pune Karigar Ekta Society'
    },
    description: 'Cluster of 8 five-star reviews submitted from identical IP subnet within 12 minutes.',
    detectedAt: '2026-08-25 18:40',
    status: 'resolved',
    evidenceSnippet: 'Subnet 103.21.144.0/24 flagged; reviews quarantined for manual verification.',
    assignedAdmin: 'Vikram Seth (Trust & Safety)'
  }
];

export const mockIncidents: IncidentCase[] = [
  {
    id: 'INC-701',
    incidentNumber: 'INC-MUM-2026-0826-01',
    type: 'Service Delay / No-show',
    severity: 'medium',
    reporterType: 'customer',
    reporterName: 'Kunal Singhania',
    reporterContact: '+91 97660 12899',
    linkedBookingId: 'BK-9906',
    location: 'Hinjawadi Phase 1, Pune',
    reportedAt: '2026-08-26 15:30',
    status: 'under_review',
    assignedAdmin: 'Pooja Hegde',
    hasVideoEvidence: true,
    videoEvidenceId: 'VID-901',
    summary: 'Technician arrived 45 minutes late without prior notification and left before second coat dried.',
    timeline: [
      { time: '02:00 PM', event: 'Scheduled service window began', user: 'System' },
      { time: '02:45 PM', event: 'Worker checked in with Start OTP', user: 'Ganesh Shinde' },
      { time: '03:30 PM', event: 'Customer initiated formal complaint with photos', user: 'Kunal Singhania' },
      { time: '04:10 PM', event: 'Assigned to Safety Desk for mediation', user: 'Admin System' }
    ]
  },
  {
    id: 'INC-702',
    incidentNumber: 'INC-MUM-2026-0827-02',
    type: 'Safety Concern',
    severity: 'critical',
    reporterType: 'worker',
    reporterName: 'Rahul Shah',
    reporterContact: '+91 98205 11980',
    linkedBookingId: 'BK-9901',
    location: 'Bandra West, Mumbai',
    reportedAt: '2026-08-27 10:14',
    status: 'open',
    assignedAdmin: 'Vikram Seth',
    hasVideoEvidence: true,
    videoEvidenceId: 'VID-902',
    summary: 'Electrical spark hazards encountered during bathroom water pipe fixture installation.',
    timeline: [
      { time: '10:08 AM', event: 'Start OTP verified', user: 'Rahul Shah' },
      { time: '10:14 AM', event: 'SOS triggered by technician via mobile app', user: 'Rahul Shah' },
      { time: '10:15 AM', event: 'Emergency Command unit dispatched', user: 'Emergency Desk' }
    ]
  }
];

export const mockVideoEvidence: VideoEvidenceItem[] = [
  {
    id: 'VID-901',
    caseId: 'INC-701',
    incidentRef: 'INC-MUM-2026-0826-01',
    bookingRef: 'BK-9906',
    recordingTimestamp: '2026-08-26 15:28:40',
    durationSeconds: 48,
    retentionDaysRemaining: 29,
    accessStatus: 'Restricted - Tier 2 Admin',
    consentVerified: true,
    fileSizeMb: 18.4,
    uploadedBy: 'Customer (Kunal Singhania) via Incident Portal',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    accessLogs: [
      { timestamp: '2026-08-26 16:02', adminName: 'Pooja Hegde', action: 'Viewed video evidence container' },
      { timestamp: '2026-08-26 16:15', adminName: 'Pooja Hegde', action: 'Verified retention schedule' }
    ]
  },
  {
    id: 'VID-902',
    caseId: 'INC-702',
    incidentRef: 'INC-MUM-2026-0827-02',
    bookingRef: 'BK-9901',
    recordingTimestamp: '2026-08-27 10:14:10',
    durationSeconds: 22,
    retentionDaysRemaining: 30,
    accessStatus: 'Under Legal Hold',
    consentVerified: true,
    fileSizeMb: 9.8,
    uploadedBy: 'Worker SOS Auto-Capture with Emergency Consent',
    sha256Hash: 'a7c9d23198bb1c249afbf4c8996fb92427ae41e4649b934ca495991b7852c912',
    accessLogs: [
      { timestamp: '2026-08-27 10:16', adminName: 'Vikram Seth', action: 'Secured chain-of-custody under emergency hold' }
    ]
  }
];

export const mockDisputes: DisputeCase[] = [
  {
    id: 'DSP-401',
    disputeRef: 'DSP-2026-0826-01',
    bookingRef: 'BK-9906',
    customerName: 'Kunal Singhania',
    workerName: 'Ganesh Shinde',
    cooperativeName: 'Pune Karigar Ekta Society',
    amountDisputed: 999,
    reason: 'Delayed arrival and incomplete surface priming for waterproofing patch.',
    status: 'under_review',
    filedDate: '2026-08-26',
    resolutionSummary: 'Cooperative representative Sunita Patil scheduled revisitation by master technician.',
    refundApproved: false
  },
  {
    id: 'DSP-402',
    disputeRef: 'DSP-2026-0822-04',
    bookingRef: 'BK-9884',
    customerName: 'Meera Chawla',
    workerName: 'Suresh Deshmukh',
    cooperativeName: 'Thane District Labour Welfare Federation',
    amountDisputed: 450,
    reason: 'Billing discrepancy on extra seal tape supplies.',
    status: 'resolved',
    filedDate: '2026-08-22',
    resolutionSummary: 'Partial refund of ₹150 processed via UPI settlement; cooperative approved credit note.',
    refundApproved: true
  }
];
