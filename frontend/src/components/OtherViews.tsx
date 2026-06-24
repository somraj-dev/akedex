'use client';

import React, { useState, useEffect } from 'react';
import { mockTeachers, mockStudents, mockCases, mockAdmissions, recentActivity } from '@/lib/mock-data';
import { 
  Search, ShieldAlert, Award, FileText, CheckCircle2, AlertTriangle, 
  Calendar, Check, UserCheck, Shield, Key, HelpCircle, Building,
  BookOpen, Layers, FileSpreadsheet, Clock, Clipboard, BookMarked,
  MessageSquare, DollarSign, BarChart3, Send, Download, RefreshCw,
  LogOut, Trash2, Plus, Minus, Phone, Link, Mail, MoreHorizontal, MoreVertical, Edit,
  Copy, MapPin, Printer, ArrowUpRight, Briefcase, GraduationCap, User, ChevronDown, ChevronUp, X, TrendingUp, ArrowLeft,
  Bell, TrendingDown, Users, Brain, CreditCard
} from 'lucide-react';
import { useAppStore, AppView } from '@/lib/store';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { StudentAcademicsTab, StudentAttendanceTab, StudentFeesTab, StudentAchievementsTab, StudentDocumentsTab } from './StudentProfileTabs';
import { 
  ExecutiveDashboardSubView, 
  FeeCollectionSubView, 
  DefaultersRecoverySubView, 
  PayrollSubView, 
  FinancialReportsSubView 
} from './FinanceSubViews';
import AdmitCardCenter from './AdmitCardCenter';
import ResultProcessingCenter from './ResultProcessingCenter';
import SchoolProfileView from './SchoolProfileView';

// =====================================================
// TEACHERS VIEW (Already defined, but kept clean)
// =====================================================
export function TeachersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(mockTeachers[0]?.id || null);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const openTab = useAppStore(s => s.openTab);

  const filteredTeachers = mockTeachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedTeacher = mockTeachers.find(t => t.id === selectedTeacherId) || mockTeachers[0];
  const tData = selectedTeacher ? getEnrichedTeacherData(selectedTeacher) : null;
  const teacherIndex = selectedTeacher ? filteredTeachers.findIndex(t => t.id === selectedTeacher.id) : -1;

  const handlePrev = () => {
    if (teacherIndex > 0) {
      setSelectedTeacherId(filteredTeachers[teacherIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (teacherIndex < filteredTeachers.length - 1) {
      setSelectedTeacherId(filteredTeachers[teacherIndex + 1].id);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div style={{ padding: '12px', borderBottom: '1px solid var(--border-primary)', background: 'var(--bg-secondary)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search faculty and staff..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '32px', fontSize: '12px', height: '32px' }}
            />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Universal ID</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map(t => (
                <tr 
                  key={t.id} 
                  onClick={() => {
                    setSelectedTeacherId(t.id);
                    setPreviewOpen(true);
                  }} 
                  className={t.id === selectedTeacherId ? 'selected' : ''} 
                  style={{ cursor: 'pointer' }}
                >
                  <td className="font-mono text-xs" style={{ color: t.id === selectedTeacherId ? 'var(--accent-purple)' : 'var(--text-primary)' }}>{t.uti}</td>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        overflow: 'hidden', 
                        background: 'var(--bg-tertiary)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        border: '1px solid var(--border-primary)',
                        flexShrink: 0 
                      }}>
                        <img 
                          src={t.avatar} 
                          alt={t.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const placeholder = document.createElement('div');
                              placeholder.style.width = '100%';
                              placeholder.style.height = '100%';
                              placeholder.style.display = 'flex';
                              placeholder.style.alignItems = 'center';
                              placeholder.style.justifyContent = 'center';
                              placeholder.style.background = 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))';
                              placeholder.style.color = '#ffffff';
                              placeholder.style.fontSize = '9px';
                              placeholder.style.fontWeight = '700';
                              placeholder.innerText = t.name.split(' ').map((n: string) => n[0]).join('');
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                      </div>
                      <span>{t.name}</span>
                    </div>
                  </td>
                  <td>{t.department}</td>
                  <td>{t.designation}</td>
                  <td>
                    <span className={`badge ${t.status === 'ACTIVE' ? 'badge-active' : 'badge-warning'}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Teacher Preview Drawer */}
      {previewOpen && tData && (
        <>
          {/* Transparent Backdrop */}
          <div 
            onClick={() => setPreviewOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(15, 23, 42, 0.04)',
              zIndex: 1000,
              cursor: 'pointer'
            }}
          />

          {/* Drawer Body */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '500px',
              height: '100%',
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-primary)',
              boxShadow: '-4px 0 24px rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1001,
              animation: 'slideIn 0.2s ease-out',
              overflowY: 'auto',
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-primary)',
              padding: '20px'
            }}
          >
            {/* Header controls line */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-secondary)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Teacher Preview</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', border: '1px solid var(--border-primary)', borderRadius: '4px', padding: '2px 4px', background: 'var(--bg-tertiary)' }}>
                  <button 
                    disabled={teacherIndex <= 0} 
                    onClick={handlePrev} 
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '1px', display: 'flex', alignItems: 'center', opacity: teacherIndex <= 0 ? 0.3 : 1 }}
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button 
                    disabled={teacherIndex >= filteredTeachers.length - 1} 
                    onClick={handleNext} 
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '1px', display: 'flex', alignItems: 'center', opacity: teacherIndex >= filteredTeachers.length - 1 ? 0.3 : 1 }}
                  >
                    <ChevronDown size={12} />
                  </button>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{teacherIndex + 1} of {filteredTeachers.length}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={() => {
                    openTab({
                      id: `teacher-profile-${selectedTeacher.id}`,
                      label: `${selectedTeacher.name}'s Profile`,
                      view: 'teacher-profile'
                    });
                    setPreviewOpen(false);
                  }}
                  style={{
                    padding: '5px 12px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 100ms ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent-purple)';
                    e.currentTarget.style.color = 'var(--accent-purple)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  View Full Details
                </button>
                <button 
                  onClick={() => setPreviewOpen(false)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: 'var(--text-muted)' }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Profile strip */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid var(--border-primary)', overflow: 'hidden', background: 'var(--bg-tertiary)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src={tData.avatar} 
                  alt={tData.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const placeholder = document.createElement('div');
                      placeholder.style.width = '100%';
                      placeholder.style.height = '100%';
                      placeholder.style.display = 'flex';
                      placeholder.style.alignItems = 'center';
                      placeholder.style.justifyContent = 'center';
                      placeholder.style.background = 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))';
                      placeholder.style.color = '#ffffff';
                      placeholder.style.fontWeight = '800';
                      placeholder.style.fontSize = '16px';
                      placeholder.innerText = tData.name.split(' ').map((n: string) => n[0]).join('');
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>{tData.name}</h2>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tData.status === 'ACTIVE' ? 'var(--accent-green)' : 'var(--accent-amber)' }} />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {tData.designation} • <span style={{ color: 'var(--text-tertiary)' }}>{tData.department}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {tData.uti}
                </div>
              </div>
            </div>

            {/* Outlined Metric strip */}
            <div style={{ border: '1px solid var(--border-primary)', borderRadius: '10px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 6px', background: 'var(--bg-primary)', marginBottom: '20px' }}>
              {[
                { label: 'EXPERIENCE', val: `${tData.experience} Yrs` },
                { label: 'CLASSES', val: `${tData.totalClasses}` },
                { label: 'WORKLOAD', val: `${tData.lecturesPerWeek}/Wk` },
                { label: 'PASS RATE', val: `${92 + (parseInt(tData.id.replace('t','')) || 1) % 3 * 2}%` }
              ].map((m, idx) => (
                <div key={idx} style={{ textAlign: 'center', borderRight: idx < 3 ? '1px solid var(--border-primary)' : 'none' }}>
                  <div style={{ fontSize: '8px', color: 'var(--text-tertiary)', fontWeight: 600 }}>{m.label}</div>
                  <strong style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginTop: '4px' }}>{m.val}</strong>
                </div>
              ))}
            </div>

            {/* Details Section */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Teacher Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'x 12px', border: '1px solid var(--border-secondary)', borderRadius: '8px', padding: '12px' }}>
                {[
                  { label: 'Department', val: tData.department },
                  { label: 'Status', val: tData.status, highlight: true },
                  { label: 'Email Address', val: tData.email },
                  { label: 'Subjects Taught', val: tData.subjects },
                  { label: 'Mobile Number', val: tData.phone },
                  { label: 'Office Room', val: tData.officeRoom },
                  { label: 'Qualification', val: tData.qualification },
                  { label: 'Employment Type', val: tData.workload },
                  { label: 'Join Date', val: tData.joinDate }
                ].map((row, idx) => (
                  <div key={idx} style={{ padding: '6px 0', borderBottom: idx < 8 ? '1px solid var(--border-secondary)' : 'none', fontSize: '11px', gridColumn: row.label.includes('Email') || row.label.includes('Subjects') ? 'span 2' : 'auto' }}>
                    <span style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>{row.label}</span>
                    <strong style={{ 
                      color: row.highlight 
                        ? (row.val === 'ACTIVE' ? 'var(--accent-green)' : 'var(--accent-amber)') 
                        : 'var(--text-primary)',
                      wordBreak: 'break-all'
                    }}>{row.val}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Class Course block */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Active Workload</h3>
                <span onClick={() => {
                  openTab({
                    id: `teacher-profile-${selectedTeacher.id}`,
                    label: `${selectedTeacher.name}'s Profile`,
                    view: 'teacher-profile'
                  });
                  setPreviewOpen(false);
                }} style={{ fontSize: '10px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }}>View More Courses</span>
              </div>
              <div style={{ border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '12px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{tData.activeCourse.name}</strong>
                  <span style={{ fontSize: '8px', fontWeight: 700, padding: '1px 5px', borderRadius: '4px', background: 'rgba(139,92,246,0.08)', color: 'var(--accent-purple)' }}>{tData.activeCourse.badge}</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  Course Code: {tData.activeCourse.code}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '10px', marginTop: '4px', borderTop: '1px solid var(--border-secondary)', paddingTop: '8px' }}>
                  <div><span style={{ color: 'var(--text-tertiary)' }}>Type:</span> <strong style={{ color: 'var(--text-secondary)' }}>{tData.activeCourse.type}</strong></div>
                  <div><span style={{ color: 'var(--text-tertiary)' }}>Schedule:</span> <strong style={{ color: 'var(--text-secondary)' }}>{tData.activeCourse.schedule}</strong></div>
                  <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-tertiary)' }}>Room & Time:</span> <strong style={{ color: 'var(--text-secondary)' }}>{tData.activeCourse.room} ({tData.activeCourse.time})</strong></div>
                </div>
              </div>
            </div>

            {/* Timeline Activities block */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Activity</h3>
                <span onClick={() => {
                  openTab({
                    id: `teacher-profile-${selectedTeacher.id}`,
                    label: `${selectedTeacher.name}'s Profile`,
                    view: 'teacher-profile'
                  });
                  setPreviewOpen(false);
                }} style={{ fontSize: '10px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }}>View More Activity</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '14px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '4px', top: '4px', bottom: '4px', width: '1.5px', background: 'rgba(139, 92, 246, 0.15)' }} />
                {tData.activity.map((act, idx) => (
                  <div key={idx} style={{ position: 'relative', fontSize: '10.5px' }}>
                    <div style={{ position: 'absolute', left: '-13.5px', top: '3.5px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', border: '1.5px solid var(--bg-secondary)' }} />
                    <div style={{ color: 'var(--text-secondary)' }}>{act.text}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{act.time}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

// =====================================================
// DOCUMENTS VIEW (Already defined)
// =====================================================
export function DocumentsView() {
  const [selectedDocId, setSelectedDocId] = useState<string | null>('doc-1');
  const [docs, setDocs] = useState([
    { id: 'doc-1', title: 'Transfer Certificate — Karan Singh', type: 'TC', size: '1.4 MB', status: 'PENDING', uploader: 'Mrs. Anita Desai', date: '2026-06-03' },
    { id: 'doc-2', title: 'Birth Certificate — Arjun Mehta', type: 'BIRTH_CERT', size: '940 KB', status: 'VERIFIED', uploader: 'Mr. Sunil Rao', date: '2026-06-02' },
    { id: 'doc-3', title: 'CBSE 10th Marksheet — Priya Sharma', type: 'MARKSHEET', size: '2.1 MB', status: 'VERIFIED', uploader: 'System', date: '2026-06-01' },
    { id: 'doc-4', title: 'Medical Fitness Ledger — Sneha Reddy', type: 'HEALTH_REC', size: '800 KB', status: 'PENDING', uploader: 'Mr. Rajiv Saxena', date: '2026-05-28' },
  ]);

  const selectedDoc = docs.find(d => d.id === selectedDocId);

  const handleVerify = (id: string) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: 'VERIFIED' } : d));
  };

  const handleReject = (id: string) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: 'INCOMPLETE' } : d));
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div style={{ flex: 1.2, borderRight: '1px solid var(--border-primary)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div style={{ padding: '12px', borderBottom: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
          TRANSCRIPT & DOCUMENT VERIFICATION QUEUE
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploader</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(d => (
                <tr key={d.id} onClick={() => setSelectedDocId(d.id)} className={d.id === selectedDocId ? 'selected' : ''} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 600 }}>{d.title}</td>
                  <td className="font-mono text-xs">{d.type}</td>
                  <td className="font-mono text-xs">{d.size}</td>
                  <td>{d.uploader.split(' ').pop()}</td>
                  <td>
                    <span className={`badge ${d.status === 'VERIFIED' ? 'badge-active' : d.status === 'PENDING' ? 'badge-warning' : 'badge-critical'}`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedDoc && (
        <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
          <div style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.1)', padding: '1px 4px', borderRadius: '3px' }}>DOCUMENT SYSTEM</span>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 0' }}>{selectedDoc.title}</h2>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>UPLOAD DATE: {selectedDoc.date} • SIZE: {selectedDoc.size}</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', border: '1px dashed var(--border-primary)', borderRadius: '8px', minHeight: '200px', gap: '12px' }}>
            <FileText size={48} className="text-gray-600" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Cryptographic Transcript Preview</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>SHA256: 8f4e2c91a3b5c7e901f...</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => handleVerify(selectedDoc.id)}
              disabled={selectedDoc.status === 'VERIFIED'}
              className="btn btn-primary btn-sm" 
              style={{ flex: 1, gap: '4px' }}
            >
              <CheckCircle2 size={14} /> Verify & Attest
            </button>
            <button 
              onClick={() => handleReject(selectedDoc.id)}
              disabled={selectedDoc.status === 'INCOMPLETE'}
              className="btn btn-secondary btn-sm" 
              style={{ flex: 1, gap: '4px' }}
            >
              <AlertTriangle size={14} /> Mark Incomplete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// ATTENDANCE VIEW (Already defined)
// =====================================================
export function AttendanceView() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [markedStudents, setMarkedStudents] = useState<Record<string, 'present' | 'absent'>>({});

  const classStudents = mockStudents.filter(s => s.class === selectedClass);

  const toggleStatus = (id: string) => {
    setMarkedStudents(prev => ({
      ...prev,
      [id]: prev[id] === 'absent' ? 'present' : 'absent'
    }));
  };

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Attendance Operations Ledger</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Log and attest student attendance for the current calendar date.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>SELECT CLASS:</span>
          <select 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
            className="input-field"
            style={{ width: '120px', fontSize: '12px', height: '32px', padding: '0 8px' }}
          >
            <option value="10-A">Class 10-A</option>
            <option value="10-B">Class 10-B</option>
            <option value="9-A">Class 9-A</option>
            <option value="11-Science">11-Science</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', flex: 1, minHeight: '300px' }}>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Roll / UAI</th>
                  <th>Student Name</th>
                  <th>LTD Attendance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {classStudents.map(s => {
                  const status = markedStudents[s.id] || 'present';
                  return (
                    <tr key={s.id} onClick={() => toggleStatus(s.id)} style={{ cursor: 'pointer' }}>
                      <td className="font-mono text-xs">{s.uai.slice(-5)}</td>
                      <td style={{ fontWeight: 600 }}>{s.firstName} {s.lastName}</td>
                      <td className="font-mono">{s.attendance}%</td>
                      <td>
                        <span className={`badge ${status === 'present' ? 'badge-active' : 'badge-critical'}`} style={{ fontSize: '9px', padding: '2px 6px' }}>
                          {status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>ATTESTATION PANEL</h3>
          <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Class Ledger</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedClass}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Students</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{classStudents.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Marked Present</span>
              <span style={{ color: 'var(--accent-green)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                {classStudents.length - Object.values(markedStudents).filter(v => v === 'absent').length}
              </span>
            </div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 'auto', gap: '4px' }}><Check size={16} /> Sign & Lock Daily Ledger</button>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// INSTITUTION VIEW (Already defined)
// =====================================================
export function InstitutionView() {
  const campuses = [
    { name: 'DPS Rohini Campus (Primary)', code: 'DPS-R01', status: 'ACTIVE', type: 'Primary School' },
    { name: 'DPS Dwarka Campus (Senior)', code: 'DPS-D02', status: 'ACTIVE', type: 'Senior Secondary' },
    { name: 'DPS Vasant Kunj (Junior)', code: 'DPS-V03', status: 'ACTIVE', type: 'Middle School' }
  ];

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Institution & Campus Profile</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Manage multi-tenant campus networks and licensing variables.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>CAMPUS DIRECTORY</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {campuses.map((c, i) => (
              <div key={i} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>CODE: {c.code} • {c.type}</div>
                </div>
                <span className="badge badge-active">{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>TENANT METRICS</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-primary)' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>TENANT ID</div>
              <div style={{ fontSize: '12px', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>dps-dwarka-tenant-uuid</div>
            </div>
            <div style={{ height: '1px', background: 'var(--border-primary)', margin: '4px 0' }} />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>SYSTEM PLAN</div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>ENTERPRISE MULTI-CAMPUS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// AUDIT LOG VIEW (Already defined)
// =====================================================
export function AuditView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>SYSTEM AUDIT TRAIL</h2>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Immutable log of security-sensitive operations</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action Event</th>
              <th>Subject Entity</th>
              <th>Operator</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((act, index) => (
              <tr key={index}>
                <td className="font-mono text-xs" style={{ color: 'var(--text-tertiary)' }}>{act.time}</td>
                <td style={{ fontWeight: 600 }}>{act.action}</td>
                <td className="font-mono text-xs">{act.subject}</td>
                <td>{act.user}</td>
                <td className="font-mono text-xs" style={{ color: 'var(--text-tertiary)' }}>192.168.1.{(10 + index)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================
// SETTINGS VIEW (Moved to SettingsView.tsx)

// =====================================================
// GLOBAL SEARCH VIEW (Already defined)
// =====================================================
export function SearchView() {
  const [query, setQuery] = useState('');
  const openTab = useAppStore(s => s.openTab);

  const matchingStudents = mockStudents.filter(s => 
    s.firstName.toLowerCase().includes(query.toLowerCase()) || 
    s.lastName.toLowerCase().includes(query.toLowerCase()) ||
    s.uai.toLowerCase().includes(query.toLowerCase())
  );

  const matchingCases = mockCases.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.ref.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          placeholder="Global system queries (Students, cases, admission files)..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="input-field"
          style={{ paddingLeft: '36px', height: '40px', fontSize: '14px' }}
          autoFocus
        />
      </div>

      {query && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              STUDENT IDENTITIES ({matchingStudents.length})
            </h3>
            {matchingStudents.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {matchingStudents.slice(0, 3).map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => {
                      openTab({
                        id: `student-profile-${s.id}`,
                        label: `${s.firstName} ${s.lastName}`,
                        view: 'student-profile',
                        closable: true,
                      });
                    }}
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', padding: '10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.firstName} {s.lastName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Class {s.class} • {s.institution}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>{s.uai}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No student records matches query.</div>
            )}
          </div>

          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              WORKFLOW CASES ({matchingCases.length})
            </h3>
            {matchingCases.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {matchingCases.slice(0, 3).map(c => (
                  <div key={c.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', padding: '10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Status: {c.status} • Assignee: {c.assignee}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>{c.ref}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No cases matches query.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// COURSES VIEW (NEW)
// =====================================================
export function CoursesView() {
  const courses = [
    { code: 'CS-201', name: 'Data Structures & Algorithms', dept: 'Computer Science', credits: 4, enrolled: 184, progress: 85 },
    { code: 'MA-102', name: 'Discrete Mathematics', dept: 'Mathematics', credits: 3, enrolled: 210, progress: 70 },
    { code: 'PHY-301', name: 'Quantum Physics Fundamentals', dept: 'Science', credits: 4, enrolled: 89, progress: 92 },
    { code: 'ENG-101', name: 'Technical Writing Essentials', dept: 'Humanities', credits: 2, enrolled: 320, progress: 95 },
    { code: 'CS-302', name: 'Database Management Systems', dept: 'Computer Science', credits: 4, enrolled: 145, progress: 60 }
  ];

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Courses Directory</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Manage institutional syllabus allocations and enrollment caps.</p>
      </div>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Credits</th>
              <th>Enrolled Students</th>
              <th>Syllabus Progress</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, idx) => (
              <tr key={idx}>
                <td className="font-mono text-xs" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{c.code}</td>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td>{c.dept}</td>
                <td className="font-mono">{c.credits}</td>
                <td className="font-mono">{c.enrolled}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, width: '80px', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${c.progress}%`, height: '100%', background: 'var(--accent-blue)', borderRadius: '3px' }} />
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{c.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================
// CLASSES VIEW (NEW)
// =====================================================
const getClassRoomAndAdvisor = (name: string, section: string) => {
  if (name === 'Pre-Primary') {
    return section === 'Section A' 
      ? { room: 'Room 101', advisor: 'Mrs. Anita Desai' }
      : { room: 'Room 102', advisor: 'Mrs. Kavita Menon' };
  }
  if (name === 'Grade I') {
    return section === 'Section A' 
      ? { room: 'Room 201', advisor: 'Mr. Rajiv Saxena' }
      : { room: 'Room 202', advisor: 'Dr. Meena Shah' };
  }
  if (name === 'Grade II') {
    return section === 'Section A' 
      ? { room: 'Room 203', advisor: 'Mr. Sunil Rao' }
      : { room: 'Room 204', advisor: 'Ms. Pooja Iyer' };
  }
  if (name === 'Grade III') {
    return section === 'Section A' 
      ? { room: 'Room 301', advisor: 'Mr. Rajiv Saxena' }
      : { room: 'Room 302', advisor: 'Mrs. Anita Desai' };
  }
  if (name === 'Grade IV') {
    return section === 'Section A' 
      ? { room: 'Room 303', advisor: 'Mrs. Kavita Menon' }
      : { room: 'Room 304', advisor: 'Dr. Meena Shah' };
  }
  if (name === 'Grade V') {
    return section === 'Section A' 
      ? { room: 'Room 401', advisor: 'Mr. Sunil Rao' }
      : { room: 'Room 402', advisor: 'Ms. Pooja Iyer' };
  }
  if (name === 'Grade VI') {
    return section === 'Section A' 
      ? { room: 'Room 403', advisor: 'Mr. Rajiv Saxena' }
      : { room: 'Room 404', advisor: 'Mrs. Anita Desai' };
  }
  if (name === 'Grade VII') {
    return section === 'Section A' 
      ? { room: 'Room 501', advisor: 'Mrs. Kavita Menon' }
      : { room: 'Room 502', advisor: 'Dr. Meena Shah' };
  }
  if (name === 'Grade VIII') {
    return section === 'Section A' 
      ? { room: 'Room 503', advisor: 'Mr. Sunil Rao' }
      : { room: 'Room 504', advisor: 'Ms. Pooja Iyer' };
  }
  return section === 'Section A' 
    ? { room: 'Room 505', advisor: 'Mr. Rajiv Saxena' }
    : { room: 'Room 506', advisor: 'Mrs. Anita Desai' };
};

const getMockStudentsForClass = (className: string, section: string) => {
  const names = [
    { first: 'Aarav', last: 'Sharma', gender: 'MALE', avatar: '/student_1.png' },
    { first: 'Diya', last: 'Patel', gender: 'FEMALE', avatar: '/student_2.png' },
    { first: 'Vivaan', last: 'Mehta', gender: 'MALE', avatar: '/student_3.png' },
    { first: 'Ananya', last: 'Singh', gender: 'FEMALE', avatar: '/student_4.png' },
    { first: 'Kabir', last: 'Verma', gender: 'MALE', avatar: '/student_5.png' },
    { first: 'Myra', last: 'Jain', gender: 'FEMALE', avatar: '/student_6.png' },
    { first: 'Arjun', last: 'Nair', gender: 'MALE', avatar: '/student_7.png' },
    { first: 'Ishita', last: 'Roy', gender: 'FEMALE', avatar: '/student_8.png' },
  ];
  
  return names.map((n, idx) => {
    const id = `${className}-${section}-${idx + 1}`;
    const formattedIdx = (idx + 1).toString().padStart(2, '0');
    return {
      id,
      rollNo: `${className.replace('Grade ', '')}-${section.replace('Section ', '')}-${formattedIdx}`,
      uai: `AKD-STU-2026-CL${idx}${idx+2}P`,
      name: `${n.first} ${n.last}`,
      avatar: n.avatar,
      gender: n.gender,
      attendance: 90 + (idx % 3) * 4 - (idx % 2) * 2,
      status: idx === 4 ? 'ON_LEAVE' : idx === 6 ? 'SUSPENDED' : 'ACTIVE',
      email: `${n.first.toLowerCase()}.${n.last.toLowerCase()}@school.edu`,
      phone: `+91 98100 700${formattedIdx}`
    };
  });
};

const getClassTimetable = (classCode: string) => {
  return [
    { period: 'Period 1', time: '08:30 AM - 09:15 AM', subject: 'Mathematics', teacher: 'Mr. Rajiv Saxena', status: 'COMPLETED' },
    { period: 'Period 2', time: '09:15 AM - 10:00 AM', subject: 'English Literature', teacher: 'Mrs. Kavita Menon', status: 'COMPLETED' },
    { period: 'Period 3', time: '10:15 AM - 11:00 AM', subject: 'Physics Lab', teacher: 'Mrs. Anita Desai', status: 'ONGOING' },
    { period: 'Period 4', time: '11:00 AM - 11:45 AM', subject: 'History & Civics', teacher: 'Mr. Sunil Rao', status: 'SCHEDULED' },
    { period: 'Period 5', time: '12:30 PM - 01:15 PM', subject: 'Chemistry', teacher: 'Mrs. Anita Desai', status: 'SCHEDULED' },
    { period: 'Period 6', time: '01:15 PM - 02:00 PM', subject: 'Physical Education', teacher: 'Mr. Sunil Rao', status: 'SCHEDULED' },
  ];
};

function ClassroomDetail({ selectedClass, onBack }: { selectedClass: any; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'roster' | 'timetable' | 'performance'>('roster');
  const openTab = useAppStore(s => s.openTab);

  const studentsList = React.useMemo(() => {
    return getMockStudentsForClass(selectedClass.name, selectedClass.section);
  }, [selectedClass]);

  const timetableList = React.useMemo(() => {
    return getClassTimetable(selectedClass.code);
  }, [selectedClass]);

  const avgAttendance = React.useMemo(() => {
    const total = studentsList.reduce((acc, s) => acc + s.attendance, 0);
    return (total / studentsList.length).toFixed(1);
  }, [studentsList]);

  const gradeData = [
    { grade: 'Grade A', count: 12, fill: '#10b981' },
    { grade: 'Grade B', count: 15, fill: '#3b82f6' },
    { grade: 'Grade C', count: 7, fill: '#f59e0b' },
    { grade: 'Grade D', count: 2, fill: '#ef4444' },
  ];

  return (
    <div style={{ padding: '24px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'var(--font-sans)', boxSizing: 'border-box' }}>
      
      {/* Header with Back Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onBack}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.1s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg-secondary)';
            }}
          >
            <ArrowLeft size={14} /> Back
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                {selectedClass.name} — {selectedClass.section}
              </h2>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: selectedClass.color,
                background: selectedClass.bgColor,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {selectedClass.room}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Class Advisor: <strong>{selectedClass.advisor}</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => useAppStore.getState().showToast(`Attendance Roster printed for ${selectedClass.name} ${selectedClass.section}`, 'success')}
            style={{
              padding: '8px 14px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Printer size={12} /> Print Attendance
          </button>
          
          <button 
            onClick={() => useAppStore.getState().showToast(`Lecture scheduling launched for Room ${selectedClass.room}`, 'info')}
            style={{
              padding: '8px 14px',
              background: 'var(--accent-blue)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Plus size={12} /> Schedule Lecture
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', borderRadius: '8px', padding: '8px', display: 'flex' }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{studentsList.length}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>Students Roster Count</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', borderRadius: '8px', padding: '8px', display: 'flex' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{avgAttendance}%</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>Avg Attendance Rate</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', borderRadius: '8px', padding: '8px', display: 'flex' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{timetableList.length}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>Lectures Scheduled Today</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.08)', color: '#8b5cf6', borderRadius: '8px', padding: '8px', display: 'flex' }}>
            <Building size={20} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>90%</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>Roster Capacity Utilized</div>
          </div>
        </div>
      </div>

      {/* Tabs Menu Row */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-primary)', gap: '8px' }}>
        {[
          { id: 'roster', label: 'Student Roster' },
          { id: 'timetable', label: 'Daily Timetable' },
          { id: 'performance', label: 'Class Performance' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === t.id ? '2px solid var(--accent-blue)' : '2px solid transparent',
              color: activeTab === t.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontWeight: activeTab === t.id ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Active Tab Contents */}
      <div style={{ flex: 1 }}>
        {activeTab === 'roster' && (
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Roster Attendance</th>
                    <th>Status</th>
                    <th>Email Address</th>
                    <th>Quick Link</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsList.map((stu, sIdx) => (
                    <tr key={sIdx}>
                      <td style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{stu.rollNo}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img 
                            src={stu.avatar} 
                            alt={stu.name} 
                            style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-primary)' }}
                            onError={e => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80&auto=format&fit=crop';
                            }}
                          />
                          <span style={{ fontWeight: 600 }}>{stu.name}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{stu.gender}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{stu.attendance}%</td>
                      <td>
                        <span className={`badge ${stu.status === 'ACTIVE' ? 'badge-active' : stu.status === 'ON_LEAVE' ? 'badge-warning' : 'badge-danger'}`}>
                          {stu.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{stu.email}</td>
                      <td>
                        <button 
                          onClick={() => {
                            const matchingStudent = mockStudents.find(s => `${s.firstName} ${s.lastName}`.toLowerCase() === stu.name.toLowerCase());
                            const finalId = matchingStudent ? matchingStudent.id : '1';
                            
                            openTab({
                              id: `student-profile-${finalId}`,
                              label: `Student — ${stu.name}`,
                              view: 'student-profile',
                              closable: true
                            });
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--accent-blue)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'timetable' && (
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Roster Rhythms — Today's Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--border-primary)', margin: '10px 0 10px 10px' }}>
              {timetableList.map((t, tIdx) => {
                const isOngoing = t.status === 'ONGOING';
                const isCompleted = t.status === 'COMPLETED';

                return (
                  <div key={tIdx} style={{ position: 'relative', paddingBottom: '8px' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-27px',
                      top: '4px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: isOngoing ? '#f59e0b' : isCompleted ? '#10b981' : 'var(--border-primary)',
                      border: '2px solid var(--bg-secondary)',
                      boxShadow: isOngoing ? '0 0 0 3px rgba(245, 158, 11, 0.2)' : 'none'
                    }} />

                    <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase' }}>{t.period}</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>({t.time})</span>
                        </div>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 2px' }}>{t.subject}</h4>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Instructor: <strong>{t.teacher}</strong></span>
                      </div>
                      
                      <span className={`badge ${isOngoing ? 'badge-warning' : isCompleted ? 'badge-active' : 'badge-inactive'}`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', alignItems: 'start' }}>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '20px', marginTop: 0 }}>Roster Grade Distribution</h3>
              <div style={{ width: '100%', height: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-secondary)" />
                    <XAxis dataKey="grade" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                    <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                      {gradeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Class Standing Analytics</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Outstanding (A)</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>12 Students (33%)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Proficient (B)</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>15 Students (42%)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Satisfactory (C)</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>7 Students (19%)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', paddingBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Needs Remedial (D)</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>2 Students (6%)</span>
                </div>
              </div>

              <div style={{ marginTop: '4px', padding: '12px 14px', background: 'rgba(37,99,235,0.04)', borderRadius: '10px', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 600, lineHeight: '1.4' }}>
                Remedial classes are automatically suggested for 2 students who have grade standing below C.
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

function ClassCard({ c, onSelectSection }: { c: any; onSelectSection: (section: string) => void }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelectSection(c.sections[0])}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: hovered ? '0 10px 15px -3px rgba(0,0,0,0.04), 0 4px 6px -2px rgba(0,0,0,0.02)' : '0 1px 3px rgba(0,0,0,0.01)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        position: 'relative',
        boxSizing: 'border-box',
        cursor: 'pointer'
      }}
    >
      {/* Top row with initial badge and options */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: c.bgColor,
          color: c.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '13px'
        }}>
          {c.code}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            useAppStore.getState().showToast(`Options opened for ${c.name}`, 'info');
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Title & subtitle info */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          {c.name}
        </h3>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
          {c.label}
        </p>
      </div>

      {/* Sections Row */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {c.sections.map((sec: string, sIdx: number) => (
          <div 
            key={sIdx}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSection(sec);
            }}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: c.bgColor,
              color: c.color,
              fontSize: '11px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            {sec}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border-primary)', margin: '4px 0' }} />

      {/* Stats at bottom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={14} style={{ color: 'var(--text-muted)' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.2' }}>{c.students}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Students</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GraduationCap size={15} style={{ color: 'var(--text-muted)' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.2' }}>{c.teachers}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Teachers</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClassesView() {
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const classes = [
    { code: 'PP', name: 'Pre-Primary', label: 'Pre-Primary', sections: ['Section A', 'Section B'], students: 48, teachers: 2, color: '#6d28d9', bgColor: '#f3e8ff' },
    { code: 'I', name: 'Grade I', label: 'Grade 1', sections: ['Section A', 'Section B'], students: 72, teachers: 4, color: '#2563eb', bgColor: '#eff6ff' },
    { code: 'II', name: 'Grade II', label: 'Grade 2', sections: ['Section A', 'Section B'], students: 74, teachers: 4, color: '#059669', bgColor: '#ecfdf5' },
    { code: 'III', name: 'Grade III', label: 'Grade 3', sections: ['Section A', 'Section B'], students: 76, teachers: 4, color: '#d97706', bgColor: '#fffbeb' },
    { code: 'IV', name: 'Grade IV', label: 'Grade 4', sections: ['Section A', 'Section B'], students: 88, teachers: 4, color: '#ea580c', bgColor: '#fff5eb' },
    { code: 'V', name: 'Grade V', label: 'Grade 5', sections: ['Section A', 'Section B'], students: 92, teachers: 4, color: '#e11d48', bgColor: '#fff1f2' },
    { code: 'VI', name: 'Grade VI', label: 'Grade 6', sections: ['Section A', 'Section B'], students: 90, teachers: 4, color: '#7c3aed', bgColor: '#f5f3ff' },
    { code: 'VII', name: 'Grade VII', label: 'Grade 7', sections: ['Section A', 'Section B'], students: 86, teachers: 4, color: '#0891b2', bgColor: '#ecfeff' },
    { code: 'VIII', name: 'Grade VIII', label: 'Grade 8', sections: ['Section A', 'Section B'], students: 80, teachers: 4, color: '#4f46e5', bgColor: '#eef2ff' },
    { code: 'IX', name: 'Grade IX', label: 'Grade 9', sections: ['Section A', 'Section B'], students: 74, teachers: 4, color: '#16a34a', bgColor: '#f0fdf4' }
  ];

  if (selectedClass) {
    return (
      <ClassroomDetail 
        selectedClass={selectedClass} 
        onBack={() => setSelectedClass(null)} 
      />
    );
  }

  return (
    <div style={{ padding: '24px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'var(--font-sans)', boxSizing: 'border-box' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Classrooms & Divisions</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Track class advisors, active division roster counts, and spatial room coordinates.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
        gap: '20px',
        width: '100%'
      }}>
        {classes.map((c, idx) => (
          <ClassCard 
            key={idx} 
            c={c} 
            onSelectSection={(section) => {
              const details = getClassRoomAndAdvisor(c.name, section);
              setSelectedClass({
                ...c,
                section,
                room: details.room,
                advisor: details.advisor
              });
            }}
          />
        ))}
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '8px' }}>
        Showing 1 to 10 of 10 classes
      </div>
    </div>
  );
}

// =====================================================
// EXAMS VIEW (NEW)
// =====================================================
export function ExamsView() {
  const { examsSubView, examsSidebarActive } = useAppStore();

  const exams = [
    { subject: 'Data Structures - Midterm', date: '2026-06-20', time: '10:00 AM', duration: '3 Hours', passingRate: '92.5%', status: 'CONFIRMED' },
    { subject: 'Discrete Mathematics - Final', date: '2026-06-25', time: '02:00 PM', duration: '3 Hours', passingRate: '88.0%', status: 'SCHEDULED' },
    { subject: 'Quantum Physics Attestation Test', date: '2026-06-18', time: '09:00 AM', duration: '2 Hours', passingRate: '95.2%', status: 'LOCK_READY' }
  ];

  switch (examsSubView) {
    case 'exams-dashboard':
      return (
        <div style={{
          padding: '24px',
          background: 'var(--bg-primary)',
          height: '100%',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          fontFamily: 'var(--font-sans)',
        }}>
          {/* Header Block */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              {examsSidebarActive && (
                <button 
                  onClick={() => useAppStore.setState({ examsSidebarActive: false })}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--accent-blue)',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    marginBottom: '8px'
                  }}
                >
                  <ArrowLeft size={12} /> Back to Main Menu
                </button>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  Executive Examination Dashboard
                </h1>
                <span style={{
                  background: 'rgba(37, 99, 235, 0.1)',
                  color: 'var(--accent-blue)',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  Live
                </span>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                marginTop: '4px'
              }}>
                Real-time overview of examination operations and academic performance.
              </p>
            </div>

            {/* Right side buttons & search */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              {/* Search bar */}
              <div style={{ position: 'relative', width: '200px' }}>
                <Search size={14} style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="input-field"
                  style={{
                    paddingLeft: '30px',
                    height: '32px',
                    borderRadius: '6px',
                    fontSize: '11px'
                  }}
                />
              </div>

              {/* Notification icon */}
              <button style={{
                position: 'relative',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '6px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
              >
                <Bell size={16} />
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--accent-red)',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 700,
                  borderRadius: '50%',
                  width: '15px',
                  height: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 2px #ffffff'
                }}>
                  6
                </span>
              </button>

              {/* Action buttons */}
              <button className="btn btn-secondary btn-sm" style={{ height: '32px', gap: '6px', fontSize: '11px', borderRadius: '6px' }}>
                <FileText size={14} /> Examination Reports
              </button>

              <button className="btn btn-secondary btn-sm" style={{ height: '32px', gap: '6px', fontSize: '11px', borderRadius: '6px' }}>
                <Download size={14} /> Export
              </button>

              <button className="btn btn-primary btn-sm" style={{ height: '32px', gap: '6px', fontSize: '11px', borderRadius: '6px', fontWeight: 600 }}>
                <Plus size={14} /> Create Examination
              </button>
            </div>
          </div>

          {/* Operational Metrics Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {/* Card 1: Active Examinations */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(139, 92, 246, 0.08)',
                  color: 'var(--accent-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FileText size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                    Active Examinations
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      12
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--accent-green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <TrendingUp size={10} /> +20% vs last month
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-secondary)', margin: '0 -16px' }} />
              <div style={{ width: '100%', height: '24px', padding: '0 16px', boxSizing: 'border-box' }}>
                <svg width="100%" height="100%" viewBox="0 0 240 24" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  <path
                    d="M0,15 C48,10 96,20 144,8 C192,12 216,2 240,5"
                    fill="none"
                    stroke="var(--accent-purple)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Card 2: Students Registered */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  color: 'var(--accent-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Users size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                    Students Registered
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      4,826
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--accent-green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <TrendingUp size={10} /> +12.5% vs last month
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-secondary)', margin: '0 -16px' }} />
              <div style={{ width: '100%', height: '24px', padding: '0 16px', boxSizing: 'border-box' }}>
                <svg width="100%" height="100%" viewBox="0 0 240 24" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  <path
                    d="M0,18 C48,15 84,22 132,10 C168,12 204,2 240,6"
                    fill="none"
                    stroke="var(--accent-green)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Card 3: Results Published */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.08)',
                  color: 'var(--accent-amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Award size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                    Results Published
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      8
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--accent-green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <TrendingUp size={10} /> +33% vs last month
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-secondary)', margin: '0 -16px' }} />
              <div style={{ width: '100%', height: '24px', padding: '0 16px', boxSizing: 'border-box' }}>
                <svg width="100%" height="100%" viewBox="0 0 240 24" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  <path
                    d="M0,16 C36,22 72,12 120,20 C168,14 204,4 240,10"
                    fill="none"
                    stroke="var(--accent-amber)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Card 4: Pending Evaluations */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  color: 'var(--accent-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clipboard size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                    Pending Evaluations
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      242
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Scripts</span>
                    <span style={{ fontSize: '10px', color: 'var(--accent-red)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px', marginLeft: '4px' }}>
                      <TrendingDown size={10} /> 8.2% vs last month
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-secondary)', margin: '0 -16px' }} />
              <div style={{ width: '100%', height: '24px', padding: '0 16px', boxSizing: 'border-box' }}>
                <svg width="100%" height="100%" viewBox="0 0 240 24" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  <path
                    d="M0,10 C48,18 96,8 144,18 C192,10 216,22 240,12"
                    fill="none"
                    stroke="var(--accent-red)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Grid Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px',
            alignItems: 'start'
          }}>
            {/* LEFT COLUMN */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Card 1: Examination Progress Overview */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Examination Progress Overview
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '8px', fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }} /> Scheduled
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316' }} /> In Progress
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }} /> Evaluation
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} /> Completed
                      </span>
                    </div>

                    {/* Academic Year Selector */}
                    <select style={{
                      padding: '4px 8px',
                      fontSize: '10px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      border: '1px solid var(--border-primary)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      cursor: 'pointer'
                    }}>
                      <option>This Academic Year</option>
                      <option>Previous Academic Year</option>
                    </select>
                  </div>
                </div>

                {/* flex row: Y-axis labels + SVG */}
                <div style={{ display: 'flex', gap: '8px', height: '170px' }}>
                  {/* Y-axis Labels */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '20px',
                    height: '170px',
                    fontSize: '9px',
                    fontWeight: 600,
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-mono)',
                    paddingRight: '4px',
                    boxSizing: 'border-box',
                    lineHeight: '1'
                  }}>
                    <span>25</span>
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                  </div>

                  {/* SVG Chart area */}
                  <div style={{ flex: 1, height: '170px', position: 'relative' }}>
                    <svg width="100%" height="100%" viewBox="0 0 600 170" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                      {/* Grid lines */}
                      <line x1="0" y1="0" x2="600" y2="0" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="34" x2="600" y2="34" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="68" x2="600" y2="68" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="102" x2="600" y2="102" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="136" x2="600" y2="136" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="170" x2="600" y2="170" stroke="var(--border-primary)" strokeWidth="1" />
                      
                      {/* Scheduled (Blue) */}
                      <path
                        d="M0,110 L50,88 L100,105 L150,75 L200,90 L250,55 L300,78 L350,65 L400,38 L450,55 L500,85 L550,55 L600,60"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* In Progress (Orange) */}
                      <path
                        d="M0,150 L50,140 L100,145 L150,118 L200,125 L250,135 L300,115 L350,98 L400,120 L450,125 L500,140 L550,120 L600,125"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Evaluation (Purple) */}
                      <path
                        d="M0,160 L50,150 L100,155 L150,128 L200,134 L250,140 L300,132 L350,115 L400,112 L450,118 L500,125 L550,115 L600,125"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Completed (Green) */}
                      <path
                        d="M0,168 L50,163 L100,165 L150,152 L200,156 L250,162 L300,154 L350,142 L400,146 L450,140 L500,136 L550,146 L600,142"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Data Points Dots */}
                      {/* Scheduled */}
                      <circle cx="50" cy="88" r="3.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="150" cy="75" r="3.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="250" cy="55" r="3.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="400" cy="38" r="3.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="550" cy="55" r="3.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />

                      {/* In Progress */}
                      <circle cx="150" cy="118" r="3.5" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
                      <circle cx="350" cy="98" r="3.5" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
                      
                      {/* Evaluation */}
                      <circle cx="150" cy="128" r="3.5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
                      <circle cx="350" cy="115" r="3.5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* X-axis Labels */}
                <div style={{ display: 'flex', fontSize: '9px', fontWeight: 600, color: 'var(--text-tertiary)', padding: '8px 4px 0', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ width: '24px', flexShrink: 0 }} />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <span>May '25</span>
                    <span>Jun '25</span>
                    <span>Jul '25</span>
                    <span>Aug '25</span>
                    <span>Sep '25</span>
                    <span>Oct '25</span>
                    <span>Nov '25</span>
                    <span>Dec '25</span>
                    <span>Jan '26</span>
                    <span>Feb '26</span>
                    <span>Mar '26</span>
                    <span>Apr '26</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Row of 4 Sub-metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px'
              }}>
                {/* Card 2.1: Admit Cards */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {/* Top */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: 'rgba(37, 99, 235, 0.08)',
                      color: 'var(--accent-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CreditCard size={12} />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Admit Cards
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1px' }}>
                        4,826 <span style={{ fontSize: '9px', fontWeight: 500, color: 'var(--text-secondary)' }}>Generated</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div style={{ borderTop: '1px solid var(--border-secondary)' }} />

                  {/* Mid */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-primary)', fontWeight: 700 }}>
                    <span>3,991 <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '9px' }}>Downloaded</span></span>
                    <span>835 <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '9px' }}>Pending</span></span>
                  </div>

                  {/* Bottom Progress Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', color: 'var(--accent-blue)', fontWeight: 700, marginTop: '2px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'var(--border-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '82%', height: '100%', background: 'var(--accent-blue)' }} />
                    </div>
                    <span>82%</span>
                  </div>
                </div>

                {/* Card 2.2: Attendance Summary */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {/* Top */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: 'rgba(16, 185, 129, 0.08)',
                      color: 'var(--accent-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle2 size={12} />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Attendance
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1px' }}>
                        4,682 <span style={{ fontSize: '9px', fontWeight: 500, color: 'var(--text-secondary)' }}>Present</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div style={{ borderTop: '1px solid var(--border-secondary)' }} />

                  {/* Mid */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-primary)', fontWeight: 700 }}>
                    <span>144 <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '9px' }}>Absent</span></span>
                    <span>28 <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '9px' }}>Late</span></span>
                  </div>

                  {/* Bottom Progress Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', color: 'var(--accent-green)', fontWeight: 700, marginTop: '2px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'var(--border-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '97%', height: '100%', background: 'var(--accent-green)' }} />
                    </div>
                    <span>96.98%</span>
                  </div>
                </div>

                {/* Card 2.3: Evaluation Progress */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {/* Top */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: 'rgba(139, 92, 246, 0.08)',
                      color: 'var(--accent-purple)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Clipboard size={12} />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Evaluation
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1px' }}>
                        74% <span style={{ fontSize: '9px', fontWeight: 500, color: 'var(--text-secondary)' }}>Completed</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div style={{ borderTop: '1px solid var(--border-secondary)' }} />

                  {/* Mid */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-primary)', fontWeight: 700 }}>
                    <span>3,564 <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '9px' }}>Evaluated</span></span>
                    <span>1,278 <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '9px' }}>Pending</span></span>
                  </div>

                  {/* Bottom Progress Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', color: 'var(--accent-purple)', fontWeight: 700, marginTop: '2px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'var(--border-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '74%', height: '100%', background: 'var(--accent-purple)' }} />
                    </div>
                    <span>74%</span>
                  </div>
                </div>

                {/* Card 2.4: Result Processing */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {/* Top */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: 'rgba(245, 158, 11, 0.08)',
                      color: 'var(--accent-amber)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Brain size={12} />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Result Processing
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1px' }}>
                        96% <span style={{ fontSize: '9px', fontWeight: 500, color: 'var(--text-secondary)' }}>Ready</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div style={{ borderTop: '1px solid var(--border-secondary)' }} />

                  {/* Mid */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-primary)', fontWeight: 700 }}>
                    <span>4,635 <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '9px' }}>Completed</span></span>
                    <span>191 <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '9px' }}>Processing</span></span>
                  </div>

                  {/* Bottom Progress Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', color: 'var(--accent-amber)', fontWeight: 700, marginTop: '2px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'var(--border-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '96%', height: '100%', background: 'var(--accent-amber)' }} />
                    </div>
                    <span>96%</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Double Tables Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}>
                {/* 3.1: Upcoming Examinations */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      Upcoming Examinations
                    </h4>
                    <span style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--accent-blue)', cursor: 'pointer' }}>
                      View All
                    </span>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table" style={{ width: '100%', minWidth: '320px' }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '6px 8px', fontSize: '9px' }}>Exam Name</th>
                          <th style={{ padding: '6px 8px', fontSize: '9px' }}>Classes</th>
                          <th style={{ padding: '6px 8px', fontSize: '9px' }}>Dates</th>
                          <th style={{ padding: '6px 8px', fontSize: '9px' }}>Students</th>
                          <th style={{ padding: '6px 8px', fontSize: '9px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Half Yearly Examination', cls: 'III - XII', start: '15 May', end: '28 May', students: '4,826', status: 'In Progress', statusType: 'active' },
                          { name: 'Unit Test - I', cls: 'VI - XII', start: '05 Jun', end: '12 Jun', students: '3,214', status: 'Scheduled', statusType: 'info' },
                          { name: 'Practical Examination', cls: 'IX - XII', start: '20 Jun', end: '30 Jun', students: '1,982', status: 'Scheduled', statusType: 'info' },
                          { name: 'Annual Examination', cls: 'I - XII', start: '05 Oct', end: '25 Oct', students: '5,102', status: 'Planned', statusType: 'pending' },
                          { name: 'Board Preparation Test', cls: 'X - XII', start: '15 Nov', end: '30 Nov', students: '1,120', status: 'Planned', statusType: 'pending' }
                        ].map((row, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '8px 6px', fontSize: '10.5px', fontWeight: 600 }}>{row.name}</td>
                            <td style={{ padding: '8px 6px', fontSize: '10.5px' }}>{row.cls}</td>
                            <td style={{ padding: '8px 6px', fontSize: '10px', color: 'var(--text-secondary)' }}>
                              {row.start} - {row.end}
                            </td>
                            <td style={{ padding: '8px 6px', fontSize: '10.5px', fontFamily: 'var(--font-mono)' }}>{row.students}</td>
                            <td style={{ padding: '8px 6px' }}>
                              <span className={`badge ${row.statusType === 'active' ? 'badge-active' : row.statusType === 'info' ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: '9px', padding: '1px 5px' }}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3.2: Top Performers */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      Top Performers <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }}>(Latest Exam)</span>
                    </h4>
                    <span style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--accent-blue)', cursor: 'pointer' }}>
                      View All
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { rank: 1, name: 'Aarav Sharma', cls: 'X-A', score: '98.6%', color: '#f59e0b' },
                      { rank: 2, name: 'Diya Patel', cls: 'X-B', score: '97.4%', color: '#94a3b8' },
                      { rank: 3, name: 'Vivaan Mehta', cls: 'X-A', score: '96.8%', color: '#b45309' },
                      { rank: 4, name: 'Ananya Singh', cls: 'IX-C', score: '95.7%' },
                      { rank: 5, name: 'Kabir Verma', cls: 'IX-B', score: '95.3%' }
                    ].map((row, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 8px',
                        borderRadius: '8px',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-secondary)',
                        fontSize: '11px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: row.rank <= 3 ? row.color : '#e2e8f0',
                            color: row.rank <= 3 ? '#ffffff' : 'var(--text-secondary)',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px'
                          }}>
                            {row.rank}
                          </span>
                          {/* Mini Avatar icon */}
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: '#2563eb15',
                            color: 'var(--accent-blue)',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '9px'
                          }}>
                            {row.name.charAt(0)}
                          </div>
                          <div>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</span>
                            <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginLeft: '6px' }}>{row.cls}</span>
                          </div>
                        </div>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                          {row.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Row 1: Evaluation Status Donut & Pass Percentage side-by-side */}
              <div style={{
                display: 'flex',
                gap: '16px'
              }}>
                {/* 1.1: Evaluation Status */}
                <div style={{
                  flex: 1,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Evaluation Status
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    {/* SVG Donut */}
                    <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                      <svg width="80" height="80" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                        {/* Evaluated 74% (Green) */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="38" 
                          fill="transparent" 
                          stroke="var(--accent-green)" 
                          strokeWidth="10" 
                          strokeDasharray="238.76" 
                          strokeDashoffset="62.08" 
                          strokeLinecap="round" 
                          transform="rotate(-90 50 50)"
                        />
                        {/* In Progress 15% (Orange) */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="38" 
                          fill="transparent" 
                          stroke="var(--accent-amber)" 
                          strokeWidth="10" 
                          strokeDasharray="238.76" 
                          strokeDashoffset="202.94" 
                          strokeLinecap="round" 
                          transform="rotate(176.4 50 50)"
                        />
                        {/* Pending 11% (Purple) */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="38" 
                          fill="transparent" 
                          stroke="var(--accent-purple)" 
                          strokeWidth="10" 
                          strokeDasharray="238.76" 
                          strokeDashoffset="212.5" 
                          strokeLinecap="round" 
                          transform="rotate(230.4 50 50)"
                        />
                      </svg>
                      <div style={{
                        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', lineHeight: 1.1
                      }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>74%</span>
                        <span style={{ fontSize: '7px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Evaluated</span>
                      </div>
                    </div>

                    {/* Donut Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                      {[
                        { label: 'Evaluated', percent: '74%', val: '3,564', color: 'var(--accent-green)' },
                        { label: 'In Progress', percent: '15%', val: '723', color: 'var(--accent-amber)' },
                        { label: 'Pending', percent: '11%', val: '539', color: 'var(--accent-purple)' }
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: item.color }} />
                            {item.label}
                          </span>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '9.5px' }}>
                            {item.percent} <span style={{ color: 'var(--text-muted)', fontSize: '8px', fontWeight: 500 }}>({item.val})</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 1.2: Pass Percentage */}
                <div style={{
                  flex: 1,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      Pass Percentage
                    </h4>
                    <span style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>All Exams</span>
                    
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '12px' }}>
                      <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        85.4%
                      </span>
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                      <TrendingUp size={10} /> +6.8% vs last year
                    </div>
                  </div>
                  
                  {/* Sparkline mini-graph path */}
                  <div style={{ width: '100%', height: '35px', marginTop: '8px' }}>
                    <svg width="100%" height="100%" viewBox="0 0 200 35" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                      <path
                        d="M0,28 L30,15 L60,22 L90,17 L120,25 L150,12 L180,18 L200,8"
                        fill="none"
                        stroke="var(--accent-blue)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="200" cy="8" r="3" fill="#ffffff" stroke="var(--accent-blue)" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 2: Grade Distribution */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                  Grade Distribution <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }}>(All Exams)</span>
                </h4>
                
                {[
                  { grade: 'A (90-100)', pct: 28, color: 'var(--accent-green)' },
                  { grade: 'B (75-89)', pct: 34, color: 'var(--accent-blue)' },
                  { grade: 'C (60-74)', pct: 24, color: 'var(--accent-amber)' },
                  { grade: 'D (40-59)', pct: 10, color: 'var(--accent-red)' },
                  { grade: 'E (<40)', pct: 4, color: '#f43f5e' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', fontSize: '10.5px' }}>
                    <span style={{ width: '70px', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.grade}</span>
                    <div style={{ flex: 1, height: '6px', background: 'var(--border-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
                    </div>
                    <span style={{ width: '30px', textAlign: 'right', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Card 3: Announcements */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Announcements
                  </h4>
                  <span style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--accent-blue)', cursor: 'pointer' }}>
                    View All
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { title: 'Half Yearly Examination Timetable Published', desc: 'Timetable for Half Yearly Examination is now available.', time: 'Today, 10:30 AM', color: 'rgba(139, 92, 246, 0.08)', textCol: 'var(--accent-purple)', icon: <Calendar size={12} /> },
                    { title: 'Admit Cards Available', desc: 'Admit cards for Half Yearly Examination are ready for download.', time: 'Yesterday, 04:15 PM', color: 'rgba(16, 185, 129, 0.08)', textCol: 'var(--accent-green)', icon: <CreditCard size={12} /> },
                    { title: 'Result Declaration Notice', desc: 'Annual Examination results will be published on 10 June 2026.', time: '2 Days Ago', color: 'rgba(245, 158, 11, 0.08)', textCol: 'var(--accent-amber)', icon: <Bell size={12} /> }
                  ].map((ann, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '11px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: ann.color,
                        color: ann.textCol,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {ann.icon}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{ann.title}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '10px', marginTop: '2px', lineHeight: 1.3 }}>{ann.desc}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '9px', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>{ann.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <span style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginTop: '4px' }}>
                  See All Announcements →
                </span>
              </div>

              {/* Card 4: Quick Actions */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                  Quick Actions
                </h4>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px'
                }}>
                  {[
                    { label: 'Create Examination', icon: <Plus size={13} />, color: 'var(--accent-blue)', bg: 'rgba(37, 99, 235, 0.06)' },
                    { label: 'Generate Admit Cards', icon: <CreditCard size={13} />, color: 'var(--accent-blue)', bg: 'rgba(37, 99, 235, 0.06)' },
                    { label: 'Mark Attendance', icon: <UserCheck size={13} />, color: 'var(--accent-green)', bg: 'rgba(16, 185, 129, 0.06)' },
                    { label: 'Upload Marks', icon: <FileSpreadsheet size={13} />, color: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.06)' },
                    { label: 'Process Results', icon: <Brain size={13} />, color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.06)' },
                    { label: 'Generate Report Cards', icon: <FileText size={13} />, color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.06)' },
                    { label: 'View Analytics', icon: <BarChart3 size={13} />, color: 'var(--accent-blue)', bg: 'rgba(37, 99, 235, 0.06)' },
                    { label: 'Exam Reports', icon: <FileText size={13} />, color: 'var(--accent-cyan)', bg: 'rgba(6, 182, 212, 0.06)' }
                  ].map((act, idx) => (
                    <button
                      key={idx}
                      style={{
                        padding: '8px 10px',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        textAlign: 'left'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = act.color;
                        e.currentTarget.style.background = act.bg;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-primary)';
                        e.currentTarget.style.background = 'var(--bg-primary)';
                      }}
                    >
                      <span style={{ color: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {act.icon}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{act.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'exams-result-processing':
      return <ResultProcessingCenter />;
    case 'exams-admit-card':
      return <AdmitCardCenter />;
    default: {
      const getExamsTabLabel = (subView: string) => {
        switch (subView) {
          case 'exams-planning': return 'Examination Planning';
          case 'exams-schedule': return 'Exam Schedule Center';
          case 'exams-hall-seating': return 'Hall & Seating Management';
          case 'exams-admit-card': return 'Admit Card Center';
          case 'exams-attendance-invigilation': return 'Attendance & Invigilation';
          case 'exams-question-vault': return 'Question Paper Vault';
          case 'exams-evaluation': return 'Evaluation Center';
          case 'exams-marks-entry': return 'Marks Entry';
          case 'exams-result-processing': return 'Result Processing';
          case 'exams-analytics': return 'Academic Analytics';
          case 'exams-rank-merit': return 'Rank & Merit Lists';
          case 'exams-transcript': return 'Transcript Center';
          case 'exams-report-cards': return 'Report Cards';
          case 'exams-certificates': return 'Certificates';
          case 'exams-reports': return 'Examination Reports';
          default: return 'Examination Registry';
        }
      };
      const activeTabLabel = getExamsTabLabel(examsSubView);
      return (
        <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{activeTabLabel}</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>System tools, configurations, and entries for {activeTabLabel.toLowerCase()}.</p>
          </div>
          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-primary)', 
            borderRadius: '12px', 
            padding: '48px 24px', 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              background: 'rgba(59, 130, 246, 0.08)', 
              color: 'var(--accent-blue)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Award size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>{activeTabLabel} Registry</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '380px', margin: '4px auto 0' }}>
                Manage exams, setups, details and reports for {activeTabLabel.toLowerCase()} within the assessment office control center.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

// =====================================================
// TIMETABLE VIEW (NEW)
// =====================================================
export function TimetableView() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const schedule = [
    { time: '08:30 AM - 09:30 AM', slots: ['Data Structures (10-A)', 'Discrete Math (10-B)', 'Quantum Physics (11-S)', 'Technical Writing (9-A)', 'Free Slot'] },
    { time: '09:45 AM - 10:45 AM', slots: ['Discrete Math (10-A)', 'Data Structures (10-B)', 'Free Slot', 'Quantum Physics (11-S)', 'Technical Writing (9-A)'] },
    { time: '11:00 AM - 12:00 PM', slots: ['Physics Lab (11-S)', 'Database Lab (10-A)', 'Mathematics (10-B)', 'Free Slot', 'Humanities Seminar (9-A)'] },
    { time: '01:00 PM - 02:00 PM', slots: ['Technical Writing (9-A)', 'Free Slot', 'Data Structures (10-A)', 'Discrete Math (10-B)', 'Quantum Physics (11-S)'] }
  ];

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Timetable & Scheduling Matrix</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>View institutional time slot occupancy matrix.</p>
      </div>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Time Range</th>
              {days.map((d, i) => <th key={i}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, idx) => (
              <tr key={idx}>
                <td className="font-mono text-xs" style={{ fontWeight: 700 }}>{row.time}</td>
                {row.slots.map((slot, sidx) => (
                  <td key={sidx} style={{ 
                    background: slot.includes('Free') ? '#fafafa' : '#eff6ff',
                    color: slot.includes('Free') ? 'var(--text-muted)' : 'var(--accent-blue)',
                    fontWeight: slot.includes('Free') ? 400 : 600,
                    fontSize: '11px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {slot}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================
// GRADEBOOK VIEW (NEW)
// =====================================================
export function GradebookView() {
  const grades = [
    { student: 'Arjun Mehta', math: 'A1', science: 'A2', english: 'A1', gpa: '9.4' },
    { student: 'Priya Sharma', math: 'A1', science: 'A1', english: 'A2', gpa: '9.6' },
    { student: 'Rohan Gupta', math: 'B1', science: 'B2', english: 'A2', gpa: '8.2' },
    { student: 'Ananya Patel', math: 'A2', science: 'A1', english: 'A1', gpa: '9.3' },
    { student: 'Karan Singh', math: 'C1', science: 'B2', english: 'B1', gpa: '7.4' }
  ];

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Gradebook Attestation Sheets</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Attest letter grades, compile class GPAs, and execute transcript lockers.</p>
        </div>
        <button className="btn btn-primary btn-sm"><Check size={14} /> Attest Class Grades</button>
      </div>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Identity Name</th>
              <th>Mathematics</th>
              <th>Quantum Science</th>
              <th>English Writing</th>
              <th>Cumulative GPA</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 700 }}>{g.student}</td>
                <td className="font-mono">{g.math}</td>
                <td className="font-mono">{g.science}</td>
                <td className="font-mono">{g.english}</td>
                <td className="font-mono" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{g.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================
// LIBRARY VIEW (NEW)
// =====================================================
export function LibraryView() {
  const libraryLog = [
    { title: 'Introduction to Algorithms', borrower: 'Arjun Mehta', date: '2026-06-01', due: '5 Days Left', status: 'ISSUED' },
    { title: 'Design Patterns', borrower: 'Priya Sharma', date: '2026-05-28', due: 'Overdue 1 Day', status: 'OVERDUE' },
    { title: 'Principles of Quantum Mechanics', borrower: 'Rohan Gupta', date: '2026-06-03', due: '14 Days Left', status: 'ISSUED' }
  ];

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Library Circulation Logs</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Track catalog item circulations, loan releases, and borrowing timelines.</p>
      </div>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Borrowed Asset Title</th>
              <th>Borrower Student</th>
              <th>Circulation Date</th>
              <th>Due Status</th>
              <th>Operational Status</th>
            </tr>
          </thead>
          <tbody>
            {libraryLog.map((l, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600 }}>{l.title}</td>
                <td>{l.borrower}</td>
                <td className="font-mono text-xs">{l.date}</td>
                <td style={{ color: l.status === 'OVERDUE' ? 'var(--accent-red)' : 'var(--text-secondary)', fontWeight: 600 }}>{l.due}</td>
                <td>
                  <span className={`badge ${l.status === 'OVERDUE' ? 'badge-critical' : 'badge-active'}`}>{l.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================
// COMMUNICATION VIEW (NEW)
// =====================================================
export function CommunicationView() {
  const [channel, setChannel] = useState('ALL');
  const [msg, setMsg] = useState('');
  const [log, setLog] = useState<string[]>([]);

  const handleBroadcast = () => {
    if (!msg.trim()) return;
    setLog(prev => [`[Broadcast Outbox] (${channel}) - ${msg}`, ...prev]);
    setMsg('');
  };

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Communication & Dispatch Center</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Broadcast announcements to parents, students, or institutional staff networks.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
        {/* Composer */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>COMPOSE BROADCAST</h3>
          <div>
            <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>Target Channel</label>
            <select value={channel} onChange={e => setChannel(e.target.value)} className="input-field" style={{ width: '100%', height: '36px' }}>
              <option value="ALL">All Network Node (Everyone)</option>
              <option value="FACULTY">Faculty & Staff Nodes</option>
              <option value="STUDENTS">Student Identities</option>
              <option value="PARENTS">Primary Guardians</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>Message Body</label>
            <textarea 
              value={msg} 
              onChange={e => setMsg(e.target.value)} 
              placeholder="Enter message dispatch details..." 
              className="input-field" 
              style={{ width: '100%', height: '100px', resize: 'none', padding: '10px' }}
            />
          </div>
          <button onClick={handleBroadcast} className="btn btn-primary" style={{ gap: '6px', alignSelf: 'flex-end' }}><Send size={14} /> Send Broadcast</button>
        </div>

        {/* Dispatch Log */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>DISPATCHED OUTBOX</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flex: 1, maxHeight: '220px' }}>
            {log.map((item, idx) => (
              <div key={idx} style={{ padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
                {item}
              </div>
            ))}
            {log.length === 0 && <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', padding: '24px' }}>No messages sent yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// FINANCE VIEW (NEW - with sub-navigation)
// =====================================================
export function FinanceView() {
  const financeSubView = useAppStore(s => s.financeSubView);

  switch (financeSubView) {
    case 'finance-dashboard':
      return <ExecutiveDashboardSubView />;
    case 'finance-fee-collection':
      return <FeeCollectionSubView />;
    case 'finance-defaulters':
      return <DefaultersRecoverySubView />;
    case 'finance-payroll':
      return <PayrollSubView />;
    case 'finance-reports':
      return <FinancialReportsSubView />;
    case 'finance-revenue':
    default:
      return (
        <div style={{ padding: '20px', background: '#f8fafc', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'system-ui, sans-serif' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Revenue Analytics</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Analyze revenue streams, collection trends, and income breakdowns by category and term.</p>
          </div>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '48px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '400px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: '#2563eb',
            }}>
              <TrendingUp size={28} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
              Revenue Analytics Control
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '380px', lineHeight: 1.5, margin: 0 }}>
              This module is part of the Finance CFO Control Center. Multi-dimensional filters, projections, and breakdown charts will load here.
            </p>
          </div>
        </div>
      );
  }
}

// =====================================================
// FACILITIES VIEW (NEW)
// =====================================================
export function FacilitiesView() {
  const rooms = [
    { name: 'Physics Laboratory 1', type: 'Laboratory', capacity: 30, status: 'IN_USE', currentClass: '11-Science' },
    { name: 'Room 302 (Mathematics)', type: 'Classroom', capacity: 45, status: 'IN_USE', currentClass: '10-A' },
    { name: 'Secondary Gymnasium', type: 'Sports Hall', capacity: 150, status: 'AVAILABLE', currentClass: 'Free Slot' },
    { name: 'Institutional Auditorium', type: 'Hall', capacity: 500, status: 'MAINTENANCE', currentClass: 'N/A' }
  ];

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Facilities & Spaces Registry</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Track room occupancies, maintenance cycles, and laboratory capacities.</p>
      </div>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Facility Space Room</th>
              <th>Space Type</th>
              <th>Capacity Max</th>
              <th>Active Division occupancy</th>
              <th>Operational Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 700 }}>{r.name}</td>
                <td>{r.type}</td>
                <td className="font-mono">{r.capacity}</td>
                <td>{r.currentClass}</td>
                <td>
                  <span className={`badge ${r.status === 'AVAILABLE' ? 'badge-active' : r.status === 'IN_USE' ? 'badge-info' : 'badge-warning'}`}>
                    {r.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================
// REPORTS VIEW (NEW)
// =====================================================
export function ReportsView() {
  const reports = [
    { title: 'Cumulative Academic Performance Index', type: 'PDF Report', size: '2.4 MB', code: 'REP-ACA-001' },
    { title: 'Multi-Tenant Fee Overdue Invoices Roster', type: 'XLS Ledger', size: '410 KB', code: 'REP-FIN-102' },
    { title: 'Attendance Ledger Attestations Index', type: 'PDF Report', size: '1.2 MB', code: 'REP-ATT-042' }
  ];

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Reports & Data Exporters</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Download certified ledgers, performance index spreadsheets, and attendance audits.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {reports.map((rep, idx) => (
          <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', background: 'rgba(59,130,246,0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                {rep.code}
              </span>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '8px', marginBottom: '4px' }}>{rep.title}</h3>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{rep.type} • {rep.size}</div>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ gap: '6px', width: '100%', background: 'var(--bg-secondary)' }}><Download size={14} /> Export Encrypted Document</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// SYSTEM LOGS VIEW (NEW)
// =====================================================
export function SystemLogsView() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Generate simulated server startup logs on mount
    const initial = [
      '[INFO] 10:28:12 Starting Akedex Platform Spring Boot Service v1.0.0-PROD',
      '[INFO] 10:28:14 HikariPool-1 - Starting...',
      '[INFO] 10:28:15 HikariPool-1 - Start completed (PostgreSQL jdbc:postgresql://localhost:5432/akedex)',
      '[INFO] 10:28:16 Flyway Community Edition 10.11.0.1 initialized',
      '[INFO] 10:28:16 Successfully validated 1 migration schema (v1_initial_schema)',
      '[INFO] 10:28:18 Spring Security Filter Chain Initialized successfully',
      '[INFO] 10:28:20 Tomcat initialized on port 8080 (http)',
      '[INFO] 10:28:21 Akedex Application started successfully in 8.42 seconds'
    ];
    setLogs(initial);

    // Periodically add active transaction logs
    const interval = setInterval(() => {
      const active = [
        `[INFO] ${new Date().toLocaleTimeString()} HikariPool-1 - Active connections: 2, Idle: 8`,
        `[INFO] ${new Date().toLocaleTimeString()} REST API GET /api/students - 200 OK (tenant-dps)`,
        `[INFO] ${new Date().toLocaleTimeString()} REST API GET /api/cases - 200 OK (tenant-dps)`,
        `[INFO] ${new Date().toLocaleTimeString()} JVM Garbage Collection Cycle Executed - Released 42MB`
      ];
      setLogs(prev => [...prev, active[Math.floor(Math.random() * active.length)]].slice(-20)); // Limit to last 20 rows
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0b10', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e2030', background: '#0f1117', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#e4e5ea', margin: 0 }}>SYSTEM KERNEL CONSOLE</h2>
          <span style={{ fontSize: '11px', color: '#9ca0b0' }}>Real-time transaction and query logs stream</span>
        </div>
        <button onClick={() => setLogs([])} className="btn btn-ghost btn-xs" style={{ color: '#9ca0b0', border: '1px solid #1e2030', display: 'flex', gap: '4px' }}><RefreshCw size={12} /> Flush Console</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
        {logs.map((log, index) => {
          let color = '#e4e5ea';
          if (log.includes('REST API')) color = '#3b82f6';
          if (log.includes('Garbage Collection')) color = '#8b5cf6';
          if (log.includes('started successfully')) color = '#10b981';

          return (
            <div key={index} style={{ color, whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
              {log}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================
// PROFILE VIEW (NEW)
// =====================================================
export function ProfileView() {
  return <SchoolProfileView />;
}

// =====================================================
// NOTIFICATIONS VIEW (NEW)
// =====================================================
export function NotificationsView() {
  const openTab = useAppStore(s => s.openTab);
  const [alerts, setAlerts] = useState([
    { id: '1', title: 'At Risk Students Flagged', desc: '23 identities fell below 75% attendance threshold', color: 'var(--accent-red)', view: 'students', label: 'Students', date: 'Just now', severity: 'CRITICAL' },
    { id: '2', title: 'Transcripts Pending Verification', desc: '4 applications awaiting attestation signature', color: 'var(--accent-amber)', view: 'documents', label: 'Documents', date: '5 min ago', severity: 'WARNING' },
    { id: '3', title: 'Compliance Exception Logged', desc: 'Duplicate universal academic record warning', color: 'var(--accent-red)', view: 'audit', label: 'System Audit', date: '12 min ago', severity: 'CRITICAL' },
    { id: '4', title: 'Attestation Snapshot Synced', desc: 'Encrypted backup ledger attestation synced', color: 'var(--accent-green)', view: 'dashboard', label: 'Overview', date: '1 hour ago', severity: 'INFO' }
  ]);

  const handleAction = (alert: typeof alerts[0]) => {
    openTab({
      id: alert.view,
      label: alert.label,
      view: alert.view as any,
      closable: alert.view !== 'dashboard',
    });
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div style={{ padding: '16px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>System Alerts & Notifications Ledger</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Review critical, operational, and system transaction alerts.</p>
        </div>
        {alerts.length > 0 && (
          <button className="btn btn-secondary btn-sm" onClick={() => setAlerts([])} style={{ border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', display: 'flex', gap: '4px' }}>
            <Trash2 size={14} /> Clear All Notifications
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alerts.map(a => (
          <div 
            key={a.id} 
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-primary)', 
              borderRadius: '8px', 
              padding: '16px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color, marginTop: '5px', flexShrink: 0 }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{a.title}</h3>
                  <span className={`badge ${a.severity === 'CRITICAL' ? 'badge-critical' : a.severity === 'WARNING' ? 'badge-warning' : 'badge-active'}`} style={{ fontSize: '8px', padding: '1px 4px' }}>
                    {a.severity}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{a.desc}</p>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>{a.date}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-primary btn-sm" onClick={() => handleAction(a)}>Investigate</button>
              <button className="btn btn-secondary btn-sm" onClick={() => removeAlert(a.id)} style={{ border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} /></button>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '36px', textAlign: 'center', color: 'var(--text-tertiary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={32} className="text-emerald-500" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>No Active System Alerts</div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Your EOE environment is completely synchronized and operational.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// =====================================================
// STUDENT PROFILE VIEW (NEW REDESIGNED DASHBOARD)
// =====================================================

// Helper to dynamically enrich student data based on their core record
function getEnrichedStudentData(student: any) {
  const idNum = parseInt(student.id) || 1;
  const isAarav = idNum === 1;
  
  const ain = student.uai || `AKD-STU-2026-${idNum.toString().padStart(6, 'X')}`;
  const uai = ain;
  const firstName = isAarav ? 'Aarav' : (student.firstName || 'Aarav');
  const lastName = isAarav ? 'Sharma' : (student.lastName || 'Sharma');
  const fullName = `${firstName} ${lastName}`;
  const status = student.status || 'ACTIVE';
  const institution = isAarav ? 'Your School Name' : (student.institution || 'Springfield International School');
  
  let grade = isAarav ? '10' : '10';
  let section = isAarav ? 'A' : 'A';
  if (!isAarav && student.class) {
    const parts = student.class.split('-');
    if (parts.length > 0) grade = parts[0];
    if (parts.length > 1) section = parts[1];
  }
  const rollNo = isAarav ? 23 : ((idNum * 7) % 29 + 1);
  
  const dobYear = student.dob ? parseInt(student.dob.split('-')[0]) : 2011;
  const age = 2026 - dobYear;
  const academicAge = isAarav ? '15 Years' : `${age} Years`;
  
  const gpaVal = isAarav ? '8.9' : (8.0 + (idNum % 7) * 0.3 - (idNum % 3) * 0.1).toFixed(1);
  const gpa = parseFloat(gpaVal) > 10.0 ? '9.8' : gpaVal;
  
  const attendanceRate = isAarav ? 96.4 : (student.attendance || 96.4);
  const attendanceTrend = isAarav ? '+4.2%' : `+${(1.2 + (idNum % 4) * 0.8).toFixed(1)}%`;
  
  const isPaid = isAarav || (idNum % 3 !== 0 && idNum !== 7);
  const totalFees = idNum === 7 ? 120000 : 85000;
  const paidAmount = idNum === 7 ? 84500 : (isPaid ? 85000 : 45000);
  const outstanding = totalFees - paidAmount;
  const feeStatus = outstanding === 0 ? 'Paid' : 'Pending';
  
  const riskScoreVal = isAarav ? '2.1' : (1.5 + (100 - attendanceRate) * 0.2).toFixed(1);
  const riskScore = parseFloat(riskScoreVal) > 10.0 ? '9.5' : riskScoreVal;
  const riskLabel = parseFloat(riskScore) < 3.5 ? 'Low' : parseFloat(riskScore) < 6.5 ? 'Medium' : 'High';
  
  const behaviorScoreVal = isAarav ? 94 : Math.min(100, 85 + (idNum % 5) * 4 - (idNum % 2) * 3);
  const behaviorLabel = behaviorScoreVal >= 90 ? 'Excellent' : behaviorScoreVal >= 80 ? 'Good' : 'Satisfactory';
  
  const bloodGroup = isAarav ? 'O+' : ['A+', 'B+', 'O+', 'AB+', 'O-', 'A-'][idNum % 6];
  const nationality = 'Indian';
  const aadhaar = isAarav ? 'XXXX-XXXX-4587' : `XXXX-XXXX-${(4587 + idNum * 13) % 10000}`;
  const email = isAarav ? 'aarav.sharma@springfield.edu.in' : (student.email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@springfield.edu.in`);
  const phone = isAarav ? '+91 98765 43210' : (student.phone || `+91 98765 ${43210 + idNum}`);
  
  const guardianSurname = lastName;
  const fatherName = isAarav ? 'Rajesh Sharma' : (student.guardian && student.gender === 'MALE' && idNum % 2 === 0 ? student.guardian : `${['Rajesh', 'Sanjay', 'Vikram', 'Ramesh', 'Anil'][idNum % 5]} ${lastName}`);
  const motherName = isAarav ? 'Priya Sharma' : `${['Priya', 'Sunita', 'Anjali', 'Kiran', 'Meena'][idNum % 5]} ${lastName}`;
  const guardianName = isAarav ? 'Rajesh Sharma' : (student.guardian || fatherName);
  const guardianPhone = isAarav ? '+91 98765 11111' : (student.guardianPhone || `+91 98765 ${11111 + idNum * 2}`);
  const parentEmail = isAarav ? 'rajesh.sharma@email.com' : `${guardianName.toLowerCase().split(' ')[0]}.${lastName.toLowerCase()}@email.com`;
  const occupation = isAarav ? 'Business' : ['Business', 'Engineer', 'Doctor', 'Teacher', 'Executive'][idNum % 5];
  
  const baseGpa = parseFloat(gpa);
  const chartData = isAarav ? [
    { month: 'Apr', gpa: 7.2 },
    { month: 'May', gpa: 7.5 },
    { month: 'Jun', gpa: 7.9 },
    { month: 'Jul', gpa: 7.8 },
    { month: 'Aug', gpa: 8.2 },
    { month: 'Sep', gpa: 8.0 },
    { month: 'Oct', gpa: 8.3 },
    { month: 'Nov', gpa: 8.5 },
    { month: 'Dec', gpa: 8.6 },
    { month: 'Mar', gpa: 8.9 }
  ] : [
    { month: 'Apr', gpa: parseFloat((baseGpa - 1.1).toFixed(1)) },
    { month: 'May', gpa: parseFloat((baseGpa - 0.9).toFixed(1)) },
    { month: 'Jun', gpa: parseFloat((baseGpa - 0.7).toFixed(1)) },
    { month: 'Jul', gpa: parseFloat((baseGpa - 0.8).toFixed(1)) },
    { month: 'Aug', gpa: parseFloat((baseGpa - 0.5).toFixed(1)) },
    { month: 'Sep', gpa: parseFloat((baseGpa - 0.6).toFixed(1)) },
    { month: 'Oct', gpa: parseFloat((baseGpa - 0.3).toFixed(1)) },
    { month: 'Nov', gpa: parseFloat((baseGpa - 0.2).toFixed(1)) },
    { month: 'Dec', gpa: parseFloat((baseGpa - 0.1).toFixed(1)) },
    { month: 'Mar', gpa: baseGpa }
  ].map(d => ({ ...d, gpa: Math.max(4.0, Math.min(10.0, d.gpa)) }));
  
  const classRank = isAarav ? 12 : ((idNum * 3) % 35 + 2);
  const totalInClass = 120;
  
  const subjects = isAarav ? [
    { name: 'English', max: 100, marks: 88, rank: 3, grade: 'A' },
    { name: 'Mathematics', max: 100, marks: 92, rank: 2, grade: 'A+' },
    { name: 'Science', max: 100, marks: 86, rank: 4, grade: 'A' },
    { name: 'Social Science', max: 100, marks: 84, rank: 5, grade: 'A' },
    { name: 'Hindi', max: 100, marks: 80, rank: 6, grade: 'B+' },
    { name: 'Computer', max: 100, marks: 90, rank: 1, grade: 'A+' }
  ] : [
    { name: 'Mathematics', max: 100, marks: Math.min(100, 85 + (idNum % 4) * 4), rank: Math.max(1, (idNum * 3) % 25) },
    { name: 'Science', max: 100, marks: Math.min(100, 80 + (idNum % 5) * 4), rank: Math.max(1, (idNum * 2) % 25) },
    { name: 'English', max: 100, marks: Math.min(100, 78 + (idNum % 3) * 6), rank: Math.max(1, (idNum * 4) % 25) },
    { name: 'Social Science', max: 100, marks: Math.min(100, 82 + (idNum % 6) * 3), rank: Math.max(1, (idNum * 5) % 25) },
    { name: 'Computer Science', max: 100, marks: Math.min(100, 88 + (idNum % 3) * 4), rank: Math.max(1, (idNum * 2) % 25) },
  ].map(s => {
    let grade = 'B';
    if (s.marks >= 90) grade = 'A+';
    else if (s.marks >= 80) grade = 'A';
    else if (s.marks >= 70) grade = 'B+';
    return { ...s, grade };
  });
  
  const achievements = [
    { title: 'Math Olympiad', prize: 'Gold Medal', year: '2025' },
    { title: 'Science Fair', prize: 'First Prize', year: '2025' },
    { title: 'Essay Writing', prize: 'Second Prize', year: '2024' },
    { title: 'Inter School Quiz', prize: 'Winner', year: '2024' },
  ];
  
  const journey = isAarav ? [
    { year: '2026', grade: 'Grade 10 (Current)', school: 'Springfield International School' },
    { year: '2025', grade: 'Grade 9', school: 'Springfield International School' },
    { year: '2024', grade: 'Grade 8', school: 'Bright Future Academy' },
    { year: '2023', grade: 'Grade 7', school: 'Bright Future Academy' }
  ] : [
    { year: '2026', grade: `Grade ${grade} (Current)`, school: institution },
    { year: '2025', grade: `Grade ${parseInt(grade) - 1 || 9}`, school: institution },
    { year: '2024', grade: `Grade ${parseInt(grade) - 2 || 8}`, school: idNum % 2 === 0 ? 'Bright Future Academy' : institution },
    { year: '2023', grade: `Grade ${parseInt(grade) - 3 || 7}`, school: idNum % 2 === 0 ? 'Bright Future Academy' : 'Sunrise Public School' }
  ];
  
  const totalDays = 229;
  const presentDays = isAarav ? 212 : Math.round((attendanceRate / 100) * totalDays);
  const absentDays = isAarav ? 6 : Math.round(((100 - attendanceRate) * 0.4 / 100) * totalDays);
  const leaveDays = isAarav ? 5 : Math.round(((100 - attendanceRate) * 0.3 / 100) * totalDays);
  const halfDays = isAarav ? 3 : Math.max(0, totalDays - presentDays - absentDays - leaveDays);
  
  const documents = isAarav ? [
    { name: 'Atlanta, USA', date: '14 Jan 2024' },
    { name: 'Birth Certificate', date: '14 Jan 2024' },
    { name: 'Transfer Certificate', date: '14 Jan 2024' },
    { name: 'Marksheet (2024)', date: '14 Jan 2024' },
    { name: 'Bonafide Certificate', date: '14 Jan 2024' }
  ] : [
    { name: 'Birth Certificate', date: '14 Jan 2024' },
    { name: 'Transfer Certificate', date: '14 Jan 2024' },
    { name: 'Marksheet (2024)', date: '14 Jan 2024' },
    { name: 'Bonafide Certificate', date: '14 Jan 2024' }
  ];
  
  return {
    id: student.id,
    uai,
    ain,
    firstName,
    lastName,
    fullName,
    status,
    institution,
    grade,
    section,
    rollNo,
    academicAge,
    gpa,
    attendanceRate,
    attendanceTrend,
    totalFees,
    paidAmount,
    outstanding,
    feeStatus,
    riskScore,
    riskLabel,
    behaviorScore: behaviorScoreVal,
    behaviorLabel,
    bloodGroup,
    dob: isAarav ? '14 Mar 2011' : (student.dob || '14 Mar 2011'),
    admissionNo: isAarav ? '2021/0456' : (student.admissionNo || `2021/${idNum.toString().padStart(4, '0')}`),
    nationality,
    aadhaar,
    email,
    phone,
    fatherName,
    motherName,
    guardianName,
    guardianPhone,
    parentEmail,
    occupation,
    chartData,
    classRank,
    totalInClass,
    subjects,
    achievements,
    journey,
    presentDays,
    absentDays,
    leaveDays,
    halfDays,
    documents,
    avatar: student.avatar || `/student_${student.id}.png`
  };
}

export function StudentProfileView() {
  const activeTabId = useAppStore(s => s.activeTabId);
  const studentId = activeTabId.startsWith('student-profile-') 
    ? activeTabId.replace('student-profile-', '') 
    : '';

  const rawStudent = mockStudents.find(s => s.id === studentId) || mockStudents[0];
  const sData = getEnrichedStudentData(rawStudent);

  const [activeTab, setActiveTab] = useState('Overview');
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const openTab = useAppStore(s => s.openTab);

  const handleActionClick = (actionName: string) => {
    if (actionName === 'Generate Report') {
      openTab({
        id: `student-report-card-${sData.id}`,
        label: `Report Card — ${sData.fullName}`,
        view: 'student-report-card',
        closable: true
      });
      return;
    }
    if (actionName === 'Download Transcript') {
      openTab({
        id: `student-transcript-${sData.id}`,
        label: `Profile Summary — ${sData.fullName}`,
        view: 'student-transcript',
        closable: true
      });
      return;
    }
    if (actionName === 'Edit Student Data') {
      openTab({
        id: `edit-student-${sData.id}`,
        label: `Edit Data — ${sData.fullName}`,
        view: 'edit-student-data',
        closable: true
      });
      return;
    }
    if (actionName === 'Transfer Student') {
      openTab({
        id: `transfer-app-${sData.id}`,
        label: `Transfer — ${sData.fullName}`,
        view: 'transfer-center',
        closable: true
      });
      return;
    }
    if (actionName === 'Parent Access') {
      openTab({
        id: `parent-access-${sData.id}`,
        label: `Parent Portal — ${sData.fullName}`,
        view: 'parental-access',
        closable: true
      });
      return;
    }
    useAppStore.getState().showToast(`${actionName} triggered for ${sData.fullName}`, "info");
  };

  return (
    <div style={{ padding: '24px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
      
      {/* 1. PROFILE HEADER MODULE */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Left Side: Photo & Student metadata */}
        <div style={{ display: 'flex', gap: '24px', flex: 1, minWidth: '320px' }}>
          
          {/* Portrait Photo Wrapper */}
          <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '12px', border: '1px solid var(--border-primary)', overflow: 'hidden', background: 'var(--bg-tertiary)', flexShrink: 0 }}>
            <img 
              src={sData.avatar} 
              alt={sData.fullName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                // Fallback SVG in case image doesn't render
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const svgPlaceholder = document.createElement('div');
                  svgPlaceholder.style.width = '100%';
                  svgPlaceholder.style.height = '100%';
                  svgPlaceholder.style.display = 'flex';
                  svgPlaceholder.style.alignItems = 'center';
                  svgPlaceholder.style.justifyContent = 'center';
                  svgPlaceholder.style.background = 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))';
                  svgPlaceholder.style.color = '#ffffff';
                  svgPlaceholder.style.fontSize = '32px';
                  svgPlaceholder.style.fontWeight = '800';
                  svgPlaceholder.innerText = `${sData.firstName[0]}${sData.lastName[0]}`;
                  parent.appendChild(svgPlaceholder);
                }
              }}
            />
            {/* Camera Edit overlay button */}
            <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'rgba(15, 23, 42, 0.75)', color: '#ffffff', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderTopLeftRadius: '8px' }} onClick={() => handleActionClick('Edit profile photo')}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>
            </div>
          </div>

          {/* Demographic Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>{sData.fullName}</h1>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: sData.status === 'ACTIVE' ? 'var(--accent-green)' : sData.status === 'TRANSFERRED' ? 'var(--accent-purple)' : 'var(--accent-amber)', background: sData.status === 'ACTIVE' ? 'var(--accent-green-dim)' : sData.status === 'TRANSFERRED' ? 'rgba(139,92,246,0.08)' : 'var(--accent-amber-dim)', padding: '3px 8px', borderRadius: '9999px', border: `1px solid ${sData.status === 'ACTIVE' ? 'rgba(16,185,129,0.15)' : sData.status === 'TRANSFERRED' ? 'rgba(139,92,246,0.15)' : 'rgba(245,158,11,0.15)'}` }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: sData.status === 'ACTIVE' ? 'var(--accent-green)' : sData.status === 'TRANSFERRED' ? 'var(--accent-purple)' : 'var(--accent-amber)' }}></span>
                {sData.status}
              </span>
            </div>

            {/* IDs line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)' }}>STU-2026-{sData.id.toString().padStart(4, '0')}</span>
              <span style={{ color: 'var(--border-primary)' }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>AIN:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{sData.ain}</span>
                <button 
                  onClick={() => handleCopy(sData.ain, 'ain')} 
                  style={{ background: 'transparent', border: 'none', padding: '2px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                  title="Copy AIN"
                >
                  <Copy size={11} style={{ color: copiedText === 'ain' ? 'var(--accent-green)' : 'var(--text-muted)' }} />
                </button>
                {copiedText === 'ain' && <span style={{ fontSize: '9px', color: 'var(--accent-green)', fontWeight: 600 }}>Copied!</span>}
              </div>
            </div>

            {/* Institution line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <Building size={12} style={{ color: 'var(--text-muted)' }} />
              <span>{sData.institution}</span>
            </div>

            {/* Class info line */}
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Grade <strong style={{ color: 'var(--text-primary)' }}>{sData.grade}</strong> • Section <strong style={{ color: 'var(--text-primary)' }}>{sData.section}</strong> • Roll No. <strong style={{ color: 'var(--text-primary)' }}>{sData.rollNo}</strong>
            </div>

            {/* Category pills tags */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>Day Scholar</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px' }}>Indian</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>English Medium</span>
            </div>

          </div>
        </div>

        {/* Right Side: Quick Action buttons grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', width: '300px', flexShrink: 0, alignContent: 'center' }}>
          {[
            { label: 'Edit Student Data', icon: <FileSpreadsheet size={12} />, action: 'Edit Student Data' },
            { label: 'Download Transcript', icon: <Download size={12} />, action: 'Download Transcript' },
            { label: 'Transfer Student', icon: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>, action: 'Transfer Student' },
            { label: 'Generate Report', icon: <FileText size={12} />, action: 'Generate Report' },
            { label: 'Parent Access', icon: <UserCheck size={12} />, action: 'Parent Access' },
            { label: 'Print Profile', icon: <Printer size={12} />, action: 'Print Profile' }
          ].map((btn, idx) => (
            <button 
              key={idx}
              onClick={() => handleActionClick(btn.action)}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '10px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.1s ease',
                width: '100%',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-purple)';
                e.currentTarget.style.color = 'var(--accent-purple)';
                e.currentTarget.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'var(--bg-secondary)';
              }}
            >
              <span style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>{btn.icon}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{btn.label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* 2. 6-CARD KPI METRICS STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
        
        {/* KPI 1: Academic Age */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Academic Age</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.08)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GraduationCap size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{sData.academicAge}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Registration Age</div>
          </div>
        </div>

        {/* KPI 2: GPA */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>GPA</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.08)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BarChart3 size={13} /></span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{sData.gpa} <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>/ 10</span></span>
              {/* Mini Sparkline line */}
              <svg width="28" height="12" style={{ display: 'block', overflow: 'visible' }}>
                <path d="M0,8 Q7,2 14,9 T28,3" fill="none" stroke="var(--accent-purple)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Cumulative Score</div>
          </div>
        </div>

        {/* KPI 3: Attendance */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Attendance</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'var(--accent-green-dim)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={13} /></span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{sData.attendanceRate}%</span>
              <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--accent-green)', display: 'inline-flex', alignItems: 'center' }}>
                <ArrowUpRight size={10} /> {sData.attendanceTrend}
              </span>
            </div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Current Academic Year</div>
          </div>
        </div>

        {/* KPI 4: Fee Status */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Fee Status</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.08)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DollarSign size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: sData.feeStatus === 'Paid' ? 'var(--accent-green)' : 'var(--accent-red)' }}>{sData.feeStatus}</div>
            <div style={{ fontSize: '9px', color: sData.feeStatus === 'Paid' ? 'var(--accent-green)' : 'var(--text-muted)', marginTop: '2px', fontWeight: sData.feeStatus === 'Paid' ? 600 : 400 }}>
              {sData.feeStatus === 'Paid' ? 'All Clear' : `₹ ${sData.outstanding.toLocaleString()} Overdue`}
            </div>
          </div>
        </div>

        {/* KPI 5: Risk Score */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Risk Score</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'var(--accent-red-dim)', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AlertTriangle size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{sData.riskLabel}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>{sData.riskScore} / 10 Assessment</div>
          </div>
        </div>

        {/* KPI 6: Behavior Score */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Behavior Score</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.08)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Shield size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{sData.behaviorLabel}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>{sData.behaviorScore} / 100 Grade</div>
          </div>
        </div>

      </div>

      {/* 3. SUB-NAVIGATION TABS */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '1px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', flexShrink: 0 }}>
        {[
          'Overview', 'Academics', 'Attendance', 'Fees',
          'Achievements', 'Documents', 'History'
        ].map(tabName => {
          const isActive = activeTab === tabName;
          return (
            <button
              key={tabName}
              onClick={() => setActiveTab(tabName)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--accent-purple)' : '2px solid transparent',
                color: isActive ? 'var(--accent-purple)' : 'var(--text-tertiary)',
                padding: '8px 16px',
                fontSize: '11px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                outline: 'none',
                marginBottom: '-1px'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-tertiary)';
              }}
            >
              {tabName}
            </button>
          );
        })}
      </div>

      {/* 4. MAIN SUB-GRID CONTENTS */}
      {activeTab === 'Overview' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          
          {/* ==================================== */}
          {/* COLUMN 1: LEFT SIDE (span 4)         */}
          {/* ==================================== */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '280px' }}>
            
            {/* Card A: About */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>About</h3>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border-primary)', background: 'transparent' }} onClick={() => handleActionClick('Edit profile info')}>
                  <Edit size={10} /> Edit
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Date of Birth', value: sData.bloodGroup === 'A+' ? '15 Aug 2010 (15 Yrs)' : '10 Mar 2011 (14 Yrs)' },
                  { label: 'Gender', value: rawStudent.gender || 'Male' },
                  { label: 'Blood Group', value: sData.bloodGroup },
                  { label: 'Nationality', value: sData.nationality },
                  { label: 'Aadhaar / Student ID', value: sData.aadhaar },
                  { label: 'Email', value: sData.email },
                  { label: 'Phone', value: sData.phone }
                ].map((row, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-secondary)', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>{row.label}</span>
                    <strong style={{ color: 'var(--text-primary)', textAlign: 'right', wordBreak: 'break-all', maxWidth: '65%' }}>{row.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Card B: Academic Performance (Chart) */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Academic Performance</h3>
                <select style={{ fontSize: '10px', background: 'transparent', border: '1px solid var(--border-primary)', borderRadius: '4px', padding: '2px 4px', color: 'var(--text-secondary)', outline: 'none' }}>
                  <option>This Year</option>
                  <option>All Years</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Overall GPA</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>{sData.gpa} <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>/ 10</span></div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Class Rank</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>{sData.classRank} <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>/ {sData.totalInClass}</span></div>
                </div>
              </div>

              {/* Styled line chart using SVG */}
              <div style={{ width: '100%', height: '110px', marginTop: '4px' }}>
                <svg width="100%" height="100%" viewBox="0 0 260 110" style={{ overflow: 'visible' }}>
                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="250" y2="20" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="20" y1="50" x2="250" y2="50" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="20" y1="80" x2="250" y2="80" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="20" y1="100" x2="250" y2="100" stroke="var(--border-primary)" strokeWidth="1.5" />
                  
                  {/* X Axis Labels */}
                  {sData.chartData.map((d, i) => {
                    const x = 20 + i * (230 / (sData.chartData.length - 1));
                    return (
                      <text key={i} x={x} y="112" fontSize="7px" fill="var(--text-tertiary)" textAnchor="middle" fontFamily="var(--font-mono)">
                        {d.month}
                      </text>
                    );
                  })}
                  
                  {/* Curved path points mapper */}
                  {(() => {
                    const coords = sData.chartData.map((d, i) => {
                      const x = 20 + i * (230 / (sData.chartData.length - 1));
                      // Map GPA range 4.0 - 10.0 to Y range 100 - 15
                      const y = 100 - ((d.gpa - 4) * (85 / 6));
                      return { x, y };
                    });
                    
                    let pathD = `M ${coords[0].x} ${coords[0].y}`;
                    for (let i = 1; i < coords.length; i++) {
                      // Smooth bezier curve control points
                      const cpX1 = coords[i-1].x + (coords[i].x - coords[i-1].x) / 2;
                      const cpY1 = coords[i-1].y;
                      const cpX2 = coords[i-1].x + (coords[i].x - coords[i-1].x) / 2;
                      const cpY2 = coords[i].y;
                      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${coords[i].x} ${coords[i].y}`;
                    }
                    
                    const fillD = `${pathD} L ${coords[coords.length-1].x} 100 L ${coords[0].x} 100 Z`;
                    
                    return (
                      <g>
                        {/* Area gradient under curve */}
                        <path d={fillD} fill="rgba(139, 92, 246, 0.04)" />
                        {/* Stroke curve */}
                        <path d={pathD} fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" />
                        {/* Points */}
                        {coords.map((c, i) => (
                          <g key={i}>
                            <circle cx={c.x} cy={c.y} r="3" fill="#ffffff" stroke="var(--accent-purple)" strokeWidth="2" />
                          </g>
                        ))}
                        {/* Final solid purple GPA badge at the end of the line */}
                        {(() => {
                          const lastCoord = coords[coords.length - 1];
                          return (
                            <g>
                              <rect x={lastCoord.x - 12} y={lastCoord.y - 18} width="24" height="12" rx="3" fill="var(--accent-purple)" />
                              <text x={lastCoord.x} y={lastCoord.y - 10} fontSize="7px" fontWeight="800" fill="#ffffff" textAnchor="middle">
                                {sData.chartData[sData.chartData.length - 1].gpa}
                              </text>
                            </g>
                          );
                        })()}
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <span onClick={() => setActiveTab('Academics')} style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', marginTop: '6px' }}>View detailed performance</span>
            </div>

            {/* Card C: Fee Summary */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Fee Summary</h3>
                <select style={{ fontSize: '10px', background: 'transparent', border: '1px solid var(--border-primary)', borderRadius: '4px', padding: '2px 4px', color: 'var(--text-secondary)', outline: 'none' }}>
                  <option>2025-2026</option>
                  <option>2024-2025</option>
                </select>
              </div>

              {/* Two-Column split layout: left numbers, right green badge card */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between', height: '110px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, fontSize: '11px' }}>
                  <div>
                    <div style={{ color: 'var(--text-tertiary)' }}>Total Fees</div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', marginTop: '2px' }}>₹ {sData.totalFees.toLocaleString()}</strong>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-tertiary)' }}>Paid Amount</div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', marginTop: '2px' }}>₹ {sData.paidAmount.toLocaleString()}</strong>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-tertiary)' }}>Outstanding</div>
                    <strong style={{ display: 'block', color: sData.outstanding > 0 ? 'var(--accent-red)' : 'var(--text-primary)', fontSize: '13px', marginTop: '2px' }}>₹ {sData.outstanding.toLocaleString()}</strong>
                  </div>
                </div>
                <div style={{ width: '120px', background: 'var(--accent-green-dim)', padding: '16px 12px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800, color: 'var(--accent-green)', fontSize: '14px' }}>
                    <CheckCircle2 size={16} />
                    <span>Paid</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--accent-green)', opacity: 0.9, fontWeight: 500, textAlign: 'center' }}>All dues cleared</div>
                </div>
              </div>

              <span onClick={() => setActiveTab('Fees')} style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>View payment history</span>
            </div>



          </div>

          {/* ==================================== */}
          {/* COLUMN 2: MIDDLE SIDE (span 4)       */}
          {/* ==================================== */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '280px' }}>
            
            {/* Card E: Family & Guardian */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Family & Guardian</h3>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border-primary)', background: 'transparent' }} onClick={() => handleActionClick('Edit family details')}>
                  <Edit size={10} /> Edit
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Father', value: sData.fatherName, sub: sData.guardianPhone },
                  { label: 'Mother', value: sData.motherName, sub: `+91 98765 ${22220 + (parseInt(sData.id) || 1)}` },
                  { label: 'Guardian', value: sData.guardianName, sub: `(Father)` },
                  { label: 'Emergency Contact', value: sData.guardianPhone },
                  { label: 'Parent Email', value: sData.parentEmail },
                  { label: 'Occupation', value: sData.occupation }
                ].map((row, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border-secondary)', fontSize: '11px', gap: '8px' }}>
                    <span style={{ color: 'var(--text-tertiary)', minWidth: '70px' }}>{row.label}</span>
                    <strong style={{ color: 'var(--text-primary)', flex: 1, textAlign: row.sub ? 'left' : 'right' }}>{row.value}</strong>
                    {row.sub && (
                      <span style={{ color: 'var(--text-tertiary)', fontFamily: row.sub.startsWith('(') ? 'inherit' : 'var(--font-mono)', fontSize: '10px' }}>{row.sub}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Card F: Subject Performance */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Subject Performance</h3>
                <select style={{ fontSize: '10px', background: 'transparent', border: '1px solid var(--border-primary)', borderRadius: '4px', padding: '2px 4px', color: 'var(--text-secondary)', outline: 'none' }}>
                  <option>This Term</option>
                  <option>Previous Term</option>
                </select>
              </div>

              {/* Subject wise marks table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                      <th style={{ padding: '6px 4px', color: 'var(--text-tertiary)', fontWeight: 600 }}>SUBJECT</th>
                      <th style={{ padding: '6px 4px', color: 'var(--text-tertiary)', fontWeight: 600, textAlign: 'center' }}>MARKS</th>
                      <th style={{ padding: '6px 4px', color: 'var(--text-tertiary)', fontWeight: 600, textAlign: 'center' }}>GRADE</th>
                      <th style={{ padding: '6px 4px', color: 'var(--text-tertiary)', fontWeight: 600, textAlign: 'right' }}>RANK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sData.subjects.map((sub, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-secondary)' }}>
                        <td style={{ padding: '8px 4px', color: 'var(--text-primary)', fontWeight: 500 }}>{sub.name}</td>
                        <td style={{ padding: '8px 4px', textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{sub.marks} <span style={{ color: 'var(--text-tertiary)', fontSize: '9px' }}>/ {sub.max}</span></td>
                        <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                          <span style={{ 
                            fontSize: '9px', 
                            fontWeight: 700, 
                            padding: '1px 6px', 
                            borderRadius: '4px', 
                            background: sub.grade === 'A+' 
                              ? 'var(--accent-green-dim)' 
                              : sub.grade === 'A' 
                                ? 'rgba(139, 92, 246, 0.08)' 
                                : 'rgba(6, 182, 212, 0.08)', 
                            color: sub.grade === 'A+' 
                              ? 'var(--accent-green)' 
                              : sub.grade === 'A' 
                                ? 'var(--accent-purple)' 
                                : 'var(--accent-cyan)' 
                          }}>{sub.grade}</span>
                        </td>
                        <td style={{ padding: '8px 4px', textAlign: 'right', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{sub.rank} <span style={{ color: 'var(--text-tertiary)', fontSize: '9px' }}>/ {sData.totalInClass}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <span onClick={() => setActiveTab('Academics')} style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>View all subjects</span>
            </div>

            {/* Card G: Recent Achievements */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Recent Achievements</h3>
                <span onClick={() => setActiveTab('Achievements')} style={{ fontSize: '10px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }}>View all</span>
              </div>

              {/* achievements cards display */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {sData.achievements.map((ach, idx) => (
                  <div key={idx} style={{ padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: idx === 0 ? 'var(--accent-amber-dim)' : idx === 1 ? 'rgba(6, 182, 212, 0.08)' : idx === 2 ? 'rgba(139,92,246,0.08)' : 'rgba(249, 115, 22, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Award size={15} style={{ color: idx === 0 ? 'var(--accent-amber)' : idx === 1 ? 'var(--accent-cyan)' : idx === 2 ? 'var(--accent-purple)' : 'var(--accent-orange)' }} />
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: 750, color: 'var(--text-primary)', lineHeight: 1.2 }}>{ach.title}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{ach.prize}</div>
                    <div style={{ fontSize: '8px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>{ach.year}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ==================================== */}
          {/* COLUMN 3: RIGHT SIDE (span 4)        */}
          {/* ==================================== */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '260px' }}>
            
            {/* Card H: Academic Journey Timeline */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Academic Journey</h3>
                <span onClick={() => handleActionClick('View timeline')} style={{ fontSize: '10px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }}>View full timeline</span>
              </div>

              {/* Vertical Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '20px', marginTop: '4px' }}>
                
                {/* Visual connecting line */}
                <div style={{ position: 'absolute', top: '6px', bottom: '6px', left: '4px', width: '2px', background: 'rgba(139, 92, 246, 0.15)' }} />
                
                {sData.journey.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', paddingBottom: idx === sData.journey.length - 1 ? 0 : '16px', position: 'relative' }}>
                    
                    {/* Circle timeline point */}
                    <div style={{
                      position: 'absolute',
                      left: '-20px',
                      top: '3px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: idx === 0 ? 'var(--accent-purple)' : 'var(--bg-secondary)',
                      border: `2px solid ${idx === 0 ? 'var(--accent-purple)' : 'rgba(139, 92, 246, 0.4)'}`,
                      zIndex: 2
                    }} />

                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: idx === 0 ? 'var(--accent-purple)' : 'var(--text-tertiary)', width: '36px', flexShrink: 0 }}>
                      {item.year}
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.grade}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{item.school}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card I: Attendance Overview */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Attendance Overview</h3>
                <select style={{ fontSize: '10px', background: 'transparent', border: '1px solid var(--border-primary)', borderRadius: '4px', padding: '2px 4px', color: 'var(--text-secondary)', outline: 'none' }}>
                  <option>This Year</option>
                  <option>This Term</option>
                </select>
              </div>

              {/* Attendance visual ring and Legend stats */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
                
                {/* SVG Ring chart */}
                <div style={{ width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <svg width="100%" height="100%" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="var(--border-secondary)" strokeWidth="6" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="32" 
                      fill="none" 
                      stroke="var(--accent-green)" 
                      strokeWidth="6" 
                      strokeDasharray="201.06" 
                      strokeDashoffset={201.06 * (1 - sData.attendanceRate / 100)} 
                      strokeLinecap="round"
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{sData.attendanceRate}%</span>
                    <span style={{ fontSize: '8px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Present</span>
                  </div>
                </div>

                {/* Legend Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, fontSize: '10px' }}>
                  {[
                    { label: 'Present', val: `${sData.presentDays} Days`, color: 'var(--accent-green)' },
                    { label: 'Absent', val: `${sData.absentDays} Days`, color: 'var(--accent-red)' },
                    { label: 'Leave', val: `${sData.leaveDays} Days`, color: 'var(--accent-amber)' },
                    { label: 'Half Days', val: `${sData.halfDays} Days`, color: 'var(--accent-purple)' }
                  ].map((leg, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: leg.color }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{leg.label}</span>
                      </div>
                      <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{leg.val}</strong>
                    </div>
                  ))}
                </div>

              </div>

              <span onClick={() => setActiveTab('Attendance')} style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>View attendance history</span>
            </div>

            {/* Card J: Personal Documents Registry */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Personal Documents</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sData.documents.map((doc, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: idx === sData.documents.length - 1 ? 'none' : '1px solid var(--border-secondary)', fontSize: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      {doc.name.includes('USA') || doc.name.includes('India') ? (
                        <MapPin size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                      ) : (
                        <FileText size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                      )}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</div>
                        <div style={{ fontSize: '8px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Uploaded on {doc.date}</div>
                      </div>
                    </div>
                    {!(doc.name.includes('USA') || doc.name.includes('India')) && (
                      <button 
                        onClick={() => handleActionClick(`Download ${doc.name}`)}
                        style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--text-tertiary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-purple)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
                      >
                        <Download size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Card K: Institutional Status checklist */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Institutional Status</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Active Student', checked: sData.status === 'ACTIVE' },
                  { label: 'No Compliance Issues', checked: true },
                  { label: 'Eligible for Promotion', checked: true },
                  { label: 'Transfer Ready', checked: sData.status === 'ACTIVE' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                    <span style={{ 
                      width: '16px', 
                      height: '16px', 
                      borderRadius: '4px', 
                      background: item.checked ? 'var(--accent-green-dim)' : 'var(--bg-tertiary)', 
                      border: `1px solid ${item.checked ? 'var(--accent-green)' : 'var(--border-primary)'}`, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--accent-green)'
                    }}>
                      {item.checked && <Check size={11} strokeWidth={3} />}
                    </span>
                    <span style={{ color: item.checked ? 'var(--text-secondary)' : 'var(--text-tertiary)', fontWeight: item.checked ? 500 : 400 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : activeTab === 'Academics' ? (
        <StudentAcademicsTab studentId={studentId} />
      ) : activeTab === 'Attendance' ? (
        <StudentAttendanceTab studentId={studentId} />
      ) : activeTab === 'Fees' ? (
        <StudentFeesTab studentId={studentId} sData={sData} />
      ) : activeTab === 'Achievements' ? (
        <StudentAchievementsTab studentId={studentId} sData={sData} />
      ) : activeTab === 'Documents' ? (
        <StudentDocumentsTab studentId={studentId} sData={sData} />
      ) : (
        /* Render generic descriptive placeholders for other tabs */
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(37,99,235,0.08)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {activeTab === 'Behavior' && <Shield size={24} />}
            {activeTab === 'Health' && <ShieldAlert size={24} />}
            {activeTab === 'Activities' && <Layers size={24} />}
            {activeTab === 'Communication' && <MessageSquare size={24} />}
            {activeTab === 'Transfers' && <LogOut size={24} />}
            {activeTab === 'AI Insights' && <HelpCircle size={24} />}
            {activeTab === 'History' && <Clock size={24} />}
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>{activeTab} Overview</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '380px', margin: '4px auto 0' }}>
              Detailed {activeTab.toLowerCase()} information registry for {sData.fullName}. System accounts, historical archives, and custom audit trails.
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: '8px' }} onClick={() => setActiveTab('Overview')}>
            Back to Overview
          </button>
        </div>
      )}

    </div>
  );
}

// Helper to dynamically enrich teacher data based on their core record
export function getEnrichedTeacherData(teacher: any) {
  const idNum = parseInt(teacher.id.replace('t', '')) || 1;
  const isMeena = idNum === 1;

  const fallbackSuffixes = ['F9X2P5', 'K8L4N7', 'B3J6R9', 'W5Q7T2', 'H4K8V1', 'Z7D3M6'];
  const uti = teacher.uti || `AKD-TCH-2026-${fallbackSuffixes[(idNum - 1) % 6]}`;
  const name = teacher.name;
  const department = teacher.department;
  const designation = teacher.designation;
  const email = teacher.email || `${name.toLowerCase().replace(' ', '.')}@dps.edu`;
  const phone = teacher.phone || `+91 98100 5000${idNum}`;
  const status = teacher.status || 'ACTIVE';
  const experience = teacher.experience || 10;
  const subjects = teacher.subjects || 'General';

  // Details
  const joinDate = isMeena ? '12 Jan 2012' : `15 Jul ${2010 + idNum}`;
  const qualification = isMeena ? 'Ph.D. in Education' : idNum % 2 === 0 ? 'M.Sc., B.Ed.' : 'M.A., B.Ed.';
  const officeRoom = isMeena ? 'Room 102 (Principal Office)' : `Room ${100 + idNum * 5}`;
  const workload = 'Full-Time';
  const attendanceRate = 95 + (idNum % 3) * 1.5;
  const rating = (4.5 + (idNum % 5) * 0.1).toFixed(1);
  const totalClasses = isMeena ? 2 : 4;
  const lecturesPerWeek = isMeena ? 10 : 20 + (idNum % 3) * 2;
  const totalStudents = isMeena ? 45 : 120 + (idNum % 4) * 10;

  // Active Course
  const activeCourse = isMeena ? {
    code: '#ADM-101',
    name: 'Institutional Administration & Ethics',
    badge: 'Core Admin',
    type: 'Seminar',
    schedule: 'Tue, Thu',
    room: 'Room 102 (Principal Office)',
    time: '11:00 AM'
  } : {
    code: `#${subjects.slice(0,3).toUpperCase()}-${100 + idNum * 10}`,
    name: `Advanced ${subjects.split(',')[0]} (Grade ${9 + (idNum % 4)})`,
    badge: 'Core Subject',
    type: 'Lecture',
    schedule: 'Mon, Wed, Fri',
    room: `Room ${100 + idNum * 5}`,
    time: '09:00 AM'
  };

  // Recent Activity
  const activity = [
    { text: `${name} updated midterm exam marks for ${subjects.split(',')[0]}`, time: '11:12 AM - May 17, 2026' },
    { text: `${name} marked attendance for Grade ${9 + (idNum % 4)}-A`, time: '09:30 AM - May 17, 2026' }
  ];

  const chartData = [
    { month: 'Apr', hours: 24 },
    { month: 'May', hours: 25 },
    { month: 'Jun', hours: 26 },
    { month: 'Jul', hours: 26 },
    { month: 'Aug', hours: 28 },
    { month: 'Sep', hours: 26 },
    { month: 'Oct', hours: 27 },
    { month: 'Nov', hours: 28 },
    { month: 'Dec', hours: 28 },
    { month: 'Mar', hours: lecturesPerWeek }
  ];

  const classes = isMeena ? [
    { name: 'Grade 11-Science Seminar', room: 'Room 102', count: 35, lectures: 4 },
    { name: 'Grade 12-Science Seminar', room: 'Room 102', count: 40, lectures: 6 }
  ] : [
    { name: `Grade ${9 + (idNum % 4)}-A Class`, room: `Room ${100 + idNum * 5}`, count: 30 + idNum * 5, lectures: 6 },
    { name: `Grade ${10 + (idNum % 3)}-B Class`, room: `Room ${101 + idNum * 5}`, count: 28 + idNum * 4, lectures: 6 },
    { name: `Remedial Class ${subjects.split(',')[0]}`, room: `Lab ${idNum}`, count: 12, lectures: 4 }
  ];

  const achievements = [
    { title: 'Best Teacher Award', awarder: 'EOE Council', year: '2025' },
    { title: 'Outstanding Leadership', awarder: 'School Committee', year: '2024' }
  ];

  const journey = [
    { year: '2026', title: `${designation} (Current)`, institution: 'Delhi Public School' },
    { year: '2022', title: isMeena ? 'Vice Principal' : 'Senior Teacher', institution: 'Delhi Public School' },
    { year: '2016', title: 'Senior Teacher', institution: 'Springfield International School' },
    { year: '2012', title: 'Assistant Teacher', institution: 'Springfield International School' }
  ];

  const documents = [
    { name: 'Doctorate/Degree Certificate', date: '14 Jan 2024' },
    { name: 'Teacher Certification License', date: '14 Jan 2024' },
    { name: 'Aadhaar / National ID Proof', date: '14 Jan 2024' }
  ];

  return {
    id: teacher.id,
    avatar: teacher.avatar || `/teacher_${teacher.id.replace('t', '')}.png`,
    uti,
    name,
    department,
    designation,
    email,
    phone,
    status,
    experience,
    subjects,
    joinDate,
    qualification,
    officeRoom,
    workload,
    attendanceRate,
    rating,
    totalClasses,
    lecturesPerWeek,
    totalStudents,
    activeCourse,
    activity,
    chartData,
    classes,
    achievements,
    journey,
    documents
  };
}

export function TeacherProfileView() {
  const activeTabId = useAppStore(s => s.activeTabId);
  const teacherId = activeTabId.startsWith('teacher-profile-') 
    ? activeTabId.replace('teacher-profile-', '') 
    : '';

  const rawTeacher = mockTeachers.find(t => t.id === teacherId) || mockTeachers[0];
  const tData = getEnrichedTeacherData(rawTeacher);

  const [activeTab, setActiveTab] = useState('Overview');

  const handleActionClick = (actionName: string) => {
    useAppStore.getState().showToast(`${actionName} triggered for ${tData.name}`, "info");
  };

  return (
    <div style={{ padding: '24px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
      
      {/* 1. PROFILE HEADER MODULE */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Left Side: Photo & Teacher metadata */}
        <div style={{ display: 'flex', gap: '24px', flex: 1, minWidth: '320px' }}>
          
          {/* Portrait Photo Wrapper */}
          <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', border: '1px solid var(--border-primary)', overflow: 'hidden', background: 'var(--bg-tertiary)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={tData.avatar} 
              alt={tData.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const placeholder = document.createElement('div');
                  placeholder.style.width = '100%';
                  placeholder.style.height = '100%';
                  placeholder.style.display = 'flex';
                  placeholder.style.alignItems = 'center';
                  placeholder.style.justifyContent = 'center';
                  placeholder.style.background = 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))';
                  placeholder.style.color = '#ffffff';
                  placeholder.style.fontSize = '32px';
                  placeholder.style.fontWeight = '800';
                  placeholder.innerText = tData.name.split(' ').map((n: string) => n[0]).join('');
                  parent.appendChild(placeholder);
                }
              }}
            />
          </div>

          {/* Demographic Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>{tData.name}</h1>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: tData.status === 'ACTIVE' ? 'var(--accent-green)' : tData.status === 'ACTIVE' ? 'var(--accent-green)' : 'var(--accent-amber)', background: tData.status === 'ACTIVE' ? 'var(--accent-green-dim)' : 'var(--accent-amber-dim)', padding: '3px 8px', borderRadius: '9999px', border: `1px solid ${tData.status === 'ACTIVE' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)'}` }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: tData.status === 'ACTIVE' ? 'var(--accent-green)' : 'var(--accent-amber)' }}></span>
                {tData.status}
              </span>
            </div>

            {/* IDs line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{tData.uti}</span>
            </div>

            {/* Institution line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <Building size={12} style={{ color: 'var(--text-muted)' }} />
              <span>Delhi Public School</span>
            </div>

            {/* Department info line */}
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Designation <strong style={{ color: 'var(--text-primary)' }}>{tData.designation}</strong> • Department <strong style={{ color: 'var(--text-primary)' }}>{tData.department}</strong>
            </div>

            {/* Category pills tags */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>Tenured Faculty</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px' }}>HOD Staff</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>Full Load</span>
            </div>

          </div>
        </div>

        {/* Right Side: Quick Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', width: '300px', flexShrink: 0, alignContent: 'center' }}>
          {[
            { label: 'Send Message', icon: <MessageSquare size={12} />, action: 'Send Message' },
            { label: 'Download CV', icon: <Download size={12} />, action: 'Download CV' },
            { label: 'Academic History', icon: <FileSpreadsheet size={12} />, action: 'Academic History' },
            { label: 'Print Profile', icon: <Printer size={12} />, action: 'Print Profile' },
            { label: 'Assign Course', icon: <Layers size={12} />, action: 'Assign Course' },
            { label: 'Change Status', icon: <RefreshCw size={12} />, action: 'Change Status' }
          ].map((btn, idx) => (
            <button 
              key={idx}
              onClick={() => handleActionClick(btn.action)}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '10px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.1s ease',
                width: '100%',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-purple)';
                e.currentTarget.style.color = 'var(--accent-purple)';
                e.currentTarget.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'var(--bg-secondary)';
              }}
            >
              <span style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>{btn.icon}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{btn.label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* 2. 6-CARD KPI METRICS STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
        
        {/* KPI 1: Experience */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Experience</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.08)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Briefcase size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{tData.experience} Years</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Total Tenure</div>
          </div>
        </div>

        {/* KPI 2: Classes */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Classes</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.08)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Layers size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{tData.totalClasses} Active</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Course Sections</div>
          </div>
        </div>

        {/* KPI 3: Lectures */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Weekly Lectures</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'var(--accent-green-dim)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{tData.lecturesPerWeek} Hours</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Teaching Workload</div>
          </div>
        </div>

        {/* KPI 4: Rating */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Student Rating</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'var(--accent-amber-dim)', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Award size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{tData.rating} / 5.0</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Feedback Assessment</div>
          </div>
        </div>

        {/* KPI 5: Attendance */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Attendance</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.08)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{tData.attendanceRate}%</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Duty Attendance</div>
          </div>
        </div>

        {/* KPI 6: Students */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-metric-lbl-size)', fontWeight: 600, color: 'var(--text-tertiary)' }}>Total Students</span>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.08)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={13} /></span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{tData.totalStudents}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Taught Strength</div>
          </div>
        </div>

      </div>

      {/* 3. SUB-NAVIGATION TABS */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '1px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', flexShrink: 0 }}>
        {[
          'Overview', 'Classes', 'Timetable', 'Performance', 'Achievements', 
          'Documents', 'Salary', 'History'
        ].map(tabName => {
          const isActive = activeTab === tabName;
          return (
            <button
              key={tabName}
              onClick={() => setActiveTab(tabName)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--accent-purple)' : '2px solid transparent',
                color: isActive ? 'var(--accent-purple)' : 'var(--text-tertiary)',
                padding: '8px 16px',
                fontSize: '11px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                outline: 'none',
                marginBottom: '-1px'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-tertiary)';
              }}
            >
              {tabName}
            </button>
          );
        })}
      </div>

      {/* 4. MAIN SUB-GRID CONTENTS */}
      {activeTab === 'Overview' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          
          {/* COLUMN 1: LEFT SIDE (span 4) */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '280px' }}>
            
            {/* About Card */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>About Faculty</h3>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border-primary)', background: 'transparent' }} onClick={() => handleActionClick('Edit faculty info')}>
                  <Edit size={10} /> Edit
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Date of Join', value: tData.joinDate },
                  { label: 'Email', value: tData.email },
                  { label: 'Phone', value: tData.phone },
                  { label: 'Qualification', value: tData.qualification },
                  { label: 'Office Room', value: tData.officeRoom },
                  { label: 'Workload Status', value: tData.workload }
                ].map((row, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-secondary)', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>{row.label}</span>
                    <strong style={{ color: 'var(--text-primary)', textAlign: 'right', wordBreak: 'break-all', maxWidth: '65%' }}>{row.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Workload Trend Chart */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Teaching Workload Hours</h3>
              </div>
              <div style={{ width: '100%', height: '110px' }}>
                <svg width="100%" height="100%" viewBox="0 0 260 110" style={{ overflow: 'visible' }}>
                  <line x1="20" y1="20" x2="250" y2="20" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="20" y1="50" x2="250" y2="50" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="20" y1="80" x2="250" y2="80" stroke="var(--border-secondary)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="20" y1="100" x2="250" y2="100" stroke="var(--border-primary)" strokeWidth="1.5" />
                  
                  {tData.chartData.map((d, i) => {
                    const x = 20 + i * (230 / (tData.chartData.length - 1));
                    return (
                      <text key={i} x={x} y="112" fontSize="7px" fill="var(--text-tertiary)" textAnchor="middle" fontFamily="var(--font-mono)">
                        {d.month}
                      </text>
                    );
                  })}
                  
                  {(() => {
                    const coords = tData.chartData.map((d, i) => {
                      const x = 20 + i * (230 / (tData.chartData.length - 1));
                      const y = 100 - ((d.hours - 10) * (80 / 25));
                      return { x, y };
                    });
                    
                    let pathD = `M ${coords[0].x} ${coords[0].y}`;
                    for (let i = 1; i < coords.length; i++) {
                      const cpX1 = coords[i-1].x + (coords[i].x - coords[i-1].x) / 2;
                      const cpY1 = coords[i-1].y;
                      const cpX2 = coords[i-1].x + (coords[i].x - coords[i-1].x) / 2;
                      const cpY2 = coords[i].y;
                      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${coords[i].x} ${coords[i].y}`;
                    }
                    
                    const fillD = `${pathD} L ${coords[coords.length-1].x} 100 L ${coords[0].x} 100 Z`;
                    
                    return (
                      <g>
                        <path d={fillD} fill="rgba(139, 92, 246, 0.04)" />
                        <path d={pathD} fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" />
                        {coords.map((c, i) => (
                          <circle key={i} cx={c.x} cy={c.y} r="3" fill="#ffffff" stroke="var(--accent-purple)" strokeWidth="2" />
                        ))}
                        {(() => {
                          const lastCoord = coords[coords.length - 1];
                          return (
                            <g>
                              <rect x={lastCoord.x - 12} y={lastCoord.y - 18} width="24" height="12" rx="3" fill="var(--accent-purple)" />
                              <text x={lastCoord.x} y={lastCoord.y - 10} fontSize="7px" fontWeight="800" fill="#ffffff" textAnchor="middle">
                                {tData.chartData[tData.chartData.length - 1].hours}
                              </text>
                            </g>
                          );
                        })()}
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>

          </div>

          {/* COLUMN 2: MIDDLE SIDE (span 4) */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '280px' }}>
            
            {/* Assigned Classes */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Assigned Classes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tData.classes.map((cls, idx) => (
                  <div key={idx} style={{ padding: '10px', background: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid var(--border-primary)', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{cls.name}</strong>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '9px' }}>{cls.room} • {cls.count} Students</span>
                    </div>
                    <span style={{ fontSize: '9px', padding: '2px 6px', background: 'rgba(139, 92, 246, 0.08)', color: 'var(--accent-purple)', borderRadius: '4px', fontWeight: 700 }}>
                      {cls.lectures} Hrs/Wk
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Achievements & Recognitions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tData.achievements.map((ach, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '8px', borderBottom: idx < tData.achievements.length - 1 ? '1px solid var(--border-secondary)' : 'none' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(139,92,246,0.08)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Award size={12} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{ach.title}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>By {ach.awarder} • {ach.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 3: RIGHT SIDE (span 4) */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '260px' }}>
            
            {/* Timeline journey */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Professional Journey</h3>
              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', top: '6px', bottom: '6px', left: '4px', width: '2px', background: 'rgba(139, 92, 246, 0.15)' }} />
                {tData.journey.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', paddingBottom: idx === tData.journey.length - 1 ? 0 : '16px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-20px',
                      top: '3px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: idx === 0 ? 'var(--accent-purple)' : 'var(--bg-secondary)',
                      border: `2px solid ${idx === 0 ? 'var(--accent-purple)' : 'rgba(139, 92, 246, 0.4)'}`,
                      zIndex: 2
                    }} />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: idx === 0 ? 'var(--accent-purple)' : 'var(--text-tertiary)', width: '36px', flexShrink: 0 }}>
                      {item.year}
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{item.institution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Card */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Personal Documents</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tData.documents.map((doc, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: idx === tData.documents.length - 1 ? 'none' : '1px solid var(--border-secondary)', fontSize: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={14} style={{ color: 'var(--text-muted)' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{doc.name}</div>
                        <div style={{ fontSize: '8px', color: 'var(--text-tertiary)' }}>Verified on {doc.date}</div>
                      </div>
                    </div>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }} onClick={() => handleActionClick(`Download ${doc.name}`)}>
                      <Download size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(139,92,246,0.08)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {activeTab === 'Classes' && <Layers size={24} />}
            {activeTab === 'Timetable' && <Calendar size={24} />}
            {activeTab === 'Performance' && <BarChart3 size={24} />}
            {activeTab === 'Achievements' && <Award size={24} />}
            {activeTab === 'Documents' && <FileText size={24} />}
            {activeTab === 'Salary' && <DollarSign size={24} />}
            {activeTab === 'History' && <Clock size={24} />}
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>{activeTab} Registry</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '380px', margin: '4px auto 0' }}>
              Detailed {activeTab.toLowerCase()} information registry for {tData.name}. System accounts, historical archives, and custom audit trails.
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: '8px' }} onClick={() => setActiveTab('Overview')}>
            Back to Overview
          </button>
        </div>
      )}

    </div>
  );
}

// =====================================================
// MANAGE WIDGETS (INTEGRATIONS MARKETPLACE) VIEW
// =====================================================
interface WidgetItem {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: string;
  color: string;
  sparkline: string;
  view: AppView;
  labelNav: string;
  description: string;
  category: 'Academic Insights' | 'Administrative & Operational';
  howItWorks: string;
  features: string[];
}

const widgetsList: WidgetItem[] = [
  {
    id: 'total-students',
    label: 'Total Students',
    value: '8,542',
    change: '+12.6% vs Yesterday',
    trend: 'up',
    color: '#3b82f6',
    sparkline: 'M0,15 Q10,12 20,20 T40,10 T60,18 T80,5 T100,2 T120,8',
    view: 'students',
    labelNav: 'Students',
    description: 'Provides a comprehensive overview of the student body, tracking active registrations and daily growth metrics.',
    category: 'Academic Insights',
    howItWorks: 'The Total Students widget aggregates enrollment data across all academic departments and grade levels. It continuously monitors new registrations, transfers, and withdrawals to provide an accurate real-time headcount. The trend indicator compares the current count against yesterday\'s snapshot to surface growth patterns.',
    features: ['Real-time enrollment headcount', 'Daily growth trend tracking', 'Department-level breakdown', 'New registration alerts']
  },
  {
    id: 'active-courses',
    label: 'Active Courses',
    value: '568',
    change: '+8.4% vs Yesterday',
    trend: 'up',
    color: '#a855f7',
    sparkline: 'M0,20 Q10,18 20,22 T40,15 T60,10 T80,14 T100,5 T120,4',
    view: 'courses',
    labelNav: 'Courses',
    description: 'Tracks current course offerings, academic departments, and class curriculum distributions.',
    category: 'Academic Insights',
    howItWorks: 'The Active Courses widget monitors all course offerings that are currently in session. It tracks the number of sections, enrolled capacities, and department-level distributions. When new courses are added or existing ones are archived, the count updates automatically with comparative trend data.',
    features: ['Active section monitoring', 'Department distribution view', 'Capacity utilization tracking', 'Curriculum change detection']
  },
  {
    id: 'classes-today',
    label: 'Classes Today',
    value: '642',
    change: '+6.1% vs Yesterday',
    trend: 'up',
    color: '#06b6d4',
    sparkline: 'M0,18 Q10,22 20,15 T40,12 T60,20 T80,10 T100,8 T120,6',
    view: 'classes',
    labelNav: 'Classes',
    description: 'Monitors daily schedule progression, active lectures, and physical classroom utilization.',
    category: 'Administrative & Operational',
    howItWorks: 'The Classes Today widget pulls from the daily timetable engine to surface the total number of scheduled sessions. It distinguishes between completed, in-progress, and upcoming classes, providing a dynamic view of the school\'s operational rhythm throughout the day.',
    features: ['Daily timetable integration', 'Live class status tracking', 'Classroom utilization metrics', 'Schedule conflict alerts']
  },
  {
    id: 'attendance-rate',
    label: 'Attendance Rate',
    value: '92.7%',
    change: '+3.8% vs Yesterday',
    trend: 'up',
    color: '#10b981',
    sparkline: 'M0,22 Q10,20 20,18 T40,14 T60,16 T80,12 T100,10 T120,5',
    view: 'attendance',
    labelNav: 'Attendance',
    description: 'Maintains real-time attendance ratios across all student cohorts and daily lectures.',
    category: 'Academic Insights',
    howItWorks: 'The Attendance Rate widget computes a weighted average of student presence across all scheduled sessions for the day. It factors in late arrivals, early departures, and excused absences to provide a nuanced view of institutional attendance health.',
    features: ['Weighted attendance calculation', 'Absentee pattern detection', 'Cohort-level breakdowns', 'Automatic alert thresholds']
  },

  {
    id: 'exam-pass-rate',
    label: 'Exam Pass Rate',
    value: '87.6%',
    change: '+4.2% vs Yesterday',
    trend: 'up',
    color: '#ef4444',
    sparkline: 'M0,22 Q10,20 20,21 T40,18 T60,14 T80,15 T100,10 T120,8',
    view: 'exams',
    labelNav: 'Exams & Assessments',
    description: 'Evaluates academic success indices, assessment statistics, and student performance margins.',
    category: 'Academic Insights',
    howItWorks: 'The Exam Pass Rate widget analyzes the ratio of students meeting or exceeding the minimum passing threshold across all graded assessments. It provides subject-level and class-level breakdowns, enabling administrators to pinpoint areas needing academic intervention.',
    features: ['Pass/fail ratio analysis', 'Subject-level breakdowns', 'Performance trend visualization', 'At-risk student identification']
  }
];

// Icon map for widgets
const widgetIconMap: Record<string, React.ReactNode> = {
  'total-students': <GraduationCap size={20} />,
  'active-courses': <BookOpen size={20} />,
  'classes-today': <Layers size={20} />,
  'attendance-rate': <UserCheck size={20} />,
  'exam-pass-rate': <Award size={20} />,
};

export function ManageWidgetsView() {
  const installedWidgetIds = useAppStore(s => s.installedWidgetIds);
  const installWidget = useAppStore(s => s.installWidget);
  const uninstallWidget = useAppStore(s => s.uninstallWidget);

  const [activeTab, setActiveTab] = useState<'all' | 'installed' | 'uninstalled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWidget, setSelectedWidget] = useState<WidgetItem | null>(null);

  const handleToggle = (e: React.MouseEvent, id: string, isInstalled: boolean) => {
    e.stopPropagation();
    if (isInstalled) {
      uninstallWidget(id);
    } else {
      installWidget(id);
    }
  };

  const filteredWidgets = widgetsList.filter(widget => {
    const isInstalled = installedWidgetIds.includes(widget.id);
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'installed' && isInstalled) || 
      (activeTab === 'uninstalled' && !isInstalled);

    const matchesSearch = 
      widget.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      widget.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });


  const isDetailOpen = selectedWidget !== null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {/* ===== MAIN CONTENT AREA ===== */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ===== LEFT: Widget List ===== */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          padding: '28px 32px',
          borderRight: isDetailOpen ? '1px solid #f0f0f0' : 'none'
        }}>
          {/* Header Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '6px'
          }}>
            <div>
              <h1 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#111827',
                margin: 0,
                letterSpacing: '-0.01em'
              }}>
                Your Integrations
              </h1>
              <p style={{
                fontSize: '13px',
                color: '#9ca3af',
                marginTop: '4px',
                lineHeight: '1.4'
              }}>
                Some of your favorite and most popular integrations.
              </p>
            </div>
            <span style={{
              fontSize: '13px',
              color: '#6b7280',
              fontWeight: 500,
              cursor: 'pointer',
              marginTop: '4px'
            }}>
              All apps
            </span>
          </div>

          {/* Tabs and Search Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            marginTop: '12px',
            gap: '12px'
          }}>
            {/* Tabs - plain text style like reference */}
            <div style={{ display: 'flex', gap: '0' }}>
              {(['all', 'installed', 'uninstalled'] as const).map(tab => {
                const isActive = activeTab === tab;
                const labelMap = {
                  all: 'All apps',
                  installed: 'Installed',
                  uninstalled: 'Available'
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      borderRadius: '0',
                      border: 'none',
                      borderBottom: isActive ? '2px solid #111827' : '2px solid transparent',
                      cursor: 'pointer',
                      background: 'transparent',
                      color: isActive ? '#111827' : '#9ca3af',
                      transition: 'all 150ms ease'
                    }}
                  >
                    {labelMap[tab]}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#d1d5db'
              }} />
              <input
                type="text"
                placeholder="Search widgets..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  paddingLeft: '34px',
                  paddingRight: '12px',
                  fontSize: '13px',
                  height: '36px',
                  width: '100%',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  color: '#111827',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute', right: '10px', top: '50%',
                    transform: 'translateY(-50%)', background: 'transparent',
                    border: 'none', cursor: 'pointer', color: '#9ca3af',
                    display: 'flex', alignItems: 'center', padding: 0
                  }}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Separator line */}
          <div style={{ borderBottom: '1px solid #f0f0f0', marginBottom: '4px' }} />

          {/* Widget Grid — 2-column layout like reference */}
          {filteredWidgets.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isDetailOpen ? '1fr' : '1fr 1fr',
              gap: '0'
            }}>
              {filteredWidgets.map((widget, index) => {
                const isInstalled = installedWidgetIds.includes(widget.id);
                const isSelected = selectedWidget?.id === widget.id;
                // Add right border for left-column items in 2-col mode
                const isLeftCol = !isDetailOpen && index % 2 === 0;

                return (
                  <div
                    key={widget.id}
                    onClick={() => setSelectedWidget(isSelected ? null : widget)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '18px 20px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0',
                      borderRight: isLeftCol ? '1px solid #f0f0f0' : 'none',
                      background: isSelected ? '#f9fafb' : '#ffffff',
                      transition: 'background 120ms ease'
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) e.currentTarget.style.background = '#fafafa';
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) e.currentTarget.style.background = '#ffffff';
                    }}
                  >
                    {/* Widget Icon */}
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: `${widget.color}12`,
                      border: `1px solid ${widget.color}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: widget.color,
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {widgetIconMap[widget.id] || <Layers size={18} />}
                    </div>

                    {/* Widget Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Name Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{
                          fontSize: '13.5px',
                          fontWeight: 600,
                          color: '#111827',
                          lineHeight: '1.3'
                        }}>
                          {widget.label}
                        </span>
                      </div>
                      {/* By line */}
                      <div style={{
                        fontSize: '11px',
                        color: '#9ca3af',
                        marginBottom: '6px',
                        fontWeight: 400
                      }}>
                        by Akedex
                      </div>
                      {/* Description */}
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        lineHeight: '1.45',
                        margin: '0 0 8px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {widget.description}
                      </p>
                      {/* Tags Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontSize: '9.5px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.03em',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: widget.category === 'Academic Insights' ? '#ede9fe' : '#fff7ed',
                          color: widget.category === 'Academic Insights' ? '#7c3aed' : '#ea580c'
                        }}>
                          {widget.category === 'Academic Insights' ? 'ACADEMIC INSIGHTS' : 'ADMIN & OPS'}
                        </span>
                        {isInstalled && (
                          <span style={{
                            fontSize: '9.5px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.03em',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: '#d1fae5',
                            color: '#059669'
                          }}>
                            ACTIVE
                          </span>
                        )}
                        <span style={{
                          fontSize: '11px',
                          color: '#6366f1',
                          fontWeight: 500,
                          marginLeft: 'auto',
                          cursor: 'pointer'
                        }}>
                          View Instruction
                        </span>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <div
                      onClick={(e) => handleToggle(e, widget.id, isInstalled)}
                      title={isInstalled ? 'Click to uninstall' : 'Click to install'}
                      style={{
                        width: '40px',
                        height: '22px',
                        borderRadius: '12px',
                        background: isInstalled ? '#4f6ef7' : '#e5e7eb',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background 200ms ease',
                        flexShrink: 0,
                        marginTop: '6px'
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        position: 'absolute',
                        top: '2px',
                        left: isInstalled ? '20px' : '2px',
                        transition: 'left 200ms ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '64px 32px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</span>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', margin: 0 }}>
                No Widgets Found
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#9ca3af',
                maxWidth: '320px',
                margin: '8px 0 20px'
              }}>
                We couldn&apos;t find any widgets matching your filter or search query.
              </p>
              <button
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                }}
                style={{
                  fontSize: '13px',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#4f6ef7',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* ===== RIGHT: Detail Panel ===== */}
        {selectedWidget && (() => {
          const sw = selectedWidget;
          const swInstalled = installedWidgetIds.includes(sw.id);
          return (
            <div style={{
              width: '440px',
              flexShrink: 0,
              overflowY: 'auto',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Breadcrumb + Close */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px 0'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  fontWeight: 400
                }}>
                  Integrations / {sw.label}
                </span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: '#9ca3af', display: 'flex', padding: '4px'
                  }}>
                    <MoreHorizontal size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedWidget(null)}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: '#9ca3af', display: 'flex', padding: '4px'
                    }}>
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Widget Title Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '20px 24px 20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${sw.color}12`,
                  border: `1px solid ${sw.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: sw.color,
                  flexShrink: 0
                }}>
                  {widgetIconMap[sw.id] || <Layers size={22} />}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#111827',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>
                    {sw.label}
                  </h2>
                  <span style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: 400
                  }}>
                    By Akedex
                  </span>
                </div>
                {/* Configure / Install Button */}
                <button
                  onClick={(e) => handleToggle(e, sw.id, swInstalled)}
                  style={{
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    background: '#4f6ef7',
                    color: '#ffffff',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {swInstalled ? (
                    <>
                      <Check size={14} />
                      Configure
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      Install
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div style={{ borderBottom: '1px solid #f0f0f0' }} />

              {/* Widget Description line */}
              <div style={{ padding: '16px 24px 0' }}>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  lineHeight: '1.55',
                  margin: 0
                }}>
                  {sw.description}
                </p>
              </div>

              {/* Colorful Preview Banner */}
              <div style={{ padding: '16px 24px' }}>
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #f0f0f0',
                  background: `linear-gradient(135deg, ${sw.color}18, #f8f4ff, #fef3c7, #fce7f3, ${sw.color}10)`,
                  padding: '24px',
                  position: 'relative'
                }}>
                  {/* Preview Content */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: sw.color,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '6px'
                      }}>
                        {sw.label.toUpperCase()}
                      </div>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: 800,
                        color: '#111827',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        letterSpacing: '-0.02em',
                        lineHeight: 1
                      }}>
                        {sw.value}
                      </div>
                    </div>
                    <svg width="100" height="40" style={{ overflow: 'visible' }}>
                      <path 
                        d={sw.sparkline} 
                        fill="none" 
                        stroke={sw.color} 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        opacity={0.6}
                      />
                    </svg>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '10px',
                    fontSize: '11px'
                  }}>
                    <ArrowUpRight size={12} style={{ color: '#10b981' }} />
                    <span style={{ color: '#10b981', fontWeight: 600 }}>{sw.change}</span>
                  </div>
                  {/* Decorative blobs */}
                  <div style={{
                    position: 'absolute', top: '10px', right: '10px',
                    width: '50px', height: '50px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: sw.color, opacity: 0.4
                  }}>
                    {widgetIconMap[sw.id] || <Layers size={20} />}
                  </div>
                </div>
              </div>

              {/* Overview Section */}
              <div style={{ padding: '0 24px 16px' }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#111827',
                  margin: '0 0 8px 0'
                }}>
                  Overview
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {sw.description}
                </p>
              </div>

              {/* How it works */}
              <div style={{ padding: '0 24px 16px' }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#111827',
                  margin: '0 0 8px 0'
                }}>
                  How it works
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {sw.howItWorks}
                </p>
              </div>

              {/* Key Features */}
              <div style={{ padding: '0 24px 16px' }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#111827',
                  margin: '0 0 12px 0'
                }}>
                  Key Features
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {sw.features.map((feat, fi) => (
                    <div key={fi} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '13px',
                      color: '#6b7280',
                      lineHeight: '1.4'
                    }}>
                      <Check size={14} style={{ color: sw.color, flexShrink: 0 }} />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div style={{ borderBottom: '1px solid #f0f0f0', margin: '8px 24px' }} />

              {/* Connection Status Section */}
              <div style={{ padding: '16px 24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#111827',
                      margin: 0
                    }}>
                      Widget Status
                    </h4>
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    background: swInstalled ? '#d1fae5' : '#f3f4f6',
                    color: swInstalled ? '#059669' : '#9ca3af'
                  }}>
                    {swInstalled ? 'CONNECTED' : 'NOT CONNECTED'}
                  </span>
                </div>

                {/* Show on Dashboard toggle */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>
                      Show on Dashboard
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                      Display this widget on your main dashboard.
                    </div>
                  </div>
                  <div
                    onClick={(e) => handleToggle(e, sw.id, swInstalled)}
                    style={{
                      width: '40px',
                      height: '22px',
                      borderRadius: '12px',
                      background: swInstalled ? '#4f6ef7' : '#e5e7eb',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background 200ms ease',
                      flexShrink: 0
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      position: 'absolute',
                      top: '2px',
                      left: swInstalled ? '20px' : '2px',
                      transition: 'left 200ms ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                    }} />
                  </div>
                </div>

                {/* Connect to Dashboard */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>
                      Connect personal account
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                      Enabling you to customize data and focus on what truly matters.
                    </div>
                  </div>
                  <div
                    style={{
                      width: '40px',
                      height: '22px',
                      borderRadius: '12px',
                      background: '#e5e7eb',
                      position: 'relative',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      position: 'absolute',
                      top: '2px',
                      left: '2px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                    }} />
                  </div>
                </div>

                {/* Personal Connected Search */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>
                      Personal Connected Search
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                      Search all your data from your connected API account.
                    </div>
                  </div>
                  <div
                    style={{
                      width: '40px',
                      height: '22px',
                      borderRadius: '12px',
                      background: '#e5e7eb',
                      position: 'relative',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      position: 'absolute',
                      top: '2px',
                      left: '2px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                    }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// =====================================================
// ACADEMIC CALENDAR MANAGER VIEW
// =====================================================
interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'Academic Terms' | 'Holidays' | 'Exams' | 'Events';
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  description: string;
}

const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Term I Commencement',
    date: '2026-06-01',
    category: 'Academic Terms',
    startTime: '08:30',
    endTime: '12:00',
    description: 'Welcome assembly, material distributions, and orientation sessions for Term I students.'
  },
  {
    id: 'e2',
    title: 'World Environment Day Assembly',
    date: '2026-06-05',
    category: 'Events',
    startTime: '09:00',
    endTime: '11:00',
    description: 'Special school assembly, guest lecture on biodiversity, and plantation drive on the school grounds.'
  },
  {
    id: 'e3',
    title: 'CBSE Guideline Seminar',
    date: '2026-06-12',
    category: 'Events',
    startTime: '10:00',
    endTime: '13:00',
    description: 'Professional development seminar for faculty explaining new CBSE curriculum guidelines and grading methodologies.'
  },
  {
    id: 'e4',
    title: 'Summer Midterm Exam - Math',
    date: '2026-06-15',
    category: 'Exams',
    startTime: '09:30',
    endTime: '12:30',
    description: 'Midterm written assessment in Mathematics for Grade 9 to 12 students.'
  },
  {
    id: 'e5',
    title: 'Summer Midterm Exam - Physics',
    date: '2026-06-16',
    category: 'Exams',
    startTime: '09:30',
    endTime: '12:30',
    description: 'Midterm assessment in Physics theory and practical layouts for Grades 11 & 12.'
  },
  {
    id: 'e6',
    title: 'Summer Solstice Holiday',
    date: '2026-06-21',
    category: 'Holidays',
    startTime: '00:00',
    endTime: '23:59',
    description: 'School closed in observance of the Summer Solstice. Staff and student holiday.'
  },
  {
    id: 'e7',
    title: 'Parent-Teacher Conference (PTM)',
    date: '2026-06-27',
    category: 'Events',
    startTime: '08:00',
    endTime: '14:00',
    description: 'One-on-one parent teacher meetings to review academic progression and midterm marks reports.'
  }
];

export function AcademicCalendarView() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 5, 5)); // Seeded at June 5, 2026
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 5, 5));
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  
  const [events, setEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Academic Terms', 'Holidays', 'Exams', 'Events'
  ]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // Form Inputs State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'Academic Terms' | 'Holidays' | 'Exams' | 'Events'>('Events');
  const [formDate, setFormDate] = useState('2026-06-05');
  const [formStartTime, setFormStartTime] = useState('09:00');
  const [formEndTime, setFormEndTime] = useState('10:00');
  const [formDescription, setFormDescription] = useState('');

  // Date Formatting helpers (Vanilla JS)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const categoriesList = [
    { name: 'Academic Terms', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)', text: '#1e40af', border: '#2563eb' },
    { name: 'Holidays', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)', text: '#991b1b', border: '#dc2626' },
    { name: 'Exams', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.08)', text: '#6b21a8', border: '#9333ea' },
    { name: 'Events', color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)', text: '#065f46', border: '#059669' }
  ];

  const getCategoryStyles = (catName: string) => {
    return categoriesList.find(c => c.name === catName) || categoriesList[3];
  };

  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (y: number, m: number) => {
    return new Date(y, m, 1).getDay();
  };

  const formatDateString = (y: number, m: number, d: number) => {
    const mm = (m + 1).toString().padStart(2, '0');
    const dd = d.toString().padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const formatTime12h = (time24: string) => {
    if (!time24) return '';
    const [hStr, mStr] = time24.split(':');
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    const minStr = m < 10 ? `0${m}` : m;
    return `${hour12}:${minStr} ${ampm}`;
  };

  // Sidebar category checkbox toggle
  const toggleCategory = (catName: string) => {
    if (selectedCategories.includes(catName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== catName));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
    }
  };

  // Nav Month Handler
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    const today = new Date(2026, 5, 5); // Base today coordinate
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Event creation triggers
  const handleOpenCreateModal = (dateStr?: string, initialHour?: number) => {
    setEditingEvent(null);
    setFormTitle('');
    setFormCategory('Events');
    setFormDate(dateStr || formatDateString(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    
    if (initialHour !== undefined) {
      const startH = initialHour.toString().padStart(2, '0');
      const endH = (initialHour + 1).toString().padStart(2, '0');
      setFormStartTime(`${startH}:00`);
      setFormEndTime(`${endH}:00`);
    } else {
      setFormStartTime('09:00');
      setFormEndTime('10:00');
    }
    setFormDescription('');
    setShowModal(true);
  };

  const handleOpenEditModal = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEvent(event);
    setFormTitle(event.title);
    setFormCategory(event.category);
    setFormDate(event.date);
    setFormStartTime(event.startTime);
    setFormEndTime(event.endTime);
    setFormDescription(event.description);
    setShowModal(true);
  };

  // Save/Submit Form Action
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingEvent) {
      // Edit
      setEvents(events.map(ev => ev.id === editingEvent.id ? {
        ...ev,
        title: formTitle,
        category: formCategory,
        date: formDate,
        startTime: formStartTime,
        endTime: formEndTime,
        description: formDescription
      } : ev));
    } else {
      // Create
      const newEv: CalendarEvent = {
        id: `event-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        date: formDate,
        startTime: formStartTime,
        endTime: formEndTime,
        description: formDescription
      };
      setEvents([...events, newEv]);
    }
    setShowModal(false);
  };

  // Delete Action
  const handleDeleteEvent = () => {
    if (!editingEvent) return;
    setEvents(events.filter(ev => ev.id !== editingEvent.id));
    setShowModal(false);
  };

  // Filtered Events based on sidebar selection
  const visibleEvents = events.filter(ev => selectedCategories.includes(ev.category));

  // Compute month rendering days grid
  const yVal = currentDate.getFullYear();
  const mVal = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(yVal, mVal);
  const firstDayIndex = getFirstDayOfMonth(yVal, mVal);

  const prevMonthIndex = mVal === 0 ? 11 : mVal - 1;
  const prevMonthYear = mVal === 0 ? yVal - 1 : yVal;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonthIndex);

  const gridCells: { dayNum: number; dateStr: string; isCurrentMonth: boolean; dateObj: Date }[] = [];

  // 1. Previous month leading days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const dateStr = formatDateString(prevMonthYear, prevMonthIndex, d);
    gridCells.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: false,
      dateObj: new Date(prevMonthYear, prevMonthIndex, d)
    });
  }

  // 2. Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDateString(yVal, mVal, d);
    gridCells.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: true,
      dateObj: new Date(yVal, mVal, d)
    });
  }

  // 3. Next month trailing days to complete grid rows
  const remainingCells = 42 - gridCells.length;
  const nextMonthIndex = mVal === 11 ? 0 : mVal + 1;
  const nextMonthYear = mVal === 11 ? yVal + 1 : yVal;
  for (let d = 1; d <= remainingCells; d++) {
    const dateStr = formatDateString(nextMonthYear, nextMonthIndex, d);
    gridCells.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: false,
      dateObj: new Date(nextMonthYear, nextMonthIndex, d)
    });
  }

  // Week View dates helper
  const getDaysOfWeek = (dObj: Date) => {
    const day = dObj.getDay(); // 0 to 6
    const diff = dObj.getDate() - day;
    const sunday = new Date(dObj);
    sunday.setDate(diff);

    const weekDaysList: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(sunday);
      nextDay.setDate(sunday.getDate() + i);
      weekDaysList.push(nextDay);
    }
    return weekDaysList;
  };
  const weekDays = getDaysOfWeek(selectedDate);

  // Day View events list
  const selectedDateStr = formatDateString(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  const selectedDateEvents = visibleEvents.filter(ev => ev.date === selectedDateStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Time grid hours definition (8 AM to 6 PM)
  const hoursList = Array.from({ length: 11 }, (_, i) => i + 8); // 8, 9, 10 ... 18

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      width: '100%',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* 1. LEFT SIDEBAR */}
      <div style={{
        width: '240px',
        borderRight: '1px solid var(--border-primary)',
        background: 'var(--bg-secondary)',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flexShrink: 0,
        overflowY: 'auto'
      }}>
        {/* prominent Create Button */}
        <button
          onClick={() => handleOpenCreateModal()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            height: '42px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            transition: 'all 120ms ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
            e.currentTarget.style.borderColor = 'var(--accent-blue)';
            e.currentTarget.style.color = 'var(--accent-blue)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
            e.currentTarget.style.borderColor = 'var(--border-primary)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <Plus size={16} strokeWidth={3} />
          Create Event
        </button>

        {/* Sidebar Compact Mini Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {monthNames[mVal]} {yVal}
            </span>
            <div style={{ display: 'flex', gap: '2px' }}>
              <button 
                onClick={handlePrevMonth} 
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--text-secondary)' }}
              >
                <ChevronDown size={14} style={{ transform: 'rotate(90deg)' }} />
              </button>
              <button 
                onClick={handleNextMonth} 
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--text-secondary)' }}
              >
                <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
              </button>
            </div>
          </div>
          {/* Mini Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', fontSize: '9px' }}>
            {/* Weekday Labels */}
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((w, idx) => (
              <span key={idx} style={{ color: 'var(--text-tertiary)', fontWeight: 600, paddingBottom: '4px' }}>{w}</span>
            ))}
            {/* Mini Day cells */}
            {gridCells.slice(0, 35).map((cell, idx) => {
              const isSelected = selectedDateStr === cell.dateStr;
              const isToday = cell.dateStr === '2026-06-05';

              return (
                <span
                  key={idx}
                  onClick={() => {
                    setSelectedDate(cell.dateObj);
                    setCurrentDate(cell.dateObj);
                  }}
                  style={{
                    height: '22px',
                    lineHeight: '22px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontWeight: cell.isCurrentMonth ? 600 : 400,
                    color: isSelected ? 'white' : (cell.isCurrentMonth ? 'var(--text-primary)' : 'var(--text-muted)'),
                    background: isSelected 
                      ? 'var(--accent-blue)' 
                      : (isToday ? 'rgba(59, 130, 246, 0.15)' : 'transparent'),
                    border: isToday && !isSelected ? '1px solid var(--accent-blue)' : 'none',
                    display: 'block'
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'var(--bg-tertiary)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.background = isToday ? 'rgba(59, 130, 246, 0.15)' : 'transparent';
                    }
                  }}
                >
                  {cell.dayNum}
                </span>
              );
            })}
          </div>
        </div>

        {/* My Calendars category list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', margin: 0, paddingBottom: '4px', borderBottom: '1px solid var(--border-primary)' }}>
            My Calendars
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categoriesList.map(cat => {
              const isChecked = selectedCategories.includes(cat.name);
              return (
                <label 
                  key={cat.name} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    fontSize: '11px', 
                    fontWeight: 600, 
                    color: 'var(--text-primary)', 
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat.name)}
                    style={{
                      accentColor: cat.color,
                      width: '14px',
                      height: '14px',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    background: cat.color,
                    display: 'inline-block'
                  }} />
                  {cat.name}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. MAIN CALENDAR PANEL */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Pane Top Header */}
        <div style={{
          height: '52px',
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          background: 'var(--bg-secondary)',
          flexShrink: 0
        }}>
          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, minWidth: '130px' }}>
              {monthNames[mVal]} {yVal}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button 
                onClick={handleToday}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', height: '28px', padding: '0 12px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
              >
                Today
              </button>
              <button 
                onClick={handlePrevMonth}
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', cursor: 'pointer', width: '28px', height: '28px', borderRadius: '6px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronDown size={14} style={{ transform: 'rotate(90deg)' }} />
              </button>
              <button 
                onClick={handleNextMonth}
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', cursor: 'pointer', width: '28px', height: '28px', borderRadius: '6px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
              </button>
            </div>
          </div>

          {/* View toggle Buttons */}
          <div style={{
            display: 'flex',
            gap: '2px',
            background: 'var(--bg-tertiary)',
            padding: '2px',
            borderRadius: '6px',
            border: '1px solid var(--border-primary)'
          }}>
            {(['month', 'week', 'day'] as const).map(mode => {
              const isActive = viewMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    padding: '4px 12px',
                    fontSize: '10px',
                    fontWeight: 700,
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    background: isActive ? 'var(--bg-active)' : 'transparent',
                    color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    transition: 'all 100ms ease'
                  }}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. CALENDAR VIEWS GRID */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          
          {/* MONTH VIEW */}
          {viewMode === 'month' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '520px' }}>
              {/* Day Labels Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                borderBottom: '1px solid var(--border-primary)',
                background: 'var(--bg-secondary)',
                textAlign: 'center',
                flexShrink: 0
              }}>
                {weekdaysShort.map((w, idx) => (
                  <div key={idx} style={{ padding: '8px 0', fontSize: '10px', fontWeight: 800, color: 'var(--text-tertiary)' }}>{w}</div>
                ))}
              </div>

              {/* Grid Cells */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridTemplateRows: 'repeat(6, 1fr)',
                flex: 1,
                minHeight: '480px'
              }}>
                {gridCells.map((cell, idx) => {
                  const isToday = cell.dateStr === '2026-06-05';
                  const isSelected = selectedDateStr === cell.dateStr;
                  const cellEvents = visibleEvents.filter(ev => ev.date === cell.dateStr)
                    .sort((a, b) => a.startTime.localeCompare(b.startTime));

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedDate(cell.dateObj);
                        handleOpenCreateModal(cell.dateStr);
                      }}
                      style={{
                        borderRight: '1px solid var(--border-secondary)',
                        borderBottom: '1px solid var(--border-secondary)',
                        padding: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        background: cell.isCurrentMonth ? 'var(--bg-primary)' : 'rgba(241,245,249,0.2)',
                        minHeight: '80px',
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                      onMouseLeave={e => e.currentTarget.style.background = cell.isCurrentMonth ? 'var(--bg-primary)' : 'rgba(241,245,249,0.2)'}
                    >
                      {/* Day number cell top */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isToday 
                            ? 'white' 
                            : (cell.isCurrentMonth ? 'var(--text-primary)' : 'var(--text-muted)'),
                          background: isToday ? 'var(--accent-blue)' : 'transparent',
                          border: isToday ? 'none' : (isSelected ? '1px solid var(--accent-blue)' : 'none')
                        }}>
                          {cell.dayNum}
                        </span>
                        {cellEvents.length > 0 && (
                          <span style={{ fontSize: '8px', fontWeight: 800, color: 'var(--text-tertiary)', background: 'var(--border-primary)', padding: '1px 4px', borderRadius: '4px' }}>
                            {cellEvents.length} {cellEvents.length === 1 ? 'event' : 'events'}
                          </span>
                        )}
                      </div>

                      {/* Event list container */}
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        overflowY: 'hidden'
                      }}>
                        {cellEvents.slice(0, 3).map(event => {
                          const styles = getCategoryStyles(event.category);
                          return (
                            <div
                              key={event.id}
                              onClick={(e) => handleOpenEditModal(event, e)}
                              title={`${event.title} (${formatTime12h(event.startTime)} - ${formatTime12h(event.endTime)})`}
                              style={{
                                height: '18px',
                                lineHeight: '18px',
                                background: styles.bg,
                                color: styles.text,
                                borderLeft: `3px solid ${styles.color}`,
                                borderRadius: '3px',
                                padding: '0 4px',
                                fontSize: '9px',
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                transition: 'transform 80ms ease'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateX(1px)';
                                e.currentTarget.style.filter = 'brightness(0.95)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.filter = 'none';
                              }}
                            >
                              {event.startTime !== '00:00' && (
                                <span style={{ marginRight: '3px', fontSize: '8px', opacity: 0.8 }}>
                                  {event.startTime}
                                </span>
                              )}
                              {event.title}
                            </div>
                          );
                        })}
                        {cellEvents.length > 3 && (
                          <div style={{ fontSize: '8.5px', color: 'var(--text-tertiary)', paddingLeft: '4px', fontWeight: 600 }}>
                            + {cellEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* WEEK VIEW */}
          {viewMode === 'week' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '520px' }}>
              {/* Day columns headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px repeat(7, 1fr)',
                borderBottom: '1px solid var(--border-primary)',
                background: 'var(--bg-secondary)',
                flexShrink: 0
              }}>
                <div style={{ padding: '10px 0', borderRight: '1px solid var(--border-primary)' }} />
                {weekDays.map((date, idx) => {
                  const dateStr = formatDateString(date.getFullYear(), date.getMonth(), date.getDate());
                  const isToday = dateStr === '2026-06-05';
                  return (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedDate(date)}
                      style={{ 
                        padding: '8px 0', 
                        textAlign: 'center', 
                        cursor: 'pointer',
                        background: dateStr === selectedDateStr ? 'var(--bg-active)' : 'transparent',
                        borderRight: '1px solid var(--border-secondary)'
                      }}
                    >
                      <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                        {weekdaysShort[date.getDay()]}
                      </div>
                      <div style={{ 
                        fontSize: '13px', 
                        fontWeight: 800, 
                        color: isToday ? 'white' : 'var(--text-primary)', 
                        background: isToday ? 'var(--accent-blue)' : 'transparent',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '3px auto 0'
                      }}>
                        {date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Day columns timeline list */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px repeat(7, 1fr)',
                flex: 1
              }}>
                {/* Hours column */}
                <div style={{
                  borderRight: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {hoursList.map(h => (
                    <div key={h} style={{
                      height: '60px',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'var(--text-tertiary)',
                      textAlign: 'right',
                      paddingRight: '8px',
                      lineHeight: '20px',
                      borderBottom: '1px solid var(--border-secondary)'
                    }}>
                      {h === 12 ? '12 PM' : (h > 12 ? `${h - 12} PM` : `${h} AM`)}
                    </div>
                  ))}
                </div>

                {/* Event Columns per weekday */}
                {weekDays.map((date, colIdx) => {
                  const colDateStr = formatDateString(date.getFullYear(), date.getMonth(), date.getDate());
                  const colEvents = visibleEvents.filter(ev => ev.date === colDateStr)
                    .sort((a, b) => a.startTime.localeCompare(b.startTime));

                  return (
                    <div
                      key={colIdx}
                      style={{
                        borderRight: '1px solid var(--border-secondary)',
                        position: 'relative',
                        background: colDateStr === selectedDateStr ? 'rgba(59,130,246,0.01)' : 'transparent',
                        height: `${hoursList.length * 60}px`
                      }}
                    >
                      {/* Grid background lines */}
                      {hoursList.map(h => (
                        <div 
                          key={h} 
                          onClick={() => handleOpenCreateModal(colDateStr, h)}
                          style={{
                            height: '60px',
                            borderBottom: '1px solid var(--border-secondary)',
                            cursor: 'cell'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        />
                      ))}

                      {/* Absolute events placement */}
                      {colEvents.map(event => {
                        const [startH, startM] = event.startTime.split(':').map(Number);
                        const [endH, endM] = event.endTime.split(':').map(Number);

                        const startOffset = Math.max(8, Math.min(19, startH + startM / 60));
                        const endOffset = Math.max(8, Math.min(19, endH + endM / 60));

                        const topPx = (startOffset - 8) * 60;
                        const heightPx = Math.max(24, (endOffset - startOffset) * 60);

                        const styles = getCategoryStyles(event.category);

                        return (
                          <div
                            key={event.id}
                            onClick={(e) => handleOpenEditModal(event, e)}
                            style={{
                              position: 'absolute',
                              top: `${topPx}px`,
                              left: '4px',
                              right: '4px',
                              height: `${heightPx - 4}px`,
                              background: styles.bg,
                              color: styles.text,
                              borderLeft: `3px solid ${styles.color}`,
                              borderRadius: '4px',
                              padding: '4px 6px',
                              fontSize: '9.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px',
                              zIndex: 5,
                              transition: 'transform 80ms ease'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = 'scale(1.02)';
                              e.currentTarget.style.zIndex = '10';
                              e.currentTarget.style.boxShadow = '0 3px 6px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.zIndex = '5';
                              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                            }}
                          >
                            <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                              {event.title}
                            </div>
                            <div style={{ fontSize: '8px', opacity: 0.8, fontWeight: 500 }}>
                              {formatTime12h(event.startTime)} - {formatTime12h(event.endTime)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DAY VIEW */}
          {viewMode === 'day' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '520px' }}>
              {/* Day header */}
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-primary)',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0
              }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {weekdaysShort[selectedDate.getDay()]}, {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
                  </h3>
                  <p style={{ fontSize: '10.5px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                    Detailed schedule index checklist. Click hourly slots to create events.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenCreateModal(selectedDateStr)}
                  className="btn btn-primary btn-sm"
                  style={{ gap: '4px' }}
                >
                  <Plus size={12} strokeWidth={3} />
                  Add Event Today
                </button>
              </div>

              {/* Day hourly Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                flex: 1
              }}>
                {/* Hours column */}
                <div style={{
                  borderRight: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {hoursList.map(h => (
                    <div key={h} style={{
                      height: '68px',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      color: 'var(--text-tertiary)',
                      textAlign: 'right',
                      paddingRight: '10px',
                      lineHeight: '22px',
                      borderBottom: '1px solid var(--border-secondary)'
                    }}>
                      {h === 12 ? '12 PM' : (h > 12 ? `${h - 12} PM` : `${h} AM`)}
                    </div>
                  ))}
                </div>

                {/* Day timeline slot grid */}
                <div style={{
                  position: 'relative',
                  height: `${hoursList.length * 68}px`,
                  background: 'var(--bg-primary)'
                }}>
                  {/* Grid background lines */}
                  {hoursList.map(h => (
                    <div 
                      key={h} 
                      onClick={() => handleOpenCreateModal(selectedDateStr, h)}
                      style={{
                        height: '68px',
                        borderBottom: '1px solid var(--border-secondary)',
                        cursor: 'cell'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    />
                  ))}

                  {/* Absolute Day events placement */}
                  {selectedDateEvents.map(event => {
                    const [startH, startM] = event.startTime.split(':').map(Number);
                    const [endH, endM] = event.endTime.split(':').map(Number);

                    const startOffset = Math.max(8, Math.min(19, startH + startM / 60));
                    const endOffset = Math.max(8, Math.min(19, endH + endM / 60));

                    const topPx = (startOffset - 8) * 68;
                    const heightPx = Math.max(28, (endOffset - startOffset) * 68);

                    const styles = getCategoryStyles(event.category);

                    return (
                      <div
                        key={event.id}
                        onClick={(e) => handleOpenEditModal(event, e)}
                        style={{
                          position: 'absolute',
                          top: `${topPx}px`,
                          left: '12px',
                          right: '24px',
                          height: `${heightPx - 6}px`,
                          background: styles.bg,
                          color: styles.text,
                          borderLeft: `4px solid ${styles.color}`,
                          borderRadius: '6px',
                          padding: '10px 14px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          zIndex: 5,
                          transition: 'transform 80ms ease'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateX(2px)';
                          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.06)';
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {event.title}
                          </span>
                          <span style={{ fontSize: '9px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                            {event.category}
                          </span>
                        </div>
                        <div style={{ fontSize: '9.5px', opacity: 0.8, color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
                          <span>⏱️ {formatTime12h(event.startTime)} - {formatTime12h(event.endTime)}</span>
                        </div>
                        {event.description && (
                          <div style={{ 
                            fontSize: '10px', 
                            color: 'var(--text-tertiary)', 
                            fontWeight: 500, 
                            marginTop: '2px',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden'
                          }}>
                            {event.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 4. CREATE / EDIT EVENT POPUP MODAL */}
      {showModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.3)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'overlayFadeIn 150ms ease-out'
        }}>
          {/* Modal Container */}
          <div style={{
            width: '420px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'slideIn 180ms ease-out'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {editingEvent ? 'Edit Academic Event' : 'Create Academic Event'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEvent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Event Title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CBSE Term II Final Exams"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="input-field"
                  style={{
                    fontSize: '11px',
                    height: '34px',
                    borderRadius: '8px',
                    padding: '0 10px',
                    border: '1px solid var(--border-primary)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    width: '100%'
                  }}
                />
              </div>

              {/* Event Category Select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  Calendar Category
                </label>
                <select
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value as any)}
                  className="input-field"
                  style={{
                    fontSize: '11px',
                    height: '34px',
                    borderRadius: '8px',
                    padding: '0 8px',
                    border: '1px solid var(--border-primary)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    width: '100%',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Academic Terms">Academic Terms (Blue)</option>
                  <option value="Holidays">Holidays (Red)</option>
                  <option value="Exams">Exams (Purple)</option>
                  <option value="Events">Events (Green)</option>
                </select>
              </div>

              {/* Date Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  Schedule Date
                </label>
                <input
                  type="date"
                  required
                  value={formDate}
                  onChange={e => setFormDate(e.target.value)}
                  className="input-field"
                  style={{
                    fontSize: '11px',
                    height: '34px',
                    borderRadius: '8px',
                    padding: '0 10px',
                    border: '1px solid var(--border-primary)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    width: '100%'
                  }}
                />
              </div>

              {/* Time pickers row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Start Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formStartTime}
                    onChange={e => setFormStartTime(e.target.value)}
                    className="input-field"
                    style={{
                      fontSize: '11px',
                      height: '34px',
                      borderRadius: '8px',
                      padding: '0 10px',
                      border: '1px solid var(--border-primary)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      width: '100%'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    End Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formEndTime}
                    onChange={e => setFormEndTime(e.target.value)}
                    className="input-field"
                    style={{
                      fontSize: '11px',
                      height: '34px',
                      borderRadius: '8px',
                      padding: '0 10px',
                      border: '1px solid var(--border-primary)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      width: '100%'
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  Description / Remarks
                </label>
                <textarea
                  placeholder="Provide additional details regarding the schedule..."
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="input-field"
                  style={{
                    fontSize: '11px',
                    minHeight: '60px',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    border: '1px solid var(--border-primary)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    width: '100%',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Modal controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid var(--border-primary)', paddingTop: '16px' }}>
                <div>
                  {editingEvent && (
                    <button
                      type="button"
                      onClick={handleDeleteEvent}
                      className="btn btn-secondary btn-sm"
                      style={{
                        background: 'rgba(239, 68, 68, 0.08)',
                        borderColor: '#fca5a5',
                        color: '#b91c1c',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '6px 12px'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#ef4444';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.borderColor = '#ef4444';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
                        e.currentTarget.style.borderColor = '#fca5a5';
                        e.currentTarget.style.color = '#b91c1c';
                      }}
                    >
                      Delete Event
                    </button>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '11px', padding: '6px 12px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '11px', padding: '6px 16px', fontWeight: 700 }}
                  >
                    {editingEvent ? 'Save Changes' : 'Save Event'}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// =====================================================
// STUDENT REPORT CARD (CBSE MARKS STATEMENT STYLE)
// =====================================================

function numberToWords(num: number): string {
  const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE',
    'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
  const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
  
  if (num === 0) return 'ZERO';
  if (num < 20) return ones[num];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
  return ones[Math.floor(num / 100)] + ' HUNDRED' + (num % 100 ? ' ' + numberToWords(num % 100) : '');
}

function getPositionalGrade(marks: number): string {
  if (marks >= 91) return 'A1';
  if (marks >= 81) return 'A2';
  if (marks >= 71) return 'B1';
  if (marks >= 61) return 'B2';
  if (marks >= 51) return 'C1';
  if (marks >= 41) return 'C2';
  if (marks >= 33) return 'D';
  return 'E';
}

export function StudentReportCardView() {
  const activeTabId = useAppStore(s => s.activeTabId);
  const studentId = activeTabId.startsWith('student-report-card-')
    ? activeTabId.replace('student-report-card-', '')
    : '';

  const rawStudent = mockStudents.find(s => s.id === studentId) || mockStudents[0];
  const sData = getEnrichedStudentData(rawStudent);

  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [studentId]);

  // Generate deterministic subject data with theory/practical split
  const idNum = parseInt(sData.id) || 1;
  
  const reportSubjects = [
    { code: '184', name: 'ENGLISH LNG & LIT.', theory: Math.min(80, 50 + (idNum * 7) % 30), practical: Math.min(20, 15 + (idNum * 3) % 6) },
    { code: '002', name: 'HINDI COURSE-B', theory: Math.min(80, 48 + (idNum * 5) % 32), practical: Math.min(20, 16 + (idNum * 2) % 5) },
    { code: '241', name: 'MATHEMATICS BASIC', theory: Math.min(80, 45 + (idNum * 11) % 35), practical: Math.min(20, 14 + (idNum * 4) % 7) },
    { code: '086', name: 'SCIENCE', theory: Math.min(80, 42 + (idNum * 9) % 38), practical: Math.min(20, 15 + (idNum * 3) % 6) },
    { code: '087', name: 'SOCIAL SCIENCE', theory: Math.min(80, 55 + (idNum * 6) % 25), practical: Math.min(20, 16 + (idNum * 2) % 5) },
  ];

  const additionalSubject = {
    code: '402',
    name: 'INFORMATION TECHNOLOGY',
    theory: Math.min(50, 30 + (idNum * 8) % 20),
    practical: Math.min(50, 38 + (idNum * 4) % 12)
  };

  // Student metadata
  const dobParts = rawStudent.dob ? rawStudent.dob.split('-') : ['2011', '03', '15'];
  const dobFormatted = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`;
  const monthNames = ['', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const dayNum = parseInt(dobParts[2]);
  const suffix = (dayNum === 1 || dayNum === 21 || dayNum === 31) ? 'ST' : (dayNum === 2 || dayNum === 22) ? 'ND' : (dayNum === 3 || dayNum === 23) ? 'RD' : 'TH';
  const yearDiff = parseInt(dobParts[0]) - 2000;
  const dobInWords = `${dayNum}${suffix} ${monthNames[parseInt(dobParts[1])] || 'MARCH'} TWO THOUSAND ${yearDiff > 0 ? numberToWords(yearDiff) : ''}`;
  
  const rollNo = `${13100000 + idNum * 1000 + (idNum * 7) % 999}`;
  const regnNo = `C121/${20000 + idNum * 13}/00${idNum * 3 + 35}`;
  const certNo = `0${7000000 + idNum * 31415}`;
  const serialNo = `0${10000 + idNum * 89}`;

  const examYear = '2025';
  const resultDate = '03-08-2025';

  const handlePrint = async () => {
    try {
      // Dynamic import to avoid SSR issues in Next.js
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const printElement = document.querySelector('.report-card-page');
      if (!printElement) return;

      // Temporarily add a class or style to ensure it renders well in canvas
      const originalBorder = (printElement as HTMLElement).style.border;
      (printElement as HTMLElement).style.border = 'none';

      const canvas = await html2canvas(printElement as HTMLElement, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#fdf8f0',
      });

      // Restore border
      (printElement as HTMLElement).style.border = originalBorder;

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Calculate PDF dimensions (A4 size)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Report_Card_${sData.fullName.replace(/\s+/g, '_')}_${rollNo}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      useAppStore.getState().showToast('An error occurred while generating the PDF.', 'error');
    }
  };

  // Cell style helpers
  const cellStyle: React.CSSProperties = {
    border: '1px solid #1a1a2e',
    padding: '6px 10px',
    fontSize: '12px',
    fontFamily: '"Times New Roman", Times, serif',
    color: '#1a1a2e',
    verticalAlign: 'middle'
  };

  const headerCellStyle: React.CSSProperties = {
    ...cellStyle,
    fontWeight: 700,
    textAlign: 'center',
    fontSize: '10px',
    lineHeight: '1.3',
    background: '#f5f0e8'
  };

  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      background: '#e8e0d4',
      fontFamily: '"Times New Roman", Times, serif'
    }}>
      {/* Print Button - hidden on print */}
      <div className="no-print" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#1a1a2e',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid #c9a96e'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FileText size={18} style={{ color: '#c9a96e' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              Marks Statement Cum Certificate
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              {sData.fullName} &bull; {sData.institution} &bull; Session {examYear}
            </div>
          </div>
        </div>
        <button
          onClick={handlePrint}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '8px',
            border: '1px solid #c9a96e',
            background: 'transparent',
            color: '#c9a96e',
            cursor: 'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            transition: 'all 150ms ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#c9a96e';
            e.currentTarget.style.color = '#1a1a2e';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#c9a96e';
          }}
        >
          <Printer size={16} />
          Print / Download
        </button>
      </div>

      {/* Report Card Container */}
      <div style={{
        maxWidth: '820px',
        margin: '32px auto',
        padding: '0 16px 48px'
      }}>
        <div className="report-card-page" style={{
          background: '#fdf8f0',
          border: '3px solid #1a1a2e',
          borderRadius: '2px',
          position: 'relative',
          padding: '0',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}>
          {/* Decorative border pattern */}
          <div style={{
            position: 'absolute',
            inset: '6px',
            border: '2px solid #8b7355',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            inset: '10px',
            border: '1px solid #c9a96e',
            pointerEvents: 'none'
          }} />

          {/* Inner content padding */}
          <div style={{ padding: '28px 36px', position: 'relative' }}>

            {/* Serial / Certificate Numbers Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', color: '#555', fontFamily: 'monospace' }}>{serialNo}</span>
              <span style={{ fontSize: '10px', color: '#555' }}>
                <strong>{certNo}</strong>
              </span>
            </div>

            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              {/* Emblem */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <img 
                  src="/emblem.png" 
                  alt="National Emblem of India"
                  style={{
                    height: '80px',
                    objectFit: 'contain',
                    flexShrink: 0,
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>

              {/* Registration Number - right aligned */}
              <div style={{ textAlign: 'right', marginTop: '-60px', marginBottom: '40px' }}>
                <div style={{ fontSize: '10px', color: '#333' }}>
                  &#x0930;&#x091C;&#x093F;. &#x0928;&#x0902;. / <strong>Regn.No.</strong>&nbsp;&nbsp;<strong style={{ color: '#1a1a2e' }}>{regnNo}</strong>
                </div>
              </div>

              {/* Board Name */}
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', lineHeight: '1.6' }}>
                &#x0915;&#x0947;&#x0928;&#x094D;&#x0926;&#x094D;&#x0930;&#x0940;&#x092F; &#x092E;&#x093E;&#x0927;&#x094D;&#x092F;&#x092E;&#x093F;&#x0915; &#x0936;&#x093F;&#x0915;&#x094D;&#x0937;&#x093E; &#x092C;&#x094B;&#x0930;&#x094D;&#x0921;
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#1a1a2e', letterSpacing: '0.5px' }}>
                CENTRAL BOARD OF SECONDARY EDUCATION
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#333', marginTop: '2px' }}>
                &#x0905;&#x0902;&#x0915; &#x0935;&#x093F;&#x0935;&#x0930;&#x0923;&#x093F;&#x0915;&#x093E; &#x0938;&#x0939; &#x092A;&#x094D;&#x0930;&#x092E;&#x093E;&#x0923; &#x092A;&#x0924;&#x094D;&#x0930;
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', letterSpacing: '1px', marginTop: '2px' }}>
                MARKS STATEMENT CUM CERTIFICATE
              </div>
              <div style={{ fontSize: '11px', color: '#333', marginTop: '4px' }}>
                &#x092E;&#x093E;&#x0927;&#x094D;&#x092F;&#x092E;&#x093F;&#x0915; &#x0935;&#x093F;&#x0926;&#x094D;&#x092F;&#x093E;&#x0932;&#x092F; &#x092A;&#x0930;&#x0940;&#x0915;&#x094D;&#x0937;&#x093E;, {examYear}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a2e' }}>
                SECONDARY SCHOOL EXAMINATION, {examYear}
              </div>
            </div>

            {/* Student Photo Section (right aligned) */}
            <div style={{ position: 'absolute', top: '165px', right: '40px' }}>
              <div style={{
                width: '80px',
                height: '95px',
                border: '1px solid #8b7355',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f5f0e8',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {!imageFailed ? (
                  <img 
                    src={sData.avatar} 
                    alt={sData.fullName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#8b7355' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1 }}>
                      {sData.firstName.charAt(0)}{sData.lastName.charAt(0)}
                    </div>
                    <div style={{ fontSize: '7px', marginTop: '4px', fontWeight: 600 }}>
                      {sData.firstName}
                    </div>
                    <div style={{ fontSize: '7px', fontWeight: 600 }}>
                      {sData.lastName}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Student Details Section */}
            <div style={{ maxWidth: '620px', fontSize: '12px', lineHeight: '2', color: '#1a1a2e' }}>
              <div>
                &#x092F;&#x0939; &#x092A;&#x094D;&#x0930;&#x092E;&#x093E;&#x0923;&#x093F;&#x0924; &#x0915;&#x093F;&#x092F;&#x093E; &#x091C;&#x093E;&#x0924;&#x093E; &#x0939;&#x0948; &#x0915;&#x093F;
              </div>
              <div>
                This is to certify that&nbsp;&nbsp;&nbsp;&nbsp;<strong style={{ fontSize: '13px' }}>{sData.fullName.toUpperCase()}</strong>
              </div>
              <div>
                &#x0905;&#x0928;&#x0941;&#x0915;&#x094D;&#x0930;&#x092E;&#x093E;&#x0902;&#x0915;
              </div>
              <div>
                Roll No.&nbsp;&nbsp;<strong>{rollNo}</strong>
              </div>
              <div>
                &#x092E;&#x093E;&#x0924;&#x093E; &#x0915;&#x093E; &#x0928;&#x093E;&#x092E;
              </div>
              <div>
                Mother&apos;s Name&nbsp;&nbsp;&nbsp;&nbsp;<strong>{sData.motherName.toUpperCase()}</strong>
              </div>
              <div>
                &#x092A;&#x093F;&#x0924;&#x093E;/&#x0938;&#x0902;&#x0930;&#x0915;&#x094D;&#x0937;&#x0915; &#x0915;&#x093E; &#x0928;&#x093E;&#x092E;
              </div>
              <div>
                Father&apos;s / Guardian&apos;s Name&nbsp;&nbsp;&nbsp;&nbsp;<strong>{sData.fatherName.toUpperCase()}</strong>
              </div>
              <div>
                &#x091C;&#x0928;&#x094D;&#x092E; &#x0924;&#x093F;&#x0925;&#x093F;
              </div>
              <div>
                Date of Birth&nbsp;&nbsp;&nbsp;&nbsp;<strong>{dobFormatted}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>{dobInWords}</strong>
              </div>
              <div>
                &#x0935;&#x093F;&#x0926;&#x094D;&#x092F;&#x093E;&#x0932;&#x092F;
              </div>
              <div>
                School&nbsp;&nbsp;&nbsp;&nbsp;<strong>{sData.institution.toUpperCase()}</strong>
              </div>
              <div style={{ marginTop: '4px', fontSize: '11px' }}>
                &#x0915;&#x0940; &#x0936;&#x0948;&#x0915;&#x094D;&#x0937;&#x0923;&#x093F;&#x0915; &#x0909;&#x092A;&#x0932;&#x092C;&#x094D;&#x0927;&#x093F;&#x092F;&#x093E;&#x0901; &#x0928;&#x093F;&#x092E;&#x094D;&#x0928;&#x093E;&#x0928;&#x0941;&#x0938;&#x093E;&#x0930; &#x0939;&#x0948;&#x0902; has achieved Scholastic Achievements as under :
              </div>
            </div>

            {/* Marks Table */}
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '16px',
              marginBottom: '12px'
            }}>
              <thead>
                <tr>
                  <th rowSpan={2} style={{ ...headerCellStyle, width: '60px' }}>
                    &#x0935;&#x093F;&#x0937;&#x092F; &#x0915;&#x094B;&#x0921;<br />SUB.<br />CODE
                  </th>
                  <th rowSpan={2} style={{ ...headerCellStyle, width: '200px', textAlign: 'left', paddingLeft: '12px' }}>
                    &#x0935;&#x093F;&#x0937;&#x092F;<br />SUBJECT
                  </th>
                  <th colSpan={4} style={headerCellStyle}>
                    &#x092A;&#x094D;&#x0930;&#x093E;&#x092A;&#x094D;&#x0924;&#x093E;&#x0902;&#x0915; MARKS OBTAINED
                  </th>
                  <th rowSpan={2} style={{ ...headerCellStyle, width: '70px' }}>
                    &#x0938;&#x094D;&#x0925;&#x093F;&#x0924;&#x0940;&#x092F; &#x0917;&#x094D;&#x0930;&#x0947;&#x0921;<br />POSITIONAL<br />GRADE
                  </th>
                </tr>
                <tr>
                  <th style={{ ...headerCellStyle, width: '60px' }}>
                    &#x0932;&#x093F;&#x0916;&#x093F;&#x0924;<br />THEORY
                  </th>
                  <th style={{ ...headerCellStyle, width: '55px' }}>
                    &#x0906;&#x0902;. &#x092E;&#x0942;.<br />IA/<br />PR.
                  </th>
                  <th style={{ ...headerCellStyle, width: '55px' }}>
                    &#x092F;&#x094B;&#x0917;<br />TOTAL
                  </th>
                  <th style={{ ...headerCellStyle, width: '110px' }}>
                    &#x092F;&#x094B;&#x0917; (&#x0936;&#x092C;&#x094D;&#x0926;&#x094B;&#x0902; &#x092E;&#x0947;&#x0902;)<br />TOTAL (IN WORDS)
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportSubjects.map((subj) => {
                  const total = subj.theory + subj.practical;
                  return (
                    <tr key={subj.code}>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{subj.code}</td>
                      <td style={{ ...cellStyle, fontWeight: 600, paddingLeft: '12px' }}>{subj.name}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(subj.theory).padStart(3, '0')}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(subj.practical).padStart(3, '0')}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{String(total).padStart(3, '0')}</td>
                      <td style={{ ...cellStyle, fontWeight: 600 }}>{numberToWords(total)}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, fontSize: '13px' }}>{getPositionalGrade(total)}</td>
                    </tr>
                  );
                })}
                {/* Additional Subject Header */}
                <tr>
                  <td style={cellStyle}></td>
                  <td colSpan={6} style={{ ...cellStyle, fontWeight: 700, fontSize: '11px' }}>
                    ADDITIONAL SUBJECT
                  </td>
                </tr>
                {/* Additional Subject Row */}
                <tr>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{additionalSubject.code}</td>
                  <td style={{ ...cellStyle, fontWeight: 600, paddingLeft: '12px' }}>{additionalSubject.name}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(additionalSubject.theory).padStart(3, '0')}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(additionalSubject.practical).padStart(3, '0')}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{String(additionalSubject.theory + additionalSubject.practical).padStart(3, '0')}</td>
                  <td style={{ ...cellStyle, fontWeight: 600 }}>{numberToWords(additionalSubject.theory + additionalSubject.practical)}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, fontSize: '13px' }}>{getPositionalGrade(additionalSubject.theory + additionalSubject.practical)}</td>
                </tr>
              </tbody>
            </table>

            {/* Abbreviations */}
            <div style={{ fontSize: '9.5px', color: '#333', lineHeight: '1.8', marginTop: '12px' }}>
              <div><strong>&#x0938;&#x0902;&#x0915;&#x094D;&#x0937;&#x093F;&#x092A;&#x094D;&#x0924;&#x093F;&#x092F;&#x094B;&#x0902; &#x0915;&#x093E; &#x0905;&#x0930;&#x094D;&#x0925; : Abbreviations</strong></div>
              <div>AB : &#x0905;&#x0928;&#x0941;&#x092A;&#x0938;&#x094D;&#x0925;&#x093F;&#x0924; Absent</div>
              <div>IA : &#x0906;&#x0902;&#x0924;&#x0930;&#x093F;&#x0915; &#x092E;&#x0942;&#x0932;&#x094D;&#x092F;&#x093E;&#x0902;&#x0915;&#x0928; Internal Assessment</div>
              <div>PR. : &#x092A;&#x094D;&#x0930;&#x093E;&#x092F;&#x094B;&#x0917;&#x093F;&#x0915;/Practical</div>
              <div>ER : &#x0905;&#x0928;&#x093F;&#x0935;&#x093E;&#x0930;&#x094D;&#x092F; &#x092A;&#x0941;&#x0928;&#x0930;&#x093E;&#x0935;&#x0943;&#x0924;&#x094D;&#x0924;&#x093F; &#x0938;&#x092D;&#x0940; &#x0935;&#x093F;&#x0937;&#x092F;&#x094B;&#x0902; &#x092E;&#x0947;&#x0902; Essential Repeat in all subjects</div>
            </div>

            {/* Result */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#1a1a2e' }}>
                &#x092A;&#x0930;&#x093F;&#x0923;&#x093E;&#x092E; Result&nbsp;&nbsp;&nbsp;&nbsp;<strong style={{ fontSize: '14px', color: '#0d6e3d', letterSpacing: '1px' }}>PASS</strong>
              </div>
            </div>

            {/* Footer - Place and Date + Controller */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: '24px',
              paddingTop: '12px',
              borderTop: '1px solid #c9a96e'
            }}>
              <div style={{ fontSize: '11px', color: '#1a1a2e', lineHeight: '1.8' }}>
                <div>&#x0926;&#x093F;&#x0932;&#x094D;&#x0932;&#x0940; Delhi</div>
                <div>&#x0926;&#x093F;&#x0928;&#x093E;&#x0902;&#x0915; Dated : &nbsp;&nbsp;<strong>{resultDate}</strong></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '16px',
                  fontFamily: '"Brush Script MT", cursive, "Times New Roman", serif',
                  color: '#1a1a2e',
                  marginBottom: '4px',
                  fontStyle: 'italic'
                }}>
                  Controller of Exams
                </div>
                <div style={{ fontSize: '10px', color: '#333' }}>&#x092A;&#x0930;&#x0940;&#x0915;&#x094D;&#x0937;&#x093E; &#x0928;&#x093F;&#x092F;&#x0902;&#x0924;&#x094D;&#x0930;&#x0915;</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a2e' }}>Controller of Examinations</div>
              </div>
            </div>

            {/* Bottom disclaimer */}
            <div style={{
              marginTop: '16px',
              padding: '8px 0',
              borderTop: '1px solid #c9a96e',
              fontSize: '7.5px',
              color: '#666',
              lineHeight: '1.5'
            }}>
              <div>&#x0938;&#x0939;-&#x0936;&#x0948;&#x0915;&#x094D;&#x0937;&#x0923;&#x093F;&#x0915; &#x0909;&#x092A;&#x0932;&#x092C;&#x094D;&#x0927;&#x093F;&#x092F;&#x093E;&#x0901; : &#x0938;&#x0939;-&#x0936;&#x0948;&#x0915;&#x094D;&#x0937;&#x0923;&#x093F;&#x0915; &#x090F;&#x0935;&#x092E;&#x094D; &#x0905;&#x0928;&#x0941;&#x0936;&#x093E;&#x0938;&#x0928; &#x0915;&#x094D;&#x0937;&#x0947;&#x0924;&#x094D;&#x0930; &#x092E;&#x0947;&#x0902; &#x0936;&#x0948;&#x0915;&#x094D;&#x0937;&#x093F;&#x0915; &#x0935;&#x093F;&#x0926;&#x094D;&#x092F;&#x093E;&#x0932;&#x092F; &#x0926;&#x094D;&#x0935;&#x093E;&#x0930;&#x093E; &#x0905;&#x092A;&#x0928;&#x0947; &#x0938;&#x094D;&#x0924;&#x0930; &#x092A;&#x0930; &#x092C;&#x094B;&#x0930;&#x094D;&#x0921; &#x0926;&#x094D;&#x0935;&#x093E;&#x0930;&#x093E; &#x091C;&#x093E;&#x0930;&#x0940; &#x092A;&#x094D;&#x0930;&#x093E;&#x0930;&#x0942;&#x092A;&#x093E;&#x0928;&#x0941;&#x0938;&#x093E;&#x0930; &#x092A;&#x094D;&#x0930;&#x0926;&#x093E;&#x0928; &#x0915;&#x0940; &#x091C;&#x093E;&#x0924;&#x0940; &#x0939;&#x0948;&#x0902;&#x0964;</div>
              <div>Co-Scholastic achievements : Grading for Co-Scholastic and Discipline area is being issued by the school as per format prescribed by the Board.</div>
            </div>

          </div>
        </div>
      </div>

      {/* Print-only styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; }
          .report-card-page {
            box-shadow: none !important;
            margin: 0 !important;
            border-radius: 0 !important;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

// =====================================================
// --- STUDENT TRANSCRIPT / PROFILE SUMMARY VIEW ---
// =====================================================
export function StudentTranscriptView() {
  const activeTabId = useAppStore(s => s.activeTabId);
  const studentId = activeTabId.startsWith('student-transcript-')
    ? activeTabId.replace('student-transcript-', '')
    : '';

  const rawStudent = mockStudents.find(s => s.id === studentId) || mockStudents[0];
  const sData = getEnrichedStudentData(rawStudent);

  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [studentId]);

  const idNum = parseInt(sData.id) || 1;

  // Performance data
  const overallPct = sData.subjects.length > 0
    ? (sData.subjects.reduce((sum: number, s: any) => sum + s.marks, 0) / sData.subjects.length).toFixed(1)
    : '87.4';
  const overallGrade = parseFloat(overallPct) >= 90 ? 'A+' : parseFloat(overallPct) >= 80 ? 'A' : parseFloat(overallPct) >= 70 ? 'B+' : 'B';
  const totalMarks = sData.subjects.reduce((sum: number, s: any) => sum + s.marks, 0);
  const totalMax = sData.subjects.length * 100;
  const classRank = sData.classRank;
  const totalInClass = sData.totalInClass;
  const promotionStatus = parseFloat(overallPct) >= 33 ? 'Eligible' : 'Detained';
  const attendancePct = sData.attendanceRate;

  const performanceSummary = [
    { label: 'Academic Performance', value: parseFloat(overallPct) },
    { label: 'Attendance', value: attendancePct },
    { label: 'Assignments', value: Math.min(100, 78 + (idNum * 3) % 18) },
    { label: 'Behaviour', value: Math.min(100, 82 + (idNum * 5) % 16) }
  ];

  const perfTrend = [
    { term: 'Term 1', yourScore: 78, classAvg: 65 },
    { term: 'Term 2', yourScore: 82, classAvg: 68 },
    { term: 'Term 3', yourScore: 85, classAvg: 71 },
    { term: 'Final Term', yourScore: 87, classAvg: 74 }
  ];

  // Attendance data
  const workingDays = 210;
  const presentDays = sData.presentDays || 198;
  const absentDays = sData.absentDays || 12;
  const lateComing = sData.halfDays || 4;

  const attendanceTrend = [
    { month: 'Jan', pct: 95 },
    { month: 'Feb', pct: 92 },
    { month: 'Mar', pct: 93 },
    { month: 'Apr', pct: 96 },
    { month: 'May', pct: 90 },
    { month: 'Jun', pct: 94 }
  ];

  const attendanceDistribution = [
    { label: '90% & above', value: 65, color: '#10b981' },
    { label: '75% - 89%', value: 25, color: '#3b82f6' },
    { label: '50% - 74%', value: 8, color: '#f59e0b' },
    { label: 'Below 50%', value: 2, color: '#ef4444' }
  ];

  // Behavioural
  const behaviouralItems = [
    { label: 'Class Participation', stars: 4 },
    { label: 'Discipline', stars: 5 },
    { label: 'Leadership', stars: 4 },
    { label: 'Teamwork', stars: 5 },
    { label: 'Communication', stars: 4 }
  ];
  const overallBehaviour = sData.behaviorLabel || 'Good';

  // Subject performance vs class avg
  const doubleBarData = [
    { subject: 'Eng', Student: 88, ClassAvg: 74 },
    { subject: 'Maths', Student: 92, ClassAvg: 78 },
    { subject: 'Sci', Student: 86, ClassAvg: 72 },
    { subject: 'SST', Student: 84, ClassAvg: 70 },
    { subject: 'Hindi', Student: 80, ClassAvg: 68 },
    { subject: 'Comp', Student: 90, ClassAvg: 76 }
  ];

  // Grade distribution
  const gradeDistData = [
    { grade: 'A+', value: 15, color: '#8b5cf6' },
    { grade: 'A', value: 40, color: '#3b82f6' },
    { grade: 'B+', value: 25, color: '#10b981' },
    { grade: 'B', value: 15, color: '#f59e0b' },
    { grade: 'C & Below', value: 5, color: '#ef4444' }
  ];

  // Achievements list
  const achievementsList = [
    'Science Olympiad Finalist',
    'House Captain',
    'Inter-School Debate Winner',
    'Basketball Team Member'
  ];

  // AI Insights
  const learningInsights = [
    'Performs exceptionally in analytical and technical subjects.',
    'Shows strong classroom participation and leadership qualities.',
    'Can improve written presentation and time management.',
    'Responds well to project-based and hands-on learning.',
    'Recommended focus: Enhance consistency in assignments.'
  ];

  const strengths = ['Analytical Skills', 'Leadership', 'Curious Learner'];
  const areasToImprove = ['Written Presentation', 'Time Management', 'Consistency'];

  // Learning Skills Radar
  const learningSkills = [
    { label: 'Analytical Thinking', value: 78 },
    { label: 'Conceptual Understanding', value: 82 },
    { label: 'Application', value: 68 },
    { label: 'Problem Solving', value: 70 },
    { label: 'Creativity', value: 65 }
  ];

  const today = new Date();
  const dateStr = '14 Jun 2026'; // Hardcoded to match mockup exactly

  const handlePrint = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const el = document.querySelector('.transcript-page');
      if (!el) return;
      const canvas = await html2canvas(el as HTMLElement, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`${sData.fullName}_Profile_Summary.pdf`);
    } catch (err) {
      window.print();
    }
  };

  return (
    <div style={{ padding: '20px', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', overflowY: 'auto' }}>
      {/* Top action controls hidden during print */}
      <div className="no-print" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)',
        width: '100%',
        maxWidth: '900px',
        marginBottom: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        boxSizing: 'border-box'
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Profile Summary — {sData.fullName}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>A4 Student Insight Report</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => window.print()}
            style={{
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 600,
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-primary)'
            }}
          >
            <Printer size={13} /> Print Report
          </button>
          <button 
            onClick={handlePrint}
            style={{
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 600,
              background: 'var(--accent-blue)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={13} /> Download PDF
          </button>
        </div>
      </div>

      {/* Main A4 Document Sheet */}
      <div 
        className="transcript-page"
        style={{
          width: '900px',
          height: '1270px',
          background: '#ffffff',
          color: '#1e293b',
          fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Caveat:wght@600&display=swap');
          
          .transcript-page * {
            box-sizing: border-box;
          }
          .t-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 8px 10px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.01);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
          .t-card-title {
            font-size: 10px;
            font-weight: 800;
            color: #1e3a8a;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
            border-bottom: 1.5px solid #f1f5f9;
            padding-bottom: 2px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; margin: 0 !important; }
            .transcript-page {
              box-shadow: none !important;
              border: none !important;
              margin: 0 !important;
              width: 100% !important;
              height: 100% !important;
              page-break-inside: avoid;
            }
          }
        `}</style>

        {/* LEFT COLUMN: Main Report Body */}
        <div style={{ width: '860px', height: '100%', padding: '15px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '75px', borderBottom: '2.5px double #cbd5e1', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Premium Shield Crest Logo */}
              <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5L15 20V50C15 72.5 50 95 50 95C50 95 85 72.5 85 50V20L50 5Z" fill="#1e3a8a" stroke="#10b981" strokeWidth="4"/>
                <path d="M50 15L25 26V48C25 65 50 82 50 82C50 82 75 65 75 48V26L50 15Z" fill="#1e3a8a"/>
                {/* Open book graphic */}
                <path d="M32 56C38 52 47 52 50 56C53 52 62 52 68 56V36C62 32 53 32 50 36C47 32 38 32 32 36V56Z" fill="#ffffff" stroke="#10b981" strokeWidth="2.5"/>
                <line x1="50" y1="36" x2="50" y2="56" stroke="#10b981" strokeWidth="2.5"/>
                {/* Star above book */}
                <path d="M50 20L52.5 25.5L58.5 26L54 29.8L55.5 35.5L50 32.5L44.5 35.5L46 29.8L41.5 26L47.5 25.5L50 20Z" fill="#f59e0b"/>
              </svg>
              <div>
                <h1 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#1e3a8a', letterSpacing: '0.2px' }}>Your School Name</h1>
                <span style={{ fontSize: '9px', fontStyle: 'italic', color: '#64748b', fontWeight: 500 }}>Excellence in Education</span>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#1e3a8a', letterSpacing: '1px', textTransform: 'uppercase' }}>Acadex</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.5px', marginTop: '1px' }}>STUDENT PROFILE SUMMARY</div>
              <div style={{ display: 'inline-block', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1px 8px', fontSize: '8px', fontWeight: 700, color: '#1e3a8a', marginTop: '2px' }}>
                Academic Session: 2026-27
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '8.5px', textAlign: 'right', color: '#475569', lineHeight: 1.4 }}>
                <div><strong>Acadex ID:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1e3a8a' }}>ACX-STU-H4D9K7P2</span></div>
                <div><strong>APAAR ID:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>XXXX XXXX XXXX</span></div>
              </div>
              {/* Custom detailed SVG QR code */}
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="white" rx="4"/>
                <rect x="10" y="10" width="25" height="25" stroke="black" strokeWidth="6" fill="none"/>
                <rect x="17.5" y="17.5" width="10" height="10" fill="black"/>
                <rect x="65" y="10" width="25" height="25" stroke="black" strokeWidth="6" fill="none"/>
                <rect x="72.5" y="17.5" width="10" height="10" fill="black"/>
                <rect x="10" y="65" width="25" height="25" stroke="black" strokeWidth="6" fill="none"/>
                <rect x="17.5" y="17.5" width="10" height="10" fill="black"/>
                <rect x="17.5" y="72.5" width="10" height="10" fill="black"/>
                <rect x="45" y="15" width="8" height="8" fill="black"/>
                <rect x="53" y="25" width="6" height="12" fill="black"/>
                <rect x="45" y="45" width="12" height="12" fill="black"/>
                <rect x="70" y="45" width="15" height="8" fill="black"/>
                <rect x="80" y="58" width="8" height="18" fill="black"/>
                <rect x="58" y="75" width="14" height="6" fill="black"/>
                <rect x="45" y="80" width="8" height="8" fill="black"/>
              </svg>
            </div>
          </div>

          {/* Row 1: Student Information + Academic Snapshot */}
          <div style={{ display: 'grid', gridTemplateColumns: '235px 591px', gap: '9px', height: '200px' }}>
            {/* Student Info Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Student Details</div>
              <div style={{ display: 'flex', gap: '10px', flex: 1, alignItems: 'center' }}>
                <div style={{ width: '65px', height: '78px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #cbd5e1', background: '#f8fafc', flexShrink: 0 }}>
                  {!imageFailed ? (
                    <img 
                      src={sData.avatar} 
                      alt={sData.fullName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={() => setImageFailed(true)}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e3a8a, #10b981)', color: '#ffffff', fontWeight: 800, fontSize: '18px' }}>
                      AS
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{sData.fullName}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '9px', color: '#475569' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Class</span><strong style={{ color: '#0f172a' }}>X-A</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Roll No.</span><strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>23</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Gender</span><strong style={{ color: '#0f172a' }}>Male</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>DOB</span><strong style={{ color: '#0f172a' }}>14 Mar 2011</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Blood Group</span><strong style={{ color: '#0f172a' }}>O+</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Mother Tongue</span><strong style={{ color: '#0f172a' }}>Hindi</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e2e8f0', paddingTop: '2px', marginTop: '2px' }}><span>Admission No.</span><strong style={{ color: '#1e3a8a', fontFamily: 'monospace' }}>2021/0456</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Snapshot Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Academic Snapshot</div>
              
              {/* Snapshot Top: Metrics row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', background: '#f8fafc', padding: '6px', borderRadius: '6px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <div style={{ borderRight: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Overall Pct</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginTop: '1px' }}>87.4%</div>
                  <div style={{ fontSize: '7px', color: '#10b981', fontWeight: 700 }}>↑ 5.6% vs Last Term</div>
                </div>
                <div style={{ borderRight: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Class Rank</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginTop: '1px' }}>12 / 120</div>
                  <div style={{ fontSize: '7px', color: '#10b981', fontWeight: 700 }}>Top 10%</div>
                </div>
                <div style={{ borderRight: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Grade</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#1e3a8a', marginTop: '1px' }}>A</div>
                  <div style={{ fontSize: '7px', color: '#10b981', fontWeight: 700 }}>Excellent</div>
                </div>
                <div style={{ borderRight: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Attendance</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginTop: '1px' }}>94%</div>
                  <div style={{ fontSize: '7px', color: '#10b981', fontWeight: 700 }}>Excellent</div>
                </div>
                <div>
                  <div style={{ fontSize: '7.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Promotion</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#166534', marginTop: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                    Eligible <span style={{ color: '#10b981', fontSize: '9px' }}>✓</span>
                  </div>
                  <div style={{ fontSize: '7px', color: '#64748b', fontWeight: 700 }}>Next Grade</div>
                </div>
              </div>

              {/* Snapshot Bottom: side-by-side elements */}
              <div style={{ display: 'flex', gap: '12px', flex: 1, marginTop: '8px', alignItems: 'center' }}>
                {/* Left side: Horizontal progress list */}
                <div style={{ width: '48%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Performance Summary</span>
                  {performanceSummary.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '8.5px' }}>
                      <span style={{ width: '90px', color: '#475569', fontWeight: 500 }}>{item.label}</span>
                      <div style={{ flex: 1, height: '5px', background: '#e2e8f0', borderRadius: '2.5px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.value}%`, height: '100%', background: '#1e3a8a', borderRadius: '2.5px' }} />
                      </div>
                      <span style={{ width: '22px', fontWeight: 700, textAlign: 'right', color: '#0f172a' }}>{item.value}%</span>
                    </div>
                  ))}
                </div>
                {/* Divider */}
                <div style={{ width: '1px', height: '90%', background: '#e2e8f0' }} />
                {/* Right side: Term Trend Line Chart */}
                <div style={{ width: '48%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Performance Trend</span>
                    <span style={{ fontSize: '7px', color: '#64748b', display: 'flex', gap: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><span style={{ width: '5px', height: '5px', background: '#3b82f6', borderRadius: '50%' }} />Score</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><span style={{ width: '5px', height: '5px', background: '#94a3b8', borderRadius: '50%' }} />Avg</span>
                    </span>
                  </div>
                  <div style={{ flex: 1, height: '60px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={perfTrend} margin={{ top: 2, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="term" tick={{ fontSize: 6, fontWeight: 700 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 6 }} domain={[50, 100]} stroke="#94a3b8" />
                        <Line type="monotone" dataKey="yourScore" stroke="#3b82f6" strokeWidth={1.5} dot={{ r: 2 }} />
                        <Line type="monotone" dataKey="classAvg" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth={1} dot={{ r: 1 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Subject Wise Performance + Subject Wise Marks Distribution */}
          <div style={{ display: 'grid', gridTemplateColumns: '490px 336px', gap: '9px', height: '220px' }}>
            {/* Subject Performance Table Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Subject Wise Performance</div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', color: '#1e293b' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '4px', textAlign: 'left', fontWeight: 800 }}>Subject</th>
                      <th style={{ padding: '4px', textAlign: 'center', fontWeight: 800 }}>Marks Obtained <span style={{ fontSize: '7px', fontWeight: 500, color: '#64748b' }}>(Out of 100)</span></th>
                      <th style={{ padding: '4px', textAlign: 'left', fontWeight: 800, width: '140px' }}>Percentage</th>
                      <th style={{ padding: '4px', textAlign: 'center', fontWeight: 800 }}>Grade</th>
                      <th style={{ padding: '4px', textAlign: 'left', fontWeight: 800 }}>Teacher Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'English', marks: 88, grade: 'A', remark: 'Excellent' },
                      { name: 'Mathematics', marks: 92, grade: 'A+', remark: 'Strong' },
                      { name: 'Science', marks: 86, grade: 'A', remark: 'Good' },
                      { name: 'Social Science', marks: 84, grade: 'A', remark: 'Good' },
                      { name: 'Hindi', marks: 80, grade: 'B+', remark: 'Average' },
                      { name: 'Computer', marks: 90, grade: 'A+', remark: 'Excellent' }
                    ].map((s, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '4px', fontWeight: 600, color: '#0f172a' }}>{s.name}</td>
                        <td style={{ padding: '4px', textAlign: 'center', fontWeight: 700 }}>{s.marks}</td>
                        <td style={{ padding: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: 700, width: '22px', textAlign: 'right' }}>{s.marks}%</span>
                            <div style={{ flex: 1, height: '5px', background: '#e2e8f0', borderRadius: '2.5px', overflow: 'hidden' }}>
                              <div style={{ width: `${s.marks}%`, height: '100%', background: '#1e3a8a', borderRadius: '2.5px' }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '4px', textAlign: 'center', fontWeight: 700, color: s.grade.includes('+') ? '#10b981' : '#0f172a' }}>{s.grade}</td>
                        <td style={{ padding: '4px', color: '#475569', fontWeight: 500 }}>{s.remark}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#f0fdf4', borderTop: '1.5px solid #86efac', borderBottom: '1px solid #86efac', fontWeight: 700 }}>
                      <td style={{ padding: '5px 4px', color: '#166534' }}>Overall</td>
                      <td style={{ padding: '5px 4px', textAlign: 'center', color: '#166534' }}>520 / 600</td>
                      <td style={{ padding: '5px 4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 700, width: '22px', color: '#166534' }}>87.4%</span>
                          <div style={{ flex: 1, height: '5px', background: '#bbf7d0', borderRadius: '2.5px', overflow: 'hidden' }}>
                            <div style={{ width: `87.4%`, height: '100%', background: '#15803d', borderRadius: '2.5px' }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '5px 4px', textAlign: 'center', color: '#166534' }}>A</td>
                      <td style={{ padding: '5px 4px', color: '#166534' }}>Excellent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subject Marks Donut Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Subject Wise Marks Distribution</div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', height: '110px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Mathematics', value: 92, color: '#10b981' },
                          { name: 'Computer', value: 90, color: '#2563eb' },
                          { name: 'English', value: 88, color: '#0ea5e9' },
                          { name: 'Science', value: 86, color: '#f97316' },
                          { name: 'SST', value: 84, color: '#eab308' },
                          { name: 'Hindi', value: 80, color: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={32}
                        outerRadius={46}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {[
                          { color: '#10b981' },
                          { color: '#2563eb' },
                          { color: '#0ea5e9' },
                          { color: '#f97316' },
                          { color: '#eab308' },
                          { color: '#ef4444' }
                        ].map((cell, index) => (
                          <Cell key={`cell-${index}`} fill={cell.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Absolute Center Text */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    pointerEvents: 'none'
                  }}>
                    <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1 }}>Average</div>
                    <div style={{ fontSize: '13px', color: '#1e3a8a', fontWeight: 800, marginTop: '2px', lineHeight: 1.1 }}>86.7%</div>
                  </div>
                </div>
                
                {/* Horizontal Legend Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '8px', fontWeight: 600, marginTop: '4px' }}>
                  {[
                    { name: 'Mathematics', value: '92%', color: '#10b981' },
                    { name: 'Computer', value: '90%', color: '#2563eb' },
                    { name: 'English', value: '88%', color: '#0ea5e9' },
                    { name: 'Science', value: '86%', color: '#f97316' },
                    { name: 'SST', value: '84%', color: '#eab308' },
                    { name: 'Hindi', value: '80%', color: '#ef4444' }
                  ].map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '1.5px', background: s.color, flexShrink: 0 }} />
                      <span style={{ color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                      <span style={{ color: '#0f172a', marginLeft: 'auto', fontWeight: 700 }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Attendance Overview + Attendance Trend + Attendance Distribution */}
          <div style={{ display: 'grid', gridTemplateColumns: '250px 337px 239px', gap: '9px', height: '140px' }}>
            
            {/* Attendance Overview Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Attendance Overview</div>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '8px' }}>
                <div style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Present', value: 198, color: '#10b981' },
                          { name: 'Absent', value: 12, color: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={22}
                        outerRadius={30}
                        dataKey="value"
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#ef4444" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>94%</div>
                    <div style={{ fontSize: '5.5px', color: '#64748b', fontWeight: 600, lineHeight: 1 }}>Rate</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '8.5px', color: '#475569' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Working Days</span><strong style={{ color: '#0f172a' }}>210</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#166534' }}><span>Present Days</span><strong>198</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#991b1b' }}><span>Absent Days</span><strong>12</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b45309' }}><span>Late Coming</span><strong>4</strong></div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '7.5px', fontWeight: 700, justifyContent: 'center', marginTop: '4px', borderTop: '1px solid #f1f5f9', paddingTop: '3px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#166534' }}><span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />Present (198)</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#991b1b' }}><span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ef4444' }} />Absent (12)</span>
              </div>
            </div>

            {/* Attendance Trend Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Attendance Trend <span style={{ fontSize: '7px', color: '#64748b', textTransform: 'none', fontWeight: 500 }}>(Last 6 Months)</span></div>
              <div style={{ flex: 1, height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 7, fontWeight: 700 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 6 }} domain={[50, 100]} stroke="#94a3b8" />
                    <Bar dataKey="pct" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Distribution Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Attendance Distribution <span style={{ fontSize: '7px', color: '#64748b', textTransform: 'none', fontWeight: 500 }}>(Class)</span></div>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '6px' }}>
                <div style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={26}
                        dataKey="value"
                      >
                        {attendanceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', fontSize: '8px', fontWeight: 600 }}>
                  {attendanceDistribution.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '1.5px', background: item.color, flexShrink: 0 }} />
                      <span style={{ color: '#475569', whiteSpace: 'nowrap' }}>{item.label}</span>
                      <span style={{ color: '#0f172a', marginLeft: 'auto' }}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Behavioural Observations + Learning Skills + Performance vs Class Average + Grade Distribution */}
          <div style={{ display: 'grid', gridTemplateColumns: '190px 200px 240px 188px', gap: '9px', height: '150px' }}>
            
            {/* Behavioural Observations Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Behavioural Observations</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5px', fontSize: '8.5px', justifyContent: 'center' }}>
                {behaviouralItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#475569', fontWeight: 500 }}>{item.label}</span>
                    <div style={{ display: 'flex', gap: '1px' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} style={{ fontSize: '9px', color: star <= item.stars ? '#fbbf24' : '#e2e8f0' }}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '4px', marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>Overall Behaviour</span>
                  <span style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '4px', padding: '1px 6px', fontSize: '8px', fontWeight: 800 }}>{overallBehaviour}</span>
                </div>
              </div>
            </div>

            {/* Learning Skills Radar Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Learning Skills</div>
              <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={learningSkills}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="label" tick={{ fontSize: 5, fill: '#475569', fontWeight: 700 }} />
                    <Radar name="Aarav" dataKey="value" stroke="#1e3a8a" fill="#3b82f6" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance vs Class Average Bar Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Performance vs Class Average</div>
              <div style={{ flex: 1, height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={doubleBarData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="subject" tick={{ fontSize: 7, fontWeight: 700 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 6 }} domain={[0, 100]} stroke="#94a3b8" />
                    <Bar dataKey="Student" fill="#1e3a8a" radius={[1.5, 1.5, 0, 0]} />
                    <Bar dataKey="ClassAvg" fill="#cbd5e1" radius={[1.5, 1.5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', gap: '6px', fontSize: '6.5px', fontWeight: 700, justifyContent: 'center', marginTop: '2px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#1e3a8a' }}><span style={{ width: '4px', height: '4px', background: '#1e3a8a' }} />Aarav Sharma</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#475569' }}><span style={{ width: '4px', height: '4px', background: '#cbd5e1' }} />Class Average</span>
              </div>
            </div>

            {/* Grade Distribution Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Grade Distribution <span style={{ fontSize: '7px', color: '#64748b', textTransform: 'none', fontWeight: 500 }}>(Class)</span></div>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '6px' }}>
                <div style={{ width: '55px', height: '55px', flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gradeDistData}
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={23}
                        dataKey="value"
                      >
                        {gradeDistData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', fontSize: '7.5px', fontWeight: 600 }}>
                  {gradeDistData.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '1.5px', background: item.color, flexShrink: 0 }} />
                      <span style={{ color: '#475569' }}>{item.grade}</span>
                      <span style={{ color: '#0f172a', marginLeft: 'auto' }}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 5: Achievements + Learning Insights (AI Generated) + Badges (Strengths / Improve) */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 398px 230px', gap: '9px', height: '150px' }}>
            
            {/* Achievements Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Achievements</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
                {achievementsList.map((ach, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9px', fontWeight: 600, color: '#0f172a' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', flexShrink: 0 }}>✓</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Insights Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Learning Insights <span style={{ fontSize: '7px', color: '#3b82f6', textTransform: 'none', fontWeight: 600 }}>[AI Generated]</span></div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4.5px', justifyContent: 'center' }}>
                {learningInsights.map((ins, idx) => {
                  const icons = ['⚡', '👤', '📈', '🔬', '🎯'];
                  return (
                    <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', fontSize: '8.5px', lineHeight: 1.3 }}>
                      <span style={{ fontSize: '9px', flexShrink: 0 }}>{icons[idx % icons.length]}</span>
                      <span style={{ color: '#334155', fontWeight: 500 }}>{ins}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badges Card (Strengths & Areas to Improve) */}
            <div className="t-card" style={{ height: '100%', padding: '10px', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Strengths</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {strengths.map((str, idx) => (
                    <span key={idx} style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1px 6px', fontSize: '8px', fontWeight: 700 }}>{str}</span>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '6px', marginTop: '6px' }}>
                <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Areas to Improve</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {areasToImprove.map((area, idx) => (
                    <span key={idx} style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '12px', padding: '1px 6px', fontSize: '8px', fontWeight: 700 }}>{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 6: Class Teacher Remarks + PTM Discussion Notes + Action Plan + Signatures */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px 200px 200px 188px', gap: '9px', height: '200px' }}>
            
            {/* Class Teacher Remarks Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Class Teacher Remarks</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, fontSize: '9px', lineHeight: 1.4, color: '#334155', fontStyle: 'italic', fontWeight: 500 }}>
                  &ldquo;Aarav is a bright and responsible student with a positive attitude. He participates actively in class and shows great potential. He should focus on improving his written presentation.&rdquo;
                </p>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '4px', fontSize: '8.5px', color: '#1e3a8a', fontWeight: 700 }}>
                  Ms. Neha Verma
                  <span style={{ display: 'block', fontSize: '7px', color: '#64748b', fontWeight: 600 }}>Class Teacher</span>
                </div>
              </div>
            </div>

            {/* PTM Discussion Notes Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">PTM Discussion Notes</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px', flex: 1 }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ borderBottom: '1px solid #cbd5e1', height: '16px' }} />
                ))}
              </div>
            </div>

            {/* Action Plan Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px' }}>
              <div className="t-card-title">Action Plan</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
                {[
                  { label: 'Improve written presentation', checked: true },
                  { label: 'Increase practice in Mathematics', checked: true },
                  { label: 'Enhance time management', checked: true },
                  { label: 'Participate in more activities', checked: true },
                  { label: 'Other: _______________________', checked: false }
                ].map((plan, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '8.5px', fontWeight: 600, color: '#334155' }}>
                    {plan.checked ? (
                      <span style={{ width: '10px', height: '10px', border: '1px solid #1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#3b82f6', color: '#ffffff', fontSize: '7px', fontWeight: 'bold', borderRadius: '1.5px', flexShrink: 0 }}>✓</span>
                    ) : (
                      <span style={{ width: '10px', height: '10px', border: '1px solid #94a3b8', display: 'inline-block', borderRadius: '1.5px', flexShrink: 0 }} />
                    )}
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{plan.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signatures Card */}
            <div className="t-card" style={{ height: '100%', padding: '10px', justifyContent: 'space-between' }}>
              <div className="t-card-title">Signatures</div>
              
              {/* Class Teacher Signature */}
              <div style={{ textAlign: 'center', marginTop: '4px' }}>
                <span style={{ fontFamily: "'Caveat', cursive, 'Brush Script MT', serif", fontSize: '18px', color: '#1e40af', display: 'block', height: '20px', lineHeight: 1 }}>Jael</span>
                <div style={{ borderBottom: '1px solid #475569', width: '100px', margin: '2px auto 2px auto' }} />
                <span style={{ fontSize: '7.5px', color: '#475569', fontWeight: 700 }}>Class Teacher Signature</span>
              </div>

              {/* Parent Signature */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '20px' }} />
                <div style={{ borderBottom: '1px solid #475569', width: '100px', margin: '0 auto 2px auto' }} />
                <span style={{ fontSize: '7.5px', color: '#475569', fontWeight: 700 }}>Parent Signature</span>
              </div>

              {/* Date */}
              <div style={{ textAlign: 'center', fontSize: '8px', color: '#0f172a', fontWeight: 800, background: '#f8fafc', padding: '2px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                Date: {dateStr}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div style={{
            height: '25px',
            background: '#1e3a8a',
            color: '#ffffff',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 12px',
            fontSize: '8px',
            fontWeight: 700,
            marginTop: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '10px' }}>⚙</span>
              Generated by Acadex School Operating System
            </div>
            <div>Generated On: {dateStr}</div>
            <div>Profile Version: V3.2</div>
          </div>

        </div>

        {/* RIGHT COLUMN: Vertical Dark Blue Accent Ribbon */}
        <div style={{
          width: '40px',
          height: '100%',
          background: '#1e3a8a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          borderLeft: '1.5px solid #10b981'
        }}>
          <div style={{
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            transform: 'rotate(180deg)',
            writingMode: 'vertical-rl',
            fontFamily: "'Outfit', 'Inter', sans-serif"
          }}>
            ACADEX STUDENT INSIGHT REPORT
          </div>
        </div>

      </div>
    </div>
  );
}
