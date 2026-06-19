'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { Search, Bell, MessageSquare, Calendar, ChevronDown, Shield, Key, LogOut, Clock, User, BookOpen, Star, Code, Building, Globe, Heart, Settings, Bot, Beaker, Paintbrush, Accessibility, ArrowUpCircle, Plus, CircleDot, GitBranch, Inbox } from 'lucide-react';

export default function TopBar() {
  const { currentUser, toggleCommandBar, logout, currentView } = useAppStore();
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
    <>
      <style>{`
        .topbar-search {
          height: 32px;
          width: 220px;
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          padding: 0 12px;
          cursor: pointer;
          gap: 8px;
          font-size: 12px;
          user-select: none;
          transition: all 120ms ease;
        }
        .topbar-search:hover {
          background: var(--bg-hover);
          border-color: var(--text-muted);
        }
        .topbar-kbd {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 4px;
          padding: 1px 5px;
          font-size: 10px;
          color: var(--text-secondary);
          font-weight: 600;
          line-height: 1;
        }
        .topbar-btn {
          height: 32px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 120ms ease;
          user-select: none;
        }
        .topbar-btn:hover {
          background: var(--bg-hover);
          border-color: var(--text-muted);
          color: var(--text-primary);
        }
        .topbar-btn-sq {
          width: 32px;
          padding: 0;
        }
        .topbar-btn-dropdown {
          padding: 0 10px;
          gap: 6px;
        }
        .topbar-divider {
          width: 1px;
          height: 16px;
          background: var(--border-primary);
          margin: 0 8px;
        }
        .topbar-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          cursor: pointer;
          user-select: none;
          transition: all 120ms ease;
        }
        .topbar-avatar:hover {
          background: #1d4ed8;
          transform: scale(1.05);
        }
      `}</style>
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
        {/* Left side: Breadcrumb / Active View Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
          <Building size={14} style={{ color: 'var(--text-muted)' }} />
          <span style={{ cursor: 'pointer' }} onClick={() => handleViewNav('dashboard', 'Overview')}>Akedex Nodes</span>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>
            {currentView === 'dashboard' ? 'Overview' : currentView?.replace('-', ' ')}
          </span>
        </div>

        {/* Right side: Unified Mockup Utility Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Search box trigger */}
            <div onClick={toggleCommandBar} className="topbar-search">
              <Search size={14} style={{ color: 'var(--text-secondary)' }} />
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Type <kbd className="topbar-kbd">/</kbd> to search
              </span>
            </div>
          </div>

          {/* Separator | */}
          <div className="topbar-divider" />

          {/* Sub-group 2: Actions, dot-circle, git-branch, calendar, notifications, avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            
            {/* Plus Quick Action */}
            <div onClick={toggleCommandBar} className="topbar-btn topbar-btn-dropdown">
              <Plus size={14} />
              <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
            </div>



            {/* Book Button (for Academic Calendar) */}
            <div onClick={() => handleViewNav('academic-calendar', 'Academic Calendar')} className="topbar-btn topbar-btn-sq">
              <BookOpen size={14} />
            </div>

            {/* Inbox Button (for Akedex Notifications) */}
            <div ref={notificationsRef} style={{ position: 'relative' }}>
              <div 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); setShowMessages(false); }}
                className="topbar-btn topbar-btn-sq"
                style={{ position: 'relative' }}
              >
                <Inbox size={14} />
                {/* Blue notification dot */}
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '6px',
                  height: '6px',
                  background: 'var(--accent-blue)',
                  borderRadius: '50%'
                }} />
              </div>

              {/* Notification Popover Panel */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '36px',
                  right: 0,
                  width: '280px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  animation: 'overlayFadeIn 120ms ease',
                  zIndex: 100,
                  color: 'var(--text-primary)'
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

            {/* Circular Operator Avatar dropdown */}
            {currentUser && (
              <div ref={profileRef} style={{ position: 'relative' }}>
                <div 
                  onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); setShowMessages(false); }}
                  className="topbar-avatar"
                >
                  DS
                </div>

                {/* Profile Dropdown Panel */}
                {showProfile && (
                  <div style={{
                    position: 'absolute',
                    top: '36px',
                    right: 0,
                    width: '200px',
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
                        { label: 'Profile', icon: User, view: 'profile' },
                        { label: 'Repositories', icon: BookOpen },
                        { label: 'Stars', icon: Star },
                        { label: 'Gists', icon: Code },
                        { label: 'Organizations', icon: Building, view: 'organizations' },
                        { label: 'Enterprises', icon: Globe },
                        { label: 'Sponsors', icon: Heart }
                      ].map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            if (item.view) {
                              handleViewNav(item.view, item.label);
                            }
                          }}
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
                        { label: 'Settings', icon: Settings, view: 'settings' },
                        { label: 'Feature request', icon: Beaker },
                        { label: 'Appearance', icon: Paintbrush },
                        { label: 'Accessibility', icon: Accessibility }
                      ].map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            if (item.view) {
                              handleViewNav(item.view, item.label);
                            }
                          }}
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
        </div>
      </header>
    </>
  );
}

