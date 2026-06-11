'use client';

import React, { useState } from 'react';
import { Search, Globe, Link, Mail, MessageCircle, ArrowRightLeft, Check } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export const ecosystemStudents = [
  { id: 'eco-1', name: 'Joshua Snow', role: 'Student at St. Mary\'s', uti: 'UTI-2026-8811' },
  { id: 'eco-2', name: 'Edilson De Carvalho', role: 'Student at Trophy High', uti: 'UTI-2026-8812' },
  { id: 'eco-3', name: 'Prothinidi Thomas', role: 'Student at Befix Intl.', uti: 'UTI-2026-8813' },
  { id: 'eco-4', name: 'Artugul Shcredi', role: 'Student at Ryan Intl.', uti: 'UTI-2026-8814' },
  { id: 'eco-5', name: 'Ostoja Ostojic', role: 'Student at Trophy High', uti: 'UTI-2026-8815' },
  { id: 'eco-6', name: 'Afrim Konjufca', role: 'Student at DPS', uti: 'UTI-2026-8816' },
  { id: 'eco-7', name: 'Thomas Hayes', role: 'Student at Trophy High', uti: 'UTI-2026-8817' },
  { id: 'eco-8', name: 'Radovan SkillArena', role: 'Student at DAV Public', uti: 'UTI-2026-8818' },
  { id: 'eco-9', name: 'James Codeer', role: 'Student at Trophy High', uti: 'UTI-2026-8819' },
  { id: 'eco-10', name: 'Emily Chen', role: 'Student at St. Jude\'s', uti: 'UTI-2026-8820' },
  { id: 'eco-11', name: 'Michael Ross', role: 'Student at Pearson Academy', uti: 'UTI-2026-8821' },
  { id: 'eco-12', name: 'Sarah Jenkins', role: 'Student at Oakridge Intl.', uti: 'UTI-2026-8822' },
];

export default function TransferAdmissionWizard() {
  const openTab = useAppStore(s => s.openTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [requestedIds, setRequestedIds] = useState<Set<string>>(new Set());
  const [step, setStep] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filteredStudents = ecosystemStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.uti.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReviewTransfer = (student: any) => {
    setSelectedStudent(student);
    setStep(2);
  };

  const toggleRequest = (id: string) => {
    setRequestedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'var(--bg-secondary)',
      fontFamily: 'var(--font-sans)',
      overflowY: 'auto'
    }}>
      {step === 1 && (
        <>
          {/* Header Search Section */}
          <div style={{
            padding: '60px 40px',
            backgroundColor: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', 
          color: 'var(--accent-blue)', background: 'rgba(59, 130, 246, 0.1)', 
          padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 700, marginBottom: '24px'
        }}>
          <ArrowRightLeft size={14} /> Ecosystem Transfer
        </div>
        
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Search Global Network
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', lineHeight: 1.6 }}>
          Search for students across all AcadEx partnered institutions using their Universal Transfer ID (UTI) or Name to initiate a seamless transfer application.
        </p>

        {/* Command Palette Style Search Bar */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
          borderRadius: '16px',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-primary)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{ padding: '0 24px', color: 'var(--text-tertiary)' }}>
            <Search size={24} />
          </div>
          <input 
            type="text"
            placeholder="Search by name, school, or UTI (e.g. UTI-2026-8811)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '24px 0',
              border: 'none',
              background: 'transparent',
              fontSize: '18px',
              color: 'var(--text-primary)',
              outline: 'none',
              fontWeight: 500
            }}
          />
          <div style={{
            padding: '0 24px',
            color: 'var(--text-tertiary)'
          }}>
            <kbd style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              boxShadow: '0 2px 0 rgba(0,0,0,0.05)'
            }}>⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Grid Content Section */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          {filteredStudents.map(student => {
            const isRequested = requestedIds.has(student.id);
            
            // Generate a persistent background color for avatar based on ID
            const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];
            const bgColor = colors[parseInt(student.id) % colors.length];
            const initials = student.name.split(' ').map(n => n[0]).join('').substring(0, 2);

            return (
              <div 
                key={student.id} 
                style={{
                  background: 'var(--bg-primary)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-primary)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', width: '100%' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%', background: bgColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ffffff', fontSize: '20px', fontWeight: 700, flexShrink: 0
                  }}>
                    {initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {student.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {student.role}
                    </p>
                  </div>
                </div>

                {/* Previous Academics */}
                <div style={{ display: 'flex', gap: '16px', color: 'var(--text-tertiary)', marginBottom: '24px', fontSize: '12px', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>GPA:</span> 
                    <span style={{ color: 'var(--text-primary)' }}>{(3.2 + (parseInt(student.id.replace('eco-', '')) % 8) * 0.1).toFixed(1)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Att:</span> 
                    <span style={{ color: 'var(--text-primary)' }}>{88 + (parseInt(student.id.replace('eco-', '')) % 12)}%</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: 'auto' }}>
                  <button 
                    onClick={() => handleReviewTransfer(student)}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      borderRadius: '8px',
                      background: isRequested ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                      border: isRequested ? '1px solid var(--border-primary)' : '1px solid var(--border-primary)',
                      color: isRequested ? 'var(--text-secondary)' : 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isRequested ? (
                      <>
                        <Check size={14} color="var(--accent-green)" />
                        Under Review
                      </>
                    ) : (
                      'Review Transfer'
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      openTab({
                        id: `applicant-profile-${student.id}`,
                        label: `Applicant: ${student.name}`,
                        view: 'applicant-profile',
                        closable: true,
                      });
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      borderRadius: '8px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-primary)',
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredStudents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' }}>
            No students found matching your search.
          </div>
        )}
      </div>
        </>
      )}

      {step === 2 && selectedStudent && (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <button 
            onClick={() => setStep(1)}
            style={{ alignSelf: 'flex-start', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
          >
            <ArrowRightLeft size={16} /> Back to Search
          </button>

          <div style={{
            background: '#ffffff',
            padding: '60px 80px',
            borderRadius: '8px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            color: '#333333',
            fontFamily: '"Times New Roman", Times, serif',
            lineHeight: 1.6
          }}>
            <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px', textTransform: 'uppercase' }}>
                AcadEx Global Education Ecosystem
              </h2>
              <h3 style={{ fontSize: '14px', margin: '0 0 4px' }}>Department of Admissions & Transfers</h3>
              <p style={{ fontSize: '12px', margin: 0 }}>Regional Transfer Operations Division</p>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 4px' }}>DR. KAVITA MENON, Ph.D.</p>
              <p style={{ margin: 0 }}>Director of Admissions</p>
              <p style={{ margin: 0 }}>Axio Education Group</p>
              <br />
              <p style={{ margin: '0 0 4px' }}>Thru Channel: <strong>The School Principals</strong></p>
              <p style={{ margin: 0 }}>{selectedStudent.role.replace('Student at ', '')}</p>
            </div>

            <p style={{ marginBottom: '20px' }}>Dear Sir/Ma'am,</p>
            <p style={{ marginBottom: '20px' }}>Peace and humility!</p>

            <p style={{ marginBottom: '20px', textIndent: '40px', textAlign: 'justify' }}>
              I am writing to formally initiate the academic transfer process for <strong>{selectedStudent.name}</strong>, currently a <strong>{selectedStudent.role}</strong> holding the Universal Transfer ID (UTI): <strong>{selectedStudent.uti}</strong>.
            </p>

            <p style={{ marginBottom: '20px', textIndent: '40px', textAlign: 'justify' }}>
              As an active member of the AcadEx global ecosystem, we are committed to ensuring a seamless transition for all learners. The student's academic records, behavioral assessments, and extracurricular achievements have been thoroughly reviewed through the centralized ledger. We believe that integrating them into our institution will foster their continuous growth and contribute positively to our student body.
            </p>

            <p style={{ marginBottom: '20px', textIndent: '40px', textAlign: 'justify' }}>
              Attached herewith are the relevant digital records and the preliminary transfer clearance for your further evaluation. We hope you find this request in order and facilitate the digital handover of the student's complete dossier via the AcadEx secure channel.
            </p>

            <p style={{ marginBottom: '40px' }}>Thank you in advance for your time and prompt action regarding this transfer request.</p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '60px' }}>
              <p style={{ margin: '0 0 40px', textAlign: 'right' }}>Respectfully yours,</p>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 'bold', textDecoration: 'underline', margin: '0 0 4px' }}>AXIO ADMISSIONS OFFICE</p>
                <p style={{ margin: 0 }}>Authorized Representative</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button 
              onClick={() => {
                toggleRequest(selectedStudent.id);
                setStep(1);
              }}
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                background: 'var(--accent-blue)',
                border: 'none',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                transition: 'all 0.2s'
              }}
            >
              Next Step
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
