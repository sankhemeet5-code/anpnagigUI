import { Cooperative, ServiceCategory, ServiceItem } from '../types';

export const mockCooperatives: Cooperative[] = [
  {
    id: 'COP-01',
    name: 'Mumbai Shramik Seva Cooperative',
    registrationNumber: 'MSCS/CR/448/2021',
    contactPerson: 'Kailash Salunkhe (President)',
    email: 'contact@mumbaishramik.coop',
    phone: '+91 22 2640 9981',
    location: 'Dadar, Mumbai',
    zone: 'Central Zone',
    memberCount: 380,
    activeWorkers: 342,
    servicesProvided: ['Plumbing', 'Cleaning', 'Electrical', 'Painting'],
    totalJobsCompleted: 8420,
    monthlyRevenue: 1480000,
    balance: 420000,
    serviceQualityScore: 4.88,
    status: 'active',
    joinedDate: '2024-01-15',
    documents: [
      { name: 'Cooperative Society Registration Certificate', type: 'PDF', verified: true },
      { name: 'Annual Audit Report 2024-25', type: 'PDF', verified: true },
      { name: 'Bylaws and Resolution of Board', type: 'PDF', verified: true }
    ]
  },
  {
    id: 'COP-02',
    name: 'Pune Karigar Ekta Society',
    registrationNumber: 'PUN/COOP/SOC/1092/2022',
    contactPerson: 'Sunita Patil (Secretary)',
    email: 'info@punekarigar.coop',
    phone: '+91 20 2544 1120',
    location: 'Shivajinagar, Pune',
    zone: 'Pune Central',
    memberCount: 220,
    activeWorkers: 195,
    servicesProvided: ['Electrical', 'Carpentry', 'Masonry', 'Plumbing'],
    totalJobsCompleted: 4950,
    monthlyRevenue: 920000,
    balance: 280000,
    serviceQualityScore: 4.82,
    status: 'active',
    joinedDate: '2024-04-10',
    documents: [
      { name: 'Registration Certificate', type: 'PDF', verified: true },
      { name: 'Labour Department Recognition', type: 'PDF', verified: true }
    ]
  },
  {
    id: 'COP-03',
    name: 'Navi Mumbai Urban Workers Union',
    registrationNumber: 'NMMC/COP/884/2023',
    contactPerson: 'Devendra Chavan (Treasurer)',
    email: 'admin@navimumbaiworkers.coop',
    phone: '+91 22 2780 4412',
    location: 'Vashi, Navi Mumbai',
    zone: 'Navi Mumbai East',
    memberCount: 160,
    activeWorkers: 142,
    servicesProvided: ['Carpentry', 'Cleaning', 'Home Maintenance'],
    totalJobsCompleted: 3100,
    monthlyRevenue: 640000,
    balance: 190000,
    serviceQualityScore: 4.75,
    status: 'active',
    joinedDate: '2024-08-01',
    documents: [
      { name: 'Cooperative Registration', type: 'PDF', verified: true }
    ]
  },
  {
    id: 'COP-04',
    name: 'Thane District Labour Welfare Federation',
    registrationNumber: 'THA/LAB/FED/310/2023',
    contactPerson: 'Mahesh Gokhale (Chairman)',
    email: 'board@thanelabour.coop',
    phone: '+91 22 2533 8890',
    location: 'Naupada, Thane',
    zone: 'Thane Central',
    memberCount: 290,
    activeWorkers: 245,
    servicesProvided: ['Painting', 'Masonry', 'Plumbing', 'Cleaning'],
    totalJobsCompleted: 5600,
    monthlyRevenue: 1120000,
    balance: 310000,
    serviceQualityScore: 4.71,
    status: 'active',
    joinedDate: '2024-06-20',
    documents: [
      { name: 'Society Registration', type: 'PDF', verified: true },
      { name: 'Labour Welfare Certificate', type: 'PDF', verified: true }
    ]
  },
  {
    id: 'COP-05',
    name: 'Pimpri-Chinchwad Skilled Trades Guild',
    registrationNumber: 'PCMC/TRADE/491/2025',
    contactPerson: 'Sanjay Thorat (Managing Trustee)',
    email: 'sanjay@pcmctrades.coop',
    phone: '+91 20 2742 6601',
    location: 'Pimpri, Pune',
    zone: 'Pune North',
    memberCount: 85,
    activeWorkers: 70,
    servicesProvided: ['Appliance Repair', 'Electrical', 'Roofing'],
    totalJobsCompleted: 0,
    monthlyRevenue: 0,
    balance: 50000,
    serviceQualityScore: 0,
    status: 'pending_approval',
    joinedDate: '2025-08-10',
    documents: [
      { name: 'Draft Cooperative Bylaws', type: 'PDF', verified: true },
      { name: 'State Registrar Acknowledgement', type: 'PDF', verified: true },
      { name: 'Bank Account Proof', type: 'PDF', verified: false }
    ]
  }
];

export const mockServiceCategories: ServiceCategory[] = [
  {
    id: 'CAT-01',
    name: 'Plumbing & Water Systems',
    description: 'Leakage repairs, tap and sanitary fittings, pipe installation, drainage unclogging, water heater maintenance.',
    iconName: 'Wrench',
    serviceCount: 8,
    activeCount: 8,
    status: 'active',
    baseCommissionRate: 5.0
  },
  {
    id: 'CAT-02',
    name: 'Electrical & Appliance Repairs',
    description: 'Wiring fixes, switchboard repairs, appliance installations, circuit breaker diagnostics and inverter setups.',
    iconName: 'Zap',
    serviceCount: 12,
    activeCount: 11,
    status: 'active',
    baseCommissionRate: 5.0
  },
  {
    id: 'CAT-03',
    name: 'Deep Cleaning & Sanitization',
    description: 'Comprehensive home deep cleaning, kitchen degreasing, bathroom scrubbing, sofa & carpet shampooing.',
    iconName: 'Sparkles',
    serviceCount: 10,
    activeCount: 10,
    status: 'active',
    baseCommissionRate: 6.0
  },
  {
    id: 'CAT-04',
    name: 'Carpentry & Furniture Works',
    description: 'Custom furniture assembly, door locks and hinges, modular kitchen repairs, wooden polishing.',
    iconName: 'Hammer',
    serviceCount: 6,
    activeCount: 6,
    status: 'active',
    baseCommissionRate: 5.0
  },
  {
    id: 'CAT-05',
    name: 'Painting & Waterproofing',
    description: 'Interior & exterior wall painting, waterproof ceiling patches, texture painting and wall putty.',
    iconName: 'Paintbrush',
    serviceCount: 7,
    activeCount: 6,
    status: 'active',
    baseCommissionRate: 5.5
  },
  {
    id: 'CAT-06',
    name: 'Masonry & Tile Laying',
    description: 'Floor and wall tile replacement, civil plaster repairs, concrete patching, brickwork.',
    iconName: 'Layers',
    serviceCount: 5,
    activeCount: 4,
    status: 'active',
    baseCommissionRate: 5.0
  }
];

export const mockServices: ServiceItem[] = [
  {
    id: 'SRV-101',
    categoryId: 'CAT-01',
    categoryName: 'Plumbing & Water Systems',
    name: 'Tap & Shower Leakage Fix',
    description: 'Inspection and repair of leaking taps, shower heads, and flush tanks with quality washer replacements.',
    basePrice: 299,
    currency: 'INR',
    estimatedDurationMins: 45,
    status: 'active',
    serviceAreas: ['Mumbai (All Zones)', 'Thane Central', 'Pune Urban', 'Navi Mumbai'],
    requiredSkillLevel: 'Basic',
    demandIndex: 'High'
  },
  {
    id: 'SRV-102',
    categoryId: 'CAT-01',
    categoryName: 'Plumbing & Water Systems',
    name: 'Drainage & Pipe Unclogging',
    description: 'Mechanical and motorized clearing of blocked kitchen sinks, bathroom drains, and main sewer pipes.',
    basePrice: 549,
    currency: 'INR',
    estimatedDurationMins: 60,
    status: 'active',
    serviceAreas: ['Mumbai (All Zones)', 'Thane', 'Pune', 'Navi Mumbai'],
    requiredSkillLevel: 'Intermediate',
    demandIndex: 'High'
  },
  {
    id: 'SRV-201',
    categoryId: 'CAT-02',
    categoryName: 'Electrical & Appliance Repairs',
    name: 'Switchboard & Short Circuit Fix',
    description: 'Fault detection, burnt socket replacement, and MCB tripping troubleshooting.',
    basePrice: 349,
    currency: 'INR',
    estimatedDurationMins: 45,
    status: 'active',
    serviceAreas: ['Mumbai (All Zones)', 'Pune', 'Thane', 'Navi Mumbai'],
    requiredSkillLevel: 'Certified',
    demandIndex: 'High'
  },
  {
    id: 'SRV-301',
    categoryId: 'CAT-03',
    categoryName: 'Deep Cleaning & Sanitization',
    name: 'Complete 2BHK Deep Cleaning',
    description: 'Machine scrubbing of floors, kitchen degreasing, bathroom descaling, balcony wash, and window glass wiping.',
    basePrice: 1999,
    currency: 'INR',
    estimatedDurationMins: 240,
    status: 'active',
    serviceAreas: ['Mumbai (All Zones)', 'Thane', 'Pune', 'Navi Mumbai'],
    requiredSkillLevel: 'Intermediate',
    demandIndex: 'High'
  },
  {
    id: 'SRV-401',
    categoryId: 'CAT-04',
    categoryName: 'Carpentry & Furniture Works',
    name: 'Door Lock & Handle Installation',
    description: 'Precision fitting of mortise locks, cylindrical handles, and safety chains on wooden or metal doors.',
    basePrice: 449,
    currency: 'INR',
    estimatedDurationMins: 60,
    status: 'active',
    serviceAreas: ['Mumbai', 'Pune', 'Thane'],
    requiredSkillLevel: 'Intermediate',
    demandIndex: 'Medium'
  },
  {
    id: 'SRV-501',
    categoryId: 'CAT-05',
    categoryName: 'Painting & Waterproofing',
    name: 'Wall Patch & Waterproof Treatment',
    description: 'Scraping flaking paint, applying waterproof polymer coating, wall putty skimming, and matching paint coat.',
    basePrice: 899,
    currency: 'INR',
    estimatedDurationMins: 120,
    status: 'active',
    serviceAreas: ['Mumbai', 'Thane', 'Pune South'],
    requiredSkillLevel: 'Certified',
    demandIndex: 'High'
  }
];
