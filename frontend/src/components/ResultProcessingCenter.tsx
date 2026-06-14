'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Bell, Download, Plus, FileText, CheckCircle2, TrendingUp, 
  Users, Brain, CreditCard, Clock, Clipboard, Award, MoreHorizontal, 
  ArrowLeft, ArrowUpRight, Check, X, Printer, RefreshCw, Filter, Send,
  UserCheck, AlertTriangle, ChevronRight, FileSpreadsheet, Eye, Settings,
  ChevronDown, ChevronUp, Calculator
} from 'lucide-react';

interface ExaminationResult {
  id: string;
  name: string;
  classes: string;
  students: number;
  completedScripts: number;
  totalScripts: number;
  status: 'Processing' | 'Published' | 'Evaluation' | 'Not Started';
  lastUpdated: string;
  type: string;
}

const mockExaminationResults: ExaminationResult[] = [
  { id: '1', name: 'Half Yearly Examination 2025-26', classes: 'X, IX, VIII', students: 1245, completedScripts: 1045, totalScripts: 1245, status: 'Processing', lastUpdated: '10 May 2026, 10:30 AM', type: 'Theory + Practical' },
  { id: '2', name: 'Unit Test - I', classes: 'VI, VII, VIII', students: 1812, completedScripts: 1812, totalScripts: 1812, status: 'Published', lastUpdated: '08 May 2026, 04:20 PM', type: 'Theory' },
  { id: '3', name: 'Practical Examination', classes: 'IX, X', students: 856, completedScripts: 856, totalScripts: 856, status: 'Published', lastUpdated: '07 May 2026, 02:15 PM', type: 'Practical' },
  { id: '4', name: 'Quarterly Examination - IV', classes: 'VI, VII, VIII', students: 1423, completedScripts: 1102, totalScripts: 1423, status: 'Processing', lastUpdated: '10 May 2026, 09:15 AM', type: 'Theory' },
  { id: '5', name: 'Pre-Board Examination', classes: 'X, XII', students: 643, completedScripts: 421, totalScripts: 643, status: 'Evaluation', lastUpdated: '09 May 2026, 06:30 PM', type: 'Theory' },
  { id: '6', name: 'Annual Examination 2024-25', classes: 'I - XII', students: 4826, completedScripts: 0, totalScripts: 4826, status: 'Not Started', lastUpdated: '-', type: 'Theory + Practical' }
];

interface StudentMarks {
  ut1: number;
  ut2: number;
  mid: number;
  final: number;
  pracAssess: number;
  pracFile: number;
  remarks: string;
}

interface Student {
  id: string;
  name: string;
  rollNo: string;
  status: 'In Progress' | 'Completed' | 'Not Started';
  avatar: string;
  dob: string;
  admissionNo: string;
  fatherName: string;
  classSection: string;
  academicYear: string;
  rankInClass: string;
  resultStatus: 'Pass' | 'Fail' | 'Pending';
  marks: StudentMarks;
  otherSubjects: {
    subject: string;
    maxMarks: number;
    obtainedMarks: number;
    percentage: number;
    grade: string;
  }[];
}

const initialStudentsList: Student[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    rollNo: '01',
    status: 'In Progress',
    avatar: '/student_avatar.png',
    dob: '12 May 2010',
    admissionNo: 'GFI/2020/1456',
    fatherName: 'Rakesh Sharma',
    classSection: 'X-A',
    academicYear: '2025-26',
    rankInClass: '5/32',
    resultStatus: 'Pass',
    marks: {
      ut1: 16,
      ut2: 18,
      mid: 15,
      final: 17,
      pracAssess: 13,
      pracFile: 4,
      remarks: 'Good performance! Keep it up.'
    },
    otherSubjects: [
      { subject: 'English Language', maxMarks: 100, obtainedMarks: 86, percentage: 86, grade: 'A+' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 88, percentage: 88, grade: 'A' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 81, percentage: 81, grade: 'A' },
      { subject: 'Hindi', maxMarks: 100, obtainedMarks: 85, percentage: 85, grade: 'A+' },
      { subject: 'Computer Application', maxMarks: 100, obtainedMarks: 90, percentage: 90, grade: 'A+' }
    ]
  },
  {
    id: '2',
    name: 'Diya Patel',
    rollNo: '02',
    status: 'Completed',
    avatar: '/student_avatar.png',
    dob: '18 Aug 2010',
    admissionNo: 'GFI/2020/1489',
    fatherName: 'Vikram Patel',
    classSection: 'X-A',
    academicYear: '2025-26',
    rankInClass: '2/32',
    resultStatus: 'Pass',
    marks: {
      ut1: 18,
      ut2: 19,
      mid: 17,
      final: 18,
      pracAssess: 14,
      pracFile: 5,
      remarks: 'Excellent analytical skills.'
    },
    otherSubjects: [
      { subject: 'English Language', maxMarks: 100, obtainedMarks: 90, percentage: 90, grade: 'A+' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 94, percentage: 94, grade: 'A+' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 89, percentage: 89, grade: 'A+' },
      { subject: 'Hindi', maxMarks: 100, obtainedMarks: 88, percentage: 88, grade: 'A' },
      { subject: 'Computer Application', maxMarks: 100, obtainedMarks: 95, percentage: 95, grade: 'A+' }
    ]
  },
  {
    id: '3',
    name: 'Vivaan Mehta',
    rollNo: '03',
    status: 'Completed',
    avatar: '/student_avatar.png',
    dob: '15 Jan 2011',
    admissionNo: 'GFI/2020/1422',
    fatherName: 'Sanjay Mehta',
    classSection: 'X-A',
    academicYear: '2025-26',
    rankInClass: '3/32',
    resultStatus: 'Pass',
    marks: {
      ut1: 17,
      ut2: 18,
      mid: 16,
      final: 18,
      pracAssess: 14,
      pracFile: 4,
      remarks: 'Outstanding performance overall.'
    },
    otherSubjects: [
      { subject: 'English Language', maxMarks: 100, obtainedMarks: 88, percentage: 88, grade: 'A' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 92, percentage: 92, grade: 'A+' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 85, percentage: 85, grade: 'A' },
      { subject: 'Hindi', maxMarks: 100, obtainedMarks: 82, percentage: 82, grade: 'A' },
      { subject: 'Computer Application', maxMarks: 100, obtainedMarks: 93, percentage: 93, grade: 'A+' }
    ]
  },
  {
    id: '4',
    name: 'Ananya Singh',
    rollNo: '04',
    status: 'In Progress',
    avatar: '/student_avatar.png',
    dob: '22 Mar 2010',
    admissionNo: 'GFI/2020/1501',
    fatherName: 'Rajesh Singh',
    classSection: 'X-A',
    academicYear: '2025-26',
    rankInClass: '8/32',
    resultStatus: 'Pass',
    marks: {
      ut1: 15,
      ut2: 16,
      mid: 14,
      final: 15,
      pracAssess: 12,
      pracFile: 3,
      remarks: 'Needs slightly more practice in practicals.'
    },
    otherSubjects: [
      { subject: 'English Language', maxMarks: 100, obtainedMarks: 82, percentage: 82, grade: 'A' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 80, percentage: 80, grade: 'A' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 78, percentage: 78, grade: 'B' },
      { subject: 'Hindi', maxMarks: 100, obtainedMarks: 84, percentage: 84, grade: 'A' },
      { subject: 'Computer Application', maxMarks: 100, obtainedMarks: 87, percentage: 87, grade: 'A' }
    ]
  },
  {
    id: '5',
    name: 'Kabir Verma',
    rollNo: '05',
    status: 'Not Started',
    avatar: '/student_avatar.png',
    dob: '05 Nov 2010',
    admissionNo: 'GFI/2020/1410',
    fatherName: 'Anil Verma',
    classSection: 'X-A',
    academicYear: '2025-26',
    rankInClass: '12/32',
    resultStatus: 'Pending',
    marks: {
      ut1: 0,
      ut2: 0,
      mid: 0,
      final: 0,
      pracAssess: 0,
      pracFile: 0,
      remarks: ''
    },
    otherSubjects: [
      { subject: 'English Language', maxMarks: 100, obtainedMarks: 75, percentage: 75, grade: 'B' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 72, percentage: 72, grade: 'B' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 70, percentage: 70, grade: 'B' },
      { subject: 'Hindi', maxMarks: 100, obtainedMarks: 78, percentage: 78, grade: 'B' },
      { subject: 'Computer Application', maxMarks: 100, obtainedMarks: 80, percentage: 80, grade: 'A' }
    ]
  },
  {
    id: '6',
    name: 'Myra Jain',
    rollNo: '06',
    status: 'In Progress',
    avatar: '/student_avatar.png',
    dob: '11 Jul 2010',
    admissionNo: 'GFI/2020/1512',
    fatherName: 'Praveen Jain',
    classSection: 'X-A',
    academicYear: '2025-26',
    rankInClass: '10/32',
    resultStatus: 'Pass',
    marks: {
      ut1: 14,
      ut2: 15,
      mid: 13,
      final: 16,
      pracAssess: 11,
      pracFile: 4,
      remarks: 'Consistently improving.'
    },
    otherSubjects: [
      { subject: 'English Language', maxMarks: 100, obtainedMarks: 80, percentage: 80, grade: 'A' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 76, percentage: 76, grade: 'B' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 75, percentage: 75, grade: 'B' },
      { subject: 'Hindi', maxMarks: 100, obtainedMarks: 81, percentage: 81, grade: 'A' },
      { subject: 'Computer Application', maxMarks: 100, obtainedMarks: 85, percentage: 85, grade: 'A' }
    ]
  },
  {
    id: '7',
    name: 'Arjun Nair',
    rollNo: '07',
    status: 'Not Started',
    avatar: '/student_avatar.png',
    dob: '19 Feb 2010',
    admissionNo: 'GFI/2020/1435',
    fatherName: 'Hari Nair',
    classSection: 'X-A',
    academicYear: '2025-26',
    rankInClass: '15/32',
    resultStatus: 'Pending',
    marks: {
      ut1: 0,
      ut2: 0,
      mid: 0,
      final: 0,
      pracAssess: 0,
      pracFile: 0,
      remarks: ''
    },
    otherSubjects: [
      { subject: 'English Language', maxMarks: 100, obtainedMarks: 78, percentage: 78, grade: 'B' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 70, percentage: 70, grade: 'B' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 68, percentage: 68, grade: 'C' },
      { subject: 'Hindi', maxMarks: 100, obtainedMarks: 72, percentage: 72, grade: 'B' },
      { subject: 'Computer Application', maxMarks: 100, obtainedMarks: 78, percentage: 78, grade: 'B' }
    ]
  },
  {
    id: '8',
    name: 'Ishita Roy',
    rollNo: '08',
    status: 'Completed',
    avatar: '/student_avatar.png',
    dob: '30 Oct 2010',
    admissionNo: 'GFI/2020/1477',
    fatherName: 'Debashis Roy',
    classSection: 'X-A',
    academicYear: '2025-26',
    rankInClass: '1/32',
    resultStatus: 'Pass',
    marks: {
      ut1: 19,
      ut2: 20,
      mid: 19,
      final: 20,
      pracAssess: 15,
      pracFile: 5,
      remarks: 'Perfect score, outstanding child.'
    },
    otherSubjects: [
      { subject: 'English Language', maxMarks: 100, obtainedMarks: 95, percentage: 95, grade: 'A+' },
      { subject: 'Science', maxMarks: 100, obtainedMarks: 98, percentage: 98, grade: 'A+' },
      { subject: 'Social Science', maxMarks: 100, obtainedMarks: 94, percentage: 94, grade: 'A+' },
      { subject: 'Hindi', maxMarks: 100, obtainedMarks: 92, percentage: 92, grade: 'A+' },
      { subject: 'Computer Application', maxMarks: 100, obtainedMarks: 97, percentage: 97, grade: 'A+' }
    ]
  }
];

export default function ResultProcessingCenter() {
  // Wizard state
  const [isCreateWizardOpen, setIsCreateWizardOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>(initialStudentsList);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('1');
  const [wizardSearchQuery, setWizardSearchQuery] = useState('');
  const [autoCalculate, setAutoCalculate] = useState(true);
  const [wizardClass, setWizardClass] = useState('X-A');
  const [wizardSection, setWizardSection] = useState('A');
  const [wizardExam, setWizardExam] = useState('Half Yearly Examination 2025-26');
  const [wizardSubject, setWizardSubject] = useState('Mathematics (041)');

  // Active student memo
  const activeStudent = useMemo(() => {
    return students.find(s => s.id === selectedStudentId) || students[0];
  }, [students, selectedStudentId]);

  // Tab states
  const [activeTab, setActiveTab] = useState<'Examination Results' | 'Processing Queue' | 'Approval Queue' | 'Published Results' | 'Result History'>('Examination Results');

  // Filter States
  const [examFilter, setExamFilter] = useState('Half Yearly Examination 2025-26');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [sectionFilter, setSectionFilter] = useState('All Sections');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeFilters, setActiveFilters] = useState({
    query: '',
    exam: 'Half Yearly Examination 2025-26',
    class: 'All Classes',
    section: 'All Sections',
    status: 'All Status'
  });

  // Selection states
  const [selectedExamId, setSelectedExamId] = useState<string>('1');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleApplyFilters = () => {
    setActiveFilters({
      query: searchQuery,
      exam: examFilter,
      class: classFilter,
      section: sectionFilter,
      status: statusFilter
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setExamFilter('Half Yearly Examination 2025-26');
    setClassFilter('All Classes');
    setSectionFilter('All Sections');
    setStatusFilter('All Status');
    setActiveFilters({
      query: '',
      exam: 'Half Yearly Examination 2025-26',
      class: 'All Classes',
      section: 'All Sections',
      status: 'All Status'
    });
  };

  // Filter logic
  const filteredExams = useMemo(() => {
    return mockExaminationResults.filter(exam => {
      const matchesSearch = 
        exam.name.toLowerCase().includes(activeFilters.query.toLowerCase()) ||
        exam.classes.toLowerCase().includes(activeFilters.query.toLowerCase()) ||
        exam.status.toLowerCase().includes(activeFilters.query.toLowerCase());

      const matchesClass = activeFilters.class === 'All Classes' || exam.classes.includes(activeFilters.class);
      const matchesStatus = activeFilters.status === 'All Status' || exam.status === activeFilters.status;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [activeFilters]);

  // Select all table logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(filteredExams.map(ex => ex.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Published': return 'badge-active';
      case 'Processing': return 'badge-warning'; // blue tint handled in inline styles or global class
      case 'Evaluation': return 'badge-warning'; // orange / amber badge
      default: return 'badge-disabled'; // grey badge
    }
  };

  const getStatusColorStyles = (status: string) => {
    switch (status) {
      case 'Published': return { background: 'rgba(16,185,129,0.08)', color: 'var(--accent-green)' };
      case 'Processing': return { background: 'rgba(37,99,235,0.08)', color: 'var(--accent-blue)' };
      case 'Evaluation': return { background: 'rgba(245,158,11,0.08)', color: 'var(--accent-amber)' };
      default: return { background: '#f1f5f9', color: '#64748b' };
    }
  };

  // Wizard calculations & handlers
  const numberToWords = (num: number): string => {
    const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE',
      'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
    const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
    
    if (num === 0) return 'ZERO';
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    return ones[Math.floor(num / 100)] + ' HUNDRED' + (num % 100 ? ' ' + numberToWords(num % 100) : '');
  };

  const handleMarkChange = (field: keyof StudentMarks, value: string) => {
    const maxVal = field === 'pracAssess' ? 15 : (field === 'pracFile' ? 5 : 20);
    let numVal = value === '' ? 0 : parseInt(value);
    if (isNaN(numVal)) numVal = 0;
    numVal = Math.max(0, Math.min(maxVal, numVal));

    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudentId) {
        return {
          ...s,
          status: 'In Progress',
          marks: {
            ...s.marks,
            [field]: numVal
          }
        };
      }
      return s;
    }));
  };

  const handleRemarksChange = (value: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudentId) {
        return {
          ...s,
          marks: {
            ...s.marks,
            remarks: value
          }
        };
      }
      return s;
    }));
  };

  const handleSaveAndNext = () => {
    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudentId) {
        return { ...s, status: 'Completed' };
      }
      return s;
    }));

    const currentIndex = students.findIndex(s => s.id === selectedStudentId);
    const nextIndex = (currentIndex + 1) % students.length;
    setSelectedStudentId(students[nextIndex].id);
    triggerToast(`Marks saved for ${activeStudent.name}.`);
  };

  const handlePrevious = () => {
    const currentIndex = students.findIndex(s => s.id === selectedStudentId);
    const prevIndex = (currentIndex - 1 + students.length) % students.length;
    setSelectedStudentId(students[prevIndex].id);
  };

  const getGradeClass = (status: string) => {
    switch (status) {
      case 'Completed': return { background: 'rgba(16,185,129,0.08)', color: 'var(--accent-green)' };
      case 'In Progress': return { background: 'rgba(245,158,11,0.08)', color: 'var(--accent-amber)' };
      default: return { background: '#f1f5f9', color: '#64748b' };
    }
  };

  const getGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    if (score >= 40) return 'E';
    return 'F';
  };

  const getGradePoint = (score: number) => {
    if (score >= 90) return 10;
    if (score >= 80) return 8;
    if (score >= 70) return 7;
    if (score >= 60) return 6;
    if (score >= 50) return 5;
    if (score >= 40) return 4;
    return 0;
  };

  // Filter student list by search
  const filteredWizardStudents = students.filter(s => 
    s.name.toLowerCase().includes(wizardSearchQuery.toLowerCase()) ||
    s.rollNo.includes(wizardSearchQuery)
  );

  const renderCreateWizard = () => {
    // Current math scores
    const mathUT1 = activeStudent.marks.ut1;
    const mathUT2 = activeStudent.marks.ut2;
    const mathMid = activeStudent.marks.mid;
    const mathFinal = activeStudent.marks.final;
    const mathPracAssess = activeStudent.marks.pracAssess;
    const mathPracFile = activeStudent.marks.pracFile;

    // Mathematics compiled calculations
    const mathObtained = mathUT1 + mathUT2 + mathMid + mathFinal + mathPracAssess + mathPracFile;
    const mathPercentage = mathObtained; 
    const mathGrade = getGrade(mathPercentage);
    const mathGradePoint = getGradePoint(mathPercentage);

    // Overall compiled values
    const overallObtained = 430 + mathObtained;
    const overallPercentage = Number((overallObtained / 6).toFixed(2));
    const overallGrade = getGrade(overallPercentage);

    const studentIndex = students.findIndex(s => s.id === selectedStudentId);

    const idNum = parseInt(activeStudent.id) || 1;
    const rollNo = 13100000 + idNum * 1000 + (idNum * 7) % 999;
    const regnNo = `C121/${20000 + idNum * 13}/00${idNum * 3 + 35}`;
    const certNo = `0${7000000 + idNum * 31415}`;
    const serialNo = `0${10000 + idNum * 89}`;

    const getMotherName = (name: string) => {
      if (name.includes('Aarav')) return 'Priya Sharma';
      if (name.includes('Diya')) return 'Meena Patel';
      if (name.includes('Vivaan')) return 'Rekha Mehta';
      if (name.includes('Ananya')) return 'Sunita Singh';
      if (name.includes('Kabir')) return 'Anjali Verma';
      if (name.includes('Myra')) return 'Shalini Jain';
      if (name.includes('Arjun')) return 'Leela Nair';
      if (name.includes('Ishita')) return 'Debika Roy';
      return 'Priya Sharma';
    };

    const formatDobForCbse = (dobStr: string) => {
      const parts = dobStr.split(' ');
      if (parts.length < 3) {
        return { formatted: '15-03-2010', words: '15TH MARCH TWO THOUSAND TEN' };
      }
      const day = parseInt(parts[0]) || 15;
      const monthStr = parts[1].toLowerCase();
      const year = parseInt(parts[2]) || 2010;

      const months: Record<string, { num: string, name: string }> = {
        jan: { num: '01', name: 'JANUARY' },
        feb: { num: '02', name: 'FEBRUARY' },
        mar: { num: '03', name: 'MARCH' },
        apr: { num: '04', name: 'APRIL' },
        may: { num: '05', name: 'MAY' },
        jun: { num: '06', name: 'JUNE' },
        jul: { num: '07', name: 'JULY' },
        aug: { num: '08', name: 'AUGUST' },
        sep: { num: '09', name: 'SEPTEMBER' },
        oct: { num: '10', name: 'OCTOBER' },
        nov: { num: '11', name: 'NOVEMBER' },
        dec: { num: '12', name: 'DECEMBER' }
      };

      const monthKey = monthStr.substring(0, 3);
      const monthInfo = months[monthKey] || { num: '03', name: 'MARCH' };

      const suffix = (day === 1 || day === 21 || day === 31) ? 'ST' : (day === 2 || day === 22) ? 'ND' : (day === 3 || day === 23) ? 'RD' : 'TH';
      
      const dayStr = String(day).padStart(2, '0');
      const formatted = `${dayStr}-${monthInfo.num}-${year}`;

      const yearDiff = year - 2000;
      const yearWords = yearDiff > 0 ? numberToWords(yearDiff) : 'TEN';
      const words = `${day}${suffix} ${monthInfo.name} TWO THOUSAND ${yearWords}`;

      return { formatted, words };
    };

    const dobInfo = formatDobForCbse(activeStudent.dob);
    const examYear = '2025';
    const resultDate = '03-08-2025';

    const reportSubjects = [
      { code: '184', name: 'ENGLISH LNG & LIT.', theory: Math.min(80, 50 + (idNum * 7) % 30), practical: Math.min(20, 15 + (idNum * 3) % 6) },
      { code: '002', name: 'HINDI COURSE-B', theory: Math.min(80, 48 + (idNum * 5) % 32), practical: Math.min(20, 16 + (idNum * 2) % 5) },
      { code: '241', name: 'MATHEMATICS BASIC', theory: Math.min(80, mathUT1 + mathUT2 + mathMid + mathFinal), practical: Math.min(20, mathPracAssess + mathPracFile) },
      { code: '086', name: 'SCIENCE', theory: Math.min(80, 42 + (idNum * 9) % 38), practical: Math.min(20, 15 + (idNum * 3) % 6) },
      { code: '087', name: 'SOCIAL SCIENCE', theory: Math.min(80, 55 + (idNum * 6) % 25), practical: Math.min(20, 16 + (idNum * 2) % 5) },
    ];

    const additionalSubject = {
      code: '402',
      name: 'INFORMATION TECHNOLOGY',
      theory: Math.min(50, 30 + (idNum * 8) % 20),
      practical: Math.min(50, 38 + (idNum * 4) % 12)
    };

    const getPositionalGrade = (marks: number): string => {
      if (marks >= 91) return 'A1';
      if (marks >= 81) return 'A2';
      if (marks >= 71) return 'B1';
      if (marks >= 61) return 'B2';
      if (marks >= 51) return 'C1';
      if (marks >= 41) return 'C2';
      if (marks >= 33) return 'D';
      return 'E';
    };

    const cellStyle: React.CSSProperties = {
      border: '1px solid #1a1a2e',
      padding: '4px 6px',
      fontSize: '11px',
      fontFamily: '"Times New Roman", Times, serif',
      color: '#1a1a2e',
      verticalAlign: 'middle'
    };

    const headerCellStyle: React.CSSProperties = {
      ...cellStyle,
      fontWeight: 700,
      textAlign: 'center',
      fontSize: '9.5px',
      lineHeight: '1.2',
      background: '#f5f0e8'
    };

    return (
      <div style={{
        padding: '24px',
        background: 'var(--bg-primary)',
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        fontFamily: 'var(--font-sans)',
        boxSizing: 'border-box'
      }}>
        {/* Toast notifications */}
        {toastMsg && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#ffffff',
            borderLeft: '4px solid var(--accent-blue)',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            padding: '16px 20px',
            borderRadius: '8px',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <CheckCircle2 style={{ color: 'var(--accent-blue)' }} size={20} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{toastMsg}</span>
          </div>
        )}

        {/* Wizard Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button 
              onClick={() => setIsCreateWizardOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-blue)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                fontSize: '12px',
                padding: 0,
                alignSelf: 'flex-start'
              }}
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Result Processing Center
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Create, update marks, calculate results and generate report cards
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <select 
              value={wizardExam} 
              onChange={e => setWizardExam(e.target.value)} 
              className="input-field" 
              style={{ width: '220px', height: '32px', borderRadius: '6px', fontSize: '11px' }}
            >
              <option value="Half Yearly Examination 2025-26">Half Yearly Examination 2025-26</option>
              <option value="Annual Examination 2024-25">Annual Examination 2024-25</option>
            </select>

            <button style={{
              position: 'relative',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}>
              <Bell size={16} />
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                background: 'var(--accent-red)',
                color: '#ffffff',
                fontSize: '8px',
                fontWeight: 700,
                borderRadius: '50%',
                width: '14px',
                height: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>6</span>
            </button>

            <button 
              onClick={() => triggerToast('Opening settings console...')}
              style={{
                padding: '0 12px', height: '32px', display: 'flex', alignItems: 'center', gap: '6px',
                background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
                borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)'
              }}
            >
              <Settings size={14} /> Settings
            </button>

            <button 
              onClick={() => triggerToast('Spooling processing reports...')}
              style={{
                padding: '0 12px', height: '32px', display: 'flex', alignItems: 'center', gap: '6px',
                background: 'var(--accent-blue)', border: 'none',
                borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#ffffff'
              }}
            >
              Generate Reports <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Timeline Indicator */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            padding: '0 12px'
          }}>
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '40px',
              right: '40px',
              height: '2px',
              background: 'var(--border-primary)',
              zIndex: 1
            }} />

            {[
              { step: '1', title: 'Mark Entry', desc: 'Enter and update marks', status: 'active' },
              { step: '2', title: 'Calculate Results', desc: 'Auto calculate grades & totals', status: 'pending' },
              { step: '3', title: 'Review & Validate', desc: 'Verify results and analytics', status: 'pending' },
              { step: '4', title: 'Publish & Generate', desc: 'Publish results & reports', status: 'pending' }
            ].map((item, idx) => {
              const isActive = item.status === 'active';
              return (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 2,
                    background: 'var(--bg-secondary)',
                    padding: '0 16px',
                    textAlign: 'center',
                    width: '180px'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? 'var(--accent-blue)' : 'var(--bg-primary)',
                    border: isActive ? '2px solid var(--accent-blue)' : '1px solid var(--border-primary)',
                    color: isActive ? '#ffffff' : 'var(--text-tertiary)',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '8px'
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</div>
                    <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.desc}</div>
                  </div>
                  {isActive && (
                    <div style={{
                      height: '3px',
                      background: 'var(--accent-blue)',
                      width: '60px',
                      borderRadius: '1.5px',
                      marginTop: '8px'
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dropdowns / Actions Selectors */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
            <div style={{ minWidth: '110px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Class</span>
              <select value={wizardClass} onChange={e => setWizardClass(e.target.value)} className="input-field" style={{ height: '32px', borderRadius: '6px', fontSize: '11px', width: '100%' }}>
                <option value="X-A">X-A</option>
                <option value="X-B">X-B</option>
                <option value="IX-A">IX-A</option>
              </select>
            </div>

            <div style={{ minWidth: '110px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Section</span>
              <select value={wizardSection} onChange={e => setWizardSection(e.target.value)} className="input-field" style={{ height: '32px', borderRadius: '6px', fontSize: '11px', width: '100%' }}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div style={{ minWidth: '220px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Examination</span>
              <select value={wizardExam} onChange={e => setWizardExam(e.target.value)} className="input-field" style={{ height: '32px', borderRadius: '6px', fontSize: '11px', width: '100%' }}>
                <option value="Half Yearly Examination 2025-26">Half Yearly Examination 2025-26</option>
                <option value="Annual Examination 2024-25">Annual Examination 2024-25</option>
              </select>
            </div>

            <div style={{ minWidth: '180px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Subject</span>
              <select value={wizardSubject} onChange={e => setWizardSubject(e.target.value)} className="input-field" style={{ height: '32px', borderRadius: '6px', fontSize: '11px', width: '100%' }}>
                <option value="Mathematics (041)">Mathematics (041)</option>
                <option value="Science (042)">Science (042)</option>
                <option value="English (101)">English Language (101)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', marginTop: '12px' }}>
            <button 
              onClick={() => triggerToast('Marks loaded from master sheet.')}
              style={{
                height: '32px', padding: '0 12px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)',
                color: 'var(--text-primary)', borderRadius: '6px', fontWeight: 600, fontSize: '11px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <Download size={13} /> Load Marks
            </button>
            <button 
              onClick={() => triggerToast('Select csv file to upload...')}
              style={{
                height: '32px', padding: '0 12px', border: '1px solid var(--accent-green)', background: 'transparent',
                color: 'var(--accent-green)', borderRadius: '6px', fontWeight: 600, fontSize: '11px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <Plus size={13} /> Import Marks
            </button>
            <button 
              onClick={() => triggerToast('Downloading template sheet...')}
              style={{
                height: '32px', padding: '0 12px', border: '1px solid var(--accent-purple)', background: 'transparent',
                color: 'var(--accent-purple)', borderRadius: '6px', fontWeight: 600, fontSize: '11px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <Download size={13} /> Export Template
            </button>
            <button 
              onClick={() => triggerToast('All marks modifications saved successfully.')}
              style={{
                height: '32px', padding: '0 16px', border: 'none', background: 'var(--accent-blue)',
                color: '#ffffff', borderRadius: '6px', fontWeight: 600, fontSize: '11px', cursor: 'pointer'
              }}
            >
              Save All
            </button>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '270px 1.25fr 0.75fr',
          gap: '20px',
          alignItems: 'start'
        }}>
          {/* Column 1: Student List Sidebar */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Students (32)
              </h3>
            </div>

            {/* Sidebar search */}
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={14} style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                type="text"
                placeholder="Search student..."
                value={wizardSearchQuery}
                onChange={e => setWizardSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '30px', height: '32px', borderRadius: '6px', fontSize: '11px', width: '100%' }}
              />
            </div>

            {/* Students list */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              maxHeight: '480px',
              overflowY: 'auto',
              paddingRight: '2px'
            }}>
              {filteredWizardStudents.map(student => {
                const isSelected = student.id === selectedStudentId;
                const badgeStyle = getGradeClass(student.status);

                return (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(37,99,235,0.06)' : 'var(--bg-primary)',
                      border: isSelected ? '1px solid rgba(37,99,235,0.2)' : '1px solid var(--border-primary)',
                      boxSizing: 'border-box',
                      transition: 'all 0.15s'
                    }}
                  >
                    <img 
                      src={student.avatar} 
                      alt={student.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      onError={e => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80&auto=format&fit=crop';
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {student.name}
                      </div>
                      <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>
                        Roll No. {student.rollNo}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '8px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      ...badgeStyle
                    }}>
                      {student.status}
                    </span>
                  </div>
                );
              })}
              {filteredWizardStudents.length === 0 && (
                <div style={{ padding: '20px 0', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
                  No students match your query.
                </div>
              )}
            </div>

            <button 
              onClick={() => triggerToast('Loading more student records...')}
              style={{
                border: 'none', background: 'transparent', color: 'var(--accent-blue)',
                fontSize: '11px', fontWeight: 600, cursor: 'pointer', textAlign: 'center', padding: '8px 0'
              }}
            >
              Load More Students ↓
            </button>
          </div>

          {/* Column 2: Enter Marks Table */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Enter Marks
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '6px', padding: '2px' }}>
                  <button style={{ border: 'none', background: 'var(--accent-blue)', color: '#ffffff', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>Marks</button>
                  <button onClick={() => triggerToast('Grades system is currently read-only.')} style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', fontSize: '10px', fontWeight: 600, padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>Grades</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Auto Calculate</span>
                  <div 
                    onClick={() => setAutoCalculate(!autoCalculate)}
                    style={{
                      width: '32px', height: '18px', borderRadius: '9px',
                      background: autoCalculate ? 'var(--accent-green)' : '#cbd5e1',
                      padding: '2px', display: 'flex', alignItems: 'center',
                      justifyContent: autoCalculate ? 'flex-end' : 'flex-start',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffffff' }} />
                  </div>
                  <Calculator size={14} style={{ color: 'var(--text-secondary)' }} />
                </div>
              </div>
            </div>

            {/* Assessment Component Form Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Assessment Components</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Max Marks</th>
                    <th style={{ width: '180px', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700 }}>{activeStudent.name}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Roll No. {activeStudent.rollNo}</div>
                    </th>
                    <th style={{ width: '110px', textAlign: 'center' }}>Weightage (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Theory Group Header */}
                  <tr style={{ background: '#f8fafc', fontWeight: 700 }}>
                    <td colSpan={4} style={{ padding: '8px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '11px' }}>
                        <ChevronDown size={14} /> Theory (80 Marks)
                      </div>
                    </td>
                  </tr>
                  
                  {/* Theory Components */}
                  <tr>
                    <td style={{ paddingLeft: '24px', fontSize: '11px' }}>Unit Test - I</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, fontSize: '11px' }}>20</td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="text" 
                        value={mathUT1 === 0 ? '' : mathUT1}
                        onChange={e => handleMarkChange('ut1', e.target.value)}
                        placeholder="0"
                        style={{
                          width: '60px', height: '28px', border: '1px solid var(--border-primary)', borderRadius: '6px',
                          textAlign: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)', outline: 'none'
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>25%</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '24px', fontSize: '11px' }}>Unit Test - II</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, fontSize: '11px' }}>20</td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="text" 
                        value={mathUT2 === 0 ? '' : mathUT2}
                        onChange={e => handleMarkChange('ut2', e.target.value)}
                        placeholder="0"
                        style={{
                          width: '60px', height: '28px', border: '1px solid var(--border-primary)', borderRadius: '6px',
                          textAlign: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)', outline: 'none'
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>25%</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '24px', fontSize: '11px' }}>Mid Term Exam</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, fontSize: '11px' }}>20</td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="text" 
                        value={mathMid === 0 ? '' : mathMid}
                        onChange={e => handleMarkChange('mid', e.target.value)}
                        placeholder="0"
                        style={{
                          width: '60px', height: '28px', border: '1px solid var(--border-primary)', borderRadius: '6px',
                          textAlign: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)', outline: 'none'
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>25%</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '24px', fontSize: '11px' }}>Final Term Exam</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, fontSize: '11px' }}>20</td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="text" 
                        value={mathFinal === 0 ? '' : mathFinal}
                        onChange={e => handleMarkChange('final', e.target.value)}
                        placeholder="0"
                        style={{
                          width: '60px', height: '28px', border: '1px solid var(--border-primary)', borderRadius: '6px',
                          textAlign: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)', outline: 'none'
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>25%</td>
                  </tr>

                  {/* Practical Group Header */}
                  <tr style={{ background: '#f8fafc', fontWeight: 700 }}>
                    <td colSpan={4} style={{ padding: '8px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '11px' }}>
                        <ChevronDown size={14} /> Practical (20 Marks)
                      </div>
                    </td>
                  </tr>

                  {/* Practical Components */}
                  <tr>
                    <td style={{ paddingLeft: '24px', fontSize: '11px' }}>Practical Assessment</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, fontSize: '11px' }}>15</td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="text" 
                        value={mathPracAssess === 0 ? '' : mathPracAssess}
                        onChange={e => handleMarkChange('pracAssess', e.target.value)}
                        placeholder="0"
                        style={{
                          width: '60px', height: '28px', border: '1px solid var(--border-primary)', borderRadius: '6px',
                          textAlign: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)', outline: 'none'
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>75%</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '24px', fontSize: '11px' }}>Practical File / Viva</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, fontSize: '11px' }}>5</td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="text" 
                        value={mathPracFile === 0 ? '' : mathPracFile}
                        onChange={e => handleMarkChange('pracFile', e.target.value)}
                        placeholder="0"
                        style={{
                          width: '60px', height: '28px', border: '1px solid var(--border-primary)', borderRadius: '6px',
                          textAlign: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)', outline: 'none'
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>25%</td>
                  </tr>

                  {/* Calculations Summary Row */}
                  <tr style={{ background: 'rgba(37,99,235,0.03)', fontWeight: 700 }}>
                    <td style={{ fontSize: '11px', padding: '12px' }}>Total Marks (Max. 100)</td>
                    <td style={{ textAlign: 'center', fontSize: '11.5px', fontFamily: 'var(--font-mono)' }}>{mathObtained}</td>
                    <td style={{ textAlign: 'center', fontSize: '11.5px', fontFamily: 'var(--font-mono)' }}>{mathPercentage.toFixed(2)}%</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '11px' }}>
                        <div>Grade: <span style={{ color: 'var(--accent-blue)' }}>{mathGrade}</span></div>
                        <div>GP: <span style={{ color: 'var(--accent-blue)' }}>{mathGradePoint}</span></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Remarks box */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Remarks (Optional)</span>
              <textarea 
                value={activeStudent.marks.remarks}
                onChange={e => handleRemarksChange(e.target.value)}
                placeholder="Enter remarks about student performance..."
                style={{
                  width: '100%', height: '54px', padding: '8px 12px', border: '1px solid var(--border-primary)',
                  borderRadius: '8px', fontSize: '11.5px', fontFamily: 'var(--font-sans)', resize: 'none', outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Middle Column Controls Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-secondary)',
              paddingTop: '16px',
              fontSize: '11.5px'
            }}>
              <button 
                onClick={handlePrevious}
                style={{
                  height: '32px', padding: '0 12px', border: '1px solid var(--border-primary)', background: 'var(--bg-primary)',
                  color: 'var(--text-primary)', borderRadius: '6px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Previous Student
              </button>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                {studentIndex + 1} of {students.length} Students
              </span>
              <button 
                onClick={handleSaveAndNext}
                style={{
                  height: '32px', padding: '0 16px', border: 'none', background: 'var(--accent-blue)',
                  color: '#ffffff', borderRadius: '6px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Save & Next Student →
              </button>
            </div>
          </div>

          {/* Column 3: Student Summary & Report Card Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Student Summary box */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src={activeStudent.avatar} 
                  alt={activeStudent.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  onError={e => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80&auto=format&fit=crop';
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {activeStudent.name}
                  </h4>
                  <span style={{
                    fontSize: '9px', fontWeight: 700, padding: '1px 6px', borderRadius: '4px',
                    background: 'rgba(16,185,129,0.08)', color: 'var(--accent-green)', display: 'inline-block', marginTop: '2px'
                  }}>
                    Active
                  </span>
                </div>
              </div>

              {/* Info grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px 16px',
                fontSize: '11px',
                borderTop: '1px solid var(--border-secondary)',
                borderBottom: '1px solid var(--border-secondary)',
                padding: '12px 0'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Roll No.</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{activeStudent.rollNo}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Academic Year</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{activeStudent.academicYear}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Class & Section</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{activeStudent.classSection}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Date of Birth</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{activeStudent.dob}</span>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Admission No.</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{activeStudent.admissionNo}</span>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>Father's Name</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{activeStudent.fatherName}</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h5 style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', marginTop: 0 }}>Overall Performance in This Exam</h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '8.5px', color: 'var(--text-secondary)' }}>Percentage</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{mathPercentage.toFixed(2)}%</div>
                  </div>
                  <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '8.5px', color: 'var(--text-secondary)' }}>Grade</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '2px' }}>{mathGrade}</div>
                  </div>
                  <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '8.5px', color: 'var(--text-secondary)' }}>Rank in Class</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{activeStudent.rankInClass}</div>
                  </div>
                  <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '8.5px', color: 'var(--text-secondary)' }}>Result Status</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-green)', marginTop: '2px' }}>{activeStudent.resultStatus}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Card Preview box */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Report Card Preview
                </h3>
                <button 
                  onClick={() => triggerToast('Select report card design template.')}
                  style={{
                    background: 'transparent', border: '1px solid var(--border-primary)', borderRadius: '4px',
                    fontSize: '10px', fontWeight: 600, padding: '2px 8px', cursor: 'pointer', color: 'var(--text-secondary)'
                  }}
                >
                  Change Template
                </button>
              </div>
              {/* Scaled CBSE Report Card Simulation Sheet */}
              <div style={{
                width: '100%',
                height: '390px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                background: '#e8e0d4',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
              }}>
                <div style={{
                  width: '820px',
                  height: '920px',
                  transform: 'scale(0.40)',
                  transformOrigin: 'top left',
                  position: 'absolute',
                  left: '12px',
                  top: '12px',
                  background: '#fdf8f0',
                  border: '3px solid #1a1a2e',
                  borderRadius: '2px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  boxSizing: 'border-box'
                }}>
                  {/* Decorative border pattern */}
                  <div style={{
                    position: 'absolute',
                    inset: '6px',
                    border: '2px solid #8b7355',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: '10px',
                    border: '1px solid #c9a96e',
                    pointerEvents: 'none'
                  }} />

                  {/* Inner content padding */}
                  <div style={{ padding: '28px 36px', position: 'relative', height: '100%', boxSizing: 'border-box' }}>

                    {/* Serial / Certificate Numbers Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10px', color: '#555', fontFamily: 'monospace' }}>{serialNo}</span>
                      <span style={{ fontSize: '10px', color: '#555' }}>
                        <strong>{certNo}</strong>
                      </span>
                    </div>

                    {/* Header Section */}
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                      {/* Emblem */}
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                        <img 
                          src="/emblem.png" 
                          alt="National Emblem of India"
                          style={{
                            height: '80px',
                            objectFit: 'contain',
                            flexShrink: 0,
                            mixBlendMode: 'multiply'
                          }}
                          onError={e => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=80&auto=format&fit=crop';
                          }}
                        />
                      </div>

                      {/* Registration Number - right aligned */}
                      <div style={{ textAlign: 'right', marginTop: '-60px', marginBottom: '40px' }}>
                        <div style={{ fontSize: '10px', color: '#333' }}>
                          &#x0930;&#x091C;&#x093F;. &#x0928;&#x0902;. / <strong>Regn.No.</strong>&nbsp;&nbsp;<strong style={{ color: '#1a1a2e' }}>{regnNo}</strong>
                        </div>
                      </div>

                      {/* Board Name */}
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', lineHeight: '1.6' }}>
                        &#x0915;&#x0947;&#x0928;&#x094D;&#x0926;&#x094D;&#x0930;&#x0940;&#x092F; &#x092E;&#x093E;&#x0927;&#x094D;&#x092F;&#x092E;&#x093F;&#x0915; &#x0936;&#x093F;&#x0915;&#x094D;&#x0937;&#x093E; &#x092C;&#x094B;&#x0930;&#x094D;&#x0921;
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#1a1a2e', letterSpacing: '0.5px' }}>
                        CENTRAL BOARD OF SECONDARY EDUCATION
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#333', marginTop: '2px' }}>
                        &#x0905;&#x0902;&#x0915; &#x0935;&#x093F;&#x0935;&#x0930;&#x0923;&#x093F;&#x0915;&#x093E; &#x0938;&#x0939; &#x092A;&#x094D;&#x0930;&#x092E;&#x093E;&#x0923; &#x092A;&#x0924;&#x094D;&#x0930;
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', letterSpacing: '1px', marginTop: '2px' }}>
                        MARKS STATEMENT CUM CERTIFICATE
                      </div>
                      <div style={{ fontSize: '11px', color: '#333', marginTop: '4px' }}>
                        &#x092E;&#x093E;&#x0927;&#x094D;&#x092F;&#x092E;&#x093F;&#x0915; &#x0935;&#x093F;&#x0926;&#x094D;&#x092F;&#x093E;&#x0932;&#x092F; &#x092A;&#x0930;&#x0940;&#x0915;&#x094D;&#x0937;&#x093E;, {examYear}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a2e' }}>
                        SECONDARY SCHOOL EXAMINATION, {examYear}
                      </div>
                    </div>

                    {/* Student Photo Section (right aligned) */}
                    <div style={{ position: 'absolute', top: '165px', right: '40px', zIndex: 10 }}>
                      <div style={{
                        width: '80px',
                        height: '95px',
                        border: '1px solid #8b7355',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f5f0e8',
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <img 
                          src={activeStudent.avatar} 
                          alt={activeStudent.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80&auto=format&fit=crop';
                          }}
                        />
                      </div>
                    </div>

                    {/* Student Details Section */}
                    <div style={{ maxWidth: '620px', fontSize: '12px', lineHeight: '2', color: '#1a1a2e', textAlign: 'left' }}>
                      <div>
                        &#x092F;&#x0939; &#x092A;&#x094D;&#x0930;&#x092E;&#x093E;&#x0923;&#x093F;&#x0924; &#x0915;&#x093F;&#x092F;&#x093E; &#x091C;&#x093E;&#x0924;&#x093E; &#x0939;&#x0948; &#x0915;&#x093F;
                      </div>
                      <div>
                        This is to certify that&nbsp;&nbsp;&nbsp;&nbsp;<strong style={{ fontSize: '13px' }}>{activeStudent.name.toUpperCase()}</strong>
                      </div>
                      <div>
                        &#x0905;&#x0928;&#x0941;&#x0915;&#x094D;&#x0930;&#x092E;&#x093E;&#x0902;&#x0915;
                      </div>
                      <div>
                        Roll No.&nbsp;&nbsp;<strong>{rollNo}</strong>
                      </div>
                      <div>
                        &#x092E;&#x093E;&#x0924;&#x093E; &#x0915;&#x093E; &#x0928;&#x093E;&#x092E;
                      </div>
                      <div>
                        Mother&apos;s Name&nbsp;&nbsp;&nbsp;&nbsp;<strong>{getMotherName(activeStudent.name).toUpperCase()}</strong>
                      </div>
                      <div>
                        &#x092A;&#x093F;&#x0924;&#x093E;/&#x0938;&#x0902;&#x0930;&#x0915;&#x094D;&#x0937;&#x0915; &#x0915;&#x093E; &#x0928;&#x093E;&#x092E;
                      </div>
                      <div>
                        Father&apos;s / Guardian&apos;s Name&nbsp;&nbsp;&nbsp;&nbsp;<strong>{activeStudent.fatherName.toUpperCase()}</strong>
                      </div>
                      <div>
                        &#x091C;&#x0928;&#x094D;&#x092E; &#x0924;&#x093F;&#x0925;&#x093F;
                      </div>
                      <div>
                        Date of Birth&nbsp;&nbsp;&nbsp;&nbsp;<strong>{dobInfo.formatted}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>{dobInfo.words}</strong>
                      </div>
                      <div>
                        &#x0935;&#x093F;&#x0926;&#x094D;&#x092F;&#x093E;&#x0932;&#x092F;
                      </div>
                      <div>
                        School&nbsp;&nbsp;&nbsp;&nbsp;<strong>SPRINGFIELD INTERNATIONAL SCHOOL</strong>
                      </div>
                      <div style={{ marginTop: '4px', fontSize: '11px' }}>
                        &#x0915;&#x0940; &#x0936;&#x0948;&#x0915;&#x094D;&#x0937;&#x0923;&#x093F;&#x0915; &#x0909;&#x092A;&#x0932;&#x092C;&#x094D;&#x0927;&#x093F;&#x092F;&#x093E;&#x0901; &#x0928;&#x093F;&#x092E;&#x094D;&#x0928;&#x093E;&#x0928;&#x0941;&#x0938;&#x093E;&#x0930; &#x0939;&#x0948;&#x0902; has achieved Scholastic Achievements as under :
                      </div>
                    </div>

                    {/* Marks Table */}
                    <table style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      marginTop: '16px',
                      marginBottom: '12px'
                    }}>
                      <thead>
                        <tr>
                          <th rowSpan={2} style={{ ...headerCellStyle, width: '60px' }}>
                            &#x0935;&#x093F;&#x0937;&#x092F; &#x0915;&#x094B;&#x0921;<br />SUB.<br />CODE
                          </th>
                          <th rowSpan={2} style={{ ...headerCellStyle, width: '200px', textAlign: 'left', paddingLeft: '12px' }}>
                            &#x0935;&#x093F;&#x0937;&#x092F;<br />SUBJECT
                          </th>
                          <th colSpan={4} style={headerCellStyle}>
                            &#x092A;&#x094D;&#x0930;&#x093E;&#x092A;&#x094D;&#x0924;&#x093E;&#x0902;&#x0915; MARKS OBTAINED
                          </th>
                          <th rowSpan={2} style={{ ...headerCellStyle, width: '70px' }}>
                            &#x0938;&#x094D;&#x0925;&#x093F;&#x0924;&#x0940;&#x092F; &#x0917;&#x094D;&#x0930;&#x0947;&#x0921;<br />POSITIONAL<br />GRADE
                          </th>
                        </tr>
                        <tr>
                          <th style={{ ...headerCellStyle, width: '60px' }}>
                            &#x0932;&#x093F;&#x0916;&#x093F;&#x0924;<br />THEORY
                          </th>
                          <th style={{ ...headerCellStyle, width: '55px' }}>
                            &#x0906;&#x0902;. &#x092E;&#x0942;.<br />IA/<br />PR.
                          </th>
                          <th style={{ ...headerCellStyle, width: '55px' }}>
                            &#x092F;&#x094B;&#x0917;<br />TOTAL
                          </th>
                          <th style={{ ...headerCellStyle, width: '110px' }}>
                            &#x092F;&#x094B;&#x0917; (&#x0936;&#x092C;&#x094D;&#x0926;&#x094B;&#x0902; &#x092E;&#x0947;&#x0902;)<br />TOTAL (IN WORDS)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportSubjects.map((subj) => {
                          const total = subj.theory + subj.practical;
                          return (
                            <tr key={subj.code}>
                              <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{subj.code}</td>
                              <td style={{ ...cellStyle, fontWeight: 600, paddingLeft: '12px', textAlign: 'left' }}>{subj.name}</td>
                              <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(subj.theory).padStart(3, '0')}</td>
                              <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(subj.practical).padStart(3, '0')}</td>
                              <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{String(total).padStart(3, '0')}</td>
                              <td style={{ ...cellStyle, fontWeight: 600, textAlign: 'left' }}>{numberToWords(total)}</td>
                              <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, fontSize: '13px' }}>{getPositionalGrade(total)}</td>
                            </tr>
                          );
                        })}
                        {/* Additional Subject Header */}
                        <tr>
                          <td style={cellStyle}></td>
                          <td colSpan={6} style={{ ...cellStyle, fontWeight: 700, fontSize: '11px', textAlign: 'left' }}>
                            ADDITIONAL SUBJECT
                          </td>
                        </tr>
                        {/* Additional Subject Row */}
                        <tr>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{additionalSubject.code}</td>
                          <td style={{ ...cellStyle, fontWeight: 600, paddingLeft: '12px', textAlign: 'left' }}>{additionalSubject.name}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(additionalSubject.theory).padStart(3, '0')}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600 }}>{String(additionalSubject.practical).padStart(3, '0')}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700 }}>{String(additionalSubject.theory + additionalSubject.practical).padStart(3, '0')}</td>
                          <td style={{ ...cellStyle, fontWeight: 600, textAlign: 'left' }}>{numberToWords(additionalSubject.theory + additionalSubject.practical)}</td>
                          <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, fontSize: '13px' }}>{getPositionalGrade(additionalSubject.theory + additionalSubject.practical)}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Abbreviations */}
                    <div style={{ fontSize: '9.5px', color: '#333', lineHeight: '1.8', marginTop: '12px', textAlign: 'left' }}>
                      <div><strong>&#x0938;&#x0902;&#x0915;&#x094D;&#x0937;&#x093F;&#x092A;&#x094D;&#x0924;&#x093F;&#x092F;&#x094B;&#x0902; &#x0915;&#x093E; &#x0905;&#x0930;&#x094D;&#x0925; : Abbreviations</strong></div>
                      <div>AB : &#x0905;&#x0928;&#x0941;&#x092A;&#x0938;&#x094D;&#x0925;&#x093F;&#x0924; Absent&nbsp;&nbsp;&nbsp;&nbsp;IA : &#x0906;&#x0902;&#x0924;&#x0930;&#x093F;&#x0915; &#x092E;&#x0942;&#x0932;&#x094D;&#x092F;&#x093E;&#x0902;&#x0915;&#x0928; Internal Assessment&nbsp;&nbsp;&nbsp;&nbsp;PR. : &#x092A;&#x094D;&#x0930;&#x093E;&#x092F;&#x094B;&#x0917;&#x093F;&#x0915;/Practical</div>
                    </div>

                    {/* Result */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px', marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', color: '#1a1a2e' }}>
                        &#x092A;&#x0930;&#x093F;&#x0923;&#x093E;&#x092E; Result&nbsp;&nbsp;&nbsp;&nbsp;<strong style={{ fontSize: '14px', color: '#0d6e3d', letterSpacing: '1px' }}>PASS</strong>
                      </div>
                    </div>

                    {/* Footer - Place and Date + Controller */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      marginTop: '24px',
                      paddingTop: '12px',
                      borderTop: '1px solid #c9a96e',
                      textAlign: 'left'
                    }}>
                      <div style={{ fontSize: '11px', color: '#1a1a2e', lineHeight: '1.8' }}>
                        <div>&#x0926;&#x093F;&#x0932;&#x094D;&#x0932;&#x0940; Delhi</div>
                        <div>&#x0926;&#x093F;&#x0928;&#x093E;&#x0902;&#x0915; Dated : &nbsp;&nbsp;<strong>{resultDate}</strong></div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '16px',
                          fontFamily: '"Brush Script MT", cursive, "Times New Roman", serif',
                          color: '#1a1a2e',
                          marginBottom: '4px',
                          fontStyle: 'italic'
                        }}>
                          Controller of Exams
                        </div>
                        <div style={{ fontSize: '10px', color: '#333' }}>&#x092A;&#x0930;&#x0940;&#x0915;&#x094D;&#x0937;&#x093E; &#x0928;&#x093F;&#x092F;&#x0902;&#x0924;&#x094D;&#x0930;&#x0915;</div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a2e' }}>Controller of Examinations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          boxSizing: 'border-box'
        }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', marginTop: 0 }}>
            Quick Actions
          </h3>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {[
              { label: 'Add Assignment / Component', icon: <Plus size={13} />, action: () => triggerToast('New assessment component schema created.') },
              { label: 'Apply Grading System', icon: <Award size={13} />, action: () => triggerToast('Grading system template applied to selected class.') },
              { label: 'Copy Marks From Another Exam', icon: <Clock size={13} />, action: () => triggerToast('Select source exam console.') },
              { label: 'Find & Replace Marks', icon: <Search size={13} />, action: () => triggerToast('Marks batch query console launched.') },
              { label: 'Recalculate Results', icon: <RefreshCw size={13} />, action: () => triggerToast('Re-running result computations for all 32 students.') },
              { label: 'Generate Report Cards', icon: <FileText size={13} />, action: () => triggerToast('Exporting compiled report cards to directory.') },
              { label: 'Send to Parents (Preview)', icon: <Send size={13} />, action: () => triggerToast('Push alert previews broadcasted to tester parent profiles.') }
            ].map((act, idx) => (
              <button
                key={idx}
                onClick={act.action}
                style={{
                  padding: '8px 12px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.background = 'rgba(37,99,235,0.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.background = 'var(--bg-primary)';
                }}
              >
                <span style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center' }}>
                  {act.icon}
                </span>
                <span>{act.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (isCreateWizardOpen) {
    return renderCreateWizard();
  }

  return (
    <div style={{
      padding: '24px',
      background: 'var(--bg-primary)',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box'
    }}>
      {/* Toast popup */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#ffffff',
          borderLeft: '4px solid var(--accent-blue)',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          padding: '16px 20px',
          borderRadius: '8px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <CheckCircle2 style={{ color: 'var(--accent-blue)' }} size={20} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{toastMsg}</span>
        </div>
      )}

      {/* 1. Header Area */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Result Processing Center
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Create, process and publish examination results with accuracy and efficiency.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Select Examination dropdown */}
          <select 
            value={examFilter} 
            onChange={e => setExamFilter(e.target.value)} 
            className="input-field" 
            style={{ width: '220px', height: '32px', borderRadius: '6px', fontSize: '11px' }}
          >
            <option value="Half Yearly Examination 2025-26">Half Yearly Examination 2025-26</option>
            <option value="Annual Examination 2024-25">Annual Examination 2024-25</option>
          </select>

          {/* Search query inside header */}
          <div style={{ position: 'relative', width: '200px' }}>
            <Search size={14} style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder="Search students, exams, classes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '30px', height: '32px', borderRadius: '6px', fontSize: '11px' }}
            />
          </div>

          {/* Notifications count */}
          <button style={{
            position: 'relative',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '6px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}>
            <Bell size={16} />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              background: 'var(--accent-red)',
              color: '#ffffff',
              fontSize: '8px',
              fontWeight: 700,
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>6</span>
          </button>

          {/* "+ Create New Result" button */}
          <button 
            onClick={() => setIsCreateWizardOpen(true)}
            style={{
              padding: '0 12px', height: '32px', display: 'flex', alignItems: 'center', gap: '6px',
              background: 'var(--accent-blue)', border: 'none',
              borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#ffffff'
            }}
          >
            <Plus size={14} /> Create New Result
          </button>
        </div>
      </div>

      {/* 2. Top Metrics Grid Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px'
      }}>
        {/* Metric 1: Total Examinations */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(37,99,235,0.08)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Total Examinations</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>12</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Active exams configured</span>
        </div>

        {/* Metric 2: Students Appeared */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16,185,129,0.08)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Students Appeared</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>4,826</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Across all configured exams</span>
        </div>

        {/* Metric 3: Evaluation Completed */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6,182,212,0.08)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Evaluation Completed</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>3,564</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>73.8% of total scripts</span>
        </div>

        {/* Metric 4: Results Processed */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(139,92,246,0.08)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Results Processed</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>4,635</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>96.0% of evaluations</span>
        </div>

        {/* Metric 5: Pending Processing */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={16} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Pending Processing</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>191</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>4.0% remaining</span>
        </div>
      </div>

      {/* 3. Result Processing Workflow Timeline */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', marginTop: 0 }}>
          Result Processing Workflow
        </h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '0 12px'
        }}>
          {/* Connector lines behind workflow nodes */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            height: '2px',
            background: 'var(--border-primary)',
            zIndex: 1
          }} />

          {[
            { step: 'Step 1', title: 'Data Validation', desc: 'Validate marks & rules', status: 'completed' },
            { step: 'Step 2', title: 'Grade Calculation', desc: 'Calculate grades & GPA', status: 'completed' },
            { step: 'Step 3', title: 'Result Compilation', desc: 'Compile final results', status: 'completed' },
            { step: 'Step 4', title: 'Review & Approval', desc: 'Verify before publish', status: 'active' },
            { step: 'Step 5', title: 'Publish Results', desc: 'Release to students', status: 'pending' }
          ].map((item, index) => {
            const isCompleted = item.status === 'completed';
            const isActive = item.status === 'active';
            
            return (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  zIndex: 2,
                  background: 'var(--bg-secondary)',
                  padding: '8px 12px',
                  borderRadius: '8px'
                }}
              >
                {/* Node icon circle */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isCompleted ? 'rgba(16,185,129,0.08)' : isActive ? 'rgba(245,158,11,0.08)' : 'var(--bg-primary)',
                  border: isCompleted ? '2px solid var(--accent-green)' : isActive ? '2px solid var(--accent-amber)' : '1px solid var(--border-primary)',
                  color: isCompleted ? 'var(--accent-green)' : isActive ? 'var(--accent-amber)' : 'var(--text-tertiary)',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {isCompleted ? <Check size={14} /> : index + 1}
                </div>

                <div>
                  <div style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{item.step}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Main Workspace Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.95fr 1.05fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Tables & Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Tabs header row */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-primary)',
            gap: '8px'
          }}>
            {(['Examination Results', 'Processing Queue', 'Approval Queue (3)', 'Published Results', 'Result History'] as const).map(tab => {
              const tabClean = tab.replace(/ \(\d+\)/, '');
              const isSelected = activeTab.startsWith(tabClean);

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabClean as any)}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: isSelected ? '2px solid var(--accent-blue)' : '2px solid transparent',
                    color: isSelected ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    paddingBottom: '12px'
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Inner Filter bar */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* select exam dropdown */}
            <div style={{ flex: 1.2, minWidth: '180px' }}>
              <select value={examFilter} onChange={e => setExamFilter(e.target.value)} className="input-field" style={{ height: '32px', borderRadius: '6px', fontSize: '11px' }}>
                <option value="Half Yearly Examination 2025-26">Half Yearly Examination 2025-26</option>
                <option value="Annual Examination 2024-25">Annual Examination 2024-25</option>
              </select>
            </div>

            {/* class dropdown */}
            <div style={{ flex: 0.8, minWidth: '100px' }}>
              <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="input-field" style={{ height: '32px', borderRadius: '6px', fontSize: '11px' }}>
                <option value="All Classes">All Classes</option>
                <option value="X">Class X</option>
                <option value="IX">Class IX</option>
                <option value="VIII">Class VIII</option>
              </select>
            </div>

            {/* section dropdown */}
            <div style={{ flex: 0.8, minWidth: '100px' }}>
              <select value={sectionFilter} onChange={e => setSectionFilter(e.target.value)} className="input-field" style={{ height: '32px', borderRadius: '6px', fontSize: '11px' }}>
                <option value="All Sections">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>

            {/* status dropdown */}
            <div style={{ flex: 0.8, minWidth: '100px' }}>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field" style={{ height: '32px', borderRadius: '6px', fontSize: '11px' }}>
                <option value="All Status">All Status</option>
                <option value="Published">Published</option>
                <option value="Processing">Processing</option>
                <option value="Evaluation">Evaluation</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <button onClick={handleApplyFilters} style={{
              background: 'var(--accent-blue)', color: '#ffffff', border: 'none', height: '32px', padding: '0 12px',
              borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '11px'
            }}>
              Apply Filters
            </button>
            <button onClick={handleResetFilters} style={{
              background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)',
              height: '32px', padding: '0 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px'
            }}>
              Reset
            </button>
          </div>

          {/* Results Table */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ width: '32px' }}>
                      <input 
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={filteredExams.length > 0 && selectedRows.length === filteredExams.length}
                      />
                    </th>
                    <th>Examination</th>
                    <th>Classes</th>
                    <th>Students</th>
                    <th>Evaluation Status</th>
                    <th>Result Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.map(exam => {
                    const isSelected = selectedRows.includes(exam.id);
                    const isCurrentActive = selectedExamId === exam.id;
                    const completionPct = exam.totalScripts > 0 ? Math.round((exam.completedScripts / exam.totalScripts) * 100) : 0;
                    
                    return (
                      <tr 
                        key={exam.id}
                        onClick={() => setSelectedExamId(exam.id)}
                        style={{
                          cursor: 'pointer',
                          background: isCurrentActive ? 'rgba(37,99,235,0.03)' : 'transparent',
                          borderColor: isCurrentActive ? 'rgba(37,99,235,0.2)' : 'var(--border-primary)'
                        }}
                      >
                        <td onClick={e => e.stopPropagation()}>
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectOne(exam.id)}
                          />
                        </td>
                        <td>
                          <div>
                            <span style={{ fontWeight: 600, display: 'block', color: 'var(--text-primary)' }}>{exam.name}</span>
                            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{exam.type}</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 500 }}>{exam.classes}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{exam.students.toLocaleString()}</td>
                        <td>
                          <div style={{ width: '120px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                              <span style={{ fontFamily: 'var(--font-mono)' }}>{exam.completedScripts}/{exam.totalScripts}</span>
                              <span style={{ fontWeight: 700 }}>{completionPct}%</span>
                            </div>
                            <div style={{ height: '5px', background: 'var(--border-secondary)', borderRadius: '2.5px', overflow: 'hidden' }}>
                              <div style={{
                                width: `${completionPct}%`,
                                height: '100%',
                                background: completionPct === 100 ? 'var(--accent-green)' : 'var(--accent-blue)',
                                borderRadius: '2.5px'
                              }} />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span 
                            style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: 700,
                              textTransform: 'capitalize',
                              ...getStatusColorStyles(exam.status)
                            }}
                          >
                            {exam.status}
                          </span>
                        </td>
                        <td style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{exam.lastUpdated}</td>
                        <td onClick={e => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button 
                              onClick={() => triggerToast(`Exporting sheets for ${exam.name}...`)}
                              style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                            >
                              <Download size={13} />
                            </button>
                            <button 
                              onClick={() => triggerToast(`Opening marks verification console for ${exam.name}`)}
                              style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                            >
                              <FileSpreadsheet size={13} />
                            </button>
                            <button style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}>
                              <MoreHorizontal size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-secondary)',
              paddingTop: '16px',
              fontSize: '11px',
              color: 'var(--text-secondary)'
            }}>
              <span>Showing 1 to {filteredExams.length} of {mockExaminationResults.length} exams</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }} disabled>‹</button>
                <button className="btn btn-primary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px', fontWeight: 700 }}>1</button>
                <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }}>2</button>
                <button className="btn btn-secondary btn-xs" style={{ width: '28px', height: '28px', borderRadius: '6px' }}>›</button>
              </div>
            </div>
          </div>

          {/* Recent Activity stream */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Recent Activity
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              {[
                { title: 'Results published for Unit Test - I (VI, VII, VIII)', author: 'Ramesh Kumar', date: '08 May 2026, 04:20 PM', icon: <CheckCircle2 size={13} />, bg: 'rgba(16,185,129,0.08)', color: 'var(--accent-green)' },
                { title: 'Half Yearly Exam (X, IX, VIII) moved to processing', author: 'Anjali Verma', date: '10 May 2026, 10:30 AM', icon: <Clock size={13} />, bg: 'rgba(37,99,235,0.08)', color: 'var(--accent-blue)' },
                { title: 'Result calculation completed for Practical Exam (IX, X)', author: 'Priya Sharma', date: '07 May 2026, 02:15 PM', icon: <Brain size={13} />, bg: 'rgba(139,92,246,0.08)', color: 'var(--accent-purple)' },
                { title: '3 results pending approval', author: 'Suresh Rao', date: '10 May 2026, 09:45 AM', icon: <AlertTriangle size={13} />, bg: 'rgba(245,158,11,0.08)', color: 'var(--accent-amber)' }
              ].map((activity, index) => (
                <div 
                  key={index}
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '10px',
                    padding: '12px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    background: activity.bg,
                    color: activity.color,
                    borderRadius: '6px',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    {activity.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {activity.title}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      by {activity.author}
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                      {activity.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Donut + Top performers + actions + health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Donut Chart visual representation */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Result Processing Overview
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative', width: '76px', height: '76px', flexShrink: 0 }}>
                <svg width="76" height="76" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" strokeWidth="11" />
                  {/* Published 60.2% (Green/Blue) */}
                  <circle 
                    cx="50" cy="50" r="38" fill="transparent" stroke="var(--accent-blue)" strokeWidth="11" 
                    strokeDasharray="238.76" strokeDashoffset="95.0" strokeLinecap="round" transform="rotate(-90 50 50)" 
                  />
                  {/* Processing 14.3% (Green) */}
                  <circle 
                    cx="50" cy="50" r="38" fill="transparent" stroke="var(--accent-green)" strokeWidth="11" 
                    strokeDasharray="238.76" strokeDashoffset="204.6" strokeLinecap="round" transform="rotate(126.7 50 50)" 
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', lineHeight: 1.1
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>60.2%</span>
                  <span style={{ fontSize: '7px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Published</span>
                </div>
              </div>

              {/* Legend stats list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, fontSize: '10.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
                    Published
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>4,635 <span style={{ color: 'var(--text-muted)', fontSize: '9px', fontWeight: 500 }}>(60.2%)</span></span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-green)' }} />
                    Processing
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>1,102 <span style={{ color: 'var(--text-muted)', fontSize: '9px', fontWeight: 500 }}>(14.3%)</span></span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-amber)' }} />
                    Evaluation
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>421 <span style={{ color: 'var(--text-muted)', fontSize: '9px', fontWeight: 500 }}>(5.5%)</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers (Overall) list */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Top Performers (Overall)
              </h3>
              <span 
                onClick={() => triggerToast('Top performers list window expanded.')}
                style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer' }}
              >
                View All
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Aarav Sharma', class: 'X-A', pct: 98.6, rank: 1 },
                { name: 'Diya Patel', class: 'X-B', pct: 97.4, rank: 2 },
                { name: 'Vivaan Mehta', class: 'X-A', pct: 96.8, rank: 3 },
                { name: 'Ananya Singh', class: 'X-C', pct: 96.2, rank: 4 },
                { name: 'Kabir Verma', class: 'X-A', pct: 95.7, rank: 5 }
              ].map((perf, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: index === 0 ? 'rgba(251,191,36,0.1)' : index === 1 ? 'rgba(156,163,175,0.1)' : 'transparent',
                    color: index === 0 ? '#d97706' : index === 1 ? '#4b5563' : 'var(--text-secondary)',
                    fontSize: '10px', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {perf.rank}
                  </div>

                  <img 
                    src="/student_avatar.png"
                    alt={perf.name}
                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {perf.name}
                    </div>
                    <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>
                      {perf.class}
                    </div>
                  </div>

                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {perf.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions grid */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', marginTop: 0 }}>
              Quick Actions
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}>
              {[
                { label: 'Validate Marks', icon: <CheckCircle2 size={13} />, action: () => triggerToast('Marks list validation checklist generated.') },
                { label: 'Calculate Results', icon: <Brain size={13} />, action: () => triggerToast('Grade points and GPA batch calculation queued.') },
                { label: 'Generate Report Cards', icon: <FileText size={13} />, action: () => triggerToast('PDF reports generation started for 4,826 students.') },
                { label: 'Publish Results', icon: <Send size={13} />, action: () => triggerToast('Results released to student and parent portal portals.') },
                { label: 'Send to Parents', icon: <Bell size={13} />, action: () => triggerToast('App push alerts broadcasted to linked parent accounts.') },
                { label: 'Download Reports', icon: <Download size={13} />, action: () => triggerToast('Spooling consolidated assessment reports...') }
              ].map((act, idx) => (
                <button
                  key={idx}
                  onClick={act.action}
                  style={{
                    padding: '10px 12px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent-blue)';
                    e.currentTarget.style.background = 'rgba(37,99,235,0.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)';
                    e.currentTarget.style.background = 'var(--bg-primary)';
                  }}
                >
                  <span style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center' }}>
                    {act.icon}
                  </span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{act.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={() => triggerToast('System assessment configurations console.')}
              style={{
                width: '100%', border: 'none', background: 'transparent', color: 'var(--accent-blue)',
                fontSize: '11px', fontWeight: 600, cursor: 'pointer', marginTop: '12px', textAlign: 'center'
              }}
            >
              Result Settings
            </button>
          </div>

          {/* Result Health metrics row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {/* Accuracy Rate */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Accuracy Rate</span>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                98.7%
                <span style={{ fontSize: '10px', color: 'var(--accent-green)', fontWeight: 700 }}>↑</span>
              </div>
              <div style={{ height: '18px', marginTop: '4px' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 L20,13 L40,14 L60,8 L80,10 L100,2" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Processing Time */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Processing Time</span>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                2.4 hrs
                <span style={{ fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 700 }}>↓</span>
              </div>
              <div style={{ height: '18px', marginTop: '4px' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,2 L20,6 L40,8 L60,14 L80,12 L100,16" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Error Rate */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Error Rate</span>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                0.8%
                <span style={{ fontSize: '10px', color: 'var(--accent-amber)', fontWeight: 700 }}>↓</span>
              </div>
              <div style={{ height: '18px', marginTop: '4px' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,4 L20,8 L40,12 L60,10 L80,16 L100,18" fill="none" stroke="var(--accent-amber)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Approval Time */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Approval Time</span>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                1.2 hrs
                <span style={{ fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 700 }}>↓</span>
              </div>
              <div style={{ height: '18px', marginTop: '4px' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,3 L20,5 L40,10 L60,12 L80,15 L100,18" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
