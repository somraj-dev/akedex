'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { 
  Building, Award, Shield, Phone, Mail, Link as LinkIcon, MapPin, 
  ArrowLeft, ArrowRight, Check, X, Camera, Palette, ShieldCheck
} from 'lucide-react';

const Field = ({ label, name, value, type = 'text', required = false, options = [], placeholder = '', onChange }: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
      <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {type === 'select' ? (
        <select 
          name={name} 
          value={value} 
          onChange={onChange}
          style={{ 
            padding: '10px 14px', 
            borderRadius: '8px', 
            border: '1px solid #cbd5e1', 
            fontSize: '12px', 
            color: '#0f172a', 
            background: '#ffffff', 
            outline: 'none', 
            height: '40px',
            transition: 'border-color 0.2s ease',
            cursor: 'pointer'
          }}
        >
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : type === 'checkbox' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '40px' }}>
          <input 
            type="checkbox" 
            name={name} 
            checked={!!value} 
            onChange={onChange}
            style={{ 
              width: '16px', 
              height: '16px', 
              accentColor: '#4f46e5',
              cursor: 'pointer'
            }} 
          />
          <span style={{ fontSize: '12px', color: '#334155', fontWeight: 500 }}>{placeholder}</span>
        </div>
      ) : (
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={onChange}
          placeholder={placeholder || label}
          style={{ 
            padding: '10px 14px', 
            borderRadius: '8px', 
            border: '1px solid #cbd5e1', 
            fontSize: '12px', 
            color: '#0f172a', 
            background: '#ffffff', 
            outline: 'none', 
            height: '40px',
            transition: 'border-color 0.2s ease'
          }}
        />
      )}
    </div>
  );
};

export default function EditInstituteWizard() {
  const { institutionInfo, updateInstitutionInfo, closeTab, activeTabId, showToast } = useAppStore();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({ ...institutionInfo });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
    setErrors([]);
  };

  const handleNext = () => {
    let newErrors: string[] = [];
    if (step === 1) {
      if (!formData.name.trim()) newErrors.push("Institution Name is required.");
      if (!formData.affiliationBoard.trim()) newErrors.push("Affiliation Board is required.");
      if (!formData.affiliationNo.trim()) newErrors.push("Affiliation Number is required.");
      if (!formData.schoolCode.trim()) newErrors.push("School Code is required.");
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.push("Address is required.");
      if (!formData.phone.trim()) newErrors.push("Phone Number is required.");
      if (!formData.email.trim()) newErrors.push("Email Address is required.");
      if (!formData.website.trim()) newErrors.push("Website URL is required.");
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
    updateInstitutionInfo(formData);
    showToast("Institution Profile Updated Successfully!", "success");
    closeTab(activeTabId);
  };

  return (
    <div style={{ padding: '24px', background: '#f8fafc', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '900px', background: '#ffffff', borderRadius: '14px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
        
        {/* Banner Preview Block */}
        <div style={{ 
          height: '140px', 
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          backgroundImage: `url("${formData.bannerUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '14px',
          borderTopRightRadius: '14px',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          {/* Overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.45)', borderTopLeftRadius: '14px', borderTopRightRadius: '14px', zIndex: 1 }} />
          
          {/* Live Badge Preview */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', zIndex: 2, width: '100%' }}>
            {/* Logo box preview */}
            <div style={{
              width: '80px',
              height: '80px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              boxSizing: 'border-box',
              flexShrink: 0,
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.5px', lineHeight: '1.1', textAlign: 'center' }}>
                <span style={{ color: '#ff4d4d' }}>{formData.logoText1 || 'FUN'}</span>{' '}
                <span style={{ color: '#4f46e5' }}>{formData.logoText2 || '&'}</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 900, color: '#059669', letterSpacing: '1px', marginTop: '1px', lineHeight: '1.1', textAlign: 'center' }}>
                {formData.logoText3 || 'LEARN'}
              </div>
              <div style={{ fontSize: '6px', fontWeight: 800, color: '#1e293b', letterSpacing: '1.5px', marginTop: '4px' }}>
                • {formData.logoTextSub || 'SCHOOL'} •
              </div>
            </div>
            
            <div style={{ color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>{formData.name || 'Fun & Learn School'}</h1>
                {formData.verified && (
                  <span style={{ 
                    background: '#f3e8ff', 
                    color: '#6d28d9', 
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '10px',
                    border: '1px solid #d8b4fe',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>✓ Verified</span>
                )}
              </div>
              <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '4px' }}>
                {formData.affiliationBoard} • Affiliation No. {formData.affiliationNo} • Code {formData.schoolCode}
              </div>
              <div style={{ fontSize: '11px', fontStyle: 'italic', opacity: 0.8, marginTop: '2px' }}>
                "{formData.slogan}"
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Indicator */}
        <div style={{ padding: '20px 40px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '15px', left: '10%', right: '10%', height: '2px', background: '#cbd5e1', zIndex: 0 }} />
            <div style={{ 
              position: 'absolute', 
              top: '15px', 
              left: '10%', 
              right: step === 3 ? '10%' : step === 2 ? '50%' : '90%', 
              height: '2px', 
              background: '#4f46e5', 
              zIndex: 0, 
              transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
            }} />
            
            {[1, 2, 3].map((num) => {
              const active = step >= num;
              const completed = step > num;
              return (
                <div key={num} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: completed ? '#10b981' : active ? '#4f46e5' : '#ffffff', 
                    border: completed || active ? 'none' : '2px solid #cbd5e1', 
                    color: completed || active ? '#ffffff' : '#64748b', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '13px', 
                    fontWeight: 700, 
                    marginBottom: '6px',
                    boxShadow: active ? '0 0 0 4px rgba(79, 70, 229, 0.15)' : 'none'
                  }}>
                    {completed ? <Check size={16} /> : num}
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: active ? '#4f46e5' : '#64748b' }}>
                    {num === 1 ? 'GENERAL PROFILE' : num === 2 ? 'CONTACT & MAP' : 'BRANDING & MEDIA'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Validation Errors banner */}
        {errors.length > 0 && (
          <div style={{ margin: '24px 32px 0', padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: '8px', fontSize: '12px' }}>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Please complete all required fields:</strong>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        {/* Wizard Form Panels */}
        <div style={{ padding: '32px', minHeight: '320px', boxSizing: 'border-box' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                <Building size={18} style={{ color: '#4f46e5' }} />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>General Information</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                <Field label="Institution / School Name" name="name" value={formData.name} required onChange={handleChange} />
                <Field label="Affiliation Board" name="affiliationBoard" value={formData.affiliationBoard} type="select" options={['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE']} onChange={handleChange} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Affiliation Number" name="affiliationNo" value={formData.affiliationNo} required onChange={handleChange} />
                <Field label="School Code" name="schoolCode" value={formData.schoolCode} required onChange={handleChange} />
              </div>
              <div style={{ display: 'flex' }}>
                <Field label="Motto / Slogan" name="slogan" value={formData.slogan} placeholder="Enter motto text" onChange={handleChange} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                <MapPin size={18} style={{ color: '#4f46e5' }} />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Location &amp; Contact Details</h3>
              </div>
              <div style={{ display: 'flex' }}>
                <Field label="Full Address" name="address" value={formData.address} required onChange={handleChange} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Phone / Telephone Number" name="phone" value={formData.phone} required onChange={handleChange} />
                <Field label="Email Address" name="email" value={formData.email} type="email" required onChange={handleChange} />
              </div>
              <div style={{ display: 'flex' }}>
                <Field label="Website URL" name="website" value={formData.website} required onChange={handleChange} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                <Palette size={18} style={{ color: '#4f46e5' }} />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Branding &amp; Visual Identity</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
                {/* Left: Checked Badge toggle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Field label="Verification Status" name="verified" value={formData.verified} type="checkbox" placeholder="Show Verified Checkmark Badge" onChange={handleChange} />
                  
                  {/* Select school banner */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      School Banner Illustration
                    </label>
                    <select
                      name="bannerUrl"
                      value={formData.bannerUrl}
                      onChange={handleChange}
                      style={{ 
                        padding: '10px 14px', 
                        borderRadius: '8px', 
                        border: '1px solid #cbd5e1', 
                        fontSize: '12px', 
                        color: '#0f172a', 
                        background: '#ffffff', 
                        outline: 'none', 
                        height: '40px',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="/school_banner.png">Default Vector Illustration (Kids Playing)</option>
                      <option value="/school_banner_1781861688446.png">Clean Modern School Facade</option>
                      <option value="">Plain Gradient Background (No Image)</option>
                    </select>
                  </div>
                </div>

                {/* Right: Logo block config */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '12px' }}>CUSTOM LOGO TYPOGRAPHY</span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <Field label="Logo Line 1" name="logoText1" value={formData.logoText1} placeholder="FUN" onChange={handleChange} />
                    <Field label="Logo Line 2 (Symbol)" name="logoText2" value={formData.logoText2} placeholder="&" onChange={handleChange} />
                    <Field label="Logo Line 3" name="logoText3" value={formData.logoText3} placeholder="LEARN" onChange={handleChange} />
                    <Field label="Logo Subtitle" name="logoTextSub" value={formData.logoTextSub} placeholder="SCHOOL" onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ 
          padding: '20px 32px', 
          borderTop: '1px solid #e2e8f0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          background: '#f8fafc',
          borderBottomLeftRadius: '14px',
          borderBottomRightRadius: '14px'
        }}>
          {step > 1 ? (
            <button 
              onClick={handleBack} 
              style={{ 
                padding: '10px 18px', 
                background: '#ffffff', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#334155', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <ArrowLeft size={14} /> Back
            </button>
          ) : (
            <button 
              onClick={() => closeTab(activeTabId)} 
              style={{ 
                padding: '10px 18px', 
                background: '#ffffff', 
                border: '1px solid #cbd5e1', 
                borderRadius: '8px', 
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#ef4444', 
                cursor: 'pointer' 
              }}
            >
              Cancel
            </button>
          )}

          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>STEP {step} OF 3</span>

          {step < 3 ? (
            <button 
              onClick={handleNext} 
              style={{ 
                padding: '10px 18px', 
                background: '#4f46e5', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#ffffff', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                transition: 'background-color 0.15s ease'
              }}
            >
              Save &amp; Next <ArrowRight size={14} />
            </button>
          ) : (
            <button 
              onClick={handleSave} 
              style={{ 
                padding: '10px 18px', 
                background: '#10b981', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#ffffff', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px'
              }}
            >
              <Check size={14} /> Finish &amp; Save
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
