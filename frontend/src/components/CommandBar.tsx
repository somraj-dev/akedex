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
      <div
        cmdk-overlay=""
        onClick={toggleCommandBar}
      />
      <div cmdk-dialog="">
        <Command>
          <Command.Input placeholder="Search students, cases, commands..." autoFocus />
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
