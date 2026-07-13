'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X } from 'lucide-react';
import LoginScreen from '@/components/LoginScreen';
import TopHeader from '@/components/TopHeader';
import CommandBar from '@/components/CommandBar';
import Dashboard from '@/components/Dashboard';
import StudentExplorer from '@/components/StudentExplorer';
import AdmissionsView from '@/components/AdmissionsView';
import NewAdmissionFlow from '@/components/NewAdmissionFlow';
import FreshAdmissionWizard from '@/components/FreshAdmissionWizard';
import ApplicantProfileView from '@/components/ApplicantProfile';
import TransferAdmissionWizard from '@/components/TransferAdmissionWizard';
import TransfersView from '@/components/TransfersView';
import CasesView from '@/components/CasesView';
import SettingsView from '@/components/SettingsView';
import OrganizationsView from '@/components/OrganizationsView';
import EditStudentDataWizard from '@/components/EditStudentDataWizard';
import ParentalAccess from '@/components/ParentalAccess';
import TransferCenter from '@/components/TransferCenter';
import EditInstituteWizard from '@/components/EditInstituteWizard';
import { CollectFeesFlow } from '@/components/CollectFeesFlow';
import PersonSearchModal from '@/components/PersonSearchModal';
import { 
  TeachersView, DocumentsView, AttendanceView, 
  InstitutionView, AuditView, SearchView,
  CoursesView, ClassesView, ExamsView,
  TimetableView, GradebookView, LibraryView, CommunicationView,
  FinanceView, FacilitiesView, ReportsView, SystemLogsView,
  ProfileView, NotificationsView, StudentProfileView, TeacherProfileView,
  ManageWidgetsView, AcademicCalendarView, StudentReportCardView, StudentTranscriptView,
  DevToolsView
} from '@/components/OtherViews';

export default function Page() {
  const { 
    isActivated, isAuthenticated, currentView, 
    tabs, activeTabId, setActiveTab, closeTab, reorderTabs, openTab 
  } = useAppStore();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // F10 search key binding
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F10') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  // 2. Authentication Flow
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // 3. Render Developer tools in full page without the main header
  if (currentView === 'dev-tools') {
    return <DevToolsView />;
  }

  // 4. Render Active Workspace View Component
  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentExplorer />;
      case 'teachers':
        return <TeachersView />;
      case 'admissions':
        return <AdmissionsView />;
      case 'new-admission-flow':
        return <NewAdmissionFlow />;
      case 'fresh-admission':
        return <FreshAdmissionWizard />;
      case 'applicant-profile':
        return <ApplicantProfileView />;
      case 'transfer-admission-wizard':
        return <TransferAdmissionWizard />;
      case 'transfers':
        return <TransfersView />;
      case 'cases':
        return <CasesView />;
      case 'documents':
        return <DocumentsView />;
      case 'attendance':
        return <AttendanceView />;
      case 'institution':
        return <InstitutionView />;
      case 'audit':
        return <AuditView />;
      case 'settings':
        return <SettingsView />;
      case 'organizations':
        return <OrganizationsView />;
      case 'search':
        return <SearchView />;
      case 'courses':
        return <CoursesView />;
      case 'classes':
        return <ClassesView />;
      case 'exams':
        return <ExamsView />;
      case 'timetable':
        return <TimetableView />;
      case 'gradebook':
        return <GradebookView />;
      case 'library':
        return <LibraryView />;
      case 'communication':
        return <CommunicationView />;
      case 'finance':
        return <FinanceView />;
      case 'facilities':
        return <FacilitiesView />;
      case 'reports':
        return <ReportsView />;
      case 'system-logs':
        return <SystemLogsView />;
      case 'profile':
        return <ProfileView />;
      case 'notifications':
        return <NotificationsView />;
      case 'student-profile':
        return <StudentProfileView />;
      case 'teacher-profile':
        return <TeacherProfileView />;
      case 'manage-widgets':
        return <ManageWidgetsView />;
      case 'academic-calendar':
        return <AcademicCalendarView />;
      case 'student-report-card':
        return <StudentReportCardView />;
      case 'student-transcript':
        return <StudentTranscriptView />;
      case 'edit-student-data':
        return <EditStudentDataWizard studentId={activeTabId.replace('edit-student-', '')} />;
      case 'parental-access':
        return <ParentalAccess studentId={activeTabId.replace('parent-access-', '')} />;
      case 'transfer-center':
        return <TransferCenter preselectedStudentId={activeTabId.startsWith('transfer-app-') ? activeTabId.replace('transfer-app-', '') : undefined} />;
      case 'collect-fees-flow':
        return <CollectFeesFlow />;
      case 'edit-institute':
        return <EditInstituteWizard />;
      case 'dev-tools':
        return <DevToolsView />;
      default:
        return <Dashboard />;
    }
  };

  // 4. Main Institutional Operating Layout
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
    }}>
      {/* Unified 3-Row Professional Header */}
      <TopHeader />

      {/* Dynamic Workspace Workspace View Area */}
      <main style={{
        flex: 1,
        width: '100%',
        overflow: 'hidden',
      }}>
        {renderActiveView()}
      </main>

      {/* Global Command Bar Shortcut (Ctrl+K) */}
      <CommandBar />

      {/* Person Search Modal (F10) */}
      <PersonSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Global Toast Notification */}
      <Toast />
    </div>
  );
}

function Toast() {
  const { toastMessage, toastType, hideToast } = useAppStore();

  React.useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, hideToast]);

  if (!toastMessage) return null;

  let accentColor = 'var(--accent-blue)';

  if (toastType === 'success') {
    accentColor = 'var(--accent-green)';
  } else if (toastType === 'error') {
    accentColor = 'var(--accent-red)';
  } else if (toastType === 'info') {
    accentColor = 'var(--accent-blue)';
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 18px',
      borderRadius: '12px',
      background: 'rgba(15, 23, 42, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(8px)',
      color: '#ffffff',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 500,
      minWidth: '280px',
      maxWidth: '450px',
      animation: 'toastSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <style>{`
        @keyframes toastSlideIn {
          from {
            transform: translateY(100%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: accentColor,
        boxShadow: `0 0 8px ${accentColor}`,
        flexShrink: 0,
      }} />
      <span style={{ flex: 1, color: 'rgba(255,255,255,0.95)' }}>{toastMessage}</span>
      <button 
        onClick={hideToast}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 100ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
      >
        <X size={14} />
      </button>
    </div>
  );
}
