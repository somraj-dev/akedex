'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { mockTransferApplications, mockStudents } from '@/lib/mock-data';
import { 
  Search, FileText, CheckCircle, Clock, AlertCircle, XCircle, 
  MessageSquare, User, Building, Paperclip, Send, ArrowLeft, ArrowRight, Check
} from 'lucide-react';

// Helpers
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Draft': return '#94a3b8'; // gray
    case 'Submitted': return '#3b82f6'; // blue
    case 'Under Review': return '#f59e0b'; // amber
    case 'Clearance Pending': return '#f97316'; // orange
    case 'Principal Review': return '#8b5cf6'; // purple
    case 'Approved': return '#10b981'; // green
    case 'Rejected': return '#ef4444'; // red
    case 'Withdrawn': return '#64748b'; // slate
    case 'Closed': return '#475569'; // slate darker
    default: return '#94a3b8';
  }
};

const getStatusBadge = (status: string) => {
  const color = getStatusColor(status);
  return (
    <span style={{ 
      display: 'inline-flex', alignItems: 'center', gap: '4px', 
      padding: '2px 8px', borderRadius: '9999px', fontSize: '10px', 
      fontWeight: 600, color: color, background: `${color}15`,
      border: `1px solid ${color}30`
    }}>
      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: color }}></span>
      {status}
    </span>
  );
};

export default function TransferCenter({ preselectedStudentId }: { preselectedStudentId?: string }) {
  const closeTab = useAppStore(s => s.closeTab);
  const activeTabId = useAppStore(s => s.activeTabId);
  const openTab = useAppStore(s => s.openTab);

  // State
  const [activeView, setActiveView] = useState<'list' | 'workspace' | 'newForm'>(preselectedStudentId ? 'newForm' : 'list');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  // New Form State
  const [newFormStudentId, setNewFormStudentId] = useState(preselectedStudentId || '');
  const [newFormReason, setNewFormReason] = useState('Parent job relocation');
  const [newFormDate, setNewFormDate] = useState('');
  const [newFormNotes, setNewFormNotes] = useState('');
  const [parentDec, setParentDec] = useState(false);
  const [consentConf, setConsentConf] = useState(false);

  // App Data (mutatable for demo)
  const [applications, setApplications] = useState([...mockTransferApplications]);

  const selectedApp = applications.find(a => a.id === selectedAppId);
  const activeStudent = newFormStudentId ? mockStudents.find(s => s.id === newFormStudentId) : null;

  // Filter Logic
  const filteredApps = applications.filter(a => {
    if (filter !== 'All' && a.status !== filter) return false;
    if (search && !a.studentName.toLowerCase().includes(search.toLowerCase()) && !a.applicationNo.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const showToast = useAppStore(s => s.showToast);

  // Actions
  const handleNewSubmit = () => {
    if (!parentDec || !consentConf || !activeStudent) {
      showToast("Please check declarations and ensure a student is selected.", "error");
      return;
    }
    const newApp = {
      id: `trf-${Date.now()}`,
      applicationNo: `TRF-2026-${Math.floor(Math.random() * 100000)}`,
      studentId: activeStudent.id,
      studentName: `${activeStudent.firstName} ${activeStudent.lastName}`,
      class: activeStudent.class,
      section: 'A',
      ain: activeStudent.uai || `AKD-STU-2026-X${Math.floor(Math.random() * 10000)}`,
      status: 'Submitted',
      reason: newFormReason,
      preferredDate: newFormDate,
      additionalNotes: newFormNotes,
      parentDeclaration: parentDec,
      consentConfirmation: consentConf,
      submittedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      assignedReviewer: 'Unassigned',
      clearances: [
        { department: 'Class Teacher', status: 'Pending', reviewer: '', date: '', comments: '' },
        { department: 'Accounts', status: 'Pending', reviewer: '', date: '', comments: '' },
        { department: 'Library', status: 'Pending', reviewer: '', date: '', comments: '' },
        { department: 'Transport', status: 'Pending', reviewer: '', date: '', comments: '' },
        { department: 'Administration', status: 'Pending', reviewer: '', date: '', comments: '' }
      ],
      internalNotes: [],
      communications: [
        { sender: 'System', role: 'school', message: 'Transfer application has been successfully submitted and is pending initial review.', timestamp: new Date().toISOString(), attachments: [] }
      ],
      auditTrail: [
        { user: 'Parent/Student', action: 'Application Submitted', timestamp: new Date().toISOString(), prevStatus: 'Draft', newStatus: 'Submitted' }
      ],
      documents: []
    };
    
    setApplications([newApp, ...applications]);
    if (preselectedStudentId) {
      closeTab(activeTabId);
    } else {
      setActiveView('list');
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (!selectedApp) return;
    const updated = { ...selectedApp, status: newStatus, lastUpdated: new Date().toISOString() };
    updated.auditTrail.push({
      user: 'Admin', action: `Status changed to ${newStatus}`, timestamp: new Date().toISOString(), prevStatus: selectedApp.status, newStatus
    });
    setApplications(applications.map(a => a.id === selectedApp.id ? updated : a));
  };

  const handleClearanceChange = (deptIndex: number, newStatus: string) => {
    if (!selectedApp) return;
    const newClearances = [...selectedApp.clearances];
    newClearances[deptIndex] = { ...newClearances[deptIndex], status: newStatus, reviewer: 'Admin (You)', date: new Date().toISOString().split('T')[0] };
    
    const updated = { ...selectedApp, clearances: newClearances, lastUpdated: new Date().toISOString() };
    updated.auditTrail.push({
      user: 'Admin', action: `${newClearances[deptIndex].department} clearance ${newStatus}`, timestamp: new Date().toISOString(), prevStatus: '-', newStatus: '-'
    });

    // Check if all clearances approved
    if (newClearances.every(c => c.status === 'Approved')) {
      updated.status = 'Principal Review';
      updated.auditTrail.push({
        user: 'System', action: `Moved to Principal Review`, timestamp: new Date().toISOString(), prevStatus: selectedApp.status, newStatus: 'Principal Review'
      });
    }

    setApplications(applications.map(a => a.id === selectedApp.id ? updated : a));
  };

  // Views
  if (activeView === 'newForm') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--bg-primary)', padding: '40px', height: '100%', overflowY: 'auto', fontFamily: 'var(--font-sans)' }}>
        <div style={{ width: '100%', maxWidth: '700px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-primary)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>New Transfer Application</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Initiate a formal school transfer request.</p>
            </div>
            {!preselectedStudentId && (
              <button onClick={() => setActiveView('list')} style={{ padding: '6px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
            )}
          </div>
          
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {activeStudent ? (
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--border-primary)', overflow: 'hidden' }}>
                  <img src="/student_avatar.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{activeStudent.firstName} {activeStudent.lastName}</h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    AIN: {activeStudent.uai || 'N/A'} • Class: {activeStudent.class}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Select Student</label>
                <select value={newFormStudentId} onChange={e => setNewFormStudentId(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px' }}>
                  <option value="">-- Select Student --</option>
                  {mockStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.class})</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Reason for Transfer</label>
                <select value={newFormReason} onChange={e => setNewFormReason(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px' }}>
                  <option>Parent job relocation</option>
                  <option>Better academic opportunities</option>
                  <option>Financial reasons</option>
                  <option>Proximity to home</option>
                  <option>Graduation / Moving to Higher Ed</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Preferred Transfer Date</label>
                <input type="date" value={newFormDate} onChange={e => setNewFormDate(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Additional Notes</label>
              <textarea value={newFormNotes} onChange={e => setNewFormNotes(e.target.value)} rows={3} placeholder="Please provide any specific details regarding this transfer request..." style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px', resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Supporting Documents</label>
              <div style={{ border: '1px dashed var(--border-primary)', borderRadius: '6px', padding: '24px', textAlign: 'center', background: 'var(--bg-tertiary)', cursor: 'pointer' }}>
                <Paperclip size={20} color="var(--text-tertiary)" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-blue)' }}>Click to upload documents</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Relocation proof, admission letters, etc.</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px', background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input type="checkbox" checked={parentDec} onChange={e => setParentDec(e.target.checked)} style={{ marginTop: '2px' }} />
                <span>I declare that I am the authorized parent/guardian of the student and all information provided is accurate to the best of my knowledge.</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input type="checkbox" checked={consentConf} onChange={e => setConsentConf(e.target.checked)} style={{ marginTop: '2px' }} />
                <span>I consent to the school processing this transfer and sharing necessary academic records with the receiving institution upon clearance.</span>
              </label>
            </div>

          </div>
          
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-primary)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: 'var(--bg-tertiary)', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
            <button onClick={() => preselectedStudentId ? closeTab(activeTabId) : setActiveView('list')} style={{ padding: '8px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Cancel</button>
            <button onClick={handleNewSubmit} disabled={!parentDec || !consentConf || !activeStudent} style={{ padding: '8px 16px', background: 'var(--accent-blue)', border: 'none', borderRadius: '6px', cursor: (!parentDec || !consentConf || !activeStudent) ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 600, color: '#fff', opacity: (!parentDec || !consentConf || !activeStudent) ? 0.5 : 1 }}>Submit Application</button>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'workspace' && selectedApp) {
    // Determine progress step (1 to 5)
    let step = 1; // Submitted
    if (selectedApp.status === 'Clearance Pending') step = 2;
    if (selectedApp.status === 'Clearance Pending' && selectedApp.clearances.some(c => c.status !== 'Pending')) step = 3;
    if (selectedApp.status === 'Principal Review') step = 4;
    if (selectedApp.status === 'Approved' || selectedApp.status === 'Rejected') step = 5;

    return (
      <div style={{ display: 'flex', height: '100%', background: 'var(--bg-primary)', fontFamily: 'var(--font-sans)', overflow: 'hidden' }}>
        
        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', borderRight: '1px solid var(--border-primary)' }}>
          
          {/* Workspace Header */}
          <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', position: 'sticky', top: 0, zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <button onClick={() => setActiveView('list')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}><ArrowLeft size={16} /></button>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedApp.studentName} — Transfer Application</h1>
              {getStatusBadge(selectedApp.status)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '28px' }}>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{selectedApp.applicationNo}</span>
              <span>•</span>
              <span>Submitted: {new Date(selectedApp.submittedDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>Reviewer: {selectedApp.assignedReviewer}</span>
            </div>
          </div>

          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Progress Timeline */}
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
              <div style={{ position: 'absolute', top: '12px', left: '10%', right: '10%', height: '2px', background: 'var(--border-primary)', zIndex: 0 }} />
              <div style={{ position: 'absolute', top: '12px', left: '10%', right: `${100 - (step/5)*100 + 10}%`, height: '2px', background: 'var(--accent-blue)', zIndex: 0, transition: 'all 0.3s' }} />
              
              {['Submitted', 'Department Review', 'Clearances', 'Principal Review', 'Final Decision'].map((label, idx) => {
                const sNum = idx + 1;
                const active = step >= sNum;
                const completed = step > sNum || (sNum === 5 && selectedApp.status === 'Approved');
                const rejected = sNum === 5 && selectedApp.status === 'Rejected';
                
                return (
                  <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: rejected ? '#ef4444' : completed ? '#10b981' : active ? '#3b82f6' : 'var(--bg-secondary)', border: completed || active || rejected ? 'none' : '2px solid var(--border-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, marginBottom: '8px' }}>
                      {rejected ? <XCircle size={14} /> : completed ? <Check size={14} /> : sNum}
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: active ? 'var(--text-primary)' : 'var(--text-tertiary)', textAlign: 'center' }}>
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Student Summary */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}><User size={16} /> Student Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>STUDENT NAME</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedApp.studentName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>AIN</div>
                  <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{selectedApp.ain}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>CLASS & SECTION</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{selectedApp.class} - {selectedApp.section}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>STATUS</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Active</div>
                </div>
              </div>
            </div>

            {/* Transfer Details */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}><FileText size={16} /> Transfer Request Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Reason for Transfer</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{selectedApp.reason}</div>
                  
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', margin: '16px 0 4px 0' }}>Preferred Date</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{new Date(selectedApp.preferredDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Additional Notes</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '6px', minHeight: '60px' }}>{selectedApp.additionalNotes || 'No notes provided.'}</div>
                </div>
              </div>
            </div>

            {/* Clearance Verification */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}><CheckCircle size={16} /> Clearance Verification</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                {selectedApp.clearances.map((c, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{c.department}</div>
                      {c.status === 'Approved' ? (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px' }}>APPROVED</span>
                      ) : c.status === 'Requires Action' ? (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '2px 6px', borderRadius: '4px' }}>REQUIRES ACTION</span>
                      ) : (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>PENDING</span>
                      )}
                    </div>
                    {c.comments && (
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', padding: '8px', borderRadius: '4px' }}>"{c.comments}"</div>
                    )}
                    {c.status !== 'Approved' && (
                      <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '8px' }}>
                        <button onClick={() => handleClearanceChange(idx, 'Approved')} style={{ flex: 1, padding: '4px 0', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>Approve</button>
                        <button onClick={() => handleClearanceChange(idx, 'Requires Action')} style={{ flex: 1, padding: '4px 0', background: 'var(--bg-tertiary)', color: '#ef4444', border: '1px solid var(--border-primary)', borderRadius: '4px', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>Reject</button>
                      </div>
                    )}
                    {c.status === 'Approved' && c.reviewer && (
                      <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginTop: 'auto', paddingTop: '8px' }}>Verified by {c.reviewer} on {c.date}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Communication Thread */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}><MessageSquare size={16} /> Communication Center</h3>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-primary)', minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }}>
                  {selectedApp.communications.map((comm, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', alignSelf: comm.role === 'parent' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                      {comm.role === 'school' && (
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: 700 }}>A</div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', display: 'flex', gap: '8px', justifyContent: comm.role === 'parent' ? 'flex-end' : 'flex-start' }}>
                          <span style={{ fontWeight: 600 }}>{comm.sender}</span>
                          <span>{new Date(comm.timestamp).toLocaleString()}</span>
                        </div>
                        <div style={{ background: comm.role === 'parent' ? 'var(--bg-secondary)' : 'var(--accent-blue)', color: comm.role === 'parent' ? 'var(--text-primary)' : '#fff', padding: '12px 16px', borderRadius: '12px', border: comm.role === 'parent' ? '1px solid var(--border-primary)' : 'none', borderTopRightRadius: comm.role === 'parent' ? '4px' : '12px', borderTopLeftRadius: comm.role === 'school' ? '4px' : '12px', fontSize: '13px', lineHeight: '1.5' }}>
                          {comm.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '16px', borderTop: '1px solid var(--border-primary)', display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--bg-secondary)' }}>
                  <button style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                    <Paperclip size={16} />
                  </button>
                  <input type="text" placeholder="Write a message to the parent..." style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px', outline: 'none' }} />
                  <button style={{ background: 'var(--accent-blue)', border: 'none', padding: '0 20px', height: '36px', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    Send <Send size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Audit Trail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}><Clock size={16} /> Audit Trail</h3>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedApp.auditTrail.map((log, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-strong)', marginTop: '6px' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                          <span style={{ fontWeight: 600 }}>{log.user}</span> {log.action.toLowerCase()}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '320px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-primary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>ACTIONS</h3>
            
            <button onClick={() => handleStatusChange('Approved')} style={{ width: '100%', padding: '10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CheckCircle size={16} /> Approve Application
            </button>
            <button onClick={() => handleStatusChange('Rejected')} style={{ width: '100%', padding: '10px', background: 'var(--bg-primary)', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <XCircle size={16} /> Reject Application
            </button>
            <button onClick={() => handleStatusChange('Under Review')} style={{ width: '100%', padding: '10px', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <AlertCircle size={16} /> Request Clarification
            </button>
          </div>

          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-primary)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>DOCUMENTS</h3>
            {selectedApp.documents.length === 0 ? (
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>No documents attached.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedApp.documents.map((doc, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '6px' }}>
                    <FileText size={14} color="var(--accent-blue)" />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{doc.name}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>{doc.size} • {doc.uploadDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building size={14} /> INTERNAL NOTES
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {selectedApp.internalNotes.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>No internal notes.</div>
              ) : (
                selectedApp.internalNotes.map((note, idx) => (
                  <div key={idx} style={{ background: '#fef3c7', border: '1px solid #fde68a', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#92400e', marginBottom: '4px' }}>{note.text}</div>
                    <div style={{ fontSize: '9px', color: '#b45309', fontWeight: 600 }}>{note.author} • {new Date(note.timestamp).toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>
            <div style={{ marginTop: '16px' }}>
              <textarea placeholder="Add an internal staff note..." rows={3} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '12px', resize: 'vertical', outline: 'none' }} />
              <button style={{ width: '100%', padding: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '8px', cursor: 'pointer' }}>Add Note</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View (Default)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-primary)', fontFamily: 'var(--font-sans)' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-primary)', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Transfer Center</h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Manage and process student transfer applications.</p>
          </div>
          <button onClick={() => setActiveView('newForm')} style={{ padding: '10px 16px', background: 'var(--accent-blue)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)' }}>
            + New Transfer Request
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {[
            { label: 'Total Requests', value: applications.length },
            { label: 'Approved', value: applications.filter(a => a.status === 'Approved').length },
            { label: 'Rejected', value: applications.filter(a => a.status === 'Rejected').length },
            { label: 'Pending', value: applications.filter(a => ['Submitted', 'Under Review', 'Clearance Pending', 'Principal Review'].includes(a.status)).length },
            { label: 'Avg Processing', value: '4.2 Days' }
          ].map((stat, idx) => (
            <div key={idx} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>{stat.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        
        {/* Filters & Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Submitted', 'Clearance Pending', 'Principal Review', 'Approved', 'Rejected'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                style={{ 
                  padding: '6px 16px', 
                  borderRadius: '9999px', 
                  fontSize: '12px', 
                  fontWeight: 600,
                  border: filter === f ? '1px solid var(--accent-blue)' : '1px solid var(--border-primary)',
                  background: filter === f ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-secondary)',
                  color: filter === f ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search by ID or student name..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', fontSize: '13px', outline: 'none' }}
            />
          </div>
        </div>

        {/* List */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Application ID</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Student</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Reviewer</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>No transfer applications found.</td>
                </tr>
              ) : (
                filteredApps.map(app => (
                  <tr 
                    key={app.id} 
                    onClick={() => { setSelectedAppId(app.id); setActiveView('workspace'); }}
                    style={{ borderBottom: '1px solid var(--border-primary)', cursor: 'pointer' }}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px', fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{app.applicationNo}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{app.studentName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Class {app.class}</div>
                    </td>
                    <td style={{ padding: '16px' }}>{getStatusBadge(app.status)}</td>
                    <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-primary)' }}>{app.assignedReviewer}</td>
                    <td style={{ padding: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>{new Date(app.lastUpdated).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
