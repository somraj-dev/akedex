'use client';

import React, { useState, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface PersonSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonSearchModal({ isOpen, onClose }: PersonSearchModalProps) {
  const [lastName, setLastName] = useState('pat');
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [personId, setPersonId] = useState('');
  const [encounterId, setEncounterId] = useState('');
  const [assumeWildcards, setAssumeWildcards] = useState(true);
  const [activeTab, setActiveTab] = useState<'Person' | 'Guarantor'>('Person');

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
              <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '3px' }}>Last Name</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '3px' }}>First Name</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '3px' }}>Birth Date</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input 
                  type="text" 
                  placeholder="DD/MM/YYYY"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{ flex: 1, padding: '4px 8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
                />
                <button style={{ padding: '0 6px', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#f1f5f9', cursor: 'pointer' }}>📅</button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '3px' }}>Any Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '3px' }}>Person Identifiers</label>
              <input 
                type="text" 
                value={personId}
                onChange={(e) => setPersonId(e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '3px' }}>Encounter Identifiers</label>
              <input 
                type="text" 
                value={encounterId}
                onChange={(e) => setEncounterId(e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
              />
            </div>

            {/* Form Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button style={{
                flex: 1,
                padding: '6px 0',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#334155',
                cursor: 'pointer',
              }}>
                Search...
              </button>
              <button 
                onClick={() => {
                  setLastName(''); setFirstName(''); setBirthDate(''); setPhone(''); setPersonId(''); setEncounterId('');
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
                  <span style={{ color: '#475569', cursor: 'pointer' }}>➕ Add</span>
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
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>MRN</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Date of Birth</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Sex</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Age</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Account Number</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: '#0f2c59', color: '#ffffff' }}>
                      <td style={{ padding: '6px' }}>Lee, David</td>
                      <td style={{ padding: '6px', fontWeight: 'bold' }}>1000245681</td>
                      <td style={{ padding: '6px' }}>30/09/1972</td>
                      <td style={{ padding: '6px' }}>Male</td>
                      <td style={{ padding: '6px' }}>52 Y</td>
                      <td style={{ padding: '6px', color: '#94a3b8' }}>AVX-000126</td>
                      <td style={{ padding: '6px' }}>PUL-01 / Bed 01</td>
                    </tr>
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
                Encounter
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Encounter</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Facility</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Encounter Type</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Date of Service</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Resource</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Guarantor</th>
                      <th style={{ padding: '6px', fontWeight: 'bold', color: '#475569' }}>Discharge Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '6px', color: '#1e40af', fontWeight: 'bold', cursor: 'pointer' }}>ENC-40112</td>
                      <td style={{ padding: '6px' }}>AxioVital Main Campus</td>
                      <td style={{ padding: '6px' }}>Inpatient</td>
                      <td style={{ padding: '6px' }}>28/05/2025</td>
                      <td style={{ padding: '6px' }}>Dr. S. Reddy</td>
                      <td style={{ padding: '6px' }}>Blue Cross / Blue Shield</td>
                      <td style={{ padding: '6px' }}>—</td>
                    </tr>
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
