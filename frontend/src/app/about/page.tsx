'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Shield, Target, Eye, Cpu } from 'lucide-react';

export default function AboutPage() {
  const cards = [
    {
      icon: <Shield size={32} className="text-blue-600" style={{ color: '#2563eb' }} />,
      title: 'Company Overview',
      content: 'Akedex is the next-generation operating environment for educational institutions. Designed as a high-throughput, unified administrative infrastructure, we coordinate core operations, student lifecycles, and financial workflows on a single military-grade operational ledger.'
    },
    {
      icon: <Target size={32} className="text-emerald-600" style={{ color: '#10b981' }} />,
      title: 'Our Mission',
      content: 'To empower school administrators, faculty, and auditors with institutional intelligence tools that eliminate operational latency. We deliver command-center visibility, absolute audit transparency, and seamless student administrative services.'
    },
    {
      icon: <Eye size={32} className="text-amber-600" style={{ color: '#f59e0b' }} />,
      title: 'Our Vision',
      content: 'To serve as the global operating standard for academic administration. By defining the identity and transaction ledger protocols of education, we enable institutions to run error-free, secure, and highly optimized operations.'
    },
    {
      icon: <Cpu size={32} className="text-purple-600" style={{ color: '#8b5cf6' }} />,
      title: 'Product Philosophy',
      content: 'Akedex is built on the principles of the "Bloomberg Terminal for Education." We avoid bloated interfaces, prioritizing information density, rapid hotkey navigation, bulletproof operational ledgers, and responsive design systems.'
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
            Institutional Operations, Engineered.
          </h1>
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#475569',
            fontWeight: 400,
          }}>
            Akedex provides the technology foundation that powers the operating systems of schools. 
            We replace scattered software systems with a unified operation ledger.
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          width: '100%',
          boxSizing: 'border-box',
          marginBottom: '40px'
        }}>
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '32px 24px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{
                marginBottom: '20px',
                padding: '12px',
                background: '#f8fafc',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '12px',
                letterSpacing: '-0.01em',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '14.5px',
                color: '#475569',
                lineHeight: 1.6,
                fontWeight: 400,
                margin: 0,
              }}>
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
