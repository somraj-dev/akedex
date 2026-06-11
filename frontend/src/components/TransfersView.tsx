'use client';

import React, { useState } from 'react';
import { mockCases } from '@/lib/mock-data';
import { Search, ArrowRightLeft, ShieldCheck, Clock, FileText } from 'lucide-react';

export default function TransfersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('c2');

  const transferCases = mockCases.filter(c => c.type === 'TRANSFER');
  const filteredCases = transferCases.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCase = mockCases.find(c => c.id === selectedCaseId);

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      background: 'var(--bg-primary)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
    }}>
      {/* Left Column */}
      <div style={{
        flex: 1.2,
        borderRight: '1px solid var(--border-primary)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}>
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
              placeholder="Search transfers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '32px', fontSize: '12px', height: '32px' }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Student / Title</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map(c => {
                const isSelected = c.id === selectedCaseId;
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
                    <td style={{ fontWeight: 600 }}>{c.subject}</td>
                    <td>
                      <span className={`badge ${c.priority === 'HIGH' ? 'badge-critical' : 'badge-warning'}`}>
                        {c.priority}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-info">{c.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column */}
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
          <div style={{
            padding: '16px',
            borderBottom: '1px solid var(--border-primary)',
            background: 'var(--bg-tertiary)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{
                fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-mono)',
                color: 'var(--accent-blue)', background: 'rgba(59, 130, 246, 0.1)',
                padding: '1px 4px', borderRadius: '3px'
              }}>TRANSFER CASE</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{selectedCase.ref}</span>
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {selectedCase.title}
            </h2>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px',
              padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>STUDENT NAME</div>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedCase.subject}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>ASSIGNEE OPERATOR</div>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{selectedCase.assignee}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>TARGET COMPLETION</div>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{selectedCase.dueDate}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>CASE STATUS</div>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedCase.status}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                TRANSFER ROUTE LOGISTICS
              </h3>
              <div style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px',
                padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>SENDING</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Delhi Public School</div>
                  <div style={{ fontSize: '9px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>APPROVED & SIGNED</div>
                </div>
                <div style={{ color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px' }}>
                  <ArrowRightLeft size={16} />
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>RECEIVING</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>St. Xavier&apos;s School</div>
                  <div style={{ fontSize: '9px', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>PENDING INCOMING</div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                TRANSCRIPT SIGNATURES & COMPLIANCE
              </h3>
              <div style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px',
                padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} className="text-green-500" />
                    <span>Sending Board Release Order</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>VERIFIED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} className="text-green-500" />
                    <span>Academic Ledger Integrity Check</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>VERIFIED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} className="text-amber-500" />
                    <span>Receiving School Enrollment Ack</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--accent-amber)', fontWeight: 600 }}>AWAITING ACK</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                CASE ACTION BAR
              </h3>
              <div style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '8px',
                padding: '12px', display: 'flex', gap: '8px'
              }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1, gap: '4px' }}>
                  <ShieldCheck size={14} /> Verify & Release Student
                </button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1, gap: '4px' }}>
                  <FileText size={14} /> Print TC Ledger
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
