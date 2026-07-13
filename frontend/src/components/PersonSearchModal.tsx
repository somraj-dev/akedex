'use client';

import React, { useState, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

import { useAppStore } from '@/lib/store';
import { mockStudents } from '@/lib/mock-data';

interface PersonSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonSearchModal({ isOpen, onClose }: PersonSearchModalProps) {
  const openTab = useAppStore(s => s.openTab);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [personId, setPersonId] = useState('');
  const [encounterId, setEncounterId] = useState('');
  const [assumeWildcards, setAssumeWildcards] = useState(true);
  const [activeTab, setActiveTab] = useState<'Person' | 'Guarantor'>('Person');

  // Search Results State
  const [results, setResults] = useState<any[]>(mockStudents);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(mockStudents[0]?.id || '');
  const selectedStudent = mockStudents.find(s => s.id === selectedStudentId);

  const handleInputChange = (field: string, val: string) => {
    let currentLastName = lastName;
    let currentPhone = phone;
    let currentPersonId = personId;

    if (field === 'lastName') { setLastName(val); currentLastName = val; }
    if (field === 'phone') { setPhone(val); currentPhone = val; }
    if (field === 'personId') { setPersonId(val); currentPersonId = val; }

    const filtered = mockStudents.filter(student => {
      const name = `${student.firstName} ${student.lastName}`.toLowerCase();
      const matchName = !currentLastName || name.includes(currentLastName.toLowerCase());
      const matchRoll = !currentPersonId || student.uai.toLowerCase().includes(currentPersonId.toLowerCase()) || student.admissionNo.toLowerCase().includes(currentPersonId.toLowerCase());
      const matchPhone = !currentPhone || student.phone.includes(currentPhone) || student.guardianPhone.includes(currentPhone);
      return matchName && matchRoll && matchPhone;
    });
    setResults(filtered);
    if (filtered.length > 0) {
      setSelectedStudentId(filtered[0].id);
    } else {
      setSelectedStudentId('');
    }
  };

  const handleSearch = () => {
    const filtered = mockStudents.filter(student => {
      const name = `${student.firstName} ${student.lastName}`.toLowerCase();
      const matchName = !lastName || name.includes(lastName.toLowerCase());
      const matchRoll = !personId || student.uai.toLowerCase().includes(personId.toLowerCase()) || student.admissionNo.toLowerCase().includes(personId.toLowerCase());
      const matchPhone = !phone || student.phone.includes(phone) || student.guardianPhone.includes(phone);
      return matchName && matchRoll && matchPhone;
    });
    setResults(filtered);
    if (filtered.length > 0) {
      setSelectedStudentId(filtered[0].id);
    } else {
      setSelectedStudentId('');
    }
  };

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: 'Arial, sans-serif',
    }}>
      {/* Modal Dialog Box */}
      <div style={{
        width: '920px',
        maxWidth: '95vw',
        height: '620px',
        backgroundColor: '#f1f5f9',
        borderRadius: '6px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #94a3b8',
      }}>
        {/* Title Bar - Yellow/Orange background */}
        <div style={{
          height: '34px',
          backgroundColor: '#f59e0b',
          color: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          cursor: 'move',
          userSelect: 'none',
          borderBottom: '1px solid #d97706',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 'bold' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>👥</span>
            <span>Person Search</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Minus size={14} style={{ cursor: 'pointer', opacity: 0.8 }} />
            <Square size={10} style={{ cursor: 'pointer', opacity: 0.8 }} />
            <X size={15} onClick={onClose} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{
          height: '32px',
          backgroundColor: '#e2e8f0',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 12px',
          borderBottom: '1px solid #cbd5e1',
        }}>
          <button 
            onClick={() => setActiveTab('Person')}
            style={{
              padding: '6px 16px',
              fontSize: '12px',
              fontWeight: activeTab === 'Person' ? 'bold' : 'normal',
              color: '#0f172a',
              backgroundColor: activeTab === 'Person' ? '#ffffff' : 'transparent',
              border: activeTab === 'Person' ? '1px solid #cbd5e1' : 'none',
              borderBottom: 'none',
              borderRadius: '4px 4px 0 0',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            Person
          </button>
          <button 
            onClick={() => setActiveTab('Guarantor')}
            style={{
              padding: '6px 16px',
              fontSize: '12px',
              fontWeight: activeTab === 'Guarantor' ? 'bold' : 'normal',
              color: '#475569',
              backgroundColor: activeTab === 'Guarantor' ? '#ffffff' : 'transparent',
              border: activeTab === 'Guarantor' ? '1px solid #cbd5e1' : 'none',
              borderBottom: 'none',
              borderRadius: '4px 4px 0 0',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            Guarantor
          </button>
        </div>

        {/* Wildcard warning alert block */}
        <div style={{
          backgroundColor: '#eff6ff',
          padding: '6px 16px',
          fontSize: '12px',
          color: '#1e40af',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid #dbeafe',
        }}>
          <span style={{ fontWeight: 'bold' }}>i</span>
          <span>Turning on the Assume Wildcards setting will reduce search strength.</span>
        </div>

        {/* Main Work Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          padding: '12px',
          gap: '12px',
          overflow: 'hidden',
          backgroundColor: '#f8fafc',
        }}>
          {/* Left Form Sidebar */}
          <div style={{
            width: '220px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flexShrink: 0,
          }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '3px' }}>Student Name</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '3px' }}>Any Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '3px' }}>Roll Number</label>
              <input 
                type="text" 
                value={personId}
                onChange={(e) => handleInputChange('personId', e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
              />
            </div>

            {/* Form Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button 
                onClick={handleSearch}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                Search...
              </button>
              <button 
                onClick={() => {
                  setLastName('');
                  setPhone('');
                  setPersonId('');
                  setResults(mockStudents);
                  setSelectedStudentId(mockStudents[0]?.id || '');
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Right Results Columns */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            overflow: 'hidden',
          }}>
            {/* Top Table: Persons */}
            <div style={{
              flex: 1,
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Header / Utility row */}
              <div style={{
                height: '28px',
                backgroundColor: '#f1f5f9',
                borderBottom: '1px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px',
                fontSize: '11px',
              }}>
                <div style={{ display: 'flex', gap: '12px', fontWeight: 'bold' }}>
                  <span style={{ color: '#1e40af', cursor: 'pointer' }}>Person</span>
                  <span 
                    onClick={() => {
                      onClose();
                      openTab({
                        id: 'new-admission-flow',
                        label: 'Admission Flow',
                        view: 'new-admission-flow',
                        closable: true
                      });
                    }}
                    style={{ color: '#475569', cursor: 'pointer' }}
                  >
                    ➕ Add
                  </span>
                  <span style={{ color: '#475569', cursor: 'pointer' }}>🔍 Preview</span>
                </div>
                <span style={{ color: '#1e40af', cursor: 'pointer', fontWeight: 'bold' }}>Preferences</span>
              </div>
              {/* Table content */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Name</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Roll Number (UAI)</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Date of Birth</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Sex</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Class / Div</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Guardian</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((student) => {
                      const isSelected = student.id === selectedStudentId;
                      return (
                        <tr 
                          key={student.id}
                          onClick={() => setSelectedStudentId(student.id)}
                          style={{ 
                            backgroundColor: isSelected ? '#0f2c59' : 'transparent', 
                            color: isSelected ? '#ffffff' : '#334155',
                            borderBottom: '1px solid #cbd5e1',
                            cursor: 'pointer'
                          }}
                        >
                          <td style={{ padding: '6px' }}>{student.lastName}, {student.firstName}</td>
                          <td style={{ padding: '6px', fontWeight: 'bold' }}>{student.uai}</td>
                          <td style={{ padding: '6px' }}>{student.dob}</td>
                          <td style={{ padding: '6px' }}>{student.gender}</td>
                          <td style={{ padding: '6px' }}>{student.class}</td>
                          <td style={{ padding: '6px' }}>{student.guardian}</td>
                          <td style={{ padding: '6px' }}>{student.phone}</td>
                        </tr>
                      );
                    })}
                    {results.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>No students found matching your criteria.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Table: Encounters */}
            <div style={{
              height: '180px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '24px',
                backgroundColor: '#f1f5f9',
                borderBottom: '1px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#1e40af',
              }}>
                Academic Profile & Active Enlistments
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Session / Year</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Affiliated School</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Current Status</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Avg Attendance</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Guardian Contact</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Date of Birth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent ? (
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px', color: '#1e40af', fontWeight: 'bold' }}>2026-27</td>
                        <td style={{ padding: '6px' }}>{selectedStudent.institution}</td>
                        <td style={{ padding: '6px', fontWeight: 'bold', color: selectedStudent.status === 'ACTIVE' ? '#16a34a' : '#ef4444' }}>{selectedStudent.status}</td>
                        <td style={{ padding: '6px', fontWeight: 'bold' }}>{selectedStudent.attendance}%</td>
                        <td style={{ padding: '6px' }}>{selectedStudent.guardianPhone}</td>
                        <td style={{ padding: '6px' }}>{selectedStudent.dob}</td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>No student selected</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div style={{
          height: '42px',
          backgroundColor: '#e2e8f0',
          borderTop: '1px solid #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={assumeWildcards} 
              onChange={(e) => setAssumeWildcards(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span>Assume Wildcards</span>
          </label>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={onClose}
              style={{
                padding: '5px 16px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#334155',
                cursor: 'pointer',
              }}
            >
              Select
            </button>
            <button 
              onClick={onClose}
              style={{
                padding: '5px 16px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#475569',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
