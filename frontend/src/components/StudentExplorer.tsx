'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { api } from '@/lib/api';
import { Search, UserCheck, AlertTriangle, Eye, Shield, Award, Clipboard, FileText, X } from 'lucide-react';

export default function StudentExplorer() {
  const tenantId = useAppStore(s => s.tenantId);
  const openTab = useAppStore(s => s.openTab);
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await api.getStudents(tenantId);
      setStudents(data);
    };
    load();
  }, [tenantId]);

  const filteredStudents = students.filter(s => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const query = searchTerm.toLowerCase();
    const uai = s.universalAcademicId || s.uai || '';
    const currentClass = s.currentClass || s.class || '';
    return fullName.includes(query) || uai.toLowerCase().includes(query) || currentClass.toLowerCase().includes(query);
  });

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      background: 'var(--bg-primary)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
    }}>
      {/* Left panel: List & Search */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}>
        {/* Toolbar */}
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
              placeholder="Search identities (AIN, Name, Class)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field"
              style={{
                paddingLeft: '32px',
                fontSize: '12px',
                height: '32px',
              }}
            />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
            {filteredStudents.length} RECORDS
          </span>
        </div>

        {/* Dense List Table */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Universal Academic ID (AIN)</th>
                <th>Full Name</th>
                <th>Class / Div</th>
                <th>Attendance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => {
                let statusBadge = 'badge-active';
                if (student.status === 'TRANSFERRED') statusBadge = 'badge-info';
                if (student.status === 'SUSPENDED') statusBadge = 'badge-critical';
                if (student.status === 'GRADUATED') statusBadge = 'badge-pending';

                return (
                  <tr 
                    key={student.id} 
                    onClick={() => {
                      openTab({
                        id: `student-profile-${student.id}`,
                        label: `${student.firstName} ${student.lastName}`,
                        view: 'student-profile',
                        closable: true,
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>
                      {student.universalAcademicId || student.uai}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {student.firstName} {student.lastName}
                    </td>
                    <td>{student.currentClass || student.class}</td>
                    <td className="font-mono">
                      <span style={{ 
                        color: student.attendance >= 90 ? 'var(--accent-green)' : student.attendance >= 80 ? 'var(--accent-amber)' : 'var(--accent-red)'
                      }}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${statusBadge}`} style={{ fontSize: '9px', padding: '1px 4px' }}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-tertiary)' }}>
                    No identity records match query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
