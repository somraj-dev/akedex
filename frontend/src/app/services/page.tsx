'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { 
  GraduationCap, Clock, ClipboardCheck, UserPlus, CreditCard, FolderHeart, LineChart
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <GraduationCap size={28} style={{ color: '#2563eb' }} />,
      title: 'Academic Management',
      color: '#eff6ff',
      description: 'Define syllabus, manage classes, curriculum structure, and automate course scheduling across multiple departments and semesters.'
    },
    {
      icon: <Clock size={28} style={{ color: '#10b981' }} />,
      title: 'Attendance Management',
      color: '#ecfdf5',
      description: 'Biometric and digital attendance logging for students and staff. Direct notifications for unexplained absences and real-time ledger tracking.'
    },
    {
      icon: <ClipboardCheck size={28} style={{ color: '#f59e0b' }} />,
      title: 'Examination System',
      color: '#fffbeb',
      description: 'Design dynamic grade structures, execute exam planning, manage question vaults, evaluation tracking, and generate digital report cards.'
    },
    {
      icon: <UserPlus size={28} style={{ color: '#ef4444' }} />,
      title: 'Admission System',
      color: '#fef2f2',
      description: 'End-to-end applicant tracking. Handles applicant profiles, transfers, verification checks, and wizard-guided onboarding configurations.'
    },
    {
      icon: <CreditCard size={28} style={{ color: '#8b5cf6' }} />,
      title: 'Fee Management',
      color: '#f5f3ff',
      description: 'A unified fee ledger supporting customized structure configuration, online payments, discount allocations, payroll systems, and defaulter tracking.'
    },
    {
      icon: <FolderHeart size={28} style={{ color: '#06b6d4' }} />,
      title: 'Student Records',
      color: '#ecfeff',
      description: 'Centralized repository of student information, profile details, transfers, history log audits, and secure document verification storage.'
    },
    {
      icon: <LineChart size={28} style={{ color: '#f97316' }} />,
      title: 'Analytics & Reporting',
      color: '#fff7ed',
      description: 'Advanced metrics, institutional operational intelligence reports, demographic charts, financial forecasting, and active security audit logs.'
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
            Unified Capabilities & Infrastructure
          </h1>
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#475569',
            fontWeight: 400,
          }}>
            Akedex structures educational complexity into seven highly integrated modules. Each module
            shares a single security and data ledger for total coordination.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          width: '100%',
          boxSizing: 'border-box',
          marginBottom: '40px'
        }}>
          {services.map((service, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '28px',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -2px rgba(0,0,0,0.03)',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.boxShadow = '0 12px 20px -8px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -2px rgba(0,0,0,0.03)';
              }}
            >
              {/* Icon Container with dynamic color tint background */}
              <div style={{
                background: service.color,
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {service.icon}
              </div>

              {/* Text content */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#475569',
                  lineHeight: 1.55,
                  fontWeight: 400,
                  margin: 0,
                }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
