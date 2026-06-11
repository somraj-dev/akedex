'use client';

import React, { useState } from 'react';
import { 
  Building, BookOpen, UserPlus, Fingerprint, CalendarCheck, FileText, 
  Wallet, MessageSquare, Files, Users, Brain, Blocks, Shield, Palette, 
  Zap, Database, Activity, Save, CheckCircle, Upload, Lock, Settings 
} from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('Institution');
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const handleSave = () => {
    setSavedStatus('Settings saved successfully!');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  const tabs = [
    { id: 'Institution', icon: Building, label: 'Institution' },
    { id: 'Academics', icon: BookOpen, label: 'Academics' },
    { id: 'Admissions', icon: UserPlus, label: 'Admissions' },
    { id: 'Student Identity', icon: Fingerprint, label: 'Student Identity' },
    { id: 'Attendance', icon: CalendarCheck, label: 'Attendance' },
    { id: 'Examinations', icon: FileText, label: 'Examinations' },
    { id: 'Fees & Finance', icon: Wallet, label: 'Fees & Finance' },
    { id: 'Communication', icon: MessageSquare, label: 'Communication' },
    { id: 'Documents', icon: Files, label: 'Documents' },
    { id: 'Users & Roles', icon: Users, label: 'Users & Roles' },
    { id: 'AI Configuration', icon: Brain, label: 'AI Configuration' },
    { id: 'Integrations', icon: Blocks, label: 'Integrations' },
    { id: 'Security', icon: Shield, label: 'Security' },
    { id: 'Branding', icon: Palette, label: 'Branding' },
    { id: 'Automation', icon: Zap, label: 'Automation' },
    { id: 'Data Management', icon: Database, label: 'Data Management' },
    { id: 'Audit Logs', icon: Activity, label: 'Audit Logs' },
  ];

  // Styles matching Applicant Profile Overview
  const inputStyle = {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid var(--border-primary)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '13px',
    fontWeight: 500,
    width: '100%',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-tertiary)',
    marginBottom: '6px',
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const cardStyle = {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  };

  const ToggleSwitch = ({ checked, label, description }: { checked?: boolean, label: string, description?: string }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-primary)' }}>
      <div style={{ paddingRight: '20px' }}>
        <h4 style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</h4>
        {description && <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-tertiary)' }}>{description}</p>}
      </div>
      <div style={{
        width: '44px', height: '24px', borderRadius: '12px',
        background: checked ? 'var(--accent-green)' : 'var(--border-primary)',
        position: 'relative', cursor: 'pointer', flexShrink: 0,
        transition: 'background 0.2s'
      }}>
        <div style={{
          width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
          position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'left 0.2s'
        }} />
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: 'var(--bg-secondary)', fontFamily: 'var(--font-sans)', overflow: 'hidden' }}>
      
      {/* Sidebar Navigation */}
      <div style={{ width: '280px', borderRight: '1px solid var(--border-primary)', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '32px 24px 20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>Settings</h2>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', borderRadius: '8px',
                    backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '13px', fontWeight: isActive ? 600 : 500,
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={16} color={isActive ? 'var(--accent-blue)' : 'currentColor'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 80px', position: 'relative' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px', letterSpacing: '-0.5px' }}>{activeTab}</h1>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Manage configuration and policies for {activeTab.toLowerCase()}.</p>
            </div>
            <button 
              onClick={handleSave}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '30px',
                backgroundColor: 'var(--accent-green)', color: '#ffffff', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)', transition: 'transform 0.1s'
              }}
            >
              <Save size={14} /> Save changes
            </button>
          </div>

          {savedStatus && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', marginBottom: '24px', fontSize: '13px', fontWeight: 600 }}>
              <CheckCircle size={16} /> {savedStatus}
            </div>
          )}

          {/* =========================================
              TAB: INSTITUTION SETTINGS
             ========================================= */}
          {activeTab === 'Institution' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={cardStyle}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>Core Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>Institution Name</label>
                    <input type="text" defaultValue="Axio Education Group" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Institution Code</label>
                    <input type="text" defaultValue="AX-2026" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Academic Board</label>
                    <select style={inputStyle}>
                      <option>IB - International Baccalaureate</option>
                      <option>CBSE</option>
                      <option>ICSE</option>
                      <option>State Board</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Timezone</label>
                    <div style={{ position: 'relative' }}>
                      <input type="text" defaultValue="(+05:30) Asia/Kolkata" style={inputStyle} readOnly />
                      <Lock size={14} color="var(--text-tertiary)" style={{ position: 'absolute', right: '16px', top: '14px' }} />
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--text-tertiary)' }}>Timezone is set automatically.</p>
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>Contact & Address</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Official Address</label>
                    <input type="text" defaultValue="Sector 45, Cyber City, Gurgaon" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Principal/Director Email</label>
                    <input type="email" defaultValue="director@axio.edu" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Contact Number</label>
                    <input type="text" defaultValue="+91 98765 43210" style={inputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Official Website</label>
                    <input type="text" defaultValue="https://axio.edu" style={inputStyle} />
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>Institution Brand Assets</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px dashed var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building size={24} color="var(--text-tertiary)" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                      <button style={{ padding: '6px 12px', borderRadius: '20px', background: 'var(--bg-secondary)', border: 'none', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <Upload size={12} /> Choose file
                      </button>
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', alignSelf: 'center' }}>No file chosen</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>Upload your school logo. Recommended size 400x400px.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              TAB: STUDENT IDENTITY
             ========================================= */}
          {activeTab === 'Student Identity' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={cardStyle}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>Identification Formats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>Student ID Format Pattern</label>
                    <input type="text" defaultValue="ACX-STU-[YYYY]-[0000]" style={inputStyle} />
                    <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--text-tertiary)' }}>Example: ACX-STU-2026-0014</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Akedex Identity Number (AIN) Prefix</label>
                    <input type="text" defaultValue="AIN" style={inputStyle} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>APAAR ID Mapping Field</label>
                    <select style={inputStyle}>
                      <option>Map to Custom Field 1</option>
                      <option selected>Map to Primary External ID</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>Identity Capabilities</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <ToggleSwitch checked={true} label="Auto-generate QR Codes" description="Automatically generate verification QR codes for new student profiles." />
                  <ToggleSwitch checked={true} label="Enable Digital ID Cards" description="Allow students to view their digital ID via the student portal." />
                  <ToggleSwitch checked={false} label="Require APAAR for Admission" description="Block admissions if an APAAR ID is not provided." />
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              TAB: USERS & ROLES
             ========================================= */}
          {activeTab === 'Users & Roles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={cardStyle}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>Role Permissions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { role: 'Super Admin', desc: 'Full institutional access. Bypasses all data visibility rules.', users: 3 },
                    { role: 'Principal / Director', desc: 'Read/Write access to all academic and faculty records.', users: 2 },
                    { role: 'Department Head', desc: 'Manage specific departments and view related faculty metrics.', users: 12 },
                    { role: 'Accountant', desc: 'Access to Fee & Finance modules only.', users: 4 },
                    { role: 'Teacher', desc: 'Standard access to assigned classes, attendance, and grading.', users: 84 },
                  ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-primary)' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)' }}>{r.role}</h4>
                          <span style={{ fontSize: '11px', background: 'var(--bg-primary)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>{r.users} users</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-tertiary)' }}>{r.desc}</p>
                      </div>
                      <button style={{ padding: '8px 16px', fontSize: '13px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '6px', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>
                        Edit Permissions
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>Approval Hierarchies</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <ToggleSwitch checked={true} label="Strict Grading Approvals" description="Grades must be approved by Dept Head before publishing." />
                  <ToggleSwitch checked={true} label="Leave Approvals" description="Faculty leave requires Principal sign-off." />
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              TAB: AI CONFIGURATION
             ========================================= */}
          {activeTab === 'AI Configuration' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={cardStyle}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 12px', color: 'var(--text-primary)' }}>Akedex AI Engine</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                  Configure how the Akedex predictive AI models interact with your institutional data. These insights appear on the Operations Dashboard and student profiles.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <ToggleSwitch checked={true} label="Student Risk Prediction" description="Analyze attendance and grade trends to flag at-risk students early." />
                  <ToggleSwitch checked={true} label="Attendance Anomaly Detection" description="Alert admins to unusual patterns in school-wide attendance." />
                  <ToggleSwitch checked={false} label="Automated Intervention Alerts" description="Automatically email parents if AI detects severe academic drops." />
                  <ToggleSwitch checked={true} label="Behavioral Sentiment Analysis" description="Scan teacher remarks for patterns in student behavioral changes." />
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>Data Privacy for AI</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <ToggleSwitch checked={true} label="Anonymize Global Training Data" description="Share anonymized trends to improve Akedex global models." />
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              PLACEHOLDER FOR OTHER TABS
             ========================================= */}
          {![ 'Institution', 'Student Identity', 'Users & Roles', 'AI Configuration' ].includes(activeTab) && (
            <div style={cardStyle}>
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Settings size={32} color="var(--text-tertiary)" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>
                  {activeTab} Configuration
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 24px', lineHeight: 1.5 }}>
                  The data schema and UI forms for the {activeTab.toLowerCase()} module are currently being mapped to the Akedex ledger. 
                </p>
                <button style={{ padding: '10px 20px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, cursor: 'not-allowed' }}>
                  Coming Soon
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
