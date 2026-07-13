'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { X } from 'lucide-react';

export default function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useAppStore();

  return (
    <div style={{
      height: '32px',
      backgroundColor: '#d0dbe5', // Retro gray-blue tab bar background
      borderBottom: '1px solid #94a3b8',
      display: 'flex',
      alignItems: 'flex-end',
      paddingLeft: '12px',
      paddingRight: '12px',
      gap: '4px',
      userSelect: 'none',
      overflowX: 'auto',
      scrollbarWidth: 'none', // Hide default scrollbars
    }}>
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .tab-bar-container::-webkit-scrollbar {
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
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingLeft: '12px',
              paddingRight: '12px',
              backgroundColor: isActive ? '#ffffff' : '#b0c4de', // Active is white, inactive is steel blue
              color: isActive ? '#0f2c59' : '#334155', // Active is deep navy, inactive is slate
              border: '1px solid #94a3b8',
              borderBottom: isActive ? '1px solid #ffffff' : '1px solid #94a3b8',
              borderRadius: '4px 4px 0 0',
              fontSize: '11px',
              fontWeight: isActive ? 'bold' : 'normal',
              cursor: 'pointer',
              position: 'relative',
              zIndex: isActive ? 2 : 1,
              transform: isActive ? 'translateY(1px)' : 'none',
              maxWidth: '180px',
              minWidth: '80px',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = '#c5d3e8';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = '#b0c4de';
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? '#94a3b8' : '#778899',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px',
                  borderRadius: '50%',
                  transition: 'background-color 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffcccb';
                  e.currentTarget.style.color = '#ff0000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isActive ? '#94a3b8' : '#778899';
                }}
              >
                <X size={10} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
