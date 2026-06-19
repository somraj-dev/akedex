import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ArrowLeft, Search, User, CreditCard, FileText, CheckCircle2, Receipt, PlusCircle, IndianRupee } from 'lucide-react';
import { ReceiptPrintView } from './ReceiptPrintView';

export function CollectFeesFlow() {
  const closeTab = useAppStore(s => s.closeTab);

  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  // Form State
  const [feeType, setFeeType] = useState('Tuition Fee');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [transactionId, setTransactionId] = useState('');
  const [remarks, setRemarks] = useState('');

  const mockStudents = [
    { id: 'STU-2024-001', name: 'Aarav Sharma', class: 'Grade 10 - A', rollNo: '14' },
    { id: 'STU-2024-042', name: 'Riya Gupta', class: 'Grade 8 - B', rollNo: '05' }
  ];

  const handleSearch = () => {
    // Simple mock search
    const found = mockStudents.find(s => s.id.includes(searchQuery) || s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (found) {
      setSelectedStudent(found);
    }
  };

  const handleCollect = () => {
    setStep(2);
  };

  const resetForm = () => {
    setSelectedStudent(null);
    setSearchQuery('');
    setFeeType('Tuition Fee');
    setAmount('');
    setPaymentMethod('Cash');
    setTransactionId('');
    setRemarks('');
    setStep(1);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-sans)', height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button 
          onClick={() => closeTab('collect-fees-flow')}
          style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-primary)', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Fee Collection Center</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Process student fee payments securely</p>
        </div>
      </div>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
          
          {/* Step 1: Student Search */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="var(--accent-blue)" />
              1. Select Student
            </h2>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: selectedStudent ? '24px' : '0' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input 
                  type="text" 
                  placeholder="Search by Student ID, Name (e.g. Aarav, Riya)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid var(--border-primary)', outline: 'none', fontSize: '14px' }}
                />
              </div>
              <button 
                onClick={handleSearch}
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '0 20px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}
              >
                Search
              </button>
            </div>

            {selectedStudent && (
              <div style={{ background: 'var(--bg-tertiary)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-primary)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700 }}>
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{selectedStudent.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{selectedStudent.id} • {selectedStudent.class} • Roll No: {selectedStudent.rollNo}</p>
                </div>
              </div>
            )}
          </div>

          {selectedStudent && (
            <>
              {/* Step 2: Fee Details */}
              <div style={{ background: '#ffffff', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', animation: 'fadeIn 0.3s ease' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} color="var(--accent-purple)" />
                  2. Fee Details
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Fee Type</label>
                    <select 
                      value={feeType}
                      onChange={(e) => setFeeType(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-primary)', outline: 'none', fontSize: '14px', background: '#ffffff' }}
                    >
                      <option>Tuition Fee</option>
                      <option>Transport Fee</option>
                      <option>Hostel Fee</option>
                      <option>Library Fine</option>
                      <option>Miscellaneous</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Amount</label>
                    <div style={{ position: 'relative' }}>
                      <IndianRupee size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                      <input 
                        type="number" 
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid var(--border-primary)', outline: 'none', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Info */}
              <div style={{ background: '#ffffff', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', animation: 'fadeIn 0.3s ease' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={18} color="var(--accent-green)" />
                  3. Payment Information
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Payment Method</label>
                    <select 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-primary)', outline: 'none', fontSize: '14px', background: '#ffffff' }}
                    >
                      <option>Cash</option>
                      <option>Credit/Debit Card</option>
                      <option>UPI</option>
                      <option>Bank Transfer</option>
                      <option>Cheque</option>
                    </select>
                  </div>
                  {paymentMethod !== 'Cash' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Transaction ID / Ref No.</label>
                      <input 
                        type="text" 
                        placeholder="Enter reference number"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-primary)', outline: 'none', fontSize: '14px' }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Remarks (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Add any notes..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-primary)', outline: 'none', fontSize: '14px', resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button 
                  onClick={() => closeTab('collect-fees-flow')}
                  style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: '#ffffff', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  disabled={!amount}
                  onClick={handleCollect}
                  style={{ padding: '12px 32px', borderRadius: '8px', border: 'none', background: amount ? 'var(--accent-green)' : '#9ca3af', fontWeight: 700, color: '#ffffff', cursor: amount ? 'pointer' : 'not-allowed', boxShadow: amount ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none', transition: 'all 0.2s ease' }}
                >
                  Confirm & Collect
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {step === 2 && (
        <div style={{ background: '#ffffff', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '48px 32px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', animation: 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-green-dim)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle2 size={40} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Payment Successful!</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 32px' }}>
            Successfully collected <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{amount}</span> from {selectedStudent?.name} for {feeType}.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button 
              onClick={() => setShowReceipt(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: '#ffffff', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            >
              <Receipt size={18} />
              Print Receipt
            </button>
            <button 
              onClick={resetForm}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', border: 'none', background: 'var(--accent-blue)', fontWeight: 600, color: '#ffffff', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}
            >
              <PlusCircle size={18} />
              Collect Another
            </button>
          </div>
        </div>
      )}

      {showReceipt && (
        <ReceiptPrintView
          student={selectedStudent}
          feeType={feeType}
          amount={amount}
          paymentMethod={paymentMethod}
          transactionId={transactionId}
          remarks={remarks}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
}
