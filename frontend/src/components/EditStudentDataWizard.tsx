'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { mockStudents } from '@/lib/mock-data';
import { User, BookOpen, MapPin, FileText, Check, ArrowRight, Camera, Users, ArrowLeft } from 'lucide-react';

const Field = ({ label, name, value, type = 'text', required = false, options = [], disabled = false, onChange }: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
      <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {type === 'select' ? (
        <select 
          name={name} 
          value={value} 
          onChange={onChange}
          disabled={disabled}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', color: disabled ? '#94a3b8' : '#0f172a', background: disabled ? '#f8fafc' : '#fff', outline: 'none', height: '36px', cursor: disabled ? 'not-allowed' : 'auto' }}
        >
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : type === 'radio' ? (
        <div style={{ display: 'flex', gap: '16px', height: '36px', alignItems: 'center' }}>
          {options.map((opt: string) => (
            <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: disabled ? '#94a3b8' : '#0f172a', cursor: disabled ? 'not-allowed' : 'pointer' }}>
              <input type="radio" name={name} value={opt} checked={value === opt} onChange={onChange} disabled={disabled} style={{ cursor: disabled ? 'not-allowed' : 'pointer', accentColor: '#2563eb' }} />
              {opt}
            </label>
          ))}
        </div>
      ) : (
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={onChange}
          placeholder={label}
          disabled={disabled}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', color: disabled ? '#94a3b8' : '#0f172a', background: disabled ? '#f8fafc' : '#fff', outline: 'none', height: '36px', cursor: disabled ? 'not-allowed' : 'auto' }}
        />
      )}
    </div>
  );
};

export default function EditStudentDataWizard({ studentId }: { studentId: string }) {
  const closeTab = useAppStore(s => s.closeTab);
  const activeTabId = useAppStore(s => s.activeTabId);
  
  // Find student in mock data
  const sIndex = mockStudents.findIndex(s => s.id === studentId);
  const initialStudent = mockStudents[sIndex] || mockStudents[0];
  
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    fullName: initialStudent.firstName + ' ' + initialStudent.lastName,
    studentId: initialStudent.uai || 'STU2024001',
    admissionNo: initialStudent.admissionNo || 'ADM2024001',
    dob: initialStudent.dob || '2006-06-15',
    age: '17 Years',
    gender: initialStudent.gender || 'Male',
    bloodGroup: 'B+',
    nationality: 'Indian',
    religion: 'Hindu',
    category: 'General',
    caste: 'Kshatriya',
    motherTongue: 'Hindi',
    aadhaarNo: '1234 5678 9012',
    panNo: 'ABCDE1234F',
    email: initialStudent.email || 'student@email.com',
    phone: initialStudent.phone || '+91 98765 43210',
    altPhone: '+91 91234 56789',
    whatsapp: '+91 98765 43210',
    
    academicYear: '2024-2025',
    classGrade: initialStudent.class || 'Class 11',
    section: 'A',
    rollNumber: '11A21',
    stream: 'Science',
    subjectCombo: 'Physics, Chemistry, Maths, English',
    house: 'Brahmos',
    admissionDate: '2023-04-01',
    currentStatus: initialStudent.status || 'Active',
    prevSchool: 'Delhi Public School',
    medium: 'English',

    address1: '123, Green Park Society',
    address2: 'Apartment, suite, unit, etc. (optional)',
    landmark: 'Near City Mall',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400076',
    country: 'India',
    
    guardianName: initialStudent.guardian || 'Rakesh Sharma',
    guardianRel: 'Father',
    guardianPhone: initialStudent.guardianPhone || '+91 91234 56789',
    guardianEmail: 'rakesh.sharma@email.com',
    guardianOcc: 'Business',
    guardianIncome: '10 - 15 LPA',
    
    emerName: 'Neha Sharma',
    emerRel: 'Mother',
    emerPhone: '+91 99887 76655',
    
    transport: 'Yes',
    hostel: 'No',
    busRoute: 'Route 12',
    pickup: 'Green Park',
    height: '170',
    weight: '62',
    medCondition: 'No',
    allergies: 'None',
    hobbies: 'Reading, Cricket, Music',
    identification: 'Small mole on left cheek',
    avatarUrl: '/student_avatar.png',
    uploadedDocs: [] as { name: string, size: number }[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors([]); // clear errors on typing
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({ ...formData, avatarUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newDocs = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size
      }));
      setFormData(prev => ({ ...prev, uploadedDocs: [...prev.uploadedDocs, ...newDocs] }));
    }
  };

  const handleNext = () => {
    let newErrors: string[] = [];
    if (step === 1) {
      if (!formData.fullName) newErrors.push("Full Name is required.");
      if (!formData.studentId) newErrors.push("Student ID is required.");
      if (!formData.dob) newErrors.push("Date of Birth is required.");
      if (!formData.gender) newErrors.push("Gender is required.");
      if (!formData.phone) newErrors.push("Phone Number is required.");
      if (!formData.academicYear) newErrors.push("Academic Year is required.");
      if (!formData.classGrade) newErrors.push("Class / Grade is required.");
    } else if (step === 2) {
      if (!formData.address1) newErrors.push("Address Line 1 is required.");
      if (!formData.city) newErrors.push("City is required.");
      if (!formData.pinCode) newErrors.push("PIN Code is required.");
      if (!formData.guardianName) newErrors.push("Guardian Name is required.");
      if (!formData.guardianPhone) newErrors.push("Guardian Phone is required.");
    }
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = () => {
    if (sIndex > -1) {
      const parts = formData.fullName.split(' ');
      mockStudents[sIndex].firstName = parts[0];
      mockStudents[sIndex].lastName = parts.slice(1).join(' ');
      mockStudents[sIndex].uai = formData.studentId;
      mockStudents[sIndex].dob = formData.dob;
      mockStudents[sIndex].gender = formData.gender.toUpperCase();
      mockStudents[sIndex].phone = formData.phone;
      mockStudents[sIndex].class = formData.classGrade;
    }
    alert("Student Profile Updated Successfully!");
    closeTab(activeTabId);
  };

  return (
    <div style={{ padding: '24px', background: '#f8fafc', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: '100%', maxWidth: '1000px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        
        {/* Header Profile Info */}
        <div style={{ padding: '24px', display: 'flex', gap: '24px', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: '#f1f5f9', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
               <img src={formData.avatarUrl} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = ''; e.currentTarget.style.display = 'none'; }} />
            </div>
            <label style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '28px', height: '28px', borderRadius: '50%', background: '#2563eb', color: '#fff', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={14} />
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{formData.fullName}</h1>
              <span style={{ padding: '2px 8px', background: '#dcfce7', color: '#166534', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>Active</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span>Student ID: {formData.studentId}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
              <span>{formData.classGrade} - {formData.section}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
              <span>{formData.stream}</span>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
              <label style={{ padding: '6px 16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                ↑ Change Photo
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
              </label>
              <button onClick={() => setFormData({ ...formData, avatarUrl: '' })} style={{ padding: '6px 16px', background: '#fff', border: 'none', fontSize: '12px', fontWeight: 600, color: '#ef4444', cursor: 'pointer' }}>Remove</button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ padding: '20px 40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '15px', left: '10%', right: '10%', height: '2px', background: '#e2e8f0', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '15px', left: '10%', right: step === 3 ? '10%' : step === 2 ? '50%' : '90%', height: '2px', background: '#2563eb', zIndex: 0, transition: 'right 0.3s ease' }} />
            
            {[1, 2, 3].map((num) => {
              const active = step >= num;
              const completed = step > num;
              return (
                <div key={num} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: completed ? '#22c55e' : active ? '#2563eb' : '#fff', border: completed ? 'none' : active ? 'none' : '2px solid #cbd5e1', color: completed || active ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                    {completed ? <Check size={16} /> : num}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: active ? '#2563eb' : '#94a3b8' }}>
                    {num === 1 ? 'Personal & Academic' : num === 2 ? 'Contacts & Other Details' : 'Documents & Additional'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: '32px', minHeight: '400px' }}>
          {errors.length > 0 && (
            <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: '8px', marginBottom: '24px', fontSize: '13px' }}>
              <strong>Please fix the following errors:</strong>
              <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                {errors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>
                  <User size={16} /> Personal Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <Field label="Full Name" name="fullName" value={formData.fullName} required onChange={handleChange} />
                  <Field label="Student ID" name="studentId" value={formData.studentId} required disabled onChange={handleChange} />
                  <Field label="Admission No." name="admissionNo" value={formData.admissionNo} onChange={handleChange} />
                  
                  <Field label="Date of Birth" name="dob" value={formData.dob} type="date" required onChange={handleChange} />
                  <Field label="Age" name="age" value={formData.age} onChange={handleChange} />
                  <Field label="Gender" name="gender" value={formData.gender} type="select" options={['Male', 'Female', 'Other']} required onChange={handleChange} />
                  
                  <Field label="Blood Group" name="bloodGroup" value={formData.bloodGroup} type="select" options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} onChange={handleChange} />
                  <Field label="Nationality" name="nationality" value={formData.nationality} type="select" options={['Indian', 'NRI', 'Foreign']} onChange={handleChange} />
                  <Field label="Religion" name="religion" value={formData.religion} type="select" options={['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other']} onChange={handleChange} />
                  
                  <Field label="Category" name="category" value={formData.category} type="select" options={['General', 'OBC', 'SC', 'ST']} onChange={handleChange} />
                  <Field label="Caste" name="caste" value={formData.caste} onChange={handleChange} />
                  <Field label="Mother Tongue" name="motherTongue" value={formData.motherTongue} onChange={handleChange} />
                  
                  <Field label="Aadhaar No." name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} />
                  <Field label="PAN No." name="panNo" value={formData.panNo} onChange={handleChange} />
                  <Field label="Student Email" name="email" value={formData.email} type="email" onChange={handleChange} />
                  
                  <Field label="Phone Number" name="phone" value={formData.phone} required onChange={handleChange} />
                  <Field label="Alternate Phone" name="altPhone" value={formData.altPhone} onChange={handleChange} />
                  <Field label="WhatsApp Number" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
                </div>
              </div>

              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0', borderTop: '1px solid #f1f5f9', paddingTop: '32px' }}>
                  <BookOpen size={16} /> Academic Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <Field label="Academic Year" name="academicYear" value={formData.academicYear} type="select" options={['2023-2024', '2024-2025', '2025-2026']} required onChange={handleChange} />
                  <Field label="Class / Grade" name="classGrade" value={formData.classGrade} type="select" options={['Class 9', 'Class 10', 'Class 11', 'Class 12']} required onChange={handleChange} />
                  <Field label="Section" name="section" value={formData.section} type="select" options={['A', 'B', 'C', 'D']} required onChange={handleChange} />
                  <Field label="Roll Number" name="rollNumber" value={formData.rollNumber} required onChange={handleChange} />
                  
                  <div style={{ gridColumn: 'span 2' }}>
                    <Field label="Department / Stream" name="stream" value={formData.stream} type="select" options={['Science', 'Commerce', 'Arts', 'General']} required onChange={handleChange} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <Field label="Subject Combination" name="subjectCombo" value={formData.subjectCombo} onChange={handleChange} />
                  </div>
                  
                  <Field label="House" name="house" value={formData.house} type="select" options={['Brahmos', 'Agni', 'Prithvi', 'Trishul']} onChange={handleChange} />
                  <Field label="Admission Date" name="admissionDate" value={formData.admissionDate} type="date" required onChange={handleChange} />
                  <Field label="Current Status" name="currentStatus" value={formData.currentStatus} type="select" options={['Active', 'Inactive', 'Suspended']} required onChange={handleChange} />
                  <Field label="Medium of Instruction" name="medium" value={formData.medium} type="select" options={['English', 'Hindi']} onChange={handleChange} />
                  
                  <div style={{ gridColumn: 'span 2' }}>
                    <Field label="Previous School" name="prevSchool" value={formData.prevSchool} disabled onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>
                      <MapPin size={16} /> Address Information
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Field label="Address Line 1" name="address1" value={formData.address1} required onChange={handleChange} />
                      <Field label="Address Line 2" name="address2" value={formData.address2} onChange={handleChange} />
                      <Field label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <Field label="City" name="city" value={formData.city} required onChange={handleChange} />
                        <Field label="State" name="state" value={formData.state} type="select" options={['Maharashtra', 'Delhi', 'Karnataka']} required onChange={handleChange} />
                        <Field label="PIN Code" name="pinCode" value={formData.pinCode} required onChange={handleChange} />
                      </div>
                      <Field label="Country" name="country" value={formData.country} type="select" options={['India', 'Other']} required onChange={handleChange} />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>
                      <Users size={16} /> Guardian / Parent Information
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <Field label="Guardian Name" name="guardianName" value={formData.guardianName} required onChange={handleChange} />
                        <Field label="Relationship" name="guardianRel" value={formData.guardianRel} type="select" options={['Father', 'Mother', 'Other']} required onChange={handleChange} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <Field label="Guardian Phone" name="guardianPhone" value={formData.guardianPhone} required onChange={handleChange} />
                        <Field label="Guardian Email" name="guardianEmail" value={formData.guardianEmail} type="email" onChange={handleChange} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <Field label="Occupation" name="guardianOcc" value={formData.guardianOcc} onChange={handleChange} />
                        <Field label="Annual Income" name="guardianIncome" value={formData.guardianIncome} type="select" options={['< 5 LPA', '5 - 10 LPA', '10 - 15 LPA', '> 15 LPA']} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                      <User size={16} /> Emergency Contact
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ gridColumn: 'span 2' }}>
                        <Field label="Contact Name" name="emerName" value={formData.emerName} required onChange={handleChange} />
                      </div>
                      <Field label="Relationship" name="emerRel" value={formData.emerRel} type="select" options={['Father', 'Mother', 'Relative']} required onChange={handleChange} />
                      <Field label="Phone Number" name="emerPhone" value={formData.emerPhone} required onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0', borderTop: '1px solid #f1f5f9', paddingTop: '32px' }}>
                  <BookOpen size={16} /> Other Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <Field label="Transport Facility" name="transport" value={formData.transport} type="radio" options={['Yes', 'No']} onChange={handleChange} />
                  <Field label="Hostel Facility" name="hostel" value={formData.hostel} type="radio" options={['Yes', 'No']} onChange={handleChange} />
                  <Field label="Bus Route / Number" name="busRoute" value={formData.busRoute} onChange={handleChange} />
                  <Field label="Pickup Point" name="pickup" value={formData.pickup} onChange={handleChange} />
                  
                  <Field label="Height (cm)" name="height" value={formData.height} type="number" onChange={handleChange} />
                  <Field label="Weight (kg)" name="weight" value={formData.weight} type="number" onChange={handleChange} />
                  <Field label="Medical Conditions" name="medCondition" value={formData.medCondition} type="select" options={['No', 'Yes']} onChange={handleChange} />
                  <Field label="Allergies (if any)" name="allergies" value={formData.allergies} onChange={handleChange} />
                  
                  <div style={{ gridColumn: 'span 2' }}>
                    <Field label="Hobbies / Interests" name="hobbies" value={formData.hobbies} onChange={handleChange} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <Field label="Identification Marks" name="identification" value={formData.identification} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center', padding: '40px 0' }}>
              <FileText size={48} color="#cbd5e1" />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Documents & Additional Information</h3>
                <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '400px' }}>Upload any additional required documents or final verifications here.</p>
              </div>
              
              <label style={{ width: '100%', maxWidth: '600px', border: '1px dashed #cbd5e1', borderRadius: '12px', padding: '40px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer', display: 'block' }}>
                <input type="file" multiple style={{ display: 'none' }} onChange={handleDocUpload} />
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#3b82f6' }}>Click or drag to upload files</p>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Supported formats: PDF, JPG, PNG (Max 5MB)</p>
              </label>

              {formData.uploadedDocs.length > 0 && (
                <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {formData.uploadedDocs.map((doc, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={16} color="#64748b" />
                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>{doc.name}</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{(doc.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
          {step > 1 ? (
            <button onClick={handleBack} style={{ padding: '10px 20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', fontWeight: 600, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <button onClick={() => closeTab(activeTabId)} style={{ padding: '10px 20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', fontWeight: 600, color: '#ef4444', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
          
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Page {step} of 3</div>

          {step < 3 ? (
            <button onClick={handleNext} style={{ padding: '10px 20px', background: '#2563eb', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Save & Next <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSave} style={{ padding: '10px 20px', background: '#22c55e', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={16} /> Finish & Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
