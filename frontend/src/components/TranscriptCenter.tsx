'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Bell, Download, Plus, FileText, CheckCircle2, TrendingUp, 
  Users, Brain, CreditCard, Clock, Clipboard, Award, MoreHorizontal, 
  ArrowLeft, ArrowUpRight, Check, X, Printer, RefreshCw, Filter, Send,
  UserCheck, HelpCircle, FileSpreadsheet, Play, Settings
} from 'lucide-react';

interface StudentTranscript {
  rollNo: string;
  name: string;
  class: string;
  section: string;
  admissionNo: string;
  session: string;
  dob: string;
  email: string;
  phone: string;
  status: 'Pending' | 'In Progress' | 'Ready' | 'Delivered';
  requestNo: string;
  requestDate: string;
  currentClass: string;
  statusText: string;
  category: string;
  nationality: string;
  grades: {
    [year: string]: {
      [subject: string]: { score: number; grade: string };
    };
  };
}

const mockStudentsTranscripts: StudentTranscript[] = [
  {
    rollNo: '25-10-001',
    name: 'Aarav Sharma',
    class: 'X',
    section: 'A',
    admissionNo: 'GFI/2020/1456',
    session: '2020-26',
    dob: '12 May 2010',
    email: 'aarav.sharma@gfi.edu.in',
    phone: '+91 98765 43210',
    status: 'Ready',
    requestNo: 'TR-2026-0254',
    requestDate: '10 May 2026, 11:20 AM',
    currentClass: 'X-A',
    statusText: 'Regular',
    category: 'General',
    nationality: 'Indian',
    grades: {
      '2020-21': {
        'English Language': { score: 86, grade: 'A' },
        'Mathematics': { score: 92, grade: 'A+' },
        'Science': { score: 90, grade: 'A+' },
        'Social Science': { score: 88, grade: 'A' },
        'Hindi': { score: 85, grade: 'A' },
        'Computer Application': { score: 94, grade: 'A+' }
      },
      '2021-22': {
        'English Language': { score: 88, grade: 'A' },
        'Mathematics': { score: 89, grade: 'A' },
        'Science': { score: 91, grade: 'A+' },
        'Social Science': { score: 90, grade: 'A+' },
        'Hindi': { score: 87, grade: 'A' },
        'Computer Application': { score: 95, grade: 'A+' }
      },
      '2022-23': {
        'English Language': { score: 92, grade: 'A+' },
        'Mathematics': { score: 91, grade: 'A+' },
        'Science': { score: 93, grade: 'A+' },
        'Social Science': { score: 89, grade: 'A' },
        'Hindi': { score: 88, grade: 'A' },
        'Computer Application': { score: 96, grade: 'A+' }
      },
      '2023-24': {
        'English Language': { score: 94, grade: 'A+' },
        'Mathematics': { score: 93, grade: 'A+' },
        'Science': { score: 92, grade: 'A+' },
        'Social Science': { score: 92, grade: 'A+' },
        'Hindi': { score: 90, grade: 'A+' },
        'Computer Application': { score: 97, grade: 'A+' }
      },
      '2024-25': {
        'English Language': { score: 94, grade: 'A+' },
        'Mathematics': { score: 92, grade: 'A+' },
        'Science': { score: 94, grade: 'A+' },
        'Social Science': { score: 90, grade: 'A+' },
        'Hindi': { score: 92, grade: 'A+' },
        'Computer Application': { score: 95, grade: 'A+' }
      }
    }
  },
  {
    rollNo: '25-10-002',
    name: 'Riya Patel',
    class: 'X',
    section: 'A',
    admissionNo: 'GFI/2020/1502',
    session: '2020-26',
    dob: '18 Nov 2010',
    email: 'riya.patel@gfi.edu.in',
    phone: '+91 98765 00210',
    status: 'Pending',
    requestNo: 'TR-2026-0256',
    requestDate: '10 May 2026, 11:35 AM',
    currentClass: 'X-A',
    statusText: 'Regular',
    category: 'General',
    nationality: 'Indian',
    grades: {
      '2020-21': {
        'English Language': { score: 90, grade: 'A+' },
        'Mathematics': { score: 88, grade: 'A' },
        'Science': { score: 89, grade: 'A' },
        'Social Science': { score: 91, grade: 'A+' },
        'Hindi': { score: 90, grade: 'A+' },
        'Computer Application': { score: 92, grade: 'A+' }
      },
      '2021-22': {
        'English Language': { score: 91, grade: 'A+' },
        'Mathematics': { score: 90, grade: 'A+' },
        'Science': { score: 90, grade: 'A+' },
        'Social Science': { score: 92, grade: 'A+' },
        'Hindi': { score: 91, grade: 'A+' },
        'Computer Application': { score: 93, grade: 'A+' }
      },
      '2022-23': {
        'English Language': { score: 93, grade: 'A+' },
        'Mathematics': { score: 92, grade: 'A+' },
        'Science': { score: 92, grade: 'A+' },
        'Social Science': { score: 94, grade: 'A+' },
        'Hindi': { score: 92, grade: 'A+' },
        'Computer Application': { score: 95, grade: 'A+' }
      },
      '2023-24': {
        'English Language': { score: 95, grade: 'A+' },
        'Mathematics': { score: 94, grade: 'A+' },
        'Science': { score: 93, grade: 'A+' },
        'Social Science': { score: 95, grade: 'A+' },
        'Hindi': { score: 94, grade: 'A+' },
        'Computer Application': { score: 96, grade: 'A+' }
      },
      '2024-25': {
        'English Language': { score: 96, grade: 'A+' },
        'Mathematics': { score: 95, grade: 'A+' },
        'Science': { score: 95, grade: 'A+' },
        'Social Science': { score: 96, grade: 'A+' },
        'Hindi': { score: 95, grade: 'A+' },
        'Computer Application': { score: 98, grade: 'A+' }
      }
    }
  },
  {
    rollNo: '25-10-003',
    name: 'Aditya Verma',
    class: 'X',
    section: 'B',
    admissionNo: 'GFI/2020/1410',
    session: '2020-26',
    dob: '05 Jan 2010',
    email: 'aditya.verma@gfi.edu.in',
    phone: '+91 98765 12345',
    status: 'In Progress',
    requestNo: 'TR-2026-0255',
    requestDate: '10 May 2026, 10:22 AM',
    currentClass: 'X-B',
    statusText: 'Regular',
    category: 'OBC',
    nationality: 'Indian',
    grades: {
      '2020-21': {
        'English Language': { score: 80, grade: 'B' },
        'Mathematics': { score: 85, grade: 'A' },
        'Science': { score: 82, grade: 'B' },
        'Social Science': { score: 81, grade: 'B' },
        'Hindi': { score: 83, grade: 'B' },
        'Computer Application': { score: 88, grade: 'A' }
      },
      '2021-22': {
        'English Language': { score: 82, grade: 'B' },
        'Mathematics': { score: 87, grade: 'A' },
        'Science': { score: 84, grade: 'B' },
        'Social Science': { score: 83, grade: 'B' },
        'Hindi': { score: 85, grade: 'A' },
        'Computer Application': { score: 90, grade: 'A+' }
      },
      '2022-23': {
        'English Language': { score: 85, grade: 'A' },
        'Mathematics': { score: 89, grade: 'A' },
        'Science': { score: 86, grade: 'A' },
        'Social Science': { score: 85, grade: 'A' },
        'Hindi': { score: 86, grade: 'A' },
        'Computer Application': { score: 92, grade: 'A+' }
      },
      '2023-24': {
        'English Language': { score: 87, grade: 'A' },
        'Mathematics': { score: 91, grade: 'A+' },
        'Science': { score: 89, grade: 'A' },
        'Social Science': { score: 88, grade: 'A' },
        'Hindi': { score: 88, grade: 'A' },
        'Computer Application': { score: 93, grade: 'A+' }
      },
      '2024-25': {
        'English Language': { score: 89, grade: 'A' },
        'Mathematics': { score: 92, grade: 'A+' },
        'Science': { score: 91, grade: 'A+' },
        'Social Science': { score: 89, grade: 'A' },
        'Hindi': { score: 89, grade: 'A' },
        'Computer Application': { score: 95, grade: 'A+' }
      }
    }
  },
  {
    rollNo: '25-10-004',
    name: 'Mehak Jain',
    class: 'X',
    section: 'A',
    admissionNo: 'GFI/2020/1399',
    session: '2020-26',
    dob: '22 Jul 2010',
    email: 'mehak.jain@gfi.edu.in',
    phone: '+91 98765 00999',
    status: 'Ready',
    requestNo: 'TR-2026-0254',
    requestDate: '09 May 2026, 05:15 PM',
    currentClass: 'X-A',
    statusText: 'Regular',
    category: 'General',
    nationality: 'Indian',
    grades: {
      '2020-21': {
        'English Language': { score: 88, grade: 'A' },
        'Mathematics': { score: 90, grade: 'A+' },
        'Science': { score: 87, grade: 'A' },
        'Social Science': { score: 89, grade: 'A' },
        'Hindi': { score: 86, grade: 'A' },
        'Computer Application': { score: 91, grade: 'A+' }
      },
      '2021-22': {
        'English Language': { score: 89, grade: 'A' },
        'Mathematics': { score: 91, grade: 'A+' },
        'Science': { score: 89, grade: 'A' },
        'Social Science': { score: 90, grade: 'A+' },
        'Hindi': { score: 88, grade: 'A' },
        'Computer Application': { score: 93, grade: 'A+' }
      },
      '2022-23': {
        'English Language': { score: 91, grade: 'A+' },
        'Mathematics': { score: 92, grade: 'A+' },
        'Science': { score: 91, grade: 'A+' },
        'Social Science': { score: 92, grade: 'A+' },
        'Hindi': { score: 90, grade: 'A+' },
        'Computer Application': { score: 94, grade: 'A+' }
      },
      '2023-24': {
        'English Language': { score: 93, grade: 'A+' },
        'Mathematics': { score: 94, grade: 'A+' },
        'Science': { score: 93, grade: 'A+' },
        'Social Science': { score: 93, grade: 'A+' },
        'Hindi': { score: 91, grade: 'A+' },
        'Computer Application': { score: 96, grade: 'A+' }
      },
      '2024-25': {
        'English Language': { score: 95, grade: 'A+' },
        'Mathematics': { score: 93, grade: 'A+' },
        'Science': { score: 94, grade: 'A+' },
        'Social Science': { score: 94, grade: 'A+' },
        'Hindi': { score: 93, grade: 'A+' },
        'Computer Application': { score: 97, grade: 'A+' }
      }
    }
  },
  {
    rollNo: '25-10-005',
    name: 'Vivaan Malhotra',
    class: 'VIII',
    section: 'C',
    admissionNo: 'GFI/2022/1655',
    session: '2022-28',
    dob: '11 Oct 2012',
    email: 'vivaan.malhotra@gfi.edu.in',
    phone: '+91 98765 88877',
    status: 'Delivered',
    requestNo: 'TR-2026-0253',
    requestDate: '09 May 2026, 04:40 PM',
    currentClass: 'VIII-C',
    statusText: 'Regular',
    category: 'General',
    nationality: 'Indian',
    grades: {
      '2022-23': {
        'English Language': { score: 82, grade: 'B' },
        'Mathematics': { score: 85, grade: 'A' },
        'Science': { score: 80, grade: 'B' },
        'Social Science': { score: 84, grade: 'B' },
        'Hindi': { score: 81, grade: 'B' },
        'Computer Application': { score: 89, grade: 'A' }
      },
      '2023-24': {
        'English Language': { score: 84, grade: 'B' },
        'Mathematics': { score: 88, grade: 'A' },
        'Science': { score: 83, grade: 'B' },
        'Social Science': { score: 86, grade: 'A' },
        'Hindi': { score: 84, grade: 'B' },
        'Computer Application': { score: 91, grade: 'A+' }
      },
      '2024-25': {
        'English Language': { score: 86, grade: 'A' },
        'Mathematics': { score: 90, grade: 'A+' },
        'Science': { score: 85, grade: 'A' },
        'Social Science': { score: 88, grade: 'A' },
        'Hindi': { score: 86, grade: 'A' },
        'Computer Application': { score: 93, grade: 'A+' }
      }
    }
  }
];

export default function TranscriptCenter() {
  // Selection States
  const [selectedStudent, setSelectedStudent] = useState<StudentTranscript>(mockStudentsTranscripts[0]);
  const [activeTimelineYear, setActiveTimelineYear] = useState<string>('2024-25');
  const [isChartView, setIsChartView] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [sessionFilter, setSessionFilter] = useState('All Sessions');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const [activeFilters, setActiveFilters] = useState({
    query: '',
    class: 'All Classes',
    session: 'All Sessions',
    status: 'All Status'
  });

  // Action feedback
  const [toastMsg, setToastMsg] = useState('');
  
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleApplyFilters = () => {
    setActiveFilters({
      query: searchQuery,
      class: classFilter,
      session: sessionFilter,
      status: statusFilter
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setClassFilter('All Classes');
    setSessionFilter('All Sessions');
    setStatusFilter('All Status');
    setActiveFilters({
      query: '',
      class: 'All Classes',
      session: 'All Sessions',
      status: 'All Status'
    });
  };

  // Filtered requests list
  const filteredStudents = useMemo(() => {
    return mockStudentsTranscripts.filter(stu => {
      const matchesSearch = 
        stu.name.toLowerCase().includes(activeFilters.query.toLowerCase()) ||
        stu.rollNo.includes(activeFilters.query) ||
        stu.admissionNo.toLowerCase().includes(activeFilters.query.toLowerCase()) ||
        stu.requestNo.toLowerCase().includes(activeFilters.query.toLowerCase());

      const matchesClass = activeFilters.class === 'All Classes' || stu.class === activeFilters.class;
      const matchesSession = activeFilters.session === 'All Sessions' || stu.session === activeFilters.session;
      const matchesStatus = activeFilters.status === 'All Status' || stu.status === activeFilters.status;

      return matchesSearch && matchesClass && matchesSession && matchesStatus;
    });
  }, [activeFilters]);

  // Available subjects for selected student and year
  const subjectPerformanceList = useMemo(() => {
    const yearGrades = selectedStudent.grades[activeTimelineYear];
    if (!yearGrades) return [];
    return Object.keys(yearGrades).map(subject => {
      return {
        subject,
        score: yearGrades[subject].score,
        grade: yearGrades[subject].grade
      };
    });
  }, [selectedStudent, activeTimelineYear]);

  // Overall statistics helper
  const overallPerformance = useMemo(() => {
    const years = Object.keys(selectedStudent.grades);
    const result: { [year: string]: { average: number; grade: string } } = {};
    years.forEach(year => {
      const yearGrades = selectedStudent.grades[year];
      const scores = Object.values(yearGrades).map(g => g.score);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      let grade = 'B';
      if (avg >= 90) grade = 'A+';
      else if (avg >= 80) grade = 'A';
      else if (avg >= 70) grade = 'B+';
      result[year] = {
        average: parseFloat(avg.toFixed(1)),
        grade
      };
    });
    return result;
  }, [selectedStudent]);

  // Timeline years based on student grades
  const timelineYears = useMemo(() => {
    return Object.keys(selectedStudent.grades).sort();
  }, [selectedStudent]);

  // Helper to sync active year when student changes
  React.useEffect(() => {
    const years = Object.keys(selectedStudent.grades).sort();
    if (!years.includes(activeTimelineYear)) {
      setActiveTimelineYear(years[years.length - 1] || '2024-25');
    }
  }, [selectedStudent]);

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
      {/* Toast Alert popup */}
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
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <CheckCircle2 style={{ color: 'var(--accent-blue)' }} size={20} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{toastMsg}</span>
        </div>
      )}

      {/* 1. Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Transcript Center
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Manage official academic transcripts and student academic history.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search bar inside header */}
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
              placeholder="Search by student name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '30px', height: '32px', borderRadius: '6px', fontSize: '11px' }}
            />
          </div>

          {/* Notifications bell */}
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
            onClick={() => triggerToast('Official transcripts spreadsheet list exported.')}
            style={{
              padding: '0 12px', height: '32px', display: 'flex', alignItems: 'center', gap: '6px',
              background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
              borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)'
            }}
          >
            <Download size={14} /> Export Report
          </button>

          <button 
            onClick={() => triggerToast('Transcript generation window opened.')}
            style={{
              padding: '0 12px', height: '32px', display: 'flex', alignItems: 'center', gap: '6px',
              background: 'var(--accent-blue)', border: 'none',
              borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#ffffff'
            }}
          >
            <Plus size={14} /> Request Transcript
          </button>
        </div>
      </div>

      {/* 2. Top Metrics Grid Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px'
      }}>
        {/* Metric 1: Total Students */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(37,99,235,0.08)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Total Students</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>4,826</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Registered in Acadex</span>
        </div>

        {/* Metric 2: Transcripts Issued */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16,185,129,0.08)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Transcripts Issued</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>2,841</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>58.9% of total students</span>
        </div>

        {/* Metric 3: Verified Transcripts */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6,182,212,0.08)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Verified Transcripts</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>2,316</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>81.5% of issued</span>
        </div>

        {/* Metric 4: Pending Requests */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Pending Requests</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>256</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>5.3% of total students</span>
        </div>

        {/* Metric 5: Rejected / On Hold */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Rejected / On Hold</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>78</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>1.6% of total students</span>
        </div>
      </div>

      {/* 3. Filter Bar (Find Student Transcript) */}
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
        {/* Search Input */}
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Find Student Transcript</label>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by name, roll no, admission no..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field" 
              style={{ height: '36px', borderRadius: '6px', paddingLeft: '32px' }} 
            />
          </div>
        </div>

        {/* Dropdown 2: Class */}
        <div style={{ flex: 1, minWidth: '130px' }}>
          <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Class</label>
          <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="input-field" style={{ height: '36px', borderRadius: '6px' }}>
            <option value="All Classes">All Classes</option>
            <option value="X">Class X</option>
            <option value="VIII">Class VIII</option>
          </select>
        </div>

        {/* Dropdown 3: Academic Session */}
        <div style={{ flex: 1, minWidth: '130px' }}>
          <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>All Sessions</label>
          <select value={sessionFilter} onChange={e => setSessionFilter(e.target.value)} className="input-field" style={{ height: '36px', borderRadius: '6px' }}>
            <option value="All Sessions">All Sessions</option>
            <option value="2020-26">2020-26</option>
            <option value="2022-28">2022-28</option>
          </select>
        </div>

        {/* Dropdown 4: Status */}
        <div style={{ flex: 1, minWidth: '130px' }}>
          <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>All Status</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field" style={{ height: '36px', borderRadius: '6px' }}>
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Filter Trigger Buttons */}
        <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
          <button onClick={handleApplyFilters} style={{
            background: 'var(--accent-blue)', color: '#ffffff', border: 'none', height: '36px', padding: '0 16px',
            borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '12px'
          }}>
            Search
          </button>
          <button onClick={handleResetFilters} style={{
            background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)',
            height: '36px', padding: '0 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
          }}>
            Reset
          </button>
        </div>
      </div>

      {/* 4. Main Grid Section: Dashboard Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.9fr 1.1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Active Student Overview card */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            gap: '24px'
          }}>
            {/* Student Photo */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <img 
                src="/student_avatar.png" 
                alt={selectedStudent.name}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: '1px solid var(--border-primary)'
                }}
              />
            </div>

            {/* Student metadata fields */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {selectedStudent.name}
                  </h2>
                  <span style={{
                    background: 'rgba(16,185,129,0.08)', color: 'var(--accent-green)', fontSize: '10px',
                    fontWeight: 700, padding: '2px 8px', borderRadius: '4px'
                  }}>Active</span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '12px 24px',
                  marginTop: '16px',
                  fontSize: '11px',
                  color: 'var(--text-secondary)'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', textTransform: 'uppercase', fontWeight: 600 }}>Roll No.</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{selectedStudent.rollNo}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', textTransform: 'uppercase', fontWeight: 600 }}>Admission No.</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{selectedStudent.admissionNo}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', textTransform: 'uppercase', fontWeight: 600 }}>Academic Session</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedStudent.session}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', textTransform: 'uppercase', fontWeight: 600 }}>Class</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedStudent.class}-{selectedStudent.section}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', textTransform: 'uppercase', fontWeight: 600 }}>Date of Birth</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedStudent.dob}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', textTransform: 'uppercase', fontWeight: 600 }}>Email</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', whiteSpace: 'nowrap' }}>{selectedStudent.email}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', textTransform: 'uppercase', fontWeight: 600 }}>Phone</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedStudent.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info panel inside Student details card */}
            <div style={{
              width: '180px',
              borderLeft: '1px solid var(--border-primary)',
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '11px'
            }}>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase' }}>Quick Info</span>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-secondary)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Current Class</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedStudent.class}-{selectedStudent.section}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-secondary)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Academic Status</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedStudent.statusText}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-secondary)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Category</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedStudent.category}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Nationality</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedStudent.nationality}</span>
              </div>
            </div>
          </div>

          {/* Academic Timeline Navigation */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', marginTop: 0 }}>
              Academic Timeline
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              padding: '0 12px'
            }}>
              {/* Connecting line behind items */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '40px',
                right: '40px',
                height: '2px',
                background: 'var(--border-primary)',
                zIndex: 1
              }} />

              {/* Timeline nodes */}
              {timelineYears.map((year, index) => {
                const isActive = activeTimelineYear === year;
                const isLast = index === timelineYears.length - 1;
                
                // Retrieve historical class for this year
                let displayClass = 'Class VI';
                if (index === 1) displayClass = 'Class VII';
                if (index === 2) displayClass = 'Class VIII';
                if (index === 3) displayClass = 'Class IX';
                if (isLast) displayClass = `Class ${selectedStudent.class} (Current)`;

                return (
                  <div 
                    key={year}
                    onClick={() => setActiveTimelineYear(year)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      zIndex: 2,
                      width: '120px',
                      padding: '12px',
                      borderRadius: '10px',
                      border: isActive ? '1px solid var(--accent-blue)' : '1px solid transparent',
                      background: isActive ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                      boxShadow: isActive ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: isActive ? 'var(--accent-blue)' : 'var(--accent-green)',
                      border: '3px solid #ffffff',
                      boxShadow: '0 0 0 1px var(--border-primary)',
                      marginBottom: '8px'
                    }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{year}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>{displayClass}</span>
                    <span style={{ fontSize: '9px', color: 'var(--accent-blue)', fontWeight: 600, marginTop: '4px' }}>
                      {isActive ? 'View Details' : 'View'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Academic Record Summary table list */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Academic Record Summary
                </h3>
                <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Subject wise performance across academic years</span>
              </div>
              <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '2px', borderRadius: '6px', border: '1px solid var(--border-primary)' }}>
                <button 
                  onClick={() => setIsChartView(false)}
                  style={{
                    padding: '4px 10px', border: 'none', borderRadius: '4px', fontSize: '10px', fontWeight: 600,
                    background: !isChartView ? 'var(--bg-secondary)' : 'transparent',
                    color: !isChartView ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  Table View
                </button>
                <button 
                  onClick={() => setIsChartView(true)}
                  style={{
                    padding: '4px 10px', border: 'none', borderRadius: '4px', fontSize: '10px', fontWeight: 600,
                    background: isChartView ? 'var(--bg-secondary)' : 'transparent',
                    color: isChartView ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  Chart View
                </button>
              </div>
            </div>

            {!isChartView ? (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ width: '100%', fontSize: '11px' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-primary)' }}>
                      <th>Subject</th>
                      {timelineYears.map(year => <th key={year} style={{ textAlign: 'center' }}>{year}</th>)}
                      <th style={{ textAlign: 'center' }}>Overall</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['English Language', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Computer Application'].map(subject => {
                      // Retrieve score across years
                      let total = 0;
                      let count = 0;

                      return (
                        <tr key={subject}>
                          <td style={{ fontWeight: 600 }}>{subject}</td>
                          {timelineYears.map(year => {
                            const val = selectedStudent.grades[year]?.[subject];
                            if (val) {
                              total += val.score;
                              count++;
                            }
                            return (
                              <td key={year} style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                                {val ? `${val.score} (${val.grade})` : '-'}
                              </td>
                            );
                          })}
                          <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>
                            {count > 0 ? (total / count).toFixed(1) : '-'}
                          </td>
                        </tr>
                      );
                    })}
                    {/* Overall Percentage Row */}
                    <tr style={{ background: 'rgba(37,99,235,0.02)', fontWeight: 700 }}>
                      <td>Overall Percentage</td>
                      {timelineYears.map(year => {
                        const stats = overallPerformance[year];
                        return (
                          <td key={year} style={{ textAlign: 'center', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                            {stats ? `${stats.average}%` : '-'}
                          </td>
                        );
                      })}
                      <td style={{ textAlign: 'center', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>
                        {(Object.values(overallPerformance).reduce((acc, stats) => acc + stats.average, 0) / Object.keys(overallPerformance).length).toFixed(1)}%
                      </td>
                    </tr>
                    {/* Overall Grade Row */}
                    <tr style={{ background: 'rgba(37,99,235,0.02)', fontWeight: 700 }}>
                      <td>Overall Grade</td>
                      {timelineYears.map(year => {
                        const stats = overallPerformance[year];
                        return (
                          <td key={year} style={{ textAlign: 'center', color: 'var(--text-primary)' }}>
                            {stats ? stats.grade : '-'}
                          </td>
                        );
                      })}
                      <td style={{ textAlign: 'center', color: 'var(--accent-blue)' }}>A+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              /* Sparkline Chart View representation */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
                {['English Language', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Computer Application'].map(subject => {
                  const dataPoints = timelineYears.map((year, i) => {
                    return { x: i * 80, y: 100 - (selectedStudent.grades[year]?.[subject]?.score || 0) };
                  });

                  // Generate SVG path string
                  const path = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y * 0.8}`).join(' ');

                  return (
                    <div key={subject} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ width: '130px', fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>{subject}</span>
                      <div style={{ flex: 1, height: '40px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                        <svg width="100%" height="100%" viewBox="0 0 320 32" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
                          <path d={path} fill="none" stroke="var(--accent-blue)" strokeWidth="2" />
                          {dataPoints.map((p, idx) => (
                            <circle key={idx} cx={p.x} cy={p.y * 0.8} r="3" fill="var(--accent-blue)" />
                          ))}
                        </svg>
                      </div>
                      <span style={{ width: '50px', textAlign: 'right', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {selectedStudent.grades[activeTimelineYear]?.[subject]?.score || 0}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Transcript Requests */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Recent Transcript Requests
              </h3>
              <span 
                onClick={() => triggerToast('Request list expanded.')}
                style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer' }}
              >
                View All Requests
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px'
            }}>
              {mockStudentsTranscripts.map((req) => {
                const isSelected = selectedStudent.rollNo === req.rollNo;
                let badgeClass = 'badge-warning';
                if (req.status === 'Ready') badgeClass = 'badge-active';
                if (req.status === 'Delivered') badgeClass = 'badge-active'; // Or custom
                if (req.status === 'In Progress') badgeClass = 'badge-warning'; // Yellow tint

                return (
                  <div
                    key={req.rollNo}
                    onClick={() => setSelectedStudent(req)}
                    style={{
                      background: 'var(--bg-primary)',
                      border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-primary)',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 4px 6px -1px rgba(0,0,0,0.02)' : 'none'
                    }}
                  >
                    <div style={{
                      background: isSelected ? 'rgba(37,99,235,0.08)' : 'var(--bg-tertiary)',
                      color: isSelected ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      borderRadius: '6px',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <FileText size={13} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{req.requestNo}</span>
                        <span className={`badge ${badgeClass}`} style={{ fontSize: '9px', padding: '1px 6px' }}>{req.status}</span>
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {req.name} ({req.class}-{req.section})
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Academic Transcript
                      </div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                        {req.requestDate}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* A. Transcript Preview card */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Transcript Preview
              </h3>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button 
                  onClick={() => triggerToast(`Downloading PDF for ${selectedStudent.name}...`)}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
                >
                  <Download size={15} />
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
                >
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>

            {/* Premium high-fidelity transcript visual block */}
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
                transition: 'all 0.2s ease',
                position: 'relative'
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
              {/* Transcript Emblem Header */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '10px' }}>
                <img 
                  src="/emblem.png" 
                  alt="School Emblem"
                  style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.2px', margin: 0, textTransform: 'uppercase' }}>
                    Greenfield Institute
                  </h4>
                  <p style={{ fontSize: '8px', color: '#64748b', margin: '2px 0 0' }}>
                    Affiliated to CBSE, New Delhi | School Code: 12345
                  </p>
                  <h5 style={{ fontSize: '9px', fontWeight: 800, color: '#1e3a8a', margin: '4px 0 0', letterSpacing: '0.05em' }}>
                    ACADEMIC TRANSCRIPT
                  </h5>
                </div>
                {/* Simulated Barcode */}
                <div style={{ width: '48px', height: '24px', background: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '1px', padding: '2px', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', flex: 1, gap: '2px' }}>
                    <div style={{ background: '#000', width: '2px' }} />
                    <div style={{ background: '#000', width: '1px' }} />
                    <div style={{ background: '#000', width: '3px' }} />
                    <div style={{ background: '#000', width: '1px' }} />
                    <div style={{ background: '#000', width: '2px' }} />
                    <div style={{ background: '#000', width: '4px' }} />
                  </div>
                </div>
              </div>

              {/* Student Identity and details row */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {/* Student Photo */}
                <img
                  src="/student_avatar.png"
                  alt={selectedStudent.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />

                {/* Identity table */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '8.5px', color: '#475569' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Student Name:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{selectedStudent.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Roll Number:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{selectedStudent.rollNo}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Admission No:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{selectedStudent.admissionNo}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Class & Session:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{selectedStudent.class}-{selectedStudent.section} | {selectedStudent.session}</span>
                  </div>
                </div>
              </div>

              {/* High School Grade breakdown */}
              <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #0f172a', color: '#64748b' }}>
                      <th style={{ padding: '3px 0', fontWeight: 600 }}>Subject</th>
                      <th style={{ padding: '3px 0', fontWeight: 600, textAlign: 'center' }}>2021-22</th>
                      <th style={{ padding: '3px 0', fontWeight: 600, textAlign: 'center' }}>2022-23</th>
                      <th style={{ padding: '3px 0', fontWeight: 600, textAlign: 'center' }}>2023-24</th>
                      <th style={{ padding: '3px 0', fontWeight: 600, textAlign: 'center' }}>2024-25</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['English Language', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Computer Application'].map((sub) => (
                      <tr key={sub} style={{ borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>
                        <td style={{ padding: '4px 0', fontWeight: 600 }}>{sub}</td>
                        <td style={{ padding: '4px 0', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{selectedStudent.grades['2021-22']?.[sub]?.score || '-'}</td>
                        <td style={{ padding: '4px 0', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{selectedStudent.grades['2022-23']?.[sub]?.score || '-'}</td>
                        <td style={{ padding: '4px 0', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{selectedStudent.grades['2023-24']?.[sub]?.score || '-'}</td>
                        <td style={{ padding: '4px 0', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{selectedStudent.grades['2024-25']?.[sub]?.score || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Seal & Controller signature details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                <div style={{ fontSize: '7px', color: '#64748b', lineHeight: '1.35', flex: 1 }}>
                  * This is an officially generated digital academic record. Verified digitally via Acadex.
                </div>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ height: '20px', width: '60px', position: 'relative', margin: '0 auto' }}>
                    <svg width="60" height="20" viewBox="0 0 100 40">
                      <path d="M10,25 C30,10 40,35 60,15 C75,5 85,30 95,20" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                      <path d="M15,20 L80,22" fill="none" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ fontSize: '7px', fontWeight: 700, color: '#475569', borderTop: '1px solid #cbd5e1', paddingTop: '2px', width: '80px' }}>
                    Controller of Examinations
                  </div>
                </div>
              </div>
            </div>

            {/* Transcript Actions Grid (Bottom) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginTop: '16px'
            }}>
              <button 
                onClick={() => triggerToast(`Downloading PDF file for ${selectedStudent.name}`)}
                style={{
                  padding: '8px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center'
                }}
              >
                <Download size={13} /> Download PDF
              </button>
              <button 
                onClick={() => triggerToast(`attaching document email to ${selectedStudent.email}...`)}
                style={{
                  padding: '8px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center'
                }}
              >
                <Send size={13} /> Send to Student
              </button>
              <button 
                onClick={() => triggerToast('Sending copy of transcript to print spooler.')}
                style={{
                  padding: '8px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center'
                }}
              >
                <Printer size={13} /> Print
              </button>
              <button 
                onClick={() => triggerToast(`Attesting official verified seal on document for ${selectedStudent.name}.`)}
                style={{
                  padding: '8px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center'
                }}
              >
                <CheckCircle2 size={13} /> Verify Transcript
              </button>
            </div>
          </div>

          {/* B. Transcript Type Distribution donut chart */}
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
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Transcript Type Distribution
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative', width: '76px', height: '76px', flexShrink: 0 }}>
                <svg width="76" height="76" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" strokeWidth="11" />
                  {/* Academic Transcript 75.8% (Green/Blue) */}
                  <circle 
                    cx="50" cy="50" r="38" fill="transparent" stroke="var(--accent-blue)" strokeWidth="11" 
                    strokeDasharray="238.76" strokeDashoffset="57.7" strokeLinecap="round" transform="rotate(-90 50 50)" 
                  />
                  {/* Migration Certificate 12.1% (Amber) */}
                  <circle 
                    cx="50" cy="50" r="38" fill="transparent" stroke="var(--accent-amber)" strokeWidth="11" 
                    strokeDasharray="238.76" strokeDashoffset="209.8" strokeLinecap="round" transform="rotate(182.8 50 50)" 
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', lineHeight: 1.1
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>75.8%</span>
                  <span style={{ fontSize: '7px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Academic</span>
                </div>
              </div>

              {/* Legend details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
                    Academic Transcript
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>2,152 <span style={{ color: 'var(--text-muted)', fontSize: '9px', fontWeight: 500 }}>(75.8%)</span></span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-amber)' }} />
                    Migration Certificate
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>342 <span style={{ color: 'var(--text-muted)', fontSize: '9px', fontWeight: 500 }}>(12.1%)</span></span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)' }} />
                    Provisional Certificate
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>201 <span style={{ color: 'var(--text-muted)', fontSize: '9px', fontWeight: 500 }}>(7.1%)</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Full-Screen Modal Preview */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
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
              maxWidth: '640px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              overflow: 'hidden'
            }}
          >
            {/* Modal Actions Header */}
            <div style={{
              padding: '12px 20px',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
                Official Transcript Document View
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                  onClick={() => triggerToast(`Attesting seal & printing transcript...`)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '4px', height: '28px', padding: '0 10px', 
                    borderRadius: '6px', fontSize: '11px', background: '#f1f5f9', border: '1px solid #cbd5e1', 
                    color: '#334155', cursor: 'pointer', fontWeight: 600
                  }}
                >
                  <Printer size={12} /> Print
                </button>
                <button 
                  onClick={() => triggerToast(`Downloading PDF for ${selectedStudent.name}...`)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '4px', height: '28px', padding: '0 10px', 
                    borderRadius: '6px', fontSize: '11px', background: 'var(--accent-blue)', border: 'none', 
                    color: '#ffffff', cursor: 'pointer', fontWeight: 600
                  }}
                >
                  <Download size={12} /> Download
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', 
                    padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
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
                padding: '32px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-30deg)',
                  fontSize: '54px',
                  fontWeight: 900,
                  color: 'rgba(15, 23, 42, 0.02)',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.1em'
                }}>
                  ACADEX VERIFIED
                </div>

                {/* Header emblem block */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '3px double #0f172a', paddingBottom: '14px' }}>
                  <img 
                    src="/emblem.png" 
                    alt="School Emblem"
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.2px', margin: 0, textTransform: 'uppercase' }}>
                      Greenfield Institute
                    </h3>
                    <p style={{ fontSize: '9px', color: '#64748b', margin: '3px 0 0' }}>
                      Affiliated to CBSE, New Delhi | Affiliation No: 2130001 | School Code: 12345
                    </p>
                    <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#1e3a8a', margin: '6px 0 0', letterSpacing: '0.08em' }}>
                      ACADEMIC TRANSCRIPT (OFFICIAL RECORD)
                    </h4>
                  </div>
                  {/* Barcode representation */}
                  <div style={{ width: '64px', height: '32px', background: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '1px', padding: '3px', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', flex: 1, gap: '2px' }}>
                      <div style={{ background: '#000', width: '2px' }} />
                      <div style={{ background: '#000', width: '1px' }} />
                      <div style={{ background: '#000', width: '4px' }} />
                      <div style={{ background: '#000', width: '1px' }} />
                      <div style={{ background: '#000', width: '2px' }} />
                      <div style={{ background: '#000', width: '3px' }} />
                    </div>
                  </div>
                </div>

                {/* Identity table */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <img
                    src="/student_avatar.png"
                    alt={selectedStudent.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      border: '2px solid #cbd5e1',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: '10px', color: '#475569' }}>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '8px', textTransform: 'uppercase', fontWeight: 600 }}>Student Name</span>
                      <strong style={{ color: '#0f172a' }}>{selectedStudent.name}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '8px', textTransform: 'uppercase', fontWeight: 600 }}>Admission No.</span>
                      <strong style={{ color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{selectedStudent.admissionNo}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '8px', textTransform: 'uppercase', fontWeight: 600 }}>Roll Number</span>
                      <strong style={{ color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{selectedStudent.rollNo}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '8px', textTransform: 'uppercase', fontWeight: 600 }}>Date of Birth</span>
                      <strong style={{ color: '#0f172a' }}>{selectedStudent.dob}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '8px', textTransform: 'uppercase', fontWeight: 600 }}>Academic Session</span>
                      <strong style={{ color: '#0f172a' }}>{selectedStudent.session}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '8px', textTransform: 'uppercase', fontWeight: 600 }}>Class & Section</span>
                      <strong style={{ color: '#0f172a' }}>{selectedStudent.class}-{selectedStudent.section}</strong>
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

                {/* Score list breakdown */}
                <div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #0f172a', color: '#64748b' }}>
                        <th style={{ padding: '6px 0', fontWeight: 600 }}>Subject</th>
                        {timelineYears.map(year => <th key={year} style={{ padding: '6px 0', fontWeight: 600, textAlign: 'center' }}>{year}</th>)}
                        <th style={{ padding: '6px 0', fontWeight: 600, textAlign: 'center' }}>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['English Language', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Computer Application'].map((sub) => {
                        return (
                          <tr key={sub} style={{ borderBottom: '1px solid #cbd5e1', color: '#0f172a' }}>
                            <td style={{ padding: '8px 0', fontWeight: 600 }}>{sub}</td>
                            {timelineYears.map(year => (
                              <td key={year} style={{ padding: '8px 0', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                                {selectedStudent.grades[year]?.[sub]?.score || '-'}
                              </td>
                            ))}
                            <td style={{ padding: '8px 0', textAlign: 'center', fontWeight: 700, color: 'var(--accent-blue)' }}>A+</td>
                          </tr>
                        );
                      })}
                      <tr style={{ background: '#f8fafc', fontWeight: 700 }}>
                        <td style={{ padding: '8px' }}>Overall Percentage</td>
                        {timelineYears.map(year => (
                          <td key={year} style={{ padding: '8px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                            {overallPerformance[year]?.average}%
                          </td>
                        ))}
                        <td style={{ padding: '8px', textAlign: 'center', color: 'var(--accent-blue)' }}>A+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Verification block and signature */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', marginTop: '12px' }}>
                  <div style={{ fontSize: '9px', color: '#64748b', lineHeight: '1.4', flex: 1, background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
                    <strong>Verification Seal:</strong> This document is generated electronically from Axio Education Database. It has been digitally verified and sealed by the Assessment Office controller. Any queries should be routed to verify@gfi.edu.in.
                  </div>
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ height: '28px', width: '80px', position: 'relative', margin: '0 auto' }}>
                      <svg width="80" height="28" viewBox="0 0 100 40">
                        <path d="M10,25 C30,10 40,35 60,15 C75,5 85,30 95,20" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                        <path d="M15,20 L80,22" fill="none" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '8px', fontWeight: 700, color: '#475569', borderTop: '1px solid #cbd5e1', paddingTop: '3px', width: '100px' }}>
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
