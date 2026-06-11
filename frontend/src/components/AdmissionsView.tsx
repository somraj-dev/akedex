'use client';

import React, { useState } from 'react';
import { mockAdmissions } from '@/lib/mock-data';
import { Search, ClipboardList, CheckCircle, XCircle, AlertCircle, FileText, UserPlus } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function AdmissionsView() {
  const openTab = useAppStore(s => s.openTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const filteredApps = mockAdmissions.filter(app => {
    const nameMatch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const refMatch = app.ref.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'ALL' || app.status === statusFilter;
    return (nameMatch || refMatch) && statusMatch;
  });

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
                let statusBadge = 'badge-info';
                if (app.status === 'ACCEPTED') statusBadge = 'badge-active';
                if (app.status === 'UNDER_REVIEW') statusBadge = 'badge-pending';
                if (app.status === 'WAITLISTED') statusBadge = 'badge-warning';
                if (app.status === 'DOCUMENTS_PENDING') statusBadge = 'badge-critical';

                return (
                  <tr 
                    key={app.id}
                    onClick={() => {
                      openTab({
                        id: `applicant-profile-${app.id}`,
                        label: `Applicant: ${app.name}`,
                        view: 'applicant-profile',
                        closable: true,
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>
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
    </div>
  );
}
