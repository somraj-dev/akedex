'use client';

import React from 'react';
import { Check, Globe, UserPlus, ArrowRightLeft } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function NewAdmissionFlow() {
  const openTab = useAppStore(s => s.openTab);

  const handleStartFresh = () => {
    openTab({ id: 'fresh-admission', label: 'Fresh Admission', view: 'fresh-admission' });
  };

  const handleStartTransfer = () => {
    openTab({ id: 'transfer-admission-wizard', label: 'Transfer Admission', view: 'transfer-admission-wizard' });
  };

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden'
    }}>
      
      {/* Left Column - Marketing / Info */}
      <div style={{
        flex: 1,
        padding: '40px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.1) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(168, 85, 247, 0.05) 0%, transparent 50%)'
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            backgroundColor: 'rgba(139, 92, 246, 0.05)',
            color: 'var(--accent-purple)',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '24px'
          }}>
            Admission Portal
          </div>
          
          <h1 style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Seamless Onboarding with AcadEx
          </h1>
          
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Choose the right enrollment path for the incoming student:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Check size={20} style={{ color: 'var(--accent-purple)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Fresh Admission:</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5 }}>
                  Standard enrollment for new students. Generates a fresh AcadEx Universal Identity (UTI) and provisions cloud storage.
                </span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Check size={20} style={{ color: 'var(--accent-purple)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Ecosystem Transfer:</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5 }}>
                  Seamlessly port academic records, fee history, and behavioral logs directly from another AcadEx-powered institution.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Selection */}
      <div style={{
        flex: 1.2,
        backgroundColor: 'var(--bg-secondary)',
        padding: '40px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderLeft: '1px solid var(--border-primary)'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Start by choosing an admission type
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
            Your admission type determines the workflow and data requirements for enrollment. 
            <span style={{ color: 'var(--accent-blue)', cursor: 'pointer', marginLeft: '4px' }}>Learn more about admission types.</span>
          </p>

          {/* Card 1: Fresh Admission */}
          <div style={{
            border: '1px solid var(--border-primary)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: 'var(--bg-primary)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-tertiary)',
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '12px',
                display: 'inline-block'
              }}>
                Recommended for new students
              </div>
              <UserPlus size={20} color="var(--text-tertiary)" />
            </div>
            
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Fresh Admission
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
              For entirely new enrollments. This will initiate the standard multi-step onboarding wizard.
            </p>
            
            <button 
              onClick={handleStartFresh}
              style={{
                backgroundColor: 'var(--accent-green)',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'filter 0.2s, transform 0.2s',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = 'brightness(1.05)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start with fresh admission
            </button>
          </div>

          {/* Card 2: Ecosystem Transfer */}
          <div style={{
            border: '1px solid var(--border-primary)',
            borderRadius: '8px',
            padding: '24px',
            backgroundColor: 'var(--bg-primary)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-tertiary)',
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '12px',
                display: 'inline-block'
              }}>
                Recommended for ecosystem transfers
              </div>
              <ArrowRightLeft size={20} color="var(--text-tertiary)" />
            </div>
            
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Transfer Admission
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
              For students transferring from another institution using AcadEx. Requires their Universal Transfer ID (UTI).
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, marginBottom: '16px' }}>
              <Globe size={14} color="var(--text-tertiary)" />
              Fetch records across the global ecosystem
            </div>

            <button 
              onClick={handleStartTransfer}
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-primary)',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s, border-color 0.2s, transform 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#e2e8f0'; // Slightly darker for light theme hover
                e.currentTarget.style.borderColor = 'var(--text-tertiary)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start with transfer admission
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
}
