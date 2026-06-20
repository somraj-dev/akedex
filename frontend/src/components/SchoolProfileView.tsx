'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { 
  Search, Award, FileText, CheckCircle2, AlertTriangle, 
  Calendar, Check, UserCheck, Shield, Key, HelpCircle, Building,
  BookOpen, Layers, FileSpreadsheet, Clock, Clipboard, BookMarked,
  MessageSquare, DollarSign, BarChart3, Send, Download, RefreshCw,
  LogOut, Trash2, Plus, Minus, Phone, Link, Mail, MoreHorizontal, Edit,
  Copy, MapPin, Printer, ArrowUpRight, Briefcase, GraduationCap, User, ChevronDown, ChevronUp, X, TrendingUp, ArrowLeft,
  Bell, TrendingDown, Users, Brain, CreditCard
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip
} from 'recharts';

export default function SchoolProfileView() {
  const { openTab, institutionInfo } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditInstitute = () => {
    openTab({
      id: 'edit-institute',
      label: 'Edit Institute',
      view: 'edit-institute',
      closable: true
    });
  };
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [growthTimeframe, setGrowthTimeframe] = useState('This Year');

  // KPI Metrics data with exact mockup styling
  const metrics = [
    { label: 'Total Students', value: '1,250', change: '8.5% this month', icon: <Users size={16} />, bg: '#f5f3ff', color: '#6366f1' },
    { label: 'Total Teachers', value: '85', change: '5.2% this month', icon: <GraduationCap size={16} />, bg: '#ecfdf5', color: '#10b981' },
    { label: 'Total Courses', value: '48', change: '3.1% this month', icon: <BookOpen size={16} />, bg: '#fffbeb', color: '#f59e0b' },
    { label: 'Total Batches', value: '32', change: '6.7% this month', icon: <Layers size={16} />, bg: '#eff6ff', color: '#3b82f6' },
    { label: 'Overall Attendance', value: '96%', change: '2.4% this month', icon: <UserCheck size={16} />, bg: '#fdf2f8', color: '#ec4899' }
  ];

  // Student Growth Line Chart Data (Mockup curve shape)
  const studentGrowthData = [
    { month: 'Jan', students: 300 },
    { month: 'Feb', students: 480 },
    { month: 'Mar', students: 510 },
    { month: 'Apr', students: 540 },
    { month: 'May', students: 580 },
    { month: 'Jun', students: 640 },
    { month: 'Jul', students: 780 },
    { month: 'Aug', students: 1180 },
    { month: 'Sep', students: 1200 },
    { month: 'Oct', students: 1160 },
    { month: 'Nov', students: 1225 },
    { month: 'Dec', students: 1250 }
  ];

  // Top Performing Students
  const topStudents = [
    { rank: 1, name: 'Aarav Sharma', class: 'Class 10 - A', score: '', avatar: 'AS', color: '#d97706', bg: '#fef3c7' },
    { rank: 2, name: 'Diya Patel', class: 'Class 9 - B', score: '97.8%', avatar: 'DP', color: '#4b5563', bg: '#f3f4f6' },
    { rank: 3, name: 'Rohan Mehta', class: 'Class 10 - B', score: '96.9%', avatar: 'RM', color: '#ea580c', bg: '#ffedd5' },
    { rank: 4, name: 'Ananya Singh', class: 'Class 9 - A', score: '96.2%', avatar: 'AS', color: '#4b5563', bg: '#f3f4f6' },
    { rank: 5, name: 'Vihaan Gupta', class: 'Class 8 - A', score: '95.7%', avatar: 'VG', color: '#4b5563', bg: '#f3f4f6' }
  ];

  // Pie/Donut Chart 1: Students by Class
  const classDistribution = [
    { name: 'Class 6', value: 180, percent: '14.4%', color: '#6366f1' },
    { name: 'Class 7', value: 190, percent: '15.2%', color: '#3b82f6' },
    { name: 'Class 8', value: 210, percent: '16.8%', color: '#06b6d4' },
    { name: 'Class 9', value: 230, percent: '18.4%', color: '#10b981' },
    { name: 'Class 10', value: 240, percent: '19.2%', color: '#f59e0b' },
    { name: 'Class 11', value: 100, percent: '8.0%', color: '#1e4ed8' },
    { name: 'Class 12', value: 100, percent: '8.0%', color: '#ec4899' }
  ];

  // Pie/Donut Chart 2: Gender Distribution
  const genderDistribution = [
    { name: 'Boys', value: 650, percent: '52%', color: '#3b82f6' },
    { name: 'Girls', value: 600, percent: '48%', color: '#ec4899' }
  ];

  // Pie/Donut Chart 3: Attendance Overview
  const attendanceDistribution = [
    { name: 'Present', value: 1200, percent: '96%', color: '#10b981' },
    { name: 'Absent', value: 40, percent: '3.2%', color: '#ef4444' },
    { name: 'Late', value: 10, percent: '0.8%', color: '#f59e0b' }
  ];

  // Academics Stats
  const academicsSummary = [
    { label: 'Courses', value: '48', icon: <BookOpen size={14} />, color: '#ef4444', bg: '#fee2e2' },
    { label: 'Batches', value: '32', icon: <Layers size={14} />, color: '#8b5cf6', bg: '#f3e8ff' },
    { label: 'Subjects', value: '120', icon: <BookMarked size={14} />, color: '#3b82f6', bg: '#dbeafe' },
    { label: 'Exams Conducted', value: '18', icon: <FileText size={14} />, color: '#ec4899', bg: '#fce7f3' }
  ];

  // Exam Performance Bar Chart Data
  const examPerformanceData = [
    { subject: 'English', score: 88, color: '#6366f1' },
    { subject: 'Mathematics', score: 91, color: '#06b6d4' },
    { subject: 'Science', score: 87, color: '#10b981' },
    { subject: 'Social Science', score: 85, color: '#3b82f6' },
    { subject: 'Computer', score: 93, color: '#4f46e5' },
    { subject: 'Hindi', score: 82, color: '#8b5cf6' }
  ];

  // Recent Activity Feed
  const recentActivities = [
    { id: 1, text: 'New admission: Riya Nair in Class 6 - B', time: '2 hours ago', icon: <User size={12} />, color: '#ef4444', bg: '#fee2e2' },
    { id: 2, text: 'Exam result published for Class 10 - A (Unit Test 2)', time: '5 hours ago', icon: <Award size={12} />, color: '#10b981', bg: '#d1fae5' },
    { id: 3, text: 'Fee payment received from Aarav Sharma', time: 'Today, 10:30 AM', icon: <DollarSign size={12} />, color: '#6366f1', bg: '#e0e7ff' },
    { id: 4, text: 'Teacher appointed: Ms. Priya Verma (Science)', time: 'Yesterday, 4:15 PM', icon: <Briefcase size={12} />, color: '#f59e0b', bg: '#fef3c7' },
    { id: 5, text: 'Holiday announced on 15th June 2024', time: 'Yesterday, 11:45 AM', icon: <Calendar size={12} />, color: '#10b981', bg: '#d1fae5' }
  ];

  // Upcoming Events Feed
  const upcomingEvents = [
    { id: 1, month: 'JUN', day: '15', title: 'Parent Teacher Meeting', desc: 'Saturday, 10:00 AM', color: '#ef4444', bg: '#fee2e2' },
    { id: 2, month: 'JUN', day: '20', title: 'Science Exhibition', desc: 'Thursday, 09:00 AM', color: '#3b82f6', bg: '#dbeafe' },
    { id: 3, month: 'JUN', day: '25', title: 'Unit Test - 3 (Class 6 - 10)', desc: 'Tuesday, 09:00 AM', color: '#3b82f6', bg: '#dbeafe' },
    { id: 4, month: 'JUN', day: '30', title: 'Monthly PTM', desc: 'Sunday, 10:00 AM', color: '#3b82f6', bg: '#dbeafe' }
  ];

  // Student Directory Records
  const initialStudentList = [
    { id: '1', name: 'Aarav Sharma', admissionNo: 'FLS/2024/001', class: '10', batch: 'A', dob: '12 Jan 2009', gender: 'Male', contact: '+91 98765 11111', parent: 'Mr. Rajesh Sharma', status: 'Active' },
    { id: '2', name: 'Diya Patel', admissionNo: 'FLS/2024/002', class: '9', batch: 'B', dob: '23 Feb 2010', gender: 'Female', contact: '+91 98765 22222', parent: 'Mr. Amit Patel', status: 'Active' },
    { id: '3', name: 'Rohan Mehta', admissionNo: 'FLS/2024/003', class: '10', batch: 'B', dob: '05 Mar 2009', gender: 'Male', contact: '+91 98765 33333', parent: 'Mr. Suresh Mehta', status: 'Active' },
    { id: '4', name: 'Ananya Singh', admissionNo: 'FLS/2024/004', class: '9', batch: 'A', dob: '17 Aug 2010', gender: 'Female', contact: '+91 98765 44444', parent: 'Mr. Vikram Singh', status: 'Active' }
  ];

  // Dynamic filter logic
  const filteredStudents = initialStudentList.filter(student => {
    const matchSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.parent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchClass = selectedClass === 'All' || student.class === selectedClass;
    const matchBatch = selectedBatch === 'All' || student.batch === selectedBatch;
    const matchStatus = selectedStatus === 'All' || student.status === selectedStatus;

    return matchSearch && matchClass && matchBatch && matchStatus;
  });

  const handleStudentClick = (studentId: string, studentName: string) => {
    openTab({
      id: `student-profile-${studentId}`,
      label: `Profile — ${studentName}`,
      view: 'student-profile',
      closable: true
    });
  };

  const handleQuickLink = (action: string) => {
    switch (action) {
      case 'student':
        openTab({ id: 'new-admission', label: 'New Admission', view: 'new-admission-flow', closable: true });
        break;
      case 'teacher':
        openTab({ id: 'teachers', label: 'Teachers View', view: 'teachers', closable: true });
        break;
      case 'batch':
        openTab({ id: 'classes', label: 'Classes & Batches', view: 'classes', closable: true });
        break;
      case 'course':
        openTab({ id: 'courses', label: 'Courses Registry', view: 'courses', closable: true });
        break;
      case 'attendance':
        openTab({ id: 'attendance', label: 'Attendance Hub', view: 'attendance', closable: true });
        break;
      case 'fee':
        openTab({ id: 'collect-fees', label: 'Collect Fees', view: 'collect-fees-flow', closable: true });
        break;
      case 'report':
        openTab({ id: 'reports', label: 'Reports & Data', view: 'reports', closable: true });
        break;
      case 'notification':
        openTab({ id: 'communication', label: 'Communications', view: 'communication', closable: true });
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f8fafc', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'system-ui, sans-serif', color: '#1e293b' }}>
      
      {/* 1. INSTITUTION PROFILE HEADER SECTION */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        gap: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.015)'
      }}>
        {/* Content (Left & Center) */}
        <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
          {/* Logo block */}
          {/* Logo block */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              boxSizing: 'border-box'
            }}>
              <div style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '1px', lineHeight: '1.1', textAlign: 'center' }}>
                <span style={{ color: '#ff4d4d' }}>{institutionInfo.logoText1}</span>{' '}
                <span style={{ color: '#4f46e5' }}>{institutionInfo.logoText2}</span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#059669', letterSpacing: '1.5px', marginTop: '2px', lineHeight: '1.1', textAlign: 'center' }}>
                {institutionInfo.logoText3}
              </div>
              <div style={{ fontSize: '7px', fontWeight: 800, color: '#1e293b', letterSpacing: '2px', marginTop: '6px' }}>
                • {institutionInfo.logoTextSub} •
              </div>
            </div>
            
            {/* Verified Badge */}
            {institutionInfo.verified && (
              <span style={{ 
                background: '#f3e8ff', 
                color: '#6d28d9', 
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '12px',
                border: '1px solid #d8b4fe'
              }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#7c3aed',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '7px',
                  fontWeight: 900
                }}>✓</span> Verified
              </span>
            )}
          </div>

          {/* Details block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#000000', margin: 0 }}>{institutionInfo.name}</h1>
              <Edit size={12} style={{ color: '#64748b', cursor: 'pointer' }} onClick={handleEditInstitute} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
              <span>{institutionInfo.affiliationBoard}</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span>Affiliation No. {institutionInfo.affiliationNo}</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span>School Code {institutionInfo.schoolCode}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              <MapPin size={12} style={{ color: '#64748b' }} /> {institutionInfo.address}
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '11px', color: '#64748b', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={12} style={{ color: '#64748b' }} /> {institutionInfo.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={12} style={{ color: '#64748b' }} /> {institutionInfo.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Link size={12} style={{ color: '#64748b' }} /> {institutionInfo.website}
              </div>
            </div>

            <div style={{ fontSize: '11px', fontStyle: 'italic', color: '#94a3b8', marginTop: '6px' }}>
              "{institutionInfo.slogan}"
            </div>
          </div>
        </div>

        {/* Illustration & Buttons (Right side) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: '320px' }}>
          {/* Buttons Container */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn" 
              onClick={handleEditInstitute}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#6366f1', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              <Edit size={12} /> Edit Institute
            </button>
            <button 
              className="btn" 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              Actions <ChevronDown size={12} />
            </button>
          </div>

          {/* Illustration image container */}
          {institutionInfo.bannerUrl && (
            <div style={{ 
              width: '320px', 
              height: '90px', 
              backgroundImage: `url("${institutionInfo.bannerUrl}")`,
              backgroundSize: 'contain',
              backgroundPosition: 'right bottom',
              backgroundRepeat: 'no-repeat',
              marginTop: '10px'
            }} />
          )}
        </div>

      </div>

      {/* 2. STATS ROW (KPI CARDS) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {metrics.map((m, idx) => (
          <div key={idx} style={{ 
            background: '#ffffff', 
            border: '1px solid #cbd5e1', 
            borderRadius: '12px', 
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.01)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b' }}>{m.label}</span>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {m.icon}
              </div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>{m.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10px', color: '#10b981', fontWeight: 700 }}>
              <span style={{ fontSize: '11px' }}>↑</span> {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* 3. ROW 1: STUDENT OVERVIEW & TOP PERFORMING STUDENTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px', minHeight: '360px' }}>
        
        {/* Student Growth Overview Card */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Student Overview</h3>
            <span style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleQuickLink('student')}>View All Students →</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 600 }}>Total Students</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', color: '#0f172a' }}>1,250</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 600 }}>Boys</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', color: '#0f172a' }}>650 <span style={{ fontSize: '10px', fontWeight: 550, color: '#64748b' }}>(52%)</span></div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 600 }}>Girls</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', color: '#0f172a' }}>600 <span style={{ fontSize: '10px', fontWeight: 550, color: '#64748b' }}>(48%)</span></div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 600 }}>New Admissions (This Month)</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', color: '#0f172a' }}>42</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155' }}>Student Growth</span>
            <select 
              value={growthTimeframe} 
              onChange={(e) => setGrowthTimeframe(e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '11px', fontWeight: 700 }}
            >
              <option value="This Year">This Year</option>
            </select>
          </div>

          {/* Area Chart Section with Linear Gradient */}
          <div style={{ flex: 1, height: '220px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={studentGrowthData} margin={{ top: 10, right: 30, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} domain={[0, 1500]} ticks={[0, 300, 600, 900, 1200, 1500]} tickFormatter={(val) => val === 0 ? '0' : val === 1500 ? '1.5K' : val === 1200 ? '1.2K' : val} />
                <Tooltip 
                  contentStyle={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  formatter={(value) => [`${value}`, 'Total Students']}
                />
                <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Tooltip Overlay at Aug 2024 position */}
            <div style={{
              position: 'absolute',
              top: '25%',
              left: '60%',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '11px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              zIndex: 3,
              pointerEvents: 'none'
            }}>
              <div style={{ fontWeight: 700, color: '#64748b', marginBottom: '2px' }}>Aug 2024</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800, color: '#4f46e5' }}>
                <span style={{ fontSize: '12px' }}>•</span> Total Students: 1,180
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Students List */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Top Performing Students</h3>
            <span style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleQuickLink('student')}>View All →</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'center' }}>
            {topStudents.map((stu) => (
              <div key={stu.rank} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '50%', 
                    background: stu.bg, 
                    color: stu.color,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 850
                  }}>
                    {stu.rank}
                  </div>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: '#f1f5f9', 
                    color: '#475569', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: '1px solid #cbd5e1'
                  }}>
                    {stu.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{stu.name}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>{stu.class}</div>
                  </div>
                </div>
                {stu.score && <div style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>{stu.score}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ROW 2: DONUT DISTRIBUTION CHARTS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        
        {/* Chart 1: Students by Class */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minHeight: '250px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Students by Class</h3>
            <span style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleQuickLink('batch')}>View Report →</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', height: '140px', position: 'relative' }}>
            <div style={{ width: '120px', height: '120px', position: 'relative', flexShrink: 0 }}>
              <PieChart width={120} height={120}>
                <Pie
                  data={classDistribution}
                  cx={60}
                  cy={60}
                  innerRadius={38}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div style={{
                position: 'absolute',
                top: '60px',
                left: '60px',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', lineHeight: '1.1' }}>1,250</div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>Total</div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '12px' }}>
              {classDistribution.map((entry, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '9px', lineHeight: 1.2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: entry.color }} />
                    <span style={{ fontWeight: 600, color: '#475569' }}>{entry.name}</span>
                  </div>
                  <span style={{ color: '#64748b', fontFamily: 'monospace', fontWeight: 600 }}>{entry.value} ({entry.percent})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 2: Gender Distribution */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minHeight: '250px'
        }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Gender Distribution</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', height: '140px', position: 'relative' }}>
            <div style={{ width: '120px', height: '120px', position: 'relative', flexShrink: 0 }}>
              <PieChart width={120} height={120}>
                <Pie
                  data={genderDistribution}
                  cx={60}
                  cy={60}
                  innerRadius={38}
                  outerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div style={{
                position: 'absolute',
                top: '60px',
                left: '60px',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', lineHeight: '1.1' }}>1,250</div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>Total</div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '12px', justifyContent: 'center' }}>
              {genderDistribution.map((entry, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', lineHeight: 1.2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color }} />
                    <span style={{ fontWeight: 700, color: '#475569' }}>{entry.name}</span>
                  </div>
                  <span style={{ color: '#64748b', fontFamily: 'monospace', fontWeight: 600 }}>{entry.value} ({entry.percent})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 3: Attendance Overview */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minHeight: '250px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Attendance Overview</h3>
            <select style={{ padding: '2px 6px', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#ffffff', fontSize: '10px', fontWeight: 600 }}>
              <option>This Month</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', height: '140px', position: 'relative' }}>
            <div style={{ width: '120px', height: '120px', position: 'relative', flexShrink: 0 }}>
              <PieChart width={120} height={120}>
                <Pie
                  data={attendanceDistribution}
                  cx={60}
                  cy={60}
                  innerRadius={38}
                  outerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {attendanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div style={{
                position: 'absolute',
                top: '60px',
                left: '60px',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#10b981', lineHeight: '1.1' }}>96%</div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>Average</div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '12px', justifyContent: 'center' }}>
              {attendanceDistribution.map((entry, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', lineHeight: 1.2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: entry.color }} />
                    <span style={{ fontWeight: 600, color: '#475569' }}>{entry.name}</span>
                  </div>
                  <span style={{ color: '#64748b', fontFamily: 'monospace', fontWeight: 600 }}>{entry.value} ({entry.percent})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. ROW 3: ACADEMICS / RECENT ACTIVITY / UPCOMING EVENTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '20px', minHeight: '320px' }}>
        
        {/* Academics Card */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Academics at a Glance</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {academicsSummary.map((item, idx) => (
              <div key={idx} style={{ background: '#ffffff', padding: '10px 4px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '9px', color: '#64748b', marginBottom: '6px' }}>
                  <span style={{ color: item.color }}>{item.icon}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{item.value}</div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700, marginTop: '2px' }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, minHeight: '140px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569' }}>Exam Performance (Average %)</span>
              <span style={{ fontSize: '10px', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleQuickLink('report')}>View Report →</span>
            </div>
            <ResponsiveContainer width="100%" height={110}>
              <BarChart data={examPerformanceData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
                <XAxis dataKey="subject" stroke="#94a3b8" fontSize={8} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={8} tickLine={false} axisLine={false} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v) => `${v}%`} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} name="Score (%)">
                  {examPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Recent Activity</h3>
            <span style={{ fontSize: '10px', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleQuickLink('report')}>View All →</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
            {recentActivities.map((act) => (
              <div key={act.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: act.bg, 
                  color: act.color, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {act.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155', lineHeight: 1.3 }}>{act.text}</span>
                  <span style={{ fontSize: '9px', color: '#94a3b8', marginTop: '2px', fontWeight: 500 }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Card */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Upcoming Events</h3>
            <span style={{ fontSize: '10px', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleQuickLink('report')}>View Calendar →</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
            {upcomingEvents.map((evt) => (
              <div key={evt.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '8px', 
                  border: '1px solid #cbd5e1', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: '#f8fafc',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '8px', fontWeight: 800, color: evt.color }}>{evt.month}</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', lineHeight: 1.1 }}>{evt.day}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>{evt.title}</span>
                  <span style={{ fontSize: '9px', color: '#94a3b8', marginTop: '2px', fontWeight: 500 }}>{evt.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. ROW 4: STUDENTS DIRECTORY & QUICK LINKS */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', minHeight: '340px' }}>
        
        {/* Students Directory Card */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Students Directory</h3>
            <span style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleQuickLink('student')}>View All Students →</span>
          </div>

          {/* Interactive Filters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: '#f8fafc', 
              border: '1px solid #cbd5e1', 
              borderRadius: '8px', 
              padding: '4px 10px',
              flex: 1,
              minWidth: '180px'
            }}>
              <Search size={14} style={{ color: '#94a3b8', marginRight: '6px' }} />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  fontSize: '11px', 
                  width: '100%', 
                  outline: 'none', 
                  color: '#334155' 
                }} 
              />
              {searchTerm && <X size={12} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSearchTerm('')} />}
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '11px', color: '#475569', fontWeight: 700 }}
              >
                <option value="All">Class: All*</option>
                <option value="10">Class 10</option>
                <option value="9">Class 9</option>
                <option value="8">Class 8</option>
              </select>

              <select 
                value={selectedBatch} 
                onChange={(e) => setSelectedBatch(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '11px', color: '#475569', fontWeight: 700 }}
              >
                <option value="All">Batch: All*</option>
                <option value="A">Batch A</option>
                <option value="B">Batch B</option>
              </select>

              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '11px', color: '#475569', fontWeight: 700 }}
              >
                <option value="Active">Status: Active</option>
                <option value="All">Status: All</option>
              </select>
            </div>
          </div>

          {/* Directory Table */}
          <div style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden', background: '#ffffff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1', height: '34px', color: '#64748b', fontWeight: 700 }}>
                  <th style={{ padding: '0 12px' }}>Name</th>
                  <th style={{ padding: '0 12px' }}>Admission No.</th>
                  <th style={{ padding: '0 12px' }}>Class - Batch</th>
                  <th style={{ padding: '0 12px' }}>Date of Birth</th>
                  <th style={{ padding: '0 12px' }}>Gender</th>
                  <th style={{ padding: '0 12px' }}>Contact</th>
                  <th style={{ padding: '0 12px' }}>Parent</th>
                  <th style={{ padding: '0 12px' }}>Status</th>
                  <th style={{ padding: '0 12px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < filteredStudents.length - 1 ? '1px solid #cbd5e1' : 'none', height: '40px' }}>
                    <td style={{ padding: '0 12px', fontWeight: 700, color: '#0f172a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', overflow: 'hidden', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', flexShrink: 0 }}>
                          <img 
                            src={`/student_${row.id}.png`} 
                            alt={row.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const placeholder = document.createElement('div');
                                placeholder.style.width = '100%';
                                placeholder.style.height = '100%';
                                placeholder.style.display = 'flex';
                                placeholder.style.alignItems = 'center';
                                placeholder.style.justifyContent = 'center';
                                placeholder.style.background = 'linear-gradient(135deg, #6366f1, #a855f7)';
                                placeholder.style.color = '#ffffff';
                                placeholder.style.fontSize = '9px';
                                placeholder.style.fontWeight = '700';
                                placeholder.innerText = row.name.split(' ').map((n: string) => n[0]).join('');
                                parent.appendChild(placeholder);
                              }
                            }}
                          />
                        </div>
                        {row.name}
                      </div>
                    </td>
                    <td style={{ padding: '0 12px', fontFamily: 'monospace', color: '#475569' }}>{row.admissionNo}</td>
                    <td style={{ padding: '0 12px', fontWeight: 600, color: '#334155' }}>{row.class} - {row.batch}</td>
                    <td style={{ padding: '0 12px', color: '#475569' }}>{row.dob}</td>
                    <td style={{ padding: '0 12px', color: '#475569' }}>{row.gender}</td>
                    <td style={{ padding: '0 12px', fontFamily: 'monospace', color: '#475569' }}>{row.contact}</td>
                    <td style={{ padding: '0 12px', color: '#475569' }}>{row.parent}</td>
                    <td style={{ padding: '0 12px' }}>
                      <span style={{ background: '#d1fae5', color: '#065f46', borderRadius: '12px', fontSize: '9px', padding: '2px 8px', fontWeight: 700, border: '1px solid #a7f3d0' }}>{row.status}</span>
                    </td>
                    <td style={{ padding: '0 12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleStudentClick(row.id, row.name)}
                        style={{ border: '1px solid #cbd5e1', padding: '2px 6px', borderRadius: '4px', background: '#ffffff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        title="View Full Profile"
                      >
                        <ArrowUpRight size={12} style={{ color: '#475569' }} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>No matching student records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#64748b', fontWeight: 600 }}>
            <span>Showing 1 to {filteredStudents.length} of 1,250 students</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ cursor: 'pointer', padding: '2px' }}>&lt;</span>
              <button style={{ padding: '2px 6px', border: '1px solid #4f46e5', borderRadius: '4px', background: '#4f46e5', color: 'white', fontWeight: 700, fontSize: '10px' }}>1</button>
              <button style={{ padding: '2px 6px', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#ffffff', fontSize: '10px' }}>2</button>
              <button style={{ padding: '2px 6px', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#ffffff', fontSize: '10px' }}>3</button>
              <span>...</span>
              <button style={{ padding: '2px 6px', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#ffffff', fontSize: '10px' }}>125</button>
              <span style={{ cursor: 'pointer', padding: '2px' }}>&gt;</span>
            </div>
          </div>
        </div>

        {/* Quick Links Card */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Quick Links</h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '10px',
            flex: 1
          }}>
            {[
              { label: 'Add New Student', action: 'student', icon: <Plus size={14} />, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.08)' },
              { label: 'Add New Teacher', action: 'teacher', icon: <Plus size={14} />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
              { label: 'Create New Batch', action: 'batch', icon: <Layers size={14} />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
              { label: 'Create New Course', action: 'course', icon: <BookOpen size={14} />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)' },
              { label: 'Mark Attendance', action: 'attendance', icon: <UserCheck size={14} />, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.08)' },
              { label: 'Collect Fee', action: 'fee', icon: <DollarSign size={14} />, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.08)' },
              { label: 'Generate Report', action: 'report', icon: <FileSpreadsheet size={14} />, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.08)' },
              { label: 'Send Notification', action: 'notification', icon: <Send size={14} />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' }
            ].map((link, idx) => (
              <button 
                key={idx}
                onClick={() => handleQuickLink(link.action)}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  gap: '8px',
                  background: '#ffffff',
                  border: `1px solid #cbd5e1`,
                  borderRadius: '10px',
                  padding: '12px 10px',
                  cursor: 'pointer',
                  color: '#475569',
                  transition: 'all 120ms ease',
                  textAlign: 'left'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.borderColor = link.color;
                  e.currentTarget.style.background = link.bg;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <div style={{ 
                  color: link.color, 
                  background: link.bg,
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>{link.icon}</div>
                <span style={{ fontSize: '10px', fontWeight: 700 }}>{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
