import React, { useState } from 'react';
import { 
  User, MapPin, Building, Users, FileText, CheckCircle, 
  AlertCircle, Upload, Shield, GraduationCap, Phone,
  UserPlus, XCircle, Check
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { mockAdmissions } from '@/lib/mock-data';
import { ecosystemStudents } from '@/components/TransferAdmissionWizard';

// Define the incoming prop type based on mockAdmissions
interface ApplicantProps {
  app: {
    id: string;
    ref: string;
    name: string;
    applyingFor: string;
    status: string;
    date: string;
    source: string;
    previousSchool: string;
    uti?: string;
  };
}

export default function ApplicantProfileView() {
  const activeTabId = useAppStore(s => s.activeTabId);
  const appId = activeTabId.startsWith('applicant-profile-') 
    ? activeTabId.replace('applicant-profile-', '') 
    : '';

  let applicant = mockAdmissions.find(a => a.id === appId);
  
  if (!applicant) {
    const ecoStudent = ecosystemStudents.find(s => s.id === appId);
    if (ecoStudent) {
      applicant = {
        id: ecoStudent.id,
        ref: ecoStudent.uti,
        name: ecoStudent.name,
        applyingFor: 'Grade 10',
        status: 'SUBMITTED',
        date: new Date().toISOString().split('T')[0],
        source: 'AKEDEX_ECOSYSTEM',
        previousSchool: ecoStudent.role.replace('Student at ', '')
      };
    } else {
      applicant = mockAdmissions[0];
    }
  }

  return <ApplicantProfile app={applicant} />;
}

export function ApplicantProfile({ app }: ApplicantProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  // Helper to generate deterministic mock data based on the applicant's name
  const generateMockDetails = (name: string) => {
    const parts = name.split(' ');
    const first = parts[0];
    const last = parts.length > 1 ? parts[parts.length - 1] : '';
    
    return {
      firstName: first,
      lastName: last,
      gender: ['Ravi', 'Amit', 'Deepak', 'Sameer'].includes(first) ? 'Male' : 'Female',
      dob: '15 May 2015',
      bloodGroup: 'O+',
      nationality: 'Indian',
      category: 'General',
      religion: 'Hindu',
      mobile: '+91 98765 43210',
      email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      address: '123, Green Avenue, Sector 45',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pin: '201301',
      
      fatherName: `Rajesh ${last}`,
      fatherMobile: '+91 98765 11111',
      fatherOcc: 'IT Professional',
      fatherOrg: 'TCS Pvt. Ltd.',
      
      motherName: `Neha ${last}`,
      motherMobile: '+91 98765 22222',
      motherOcc: 'Teacher',
      motherOrg: 'Delhi Public School',
      
      emergencyName: `Suresh ${last}`,
      emergencyRel: 'Uncle',
      emergencyMobile: '+91 98765 33333',
      
      prevBoard: 'CBSE',
      prevCity: 'Noida',
      prevState: 'Uttar Pradesh',
      prevYear: '2024-25',
      prevPct: '92.40%',
      prevAtt: '96%',
    };
  };

  const details = generateMockDetails(app.name);

  // Styling helpers
  const cardStyle = {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
  };

  const Field = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
        {value}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building size={16} color="var(--accent-blue)" /> Application Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Field label="Previous Institution" value={app.previousSchool} />
          <Field label="Submission Date" value={app.date} />
          <Field label="Current State" value={app.status.replace('_', ' ')} />
          <Field label="Referral Channel" value={app.source} />
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={16} color="var(--accent-green)" /> Workflow Status
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1, height: '4px', background: 'var(--accent-green)', borderRadius: '2px' }} />
          <div style={{ flex: 1, height: '4px', background: ['DOCUMENTS_PENDING', 'SUBMITTED'].includes(app.status) ? 'var(--border-primary)' : 'var(--accent-green)', borderRadius: '2px' }} />
          <div style={{ flex: 1, height: '4px', background: ['ACCEPTED', 'VERIFIED'].includes(app.status) ? 'var(--accent-green)' : 'var(--border-primary)', borderRadius: '2px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: 600 }}>
          <span>Submitted</span>
          <span>Under Review</span>
          <span>Decision</span>
        </div>
      </div>
    </div>
  );

  const renderStudentInfo = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={16} color="var(--accent-blue)" /> Personal Details
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <Field label="First Name" value={details.firstName} />
          <Field label="Last Name" value={details.lastName} />
          <Field label="Gender" value={details.gender} />
          <Field label="Date of Birth" value={details.dob} />
          <Field label="Blood Group" value={details.bloodGroup} />
          <Field label="Nationality" value={details.nationality} />
          <Field label="Category" value={details.category} />
          <Field label="Religion" value={details.religion} />
        </div>
      </div>
      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={16} color="var(--accent-purple)" /> Contact & Address
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <Field label="Mobile Number" value={details.mobile} />
          <Field label="Email Address" value={details.email} />
          <Field label="Address" value={details.address} />
          <Field label="City" value={details.city} />
          <Field label="State" value={details.state} />
          <Field label="PIN Code" value={details.pin} />
        </div>
      </div>
    </div>
  );

  const renderParents = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={16} color="#3b82f6" /> Father's Details
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <Field label="Name" value={details.fatherName} />
          <Field label="Mobile Number" value={details.fatherMobile} />
          <Field label="Occupation" value={details.fatherOcc} />
          <Field label="Organization" value={details.fatherOrg} />
        </div>
      </div>
      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={16} color="#ec4899" /> Mother's Details
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <Field label="Name" value={details.motherName} />
          <Field label="Mobile Number" value={details.motherMobile} />
          <Field label="Occupation" value={details.motherOcc} />
          <Field label="Organization" value={details.motherOrg} />
        </div>
      </div>
      <div style={{...cardStyle, background: 'rgba(245, 158, 11, 0.02)', borderColor: 'rgba(245, 158, 11, 0.2)'}}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#d97706', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={16} color="#d97706" /> Emergency Contact
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <Field label="Contact Name" value={details.emergencyName} />
          <Field label="Relationship" value={details.emergencyRel} />
          <Field label="Mobile Number" value={details.emergencyMobile} />
        </div>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building size={16} color="#10b981" /> Previous School Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <Field label="Previous School Name" value={app.previousSchool} />
          <Field label="School Board" value={details.prevBoard} />
          <Field label="School City" value={details.prevCity} />
          <Field label="School State" value={details.prevState} />
        </div>
      </div>
      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GraduationCap size={16} color="#8b5cf6" /> Academic Performance
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <Field label="Academic Year" value={details.prevYear} />
          <Field label="Percentage / CGPA" value={details.prevPct} />
          <Field label="Attendance %" value={details.prevAtt} />
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={16} color="var(--accent-blue)" /> Verification Checklist
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border-primary)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
              <CheckCircle size={18} color="var(--accent-green)" />
              <span style={{ fontWeight: 500 }}>Birth Certificate & Identity Proof</span>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>VERIFIED</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border-primary)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
              <CheckCircle size={18} color="var(--accent-green)" />
              <span style={{ fontWeight: 500 }}>Academic Marksheets / Transcripts</span>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>VERIFIED</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border-primary)', borderRadius: '8px', background: app.status === 'DOCUMENTS_PENDING' ? 'rgba(239, 68, 68, 0.05)' : 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
              {app.status === 'DOCUMENTS_PENDING' ? <AlertCircle size={18} color="#ef4444" /> : <CheckCircle size={18} color="var(--accent-green)" />}
              <span style={{ fontWeight: 500 }}>Transfer Certificate (TC)</span>
            </div>
            <span style={{ fontSize: '10px', color: app.status === 'DOCUMENTS_PENDING' ? '#ef4444' : 'var(--text-tertiary)', fontWeight: 600 }}>
              {app.status === 'DOCUMENTS_PENDING' ? 'PENDING' : 'VERIFIED'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-secondary)',
      animation: 'slideInFromLeft var(--transition-normal)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden'
    }}>
      {/* Header Profile Section */}
      <div style={{
        padding: '24px 24px 0',
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-primary)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '24px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', 
            background: (() => {
              const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];
              const num = app.id.match(/\d+/) ? parseInt(app.id.match(/\d+/)![0]) : app.name.length;
              return colors[num % colors.length];
            })(),
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            fontSize: '32px', fontWeight: 700, flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {app.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)',
                padding: '2px 6px', borderRadius: '4px'
              }}>ADMISSION WORKFLOW</span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{app.ref}</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              {app.name}
            </h2>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Applying for {app.applyingFor}</span>
              <span>•</span>
              <span>Source: {app.source}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid transparent' }}>
          {['Overview', 'Student Info', 'Parents', 'Education', 'Documents'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 4px',
                fontSize: '13px',
                fontWeight: 600,
                color: activeTab === tab ? 'var(--accent-blue)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${activeTab === tab ? 'var(--accent-blue)' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                top: '1px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {activeTab === 'Overview' && renderOverview()}
        {activeTab === 'Student Info' && renderStudentInfo()}
        {activeTab === 'Parents' && renderParents()}
        {activeTab === 'Education' && renderEducation()}
        {activeTab === 'Documents' && renderDocuments()}
      </div>

      {/* Fixed Decision Panel Footer */}
      <div style={{
        padding: '16px 24px',
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>
          DECISION PANEL
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '6px',
            background: 'transparent', border: '1px solid var(--border-primary)', color: 'var(--accent-red)',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer'
          }}>
            <XCircle size={16} /> Reject
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '6px',
            background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer'
          }}>
            <FileText size={16} /> Request Docs
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 20px', borderRadius: '6px',
            background: 'var(--accent-blue)', border: 'none', color: '#ffffff',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 4px rgba(59,130,246,0.2)'
          }}>
            <UserPlus size={16} /> Approve & Enroll
          </button>
        </div>
      </div>
    </div>
  );
}
