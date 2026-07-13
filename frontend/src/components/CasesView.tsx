'use client';

import React, { useState } from 'react';
import { mockCases, mockStudents, mockTeachers } from '@/lib/mock-data';
import { Search, AlertTriangle, CheckSquare, Clock, Filter, UserCheck, MessageSquare } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function CasesView() {
  const openTab = useAppStore(s => s.openTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(mockCases[0]?.id || null);

  const filteredCases = mockCases.filter(c => {
    const titleMatch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.ref.toLowerCase().includes(searchTerm.toLowerCase());
    const priorityMatch = priorityFilter === 'ALL' || c.priority === priorityFilter;
    const statusMatch = statusFilter === 'ALL' || c.status === statusFilter;
    return titleMatch && priorityMatch && statusMatch;
  });

  const selectedCase = mockCases.find(c => c.id === selectedCaseId);

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      background: 'var(--bg-primary)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
    }}>
      {/* Left pane: Case Queue */}
      <div style={{
        flex: 1.2,
        borderRight: '1px solid var(--border-primary)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}>
        {/* Filters */}
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
              placeholder="Search cases..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '32px', fontSize: '12px', height: '32px' }}
            />
          </div>
          <select 
            value={priorityFilter} 
            onChange={e => setPriorityFilter(e.target.value)}
            className="input-field"
            style={{ width: '90px', fontSize: '11px', height: '32px', padding: '0 8px' }}
          >
            <option value="ALL">PRIORITY</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="input-field"
            style={{ width: '90px', fontSize: '11px', height: '32px', padding: '0 8px' }}
          >
            <option value="ALL">STATUS</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN PROG</option>
            <option value="ESCALATED">ESCALATED</option>
            <option value="PENDING_REVIEW">REVIEW</option>
            <option value="PENDING_APPROVAL">APPROVAL</option>
          </select>
        </div>

        {/* Dense List Table */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Case Ref</th>
                <th>Subject / Title</th>
                <th>Assignee</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map(c => {
                const isSelected = c.id === selectedCaseId;
                let priorityBadge = 'badge-info';
                if (c.priority === 'CRITICAL') priorityBadge = 'badge-critical';
                if (c.priority === 'HIGH') priorityBadge = 'badge-warning';
                
                let statusBadge = 'badge-info';
                if (c.status === 'ESCALATED') statusBadge = 'badge-critical';
                if (c.status === 'OPEN') statusBadge = 'badge-active';
                if (c.status === 'PENDING_REVIEW' || c.status === 'PENDING_APPROVAL') statusBadge = 'badge-pending';

                return (
                  <tr 
                    key={c.id} 
                    onClick={() => setSelectedCaseId(c.id)}
                    className={isSelected ? 'selected' : ''}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="font-mono text-xs" style={{ color: isSelected ? 'var(--accent-blue)' : 'var(--text-primary)' }}>
                      {c.ref}
                    </td>
                    <td style={{ fontWeight: 600 }}>{c.title}</td>
                    <td>
                      {(() => {
                        const matchedTeacher = mockTeachers.find(t => t.name === c.assignee);
                        const avatarSrc = matchedTeacher ? matchedTeacher.avatar : `/teacher_1.png`;
                        return (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ 
                              width: '18px', 
                              height: '18px', 
                              borderRadius: '50%', 
                              overflow: 'hidden', 
                              background: 'var(--bg-tertiary)', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              border: '1px solid var(--border-primary)',
                              flexShrink: 0 
                            }}>
                              <img 
                                src={avatarSrc} 
                                alt={c.assignee}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    const placeholder = document.createElement('div');
                                    placeholder.style.width = '100%';
                                    placeholder.style.height = '100%';
                                    placeholder.style.display = 'flex';
                                    placeholder.style.alignItems = 'center';
                                    placeholder.style.justifyContent = 'center';
                                    placeholder.style.background = 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))';
                                    placeholder.style.color = '#ffffff';
                                    placeholder.style.fontSize = '8px';
                                    placeholder.style.fontWeight = '700';
                                    placeholder.innerText = c.assignee.split(' ').map((n: string) => n[0]).join('');
                                    parent.appendChild(placeholder);
                                  }
                                }}
                              />
                            </div>
                            <span>{c.assignee.split(' ').pop()}</span>
                          </div>
                        );
                      })()}
                    </td>
                    <td>
                      <span className={`badge ${priorityBadge}`} style={{ fontSize: '9px', padding: '1px 4px' }}>
                        {c.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${statusBadge}`} style={{ fontSize: '9px', padding: '1px 4px' }}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right pane: Case Detail & Actions */}
      {selectedCase && (
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
                color: 'var(--accent-amber)', background: 'rgba(245, 158, 11, 0.1)',
                padding: '1px 4px', borderRadius: '3px'
              }}>{selectedCase.type}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{selectedCase.ref}</span>
            </div>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {selectedCase.title}
            </h2>
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px',
              padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>AFFECTED IDENTITY</div>
                {(() => {
                  const matchingStudent = mockStudents.find(s => `${s.firstName} ${s.lastName}` === selectedCase.subject);
                  return matchingStudent ? (
                    <div 
                      onClick={() => {
                        openTab({
                          id: `student-profile-${matchingStudent.id}`,
                          label: `${matchingStudent.firstName} ${matchingStudent.lastName}`,
                          view: 'student-profile',
                          closable: true,
                        });
                      }}
                      style={{ fontSize: '12px', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {selectedCase.subject}
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedCase.subject}</div>
                  );
                })()}
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>CASE OWNER</div>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{selectedCase.assignee}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>DATE INITIATED</div>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{selectedCase.created}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>DUE DATE</div>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{selectedCase.dueDate}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                NEXT ACTION / NEXT WORK STEP
              </h3>
              <div style={{
                background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px',
                padding: '12px', color: 'var(--text-accent)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <Clock size={16} />
                <span>{selectedCase.nextAction}</span>
              </div>
            </div>

            {/* Case Event Log / History */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                CASE RESOLUTION TIMELINE
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { time: '1 hr ago', user: 'Mr. Rajiv Saxena', desc: 'Escalated priority to CRITICAL. Re-assigned to parent coordinator.' },
                  { time: '1 day ago', user: 'System Agent', desc: 'Identity record flagged for low attendance.' }
                ].map((log, index) => (
                  <div key={index} style={{
                    padding: '10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)', borderRadius: '6px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600 }}>{log.user}</span>
                      <span>{log.time}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{log.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Control Strip */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                RESOLVE / DISPATCH
              </h3>
              <div style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px',
                padding: '12px', display: 'flex', gap: '8px'
              }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1, gap: '4px' }}>
                  <CheckSquare size={14} /> Resolve Case
                </button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1, gap: '4px' }}>
                  <UserCheck size={14} /> Reassign
                </button>
                <button className="btn btn-ghost btn-sm" style={{ border: '1px solid var(--border-secondary)', gap: '4px' }}>
                  <MessageSquare size={14} /> Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
