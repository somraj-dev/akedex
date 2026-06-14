'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Bell, Download, Plus, FileText, CheckCircle2, TrendingUp, 
  Users, Brain, CreditCard, Clock, Clipboard, Award, MoreHorizontal, 
  ArrowLeft, ArrowUpRight, Check, X, Printer, RefreshCw, Filter, Send,
  UserCheck, HelpCircle, FileSpreadsheet, Settings, Eye
} from 'lucide-react';
import { mockStudents } from '@/lib/mock-data';

// --- CBSE Helpers ---
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

function getEnrichedStudentData(student: any) {
  const idNum = parseInt(student.id) || 1;
  const isAarav = idNum === 1;
  
  const firstName = student.firstName || 'Aarav';
  const lastName = student.lastName || 'Sharma';
  const fullName = `${firstName} ${lastName}`;
  const institution = 'SPRINGFIELD INTERNATIONAL SCHOOL';
  
  let grade = '10';
  let section = 'A';
  if (student.class) {
    const parts = student.class.split('-');
    if (parts.length > 0) grade = parts[0];
    if (parts.length > 1) section = parts[1];
  }
  const rollNoVal = isAarav ? 13101007 : (13101000 + idNum);
  const rollNoStr = rollNoVal.toString();
  
  const dobParts = student.dob ? student.dob.split('-') : ['2010', '03', '15'];
  const dobFormatted = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`;
  const monthNames = ['', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const dayNum = parseInt(dobParts[2]);
  const suffix = (dayNum === 1 || dayNum === 21 || dayNum === 31) ? 'ST' : (dayNum === 2 || dayNum === 22) ? 'ND' : (dayNum === 3 || dayNum === 23) ? 'RD' : 'TH';
  const yearDiff = parseInt(dobParts[0]) - 2000;
  const dobInWords = `${dayNum}${suffix} ${monthNames[parseInt(dobParts[1])] || 'MARCH'} TWO THOUSAND ${yearDiff > 0 ? numberToWords(yearDiff) : ''}`;

  const regnNo = `C121/${20000 + idNum * 13}/00${idNum * 3 + 35}`;
  const certNo = `0${7000000 + idNum * 31415}`;
  const serialNo = `0${10000 + idNum * 89}`;

  const fatherName = isAarav ? 'RAJESH SHARMA' : `${['RAJESH', 'SANJAY', 'VIKRAM', 'RAMESH', 'ANIL'][idNum % 5]} ${lastName.toUpperCase()}`;
  const motherName = isAarav ? 'PRIYA SHARMA' : `${['PRIYA', 'SUNITA', 'ANJALI', 'KIRAN', 'MEENA'][idNum % 5]} ${lastName.toUpperCase()}`;
  
  return {
    id: student.id,
    fullName,
    firstName,
    lastName,
    institution,
    grade,
    section,
    rollNo: rollNoStr,
    dob: student.dob,
    dobFormatted,
    dobInWords,
    regnNo,
    certNo,
    serialNo,
    fatherName,
    motherName,
    avatar: student.avatar || '/student_avatar.png',
    status: student.status || 'ACTIVE'
  };
}

export default function ReportCardCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeClassFilter, setActiveClassFilter] = useState('All');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const selectedStudent = useMemo(() => {
    const raw = mockStudents.find(s => s.id === selectedStudentId) || mockStudents[0];
    return getEnrichedStudentData(raw);
  }, [selectedStudentId]);

  // Dynamic subject marks generation
  const reportSubjects = useMemo(() => {
    const idNum = parseInt(selectedStudent.id) || 1;
    return [
      { code: '184', name: 'ENGLISH LNG & LIT.', theory: Math.min(80, 50 + (idNum * 7) % 30), practical: Math.min(20, 15 + (idNum * 3) % 6) },
      { code: '002', name: 'HINDI COURSE-B', theory: Math.min(80, 48 + (idNum * 5) % 32), practical: Math.min(20, 16 + (idNum * 2) % 5) },
      { code: '241', name: 'MATHEMATICS BASIC', theory: Math.min(80, 45 + (idNum * 11) % 35), practical: Math.min(20, 14 + (idNum * 4) % 7) },
      { code: '086', name: 'SCIENCE', theory: Math.min(80, 42 + (idNum * 9) % 38), practical: Math.min(20, 15 + (idNum * 3) % 6) },
      { code: '087', name: 'SOCIAL SCIENCE', theory: Math.min(80, 55 + (idNum * 6) % 25), practical: Math.min(20, 16 + (idNum * 2) % 5) },
    ];
  }, [selectedStudent.id]);

  const additionalSubject = useMemo(() => {
    const idNum = parseInt(selectedStudent.id) || 1;
    return {
      code: '402',
      name: 'INFORMATION TECHNOLOGY',
      theory: Math.min(50, 30 + (idNum * 8) % 20),
      practical: Math.min(50, 38 + (idNum * 4) % 12)
    };
  }, [selectedStudent.id]);

  const classFilters = ['All', '10-A', '10-B', '10-C', '9-A', '9-B', '8-C', '11-Science', '12-Commerce'];

  const filteredStudents = useMemo(() => {
    return mockStudents.filter(s => {
      const matchSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchClass = activeClassFilter === 'All' || s.class === activeClassFilter;
      return matchSearch && matchClass;
    });
  }, [searchTerm, activeClassFilter]);

  // Styles
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

  // Ensure selected student matches filtering or defaults to first filtered student
  useEffect(() => {
    if (filteredStudents.length > 0 && !filteredStudents.some(s => s.id === selectedStudentId)) {
      setSelectedStudentId(filteredStudents[0].id);
    }
  }, [filteredStudents, selectedStudentId]);

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
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Toast Alert */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '12px',
          padding: '12px 20px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
          zIndex: 100002,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideIn 0.2s ease-out'
        }}>
          <CheckCircle2 style={{ color: 'var(--accent-blue)' }} size={20} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{toastMsg}</span>
        </div>
      )}

      {/* Header Block */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            Report Card Control Center
          </h1>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Access and print official CBSE Marks Statements and report certificates for all grade levels.
          </p>
        </div>
      </div>

      {/* Main Split Screen */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1.2fr 0.8fr',
        gap: '20px',
        alignItems: 'start'
      }}>
        
        {/* Column 1: Student Directory */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          boxSizing: 'border-box'
        }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Student Directory
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Select a student to inspect report card</span>
          </div>

          {/* Search Field */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search student or admission no..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid var(--border-primary)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                paddingLeft: '36px',
                paddingRight: '12px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Class filter dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Class Filter</span>
            <select 
              value={activeClassFilter} 
              onChange={e => setActiveClassFilter(e.target.value)}
              style={{
                width: '100%',
                height: '34px',
                borderRadius: '8px',
                border: '1px solid var(--border-primary)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                padding: '0 8px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {classFilters.map(c => <option key={c} value={c}>{c === 'All' ? 'All Classes' : `Class ${c}`}</option>)}
            </select>
          </div>

          {/* Students List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: '420px',
            overflowY: 'auto',
            paddingRight: '4px'
          }}>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => {
                const isSelected = student.id === selectedStudentId;
                return (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(37,99,235,0.06)' : 'var(--bg-primary)',
                      border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <img 
                        src="/student_avatar.png" 
                        alt={student.firstName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {student.firstName} {student.lastName}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Class {student.class} • Roll No. {parseInt(student.id) === 1 ? 24 : ((parseInt(student.id) * 7) % 29 + 1)}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
                      color: student.status === 'ACTIVE' ? 'var(--accent-green)' : 'var(--accent-amber)',
                      background: student.status === 'ACTIVE' ? 'var(--accent-green-dim)' : 'var(--accent-amber-dim)',
                      padding: '2px 6px', borderRadius: '4px'
                    }}>
                      {student.status}
                    </span>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: '12px' }}>
                No students match filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Column 2: CBSE Report Card Preview Panel */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Live Report Card Preview
            </h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'transparent', border: '1px solid var(--border-primary)', borderRadius: '6px',
                fontSize: '11px', fontWeight: 600, padding: '4px 10px', cursor: 'pointer', color: 'var(--text-secondary)'
              }}
            >
              <Eye size={13} /> Fullscreen Mode
            </button>
          </div>

          {/* Scaled CBSE Preview Card Box */}
          <div style={{
            width: '100%',
            overflowX: 'hidden',
            overflowY: 'visible',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            background: '#e8e0d4',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
            padding: '12px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div 
              onClick={() => setIsModalOpen(true)}
              style={{
                width: '820px',
                background: '#fdf8f0',
                border: '3px solid #1a1a2e',
                borderRadius: '2px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                fontFamily: '"Times New Roman", Times, serif',
                zoom: 0.5,
                position: 'relative'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a2e'}
            >
              {/* Decorative borders */}
              <div style={{ position: 'absolute', inset: '6px', border: '2px solid #8b7355', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: '10px', border: '1px solid #c9a96e', pointerEvents: 'none' }} />

              <div style={{ padding: '24px 32px', position: 'relative' }}>
                {/* Serial / Cert Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '10px', color: '#555', fontFamily: 'monospace' }}>
                  <span>{selectedStudent.serialNo}</span>
                  <span><strong>{selectedStudent.certNo}</strong></span>
                </div>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    <img src="/emblem.png" alt="Emblem" style={{ height: '70px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  
                  <div style={{ textAlign: 'right', marginTop: '-55px', marginBottom: '35px', fontSize: '9px', color: '#333' }}>
                    &#x0930;&#x091C;&#x093F;. &#x0928;&#x0902;. / <strong>Regn.No.</strong>&nbsp;&nbsp;<strong>{selectedStudent.regnNo}</strong>
                  </div>

                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', lineHeight: '1.4' }}>
                    &#x0915;&#x0947;&#x0928;&#x094D;&#x0926;&#x094D;&#x0930;&#x0940;&#x092F; &#x092E;&#x093E;&#x0927;&#x094D;&#x092F;&#x092E;&#x093F;&#x0915; &#x0936;&#x093F;&#x0915;&#x094D;&#x0937;&#x093E; &#x092C;&#x094B;&#x0930;&#x094D;&#x0921;
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1a1a2e', letterSpacing: '0.3px' }}>
                    CENTRAL BOARD OF SECONDARY EDUCATION
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#333', marginTop: '2px' }}>
                    &#x0905;&#x0902;&#x0915; &#x0935;&#x093F;&#x0935;&#x0930;&#x0923;&#x093F;&#x0915;&#x093E; &#x0938;&#x0939; &#x092A;&#x094D;&#x0930;&#x092E;&#x093E;&#x0923; &#x092A;&#x0924;&#x094D;&#x0930;
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a2e', letterSpacing: '0.5px' }}>
                    MARKS STATEMENT CUM CERTIFICATE
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a2e', marginTop: '2px' }}>
                    SECONDARY SCHOOL EXAMINATION, 2025
                  </div>
                </div>

                {/* Photo */}
                <div style={{ position: 'absolute', top: '150px', right: '35px', zIndex: 10 }}>
                  <div style={{ width: '70px', height: '85px', border: '1px solid #8b7355', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f0e8', overflow: 'hidden' }}>
                    <img src={selectedStudent.avatar} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>

                {/* Details */}
                <div style={{ maxWidth: '620px', fontSize: '11.5px', lineHeight: '1.9', color: '#1a1a2e', textAlign: 'left' }}>
                  <div>This is to certify that&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.fullName.toUpperCase()}</strong></div>
                  <div>Roll No.&nbsp;&nbsp;<strong>{selectedStudent.rollNo}</strong></div>
                  <div>Mother&apos;s Name&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.motherName}</strong></div>
                  <div>Father&apos;s / Guardian&apos;s Name&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.fatherName}</strong></div>
                  <div>Date of Birth&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.dobFormatted}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.dobInWords}</strong></div>
                  <div>School&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.institution}</strong></div>
                </div>

                {/* Marks Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '14px', marginBottom: '8px' }}>
                  <thead>
                    <tr>
                      <th rowSpan={2} style={{ ...headerCellStyle, width: '55px' }}>SUB. CODE</th>
                      <th rowSpan={2} style={{ ...headerCellStyle, width: '180px', textAlign: 'left', paddingLeft: '8px' }}>SUBJECT</th>
                      <th colSpan={4} style={headerCellStyle}>MARKS OBTAINED</th>
                      <th rowSpan={2} style={{ ...headerCellStyle, width: '65px' }}>POSITIONAL GRADE</th>
                    </tr>
                    <tr>
                      <th style={{ ...headerCellStyle, width: '55px' }}>THEORY</th>
                      <th style={{ ...headerCellStyle, width: '50px' }}>IA / PR.</th>
                      <th style={{ ...headerCellStyle, width: '50px' }}>TOTAL</th>
                      <th style={{ ...headerCellStyle, width: '100px' }}>TOTAL (IN WORDS)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportSubjects.map(subj => {
                      const total = subj.theory + subj.practical;
                      return (
                        <tr key={subj.code}>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{subj.code}</td>
                          <td style={{ ...cellStyle, fontWeight: 600, paddingLeft: '8px', textAlign: 'left' }}>{subj.name}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(subj.theory).padStart(3, '0')}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(subj.practical).padStart(3, '0')}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{String(total).padStart(3, '0')}</td>
                          <td style={{ ...cellStyle, fontWeight: 600, textAlign: 'left', fontSize: '10.5px' }}>{numberToWords(total)}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, fontSize: '12px' }}>{getPositionalGrade(total)}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td style={cellStyle}></td>
                      <td colSpan={6} style={{ ...cellStyle, fontWeight: 700, fontSize: '10.5px', textAlign: 'left' }}>ADDITIONAL SUBJECT</td>
                    </tr>
                    <tr>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{additionalSubject.code}</td>
                      <td style={{ ...cellStyle, fontWeight: 600, paddingLeft: '8px', textAlign: 'left' }}>{additionalSubject.name}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(additionalSubject.theory).padStart(3, '0')}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(additionalSubject.practical).padStart(3, '0')}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{String(additionalSubject.theory + additionalSubject.practical).padStart(3, '0')}</td>
                      <td style={{ ...cellStyle, fontWeight: 600, textAlign: 'left', fontSize: '10.5px' }}>{numberToWords(additionalSubject.theory + additionalSubject.practical)}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, fontSize: '12px' }}>{getPositionalGrade(additionalSubject.theory + additionalSubject.practical)}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Footer disclaimer / signatures */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px', fontSize: '10.5px', color: '#1a1a2e' }}>
                  <div style={{ textAlign: 'left' }}>
                    <div>Delhi</div>
                    <div>Dated : &nbsp;&nbsp;<strong>03-08-2025</strong></div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontFamily: '"Brush Script MT", cursive, serif', fontStyle: 'italic', marginBottom: '2px' }}>Controller of Exams</div>
                    <div style={{ fontSize: '10px', fontWeight: 700 }}>Controller of Examinations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Student Stats overview summary card */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Student Summary
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border-secondary)' }}>
              <img 
                src="/student_avatar.png" 
                alt={selectedStudent.fullName}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {selectedStudent.fullName}
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  Roll: {selectedStudent.rollNo} • Class: {selectedStudent.grade}-{selectedStudent.section}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Mother's Name:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedStudent.motherName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Father's Name:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedStudent.fatherName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Date of Birth:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedStudent.dobFormatted}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Registration Number:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{selectedStudent.regnNo}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', marginTop: 0 }}>
              Report Card Actions
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <button 
                onClick={() => triggerToast(`PDF download started for ${selectedStudent.fullName}`)}
                style={{
                  padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.background = 'var(--bg-primary)';
                }}
              >
                <Download size={14} style={{ color: 'var(--accent-blue)' }} /> Download Official PDF
              </button>
              
              <button 
                onClick={() => triggerToast(`Sending report card to ${selectedStudent.fullName}'s parent email`)}
                style={{
                  padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-green)';
                  e.currentTarget.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.background = 'var(--bg-primary)';
                }}
              >
                <Send size={14} style={{ color: 'var(--accent-green)' }} /> Email Report to Parents
              </button>

              <button 
                onClick={() => triggerToast('Report card sent to print spooler.')}
                style={{
                  padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-amber)';
                  e.currentTarget.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.background = 'var(--bg-primary)';
                }}
              >
                <Printer size={14} style={{ color: 'var(--accent-amber)' }} /> Print Hard Copy
              </button>

              <button 
                onClick={() => triggerToast('Seals and digital signatures verified.')}
                style={{
                  padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-purple)';
                  e.currentTarget.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.background = 'var(--bg-primary)';
                }}
              >
                <CheckCircle2 size={14} style={{ color: 'var(--accent-purple)' }} /> Verify Credentials
              </button>
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
            background: 'rgba(15, 23, 42, 0.65)',
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
              maxWidth: '860px',
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
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                Official CBSE Marksheet Certificate View - {selectedStudent.fullName}
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                  onClick={() => triggerToast(`Printing certificate...`)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '4px', height: '28px', padding: '0 10px', 
                    borderRadius: '6px', fontSize: '11px', background: '#f1f5f9', border: '1px solid #cbd5e1', 
                    color: '#334155', cursor: 'pointer', fontWeight: 600
                  }}
                >
                  <Printer size={12} /> Print
                </button>
                <button 
                  onClick={() => triggerToast(`Downloading PDF...`)}
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
              padding: '24px',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 160px)',
              background: '#e2e8f0',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '820px',
                minHeight: '950px',
                background: '#fdf8f0',
                border: '3px solid #1a1a2e',
                borderRadius: '2px',
                position: 'relative',
                padding: '28px 36px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                boxSizing: 'border-box',
                fontFamily: '"Times New Roman", Times, serif'
              }}>
                {/* Decorative borders */}
                <div style={{ position: 'absolute', inset: '6px', border: '2px solid #8b7355', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: '10px', border: '1px solid #c9a96e', pointerEvents: 'none' }} />

                {/* Serial / Cert Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '10px', color: '#555', fontFamily: 'monospace' }}>
                  <span>{selectedStudent.serialNo}</span>
                  <span><strong>{selectedStudent.certNo}</strong></span>
                </div>

                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  {/* Emblem */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    <img src="/emblem.png" alt="Emblem" style={{ height: '80px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  
                  {/* Regn No */}
                  <div style={{ textAlign: 'right', marginTop: '-60px', marginBottom: '40px', fontSize: '10px', color: '#333' }}>
                    &#x0930;&#x091C;&#x093F;. &#x0928;&#x0902;. / <strong>Regn.No.</strong>&nbsp;&nbsp;<strong style={{ color: '#1a1a2e' }}>{selectedStudent.regnNo}</strong>
                  </div>

                  {/* Bilingual Headers */}
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
                    &#x092E;&#x093E;&#x0927;&#x094D;&#x092F;&#x092E;&#x093F;&#x0915; &#x0935;&#x093F;&#x0926;&#x094D;&#x092F;&#x093E;&#x0932;&#x092F; &#x092A;&#x0930;&#x0940;&#x0915;&#x094D;&#x0937;&#x093E;, 2025
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a2e' }}>
                    SECONDARY SCHOOL EXAMINATION, 2025
                  </div>
                </div>

                {/* Photo */}
                <div style={{ position: 'absolute', top: '165px', right: '40px', zIndex: 10 }}>
                  <div style={{ width: '80px', height: '95px', border: '1px solid #8b7355', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f0e8', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <img src={selectedStudent.avatar} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>

                {/* Details Section */}
                <div style={{ maxWidth: '620px', fontSize: '12px', lineHeight: '2.1', color: '#1a1a2e', textAlign: 'left' }}>
                  <div>&#x092F;&#x0939; &#x092A;&#x094D;&#x0930;&#x092E;&#x093E;&#x0923;&#x093F;&#x0924; &#x0915;&#x093F;&#x092F;&#x093E; &#x091C;&#x093E;&#x0924;&#x093E; &#x0939;&#x0948; &#x0915;&#x093F;</div>
                  <div>This is to certify that&nbsp;&nbsp;&nbsp;&nbsp;<strong style={{ fontSize: '13px' }}>{selectedStudent.fullName.toUpperCase()}</strong></div>
                  <div>&#x0905;&#x0928;&#x0941;&#x0915;&#x094D;&#x0930;&#x092E;&#x093E;&#x0902;&#x0915;&nbsp;&nbsp;&nbsp;&nbsp;Roll No.&nbsp;&nbsp;<strong>{selectedStudent.rollNo}</strong></div>
                  <div>&#x092E;&#x093E;&#x0924;&#x093E; &#x0915;&#x093E; &#x0928;&#x093E;&#x092E;&nbsp;&nbsp;&nbsp;&nbsp;Mother&apos;s Name&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.motherName}</strong></div>
                  <div>&#x092A;&#x093F;&#x0924;&#x093E;/&#x0938;&#x0902;&#x0930;&#x0915;&#x094D;&#x0937;&#x0915; &#x0915;&#x093E; &#x0928;&#x093E;&#x092E;&nbsp;&nbsp;&nbsp;&nbsp;Father&apos;s / Guardian&apos;s Name&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.fatherName}</strong></div>
                  <div>&#x091C;&#x0928;&#x094D;&#x092E; &#x0924;&#x093F;&#x0925;&#x093F;&nbsp;&nbsp;&nbsp;&nbsp;Date of Birth&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.dobFormatted}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.dobInWords}</strong></div>
                  <div>&#x0935;&#x093F;&#x0926;&#x094D;&#x092F;&#x093E;&#x0932;&#x092F;&nbsp;&nbsp;&nbsp;&nbsp;School&nbsp;&nbsp;&nbsp;&nbsp;<strong>{selectedStudent.institution}</strong></div>
                  <div style={{ marginTop: '4px', fontSize: '11px', color: '#333' }}>
                    &#x0915;&#x0940; &#x0936;&#x0948;&#x0915;&#x094D;&#x0937;&#x0923;&#x093F;&#x0915; &#x0909;&#x092A;&#x0932;&#x092C;&#x094D;&#x0927;&#x093F;&#x092F;&#x093E;&#x0901; &#x0928;&#x093F;&#x092E;&#x094D;&#x0928;&#x093E;&#x0928;&#x0941;&#x0938;&#x093E;&#x0930; &#x0939;&#x0948;&#x0902; has achieved Scholastic Achievements as under :
                  </div>
                </div>

                {/* Marks Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', marginBottom: '12px' }}>
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
                    {reportSubjects.map(subj => {
                      const total = subj.theory + subj.practical;
                      return (
                        <tr key={subj.code}>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{subj.code}</td>
                          <td style={{ ...cellStyle, fontWeight: 600, paddingLeft: '12px', textAlign: 'left' }}>{subj.name}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(subj.theory).padStart(3, '0')}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(subj.practical).padStart(3, '0')}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{String(total).padStart(3, '0')}</td>
                          <td style={{ ...cellStyle, fontWeight: 600, textAlign: 'left' }}>{numberToWords(total)}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, fontSize: '13px' }}>{getPositionalGrade(total)}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td style={cellStyle}></td>
                      <td colSpan={6} style={{ ...cellStyle, fontWeight: 700, fontSize: '11px', textAlign: 'left' }}>ADDITIONAL SUBJECT</td>
                    </tr>
                    <tr>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{additionalSubject.code}</td>
                      <td style={{ ...cellStyle, fontWeight: 600, paddingLeft: '12px', textAlign: 'left' }}>{additionalSubject.name}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(additionalSubject.theory).padStart(3, '0')}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(additionalSubject.practical).padStart(3, '0')}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{String(additionalSubject.theory + additionalSubject.practical).padStart(3, '0')}</td>
                      <td style={{ ...cellStyle, fontWeight: 600, textAlign: 'left' }}>{numberToWords(additionalSubject.theory + additionalSubject.practical)}</td>
                      <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, fontSize: '13px' }}>{getPositionalGrade(additionalSubject.theory + additionalSubject.practical)}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Abbreviations */}
                <div style={{ fontSize: '9.5px', color: '#333', lineHeight: '1.8', marginTop: '12px', textAlign: 'left' }}>
                  <div><strong>&#x0938;&#x0902;&#x0915;&#x094D;&#x0937;&#x093F;&#x092A;&#x094D;&#x0924;&#x093F;&#x092F;&#x094B;&#x0902; &#x0915;&#x093E; &#x0905;&#x0930;&#x094D;&#x0925; : Abbreviations</strong></div>
                  <div>AB : &#x0905;&#x0928;&#x0941;&#x092A;&#x0938;&#x094D;&#x0925;&#x093F;&#x0924; Absent&nbsp;&nbsp;&nbsp;&nbsp;IA : &#x0906;&#x0902;&#x0924;&#x0930;&#x093F;&#x0915; &#x092E;&#x0942;&#x0932;&#x094D;&#x092F;&#x093E;&#x0902;&#x0915;&#x0928; Internal Assessment&nbsp;&nbsp;&nbsp;&nbsp;PR. : &#x092A;&#x094D;&#x0930;&#x093E;&#x092F;&#x094B;&#x0917;&#x093F;&#x0915;/Practical</div>
                </div>

                {/* Result */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#1a1a2e' }}>
                    &#x092A;&#x0930;&#x093F;&#x0923;&#x093E;&#x092E; Result&nbsp;&nbsp;&nbsp;&nbsp;<strong style={{ fontSize: '14px', color: '#0d6e3d', letterSpacing: '1px' }}>PASS</strong>
                  </div>
                </div>

                {/* Footer place & date + controller */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px', paddingTop: '12px', borderTop: '1px solid #c9a96e', textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: '#1a1a2e', lineHeight: '1.8' }}>
                    <div>&#x0926;&#x093F;&#x0932;&#x094D;&#x0932;&#x0940; Delhi</div>
                    <div>&#x0926;&#x093F;&#x0928;&#x093E;&#x0902;&#x0915; Dated : &nbsp;&nbsp;<strong>03-08-2025</strong></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontFamily: '"Brush Script MT", cursive, serif', fontStyle: 'italic', marginBottom: '4px' }}>Controller of Exams</div>
                    <div style={{ fontSize: '10px', color: '#333' }}>&#x092A;&#x0930;&#x0940;&#x0915;&#x094D;&#x0937;&#x093E; &#x0928;&#x093F;&#x092F;&#x0902;&#x0924;&#x094D;&#x0930;&#x0915;</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a2e' }}>Controller of Examinations</div>
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
