'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Shield, Sparkles, Building2, Milestone, ArrowUpRight } from 'lucide-react';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState(0);

  const caseStudies = [
    {
      institution: 'Somraj Development Institute',
      type: 'Multi-campus Academy consolidation',
      statLabel: 'Operational Efficiency Increase',
      statVal: '+42%',
      highlights: [
        'Consolidated 6 separate school environments into one global database ledger.',
        'Unified fee ledger tracking across 8,500 active students.',
        'Customized examinations with auto-generated state-board-compliant report cards.',
        'Role-based dashboard systems for administrators, teachers, and auditing teams.'
      ]
    },
    {
      institution: 'Royal International School',
      type: 'Primary & Secondary Education System',
      statLabel: 'Administration Time Reduction',
      statVal: '-65%',
      highlights: [
        'Integrated real-time biometric and digital RFID attendance logger protocols.',
        'Created fresh admission flow automated wizards to replace offline paperwork.',
        'Automated parent fee collections and dynamic fee discount allocations.',
        'Secured document verification repositories using military-grade encryption.'
      ]
    },
    {
      institution: 'Metro Tech Technical College',
      type: 'Higher Education operational intelligence',
      statLabel: 'Grading processing speedup',
      statVal: '3.5x',
      highlights: [
        'Deployed examinations module question vaults for 250+ courses.',
        'Real-time exam hall seating plan algorithms and invigilator coordination.',
        'Automated marks entry processing and gradebook transcription verification.',
        'Consolidated financial billing audits directly to institution accounting ledger.'
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Reusable Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '80px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        {/* Header Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          maxWidth: '800px',
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#0f172a',
            marginBottom: '16px',
          }}>
            Deployments & Case Studies
          </h1>
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#475569',
            fontWeight: 400,
          }}>
            See how leading academies and institutions utilize Akedex to streamline their administrative, 
            academic, and financial operations.
          </p>
        </div>

        {/* Interactive Showcase Tabs */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          {/* Tab Selector */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '12px',
            gap: '4px',
            marginBottom: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {caseStudies.map((study, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activeTab === idx ? '#ffffff' : 'transparent',
                  color: activeTab === idx ? '#0f172a' : '#64748b',
                  boxShadow: activeTab === idx ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {study.institution}
              </button>
            ))}
          </div>

          {/* Active Case Study Detail Card */}
          <div style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '24px',
            padding: '40px',
            boxSizing: 'border-box',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02), 0 4px 6px -4px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Case Study Summary */}
            <div style={{
              flex: '1 1 450px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#2563eb',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px'
              }}>
                {caseStudies[activeTab].type}
              </span>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 800,
                color: '#0f172a',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
              }}>
                {caseStudies[activeTab].institution}
              </h2>
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: 0,
                margin: '0 0 24px 0',
                listStyleType: 'none'
              }}>
                {caseStudies[activeTab].highlights.map((highlight, hIdx) => (
                  <li 
                    key={hIdx}
                    style={{
                      fontSize: '14.5px',
                      color: '#475569',
                      lineHeight: 1.5,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}
                  >
                    <span style={{ color: '#2563eb', fontWeight: 'bold', marginTop: '2px' }}>✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case Study Metric Card */}
            <div style={{
              flex: '1 1 300px',
              background: '#f8fafc',
              border: '1px solid #f1f5f9',
              borderRadius: '20px',
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxSizing: 'border-box'
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#64748b',
                marginBottom: '12px'
              }}>
                {caseStudies[activeTab].statLabel}
              </span>
              <span style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#2563eb',
                letterSpacing: '-0.03em',
                lineHeight: 1
              }}>
                {caseStudies[activeTab].statVal}
              </span>
              <div style={{
                marginTop: '20px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Verified Deployment <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Styled Visual Mockup Section */}
        <div style={{
          width: '100%',
          marginTop: '40px',
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '24px',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            Operating Dashboard Interface Preview
          </h2>

          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Mocked Window Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '16px'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>akedex-ledger-terminal // dashboard</span>
              <div style={{ width: '40px' }} />
            </div>

            {/* Mocked Grid Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Active Enrollment</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>6,242</div>
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 500, marginTop: '2px' }}>+4.8% from last term</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Daily Attendance</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>98.42%</div>
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 500, marginTop: '2px' }}>Within optimal threshold</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Outstanding Fees</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>₹2,42,800</div>
                <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 500, marginTop: '2px' }}>8 defaulters flagged</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>System Latency</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>12ms</div>
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 500, marginTop: '2px' }}>Server status normal</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
