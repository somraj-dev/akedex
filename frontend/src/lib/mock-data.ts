// =====================================================
// Akedex — Mock Data for V1 Development
// Realistic operational data for Bloomberg-style views
// =====================================================

export const mockStudents = [
  { id: '1', uai: 'AKD-STU-2026-8H4K92', firstName: 'Arjun', lastName: 'Mehta', class: '10-A', status: 'ACTIVE', attendance: 94, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1001', email: 'arjun.m@dps.edu', phone: '+91 98100 10001', dob: '2010-03-15', gender: 'MALE', guardian: 'Rajesh Mehta', guardianPhone: '+91 98100 20001' },
  { id: '2', uai: 'AKD-STU-2026-X9M2P1', firstName: 'Priya', lastName: 'Sharma', class: '10-B', status: 'ACTIVE', attendance: 98, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1002', email: 'priya.s@dps.edu', phone: '+91 98100 10002', dob: '2010-07-22', gender: 'FEMALE', guardian: 'Anil Sharma', guardianPhone: '+91 98100 20002' },
  { id: '3', uai: 'AKD-STU-2026-J7F3N5', firstName: 'Rohan', lastName: 'Gupta', class: '9-A', status: 'ACTIVE', attendance: 87, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1003', email: 'rohan.g@dps.edu', phone: '+91 98100 10003', dob: '2011-01-10', gender: 'MALE', guardian: 'Suresh Gupta', guardianPhone: '+91 98100 20003' },
  { id: '4', uai: 'AKD-STU-2026-T2Q8W4', firstName: 'Ananya', lastName: 'Patel', class: '11-Science', status: 'ACTIVE', attendance: 92, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1004', email: 'ananya.p@dps.edu', phone: '+91 98100 10004', dob: '2009-11-05', gender: 'FEMALE', guardian: 'Vikram Patel', guardianPhone: '+91 98100 20004' },
  { id: '5', uai: 'AKD-STU-2026-L5V9B7', firstName: 'Karan', lastName: 'Singh', class: '12-Commerce', status: 'TRANSFERRED', attendance: 78, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1005', email: 'karan.s@dps.edu', phone: '+91 98100 10005', dob: '2008-06-18', gender: 'MALE', guardian: 'Harpreet Singh', guardianPhone: '+91 98100 20005' },
  { id: '6', uai: 'AKD-STU-2026-C4D6M3', firstName: 'Meera', lastName: 'Joshi', class: '8-C', status: 'ACTIVE', attendance: 96, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1006', email: 'meera.j@dps.edu', phone: '+91 98100 10006', dob: '2012-02-28', gender: 'FEMALE', guardian: 'Deepak Joshi', guardianPhone: '+91 98100 20006' },
  { id: '7', uai: 'AKD-STU-2026-Y1R5K8', firstName: 'Aditya', lastName: 'Kumar', class: '10-A', status: 'ACTIVE', attendance: 91, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1007', email: 'aditya.k@dps.edu', phone: '+91 98100 10007', dob: '2010-09-12', gender: 'MALE', guardian: 'Manish Kumar', guardianPhone: '+91 98100 20007' },
  { id: '8', uai: 'AKD-STU-2026-P3N7Z2', firstName: 'Sneha', lastName: 'Reddy', class: '9-B', status: 'SUSPENDED', attendance: 65, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1008', email: 'sneha.r@dps.edu', phone: '+91 98100 10008', dob: '2011-04-03', gender: 'FEMALE', guardian: 'Krishna Reddy', guardianPhone: '+91 98100 20008' },
  { id: '9', uai: 'AKD-STU-2026-G8B4F6', firstName: 'Vikash', lastName: 'Tiwari', class: '11-Science', status: 'ACTIVE', attendance: 88, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1009', email: 'vikash.t@dps.edu', phone: '+91 98100 10009', dob: '2009-12-25', gender: 'MALE', guardian: 'Ram Tiwari', guardianPhone: '+91 98100 20009' },
  { id: '10', uai: 'AKD-STU-2026-H2M5X9', firstName: 'Nisha', lastName: 'Verma', class: '12-Arts', status: 'GRADUATED', attendance: 95, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1010', email: 'nisha.v@dps.edu', phone: '+91 98100 10010', dob: '2008-08-14', gender: 'FEMALE', guardian: 'Ashok Verma', guardianPhone: '+91 98100 20010' },
  { id: '11', uai: 'AKD-STU-2026-K9T1Q3', firstName: 'Rahul', lastName: 'Chauhan', class: '7-A', status: 'ACTIVE', attendance: 93, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1011', email: 'rahul.c@dps.edu', phone: '+91 98100 10011', dob: '2013-05-20', gender: 'MALE', guardian: 'Pankaj Chauhan', guardianPhone: '+91 98100 20011' },
  { id: '12', uai: 'AKD-STU-2026-W6J8V4', firstName: 'Kavya', lastName: 'Nair', class: '10-C', status: 'ACTIVE', attendance: 97, institution: 'Delhi Public School', admissionNo: 'DPS-2024-1012', email: 'kavya.n@dps.edu', phone: '+91 98100 10012', dob: '2010-10-30', gender: 'FEMALE', guardian: 'Sunil Nair', guardianPhone: '+91 98100 20012' },
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

export const mockTransferApplications = [
  {
    id: 'trf1',
    applicationNo: 'TRF-2026-001245',
    studentId: '5',
    studentName: 'Karan Singh',
    class: '12-Commerce',
    section: 'Commerce',
    ain: 'AKD-STU-2026-L5V9B7',
    status: 'Clearance Pending',
    reason: 'Parent job relocation to another state',
    preferredDate: '2026-07-15',
    additionalNotes: 'Need TC and character certificate at the earliest.',
    parentDeclaration: true,
    consentConfirmation: true,
    submittedDate: '2026-06-12T10:30:00Z',
    lastUpdated: '2026-06-13T14:20:00Z',
    assignedReviewer: 'Mrs. Anita Desai',
    clearances: [
      { department: 'Class Teacher', status: 'Approved', reviewer: 'Mr. Sharma', date: '2026-06-13', comments: 'All academics clear.' },
      { department: 'Accounts', status: 'Pending', reviewer: '', date: '', comments: '' },
      { department: 'Library', status: 'Requires Action', reviewer: 'Mrs. Gupta', date: '2026-06-13', comments: '1 book pending return.' },
      { department: 'Transport', status: 'Approved', reviewer: 'Mr. Singh', date: '2026-06-12', comments: 'No dues.' },
      { department: 'Administration', status: 'Pending', reviewer: '', date: '', comments: '' }
    ],
    internalNotes: [
      { author: 'Mrs. Anita Desai', text: 'Parent called to expedite.', timestamp: '2026-06-12T11:00:00Z' }
    ],
    communications: [
      { sender: 'Parent', role: 'parent', message: 'I have submitted the transfer application. Please process it quickly.', timestamp: '2026-06-12T10:35:00Z', attachments: [] },
      { sender: 'School Admin', role: 'school', message: 'We have received your application. It is under process. Please return the pending library book.', timestamp: '2026-06-13T14:20:00Z', attachments: [] }
    ],
    auditTrail: [
      { user: 'Parent', action: 'Application Submitted', timestamp: '2026-06-12T10:30:00Z', prevStatus: 'Draft', newStatus: 'Submitted' },
      { user: 'System', action: 'Department Review Started', timestamp: '2026-06-12T10:35:00Z', prevStatus: 'Submitted', newStatus: 'Clearance Pending' }
    ],
    documents: [
      { name: 'Relocation_Letter.pdf', uploadDate: '2026-06-12', size: '1.2 MB' }
    ]
  },
  {
    id: 'trf2',
    applicationNo: 'TRF-2026-001246',
    studentId: '8',
    studentName: 'Sneha Reddy',
    class: '9-B',
    section: 'B',
    ain: 'AKD-STU-2026-P3N7Z2',
    status: 'Principal Review',
    reason: 'Better academic opportunities',
    preferredDate: '2026-08-01',
    additionalNotes: 'Transferring to an international curriculum school.',
    parentDeclaration: true,
    consentConfirmation: true,
    submittedDate: '2026-06-10T09:15:00Z',
    lastUpdated: '2026-06-14T16:45:00Z',
    assignedReviewer: 'Dr. Meena Shah',
    clearances: [
      { department: 'Class Teacher', status: 'Approved', reviewer: 'Mrs. Kavita Menon', date: '2026-06-11', comments: 'Good student.' },
      { department: 'Accounts', status: 'Approved', reviewer: 'Ms. Pooja Iyer', date: '2026-06-12', comments: 'Fee cleared.' },
      { department: 'Library', status: 'Approved', reviewer: 'Mrs. Gupta', date: '2026-06-11', comments: 'All clear.' },
      { department: 'Transport', status: 'Approved', reviewer: 'Mr. Singh', date: '2026-06-12', comments: 'No dues.' },
      { department: 'Administration', status: 'Approved', reviewer: 'Mr. Sunil Rao', date: '2026-06-14', comments: 'All docs verified.' }
    ],
    internalNotes: [
      { author: 'Mr. Sunil Rao', text: 'Clearances done. Ready for principal sign-off.', timestamp: '2026-06-14T16:40:00Z' }
    ],
    communications: [
      { sender: 'School Admin', role: 'school', message: 'All clearances are approved. Moving to principal review.', timestamp: '2026-06-14T16:45:00Z', attachments: [] }
    ],
    auditTrail: [
      { user: 'Parent', action: 'Application Submitted', timestamp: '2026-06-10T09:15:00Z', prevStatus: 'Draft', newStatus: 'Submitted' },
      { user: 'System', action: 'Moved to Principal Review', timestamp: '2026-06-14T16:45:00Z', prevStatus: 'Clearance Pending', newStatus: 'Principal Review' }
    ],
    documents: [
      { name: 'Admission_Offer_Letter.pdf', uploadDate: '2026-06-10', size: '2.5 MB' }
    ]
  },
  {
    id: 'trf3',
    applicationNo: 'TRF-2026-001247',
    studentId: '10',
    studentName: 'Nisha Verma',
    class: '12-Arts',
    section: 'Arts',
    ain: 'AKD-STU-2026-H2M5X9',
    status: 'Approved',
    reason: 'Graduation',
    preferredDate: '2026-05-30',
    additionalNotes: 'Completed 12th grade.',
    parentDeclaration: true,
    consentConfirmation: true,
    submittedDate: '2026-05-15T11:20:00Z',
    lastUpdated: '2026-05-25T14:10:00Z',
    assignedReviewer: 'Dr. Meena Shah',
    clearances: [
      { department: 'Class Teacher', status: 'Approved', reviewer: 'Mr. Rajiv Saxena', date: '2026-05-16', comments: 'Passed with distinction.' },
      { department: 'Accounts', status: 'Approved', reviewer: 'Ms. Pooja Iyer', date: '2026-05-18', comments: 'No dues.' },
      { department: 'Library', status: 'Approved', reviewer: 'Mrs. Gupta', date: '2026-05-17', comments: 'All clear.' },
      { department: 'Transport', status: 'Approved', reviewer: 'Mr. Singh', date: '2026-05-16', comments: 'No dues.' },
      { department: 'Administration', status: 'Approved', reviewer: 'Mr. Sunil Rao', date: '2026-05-20', comments: 'Records archived.' }
    ],
    internalNotes: [],
    communications: [
      { sender: 'School Admin', role: 'school', message: 'Transfer application approved. Best wishes.', timestamp: '2026-05-25T14:10:00Z', attachments: [] }
    ],
    auditTrail: [
      { user: 'Dr. Meena Shah', action: 'Application Approved', timestamp: '2026-05-25T14:10:00Z', prevStatus: 'Principal Review', newStatus: 'Approved' }
    ],
    documents: []
  }
];
