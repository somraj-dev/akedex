'use client';

import React from 'react';
import { useAppStore, AppView } from '@/lib/store';
import {
  Home, Users, BookOpen, Layers, FileSpreadsheet, Award,
  GraduationCap, Calendar, Clock, Clipboard, BookMarked,
  MessageSquare, DollarSign, Building, BarChart3, Settings,
  LogOut, ShieldAlert, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight
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

export default function Sidebar() {
  const { currentView, sidebarCollapsed, toggleSidebar, currentUser, logout } = useAppStore();
  const openTab = useAppStore(s => s.openTab);

  const handleNavClick = (item: NavItem) => {
    openTab({
      id: item.id,
      label: item.label,
      view: item.id as AppView,
      closable: item.id !== 'dashboard',
    });
  };

  const width = sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)';

  return (
    <aside style={{
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
              background: 'linear-gradient(135deg, var(--accent-blue), #1d4ed8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: '16px'
            }}>
              A
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', lineHeight: 1.1 }}>
                <span>Akedex</span>
              </div>
              <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                Educational Operating Environment
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
        {navItems.map((item, index) => {
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
        })}
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
