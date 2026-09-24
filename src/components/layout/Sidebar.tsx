import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Radio,
  CalendarCheck,
  AlertTriangle,
  Users,
  HardHat,
  ShieldCheck,
  QrCode,
  Building2,
  CheckSquare,
  Layers,
  Wrench,
  HeartHandshake,
  Scale,
  GraduationCap,
  CalendarRange,
  Heart,
  ShieldAlert,
  FileVideo,
  FileSpreadsheet,
  BrainCircuit,
  TrendingUp,
  MapPin,
  PieChart,
  Receipt,
  Wallet,
  Coins,
  BarChart3,
  Globe,
  Bell,
  UserCog,
  Settings,
  ScrollText,
  Lock,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: 'default' | 'danger' | 'warning' | 'info';
}

interface NavGroup {
  name: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    name: 'OVERVIEW',
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className='h-4 w-4' /> },
    ],
  },
  {
    name: 'OPERATIONS',
    items: [
      { title: 'Live Operations', href: '/operations/live', icon: <Radio className='h-4 w-4' />, badge: 'Live', badgeVariant: 'info' },
      { title: 'Bookings', href: '/bookings', icon: <CalendarCheck className='h-4 w-4' /> },
      { title: 'Emergency', href: '/emergency', icon: <AlertTriangle className='h-4 w-4' />, badge: 'SOS', badgeVariant: 'danger' },
    ],
  },
  {
    name: 'PEOPLE',
    items: [
      { title: 'Users', href: '/users', icon: <Users className='h-4 w-4' /> },
      { title: 'Workers', href: '/workers', icon: <HardHat className='h-4 w-4' /> },
      { title: 'Worker Verification', href: '/workers/verification', icon: <ShieldCheck className='h-4 w-4' />, badge: '3', badgeVariant: 'warning' },
      { title: 'Virtual Worker ID', href: '/workers/virtual-id', icon: <QrCode className='h-4 w-4' /> },
      { title: 'Cooperatives', href: '/cooperatives', icon: <Building2 className='h-4 w-4' /> },
      { title: 'Cooperative Approval', href: '/cooperatives/approval', icon: <CheckSquare className='h-4 w-4' /> },
    ],
  },
  {
    name: 'SERVICES',
    items: [
      { title: 'Service Categories', href: '/services/categories', icon: <Layers className='h-4 w-4' /> },
      { title: 'Services', href: '/services', icon: <Wrench className='h-4 w-4' /> },
      { title: 'Community Services', href: '/community-services', icon: <HeartHandshake className='h-4 w-4' /> },
    ],
  },
  {
    name: 'WORKFORCE',
    items: [
      { title: 'Fair Work Allocation', href: '/workforce/fair-allocation', icon: <Scale className='h-4 w-4' /> },
      { title: 'Skill Gap & Training', href: '/workforce/skill-gaps', icon: <GraduationCap className='h-4 w-4' /> },
      { title: 'Six-Month Workforce', href: '/workforce/six-month', icon: <CalendarRange className='h-4 w-4' /> },
      { title: 'Benefits & Welfare', href: '/workforce/welfare', icon: <Heart className='h-4 w-4' /> },
    ],
  },
  {
    name: 'SAFETY',
    items: [
      { title: 'Fraud & Anomalies', href: '/safety/fraud', icon: <ShieldAlert className='h-4 w-4' /> },
      { title: 'Incidents & Safety', href: '/safety/incidents', icon: <AlertTriangle className='h-4 w-4' /> },
      { title: 'Video Evidence', href: '/safety/video-evidence', icon: <FileVideo className='h-4 w-4' /> },
      { title: 'Disputes', href: '/safety/disputes', icon: <FileSpreadsheet className='h-4 w-4' /> },
    ],
  },
  {
    name: 'ANALYTICS',
    items: [
      { title: 'AI Insights', href: '/analytics/ai-insights', icon: <BrainCircuit className='h-4 w-4' /> },
      { title: 'Capacity Planning', href: '/analytics/capacity-planning', icon: <CalendarRange className='h-4 w-4' /> },
      { title: 'Demand Forecast', href: '/analytics/demand', icon: <TrendingUp className='h-4 w-4' /> },
      { title: 'Capacity Recommendations', href: '/analytics/capacity-recommendations', icon: <GraduationCap className='h-4 w-4' /> },
      { title: 'Geographic Demand', href: '/analytics/geographic-demand', icon: <MapPin className='h-4 w-4' /> },
      { title: 'Worker Utilisation', href: '/analytics/worker-utilisation', icon: <PieChart className='h-4 w-4' /> },
    ],
  },
  {
    name: 'FINANCE',
    items: [
      { title: 'Transactions', href: '/finance/transactions', icon: <Receipt className='h-4 w-4' /> },
      { title: 'Worker Payouts', href: '/finance/payouts', icon: <Wallet className='h-4 w-4' /> },
      { title: 'Cooperative Finance', href: '/finance/cooperative', icon: <Coins className='h-4 w-4' /> },
    ],
  },
  {
    name: 'REPORTS',
    items: [
      { title: 'Reports & Analytics', href: '/reports', icon: <BarChart3 className='h-4 w-4' /> },
      { title: 'Policy & Impact', href: '/impact', icon: <Globe className='h-4 w-4' /> },
    ],
  },
  {
    name: 'SYSTEM',
    items: [
      { title: 'Notifications', href: '/notifications', icon: <Bell className='h-4 w-4' /> },
      { title: 'Admin Users & Roles', href: '/admin-users', icon: <UserCog className='h-4 w-4' /> },
      { title: 'System Settings', href: '/settings', icon: <Settings className='h-4 w-4' /> },
      { title: 'Audit Logs', href: '/audit-logs', icon: <ScrollText className='h-4 w-4' /> },
      { title: 'Privacy & Data Governance', href: '/privacy', icon: <Lock className='h-4 w-4' /> },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}) => {
  const location = useLocation();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const renderBadge = (badge: string, variant: NavItem['badgeVariant'] = 'default') => {
    const variantStyles = {
      default: 'bg-slate-100 text-slate-700',
      danger: 'bg-rose-50 text-rose-700 font-medium',
      warning: 'bg-amber-50 text-amber-800 font-medium',
      info: 'bg-sky-50 text-[#0369A1] font-medium',
    };
    return (
      <span
        className={`px-1.5 py-0.5 rounded text-[11px] font-medium leading-none shrink-0 ${variantStyles[variant]}`}
      >
        {badge}
      </span>
    );
  };

  const sidebarContent = (
    <div className='flex flex-col h-full bg-white border-r border-slate-200/80 select-none'>
      {/* Brand Header */}
      <div className='h-16 px-4 flex items-center justify-between border-b border-slate-100'>
        <div className='flex items-center gap-2.5 min-w-0'>
          <div className='h-8 w-8 rounded-xl bg-[#159FE3] flex items-center justify-center text-white shadow-xs shrink-0 font-bold text-sm'>
            AG
          </div>
          {!collapsed && (
            <div className='min-w-0 leading-tight'>
              <span className='font-semibold text-slate-900 text-sm block truncate'>
                ApnaGig
              </span>
              <span className='text-[11px] text-slate-400 block truncate'>
                Admin panel
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className='hidden md:flex h-7 w-7 rounded-lg items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors'
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className='h-4 w-4' /> : <ChevronLeft className='h-4 w-4' />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={onMobileClose}
          className='md:hidden h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50'
        >
          <X className='h-5 w-5' />
        </button>
      </div>

      {/* Navigation Scrollable Area */}
      <div className='flex-1 overflow-y-auto py-3 px-2.5 space-y-4 custom-scrollbar'>
        {navigationGroups.map((group) => {
          const isGroupCollapsed = !!collapsedGroups[group.name];

          return (
            <div key={group.name} className='space-y-0.5'>
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.name)}
                  className='w-full px-2 py-1 flex items-center justify-between text-[11px] font-semibold tracking-[0.04em] text-slate-400 hover:text-slate-600 transition-colors'
                >
                  <span>{group.name}</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-150 ${
                      isGroupCollapsed ? '-rotate-90 text-slate-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              )}

              {(!isGroupCollapsed || collapsed) && (
                <div className='space-y-0.5'>
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));

                    return (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={onMobileClose}
                        title={collapsed ? item.title : undefined}
                        className={`group flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                          isActive
                            ? 'bg-sky-50 text-[#0369A1] font-semibold border border-sky-100/80'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        } ${collapsed ? 'justify-center px-2' : ''}`}
                      >
                        <div className='flex items-center gap-2.5 min-w-0'>
                          <span
                            className={`shrink-0 transition-colors ${
                              isActive ? 'text-[#159FE3]' : 'text-slate-400 group-hover:text-slate-600'
                            }`}
                          >
                            {item.icon}
                          </span>
                          {!collapsed && <span className='truncate'>{item.title}</span>}
                        </div>

                        {!collapsed && item.badge && renderBadge(item.badge, item.badgeVariant)}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Operator Info */}
      <div className='p-3 border-t border-slate-100 bg-slate-50/50'>
        <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
          <div className='h-8 w-8 rounded-full bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center shrink-0 border border-slate-200'>
            AD
          </div>
          {!collapsed && (
            <div className='min-w-0 flex-1 leading-tight'>
              <span className='font-medium text-slate-800 text-xs block truncate'>
                Operations Desk
              </span>
              <span className='text-[11px] text-slate-400 block truncate'>
                admin@apnagig.coop
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0 h-screen transition-all duration-200 ease-in-out ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileOpen && (
        <div className='fixed inset-0 z-50 md:hidden flex'>
          {/* Backdrop */}
          <div
            className='fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity'
            onClick={onMobileClose}
          />
          {/* Off-canvas panel */}
          <div className='relative flex-1 flex flex-col max-w-xs w-full bg-white z-10 animate-fade-in'>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
