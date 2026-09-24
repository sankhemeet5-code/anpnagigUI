import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';

// Auth
import { Login } from '../pages/auth/Login';

// Overview
import { Dashboard } from '../pages/overview/Dashboard';

// Operations
import { LiveOperations } from '../pages/operations/LiveOperations';
import { Bookings } from '../pages/operations/Bookings';
import { BookingDetails } from '../pages/operations/BookingDetails';
import { EmergencyCommand } from '../pages/operations/EmergencyCommand';

// People
import { UsersList } from '../pages/people/Users';
import { UserDetails } from '../pages/people/UserDetails';
import { WorkersList } from '../pages/people/Workers';
import { WorkerDetails } from '../pages/people/WorkerDetails';
import { WorkerVerification } from '../pages/people/WorkerVerification';
import { WorkerVirtualID } from '../pages/people/WorkerVirtualID';
import { CooperativesList } from '../pages/people/Cooperatives';
import { CooperativeDetails } from '../pages/people/CooperativeDetails';
import { CooperativeApproval } from '../pages/people/CooperativeApproval';

// Services
import { ServiceCategories } from '../pages/services/ServiceCategories';
import { ServicesList } from '../pages/services/ServicesList';
import { CommunityServices } from '../pages/services/CommunityServices';

// Workforce
import { FairWorkAllocation } from '../pages/workforce/FairWorkAllocation';
import { SkillGapAnalytics } from '../pages/workforce/SkillGapAnalytics';
import { SixMonthWorkforce } from '../pages/workforce/SixMonthWorkforce';
import { BenefitsWelfare } from '../pages/workforce/BenefitsWelfare';

// Safety
import { FraudAnomalies } from '../pages/safety/FraudAnomalies';
import { IncidentSafety } from '../pages/safety/IncidentSafety';
import { VideoEvidenceReview } from '../pages/safety/VideoEvidenceReview';
import { Disputes } from '../pages/safety/Disputes';

// AI & Analytics
import { AIInsights } from '../pages/analytics/AIInsights';
import { CapacityPlanning } from '../pages/analytics/CapacityPlanning';
import { DemandForecast } from '../pages/analytics/DemandForecast';
import { CapacityRecommendations } from '../pages/analytics/CapacityRecommendations';
import { GeographicDemand } from '../pages/analytics/GeographicDemand';
import { WorkerUtilisation } from '../pages/analytics/WorkerUtilisation';

// Finance
import { Transactions } from '../pages/finance/Transactions';
import { WorkerPayouts } from '../pages/finance/WorkerPayouts';
import { CooperativeFinance } from '../pages/finance/CooperativeFinance';

// Reports
import { ReportsAnalytics } from '../pages/reports/ReportsAnalytics';
import { PolicyImpact } from '../pages/reports/PolicyImpact';

// System
import { Notifications } from '../pages/system/Notifications';
import { AdminUsers } from '../pages/system/AdminUsers';
import { SystemSettings } from '../pages/system/SystemSettings';
import { AuditLogs } from '../pages/system/AuditLogs';
import { PrivacyGovernance } from '../pages/system/PrivacyGovernance';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<AppShell />}>
        <Route path='/' element={<Navigate to='/dashboard' replace />} />
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Operations */}
        <Route path='/operations/live' element={<LiveOperations />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/bookings/:id' element={<BookingDetails />} />
        <Route path='/emergency' element={<EmergencyCommand />} />

        {/* People */}
        <Route path='/users' element={<UsersList />} />
        <Route path='/users/:id' element={<UserDetails />} />
        <Route path='/workers' element={<WorkersList />} />
        <Route path='/workers/:id' element={<WorkerDetails />} />
        <Route path='/workers/verification' element={<WorkerVerification />} />
        <Route path='/workers/virtual-id' element={<WorkerVirtualID />} />
        <Route path='/cooperatives' element={<CooperativesList />} />
        <Route path='/cooperatives/:id' element={<CooperativeDetails />} />
        <Route path='/cooperatives/approval' element={<CooperativeApproval />} />

        {/* Services */}
        <Route path='/services/categories' element={<ServiceCategories />} />
        <Route path='/services' element={<ServicesList />} />
        <Route path='/community-services' element={<CommunityServices />} />

        {/* Workforce */}
        <Route path='/workforce/fair-allocation' element={<FairWorkAllocation />} />
        <Route path='/workforce/skill-gaps' element={<SkillGapAnalytics />} />
        <Route path='/workforce/six-month' element={<SixMonthWorkforce />} />
        <Route path='/workforce/welfare' element={<BenefitsWelfare />} />

        {/* Safety */}
        <Route path='/safety/fraud' element={<FraudAnomalies />} />
        <Route path='/safety/incidents' element={<IncidentSafety />} />
        <Route path='/safety/video-evidence' element={<VideoEvidenceReview />} />
        <Route path='/safety/disputes' element={<Disputes />} />

        {/* AI & Analytics */}
        <Route path='/analytics/ai-insights' element={<AIInsights />} />
        <Route path='/analytics/capacity-planning' element={<CapacityPlanning />} />
        <Route path='/analytics/demand' element={<DemandForecast />} />
        <Route path='/analytics/capacity-recommendations' element={<CapacityRecommendations />} />
        <Route path='/analytics/geographic-demand' element={<GeographicDemand />} />
        <Route path='/analytics/worker-utilisation' element={<WorkerUtilisation />} />

        {/* Finance */}
        <Route path='/finance/transactions' element={<Transactions />} />
        <Route path='/finance/payouts' element={<WorkerPayouts />} />
        <Route path='/finance/cooperative' element={<CooperativeFinance />} />

        {/* Reports */}
        <Route path='/reports' element={<ReportsAnalytics />} />
        <Route path='/impact' element={<PolicyImpact />} />

        {/* System */}
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/admin-users' element={<AdminUsers />} />
        <Route path='/settings' element={<SystemSettings />} />
        <Route path='/audit-logs' element={<AuditLogs />} />
        <Route path='/privacy' element={<PrivacyGovernance />} />
      </Route>

      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
};
