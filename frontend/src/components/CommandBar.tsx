'use client';

import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard, Users, GraduationCap, ArrowRightLeft,
  FolderCheck, ClipboardList, FileText, CalendarCheck,
  Building2, Search, Settings, Shield, Plus, UserPlus,
} from 'lucide-react';

export default function CommandBar() {
  const { commandBarOpen, toggleCommandBar, openTab } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandBar();
      }
      if (e.key === 'Escape' && commandBarOpen) {
        toggleCommandBar();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [commandBarOpen, toggleCommandBar]);

  if (!commandBarOpen) return null;

  const navigate = (view: string, label: string) => {
    openTab({ id: view, label, view: view as any, closable: view !== 'dashboard' });
    toggleCommandBar();
  };

  return (
    <>
      <style>{`
        /* Overlay backdrop */
        .cmdk-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(4px);
          z-index: 1000;
          animation: cmdk-fade-in 150ms ease-out;
        }

        /* Center dialog */
        .cmdk-dialog {
          position: fixed;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 540px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
          z-index: 1001;
          overflow: hidden;
          animation: cmdk-slide-up 200ms cubic-bezier(0.16, 1, 0.3, 1);
          font-family: var(--font-sans);
        }

        /* Root CMDK container */
        [cmdk-root] {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* Search Input container */
        .cmdk-input-wrapper {
          display: flex;
          align-items: center;
          padding: 0 16px;
          border-bottom: 1px solid var(--border-primary);
          gap: 12px;
          background: var(--bg-secondary);
        }

        /* Search input field */
        [cmdk-input] {
          width: 100%;
          height: 48px;
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          color: var(--text-primary);
          font-family: var(--font-sans);
        }
        [cmdk-input]::placeholder {
          color: var(--text-muted);
        }

        /* Results list container */
        [cmdk-list] {
          max-height: 330px;
          overflow-y: auto;
          padding: 8px;
          background: var(--bg-secondary);
        }

        /* Empty state */
        [cmdk-empty] {
          padding: 16px;
          text-align: center;
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Group headings */
        [cmdk-group-heading] {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 8px 12px 4px 12px;
        }

        /* Individual search items */
        [cmdk-item] {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          user-select: none;
          transition: all 100ms ease;
        }

        /* Item content layout */
        [cmdk-item] svg {
          color: var(--text-muted);
          flex-shrink: 0;
          transition: color 100ms ease;
        }

        /* Active/Selected item */
        [cmdk-item][aria-selected="true"] {
          background: var(--bg-hover);
          color: var(--accent-blue);
        }

        [cmdk-item][aria-selected="true"] svg {
          color: var(--accent-blue);
        }

        /* Keyframes */
        @keyframes cmdk-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes cmdk-slide-up {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>

      <div
        className="cmdk-overlay"
        onClick={toggleCommandBar}
      />
      <div className="cmdk-dialog">
        <Command>
          <div className="cmdk-input-wrapper">
            <Search size={18} style={{ color: 'var(--text-muted)' }} />
            <Command.Input placeholder="Search students, cases, commands..." autoFocus />
          </div>
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Navigation">
              <Command.Item onSelect={() => navigate('dashboard', 'Operations Dashboard')}>
                <LayoutDashboard size={16} />
                <span>Operations Dashboard</span>
              </Command.Item>
              <Command.Item onSelect={() => navigate('students', 'Students')}>
                <Users size={16} />
                <span>Student Explorer</span>
              </Command.Item>
              <Command.Item onSelect={() => navigate('teachers', 'Teachers')}>
                <GraduationCap size={16} />
                <span>Teacher Directory</span>
              </Command.Item>
              <Command.Item onSelect={() => navigate('admissions', 'Admissions')}>
                <ClipboardList size={16} />
                <span>Admissions Queue</span>
              </Command.Item>
              <Command.Item onSelect={() => navigate('transfers', 'Transfers')}>
                <ArrowRightLeft size={16} />
                <span>Transfer Cases</span>
              </Command.Item>
              <Command.Item onSelect={() => navigate('cases', 'Cases')}>
                <FolderCheck size={16} />
                <span>Case Management</span>
              </Command.Item>
              <Command.Item onSelect={() => navigate('documents', 'Documents')}>
                <FileText size={16} />
                <span>Documents</span>
              </Command.Item>
              <Command.Item onSelect={() => navigate('attendance', 'Attendance')}>
                <CalendarCheck size={16} />
                <span>Attendance</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions">
              <Command.Item onSelect={() => { navigate('admissions', 'New Admission'); }}>
                <UserPlus size={16} />
                <span>New Admission Application</span>
              </Command.Item>
              <Command.Item onSelect={() => { navigate('cases', 'New Case'); }}>
                <Plus size={16} />
                <span>Create New Case</span>
              </Command.Item>
              <Command.Item onSelect={() => { navigate('students', 'Register Student'); }}>
                <Plus size={16} />
                <span>Register New Student</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Administration">
              <Command.Item onSelect={() => navigate('institution', 'Institution')}>
                <Building2 size={16} />
                <span>Institution Settings</span>
              </Command.Item>
              <Command.Item onSelect={() => navigate('audit', 'Audit Log')}>
                <Shield size={16} />
                <span>Audit Log</span>
              </Command.Item>
              <Command.Item onSelect={() => navigate('settings', 'Settings')}>
                <Settings size={16} />
                <span>System Settings</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </>
  );
}
