'use client';

import React, { useState } from 'react';
import { 
  Building, Users, Calendar, ChevronDown, Shield, Edit, Trash2, 
  ChevronLeft, ChevronRight, UserPlus, Layers, Lock, Upload, 
  ArrowRight, Check, Search
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function SchoolCrest() {
  return (
    <svg width="110" height="120" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      {/* Laurel Wreath Left */}
      <path d="M22,80 C12,65 14,35 25,20 C22,28 20,40 23,55 C25,65 30,75 35,82" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      <path d="M12,45 C15,48 20,48 22,43" stroke="#d97706" strokeWidth="1.5" />
      <path d="M14,58 C18,60 22,58 23,53" stroke="#d97706" strokeWidth="1.5" />
      <path d="M18,70 C22,72 26,68 26,63" stroke="#d97706" strokeWidth="1.5" />
      
      {/* Laurel Wreath Right */}
      <path d="M98,80 C108,65 106,35 95,20 C98,28 100,40 97,55 C95,65 90,75 85,82" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      <path d="M108,45 C105,48 100,48 98,43" stroke="#d97706" strokeWidth="1.5" />
      <path d="M106,58 C102,60 98,58 97,53" stroke="#d97706" strokeWidth="1.5" />
      <path d="M102,70 C98,72 94,68 94,63" stroke="#d97706" strokeWidth="1.5" />

      {/* Main Shield */}
      <path d="M60,10 C85,10 95,20 95,55 C95,85 60,110 60,110 C60,110 25,85 25,55 C25,20 35,10 60,10 Z" fill="#064e3b" stroke="#fbbf24" strokeWidth="3" />
      
      {/* Shield Inner Border */}
      <path d="M60,15 C81,15 90,24 90,54 C90,80 60,103 60,103 C60,103 30,80 30,54 C30,24 39,15 60,15 Z" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />

      {/* Gold Ribbon Banner at bottom */}
      <path d="M15,100 Q60,115 105,100 L100,90 Q60,103 20,90 Z" fill="#b45309" stroke="#fbbf24" strokeWidth="1.5" />
      {/* Ribbon Tails */}
      <path d="M15,100 L5,108 L18,105 Z" fill="#78350f" />
      <path d="M105,100 L115,108 L102,105 Z" fill="#78350f" />
      
      {/* Ribbon Text */}
      <text x="60" y="99" fill="#fef08a" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.3">ROOTED IN KNOWLEDGE</text>

      {/* Tree of Knowledge */}
      <path d="M57,68 L57,55 Q57,52 60,52 Q63,52 63,55 L63,68 Z" fill="#d97706" />
      <circle cx="60" cy="42" r="12" fill="#15803d" />
      <circle cx="53" cy="46" r="9" fill="#166534" />
      <circle cx="67" cy="46" r="9" fill="#166534" />
      <circle cx="60" cy="35" r="9" fill="#166534" />
      
      {/* Book Symbol at base of tree */}
      <path d="M48,68 Q60,73 72,68 L72,60 Q60,65 48,60 Z" fill="#fbbf24" />
      <path d="M60,62.5 L60,69.5" stroke="#064e3b" strokeWidth="1" />
      <path d="M49,61 L49,67" stroke="#78350f" strokeWidth="1" />
      <path d="M71,61 L71,67" stroke="#78350f" strokeWidth="1" />
      
      {/* Small Stars */}
      <polygon points="45,28 47,31 51,31 48,33 49,37 45,35 41,37 42,33 39,31 43,31" fill="#fbbf24" />
      <polygon points="75,28 77,31 81,31 78,33 79,37 75,35 71,37 72,33 69,31 73,31" fill="#fbbf24" />
    </svg>
  );
}

export default function OrganizationsView() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [academicSession, setAcademicSession] = useState('2026-27');
  const [staffSearch, setStaffSearch] = useState('');
  const [selectedStaffCategory, setSelectedStaffCategory] = useState('All');

  const tabs = [
    'Overview', 
    'Settings', 
    'Features', 
    'Rules & Policies', 
    'Staff Management', 
    'Departments', 
    'Activity Logs'
  ];

  // Stats Card data
  const stats = [
    { label: 'Total Staff', value: '128', description: 'Active employees', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.08)', icon: Users },
    { label: 'Departments', value: '8', description: 'Across organization', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.08)', icon: Layers },
    { label: 'Features Enabled', value: '24', description: 'Across modules', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.08)', icon: Layers },
    { label: 'Active Policies', value: '12', description: 'Organization rules', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.08)', icon: Shield }
  ];

  // Quick Actions
  const quickActions = [
    { label: 'Add New Staff', icon: UserPlus, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.08)' },
    { label: 'Create Department', icon: Layers, color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.08)' },
    { label: 'Manage Features', icon: Layers, color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.08)' },
    { label: 'Add New Policy', icon: Shield, color: '#f97316', bgColor: 'rgba(249, 115, 22, 0.08)' },
    { label: 'Role Management', icon: Lock, color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.08)' },
    { label: 'Import Staff', icon: Upload, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.08)' },
  ];

  // System Usage Donut Chart Data
  const usageData = [
    { name: 'People', value: 78, color: '#2563eb' },
    { name: 'Storage', value: 62, color: '#8b5cf6' },
    { name: 'Features', value: 68, color: '#10b981' },
    { name: 'Bandwidth', value: 55, color: '#ec4899' },
  ];

  // Staff members categories count
  const staffCategories = [
    { label: 'All', count: 128 },
    { label: 'Teaching', count: 72 },
    { label: 'Non-Teaching', count: 45 },
    { label: 'Admin', count: 11 }
  ];

  // Mock staff list matching the screenshot
  const staffList = [
    { name: 'Arvind Sharma', email: 'arvind.sharma@greenwood.edu.in', role: 'Physics Teacher', department: 'Academics', status: 'Active', category: 'Teaching' },
    { name: 'Neha Verma', email: 'neha.verma@greenwood.edu.in', role: 'Accountant', department: 'Finance', status: 'Active', category: 'Admin' },
    { name: 'Rohit Singh', email: 'rohit.singh@greenwood.edu.in', role: 'Transport Incharge', department: 'Transport', status: 'Active', category: 'Non-Teaching' },
    { name: 'Pooja Patel', email: 'pooja.patel@greenwood.edu.in', role: 'English Teacher', department: 'Academics', status: 'Active', category: 'Teaching' }
  ];

  // Recent activity logs matching mockup
  const activities = [
    { text: 'New staff member Arvind Sharma added', author: 'By Somraj Lodhi', time: '10 mins ago', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.08)', icon: UserPlus },
    { text: 'Feature "Hostel Management" enabled', author: 'By Somraj Lodhi', time: '1 hour ago', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.08)', icon: Layers },
    { text: 'Policy "Leave Management" updated', author: 'By Somraj Lodhi', time: '3 hours ago', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.08)', icon: Shield },
    { text: 'Staff member Neha Verma role updated', author: 'By Somraj Lodhi', time: '5 hours ago', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.08)', icon: Users }
  ];

  const filteredStaff = staffList.filter(staff => {
    const matchesCategory = selectedStaffCategory === 'All' || staff.category === selectedStaffCategory;
    const matchesSearch = staff.name.toLowerCase().includes(staffSearch.toLowerCase()) || 
                          staff.email.toLowerCase().includes(staffSearch.toLowerCase()) ||
                          staff.role.toLowerCase().includes(staffSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-primary)', fontFamily: 'var(--font-sans)', overflowY: 'auto' }}>
      
      {/* TOP HEADER TAB NAV */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '56px',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-primary)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        flexShrink: 0
      }}>
        {/* Tabs Left */}
        <div style={{ display: 'flex', gap: '8px', height: '100%', alignItems: 'center' }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  height: '100%',
                  padding: '0 16px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent-blue)' : '2px solid transparent',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Academic Session Selector Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-primary)',
            background: 'var(--bg-secondary)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}>
            <Calendar size={14} style={{ color: 'var(--text-tertiary)' }} />
            <span>Academic Session: {academicSession}</span>
            <ChevronDown size={12} style={{ color: 'var(--text-tertiary)', marginLeft: '4px' }} />
          </div>
        </div>
      </div>

      {/* RENDER VIEW AREA */}
      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {activeTab !== 'Overview' ? (
          /* Placeholder View for other tabs */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '80px 24px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            minHeight: '400px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: 'var(--text-tertiary)'
            }}>
              <Building size={32} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>
              {activeTab} Settings
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '400px', margin: 0, lineHeight: 1.5 }}>
              The data models and settings for the {activeTab.toLowerCase()} module are currently being mapped to the Greenwood Public School administrative directory node.
            </p>
          </div>
        ) : (
          /* OVERVIEW DASHBOARD VIEW (MAIN VIEW) */
          <>
            {/* STATS ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <div 
                    key={idx} 
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: '12px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      backgroundColor: stat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color,
                      flexShrink: 0
                    }}>
                      <StatIcon size={20} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                        {stat.value}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                        {stat.label}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {stat.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MIDDLE ROW (ORGANIZATION INFO, QUICK ACTIONS, SYSTEM USAGE) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '20px' }}>
              
              {/* CARD 1: Organization Information */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Organization Information
                  </h3>
                  <button style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-primary)',
                    background: 'var(--bg-primary)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                  >
                    <Edit size={12} /> Edit
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  {/* Crest Logo */}
                  <SchoolCrest />

                  {/* Info Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                    <div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>Organization Name</div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginTop: '2px', fontSize: '13px' }}>Greenwood Public School</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>Established</div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>2015</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>Organization Type</div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>School</div>
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>Address</div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500, marginTop: '2px', lineHeight: 1.4 }}>
                        45, Education Avenue, Knowledge City, Bhopal, Madhya Pradesh - 462001
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                      <div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>Contact</div>
                        <div style={{ color: 'var(--accent-blue)', fontWeight: 500, marginTop: '2px' }}>hello@greenwood.edu.in</div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 500, marginTop: '1px' }}>+91 98765 43210</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>Website</div>
                        <a href="https://www.greenwood.edu.in" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'none', marginTop: '2px', display: 'inline-block' }}>
                          www.greenwood.edu.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: Quick Actions */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', marginTop: 0 }}>
                  Quick Actions
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', flex: 1 }}>
                  {quickActions.map((action, idx) => {
                    const ActionIcon = action.icon;
                    return (
                      <div 
                        key={idx}
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: '8px',
                          padding: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.2s ease-in-out'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'var(--accent-blue)';
                          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--border-primary)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: action.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: action.color
                        }}>
                          <ActionIcon size={16} />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {action.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CARD 3: System Usage */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', marginTop: 0 }}>
                  System Usage
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flex: 1, padding: '10px 0' }}>
                  {/* Donut Chart */}
                  <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageData}
                          innerRadius={45}
                          outerRadius={60}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {usageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Inner Label */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      pointerEvents: 'none'
                    }}>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>78%</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: '2px' }}>Used</div>
                    </div>
                  </div>

                  {/* Legend list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    {usageData.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }} />
                          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{item.name}</span>
                        </div>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-primary)', paddingTop: '12px', marginTop: '8px' }}>
                  <a href="#detailed-analytics" style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    View detailed analytics <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* BOTTOM ROW (STAFF MEMBERS, RECENT ACTIVITY) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '20px' }}>
              
              {/* LEFT COLUMN: Staff Members List */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Staff Members
                  </h3>
                  
                  {/* Search and Add Button */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '220px' }}>
                      <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        placeholder="Search staff..." 
                        value={staffSearch}
                        onChange={e => setStaffSearch(e.target.value)}
                        style={{
                          width: '100%',
                          height: '32px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-primary)',
                          backgroundColor: 'var(--bg-primary)',
                          padding: '0 10px 0 32px',
                          fontSize: '11px',
                          outline: 'none',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>
                    <button style={{
                      height: '32px',
                      padding: '0 12px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--accent-blue)',
                      color: 'white',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}>
                      Add Staff
                    </button>
                  </div>
                </div>

                {/* Sub-tabs count filters */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-primary)', paddingBottom: '1px', gap: '4px' }}>
                  {staffCategories.map(cat => {
                    const isSelected = selectedStaffCategory === cat.label;
                    return (
                      <button
                        key={cat.label}
                        onClick={() => setSelectedStaffCategory(cat.label)}
                        style={{
                          padding: '6px 12px',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: isSelected ? '2px solid var(--accent-blue)' : '2px solid transparent',
                          color: isSelected ? 'var(--accent-blue)' : 'var(--text-secondary)',
                          fontSize: '11px',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          outline: 'none'
                        }}
                      >
                        <span>{cat.label}</span>
                        <span style={{
                          fontSize: '9px',
                          padding: '1px 5px',
                          borderRadius: '10px',
                          background: isSelected ? 'var(--accent-blue-dim)' : 'var(--bg-tertiary)',
                          color: isSelected ? 'var(--accent-blue)' : 'var(--text-tertiary)',
                          fontWeight: 700
                        }}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Staff Directory Table */}
                <div style={{ overflowX: 'auto', border: '1px solid var(--border-primary)', borderRadius: '8px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-primary)' }}>
                        <th style={{ padding: '10px 12px', fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Staff Name</th>
                        <th style={{ padding: '10px 12px', fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                        <th style={{ padding: '10px 12px', fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</th>
                        <th style={{ padding: '10px 12px', fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                        <th style={{ padding: '10px 12px', fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.map((staff, idx) => (
                        <tr 
                          key={idx} 
                          style={{ 
                            borderBottom: idx === filteredStaff.length - 1 ? 'none' : '1px solid var(--border-primary)',
                            transition: 'background var(--transition-fast)'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {/* Name and avatar */}
                          <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--accent-blue-dim)',
                                color: 'var(--accent-blue)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                fontWeight: 700
                              }}>
                                {staff.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{staff.name}</span>
                                <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{staff.email}</span>
                              </div>
                            </div>
                          </td>
                          {/* Role */}
                          <td style={{ padding: '10px 12px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, verticalAlign: 'middle' }}>
                            {staff.role}
                          </td>
                          {/* Department */}
                          <td style={{ padding: '10px 12px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, verticalAlign: 'middle' }}>
                            {staff.department}
                          </td>
                          {/* Status */}
                          <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                            <span className="badge badge-active">{staff.status}</span>
                          </td>
                          {/* Actions */}
                          <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <button style={{
                                padding: '4px',
                                borderRadius: '4px',
                                border: '1px solid var(--border-primary)',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer'
                              }}>
                                <Edit size={12} />
                              </button>
                              <button style={{
                                padding: '4px',
                                borderRadius: '4px',
                                border: '1px solid rgba(239, 68, 68, 0.15)',
                                background: 'transparent',
                                color: 'var(--accent-red)',
                                cursor: 'pointer'
                              }}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredStaff.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                            No staff members found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Pagination */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  <span>Showing 1 to {filteredStaff.length} of 128 staff members</span>
                  
                  {/* Pagination control */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button style={{ padding: '4px', borderRadius: '4px', border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <ChevronLeft size={12} />
                    </button>
                    <button style={{ width: '22px', height: '22px', borderRadius: '4px', border: 'none', background: 'var(--accent-blue)', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '10px' }}>
                      1
                    </button>
                    <button style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '10px' }}>
                      2
                    </button>
                    <button style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '10px' }}>
                      3
                    </button>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '0 2px' }}>...</span>
                    <button style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '10px' }}>
                      32
                    </button>
                    <button style={{ padding: '4px', borderRadius: '4px', border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Recent Activity */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Recent Activity
                  </h3>
                  <button style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-primary)',
                    background: 'var(--bg-primary)',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                  >
                    View All
                  </button>
                </div>

                {/* Activity log list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  {activities.map((act, idx) => {
                    const ActIcon = act.icon;
                    return (
                      <div 
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-primary)',
                          background: 'var(--bg-primary)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-muted)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: act.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: act.color,
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          <ActIcon size={14} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '2px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                            {act.text}
                          </span>
                          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                            {act.author}
                          </span>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                            {act.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </>
        )}

      </div>

    </div>
  );
}
