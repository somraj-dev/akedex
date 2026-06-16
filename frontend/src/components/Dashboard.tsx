'use client';

import React from 'react';
import { 
  Users, BookOpen, Layers, FileSpreadsheet, Award, TrendingUp,
  Plus, MoreHorizontal, AlertCircle, Calendar, ArrowUpRight,
  BookMarked, MessageSquare, DollarSign, Activity, Settings, HelpCircle
} from 'lucide-react';
import { useAppStore, AppView } from '@/lib/store';

export default function Dashboard() {
  const openTab = useAppStore(s => s.openTab);
  const installedWidgetIds = useAppStore(s => s.installedWidgetIds);

  const handleQuickNav = (view: AppView, label: string) => {
    openTab({
      id: view,
      label,
      view,
      closable: view !== 'dashboard',
    });
  };

  // Row 1 KPI Metrics
  const allKpis = [
    { id: 'total-students', label: 'Total Students', value: '8,542', change: '+12.6% vs Yesterday', trend: 'up', color: '#3b82f6', sparkline: 'M0,15 Q10,12 20,20 T40,10 T60,18 T80,5 T100,2 T120,8', view: 'students' as AppView, labelNav: 'Students' },
    { id: 'active-courses', label: 'Active Courses', value: '568', change: '+8.4% vs Yesterday', trend: 'up', color: '#a855f7', sparkline: 'M0,20 Q10,18 20,22 T40,15 T60,10 T80,14 T100,5 T120,4', view: 'courses' as AppView, labelNav: 'Courses' },
    { id: 'classes-today', label: 'Classes Today', value: '642', change: '+6.1% vs Yesterday', trend: 'up', color: '#06b6d4', sparkline: 'M0,18 Q10,22 20,15 T40,12 T60,20 T80,10 T100,8 T120,6', view: 'classes' as AppView, labelNav: 'Classes' },
    { id: 'attendance-rate', label: 'Attendance Rate', value: '92.7%', change: '+3.8% vs Yesterday', trend: 'up', color: '#10b981', sparkline: 'M0,22 Q10,20 20,18 T40,14 T60,16 T80,12 T100,10 T120,5', view: 'attendance' as AppView, labelNav: 'Attendance' },
    { id: 'assignments-submitted', label: 'Assignments Submitted', value: '1,932', change: '+15.3% vs Yesterday', trend: 'up', color: '#f97316', sparkline: 'M0,25 Q10,20 20,22 T40,18 T60,12 T80,15 T100,8 T120,6', view: 'assignments' as AppView, labelNav: 'Assignments' },
    { id: 'exam-pass-rate', label: 'Exam Pass Rate', value: '87.6%', change: '+4.2% vs Yesterday', trend: 'up', color: '#ef4444', sparkline: 'M0,22 Q10,20 20,21 T40,18 T60,14 T80,15 T100,10 T120,8', view: 'exams' as AppView, labelNav: 'Exams & Assessments' }
  ];

  const kpis = allKpis.filter(kpi => installedWidgetIds.includes(kpi.id));

  // Student statuses
  const studentStatuses = [
    { label: 'Enrolled', count: '6,142', color: '#2563eb', percent: 85, view: 'students' as AppView, labelNav: 'Students' },
    { label: 'Present', count: '5,286', color: '#10b981', percent: 75, view: 'students' as AppView, labelNav: 'Students' },
    { label: 'Absent', count: '512', color: '#ef4444', percent: 12, view: 'students' as AppView, labelNav: 'Students' },
    { label: 'On Leave', count: '236', color: '#f59e0b', percent: 6, view: 'students' as AppView, labelNav: 'Students' },
    { label: 'At Risk', count: '184', color: '#e11d48', percent: 5, view: 'students' as AppView, labelNav: 'Students' },
    { label: 'Graduated', count: '182', color: '#06b6d4', percent: 5, view: 'students' as AppView, labelNav: 'Students' }
  ];

  // Snapshot lists
  const snapshotItems = [
    { label: 'Lectures Conducted', value: '428', icon: <Layers size={14} className="text-blue-500" />, view: 'timetable' as AppView, labelNav: 'Timetable' },
    { label: 'Assessments', value: '156', icon: <Award size={14} className="text-purple-500" />, view: 'exams' as AppView, labelNav: 'Exams & Assessments' },
    { label: 'Assignments Due', value: '312', icon: <FileSpreadsheet size={14} className="text-orange-500" />, view: 'assignments' as AppView, labelNav: 'Assignments' },
    { label: 'Library Issues', value: '189', icon: <BookMarked size={14} className="text-teal-500" />, view: 'library' as AppView, labelNav: 'Library' },
    { label: 'Counseling Sessions', value: '54', icon: <Users size={14} className="text-indigo-500" />, view: 'communication' as AppView, labelNav: 'Communication' },
    { label: 'Club Activities', value: '23', icon: <Activity size={14} className="text-emerald-500" />, view: 'facilities' as AppView, labelNav: 'Facilities' }
  ];

  // Live Activity feed
  const liveActivities = [
    { time: '2 min ago', text: 'New student enrolled', desc: 'Aarav Mehta (ENG-2026-001)', color: '#2563eb' },
    { time: '5 min ago', text: 'Assignment submitted', desc: 'Data Structures Assignment', color: '#10b981' },
    { time: '8 min ago', text: 'Grade published', desc: 'Database Systems - Midterm', color: '#8b5cf6' },
    { time: '10 min ago', text: 'Fee payment received', desc: '₹45,600 - Via Online Portal', color: '#06b6d4' },
    { time: '12 min ago', text: 'Attendance marked', desc: 'Artificial Intelligence - Sem 4', color: '#f59e0b' },
    { time: '15 min ago', text: 'Exam scheduled', desc: 'Operating Systems - End Sem', color: '#3b82f6' },
    { time: '18 min ago', text: 'Library book returned', desc: 'Design Patterns - Erich Gamma', color: '#ec4899' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      background: 'var(--bg-primary)',
      fontFamily: 'var(--font-sans)',
      position: 'relative'
    }}>
      
      {/* Scrollable Main Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingBottom: '60px' // spacing for scrolling ticker
      }}>
        
        {/* Page Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: 'var(--font-display-size)', fontWeight: 'var(--font-display-weight)', lineHeight: 'var(--font-display-lh)', letterSpacing: 'var(--font-display-ls)', color: 'var(--text-primary)', margin: 0 }}>
              Academic Command Center
            </h1>
            <p style={{ fontSize: 'var(--font-secondary-size)', color: 'var(--text-secondary)', lineHeight: 'var(--font-secondary-lh)', marginTop: '2px' }}>
              Real-time overview of academic performance and institutional operations.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" style={{ gap: '4px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>
              <Calendar size={14} /> Today, 2026
            </button>
            <button 
              className="btn btn-primary btn-sm" 
              style={{ gap: '4px' }}
              onClick={() => handleQuickNav('manage-widgets', 'Manage Widgets')}
            >
              <Plus size={14} /> Add Widget
            </button>
            <button aria-label="More widget options" title="More widget options" className="btn btn-secondary btn-sm" style={{ padding: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* Row 1: KPI Cards */}
        {kpis.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${kpis.length}, 1fr)`,
            gap: '12px'
          }}>
            {kpis.map((kpi, idx) => (
              <div 
                key={idx} 
                onClick={() => handleQuickNav(kpi.view, kpi.labelNav)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 'var(--font-metric-lbl-weight)', color: 'var(--text-tertiary)' }}>
                      {kpi.label}
                    </span>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: kpi.color
                    }} />
                  </div>
                  <div style={{ fontSize: 'var(--font-metric-size)', fontWeight: 'var(--font-metric-weight)', lineHeight: 'var(--font-metric-lh)', color: 'var(--text-primary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                    {kpi.value}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                  <span style={{ fontSize: 'var(--font-secondary-size)', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                    {kpi.change}
                  </span>
                  {/* Micro sparkline SVG */}
                  <svg width="64" height="24" viewBox="0 -5 120 35" style={{ overflow: 'visible' }}>
                    <defs>
                      <linearGradient id={`gradient-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={kpi.color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={kpi.color} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d={`${kpi.sparkline} L120,30 L0,30 Z`} 
                      fill={`url(#gradient-${kpi.id})`} 
                    />
                    <path 
                      d={kpi.sparkline} 
                      fill="none" 
                      stroke={kpi.color} 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '36px',
            textAlign: 'center',
            color: 'var(--text-tertiary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <span style={{ fontSize: '24px' }}>🧩</span>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>No Widgets Installed</div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', maxWidth: '300px', margin: '4px 0 0' }}>
              Your command center layout is empty. Click "+ Add Widget" to install widgets from the Playstore.
            </p>
            <button 
              className="btn btn-primary btn-sm"
              style={{ marginTop: '8px', fontSize: '11px', padding: '6px 12px' }}
              onClick={() => handleQuickNav('manage-widgets', 'Manage Widgets')}
            >
              Go to Manage Widgets
            </button>
          </div>
        )}

        {/* Row 2: Splits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
          gap: '16px'
        }}>
          
          {/* Card 1: Student Status */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: 'var(--font-card-size)', fontWeight: 'var(--font-card-weight)', lineHeight: 'var(--font-card-lh)', color: 'var(--text-primary)', marginBottom: '14px' }}>
              Student Status <span style={{ fontSize: 'var(--font-secondary-size)', color: 'var(--text-tertiary)', fontWeight: 500 }}>(Today)</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {studentStatuses.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => handleQuickNav(item.view, item.labelNav)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', cursor: 'pointer', padding: '2px 4px', borderRadius: '4px', transition: 'background var(--transition-fast)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '70px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.label}</span>
                  </div>
                  <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', width: '35px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: '8px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Attendance Rate</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                92.7% <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>+3.8% vs Yesterday</span>
              </span>
            </div>
          </div>

          {/* Card 2: Class Utilization */}
          <div 
            onClick={() => handleQuickNav('classes', 'Classes')}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              cursor: 'pointer',
              transition: 'border-color var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
          >
            <h3 style={{ fontSize: 'var(--font-card-size)', fontWeight: 'var(--font-card-weight)', lineHeight: 'var(--font-card-lh)', color: 'var(--text-primary)', marginBottom: '14px' }}>
              Class Utilization
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flex: 1 }}>
              {/* Donut Chart SVG */}
              <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    stroke="var(--accent-blue)" 
                    strokeWidth="10" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="55.2" // 78% utilized
                    strokeLinecap="round" 
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', lineHeight: 1.1
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>78%</span>
                  <span style={{ fontSize: '8px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Utilized</span>
                </div>
              </div>

              {/* Legend List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, paddingLeft: '8px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: '2px' }}>
                  Total Classes: <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>642</span>
                </div>
                {[
                  { label: 'Scheduled', val: '502', color: '#2563eb' },
                  { label: 'In Progress', val: '98', color: '#10b981' },
                  { label: 'Completed', val: '32', color: '#8b5cf6' },
                  { label: 'Cancelled', val: '10', color: '#ef4444' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.color }} />
                      {item.label}
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Today's Snapshot */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: 'var(--font-card-size)', fontWeight: 'var(--font-card-weight)', lineHeight: 'var(--font-card-lh)', color: 'var(--text-primary)', marginBottom: '10px' }}>
              Today's Academic Snapshot
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              {snapshotItems.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleQuickNav(item.view, item.labelNav)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '3px 6px', borderRadius: '4px', transition: 'background var(--transition-fast)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Live Activity Feed */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            maxHeight: '220px',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: 'var(--font-card-size)', fontWeight: 'var(--font-card-weight)', lineHeight: 'var(--font-card-lh)', color: 'var(--text-primary)', margin: 0 }}>
                Live Activity Feed
              </h3>
              <span 
                onClick={() => handleQuickNav('audit', 'System Audit Trail')}
                style={{ fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer' }}
              >
                View All
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, paddingRight: '2px' }}>
              {liveActivities.map((act, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '10px' }}>
                  <div style={{ display: 'flex', gap: '6px', minWidth: 0 }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: act.color, marginTop: '4px', flexShrink: 0
                    }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{act.text}</div>
                      <div style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                        {act.desc}
                      </div>
                    </div>
                  </div>
                  <span style={{ color: 'var(--text-tertiary)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '9px' }}>{act.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Row 3: Splits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.5fr 1.3fr',
          gap: '16px'
        }}>
          
          {/* Quick Actions */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: 'var(--font-card-size)', fontWeight: 'var(--font-card-weight)', lineHeight: 'var(--font-card-lh)', color: 'var(--text-primary)', marginBottom: '14px' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1, alignContent: 'center' }}>
              {[
                { label: 'New Admission', icon: <Users size={16} />, color: 'var(--accent-blue)', bg: 'rgba(59, 130, 246, 0.1)', view: 'new-admission-flow' as AppView, navLabel: 'New Admission' },
                { label: 'Collect Fees', icon: <DollarSign size={16} />, color: 'var(--accent-green)', bg: 'rgba(16, 185, 129, 0.1)', view: 'collect-fees-flow' as AppView, navLabel: 'Collect Fees' },
                { label: 'Complaints', icon: <AlertCircle size={16} />, color: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.1)', view: 'cases' as AppView, navLabel: 'Disciplinary Cases' },
                { label: 'Library', icon: <BookMarked size={16} />, color: 'var(--accent-purple)', bg: 'rgba(168, 85, 247, 0.1)', view: 'library' as AppView, navLabel: 'Library' }
              ].map((action, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleQuickNav(action.view, action.navLabel)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '8px',
                    padding: '12px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = action.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${action.bg}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    color: action.color, 
                    background: action.bg, 
                    padding: '8px', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {action.icon}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>{action.label}</div>
                </div>
              ))}
            </div>
            <div style={{ 
              borderTop: '1px solid var(--border-primary)', 
              paddingTop: '8px', 
              marginTop: '12px', 
              display: 'flex', 
              justifyContent: 'center', 
              fontSize: '10px',
              color: 'var(--text-secondary)',
              fontWeight: 500
            }}>
              Select an action to jump directly to the module
            </div>
          </div>

          {/* Academic Performance */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: 'var(--font-card-size)', fontWeight: 'var(--font-card-weight)', lineHeight: 'var(--font-card-lh)', color: 'var(--text-primary)', margin: 0 }}>
                Academic Performance
              </h3>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>This Week</span>
            </div>

            {/* Sub Tabs inside widget */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
              {[
                { label: 'Overview', view: 'dashboard' as AppView, navLabel: 'Overview' },
                { label: 'Attendance', view: 'attendance' as AppView, navLabel: 'Attendance' },
                { label: 'Grades', view: 'gradebook' as AppView, navLabel: 'Gradebook' },
                { label: 'Exams', view: 'exams' as AppView, navLabel: 'Exams & Assessments' },
                { label: 'Placements', view: 'facilities' as AppView, navLabel: 'Facilities' }
              ].map((tab, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleQuickNav(tab.view, tab.navLabel)}
                  style={{
                    padding: '3px 8px', fontSize: '10px', border: 'none', borderRadius: '4px',
                    background: idx === 0 ? 'var(--accent-blue)' : 'transparent',
                    color: idx === 0 ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Overall Performance Rate</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                82.4% <span style={{ color: 'var(--accent-green)', fontSize: '10px', fontWeight: 600 }}>+14.6% vs Last Week</span>
              </span>
            </div>

            {/* Performance line chart path SVG */}
            <div style={{ flex: 1, minHeight: '80px', position: 'relative' }}>
              <svg width="100%" height="90" viewBox="0 0 300 90" style={{ overflow: 'visible' }}>
                <path 
                  d="M0,70 L50,68 L100,50 L150,55 L200,45 L250,28 L300,35" 
                  fill="none" 
                  stroke="var(--accent-blue)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                {/* Dots along path */}
                {[
                  { x: 0, y: 70 }, { x: 50, y: 68 }, { x: 100, y: 50 }, 
                  { x: 150, y: 55 }, { x: 200, y: 45 }, { x: 250, y: 28 }, { x: 300, y: 35 }
                ].map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#ffffff" stroke="var(--accent-blue)" strokeWidth="2" />
                ))}
              </svg>
              {/* Day Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Akedex Intelligence */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: 'var(--font-card-size)', fontWeight: 'var(--font-card-weight)', lineHeight: 'var(--font-card-lh)', color: 'var(--text-primary)', margin: 0 }}>
                Akedex Intelligence
              </h3>
              <span 
                onClick={() => handleQuickNav('reports', 'Reports & Analytics')}
                style={{ fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer' }}
              >
                View All Insights
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {[
                { title: 'At Risk Students', desc: '23 students need immediate academic attention', type: 'Alert', color: '#ef4444', bg: '#fef2f2', view: 'students' as AppView, navLabel: 'Students' },
                { title: 'High Performing Courses', desc: 'AI & Machine Learning is trending up by 20%', type: 'Insight', color: '#10b981', bg: '#ecfdf5', view: 'courses' as AppView, navLabel: 'Courses' },
                { title: 'Resource Utilization', desc: 'Lab 3 is at 95% capacity for midterm projects', type: 'Info', color: '#2563eb', bg: '#eff6ff', view: 'facilities' as AppView, navLabel: 'Facilities' },
                { title: 'Upcoming Deadlines', desc: '12 assignments due this week for Class 10', type: 'Reminder', color: '#f59e0b', bg: '#fffbeb', view: 'assignments' as AppView, navLabel: 'Assignments' }
              ].map((intel, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleQuickNav(intel.view, intel.navLabel)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'border-color var(--transition-fast)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{intel.title}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                      {intel.desc}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: intel.color,
                    background: intel.bg,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    flexShrink: 0
                  }}>
                    {intel.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Scrolling Marquee Bottom Ticker tape */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '36px',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        zIndex: 50,
        overflow: 'hidden'
      }}>
        {/* Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          paddingRight: '16px',
          borderRight: '1px solid var(--border-primary)',
          height: '100%',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Real-time Academic Stream
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontSize: '9px', fontWeight: 700 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }} />
            LIVE
          </span>
        </div>

        {/* Scrolling text */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}>
          {React.createElement('marquee', {
            scrollamount: '3.5',
            style: {
              fontSize: '11px',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              fontFamily: 'var(--font-mono)'
            }
          }, 
            <>
              <span style={{ margin: '0 24px' }}>10:36 AM: Assignment Submitted by Riya Singh (DBMS)</span>
              <span style={{ margin: '0 24px' }}>10:37 AM: Attendance Marked - Class 10-A DBMS Lab</span>
              <span style={{ margin: '0 24px' }}>10:38 AM: Fee Payment Received ₹45,600 (Aarav Mehta)</span>
              <span style={{ margin: '0 24px' }}>10:39 AM: Exam Scheduled - OS End Sem (Class 12-Science)</span>
              <span style={{ margin: '0 24px' }}>10:41 AM: Course Attributed - Deep Learning Essentials</span>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
