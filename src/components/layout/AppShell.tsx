import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandSearch } from './CommandSearch';
import { NotificationDrawer } from './NotificationDrawer';

export const AppShell: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchPaletteOpen, setSearchPaletteOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  return (
    <div className='min-h-screen bg-[#F4F7FB] flex text-slate-800 antialiased font-sans'>
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col min-w-0 h-screen overflow-hidden'>
        {/* Top Navbar */}
        <Topbar
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenSearch={() => setSearchPaletteOpen(true)}
          onOpenNotifications={() => setNotificationDrawerOpen(true)}
        />

        {/* Dynamic Page Routed Content */}
        <main className='flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar'>
          <div className='max-w-7xl mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Command Palette (Cmd+K) */}
      <CommandSearch
        isOpen={searchPaletteOpen}
        onClose={() => setSearchPaletteOpen(false)}
      />

      {/* Global Notifications Drawer */}
      <NotificationDrawer
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />
    </div>
  );
};
