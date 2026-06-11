'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { api } from '@/lib/api';
import { 
  Shield, Code, Zap, Sparkles, Bot, LineChart, Lock, Users, Activity, ChevronRight, X, Cloud
} from 'lucide-react';

const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

const licensingRequestPayload = "eyJsaWNlbnNlSWQiOiJha2VkZXgtbWluaW11bS12YWxpZC1kZW1vLWtleS0yMDI2LTA2LTExIiwiaW5zdGl0dXRpb24iOiJTb21yYWogRGV2ZWxvcG1lbnQgSW5zdGl0dXRlIiwidHlwZSI6Im1hbnVhbCIsImRhdGUiOiIyMDI2LTA2LTExVDIzOjExOjU5KzA1OjMwIiwiY2hlY2tzdW0iOiJhN2M5YjlkMTg0ZWY4MzlkMjc0YjU5ZTg3YzE4ZDJlMyIsImRvbWFpbiI6ImFrZWRleC5jb20iLCJyZWdpc3RyYXIiOiJha2VkZXgtbGljZW5zZS1zZXJ2ZXItdjEiLCJzaWduYXR1cmUiOiJcdTAwNDRcdTAwNTdcdTAwNDlcdTAwNDNcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDVcdTAwNDNcdTAwNDVcdTAwNTRcdTAwNDUifQ==";

export default function ActivationScreen() {
  const activate = useAppStore(s => s.activate);
  const login = useAppStore(s => s.login);

  const [showActivation, setShowActivation] = useState(false);
  const [step, setStep] = useState(1);
  const [institutionId, setInstitutionId] = useState('springfield-public-school');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // License key activation states
  const [licenseKey, setLicenseKey] = useState('');
  const [licenseType, setLicenseType] = useState<'automatic' | 'manual'>('automatic');
  const [licenseLoading, setLicenseLoading] = useState(false);
  const [licenseError, setLicenseError] = useState('');

  // Manual activation states
  const [manualResponse, setManualResponse] = useState('');
  const [manualResponseError, setManualResponseError] = useState('');

  // Automatic verification states
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [automaticTryCount, setAutomaticTryCount] = useState(0);

  useEffect(() => {
    if (step !== 9) return;
    setVerificationProgress(0);
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev < 3) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (automaticTryCount === 1) {
            setStep(10);
          } else if (automaticTryCount === 2) {
            setStep(11);
          } else {
            setStep(12);
          }
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [step, automaticTryCount]);

  useEffect(() => {
    if (step === 6) {
      navigator.clipboard.writeText(licensingRequestPayload).catch(() => {});
    }
  }, [step]);

  // New states for the selection cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isAcquiring, setIsAcquiring] = useState(false);

  // Sign up form states
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('Somraj Development Institute');
  const [signUpCountry, setSignUpCountry] = useState('Delhi');
  const [signUpPreferences, setSignUpPreferences] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  // OTP Verification States
  const [otp, setOtp] = useState<string[]>(Array(8).fill(''));
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpResendMessage, setOtpResendMessage] = useState('');

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const val = element.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Focus next input
    if (val !== '' && index < 7) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        otpRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 8).split('');
    const newOtp = [...otp];
    pastedData.forEach((char, idx) => {
      if (!isNaN(Number(char))) {
        newOtp[idx] = char;
        if (otpRefs.current[idx]) {
          otpRefs.current[idx]!.value = char;
        }
      }
    });
    setOtp(newOtp);
    const focusIndex = Math.min(pastedData.length, 7);
    otpRefs.current[focusIndex]?.focus();
  };

  const renderCard = (
    index: number,
    icon: React.ReactNode,
    title: string,
    description: string,
    onClick: () => void
  ) => {
    const isHovered = hoveredCard === index;
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          width: '280px',
          height: '260px',
          background: '#ffffff',
          border: isHovered ? '2px solid #000000' : '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '28px 24px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' 
            : '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxSizing: 'border-box'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(#2563eb 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
          opacity: isHovered ? 0.35 : 0.12,
          pointerEvents: 'none',
          transition: 'opacity 0.2s'
        }} />
        <div style={{
          color: isHovered ? '#2563eb' : '#64748b',
          marginBottom: '20px',
          transition: 'color 0.2s'
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#0f172a',
          margin: '0 0 8px 0',
          lineHeight: '1.2'
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '13.5px',
          color: '#64748b',
          lineHeight: '1.5',
          margin: 0,
          fontWeight: 500
        }}>
          {description}
        </p>
      </div>
    );
  };

  // Slogan rotation state
  const [activeSlide, setActiveSlide] = useState(0);
  const [fade, setFade] = useState(true);

  const messages = [
    "The unified administrative, academic, and financial operating ledger for schools.",
    "Empowering administrators, faculty, and students on a single unified workspace.",
    "Streamlining operations and institutional intelligence with military-grade precision."
  ];

  useEffect(() => {
    if (showActivation) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % 3);
        setFade(true);
      }, 200);
    }, 2000);
    return () => clearInterval(timer);
  }, [showActivation]);

  const handleContinue = async () => {
    if (!institutionId) {
      setError('Please enter your institution ID.');
      return;
    }
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 800);
  };

  const handleRoleSelect = (roleName: string) => {
    const roleMappings: Record<string, { name: string; email: string; role: string }> = {
      'admin': { name: 'Dr. Priya Sharma', email: 'admin@dps.edu', role: 'Institution Administrator' },
      'student': { name: 'Arjun Mehta', email: 'student@dps.edu', role: 'Student' }
    };

    const info = roleMappings[roleName] || roleMappings['admin'];

    activate('tenant-demo-dps');
    login({
      id: `usr-${roleName}-001`,
      name: info.name,
      email: info.email,
      role: info.role,
      institution: 'Delhi Public School, R.K. Puram'
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <style>{`
        @keyframes akedex-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Global Close Button for Activation Flow */}
      {showActivation && (
        <button
          onClick={() => {
            setShowActivation(false);
            setStep(1);
            setError('');
          }}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s, color 0.2s',
            zIndex: 100
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          <X size={20} />
        </button>
      )}
      
      {/* Navbar - Light Mode exactly matching the design template */}
      <div style={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '24px 48px', 
        background: '#ffffff', 
        borderBottom: '1px solid #f8fafc',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>
            <div style={{ width: '28px', height: '28px', background: '#000000', borderRadius: '50%', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={14} />
            </div>
            Akedex
          </div>
          <div style={{ display: 'flex', gap: '28px', fontSize: '13.5px', fontWeight: 600, color: '#64748b' }}>
            {['Home', 'About', 'Our Services', 'Portfolio', 'Contact Us'].map((link) => (
              <span 
                key={link} 
                style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
        {/* Right side search bar and person icon completely removed */}
        <div style={{ width: '100px' }}></div>
      </div>

      {/* HERO SECTION - Single view content, matching template photo exactly */}
      <div style={{ 
        maxHeight: 'calc(100vh - 80px)',
        flex: 1,
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%', 
        padding: showActivation ? '40px 48px 60px' : '120px 48px 0', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflowY: showActivation ? 'auto' : 'hidden'
      }}>
        
        {!showActivation ? (
          // Landing View
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', animation: 'fadeIn 0.3s ease' }}>
            <h1 style={{ 
              fontSize: '72px', 
              fontWeight: 800, 
              letterSpacing: '-0.04em', 
              lineHeight: 1.05, 
              color: '#000000', 
              marginBottom: '6px'
            }}>
              Akedex
            </h1>
            
            <h2 style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#475569',
              marginBottom: '20px'
            }}>
              Education Operating Environment
            </h2>
            
            <p style={{ 
              fontSize: '18px', 
              color: '#64748b', 
              maxWidth: '540px', 
              lineHeight: 1.6, 
              fontWeight: 400,
              minHeight: '80px',
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.2s ease-in-out',
              margin: '0 0 16px'
            }}>
              {messages[activeSlide]}
            </p>

            {/* Slide dot indicators */}
            <div style={{ display: 'flex', gap: '8px', margin: '12px 0 32px 0' }}>
              {[0, 1, 2].map((idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    width: activeSlide === idx ? '8px' : '6px', 
                    height: activeSlide === idx ? '8px' : '6px', 
                    borderRadius: '50%', 
                    background: activeSlide === idx ? '#000000' : '#cbd5e1', 
                    transition: 'all 0.2s ease',
                    display: 'inline-block'
                  }} 
                />
              ))}
            </div>

            {/* Single button: Activate now */}
            <button 
              onClick={() => setShowActivation(true)}
              style={{
                padding: '12px 36px', 
                background: '#000000', 
                color: '#ffffff', 
                border: 'none',
                borderRadius: '24px', 
                fontSize: '15px', 
                fontWeight: 700, 
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.1s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#000000'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Activate now
            </button>
          </div>
        ) : (
          // In-place Activation & Login View
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: (step === 1 || step === 2 || step === 6 || step === 7 || step === 8 || step === 9 || step === 10 || step === 11 || step === 12) ? 'center' : 'flex-start', 
            width: '100%', 
            maxWidth: step === 1 ? '980px' : (step === 2 || step === 6 || step === 7 || step === 8 || step === 9 || step === 10 || step === 11 || step === 12) ? '600px' : '500px', 
            animation: 'fadeIn 0.3s ease',
            margin: '0 auto'
          }}>
            {step === 1 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%' 
              }}>
                {/* Logo and title */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  marginBottom: '36px',
                  textAlign: 'center'
                }}>
                  {/* Akedex logo icon */}
                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    background: '#000000', 
                    borderRadius: '50%', 
                    color: '#ffffff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    <Activity size={28} />
                  </div>
                  <h1 style={{ 
                    fontSize: '32px', 
                    fontWeight: 800, 
                    color: '#000000', 
                    letterSpacing: '-0.02em', 
                    marginBottom: '8px' 
                  }}>
                    Let's Activate
                  </h1>
                  <p style={{ 
                    fontSize: '15.5px', 
                    color: '#64748b', 
                    fontWeight: 500 
                  }}>
                    Choose an activation method to continue
                  </p>
                </div>

                {/* Cards row */}
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '24px', 
                  justifyContent: 'center', 
                  width: '100%' 
                }}>
                  {/* Card 1: Community Edition */}
                  {renderCard(
                    0,
                    <Sparkles size={24} />,
                    'Community Edition',
                    'Start free! No license key required.',
                    () => setStep(4)
                  )}

                  {/* Card 2: Add License Key */}
                  {renderCard(
                    1,
                    <Lock size={24} />,
                    'Add License Key',
                    'I have a stand-alone trial or enterprise key.',
                    () => setStep(2)
                  )}

                  {/* Card 3: Acquire License Key */}
                  {renderCard(
                    2,
                    isAcquiring ? (
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '3px solid #e2e8f0',
                        borderTopColor: '#2563eb',
                        animation: 'akedex-spin 1s linear infinite'
                      }} />
                    ) : (
                      <Cloud size={24} />
                    ),
                    isAcquiring ? 'Acquiring...' : 'Acquire License Key',
                    isAcquiring ? 'Contacting Akedex Cloud Orchestrator...' : 'Acquire license from Akedex Cloud.',
                    async () => {
                      if (isAcquiring) return;
                      setIsAcquiring(true);
                      setTimeout(() => {
                        setIsAcquiring(false);
                        setStep(3);
                      }, 1500);
                    }
                  )}
                </div>
              </div>
            ) : step === 2 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: 800, 
                  color: '#000000', 
                  letterSpacing: '-0.02em', 
                  marginBottom: '6px' 
                }}>
                  Add License Key
                </h2>
                
                <p style={{ 
                  fontSize: '15.5px', 
                  color: '#64748b', 
                  fontWeight: 500,
                  marginBottom: '36px'
                }}>
                  Please enter the license key below
                </p>

                {/* Line input for License Key */}
                <input 
                  type="text" 
                  placeholder="Add License Key"
                  value={licenseKey}
                  onChange={e => setLicenseKey(e.target.value)}
                  style={{
                    width: '100%', 
                    maxWidth: '480px',
                    padding: '10px 0', 
                    background: 'transparent', 
                    border: 'none',
                    borderBottom: '1px solid #cbd5e1',
                    color: '#0f172a', 
                    fontSize: '17px', 
                    fontWeight: 500,
                    outline: 'none',
                    textAlign: 'center',
                    fontStyle: licenseKey ? 'normal' : 'italic',
                    marginBottom: '40px',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = '#000000'}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = '#cbd5e1'}
                />

                {/* Vertical Stacked Custom Radio Group */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  width: '100%',
                  maxWidth: '520px',
                  marginBottom: '48px',
                  alignItems: 'flex-start'
                }}>
                  {/* Automatic Radio Option */}
                  <div 
                    onClick={() => setLicenseType('automatic')}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      cursor: 'pointer',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      width: '100%',
                      userSelect: 'none'
                    }}
                  >
                    {/* Circle Indicator */}
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: licenseType === 'automatic' ? '2px solid #000000' : '2px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '3px',
                      flexShrink: 0,
                      transition: 'all 0.2s'
                    }}>
                      {licenseType === 'automatic' && (
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: '#000000'
                        }} />
                      )}
                    </div>
                    {/* Label Details */}
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '4px'
                      }}>
                        Automatic (recommended)
                      </div>
                      <div style={{
                        fontSize: '13.5px',
                        color: '#64748b',
                        lineHeight: '1.5',
                        fontWeight: 500
                      }}>
                        The licensing process requires active Internet connection and usually takes a few seconds.
                      </div>
                    </div>
                  </div>

                  {/* Manual Radio Option */}
                  <div 
                    onClick={() => setLicenseType('manual')}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      cursor: 'pointer',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      width: '100%',
                      userSelect: 'none'
                    }}
                  >
                    {/* Circle Indicator */}
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: licenseType === 'manual' ? '2px solid #000000' : '2px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '3px',
                      flexShrink: 0,
                      transition: 'all 0.2s'
                    }}>
                      {licenseType === 'manual' && (
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: '#000000'
                        }} />
                      )}
                    </div>
                    {/* Label Details */}
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '4px'
                      }}>
                        Manual
                      </div>
                      <div style={{
                        fontSize: '13.5px',
                        color: '#64748b',
                        lineHeight: '1.5',
                        fontWeight: 500
                      }}>
                        3-step wizard for licensing when there is no internet connection available.
                      </div>
                    </div>
                  </div>
                </div>

                {licenseError && (
                  <div style={{ 
                    color: '#ef4444', 
                    fontSize: '13px', 
                    fontWeight: 600, 
                    marginBottom: '16px',
                    width: '100%',
                    textAlign: 'left',
                    maxWidth: '520px'
                  }}>
                    {licenseError}
                  </div>
                )}

                {/* Footer Controls aligned bottom right */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '24px', 
                  width: '100%',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '20px'
                }}>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setLicenseError('');
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#64748b', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                  >
                    Back
                  </button>

                  <button 
                    onClick={async () => {
                      if (licenseType === 'automatic' && !licenseKey.trim()) {
                        setLicenseError('Please enter a license key.');
                        return;
                      }
                      setLicenseError('');
                      if (licenseType === 'automatic') {
                        setAutomaticTryCount(1);
                        setStep(9); // Route to Automatic Verification Loading Screen
                      } else {
                        setStep(6); // Route to Manual Step 1
                      }
                    }}
                    disabled={licenseLoading}
                    style={{
                      background: 'transparent', 
                      color: '#2563eb', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
                  >
                    {licenseLoading ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: '2px solid #e2e8f0',
                          borderTopColor: '#2563eb',
                          animation: 'akedex-spin 1s linear infinite'
                        }} />
                        Verifying...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              </div>
            ) : step === 4 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', animation: 'fadeIn 0.3s ease' }}>
                <div>
                  <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                    Sign up for Akedex
                  </h1>
                </div>

                {/* Google and Apple SSO Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  <button 
                    type="button"
                    onClick={() => {
                      setSignUpLoading(true);
                      setTimeout(() => {
                        setSignUpLoading(false);
                        setStep(3);
                      }, 1000);
                    }}
                    style={{
                      width: '100%', 
                      padding: '10px 16px', 
                      background: '#ffffff', 
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px', 
                      color: '#0f172a', 
                      fontSize: '14px', 
                      fontWeight: 600, 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '10px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" style={{ display: 'block' }}>
                      <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 15.02 1 12 1 7.35 1 3.4 3.65 1.48 7.5l3.86 3c.9-2.7 3.42-4.46 6.66-4.46z" />
                      <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.99 3.7-8.62z" />
                      <path fill="#FBBC05" d="M5.34 10.5C5.09 11.27 4.95 12.1 4.95 13s.14 1.73.39 2.5l-3.86 3C.53 16.74 0 14.93 0 13s.53-3.74 1.48-5.5l3.86 3z" />
                      <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.1.74-2.5 1.18-4.23 1.18-3.24 0-5.76-1.76-6.66-4.46L1.48 16.9C3.4 20.75 7.35 23 12 23z" />
                    </svg>
                    Continue with Google
                  </button>

                  <button 
                    type="button"
                    onClick={() => {
                      setSignUpLoading(true);
                      setTimeout(() => {
                        setSignUpLoading(false);
                        setStep(3);
                      }, 1000);
                    }}
                    style={{
                      width: '100%', 
                      padding: '10px 16px', 
                      background: '#ffffff', 
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px', 
                      color: '#0f172a', 
                      fontSize: '14px', 
                      fontWeight: 600, 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '10px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: '#000000', display: 'block' }}>
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.5-.62.72-1.16 1.86-1.02 2.97 1.11.09 2.25-.57 2.95-1.41z" />
                    </svg>
                    Continue with Apple
                  </button>
                </div>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '4px 0', color: '#94a3b8', fontSize: '13px' }}>
                  <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }} />
                  <span style={{ padding: '0 12px', fontWeight: 600 }}>or</span>
                  <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }} />
                </div>

                {/* Form fields */}
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!signUpEmail || !signUpPassword || !signUpUsername) {
                      setSignUpError('Please fill out all required fields.');
                      return;
                    }
                    setSignUpError('');
                    setSignUpLoading(true);
                    setTimeout(() => {
                      setSignUpLoading(false);
                      setStep(5);
                    }, 1200);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}
                >
                  {/* Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                    <label style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Email*</label>
                    <input 
                      type="email" 
                      placeholder="Email"
                      value={signUpEmail}
                      onChange={e => setSignUpEmail(e.target.value)}
                      style={{
                        width: '100%', 
                        padding: '10px 14px', 
                        background: '#ffffff', 
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px', 
                        color: '#0f172a', 
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border 0.2s'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                    />
                  </div>

                  {/* Password */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                    <label style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Password*</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={signUpPassword}
                      onChange={e => setSignUpPassword(e.target.value)}
                      style={{
                        width: '100%', 
                        padding: '10px 14px', 
                        background: '#ffffff', 
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px', 
                        color: '#0f172a', 
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border 0.2s'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                    />
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                      Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.
                    </p>
                  </div>

                  {/* Institution Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                    <label style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Institution Name*</label>
                    <input 
                      type="text" 
                      placeholder="Institution Name"
                      value={signUpUsername}
                      onChange={e => setSignUpUsername(e.target.value)}
                      style={{
                        width: '100%', 
                        padding: '10px 14px', 
                        background: '#ffffff', 
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px', 
                        color: '#0f172a', 
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border 0.2s'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                    />
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                      Institution name is used to identify your environment.
                    </p>
                  </div>

                  {/* State/Region Dropdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                    <label style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Your State/Region of India*</label>
                    <select
                      value={signUpCountry}
                      onChange={e => setSignUpCountry(e.target.value)}
                      style={{
                        width: '100%', 
                        padding: '10px 14px', 
                        background: '#ffffff', 
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px', 
                        color: '#0f172a', 
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'border 0.2s'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                    >
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                      For compliance reasons, we're required to collect state information to send you occasional updates and announcements.
                    </p>
                  </div>

                  {/* Preferences Checkbox */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', width: '100%' }}>
                    <input 
                      type="checkbox"
                      id="signUpPrefs"
                      checked={signUpPreferences}
                      onChange={e => setSignUpPreferences(e.target.checked)}
                      style={{
                        marginTop: '4px',
                        cursor: 'pointer',
                        width: '15px',
                        height: '15px'
                      }}
                    />
                    <label htmlFor="signUpPrefs" style={{ fontSize: '13.5px', color: '#0f172a', lineHeight: 1.4, cursor: 'pointer', userSelect: 'none' }}>
                      Receive occasional product updates and announcements
                    </label>
                  </div>

                  {signUpError && <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 600 }}>{signUpError}</div>}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={signUpLoading}
                    style={{
                      width: '100%',
                      padding: '12px 24px', 
                      background: '#1f883d', 
                      color: '#ffffff', 
                      border: 'none',
                      borderRadius: '6px', 
                      fontSize: '15px', 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#1a7f37'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#1f883d'}
                  >
                    {signUpLoading ? 'Creating account...' : 'Create account >'}
                  </button>
                </form>

                {/* Terms and Privacy Statement */}
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  By creating an account, you agree to the <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>Terms of Service</span>. For more information about Akedex's privacy practices, see the <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>Akedex Privacy Statement</span>. We'll occasionally send you account-related emails.
                </p>

                {/* Cancel / Cancel sign up and return */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setSignUpError('');
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#64748b',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : step === 9 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center',
                padding: '20px 0'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '3px solid #f1f5f9',
                  borderTopColor: '#2563eb',
                  animation: 'akedex-spin 1s linear infinite',
                  marginBottom: '36px'
                }} />

                <h2 style={{ 
                  fontSize: '28px', 
                  fontWeight: 800, 
                  color: '#000000', 
                  letterSpacing: '-0.02em', 
                  marginBottom: '12px' 
                }}>
                  Verifying License
                </h2>
                
                <p style={{ 
                  fontSize: '15px', 
                  color: '#64748b', 
                  fontWeight: 500,
                  marginBottom: '40px'
                }}>
                  Please wait while we connect to the licensing orchestrator
                </p>

                {/* Progress Checklist */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  width: '100%',
                  maxWidth: '440px',
                  background: '#f8fafc',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'left'
                }}>
                  {[
                    "Connecting to Akedex Activation servers...",
                    "Verifying cryptographic key signatures...",
                    "Retrieving environment entitlements...",
                    "Initializing local database ledgers..."
                  ].map((label, index) => {
                    const isCompleted = verificationProgress > index;
                    const isActive = verificationProgress === index;
                    return (
                      <div 
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          color: isCompleted ? '#16a34a' : isActive ? '#0f172a' : '#94a3b8',
                          fontWeight: isActive || isCompleted ? 600 : 500,
                          fontSize: '14px',
                          transition: 'color 0.3s'
                        }}
                      >
                        {isCompleted ? (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : isActive ? (
                          <div style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            border: '2px solid #2563eb',
                            borderTopColor: 'transparent',
                            animation: 'akedex-spin 0.8s linear infinite',
                            flexShrink: 0
                          }} />
                        ) : (
                          <div style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            background: '#cbd5e1',
                            flexShrink: 0
                          }} />
                        )}
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : step === 10 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: 800, 
                  color: '#000000', 
                  letterSpacing: '-0.02em', 
                  marginBottom: '32px' 
                }}>
                  Connect to tenant
                </h2>

                {/* Avatar AJ */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  userSelect: 'none'
                }}>
                  AJ
                </div>

                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '6px'
                }}>
                  Aakanksha Jain
                </div>

                <div style={{
                  fontSize: '14.5px',
                  color: '#64748b',
                  fontWeight: 500,
                  marginBottom: '24px'
                }}>
                  aakanksha.jain@akedex.com
                </div>

                {/* Timeout Error Banner */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  padding: '10px 16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  margin: '24px auto 16px auto',
                  maxWidth: '440px',
                  width: '100%',
                  boxSizing: 'border-box',
                  fontSize: '13px',
                  color: '#0f172a',
                  textAlign: 'left'
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 900,
                    flexShrink: 0,
                    lineHeight: 1
                  }}>
                    !
                  </div>
                  <span>
                    The operation has timed out.&nbsp;
                    <span 
                      style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                    >
                      Learn more
                    </span>
                  </span>
                </div>

                {/* Footer Controls aligned bottom right */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '24px', 
                  width: '100%',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '20px',
                  marginTop: '24px'
                }}>
                  <button 
                    onClick={() => {
                      setStep(2);
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#64748b', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                  >
                    Back
                  </button>

                  <button 
                    onClick={() => {
                      setAutomaticTryCount(2);
                      setStep(9); // Route back to Step 9 loader to Try Again
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#2563eb', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : step === 11 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: 800, 
                  color: '#000000', 
                  letterSpacing: '-0.02em', 
                  marginBottom: '10px' 
                }}>
                  Select a tenant you would like to connect to
                </h2>
                
                <p style={{ 
                  fontSize: '15px', 
                  color: '#64748b', 
                  fontWeight: 500,
                  marginBottom: '36px'
                }}>
                  Your account has access to the following tenants:
                </p>

                {/* Avatar AJ */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  userSelect: 'none'
                }}>
                  AJ
                </div>

                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '6px'
                }}>
                  Aakanksha Jain
                </div>

                <div style={{
                  fontSize: '14.5px',
                  color: '#64748b',
                  fontWeight: 500,
                  marginBottom: '32px'
                }}>
                  aakanksha.jain@akedex.com
                </div>

                {/* Tenant Radio Selection */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  borderBottom: '1px solid #e2e8f0',
                  width: '100%',
                  maxWidth: '320px',
                  margin: '0 auto 40px auto',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '2px solid #2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#2563eb'
                    }} />
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                    MasteryDefault
                  </span>
                </div>

                {/* Cannot acquire license warning banner */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  padding: '10px 16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  margin: '24px auto 16px auto',
                  maxWidth: '440px',
                  width: '100%',
                  boxSizing: 'border-box',
                  fontSize: '13px',
                  color: '#0f172a',
                  textAlign: 'left'
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 900,
                    flexShrink: 0,
                    lineHeight: 1
                  }}>
                    !
                  </div>
                  <span>
                    Cannot acquire a license.
                  </span>
                </div>

                {/* Footer Controls aligned bottom right */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '24px', 
                  width: '100%',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '20px',
                  marginTop: '24px'
                }}>
                  <button 
                    onClick={() => {
                      setStep(2);
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#64748b', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                  >
                    Back
                  </button>

                  <button 
                    onClick={() => {
                      setAutomaticTryCount(3);
                      setStep(9); // Restart loader for Step 12
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#2563eb', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : step === 12 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: 800, 
                  color: '#000000', 
                  letterSpacing: '-0.02em', 
                  marginBottom: '10px' 
                }}>
                  Select a tenant you would like to connect to
                </h2>
                
                <p style={{ 
                  fontSize: '15px', 
                  color: '#64748b', 
                  fontWeight: 500,
                  marginBottom: '36px'
                }}>
                  Your account has access to the following tenants:
                </p>

                {/* Avatar AJ */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  userSelect: 'none'
                }}>
                  AJ
                </div>

                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '6px'
                }}>
                  Aakanksha Jain
                </div>

                <div style={{
                  fontSize: '14.5px',
                  color: '#64748b',
                  fontWeight: 500,
                  marginBottom: '32px'
                }}>
                  aakanksha.jain@akedex.com
                </div>

                {/* Tenant Radio Selection */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  borderBottom: '1px solid #e2e8f0',
                  width: '100%',
                  maxWidth: '320px',
                  margin: '0 auto 40px auto',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '2px solid #2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#2563eb'
                    }} />
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                    MasteryDefault
                  </span>
                </div>

                {/* Footer Controls aligned bottom right */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '24px', 
                  width: '100%',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '20px',
                  marginTop: '24px'
                }}>
                  <button 
                    onClick={() => {
                      setStep(2);
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#64748b', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                  >
                    Back
                  </button>

                  <button 
                    onClick={() => {
                      setStep(3); // Route to Choose Role
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#2563eb', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
                  >
                    Continue
                  </button>
                </div>
              </div>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: 800, 
                  color: '#000000', 
                  letterSpacing: '-0.02em', 
                  marginBottom: '6px' 
                }}>
                  Manual - Step 1
                </h2>
                
                <p style={{ 
                  fontSize: '15.5px', 
                  color: '#64748b', 
                  fontWeight: 500,
                  marginBottom: '28px',
                  lineHeight: '1.5'
                }}>
                  Paste the Licensing Request to a new text file and/or send it by email to a computer with Internet access.
                </p>

                <p style={{ 
                  fontSize: '13.5px', 
                  color: '#475569', 
                  fontWeight: 600,
                  marginBottom: '12px'
                }}>
                  The Licensing Request below has been generated and copied to the clipboard.
                </p>

                <textarea 
                  readOnly
                  value={licensingRequestPayload}
                  style={{
                    width: '100%',
                    height: '160px',
                    padding: '12px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#475569',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    resize: 'none',
                    outline: 'none',
                    marginBottom: '32px',
                    wordBreak: 'break-all'
                  }}
                  onClick={(e) => {
                    e.currentTarget.select();
                    navigator.clipboard.writeText(licensingRequestPayload);
                  }}
                />

                {/* Footer Controls aligned bottom right */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '24px', 
                  width: '100%',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '20px'
                }}>
                  <button 
                    onClick={() => {
                      setStep(2);
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#64748b', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                  >
                    Back
                  </button>

                  <button 
                    onClick={() => {
                      setStep(7);
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#2563eb', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : step === 7 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: 800, 
                  color: '#000000', 
                  letterSpacing: '-0.02em', 
                  marginBottom: '6px' 
                }}>
                  Manual - Step 2
                </h2>
                
                <p style={{ 
                  fontSize: '15.5px', 
                  color: '#64748b', 
                  fontWeight: 500,
                  marginBottom: '40px',
                  lineHeight: '1.5'
                }}>
                  Obtain the Licensing Response
                </p>

                <div style={{ 
                  fontSize: '15px', 
                  color: '#475569', 
                  lineHeight: '1.7', 
                  textAlign: 'center', 
                  marginBottom: '48px',
                  fontWeight: 500
                }}>
                  <p style={{ marginBottom: '20px' }}>
                    On a computer with Internet access, open a browser to{' '}
                    <a 
                      href="https://activate.akedex.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}
                    >
                      https://activate.akedex.com
                    </a>{' '}
                    and use the Licensing Request from Step 1 to generate a new Licensing Response.
                  </p>
                  <p>
                    Then send the Licensing Response back to this machine.
                  </p>
                </div>

                {/* Footer Controls aligned bottom right */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '24px', 
                  width: '100%',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '20px'
                }}>
                  <button 
                    onClick={() => {
                      setStep(6);
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#64748b', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                  >
                    Back
                  </button>

                  <button 
                    onClick={() => {
                      setStep(8);
                    }}
                    style={{
                      background: 'transparent', 
                      color: '#2563eb', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : step === 8 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: 800, 
                  color: '#000000', 
                  letterSpacing: '-0.02em', 
                  marginBottom: '6px' 
                }}>
                  Manual - Step 3
                </h2>
                
                <p style={{ 
                  fontSize: '15.5px', 
                  color: '#64748b', 
                  fontWeight: 500,
                  marginBottom: '28px',
                  lineHeight: '1.5'
                }}>
                  Load the Licensing Response
                </p>

                <p style={{ 
                  fontSize: '13.5px', 
                  color: '#475569', 
                  fontWeight: 600,
                  marginBottom: '12px'
                }}>
                  Paste the generated Licensing Response content below to complete activation.
                </p>

                <textarea 
                  placeholder="Paste Licensing Response here"
                  value={manualResponse}
                  onChange={e => setManualResponse(e.target.value)}
                  style={{
                    width: '100%',
                    height: '160px',
                    padding: '12px',
                    fontFamily: 'monospace',
                    fontSize: '12.5px',
                    color: '#0f172a',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    resize: 'none',
                    outline: 'none',
                    marginBottom: '16px',
                    wordBreak: 'break-all',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                />

                {manualResponseError && (
                  <div style={{ 
                    color: '#ef4444', 
                    fontSize: '13px', 
                    fontWeight: 600, 
                    marginBottom: '16px',
                    textAlign: 'left',
                    width: '100%'
                  }}>
                    {manualResponseError}
                  </div>
                )}

                {/* Footer Controls aligned bottom right */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '24px', 
                  width: '100%',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '20px'
                }}>
                  <button 
                    onClick={() => {
                      setStep(7);
                      setManualResponseError('');
                    }}
                    disabled={licenseLoading}
                    style={{
                      background: 'transparent', 
                      color: '#64748b', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                  >
                    Back
                  </button>

                  <button 
                    onClick={async () => {
                      if (!manualResponse.trim()) {
                        setManualResponseError('Please paste the licensing response.');
                        return;
                      }
                      setManualResponseError('');
                      setLicenseLoading(true);
                      setTimeout(() => {
                        setLicenseLoading(false);
                        setStep(3); // Route to Choose Role
                      }, 1500);
                    }}
                    disabled={licenseLoading}
                    style={{
                      background: 'transparent', 
                      color: '#2563eb', 
                      border: 'none',
                      fontSize: '15px', 
                      fontWeight: 600, 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
                  >
                    {licenseLoading ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: '2px solid #e2e8f0',
                          borderTopColor: '#2563eb',
                          animation: 'akedex-spin 1s linear infinite'
                        }} />
                        Verifying...
                      </>
                    ) : (
                      'Activate'
                    )}
                  </button>
                </div>
              </div>
            ) : step === 5 ? (
              // OTP Verification step
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', animation: 'fadeIn 0.3s ease' }}>
                {/* Sign in redirect */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', fontSize: '13.5px', color: '#64748b' }}>
                  Already have an account?&nbsp;
                  <span 
                    onClick={() => {
                      setStep(3);
                      setOtpError('');
                    }}
                    style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                  >
                    Sign in &rarr;
                  </span>
                </div>

                <div>
                  <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                    Confirm your email address
                  </h1>
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                    We have sent a code to <strong style={{ color: '#0f172a' }}>{signUpEmail || '3axcompany@gmail.com'}</strong>
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <label style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Enter code</label>
                  
                  {/* OTP inputs container */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center', margin: '8px 0' }}>
                    {/* First 4 inputs */}
                    <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'space-between' }}>
                      {otp.slice(0, 4).map((digit, idx) => (
                        <input
                          key={idx}
                          ref={el => { otpRefs.current[idx] = el; }}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleOtpChange(e.target, idx)}
                          onKeyDown={e => handleOtpKeyDown(e, idx)}
                          onPaste={handleOtpPaste}
                          style={{
                            flex: 1,
                            maxWidth: '44px',
                            height: '56px',
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            textAlign: 'center',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: '#0f172a',
                            outline: 'none',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            boxSizing: 'border-box',
                            minWidth: 0
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#2563eb';
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(37,99,235,0.15)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#cbd5e1';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      ))}
                    </div>

                    {/* Middle divider/hyphen */}
                    <div style={{ width: '10px', height: '2px', background: '#cbd5e1', flexShrink: 0 }} />

                    {/* Last 4 inputs */}
                    <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'space-between' }}>
                      {otp.slice(4, 8).map((digit, idx) => {
                        const realIdx = idx + 4;
                        return (
                          <input
                            key={realIdx}
                            ref={el => { otpRefs.current[realIdx] = el; }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleOtpChange(e.target, realIdx)}
                            onKeyDown={e => handleOtpKeyDown(e, realIdx)}
                            onPaste={handleOtpPaste}
                            style={{
                              flex: 1,
                              maxWidth: '44px',
                              height: '56px',
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              textAlign: 'center',
                              fontSize: '22px',
                              fontWeight: 'bold',
                              color: '#0f172a',
                              outline: 'none',
                              transition: 'border-color 0.2s, box-shadow 0.2s',
                              boxSizing: 'border-box',
                              minWidth: 0
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = '#2563eb';
                              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(37,99,235,0.15)';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = '#cbd5e1';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {otpError && <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 600 }}>{otpError}</div>}
                {otpResendMessage && <div style={{ color: '#16a34a', fontSize: '12px', fontWeight: 600 }}>{otpResendMessage}</div>}

                {/* Continue button */}
                <button 
                  onClick={async () => {
                    const codeString = otp.join('');
                    if (codeString.length < 8) {
                      setOtpError('Please enter the full 8-digit verification code.');
                      return;
                    }
                    setOtpError('');
                    setOtpLoading(true);
                    setTimeout(() => {
                      setOtpLoading(false);
                      setStep(3); // Route to choose role
                    }, 1200);
                  }}
                  disabled={otpLoading}
                  style={{
                    width: '100%',
                    padding: '12px 24px', 
                    background: '#1f883d', 
                    color: '#ffffff', 
                    border: 'none',
                    borderRadius: '6px', 
                    fontSize: '15px', 
                    fontWeight: 700, 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1a7f37'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#1f883d'}
                >
                  {otpLoading ? 'Verifying...' : 'Continue'}
                </button>

                {/* Help links */}
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Didn't get your email?{' '}
                  <span 
                    onClick={() => {
                      setOtpResendMessage('A new verification code has been sent!');
                      setTimeout(() => setOtpResendMessage(''), 3000);
                    }}
                    style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Resend the code
                  </span>
                  {' or '}
                  <span 
                    onClick={() => {
                      setStep(4);
                      setOtpError('');
                    }}
                    style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    update your email address
                  </span>.
                </p>

                {/* Terms and Privacy Statement */}
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  By creating an account, you agree to the <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>Terms of Service</span>. For more information about Akedex's privacy practices, see the <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>Akedex Privacy Statement</span>. We'll occasionally send you account-related emails.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                <div>
                  <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#000000', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                    Choose Role
                  </h1>
                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.5' }}>
                    Springfield Public School verified. Select access key to sign in.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  <button 
                    onClick={() => handleRoleSelect('admin')}
                    style={{
                      width: '100%', 
                      padding: '14px 24px', 
                      background: '#16a34a', 
                      color: '#ffffff', 
                      border: 'none',
                      borderRadius: '8px', 
                      fontSize: '14px', 
                      fontWeight: 700, 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '10px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#15803d'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#16a34a'}
                  >
                    <Shield size={16} /> Login as Administrator
                  </button>
                  
                  <button 
                    onClick={() => handleRoleSelect('student')}
                    style={{
                      width: '100%', 
                      padding: '14px 24px', 
                      background: '#000000', 
                      color: '#ffffff', 
                      border: 'none',
                      borderRadius: '8px', 
                      fontSize: '14px', 
                      fontWeight: 700, 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '10px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#1e293b'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#000000'}
                  >
                    <Code size={16} /> Login as Student
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <button 
                    onClick={() => setStep(2)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#2563eb',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ← Change License Key
                  </button>
                  
                  <button 
                    onClick={() => {
                      setStep(1);
                      setError('');
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#64748b',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
