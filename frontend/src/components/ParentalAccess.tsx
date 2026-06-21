'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { UploadCloud, X } from 'lucide-react';
import { mockStudents } from '@/lib/mock-data';

export default function ParentalAccess({ studentId }: { studentId?: string }) {
  const closeTab = useAppStore(s => s.closeTab);
  const activeTabId = useAppStore(s => s.activeTabId);

  const student = mockStudents.find(s => s.id === studentId) || mockStudents[0];

  const [formData, setFormData] = useState({
    parentName: '',
    relationship: 'Father',
    accessLevel: 'Full Access',
    permissions: ['Attendance', 'Grades'],
    startDate: '',
    endDate: '',
    notes: ''
  });

  const availableTags = ['Attendance', 'Grades', 'Fees', 'Discipline', 'Communication'];

  const toggleTag = (tag: string) => {
    if (formData.permissions.includes(tag)) {
      setFormData(prev => ({ ...prev, permissions: prev.permissions.filter(t => t !== tag) }));
    } else {
      setFormData(prev => ({ ...prev, permissions: [...prev.permissions, tag] }));
    }
  };

  const handleReset = () => {
    setFormData({
      parentName: '',
      relationship: 'Father',
      accessLevel: 'Full Access',
      permissions: ['Attendance', 'Grades'],
      startDate: '',
      endDate: '',
      notes: ''
    });
  };

  const showToast = useAppStore(s => s.showToast);

  const handleGrantAccess = () => {
    showToast(`Access granted for ${formData.parentName} to student ${student.firstName} ${student.lastName}`, "success");
    closeTab(activeTabId);
  };

  return (
    <div style={{ padding: '40px', background: 'var(--bg-primary)', height: '100%', overflowY: 'auto', fontFamily: 'var(--font-sans)' }}>
      <div style={{ margin: '0 auto', width: '100%', maxWidth: '640px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-primary)', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>Grant Parental Access</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Set up a portal account for the parent/guardian of {student.firstName} {student.lastName}.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Parent Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Parent / Guardian Name</label>
            <input 
              type="text" 
              value={formData.parentName}
              onChange={e => setFormData({ ...formData, parentName: e.target.value })}
              placeholder="e.g. Ramesh Sharma"
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          {/* Relationship */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Relationship to Student</label>
            <select 
              value={formData.relationship}
              onChange={e => setFormData({ ...formData, relationship: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
            >
              <option>Father</option>
              <option>Mother</option>
              <option>Guardian</option>
              <option>Other</option>
            </select>
          </div>

          {/* Access Level */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Access Level</label>
            <select 
              value={formData.accessLevel}
              onChange={e => setFormData({ ...formData, accessLevel: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
            >
              <option>Full Access</option>
              <option>View Only</option>
              <option>Financial Only</option>
              <option>Academic Only</option>
            </select>
          </div>

          {/* Permissions / Tags */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Permissions</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', minHeight: '42px', alignItems: 'center' }}>
              {formData.permissions.map(tag => (
                <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', fontSize: '11px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px' }}>
                  {tag}
                  <X size={10} style={{ cursor: 'pointer' }} onClick={() => toggleTag(tag)} />
                </span>
              ))}
              <select 
                value="" 
                onChange={e => { if (e.target.value) toggleTag(e.target.value) }}
                style={{ border: 'none', background: 'transparent', fontSize: '11px', color: 'var(--text-secondary)', outline: 'none', flex: 1, minWidth: '80px' }}
              >
                <option value="">+ Add</option>
                {availableTags.filter(t => !formData.permissions.includes(t)).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Access Start Date</label>
            <input 
              type="date" 
              value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          {/* End Date */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Access Expiry Date</label>
            <input 
              type="date" 
              value={formData.endDate}
              onChange={e => setFormData({ ...formData, endDate: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
        </div>

        {/* Upload Document */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Upload ID Proof</label>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Drag and drop document to verify parent identity</div>
          
          <div style={{ border: '2px dashed var(--border-primary)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'var(--bg-tertiary)', cursor: 'pointer', marginTop: '4px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              <UploadCloud size={24} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Choose a file or drag & drop it here.</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>txt, docx, pdf, jpeg, xlsx - Up to 50MB</div>
            </div>
            <button style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', padding: '6px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '8px', cursor: 'pointer' }}>Browse files</button>
          </div>
        </div>

        {/* Description / Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Additional Notes</label>
          <textarea 
            rows={4}
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Describe any special instructions here!"
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', fontSize: '13px', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <button 
            onClick={() => closeTab(activeTabId)}
            style={{ padding: '10px 20px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            Cancel
          </button>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={handleReset}
              style={{ padding: '10px 20px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              Reset Data
            </button>
            <button 
              onClick={handleGrantAccess}
              style={{ padding: '10px 24px', background: '#0f172a', border: '1px solid #0f172a', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}
            >
              Grant Access
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
