'use client';

import React, { useState } from 'react';
import { mockAdmissions } from '@/lib/mock-data';
import { Search, ClipboardList, CheckCircle, XCircle, AlertCircle, FileText, UserPlus } from 'lucide-react';

export default function AdmissionsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(mockAdmissions[0]?.id || null);

  const filteredApps = mockAdmissions.filter(app => {
    const nameMatch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const refMatch = app.ref.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'ALL' || app.status === statusFilter;
    return (nameMatch || refMatch) && statusMatch;
  });

  const selectedApp = mockAdmissions.find(app => app.id === selectedAppId);

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      background: 'var(--bg-primary)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
    }}>
      {/* Left List */}
      <div style={{
        flex: 1.2,
        borderRight: '1px solid var(--border-primary)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}>
        {/* Filter bar */}
        <div style={{
          padding: '12px',
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          background: 'var(--bg-secondary)',
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{
              position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)'
            }} />
            <input
              type="text"
              placeholder="Search reference or name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '32px', fontSize: '12px', height: '32px' }}
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="input-field"
            style={{ width: '130px', fontSize: '11px', height: '32px', padding: '0 8px' }}
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="SUBMITTED">SUBMITTED</option>
            <option value="UNDER_REVIEW">UNDER REVIEW</option>
            <option value="DOCUMENTS_PENDING">DOCS PENDING</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="WAITLISTED">WAITLISTED</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Reference No</th>
                <th>Applicant Name</th>
                <th>Grade Level</th>
                <th>Apply Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map(app => {
                const isSelected = app.id === selectedAppId;
                let statusBadge = 'badge-info';
                if (app.status === 'ACCEPTED') statusBadge = 'badge-active';
                if (app.status === 'UNDER_REVIEW') statusBadge = 'badge-pending';
                if (app.status === 'WAITLISTED') statusBadge = 'badge-warning';
                if (app.status === 'DOCUMENTS_PENDING') statusBadge = 'badge-critical';

                return (
                  <tr 
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={isSelected ? 'selected' : ''}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="font-mono text-xs" style={{ color: isSelected ? 'var(--accent-blue)' : 'var(--text-primary)' }}>
                      {app.ref}
                    </td>
                    <td style={{ fontWeight: 600 }}>{app.name}</td>
                    <td>{app.applyingFor}</td>
                    <td className="font-mono text-xs">{app.date}</td>
                    <td>
                      <span className={`badge ${statusBadge}`} style={{ fontSize: '9px', padding: '1px 4px' }}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Detail Panel */}
      {selectedApp && (
        <div style={{
          flex: 1,
          background: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          animation: 'slideInFromLeft var(--transition-normal)'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid var(--border-primary)',
            background: 'var(--bg-tertiary)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{
                fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)',
                padding: '1px 4px', borderRadius: '3px'
              }}>ADMISSION WORKFLOW</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{selectedApp.ref}</span>
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {selectedApp.name}
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Applying for {selectedApp.applyingFor} • Source: {selectedApp.source}
            </div>
          </div>

          {/* Details */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                APPLICATION SUMMARY
              </h3>
              <div style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px',
                padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'
              }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>PREVIOUS INSTITUTION</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedApp.previousSchool}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>SUBMISSION DATE</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{selectedApp.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>CURRENT STATE</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedApp.status}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>REFERRAL CHANNELS</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{selectedApp.source}</div>
                </div>
              </div>
            </div>

            {/* Document Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                VERIFICATION CHECKLIST
              </h3>
              <div style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px',
                padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={14} className="text-green-500" />
                    <span>Birth Certificate & Identity Proof</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>VERIFIED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={14} className="text-green-500" />
                    <span>Academic Marksheets / Transcripts</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>VERIFIED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {selectedApp.status === 'DOCUMENTS_PENDING' ? (
                      <AlertCircle size={14} className="text-red-500" />
                    ) : (
                      <CheckCircle size={14} className="text-green-500" />
                    )}
                    <span>Transfer Certificate (TC) from Previous School</span>
                  </div>
                  <span style={{ 
                    fontSize: '10px', 
                    color: selectedApp.status === 'DOCUMENTS_PENDING' ? 'var(--accent-red)' : 'var(--text-tertiary)',
                    fontWeight: selectedApp.status === 'DOCUMENTS_PENDING' ? 600 : 400
                  }}>
                    {selectedApp.status === 'DOCUMENTS_PENDING' ? 'PENDING' : 'VERIFIED'}
                  </span>
                </div>
              </div>
            </div>

            {/* Workflow Action Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                DECISION PANEL
              </h3>
              <div style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px',
                padding: '12px', display: 'flex', gap: '8px'
              }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1, gap: '4px' }}>
                  <UserPlus size={14} /> Approve & Enroll
                </button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1, gap: '4px' }}>
                  <FileText size={14} /> Request Docs
                </button>
                <button className="btn btn-ghost btn-sm" style={{ border: '1px solid var(--border-secondary)', color: 'var(--accent-red)' }}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
