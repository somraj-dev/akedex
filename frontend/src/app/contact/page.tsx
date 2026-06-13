'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Field validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const tempErrors: typeof errors = {};
    if (!name.trim()) tempErrors.name = 'Name is required.';
    
    if (!email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(phone.trim())) {
      tempErrors.phone = 'Please enter a valid phone number (at least 10 digits).';
    }

    if (!message.trim()) tempErrors.message = 'Message is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setErrors({});

      // Hide success notification after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Reusable Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        maxWidth: '1100px',
        width: '100%',
        margin: '0 auto',
        padding: '80px 24px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '48px',
        boxSizing: 'border-box'
      }}>
        {/* Success Toast Notification */}
        {showSuccess && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#ffffff',
            border: '1px solid #10b981',
            borderRadius: '12px',
            padding: '16px 24px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 1001,
            animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <CheckCircle2 size={24} style={{ color: '#10b981' }} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Message Transmitted</div>
              <div style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 500 }}>Our system orchestrator will respond shortly.</div>
            </div>
          </div>
        )}

        {/* Info Column */}
        <div style={{
          flex: '1 1 350px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '32px'
        }}>
          <div>
            <span style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Contact Us
            </span>
            <h1 style={{
              fontSize: '44px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#0f172a',
              marginTop: '12px',
              marginBottom: '16px'
            }}>
              Connect with Akedex
            </h1>
            <p style={{
              fontSize: '16.5px',
              lineHeight: 1.6,
              color: '#475569',
              fontWeight: 400
            }}>
              Have questions about deploying Akedexcommunity edition, or integrating manual license keys? 
              Get in touch with our operations desk.
            </p>
          </div>

          {/* Contact Methods list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '10px', color: '#475569' }}>
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Email Operations</div>
                <a href="mailto:ops@akedex.com" style={{ fontSize: '14.5px', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>ops@akedex.com</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '10px', color: '#475569' }}>
                <Phone size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>System Integrations Hot Desk</div>
                <a href="tel:+91114567890" style={{ fontSize: '14.5px', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>+91 11 4567-8901</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '10px', color: '#475569' }}>
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Headquarters</div>
                <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#0f172a' }}>Connaught Place, New Delhi, India</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div style={{
          flex: '1 1 450px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02), 0 4px 6px -4px rgba(0,0,0,0.02)',
          boxSizing: 'border-box'
        }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '6px',
            letterSpacing: '-0.02em'
          }}>
            Operational Inquiry
          </h2>
          <p style={{
            fontSize: '13.5px',
            color: '#64748b',
            marginBottom: '28px',
            fontWeight: 500
          }}>
            All communications are encrypted and audited.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Name field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="name" style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  height: '42px',
                  border: errors.name ? '1px solid #ef4444' : '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '0 14px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  background: '#ffffff',
                  color: '#0f172a'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = errors.name ? '#ef4444' : '#2563eb'}
                onBlur={(e) => e.currentTarget.style.borderColor = errors.name ? '#ef4444' : '#cbd5e1'}
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" style={{ fontSize: '12px', color: '#ef4444', fontWeight: 500 }}>
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="email" style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  height: '42px',
                  border: errors.email ? '1px solid #ef4444' : '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '0 14px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  background: '#ffffff',
                  color: '#0f172a'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = errors.email ? '#ef4444' : '#2563eb'}
                onBlur={(e) => e.currentTarget.style.borderColor = errors.email ? '#ef4444' : '#cbd5e1'}
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" style={{ fontSize: '12px', color: '#ef4444', fontWeight: 500 }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Phone field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="phone" style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                style={{
                  height: '42px',
                  border: errors.phone ? '1px solid #ef4444' : '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '0 14px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  background: '#ffffff',
                  color: '#0f172a'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = errors.phone ? '#ef4444' : '#2563eb'}
                onBlur={(e) => e.currentTarget.style.borderColor = errors.phone ? '#ef4444' : '#cbd5e1'}
                aria-required="true"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <span id="phone-error" style={{ fontSize: '12px', color: '#ef4444', fontWeight: 500 }}>
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Message field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="message" style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                style={{
                  border: errors.message ? '1px solid #ef4444' : '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  background: '#ffffff',
                  color: '#0f172a'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = errors.message ? '#ef4444' : '#2563eb'}
                onBlur={(e) => e.currentTarget.style.borderColor = errors.message ? '#ef4444' : '#cbd5e1'}
                aria-required="true"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span id="message-error" style={{ fontSize: '12px', color: '#ef4444', fontWeight: 500 }}>
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                height: '46px',
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.2s, transform 0.1s',
                marginTop: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isSubmitting ? 'Transmitting...' : (
                <>
                  Send Message <Send size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
