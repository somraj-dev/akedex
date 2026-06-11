'use client';

import React, { useState } from 'react';
import { 
  User, MapPin, Building, Users, AlertCircle, Phone, 
  GraduationCap, Book, Upload, CheckSquare, Edit2, 
  CheckCircle2, ArrowRight, ArrowLeft, PenTool, Shield, Lock, Info, Check
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function FreshAdmissionWizard() {
  const openTab = useAppStore(s => s.openTab);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: Student Info
    firstName: '', middleName: '', lastName: '',
    gender: '', dob: '', bloodGroup: '',
    nationality: '', category: '', religion: '',
    aadhaar: '', apaar: '',
    mobile: '', email: '',
    address1: '', address2: '', city: '', state: '', pin: '', country: '',
    applyingClass: '', academicSession: '', admissionType: 'New Admission',
    transport: 'No', hostel: 'No', specialNeeds: '',

    // Step 2: Parent/Guardian
    fatherName: '', fatherMobile: '', fatherEmail: '', fatherOcc: '', fatherOrg: '', fatherIncome: '', fatherQual: '',
    motherName: '', motherMobile: '', motherEmail: '', motherOcc: '', motherOrg: '', motherIncome: '', motherQual: '',
    guardianName: '', guardianRel: '', guardianMobile: '', guardianAddress: '', guardianOcc: '',
    emergencyName: '', emergencyRel: '', emergencyMobile: '',

    // Step 3: Education
    prevSchool: '', prevBoard: '', prevCity: '', prevState: '', prevClass: '', prevMedium: '',
    prevYear: '', prevPct: '', prevAtt: '', prevAchiev: '',
    tcAvailable: 'Yes', leaveReason: '',
    disciplinary: 'No', disciplinaryDetails: '',

    // Step 4: Consent
    certifyInfo: false,
    authorizeVerify: false,
    agreePolicies: false,
    signStudent: '',
    signParent: '',
    signDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(s => s + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep(s => s - 1);
  };

  const handleSubmit = () => {
    // Generate a fake application ID
    const generatedId = 'APP-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    setAppId(generatedId);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  // Common input styles
  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    fontSize: '13px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-primary)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '6px',
  };

  const sectionCardStyle = {
    border: '1px solid var(--border-primary)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    backgroundColor: 'var(--bg-primary)'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--accent-blue)',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-primary)'
  };

  const req = <span style={{ color: '#ef4444' }}>*</span>;

  // Render inputs helper
  const renderInput = (label: string, name: string, placeholder: string, required = false, type = 'text') => (
    <div style={{ flex: 1, minWidth: '200px', marginBottom: '16px' }}>
      <label style={labelStyle}>{label} {required && req}</label>
      <input 
        type={type} 
        name={name} 
        value={(formData as any)[name]} 
        onChange={handleChange} 
        placeholder={placeholder}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
        onBlur={e => e.target.style.borderColor = 'var(--border-primary)'}
      />
    </div>
  );

  const renderSelect = (label: string, name: string, options: string[], required = false) => (
    <div style={{ flex: 1, minWidth: '200px', marginBottom: '16px' }}>
      <label style={labelStyle}>{label} {required && req}</label>
      <select 
        name={name} 
        value={(formData as any)[name]} 
        onChange={handleChange}
        style={{...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px top 50%', backgroundSize: '10px auto'}}
      >
        <option value="" disabled>Select {label.toLowerCase()}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  const renderRadioGroup = (label: string, name: string, options: string[], required = false) => (
    <div style={{ flex: 1, minWidth: '200px', marginBottom: '16px' }}>
      <label style={labelStyle}>{label} {required && req}</label>
      <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
        {options.map(opt => (
          <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%', 
              border: `2px solid ${(formData as any)[name] === opt ? 'var(--accent-blue)' : 'var(--border-primary)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {(formData as any)[name] === opt && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)' }} />}
            </div>
            <input 
              type="radio" 
              name={name} 
              value={opt}
              checked={(formData as any)[name] === opt}
              onChange={() => handleRadioChange(name, opt)}
              style={{ display: 'none' }}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  // --- Step 1: Student Information ---
  const Step1 = () => (
    <div>
      <div style={sectionCardStyle}>
        <div style={sectionHeaderStyle}><User size={18} /> Personal Details</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('First Name', 'firstName', 'Enter first name', true)}
          {renderInput('Middle Name', 'middleName', 'Enter middle name')}
          {renderInput('Last Name', 'lastName', 'Enter last name', true)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderSelect('Gender', 'gender', ['Male', 'Female', 'Other'], true)}
          {renderInput('Date of Birth', 'dob', 'DD / MM / YYYY', true, 'date')}
          {renderSelect('Blood Group', 'bloodGroup', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderSelect('Nationality', 'nationality', ['Indian', 'Other'], true)}
          {renderSelect('Category', 'category', ['General', 'OBC', 'SC', 'ST'])}
          {renderSelect('Religion', 'religion', ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'])}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('Aadhaar Number (Optional)', 'aadhaar', 'Enter aadhaar number')}
          {renderInput('APAAR ID (Optional)', 'apaar', 'Enter APAAR ID')}
        </div>
      </div>

      <div style={sectionCardStyle}>
        <div style={sectionHeaderStyle}><MapPin size={18} /> Contact & Address</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('Mobile Number', 'mobile', 'Enter mobile number', true)}
          {renderInput('Email Address', 'email', 'Enter email address', true, 'email')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('Address Line 1', 'address1', 'House / Building / Street', true)}
          {renderInput('Address Line 2', 'address2', 'Area / Locality (Optional)')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('City', 'city', 'Enter city', true)}
          {renderSelect('State', 'state', ['Uttar Pradesh', 'Delhi', 'Maharashtra', 'Karnataka'], true)}
          {renderInput('PIN Code', 'pin', 'Enter PIN code', true)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, maxWidth: '33%' }}>
            {renderSelect('Country', 'country', ['India', 'Other'], true)}
          </div>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <div style={sectionHeaderStyle}><Building size={18} /> Admission Information</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderSelect('Applying For Class', 'applyingClass', ['Grade 1', 'Grade 5', 'Grade 6', 'Grade 10'], true)}
          {renderSelect('Academic Session', 'academicSession', ['2025-26', '2026-27'], true)}
          {renderSelect('Admission Type', 'admissionType', ['New Admission', 'Transfer'], true)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          {renderRadioGroup('Transport Required?', 'transport', ['Yes', 'No'])}
          {renderRadioGroup('Hostel Required?', 'hostel', ['Yes', 'No'])}
          {renderInput('Special Needs / Medical Condition', 'specialNeeds', 'Please specify (if any)')}
        </div>
      </div>
    </div>
  );

  // --- Step 2: Parent / Guardian Information ---
  const Step2 = () => (
    <div>
      <div style={sectionCardStyle}>
        <div style={{...sectionHeaderStyle, color: '#3b82f6'}}><User size={18} /> Father's Details</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput("Father's Name", 'fatherName', "Enter father's name", true)}
          {renderInput('Mobile Number', 'fatherMobile', 'Enter mobile number', true)}
          {renderInput('Email Address', 'fatherEmail', 'Enter email address')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('Occupation', 'fatherOcc', 'Enter occupation')}
          {renderInput('Organization / Company', 'fatherOrg', 'Enter organization')}
          {renderSelect('Annual Income', 'fatherIncome', ['< 5L', '5L - 10L', '10L - 20L', '> 20L'])}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, maxWidth: '33%' }}>
            {renderInput('Qualification', 'fatherQual', 'Enter qualification')}
          </div>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <div style={{...sectionHeaderStyle, color: '#ec4899'}}><User size={18} /> Mother's Details</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput("Mother's Name", 'motherName', "Enter mother's name", true)}
          {renderInput('Mobile Number', 'motherMobile', 'Enter mobile number', true)}
          {renderInput('Email Address', 'motherEmail', 'Enter email address')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('Occupation', 'motherOcc', 'Enter occupation')}
          {renderInput('Organization / Company', 'motherOrg', 'Enter organization')}
          {renderSelect('Annual Income', 'motherIncome', ['< 5L', '5L - 10L', '10L - 20L', '> 20L'])}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, maxWidth: '33%' }}>
            {renderInput('Qualification', 'motherQual', 'Enter qualification')}
          </div>
        </div>
      </div>

      <div style={{...sectionCardStyle, backgroundColor: 'rgba(139, 92, 246, 0.02)', borderColor: 'rgba(139, 92, 246, 0.2)'}}>
        <div style={{...sectionHeaderStyle, color: '#8b5cf6'}}><Users size={18} /> Guardian Details (Optional)</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('Guardian Name', 'guardianName', 'Enter guardian name')}
          {renderSelect('Relationship', 'guardianRel', ['Uncle', 'Aunt', 'Grandparent', 'Other'])}
          {renderInput('Mobile Number', 'guardianMobile', 'Enter mobile number')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 2 }}>{renderInput('Address', 'guardianAddress', 'Enter address')}</div>
          <div style={{ flex: 1 }}>{renderInput('Occupation', 'guardianOcc', 'Enter occupation')}</div>
        </div>
      </div>

      <div style={{...sectionCardStyle, backgroundColor: 'rgba(245, 158, 11, 0.02)', borderColor: 'rgba(245, 158, 11, 0.2)'}}>
        <div style={{...sectionHeaderStyle, color: '#d97706'}}><AlertCircle size={18} /> Emergency Contact</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('Contact Name', 'emergencyName', 'Enter contact name', true)}
          {renderSelect('Relationship', 'emergencyRel', ['Father', 'Mother', 'Guardian', 'Other'], true)}
          {renderInput('Mobile Number', 'emergencyMobile', 'Enter mobile number', true)}
        </div>
      </div>
    </div>
  );

  // --- Step 3: Educational History ---
  const Step3 = () => (
    <div>
      <div style={sectionCardStyle}>
        <div style={{...sectionHeaderStyle, color: '#10b981'}}><Building size={18} /> Previous School Information</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('Previous School Name', 'prevSchool', 'Enter school name', true)}
          {renderSelect('School Board', 'prevBoard', ['CBSE', 'ICSE', 'State Board'], true)}
          {renderInput('School City', 'prevCity', 'Enter city', true)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderSelect('School State', 'prevState', ['Uttar Pradesh', 'Delhi', 'Maharashtra'], true)}
          {renderSelect('Last Class Studied', 'prevClass', ['Grade 4', 'Grade 5', 'Grade 9'], true)}
          {renderSelect('Medium of Instruction', 'prevMedium', ['English', 'Hindi'], true)}
        </div>
      </div>

      <div style={sectionCardStyle}>
        <div style={{...sectionHeaderStyle, color: '#8b5cf6'}}><GraduationCap size={18} /> Academic Performance</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderSelect('Previous Academic Year', 'prevYear', ['2024-25', '2023-24'], true)}
          {renderInput('Percentage / CGPA', 'prevPct', 'Enter percentage or CGPA', true)}
          {renderInput('Attendance % (Approx.)', 'prevAtt', 'Enter attendance %')}
        </div>
        <div style={{ flex: 1, marginBottom: '16px' }}>
          <label style={labelStyle}>Achievements (Optional)</label>
          <textarea 
            name="prevAchiev" 
            value={formData.prevAchiev} 
            onChange={handleChange}
            placeholder="Enter achievements, awards, etc."
            style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}
          />
        </div>
      </div>

      <div style={{...sectionCardStyle, backgroundColor: 'rgba(245, 158, 11, 0.02)', borderColor: 'rgba(245, 158, 11, 0.2)'}}>
        <div style={{...sectionHeaderStyle, color: '#d97706'}}><Book size={18} /> Transfer Information</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
          {renderRadioGroup('Transfer Certificate Available?', 'tcAvailable', ['Yes', 'No'], true)}
          {renderSelect('Reason for Leaving School', 'leaveReason', ['Personal Reasons', 'Relocation', 'Completed Grade', 'Other'], true)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
          {renderRadioGroup('Disciplinary Record', 'disciplinary', ['Yes', 'No'])}
          {renderInput('If yes, please specify (Optional)', 'disciplinaryDetails', 'Enter details (if any)')}
        </div>
      </div>

      <div style={{...sectionCardStyle, backgroundColor: 'rgba(59, 130, 246, 0.02)', borderColor: 'rgba(59, 130, 246, 0.2)', textAlign: 'center', padding: '40px 24px'}}>
        <Upload size={32} color="#3b82f6" style={{ margin: '0 auto 16px' }} />
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Document Uploads</h4>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Upload the required documents (You can upload after submission as well)</p>
        <button style={{
          backgroundColor: '#ffffff', border: '1px solid #3b82f6', color: '#3b82f6',
          padding: '8px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
        }}>
          Upload Documents
        </button>
        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '16px' }}>Accepted formats: JPG, PNG, PDF (Max 5MB each)</p>
      </div>
    </div>
  );

  // --- Step 4: Declaration & Consent ---
  const Step4 = () => (
    <div>
      <div style={sectionCardStyle}>
        <div style={sectionHeaderStyle}><CheckSquare size={18} /> Please confirm the following before submitting your application:</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Consent 1 */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--border-primary)', borderRadius: '8px', cursor: 'pointer' }}>
            <input type="checkbox" name="certifyInfo" checked={formData.certifyInfo} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={20} />
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                I certify that all information provided in this application is true, accurate, and complete to the best of my knowledge. I understand that providing false information may result in rejection or cancellation of admission.
              </p>
            </div>
          </label>

          {/* Consent 2 */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--border-primary)', borderRadius: '8px', cursor: 'pointer' }}>
            <input type="checkbox" name="authorizeVerify" checked={formData.authorizeVerify} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={20} />
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                I authorize AcadEx and the educational institution to verify the submitted information and supporting documents for admission and academic purposes.
              </p>
            </div>
          </label>

          {/* Consent 3 */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--border-primary)', borderRadius: '8px', cursor: 'pointer' }}>
            <input type="checkbox" name="agreePolicies" checked={formData.agreePolicies} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fffbeb', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={20} />
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                I have read and agree to the Institution's <span style={{ color: '#3b82f6' }}>Admission Policy, Privacy Policy, Terms & Conditions</span>, and consent to the processing of student and parent data for educational and administrative purposes.
              </p>
            </div>
          </label>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <div style={{...sectionHeaderStyle, color: '#8b5cf6'}}><PenTool size={18} /> Sign & Confirm</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {renderInput('Student Name', 'signStudent', 'Enter student full name')}
          {renderInput('Parent / Guardian Name', 'signParent', 'Enter parent / guardian full name')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, maxWidth: '50%' }}>
            {renderInput('Date', 'signDate', 'DD / MM / YYYY', false, 'date')}
          </div>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <Info size={18} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
            After submission, you will receive an Application ID on your registered email and mobile number. You can track your application status using that ID.
          </p>
        </div>
      </div>
    </div>
  );

  // --- Step 5: Review ---
  const SummaryField = ({ label, value }: { label: string, value: string }) => (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{value || '-'}</div>
    </div>
  );

  const Step5 = () => (
    <div>
      <div style={{ padding: '12px 16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#059669', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <CheckCircle2 size={16} /> Please ensure all the details below are accurate. You can go back to edit if needed.
      </div>

      {/* Summary Section 1 */}
      <div style={sectionCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700, color: '#3b82f6' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</div>
            Student Information
          </div>
          <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <Edit2 size={14} /> Edit
          </button>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <SummaryField label="Full Name" value={`${formData.firstName} ${formData.lastName}`} />
            <SummaryField label="Applying For Class" value={formData.applyingClass} />
            <SummaryField label="Date of Birth" value={formData.dob} />
            <SummaryField label="Academic Session" value={formData.academicSession} />
            <SummaryField label="Gender" value={formData.gender} />
            <SummaryField label="Admission Type" value={formData.admissionType} />
            <SummaryField label="Nationality" value={formData.nationality} />
            <SummaryField label="Transport Required" value={formData.transport} />
            <SummaryField label="Category" value={formData.category} />
            <SummaryField label="Hostel Required" value={formData.hostel} />
            <SummaryField label="Religion" value={formData.religion} />
            <SummaryField label="Special Needs" value={formData.specialNeeds} />
            <SummaryField label="Blood Group" value={formData.bloodGroup} />
            <SummaryField label="Email" value={formData.email} />
            <SummaryField label="Aadhaar Number" value={formData.aadhaar} />
            <SummaryField label="Mobile Number" value={formData.mobile} />
          </div>
          <div style={{ width: '120px', height: '140px', background: '#eff6ff', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
            <User size={48} opacity={0.5} />
            <span style={{ fontSize: '10px', marginTop: '12px', fontWeight: 600 }}>Photo Placeholder</span>
          </div>
        </div>
        <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-primary)', paddingTop: '16px' }}>
          <SummaryField label="Address" value={`${formData.address1}, ${formData.address2 ? formData.address2 + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pin}, ${formData.country}`} />
        </div>
      </div>

      {/* Summary Section 2 */}
      <div style={sectionCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700, color: '#8b5cf6' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8b5cf6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>2</div>
            Parent / Guardian Information
          </div>
          <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#8b5cf6', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <Edit2 size={14} /> Edit
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          <div>
            <h5 style={{ color: '#3b82f6', margin: '0 0 12px', fontSize: '13px' }}>Father's Details</h5>
            <SummaryField label="Name" value={formData.fatherName} />
            <SummaryField label="Mobile Number" value={formData.fatherMobile} />
            <SummaryField label="Email" value={formData.fatherEmail} />
            <SummaryField label="Occupation" value={formData.fatherOcc} />
            <SummaryField label="Organization" value={formData.fatherOrg} />
            <SummaryField label="Annual Income" value={formData.fatherIncome} />
          </div>
          <div>
            <h5 style={{ color: '#ec4899', margin: '0 0 12px', fontSize: '13px' }}>Mother's Details</h5>
            <SummaryField label="Name" value={formData.motherName} />
            <SummaryField label="Mobile Number" value={formData.motherMobile} />
            <SummaryField label="Email" value={formData.motherEmail} />
            <SummaryField label="Occupation" value={formData.motherOcc} />
            <SummaryField label="Organization" value={formData.motherOrg} />
            <SummaryField label="Annual Income" value={formData.motherIncome} />
          </div>
          <div>
            <h5 style={{ color: '#10b981', margin: '0 0 12px', fontSize: '13px' }}>Emergency Contact</h5>
            <SummaryField label="Name" value={formData.emergencyName} />
            <SummaryField label="Relationship" value={formData.emergencyRel} />
            <SummaryField label="Mobile Number" value={formData.emergencyMobile} />
          </div>
        </div>
      </div>

      {/* Summary Section 3 */}
      <div style={sectionCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700, color: '#10b981' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>3</div>
            Educational History
          </div>
          <button onClick={() => setStep(3)} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <Edit2 size={14} /> Edit
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          <div>
            <h5 style={{ color: 'var(--text-primary)', margin: '0 0 12px', fontSize: '13px' }}>Previous School</h5>
            <SummaryField label="School Name" value={formData.prevSchool} />
            <SummaryField label="Board" value={formData.prevBoard} />
            <SummaryField label="City" value={formData.prevCity} />
            <SummaryField label="Last Class Studied" value={formData.prevClass} />
          </div>
          <div>
            <h5 style={{ color: 'var(--text-primary)', margin: '0 0 12px', fontSize: '13px' }}>Performance</h5>
            <SummaryField label="Academic Year" value={formData.prevYear} />
            <SummaryField label="Percentage / CGPA" value={formData.prevPct} />
            <SummaryField label="Attendance" value={formData.prevAtt} />
            <SummaryField label="Achievements" value={formData.prevAchiev} />
          </div>
          <div>
            <h5 style={{ color: 'var(--text-primary)', margin: '0 0 12px', fontSize: '13px' }}>Transfer Info</h5>
            <SummaryField label="Transfer Certificate" value={formData.tcAvailable} />
            <SummaryField label="Reason for Leaving" value={formData.leaveReason} />
            <SummaryField label="Disciplinary Record" value={formData.disciplinary} />
          </div>
        </div>
      </div>

      <div style={{ padding: '16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <Shield size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
        <div>
          <h5 style={{ color: '#b45309', margin: '0 0 4px', fontSize: '14px', fontWeight: 700 }}>Declaration</h5>
          <p style={{ fontSize: '13px', color: '#b45309', margin: 0, lineHeight: 1.5 }}>
            By submitting this application, I hereby declare that all the information provided above is true and correct to the best of my knowledge.
          </p>
        </div>
      </div>

    </div>
  );

  // --- Success / Submitted State ---
  if (submitted) {
    return (
      <div style={{
        display: 'flex', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        alignItems: 'flex-start', justifyContent: 'center', padding: '60px 20px', overflowY: 'auto'
      }}>
        <div style={{
          background: 'var(--bg-primary)', border: 'none', borderRadius: '16px',
          maxWidth: '700px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden'
        }}>
          {/* Header section */}
          <div style={{ background: '#22c55e', padding: '40px', textAlign: 'center', color: '#ffffff' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ffffff', color: '#22c55e', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Check size={40} strokeWidth={4} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>Submitted!</h2>
          </div>
          
          {/* Body section */}
          <div style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#2563eb', marginBottom: '24px' }}>
              Congratulations!
            </h3>
            
            <p style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '20px', lineHeight: 1.6, fontWeight: 500 }}>
              You have successfully submitted your fresh admission application for <strong>{formData.firstName} {formData.lastName}</strong>.
            </p>
            
            <p style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '20px', lineHeight: 1.6, fontWeight: 500 }}>
              Your Application Reference ID is <strong>{appId}</strong>.
            </p>

            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
              You can review the status of your admission requirements in the Admissions Dashboard. Please ensure that any incomplete documents are uploaded prior to the application deadline.
            </p>
            
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
              AcadEx has recommended certain next steps for your application process. You can access that information by clicking on What's next below.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid var(--border-primary)', paddingTop: '24px' }}>
              <button 
                onClick={() => openTab({ id: 'dashboard', label: 'Overview', view: 'dashboard' })}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'var(--bg-primary)', border: '1px solid var(--text-tertiary)',
                  color: 'var(--text-secondary)', padding: '10px 20px', borderRadius: '24px',
                  fontSize: '14px', fontWeight: 700, cursor: 'pointer'
                }}
              >
                🎉 Celebrate!
              </button>
              
              <button 
                onClick={() => openTab({ id: 'admissions', label: 'Admissions', view: 'admissions' })}
                style={{
                  background: '#047857', border: 'none',
                  color: '#ffffff', padding: '10px 24px', borderRadius: '24px',
                  fontSize: '14px', fontWeight: 700, cursor: 'pointer'
                }}
              >
                What's next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Render ---
  const stepTitles = [
    { title: "Let's start with student information", desc: "Please provide basic details about the student." },
    { title: "Now, tell us about the parents / guardians", desc: "Please provide details of the student's parents or guardians." },
    { title: "Almost done! Tell us about the student's educational history", desc: "Please provide the student's previous educational details." },
    { title: "Declaration & Consent", desc: "Please read the following statements carefully and confirm your agreement." },
    { title: "Review Your Application", desc: "Please review all the information carefully before submitting." }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--bg-secondary)',
      overflowY: 'auto'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '40px 24px' }}>
        
        {/* Step Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.2 }}>
              {stepTitles[step - 1].title}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {stepTitles[step - 1].desc}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '4px', paddingTop: '12px' }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                width: '32px', height: '4px', borderRadius: '2px',
                background: i <= step ? 'var(--accent-blue)' : 'var(--border-primary)'
              }} />
            ))}
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && Step1()}
        {step === 2 && Step2()}
        {step === 3 && Step3()}
        {step === 4 && Step4()}
        {step === 5 && Step5()}

        {/* Footer Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: step > 1 ? 'space-between' : 'flex-end', 
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-primary)'
        }}>
          {step > 1 && (
            <button 
              onClick={prevStep}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)', padding: '10px 20px', borderRadius: '6px',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {step < 5 ? (
            <button 
              onClick={nextStep}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--accent-blue)', border: 'none',
                color: '#ffffff', padding: '10px 24px', borderRadius: '6px',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
              }}
            >
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--accent-green)', border: 'none',
                color: '#ffffff', padding: '10px 24px', borderRadius: '6px',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
              }}
            >
              Submit Application <Check size={16} />
            </button>
          )}
        </div>
        {step === 5 && (
          <p style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '12px' }}>
            <Lock size={10} style={{ display: 'inline', position: 'relative', top: '1px' }} /> You won't be able to edit after submission
          </p>
        )}

      </div>
    </div>
  );
}
