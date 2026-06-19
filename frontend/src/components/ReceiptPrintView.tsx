import React from 'react';
import { Printer, X } from 'lucide-react';

interface ReceiptPrintViewProps {
  student: {
    id: string;
    name: string;
    class: string;
    rollNo: string;
  };
  feeType: string;
  amount: string;
  paymentMethod: string;
  transactionId?: string;
  remarks?: string;
  onClose: () => void;
}

export function ReceiptPrintView({
  student,
  feeType,
  amount,
  paymentMethod,
  transactionId,
  remarks,
  onClose,
}: ReceiptPrintViewProps) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
  
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  const formattedDueDate = dueDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });

  const numericAmount = parseFloat(amount) || 0;
  const formattedAmount = numericAmount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Numeric scanline generation based on student ID digits and amount digits
  const cleanId = student.id.replace(/[^0-9]/g, '').padEnd(8, '0').slice(0, 8);
  const cleanAmount = Math.round(numericAmount * 100).toString().padStart(10, '0');
  const scanline = `104470100${cleanId}0000000000${cleanAmount}10000143562`;

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="receipt-preview-overlay">
      {/* Action controls hidden during print */}
      <div className="no-print preview-action-bar">
        <div>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Receipt Print Preview</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Suffolk Billing Statement Standard</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={triggerPrint} className="btn-print-action">
            <Printer size={16} /> Print Receipt
          </button>
          <button onClick={onClose} className="btn-close-action">
            <X size={16} /> Close
          </button>
        </div>
      </div>

      {/* Main A4 Document Sheet */}
      <div className="receipt-print-wrapper select-none">
        
        {/* ================= TOP PORTION (REMITTANCE SLIP) ================= */}
        <div className="receipt-stub">
          <div className="stub-header">
            {/* Logo & University Info */}
            <div className="bursar-info">
              <svg width="54" height="54" viewBox="0 0 100 100" style={{ marginRight: '12px' }}>
                <circle cx="50" cy="50" r="46" fill="none" stroke="#000000" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 30 40 L 50 25 L 70 40 L 70 70 L 50 85 L 30 70 Z" fill="none" stroke="#000000" strokeWidth="2" />
                <path d="M 50 25 L 50 85" stroke="#000000" strokeWidth="1.5" />
                <path d="M 30 40 L 70 40" stroke="#000000" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="8" fill="white" stroke="#000000" strokeWidth="1.5" />
                <text x="50" y="53" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="sans-serif">A</text>
                <text x="50" y="19" textAnchor="middle" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">AKEDEX</text>
              </svg>
              <div>
                <h1 className="uni-title">SUFFOLK UNIVERSITY</h1>
                <p className="uni-sub">Office of the Bursar /Loans & Collections</p>
                <p className="uni-address">41 Temple Street</p>
                <p className="uni-address">Boston, MA 02114</p>
                <p className="uni-address">(617) 573-8407</p>
              </div>
            </div>

            {/* Right Side Billing Box */}
            <div className="stub-bill-box">
              <div className="bill-box-title">TUITION AND FEES PAYMENT NOTICE</div>
              <div className="bill-grid">
                <div className="grid-cell border-r border-b">
                  <span className="cell-lbl">STUDENT ID</span>
                  <span className="cell-val">{student.id}</span>
                </div>
                <div className="grid-cell border-b">
                  <span className="cell-lbl">STUDENT NAME</span>
                  <span className="cell-val">{student.name}</span>
                </div>
                <div className="grid-cell border-r border-b">
                  <span className="cell-lbl">TERM</span>
                  <span className="cell-val">2026/SP</span>
                </div>
                <div className="grid-cell border-b">
                  <span className="cell-lbl">PAYMENT DUE DATE</span>
                  <span className="cell-val">{formattedDate}</span>
                </div>
                <div className="grid-cell border-r">
                  <span className="cell-lbl">BALANCE DUE</span>
                  <span className="cell-val font-bold">₹0.00</span>
                </div>
                <div className="grid-cell bg-light-gray">
                  <span className="cell-lbl">PAYMENT AMOUNT ENCLOSED</span>
                  <span className="cell-val font-bold">₹{formattedAmount}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '10px', marginTop: '12px', fontStyle: 'italic', fontWeight: 600 }}>
            Please make checks payable to Suffolk University
          </div>

          {/* Barcode & Address Layout */}
          <div className="stub-middle">
            <div className="stub-left-barcode">
              {/* Left tall/short vertical lines */}
              <div className="tall-short-barcode">
                {[3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 2, 1, 2, 1, 3, 2].map((w, idx) => (
                  <div key={idx} style={{ width: `${w}px`, background: 'black', height: '40px' }} />
                ))}
              </div>
              <div className="barcode-number">000001 000000001</div>
              
              {/* Student Address Block */}
              <div className="address-block font-sans" style={{ marginTop: '16px' }}>
                <div style={{ fontWeight: 700 }}>{student.name}</div>
                <div>2 Penny Pincher Ave</div>
                <div>Boston, MA 01960</div>
              </div>
            </div>

            <div className="stub-right-address">
              <div className="address-block font-sans">
                <div style={{ fontWeight: 700 }}>SUFFOLK UNIVERSITY</div>
                <div style={{ fontWeight: 700 }}>OFFICE OF THE BURSAR</div>
                <div>41 TEMPLE STREET</div>
                <div>BOSTON MA 02114-4280</div>
              </div>

              {/* POSTNET Barcode */}
              <div style={{ marginTop: '16px', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
                {[2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2].map((h, idx) => (
                  <div key={idx} style={{ width: '1.5px', height: h === 2 ? '14px' : '6px', background: 'black' }} />
                ))}
              </div>
            </div>
          </div>

          {/* OCR scanline */}
          <div className="stub-scanline font-mono">{scanline}</div>

          {/* Perforation Line */}
          <div className="perforation-divider">
            To ensure proper credit to your account, detach top portion and return with your payment in the envelope provided.
          </div>
        </div>


        {/* ================= BOTTOM PORTION (DETAILED STATEMENT) ================= */}
        <div className="receipt-main">
          
          {/* Main Statement Table */}
          <table className="statement-table">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>DATE</th>
                <th style={{ width: '50%', textAlign: 'left' }}>DESCRIPTION OF TRANSACTION</th>
                <th style={{ width: '12%', textAlign: 'right' }}>CHARGES</th>
                <th style={{ width: '12%', textAlign: 'right' }}>CREDITS</th>
                <th style={{ width: '11%', textAlign: 'right' }}>BALANCE</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Charge */}
              <tr>
                <td className="text-center">{formattedDate}</td>
                <td>{feeType.toUpperCase()} - CURRENT TERM</td>
                <td className="text-right">₹{formattedAmount}</td>
                <td className="text-right"></td>
                <td className="text-right"></td>
              </tr>
              {/* Row 2: Total Charges */}
              <tr className="row-total">
                <td></td>
                <td className="font-bold">TOTAL CHARGES</td>
                <td className="text-right font-bold">₹{formattedAmount}</td>
                <td className="text-right"></td>
                <td className="text-right"></td>
              </tr>

              {/* Space rows */}
              <tr style={{ height: '12px' }}><td colSpan={5}></td></tr>

              {/* Row 3: Payment */}
              <tr>
                <td className="text-center">{formattedDate}</td>
                <td>{paymentMethod.toUpperCase()} PAYMENT RECEIVED - THANK YOU</td>
                <td className="text-right"></td>
                <td className="text-right">₹{formattedAmount}</td>
                <td className="text-right"></td>
              </tr>

              {/* Row 4: Total Credits */}
              <tr className="row-total">
                <td></td>
                <td className="font-bold">TOTAL PAYMENTS/CREDITS</td>
                <td className="text-right"></td>
                <td className="text-right font-bold">₹{formattedAmount}</td>
                <td className="text-right"></td>
              </tr>

              {/* Space rows to force bottom alignment of balance */}
              <tr style={{ height: '140px' }}><td colSpan={5}></td></tr>

              {/* Bottom balance row */}
              <tr className="row-balance-due">
                <td colSpan={2} className="font-bold" style={{ paddingLeft: '24px' }}>
                  BALANCE DUE BY {formattedDate}
                </td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right font-bold" style={{ paddingRight: '12px' }}>₹0.00</td>
              </tr>
            </tbody>
          </table>

          {/* Important Message Box */}
          <div className="important-message-box">
            <div className="message-title">IMPORTANT MESSAGE</div>
            <p className="message-text">
              THIS INVOICE REFLECTS CHANGES TO TUITION CHARGES AND/OR FINANCIAL AID AWARDS. 
              YOUR ACCOUNT REFLECTS A ZERO BALANCE (₹0.00) FOR THIS SPECIFIC FEE TRANSACTION. 
              IF PAYMENT METHOD IS RETURNED OR ADDITIONAL COURSE ENROLLMENTS/SERVICES ARE REGISTERED, 
              YOUR OUTSTANDING BALANCE WILL BE UPDATED ACCORDINGLY. PLEASE RETAIN THIS FOR YOUR RECORDS.
            </p>
          </div>

          {/* Footer policies */}
          <div className="statement-footer">
            <p>Please review the reverse side of this statement for important information regarding our policies.</p>
            <p>* If the due date falls on a weekend or holiday, the payment is due on the next business day.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <span>Akedex operating environment fee voucher system</span>
              <span className="font-mono" style={{ fontSize: '9px' }}>SC080403.TXT-1-00000001</span>
            </div>
          </div>
        </div>

      </div>

      {/* Styled Sheets */}
      <style dangerouslySetInnerHTML={{ __html: `
        .receipt-preview-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: auto;
          padding: 24px;
        }

        .preview-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: #ffffff;
          border: 1px solid var(--border-primary);
          width: 100%;
          max-width: 850px;
          margin-bottom: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          box-sizing: border-box;
          flex-shrink: 0;
        }

        .btn-print-action {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          background: var(--accent-blue);
          color: #ffffff;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          transition: all 0.2s ease;
        }
        .btn-print-action:hover {
          background: #1d4ed8;
        }

        .btn-close-action {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 8px;
          border: 1px solid var(--border-primary);
          background: #ffffff;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-close-action:hover {
          background: var(--bg-tertiary);
        }

        /* A4 Styled printable container */
        .receipt-print-wrapper {
          width: 850px;
          background: #ffffff;
          padding: 40px;
          border: 1px solid #cbd5e1;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
          box-sizing: border-box;
          color: #000000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
        }

        .uni-title {
          font-size: 18px;
          font-weight: 900;
          margin: 0;
          color: #000000;
          letter-spacing: -0.5px;
        }
        .uni-sub {
          font-size: 10.5px;
          font-weight: 700;
          margin: 1px 0 3px;
          color: #000000;
        }
        .uni-address {
          font-size: 10px;
          margin: 0;
          color: #333333;
          line-height: 1.3;
        }

        .receipt-stub {
          border-bottom: 2px dashed #000000;
          padding-bottom: 20px;
          position: relative;
        }

        .stub-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .bursar-info {
          display: flex;
          align-items: flex-start;
        }

        .stub-bill-box {
          width: 440px;
          border: 2px solid #000000;
        }

        .bill-box-title {
          background: #000000;
          color: #ffffff;
          font-weight: 800;
          font-size: 11px;
          text-align: center;
          padding: 4px 0;
          letter-spacing: 0.5px;
        }

        .bill-grid {
          display: grid;
          grid-template-columns: 140px 1fr;
          font-size: 10px;
        }

        .grid-cell {
          display: flex;
          flex-direction: column;
          padding: 4px 8px;
          height: 38px;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .border-r {
          border-right: 1.5px solid #000000;
        }
        .border-b {
          border-bottom: 1.5px solid #000000;
        }

        .cell-lbl {
          font-size: 8px;
          font-weight: 800;
          color: #000000;
          text-transform: uppercase;
        }
        .cell-val {
          font-size: 11.5px;
          font-weight: 500;
          color: #000000;
        }
        .font-bold {
          font-weight: 800 !important;
        }
        .bg-light-gray {
          background: #f1f5f9;
        }

        .stub-middle {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }

        .stub-left-barcode {
          display: flex;
          flex-direction: column;
        }

        .tall-short-barcode {
          display: flex;
          gap: 1.5px;
          align-items: stretch;
          height: 35px;
        }

        .barcode-number {
          font-size: 10px;
          letter-spacing: 2px;
          font-family: monospace;
          margin-top: 4px;
        }

        .address-block {
          font-size: 11px;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .stub-right-address {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 320px;
          padding-left: 20px;
        }

        .stub-scanline {
          font-size: 13.5px;
          letter-spacing: 5.5px;
          text-align: center;
          margin-top: 36px;
          font-weight: 500;
        }

        .perforation-divider {
          border-top: 1.5px dashed #000000;
          text-align: center;
          font-size: 8.5px;
          color: #444444;
          padding-top: 4px;
          margin-top: 24px;
          letter-spacing: 0.2px;
        }

        /* Bottom Portion */
        .receipt-main {
          margin-top: 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .statement-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10.5px;
        }

        .statement-table th {
          border-top: 2px solid #000000;
          border-bottom: 2px solid #000000;
          padding: 8px 4px;
          font-weight: 800;
        }

        .statement-table td {
          padding: 8px 4px;
          color: #000000;
          vertical-align: middle;
        }

        .text-center {
          text-align: center;
        }
        .text-right {
          text-align: right;
        }

        .row-total td {
          border-top: 1px solid #000000;
          border-bottom: 1.5px solid #000000;
          padding: 6px 4px;
        }

        .row-balance-due td {
          border-top: 2px solid #000000;
          border-bottom: 2px solid #000000;
          padding: 10px 4px;
          font-size: 12px;
        }

        .important-message-box {
          border: 2px solid #000000;
          margin-top: auto;
          padding: 12px 16px;
          box-sizing: border-box;
        }

        .message-title {
          font-weight: 800;
          font-size: 11px;
          border-bottom: 1.5px solid #000000;
          padding-bottom: 4px;
          margin-bottom: 8px;
        }

        .message-text {
          font-size: 9.5px;
          line-height: 1.5;
          margin: 0;
          text-align: justify;
        }

        .statement-footer {
          margin-top: 24px;
          border-top: 1px solid #cbd5e1;
          padding-top: 12px;
          font-size: 9px;
          color: #444444;
          line-height: 1.4;
        }
        .statement-footer p {
          margin: 0 0 2px 0;
        }

        /* Print Override styles */
        @media print {
          .no-print {
            display: none !important;
          }

          body * {
            visibility: hidden !important;
          }

          .receipt-print-wrapper, .receipt-print-wrapper * {
            visibility: visible !important;
          }

          .receipt-preview-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            backdrop-filter: none !important;
            overflow: visible !important;
            display: block !important;
          }

          .receipt-print-wrapper {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            padding: 24px !important;
            margin: 0 !important;
          }
        }
      ` }} />
    </div>
  );
}
