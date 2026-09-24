import { Worker } from '../types';

export const mockWorkers: Worker[] = [
  {
    id: 'WRK-1042',
    workerId: 'MH-MUM-PL-1042',
    name: 'Rahul Shah',
    email: 'rahul.shah@apnagig.coop',
    phone: '+91 98205 11980',
    cooperativeId: 'COP-01',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    skills: ['Plumbing', 'Pipe Fitting', 'Sanitary Maintenance', 'Water Heater Repair'],
    primarySkill: 'Plumbing',
    location: 'Bandra West, Mumbai',
    zone: 'West Zone',
    verificationStatus: 'verified',
    status: 'active',
    utilisationRate: 88,
    rating: 4.9,
    completedJobs: 246,
    totalEarnings: 184500,
    joinedDate: '2025-01-10',
    sixMonthCommitment: {
      startDate: '2025-01-10',
      endDate: '2025-07-10',
      completedMonths: 6,
      targetMonths: 6,
      status: 'completed',
      stipendEligible: true
    },
    virtualId: {
      issuedDate: '2025-01-12',
      qrCodeData: 'APNAGIG-VERIFIED-WRK-1042-MUM-2025',
      status: 'active'
    },
    welfare: {
      insuranceStatus: 'enrolled',
      fundContribution: 3600,
      benefitsClaimed: 0
    },
    documents: {
      idProof: { status: 'verified', name: 'Aadhaar Card (Masked)' },
      addressProof: { status: 'verified', name: 'Electricity Bill' },
      tradeCertificate: { status: 'verified', name: 'ITI Plumbing Level-3 Certification' },
      policeClearance: { status: 'verified', name: 'Police Verification Certificate 2025' }
    }
  },
  {
    id: 'WRK-2105',
    workerId: 'MH-MUM-EL-2105',
    name: 'Neha Patil',
    email: 'neha.patil@apnagig.coop',
    phone: '+91 98190 22345',
    cooperativeId: 'COP-01',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    skills: ['Deep Home Cleaning', 'Sanitization', 'Kitchen Cleaning', 'Post-Paint Cleaning'],
    primarySkill: 'Cleaning',
    location: 'Andheri East, Mumbai',
    zone: 'North Zone',
    verificationStatus: 'verified',
    status: 'on_job',
    utilisationRate: 94,
    rating: 4.95,
    completedJobs: 312,
    totalEarnings: 218400,
    joinedDate: '2025-02-01',
    sixMonthCommitment: {
      startDate: '2025-02-01',
      endDate: '2025-08-01',
      completedMonths: 6,
      targetMonths: 6,
      status: 'completed',
      stipendEligible: true
    },
    virtualId: {
      issuedDate: '2025-02-03',
      qrCodeData: 'APNAGIG-VERIFIED-WRK-2105-MUM-2025',
      status: 'active'
    },
    welfare: {
      insuranceStatus: 'enrolled',
      fundContribution: 4200,
      benefitsClaimed: 1200
    },
    documents: {
      idProof: { status: 'verified', name: 'Aadhaar Card (Masked)' },
      addressProof: { status: 'verified', name: 'Ration Card' },
      tradeCertificate: { status: 'verified', name: 'Certified Hygiene & Safety Pro' },
      policeClearance: { status: 'verified', name: 'Police Verification Certificate 2025' }
    }
  },
  {
    id: 'WRK-3011',
    workerId: 'MH-PUN-EL-3011',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@apnagig.coop',
    phone: '+91 97654 33210',
    cooperativeId: 'COP-02',
    cooperativeName: 'Pune Karigar Ekta Society',
    skills: ['Electrical Wiring', 'Appliance Repair', 'Circuit Breakers', 'Inverter Setup'],
    primarySkill: 'Electrical',
    location: 'Kothrud, Pune',
    zone: 'Pune South',
    verificationStatus: 'verified',
    status: 'active',
    utilisationRate: 76,
    rating: 4.85,
    completedJobs: 189,
    totalEarnings: 151200,
    joinedDate: '2025-03-15',
    sixMonthCommitment: {
      startDate: '2025-03-15',
      endDate: '2025-09-15',
      completedMonths: 5,
      targetMonths: 6,
      status: 'completing_soon',
      stipendEligible: true
    },
    virtualId: {
      issuedDate: '2025-03-16',
      qrCodeData: 'APNAGIG-VERIFIED-WRK-3011-PUN-2025',
      status: 'active'
    },
    welfare: {
      insuranceStatus: 'enrolled',
      fundContribution: 2800,
      benefitsClaimed: 0
    },
    documents: {
      idProof: { status: 'verified', name: 'Aadhaar Card' },
      addressProof: { status: 'verified', name: 'Voter ID' },
      tradeCertificate: { status: 'verified', name: 'Maharashtra Wireman License' },
      policeClearance: { status: 'verified', name: 'Police Clearance Certificate' }
    }
  },
  {
    id: 'WRK-4089',
    workerId: 'MH-NAV-CP-4089',
    name: 'Priya Nair',
    email: 'priya.nair@apnagig.coop',
    phone: '+91 98200 44912',
    cooperativeId: 'COP-03',
    cooperativeName: 'Navi Mumbai Urban Workers Union',
    skills: ['Carpentry', 'Furniture Assembly', 'Door Lock Installation', 'Modular Kitchen Repair'],
    primarySkill: 'Carpentry',
    location: 'Vashi, Navi Mumbai',
    zone: 'Navi Mumbai East',
    verificationStatus: 'verified',
    status: 'offline',
    utilisationRate: 64,
    rating: 4.78,
    completedJobs: 142,
    totalEarnings: 113600,
    joinedDate: '2025-04-01',
    sixMonthCommitment: {
      startDate: '2025-04-01',
      endDate: '2025-10-01',
      completedMonths: 4,
      targetMonths: 6,
      status: 'active',
      stipendEligible: true
    },
    virtualId: {
      issuedDate: '2025-04-04',
      qrCodeData: 'APNAGIG-VERIFIED-WRK-4089-NAV-2025',
      status: 'active'
    },
    welfare: {
      insuranceStatus: 'enrolled',
      fundContribution: 2200,
      benefitsClaimed: 0
    },
    documents: {
      idProof: { status: 'verified', name: 'Aadhaar Card' },
      addressProof: { status: 'verified', name: 'Electricity Bill' },
      tradeCertificate: { status: 'verified', name: 'National Skill Qualification Certificate' },
      policeClearance: { status: 'verified', name: 'Police Verification Certificate' }
    }
  },
  {
    id: 'WRK-5120',
    workerId: 'MH-THA-PT-5120',
    name: 'Suresh Deshmukh',
    email: 'suresh.d@apnagig.coop',
    phone: '+91 98920 88711',
    cooperativeId: 'COP-04',
    cooperativeName: 'Thane District Labour Welfare Federation',
    skills: ['Wall Painting', 'Waterproofing', 'Texture Paint', 'Wood Polish'],
    primarySkill: 'Painting',
    location: 'Ghodbunder Road, Thane',
    zone: 'Thane Central',
    verificationStatus: 'under_review',
    status: 'active',
    utilisationRate: 42,
    rating: 4.6,
    completedJobs: 48,
    totalEarnings: 38400,
    joinedDate: '2025-06-10',
    sixMonthCommitment: {
      startDate: '2025-06-10',
      endDate: '2025-12-10',
      completedMonths: 2,
      targetMonths: 6,
      status: 'active',
      stipendEligible: true
    },
    virtualId: {
      issuedDate: '2025-06-12',
      qrCodeData: 'APNAGIG-VERIFIED-WRK-5120-THA-2025',
      status: 'active'
    },
    welfare: {
      insuranceStatus: 'pending',
      fundContribution: 800,
      benefitsClaimed: 0
    },
    documents: {
      idProof: { status: 'verified', name: 'Aadhaar Card' },
      addressProof: { status: 'verified', name: 'Aadhaar Address' },
      tradeCertificate: { status: 'pending', name: 'Painters Guild Apprentice Cert' },
      policeClearance: { status: 'pending', name: 'Thane Rural Police Clearance' }
    }
  },
  {
    id: 'WRK-6091',
    workerId: 'MH-MUM-PL-6091',
    name: 'Santosh Jadhav',
    email: 'santosh.jadhav@apnagig.coop',
    phone: '+91 97690 44332',
    cooperativeId: 'COP-01',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    skills: ['Plumbing', 'Drainage Unclogging', 'Motor Pump Installation'],
    primarySkill: 'Plumbing',
    location: 'Kurla West, Mumbai',
    zone: 'Central Zone',
    verificationStatus: 'pending',
    status: 'offline',
    utilisationRate: 0,
    rating: 0,
    completedJobs: 0,
    totalEarnings: 0,
    joinedDate: '2025-08-15',
    sixMonthCommitment: {
      startDate: '2025-08-15',
      endDate: '2026-02-15',
      completedMonths: 0,
      targetMonths: 6,
      status: 'active',
      stipendEligible: false
    },
    virtualId: {
      issuedDate: '',
      qrCodeData: '',
      status: 'revoked'
    },
    welfare: {
      insuranceStatus: 'ineligible',
      fundContribution: 0,
      benefitsClaimed: 0
    },
    documents: {
      idProof: { status: 'pending', name: 'Aadhaar Card Uploaded' },
      addressProof: { status: 'pending', name: 'Bank Passbook Front Page' },
      tradeCertificate: { status: 'pending', name: 'ITI Plumber Certificate' },
      policeClearance: { status: 'pending', name: 'Application Acknowledgment' }
    }
  },
  {
    id: 'WRK-7102',
    workerId: 'MH-PUN-MS-7102',
    name: 'Ganesh Shinde',
    email: 'ganesh.s@apnagig.coop',
    phone: '+91 98223 99100',
    cooperativeId: 'COP-02',
    cooperativeName: 'Pune Karigar Ekta Society',
    skills: ['Masonry', 'Tile Laying', 'Plastering', 'Concrete Repair'],
    primarySkill: 'Masonry',
    location: 'Hadapsar, Pune',
    zone: 'Pune East',
    verificationStatus: 'needs_info',
    status: 'offline',
    utilisationRate: 15,
    rating: 4.5,
    completedJobs: 12,
    totalEarnings: 10800,
    joinedDate: '2025-07-22',
    sixMonthCommitment: {
      startDate: '2025-07-22',
      endDate: '2026-01-22',
      completedMonths: 1,
      targetMonths: 6,
      status: 'active',
      stipendEligible: false
    },
    virtualId: {
      issuedDate: '',
      qrCodeData: '',
      status: 'revoked'
    },
    welfare: {
      insuranceStatus: 'pending',
      fundContribution: 300,
      benefitsClaimed: 0
    },
    documents: {
      idProof: { status: 'verified', name: 'Aadhaar Card' },
      addressProof: { status: 'rejected', name: 'Illegible Water Bill (Resubmit required)' },
      tradeCertificate: { status: 'verified', name: 'Masonry Level-2 Proof' },
      policeClearance: { status: 'pending', name: 'Under Verification' }
    }
  }
];
