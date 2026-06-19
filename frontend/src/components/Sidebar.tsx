'use client';

import React, { useRef, useEffect } from 'react';
import { useAppStore, AppView, FinanceSubView, ExamsSubView, SettingsSubView } from '@/lib/store';
import {
  Home, Users, BookOpen, Layers, FileSpreadsheet, Award,
  GraduationCap, Calendar, Clock, Clipboard, BookMarked,
  MessageSquare, DollarSign, Building, BarChart3, Settings,
  LogOut, ShieldAlert, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight,
  LayoutDashboard, CreditCard, AlertTriangle, TrendingUp, Receipt,
  PiggyBank, Banknote, Wallet, GraduationCap as ScholarshipIcon,
  ShoppingCart, ShieldCheck, Brain, FileText, ArrowLeft,
  Fingerprint, Files, Palette, Zap, Database
} from 'lucide-react';

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  section?: string;
  badge?: number;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: <Home size={18} /> },
  
  // ACADEMICS
  { id: 'students', label: 'Students', icon: <Users size={18} />, section: 'ACADEMICS' },
  { id: 'courses', label: 'Courses', icon: <BookOpen size={18} /> },
  { id: 'classes', label: 'Classes', icon: <Layers size={18} /> },
  { id: 'assignments', label: 'Assignments', icon: <FileSpreadsheet size={18} /> },
  { id: 'exams', label: 'Exams & Assessments', icon: <Award size={18} /> },
  
  // OPERATIONS
  { id: 'teachers', label: 'Faculty', icon: <GraduationCap size={18} />, section: 'OPERATIONS' },
  { id: 'timetable', label: 'Timetable', icon: <Clock size={18} /> },
  { id: 'attendance', label: 'Attendance', icon: <Calendar size={18} /> },
  { id: 'gradebook', label: 'Gradebook', icon: <Clipboard size={18} /> },
  { id: 'library', label: 'Library', icon: <BookMarked size={18} /> },
  { id: 'communication', label: 'Communication', icon: <MessageSquare size={18} /> },
  
  // ADMINISTRATION
  { id: 'finance', label: 'Finance', icon: <DollarSign size={18} />, section: 'ADMINISTRATION' },
  { id: 'facilities', label: 'Facilities', icon: <Building size={18} /> },
  { id: 'reports', label: 'Reports & Analytics', icon: <BarChart3 size={18} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
];

type FinanceNavItem = {
  id: FinanceSubView;
  label: string;
  icon: React.ReactNode;
  section?: string;
};

const financeNavItems: FinanceNavItem[] = [
  { id: 'finance-dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard size={18} />, section: 'OVERVIEW' },
  { id: 'finance-fee-collection', label: 'Fee Collection', icon: <CreditCard size={18} />, section: 'REVENUE' },
  { id: 'finance-defaulters', label: 'Defaulters & Recovery', icon: <AlertTriangle size={18} /> },
  { id: 'finance-revenue', label: 'Revenue Analytics', icon: <TrendingUp size={18} /> },
  { id: 'finance-payroll', label: 'Payroll', icon: <Wallet size={18} />, section: 'OPERATIONS' },
  { id: 'finance-reports', label: 'Financial Reports', icon: <FileText size={18} />, section: 'REPORTS' },
];

type ExamsNavItem = {
  id: ExamsSubView;
  label: string;
  icon: React.ReactNode;
  section?: string;
};

const examsNavItems: ExamsNavItem[] = [
  { id: 'exams-dashboard', label: 'Executive Examination Dashboard', icon: <LayoutDashboard size={18} />, section: 'OVERVIEW' },
  
  { id: 'exams-planning', label: 'Examination Planning', icon: <Calendar size={18} />, section: 'PLANNING & PREP' },
  { id: 'exams-schedule', label: 'Exam Schedule Center', icon: <Clock size={18} /> },
  { id: 'exams-hall-seating', label: 'Hall & Seating Management', icon: <Building size={18} /> },
  { id: 'exams-admit-card', label: 'Admit Card Center', icon: <CreditCard size={18} /> },
  
  { id: 'exams-attendance-invigilation', label: 'Attendance & Invigilation', icon: <Users size={18} />, section: 'EXECUTION' },
  { id: 'exams-question-vault', label: 'Question Paper Vault', icon: <ShieldCheck size={18} /> },
  
  { id: 'exams-evaluation', label: 'Evaluation Center', icon: <CheckCircle2 size={18} />, section: 'EVALUATION & RESULTS' },
  { id: 'exams-marks-entry', label: 'Marks Entry', icon: <FileSpreadsheet size={18} /> },
  { id: 'exams-result-processing', label: 'Result Processing', icon: <Brain size={18} /> },
  
  { id: 'exams-analytics', label: 'Academic Analytics', icon: <BarChart3 size={18} />, section: 'ANALYTICS & REPORTS' },
  { id: 'exams-rank-merit', label: 'Rank & Merit Lists', icon: <Award size={18} /> },
  
  { id: 'exams-transcript', label: 'Transcript Center', icon: <GraduationCap size={18} />, section: 'CREDENTIALING' },
  { id: 'exams-report-cards', label: 'Report Cards', icon: <FileText size={18} /> },
  { id: 'exams-certificates', label: 'Certificates', icon: <Award size={18} /> },
  { id: 'exams-reports', label: 'Examination Reports', icon: <FileText size={18} /> },
];

type SettingsNavItem = {
  id: SettingsSubView;
  label: string;
  icon: React.ReactNode;
  section?: string;
};

const settingsNavItems: SettingsNavItem[] = [
  { id: 'Institution', label: 'Institution', icon: <Building size={18} />, section: 'CORE CONFIG' },
  { id: 'Academics', label: 'Academics', icon: <BookOpen size={18} /> },
  { id: 'Admissions', label: 'Admissions', icon: <GraduationCap size={18} /> },
  { id: 'Student Identity', label: 'Student Identity', icon: <Fingerprint size={18} /> },
  { id: 'Attendance', label: 'Attendance', icon: <Calendar size={18} /> },
  { id: 'Examinations', label: 'Examinations', icon: <FileText size={18} /> },
  { id: 'Fees & Finance', label: 'Fees & Finance', icon: <CreditCard size={18} /> },
  { id: 'Communication', label: 'Communication', icon: <MessageSquare size={18} /> },
  { id: 'Documents', label: 'Documents', icon: <Files size={18} /> },
  
  { id: 'Users & Roles', label: 'Users & Roles', icon: <Users size={18} />, section: 'SECURITY & ACCESS' },
  { id: 'Security', label: 'Security', icon: <ShieldCheck size={18} /> },
  { id: 'Audit Logs', label: 'Audit Logs', icon: <Clipboard size={18} /> },
  
  { id: 'AI Configuration', label: 'AI Configuration', icon: <Brain size={18} />, section: 'ADVANCED' },
  { id: 'Integrations', label: 'Integrations', icon: <Layers size={18} /> },
  { id: 'Branding', label: 'Branding', icon: <Palette size={18} /> },
  { id: 'Automation', label: 'Automation', icon: <Zap size={18} /> },
  { id: 'Data Management', label: 'Data Management', icon: <Database size={18} /> },
];

export default function Sidebar() {
  const { 
    currentView, sidebarCollapsed, toggleSidebar, currentUser, logout, 
    financeSubView, examsSubView, examsSidebarActive, setExamsSubView,
    settingsSubView, setSettingsSubView
  } = useAppStore();
  const openTab = useAppStore(s => s.openTab);
  const setFinanceSubView = useAppStore(s => s.setFinanceSubView);

  const isFinanceMode = currentView === 'finance';
  const isExamsMode = currentView === 'exams' && examsSidebarActive;
  const isSettingsMode = currentView === 'settings';

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        if (!useAppStore.getState().sidebarCollapsed) {
          useAppStore.setState({ sidebarCollapsed: true });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (useAppStore.getState().sidebarCollapsed) {
      useAppStore.setState({ sidebarCollapsed: false });
    }
    openTab({
      id: item.id,
      label: item.label,
      view: item.id as AppView,
      closable: item.id !== 'dashboard',
    });
  };

  const handleFinanceNavClick = (item: FinanceNavItem) => {
    if (useAppStore.getState().sidebarCollapsed) {
      useAppStore.setState({ sidebarCollapsed: false });
    }
    setFinanceSubView(item.id);
    // Ensure we're on the finance tab
    openTab({
      id: 'finance',
      label: 'Finance',
      view: 'finance',
      closable: true,
    });
  };

  const handleBackToMainMenu = () => {
    openTab({
      id: 'dashboard',
      label: 'Operations Dashboard',
      view: 'dashboard',
      closable: false,
    });
  };

  const width = sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)';

  return (
    <aside ref={sidebarRef} style={{
      width,
      minWidth: width,
      height: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-primary)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width var(--transition-normal), min-width var(--transition-normal)',
      overflow: 'hidden',
      zIndex: 100,
    }}>
      {/* Brand Header */}
      <div style={{
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: sidebarCollapsed ? 'center' : 'space-between',
        padding: sidebarCollapsed ? '0' : '0 16px',
        borderBottom: '1px solid var(--border-primary)',
        flexShrink: 0,
      }}>
        {!sidebarCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '6px',
              background: isFinanceMode
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : isExamsMode
                ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                : isSettingsMode
                ? 'linear-gradient(135deg, #64748b, #475569)'
                : 'linear-gradient(135deg, var(--accent-blue), #1d4ed8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: '16px',
              transition: 'background 0.3s ease'
            }}>
              {isFinanceMode ? <DollarSign size={14} /> : isExamsMode ? <Award size={14} /> : isSettingsMode ? <Settings size={14} /> : 'A'}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', lineHeight: 1.1 }}>
                <span>{isFinanceMode ? 'Finance' : isExamsMode ? 'Examinations' : isSettingsMode ? 'Settings' : 'Akedex'}</span>
              </div>
              <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                {isFinanceMode ? 'CFO Control Center' : isExamsMode ? 'Assessment Office' : isSettingsMode ? 'System Configuration' : 'Educational Operating Environment'}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost btn-xs"
          style={{ padding: '4px', borderRadius: '6px' }}
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation List */}
      <nav style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '8px 12px',
      }}>
        {isSettingsMode ? (
          <>
            {/* Back to Main Menu button */}
            <button
              onClick={handleBackToMainMenu}
              title={sidebarCollapsed ? 'Main Menu' : undefined}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: sidebarCollapsed ? '10px 0' : '8px 12px',
                borderRadius: '6px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 'var(--font-nav-size)',
                fontWeight: 600,
                lineHeight: 'var(--font-nav-lh)',
                fontFamily: 'var(--font-sans)',
                transition: 'all var(--transition-fast)',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                marginBottom: '4px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              <span style={{ flexShrink: 0, color: 'var(--text-tertiary)' }}><ArrowLeft size={18} /></span>
              {!sidebarCollapsed && (
                <span style={{ flex: 1, textAlign: 'left' }}>Main Menu</span>
              )}
            </button>

            {/* Divider */}
            {!sidebarCollapsed && (
              <div style={{
                height: '1px',
                background: 'var(--border-primary)',
                margin: '4px 8px 8px',
              }} />
            )}

            {/* Settings navigation items */}
            {settingsNavItems.map((item) => {
              const isActive = settingsSubView === item.id;
              const showSection = item.section && !sidebarCollapsed;

              return (
                <React.Fragment key={item.id}>
                  {showSection && (
                    <div style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      padding: '16px 8px 6px',
                      textTransform: 'uppercase',
                    }}>
                      {item.section}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (useAppStore.getState().sidebarCollapsed) {
                        useAppStore.setState({ sidebarCollapsed: false });
                      }
                      setSettingsSubView(item.id);
                      openTab({
                        id: 'settings',
                        label: 'Settings',
                        view: 'settings',
                        closable: true,
                      });
                    }}
                    title={sidebarCollapsed ? item.label : undefined}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: sidebarCollapsed ? '10px 0' : '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: isActive ? 'var(--bg-active)' : 'transparent',
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: 'var(--font-nav-size)',
                      fontWeight: isActive ? 600 : 'var(--font-nav-weight)',
                      lineHeight: 'var(--font-nav-lh)',
                      fontFamily: 'var(--font-sans)',
                      transition: 'all var(--transition-fast)',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      marginBottom: '2px',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    <span style={{ 
                      flexShrink: 0, 
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-tertiary)' 
                    }}>{item.icon}</span>
                    {!sidebarCollapsed && (
                      <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </>
        ) : isExamsMode ? (
          <>
            {/* Back to Main Menu button */}
            <button
              onClick={() => useAppStore.setState({ examsSidebarActive: false })}
              title={sidebarCollapsed ? 'Main Menu' : undefined}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: sidebarCollapsed ? '10px 0' : '8px 12px',
                borderRadius: '6px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 'var(--font-nav-size)',
                fontWeight: 600,
                lineHeight: 'var(--font-nav-lh)',
                fontFamily: 'var(--font-sans)',
                transition: 'all var(--transition-fast)',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                marginBottom: '4px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              <span style={{ flexShrink: 0, color: 'var(--text-tertiary)' }}><ArrowLeft size={18} /></span>
              {!sidebarCollapsed && (
                <span style={{ flex: 1, textAlign: 'left' }}>Main Menu</span>
              )}
            </button>

            {/* Divider */}
            {!sidebarCollapsed && (
              <div style={{
                height: '1px',
                background: 'var(--border-primary)',
                margin: '4px 8px 8px',
              }} />
            )}

            {/* Exams sub-navigation items */}
            {examsNavItems.map((item) => {
              const isActive = examsSubView === item.id;
              const showSection = item.section && !sidebarCollapsed;

              return (
                <React.Fragment key={item.id}>
                  {showSection && (
                    <div style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      padding: '16px 8px 6px',
                      textTransform: 'uppercase',
                    }}>
                      {item.section}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (useAppStore.getState().sidebarCollapsed) {
                        useAppStore.setState({ sidebarCollapsed: false });
                      }
                      setExamsSubView(item.id);
                      openTab({
                        id: 'exams',
                        label: 'Exams & Assessments',
                        view: 'exams',
                        closable: true,
                      });
                    }}
                    title={sidebarCollapsed ? item.label : undefined}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: sidebarCollapsed ? '10px 0' : '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: isActive ? 'var(--bg-active)' : 'transparent',
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: 'var(--font-nav-size)',
                      fontWeight: isActive ? 600 : 'var(--font-nav-weight)',
                      lineHeight: 'var(--font-nav-lh)',
                      fontFamily: 'var(--font-sans)',
                      transition: 'all var(--transition-fast)',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      marginBottom: '2px',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    <span style={{ 
                      flexShrink: 0, 
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-tertiary)' 
                    }}>{item.icon}</span>
                    {!sidebarCollapsed && (
                      <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </>
        ) : isFinanceMode ? (
          <>
            {/* Back to Main Menu button */}
            <button
              onClick={handleBackToMainMenu}
              title={sidebarCollapsed ? 'Main Menu' : undefined}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: sidebarCollapsed ? '10px 0' : '8px 12px',
                borderRadius: '6px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 'var(--font-nav-size)',
                fontWeight: 600,
                lineHeight: 'var(--font-nav-lh)',
                fontFamily: 'var(--font-sans)',
                transition: 'all var(--transition-fast)',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                marginBottom: '4px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              <span style={{ flexShrink: 0, color: 'var(--text-tertiary)' }}><ArrowLeft size={18} /></span>
              {!sidebarCollapsed && (
                <span style={{ flex: 1, textAlign: 'left' }}>Main Menu</span>
              )}
            </button>

            {/* Divider */}
            {!sidebarCollapsed && (
              <div style={{
                height: '1px',
                background: 'var(--border-primary)',
                margin: '4px 8px 8px',
              }} />
            )}

            {/* Finance sub-navigation items */}
            {financeNavItems.map((item) => {
              const isActive = financeSubView === item.id;
              const showSection = item.section && !sidebarCollapsed;

              return (
                <React.Fragment key={item.id}>
                  {showSection && (
                    <div style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      padding: '16px 8px 6px',
                      textTransform: 'uppercase',
                    }}>
                      {item.section}
                    </div>
                  )}
                  <button
                    onClick={() => handleFinanceNavClick(item)}
                    title={sidebarCollapsed ? item.label : undefined}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: sidebarCollapsed ? '10px 0' : '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: isActive ? 'var(--bg-active)' : 'transparent',
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: 'var(--font-nav-size)',
                      fontWeight: isActive ? 600 : 'var(--font-nav-weight)',
                      lineHeight: 'var(--font-nav-lh)',
                      fontFamily: 'var(--font-sans)',
                      transition: 'all var(--transition-fast)',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      marginBottom: '2px',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    <span style={{ 
                      flexShrink: 0, 
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-tertiary)' 
                    }}>{item.icon}</span>
                    {!sidebarCollapsed && (
                      <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </>
        ) : (
          /* Main navigation items */
          navItems.map((item) => {
            const isActive = currentView === item.id || (item.id === 'dashboard' && currentView === 'dashboard');
            const showSection = item.section && !sidebarCollapsed;

            return (
              <React.Fragment key={item.id}>
                {showSection && (
                  <div style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    padding: '16px 8px 6px',
                    textTransform: 'uppercase',
                  }}>
                    {item.section}
                  </div>
                )}
                <button
                  onClick={() => handleNavClick(item)}
                  title={sidebarCollapsed ? item.label : undefined}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: sidebarCollapsed ? '10px 0' : '8px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: isActive ? 'var(--bg-active)' : 'transparent',
                    color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 'var(--font-nav-size)',
                    fontWeight: isActive ? 600 : 'var(--font-nav-weight)',
                    lineHeight: 'var(--font-nav-lh)',
                    fontFamily: 'var(--font-sans)',
                    transition: 'all var(--transition-fast)',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    marginBottom: '2px',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  <span style={{ 
                    flexShrink: 0, 
                    color: isActive ? 'var(--accent-blue)' : 'var(--text-tertiary)' 
                  }}>{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                  )}
                </button>
              </React.Fragment>
            );
          })
        )}
      </nav>

      {/* Lower Left Status Block (only visible when expanded) */}
      {!sidebarCollapsed && (
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border-primary)',
          background: 'var(--bg-secondary)',
          flexShrink: 0,
        }}>
          {/* Institution Box */}
          <div style={{
            border: '1px solid var(--border-primary)',
            borderRadius: '8px',
            padding: '12px',
            background: 'var(--bg-primary)',
            marginBottom: '10px'
          }}>
            <div style={{ fontSize: 'var(--font-tbl-hdr-size)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--font-tbl-hdr-ls)', marginBottom: '4px' }}>
              Institution
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontSize: 'var(--font-nav-size)', fontWeight: 700, color: 'var(--text-primary)' }}>
                Axio Education Group
              </span>
              <CheckCircle2 size={12} className="text-emerald-500 fill-emerald-100" />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-secondary-size)', color: 'var(--text-secondary)', lineHeight: 'var(--font-secondary-lh)' }}>
              <span>Academic Year</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>2025 - 2026</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-secondary-size)', color: 'var(--text-secondary)', lineHeight: 'var(--font-secondary-lh)', marginTop: '2px' }}>
              <span>Current Term</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Term II</span>
            </div>
          </div>

          {/* Action button */}
          <button 
            onClick={() => openTab({ id: 'system-logs', label: 'System Logs', view: 'system-logs', closable: true })}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-secondary-size)',
              lineHeight: 'var(--font-secondary-lh)',
              fontWeight: 600
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-active)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={14} className="text-slate-500" />
              System Logs
            </span>
            <ArrowRight size={12} />
          </button>
        </div>
      )}
    </aside>
  );
}
