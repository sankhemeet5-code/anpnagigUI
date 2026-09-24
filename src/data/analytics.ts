export interface DemandForecastPoint {
  date: string;
  historical?: number;
  forecast: number;
  capacity: number;
  lowerBound: number;
  upperBound: number;
}

export const mockDemandForecastData: DemandForecastPoint[] = [
  { date: 'Apr 2026', historical: 1240, forecast: 1240, capacity: 1350, lowerBound: 1200, upperBound: 1280 },
  { date: 'May 2026', historical: 1420, forecast: 1420, capacity: 1450, lowerBound: 1380, upperBound: 1460 },
  { date: 'Jun 2026', historical: 1680, forecast: 1680, capacity: 1600, lowerBound: 1620, upperBound: 1740 },
  { date: 'Jul 2026', historical: 1850, forecast: 1850, capacity: 1750, lowerBound: 1800, upperBound: 1910 },
  { date: 'Aug 2026', historical: 1920, forecast: 1920, capacity: 1850, lowerBound: 1870, upperBound: 1980 },
  { date: 'Sep 2026', forecast: 2180, capacity: 1900, lowerBound: 2050, upperBound: 2310 },
  { date: 'Oct 2026', forecast: 2450, capacity: 2000, lowerBound: 2300, upperBound: 2600 },
  { date: 'Nov 2026', forecast: 2300, capacity: 2100, lowerBound: 2180, upperBound: 2420 },
  { date: 'Dec 2026', forecast: 2550, capacity: 2200, lowerBound: 2400, upperBound: 2700 }
];

export const mockAIInsights = [
  {
    id: 'INS-01',
    category: 'Capacity Alert',
    title: 'Plumbing demand projected to exceed capacity in Mumbai North',
    period: 'September 2026',
    requiredWorkers: 18,
    availableWorkers: 12,
    gap: 6,
    impactLevel: 'High',
    description: 'Post-monsoon plumbing and drainage demand is forecasted to surge 34% across Malad and Kandivali clusters.',
    recommendedActions: [
      'Onboard 4 new certified plumbers from Mumbai Shramik Seva Cooperative queue',
      'Train 2 existing intermediate plumbing apprentices currently in 6-month workforce pipeline'
    ]
  },
  {
    id: 'INS-02',
    category: 'Fairness & Workload Rebalance',
    title: 'Deep Cleaning workload concentration in West Zone',
    period: 'Current Week',
    requiredWorkers: 14,
    availableWorkers: 14,
    gap: 0,
    impactLevel: 'Medium',
    description: 'Top 20% of cleaning professionals are operating at 94%+ utilisation while newly verified workers average 42%.',
    recommendedActions: [
      'Activate automated fair work radius rebalancing for non-emergency bookings',
      'Reallocate 12 pending weekend slots to under-allocated cooperative members'
    ]
  },
  {
    id: 'INS-03',
    category: 'Skill Gap Opportunity',
    title: 'Appliance & Inverter Repair deficit in Pune East',
    period: 'Q3 2026',
    requiredWorkers: 16,
    availableWorkers: 10,
    gap: 6,
    impactLevel: 'Medium',
    description: 'Rising smart appliance installations in Kharadi/Hadapsar require 6 additional certified Level-3 electricians.',
    recommendedActions: [
      'Sponsor 2-week fast-track certification with Pune Karigar Ekta Society',
      'Initiate targeted apprentice onboarding with 6-month stipend guarantee'
    ]
  }
];

export const mockGeoDemandZones = [
  { id: 'Z-01', name: 'Mumbai West (Bandra - Andheri)', demandLevel: 'High', activeWorkers: 148, openJobs: 34, coverage: '96%', avgEta: '18 min', status: 'Balanced' },
  { id: 'Z-02', name: 'Mumbai North (Malad - Borivali)', demandLevel: 'Very High', activeWorkers: 82, openJobs: 41, coverage: '78%', avgEta: '32 min', status: 'Supply Deficit' },
  { id: 'Z-03', name: 'Pune Central & South (Kothrud - Deccan)', demandLevel: 'Medium', activeWorkers: 95, openJobs: 18, coverage: '94%', avgEta: '21 min', status: 'Balanced' },
  { id: 'Z-04', name: 'Pune West (Hinjawadi - Wakad)', demandLevel: 'High', activeWorkers: 64, openJobs: 26, coverage: '84%', avgEta: '26 min', status: 'High Demand' },
  { id: 'Z-05', name: 'Thane Central (Ghodbunder - Naupada)', demandLevel: 'High', activeWorkers: 72, openJobs: 29, coverage: '82%', avgEta: '28 min', status: 'Needs Rebalancing' },
  { id: 'Z-06', name: 'Navi Mumbai East (Vashi - Belapur)', demandLevel: 'Medium', activeWorkers: 58, openJobs: 12, coverage: '95%', avgEta: '19 min', status: 'Balanced' }
];

export const mockWorkerUtilisationStats = [
  { category: 'Over-utilised (>85%)', count: 128, percentage: 25, color: '#FF6B4A', recommendation: 'Risk of fatigue. Reallocate non-urgent slots.' },
  { category: 'Balanced (60% - 85%)', count: 284, percentage: 55, color: '#10B981', recommendation: 'Optimal sustainable gig throughput.' },
  { category: 'Under-utilised (<60%)', count: 104, percentage: 20, color: '#159FE3', recommendation: 'Prioritize via fair work dispatch engine.' }
];
