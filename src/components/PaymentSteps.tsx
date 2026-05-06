import React, { useState, useEffect } from 'react';
import './PaymentSteps.css';
import { Copy, Check, MessageCircle } from 'lucide-react';

interface PaymentStepsProps {
  price: number;
  phone: string;
  payerName: string;
  onConfirm: () => void;
}

export const PaymentSteps: React.FC<PaymentStepsProps> = ({ price, phone, payerName, onConfirm }) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback
    }
  };

  const waLink = `https://wa.me/254701648600?text=${encodeURIComponent(`Hi, I have paid ${price} KSH for my order. Here is my M-Pesa screenshot.`)}`;

  return (
    <div className={`payment-panel glass-card ${mounted ? 'mounted' : ''}`}>
      {/* Top accent bar */}
      <div className="payment-accent-bar"></div>

      <div className="payment-panel-inner">
        {/* Step 1: Pay */}
        <div className="pay-section">
          <div className="pay-section-header">
            <div className="pay-icon mpesa-icon">M</div>
            <div>
              <h3 className="pay-title">Send via M-Pesa</h3>
              <p className="pay-subtitle">Send exactly <strong>{price} KSH</strong> to:</p>
            </div>
          </div>

          <div className="pay-number-row">
            <span className="pay-phone">{phone}</span>
            <button className="pay-copy-btn" onClick={handleCopy}>
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <div className="pay-meta">
            Payee: <strong>{payerName}</strong>
          </div>
        </div>

        {/* Divider */}
        <div className="pay-divider">
          <span className="pay-divider-text">then</span>
        </div>

        {/* Step 2: Send proof via WhatsApp */}
        <div className="pay-section">
          <p className="pay-instruction">Screenshot the M-Pesa receipt and send it to us on WhatsApp. We'll deliver your access within <strong>2-30 minutes</strong>.</p>

          <a className="pay-whatsapp-btn" href={waLink} target="_blank" rel="noreferrer">
            <MessageCircle size={20} />
            Send Screenshot on WhatsApp
          </a>
        </div>

        {/* Confirm */}
        <button className="pay-confirm-btn" onClick={onConfirm}>
          <Check size={16} />
          I've Sent the Payment
        </button>
      </div>
    </div>
  );
};
