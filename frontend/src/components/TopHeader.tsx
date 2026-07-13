'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export default function TopHeader() {
  const { openTab, setFinanceSubView, setExamsSubView, setSettingsSubView } = useAppStore();

  // Active item states
  const [activeL1, setActiveL1] = useState<string>('Student');
  const [activeL2, setActiveL2] = useState<string>('Student List');
  const [activeL3, setActiveL3] = useState<string>('Scheduler');
  
  // Dropdown visibility states
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showExamDropdown, setShowExamDropdown] = useState(false);
  const [showFinanceDropdown, setShowFinanceDropdown] = useState(false);

  const helpButtonRef = useRef<HTMLButtonElement>(null);
  const helpDropdownRef = useRef<HTMLDivElement>(null);
  
  const adminButtonRef = useRef<HTMLButtonElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);

  const examButtonRef = useRef<HTMLButtonElement>(null);
  const examDropdownRef = useRef<HTMLDivElement>(null);

  const financeButtonRef = useRef<HTMLButtonElement>(null);
  const financeDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        helpDropdownRef.current && 
        !helpDropdownRef.current.contains(event.target as Node) &&
        helpButtonRef.current &&
        !helpButtonRef.current.contains(event.target as Node)
      ) {
        setShowHelpDropdown(false);
      }
      
      if (
        adminDropdownRef.current && 
        !adminDropdownRef.current.contains(event.target as Node) &&
        adminButtonRef.current &&
        !adminButtonRef.current.contains(event.target as Node)
      ) {
        setShowAdminDropdown(false);
      }

      if (
        examDropdownRef.current && 
        !examDropdownRef.current.contains(event.target as Node) &&
        examButtonRef.current &&
        !examButtonRef.current.contains(event.target as Node)
      ) {
        setShowExamDropdown(false);
      }

      if (
        financeDropdownRef.current && 
        !financeDropdownRef.current.contains(event.target as Node) &&
        financeButtonRef.current &&
        !financeButtonRef.current.contains(event.target as Node)
      ) {
        setShowFinanceDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Renamed L1 items as requested: View -> Exam, Patient -> Student, Clinical -> Finance
  const row1Items = ['Home', 'Exam', 'Student', 'Finance', 'Tools', 'Notifications', 'Admin', 'Help'];

  // Exact Row 2 items from picture
  const row2Items = [
    'Message Center', 'Student List', 'Transfer Request', 'Admission List', 
    'Attendance List', 'MySchool', 'Reports', 'UpToDate', 'Report Card', 'Protocol Library'
  ];

  // Exact Row 3 items from picture
  const row3Items = [
    'Dashboard', 'Scheduler', 'Student Decision Support', 'Courses', 
    'C&D', 'Examination Dashboard', 'Faculty', 'Executive Dashboard', 'Analytics'
  ];

  const handleL2Click = (item: string) => {
    setActiveL2(item);
    
    switch (item) {
      case 'Message Center':
        openTab({ id: 'communication', label: 'Message Center', view: 'communication', closable: true });
        break;
      case 'Student List':
        openTab({ id: 'students', label: 'Student List', view: 'students', closable: false });
        break;
      case 'Transfer Request':
        openTab({ id: 'transfers', label: 'Transfer Request', view: 'transfers', closable: true });
        break;
      case 'Admission List':
        openTab({ id: 'admissions', label: 'Admission List', view: 'admissions', closable: true });
        break;
      case 'Attendance List':
        openTab({ id: 'attendance', label: 'Attendance List', view: 'attendance', closable: true });
        break;
      case 'MySchool':
        openTab({ id: 'profile', label: 'MySchool', view: 'profile', closable: true });
        break;
      case 'Reports':
        openTab({ id: 'reports', label: 'Reports', view: 'reports', closable: true });
        break;
      case 'UpToDate':
        openTab({ id: 'library', label: 'UpToDate', view: 'library', closable: true });
        break;
      case 'Report Card':
        openTab({ id: 'student-report-card', label: 'Report Card', view: 'student-report-card', closable: true });
        break;
      case 'Protocol Library':
        openTab({ id: 'documents', label: 'Protocol Library', view: 'documents', closable: true });
        break;
    }
  };

  const handleL3Click = (item: string) => {
    setActiveL3(item);

    switch (item) {
      case 'Dashboard':
        openTab({ id: 'dashboard', label: 'Dashboard', view: 'dashboard', closable: false });
        break;
      case 'Scheduler':
        openTab({ id: 'timetable', label: 'Scheduler', view: 'timetable', closable: true });
        break;
      case 'Student Decision Support':
        openTab({ id: 'gradebook', label: 'Student Decision Support', view: 'gradebook', closable: true });
        break;
      case 'Courses':
        openTab({ id: 'courses', label: 'Courses', view: 'courses', closable: true });
        break;
      case 'C&D':
        openTab({ id: 'classes', label: 'C&D', view: 'classes', closable: true });
        break;
      case 'Examination Dashboard':
        openTab({ id: 'exams', label: 'Examination Dashboard', view: 'exams', closable: true });
        setExamsSubView('exams-dashboard');
        break;
      case 'Faculty':
        openTab({ id: 'teachers', label: 'Faculty', view: 'teachers', closable: true });
        break;
      case 'Executive Dashboard':
        openTab({ id: 'finance', label: 'Executive Dashboard', view: 'finance', closable: true });
        setFinanceSubView('finance-dashboard');
        break;
      case 'Analytics':
        openTab({ id: 'audit', label: 'Analytics', view: 'audit', closable: true });
        break;
    }
  };

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      fontFamily: 'Arial, Helvetica, sans-serif',
      boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
      zIndex: 110,
    }}>
      {/* LEVEL 1: Compact Light blue/grey background, slate blue text */}
      <div style={{
        height: '24px',
        backgroundColor: '#ebf3f9',
        borderBottom: '1px solid #d2dfea',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '100%' }}>
          {row1Items.map((item) => {
            const isActive = activeL1 === item;
            
            // Render Exam button with Dropdown trigger
            if (item === 'Exam') {
              return (
                <button
                  key={item}
                  ref={examButtonRef}
                  onClick={() => {
                    setActiveL1('Exam');
                    setShowExamDropdown(!showExamDropdown);
                    setShowHelpDropdown(false);
                    setShowAdminDropdown(false);
                  }}
                  style={{
                    height: '100%',
                    padding: '0 8px',
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#0f2c59' : '#5c6f84',
                    fontSize: '11px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 120ms',
                  }}
                >
                  {item}
                </button>
              );
            }

            // Render Help button with Dropdown trigger
            if (item === 'Help') {
              return (
                <button
                  key={item}
                  ref={helpButtonRef}
                  onClick={() => {
                    setActiveL1('Help');
                    setShowHelpDropdown(!showHelpDropdown);
                    setShowAdminDropdown(false);
                    setShowExamDropdown(false);
                  }}
                  style={{
                    height: '100%',
                    padding: '0 8px',
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#0f2c59' : '#5c6f84',
                    fontSize: '11px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 120ms',
                  }}
                >
                  {item}
                </button>
              );
            }

            // Render Admin button with Dropdown trigger
            if (item === 'Admin') {
              return (
                <button
                  key={item}
                  ref={adminButtonRef}
                  onClick={() => {
                    setActiveL1('Admin');
                    setShowAdminDropdown(!showAdminDropdown);
                    setShowHelpDropdown(false);
                    setShowExamDropdown(false);
                  }}
                  style={{
                    height: '100%',
                    padding: '0 8px',
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#0f2c59' : '#5c6f84',
                    fontSize: '11px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 120ms',
                  }}
                >
                  {item}
                </button>
              );
            }

            // Render Finance button with Dropdown trigger
            if (item === 'Finance') {
              return (
                <button
                  key={item}
                  ref={financeButtonRef}
                  onClick={() => {
                    setActiveL1('Finance');
                    setShowFinanceDropdown(!showFinanceDropdown);
                    setShowHelpDropdown(false);
                    setShowAdminDropdown(false);
                    setShowExamDropdown(false);
                  }}
                  style={{
                    height: '100%',
                    padding: '0 8px',
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#0f2c59' : '#5c6f84',
                    fontSize: '11px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 120ms',
                  }}
                >
                  {item}
                </button>
              );
            }

            return (
              <button
                key={item}
                onClick={() => {
                  setActiveL1(item);
                  setShowHelpDropdown(false);
                  setShowAdminDropdown(false);
                  setShowExamDropdown(false);
                  setShowFinanceDropdown(false);
                  if (item === 'Notifications') {
                    openTab({ id: 'notifications', label: 'Notifications', view: 'notifications', closable: true });
                  }
                }}
                style={{
                  height: '100%',
                  padding: '0 8px',
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#0f2c59' : '#5c6f84',
                  fontSize: '11px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 120ms',
                }}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* BRIGHT THEME DROPDOWN CARD FOR FINANCE TAB */}
        {showFinanceDropdown && (
          <div 
            ref={financeDropdownRef}
            style={{
              position: 'absolute',
              top: '24px',
              left: '148px', // Align absolutely under the Finance button
              width: '185px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
              padding: '4px 0',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 999,
            }}
          >
            {[
              { label: 'Fees collection', subView: 'finance-fee-collection' },
              { label: 'Defaulter & Recovery', subView: 'finance-defaulters' },
              { label: 'Revenue Analytics', subView: 'finance-revenue' },
              { label: 'Payroll', subView: 'finance-payroll' },
              { label: 'Financial Report', subView: 'finance-reports' }
            ].map((opt) => (
              <div 
                key={opt.subView}
                onClick={() => {
                  openTab({ id: 'finance', label: 'Executive Dashboard', view: 'finance', closable: true });
                  setFinanceSubView(opt.subView as any);
                  setShowFinanceDropdown(false);
                }}
                style={{
                  padding: '6px 12px',
                  fontSize: '11.5px',
                  color: '#334155',
                  cursor: 'pointer',
                  transition: 'background-color 100ms',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}

        {/* BRIGHT THEME DROPDOWN CARD FOR EXAM TAB */}
        {showExamDropdown && (
          <div 
            ref={examDropdownRef}
            style={{
              position: 'absolute',
              top: '24px',
              left: '52px', // Align absolutely under the Exam button
              width: '185px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
              padding: '4px 0',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 999,
            }}
          >
            {[
              { label: 'Examination Planning', subView: 'exams-planning' },
              { label: 'Exam Schedule Center', subView: 'exams-schedule' },
              { label: 'Hall & Seating Management', subView: 'exams-hall-seating' },
              { label: 'Admit Card Center', subView: 'exams-admit-card' },
              { label: 'Attendance & Invigilation', subView: 'exams-attendance-invigilation' },
              { label: 'Question Paper Vault', subView: 'exams-question-vault' }
            ].map((opt) => (
              <div 
                key={opt.subView}
                onClick={() => {
                  openTab({ id: 'exams', label: 'Exams & Grading', view: 'exams', closable: true });
                  setExamsSubView(opt.subView as any);
                  setShowExamDropdown(false);
                }}
                style={{
                  padding: '6px 12px',
                  fontSize: '11.5px',
                  color: '#334155',
                  cursor: 'pointer',
                  transition: 'background-color 100ms',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}

        {/* BRIGHT THEME DROPDOWN CARD FOR ADMIN TAB */}
        {showAdminDropdown && (
          <div 
            ref={adminDropdownRef}
            style={{
              position: 'absolute',
              top: '24px',
              left: '210px', // Align absolutely under the Admin button
              width: '180px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
              padding: '4px 0',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 999,
            }}
          >
            {/* Section 1: Institution settings */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div 
                onClick={() => { openTab({ id: 'settings', label: 'Settings', view: 'settings', closable: true }); setSettingsSubView('Institution'); setShowAdminDropdown(false); }}
                style={{ padding: '5px 12px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Institution Settings
              </div>
              <div 
                onClick={() => { openTab({ id: 'edit-institute', label: 'Edit Institute', view: 'edit-institute', closable: true }); setShowAdminDropdown(false); }}
                style={{ padding: '5px 12px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Edit Institute Wizard
              </div>
              <div 
                onClick={() => { openTab({ id: 'organizations', label: 'Organizations', view: 'organizations', closable: true }); setShowAdminDropdown(false); }}
                style={{ padding: '5px 12px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Organizations Manager
              </div>
            </div>

            {/* Separator */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

            {/* Section 2: Profiles */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div 
                onClick={() => { openTab({ id: 'profile', label: 'Profile', view: 'profile', closable: true }); setShowAdminDropdown(false); }}
                style={{ padding: '5px 12px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                User Profiles
              </div>
              <div 
                onClick={() => { openTab({ id: 'settings', label: 'Settings', view: 'settings', closable: true }); setSettingsSubView('Users & Roles'); setShowAdminDropdown(false); }}
                style={{ padding: '5px 12px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Role Allocations
              </div>
            </div>

            {/* Separator */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

            {/* Section 3: Parameters */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div 
                onClick={() => { openTab({ id: 'settings', label: 'Settings', view: 'settings', closable: true }); setSettingsSubView('Academics'); setShowAdminDropdown(false); }}
                style={{ padding: '5px 12px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                System Parameters
              </div>
              <div 
                onClick={() => { openTab({ id: 'settings', label: 'Settings', view: 'settings', closable: true }); setSettingsSubView('Automation'); setShowAdminDropdown(false); }}
                style={{ padding: '5px 12px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Feature Flags
              </div>
            </div>

            {/* Separator */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

            {/* Section 4: Security logs */}
            <div 
              onClick={() => { openTab({ id: 'audit', label: 'Audit Trail', view: 'audit', closable: true }); setShowAdminDropdown(false); }}
              style={{ padding: '5px 12px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Security Audit Log
            </div>

            {/* Separator */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

            {/* Section 5: Engine Logs */}
            <div 
              onClick={() => { openTab({ id: 'system-logs', label: 'System Logs', view: 'system-logs', closable: true }); setShowAdminDropdown(false); }}
              style={{ padding: '5px 12px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              System Engine Logs
            </div>
          </div>
        )}

        {/* BRIGHT THEME DROPDOWN CARD FOR HELP TAB */}
        {showHelpDropdown && (
          <div 
            ref={helpDropdownRef}
            style={{
              position: 'absolute',
              top: '24px',
              left: '260px', // Align roughly under the Help button
              width: '180px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
              padding: '4px 0',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 999,
            }}
          >
            {/* Group 1 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {['Welcome', 'Show All Commands', 'Editor Playground', 'Open Walkthrough...', 'Provide Feedback', 'Download Diagnostics'].map((action) => (
                <div 
                  key={action}
                  onClick={() => setShowHelpDropdown(false)}
                  style={{
                    padding: '5px 12px',
                    fontSize: '11.5px',
                    color: '#334155',
                    cursor: 'pointer',
                    transition: 'background-color 100ms',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {action}
                </div>
              ))}
            </div>

            {/* Separator */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

            {/* Group 2 */}
            <div 
              onClick={() => setShowHelpDropdown(false)}
              style={{
                padding: '5px 12px',
                fontSize: '11.5px',
                color: '#334155',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              View License
            </div>

            {/* Separator */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

            {/* Group 3 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {['Toggle Developer Tools', 'Open Process Explorer'].map((action) => (
                <div 
                  key={action}
                  onClick={() => {
                    setShowHelpDropdown(false);
                    if (action === 'Toggle Developer Tools') {
                      openTab({ id: 'dev-tools', label: 'Developer Tools', view: 'dev-tools', closable: true });
                    }
                  }}
                  style={{
                    padding: '5px 12px',
                    fontSize: '11.5px',
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {action}
                </div>
              ))}
            </div>

            {/* Separator */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

            {/* Group 4 */}
            <div 
              onClick={() => setShowHelpDropdown(false)}
              style={{
                padding: '5px 12px',
                fontSize: '11.5px',
                color: '#334155',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Check for Updates...
            </div>

            {/* Separator */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

            {/* Group 5 */}
            <div 
              onClick={() => setShowHelpDropdown(false)}
              style={{
                padding: '5px 12px',
                fontSize: '11.5px',
                color: '#334155',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              About
            </div>
          </div>
        )}
      </div>

      {/* LEVEL 2: Compact Pure White background, active item in teal */}
      <div style={{
        height: '28px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #d2dfea',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '100%' }}>
          {row2Items.map((item) => {
            const isActive = activeL2 === item;
            return (
              <button
                key={item}
                onClick={() => handleL2Click(item)}
                style={{
                  height: '100%',
                  padding: '0 10px',
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#007f7c' : '#5c6f84',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 120ms',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* LEVEL 3: Compact cool light grey background */}
      <div style={{
        height: '24px',
        backgroundColor: '#eef2f6',
        borderBottom: '1px solid #c8d7e6',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '100%' }}>
          {row3Items.map((item) => {
            const isActive = activeL3 === item;
            return (
              <button
                key={item}
                onClick={() => handleL3Click(item)}
                style={{
                  height: '100%',
                  padding: '0 8px',
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#1a202c' : '#718096',
                  fontSize: '11px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 120ms',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
