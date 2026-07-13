'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';

export default function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useAppStore();

  return (
    <div style={{
      height: '34px',
      backgroundColor: '#c4d4e3', // Matches the exact light blue-gray background of the container in the image
      borderBottom: '1px solid #7a92a9', // Soft steel border line
      display: 'flex',
      alignItems: 'flex-end',
      paddingLeft: '16px',
      paddingRight: '16px',
      gap: '5px',
      userSelect: 'none',
      overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      <style>{`
        /* Hide scrollbar */
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              height: isActive ? '28px' : '26px', // Active tab is slightly taller
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingLeft: '14px',
              paddingRight: '14px',
              backgroundColor: isActive ? '#ffffff' : '#a2b9d0', // Inactive is darker blue-gray, Active is pure white
              color: isActive ? '#334e68' : '#526e8d', // Color styling matching the reference image
              border: '1px solid #7a92a9',
              borderBottom: isActive ? '1px solid #ffffff' : '1px solid #7a92a9',
              borderRadius: '6px 6px 0 0', // Rounded top corners
              fontSize: '11px',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              fontWeight: isActive ? 'bold' : 'normal',
              cursor: 'pointer',
              position: 'relative',
              zIndex: isActive ? 2 : 1,
              transform: isActive ? 'translateY(1px)' : 'none',
              maxWidth: '240px',
              minWidth: '100px',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = '#b2c8de';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = '#a2b9d0';
              }
            }}
          >
            <span style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              flex: 1 
            }}>
              {tab.label}
            </span>
            {tab.closable !== false && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                style={{
                  color: '#7a92a9',
                  fontSize: '12px',
                  fontWeight: 'normal',
                  lineHeight: '1',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                  e.currentTarget.style.color = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#7a92a9';
                }}
              >
                ×
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
