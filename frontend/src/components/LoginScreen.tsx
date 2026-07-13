'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function LoginScreen() {
  const { login } = useAppStore();
  const [selectedUser, setSelectedUser] = useState('Select User...');
  const [password, setPassword] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('PRODX');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and proceed to dashboard
    login({
      id: 'usr-admin-01',
      name: selectedUser === 'Select User...' ? 'Administrator' : selectedUser,
      role: 'ADMIN',
      email: 'admin@acadex.com',
      institution: 'Delhi Public School'
    } as any);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#005a84', // Matching the solid deep teal background
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {/* Top Left Logo Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '15px',
        fontWeight: 'bold',
      }}>
        {/* Simple inline SVG Globe logo matching the screenshot */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>Acadex</span>
      </div>

      {/* Main Login Card in Center */}
      <div style={{
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '320px',
        marginTop: '-40px'
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 500,
          color: '#8faab5', // Exact slate grey title color from screenshot
          marginBottom: '28px',
          textAlign: 'center',
          letterSpacing: '0.5px'
        }}>
          Acadex Environment™
        </h1>

        {/* Form Container */}
        <form onSubmit={handleLoginSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>User Name :</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={{
                width: '100%',
                height: '24px',
                padding: '0 4px',
                fontSize: '11px',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '1px solid #7f9db9',
                outline: 'none',
                borderRadius: '0px'
              }}
            >
              <option>Select User...</option>
              <option value="Administrator">Administrator</option>
              <option value="Operator">Operator</option>
              <option value="Staff">Staff Member</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: '24px',
                padding: '0 6px',
                fontSize: '11px',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '1px solid #7f9db9',
                outline: 'none',
                borderRadius: '0px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>Domain :</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              style={{
                width: '100%',
                height: '24px',
                padding: '0 4px',
                fontSize: '11px',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '1px solid #7f9db9',
                outline: 'none',
                borderRadius: '0px'
              }}
            >
              <option value="PRODX">PRODX</option>
              <option value="TESTX">TESTX</option>
              <option value="DEVX">DEVX</option>
            </select>
          </div>

          {/* Action Buttons styled in classic Windows/Oracle format */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '16px'
          }}>
            <button
              type="submit"
              style={{
                width: '74px',
                height: '22px',
                backgroundColor: '#d4d0c8', // Classic grey button color
                color: '#000000',
                border: '1px solid #808080',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
              }}
            >
              OK
            </button>
            <button
              type="button"
              style={{
                width: '74px',
                height: '22px',
                backgroundColor: '#d4d0c8',
                color: '#000000',
                border: '1px solid #808080',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Footer License & Muted Information */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '9.5px',
        lineHeight: '13px',
        color: '#b0c4de',
        maxWidth: '700px'
      }}>
        <span style={{ fontSize: '11.5px', fontWeight: 'bold', color: '#ffffff', marginBottom: '4px' }}>Operating Environment</span>
        <span>© 2026 Acadex Corporation. All rights reserved.</span>
        <span>Access and use of this solution system (including components thereof) require, and are governed by, license(s) from Acadex Corporation.</span>
        <span style={{ marginTop: '2px' }}>Unauthorized use, access, reproduction, display or distribution of any portion of this solution or the data contained therein may result in severe civil damages and criminal penalties. Further information may be found in Help About.</span>
      </div>
    </div>
  );
}
