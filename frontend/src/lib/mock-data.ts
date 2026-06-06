// =====================================================
// ACADEx — Mock Data for V1 Development
// Realistic operational data for Bloomberg-style views
// =====================================================

export const mockStudents = [
  { id: '1', uai: 'UAI-2026-0000000001', firstName: 'Arjun', lastName: 'Mehta', class: '10-A', status: 'ACTIVE', attendance: 94, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1001', email: 'arjun.m@dps.edu', phone: '+91 98100 10001', dob: '2010-03-15', gender: 'MALE', guardian: 'Rajesh Mehta', guardianPhone: '+91 98100 20001' },
  { id: '2', uai: 'UAI-2026-0000000002', firstName: 'Priya', lastName: 'Sharma', class: '10-B', status: 'ACTIVE', attendance: 98, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1002', email: 'priya.s@dps.edu', phone: '+91 98100 10002', dob: '2010-07-22', gender: 'FEMALE', guardian: 'Anil Sharma', guardianPhone: '+91 98100 20002' },
  { id: '3', uai: 'UAI-2026-0000000003', firstName: 'Rohan', lastName: 'Gupta', class: '9-A', status: 'ACTIVE', attendance: 87, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1003', email: 'rohan.g@dps.edu', phone: '+91 98100 10003', dob: '2011-01-10', gender: 'MALE', guardian: 'Suresh Gupta', guardianPhone: '+91 98100 20003' },
  { id: '4', uai: 'UAI-2026-0000000004', firstName: 'Ananya', lastName: 'Patel', class: '11-Science', status: 'ACTIVE', attendance: 92, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1004', email: 'ananya.p@dps.edu', phone: '+91 98100 10004', dob: '2009-11-05', gender: 'FEMALE', guardian: 'Vikram Patel', guardianPhone: '+91 98100 20004' },
  { id: '5', uai: 'UAI-2026-0000000005', firstName: 'Karan', lastName: 'Singh', class: '12-Commerce', status: 'TRANSFERRED', attendance: 78, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1005', email: 'karan.s@dps.edu', phone: '+91 98100 10005', dob: '2008-06-18', gender: 'MALE', guardian: 'Harpreet Singh', guardianPhone: '+91 98100 20005' },
  { id: '6', uai: 'UAI-2026-0000000006', firstName: 'Meera', lastName: 'Joshi', class: '8-C', status: 'ACTIVE', attendance: 96, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1006', email: 'meera.j@dps.edu', phone: '+91 98100 10006', dob: '2012-02-28', gender: 'FEMALE', guardian: 'Deepak Joshi', guardianPhone: '+91 98100 20006' },
  { id: '7', uai: 'UAI-2026-0000000007', firstName: 'Aditya', lastName: 'Kumar', class: '10-A', status: 'ACTIVE', attendance: 91, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1007', email: 'aditya.k@dps.edu', phone: '+91 98100 10007', dob: '2010-09-12', gender: 'MALE', guardian: 'Manish Kumar', guardianPhone: '+91 98100 20007' },
  { id: '8', uai: 'UAI-2026-0000000008', firstName: 'Sneha', lastName: 'Reddy', class: '9-B', status: 'SUSPENDED', attendance: 65, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1008', email: 'sneha.r@dps.edu', phone: '+91 98100 10008', dob: '2011-04-03', gender: 'FEMALE', guardian: 'Krishna Reddy', guardianPhone: '+91 98100 20008' },
  { id: '9', uai: 'UAI-2026-0000000009', firstName: 'Vikash', lastName: 'Tiwari', class: '11-Science', status: 'ACTIVE', attendance: 88, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1009', email: 'vikash.t@dps.edu', phone: '+91 98100 10009', dob: '2009-12-25', gender: 'MALE', guardian: 'Ram Tiwari', guardianPhone: '+91 98100 20009' },
  { id: '10', uai: 'UAI-2026-0000000010', firstName: 'Nisha', lastName: 'Verma', class: '12-Arts', status: 'GRADUATED', attendance: 95, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1010', email: 'nisha.v@dps.edu', phone: '+91 98100 10010', dob: '2008-08-14', gender: 'FEMALE', guardian: 'Ashok Verma', guardianPhone: '+91 98100 20010' },
  { id: '11', uai: 'UAI-2026-0000000011', firstName: 'Rahul', lastName: 'Chauhan', class: '7-A', status: 'ACTIVE', attendance: 93, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1011', email: 'rahul.c@dps.edu', phone: '+91 98100 10011', dob: '2013-05-20', gender: 'MALE', guardian: 'Pankaj Chauhan', guardianPhone: '+91 98100 20011' },
  { id: '12', uai: 'UAI-2026-0000000012', firstName: 'Kavya', lastName: 'Nair', class: '10-C', status: 'ACTIVE', attendance: 97, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1012', email: 'kavya.n@dps.edu', phone: '+91 98100 10012', dob: '2010-10-30', gender: 'FEMALE', guardian: 'Sunil Nair', guardianPhone: '+91 98100 20012' },
];

export const mockCases = [
  { id: 'c1', ref: 'ADM-2026-000001', type: 'ADMISSION', title: 'New admission application — Ravi Kumar', status: 'OPEN', priority: 'HIGH', assignee: 'Dr. Meena Shah', subject: 'Ravi Kumar', dueDate: '2026-06-10', created: '2026-06-01', nextAction: 'Review documents and schedule interview' },
  { id: 'c2', ref: 'TRF-2026-000001', type: 'TRANSFER', title: 'Transfer request — Karan Singh to St. Xavier\'s', status: 'IN_PROGRESS', priority: 'MEDIUM', assignee: 'Mrs. Anita Desai', subject: 'Karan Singh', dueDate: '2026-06-15', created: '2026-05-28', nextAction: 'Verify transfer certificate' },
  { id: 'c3', ref: 'ATT-2026-000001', type: 'ATTENDANCE_RISK', title: 'Attendance below 70% — Sneha Reddy', status: 'ESCALATED', priority: 'CRITICAL', assignee: 'Mr. Rajiv Saxena', subject: 'Sneha Reddy', dueDate: '2026-06-05', created: '2026-05-25', nextAction: 'Parent meeting scheduled for June 5' },
  { id: 'c4', ref: 'FEE-2026-000001', type: 'FEE_ESCALATION', title: 'Fee overdue > 90 days — Vikash Tiwari', status: 'PENDING_REVIEW', priority: 'HIGH', assignee: 'Ms. Pooja Iyer', subject: 'Vikash Tiwari', dueDate: '2026-06-08', created: '2026-05-20', nextAction: 'Send final reminder notice' },
  { id: 'c5', ref: 'DOC-2026-000001', type: 'DOCUMENT_VERIFICATION', title: 'TC verification pending — Transfer from CBSE board', status: 'OPEN', priority: 'MEDIUM', assignee: 'Mr. Sunil Rao', subject: 'Arjun Mehta', dueDate: '2026-06-12', created: '2026-06-02', nextAction: 'Contact previous school for verification' },
  { id: 'c6', ref: 'SCH-2026-000001', type: 'SCHOLARSHIP', title: 'Merit scholarship review — Priya Sharma', status: 'PENDING_APPROVAL', priority: 'LOW', assignee: 'Dr. Meena Shah', subject: 'Priya Sharma', dueDate: '2026-06-20', created: '2026-06-01', nextAction: 'Submit to scholarship committee' },
  { id: 'c7', ref: 'DIS-2026-000001', type: 'DISCIPLINARY', title: 'Behavioral incident report — Class 9B', status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'Mrs. Kavita Menon', subject: 'Sneha Reddy', dueDate: '2026-06-06', created: '2026-06-03', nextAction: 'Counselor review pending' },
  { id: 'c8', ref: 'ADM-2026-000002', type: 'ADMISSION', title: 'Bulk admission processing — Session 2026-27', status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'Dr. Meena Shah', subject: 'Multiple (42)', dueDate: '2026-06-30', created: '2026-05-15', nextAction: 'Process remaining 18 applications' },
  { id: 'c9', ref: 'INT-2026-000001', type: 'INTERVENTION', title: 'Academic intervention — Rohan Gupta falling grades', status: 'OPEN', priority: 'MEDIUM', assignee: 'Mr. Rajiv Saxena', subject: 'Rohan Gupta', dueDate: '2026-06-14', created: '2026-06-04', nextAction: 'Assign remedial classes' },
];

export const mockAdmissions = [
  { id: 'a1', ref: 'APP-2026-0001', name: 'Ravi Kumar', applyingFor: 'Class 6', status: 'SUBMITTED', date: '2026-06-01', source: 'ONLINE', previousSchool: 'St. Mary\'s School' },
  { id: 'a2', ref: 'APP-2026-0002', name: 'Sita Devi', applyingFor: 'Class 9', status: 'UNDER_REVIEW', date: '2026-05-28', source: 'WALK_IN', previousSchool: 'Kendriya Vidyalaya' },
  { id: 'a3', ref: 'APP-2026-0003', name: 'Amit Patel', applyingFor: 'Class 11-Science', status: 'DOCUMENTS_PENDING', date: '2026-05-25', source: 'REFERRAL', previousSchool: 'Ryan International' },
  { id: 'a4', ref: 'APP-2026-0004', name: 'Fatima Khan', applyingFor: 'Class 1', status: 'VERIFIED', date: '2026-05-20', source: 'ONLINE', previousSchool: 'N/A (New)' },
  { id: 'a5', ref: 'APP-2026-0005', name: 'Deepak Yadav', applyingFor: 'Class 8', status: 'INTERVIEW_SCHEDULED', date: '2026-05-18', source: 'ONLINE', previousSchool: 'Army Public School' },
  { id: 'a6', ref: 'APP-2026-0006', name: 'Neha Agarwal', applyingFor: 'Class 5', status: 'ACCEPTED', date: '2026-05-10', source: 'WALK_IN', previousSchool: 'DAV Public School' },
  { id: 'a7', ref: 'APP-2026-0007', name: 'Sameer Jain', applyingFor: 'Class 11-Commerce', status: 'WAITLISTED', date: '2026-05-05', source: 'ONLINE', previousSchool: 'Modern School' },
  { id: 'a8', ref: 'APP-2026-0008', name: 'Pooja Mishra', applyingFor: 'Class 3', status: 'SUBMITTED', date: '2026-06-04', source: 'REFERRAL', previousSchool: 'Cambridge School' },
];

export const mockTeachers = [
  { id: 't1', uti: 'UTI-2026-0000001201', name: 'Dr. Meena Shah', department: 'Administration', designation: 'Principal', email: 'meena.shah@dps.edu', phone: '+91 98100 50001', status: 'ACTIVE', subjects: 'Admin', experience: 22 },
  { id: 't2', uti: 'UTI-2026-0000001202', name: 'Mr. Rajiv Saxena', department: 'Mathematics', designation: 'HOD', email: 'rajiv.s@dps.edu', phone: '+91 98100 50002', status: 'ACTIVE', subjects: 'Mathematics', experience: 15 },
  { id: 't3', uti: 'UTI-2026-0000001203', name: 'Mrs. Anita Desai', department: 'Science', designation: 'Senior Teacher', email: 'anita.d@dps.edu', phone: '+91 98100 50003', status: 'ACTIVE', subjects: 'Physics, Chemistry', experience: 12 },
  { id: 't4', uti: 'UTI-2026-0000001204', name: 'Ms. Pooja Iyer', department: 'Accounts', designation: 'Accounts Head', email: 'pooja.i@dps.edu', phone: '+91 98100 50004', status: 'ACTIVE', subjects: 'N/A', experience: 8 },
  { id: 't5', uti: 'UTI-2026-0000001205', name: 'Mr. Sunil Rao', department: 'Administration', designation: 'Registrar', email: 'sunil.r@dps.edu', phone: '+91 98100 50005', status: 'ACTIVE', subjects: 'N/A', experience: 18 },
  { id: 't6', uti: 'UTI-2026-0000001206', name: 'Mrs. Kavita Menon', department: 'English', designation: 'HOD', email: 'kavita.m@dps.edu', phone: '+91 98100 50006', status: 'ON_LEAVE', subjects: 'English, Literature', experience: 14 },
];

export const dashboardMetrics = {
  totalStudents: 2847,
  activeStudents: 2712,
  totalTeachers: 186,
  totalApplications: 342,
  pendingAdmissions: 48,
  openCases: 23,
  criticalCases: 3,
  attendanceToday: 94.2,
  feeCollectionRate: 87.5,
  transfersInProgress: 7,
  documentsVerificationPending: 15,
  complianceExceptions: 2,
};

export const operationalQueues = {
  admissions: { total: 48, critical: 5, thisWeek: 12 },
  transfers: { total: 7, critical: 1, thisWeek: 3 },
  verification: { total: 15, critical: 2, thisWeek: 8 },
  attendanceRisk: { total: 12, critical: 3, thisWeek: 4 },
  feeIssues: { total: 28, critical: 8, thisWeek: 6 },
  pendingApprovals: { total: 19, critical: 4, thisWeek: 11 },
  complianceExceptions: { total: 2, critical: 2, thisWeek: 1 },
};

export const recentActivity = [
  { time: '2 min ago', action: 'Admission application submitted', subject: 'Pooja Mishra — Class 3', user: 'System', type: 'admission' },
  { time: '8 min ago', action: 'Case escalated to Principal', subject: 'ATT-2026-000001 — Sneha Reddy', user: 'Mr. Rajiv Saxena', type: 'case' },
  { time: '15 min ago', action: 'Transfer certificate uploaded', subject: 'Karan Singh', user: 'Mrs. Anita Desai', type: 'document' },
  { time: '22 min ago', action: 'Attendance marked — Class 10-A', subject: '38/40 present', user: 'Mr. Rajiv Saxena', type: 'attendance' },
  { time: '30 min ago', action: 'Fee payment received', subject: 'Aditya Kumar — ₹45,000', user: 'System', type: 'fee' },
  { time: '45 min ago', action: 'Interview scheduled', subject: 'Deepak Yadav — Admission', user: 'Dr. Meena Shah', type: 'admission' },
  { time: '1 hr ago', action: 'Document verified', subject: 'Birth Certificate — Arjun Mehta', user: 'Mr. Sunil Rao', type: 'document' },
  { time: '1.5 hrs ago', action: 'New case created', subject: 'INT-2026-000001 — Academic Intervention', user: 'Mr. Rajiv Saxena', type: 'case' },
];
