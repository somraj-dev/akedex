'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X } from 'lucide-react';
import ActivationScreen from '@/components/ActivationScreen';
import LoginScreen from '@/components/LoginScreen';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
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
import { 
  TeachersView, DocumentsView, AttendanceView, 
  InstitutionView, AuditView, SearchView,
  CoursesView, ClassesView, ExamsView,
  TimetableView, GradebookView, LibraryView, CommunicationView,
  FinanceView, FacilitiesView, ReportsView, SystemLogsView,
  ProfileView, NotificationsView, StudentProfileView, TeacherProfileView,
  ManageWidgetsView, AcademicCalendarView, StudentReportCardView, StudentTranscriptView
} from '@/components/OtherViews';

export default function Page() {
  const { 
    isActivated, isAuthenticated, currentView, 
    tabs, activeTabId, setActiveTab, closeTab, reorderTabs, openTab 
  } = useAppStore();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // 1. Activation Flow
  if (!isActivated) {
    return <ActivationScreen />;
  }

  // 2. Authentication Flow
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // 3. Render Active Workspace View Component
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
      default:
        return <Dashboard />;
    }
  };

  // 4. Main Institutional Operating Layout
  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
    }}>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Frame */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: 0,
        overflow: 'hidden',
      }}>
        {/* Top bar containing global search, status, clock, and profile */}
        <TopBar />

        {/* Workspace Tab Bar */}
        <div 
          onDoubleClick={(e) => {
            if (e.target === e.currentTarget) {
              openTab({ id: `search-${Date.now()}`, label: 'Search', view: 'search', closable: true });
            }
          }}
          style={{
            height: 'var(--tab-height)',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-primary)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            gap: '6px',
            overflowX: 'auto',
            flexShrink: 0,
            userSelect: 'none',
          }}
        >
          {tabs.map((tab, idx) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                draggable
                onDragStart={(e) => {
                  setDraggedIndex(idx);
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggedIndex !== null && draggedIndex !== idx) {
                    reorderTabs(draggedIndex, idx);
                  }
                  setDraggedIndex(null);
                }}
                onDragEnd={() => setDraggedIndex(null)}
                onClick={() => setActiveTab(tab.id)}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  if (tab.closable !== false) closeTab(tab.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 12px',
                  height: '28px',
                  borderRadius: '4px',
                  background: isActive ? 'var(--bg-active)' : 'transparent',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--border-primary)' : '1px solid transparent',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'background 120ms ease, color 120ms ease, border 120ms ease',
                  whiteSpace: 'nowrap',
                  opacity: draggedIndex === idx ? 0.5 : 1,
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.background = 'var(--bg-tertiary)';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{tab.label}</span>
                {tab.closable !== false && (
                  <button
                    aria-label={`Close ${tab.label} tab`}
                    title={`Close ${tab.label} tab`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      padding: 0,
                      transition: 'all 120ms ease',
                      marginLeft: '2px'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--accent-red-dim)';
                      e.currentTarget.style.color = 'var(--accent-red)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Workspace Workspace View Area */}
        <main style={{
          flex: 1,
          width: '100%',
          overflow: 'hidden',
        }}>
          {renderActiveView()}
        </main>
      </div>

      {/* Global Command Bar Shortcut (Ctrl+K) */}
      <CommandBar />
    </div>
  );
}
