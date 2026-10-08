'use client';

import React, { useState } from 'react';
import { EMSProvider, useEMS } from '../context/EMSContext';
import ToastContainer from '../components/ui/ToastContainer';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { LoginPage } from '../components/auth/LoginPage';
import AuthModal from '../components/auth/AuthModal';

// Employee Views
import { EmployeeDashboard } from '../components/employee/EmployeeDashboard';
import { EmployeeAttendance } from '../components/employee/EmployeeAttendance';
import { EmployeeTasks } from '../components/employee/EmployeeTasks';
import { EmployeeLeave } from '../components/employee/EmployeeLeave';
import { EmployeeAnnouncements } from '../components/employee/EmployeeAnnouncements';
import { EmployeeSettings } from '../components/employee/EmployeeSettings';

// Manager Views
import { ManagerDashboard } from '../components/manager/ManagerDashboard';
import { ManagerEmployees } from '../components/manager/ManagerEmployees';
import { ManagerAttendance } from '../components/manager/ManagerAttendance';
import { ManagerTasks } from '../components/manager/ManagerTasks';
import { ManagerLeave } from '../components/manager/ManagerLeave';
import { ManagerAnnouncements } from '../components/manager/ManagerAnnouncements';
import { ManagerReports } from '../components/manager/ManagerReports';

import { Menu } from 'lucide-react';

function EMSAppContent() {
  const { currentUser } = useEMS();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // When you open the app first, show the Login / Activation page directly!
  if (!currentUser) {
    return (
      <>
        <LoginPage />
        <ToastContainer />
      </>
    );
  }

  const isManager = currentUser.role === 'manager';

  const renderCurrentView = () => {
    if (isManager) {
      switch (activeTab) {
        case 'dashboard':
          return <ManagerDashboard setActiveTab={setActiveTab} />;
        case 'employees':
          return <ManagerEmployees />;
        case 'attendance':
          return <ManagerAttendance />;
        case 'tasks':
          return <ManagerTasks />;
        case 'leave':
          return <ManagerLeave />;
        case 'announcements':
          return <ManagerAnnouncements />;
        case 'reports':
          return <ManagerReports />;
        case 'settings':
          return <EmployeeSettings />;
        default:
          return <ManagerDashboard setActiveTab={setActiveTab} />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard':
          return <EmployeeDashboard setActiveTab={setActiveTab} />;
        case 'attendance':
          return <EmployeeAttendance />;
        case 'tasks':
          return <EmployeeTasks />;
        case 'leave':
          return <EmployeeLeave />;
        case 'announcements':
          return <EmployeeAnnouncements />;
        case 'settings':
          return <EmployeeSettings />;
        default:
          return <EmployeeDashboard setActiveTab={setActiveTab} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#4A7268] text-[#1E3731] flex flex-col p-2 sm:p-4 lg:p-6 select-none">
      {/* Outer Sage Container matching Figma Canvas */}
      <div className="flex-1 bg-[#4A7268] rounded-[32px] overflow-hidden flex flex-col shadow-2xl border border-white/15">
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpenMobile={isMobileMenuOpen}
            setIsOpenMobile={setIsMobileMenuOpen}
          />

          {/* Right Main Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#527C72]">
            {/* Top Navbar */}
            <Navbar
              onOpenAuth={() => setIsAuthModalOpen(true)}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 bg-[#4E776E]">
              {/* Mobile hamburger menu button */}
              <div className="lg:hidden flex items-center justify-between mb-4 pb-2 border-b border-white/20 text-white">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 bg-[#3B5F56] rounded-xl flex items-center gap-2 text-xs font-bold"
                >
                  <Menu className="w-4 h-4" />
                  <span>Menu</span>
                </button>
                <span className="text-xs font-mono font-semibold capitalize">
                  {activeTab}
                </span>
              </div>

              {renderCurrentView()}
            </main>
          </div>
        </div>
      </div>

      {/* Auth & Activation Modal (for switching or testing while logged in) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function Home() {
  return (
    <EMSProvider>
      <EMSAppContent />
    </EMSProvider>
  );
}
