'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export default function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab, openTab, showToast } = useAppStore();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    tabId: string;
  } | null>(null);

  // Close context menu on outside click
  useEffect(() => {
    const handleOutsideClick = () => {
      setContextMenu(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleContextMenu = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tabId,
    });
  };

  // Context Menu Core Actions
  const handleReload = (tabId: string) => {
    const target = tabs.find(t => t.id === tabId);
    if (target) {
      showToast(`Reloading tab "${target.label}"...`, 'info');
    }
  };

  const handleDuplicate = (tabId: string) => {
    const target = tabs.find(t => t.id === tabId);
    if (target) {
      const newId = `${target.id}-dup-${Date.now()}`;
      openTab({
        ...target,
        id: newId,
        label: `${target.label} (Copy)`,
        closable: true,
      });
      showToast(`Duplicated tab "${target.label}"`, 'success');
    }
  };

  const handleClose = (tabId: string) => {
    const target = tabs.find(t => t.id === tabId);
    if (target && target.closable !== false) {
      closeTab(tabId);
    } else {
      showToast('This tab cannot be closed.', 'error');
    }
  };

  const handleCloseOthers = (tabId: string) => {
    // Keep only the selected tab and non-closable tabs (e.g. dashboard)
    const newTabs = tabs.filter(t => t.id === tabId || t.closable === false);
    useAppStore.setState({ tabs: newTabs, activeTabId: tabId });
    showToast('Closed all other tabs', 'info');
  };

  const handleCloseToRight = (tabId: string) => {
    const index = tabs.findIndex(t => t.id === tabId);
    if (index !== -1) {
      const newTabs = tabs.filter((t, idx) => idx <= index || t.closable === false);
      useAppStore.setState({ tabs: newTabs });
      if (!newTabs.some(t => t.id === activeTabId)) {
        setActiveTab(tabId);
      }
      showToast('Closed tabs to the right', 'info');
    }
  };

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
      position: 'relative',
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
            onContextMenu={(e) => handleContextMenu(e, tab.id)}
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

      {/* Chrome-style Bright Context Menu */}
      {contextMenu && (
        <div style={{
          position: 'fixed',
          top: `${contextMenu.y}px`,
          left: `${contextMenu.x}px`,
          width: '240px',
          backgroundColor: '#ffffff', // Bright white context menu background
          border: '1px solid #cbd5e1', // Light grey border
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          borderRadius: '6px',
          padding: '4px 0',
          zIndex: 99999,
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          fontSize: '12px',
          color: '#1e293b', // Dark slate text
        }}>
          {/* Section 1: Window Management */}
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => showToast('Opened new tab to the right', 'info')}>
            <span>New tab to the right</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => showToast('Split view activated', 'info')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📑 New split view with current tab</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => showToast('Added tab to group', 'info')}>
            <span>Add tab to new group</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => showToast('Moved tab to new window', 'info')}>
            <span>Move tab to new window</span>
          </div>

          <hr style={dividerStyle} />

          {/* Section 2: Tab Actions */}
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => handleReload(contextMenu.tabId)}>
            <span>Reload</span>
            <span style={shortcutStyle}>Ctrl+R</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => handleDuplicate(contextMenu.tabId)}>
            <span>Duplicate</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => showToast('Tab pinned', 'success')}>
            <span>Pin</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => showToast('Muted site audio', 'info')}>
            <span>Mute site</span>
          </div>

          <hr style={dividerStyle} />

          {/* Section 3: Extra Lists */}
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => showToast('Added to reading list', 'success')}>
            <span>📖 Add tab to reading list</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => showToast('Shared tab content', 'info')}>
            <span>Share tab with Gemini</span>
            <span style={shortcutStyle}>&gt;</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => showToast('Sending tab payload...', 'info')}>
            <span>💻 Send to your devices</span>
          </div>

          <hr style={dividerStyle} />

          {/* Section 4: Close Operations */}
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => handleClose(contextMenu.tabId)}>
            <span>Close</span>
            <span style={shortcutStyle}>Ctrl+W</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => handleCloseOthers(contextMenu.tabId)}>
            <span>Close other tabs</span>
          </div>
          <div className="chrome-context-menu-item" style={menuItemStyle} onClick={() => handleCloseToRight(contextMenu.tabId)}>
            <span>Close tabs to the right</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Context Menu Inline Styles
const menuItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 16px',
  cursor: 'pointer',
  transition: 'background-color 0.1s ease',
};

const shortcutStyle: React.CSSProperties = {
  color: '#718096',
  fontSize: '11px',
};

const dividerStyle: React.CSSProperties = {
  border: 'none',
  borderBottom: '1px solid #e2e8f0', // Light divider color
  margin: '4px 0',
};

// Add mouse hover dynamic color injection for bright menu
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .chrome-context-menu-item:hover {
      background-color: #f1f5f9 !important;
    }
  `;
  document.head.appendChild(styleEl);
}
