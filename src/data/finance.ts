import { TransactionItem, WorkerPayoutItem, CooperativeFinanceItem } from '../types';

export const mockTransactions: TransactionItem[] = [
  {
    id: 'TXN-9011',
    transactionRef: 'TXN-2026-0827-01',
    bookingRef: 'BK-9901',
    customerName: 'Aarav Sharma',
    workerName: 'Rahul Shah',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    totalAmount: 349,
    workerPayout: 275,
    cooperativeFee: 35,
    platformCommission: 15,
    paymentMethod: 'UPI',
    status: 'completed',
    date: '2026-08-27 10:08'
  },
  {
    id: 'TXN-9012',
    transactionRef: 'TXN-2026-0827-02',
    bookingRef: 'BK-9902',
    customerName: 'Ananya Deshpande',
    workerName: 'Arjun Mehta',
    cooperativeName: 'Pune Karigar Ekta Society',
    totalAmount: 399,
    workerPayout: 315,
    cooperativeFee: 40,
    platformCommission: 17,
    paymentMethod: 'Card',
    status: 'completed',
    date: '2026-08-27 09:12'
  },
  {
    id: 'TXN-9013',
    transactionRef: 'TXN-2026-0827-03',
    bookingRef: 'BK-9903',
    customerName: 'Rohan Kulkarni',
    workerName: 'Neha Patil',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    totalAmount: 2199,
    workerPayout: 1750,
    cooperativeFee: 200,
    platformCommission: 100,
    paymentMethod: 'Net Banking',
    status: 'completed',
    date: '2026-08-27 09:00'
  },
  {
    id: 'TXN-9014',
    transactionRef: 'TXN-2026-0826-19',
    bookingRef: 'BK-9905',
    customerName: 'Pooja Iyer',
    workerName: 'Priya Nair',
    cooperativeName: 'Navi Mumbai Urban Workers Union',
    totalAmount: 499,
    workerPayout: 395,
    cooperativeFee: 45,
    platformCommission: 22,
    paymentMethod: 'Coop Wallet',
    status: 'completed',
    date: '2026-08-26 16:05'
  },
  {
    id: 'TXN-9015',
    transactionRef: 'TXN-2026-0826-22',
    bookingRef: 'BK-9906',
    customerName: 'Kunal Singhania',
    workerName: 'Ganesh Shinde',
    cooperativeName: 'Pune Karigar Ekta Society',
    totalAmount: 999,
    workerPayout: 780,
    cooperativeFee: 90,
    platformCommission: 45,
    paymentMethod: 'UPI',
    status: 'pending',
    date: '2026-08-26 14:45'
  }
];

export const mockPayouts: WorkerPayoutItem[] = [
  {
    id: 'PAY-7701',
    payoutRef: 'PAY-2026-W34-01',
    workerId: 'WRK-1042',
    workerName: 'Rahul Shah',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    bankAccountMasked: 'HDFC Bank •••• 4092',
    grossEarnings: 14200,
    welfareDeductions: 350,
    netPayout: 13850,
    status: 'paid',
    period: 'Aug 18 - Aug 24, 2026',
    payoutDate: '2026-08-25'
  },
  {
    id: 'PAY-7702',
    payoutRef: 'PAY-2026-W34-02',
    workerId: 'WRK-2105',
    workerName: 'Neha Patil',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    bankAccountMasked: 'SBI •••• 8821',
    grossEarnings: 18400,
    welfareDeductions: 450,
    netPayout: 17950,
    status: 'paid',
    period: 'Aug 18 - Aug 24, 2026',
    payoutDate: '2026-08-25'
  },
  {
    id: 'PAY-7703',
    payoutRef: 'PAY-2026-W34-03',
    workerId: 'WRK-3011',
    workerName: 'Arjun Mehta',
    cooperativeName: 'Pune Karigar Ekta Society',
    bankAccountMasked: 'Bank of Maharashtra •••• 1104',
    grossEarnings: 11200,
    welfareDeductions: 300,
    netPayout: 10900,
    status: 'processing',
    period: 'Aug 18 - Aug 24, 2026',
    payoutDate: '2026-08-28'
  },
  {
    id: 'PAY-7704',
    payoutRef: 'PAY-2026-W34-04',
    workerId: 'WRK-4089',
    workerName: 'Priya Nair',
    cooperativeName: 'Navi Mumbai Urban Workers Union',
    bankAccountMasked: 'ICICI Bank •••• 9923',
    grossEarnings: 8900,
    welfareDeductions: 250,
    netPayout: 8650,
    status: 'pending',
    period: 'Aug 18 - Aug 24, 2026',
    payoutDate: '2026-08-29'
  }
];

export const mockCooperativeFinances: CooperativeFinanceItem[] = [
  {
    cooperativeId: 'COP-01',
    cooperativeName: 'Mumbai Shramik Seva Cooperative',
    totalMembers: 380,
    monthlyRevenue: 1480000,
    collectedDues: 76000,
    welfareReserve: 420000,
    platformSettlementDue: 74000,
    lastSettlementDate: '2026-08-20',
    status: 'in_good_standing'
  },
  {
    cooperativeId: 'COP-02',
    cooperativeName: 'Pune Karigar Ekta Society',
    totalMembers: 220,
    monthlyRevenue: 920000,
    collectedDues: 44000,
    welfareReserve: 280000,
    platformSettlementDue: 46000,
    lastSettlementDate: '2026-08-20',
    status: 'in_good_standing'
  },
  {
    cooperativeId: 'COP-03',
    cooperativeName: 'Navi Mumbai Urban Workers Union',
    totalMembers: 160,
    monthlyRevenue: 640000,
    collectedDues: 32000,
    welfareReserve: 190000,
    platformSettlementDue: 32000,
    lastSettlementDate: '2026-08-20',
    status: 'in_good_standing'
  },
  {
    cooperativeId: 'COP-04',
    cooperativeName: 'Thane District Labour Welfare Federation',
    totalMembers: 290,
    monthlyRevenue: 1120000,
    collectedDues: 58000,
    welfareReserve: 310000,
    platformSettlementDue: 56000,
    lastSettlementDate: '2026-08-20',
    status: 'in_good_standing'
  }
];
