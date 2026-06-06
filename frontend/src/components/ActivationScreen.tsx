'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore, AppView } from '@/lib/store';
import { api } from '@/lib/api';
import { 
  Check, Activity, Shield, Mail, Key, ChevronRight, 
  Users, GraduationCap, DollarSign, Building, Clipboard, Layers
} from 'lucide-react';

export default function ActivationScreen() {
  const activate = useAppStore(s => s.activate);
  const login = useAppStore(s => s.login);

  // Flow State
  const [step, setStep] = useState(1); // 1 = Credentials, 2 = Select Role
  const [activeTab, setActiveTab] = useState<'id' | 'email' | 'key'>('id');

  // Input states
  const [institutionId, setInstitutionId] = useState('springfield-public-school');
  const [adminEmail, setAdminEmail] = useState('principal@school.edu');
  const [licenseKey, setLicenseKey] = useState('ACDX-XXXX-XXXX-XXXX');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Live status ticker values simulation
  const [admissionsToday, setAdmissionsToday] = useState(18492);
  const [docsProcessed, setDocsProcessed] = useState(1248912);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data stream updates
      setAdmissionsToday(prev => prev + Math.floor(Math.random() * 3));
      setDocsProcessed(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    setError('');
    setIsLoading(true);
    // Simulate network latency for authenticating/attesting
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  const handleRoleSelect = (roleName: string) => {
    // Map selected profile role to user credentials
    const roleMappings: Record<string, { name: string; email: string; role: string }> = {
      'admin': { name: 'Dr. Priya Sharma', email: 'admin@dps.edu', role: 'Institution Administrator' },
      'principal': { name: 'Dr. Meena Shah', email: 'principal@dps.edu', role: 'Principal / Director' },
      'coordinator': { name: 'Mrs. Anita Desai', email: 'coordinator@dps.edu', role: 'Academic Coordinator' },
      'teacher': { name: 'Mr. Rajiv Saxena', email: 'teacher@dps.edu', role: 'Teacher' },
      'finance': { name: 'Mr. Sunil Rao', email: 'finance@dps.edu', role: 'Finance Officer' },
      'admissions': { name: 'Mrs. Kavita Menon', email: 'admissions@dps.edu', role: 'Admissions Officer' },
      'student': { name: 'Arjun Mehta', email: 'student@dps.edu', role: 'Student' },
      'parent': { name: 'Mr. Rajesh Mehta', email: 'parent@dps.edu', role: 'Parent' },
    };

    const info = roleMappings[roleName] || roleMappings['admin'];

    // Activate the instance and authenticate
    activate('tenant-demo-dps');
    login({
      id: `usr-${roleName}-001`,
      name: info.name,
      email: info.email,
      role: info.role,
      institution: 'Delhi Public School, R.K. Puram'
    });
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      background: '#070B14',
      color: '#F8FAFC',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
    }}>
      {/* 1. LEFT SIDE: BRAND, VISION & TELEMETRY */}
      <div style={{
        flex: 1.1,
        padding: '48px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        background: 'radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.04) 0%, transparent 60%)',
      }}>
        {/* Header Logo */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '6px',
              background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', fontWeight: 800, fontSize: '16px'
            }}>
              A
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center' }}>
              <span>ACAD</span>
              <span style={{ color: '#06B6D4' }}>Ex</span>
            </div>
          </div>
          <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#94A3B8', fontWeight: 700 }}>
            Educational Operations Environment
          </div>
        </div>

        {/* Vision, Headline & Capability List */}
        <div style={{ margin: '40px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: 0, color: '#F8FAFC' }}>
              Academic Operations<br />Command Center
            </h1>
            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, marginTop: '12px', maxWidth: '480px' }}>
              Enterprise-grade operating environment for schools, colleges, universities, coaching institutes, and educational networks.
            </p>
            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, marginTop: '8px', maxWidth: '480px' }}>
              Real-time institutional intelligence, unified administration, academic workflows, and ecosystem connectivity.
            </p>
          </div>

          {/* Capability Checklist */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', maxWidth: '520px' }}>
            {[
              'Multi-window workspace environment',
              'Unified Admissions & Enrollment Engine',
              'Academic Operations Intelligence',
              'Student Lifecycle Management',
              'Finance & Fee Operations',
              'Staff & Workforce Management',
              'AI-Powered Academic Analytics',
              'Cloud-Synchronized Institutional Data',
              'Government & Compliance Integration'
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
                <span style={{
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: 'rgba(6, 182, 212, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#06B6D4', flexShrink: 0
                }}>
                  <Check size={9} strokeWidth={3} />
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bloomberg-Style Institutional Ticker Panel */}
        <div style={{
          background: 'rgba(14, 21, 37, 0.6)',
          border: '1px solid rgba(59, 130, 246, 0.15)',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: '#94A3B8',
          maxWidth: '440px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            fontSize: '9px', fontWeight: 800, color: '#3B82F6',
            letterSpacing: '0.08em', marginBottom: '10px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            paddingBottom: '4px'
          }}>
            INSTITUTIONAL METRIC NETWORK
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Connected Institutions</span>
              <strong style={{ color: '#F8FAFC' }}>12,487</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Active Students</span>
              <strong style={{ color: '#F8FAFC' }}>8.4 Million</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Teachers</span>
              <strong style={{ color: '#F8FAFC' }}>512,000</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Today's Admissions</span>
              <strong style={{ color: '#06B6D4' }}>{admissionsToday.toLocaleString('en-US')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Documents Processed</span>
              <strong style={{ color: '#F8FAFC' }}>{docsProcessed.toLocaleString('en-US')}</strong>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: '6px', marginTop: '4px'
            }}>
              <span>System status</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', fontWeight: 700 }}>
                <span className="blink-dot" style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#10B981', display: 'inline-block'
                }} />
                Operational
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: '24px', fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
          <span>Version 1.0.0</span>
          <span>Build 2026.01</span>
        </div>
      </div>

      {/* 2. RIGHT SIDE: ACTIVATION / ROLE SELECTION PANEL */}
      <div style={{
        flex: 0.9,
        background: '#0E1525',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.15)'
      }}>
        {/* Glow Element */}
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ width: '100%', maxWidth: '460px', animation: 'fadeInUp 0.4s ease' }}>
          
          {/* STEP 1: CREDENTIALS ACTIVATION */}
          {step === 1 && (
            <div>
              {/* Step indicator */}
              <div style={{ display: 'flex', gap: '16px', fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '28px' }}>
                <span style={{ color: '#3B82F6', display: 'flex', alignItems: 'center', gap: '4px' }}>● Institution</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>○ License</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>○ Administrator</span>
              </div>

              {/* Title & Description */}
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em', color: '#F8FAFC' }}>
                  Activate Institution
                </h2>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                  Enter your institutional credentials to activate the Acadex Environment.
                </p>
              </div>

              {/* Toggle Option Tabs */}
              <div style={{
                display: 'flex',
                background: '#070B14',
                padding: '4px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                marginBottom: '24px'
              }}>
                {[
                  { id: 'id', label: 'Option 1: ID' },
                  { id: 'email', label: 'Option 2: Email' },
                  { id: 'key', label: 'Option 3: Key' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as any); setError(''); }}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      background: activeTab === tab.id ? '#0E1525' : 'transparent',
                      color: activeTab === tab.id ? '#3B82F6' : '#94A3B8',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Credential Forms */}
              <div style={{ minHeight: '120px' }}>
                {activeTab === 'id' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                        Institution ID
                      </label>
                      <div style={{ display: 'flex', gap: '8px', position: 'relative', alignItems: 'center' }}>
                        <Building size={14} style={{ position: 'absolute', left: '12px', color: '#94A3B8' }} />
                        <input
                          type="text"
                          value={institutionId}
                          onChange={e => setInstitutionId(e.target.value)}
                          className="input-field"
                          style={{
                            background: '#070B14',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            color: '#F8FAFC',
                            padding: '12px 12px 12px 34px',
                            fontSize: '13px',
                            width: '100%'
                          }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleContinue}
                      className="btn btn-primary"
                      style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600 }}
                    >
                      {isLoading ? 'Processing...' : 'Continue'} <ChevronRight size={14} />
                    </button>
                  </div>
                )}

                {activeTab === 'email' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                        Administrator Email
                      </label>
                      <div style={{ display: 'flex', gap: '8px', position: 'relative', alignItems: 'center' }}>
                        <Mail size={14} style={{ position: 'absolute', left: '12px', color: '#94A3B8' }} />
                        <input
                          type="email"
                          value={adminEmail}
                          onChange={e => setAdminEmail(e.target.value)}
                          className="input-field"
                          style={{
                            background: '#070B14',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            color: '#F8FAFC',
                            padding: '12px 12px 12px 34px',
                            fontSize: '13px',
                            width: '100%'
                          }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleContinue}
                      className="btn btn-primary"
                      style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600 }}
                    >
                      {isLoading ? 'Processing...' : 'Continue'} <ChevronRight size={14} />
                    </button>
                  </div>
                )}

                {activeTab === 'key' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                        Activation Key
                      </label>
                      <div style={{ display: 'flex', gap: '8px', position: 'relative', alignItems: 'center' }}>
                        <Key size={14} style={{ position: 'absolute', left: '12px', color: '#94A3B8' }} />
                        <input
                          type="text"
                          value={licenseKey}
                          onChange={e => setLicenseKey(e.target.value)}
                          className="input-field font-mono"
                          style={{
                            background: '#070B14',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            color: '#F8FAFC',
                            padding: '12px 12px 12px 34px',
                            fontSize: '13px',
                            width: '100%',
                            letterSpacing: '0.04em'
                          }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleContinue}
                      className="btn btn-primary"
                      style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600, background: '#06B6D4', borderColor: '#06B6D4' }}
                    >
                      {isLoading ? 'Authenticating...' : 'Activate'} <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT PROFILE ROLE */}
          {step === 2 && (
            <div style={{ animation: 'fadeInUp 0.3s ease' }}>
              {/* Step indicator */}
              <div style={{ display: 'flex', gap: '16px', fontSize: '10px', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '28px' }}>
                <span>● Institution</span>
                <span>● License</span>
                <span>● Administrator</span>
              </div>

              {/* Title & Description */}
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em', color: '#F8FAFC' }}>
                  Select Role
                </h2>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                  Choose your workspace profile
                </p>
              </div>

              {/* Role Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                maxHeight: '420px',
                overflowY: 'auto',
                paddingRight: '4px'
              }}>
                {[
                  { id: 'admin', title: 'Institution Administrator', desc: 'Manage operations, admissions, finance, compliance, staff, and governance.', icon: <Shield size={16} /> },
                  { id: 'principal', title: 'Principal / Director', desc: 'Institution leadership workspace.', icon: <Users size={16} /> },
                  { id: 'coordinator', title: 'Academic Coordinator', desc: 'Academic planning and monitoring workspace.', icon: <Layers size={16} /> },
                  { id: 'teacher', title: 'Teacher', desc: 'Teaching, attendance, assessments, and student engagement.', icon: <GraduationCap size={16} /> },
                  { id: 'finance', title: 'Finance Officer', desc: 'Fees, payroll, budgets, and accounting.', icon: <DollarSign size={16} /> },
                  { id: 'admissions', title: 'Admissions Officer', desc: 'Enrollment and admissions management.', icon: <Clipboard size={16} /> },
                  { id: 'student', title: 'Student', desc: 'Learning environment and academic progress.', icon: <GraduationCap size={16} /> },
                  { id: 'parent', title: 'Parent', desc: 'Student monitoring and communication workspace.', icon: <Users size={16} /> }
                ].map(r => (
                  <div
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id)}
                    style={{
                      background: '#070B14',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    className="role-card"
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#3B82F6';
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(59, 130, 246, 0.15)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3B82F6', fontWeight: 700, fontSize: '11px' }}>
                      {r.icon}
                      <span style={{ color: '#F8FAFC', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</span>
                    </div>
                    <p style={{ fontSize: '9px', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
                      {r.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Back Button */}
              <button
                onClick={() => setStep(1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >
                ← Back to credentials
              </button>
            </div>
          )}

        </div>
      </div>
      
      {/* Global CSS keyframes for blinking green status dot */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .blink-dot {
          animation: blink 2s infinite ease-in-out;
        }
        /* Custom scrollbar styling for role selector grid */
        div::-webkit-scrollbar {
          width: 4px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
