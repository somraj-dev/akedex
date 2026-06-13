'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Bell, Download, Plus, FileText, CheckCircle2, TrendingUp, TrendingDown, Users, Brain, 
  CreditCard, Clipboard, Award, MoreHorizontal, ArrowLeft, ArrowUpRight, Check, X, Printer, 
  RefreshCw, Filter, Send
} from 'lucide-react';

interface Student {
  rollNo: string;
  name: string;
  class: string;
  section: string;
  status: 'Downloaded' | 'Pending';
  generatedOn: string;
  downloadedOn: string;
  acadexId: string;
  dob: string;
}

const mockStudentsList: Student[] = [
  { rollNo: '25-10-001', name: 'Aarav Sharma', class: 'X', section: 'A', status: 'Downloaded', generatedOn: '10 May 2026, 10:30 AM', downloadedOn: '10 May 2026, 11:02 AM', acadexId: 'ACX-STU-H4D9K7P2', dob: '12 May 2010' },
  { rollNo: '25-10-002', name: 'Diya Patel', class: 'X', section: 'A', status: 'Downloaded', generatedOn: '10 May 2026, 11:15 AM', downloadedOn: '10 May 2026, 11:15 AM', acadexId: 'ACX-STU-D4P8K3M9', dob: '08 Sep 2010' },
  { rollNo: '25-10-003', name: 'Vivaan Mehta', class: 'X', section: 'A', status: 'Downloaded', generatedOn: '10 May 2026, 10:30 AM', downloadedOn: '10 May 2026, 11:20 AM', acadexId: 'ACX-STU-V2M5K1N8', dob: '15 Jan 2010' },
  { rollNo: '25-10-004', name: 'Ananya Singh', class: 'X', section: 'A', status: 'Pending', generatedOn: '10 May 2026, 10:30 AM', downloadedOn: '-', acadexId: 'ACX-STU-A9S4J2X5', dob: '22 Mar 2010' },
  { rollNo: '25-10-005', name: 'Kabir Verma', class: 'X', section: 'A', status: 'Downloaded', generatedOn: '10 May 2026, 10:30 AM', downloadedOn: '10 May 2026, 11:45 AM', acadexId: 'ACX-STU-K7V3L8B2', dob: '05 Nov 2010' },
  { rollNo: '25-10-006', name: 'Myra Jain', class: 'X', section: 'A', status: 'Pending', generatedOn: '10 May 2026, 10:30 AM', downloadedOn: '-', acadexId: 'ACX-STU-M8J4P9V3', dob: '11 Jul 2010' },
  { rollNo: '25-10-007', name: 'Arjun Nair', class: 'X', section: 'A', status: 'Downloaded', generatedOn: '10 May 2026, 10:30 AM', downloadedOn: '10 May 2026, 12:05 PM', acadexId: 'ACX-STU-A3N9F1C8', dob: '19 Feb 2010' },
  { rollNo: '25-10-008', name: 'Ishita Roy', class: 'X', section: 'A', status: 'Pending', generatedOn: '10 May 2026, 10:30 AM', downloadedOn: '-', acadexId: 'ACX-STU-I5R3M2W1', dob: '30 Oct 2010' },
  { rollNo: '25-10-009', name: 'Reyansh Gupta', class: 'X', section: 'A', status: 'Downloaded', generatedOn: '10 May 2026, 10:30 AM', downloadedOn: '10 May 2026, 12:22 PM', acadexId: 'ACX-STU-R1G8V6T9', dob: '14 Dec 2010' },
  { rollNo: '25-10-010', name: 'Saanvi Sharma', class: 'X', section: 'A', status: 'Downloaded', generatedOn: '10 May 2026, 10:30 AM', downloadedOn: '10 May 2026, 12:35 PM', acadexId: 'ACX-STU-S4S6M5H1', dob: '25 Aug 2010' }
];

export default function AdmitCardCenter() {
  // Filters State
  const [exam, setExam] = useState('Half Yearly Examination 2025-26');
  const [className, setClassName] = useState('All Classes');
  const [section, setSection] = useState('All Sections');
  const [status, setStatus] = useState('All Status');
  const [activeFilters, setActiveFilters] = useState({
    exam: 'Half Yearly Examination 2025-26',
    className: 'All Classes',
    section: 'All Sections',
    status: 'All Status'
  });

  // Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [topSearchTerm, setTopSearchTerm] = useState('');

  // Selection
  const [selectedRolls, setSelectedRolls] = useState<string[]>([]);
  const [previewStudent, setPreviewStudent] = useState<Student>(mockStudentsList[0]);

  // Bulk / notification states
  const [toastMsg, setToastMsg] = useState('');
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic filter application
  const handleApplyFilters = () => {
    setActiveFilters({ exam, className, section, status });
  };

  const handleResetFilters = () => {
    setExam('Half Yearly Examination 2025-26');
    setClassName('All Classes');
    setSection('All Sections');
    setStatus('All Status');
    setActiveFilters({
      exam: 'Half Yearly Examination 2025-26',
      className: 'All Classes',
      section: 'All Sections',
      status: 'All Status'
    });
  };

  // Filtered Students List
  const filteredStudents = useMemo(() => {
    return mockStudentsList.filter(student => {
      // Top search or list search
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.includes(searchTerm) ||
        student.acadexId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.name.toLowerCase().includes(topSearchTerm.toLowerCase());

      const matchesClass = activeFilters.className === 'All Classes' || student.class === activeFilters.className;
      const matchesSection = activeFilters.section === 'All Sections' || student.section === activeFilters.section;
      const matchesStatus = activeFilters.status === 'All Status' || student.status === activeFilters.status;

      return matchesSearch && matchesClass && matchesSection && matchesStatus;
    });
  }, [searchTerm, topSearchTerm, activeFilters]);

  // Toggle selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRolls(filteredStudents.map(s => s.rollNo));
    } else {
      setSelectedRolls([]);
    }
  };

  const handleSelectOne = (rollNo: string) => {
    setSelectedRolls(prev => 
      prev.includes(rollNo) ? prev.filter(r => r !== rollNo) : [...prev, rollNo]
    );
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const runBulkAction = (actionName: string, message: string) => {
    setLoadingAction(actionName);
    setTimeout(() => {
      setLoadingAction(null);
      triggerToast(message);
    }, 1200);
  };

  return (
    <div style={{
      padding: '24px',
      background: 'var(--bg-primary)',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box'
    }}>
      {/* Toast Banner */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#ffffff',
          borderLeft: '4px solid var(--accent-blue)',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          padding: '16px 20px',
          borderRadius: '8px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <CheckCircle2 style={{ color: 'var(--accent-blue)' }} size={20} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{toastMsg}</span>
        </div>
      )}

      {/* 1. Header Area */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Admit Card Center
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Generate, manage and distribute admit cards for all examinations.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Top Search */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder="Search students, exams..."
              value={topSearchTerm}
              onChange={e => setTopSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '30px', height: '32px', borderRadius: '6px', fontSize: '11px' }}
            />
          </div>

          {/* Notifications */}
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
            cursor: 'pointer'
          }}>
            <Bell size={16} />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              background: 'var(--accent-red)',
              color: '#ffffff',
              fontSize: '8px',
              fontWeight: 700,
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>6</span>
          </button>

          {/* Action buttons */}
          <button 
            onClick={() => runBulkAction('export', 'Report exported successfully in Excel format.')}
            className="btn btn-secondary btn-sm" 
            style={{ height: '32px', gap: '6px', borderRadius: '6px' }}
          >
            <Download size={14} /> Export Report
          </button>

          <button 
            onClick={() => runBulkAction('generate', 'Admit cards generation process started for 4,826 students.')}
            className="btn btn-primary btn-sm" 
            style={{ height: '32px', gap: '6px', borderRadius: '6px', fontWeight: 600 }}
          >
            <Plus size={14} /> Generate Admit Cards
          </button>
        </div>
      </div>

      {/* 2. Top Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px'
      }}>
        {/* Metric 1: Total Students */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(37,99,235,0.08)',
              color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Users size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Total Students</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>4,826</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Registered for exams</span>
          {/* Sparkline line graph */}
          <div style={{ height: '18px', marginTop: '4px' }}>
            <svg width="100%" height="100%" viewBox="0 0 160 20" preserveAspectRatio="none">
              <path d="M0,15 L20,8 L40,12 L60,5 L80,14 L100,8 L120,13 L140,7 L160,10" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Metric 2: Generated */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16,185,129,0.08)',
              color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Generated</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>4,826</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>100% of total students</span>
          {/* Sparkline line graph */}
          <div style={{ height: '18px', marginTop: '4px' }}>
            <svg width="100%" height="100%" viewBox="0 0 160 20" preserveAspectRatio="none">
              <path d="M0,18 L20,15 L40,17 L60,12 L80,18 L100,10 L120,15 L140,12 L160,14" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Metric 3: Downloaded */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6,182,212,0.08)',
              color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Download size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Downloaded</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>3,991</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>82.7% of generated</span>
          {/* Sparkline line graph */}
          <div style={{ height: '18px', marginTop: '4px' }}>
            <svg width="100%" height="100%" viewBox="0 0 160 20" preserveAspectRatio="none">
              <path d="M0,14 L20,10 L40,15 L60,8 L80,12 L100,5 L120,14 L140,8 L160,11" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Metric 4: Pending Download */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)',
              color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Clipboard size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Pending Download</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>835</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>17.3% of generated</span>
          {/* Sparkline line graph */}
          <div style={{ height: '18px', marginTop: '4px' }}>
            <svg width="100%" height="100%" viewBox="0 0 160 20" preserveAspectRatio="none">
              <path d="M0,10 L20,14 L40,8 L60,15 L80,9 L100,18 L120,11 L140,15 L160,13" fill="none" stroke="var(--accent-amber)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Metric 5: Not Generated */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)',
              color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <X size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Not Generated</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>0</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>0% of total students</span>
          {/* Sparkline line graph */}
          <div style={{ height: '18px', marginTop: '4px' }}>
            <svg width="100%" height="100%" viewBox="0 0 160 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="160" y2="10" stroke="var(--accent-red)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Dropdown 1: Select Examination */}
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Select Examination</label>
          <select value={exam} onChange={e => setExam(e.target.value)} className="input-field" style={{ height: '36px', borderRadius: '6px' }}>
            <option value="Half Yearly Examination 2025-26">Half Yearly Examination 2025-26</option>
            <option value="Annual Examination 2025-26">Annual Examination 2025-26</option>
            <option value="Unit Test - I 2025-26">Unit Test - I 2025-26</option>
          </select>
        </div>

        {/* Dropdown 2: Class */}
        <div style={{ flex: 1, minWidth: '130px' }}>
          <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Class</label>
          <select value={className} onChange={e => setClassName(e.target.value)} className="input-field" style={{ height: '36px', borderRadius: '6px' }}>
            <option value="All Classes">All Classes</option>
            <option value="X">Class X</option>
            <option value="IX">Class IX</option>
          </select>
        </div>

        {/* Dropdown 3: Section */}
        <div style={{ flex: 1, minWidth: '130px' }}>
          <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Section</label>
          <select value={section} onChange={e => setSection(e.target.value)} className="input-field" style={{ height: '36px', borderRadius: '6px' }}>
            <option value="All Sections">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>

        {/* Dropdown 4: Status */}
        <div style={{ flex: 1, minWidth: '130px' }}>
          <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="input-field" style={{ height: '36px', borderRadius: '6px' }}>
            <option value="All Status">All Status</option>
            <option value="Downloaded">Downloaded</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
          <button onClick={handleApplyFilters} className="btn btn-primary btn-sm" style={{ height: '36px', padding: '0 16px', borderRadius: '6px', fontWeight: 600 }}>
            Apply Filters
          </button>
          <button onClick={handleResetFilters} className="btn btn-secondary btn-sm" style={{ height: '36px', padding: '0 16px', borderRadius: '6px' }}>
            Reset Filters
          </button>
        </div>
      </div>

      {/* 4. Action Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        {/* Card 1: Bulk Generate */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ background: 'rgba(37,99,235,0.06)', borderRadius: '10px', padding: '10px', color: 'var(--accent-blue)', flexShrink: 0 }}>
            <CreditCard size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Bulk Generate</h4>
            <p style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', margin: '2px 0 8px' }}>Generate admit cards for all students in bulk.</p>
            <button 
              disabled={loadingAction === 'bulk-gen'}
              onClick={() => runBulkAction('bulk-gen', 'Bulk admit cards generated successfully.')}
              className="btn btn-primary btn-xs" 
              style={{ borderRadius: '6px', padding: '4px 10px' }}
            >
              {loadingAction === 'bulk-gen' ? 'Generating...' : 'Generate Now'}
            </button>
          </div>
        </div>

        {/* Card 2: Bulk Download */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ background: 'rgba(37,99,235,0.06)', borderRadius: '10px', padding: '10px', color: 'var(--accent-blue)', flexShrink: 0 }}>
            <Download size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Bulk Download</h4>
            <p style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', margin: '2px 0 8px' }}>Download admit cards in PDF format.</p>
            <button 
              disabled={loadingAction === 'bulk-dl'}
              onClick={() => runBulkAction('bulk-dl', 'Bulk PDF preparation started. Check notification tray.')}
              className="btn btn-primary btn-xs" 
              style={{ borderRadius: '6px', padding: '4px 10px' }}
            >
              {loadingAction === 'bulk-dl' ? 'Preparing PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* Card 3: Send to Students */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ background: 'rgba(16,185,129,0.06)', borderRadius: '10px', padding: '10px', color: 'var(--accent-green)', flexShrink: 0 }}>
            <Send size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Send to Students</h4>
            <p style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', margin: '2px 0 8px' }}>Send admit cards to student portal & email.</p>
            <button 
              disabled={loadingAction === 'send-stu'}
              onClick={() => runBulkAction('send-stu', 'Admit cards dispatched to student portals and verified emails.')}
              className="btn btn-xs" 
              style={{ borderRadius: '6px', padding: '4px 10px', backgroundColor: '#10b981', color: '#ffffff', border: 'none' }}
            >
              {loadingAction === 'send-stu' ? 'Sending...' : 'Send Now'}
            </button>
          </div>
        </div>

        {/* Card 4: Send to Parents */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ background: 'rgba(245,158,11,0.06)', borderRadius: '10px', padding: '10px', color: 'var(--accent-amber)', flexShrink: 0 }}>
            <Bell size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Send to Parents</h4>
            <p style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', margin: '2px 0 8px' }}>Share admit cards with parents on app.</p>
            <button 
              disabled={loadingAction === 'send-prt'}
              onClick={() => runBulkAction('send-prt', 'Push notifications sent to linked parent applications.')}
              className="btn btn-xs" 
              style={{ borderRadius: '6px', padding: '4px 10px', backgroundColor: '#f97316', color: '#ffffff', border: 'none' }}
            >
              {loadingAction === 'send-prt' ? 'Sharing...' : 'Send to Parents'}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Main Grid Area: Table + Preview Card */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.9fr 1.1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Table List */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Table Header Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Students Admit Card Status
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Showing 1 to {filteredStudents.length} of {mockStudentsList.length} students
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', width: '180px' }}>
                <Search size={12} style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '28px', height: '30px', borderRadius: '6px', fontSize: '11px' }}
                />
              </div>
              <button className="btn btn-secondary btn-xs" style={{ height: '30px', padding: '0 8px', borderRadius: '6px' }} title="Filter">
                <Filter size={12} />
              </button>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setTopSearchTerm('');
                  setSelectedRolls([]);
                  triggerToast('Re-indexing student lists completed.');
                }}
                className="btn btn-secondary btn-xs" 
                style={{ height: '30px', padding: '0 8px', borderRadius: '6px' }} 
                title="Refresh Table"
              >
                <RefreshCw size={12} />
              </button>
            </div>
          </div>

          {/* Actual Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '32px' }}>
                    <input 
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={filteredStudents.length > 0 && selectedRolls.length === filteredStudents.length}
                    />
                  </th>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Status</th>
                  <th>Generated On</th>
                  <th>Downloaded On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const isSelected = selectedRolls.includes(student.rollNo);
                  const isCurrentPreview = previewStudent.rollNo === student.rollNo;

                  return (
                    <tr 
                      key={student.rollNo} 
                      className={`${isSelected ? 'selected' : ''}`}
                      style={{ 
                        cursor: 'pointer',
                        background: isCurrentPreview ? 'rgba(37,99,235,0.03)' : 'transparent',
                        borderColor: isCurrentPreview ? 'rgba(37,99,235,0.2)' : 'var(--border-primary)'
                      }}
                      onClick={() => setPreviewStudent(student)}
                    >
                      <td onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(student.rollNo)}
                        />
                      </td>
                      <td style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{student.rollNo}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {/* Mini Avatar */}
                          <img
                            src="/student_avatar.png"
                            alt={student.name}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: isCurrentPreview ? '2px solid var(--accent-blue)' : '1px solid var(--border-primary)',
                              flexShrink: 0
                            }}
                          />
                          <span style={{ fontWeight: 600 }}>{student.name}</span>
                        </div>
                      </td>
                      <td>{student.class}</td>
                      <td>{student.section}</td>
                      <td>
                        <span className={`badge ${student.status === 'Downloaded' ? 'badge-active' : 'badge-warning'}`}>
                          {student.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{student.generatedOn}</td>
                      <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{student.downloadedOn}</td>
                      <td onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button 
                            onClick={() => setPreviewStudent(student)}
                            className="btn btn-ghost btn-xs" 
                            style={{ padding: '4px' }}
                            title="View Preview"
                          >
                            <FileText size={12} />
                          </button>
                          <button 
                            onClick={() => triggerToast(`Downloading Admit Card PDF for ${student.name}...`)}
                            className="btn btn-ghost btn-xs" 
                            style={{ padding: '4px' }}
                            title="Download PDF"
                          >
                            <Download size={12} />
                          </button>
                          <button className="btn btn-ghost btn-xs" style={{ padding: '4px' }}>
                            <MoreHorizontal size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                      No students found matching current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-secondary)',
            paddingTop: '16px',
            fontSize: '11px',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Rows per page:</span>
              <select style={{ padding: '4px 6px', border: '1px solid var(--border-primary)', borderRadius: '6px', outline: 'none' }}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>

            <div>1–{filteredStudents.length} of {mockStudentsList.length}</div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }} disabled>‹</button>
              <button className="btn btn-primary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px', fontWeight: 700 }}>1</button>
              <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }} onClick={() => triggerToast('Page 2 is empty with current filters')}>2</button>
              <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }} onClick={() => triggerToast('Page 3 is empty with current filters')}>3</button>
              <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }} onClick={() => triggerToast('Page 4 is empty')}>4</button>
              <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }} onClick={() => triggerToast('Page 5 is empty')}>5</button>
              <span style={{ alignSelf: 'center', margin: '0 4px' }}>...</span>
              <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }}>483</button>
              <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }}>›</button>
            </div>
          </div>
        </div>

        {/* Right Column: Admit Card Preview + Stats + Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* A. Admit Card Preview panel */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Admit Card Preview
              </h3>
              <span 
                onClick={() => setIsModalOpen(true)}
                style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
              >
                Preview Full Card <ArrowUpRight size={12} />
              </span>
            </div>

            {/* Premium Admit Card Visual Card */}
            <div 
              onClick={() => setIsModalOpen(true)}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '20px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
            >
              {/* Card Title Header */}
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.2px', margin: 0 }}>
                  Greenfield Institute
                </h4>
                <p style={{ fontSize: '10px', color: '#64748b', margin: '2px 0 8px' }}>
                  Half Yearly Examination 2025-26
                </p>
                <span style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '3px 12px',
                  borderRadius: '4px',
                  letterSpacing: '0.05em'
                }}>
                  ADMIT CARD
                </span>
              </div>

              {/* Student Identity and details row */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '12px 0' }}>
                {/* Simulated Student circular Photo */}
                <img
                  src="/student_avatar.png"
                  alt={previewStudent.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '1px solid #cbd5e1',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />

                {/* Identity table */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '9.5px', color: '#475569' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500 }}>Student Name:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{previewStudent.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500 }}>Acadex ID:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{previewStudent.acadexId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500 }}>Roll Number:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{previewStudent.rollNo}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500 }}>Class & Section:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{previewStudent.class}-{previewStudent.section}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500 }}>Date of Birth:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{previewStudent.dob}</span>
                  </div>
                </div>

                {/* Simulated QR Code using SVG */}
                <div style={{ width: '48px', height: '48px', border: '1px solid #cbd5e1', padding: '3px', borderRadius: '4px', background: '#ffffff', flexShrink: 0 }}>
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="#000000">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="#ffffff" />
                    <rect x="10" y="10" width="10" height="10" />
                    
                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="#ffffff" />
                    <rect x="80" y="10" width="10" height="10" />

                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="#ffffff" />
                    <rect x="80" y="70" width="10" height="10" />

                    <rect x="40" y="10" width="15" height="15" />
                    <rect x="45" y="45" width="25" height="10" />
                    <rect x="15" y="40" width="15" height="20" />
                    <rect x="75" y="40" width="15" height="20" />
                    <rect x="40" y="75" width="25" height="15" />
                  </svg>
                </div>
              </div>

              {/* Exam Schedule Table */}
              <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #cbd5e1', color: '#64748b' }}>
                      <th style={{ padding: '4px 0', fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '4px 0', fontWeight: 600 }}>Day</th>
                      <th style={{ padding: '4px 0', fontWeight: 600 }}>Subject</th>
                      <th style={{ padding: '4px 0', fontWeight: 600 }}>Time</th>
                      <th style={{ padding: '4px 0', fontWeight: 600 }}>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                      <td style={{ padding: '4px 0', fontFamily: 'var(--font-mono)' }}>20 May 2026</td>
                      <td style={{ padding: '4px 0' }}>Tue</td>
                      <td style={{ padding: '4px 0', fontWeight: 600 }}>English Language</td>
                      <td style={{ padding: '4px 0' }}>09:00 AM</td>
                      <td style={{ padding: '4px 0' }}>3:00 Hrs</td>
                    </tr>
                    <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                      <td style={{ padding: '4px 0', fontFamily: 'var(--font-mono)' }}>22 May 2026</td>
                      <td style={{ padding: '4px 0' }}>Thu</td>
                      <td style={{ padding: '4px 0', fontWeight: 600 }}>Mathematics</td>
                      <td style={{ padding: '4px 0' }}>09:00 AM</td>
                      <td style={{ padding: '4px 0' }}>3:00 Hrs</td>
                    </tr>
                    <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                      <td style={{ padding: '4px 0', fontFamily: 'var(--font-mono)' }}>25 May 2026</td>
                      <td style={{ padding: '4px 0' }}>Sun</td>
                      <td style={{ padding: '4px 0', fontWeight: 600 }}>Science</td>
                      <td style={{ padding: '4px 0' }}>09:00 AM</td>
                      <td style={{ padding: '4px 0' }}>3:00 Hrs</td>
                    </tr>
                    <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                      <td style={{ padding: '4px 0', fontFamily: 'var(--font-mono)' }}>28 May 2026</td>
                      <td style={{ padding: '4px 0' }}>Wed</td>
                      <td style={{ padding: '4px 0', fontWeight: 600 }}>Social Science</td>
                      <td style={{ padding: '4px 0' }}>09:00 AM</td>
                      <td style={{ padding: '4px 0' }}>3:00 Hrs</td>
                    </tr>
                    <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                      <td style={{ padding: '4px 0', fontFamily: 'var(--font-mono)' }}>31 May 2026</td>
                      <td style={{ padding: '4px 0' }}>Sat</td>
                      <td style={{ padding: '4px 0', fontWeight: 600 }}>Hindi</td>
                      <td style={{ padding: '4px 0' }}>09:00 AM</td>
                      <td style={{ padding: '4px 0' }}>3:00 Hrs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Instructions and Controller signature */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10px' }}>
                <div style={{ fontSize: '7.5px', color: '#64748b', lineHeight: '1.35', flex: 1 }}>
                  <span style={{ fontWeight: 700, display: 'block', marginBottom: '2px', color: '#475569' }}>Instructions:</span>
                  1. Bring this admit card to the examination hall.<br />
                  2. Reach at least 30 minutes before the exam time.<br />
                  3. Carry your school ID card along with this admit card.
                </div>

                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  {/* Signature graphic drawing using SVG paths */}
                  <div style={{ height: '28px', width: '70px', position: 'relative', margin: '0 auto' }}>
                    <svg width="70" height="28" viewBox="0 0 100 40" style={{ opacity: 0.85 }}>
                      <path d="M10,25 C30,10 40,35 60,15 C75,5 85,30 95,20" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                      <path d="M15,20 L80,22" fill="none" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ fontSize: '8px', fontWeight: 700, color: '#475569', borderTop: '1px solid #cbd5e1', paddingTop: '2px', width: '90px' }}>
                    Controller of Examinations
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* B & C Side-by-Side row: Distribution Summary & Quick Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '20px',
            alignItems: 'stretch'
          }}>
            {/* B. Distribution Summary panel */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', marginTop: 0 }}>
                Distribution Summary
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                {/* Donut Chart visual representation */}
                <div style={{ position: 'relative', width: '76px', height: '76px', flexShrink: 0 }}>
                  <svg width="76" height="76" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" strokeWidth="11" />
                    {/* Downloaded 82.7% (Green/Blue) */}
                    <circle 
                      cx="50" cy="50" r="38" fill="transparent" stroke="var(--accent-green)" strokeWidth="11" 
                      strokeDasharray="238.76" strokeDashoffset="41.3" strokeLinecap="round" transform="rotate(-90 50 50)" 
                    />
                    {/* Pending 17.3% (Orange) */}
                    <circle 
                      cx="50" cy="50" r="38" fill="transparent" stroke="var(--accent-amber)" strokeWidth="11" 
                      strokeDasharray="238.76" strokeDashoffset="197.4" strokeLinecap="round" transform="rotate(207.7 50 50)" 
                    />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', lineHeight: 1.1
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>82.7%</span>
                    <span style={{ fontSize: '7px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Sent</span>
                  </div>
                </div>

                {/* Legend details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-green)', flexShrink: 0 }} />
                      Downloaded
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', flexShrink: 0 }}>3,991</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-amber)', flexShrink: 0 }} />
                      Pending
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', flexShrink: 0 }}>835</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-red)', flexShrink: 0 }} />
                      Unsent
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', flexShrink: 0 }}>0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* C. Quick Actions grid */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', marginTop: 0 }}>
                Quick Actions
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px'
              }}>
                {[
                  { label: 'Send Reminders', icon: <Bell size={13} />, action: () => runBulkAction('remind', 'Reminder notifications broadcasted to 835 pending students.') },
                  { label: 'Download Selected', icon: <Download size={13} />, action: () => runBulkAction('dl-sel', `${selectedRolls.length || 1} Admit Cards bundled and download started.`) },
                  { label: 'Send to Email', icon: <Send size={13} />, action: () => runBulkAction('email', 'Email batch dispatch queue initiated.') },
                  { label: 'Send to WhatsApp', icon: <Send size={13} />, action: () => runBulkAction('wa', 'WhatsApp API integration message dispatch scheduled.') },
                  { label: 'Print Selected', icon: <Printer size={13} />, action: () => runBulkAction('print', 'Spooling printer job files...') },
                  { label: 'Download Hall List', icon: <FileText size={13} />, action: () => runBulkAction('hall', 'Examination hall & seating list PDF downloaded.') }
                ].map((act, idx) => (
                  <button
                    key={idx}
                    onClick={act.action}
                    style={{
                      padding: '10px 12px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent-blue)';
                      e.currentTarget.style.background = 'rgba(37,99,235,0.04)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-primary)';
                      e.currentTarget.style.background = 'var(--bg-primary)';
                    }}
                  >
                    <span style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center' }}>
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

      {/* 6. Recent Activity Row */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Recent Activity
          </h3>
          <span 
            onClick={() => triggerToast('No older activities to display in current session log.')}
            style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer' }}
          >
            View All Activity →
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}>
          {[
            { 
              title: 'Admit cards generated for Class X', 
              desc: '4,826 cards generated successfully', 
              time: '10 May 2026, 10:30 AM', 
              color: 'rgba(16,185,129,0.08)', 
              iconColor: 'var(--accent-green)', 
              icon: <CheckCircle2 size={13} /> 
            },
            { 
              title: 'Bulk download by Admin', 
              desc: 'Downloaded 250 admit cards', 
              time: '10 May 2026, 11:05 AM', 
              color: 'rgba(37,99,235,0.08)', 
              iconColor: 'var(--accent-blue)', 
              icon: <Download size={13} /> 
            },
            { 
              title: 'Admit cards sent to students', 
              desc: '3,200 students notified via email', 
              time: '10 May 2026, 11:20 AM', 
              color: 'rgba(245,158,11,0.08)', 
              iconColor: 'var(--accent-amber)', 
              icon: <Send size={13} /> 
            },
            { 
              title: 'Admit cards shared with parents', 
              desc: '2,950 parents notified on app', 
              time: '10 May 2026, 11:45 AM', 
              color: 'rgba(139,92,246,0.08)', 
              iconColor: 'var(--accent-purple)', 
              icon: <Bell size={13} /> 
            }
          ].map((activity, index) => (
            <div 
              key={index}
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '10px',
                padding: '12px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                background: activity.color,
                color: activity.iconColor,
                borderRadius: '6px',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {activity.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {activity.title}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {activity.desc}
                </div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Admit Card Modal Portal / Overlay */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Keyframe animation injected into a style tag */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(20px) scale(0.95); opacity: 0; }
              to { transform: translateY(0) scale(1); opacity: 1; }
            }
          `}</style>

          <div 
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '560px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header Actions */}
            <div style={{
              padding: '12px 20px',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
                Admit Card Document View
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                  onClick={() => triggerToast(`Sending Admit Card of ${previewStudent.name} to system printer...`)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    height: '28px', 
                    padding: '0 10px', 
                    borderRadius: '6px', 
                    fontSize: '11px',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
                >
                  <Printer size={12} /> Print
                </button>
                <button 
                  onClick={() => triggerToast(`Downloading PDF for ${previewStudent.name}...`)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    height: '28px', 
                    padding: '0 10px', 
                    borderRadius: '6px', 
                    fontSize: '11px',
                    background: 'var(--accent-blue)',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <Download size={12} /> Download
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '8px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body: High Resolution Admit Card */}
            <div style={{
              padding: '28px',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 160px)',
              background: '#f1f5f9',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                background: '#ffffff',
                border: '1px solid #94a3b8',
                borderRadius: '12px',
                padding: '24px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                position: 'relative'
              }}>
                {/* Decorative watermarks or badges */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-30deg)',
                  fontSize: '44px',
                  fontWeight: 900,
                  color: 'rgba(15, 23, 42, 0.03)',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.1em'
                }}>
                  ACADEX OFFICIAL
                </div>

                {/* Card Title Header */}
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.2px', margin: 0 }}>
                    Greenfield Institute
                  </h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '3px 0 10px' }}>
                    Half Yearly Examination 2025-26
                  </p>
                  <span style={{
                    background: '#0f172a',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '4px 16px',
                    borderRadius: '4px',
                    letterSpacing: '0.08em'
                  }}>
                    ADMIT CARD
                  </span>
                </div>

                {/* Student Identity and details row */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
                  {/* Student circular Photo */}
                  <img
                    src="/student_avatar.png"
                    alt={previewStudent.name}
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      border: '2px solid #cbd5e1',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />

                  {/* Identity table */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px', color: '#475569' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Student Name:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{previewStudent.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Acadex ID:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{previewStudent.acadexId}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Roll Number:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{previewStudent.rollNo}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Class & Section:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{previewStudent.class}-{previewStudent.section}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Date of Birth:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{previewStudent.dob}</span>
                    </div>
                  </div>

                  {/* QR Code SVG */}
                  <div style={{ width: '56px', height: '56px', border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', background: '#ffffff', flexShrink: 0 }}>
                    <svg width="46" height="46" viewBox="0 0 100 100" fill="#000000">
                      <rect x="0" y="0" width="30" height="30" />
                      <rect x="5" y="5" width="20" height="20" fill="#ffffff" />
                      <rect x="10" y="10" width="10" height="10" />
                      
                      <rect x="70" y="0" width="30" height="30" />
                      <rect x="75" y="5" width="20" height="20" fill="#ffffff" />
                      <rect x="80" y="10" width="10" height="10" />

                      <rect x="0" y="70" width="30" height="30" />
                      <rect x="5" y="75" width="20" height="20" fill="#ffffff" />
                      <rect x="80" y="70" width="10" height="10" />

                      <rect x="40" y="10" width="15" height="15" />
                      <rect x="45" y="45" width="25" height="10" />
                      <rect x="15" y="40" width="15" height="20" />
                      <rect x="75" y="40" width="15" height="20" />
                      <rect x="40" y="75" width="25" height="15" />
                    </svg>
                  </div>
                </div>

                {/* Exam Schedule Table */}
                <div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #cbd5e1', color: '#64748b' }}>
                        <th style={{ padding: '6px 0', fontWeight: 600 }}>Date</th>
                        <th style={{ padding: '6px 0', fontWeight: 600 }}>Day</th>
                        <th style={{ padding: '6px 0', fontWeight: 600 }}>Subject</th>
                        <th style={{ padding: '6px 0', fontWeight: 600 }}>Time</th>
                        <th style={{ padding: '6px 0', fontWeight: 600 }}>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                        <td style={{ padding: '6px 0', fontFamily: 'var(--font-mono)' }}>20 May 2026</td>
                        <td style={{ padding: '6px 0' }}>Tue</td>
                        <td style={{ padding: '6px 0', fontWeight: 600 }}>English Language</td>
                        <td style={{ padding: '6px 0' }}>09:00 AM</td>
                        <td style={{ padding: '6px 0' }}>3:00 Hrs</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                        <td style={{ padding: '6px 0', fontFamily: 'var(--font-mono)' }}>22 May 2026</td>
                        <td style={{ padding: '6px 0' }}>Thu</td>
                        <td style={{ padding: '6px 0', fontWeight: 600 }}>Mathematics</td>
                        <td style={{ padding: '6px 0' }}>09:00 AM</td>
                        <td style={{ padding: '6px 0' }}>3:00 Hrs</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                        <td style={{ padding: '6px 0', fontFamily: 'var(--font-mono)' }}>25 May 2026</td>
                        <td style={{ padding: '6px 0' }}>Sun</td>
                        <td style={{ padding: '6px 0', fontWeight: 600 }}>Science</td>
                        <td style={{ padding: '6px 0' }}>09:00 AM</td>
                        <td style={{ padding: '6px 0' }}>3:00 Hrs</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                        <td style={{ padding: '6px 0', fontFamily: 'var(--font-mono)' }}>28 May 2026</td>
                        <td style={{ padding: '6px 0' }}>Wed</td>
                        <td style={{ padding: '6px 0', fontWeight: 600 }}>Social Science</td>
                        <td style={{ padding: '6px 0' }}>09:00 AM</td>
                        <td style={{ padding: '6px 0' }}>3:00 Hrs</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0', color: '#0f172a' }}>
                        <td style={{ padding: '6px 0', fontFamily: 'var(--font-mono)' }}>31 May 2026</td>
                        <td style={{ padding: '6px 0' }}>Sat</td>
                        <td style={{ padding: '6px 0', fontWeight: 600 }}>Hindi</td>
                        <td style={{ padding: '6px 0' }}>09:00 AM</td>
                        <td style={{ padding: '6px 0' }}>3:00 Hrs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Instructions and Controller signature */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '15px', marginTop: '10px' }}>
                  <div style={{ fontSize: '8.5px', color: '#64748b', lineHeight: '1.4', flex: 1 }}>
                    <span style={{ fontWeight: 700, display: 'block', marginBottom: '2px', color: '#475569' }}>Instructions:</span>
                    1. Bring this admit card to the examination hall.<br />
                    2. Reach at least 30 minutes before the exam time.<br />
                    3. Carry your school ID card along with this admit card.
                  </div>

                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ height: '32px', width: '80px', position: 'relative', margin: '0 auto' }}>
                      <svg width="80" height="32" viewBox="0 0 100 40" style={{ opacity: 0.85 }}>
                        <path d="M10,25 C30,10 40,35 60,15 C75,5 85,30 95,20" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                        <path d="M15,20 L80,22" fill="none" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#475569', borderTop: '1px solid #cbd5e1', paddingTop: '3px', width: '100px' }}>
                      Controller of Examinations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
