'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { Search, Bell, MessageSquare, Calendar, ChevronDown, Shield, Key, LogOut, Clock, User, BookOpen, Star, Code, Building, Globe, Heart, Settings, Bot, Beaker, Paintbrush, Accessibility, ArrowUpCircle } from 'lucide-react';

export default function TopBar() {
  const { currentUser, toggleCommandBar, logout } = useAppStore();
  const openTab = useAppStore(s => s.openTab);

  // Popover States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleViewNav = (view: string, label: string) => {
    setShowNotifications(false);
    setShowProfile(false);
    setShowMessages(false);
    openTab({
      id: view,
      label,
      view: view as any,
      closable: view !== 'dashboard',
    });
  };

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setShowMessages(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header style={{
      height: 'var(--topbar-height)',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      fontFamily: 'var(--font-sans)',
      position: 'relative',
      zIndex: 90
    }}>
      {/* Left: Global Search box */}
      <div 
        onClick={toggleCommandBar}
        style={{
          width: '380px',
          height: '36px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          cursor: 'pointer',
          gap: '8px',
          position: 'relative'
        }}
      >
        <Search size={14} className="text-slate-400" />
        <span style={{ fontSize: 'var(--font-input-size)', color: 'var(--text-muted)', flex: 1 }}>
          Search students, courses, staff, classes, assignments...
        </span>
        <kbd style={{
          fontSize: '9px',
          fontWeight: 700,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '4px',
          padding: '2px 4px',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-mono)'
        }}>
          ⌘K
        </kbd>
      </div>

      {/* Right: Status, Time, Alerts, and Operator profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        

        {/* Notifications and Alerts icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-secondary)', position: 'relative' }}>
          
          {/* Bell Notifications */}
          <div ref={notificationsRef} style={{ position: 'relative' }}>
            <div 
              onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); setShowProfile(false); }}
              style={{ position: 'relative', cursor: 'pointer', padding: '4px' }}
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '1px',
                right: '1px',
                width: '14px',
                height: '14px',
                background: 'var(--accent-red)',
                borderRadius: '50%',
                fontSize: '8px',
                fontWeight: 800,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white'
              }}>
                4
              </span>
            </div>

            {/* Notification Popover Panel */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '32px',
                right: '-80px',
                width: '280px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                animation: 'overlayFadeIn 120ms ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-primary)', paddingBottom: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: 'var(--font-tbl-hdr-size)', fontWeight: 700, color: 'var(--text-primary)' }}>SYSTEM ALERTS</span>
                  <span 
                    onClick={() => handleViewNav('notifications', 'System Alerts')}
                    style={{ fontSize: 'var(--font-tbl-hdr-size)', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer' }}
                  >
                    View All
                  </span>
                </div>
                {[
                  { title: 'At Risk Students Flagged', desc: '23 identities fell below 75% attendance threshold', color: 'var(--accent-red)', view: 'students', label: 'Students' },
                  { title: 'Transcripts Pending Verification', desc: '4 applications awaiting attestation signature', color: 'var(--accent-amber)', view: 'documents', label: 'Documents' },
                  { title: 'Compliance Exception Logged', desc: 'Duplicate universal academic record warning', color: 'var(--accent-red)', view: 'audit', label: 'Audit Trail' },
                  { title: 'Attestation Snapshot Synced', desc: 'Encrypted backup ledger attestation synced', color: 'var(--accent-green)', view: 'dashboard', label: 'Overview' }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleViewNav(item.view, item.label)}
                    style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      fontSize: 'var(--font-tbl-hdr-size)', 
                      padding: '8px', 
                      background: 'var(--bg-primary)', 
                      borderRadius: '4px', 
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, marginTop: '4px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '2px', fontSize: '9px' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Messages Bubble */}
          <div ref={messagesRef} style={{ position: 'relative' }}>
            <div 
              onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); setShowProfile(false); }}
              style={{ position: 'relative', cursor: 'pointer', padding: '4px' }}
            >
              <MessageSquare size={18} />
              <span style={{
                position: 'absolute',
                top: '1px',
                right: '1px',
                width: '14px',
                height: '14px',
                background: 'var(--accent-blue)',
                borderRadius: '50%',
                fontSize: '8px',
                fontWeight: 800,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white'
              }}>
                2
              </span>
            </div>

            {/* Messages Popover Panel */}
            {showMessages && (
              <div style={{
                position: 'absolute',
                top: '32px',
                right: '-40px',
                width: '260px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                animation: 'overlayFadeIn 120ms ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-primary)', paddingBottom: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>OPERATOR MESSAGES</span>
                </div>
                {[
                  { sender: 'Dr. Meena Shah', msg: 'Please verify CBSE guidelines release draft for Term II' },
                  { sender: 'Mr. Rajiv Saxena', msg: 'Timetable conflict on lab 3 has been resolved' }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '6px', background: 'var(--bg-primary)', borderRadius: '4px', fontSize: '10px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.sender}</div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{item.msg}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calendar icon */}
          <div 
            onClick={() => handleViewNav('academic-calendar', 'Academic Calendar')}
            style={{ cursor: 'pointer', padding: '4px' }}
          >
            <Calendar size={18} />
          </div>
        </div>

        {/* Operator Profile dropdown */}
        {currentUser && (
          <div ref={profileRef} style={{ position: 'relative' }}>
            <div 
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); setShowMessages(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderLeft: '1px solid var(--border-primary)',
                paddingLeft: '16px',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-blue), #1d4ed8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 700, color: 'white'
              }}>
                DS
              </div>
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>
                  Super Admin
                </div>
              </div>
              <ChevronDown size={12} className="text-slate-400" />
            </div>

            {/* Profile Dropdown Panel */}
            {showProfile && (
              <div style={{
                position: 'absolute',
                top: '40px',
                right: 0,
                width: '280px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                animation: 'overlayFadeIn 120ms ease',
                fontFamily: 'var(--font-sans)',
                overflow: 'hidden',
                zIndex: 100,
                color: '#111827'
              }}>
                {/* Header */}
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: '#f3f4f6', border: '1px solid #d1d5db',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <User size={18} color="#4b5563" />
                  </div>
                  <div style={{ lineHeight: 1.2 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>somraj-dev</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Somraj Lodhi</div>
                  </div>
                </div>

                {/* Section 1 */}
                <div style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  {[
                    { label: 'Profile', icon: User },
                    { label: 'Repositories', icon: BookOpen },
                    { label: 'Stars', icon: Star },
                    { label: 'Gists', icon: Code },
                    { label: 'Organizations', icon: Building },
                    { label: 'Enterprises', icon: Globe },
                    { label: 'Sponsors', icon: Heart }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      style={{ padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }} 
                      onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'} 
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <item.icon size={16} color="#6b7280" /> {item.label}
                    </div>
                  ))}
                </div>

                {/* Section 2 */}
                <div style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                  {[
                    { label: 'Settings', icon: Settings },
                    { label: 'Copilot settings', icon: Bot },
                    { label: 'Feature preview', icon: Beaker },
                    { label: 'Appearance', icon: Paintbrush },
                    { label: 'Accessibility', icon: Accessibility },
                    { label: 'Upgrade', icon: ArrowUpCircle }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      style={{ padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }} 
                      onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'} 
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <item.icon size={16} color="#6b7280" /> {item.label}
                    </div>
                  ))}
                </div>

                {/* Sign out */}
                <div style={{ padding: '8px 0' }}>
                  <div 
                    onClick={logout} 
                    style={{ padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }} 
                    onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'} 
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={16} color="#6b7280" /> Sign out
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
